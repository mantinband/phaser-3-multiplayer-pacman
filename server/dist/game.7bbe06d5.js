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
    QUESTION: "QUESTION"
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
    key: "preload",
    value: function preload() {
      this.ghosts = ['blinky', 'clyde', 'inky', 'pinky'];
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
      this.questionIndex = this.randInt(0, _Questions.QUESTIONS.length);
      this.textStyle = {
        fontFamily: '"Roboto Condensed"',
        fontSize: 30,
        color: "blue",
        width: 400
      };
      this.question = _Questions.QUESTIONS[this.questionIndex].question;
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
        this.add.sprite(this.distanceFromLeft + 20, 270 + i * (this.ghostHeight * 3 + 5), this.ghosts[i], 0).anims.play(this.ghosts[i] + 'Animation').setScale(3);
      }

      this.events.on('resume', function () {
        alert('i have been resumed!');
      });
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
            this.add.text(this.distanceFromLeft + this.ghostWidth * 3 + 10, 270 + (this.printingAnswer - 1) * (this.ghostHeight * 3 + 5) - 10, this.answers[this.printingAnswer - 1], this.textStyle);
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
},{"../CST":"CST.js","../../assets/Questions.js":"../assets/Questions.js"}],"scenes/GameScene.js":[function(require,module,exports) {
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
      this.ghosts = {
        blinky: {
          startX: 13,
          startY: 11
        },
        inky: {
          startX: 11,
          startY: 11
        },
        pinky: {
          startX: 13,
          startY: 11
        },
        clyde: {
          startX: 15,
          startY: 11
        }
      };
      this.ghostHeight = 16;
      this.ghostWidth = 16;

      for (var ghost in this.ghosts) {
        this.load.spritesheet(ghost, ghost + '.png', {
          frameWidth: this.ghostWidth,
          frameHeight: this.ghostHeight
        });
      }

      this.timeToEatAnswerDelay = 30;
      this.timeToEatAnswerCounter = 0;
      this.timeToEatAnswer = 0;
      this.safeTile = 14;
      this.dotTile = 7;
      this.ghostHouseTile = 83;
      this.speed = 100;
      this.pacmanSize = 12.5;
      this.ghostSize = 1;
      this.coinSize = 12;
      this.threshold = 2.05;
      this.dotCount = 0;
      this.numTotalDots = 272;
      this.marker = new Phaser.Geom.Point();
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
      this.layer.setCollisionByExclusion([this.safeTile, this.dotTile]);
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
      this.pacman.direction = Phaser.RIGHT;
      this.pacman.nextDirection = Phaser.RIGHT;
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
      this.addGhosts();
      this.addGhostsCollideAction();
    }
  }, {
    key: "canTurn",
    value: function canTurn(x, y, direction, isGhost) {
      var tile;

      switch (direction) {
        case Phaser.LEFT:
          tile = this.map.getTileAt(x - 1, y, true).index;
          break;

        case Phaser.RIGHT:
          tile = this.map.getTileAt(x + 1, y, true).index;
          break;

        case Phaser.UP:
          tile = this.map.getTileAt(x, y - 1, true).index;
          break;

        case Phaser.DOWN:
          tile = this.map.getTileAt(x, y + 1, true).index;
          break;

        default:
          console.log('invalid direction: ' + direction);
      }

      return tile === this.safeTile || tile === this.dotTile || isGhost && tile === this.ghostHouseTile;
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

          gameObject.body.setVelocityX(-this.speed);
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

          gameObject.body.setVelocityX(this.speed);
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
          gameObject.body.setVelocityY(-this.speed);
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
          gameObject.body.setVelocityY(this.speed);
          break;

        default:
          console.log('updateDirection: invalid direction: ' + gameObject.direction);
          ;
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this.timeToEatAnswer && ++this.timeToEatAnswerCounter === this.timeToEatAnswerDelay) {
        if (--this.timeToEatAnswer === 0) {
          this.scene.stop(_CST.CST.SCENES.QUESTION);
        }

        this.timeToEatAnswerCounter = 0;
      }

      var pacmanX = this.pacman.x;
      var pacmanY = this.pacman.y;
      this.marker.x = this.map.worldToTileX(pacmanX);
      this.marker.y = this.map.worldToTileY(pacmanY);
      var pacmanInCenterOfSquare = Math.abs(pacmanX - (this.marker.x * 16 + 8)) < this.threshold && Math.abs(pacmanY - (this.marker.y * 16 + 8)) < this.threshold;
      var pacmanCanTurn = this.canTurn(this.marker.x, this.marker.y, this.pacman.nextDirection, false);
      this.currentTile = this.map.getTileAt(this.marker.x, this.marker.y, true);

      if (this.currentTile.index === this.dotTile) {
        this.dotCount++;
        this.currentTile.index = this.safeTile;

        if (this.dotCount === this.numTotalDots) {
          alert('you have won!');
        }
      }

      if (this.pacman.nextDirection === this.pacman.direction && !pacmanCanTurn) {
        if (this.pacman.anims.isPlaying) {
          this.pacman.anims.stop();
          this.pacman.anims.play('stop');
        }
      } else {
        if (!this.pacman.anims.isPlaying) {
          this.pacman.anims.play('moving');
        }
      }

      if (this.pacman.nextDirection !== this.pacman.direction && pacmanCanTurn && pacmanInCenterOfSquare) {
        this.pacman.direction = this.pacman.nextDirection;
        this.updateDirection(this.pacman, false);
      }

      this.updateGhosts();
    }
  }, {
    key: "addCoins",
    value: function addCoins() {
      for (var spot in this.coins) {
        this.coins[spot]['coin'] = this.add.sprite(this.coins[spot].x * 16 + 8, this.coins[spot].y * 16 + 8, 'coin', 0);
        this.physics.world.enable(this.coins[spot].coin);
        this.coins[spot]['coin'].setScale(0.5);
        this.coins[spot]['coin'].body.setSize(this.coinSize, this.coinSize);
        this.coins[spot]['coin'].anims.play('coin');
      }
    }
  }, {
    key: "addCoinsCollideAction",
    value: function addCoinsCollideAction() {
      var _this = this;

      var _loop = function _loop(spot) {
        _this.physics.add.collider(_this.pacman, _this.coins[spot].coin, function () {
          this.coins[spot].coin.destroy();
          this.scene.launch(_CST.CST.SCENES.QUESTION);
          this.scene.pause();
          this.timeToEatAnswer = 10;

          for (var ghost in this.ghosts) {
            this.ghosts[ghost].ghost.anims.stop();
            this.ghosts[ghost].ghost.anims.play(ghost + 'Blue');
          }
        }, null, _this);
      };

      for (var spot in this.coins) {
        _loop(spot);
      }
    }
  }, {
    key: "addGhosts",
    value: function addGhosts() {
      for (var ghost in this.ghosts) {
        console.log(ghost + 'Right');
        this.anims.create({
          key: ghost + 'Right',
          frames: this.anims.generateFrameNumbers(ghost, {
            frames: [0, 1]
          }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: ghost + 'Left',
          frames: this.anims.generateFrameNumbers(ghost, {
            frames: [2, 3]
          }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: ghost + 'Up',
          frames: this.anims.generateFrameNumbers(ghost, {
            frames: [4, 5]
          }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: ghost + 'Down',
          frames: this.anims.generateFrameNumbers(ghost, {
            frames: [6, 7]
          }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: ghost + 'Blue',
          frames: this.anims.generateFrameNumbers(ghost, {
            frames: [8, 9, 0, 1]
          }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: ghost + 'Eaten',
          frames: this.anims.generateFrameNumbers(ghost, {
            frames: [10, 11, 12, 13, 14, 15]
          }),
          frameRate: 10,
          repeat: -1
        });
        this.ghosts[ghost].ghost = this.add.sprite(this.ghosts[ghost].startX * 16 + 8, this.ghosts[ghost].startY * 16 + 8, ghost, 0);
        this.ghosts[ghost].ghost.name = ghost;
        this.physics.world.enable(this.ghosts[ghost].ghost);
        this.ghosts[ghost].ghost.setScale(1.5);
        this.ghosts[ghost].ghost.anims.play(ghost + 'Left');
        this.ghosts[ghost].ghost.direction = Phaser.RIGHT;
        this.physics.add.collider(this.ghosts[ghost].ghost, this.layer);
        this.ghosts[ghost].ghost.body.setSize(this.ghostSize, this.ghostSize);
        this.ghosts[ghost].ghost.body.setVelocityX(100);
      }
    }
  }, {
    key: "addGhostsCollideAction",
    value: function addGhostsCollideAction() {
      var _this2 = this;

      var _loop2 = function _loop2(ghost) {
        _this2.physics.add.collider(_this2.pacman, _this2.ghosts[ghost].ghost, function () {
          if (this.timeToEatAnswer) {
            var answers = _QuestionScene.QuestionScene.answers;
            var correctAnswer = _Questions.QUESTIONS[_QuestionScene.QuestionScene.questionIndex].correct_answer;

            switch (this.ghosts[ghost].ghost.name) {
              case 'blinky':
                alert(answers[0] === correctAnswer ? 'correct!' : "incorrect!");
                break;

              case 'clyde':
                alert(answers[1] === correctAnswer ? 'correct!' : "incorrect!");
                break;

              case 'inky':
                alert(answers[2] === correctAnswer ? 'correct!' : "incorrect!");
                break;

              case 'pinky':
                alert(answers[3] === correctAnswer ? 'correct!' : "incorrect!");
                break;
            }
          } else {
            alert("game over");
          }
        }, null, _this2);
      };

      for (var ghost in this.ghosts) {
        _loop2(ghost);
      }
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
        var ghostInCenterOfSquare = Math.abs(ghostX - (this.ghosts[ghost].currentTileX * 16 + 8)) < this.threshold && Math.abs(ghostY - (this.ghosts[ghost].currentTileY * 16 + 8)) < this.threshold;
        /* if reached wall*/

        if (ghostInCenterOfSquare && !this.canTurn(this.ghosts[ghost].currentTileX, this.ghosts[ghost].currentTileY, this.ghosts[ghost].ghost.direction, true)) {
          (function () {
            var ghostAvailableDirections = [];
            var direction = [Phaser.LEFT, Phaser.RIGHT, Phaser.UP, Phaser.DOWN];
            direction.forEach(function (direction) {
              if (this.canTurn(this.ghosts[ghost].currentTileX, this.ghosts[ghost].currentTileY, direction, true)) {
                ghostAvailableDirections.push(direction);
              }
            }, _this3);
            _this3.ghosts[ghost].ghost.direction = ghostAvailableDirections[_this3.randInt(0, ghostAvailableDirections.length)];

            _this3.updateDirection(_this3.ghosts[ghost].ghost, true);
          })();
        }
      }
    }
  }, {
    key: "randInt",
    value: function randInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }]);

  return GameScene;
}(Phaser.Scene);

exports.GameScene = GameScene;
},{"../CST":"CST.js","./QuestionScene":"scenes/QuestionScene.js","../../assets/Questions":"../assets/Questions.js"}],"game.js":[function(require,module,exports) {
"use strict";

var _GameScene = require("./scenes/GameScene.js");

var _QuestionScene = require("./scenes/QuestionScene.js");

var game = new Phaser.Game({
  width: 448 * 2,
  height: 496,
  scene: [_GameScene.GameScene, _QuestionScene.QuestionScene],
  physics: {
    default: 'arcade'
  }
});
},{"./scenes/GameScene.js":"scenes/GameScene.js","./scenes/QuestionScene.js":"scenes/QuestionScene.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34017" + '/');

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