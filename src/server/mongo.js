import config, { DEBUG } from './config';

const mongo = require('mongodb');

export const ObjectID = mongo.ObjectID;

let client = null;
let db = null;

export async function init() {
    if (!client) {
        client = await mongo.MongoClient.connect(config.MONGODB_URI, { useUnifiedTopology:true });
        db = client.db(config.MONGODB_DB);
    }
    return { client, db };
}

export function response(res, responseObject) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(responseObject));
}

export function errorResponse(res, errorObject, debugObject) {
    response(res, Object.assign({error: true}, errorObject, (DEBUG && debugObject) ? debugObject : null));
}

export async function validateCredentials(db, options) {
    const userItem = await db.collection('users').findOne({ id: options.userId });

    // TODO: validate with sessions
    if (userItem && userItem.usercode === options.usercode) { // && (userItem.pass || options.setAccount)) {
        return true;
    } else {
        return false;
    }
}

export function filterItemArrayDetails(items, itemDetails) {
    const filteredItems = [];
	if (items && items.length) {
		let newItem, sourceItem, key;
		for (var itemI = 0; itemI < items.length; itemI++) {
            sourceItem = items[itemI];
            newItem = filterItemDetails(sourceItem, itemDetails);
            filteredItems.push(newItem);
		}
    }
    return filteredItems;
}

export function filterItemDetails(sourceItem, itemDetails) {
    const newItem = {};

    for (let key in itemDetails) {
        if (sourceItem[key] !== undefined) {
            newItem[key] = sourceItem[key];
        }
    }

    return newItem;
}

export function generateId(length) {
    if (!length) {
        length = 8;
    }
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const idBase = new Array(length + 1).join('x');
    return idBase.replace(/x/g, function() {
        return chars[Math.floor(Math.random() * chars.length)];
    });
}

export function getConversationUsersId(userIds) {
	const newUserIds = [...userIds];
	newUserIds.sort();
	const usersId = newUserIds.join('-');
	return usersId;
}

export async function filterItemsByProjectAccess(items, userId, validLogin) {
	const projectIds = getItemIds(items, 'projectId');
	// const projectIds = [];
	// let item;
	// for (var itemI = 0; itemI < items.length; itemI++) {
	// 	item = items[itemI];
	// 	if (!projectIds.includes(item.projectId)) { // !(item.public && !item.archived) &&
	// 		projectIds.push(item.projectId);
	// 	}
	// }

	let projects = null;
	if (projectIds.length) {
		const projectsFilter = { "id": { "$in": projectIds } };
		projects = await db.collection('projects').find(projectsFilter).toArray();
		// console.log('projectIds', projectIds, projectId, id, projects.length);
	}

	let curProject;
	items = items.filter((item) => {
		curProject = projects.find(project => project.id === item.projectId);
		// console.log('curProject', curProject);
		if (curProject) {
			if (curProject.public && !curProject.archived) {
				// console.log('public');
				return true;
			} else if (userId && validLogin && curProject.team && curProject.team.includes(userId)) {
				// console.log('team');
				return true;
			} else {
				// console.log('not allowed');
				return false;
			}
		} else {
			return false;
		}
    });

    return items;
}

export function getItemIds(items, propName) {
    const itemIds = [];
	let item;
	for (var itemI = 0; itemI < items.length; itemI++) {
		item = items[itemI];
		if (item[propName] && !itemIds.includes(item[propName])) { // !(item.public && !item.archived) &&
			itemIds.push(item[propName]);
		}
    }
    return itemIds;
}

export async function loadUserItemProperties(items, options) {
    const itemIds = getItemIds(items, 'id');

    const userId = options && options.userId;
    const itemIdProp = options && options.itemIdProp;
    const collections = options && options.collections;

    // TODO: optimize

    if (itemIdProp && collections) {
        if (itemIds.length) {
            const userProjectFilter = { "userId": userId };
            userProjectFilter[itemIdProp] = { "$in": itemIds };

            let followedProjectIds = null;
            let likedProjectIds = null;

            if (collections.follows) {
                followedProjectIds = {};
                const follows = await db.collection(collections.follows).find(userProjectFilter).toArray(); // {userId: userId}
                for (var followI = 0; followI < follows.length; followI++) {
                    followedProjectIds[follows[followI][itemIdProp]] = follows[followI];
                }
            }

            if (collections.likes) {
                likedProjectIds = {};
                const likes = await db.collection(collections.likes).find(userProjectFilter).toArray();
                for (var likeI = 0; likeI < likes.length; likeI++) {
                    likedProjectIds[likes[likeI][itemIdProp]] = true;
                }
            }

            let item, followItem;
            for (var itemI = 0; itemI < items.length; itemI++) {
                item = items[itemI];

                if (collections.likes) {
                    item.liked = !!likedProjectIds[item.id];
                }

                if (collections.follows) {
                    followItem = followedProjectIds[item.id];
                    item.following = !!followItem;
                    if (item.following) {
                        item.followTime = followItem.createdAt;
                    }
                }
            }
        }
    }
}

export async function getProjectLikeFollowCounts(projects) {
    // const projectIds = getItemIds(projects, 'id');
    // console.log('projectIds', projects.length, projectIds);

    // create aggregate queries to tally number of likes and follows for each project

    const aggregateCountFacet = {};
    const aggregateCountProject = {};
    const aggregateCountQuery = [
        { "$facet": aggregateCountFacet },
        { "$project": aggregateCountProject }
    ];

    let project;
    for (var projectI = 0; projectI < projects.length; projectI++) {
        project = projects[projectI];

        aggregateCountFacet[project.id] = [
            { "$match" : { "projectId": project.id}},
            { "$count": "totalCount" },
        ];
        aggregateCountProject[project.id] = { "$arrayElemAt": ["$" + project.id + ".totalCount", 0] }
    }

    const projectLikesCounts = await await db.collection('likes').aggregate(aggregateCountQuery).toArray();
    const projectFollowsCounts = await await db.collection('follows').aggregate(aggregateCountQuery).toArray();

    // console.log('aggregateLikesQuery', JSON.stringify(aggregateLikesQuery, 2));
    // console.log('projectLikesCounts', projectLikesCounts);

    // console.log('*** update like and follow counts');

    for (var projectI = 0; projectI < projects.length; projectI++) {
        project = projects[projectI];

        project.likeCount = projectLikesCounts[0][project.id] || 0;
        project.followCount = projectFollowsCounts[0][project.id] || 0;

        // console.log(project.id, project.title, ' - ', project.prevLikeCount, project.followCount, project.prevFollowCount, project.likeCount);
    }
}

export function catchMongoError(res, error, action) {
    // console.log('mongo error', error);
    const duplicateKey = error.errmsg && error.errmsg.includes('duplicate key');
    // console.log('duplicateKey', duplicateKey);
    errorResponse(res, {duplicateKey}, {errorMsg: duplicateKey ? 'duplicate id for new item' : 'mongo error', action, errorObject: error});
}