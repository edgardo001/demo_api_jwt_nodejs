var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();
var port = process.env.PORT || 3525;

// Convierte una petici�n recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//============================================================
//jsonwebtoken
var diasExpiracion = 2;
var emision = Date.now();
var expiracion = new Date(emision + (diasExpiracion * 24 * 3600 * 1000));
var claims = {
	"iss": "DWS",
	"iat": Math.floor(emision / 1000) - 30,
	"exp": Math.floor(expiracion / 1000) - 30,
	"aud": null,
	"sub": "edgardo.a.v@gmail.com",
	"Nombres": "edgardo",
	"Apellidos": "vasquez",
	"Email": "edgardo.a.v@gmail.com",
	"Rut": "12345678-9",
	"Rol": [
		"administrador",
		"auditor",
		"usuario"
	]
}

var password = "password"
// sign with default (HMAC SHA256)
var token = jwt.sign(claims, password);

// verify a token symmetric - synchronous
var decoded = jwt.verify(token, password);
console.log(decoded.sub) // bar

// verify a token symmetric
jwt.verify(token, password, function(err, decoded) {
  console.log(decoded.sub) // bar
});

app.get('/', function(req, res){
	res.status(200).send({
	"token": token
	});
});

app.listen(port, function(){
console.log(`Server running in http://localhost:${port}`);
console.log('Defined routes:');
console.log(' [GET] http://localhost:3525/');
});
