class Player extends Phaser.Sprite {
	constructor(game){
        super(game, game.world.height - 180, 64, 'samourai');   
        this.game.physics.arcade.enable(this);
        this.maxLife = 3;
        this.life = this.maxLife;
        this.bottleStock = {
            blue : 0,
            green : 0,
            yellow : 0,
            red : 0,
            max : 3
        };
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
        this.game.world.addChild(this);
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
        if(this.player.body.blocked.down || this.player.body.touching.down){
            this.player.animations.play('jump');     
            this.player.body.velocity.y = -500; 
            this.jumpSound.play();
        }
    }

    getDamage(_x){
        this.life -= _x;
    }

    useBottle(_bottle) {
        if(_bottle.keyCode == 49){
            if(this.player.bottleStock.green == this.player.bottleStock.max && this.player.life < this.player.maxLife){
                this.life += 1 ;
                this.bottleStock.green = 0;
            }
        }

        else if(_bottle.keyCode == 50){
            if (this.player.bottleStock.red == this.player.bottleStock.max && this.player.life < this.player.maxLife ){
                this.player.life = this.player.maxLife;
                this.player.bottleStock.red = 0;
            }
        }

        else if(_bottle.keyCode == 51){
            if(this.player.bottleStock.yellow == this.player.bottleStock.max){            
                this.player.maxLife += 1;
                this.arrayLife[this.player.arrayLife.length] = this.game.add.sprite(16 + ( this.player.arrayLife.length * 24 ), 16, 'lifeBar');
                this.player.life = this.maxLife;
                this.player.bottleStock.yellow = 0;
            }
        }
    }
}

export default Player;