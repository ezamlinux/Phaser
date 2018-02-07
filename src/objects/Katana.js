class Katana extends Phaser.Sprite{
    constructor(game, x, y, _coins, _id) {
        super(game, x, y, 'katana');
        this.game.physics.arcade.enable(this);
        this.coins = _coins;
        this._id = _id;
        this.body.velocity.x = -200;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        
        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(this.onHit, this);
        this.game.GLOBAL.katana.add(this);
    }

    onHit(){
        this.kill();
    }
}

export default Katana;