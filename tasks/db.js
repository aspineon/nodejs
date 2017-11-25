import fs from 'fs';
import path from 'path'
import Sequelize from 'sequelize';

let db = null;

module.exports = APP => {
    if (!db) {
        const config = APP.libs.config;
        const sequelize = new Sequelize(config.database, config.username, config.password, config.params);
        const dir = path.join(__dirname, 'models');

        db = { sequelize: sequelize, models: {} };
        fs.readdirSync(dir).forEach(file => {
            let  modelDir = path.join(dir, file);
            let  model = sequelize.import(modelDir);
            db.models[model.name] = model;
        });
        Object.keys(db.models).forEach(key => {
            db.models[key].associate(db.models);
        });
    }
    return db;
};