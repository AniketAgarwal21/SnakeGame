
// DOM Elements
const board = document.querySelector(".board")
const scoreElement = document.querySelector(".score")
const highestScoreElement = document.querySelector(".highestScore")
highestScoreElement.innerHTML = `HIGHEST SCORE : ${localStorage.getItem('highestScore') || 0}`


// Variables
let snake = [{ x: 10, y: 10 }]
let direction = { x: 0, y: 0 }
let food = { x: 2 + Math.round(Math.random() * (18 - 2)), y: 2 + Math.round(Math.random() * (18 - 2)) }
let score = 0
let interval = 100


// Key Controls
window.addEventListener('keydown', (e) => {
    const key = e.which || e.key || e.keyCode
    if (key === 37) {
        direction = { x: 0, y: -1 }
    } else if (key === 38) {
        direction = { x: -1, y: 0 }
    } else if (key === 39) {
        direction = { x: 0, y: 1 }
    } else if (key === 40) {
        direction = { x: 1, y: 0 }
    }
})

// Collision Check
const isCollide = () => {
    // Collides with the wall

    let lsc = localStorage.getItem('highestScore')
    highestScoreElement.innerHTML = `HIGHEST SCORE : ${lsc || 0}`
    if (!lsc){
        localStorage.setItem('highestScore', score)
    } else if(score > lsc) {
        localStorage.setItem('highestScore', score)
    }

    if (snake[0].x > 20 || snake[0].x <= 0 || snake[0].y > 20 || snake[0].y <= 0) {
        return true
    }

    // Collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true
        }
    }

    // Doesn's collide
    return false
}


// Main Game Engine
setInterval(() => {

    // Collides into wall or itself
    if (isCollide()) {
        snake = [{ x: 10, y: 10 }]
        direction = { x: 0, y: 0 };
        score = 0;
        scoreElement.innerHTML = `SCORE : ${score}`
        alert('Please try again')
    }

    // Eats Food
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push({ x: snake[snake.length - 1].x + direction.x, y: snake[snake.length - 1].y + direction.y })
        food = { x: 2 + Math.round(Math.random() * (18 - 2)), y: 2 + Math.round(Math.random() * (18 - 2)) }
        score += 1
        scoreElement.innerHTML = `SCORE : ${score}`
    }

    // Move Snake
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] }
    }

    snake[0].x += direction.x
    snake[0].y += direction.y

    // Render Snake
    board.innerHTML = ""
    snake.forEach((e, index) => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.x
        snakeElement.style.gridColumnStart = e.y

        if (index === 0) {
            snakeElement.classList.add('snakeHead')
        } else {
            snakeElement.classList.add('snakeBody')
        }
        board.appendChild(snakeElement)
    })

    // Generate Food
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.x
    foodElement.style.gridColumnStart = food.y
    foodElement.classList.add('food')
    board.appendChild(foodElement)

}, interval)
