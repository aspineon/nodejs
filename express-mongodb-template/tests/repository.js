import MongoDB from 'mongodb';
import logger from '../../logger';

module.exports = APP => {
	let ObjectId = MongoDB.ObjectId;
	let database;

	function wrapObjectId(object) {
		if (object._id !== undefined) {
			object._id = new ObjectId(object._id);
		}
	}

	function find(collection, criteria) {
		wrapObjectId(criteria);
		return database.collection(collection)
			.findOne(criteria);
	}

	function getUserById(userId) {
		return find('users', { _id: userId });
	}

	function getUserByLogin(login) {
		return find('users', { login });
	}

	function assignTest() {
		return database.collection('tests')
			.findOne()
			.then((test) => database.collection('users').update({}, { $set: { tests: [test] } }));
	}

	function getAssignedTests(userId) {
		return getUserById(userId)
			.then((user) => new Promise(function (resolve) {
				let tests = user.tests || [];
				tests.forEach((test) => delete test.questions);
				resolve(tests);
			}));
	}

	function findTest(tests, predicate) {
		let filteredTests = tests.filter(predicate);
		return filteredTests.length > 0 ? filteredTests[0] : null;
	}

	function beginTest(userId, testId) {
		return getUserById(userId)
			.then((user) => new Promise(function (resolve) {
				let tests = user.tests || [];
				let test = findTest(tests, (test) => test._id == testId && test.isActive === undefined);
				if (test !== null) {
					test.startTime = Date.now();
					test.isActive = true;
					database.collection('users').update({ _id: userId }, { $set: { tests: tests } });
				}
				resolve();
			}));
	}

	function getActiveTest(userId) {
		return getUserById(userId)
			.then((user) => new Promise(function (resolve) {
				let test = findTest(user.tests || [], (test) => test.isActive === true);
				if (test !== null) {
					resolve(test);
				} else {
					resolve({});
				}
			}));
	}

	function answerQuestion(userId, questionId, answer) {
		return getUserById(userId)
			.then((user) => new Promise(function (resolve) {
				let test = findTest(user.tests || [], (test) => test.isActive === true);
				if (test !== null) {
					let timeLeft = test.timeLimit - (Date.now() - test.startTime);
					if (timeLeft > 0) {
						let questions = test.questions.filter((question) => question._id == questionId);
						if (questions.length > 0) {
							questions[0].userAnswer = answer;
							database.collection('users').update({ _id: userId }, { $set: { tests: user.tests } });
						}
						resolve();
					} else {
						return finishTest(userId);
					}
				} else {
					resolve();
				}
			}));
	}

	function finishTest(userId) {
		return getUserById(userId)
			.then((user) => new Promise(function (resolve) {
				let test = findTest(user.tests || [], (test) => test.isActive === true);
				if (test !== null) {
					test.endTime = Date.now();
					delete test.isActive;
					database.collection('users').update({ _id: userId }, { $set: { tests: user.tests } });
					resolve(test);
				}
			}));
	}

	MongoDB.MongoClient.connect(APP.configuration.mongodbUrl)
		.then((db) => database = db)
		.catch(logger.error);

	return {
		getUserById,
		getUserByLogin,
		assignTest,
		getAssignedTests,
		beginTest,
		getActiveTest,
		answerQuestion,
		finishTest
	};
};