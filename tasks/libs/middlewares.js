import bodyParser from 'body-parser';
import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import logger from './logger.js';
import compression from 'compression';
import helmet from 'helmet';

module.exports = APP => {
    APP.set('json spaces', 4);
    APP.set('port', 3000);
    APP.use(helmet());
    APP.use(cors({
        origin: ['http://localhost:3001'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    APP.use(morgan('common', {
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    }));
    APP.use(compression());
    APP.use(bodyParser.json());
    APP.use(APP.auth.initialize());
    APP.use((req, res, next) => {
        if (req.body) {
            delete req.body.id;
            next();
        }
    });
    APP.use(express.static("public"));
};