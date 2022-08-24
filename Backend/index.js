const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config({path: '.env'})
const bodyParser = require('body-parser')

mongoose.Promise= global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser:true 
});

const app = express();

//Habilitamos bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}));

app.use('/', routes());

app.use(express.static('uploads'))

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log("Funcionando en: " + port)
});