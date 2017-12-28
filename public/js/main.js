var game = new Phaser.Game(800, 600, Phaser.AUTO);

// --player
class Player extends Phaser.Sprite{
    constructor(game){
        super(game, game.world.height - 180, 64, 'samourai');   
        game.physics.arcade.enable(this);
        this.maxLife = 3;
        this.life = this.maxLife;
        this.bottleStock = {
            blue : 0,
            green : 0,
            yellow : 0,
            red : 0,
            max : 3
        }
        this.inputEnabled = true;
        this.scale.setTo(0.2);
        this.body.setSize(330, 465, 250, 40);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 1200;
        // -- Animation -- //
        this.animations.add('run', Phaser.Animation.generateFrameNames('Run_', 0, 7, '', 3), 30, false);
        this.animations.add('forward', Phaser.Animation.generateFrameNames('Run_', 0, 7, '', 3).reverse(), 30, false);
        this.animations.add('jump', ['JumpUP'], 15, false);
        this.animations.add('fall', ['FallDown'], 15, false);
    }
    idle() {
        this.body.velocity.x = 0;
        this.animations.play('run');
    }
    run(){
        this.body.velocity.x = 200;
        this.animations.play('run');
    }
    forward(){
        this.body.velocity.x = -170;
        this.animations.play('forward');
    }

    jump(){
        if(this.body.blocked.down || this.body.touching.down){
            this.animations.play('jump');    
            this.jumpSound.play();
            this.body.velocity.y = -500;
        }
    }

    getDamage(_x){
        this.life -= _x;
    }

    useBottle(_bottle) {
        if(_bottle.keyCode == 49){
            if(this.bottleStock.green == this.bottleStock.max && this.life < this.maxLife){
                this.life += 1 ;
                this.bottleStock.green = 0;
            }
        }

        else if(_bottle.keyCode == 50){
            if (this.bottleStock.red == this.bottleStock.max && this.life < this.maxLife ){
                this.life = this.maxLife;
                this.bottleStock.red = 0;
            }
        }

        else if(_bottle.keyCode == 51){
            if(this.bottleStock.yellow == this.bottleStock.max){            
                this.maxLife += 1;
                this.arrayLife[this.arrayLife.length] = this.game.add.sprite(16 + ( this.arrayLife.length * 24 ), 16, 'lifeBar');
                this.life = this.maxLife;
                this.bottleStock.yellow = 0;
            }
        }
    }
}
// --- Phaser GameState
var GameState = {
    preload : function() { 
        this.game.load.path = 'assets/';
        this.game.load.atlas('samourai', 'img/samourai.png', 'data/samourai.json');

        this.game.load.image('background', 'img/background.png');
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
    },

    create : function() {
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
        this.bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');

        this.floors = this.game.add.tileSprite(0, this.game.world.height - 64, this.game.world.width, 64, 'grass');
        this.game.physics.enable(this.floors, Phaser.Physics.ARCADE);
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
        this.game.add.existing(this.player);
        this.arrayLife = [];

        for (let i = 0; i < this.player.maxLife; i++){
            this.arrayLife[i] = this.game.add.sprite(16 + ( i * 24 ), 16, 'lifeBar');
        }
        // ---- EVENTS ---- //
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.player.jump, this);

        var key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key1.onDown.add(this.player.useBottle, this);
    
        var key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key2.onDown.add(this.player.useBottle, this);
    
        var key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key3.onDown.add(this.player.useBottle, this);

        this.timer = game.time.events.loop(1750, this.generateObstacle, this);
     },

    update : function() {
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
        this.bg.tilePosition.x -= 0.75;
        this.floors.tilePosition.x -= 2.5;
        this.barrels.forEach(item => item.angle -= 2 );

        this.updateInfo();
        // -- player event
        if(this.cursors.right.isDown ){
            if (this.player.body.touching.down) this.player.run();           
        }
        else if (this.cursors.left.isDown){
            if (this.player.body.touching.down) this.player.forward();
        }
        else {
            if (this.player.body.touching.down) this.player.idle();
        }
    },
    
    // ------------------ //
    // ---- Function ---- //
    // ------------------ //

    // -- generator & miscellanous
    restart: function(){
        this.themeMusic.stop();
        this.game.state.start('this.gameState');
    },

    createFloor : function(){
        let obj;
        for(let i = 0; i < this.game.world.width; i += 64){  
            obj = this.floors.create(i, this.game.world.height - 64, 'grass');
        }
    },

    updateInfo: function (){
        this.scoreText.text = this.score;
        for(let i = 0; i < this.arrayLife.length; i++){
            this.arrayLife[i].frame = i + 1 <= this.player.life ? 0 : 1;
        }
        this.green_jar.frame = this.player.bottleStock.green
        this.red_jar.frame = this.player.bottleStock.red
        this.blue_jar.frame = this.player.bottleStock.blue
        this.yellow_jar.frame = this.player.bottleStock.yellow
    },

    generateObstacle: function(){
        let seed = Math.floor(Math.random() * 10) +1;
        if( seed < 8){
            this.addCrate();
        }
        else if(seed >= 8 && seed != 10 ){
            this.addBarrels();
        }
    },

    // -- adding

    addBarrels: function(){
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
    },

    addCrate: function(){
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
    },

    addCoin: function(x, y){
        this.coinSound.play();
        let obj = this.coins.create(x , y , 'ring');
                
        obj.body.velocity.x = this.scrollingVelocity;
        obj.body.gravity.y = 1000;
        obj.body.bounce.setTo(.5);

        obj.checkWorldBounds = true;
        obj.outOfBoundsKill = true;
    },

    addBottle: function(x, y){
        let obj;
        let rand = Math.floor(Math.random() * 4) + 1;
       
        if(rand == 1){
            obj = this.bottles.create(x , y, 'blue_flask');
            obj.color = 'blue';
        } else if(rand == 2){
            obj = this.bottles.create(x, y, 'red_flask');
            obj.color = 'red';
        } else if(rand == 3){
            obj = this.bottles.create(x, y, 'green_flask');
            obj.color = 'green';
        } else {
            obj = this.bottles.create(x, y, 'yellow_flask');
            obj.color = 'yellow';
        }

        obj.body.velocity.x =  this.scrollingVelocity;
        obj.body.gravity.y = 1000;
        obj.body.bounce.setTo(.5);
        obj.body.collideWorldBounds = true;
        obj.checkWorldBounds = true;
        obj.outOfBoundsKill = true;
    },

    // -- HITTER

    breakBoth: function(_one, _two){
        _one.kill();
        _two.kill();
    },

    hitCrate: function(_player, _crate){
        if(_player.body.touching.down && _crate.body.touching.up){
        }
        else{
            _player.getDamage(1);
            _crate.kill();
            if(_player.life <= 0) {
                this.restart();
            }
        }
    },

    hitCoinCrate: function(_player, _crate){
        if(_player.body.touching.down && _crate.body.touching.up){
        }else {
            let rand =  Math.floor(Math.random() * 5) + 1;
            let posY = Math.floor(Math.random() * 32) + 1
            for(let i = 0; i < rand; i++){ 
                this.addCoin(_crate.x + 80 + (20 * i), _crate.y + posY);
            }
            _crate.kill();
        }
    },

    hitBottleCrate: function(_player, _crate){
        if(_player.body.touching.down && _crate.body.touching.up){
        }else {
            let posX = Math.floor(Math.random() * 64) + 1;
            this.addBottle(_crate.x + posX, _crate.y);
            _crate.kill();
        }
    },

    hitBarrels: function(_player, _barrel){
        if(_player.body.touching.down && _barrel.body.touching.up){
            // if(this.cursors.left.isDown){
            //     _barrel.x = _player.x + _player.width / 2;
            //     _barrel.y = _player.y + _player.height + _barrel.height;
            //     _barrel.accelaration = _player.accelaration;
            // }
        }else {
            _player.getDamage(1);
            _barrel.kill();
            if(_player.life <= 0) {
                this.restart();
            }
        }
    },
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
                    _player.scoreMultiplicateur += 1;
                    _player.bottleStock.blue = 0;
                }
                break;
        }
        _bottle.kill();
    },

    hitCoin(_player, _coin){
        this.coinSound.play();   
        _coin.kill();
        this.score += (1 * this.scoreMultiplicateur);
    }
}
// ---- Phaser launcher ---- //
this.game.state.add('this.gameState', GameState);
this.game.state.start('this.gameState');