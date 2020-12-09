require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(cors()); app.use((req, res, next) => {  res.header('Access-Control-Allow-Origin', '*');  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');  next(); });
app.get('/', function(req, res) {
    res.send('<h1>Bienvenido a mi servidor </h1>');
});

app.use(require('./routes/usuario'));
app.use(require('./routes/libros'));
app.use(require('./routes/login'));
app.use(require('./routes/prestamos'));

mongoose.connect('mongodb+srv://admin:12345678Aa@cluster0.wtcck.mongodb.net/library', {
    
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('El servidor esta en linea por el puerto ', process.env.PORT);
});