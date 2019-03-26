import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//this sets the size of the canvas.  Can change the size if we need
// canvas.width = body.height 
// canvas.height = body.height
canvas.width = innerWidth
canvas.height = innerHeight
//Cirle spawn
const mouse = {
    // x: 400,
    // y: 400
    x: innerWidth / 2,
    y: innerHeight / 2
}

// const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
// const colors = ['#008080','#8D0E6B','#CCAD0A']
// const colors = ['#008080','#00CCCC', '#2D9595', '#3DCCCC' , '#004D4D']
const colorArray1 = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
const colorArray2 = ['#008080','#8D0E6B','#CCAD0A']
const colorArray3 = ['#008080','#00CCCC', '#2D9595', '#3DCCCC' , '#004D4D']
const neonColors = ['#8BFF30', '#F7F702', '#f000ff', '#001eff', '#FF1493', '#1BFF14','#63E4F9','#F70109']
const colors = [neonColors]
// let myColorArray
//maybe add a few nested arrays and add onclick to do math.random to change to a random new index to change the whole colors
// const colors = [['#008080','#00CCCC', '#2D9595', '#3DCCCC' , '#004D4D'],['#008080','#8D0E6B','#CCAD0A'],['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']]
// const newColorArray = colors[Math.floor(Math.random() * colors.length)]
// const newColor = newColorArray[Math.floor(Math.random() * newColorArray.length)]

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

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
    const rotatedVelocities = {
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
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation //wikipedia - Elastic Collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

// Objects
function Particle(x, y, radius, color) {
    this.x = x
    this.y = y
    //gives movement to each particle created
    this.velocity = {
        x: (Math.random() -0.5) *2,
        y: (Math.random() -0.5) *2
    }
    this.radius = radius
    this.color = color
    this.mass = 1

    this.update = particles => {
        this.draw()
        for (let i = 0; i < particles.length; i++){
            // console.log(particles)
            // console.log('before collision detection')
            if (this === particles[i]) continue;
            if (utils.getDistance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0){
                console.log('has collided')
                resolveCollision(this, particles[i])
                this.color = utils.randomColor(colors) // hehe hehe
                // this.color = utils.randomColor(Math.floor.Math.random())
            }
        }
        //keeps particles on screen
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width){
            this.velocity.x = -this.velocity.x;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height){
            this.velocity.y = -this.velocity.y;
        }

        //mouse collision detection
        if (utils.getDistance(mouse.x, mouse.y, this.x, this.y) < 30){
            console.log('HEEEEEEEE')
        }

        //gives velocity
        this.x += this.velocity.x; 
        this.y += this.velocity.y; 
        
    }   
}

Object.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.strokeStyle = this.color;
    // c.fill()
    c.stroke()
    c.closePath()
}

Object.prototype.update = () => {
    this.draw()
}

// Implementation
let particles
function init() {
    particles = []
   
    for (let i = 0; i < 140; i++) {
        const radius = 10;
        //spawns inside the canvas
        let x = utils.randomIntFromRange(radius, canvas.width - radius)
        let y = utils.randomIntFromRange(radius, canvas.height -radius)
        const color = utils.randomColor(colors);

        if (i !== 0) {
            for (let j = 0; j < particles.length; j++){
                if (utils.getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0){
                    //makes sure the respawn is inside the canvas
                    x = utils.randomIntFromRange(radius, canvas.width - radius) ;y = utils.randomIntFromRange(radius, canvas.height -radius)
                     j = -1
                }
            }
        }

        particles.push(new Particle(x, y, radius, color))
    }
    console.log(particles)
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
        particle.update(particles);
        // console.log('has been updated')
        // console.log(particles)
        
    });
}

init()
animate()