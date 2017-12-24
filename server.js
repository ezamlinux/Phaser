const express = require('express')
var app = express();

app.use((req, res, next) => next());

app.use(express.static(__dirname + '/public'));

app.listen(5000, () => console.log('server Running at: http://localhost:5000'));