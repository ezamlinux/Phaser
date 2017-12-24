var game = new Phaser.Game(800, 600, Phaser.AUTO);

var GameState = {
    // ---- Phaser function ---- //
    preload : function() { 
        this.game.load.path = 'assets/';
        this.game.load.atlas('samourai', 'img/samourai.png', 'data/samourai.json');

        this.game.load.image('background', 'img/background.png');
        this.game.load.image('roll', 'img/roll.png');
        this.game.load.image('crate', 'img/crate.png');
        this.game.load.image('bottle_crate', 'img/bottle_crate.png');
        this.game.load.image('gold_crate', 'img/gold_crate.png');
        this.game.load.image('blue_flask', 'img/flask-blue.png');
        this.game.load.image('red_flask', 'img/flask-red.png');
        this.game.load.image('green_flask', 'img/flask-green.png');
        this.game.load.image('yellow_flask', 'img/flask-yellow.png');
        this.game.load.image('ring', 'img/ring.png');
        this.game.load.image('grass', 'img/grass.png');

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
        this.bg = this.game.add.tileSprite(0, 0, 800, 600, 'background');

        this.scoreText = this.game.add.text(16, 0, '', { fontSize: '32px', fill: '#000' });
        this.lifeText = this.game.add.text(16, 32, '', { fontSize: '32px', fill: '#000' });
        this.game.add.text(16, 60, 'Potions :', { fontSize: '32px', fill: '#000' })
        this.blueBottleText = this.game.add.text(16, 96, '', { fontSize: '32px', fill: '#000' });
        this.greenBottleText = this.game.add.text(16, 128, '', { fontSize: '32px', fill: '#000' });
        this.redBottleText = this.game.add.text(16, 160, '', { fontSize: '32px', fill: '#000' });
        this.yellowBottleText = this.game.add.text(16, 192, '', { fontSize: '32px', fill: '#000' });

        // -- GROUPS -- //
        this.crates = this.game.add.group();
        this.crates.enableBody = true;

        this.coinCrates = this.game.add.group();
        this.coinCrates.enableBody = true;

        this.bottleCrates = this.game.add.group();
        this.bottleCrates.enableBody = true;

        this.loots = this.game.add.group();
        this.loots.enableBody = true;

        this.bottles = this.game.add.group();
        this.bottles.enableBody = true;

        this.floors = this.game.add.group();
        this.floors.enableBody = true;
        // -- function -- //
        this.createFloor();
        this.floors.setAll('body.immovable', true);
        this.player = this.genPlayer();
        // ---- EVENTS ---- //
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
       
        this.timer = game.time.events.loop(1750, this.addCrate, this); 
     },

    update : function() {      
        this.game.physics.arcade.collide(this.player, this.floors);
        this.game.physics.arcade.collide(this.loots, this.floors);
        this.game.physics.arcade.collide(this.bottles, this.floors);
        this.game.physics.arcade.collide(this.crates, this.floors);
        this.game.physics.arcade.collide(this.player, this.crates, this.hitCrate, null, this);
        this.game.physics.arcade.collide(this.player, this.bottleCrates, this.hitBottleCrate, null, this);
        this.game.physics.arcade.collide(this.player, this.coinCrates, this.hitCoinCrate, null, this);
        this.game.physics.arcade.collide(this.player, this.loots, this.hitCoin, null, this);
        this.game.physics.arcade.collide(this.player, this.bottles, this.hitBottle, null, this);
        this.bg.tilePosition.x -= 0.75;

        this.updateInfo();
        if(this.player.body.touching.down || this.player.body.blocked.down){
            this.player.animations.play('run'); 
        }

        if(this.cursors.right.isDown && this.player.x + this.player.width < this.game.world.width / 2){
            this.player.body.velocity.x = 200;
        }
        else if (this.cursors.left.isDown){
            this.player.body.velocity.x = -170;
        }
        else {
            this.player.body.velocity.x = 0;
        }
    },
    render : function(){
        game.debug.body(this.player);
    },
    // ---- Function ---- //
  
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
        this.lifeText.text = 'Life : ' + this.playerState.life;
        this.scoreText.text = 'Score : ' + this.score;
        this.blueBottleText.text = '- blue : ' + this.playerState.bottleStock.blue;
        this.greenBottleText.text = '- green : ' + this.playerState.bottleStock.green;
        this.redBottleText.text = '- red : ' + this.playerState.bottleStock.red;
        this.yellowBottleText.text = '- yellow : ' + this.playerState.bottleStock.yellow;
    },

    genPlayer: function(){
        let obj = this.game.add.sprite(100, this.game.world.height - 128, 'samourai');
        this.playerState = {
            life : 3,
            maxLife : 3,
            bottleStock : {
                blue: 0,
                green: 0,
                yellow: 0,
                red : 0
            }
        };
        this.game.physics.arcade.enable(obj);
        obj.width = 80; obj.height = 80;
        obj.body.setSize(400, 500, 180);
        obj.inputEnabled = true;
        obj.body.collideWorldBounds = true;

        obj.body.gravity.y = 1200;
        // -- Animation -- //
        obj.animations.add('run', Phaser.Animation.generateFrameNames('Run_', 0, 7, '', 3), 30, false);
        obj.animations.add('jump', ['JumpUP'], 15, false);
        obj.animations.add('fall', ['FallDown'], 15, false);
    
        return obj;
    },

    addCoin: function(x, y){
        let rand = Math.floor(Math.random() * 5) + 1;
        let obj;
        this.coinSound.play();

        for(let i = 0; i < rand; i++ ){
            obj = this.loots.create(x + 80 + (20 * i), y +  Math.floor(Math.random() * 32) + 1, 'ring');
            obj.body.velocity.x = -200;
            obj.body.gravity.y = 1000;
            obj.body.bounce.setTo(.5);
            obj.body.collideWorldBounds = true;
            obj.checkWorldBounds = true;
            obj.outOfBoundsKill = true;
        } 
    },

    addBottle: function(x, y){
        let obj;
        let rand = Math.floor(Math.random() * 4) + 1;
        let posX = Math.floor(Math.random() * 64) + 1

        if(rand == 1){
            obj = this.bottles.create(x + 80 + posX, y, 'blue_flask');
            obj.color = 'blue';
        } else if(rand == 2){
            obj = this.bottles.create(x + 80 + posX, y, 'red_flask');
            obj.color = 'red';
        } else if(rand == 3){
            obj = this.bottles.create(x + 80 + posX, y, 'green_flask');
            obj.color = 'green';
        } else {
            obj = this.bottles.create(x + 80 + posX, y, 'yellow_flask');
            obj.color = 'yellow';
        }

        obj.body.velocity.x = -300;
        obj.body.gravity.y = 1000;
        obj.body.bounce.setTo(.5);
        obj.body.collideWorldBounds = true;
        obj.checkWorldBounds = true;
        obj.outOfBoundsKill = true;
    },

    hitBottle: function(_player, _bottle){
        this.playerState.bottleStock[_bottle.color] += 1;
        if(this.playerState.bottleStock.green == 5){
            this.playerState.life = this.playerState.maxLife;
            this.playerState.bottleStock.green = 0;
        }

        else if(this.playerState.bottleStock.yellow == 5){
            this.scoreMultiplicateur += 1;
            this.playerState.bottleStock.yellow = 0;
        }
        _bottle.kill();
    },

    hitCoin: function(_player, _coin){
        _coin.kill();
        this.score += (1 * this.scoreMultiplicateur);
    },

    addCrate: function(){
        var obj;
        let pileFace = Math.floor(Math.random() * 10) + 1;
        let rand = Math.floor(Math.random() * 10) + 1;
        let posY = this.game.height - 128;  
        let value = Math.floor(Math.random() * 10) + 1 >= 5 ? 96 : 0

        if(pileFace >= 5){
            if(rand >= 9){
                let rand = Math.floor(Math.random() * 10) + 1
                if(rand >= 5){
                    obj = this.coinCrates.create(this.game.width, posY - value, 'gold_crate');   
                }
                else {
                    obj = this.bottleCrates.create(this.game.width, posY - value, 'bottle_crate');    
                }
            } else {
                obj = this.crates.create(this.game.width, posY - value, 'crate');
            }
        }

        else if(pileFace >= 3){
            obj = this.crates.create(this.game.width, posY - value, 'roll');
            obj.body.bounce.set(Math.random());
            obj.body.gravity.y = 200;
        }
        if(obj){         
            obj.body.velocity.x = this.scrollingVelocity;
            obj.checkWorldBounds = true;
            obj.outOfBoundsKill = true;
        }
    },

    hitCoinCrate: function(_player, _crate){
        if(_player.body.touching.down && _crate.body.touching.up){
        }else {
            this.addCoin(_crate.x, _crate.y);
            _crate.kill();
        }
    },

    hitBottleCrate: function(_player, _crate){
        if(_player.body.touching.down && _crate.body.touching.up){
        }else {
            this.addBottle(_crate.x, _crate.y);
            _crate.kill();
        }
    },

    hitCrate: function(_player, _crate){
        if(_player.body.touching.down && _crate.body.touching.up){
        }
        else{
            this.playerState.life -= 1;
            
            if(this.playerState.life <= 0) {
                this.playerState.life = 0;
                this.game.state.start('this.gameState');
            } else {
                _crate.kill();
            }
        }
    }
}
// ---- Phaser launcher ---- //
this.game.state.add('this.gameState', GameState);
this.game.state.start('this.gameState');