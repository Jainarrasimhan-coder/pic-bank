//Third party modules

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/Keys')
const port = process.env.PORT || 5000;
// const cors = require('cors')

//mongo db connection
mongoose.connect(MONGOURI)

mongoose.connection.on('connected', () => {
    console.log("connected to mongo ok vayahoo yeahh")
})
mongoose.connection.on('error', (err) => {
    console.log("error in connection", err)
})

require('./model/user')
require('./model/post')

//middleware
app.use(express.json())
    // app.use(cors())

app.use(require('./routes/auth'))
app.use(require('./routes/post'))

if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//port setup
app.listen(port, () => {
    console.log(`app is  running at port ${port}`)
})