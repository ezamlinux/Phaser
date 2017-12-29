class Crate extends Phaser.Sprite{
    constructor(game, x, y , img, group = null){
        super(game, x, y, img);

        this.game.physics.arcade.enable(this);
        this.body.velocity.x = -200;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(this.onHit, this);
        
        if(!group){
            this.game.GLOBAL.crates.add(this);
        }else {   
            group.add(this);
        }
    }

    onHit(_crate, _player){
        if(_player && _player.key == 'samourai'){ 
            if(_player.body.touching.down && _crate.body.touching.up){
            }else {
                _player.getDamage(1);
                _crate.kill();
            }
        }
    }
}

export default Crate;