class Crate extends Phaser.Sprite {
    constructor (game, x, y, group, _frame) {
        super(game, x, y, 'crates');

        this.game.physics.arcade.enable(this);
        this.frame = _frame;
        this.body.velocity.x = -200;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(this.onHit, this);
        group.add(this);
    }

    onHit (_crate, _player) {
        if (_player && _player.key == 'samourai' && ! (_player.body.touching.down && _crate.body.touching.up)) {
            _crate.kill();
        }
    }
}

export default Crate;