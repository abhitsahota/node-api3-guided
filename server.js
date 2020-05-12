const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')
const morgan = require('morgan')

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());
server.use(helmet())
// server.use(morgan('tiny'))

server.use(logger)


server.use('/api/hubs', hubsRouter)

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function logger(req ,res, next) {
  console.log(req.method)
  next()
}

function lockOut(req, res, next) {
  let seconds = new Date().getSeconds()

  if ( seconds % 3 === 0 ) {
    res.status(403).json({ message: 'api is down' })
  } else {
    next()
  }
}

module.exports = server;
