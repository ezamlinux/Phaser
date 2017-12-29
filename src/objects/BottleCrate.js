import Crate from './Crate';
import Bottle from './Bottle';

class BottleCrate extends Crate{
    constructor(game, x, y, img){
        let group = game.GLOBAL.bottleCrates;
        super(game, x, y, img, group);

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
                    new Bottle(this.game, _crate.x, _crate.y, 'blue');
                } else if(rand == 2){
                    new Bottle(this.game, _crate.x, _crate.y, 'red');
                } else if(rand == 3){
                    new Bottle(this.game, _crate.x, _crate.y, 'green');
                } else {
                    new Bottle(this.game, _crate.x, _crate.y, 'yellow');
                }
                _crate.kill(_crate, _player)
            }
        }
    }
}

export default BottleCrate;