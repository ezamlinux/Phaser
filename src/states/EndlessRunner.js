import Player from 'objects/Player';
import GameGen from 'objects/GameGen';
import ioClient from 'io/Socket';

class EndlessRunner extends Phaser.State {
	preload() {
        this.load.path = "assets/";
        this.game.load.atlas('samourai', 'img/player.png', 'data/player.json');
        this.game.load.image('sky', 'img/sky.png');
        this.game.load.image('mountain', 'img/mountain.png');
        this.game.load.image('rolling_barrel', 'img/rolling_barrel.png');
        this.game.load.image('katana', 'img/brokenKatana.png');
        this.game.load.spritesheet('flasks', 'img/Flasks.png', 24, 24);
        this.game.load.spritesheet('crates', 'img/Crates.png', 64, 64);
        this.game.load.image('ring', 'img/ring.png');
        this.game.load.image('grass', 'img/grass.png');
        this.game.load.spritesheet('lifeBar', 'img/lifeBar.png', 16, 32);
        this.game.load.spritesheet('green_jar', 'img/green_jar.png', 32, 32);
        this.game.load.spritesheet('red_jar', 'img/red_jar.png', 32, 32);
        this.game.load.spritesheet('yellow_jar', 'img/yellow_jar.png', 32, 32);
        this.game.load.spritesheet('blue_jar', 'img/blue_jar.png', 32, 32);
        this.game.load.audio('taiko', 'audio/taiko-drums.ogg');
        this.game.load.audio('jump', 'audio/jump.wav');
        this.game.load.audio('coin', 'audio/coin.wav');
    }

    create() {
        // ---- global params ---- //
        this.scoreMultiplicateur = 1;
        // ---- ----//
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.GLOBAL.themeMusic = this.game.add.audio('taiko');
        this.game.GLOBAL.themeMusic.loop = true;
        this.game.GLOBAL.themeMusic.play();

        this.game.stage.backgroundColor ="#000000";
        this.bg_sky = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sky');
        this.bg_mountain= this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'mountain')
        this.floors = this.game.add.tileSprite(0, this.game.world.height - 64, this.game.world.width, 64, 'grass');
        this.game.physics.arcade.enable(this.floors);
        this.floors.enableBody = true;
        this.floors.body.immovable = true;

        this.scoreText = this.game.add.text(this.game.world.width / 2, 16, this.score, {  fontSize: '32px', fill: '#000' });
        this.scoreText.anchor.setTo(.5, 0);

        this.blue_jar = this.game.add.sprite(this.game.world.width - 192, 16, 'blue_jar');
        this.green_jar = this.game.add.sprite(this.game.world.width - 144, 16, 'green_jar');     
        this.red_jar = this.game.add.sprite(this.game.world.width - 96, 16, 'red_jar');
        this.yellow_jar = this.game.add.sprite(this.game.world.width - 48, 16, 'yellow_jar');

        // -- GROUPS -- 
        // -- crates 
        this.game.GLOBAL.crates = this.game.add.group();
        this.game.GLOBAL.coinCrates = this.game.add.group();
        this.game.GLOBAL.bottleCrates = this.game.add.group();

        // -- barrels
        this.game.GLOBAL.barrels = this.game.add.group();

        // -- coins
        this.game.GLOBAL.coins = this.game.add.group();

        // -- bottles
        this.game.GLOBAL.bottles = this.game.add.group();
       
        // -- Katana 
        this.game.GLOBAL.katana = this.game.add.group();

        // -- function -- //
        this.player = new Player(this.game);
        this.gameGen = new GameGen(this.game);
        this.arrayLife = [];

        for (let i = 0; i < this.player.maxLife; i++){
            this.arrayLife[i] = this.game.add.sprite(16 + ( i * 24 ), 16, 'lifeBar');
        }

        this.coinsText = this.game.add.text(16, 48, this.player.coins, { fontSize: '32px', fill: '#FCFA22' });

        // ---- EVENTS ---- //
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.player.jump, this.player);
        var key4 = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        key4.onDown.add(this.player.jump, this.player);

        var key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key1.onDown.add(this.player.useBottle, this);
    
        var key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key2.onDown.add(this.player.useBottle, this);
    
        var key3 = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key3.onDown.add(this.player.useBottle, this);

        this.timer = this.game.time.events.loop(2000, () => {
            this.player.score += 1;
            this.gameGen.generateObstacle(this.player.score);
        }, this.gameGen);
     }

    update(){
        this.updateHUD();
        // -- floor collide
        this.game.physics.arcade.collide(this.floors, this.player);
        this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.coins);
        this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.bottles);
        this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.crates);
        this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.coinCrates);
        this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.bottleCrates);
        this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.barrels);
        this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.katana);

        // -- barrels collide
        this.game.physics.arcade.collide(this.game.GLOBAL.barrels, this.game.GLOBAL.crates, this.breakBoth, null, this);
        this.game.physics.arcade.collide(this.game.GLOBAL.barrels, this.game.GLOBAL.coinCrates, this.breakBoth, null, this);
        this.game.physics.arcade.collide(this.game.GLOBAL.barrels, this.game.GLOBAL.bottleCrates, this.breakBoth, null, this);
        this.game.physics.arcade.collide(this.game.GLOBAL.barrels, this.game.GLOBAL.barrels, this.breakBoth, null, this);

        // -- player collide
        this.game.physics.arcade.collide(this.player, this.game.GLOBAL.crates, this.game.GLOBAL.crates.onHit, null, this);
        this.game.physics.arcade.collide(this.player, this.game.GLOBAL.bottleCrates, this.game.GLOBAL.bottleCrates.onHit, null, this);
        this.game.physics.arcade.collide(this.player, this.game.GLOBAL.coinCrates, this.game.GLOBAL.coinCrates.onHit, null, this);      
        this.game.physics.arcade.collide(this.player, this.game.GLOBAL.barrels, this.game.GLOBAL.barrels.onHit, null, this);       
        this.game.physics.arcade.overlap(this.player, this.game.GLOBAL.katana, this.player.hitKatana, null, this);
        this.game.physics.arcade.overlap(this.player, this.game.GLOBAL.coins, this.player.hitCoin, null, this);
        this.game.physics.arcade.overlap(this.player, this.game.GLOBAL.bottles, this.player.hitBottle, null, this);

        // -- animation
        this.bg_sky.tilePosition.x -= 0.20;
        this.bg_mountain.tilePosition.x -= 1;
        this.floors.tilePosition.x -= 2.5;
        this.game.GLOBAL.barrels.forEach(item => item.angle -= 1 );


        // -- player event
        if(this.cursors.right.isDown){
			if (this.player.body.touching.down) {
                this.player.animations.play('run');
                this.player.body.velocity.x = 200;
            }
			else {
                this.player.body.velocity.x = 150;
            }
        }
        else if (this.cursors.left.isDown){
			if (this.player.body.touching.down){
                this.player.animations.play('forward');
                this.player.body.velocity.x = -150;
            } 
			else{
                this.player.body.velocity.x = -120; 
            } 
        }
        else {
            if (this.player.body.touching.down){            
                this.player.animations.play('run');
                this.player.body.velocity.x = 0;
            }
        }
    }
    // ------------------ //
    // ---- Function ---- //
    // ------------------ //

    // -- generator & miscellanous

    createFloor(){
        for(let i = 0; i < this.game.world.width; i += 64){  
            this.floors.create(i, this.game.world.height - 64, 'grass');
        }
    }

    updateHUD(){
        this.scoreText.text = this.player.score;
        this.coinsText.text = this.player.coins;
        for(let i = 0; i < this.arrayLife.length; i++){
            this.arrayLife[i].frame = i + 1 <= this.player.life ? 0 : 1;
        }
        this.green_jar.frame = this.player.bottleStock.green
        this.red_jar.frame = this.player.bottleStock.red
        this.blue_jar.frame = this.player.bottleStock.blue
        this.yellow_jar.frame = this.player.bottleStock.yellow
    }

    // -- HITTER
    breakBoth(_one, _two){
        _one.kill();
        _two.kill();
    }
}

export default EndlessRunner;
