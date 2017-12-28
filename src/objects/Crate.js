class Crate extends Phaser.Sprite{
    constructor(game, x, y , img, group){
        super(game, x, y, img);
        this.game.physics.arcade.enable(this);
        this.body.velocity.x = -200;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        group.add(this);
    }

    onHit(){
        this.kill();
    }
}

export default Crate;