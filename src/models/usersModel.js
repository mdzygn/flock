import usersData from '../data/users';

const users = JSON.parse(JSON.stringify(usersData));

testDuplicates();

function testDuplicates() {
	const usedIds = {};
	users.forEach(item => {
		if (usedIds[item.id]) {
			console.warn('User "' + item.title + '" has same id "' + item.id + '" as "' + usedIds[item.id].title + '"');
		} else {
			usedIds[item.id] = item;
		}
	});
}

export function getUser(userId) {
	return users.find(item => item.id === userId);
}