module.export = {
    database: 'tasks',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'tasks.sqlite',
        logging: false,
        define: {
            underscored: true
        }
    },
    jwtSecret: 'topSecretSecret',
    jwtSession: {session: false}
};