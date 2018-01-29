const mongoose = require('mongoose');
const Souls = require('./Schema/Souls');
var db = mongoose.connect('mongodb://localhost:27017/test', err => {
    if(err) throw err;
});

let instance;

class Provider{
    constructor(){
        if(!instance){
            instance = this;
        }
        return instance;
    }

    getData(){
        return new Promise((resolve, reject) =>{
            Souls.find()
                .then(data => resolve(data))
                .catch(err =>  reject(err))
        })

    }
    remove(p_id){
        return new Promise((resolve, reject) => {
            Souls.findOneAndRemove({ _id : p_id})
                .then(() => Souls.find())
                    .then(data => resolve(data))
                    .catch(err => reject(err))
                .catch(err => reject(err))
        })
    }
    add(_player){
        return new Promise (( resolve, reject) => {
            let obj = new Souls({
                'score': _player.score,
                'coins': _player.coins
            })
            obj.save()
                .then(() => Souls.find())
                    .then(data => resolve(data))
                    .catch(err => reject(err))
                .catch(err => reject(err));
        })
    }
}

module.exports = Provider;