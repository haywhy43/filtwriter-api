const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser')
const knex = require('knex');
const bcrypt = require('bcryptjs');
const verifyToken = require("./middleware/jwt");
const Home = require('./controllers/homeController')
const Register = require('./controllers/register');
const Login = require('./controllers/login');

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



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', 
    verifyToken.checkToken,
    Home.homeController
);

app.post('/register', (req, res) => {
    Register.handleRegister(req, res, db, bcrypt)
    // res.send(req.body)
});

app.post('/login', (req, res) => {
    Login.handleLogin(req, res, db, bcrypt)
    // res.send(req.body)
});


app.listen(port, ()=>{
    console.log('localhost is listening on port ' + port)
});