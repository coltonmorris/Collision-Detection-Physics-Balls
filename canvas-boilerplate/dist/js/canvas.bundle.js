/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

//this sets the size of the canvas.  Can change the size if we need
// canvas.width = body.height 
// canvas.height = body.height
canvas.width = innerWidth;
canvas.height = innerHeight;
//Cirle spawn
var mouse = {
    // x: 400,
    // y: 400
    x: innerWidth / 2,
    y: innerHeight / 2

    // const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
    // const colors = ['#008080','#8D0E6B','#CCAD0A']
    // const colors = ['#008080','#00CCCC', '#2D9595', '#3DCCCC' , '#004D4D']
};var colorArray1 = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
var colorArray2 = ['#008080', '#8D0E6B', '#CCAD0A'];
var colorArray3 = ['#008080', '#00CCCC', '#2D9595', '#3DCCCC', '#004D4D'];
var neonColors = ['#8BFF30', '#F7F702', '#f000ff', '#001eff', '#FF1493', '#1BFF14', '#63E4F9', '#F70109'];
var colors = [neonColors];
// let myColorArray
//maybe add a few nested arrays and add onclick to do math.random to change to a random new index to change the whole colors
// const colors = [['#008080','#00CCCC', '#2D9595', '#3DCCCC' , '#004D4D'],['#008080','#8D0E6B','#CCAD0A'],['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']]
// const newColorArray = colors[Math.floor(Math.random() * colors.length)]
// const newColor = newColorArray[Math.floor(Math.random() * newColorArray.length)]

// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    var rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    var xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    var yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    var xDist = otherParticle.x - particle.x;
    var yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        var angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        var m1 = particle.mass;
        var m2 = otherParticle.mass;

        // Velocity before equation
        var u1 = rotate(particle.velocity, angle);
        var u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation //wikipedia - Elastic Collision equation
        var v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        var v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        var vFinal1 = rotate(v1, -angle);
        var vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

// Objects
function Particle(x, y, radius, color) {
    var _this = this;

    this.x = x;
    this.y = y;
    //gives movement to each particle created
    this.velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
    };
    this.radius = radius;
    this.color = color;
    this.mass = 1;

    this.update = function (particles) {
        _this.draw();
        for (var i = 0; i < particles.length; i++) {
            // console.log(particles)
            // console.log('before collision detection')
            if (_this === particles[i]) continue;
            if (_utils2.default.getDistance(_this.x, _this.y, particles[i].x, particles[i].y) - _this.radius * 2 < 0) {
                console.log('has collided');
                resolveCollision(_this, particles[i]);
                _this.color = _utils2.default.randomColor(colors); // hehe hehe
                // this.color = utils.randomColor(Math.floor.Math.random())
            }
        }
        //keeps particles on screen
        if (_this.x - _this.radius <= 0 || _this.x + _this.radius >= canvas.width) {
            _this.velocity.x = -_this.velocity.x;
        }
        if (_this.y - _this.radius <= 0 || _this.y + _this.radius >= canvas.height) {
            _this.velocity.y = -_this.velocity.y;
        }

        //mouse collision detection
        if (_utils2.default.getDistance(mouse.x, mouse.y, _this.x, _this.y) < 30) {
            console.log('HEEEEEEEE');
        }

        //gives velocity
        _this.x += _this.velocity.x;
        _this.y += _this.velocity.y;
    };
}

Object.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.strokeStyle = this.color;
    // c.fill()
    c.stroke();
    c.closePath();
};

Object.prototype.update = function () {
    undefined.draw();
};

// Implementation
var particles = void 0;
function init() {
    particles = [];

    for (var i = 0; i < 140; i++) {
        var radius = 10;
        //spawns inside the canvas
        var x = _utils2.default.randomIntFromRange(radius, canvas.width - radius);
        var y = _utils2.default.randomIntFromRange(radius, canvas.height - radius);
        var color = _utils2.default.randomColor(colors);

        if (i !== 0) {
            for (var j = 0; j < particles.length; j++) {
                if (_utils2.default.getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                    //makes sure the respawn is inside the canvas
                    x = _utils2.default.randomIntFromRange(radius, canvas.width - radius);y = _utils2.default.randomIntFromRange(radius, canvas.height - radius);
                    j = -1;
                }
            }
        }

        particles.push(new Particle(x, y, radius, color));
    }
    console.log(particles);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (particle) {
        particle.update(particles);
        // console.log('has been updated')
        // console.log(particles)
    });
}

init();
animate();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// let myColorArray
function randomColor(colors) {
    // return newColor[Math.floor(Math.random() * colors.length)]
    // let newColorArray = randomColorArray()
    var newColorArray = colors[Math.floor(Math.random() * colors.length)];
    var newColor = newColorArray[Math.floor(Math.random() * newColorArray.length)];
    return newColor;
    // return newColor
}

// let myColorArray
// const randomColorArray = (myColorArray, colors) => {
//     return myColorArray = colors[Math.floor(Math.random() * colors.length)]

// }
// const colorArray1 = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
// const colorArray2 = ['#008080','#8D0E6B','#CCAD0A']
// const colorArray3 = ['#008080','#00CCCC', '#2D9595', '#3DCCCC' , '#004D4D']
// const colors = [colorArray1, colorArray2, colorArray3]


function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function getDistance(x1, y1, x2, y2) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, distance: distance, getDistance: getDistance, randomColor: randomColor };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map