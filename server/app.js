const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const morgan = require('morgan')

const initDatabase = require('./start/initDatabase')
const routes = require('./routes')

const app = express()

app.use(cors({
  origin: 'http://localhost:3100',
  credentials: true
}))

if (process.env.NODE_ENV === 'production') {
  console.log('Production:')
} else if (process.env.NODE_ENV === 'development') {
  console.log(chalk.yellowBright('Development mode'))
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/v2', routes)

const port = config.get('port') ?? 8080
const host = config.get('host') ?? 'localhost'
const mongoUri = config.get('mongoUri')
                       .replace('<user>', config.get('mongoUser'))
                       .replace('<password>', config.get('mongoPassword'))

async function start() {
  try {
    mongoose.connection.once('open', () => initDatabase())

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
