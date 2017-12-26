var game = new Phaser.Game(800, 600, Phaser.AUTO);

var GameState = {
    // ---- Phaser function ---- //
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

        this.themeMusic = this.game.add.audio('taiko');
        this.jumpSound = this.game.add.audio('jump');
        this.coinSound = this.game.add.audio('coin');
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
        this.player = this.genPlayer();
        this.arrayLife = [];
        for (let i = 0; i < this.playerState.maxLife; i++){
            this.arrayLife[i] = this.game.add.sprite(16 + ( i * 24 ), 16, 'lifeBar');
        }
        // ---- EVENTS ---- //
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        var key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key1.onDown.add(this.useBottle, this);
    
        var key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key2.onDown.add(this.useBottle, this);
    
        var key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key3.onDown.add(this.useBottle, this);

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
        if(this.cursors.right.isDown && this.player.x + this.player.width < this.game.world.width){
            if (this.player.body.touching.down) this.player.animations.play('run');             
            this.player.body.velocity.x = 200;
        }
        else if (this.cursors.left.isDown){
            if (this.player.body.touching.down) this.player.animations.play('forward');
            this.player.body.velocity.x = -170;
        }
        else {
            this.player.body.velocity.x = 0;
            if (this.player.body.touching.down) this.player.animations.play('run'); 
        }
    },
    render : function(){
        // game.debug.body(this.player);
    },


    // ---- Function ---- 
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

    jump : function(){
        if(this.player.body.blocked.down || this.player.body.touching.down){
            this.player.animations.play('jump');    
            this.jumpSound.play();
            this.player.body.velocity.y = -500;
        }
    },

    updateInfo: function (){
        this.scoreText.text = this.score;
        for(let i = 0; i < this.arrayLife.length; i++){
            this.arrayLife[i].frame = i + 1 <= this.playerState.life ? 0 : 1;
        }
        this.green_jar.frame = this.playerState.bottleStock.green
        this.red_jar.frame = this.playerState.bottleStock.red
        this.blue_jar.frame = this.playerState.bottleStock.blue
        this.yellow_jar.frame = this.playerState.bottleStock.yellow
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

    useBottle : function(_bottle) {
        if(_bottle.keyCode == 49){
            if(this.playerState.bottleStock.green == this.playerState.bottleStockMax && this.playerState.life < this.playerState.maxLife){
                this.playerState.life += 1 ;
                this.playerState.bottleStock.green = 0;
            }
        }

        else if(_bottle.keyCode == 50){
            if (this.playerState.bottleStock.red == this.playerState.bottleStockMax && this.playerState.life < this.playerState.maxLife ){
                this.playerState.life = this.playerState.maxLife;
                this.playerState.bottleStock.red = 0;
            }
        }

        else if(_bottle.keyCode == 51){
            if(this.playerState.bottleStock.yellow == this.playerState.bottleStockMax){            
                this.playerState.maxLife += 1;
                this.arrayLife[this.arrayLife.length] = this.game.add.sprite(16 + ( this.arrayLife.length * 24 ), 16, 'lifeBar');
                this.playerState.life = this.playerState.maxLife;
                this.playerState.bottleStock.yellow = 0;
            }
        }
    },

    // -- adding
    genPlayer: function(){
        let obj = this.game.add.sprite(100, this.game.world.height - 180, 'samourai');
        this.playerState = {
            life : 3,
            maxLife : 3,
            bottleStock : {
                blue: 0,
                green: 0,
                yellow: 0,
                red : 0
            },
            bottleStockMax : 3
        };
        this.game.physics.arcade.enable(obj);   
        obj.inputEnabled = true;
        obj.scale.setTo(0.2);
        obj.body.setSize(330, 465, 250, 40);
        obj.body.collideWorldBounds = true;

        obj.body.gravity.y = 1200;

        // -- Animation -- //
        obj.animations.add('run', Phaser.Animation.generateFrameNames('Run_', 0, 7, '', 3), 30, false);
        obj.animations.add('forward', Phaser.Animation.generateFrameNames('Run_', 0, 7, '', 3).reverse(), 30, false);
        
        obj.animations.add('jump', ['JumpUP'], 15, false);
        obj.animations.add('fall', ['FallDown'], 15, false);
    
        return obj;
    },
    
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
            this.playerState.life -= 1;
            
            if(this.playerState.life <= 0) {
                this.playerState.life = 0;
                this.restart();
            } else {
                _crate.kill();
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
            this.playerState.life -= 1;
            
            if(this.playerState.life <= 0) {
                this.playerState.life = 0;
                this.restart();
            } else {
                _barrel.kill();
            }
        }
    },

    hitBottle: function(_player, _bottle){
        switch(_bottle.color){
            case 'green':
                if(this.playerState.bottleStock.green < this.playerState.bottleStockMax){  
                    this.playerState.bottleStock.green += 1;
                }
                break;
            case 'red':
                if(this.playerState.bottleStock.red < this.playerState.bottleStockMax){  
                    this.playerState.bottleStock.red += 1;
                }
                break;
            case 'yellow':
                if(this.playerState.bottleStock.yellow < this.playerState.bottleStockMax){  
                    this.playerState.bottleStock.yellow += 1;
                }
                break;
            case 'blue':
                if(this.playerState.bottleStock.blue < this.playerState.bottleStockMax) {  
                    this.playerState.bottleStock.blue += 1;
                } 
                if(this.playerState.bottleStock.blue == this.playerState.bottleStockMax) {
                    this.scoreMultiplicateur += 1;
                    this.playerState.bottleStock.blue = 0;
                }
                break;
        }
        _bottle.kill();
    },

    hitCoin: function(_player, _coin){
        this.coinSound.play();   
        _coin.kill();
        this.score += (1 * this.scoreMultiplicateur);
    }
}
// ---- Phaser launcher ---- //
this.game.state.add('this.gameState', GameState);
this.game.state.start('this.gameState');