import Coin from './Coin';

class Player extends Phaser.Sprite {
	constructor(game){
        super(game, 32, game.world.height - 200, 'samourai');   

        this.game.physics.arcade.enable(this);      
        this.jumpSound = this.game.add.audio('jump');
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

    jump(){
        if(this.body.blocked.down || this.body.touching.down){    
            this.jumpSound.play();
            this.animations.play('jump');     
            this.body.velocity.y = -500; 
        }
    }

    getDamage(_x){
        this.life -= _x;
        if(this.life == 0){
            // infinite credits
            this.game.GLOBAL.themeMusic.stop();
            this.game.state.start('menu');
        }
    }

    useBottle(_bottle) {
        if(_bottle.keyCode == 49){
            if(this.player.bottleStock.green == this.player.bottleStock.max && this.player.life < this.player.maxLife){
                this.player.life += 1 ;
                this.player.bottleStock.green = 0;
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
                this.arrayLife[this.arrayLife.length] = this.game.add.sprite(16 + ( this.arrayLife.length * 24 ), 16, 'lifeBar');
                this.player.life = this.player.maxLife;
                this.player.bottleStock.yellow = 0;
            }
        }
    }

    hitBottle(_player, _bottle){
        console.log(_bottle.frame);
        switch(_bottle.frame){
            case 0:
                if( _player.bottleStock.blue <  _player.bottleStock.max) {  
                    _player.bottleStock.blue += 1;
                    if( _player.bottleStock.blue ==  _player.bottleStock.max) {
                        this.scoreMultiplicateur += 1;
                        _player.bottleStock.blue = 0;
                    }
                } 
                break;
            case 1:
                if(_player.bottleStock.green < _player.bottleStock.max){  
                    _player.bottleStock.green += 1;
                }
                break;
            case 2:
                if(_player.bottleStock.red <  _player.bottleStock.max){  
                    _player.bottleStock.red += 1;
                }
                break;
            case 3:
                if( _player.bottleStock.yellow <  _player.bottleStock.max){  
                    _player.bottleStock.yellow += 1;
                }
                break;

        }
        _bottle.onHit();
    }

    hitCoin(_player, _coin){
        _coin.onHit();
        this.score += (1 * this.scoreMultiplicateur);
    }
}

export default Player;