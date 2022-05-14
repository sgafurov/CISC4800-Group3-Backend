const express = require('express')
const morgan = require('morgan')
const { db } = require('./db')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const PORT = process.env.PORT || 8080

// app.use(express.static(__dirname + '/api'));

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true })); //true or false?
app.use(bodyParser.json());
// app.use('/api', require('./api/index'))

app.use('/', require('./api/user'))
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

db.sync().then(() => {
    console.log('db synced')
    app.listen(PORT, () =>
        console.log(`Listening on port ${PORT}`)
    )
})