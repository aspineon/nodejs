import authenticationManager from '../security/authenticationManager';
import usersRepository from './repository';
import logger from '../logger';

function getUser(request, response) {
	usersRepository.getUserById(request.user.id)
		.subscribe((user) => response.json(user), logger.error);
}

export default {
	initialize: (app) => {
		app.route('/user')
			.all(authenticationManager.authenticate())
			.get(getUser);
	}
};