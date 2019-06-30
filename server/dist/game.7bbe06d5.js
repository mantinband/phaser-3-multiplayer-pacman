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
    GAME: "GAME",
    QUESTION: "QUESTION",
    MENU: "MENU",
    INPUT_NAMES: 'INPUT_NAMES',
    MANAGE_QUESTIONS: 'MANAGE_QUESTIONS',
    SCORE_BOARD: 'SCORE_BOARD'
  }
};
exports.CST = CST;
},{}],"../assets/Questions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QUESTIONS = void 0;
var QUESTIONS = [{
  "category": "Entertainment: Video Games",
  "type": "multiple",
  "difficulty": "hard",
  "question": "What was the code name given to Sonic the Hedgehog 4 during its development?",
  "correct_answer": "Project Needlemouse",
  "incorrect_answers": ["Project Bluespike", "Project Roboegg", "Project Darksphere"]
}, {
  "category": "Entertainment: Television",
  "type": "multiple",
  "difficulty": "easy",
  "question": "What was the name of the police officer in the cartoon &quot;Top Cat&quot;?",
  "correct_answer": "Dibble",
  "incorrect_answers": ["Barbrady", "Mahoney", "Murphy"]
}, {
  "category": "Entertainment: Board Games",
  "type": "multiple",
  "difficulty": "easy",
  "question": "In a standard game of Monopoly, what colour are the two cheapest properties?",
  "correct_answer": "Brown",
  "incorrect_answers": ["Green", "Yellow", "Blue"]
}, {
  "category": "General Knowledge",
  "type": "multiple",
  "difficulty": "easy",
  "question": "Which company did Valve cooperate with in the creation of the Vive?",
  "correct_answer": "HTC",
  "incorrect_answers": ["Oculus", "Google", "Razer"]
}, {
  "category": "Science: Computers",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Which internet company began life as an online bookstore called &#039;Cadabra&#039;?",
  "correct_answer": "Amazon",
  "incorrect_answers": ["eBay", "Overstock", "Shopify"]
}, {
  "category": "History",
  "type": "multiple",
  "difficulty": "easy",
  "question": "Who discovered Penicillin?",
  "correct_answer": "Alexander Flemming",
  "incorrect_answers": ["Marie Curie", "Alfred Nobel", "Louis Pasteur"]
}, {
  "category": "History",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Which king was killed at the Battle of Bosworth Field in 1485? ",
  "correct_answer": "Richard III",
  "incorrect_answers": ["Edward V", "Henry VII", "James I"]
}, {
  "category": "History",
  "type": "multiple",
  "difficulty": "medium",
  "question": "America&#039;s Strategic Defense System during the Cold War was nicknamed after this famous movie.",
  "correct_answer": "Star Wars",
  "incorrect_answers": ["Jaws", "Blade Runner", "Alien"]
}, {
  "category": "History",
  "type": "multiple",
  "difficulty": "easy",
  "question": "The idea of Socialism was articulated and advanced by whom?",
  "correct_answer": "Karl Marx",
  "incorrect_answers": ["Vladimir Lenin", "Joseph Stalin", "Vladimir Putin"]
}, {
  "category": "History",
  "type": "multiple",
  "difficulty": "easy",
  "question": "In what year did the Wall Street Crash take place?",
  "correct_answer": "1929",
  "incorrect_answers": ["1932", "1930", "1925"]
}, {
  "category": "General Knowledge",
  "type": "multiple",
  "difficulty": "easy",
  "question": "Area 51 is located in which US state?",
  "correct_answer": "Nevada",
  "incorrect_answers": ["Arizona", "New Mexico", "Utah"]
}, {
  "category": "Science: Computers",
  "type": "multiple",
  "difficulty": "medium",
  "question": "What does AD stand for in relation to Windows Operating Systems? ",
  "correct_answer": "Active Directory",
  "incorrect_answers": ["Alternative Drive", "Automated Database", "Active Department"]
}, {
  "category": "Entertainment: Music",
  "type": "multiple",
  "difficulty": "easy",
  "question": "Where does the Mac part of the name Fleetwood Mac come from?",
  "correct_answer": "John McVie",
  "incorrect_answers": ["Christine McVie", "Mac McAnally", "David Tennant"]
}, {
  "category": "Science & Nature",
  "type": "multiple",
  "difficulty": "hard",
  "question": "What common name is given to the medial condition, tibial stress syndrome (MTSS)?",
  "correct_answer": "Shin Splints",
  "incorrect_answers": ["Tennis Elbow", "Carpal Tunnel", "Housemaid&#039;s Knee"]
}, {
  "category": "Entertainment: Film",
  "type": "multiple",
  "difficulty": "easy",
  "question": "What was Dorothy&#039;s surname in &#039;The Wizard Of Oz&#039;?",
  "correct_answer": "Gale",
  "incorrect_answers": ["Perkins", "Day", "Parker"]
}, {
  "category": "Entertainment: Video Games",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Which of these features was added in the 1994 game &quot;Heretic&quot; that the original &quot;DOOM&quot; could not add due to limitations?",
  "correct_answer": "Looking up and down",
  "incorrect_answers": ["Increased room sizes", "Unlimited weapons", "Highly-detailed textures"]
}, {
  "category": "Geography",
  "type": "multiple",
  "difficulty": "hard",
  "question": "The mountainous Khyber Pass connects which of the two following countries?",
  "correct_answer": "Afghanistan and Pakistan",
  "incorrect_answers": ["India and Nepal", "Pakistan and India", "Tajikistan and Kyrgyzstan"]
}, {
  "category": "Entertainment: Television",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Which of the following Autobot names in Michael Bay&#039;s movies was NOT a name for a Transformer in the original 1980&#039;s cartoon?",
  "correct_answer": "Mudflap",
  "incorrect_answers": ["Skids", "Sideswipe", "Ratchet"]
}, {
  "category": "Entertainment: Video Games",
  "type": "multiple",
  "difficulty": "medium",
  "question": "What was the first &quot;Team Fortress 2&quot; update to include a war?",
  "correct_answer": "Sniper vs. Spy Update",
  "incorrect_answers": ["WAR! Update", "Meet Your Match Update", "Spy Vs. Engineer Update"]
}, {
  "category": "Sports",
  "type": "multiple",
  "difficulty": "easy",
  "question": "Which country will host the 2020 Summer Olympics?",
  "correct_answer": "Japan",
  "incorrect_answers": ["China", "Australia", "Germany"]
}, {
  "category": "Entertainment: Television",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Which character does voice actress Tara Strong NOT voice?",
  "correct_answer": "Bubbles (2016)",
  "incorrect_answers": ["Twilight Sparkle", "Timmy Turner", "Harley Quinn"]
}, {
  "category": "Entertainment: Video Games",
  "type": "multiple",
  "difficulty": "medium",
  "question": "In &quot;Overwatch&quot;, what is the name of Mercy&#039;s &quot;ultimate ability&quot;?",
  "correct_answer": "Valkyrie",
  "incorrect_answers": ["Earthshatter", "Rocket Barrage", "Molten Core"]
}, {
  "category": "Entertainment: Music",
  "type": "multiple",
  "difficulty": "medium",
  "question": "What is the relationship between the band members of American rock band King of Leon?",
  "correct_answer": "Brothers &amp; cousins",
  "incorrect_answers": ["Childhood friends", "Former classmates", "Fraternity house members"]
}, {
  "category": "Entertainment: Musicals & Theatres",
  "type": "multiple",
  "difficulty": "medium",
  "question": "What play is the quote &quot;Hell is other people&quot; from?",
  "correct_answer": "No Exit",
  "incorrect_answers": ["The Devil and the Good Lord", "The Condemned of Altona", "The Flies"]
}, {
  "category": "Animals",
  "type": "multiple",
  "difficulty": "easy",
  "question": "What is Grumpy Cat&#039;s real name?",
  "correct_answer": "Tardar Sauce",
  "incorrect_answers": ["Sauce", "Minnie", "Broccoli"]
}, {
  "category": "Entertainment: Video Games",
  "type": "multiple",
  "difficulty": "hard",
  "question": "In Monster Hunter Generations, which of these hunter arts are exclusive to the Longsword?",
  "correct_answer": "Unhinged Spirit",
  "incorrect_answers": ["Shoryugeki", "Provoke", "Demon Riot"]
}, {
  "category": "Celebrities",
  "type": "multiple",
  "difficulty": "medium",
  "question": "What is generally considered to be William Shakespeare&#039;s birth date?",
  "correct_answer": "April 23rd, 1564",
  "incorrect_answers": ["July 4th, 1409", "September 29th, 1699", "December 1st, 1750"]
}, {
  "category": "Entertainment: Books",
  "type": "multiple",
  "difficulty": "easy",
  "question": "What is the title of the first Sherlock Holmes book by Arthur Conan Doyle?",
  "correct_answer": "A Study in Scarlet",
  "incorrect_answers": ["The Sign of the Four", "A Case of Identity", "The Doings of Raffles Haw"]
}, {
  "category": "Entertainment: Video Games",
  "type": "multiple",
  "difficulty": "medium",
  "question": "In the Halo series, what fleet was Thel &#039;Vadam supreme commander of before being branded an Arbiter?",
  "correct_answer": "Fleet of Particular Justice",
  "incorrect_answers": ["Fleet of Sacred Consecration", "Fleet of Furious Redemption", "Fleet of Righteous Vigilance"]
}, {
  "category": "Entertainment: Music",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Which country does the electronic music duo &quot;The Knife&quot; originate from?",
  "correct_answer": "Sweden",
  "incorrect_answers": ["Finland", "Denmark", "Norway"]
}, {
  "category": "Sports",
  "type": "multiple",
  "difficulty": "medium",
  "question": "What is the oldest team in Major League Baseball?",
  "correct_answer": "Atlanta Braves",
  "incorrect_answers": ["Chicago Cubs", "Cincinnati Reds", "St. Louis Cardinals"]
}, {
  "category": "Entertainment: Music",
  "type": "multiple",
  "difficulty": "easy",
  "question": "Who was featured in the song &quot;Words&quot; by Feint? ",
  "correct_answer": "Laura Brehm",
  "incorrect_answers": ["Anna Yvette ", "Danyka Nadeau", "Veela"]
}, {
  "category": "Science: Computers",
  "type": "multiple",
  "difficulty": "hard",
  "question": "Which of the following is the oldest of these computers by release date?",
  "correct_answer": "TRS-80",
  "incorrect_answers": ["Commodore 64", "ZX Spectrum", "Apple 3"]
}, {
  "category": "Entertainment: Video Games",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Which of the following has Jennifer Taylor NOT voiced?",
  "correct_answer": "Sarah Kerrigan",
  "incorrect_answers": ["Princess Peach", "Zoey", "Cortana"]
}, {
  "category": "Science & Nature",
  "type": "multiple",
  "difficulty": "medium",
  "question": "What is radiation measured in?",
  "correct_answer": "Gray ",
  "incorrect_answers": ["Watt", "Decibel", "Kelvin"]
}, {
  "category": "Entertainment: Video Games",
  "type": "multiple",
  "difficulty": "medium",
  "question": "One of the Nintendo Entertainment System voice channels supports playback of sound samples. Which one?",
  "correct_answer": "DMC",
  "incorrect_answers": ["Noise", "Triangle", "Square"]
}, {
  "category": "Entertainment: Video Games",
  "type": "multiple",
  "difficulty": "medium",
  "question": "How many regular Sunken Sea Scrolls are there in &quot;Splatoon&quot;?",
  "correct_answer": "27",
  "incorrect_answers": ["32", "30", "5"]
}, {
  "category": "Entertainment: Video Games",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Which German city does the map &quot;Clubhouse&quot; in &quot;Tom Clancy&#039;s Rainbow Six Siege&quot; take place in?",
  "correct_answer": "Hannover",
  "incorrect_answers": ["Berlin", "Hamburg", "Munich"]
}, {
  "category": "General Knowledge",
  "type": "multiple",
  "difficulty": "hard",
  "question": "According to Fair Works Australia, how long do you have to work to get Long Service Leave?",
  "correct_answer": "7 years",
  "incorrect_answers": ["2 years", "8 years", "6 months"]
}, {
  "category": "Entertainment: Music",
  "type": "multiple",
  "difficulty": "medium",
  "question": "Who was the lead singer and frontman of rock band R.E.M?",
  "correct_answer": "Michael Stipe",
  "incorrect_answers": ["Chris Martin", "Thom Yorke", "George Michael"]
}, {
  "category": "Science: Computers",
  "type": "multiple",
  "difficulty": "hard",
  "question": "Released in 2001, the first edition of Apple&#039;s Mac OS X operating system (version 10.0) was given what animal code name?",
  "correct_answer": "Cheetah",
  "incorrect_answers": ["Puma", "Tiger", "Leopard"]
}, {
  "category": "Entertainment: Film",
  "type": "multiple",
  "difficulty": "easy",
  "question": "What is the name of the island that &quot;Jurassic Park&quot; is built on?",
  "correct_answer": "Isla Nublar",
  "incorrect_answers": ["Isla Sorna", "Isla Muerta", "Isla Pena"]
}, {
  "category": "History",
  "type": "multiple",
  "difficulty": "medium",
  "question": "The minigun was designed in 1960 by which manufacturer.",
  "correct_answer": "General Electric",
  "incorrect_answers": ["Colt Firearms", "Heckler &amp; Koch", "Sig Sauer"]
}, {
  "category": "Entertainment: Video Games",
  "type": "multiple",
  "difficulty": "hard",
  "question": "When was the Valve Corporation founded?",
  "correct_answer": "August 24, 1996",
  "incorrect_answers": ["December 26, 1994", "March 22, 1997", "March 13, 1997"]
}, {
  "category": "Mythology",
  "type": "multiple",
  "difficulty": "easy",
  "question": "What mythology did the god &quot;Apollo&quot; come from?",
  "correct_answer": "Greek and Roman",
  "incorrect_answers": ["Roman and Spanish", "Greek and Chinese", "Greek, Roman and Norse"]
}, {
  "category": "Entertainment: Film",
  "type": "multiple",
  "difficulty": "easy",
  "question": "What was the first feature-length computer-animated movie?",
  "correct_answer": "Toy Story",
  "incorrect_answers": ["Tron", "Lion king", "101 Dalmatians"]
}, {
  "category": "Geography",
  "type": "multiple",
  "difficulty": "easy",
  "question": "What is the capital of Scotland?",
  "correct_answer": "Edinburgh",
  "incorrect_answers": ["Glasgow", "Dundee", "London"]
}, {
  "category": "General Knowledge",
  "type": "multiple",
  "difficulty": "easy",
  "question": "In which fast food chain can you order a Jamocha Shake?",
  "correct_answer": "Arby&#039;s",
  "incorrect_answers": ["McDonald&#039;s", "Burger King", "Wendy&#039;s"]
}, {
  "category": "History",
  "type": "multiple",
  "difficulty": "hard",
  "question": "In addition to his career as an astrologer and &quot;prophet&quot;, Nostradamus published a 1555 treatise that included a section on what?",
  "correct_answer": "Making jams and jellies",
  "incorrect_answers": ["Teaching parrots to talk", "Cheating at card games", "Digging graves"]
}, {
  "category": "General Knowledge",
  "type": "multiple",
  "difficulty": "hard",
  "question": "Where is Apple Inc. headquartered?",
  "correct_answer": "Cupertino, California",
  "incorrect_answers": ["Redwood City, California", "Redmond, Washington", "Santa Monica, CA"]
}];
exports.QUESTIONS = QUESTIONS;
},{}],"scenes/QuestionScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestionScene = void 0;

var _CST = require("../CST");

var _Questions = require("../../assets/Questions.js");

var _GameScene = require("./GameScene");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var QuestionScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(QuestionScene, _Phaser$Scene);

  function QuestionScene() {
    _classCallCheck(this, QuestionScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(QuestionScene).call(this, {
      key: _CST.CST.SCENES.QUESTION
    }));
  }

  _createClass(QuestionScene, [{
    key: "init",
    value: function init(questionIndex) {
      this.questionIndex = questionIndex;
    }
  }, {
    key: "preload",
    value: function preload() {
      this.ghosts = ['blinky', 'inky', 'pinky', 'clyde'];
      this.ghostHeight = 16;
      this.ghostWidth = 16;

      for (var i = 0; i < this.ghosts.length; i++) {
        this.load.spritesheet(this.ghosts[i], this.ghosts[i] + '.png', {
          frameWidth: this.ghostWidth,
          frameHeight: this.ghostHeight
        });
      }
    }
  }, {
    key: "create",
    value: function create() {
      this.textStyle = {
        fontFamily: '"Roboto Condensed"',
        fontSize: 30,
        color: "blue",
        width: 400
      };
      this.question = _Questions.QUESTIONS[this.questionIndex].question;
      this.questionDifficulty = _Questions.QUESTIONS[this.questionIndex].difficulty;
      this.printingQuestion = true;
      this.printingAnswer = -1;
      this.distanceFromLeft = 480;
      this.text = this.add.text(this.distanceFromLeft, 50, '', this.textStyle);
      this.i = 0;
      this.delay = 3;
      this.delayCount = 0;
      this.lettersPerLine = 25;
      this.answers = [_Questions.QUESTIONS[this.questionIndex].correct_answer, _Questions.QUESTIONS[this.questionIndex].incorrect_answers[0], _Questions.QUESTIONS[this.questionIndex].incorrect_answers[1], _Questions.QUESTIONS[this.questionIndex].incorrect_answers[2]];
      this.shuffleArray(this.answers);

      for (var i = 0; i < this.ghosts.length; i++) {
        this.anims.create({
          key: this.ghosts[i] + 'Animation',
          frames: this.anims.generateFrameNumbers(this.ghosts[i], {
            frames: [6, 7, 6, 7, 6, 7, 0, 1, 0, 1, 6, 7, 2, 3, 2, 3, 6, 7, 8, 9, 8, 9]
          }),
          frameRate: 7,
          repeat: -1
        });
        this.add.sprite(this.distanceFromLeft + 20, 250 + i * (this.ghostHeight * 3 + 5), this.ghosts[i], 0).anims.play(this.ghosts[i] + 'Animation').setScale(3);
      }

      _GameScene.GameScene.setQuestion(this.question, this.answers, _Questions.QUESTIONS[this.questionIndex].correct_answer, this.questionDifficulty);
    }
  }, {
    key: "update",
    value: function update() {
      if (++this.delayCount === this.delay) {
        if (this.printingQuestion) {
          this.text.text += this.question[this.i];
          this.i++;

          if (!(this.i % this.lettersPerLine)) {
            this.text.text += '\n';
          }

          if (this.question[this.i] === undefined) {
            this.printingQuestion = false;
            this.printingAnswer = 1;
          }
        } else {
          //print answer
          if (this.printingAnswer <= 4) {
            this.add.text(this.distanceFromLeft + this.ghostWidth * 3 + 10, 250 + (this.printingAnswer - 1) * (this.ghostHeight * 3 + 5) - 10, this.answers[this.printingAnswer - 1], this.textStyle);
          }

          this.printingAnswer++;

          if (this.printingAnswer === 40) {
            this.scene.resume(_CST.CST.SCENES.GAME);
          }
        }

        this.delayCount = 0;
      }
    }
  }, {
    key: "randInt",
    value: function randInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }, {
    key: "shuffleArray",
    value: function shuffleArray(array) {
      for (var i = 0; i < 100; i++) {
        var indexI = this.randInt(0, array.length - 1);
        var indexJ = this.randInt(0, array.length - 1);
        var tmp = array[indexI];
        array[indexI] = array[indexJ];
        array[indexJ] = tmp;
      }
    }
  }]);

  return QuestionScene;
}(Phaser.Scene);

exports.QuestionScene = QuestionScene;
},{"../CST":"CST.js","../../assets/Questions.js":"../assets/Questions.js","./GameScene":"scenes/GameScene.js"}],"scenes/GameScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameScene = void 0;

var _CST = require("../CST");

var _QuestionScene = require("./QuestionScene");

var _Questions = require("../../assets/Questions");

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
    key: "init",
    value: function init(config) {
      this.multiplayer = config.multiplayer === true;
      this.playerName = config.playerName;
    }
  }, {
    key: "preload",
    value: function preload() {
      this.initStaticConfigurations();
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

      for (var ghost in this.ghosts) {
        this.load.spritesheet(ghost, ghost + '.png', {
          frameWidth: this.ghostWidth,
          frameHeight: this.ghostHeight
        });
      }
    }
  }, {
    key: "create",
    value: function create() {
      if (this.multiplayer) {
        this.socket = io.connect('http://localhost:1235');
        this.manageSocket();
      }

      this.map = this.make.tilemap({
        key: 'map'
      });
      var tileset = this.map.addTilesetImage('pacman-tiles', 'tiles');
      this.layer = this.map.createDynamicLayer('Pacman', tileset);
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
      this.initPacman('pacman', this.playerName, this);
      this.pacman.scoreText = this.add.text(this.textDistanceFromLeft, 440, '', this.textStyle);
      this.updateScore(this.pacman);
      this.input.keyboard.on('keydown', function (eventName, event) {
        switch (eventName.key) {
          case 'ArrowDown':
            this.pacman.nextDirection = Phaser.DOWN;
            break;

          case 'ArrowUp':
            this.pacman.nextDirection = Phaser.UP;
            break;

          case 'ArrowLeft':
            this.pacman.nextDirection = Phaser.LEFT;
            break;

          case 'ArrowRight':
            this.pacman.nextDirection = Phaser.RIGHT;
            break;

          default:
            console.log('invalid button pressed: ' + eventName.key);
        }

        if (this.multiplayer) {
          this.socket.emit('updatePacmanNextDirection', this.pacman.nextDirection);
        }
      }, this);

      if (!this.multiplayer) {
        this.gameStarted = true;
      }

      this.addGhosts(this); // this.addGhostsCollideAction();

      this.addCoins();
      this.addCoinsCollideAction();
    }
  }, {
    key: "update",
    value: function update() {
      if (!this.gameStarted) return;
      /* if game is in "candy eaten" time */

      if (this.timeToEatAnswer && ++this.timeToEatAnswerCounter === this.timeToEatAnswerDelay) {
        if (--this.timeToEatAnswer === 0) {
          this.scene.stop(_CST.CST.SCENES.QUESTION);
        }

        this.timeToEatAnswerCounter = 0;
      }

      this.updatePacman(this.pacman);

      if (this.multiplayer) {
        this.updatePacman(this.otherPacman);
      }

      if (!this.multiplayer || this.masterOrSlave === 'master') {
        this.updateGhosts();
      }
    }
  }, {
    key: "canMoveInDirection",
    value: function canMoveInDirection(x, y, direction) {
      var tile;

      switch (direction) {
        case Phaser.LEFT:
          tile = this.map.getTileAt(x - 1, y, true);
          break;

        case Phaser.RIGHT:
          tile = this.map.getTileAt(x + 1, y, true);
          break;

        case Phaser.UP:
          tile = this.map.getTileAt(x, y - 1, true);
          break;

        case Phaser.DOWN:
          tile = this.map.getTileAt(x, y + 1, true);
          break;

        default:
          console.log('invalid direction: ' + direction);
      }

      var tileIndex = tile === null ? -1 : tile.index;
      return tileIndex === this.safeTile || tileIndex === this.dotTile;
    }
  }, {
    key: "updateDirection",
    value: function updateDirection(gameObject, isGhost) {
      switch (gameObject.direction) {
        case Phaser.LEFT:
          if (isGhost) {
            if (!this.timeToEatAnswer) {
              gameObject.anims.stop();
              gameObject.anims.play(gameObject.name + 'Left');
            }
          } else {
            gameObject.angle = 180;
          }

          gameObject.body.setVelocityX(isGhost ? -this.ghostSpeed : -this.speed);
          gameObject.body.setVelocityY(0);
          break;

        case Phaser.RIGHT:
          if (isGhost) {
            if (!this.timeToEatAnswer) {
              gameObject.anims.stop();
              gameObject.anims.play(gameObject.name + 'Right');
            }
          } else {
            gameObject.angle = 0;
          }

          gameObject.body.setVelocityX(isGhost ? this.ghostSpeed : this.speed);
          gameObject.body.setVelocityY(0);
          break;

        case Phaser.UP:
          if (isGhost) {
            if (!this.timeToEatAnswer) {
              gameObject.anims.stop();
              gameObject.anims.play(gameObject.name + 'Up');
            }
          } else {
            gameObject.angle = 270;
          }

          gameObject.body.setVelocityX(0);
          gameObject.body.setVelocityY(isGhost ? -this.ghostSpeed : -this.speed);
          break;

        case Phaser.DOWN:
          if (isGhost) {
            if (!this.timeToEatAnswer) {
              gameObject.anims.stop();
              gameObject.anims.play(gameObject.name + 'Down');
            }
          } else {
            gameObject.angle = 90;
          }

          gameObject.body.setVelocityX(0);
          gameObject.body.setVelocityY(isGhost ? this.ghostSpeed : this.speed);
          break;

        default:
          console.log('updateDirection: invalid direction: ' + gameObject.direction);
      }
    }
  }, {
    key: "addCoins",
    value: function addCoins() {
      this.anims.create({
        key: 'coin',
        frames: this.anims.generateFrameNumbers('coin', {
          frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        }),
        frameRate: 16,
        repeat: -1
      });

      for (var spot in this.coins) {
        this.coins[spot]['coin'] = this.add.sprite(GameScene.indexToPixel(this.coins[spot].x), GameScene.indexToPixel(this.coins[spot].y), 'coin', 0);
        this.physics.world.enable(this.coins[spot].coin);
        this.coins[spot]['coin'].setScale(0.5);
        this.coins[spot]['coin'].body.setSize(this.coinSize, this.coinSize);
        this.coins[spot]['coin'].anims.play('coin');
      }
    }
  }, {
    key: "iAteCandy",
    value: function iAteCandy(spot) {
      var questionIndex = this.randInt(0, _Questions.QUESTIONS.length);

      if (this.multiplayer) {
        this.socket.emit('candy', {
          'questionIndex': questionIndex,
          'spot': spot
        });
      }

      this.candyEaten(spot, questionIndex);
    }
  }, {
    key: "candyEaten",
    value: function candyEaten(spot, questionIndex) {
      this.coins[spot].coin.destroy();
      this.scene.launch(_CST.CST.SCENES.QUESTION, questionIndex);
      this.scene.pause();
      this.timeToEatAnswer = 14;

      for (var ghost in this.ghosts) {
        this.ghosts[ghost].ghost.anims.stop();
        this.ghosts[ghost].ghost.anims.play(ghost + 'Blue');
      }

      this.updateDirection(this.pacman, false);
    }
  }, {
    key: "addCoinsCollideAction",
    value: function addCoinsCollideAction() {
      var _this = this;

      var _loop = function _loop(spot) {
        _this.physics.add.collider(_this.pacman, _this.coins[spot].coin, function () {
          this.iAteCandy(spot);
        }, null, _this);
      };

      for (var spot in this.coins) {
        _loop(spot);
      }
    }
  }, {
    key: "addGhosts",
    value: function addGhosts(context) {
      for (var ghost in this.ghosts) {
        context.anims.create({
          key: ghost + 'Right',
          frames: context.anims.generateFrameNumbers(ghost, {
            frames: [0, 1]
          }),
          frameRate: 10,
          repeat: -1
        });
        context.anims.create({
          key: ghost + 'Left',
          frames: context.anims.generateFrameNumbers(ghost, {
            frames: [2, 3]
          }),
          frameRate: 10,
          repeat: -1
        });
        context.anims.create({
          key: ghost + 'Up',
          frames: context.anims.generateFrameNumbers(ghost, {
            frames: [4, 5]
          }),
          frameRate: 10,
          repeat: -1
        });
        context.anims.create({
          key: ghost + 'Down',
          frames: context.anims.generateFrameNumbers(ghost, {
            frames: [6, 7]
          }),
          frameRate: 10,
          repeat: -1
        });
        context.anims.create({
          key: ghost + 'Blue',
          frames: context.anims.generateFrameNumbers(ghost, {
            frames: [8, 9, 0, 1]
          }),
          frameRate: 10,
          repeat: -1
        });
        context.anims.create({
          key: ghost + 'Eaten',
          frames: context.anims.generateFrameNumbers(ghost, {
            frames: [10, 11, 12, 13, 14, 15]
          }),
          frameRate: 10,
          repeat: -1
        });
        context.ghosts[ghost].ghost = context.add.sprite(GameScene.indexToPixel(context.ghosts[ghost].startX), GameScene.indexToPixel(context.ghosts[ghost].startY), ghost, 0);
        context.ghosts[ghost].ghost.name = ghost;
        context.ghosts[ghost].ghost.setScale(1.5);
        context.ghosts[ghost].ghost.anims.play(ghost + 'Right');
        context.ghosts[ghost].ghost.direction = Phaser.RIGHT;
        context.ghosts[ghost].ghost.nextDirection = Phaser.RIGHT;
        context.physics.add.collider(context.ghosts[ghost].ghost, context.layer);
        context.physics.world.enable(context.ghosts[ghost].ghost);
        context.ghosts[ghost].ghost.body.setSize(context.ghostSize, context.ghostSize);
        context.ghosts[ghost].ghost.body.setVelocityX(context.ghostSpeed);
      }
    }
  }, {
    key: "addGhostsCollideAction",
    value: function addGhostsCollideAction() {
      var _this2 = this;

      var _loop2 = function _loop2(ghost) {
        _this2.physics.add.overlap(_this2.pacman, _this2.ghosts[ghost].ghost, function () {
          if (this.timeToEatAnswer) {
            this.ghosts[ghost].ghost.setX(GameScene.indexToPixel(this.ghosts[ghost].startX));
            this.ghosts[ghost].ghost.setY(GameScene.indexToPixel(this.ghosts[ghost].startY));
            this.ghosts[ghost].ghost.anims.play(ghost + 'Right');
            this.ghosts[ghost].ghost.direction = Phaser.RIGHT;
            this.ghosts[ghost].ghost.nextDirection = Phaser.RIGHT;
            this.updateDirection(this.ghosts[ghost].ghost, true);

            if (GameScene.question.answers[this.ghosts[ghost].index] === GameScene.question.correctAnswer) {
              alert('correct');
              this.pacman.score += GameScene.question.getCorrectAnswerPoints();
            } else {
              alert('wrong');
              this.pacman.score -= GameScene.question.getWrongAnswerPoints();
            }
          } else {
            this.gameOver('lose');
            this.socket.emit('gameOver', '');
          }
        }, null, _this2);
      };

      for (var ghost in this.ghosts) {
        _loop2(ghost);
      }
    }
  }, {
    key: "randInt",
    value: function randInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }, {
    key: "initStaticConfigurations",
    value: function initStaticConfigurations() {
      this.textStyle = {
        fontFamily: '"Roboto Condensed"',
        fontSize: 30,
        color: "blue",
        width: 400
      };
      this.ghosts = {
        blinky: {
          index: 0,
          startX: 13,
          startY: 11
        },
        inky: {
          index: 1,
          startX: 11,
          startY: 11
        },
        pinky: {
          index: 2,
          startX: 13,
          startY: 11
        },
        clyde: {
          index: 3,
          startX: 15,
          startY: 11
        }
      };
      this.coins = {
        upperLeft: {
          x: 1,
          y: 3,
          direction: Phaser.LEFT
        },
        upperRight: {
          x: 26,
          y: 3,
          direction: Phaser.LEFT
        },
        lowerRight: {
          x: 26,
          y: 22,
          direction: Phaser.LEFT
        },
        lowerLeft: {
          x: 1,
          y: 22,
          direction: Phaser.LEFT
        }
      };
      this.gameStarted = false;
      this.textDistanceFromLeft = 470;
      this.ghostHeight = 16;
      this.ghostWidth = 16;
      this.timeToEatAnswerDelay = 30;
      this.timeToEatAnswerCounter = 0;
      this.timeToEatAnswer = 0;
      this.ghostCheckDirectionsDelay = 11;
      this.ghostCheckDirectionsCounter = 0;
      this.safeTile = 14;
      this.dotTile = 7;
      this.ghostHouseTile = 83;
      this.speed = 100;
      this.ghostSpeed = 70;
      this.pacmanSize = 12.5;
      this.ghostSize = 0.1;
      this.coinSize = 9;
      this.threshold = 2.05;
      this.ghostThreshold = 1.9;
      this.dotCount = 0;
      this.numTotalDots = 272;
    }
  }, {
    key: "initPacman",
    value: function initPacman(pacmanName, playerName, context) {
      context[pacmanName] = context.add.sprite(GameScene.indexToPixel(14), GameScene.indexToPixel(17), 'pacman', 2);
      context[pacmanName].playerName = playerName;
      context[pacmanName].marker = new Phaser.Geom.Point();
      /* set collision for all tiles besides dots and empty tiles */

      context.layer.setCollisionByExclusion([context.safeTile, context.dotTile]);
      /* set collision between pacman and the layer */

      context.physics.add.collider(context[pacmanName], context.layer);
      context.physics.world.enable(context[pacmanName]);
      context[pacmanName].body.setVelocityX(100);
      context[pacmanName].body.setSize(context.pacmanSize, context.pacmanSize);
      context[pacmanName].anims.play('moving');
      context[pacmanName].direction = Phaser.RIGHT;
      context[pacmanName].nextDirection = Phaser.RIGHT;
      context[pacmanName].score = 0;
    }
  }, {
    key: "getOppositeDirection",
    value: function getOppositeDirection(direction) {
      switch (direction) {
        case Phaser.UP:
          return Phaser.DOWN;

        case Phaser.DOWN:
          return Phaser.UP;

        case Phaser.RIGHT:
          return Phaser.LEFT;

        case Phaser.LEFT:
          return Phaser.RIGHT;

        default:
          console.log('getOppositeDirection: invalid direction!');
          return Phaser.AUTO;
      }
    }
  }, {
    key: "getNextTile",
    value: function getNextTile(currentTile, currentDirection, plane) {
      switch (currentDirection) {
        case Phaser.UP:
          return plane === 'X' ? currentTile : currentTile - 1;

        case Phaser.DOWN:
          return plane === 'X' ? currentTile : currentTile + 1;

        case Phaser.RIGHT:
          return plane === 'X' ? currentTile + 1 : currentTile;

        case Phaser.LEFT:
          return plane === 'X' ? currentTile - 1 : currentTile;

        default:
          console.log('getNextTile: invalid direction!');
          return Phaser.AUTO;
      }
    }
  }, {
    key: "gameOver",
    value: function gameOver(status) {
      if (status === 'win') {
        alert('you have won!');
      } else {
        alert('you have lost!');
      }

      this.scene.start(_CST.CST.SCENES.MENU);
      this.scene.stop(_CST.CST.SCENES.GAME);
    }
  }, {
    key: "dotEaten",
    value: function dotEaten(x, y) {
      var tile = this.map.getTileAt(x, y, true);
      this.dotCount++;
      tile.index = this.safeTile;

      if (this.dotCount === this.numTotalDots) {
        this.gameOver('win');
      }
    }
  }, {
    key: "updatePacman",
    value: function updatePacman(pacman) {
      var pacmanX = pacman.x;
      var pacmanY = pacman.y;
      pacman.marker.x = this.map.worldToTileX(pacmanX);
      pacman.marker.y = this.map.worldToTileY(pacmanY);
      var pacmanInCenterOfSquare = Math.abs(pacmanX - GameScene.indexToPixel(pacman.marker.x)) < this.threshold && Math.abs(pacmanY - GameScene.indexToPixel(pacman.marker.y)) < this.threshold;
      var pacmanCanTurn = this.canMoveInDirection(pacman.marker.x, pacman.marker.y, pacman.nextDirection);
      pacman.currentTile = this.map.getTileAt(pacman.marker.x, pacman.marker.y, true);

      if (pacman.currentTile.index === this.dotTile) {
        this.dotEaten(pacman.marker.x, pacman.marker.y);
        pacman.score++;
        this.updateScore(pacman);
      }

      if (pacman.nextDirection === pacman.direction && !pacmanCanTurn) {
        if (pacman.anims.isPlaying) {
          pacman.anims.stop();
          pacman.anims.play('stop');
        }
      } else {
        if (!pacman.anims.isPlaying) {
          pacman.anims.play('moving');
        }
      }

      if (pacman.nextDirection !== pacman.direction && pacmanCanTurn && pacmanInCenterOfSquare) {
        pacman.direction = pacman.nextDirection;
        this.updateDirection(pacman, false);
      }
    }
  }, {
    key: "updateScore",
    value: function updateScore(pacman) {// pacman.scoreText.text = 'Score ' + pacman.playerName + ': ' + pacman.score;
    }
  }, {
    key: "updateGhosts",
    value: function updateGhosts() {
      var _this3 = this;

      for (var ghost in this.ghosts) {
        var ghostX = this.ghosts[ghost].ghost.x;
        var ghostY = this.ghosts[ghost].ghost.y;
        this.ghosts[ghost].currentTileX = this.map.worldToTileX(ghostX);
        this.ghosts[ghost].currentTileY = this.map.worldToTileY(ghostY);
        var ghostInCenterOfSquare = Math.abs(ghostX - GameScene.indexToPixel(this.ghosts[ghost].currentTileX)) < this.ghostThreshold && Math.abs(ghostY - GameScene.indexToPixel(this.ghosts[ghost].currentTileY)) < this.ghostThreshold;

        if (ghostInCenterOfSquare && this.ghosts[ghost].ghost.nextDirection !== this.ghosts[ghost].ghost.direction && this.canMoveInDirection(this.ghosts[ghost].currentTileX, this.ghosts[ghost].currentTileY, this.ghosts[ghost].ghost.nextDirection)) {
          if (this.multiplayer) {
            this.socket.emit('ghostTurn', {
              'ghost': ghost,
              'direction': this.ghosts[ghost].ghost.nextDirection,
              'x': this.ghosts[ghost].ghost.x,
              'y': this.ghosts[ghost].ghost.y
            });
          }

          this.ghosts[ghost].ghost.direction = this.ghosts[ghost].ghost.nextDirection;
          this.updateDirection(this.ghosts[ghost].ghost, true);
        }

        if (this.timeToEatAnswer === 0) {
          this.updateDirection(this.ghosts[ghost].ghost, true);
        }
      }

      if (this.ghostCheckDirectionsCounter === this.ghostCheckDirectionsDelay) {
        var _loop3 = function _loop3() {
          var ghostAvailableDirections = [];

          var nextTileX = _this3.getNextTile(_this3.ghosts[ghost].currentTileX, _this3.ghosts[ghost].ghost.direction, 'X');

          var nextTileY = _this3.getNextTile(_this3.ghosts[ghost].currentTileY, _this3.ghosts[ghost].ghost.direction, 'Y');

          var directions = [Phaser.LEFT, Phaser.RIGHT, Phaser.UP, Phaser.DOWN];
          directions.forEach(function (direction) {
            if (direction !== this.getOppositeDirection(this.ghosts[ghost].ghost.direction) && this.canMoveInDirection(nextTileX, nextTileY, direction)) {
              ghostAvailableDirections.push(direction);
            }
          }, _this3);

          if (ghostAvailableDirections.length) {
            _this3.ghosts[ghost].ghost.nextDirection = ghostAvailableDirections[_this3.randInt(0, ghostAvailableDirections.length)];
          } else {
            _this3.ghosts[ghost].ghost.nextDirection = _this3.getOppositeDirection(_this3.ghosts[ghost].ghost.direction);
          }
        };

        for (var ghost in this.ghosts) {
          _loop3();
        }

        this.ghostCheckDirectionsCounter = 0;
      }

      this.ghostCheckDirectionsCounter++;
    }
  }, {
    key: "manageSocket",
    value: function manageSocket() {
      var thisContext = this; // this.socket.emit('updateName', {
      //     'playerName' : this.playerName,
      // });

      this.socket.on('tooManyPlayers', function () {
        alert('too many players..');
        thisContext.scene.start(_CST.CST.SCENES.MENU);
        thisContext.scene.stop(_CST.CST.SCENES.GAME);
      });
      this.socket.on('wait', function () {
        /* i am the first player, wait for second */
        thisContext.scene.pause();
      });
      this.socket.on('startGame', function (data) {
        console.log('start game:', data);
        /* second player has connected, game can start */

        thisContext.masterOrSlave = data.masterOrSlave;
        thisContext.scene.resume(_CST.CST.SCENES.GAME);
        thisContext.initPacman('otherPacman', data.otherPlayerName, thisContext);
        thisContext.gameStarted = true;
      });
      this.socket.on('dot', function (data) {
        thisContext.dotEaten(data.x, data.y);
      });
      this.socket.on('candy', function (data) {
        thisContext.candyEaten(data.spot, data.questionIndex);
      });
      this.socket.on('gameOver', function (data) {
        thisContext.gameOver(data);
      });
      this.socket.on('updatePacmanNextDirection', function (nextDirection) {
        thisContext.otherPacman.nextDirection = nextDirection;
      });
      this.socket.on('ghostTurn', function (data) {
        thisContext.ghosts[data.ghost].ghost.direction = data.direction;
        thisContext.ghosts[data.ghost].ghost.setX(data.x);
        thisContext.ghosts[data.ghost].ghost.setY(data.y);
        thisContext.updateDirection(thisContext.ghosts[data.ghost].ghost, true);
      });
    }
  }], [{
    key: "indexToPixel",
    value: function indexToPixel(index) {
      return index * 16 + 8;
    }
  }, {
    key: "setQuestion",
    value: function setQuestion(question, answers, correctAnswer, difficulty) {
      GameScene.question = new Question(question, answers, correctAnswer, difficulty);
      console.log('correct answer: ' + GameScene.question.correctAnswer);
    }
  }]);

  return GameScene;
}(Phaser.Scene);

exports.GameScene = GameScene;

var Question =
/*#__PURE__*/
function () {
  function Question(question, answers, correctAnswer, difficulty) {
    _classCallCheck(this, Question);

    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.difficulty = difficulty;
    this.points = {
      'easy': 100,
      'medium': 200,
      'hard': 400
    };
  }

  _createClass(Question, [{
    key: "getCorrectAnswerPoints",
    value: function getCorrectAnswerPoints() {
      return this.points[this.difficulty];
    }
  }, {
    key: "getWrongAnswerPoints",
    value: function getWrongAnswerPoints() {
      return this.points[this.difficulty] / 2;
    }
  }]);

  return Question;
}();
},{"../CST":"CST.js","./QuestionScene":"scenes/QuestionScene.js","../../assets/Questions":"../assets/Questions.js"}],"scenes/MenuScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;

var _CST = require("../CST");

var _GameScene = require("./GameScene");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var OPTIONS = {
  SINGLE_PLAYER: 1,
  MULTI_PLAYER: 2,
  SCORE_BOARD: 3,
  MANAGE_QUESTIONS: 4
};

var MenuScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);

  function MenuScene() {
    _classCallCheck(this, MenuScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuScene).call(this, {
      key: _CST.CST.SCENES.MENU
    }));
  }

  _createClass(MenuScene, [{
    key: "preload",
    value: function preload() {
      this.load.spritesheet('pacman', 'pacman.png', {
        frameWidth: 32,
        frameHeight: 32
      });
      this.initStaticConfigurations();
    }
  }, {
    key: "create",
    value: function create() {
      this.textStyle = {
        fontFamily: '"Roboto Condensed"',
        fontSize: 50,
        color: "blue"
      };
      /* add menu options to screen */

      this.add.text(this.distanceFromLeft, 60, 'MENU', this.textStyle);
      this.add.text(this.distanceFromLeft, this.distanceFromTop, 'single player', this.textStyle);
      this.add.text(this.distanceFromLeft, this.distanceFromTop + this.textHeight, 'multi player', this.textStyle);
      this.add.text(this.distanceFromLeft, this.distanceFromTop + 2 * this.textHeight, 'score board', this.textStyle);
      this.add.text(this.distanceFromLeft, this.distanceFromTop + 3 * this.textHeight, 'manage questions', this.textStyle);
      /* add the moving pacman */

      this.pacman = this.add.sprite(this.distanceFromLeft - 30, this.distanceFromTop + 28, 'pacman', 2);
      this.anims.create({
        key: 'moving',
        frames: this.anims.generateFrameNumbers('pacman', {
          frames: [2, 1, 0, 1]
        }),
        frameRate: 16,
        repeat: -1
      });
      this.pacman.anims.play('moving');
      this.pacman.setScale(1.5);
      this.input.keyboard.on('keydown', function (eventName, event) {
        switch (eventName.key) {
          case 'ArrowDown':
            if (this.option < 4) {
              this.pacman.setY(this.pacman.y + this.textHeight);
              this.option++;
            }

            break;

          case 'ArrowUp':
            if (this.option > 1) {
              this.pacman.setY(this.pacman.y - this.textHeight);
              this.option--;
            }

            break;

          case 'Enter':
            switch (this.option) {
              case OPTIONS.SINGLE_PLAYER:
                this.scene.start(_CST.CST.SCENES.INPUT_NAMES, 0xdc);
                break;

              case OPTIONS.MULTI_PLAYER:
                this.scene.start(_CST.CST.SCENES.INPUT_NAMES, true);
                break;

              case OPTIONS.SCORE_BOARD:
                this.scene.start(_CST.CST.SCENES.SCORE_BOARD);
                break;

              case OPTIONS.MANAGE_QUESTIONS:
                this.scene.start(_CST.CST.SCENES.MANAGE_QUESTIONS);
                break;

              default:
                console.log('option ' + this.option + ' not yet supported');
            }

            break;

          default:
            console.log('invalid button pressed: ' + eventName.key);
        }
      }, this);
    }
  }, {
    key: "initStaticConfigurations",
    value: function initStaticConfigurations() {
      this.distanceFromLeft = 320;
      this.distanceFromTop = 150;
      this.textHeight = 70;
      this.option = 1;
    }
  }]);

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"CST.js","./GameScene":"scenes/GameScene.js"}],"scenes/InputNamesScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputNamesScene = void 0;

var _CST = require("../CST");

var _GameScene = require("./GameScene");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var InputNamesScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(InputNamesScene, _Phaser$Scene);

  function InputNamesScene() {
    _classCallCheck(this, InputNamesScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(InputNamesScene).call(this, {
      key: _CST.CST.SCENES.INPUT_NAMES
    }));
  }

  _createClass(InputNamesScene, [{
    key: "init",
    value: function init(multiplayer) {
      this.multiplayer = multiplayer === true;
    }
  }, {
    key: "preload",
    value: function preload() {
      this.load.spritesheet('pacman', 'pacman.png', {
        frameWidth: 32,
        frameHeight: 32
      });
      this.initStaticConfigurations();
    }
  }, {
    key: "create",
    value: function create() {
      this.textStyle = {
        fontFamily: '"Roboto Condensed"',
        fontSize: 50,
        color: "blue"
      };
      this.namePlayer1 = '';
      this.basicTextPlayer1 = 'Enter player' + (this.multiplayer ? ' 1: ' : '\'s name: ');
      this.textPlayer1 = this.add.text(this.distanceFromLeft, this.distanceFromTop, this.basicTextPlayer1, this.textStyle);
      this.add.text(this.distanceFromLeft, 400, 'back', this.textStyle);

      if (this.multiplayer) {
        this.basicTextPlayer2 = 'Enter player 2: ';
        this.textPlayer2 = this.add.text(this.distanceFromLeft, this.textHeight + this.distanceFromTop, this.basicTextPlayer2, this.textStyle);
        this.namePlayer2 = '';
      }

      this.pacman = this.add.sprite(this.distanceFromLeft - 30, this.distanceFromTop + 28, 'pacman', 2);
      this.anims.create({
        key: 'moving',
        frames: this.anims.generateFrameNumbers('pacman', {
          frames: [2, 1, 0, 1]
        }),
        frameRate: 16,
        repeat: -1
      });
      this.pacman.setScale(1.5);
      this.pacman.anims.play('moving');
      this.input.keyboard.on('keydown', function (eventName, event) {
        if (eventName.key === 'Enter') {
          if (this.pacmanPointingAtPlayer === -1) {
            this.scene.start(_CST.CST.SCENES.MENU);
            this.scene.stop(_CST.CST.SCENES.INPUT_NAMES);
          } else {
            this.scene.start(_CST.CST.SCENES.GAME, {
              'multiplayer': this.multiplayer,
              'playerName': this.namePlayer1,
              'namePlayer2': this.namePlayer2
            });
          }
        }

        if (this.multiplayer) {
          switch (eventName.key) {
            case 'ArrowDown':
              switch (this.pacmanPointingAtPlayer) {
                case 1:
                  this.pacmanPointingAtPlayer = 2;
                  this.pacman.setY(this.pacman.y + this.textHeight);
                  break;

                case 2:
                  this.pacman.setY(425);
                  this.pacmanPointingAtPlayer = -1;
                  break;

                default:
                  break;
              }

              break;

            case 'ArrowUp':
              switch (this.pacmanPointingAtPlayer) {
                case 2:
                  this.pacmanPointingAtPlayer = 1;
                  this.pacman.setY(this.pacman.y - this.textHeight);
                  break;

                case -1:
                  this.pacmanPointingAtPlayer = 2;
                  this.pacman.setY(this.distanceFromTop + 28 + this.textHeight);
                  break;

                default:
                  break;
              }

              break;

            default:
              break;
          }
        } else {
          switch (eventName.key) {
            case 'ArrowDown':
              this.pacman.setY(425);
              this.pacmanPointingAtPlayer = -1;
              break;

            case 'ArrowUp':
              this.pacmanPointingAtPlayer = 1;
              this.pacman.setY(this.distanceFromTop + 28);
              break;

            default:
              break;
          }
        }

        if (this.pacmanPointingAtPlayer !== -1) {
          if (eventName.key >= 'a' && eventName.key <= 'z' || eventName.key >= '1' && eventName.key <= '9') {
            if (this.pacmanPointingAtPlayer === 1) {
              if (this.namePlayer1.length < this.maxNameLength) {
                this.namePlayer1 += eventName.key;
                this.textPlayer1.text = this.basicTextPlayer1 + this.namePlayer1;
              }
            } else {
              if (this.namePlayer2.length < this.maxNameLength) {
                this.namePlayer2 += eventName.key;
                this.textPlayer2.text = this.basicTextPlayer2 + this.namePlayer2;
              }
            }
          } else if (eventName.key === 'Backspace') {
            if (this.pacmanPointingAtPlayer === 1) {
              if (this.namePlayer1.length) {
                this.namePlayer1 = this.namePlayer1.slice(0, -1);
                this.textPlayer1.text = this.basicTextPlayer1 + this.namePlayer1;
              }
            } else {
              if (this.namePlayer2.length) {
                this.namePlayer2 = this.namePlayer2.slice(0, -1);
                this.textPlayer2.text = this.basicTextPlayer2 + this.namePlayer2;
              }
            }
          }
        }
      }, this);
    }
  }, {
    key: "initStaticConfigurations",
    value: function initStaticConfigurations() {
      this.distanceFromLeft = 60;
      this.distanceFromTop = 150;
      this.textHeight = 70;
      this.pacmanPointingAtPlayer = 1;
      this.maxNameLength = 6;
    }
  }]);

  return InputNamesScene;
}(Phaser.Scene);

exports.InputNamesScene = InputNamesScene;
},{"../CST":"CST.js","./GameScene":"scenes/GameScene.js"}],"scenes/ManageQuestions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageQuestions = void 0;

var _CST = require("../CST");

var _Questions = require("../../assets/Questions.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ManageQuestions =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(ManageQuestions, _Phaser$Scene);

  function ManageQuestions() {
    _classCallCheck(this, ManageQuestions);

    return _possibleConstructorReturn(this, _getPrototypeOf(ManageQuestions).call(this, {
      key: _CST.CST.SCENES.MANAGE_QUESTIONS
    }));
  }

  _createClass(ManageQuestions, [{
    key: "create",
    value: function create() {
      var question = prompt("Please enter a new question", "question");
      var difficuly = prompt("Please the question's difficulty (easy/medium/hard)", "difficulty");
      var correct = prompt("Please enter the correct answer", "answer");
      var wrong1 = prompt("Please enter wrong answer number 1", "wrong");
      var wrong2 = prompt("Please enter wrong answer number 2", "wrong");
      var wrong3 = prompt("Please enter wrong answer number 3", "wrong");

      if (difficuly === "easy" || difficuly === "medium" || difficuly === "hard") {
        alert("QUESTION ADDED SUCCESSFULLY!");
        this.addQuestion(question, difficuly, correct, wrong1, wrong2, wrong3);
      } else alert("Question not added. difficulty must be either easy, medium or hard");
    }
  }, {
    key: "addQuestion",
    value: function addQuestion(q, d, c, w1, w2, w3) {
      var tmp = {
        "category": "Entertainment: Video Games",
        "type": "multiple",
        "difficulty": d,
        "question": q,
        "correct_answer": c,
        "incorrect_answers": [w1, w2, w3]
      };

      _Questions.QUESTIONS.push(tmp);

      console.log(_Questions.QUESTIONS);
    }
  }, {
    key: "update",
    value: function update() {
      this.scene.start(_CST.CST.SCENES.MENU);
    }
  }]);

  return ManageQuestions;
}(Phaser.Scene);

exports.ManageQuestions = ManageQuestions;
},{"../CST":"CST.js","../../assets/Questions.js":"../assets/Questions.js"}],"scenes/ScoreBoard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScoreBoardScene = void 0;

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

var ScoreBoardScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(ScoreBoardScene, _Phaser$Scene);

  function ScoreBoardScene() {
    _classCallCheck(this, ScoreBoardScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(ScoreBoardScene).call(this, {
      key: _CST.CST.SCENES.SCORE_BOARD
    }));
  }

  _createClass(ScoreBoardScene, [{
    key: "create",
    value: function create() {
      //  var v = '<%=HIGHSCORES %>';
      var v = document.getElementById('HiddenField1').value;
      console.log(v);
    }
  }]);

  return ScoreBoardScene;
}(Phaser.Scene);

exports.ScoreBoardScene = ScoreBoardScene;
},{"../CST":"CST.js"}],"game.js":[function(require,module,exports) {
"use strict";

var _GameScene = require("./scenes/GameScene.js");

var _QuestionScene = require("./scenes/QuestionScene.js");

var _MenuScene = require("./scenes/MenuScene.js");

var _InputNamesScene = require("./scenes/InputNamesScene");

var _ManageQuestions = require("./scenes/ManageQuestions");

var _ScoreBoard = require("./scenes/ScoreBoard");

var game = new Phaser.Game({
  width: 448 * 2,
  height: 496,
  scene: [_MenuScene.MenuScene, _InputNamesScene.InputNamesScene, _GameScene.GameScene, _QuestionScene.QuestionScene, _ManageQuestions.ManageQuestions, _ScoreBoard.ScoreBoardScene],
  physics: {
    default: 'arcade'
  }
});
},{"./scenes/GameScene.js":"scenes/GameScene.js","./scenes/QuestionScene.js":"scenes/QuestionScene.js","./scenes/MenuScene.js":"scenes/MenuScene.js","./scenes/InputNamesScene":"scenes/InputNamesScene.js","./scenes/ManageQuestions":"scenes/ManageQuestions.js","./scenes/ScoreBoard":"scenes/ScoreBoard.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45733" + '/');

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
