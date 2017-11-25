import fs from 'fs';
import https from 'https';

module.exports = APP => {
    if (process.env.NODE_ENV !== 'test') {
        const credential = {
            key: fs.readFileSync('private.key', 'utf8'),
            cert: fs.readFileSync('public.cert', 'utf8')
        };
        APP.db.sequelize.sync().done(() => {
            https.createServer(credential, APP)
                .listen(APP.get('port'), () => console.log('Server is up...'));
        });
    }
};