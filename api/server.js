require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const morgan = require('morgan');
const https = require('https')
const fs = require('fs')
const app = express();

//npm install web-push -g
// {"publicKey":"BA5XUIJ5ug0_FJaCjfLYaHEb7U9CcUsN9brTXUbYtkVJ2dP7fdt1Ki_9VYNnkABKYArE7Ko9iSZTb8bXAXajQnY",
//"privateKey":"LIwvbDl8QDr9wAL2IKljvN-ViC0vjre7gUW6NORfu70
// "}

// app.use(cors());
app.use(cors({origin:true,credentials:true}));


const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies


// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Directorio Público
// app.use(express.static(publicPath));


// const sslServer = https.createServer(
//     {
//       key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//       cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
//     },
//     app
//   )

// Rutas 
const routes = require('./routes.js');
app.use('/api', routes );

 app.use('/', (req, res, next) => {
    res.send('Hello from SSL server')
  })

  

  app.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);

});