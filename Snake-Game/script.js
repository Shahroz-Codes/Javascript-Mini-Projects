//Getting Elements From Html

const StartButton = document.querySelector('.StartButton');
const ScoreBox = document.querySelector('.Score');
const ScreenHiScore = document.querySelector('.HiScore');
const GameBoard = document.querySelector('.GameBoard');


//Created Elements and variables

let Gameplay = false;

const foodSound = new Audio('assets/food.mp3');
const gameOverSound = new Audio('assets/gameover.mp3');
const moveSound = new Audio('assets/move.mp3');
const musicSound = new Audio('assets/music.mp3');

let InputDir = { x: 0, y: 0 }
let score = 0;
let Snakearr = [{ x: 13, y: 15 }]
let speed = 10;
let lastpaintTime = 0;
let min = 2;
let max = 16;
let food = {
    x: Math.round((Math.random() * (max - min)) + min),
    y: Math.round((Math.random() * (max - min)) + min)
}



//All Functions 

function Main(ctime) {
    window.requestAnimationFrame(Main)
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintTime = ctime;
    GameEngine();
}

function GameEngine() {
    //Part 1 : snake array upadtes methods

    //Collide Senario,game over reset

    if (IfCollide(Snakearr)) {

        Gameplay = false;
        gameOverSound.play();
        musicSound.pause();
        InputDir = { x: 0, y: 0 };
        Snakearr = [{ x: 13, y: 15 }];
        score = 0;
        ScoreBox.innerHTML = `Score : ${score}`;
        window.removeEventListener('keydown', KeyboardEvent)

    }

    //How Snake Eats Food,score increase,food recreate

    if (Snakearr[0].x === food.x && Snakearr[0].y === food.y) {
        foodSound.play();
        score++;
        if (score > HiScoreValue) {
            HiScoreValue = score;
            localStorage.setItem("HiScore", JSON.stringify(HiScoreValue));
            ScreenHiScore.innerHTML = `High Score : ${HiScoreValue}`;

        }
        ScoreBox.innerHTML = `Score : ${score}`;
        Snakearr.unshift({
            x: Snakearr[0].x + InputDir.x,
            y: Snakearr[0].y + InputDir.y
        })
        food = {
            x: Math.round((Math.random() * (max - min)) + min),
            y: Math.round((Math.random() * (max - min)) + min)
        }

    }

    //moving the snake

    for (let i = Snakearr.length - 2; i >= 0; i--) {
        Snakearr[i + 1] = { ...Snakearr[i] };
    }
    Snakearr[0].x += InputDir.x;
    Snakearr[0].y += InputDir.y;

    // Part 2 : displaying snake and food

    //Create Snake

    GameBoard.innerHTML = "";
    Snakearr.forEach((e, index) => {
        let SnakeElement = document.createElement("div");
        SnakeElement.style.gridColumnStart = e.x;
        SnakeElement.style.gridRowStart = e.y;
        if (index === 0) {
            SnakeElement.setAttribute('class', 'head')
        } else {
            SnakeElement.setAttribute('class', 'snakebody')
        }
        GameBoard.appendChild(SnakeElement);
    })

    //Create Food

    let FoodElement = document.createElement("div");
    FoodElement.style.gridColumnStart = food.x;
    FoodElement.style.gridRowStart = food.y;
    FoodElement.setAttribute('class', 'food')
    GameBoard.appendChild(FoodElement)
}

function IfCollide(snake) {

    // If you bump into yourself 
    for (let i = 1; i < Snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}
function KeyboardEvent(e1) {
    InputDir = { x: 0, y: 1 } // Start the game
    moveSound.play();
    switch (e1.key) {
        case 'ArrowUp':
            moveSound.play();
            InputDir.x = 0;
            InputDir.y = -1;
            break;
        case 'ArrowDown':
            moveSound.play();
            InputDir.x = 0;
            InputDir.y = 1;
            break;
        case 'ArrowLeft':
            moveSound.play();
            InputDir.x = -1;
            InputDir.y = 0;
            break;
        case 'ArrowRight':
            moveSound.play();
            InputDir.x = 1;
            InputDir.y = 0;
            break;
        default:
            break;
    }

}

//Main Logic

let HiScore = localStorage.getItem('HiScore')
if (HiScore === null) {
    let HiScoreValue = 0;
    localStorage.setItem("HiScore", JSON.stringify(HiScoreValue))
} else {
    HiScoreValue = JSON.parse(HiScore);
    ScreenHiScore.innerHTML = `High Score : ${HiScore}`;
}
window.requestAnimationFrame(Main)

//Sart Game when StartButton is Clicked

StartButton.addEventListener('click', (event) => {
    Gameplay = true;
    musicSound.play();
    if (Gameplay) {
        window.addEventListener('keydown', KeyboardEvent)
    }
})