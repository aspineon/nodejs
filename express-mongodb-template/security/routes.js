import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';

import logger from '../logger';
import configuration from './configuration';
import usersRepository from '../users/repository';

function createToken(id) {
	return jwt.encode({id}, configuration.secret);
}

function verifyPassword(user, password) {
	if (user === null || password === undefined) {
		return false;
	}
	return bcrypt.compareSync(password, user.password);
}

function authenticate(login, password) {
	return usersRepository.getUserByLogin(login)
		.map((user) => verifyPassword(user, password) ? createToken(user._id) : null);
} 

function token(request, response) {
	authenticate(request.body.login, request.body.password)
		.subscribe((token) => {
			if (token) {
				response.json(token);
			} else {
				response.sendStatus(401);
			}
		}, logger.error);
}

export default {
	initialize: (app) => app.post('/token', token)
};