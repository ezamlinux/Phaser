import io from 'socket.io-client';
let instance;

class ioClient {
    constructor(){
        if(!instance){
            this.socket = io();
            this.list;
            this.socket.on('update', data => this.list = data)
            this.getData();
            instance = this;
        }
        return instance
    }
    
    getData(){
       this.socket.emit('getData', data => this.list = data);
    }

    playerHitKatana(_katana){
        this.socket.emit('deleteKatana', _katana.id);
    }
    
    playerDead(data){
        this.socket.emit('dead', data);
    }
}

export default new ioClient();
