const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
	const httpMethod = req.method
	let fecha = Date.now()
	//let fecha = '000999'
	let bodyPost = [];

	switch(httpMethod) {
		case 'POST':
			res.writeHead(200, {
				'Content-Type': 'application/json',
			});

			req.on('data', chunk => {
				bodyPost.push(chunk)
			});
			req.on('end', () => {
				//let bodyPostRender = JSON.parse(bodyPost)
				bodyPost = Buffer.concat(bodyPost).toString();
				let output = fs.createWriteStream(`${ fecha }-save.txt`)
				output.write(bodyPost, 'UTF8')
				output.end()

				//return res.end(fs.readFileSync(`./${ fecha }-save.txt`))
				//return res.end('{"response": true}')

				// return res.end('{ "response": true }')
				//return res.end('Response', JSON.parse(bodyPost))
				return res.end(fs.readFileSync(`${ fecha }-save.txt`))

			})


			break
	}
	
	return res.end();

})

server.listen(8080, () => {
	console.log('Listening on port 8080');
});