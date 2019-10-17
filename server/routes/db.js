import mongoose from "mongoose";
import config from '../../etc/config';

export const setUpConnection = () => { // функция подключения к базе
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    });
    mongoose.Promise = global.Promise;
};