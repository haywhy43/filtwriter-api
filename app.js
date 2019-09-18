const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser')
const knex = require('knex');
const bcrypt = require('bcryptjs');
const Register = require('./controllers/register')

dotenv.config()

const port = process.env.PORT
const app = express();


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'ayomikun',
      password : '',
      database : 'filtwriter-db'
    }
});



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.get('/', (req, res) => {
    db.select('*').from('users').then(data =>{
        res.send(data)
    })
})

app.post('/register', (req, res) => {
    Register.handleRegister(req, res, db, bcrypt)
    // res.send(req.body)
})


app.listen(port, ()=>{
    console.log('localhost is listening on port ' + port)
})