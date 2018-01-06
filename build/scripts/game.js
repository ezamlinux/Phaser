(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Menu = require('states/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _EndlessRunner = require('states/EndlessRunner');

var _EndlessRunner2 = _interopRequireDefault(_EndlessRunner);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 800, 600, Phaser.AUTO, 'content', null));

		_this.GLOBAL = {};
		_this.state.add('menu', _Menu2.default, false);
		_this.state.add('endlessRunner', _EndlessRunner2.default, false);
		_this.state.start('menu');
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"states/EndlessRunner":10,"states/Menu":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Barrel = function (_Phaser$Sprite) {
    _inherits(Barrel, _Phaser$Sprite);

    function Barrel(game, x, y, img) {
        _classCallCheck(this, Barrel);

        var _this = _possibleConstructorReturn(this, (Barrel.__proto__ || Object.getPrototypeOf(Barrel)).call(this, game, x, y, img));

        _this.game.physics.arcade.enable(_this);
        _this.body.bounce.set(Math.random());
        _this.body.gravity.y = 200;
        _this.anchor.setTo(.5);
        _this.body.velocity.x = -200;
        _this.checkWorldBounds = true;
        _this.outOfBoundsKill = true;
        _this.body.onCollide = new Phaser.Signal();
        _this.body.onCollide.add(_this.onHit, _this);
        _this.game.GLOBAL.barrels.add(_this);
        return _this;
    }

    _createClass(Barrel, [{
        key: 'onHit',
        value: function onHit(_barrel, _player) {
            if (_player && _player.key == 'samourai') {
                if (_player.body.touching.down && _barrel.body.touching.up) {} else {
                    _player.getDamage(1);
                    _barrel.kill();
                }
            }
        }
    }]);

    return Barrel;
}(Phaser.Sprite);

exports.default = Barrel;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Bottle = function (_Phaser$Sprite) {
    _inherits(Bottle, _Phaser$Sprite);

    function Bottle(game, x, y, index) {
        _classCallCheck(this, Bottle);

        var _this = _possibleConstructorReturn(this, (Bottle.__proto__ || Object.getPrototypeOf(Bottle)).call(this, game, x, y, 'flasks'));

        _this.game.physics.arcade.enable(_this);
        _this.frame = index;
        _this.body.velocity.x = -200;
        _this.body.gravity.y = 1000;
        _this.body.bounce.setTo(.5);
        _this.checkWorldBounds = true;
        _this.outOfBoundsKill = true;

        _this.game.GLOBAL.bottles.add(_this);
        return _this;
    }

    _createClass(Bottle, [{
        key: 'onHit',
        value: function onHit() {
            this.kill();
        }
    }]);

    return Bottle;
}(Phaser.Sprite);

exports.default = Bottle;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _Crate2 = require('./Crate');

var _Crate3 = _interopRequireDefault(_Crate2);

var _Bottle = require('./Bottle');

var _Bottle2 = _interopRequireDefault(_Bottle);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var BottleCrate = function (_Crate) {
    _inherits(BottleCrate, _Crate);

    function BottleCrate(game, x, y) {
        _classCallCheck(this, BottleCrate);

        var group = game.GLOBAL.bottleCrates;

        var _this = _possibleConstructorReturn(this, (BottleCrate.__proto__ || Object.getPrototypeOf(BottleCrate)).call(this, game, x, y, group, 1));

        _this.body.onCollide = new Phaser.Signal();
        _this.body.onCollide.add(_this.onHit, _this);
        return _this;
    }

    _createClass(BottleCrate, [{
        key: 'onHit',
        value: function onHit(_crate, _player) {
            if (_player.key == 'samourai') {
                if (_player.body.touching.down && _crate.body.touching.up) {} else {
                    var rand = Math.floor(Math.random() * 4) + 1;

                    if (rand == 1) {
                        new _Bottle2.default(this.game, _crate.x, _crate.y, 0);
                    } else if (rand == 2) {
                        new _Bottle2.default(this.game, _crate.x, _crate.y, 2);
                    } else if (rand == 3) {
                        new _Bottle2.default(this.game, _crate.x, _crate.y, 1);
                    } else {
                        new _Bottle2.default(this.game, _crate.x, _crate.y, 3);
                    }
                    _crate.kill(_crate, _player);
                }
            }
        }
    }]);

    return BottleCrate;
}(_Crate3.default);

exports.default = BottleCrate;

},{"./Bottle":3,"./Crate":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var group = void 0;

var Coin = function (_Phaser$Sprite) {
    _inherits(Coin, _Phaser$Sprite);

    function Coin(game, x, y) {
        _classCallCheck(this, Coin);

        var _this = _possibleConstructorReturn(this, (Coin.__proto__ || Object.getPrototypeOf(Coin)).call(this, game, x, y, 'ring'));

        _this.game.physics.arcade.enable(_this);
        _this.coinSound = _this.game.add.audio('coin');
        _this.coinSound.play();
        _this.body.velocity.x = -200;
        _this.body.gravity.y = 1000;
        _this.body.bounce.setTo(.5);
        _this.checkWorldBounds = true;
        _this.outOfBoundsKill = true;

        _this.game.GLOBAL.coins.add(_this);
        return _this;
    }

    _createClass(Coin, [{
        key: 'onHit',
        value: function onHit() {
            this.coinSound.play();
            this.kill();
        }
    }]);

    return Coin;
}(Phaser.Sprite);

exports.default = Coin;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;if (getter === undefined) {
            return undefined;
        }return getter.call(receiver);
    }
};

var _Crate2 = require('objects/Crate');

var _Crate3 = _interopRequireDefault(_Crate2);

var _Coin = require('objects/Coin');

var _Coin2 = _interopRequireDefault(_Coin);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CoinCrate = function (_Crate) {
    _inherits(CoinCrate, _Crate);

    function CoinCrate(game, x, y) {
        _classCallCheck(this, CoinCrate);

        var group = game.GLOBAL.coinCrates;

        var _this = _possibleConstructorReturn(this, (CoinCrate.__proto__ || Object.getPrototypeOf(CoinCrate)).call(this, game, x, y, group, 2));

        _this.body.onCollide = new Phaser.Signal();
        _this.body.onCollide.add(_this.onHit, _this);
        return _this;
    }

    _createClass(CoinCrate, [{
        key: 'onHit',
        value: function onHit(_crate, _player) {
            if (_player.key == 'samourai') {
                if (_player.body.touching.down && _crate.body.touching.up) {} else {
                    var rand = Math.floor(Math.random() * 5) + 1;
                    for (var i = 0; i < rand; i++) {
                        new _Coin2.default(this.game, _crate.x + 80 + 20 * i, _crate.y);
                    }
                    _get(CoinCrate.prototype.__proto__ || Object.getPrototypeOf(CoinCrate.prototype), 'onHit', this).call(this, _crate, _player);
                }
            }
        }
    }]);

    return CoinCrate;
}(_Crate3.default);

exports.default = CoinCrate;

},{"objects/Coin":5,"objects/Crate":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Crate = function (_Phaser$Sprite) {
    _inherits(Crate, _Phaser$Sprite);

    function Crate(game, x, y, group, _frame) {
        _classCallCheck(this, Crate);

        var _this = _possibleConstructorReturn(this, (Crate.__proto__ || Object.getPrototypeOf(Crate)).call(this, game, x, y, 'crates'));

        _this.game.physics.arcade.enable(_this);
        _this.frame = _frame;
        _this.body.velocity.x = -200;
        _this.checkWorldBounds = true;
        _this.outOfBoundsKill = true;
        _this.body.onCollide = new Phaser.Signal();
        _this.body.onCollide.add(_this.onHit, _this);
        group.add(_this);
        return _this;
    }

    _createClass(Crate, [{
        key: 'onHit',
        value: function onHit(_crate, _player) {
            if (_player && _player.key == 'samourai') {
                if (_player.body.touching.down && _crate.body.touching.up) {} else {
                    _crate.kill();
                }
            }
        }
    }]);

    return Crate;
}(Phaser.Sprite);

exports.default = Crate;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _Coin = require('./Coin');

var _Coin2 = _interopRequireDefault(_Coin);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Player = function (_Phaser$Sprite) {
    _inherits(Player, _Phaser$Sprite);

    function Player(game) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, 32, game.world.height - 200, 'samourai'));

        _this.game.physics.arcade.enable(_this);
        _this.jumpSound = _this.game.add.audio('jump');
        _this.maxLife = 3;
        _this.life = _this.maxLife;
        _this.bottleStock = {
            blue: 0,
            green: 0,
            yellow: 0,
            red: 0,
            max: 3
        };
        _this.inputEnabled = true;
        _this.scale.setTo(0.2);
        _this.body.setSize(330, 465, 250, 40);
        _this.body.collideWorldBounds = true;
        _this.body.gravity.y = 1200;

        // -- Animation -- //
        _this.animations.add('run', Phaser.Animation.generateFrameNames('Run_', 0, 7, '', 3), 30, false);
        _this.animations.add('forward', Phaser.Animation.generateFrameNames('Run_', 0, 7, '', 3).reverse(), 30, false);
        _this.animations.add('jump', ['JumpUP'], 15, false);
        _this.animations.add('fall', ['FallDown'], 15, false);
        _this.game.world.addChild(_this);
        return _this;
    }

    _createClass(Player, [{
        key: 'jump',
        value: function jump() {
            if (this.body.blocked.down || this.body.touching.down) {
                this.jumpSound.play();
                this.animations.play('jump');
                this.body.velocity.y = -500;
            }
        }
    }, {
        key: 'getDamage',
        value: function getDamage(_x) {
            this.life -= _x;
            if (this.life == 0) {
                // infinite credits
                this.game.GLOBAL.themeMusic.stop();
                this.game.state.start('menu');
            }
        }
    }, {
        key: 'useBottle',
        value: function useBottle(_bottle) {
            if (_bottle.keyCode == 49) {
                if (this.player.bottleStock.green == this.player.bottleStock.max && this.player.life < this.player.maxLife) {
                    this.player.life += 1;
                    this.player.bottleStock.green = 0;
                }
            } else if (_bottle.keyCode == 50) {
                if (this.player.bottleStock.red == this.player.bottleStock.max && this.player.life < this.player.maxLife) {
                    this.player.life = this.player.maxLife;
                    this.player.bottleStock.red = 0;
                }
            } else if (_bottle.keyCode == 51) {
                if (this.player.bottleStock.yellow == this.player.bottleStock.max) {
                    this.player.maxLife += 1;
                    this.arrayLife[this.arrayLife.length] = this.game.add.sprite(16 + this.arrayLife.length * 24, 16, 'lifeBar');
                    this.player.life = this.player.maxLife;
                    this.player.bottleStock.yellow = 0;
                }
            }
        }
    }, {
        key: 'hitBottle',
        value: function hitBottle(_player, _bottle) {
            console.log(_bottle.frame);
            switch (_bottle.frame) {
                case 0:
                    if (_player.bottleStock.blue < _player.bottleStock.max) {
                        _player.bottleStock.blue += 1;
                        if (_player.bottleStock.blue == _player.bottleStock.max) {
                            this.scoreMultiplicateur += 1;
                            _player.bottleStock.blue = 0;
                        }
                    }
                    break;
                case 1:
                    if (_player.bottleStock.green < _player.bottleStock.max) {
                        _player.bottleStock.green += 1;
                    }
                    break;
                case 2:
                    if (_player.bottleStock.red < _player.bottleStock.max) {
                        _player.bottleStock.red += 1;
                    }
                    break;
                case 3:
                    if (_player.bottleStock.yellow < _player.bottleStock.max) {
                        _player.bottleStock.yellow += 1;
                    }
                    break;

            }
            _bottle.onHit();
        }
    }, {
        key: 'hitCoin',
        value: function hitCoin(_player, _coin) {
            _coin.onHit();
            this.score += 1 * this.scoreMultiplicateur;
        }
    }]);

    return Player;
}(Phaser.Sprite);

exports.default = Player;

},{"./Coin":5}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;if (getter === undefined) {
            return undefined;
        }return getter.call(receiver);
    }
};

var _Crate2 = require('objects/Crate');

var _Crate3 = _interopRequireDefault(_Crate2);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var RegularCrate = function (_Crate) {
    _inherits(RegularCrate, _Crate);

    function RegularCrate(game, x, y) {
        _classCallCheck(this, RegularCrate);

        var group = game.GLOBAL.crates;

        var _this = _possibleConstructorReturn(this, (RegularCrate.__proto__ || Object.getPrototypeOf(RegularCrate)).call(this, game, x, y, group, 0));

        _this.body.onCollide = new Phaser.Signal();
        _this.body.onCollide.add(_this.onHit, _this);
        return _this;
    }

    _createClass(RegularCrate, [{
        key: 'onHit',
        value: function onHit(_crate, _player) {
            if (_player.key == 'samourai') {
                if (_player.body.touching.down && _crate.body.touching.up) {} else {
                    _player.getDamage(1);
                }
                _get(RegularCrate.prototype.__proto__ || Object.getPrototypeOf(RegularCrate.prototype), 'onHit', this).call(this, _crate, _player);
            }
        }
    }]);

    return RegularCrate;
}(_Crate3.default);

exports.default = RegularCrate;

},{"objects/Crate":7}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _Player = require('objects/Player');

var _Player2 = _interopRequireDefault(_Player);

var _RegularCrate = require('objects/RegularCrate');

var _RegularCrate2 = _interopRequireDefault(_RegularCrate);

var _BottleCrate = require('objects/BottleCrate');

var _BottleCrate2 = _interopRequireDefault(_BottleCrate);

var _CoinCrate = require('objects/CoinCrate');

var _CoinCrate2 = _interopRequireDefault(_CoinCrate);

var _Barrel = require('objects/Barrel');

var _Barrel2 = _interopRequireDefault(_Barrel);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var EndlessRunner = function (_Phaser$State) {
    _inherits(EndlessRunner, _Phaser$State);

    function EndlessRunner() {
        _classCallCheck(this, EndlessRunner);

        return _possibleConstructorReturn(this, (EndlessRunner.__proto__ || Object.getPrototypeOf(EndlessRunner)).apply(this, arguments));
    }

    _createClass(EndlessRunner, [{
        key: 'preload',
        value: function preload() {
            this.game.load.path = 'assets/';
            this.game.load.atlas('samourai', 'img/player.png', 'data/player.json');

            this.game.load.image('sky', 'img/sky.png');
            this.game.load.image('mountain', 'img/mountain.png');
            this.game.load.image('rolling_barrel', 'img/rolling_barrel.png');
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
    }, {
        key: 'create',
        value: function create() {
            // ---- global params ---- //
            this.score = 0;
            this.scoreMultiplicateur = 1;

            // ---- ----//
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.cursors = this.game.input.keyboard.createCursorKeys();

            this.game.GLOBAL.themeMusic = this.game.add.audio('taiko');
            this.game.GLOBAL.themeMusic.loop = true;
            this.game.GLOBAL.themeMusic.play();

            this.game.stage.backgroundColor = "#000000";
            this.bg_sky = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sky');
            this.bg_mountain = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'mountain');
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
            this.game.GLOBAL.crates = this.game.add.group();
            this.game.GLOBAL.coinCrates = this.game.add.group();
            this.game.GLOBAL.bottleCrates = this.game.add.group();

            // -- barrels
            this.game.GLOBAL.barrels = this.game.add.group();
            this.game.GLOBAL.barrels.enableBody = true;

            // -- coins
            this.game.GLOBAL.coins = this.game.add.group();

            // -- bottles
            this.game.GLOBAL.bottles = this.game.add.group();

            // -- function -- //
            this.player = new _Player2.default(this.game);
            this.arrayLife = [];

            for (var i = 0; i < this.player.maxLife; i++) {
                this.arrayLife[i] = this.game.add.sprite(16 + i * 24, 16, 'lifeBar');
            }
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

            this.timer = this.game.time.events.loop(1750, this.generateObstacle, this);
        }
    }, {
        key: 'update',
        value: function update() {
            // -- floor collide
            this.game.physics.arcade.collide(this.floors, this.player);
            this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.coins);
            this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.bottles);
            this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.crates);
            this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.coinCrates);
            this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.bottleCrates);
            this.game.physics.arcade.collide(this.floors, this.game.GLOBAL.barrels);

            // -- barrels collide
            this.game.physics.arcade.collide(this.game.GLOBAL.barrels, this.game.GLOBAL.crates, this.breakBoth, null, this);
            this.game.physics.arcade.collide(this.game.GLOBAL.barrels, this.game.GLOBAL.coinCrates, this.breakBoth, null, this);
            this.game.physics.arcade.collide(this.game.GLOBAL.barrels, this.game.GLOBAL.bottleCrates, this.breakBoth, null, this);
            this.game.physics.arcade.collide(this.game.GLOBAL.barrels, this.game.GLOBAL.barrels, this.breakBoth, null, this);

            // -- player collide
            this.game.physics.arcade.collide(this.game.GLOBAL.crates, this.player, this.game.GLOBAL.crates.onHit, null, this);
            this.game.physics.arcade.collide(this.game.GLOBAL.bottleCrates, this.player, this.game.GLOBAL.bottleCrates.onHit, null, this);
            this.game.physics.arcade.collide(this.game.GLOBAL.coinCrates, this.player, this.game.GLOBAL.coinCrates.onHit, null, this);
            this.game.physics.arcade.collide(this.player, this.game.GLOBAL.barrels, this.game.GLOBAL.barrels.onHit, null, this);
            this.game.physics.arcade.overlap(this.player, this.game.GLOBAL.coins, this.player.hitCoin, null, this);
            this.game.physics.arcade.overlap(this.player, this.game.GLOBAL.bottles, this.player.hitBottle, null, this);

            // -- animation
            this.bg_sky.tilePosition.x -= 0.20;
            this.bg_mountain.tilePosition.x -= 1;
            this.floors.tilePosition.x -= 2.5;
            this.game.GLOBAL.barrels.forEach(function (item) {
                return item.angle -= 2;
            });

            this.updateInfo();
            // -- player event
            if (this.cursors.right.isDown) {
                if (this.player.body.touching.down) {
                    this.player.animations.play('run');
                    this.player.body.velocity.x = 200;
                } else {
                    this.player.body.velocity.x = 150;
                }
            } else if (this.cursors.left.isDown) {
                if (this.player.body.touching.down) {
                    this.player.animations.play('forward');
                    this.player.body.velocity.x = -150;
                } else {
                    this.player.body.velocity.x = -120;
                }
            } else {
                if (this.player.body.touching.down) {
                    this.player.animations.play('run');
                    this.player.body.velocity.x = 0;
                }
            }
        }

        // ------------------ //
        // ---- Function ---- //
        // ------------------ //

        // -- generator & miscellanous

    }, {
        key: 'createFloor',
        value: function createFloor() {
            var obj = void 0;
            for (var i = 0; i < this.game.world.width; i += 64) {
                obj = this.floors.create(i, this.game.world.height - 64, 'grass');
            }
        }
    }, {
        key: 'updateInfo',
        value: function updateInfo() {
            this.scoreText.text = this.score;
            for (var i = 0; i < this.arrayLife.length; i++) {
                this.arrayLife[i].frame = i + 1 <= this.player.life ? 0 : 1;
            }
            this.green_jar.frame = this.player.bottleStock.green;
            this.red_jar.frame = this.player.bottleStock.red;
            this.blue_jar.frame = this.player.bottleStock.blue;
            this.yellow_jar.frame = this.player.bottleStock.yellow;
        }
    }, {
        key: 'generateObstacle',
        value: function generateObstacle() {
            var seed = Math.floor(Math.random() * 10) + 1;
            if (seed < 8) {
                this.addCrate();
            } else if (seed >= 8 && seed != 10) {
                this.addBarrels();
            }
        }

        // -- adding

    }, {
        key: 'addBarrels',
        value: function addBarrels() {
            var posY = this.game.height - 128;
            var rand = Math.floor(Math.random() * 128) + 1;
            new _Barrel2.default(this.game, this.game.width, posY - rand, 'rolling_barrel');
        }
    }, {
        key: 'addCrate',
        value: function addCrate() {
            var rand = Math.floor(Math.random() * 10) + 1;
            var posY = this.game.height - 128;
            var value = Math.floor(Math.random() * 10) + 1 > 5 ? 96 : 0;
            if (rand >= 9) {
                var _rand = Math.floor(Math.random() * 10) + 1;
                if (_rand >= 5) {
                    new _CoinCrate2.default(this.game, this.game.width, posY - value);
                } else {
                    new _BottleCrate2.default(this.game, this.game.width, posY - value);
                }
            } else {
                new _RegularCrate2.default(this.game, this.game.width, posY);
            }
        }

        // -- HITTER

    }, {
        key: 'breakBoth',
        value: function breakBoth(_one, _two) {
            _one.kill();
            _two.kill();
        }
    }]);

    return EndlessRunner;
}(Phaser.State);

exports.default = EndlessRunner;

},{"objects/Barrel":2,"objects/BottleCrate":4,"objects/CoinCrate":6,"objects/Player":8,"objects/RegularCrate":9}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Menu = function (_Phaser$State) {
    _inherits(Menu, _Phaser$State);

    function Menu() {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
    }

    _createClass(Menu, [{
        key: 'preload',
        value: function preload() {
            this.game.load.path = 'assets/';
            this.game.load.image('sky', 'img/sky.png');
            this.game.load.image('mountain', 'img/mountain.png');
            this.game.load.image('runnerButton', 'img/menu/runnerButton.png');
            this.game.load.audio('rain', 'audio/rain.wav');
        }
    }, {
        key: 'create',
        value: function create() {
            this.bg_sky = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sky');
            this.bg_mountain = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'mountain');

            var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'runnerButton', this.launchEndlessRunner, this);
            button.anchor.setTo(.5);

            var rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
            rKey.onDown.addOnce(this.launchEndlessRunner, this);

            this.game.GLOBAL.themeMusic = this.game.add.audio('rain');
            this.game.GLOBAL.themeMusic.loop = true;
            this.game.GLOBAL.themeMusic.volume = 0.2;
            this.game.GLOBAL.themeMusic.play();
        }
    }, {
        key: 'update',
        value: function update() {
            this.bg_sky.tilePosition.x -= 0.20;
            this.bg_mountain.tilePosition.x -= 1;
        }
    }, {
        key: 'launchEndlessRunner',
        value: function launchEndlessRunner() {
            this.game.GLOBAL.themeMusic.stop();
            this.game.state.start('endlessRunner');
        }
    }]);

    return Menu;
}(Phaser.State);

exports.default = Menu;

},{}]},{},[1])
//# sourceMappingURL=game.js.map
