import fs from 'fs';
import winston from 'winston';

if (!fs.existsSync('logs')) {
	fs.mkdirSync('logs');
}

export default new winston.Logger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			level: 'info',
			filename: 'logs/app.log',
			maxsize: 1000000,
			maxFiles: 15
		})
	]
});