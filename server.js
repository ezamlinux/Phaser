const express = require('express');
const mongoose = require('mongoose');

const app = express()
const http = require('http').Server(app);
const io = require('socket.io').listen(http);

const provider = require('./server/Provider.js');

var db = new provider();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/dist'));

io.on('connection', socket => {
    socket.on('getData', callback => {
        db.getData()
            .then(data => callback(data));
    })

    socket.on('dead', _player => {
        db.add(_player)
            .then(data => io.emit('update', data));
    });

    socket.on('deleteKatana', _id => {
        db.remove(_id)
            .then(data => io.emit('update', data));
    })
});

http.listen(app.get('port'), () => console.log('server Running'));