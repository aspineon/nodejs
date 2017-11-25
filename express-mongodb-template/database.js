import MongoDB from 'mongodb';
import { Observable } from 'rxjs';

import configuration from './configuration';
import logger from './logger';

let ObjectId = MongoDB.ObjectId;
let connection = MongoDB.MongoClient.connect(configuration.mondodbUrl)
	.catch(logger.error);

function executeOn(collection, task) {
	return Observable.fromPromise(connection.then((db) => task(db.collection(collection))));
}

export default {
	executeOn,
	toObjectId: (id) => new ObjectId(id)
};