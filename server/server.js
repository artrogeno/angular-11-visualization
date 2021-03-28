const jsonServer = require('json-server')
const server = jsonServer.create()
const info = jsonServer.router('info.json')
const geo = jsonServer.router('geo.json')
const users = jsonServer.router('users.json')
const middlewares = jsonServer.defaults()
const utils = require('./utils')

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  if (utils.isAuthorized(req)) {
    next()
  } else {
    res.sendStatus(401)
  }
})

// Use default router
server.use('/api/signin', (req, res) => {
  const token = utils.login(req)
  if (token) {
    res.status(200).json({ token })
  } else {
    res.sendStatus(401)
  }
})


server.use('/api/info', info)

server.use('/api/geo', geo)

server.use('/api/system', users)


server.listen(3001, () => {
  console.log('JSON Server is running')
})