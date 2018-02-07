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
                // random bottle color
                let rand = Math.floor(Math.random() * 4);
                
                new Bottle(this.game, _crate.x, _crate.y, rand);

                _crate.kill(_crate, _player)
            }
        }
    }
}

export default BottleCrate;