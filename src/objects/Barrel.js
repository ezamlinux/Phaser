class Barrel extends Phaser.Sprite{
    constructor(game, x, y, img){
        super(game, x, y, 'rolling_barrel');

        this.game.physics.arcade.enable(this);
        this.body.bounce.set(Math.random());
        this.body.gravity.y = 200;
        this.anchor.setTo(.5);
        this.body.velocity.x = -200;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(this.onHit, this);
        this.game.GLOBAL.barrels.add(this);
    }

    onHit(_barrel, _player){
        if(_player && _player.key == 'samourai'){ 
            if(_player.body.touching.down && _barrel.body.touching.up){
            }else {
                _player.getDamage(1);
                _barrel.kill();
            }
        }
    }
}

export default Barrel;