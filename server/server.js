import express from 'express';
import fs from "fs";
import https from "https";
import path from "path";
import bodyParser from 'body-parser';
import cors from "cors";
import cloudinary from "cloudinary";
import passport from "passport";
import { serverPort } from '../etc/config';
import jwt from "./helpers/jwt";
import * as db from "./routes/db";
import servicesConfig from "./helpers/services-config";
import routesLocations from './routes/locations.routes';
import routesUsers from './routes/users.routes';
import routesCities from './routes/cities.routes';

const certOptions = {
    key: fs.readFileSync(path.resolve('./ssl/server.key')),
    cert: fs.readFileSync(path.resolve('./ssl/server.crt'))
};

db.setUpConnection(); // подключаемся к базе
const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(cors()); // корс для хедов
// app.use(jwt());
app.use(passport.initialize());
app.use(passport.session());

cloudinary.config(servicesConfig.cloudinary); // подключаем облачный сервис

routesCities(app);
routesLocations(app);
routesUsers(app);

const server = https.createServer(certOptions, app).listen(serverPort, () => { // слушатель на serverPort
    console.log("all ok")
});