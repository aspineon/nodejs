import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import configuration from './configuration';
import usersRepository from '../users/repository';

let strategyOptions = {
	secretOrKey: configuration.secret,
	jwtFromRequest: ExtractJwt.fromAuthHeader()
};
let strategy = new Strategy(strategyOptions, (payload, done) => {
	let onSuccess = (user) => done(null, {id: user._id});
	let onError = () => done(null, false);
	usersRepository.getUserById(payload.id)
		.subscribe(onSuccess, onError);
});

passport.use(strategy);
passport.initialize();

export default {
	authenticate: () => passport.authenticate('jwt', {session: false})
};