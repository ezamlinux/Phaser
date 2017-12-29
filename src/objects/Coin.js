let group;

class Coin extends Phaser.Sprite{
    constructor(game, x, y){
        super(game, x, y, 'ring');
        this.game.physics.arcade.enable(this);
        this.coinSound = this.game.add.audio('coin');
        this.coinSound.play();
        this.body.velocity.x = -200;
        this.body.gravity.y = 1000;
        this.body.bounce.setTo(.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;

        this.game.GLOBAL.coins.add(this);
    }

    onHit(){
        this.coinSound.play();   
        this.kill();
    }
}

export default Coin;