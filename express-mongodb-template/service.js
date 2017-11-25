import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import https from 'https';

import configuration from './configuration';
import securityConfiguration from './security/configuration';
import securityRoutes from './security/routes';
import usersRoutes from './users/routes';
import streamingRoutes from './streaming/routes';
import logger from './logger';

let app = express();

app.set('json spaces', 4);
app.use(helmet());
app.use(cors(configuration.cors));
app.use(morgan('common', configuration.morgan));
app.use(compression());
app.use(bodyParser.json());
app.use(express.static(configuration.staticFolder));

securityRoutes.initialize(app);
usersRoutes.initialize(app);
streamingRoutes.initialize(app);

https.createServer(securityConfiguration.certificate, app)
	.listen(configuration.serverPort, () => logger.info('Server is up...'));