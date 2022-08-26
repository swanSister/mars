var express = require('express');
var server = express();
var bodyParser = require('body-parser')
server.use(bodyParser.json());
var cors = require('cors');

server.use(cors())


server.use('/', express.static(__dirname + '/dist'))


server.listen(3000,function(){
  console.log("3000 cors ")
})