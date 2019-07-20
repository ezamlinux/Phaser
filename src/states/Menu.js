class Menu extends Phaser.State {
    preload () {
        this.load.path = 'assets/';
        this.game.load.image('sky', 'img/sky.png');
        this.game.load.image('mountain', 'img/mountain.png');
        this.game.load.image('runnerButton', 'img/menu/runnerButton.png');
        this.game.load.audio('rain', 'audio/rain.wav');
    }

    create () {
        this.bg_sky = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sky');
        this.bg_mountain= this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'mountain')

        var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'runnerButton', this.launchEndlessRunner, this);
        button.anchor.setTo(.5);

        var rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        rKey.onDown.addOnce(this.launchEndlessRunner, this);


        this.game.GLOBAL.themeMusic = this.game.add.audio('rain');
        this.game.GLOBAL.themeMusic.loop = true;
        this.game.GLOBAL.themeMusic.volume = 0.2;
        this.game.GLOBAL.themeMusic.play();
    }

    update () {
        this.bg_sky.tilePosition.x -= 0.20;
        this.bg_mountain.tilePosition.x -= 1;
    }

    launchEndlessRunner () {
        this.game.GLOBAL.themeMusic.stop();
        this.game.state.start('endlessRunner');
    }
}

export default Menu;