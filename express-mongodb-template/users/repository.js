import database from '../database';

let executeOn = database.executeOn;

function getUserById(id) {
	let _id = database.toObjectId(id);
	return executeOn('users', (users) => users.findOne({_id}));
}

function getUserByLogin(login) {
	return executeOn('users', (users) => users.findOne({login}));
}

export default {
	getUserById,
	getUserByLogin
};