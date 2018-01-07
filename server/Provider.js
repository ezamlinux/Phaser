const fs = require('fs');
let instance;

class Provider{
    constructor(){
        if(!instance){
            this.path = __dirname + '\\deadList.json'
            instance = this;
        }
        return instance;
    }

    getDeadList(){
        return new Promise( (resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
                return err ? reject(err) : resolve(data);
            })
        })
    }

    addDead(_player){
        return new Promise( (resolve, reject) => {
            fs.readFile(this.path, 'utf8', (err, data) => {
                if(err) reject(err);
                let obj = JSON.parse(data);
                let replace = false;
                for(let i in obj.list){
                    let item = obj.list[i];
                    if(item.score == _player.score){
                        replace = true;
                        item.coins += _player.coins;
                    } 
                }
                if(!replace){
                    obj.list.push(_player);
                }
                obj = JSON.stringify(obj);
                fs.writeFile(this.path, obj, 'utf8', data => resolve(data));
            })
        })
    }
}

module.exports = Provider;