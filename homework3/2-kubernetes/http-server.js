var http = require('http');
var handleRequest = function(request, response) {
  response.writeHead(200);
  const service = process.env.NAME;
  response.end(`This is ${service}`);
};
var helloServer = http.createServer(handleRequest);
helloServer.listen(8080);
