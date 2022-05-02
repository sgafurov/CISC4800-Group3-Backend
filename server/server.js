const express = require('express')
const morgan = require('morgan')
const { db } = require('./db')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
// app.use(cors({
//     origin: '*',
//     methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
// }));
app.use(morgan('dev'))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.urlencoded({extended : true}))

// app.use('/api', require('./api/index'))

app.use('/user', require('./api/user'))

app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers','Origin ,X-Requested-With,Content-Type, Access,Authorization'
    );

    if(req.Method==='OPTIONS'){
        req.header('Access-Control-Allow-Methods','POST,PUT,PUSH,PATCH,DELETE,GET');
        return res.status(200).json({})
    }

    next()
})

db.sync().then(() =>{
    console.log('db synced')
    app.listen(PORT, () =>
        console.log(`Serving portmanteau since there were ports ${PORT}`)
    )
})