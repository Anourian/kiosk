var express = require('express');
var cors = require('cors');
var port = 7000;
var app = express();
var bodyParser = require('body-parser');
var requestHandler = require('./requestHandler');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(cors());
app.put('/appointments', requestHandler.confirmAppointment);
app.post('/appointments', requestHandler.createAppointment);
app.get('/appointments:code?', requestHandler.getAppointments);
app.post('/create', requestHandler.createUser)
app.post('/login', requestHandler.login);
app.post('/token', requestHandler.token);
app.put('/updateuser', requestHandler.updateUser);

app.listen(port);
console.log('listening to port:', port);

