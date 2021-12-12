const {createServer} = require('http')
const app = require("./src/config/koa")
const PORT = process.env.PORT || 3000
const server = createServer(app.callback());
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const io = require('./src/config/websocket.js')(server);
const eventApply = require('./src/websockets/index');

eventApply(io)

if (cluster.isMaster) {
  console.log('Master process is running');

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
	
  });

} else {
  server.listen(PORT);

  console.log('Listening on port 8000');
}

