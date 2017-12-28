import Player from 'objects/Player';
import Bottle from 'objects/Bottle';

class GameState extends Phaser.State {
	preload() { 
		this.game.load.path = 'assets/';
        this.game.load.atlas('samourai', 'img/samourai.png', 'data/samourai.json');

        this.game.load.image('sky', 'img/sky.png');
        this.game.load.image('mountain', 'img/mountain.png');
        this.game.load.image('rolling_barrel', 'img/rolling_barrel.png');
        this.game.load.image('crate', 'img/crate.png');
        this.game.load.image('bottle_crate', 'img/bottle_crate.png');
        this.game.load.image('gold_crate', 'img/gold_crate.png');
        this.game.load.image('blue_flask', 'img/flask-blue.png');
        this.game.load.image('red_flask', 'img/flask-red.png');
        this.game.load.image('green_flask', 'img/flask-green.png');
        this.game.load.image('yellow_flask', 'img/flask-yellow.png');
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
        this.score = 0;
        this.scoreMultiplicateur = 1;
        this.scrollingVelocity = -250 ;
        // ---- ----//
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.jumpSound = this.game.add.audio('jump');
        this.coinSound = this.game.add.audio('coin');

        this.themeMusic = this.game.add.audio('taiko');
        this.themeMusic.loop = true;
        this.themeMusic.play();

        this.game.stage.backgroundColor ="#000000";
        this.bg_sky = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sky');
        this.bg_mountain= this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'mountain')
        this.floors = this.game.add.tileSprite(0, this.game.world.height - 64, this.game.world.width, 64, 'grass');
        this.game.physics.arcade.enable(this.floors);
        this.floors.enableBody = true;
        this.floors.body.immovable = true;

        this.scoreText = this.game.add.text(this.game.world.width / 2, 16, '', { fontSize: '32px', fill: '#000' });
        this.scoreText.anchor.setTo(.5, 0);
        this.blue_jar = this.game.add.sprite(this.game.world.width - 192, 16, 'blue_jar');
        this.green_jar = this.game.add.sprite(this.game.world.width - 144, 16, 'green_jar');     
        this.red_jar = this.game.add.sprite(this.game.world.width - 96, 16, 'red_jar');
        this.yellow_jar = this.game.add.sprite(this.game.world.width - 48, 16, 'yellow_jar');

        // -- GROUPS -- 
        // -- crates 
        this.crates = this.game.add.group();
        this.crates.enableBody = true;

        this.coinCrates = this.game.add.group();
        this.coinCrates.enableBody = true;

        this.bottleCrates = this.game.add.group();
        this.bottleCrates.enableBody = true;

        // -- barrels
        this.barrels = this.game.add.group();
        this.barrels.enableBody = true;

        // -- coins
        this.coins = this.game.add.group();
        this.coins.enableBody = true;

        // -- bottles
        this.bottles = this.game.add.group();
        this.bottles.enableBody = true;

        // -- function -- //
        this.player = new Player(this.game);
        this.arrayLife = [];

        for (let i = 0; i < this.player.maxLife; i++){
            this.arrayLife[i] = this.game.add.sprite(16 + ( i * 24 ), 16, 'lifeBar');
        }
        // ---- EVENTS ---- //
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.player.jump, this);

        var key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key1.onDown.add(this.player.useBottle, this);
    
        var key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key2.onDown.add(this.player.useBottle, this);
    
        var key3 = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key3.onDown.add(this.player.useBottle, this);

        this.timer = this.game.time.events.loop(1750, this.generateObstacle, this);
     }

    update(){
        // -- floor collide
        this.game.physics.arcade.collide(this.floors, this.player);
        this.game.physics.arcade.collide(this.floors, this.coins);
        this.game.physics.arcade.collide(this.floors, this.bottles);
        this.game.physics.arcade.collide(this.floors, this.crates);
        this.game.physics.arcade.collide(this.floors, this.coinCrates);
        this.game.physics.arcade.collide(this.floors, this.bottleCrates);
        this.game.physics.arcade.collide(this.floors, this.barrels);
       
        // -- coin collide crates & barrels
        // this.game.physics.arcade.collide(this.coins, this.crates);
        // this.game.physics.arcade.collide(this.coins, this.bottleCrates);
        // this.game.physics.arcade.collide(this.coins, this.coinCrates);

        // -- barrels collide
        this.game.physics.arcade.collide(this.barrels, this.crates, this.breakBoth, null, this);
        this.game.physics.arcade.collide(this.barrels, this.coinCrates, this.breakBoth, null, this);
        this.game.physics.arcade.collide(this.barrels, this.bottleCrates, this.breakBoth, null, this);
        this.game.physics.arcade.collide(this.barrels, this.barrels, this.breakBoth, null, this);

        // -- player collide
        this.game.physics.arcade.collide(this.player, this.crates, this.hitCrate, null, this);
        this.game.physics.arcade.collide(this.player, this.bottleCrates, this.hitBottleCrate, null, this);
        this.game.physics.arcade.collide(this.player, this.coinCrates, this.hitCoinCrate, null, this);      
        this.game.physics.arcade.collide(this.player, this.barrels, this.hitBarrels, null, this);
        this.game.physics.arcade.collide(this.player, this.coins, this.hitCoin, null, this);
        this.game.physics.arcade.collide(this.player, this.bottles, this.hitBottle, null, this);

        // -- animation
        
        this.bg_sky.tilePosition.x -= 0.20;
        this.bg_mountain.tilePosition.x -= 1;
        this.floors.tilePosition.x -= 2.5;
        this.barrels.forEach(item => item.angle -= 2 );

        this.updateInfo();
        // -- player event
        if(this.cursors.right.isDown){
			if (this.player.body.touching.down) this.player.run();
			else this.player.body.velocity.x = 150
        }
        else if (this.cursors.left.isDown){
			if (this.player.body.touching.down) this.player.forward();
			else this.player.body.velocity.x = -120; 
        }
        else {
            if (this.player.body.touching.down) this.player.idle();
        }
    }
    
    // ------------------ //
    // ---- Function ---- //
    // ------------------ //

    // -- generator & miscellanous
    restart(){
        this.themeMusic.stop();
        this.game.state.start('GameState');
    }

    createFloor(){
        let obj;
        for(let i = 0; i < this.game.world.width; i += 64){  
            obj = this.floors.create(i, this.game.world.height - 64, 'grass');
        }
    }

    updateInfo(){
        this.scoreText.text = this.score;
        for(let i = 0; i < this.arrayLife.length; i++){
            this.arrayLife[i].frame = i + 1 <= this.player.life ? 0 : 1;
        }
        this.green_jar.frame = this.player.bottleStock.green
        this.red_jar.frame = this.player.bottleStock.red
        this.blue_jar.frame = this.player.bottleStock.blue
        this.yellow_jar.frame = this.player.bottleStock.yellow
    }

    generateObstacle(){
        let seed = Math.floor(Math.random() * 10) +1;
        if( seed < 8){
            this.addCrate();
        }
        else if(seed >= 8 && seed != 10 ){
            this.addBarrels();
        }
    }

    // -- adding

    addBarrels(){
        let obj;
        
        let posY = this.game.height - 128;
        let rand = Math.floor(Math.random() * 128) + 1;

        obj = this.barrels.create(this.game.width, posY - rand, 'rolling_barrel');
        obj.body.bounce.set(Math.random());
        obj.body.gravity.y = 200;
        obj.anchor.setTo(.5);
        obj.body.velocity.x = this.scrollingVelocity;
        obj.checkWorldBounds = true;
        obj.outOfBoundsKill = true;
    }

    addCrate(){
        let obj;
        
        let rand = Math.floor(Math.random() * 10) + 1;
        let posY = this.game.height - 128;  
        let value = Math.floor(Math.random() * 10) + 1 > 5 ? 96 : 0
        if(rand >= 9){
            let rand = Math.floor(Math.random() * 10) + 1
            if(rand >= 5){
                obj = this.coinCrates.create(this.game.width, posY - value, 'gold_crate');   
            }
            else {
                obj = this.bottleCrates.create(this.game.width, posY - value, 'bottle_crate');    
            }
        } else {
                obj = this.crates.create(this.game.width, posY, 'crate');
        }
        
        obj.body.velocity.x = this.scrollingVelocity;
        obj.checkWorldBounds = true;
        obj.outOfBoundsKill = true;
    }

    addCoin(x, y){
        this.coinSound.play();
        let obj = this.coins.create(x , y , 'ring');
                
        obj.body.velocity.x = this.scrollingVelocity;
        obj.body.gravity.y = 1000;
        obj.body.bounce.setTo(.5);

        obj.checkWorldBounds = true;
        obj.outOfBoundsKill = true;
    }

    addBottle(x, y){
        let obj;
        let rand = Math.floor(Math.random() * 4) + 1;
       
        if(rand == 1){
			obj = new Bottle(this.game, x, y, 'blue', this.bottles);
        } else if(rand == 2){
            obj = new Bottle(this.game, x, y, 'red', this.bottles);
        } else if(rand == 3){
            obj = new Bottle(this.game, x, y, 'green', this.bottles);
        } else {
            obj = new Bottle(this.game, x, y, 'yellow', this.bottles);
        }
    }

    // -- HITTER

    breakBoth(_one, _two){
        _one.kill();
        _two.kill();
    }

    hitCrate(_player, _crate){
        if(_player.body.touching.down && _crate.body.touching.up){
        }
        else{
            _player.getDamage(1);
            _crate.kill();
            if(_player.life <= 0) {
                this.restart();
            }
        }
    }

    hitCoinCrate(_player, _crate){
        if(_player.body.touching.down && _crate.body.touching.up){
        }else {
            let rand =  Math.floor(Math.random() * 5) + 1;
            let posY = Math.floor(Math.random() * 32) + 1
            for(let i = 0; i < rand; i++){ 
                this.addCoin(_crate.x + 80 + (20 * i), _crate.y + posY);
            }
            _crate.kill();
        }
    }

    hitBottleCrate(_player, _crate){
        if(_player.body.touching.down && _crate.body.touching.up){
        }else {
            let posX = Math.floor(Math.random() * 64) + 1;
            this.addBottle(_crate.x + posX, _crate.y);
            _crate.kill();
        }
    }

    hitBarrels(_player, _barrel){
        if(_player.body.touching.down && _barrel.body.touching.up){
        }else {
            _player.getDamage(1);
            _barrel.kill();
            if(_player.life <= 0) {
                this.restart();
            }
        }
	}
	
    hitBottle(_player, _bottle){
        switch(_bottle.color){
            case 'green':
                if(_player.bottleStock.green < _player.bottleStock.max){  
                    _player.bottleStock.green += 1;
                }
                break;
            case 'red':
                if(_player.bottleStock.red <  _player.bottleStock.max){  
                    _player.bottleStock.red += 1;
                }
                break;
            case 'yellow':
                if( _player.bottleStock.yellow <  _player.bottleStock.max){  
                    _player.bottleStock.yellow += 1;
                }
                break;
            case 'blue':
                if( _player.bottleStock.blue <  _player.bottleStock.max) {  
                    _player.bottleStock.blue += 1;
                } 
                if( _player.bottleStock.blue ==  _player.bottleStock.max) {
                    this.scoreMultiplicateur += 1;
                    _player.bottleStock.blue = 0;
                }
                break;
        }
        _bottle.kill();
    }

    hitCoin(_player, _coin){
        this.coinSound.play();   
        _coin.kill();
        this.score += (1 * this.scoreMultiplicateur);
    }
}

export default GameState;
