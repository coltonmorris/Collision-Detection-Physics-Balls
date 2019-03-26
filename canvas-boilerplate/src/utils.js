function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// let myColorArray
function randomColor(colors) {
    // return newColor[Math.floor(Math.random() * colors.length)]
    // let newColorArray = randomColorArray()
    let newColorArray = colors[Math.floor(Math.random() * colors.length)]
    let newColor = newColorArray[Math.floor(Math.random() * newColorArray.length)]
    return newColor
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
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function getDistance(x1, y1, x2, y2){
    let xDistance = x2 - x1;
    let yDistance = y2- y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}


module.exports = { randomIntFromRange, distance, getDistance, randomColor}
