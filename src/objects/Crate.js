class Crate extends Phaser.Sprite{
    constructor(game, x, y , img, group){
        super(game, x, y, img);

        this.game.physics.arcade.enable(this);
        this.body.velocity.x = -200;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(this.onHit, this);
        group.add(this);
    }

    onHit(_crate, _player){
        if(_player && _player.key == 'samourai'){ 
            if(_player.body.touching.down && _crate.body.touching.up){
            }else {
                _crate.kill();
            }
        }
    }
}

export default Crate;