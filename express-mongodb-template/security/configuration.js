import fs from 'fs';

export default {
	certificate: {
		key: fs.readFileSync(`${__dirname}/private.key`, 'utf8'),
		cert: fs.readFileSync(`${__dirname}/public.cert`, 'utf8')
	},
	secret: '854b5545-aa5c-4ef6-afa0-28faa6d4dcf3'
};