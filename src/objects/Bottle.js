class Bottle extends Phaser.Sprite{
    constructor(game, x, y, color){
        super(game, x, y, color + '_flask');
        this.game.physics.arcade.enable(this);
        this.color = color; 
        this.body.velocity.x = -200;
        this.body.gravity.y = 1000;
        this.body.bounce.setTo(.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        this.game.GLOBAL.bottles.add(this);
    }

    onHit(){
        this.kill();
    }
}

export default Bottle;