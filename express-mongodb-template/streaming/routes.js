import authenticationManager from '../security/authenticationManager';
import logger from '../logger';
import fs from 'fs';
import path from 'path';

function createStream(request, response) {
	let file = `${__dirname}/${request.params.id}`;
	fs.stat(file, function (err, stats) {
		if (err) {
			if (err.code === 'ENOENT') {
				return response.sendStatus(404);
			} 
			return response.sendStatus(500)
		}
		let range = request.headers.range;
		if (!range) {
			return response.sendStatus(416)
		}
		let positions = range.replace(/bytes=/, "").split("-");
		let start = parseInt(positions[0], 10);
		let file_size = stats.size;
		let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;
		let chunksize = (end - start) + 1;
		let head = {
			"Content-Range": "bytes " + start + "-" + end + "/" + file_size,
			"Accept-Ranges": "bytes",
			"Content-Length": chunksize,
			"Content-Type": "video/mp4"
		}
		response.writeHead(206, head);
		let stream_position = {
			start: start,
			end: end
		}
		let stream = fs.createReadStream(file, stream_position)
		stream.on("open", function () {
			stream.pipe(response);
		})
		stream.on("error", function (err) {
			return response.json(err);
		});
	});
}

export default {
	initialize: (app) => {
		app.route('/video/:id')
			//.all(authenticationManager.authenticate())
			.get(createStream);
	}
};