import Crate from 'objects/Crate';
import Coin from 'objects/Coin';

class CoinCrate extends Crate{
    constructor(game, x, y){
        let group = game.GLOBAL.coinCrates;
        super(game, x, y, group, 2);

        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(this.onHit, this);
    }

    onHit(_crate, _player){
        if(_player.key == 'samourai'){
            if(_player.body.touching.down && _crate.body.touching.up){
            }
            else {
                let rand =  Math.floor(Math.random() * 5) + 1;
                for(let i = 0; i < rand; i++){
                    new Coin(this.game, _crate.x  + 80 + (20 * i), _crate.y);
                }   
               super.onHit(_crate, _player);
            }
        }
    }
}

export default CoinCrate