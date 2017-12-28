const express = require('express')
var app = express();

app.use((req, res, next) => next());
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/build'));

app.listen(app.get('port'), () => console.log('server Running'));