import logger from './logger';

export default {
	serverPort: 8888,
	staticFolder: 'www',
	mondodbUrl: 'mongodb://localhost:27017/test',
	morgan: {
		stream: {
			write: (message) => {
				logger.info(message);
			}
		}
	},
	cors: {
		origin: ['*'],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization']
	}
};