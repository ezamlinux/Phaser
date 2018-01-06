import Crate from './Crate';
import Bottle from './Bottle';

class BottleCrate extends Crate{
    constructor(game, x, y){
        let group = game.GLOBAL.bottleCrates;
        super(game, x, y, group, 1);

        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(this.onHit, this);
    }

    onHit(_crate, _player){
        if(_player.key == 'samourai'){  
            if(_player.body.touching.down && _crate.body.touching.up){
            }
            else{
                let rand = Math.floor(Math.random() * 4) + 1;
            
                if(rand == 1){
                    new Bottle(this.game, _crate.x, _crate.y, 0);
                } else if(rand == 2){
                    new Bottle(this.game, _crate.x, _crate.y, 2);
                } else if(rand == 3){
                    new Bottle(this.game, _crate.x, _crate.y, 1);
                } else {
                    new Bottle(this.game, _crate.x, _crate.y, 3);
                }
                _crate.kill(_crate, _player)
            }
        }
    }
}

export default BottleCrate;