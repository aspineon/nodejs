import async from 'async';
import logger from '../logger';

module.exports = APP => {
	function assignTest(request, response) {
		APP.database.assignTest()
			.then(response.sendStatus(200))
			.catch(response.json);
	}

	function getAssignedTests(request, response) {
		APP.database.getAssignedTests(request.user.id)
			.then((tests) => response.json(tests))
			.catch(response.json);
	}

	function beginTest(request, response) {
		APP.database.beginTest(request.user.id, request.body.testId)
			.then((tests) => response.sendStatus(200))
			.catch(response.json);
	}

	function getActiveTest(request, response) {
		APP.database.getActiveTest(request.user.id)
			.then((test) => response.json(test))
			.catch(response.json);
	}

	function answerQuestion(request, response) {
		APP.database.answerQuestion(request.user.id, request.params.id, request.body.answer)
			.then(() => response.sendStatus(200))
			.catch(response.json);
	}

	function finishTest(request, response) {
		APP.database.finishTest(request.user.id)
			.then(() => response.sendStatus(200))
			.catch(response.json);
	}

	APP.route('/tests')
		.all(APP.security.authenticationManager.authenticate())
		.post(assignTest)
		.get(getAssignedTests);

	APP.route('/tests/active')
		.all(APP.security.authenticationManager.authenticate())
		.post(beginTest)
		.get(getActiveTest)
		.delete(finishTest);

	APP.route('/user/tests/active/questions/:id')
		.all(APP.security.authenticationManager.authenticate())
		.post(answerQuestion);
};