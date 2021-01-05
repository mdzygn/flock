import { init, response, errorResponse, validateCredentials } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		response(res, {invalid: true});
		return;
	}

	let userId = options.userId;

	let addTeamMemberUsernames = options.addTeamMemberUsernames || null;
	let removeTeamMemberUsernames = options.removeTeamMemberUsernames || null;

	const projectId = options.id;

    const curProject = await db.collection('projects').findOne({ id: projectId });
    if (curProject) {
		if (userId && curProject.team && curProject.team.includes(userId)) { // is allowed to edit project
			const newTeam = [...curProject.team];

			let addTeamMembers = null;
			let removeTeamMembers = null;

			const membersNotExisting = [];
			const membersAlreadyInGroup = [];
			const membersNotInGroup = [];

			let tryingToRemoveSelf = false;

			if (addTeamMemberUsernames && addTeamMemberUsernames.length) {
				const ids = options && options.ids;

				const usersFilter = {};
				usersFilter.username = { $in: addTeamMemberUsernames };

				const addTeamMembersFoundByUsername = {};
			
				addTeamMembers = await db.collection('users').find(usersFilter).toArray();
				if (addTeamMembers && addTeamMembers.length) {
					addTeamMembers.forEach((member) => {
						addTeamMembersFoundByUsername[member.username] = member;
					});
				}

				addTeamMemberUsernames.forEach((memberUsername) => {
					if (!addTeamMembersFoundByUsername[memberUsername]) {
						membersNotExisting.push(memberUsername);
					}
				});
			} else if (removeTeamMemberUsernames && removeTeamMemberUsernames.length) {
				const ids = options && options.ids;

				const usersFilter = {};
				usersFilter.username = { $in: removeTeamMemberUsernames };
			
				const removeTeamMembersFoundByUsername = {};

				removeTeamMembers = await db.collection('users').find(usersFilter).toArray();
				if (removeTeamMembers && removeTeamMembers.length) {
					removeTeamMembers.forEach((member) => {
						removeTeamMembersFoundByUsername[member.username] = member;
						if (member.id === userId) {
							tryingToRemoveSelf = true;
						}
					});
				}

				removeTeamMemberUsernames.forEach((memberUsername) => {
					if (!removeTeamMembersFoundByUsername[memberUsername]) {
						membersNotExisting.push(memberUsername);
						membersNotInGroup.push(memberUsername);
					}
				});
			}

			if (addTeamMembers && addTeamMembers.length) {
				addTeamMembers.forEach((member) => {
					if (newTeam.indexOf(member.id) !== -1) {
						membersAlreadyInGroup.push(member.username);
					}
				});
			}
			if (removeTeamMembers && removeTeamMembers.length) {
				removeTeamMembers.forEach((member) => {
					if (newTeam.indexOf(member.id) === -1) {
						membersNotInGroup.push(member.username);
					}
				});
			}

			// console.log('addTeamMembers: ' + addTeamMembers);
			// console.log('removeTeamMembers: ' + removeTeamMembers);

			if (!(addTeamMemberUsernames && addTeamMemberUsernames.length) && !(removeTeamMemberUsernames && removeTeamMemberUsernames.length)) {
				errorResponse(res, {noMembersSpecified: true}, {errorMsg: 'no members specified to add or remove'});
			} else if (tryingToRemoveSelf) {
				errorResponse(res, {tryingToRemoveSelf: true}, {errorMsg: 'cannot remove self from team'});
			} else if (membersNotInGroup.length) { // prioritise this message above users not existing
				errorResponse(res, {membersNotInGroup}, {errorMsg: 'members specified to remove are not in team'});
			} else if (membersNotExisting.length) {
				errorResponse(res, {membersNotExisting}, {errorMsg: 'members specified do not exist'});
			} else if (membersAlreadyInGroup.length) {
				errorResponse(res, {membersAlreadyInGroup}, {errorMsg: 'members specified to add are already in team'});
			} else {
				const addedUserUsernames = [];
				const removedUserUsernames = [];

				if (addTeamMembers && addTeamMembers.length) {
					addTeamMembers.forEach((member) => {
						if (newTeam.indexOf(member.id) === -1) {
							newTeam.push(member.id);
							addedUserUsernames.push(member.username);
						}
					});
				} else if (removeTeamMembers && removeTeamMembers.length) {
					removeTeamMembers.forEach((member) => {
						let foundIndex = newTeam.indexOf(member.id);
						if (foundIndex !== -1) {
							newTeam.splice(foundIndex, 1);
							removedUserUsernames.push(member.username);
						}
					});
				}

				const details = {}
				details.team = newTeam;

				// console.log('prev team: [' + curProject.team + ']');
				// console.log('set team: [' + newTeam + ']');

				const result = await db.collection('projects').updateOne({ id: projectId }, { $set: details } );
				if (result) {
					if (addedUserUsernames.length) {
						response(res, {success: true, addedMembers: addedUserUsernames});
					} else if (removedUserUsernames.length) {
						response(res, {success: true, removedMembers: removedUserUsernames});
					} else {
						response(res, {success: true});
					}
				} else {
					response(res, {error: true});
				}
			}
		} else {
			response(res, {error: true, invalidUser: true});
		}
	} else {
		response(res, {error: true});
	}
}