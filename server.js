const express = require('express');
const app = express()
const http = require('http').Server(app);

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/dist'));

http.listen(app.get('port'), () => console.log('server ready : http://localhost:%s', app.get('port')));