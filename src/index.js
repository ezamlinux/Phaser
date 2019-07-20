import Menu from 'states/Menu';
import EndlessRunner from 'states/EndlessRunner';

class Game extends Phaser.Game {
    constructor () {
        super(800, 600, Phaser.AUTO, 'content', null);
        this.GLOBAL = {};
        this.state.add('menu', Menu, false);
        this.state.add('endlessRunner', EndlessRunner, false);
        this.state.start('menu');
    }
}

new Game();
