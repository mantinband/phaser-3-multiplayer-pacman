// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"CST.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
var CST = {
  SCENES: {
    GAME: "GAME"
  }
};
exports.CST = CST;
},{}],"scenes/GameScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GameScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(GameScene, _Phaser$Scene);

  function GameScene() {
    _classCallCheck(this, GameScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(GameScene).call(this, {
      key: _CST.CST.SCENES.GAME
    }));
  }

  _createClass(GameScene, [{
    key: "preload",
    value: function preload() {
      this.load.image('dot', 'dot.png');
      this.load.image('candy', 'candy.png');
      this.load.tilemapTiledJSON('map', 'pacman-map.json');
      this.load.image('tiles', 'pacman-tiles.png');
      this.load.spritesheet('pacman', 'pacman.png', {
        frameWidth: 32,
        frameHeight: 32
      });
      this.load.spritesheet('coin', 'coin.png', {
        frameWidth: 44,
        frameHeight: 40
      });
      this.safetile = 14;
      this.dottile = 7;
      this.speed = 100;
      this.pacmanSize = 12;
      this.threshold = 2.05;
      this.dotCount = 0;
      this.numTotalDots = 272;
      this.marker = new Phaser.Geom.Point();
      this.coins = {
        upperLeft: {
          x: 1,
          y: 3
        },
        upperRight: {
          x: 26,
          y: 3
        },
        lowerRight: {
          x: 26,
          y: 22
        },
        lowerLeft: {
          x: 1,
          y: 22
        }
      };
    }
  }, {
    key: "create",
    value: function create() {
      this.map = this.make.tilemap({
        key: 'map'
      });
      var tileset = this.map.addTilesetImage('pacman-tiles', 'tiles');
      this.layer = this.map.createDynamicLayer('Pacman', tileset);
      this.pacman = this.add.sprite(14 * 16 + 8, 17 * 16 + 8, 'pacman', 2);
      this.layer.setCollisionByExclusion([this.safetile, this.dottile]);
      this.physics.add.collider(this.pacman, this.layer);
      this.physics.world.enable(this.pacman);
      this.pacman.body.setVelocityX(100);
      this.pacman.body.setSize(this.pacmanSize, this.pacmanSize);
      this.anims.create({
        key: 'moving',
        frames: this.anims.generateFrameNumbers('pacman', {
          frames: [2, 1, 0, 1]
        }),
        frameRate: 16,
        repeat: -1
      });
      this.anims.create({
        key: 'stop',
        frames: this.anims.generateFrameNumbers('pacman', {
          frames: [1]
        }),
        frameRate: 10,
        repeat: 1
      });
      this.pacman.anims.play('moving');
      this.currentDirection = Phaser.RIGHT;
      this.nextDirection = Phaser.RIGHT;
      this.input.keyboard.on('keydown', function (eventName, event) {
        switch (eventName.key) {
          case 'ArrowDown':
            this.nextDirection = Phaser.DOWN;
            break;

          case 'ArrowUp':
            this.nextDirection = Phaser.UP;
            break;

          case 'ArrowLeft':
            this.nextDirection = Phaser.LEFT;
            break;

          case 'ArrowRight':
            this.nextDirection = Phaser.RIGHT;
            break;

          default:
            console.log('invalid button pressed: ' + eventName.key);
        }
      }, this);
      this.anims.create({
        key: 'coin',
        frames: this.anims.generateFrameNumbers('coin', {
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }),
        frameRate: 16,
        repeat: -1
      });
      this.addCoins();
      this.addCoinsCollideAction();
    }
  }, {
    key: "canTurn",
    value: function canTurn() {
      var tile;

      switch (this.nextDirection) {
        case Phaser.LEFT:
          tile = this.map.getTileAt(this.marker.x - 1, this.marker.y, true).index;
          break;

        case Phaser.RIGHT:
          tile = this.map.getTileAt(this.marker.x + 1, this.marker.y, true).index;
          break;

        case Phaser.UP:
          tile = this.map.getTileAt(this.marker.x, this.marker.y - 1, true).index;
          break;

        case Phaser.DOWN:
          tile = this.map.getTileAt(this.marker.x, this.marker.y + 1, true).index;
          break;

        default:
          console.log('invalid direction');
      }

      return tile === this.safetile || tile === this.dottile;
    }
  }, {
    key: "updateDirection",
    value: function updateDirection() {
      this.currentDirection = this.nextDirection;

      switch (this.currentDirection) {
        case Phaser.LEFT:
          this.pacman.angle = 180;
          this.pacman.body.setVelocityX(-this.speed);
          this.pacman.body.setVelocityY(0);
          break;

        case Phaser.RIGHT:
          this.pacman.angle = 0;
          this.pacman.body.setVelocityX(this.speed);
          this.pacman.body.setVelocityY(0);
          break;

        case Phaser.UP:
          this.pacman.angle = 270;
          this.pacman.body.setVelocityX(0);
          this.pacman.body.setVelocityY(-this.speed);
          break;

        case Phaser.DOWN:
          this.pacman.angle = 90;
          this.pacman.body.setVelocityX(0);
          this.pacman.body.setVelocityY(this.speed);
          break;

        default:
          console.log('invalid direction');
      }
    }
  }, {
    key: "update",
    value: function update() {
      var pacmanX = this.pacman.x;
      var pacmanY = this.pacman.y;
      this.marker.x = this.map.worldToTileX(pacmanX);
      this.marker.y = this.map.worldToTileY(pacmanY);
      var pacmanInCenterOfSquare = Math.abs(pacmanX - (this.marker.x * 16 + 8)) < this.threshold && Math.abs(pacmanY - (this.marker.y * 16 + 8)) < this.threshold;
      var pacmanCanTurn = this.canTurn();
      this.currentTile = this.map.getTileAt(this.marker.x, this.marker.y, true);

      if (this.currentTile.index === this.dottile) {
        this.dotCount++;
        this.currentTile.index = this.safetile;
        console.log(this.dotCount);

        if (this.dotCount === this.numTotalDots) {
          alert('you have won!');
        }
      }

      if (this.nextDirection === this.currentDirection && !pacmanCanTurn) {
        if (this.pacman.anims.isPlaying) {
          this.pacman.anims.stop();
          this.pacman.anims.play('stop');
        }
      } else {
        if (!this.pacman.anims.isPlaying) {
          this.pacman.anims.play('moving');
        }
      }

      if (this.nextDirection !== this.currentDirection && pacmanCanTurn && pacmanInCenterOfSquare) {
        this.updateDirection();
      }
    }
  }, {
    key: "addCoins",
    value: function addCoins() {
      for (var spot in this.coins) {
        this.coins[spot]['coin'] = this.add.sprite(this.coins[spot].x * 16 + 8, this.coins[spot].y * 16 + 8, 'coin', 0);
        this.coins[spot]['coin'].setScale(0.5);
        this.coins[spot]['coin'].anims.play('coin');
      }
    }
  }, {
    key: "addCoinsCollideAction",
    value: function addCoinsCollideAction() {
      var _this = this;

      var _loop = function _loop(spot) {
        _this.physics.world.enable(_this.coins[spot].coin);

        _this.physics.add.collider(_this.pacman, _this.coins[spot].coin, function () {
          this.coins[spot].coin.destroy();
        }, null, _this);
      };

      for (var spot in this.coins) {
        _loop(spot);
      } // this.physics.world.enable(this.coins.lowerLeft.coin);
      // this.physics.world.enable(this.coins.lowerRight.coin);
      // this.physics.world.enable(this.coins.upperLeft.coin);
      // this.physics.world.enable(this.coins.upperRight.coin);
      // this.physics.add.collider(this.pacman, this.coins.lowerRight.coin, function () {
      //     this.coins.lowerLeft.coin.destroy();
      // }, null, this);
      //
      // this.physics.add.collider(this.pacman, this.coins.upperLeft.coin, function () {
      //     this.coins.lowerLeft.coin.destroy();
      // }, null, this);
      //
      // this.physics.add.collider(this.pacman, this.coins.upperRight.coin, function () {
      //     this.coins.lowerLeft.coin.destroy();
      // }, null, this);

    }
  }]);

  return GameScene;
}(Phaser.Scene);

exports.GameScene = GameScene;
},{"../CST":"CST.js"}],"game.js":[function(require,module,exports) {
"use strict";

var _GameScene = require("./scenes/GameScene.js");

var game = new Phaser.Game({
  width: 448,
  height: 496,
  scene: [_GameScene.GameScene],
  physics: {
    default: 'arcade'
  }
});
},{"./scenes/GameScene.js":"scenes/GameScene.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37205" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","game.js"], null)
//# sourceMappingURL=/game.7bbe06d5.js.map