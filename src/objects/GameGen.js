import RegularCrate from './RegularCrate';
import BottleCrate from './BottleCrate';
import CoinCrate from './CoinCrate';
import Barrel from './Barrel';
import Katana from './Katana';
import ioClient from 'io/Socket';

class GameGen {
    constructor(_game){
        // 1 = Regular Crate , 2 = Barrels, 3 = CoinCrate  
        this.patterns = [
            [1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2],
            [3, 3, 3, 3, 3],
            [1, 2, 1, 2, 1]
        ]
        this.currentPattern;
        this.index = 0;
        this.game = _game;      
        this.posY = this.game.height - 128;
    }

    generateObstacle(_score){  
        let katanaMatch = false;
        if(ioClient.list){
            for(let i in ioClient.list){
                let item = ioClient.list[i];
                if(item.score == _score){
                    katanaMatch = true;
                    this.addKatana({'coins': item.coins, 'id': item._id});
                }
            }
        }

        if(!katanaMatch){
            if(!this.currentPattern){
                this.currentPattern = this.rand(this.patterns.length) - 1;
            }
            this.followPattern();
        }
    }

    followPattern(){
        let index = this.patterns[this.currentPattern][this.index];
        console.log(this.patterns[this.currentPattern], this.index);
        switch(index){
            case 1: 
                this.addCrate();
                break;
            case 2: 
                this.addBarrels();
                break;
            case 3:
                this.addCrate();
                break;
        }
        if(this.patterns[this.currentPattern][this.index + 1] == undefined){
            this.currentPattern = this.rand(this.patterns.length) - 1;
            this.index = 0;
        }
        else {    
            this.index +=1;
        }
    }

    rand(_x){
        return Math.floor(Math.random()* _x) + 1;
    }

    addKatana(_data){   
        new Katana(this.game, this.game.width, this.posY, _data.coins, _data.id)
    }

    addBarrels(){
        let rand = this.rand(128);
        new Barrel(this.game, this.game.width, this.posY - rand)
    }

    addCrate(){
        let rand = this.rand(10);
        let value =this.rand(10) > 5 ? 96 : 0
        if(rand >= 9){
            if(this.rand(10) >= 5){
                new CoinCrate(this.game, this.game.width, this.posY - value); 
            }
            else {
                new BottleCrate(this.game, this.game.width, this.posY - value);    
            }
        } else {
                new RegularCrate(this.game, this.game.width, this.posY);
        }
    }
}

export default GameGen;