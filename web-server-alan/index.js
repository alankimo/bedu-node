const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
	const httpMethod = req.method
	let fecha = Date.now()

	switch(httpMethod) {
		case 'POST':
			res.writeHead(200, {
				'Content-Type': 'application/json',
			});

			let bodyPost = [];

			req.on('data', chunk => {
				bodyPost.push(chunk)
			});
			req.on('end', () => {
				bodyPost = Buffer.concat(bodyPost).toString();
				let output = fs.createWriteStream(`${ fecha }-save.txt`)
				output.write(bodyPost, 'UTF8')
				output.end()
			})

			return res.end()

			break
	}
	
	return res.end();

})

server.listen(8080, () => {
	console.log('Listening on port 8080');
});