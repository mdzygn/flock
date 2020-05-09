import config, { DEBUG } from './config';

import { generateId, errorResponse } from '../server/mongo';

import NotificationTypes from '../config/NotificationTypes';

async function createNotification(db, details, data, res, completedData) {
    if (DEBUG) {
        if (!details.type) {
            errorResponse(res, completedData, {errorMsg: 'createNotification - "type" parameter missing'});
            return -1;
            // throw new Error('"type" parameter missing in call to createNotification', details);
        }
        if (!details.projectId) {
            errorResponse(res, completedData, {errorMsg: 'createNotification - "projectId" parameter missing'});
            return -1;
            // throw new Error('"projectId" parameter missing in call to createNotification', details);
        }
        if (!details.actors) {
            errorResponse(res, completedData, {errorMsg: 'createNotification - "actors" parameter missing'});
            return -1;
            // throw new Error('"actors" parameter missing in call to createNotification', details);
        }
    }

    details.createdAt = (new Date()).getTime();


    // const postTitle = data && data.postTitle;

    let getProject = false;
    let getProjectMembers = false;
    let getProjectFollowers = false;
    let getActorDetails = false;
    let getThreadTitle = false;
    let getThreadOwner = false;
    let getChannelTitle = false;

    let threadOwnerId; // get thread owner
    let projectMembers = [];


    switch (details.type) {
        case NotificationTypes.POST_ADDED:
            details.isUserAction = true;
            getProject = true;
            getProjectMembers = true;
            getProjectFollowers = true;
            getActorDetails = true;
            if (details.threadId) {
                getThreadTitle = true;
                getThreadOwner = true;
            }
            break;
    }

    let projectTitle = 'Test Project'; // set from project
    let threadTitle = null;
    let channelTitle = 'Questions'; // set from channel

    // if getProject  // get project

    // if getActorDetails  // get actor details
    if (getActorDetails) {
        const actorIds = details.actors.map((actor) => actor.id);
        const usersFilter = { id: { $in: actorIds } };
        const actorResults = await db.collection('users').find(usersFilter).toArray();

        if (actorResults) {
            details.actors = actorResults.map((actor) => {
                const newActor = {
                    id: actor.id,
                    username: actor.username,
                    avatarImage: actor.avatarImage,
                    name: actor.name,
                };
                if (!actor.avatarImage) {
                    newActor.style = actor.style;
                }
                return newActor;
            })
        } else {
            errorResponse(res, completedData, {errorMsg: 'createNotification - actors not found'});
            return -1;
        }
    }
    // details.actors.forEach((actor) => {
    //     actor.username =
    //     actor.name =
    //     actor.avatarImage =
    //     actor.style =  // user style if no avatarImage set
    // });

    // if getProjectMembers  // add to users and set projectMembers
    // if getProjectFollowers  // add to users
    // add one for each member and follower of project
    const users = [{
        id: 'YRVQ6vOE',
        thumb: 'Test User',
        isTeamMember: true,
    }]
    projectMembers = ['YRVQ6vOE'];

    // if getThread // get thread and set owner and threadTitle

    if (getThreadTitle && !threadTitle) {
        getChannelTitle = true;
    }

    // if getChannelTitle  // get channel and set channelTitle



    var allResults = [];

    let curUser;
    let curDetails;
    let isThreadOwner;
    let isProjectMember;

    for (let userI = 0; userI < users.length; userI++) {
        curUser = users[userI];

        curDetails = JSON.parse(JSON.stringify(details));
        curDetails.userId = curUser.id;

        isProjectMember = projectMembers.includes(curUser.id);

        curDetails.id = generateId(16);

        curDetails.message = null;

        switch (curDetails.type) {
            case NotificationTypes.POST_ADDED:
                if (curDetails.threadId) {
                    isThreadOwner = (curUser.id === threadOwnerId);
                    if (isThreadOwner || isProjectMember) {
                        if (threadTitle) {
                            curDetails.message = 'replied to "' + threadTitle + '"';
                        } else if (channelTitle) {
                            curDetails.message = 'replied to a post in #' + channelTitle + '';
                        } else {
                            curDetails.message = 'replied to a post';
                        }
                    } else {
                        curDetails.notPriority = true;
                        // continue; // skip if not thread owner or not member of project
                    }
                } else if (curDetails.channelId) {
                    if (channelTitle) {
                        curDetails.message = 'added a post in #' + channelTitle + '';
                    } else {
                        curDetails.message = 'added a post';
                    }
                } else {
                    curDetails.message = 'posted an update';
                }

                break;
        }

        if (!curDetails.notPriority) {
            if (projectTitle) {
                curDetails.projectTitle = projectTitle;
            }
        }

        if (DEBUG && !curDetails.message && !curDetails.notPriority) {
            throw new Error('no message set in createNotification', curDetails);
        }

        const curResult = db.collection('notifications').insertOne(curDetails);
        allResults.push(curResult);
    }

    const result = await Promise.all(allResults).then((values) => {
        let failed = false;
        let lastResult = null;
        values.forEach((curResult, index) => {
            console.log('result ' + index, curResult);
            if (!curResult) {
                failed = true;
            }
            lastResult = curResult;
        });
        if (failed) {
            return null;
        } else {
            return lastResult;
        }
    });

    return result;
}

export default createNotification;