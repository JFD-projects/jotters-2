const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const morgan = require('morgan')
const path = require('path')

const initDatabase = require('./start/initDatabase')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

let port
let host

if (process.env.NODE_ENV === 'production') { // PRODUCTION
  console.log('Production mode')

  app.use(cors({
    origin: process.env.origin ?? 'http://localhost:8080',
    credentials: true
  }))

  app.use('/api/v2', routes)
  app.use('/', express.static(path.join(__dirname, 'client-build')))

  const indexPath = path.join(__dirname, 'client-build', 'index.html')
  app.get('*', ((req, res) => {
    res.sendFile(indexPath)
  }))

  port = process.env.PORT ?? 8080
  host = '0.0.0.0'

} else if (process.env.NODE_ENV === 'development') { // DEVELOPMENT
  console.log(chalk.yellowBright('Development mode'))

  app.use(morgan('dev'))
  app.use(cors({
    origin: 'http://localhost:3100',
    credentials: true
  }))

  app.use('/api/v2', routes)

  port = config.get('port') ?? 8080
  host = config.get('host') ?? 'localhost'

}


async function start() {
  try {
    mongoose.connection.once('open', () => initDatabase())

    const mongoUri = (process.env.mongoUri ?? config.get('mongoUri'))
    .replace('<user>', process.env.mongoUser ?? config.get('mongoUser'))
    .replace('<password>', process.env.mongoPassword ?? config.get('mongoPassword'))

    const con = await mongoose.connect(mongoUri)
    console.log(chalk.cyanBright('MongoDB connection on host:'), chalk.blueBright(con.connections[0].host))

    app.listen(port, host, () => {
      console.log(chalk.cyanBright(`Server started on: http://${host}:${port}`))
    })
  } catch (err) {
    console.log(chalk.red(err.message))
    process.exit(1)
  }
}

start()
