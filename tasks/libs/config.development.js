import logger from './logger.js';

module.exports = {
    database: 'tasks',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'tasks.sqlite',
        define: {
            underscored: true
        },
        logging: (sql) => {
            logger.info(`[${new Date()}] ${sql}`);
        }
    },
    jwtSecret: 'topSecretSecret',
    jwtSession: {session: false}
};