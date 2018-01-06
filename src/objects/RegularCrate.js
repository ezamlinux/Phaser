import Crate from 'objects/Crate'

class RegularCrate extends Crate{
    constructor(game, x, y){
        let group = game.GLOBAL.crates;
        super(game, x, y, group, 0);
        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(this.onHit, this);
    }

    onHit(_crate, _player){
        if(_player.key == 'samourai'){
            if(_player.body.touching.down && _crate.body.touching.up){
            }
            else {
                _player.getDamage(1);
            }   
            super.onHit(_crate, _player);
        }
    }
}

export default RegularCrate;