const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;

let snake = []; // array中每個元素都是一個物件
// 物件的工作是用來儲存身體的x, y座標
function createSnake() {
    snake[0] = {
        x: 80,
        y: 0,
    };
    snake[1] = {
        x: 60,
        y: 0,
    };
    snake[2] = {
        x: 40,
        y: 0,
    };
    snake[3] = {
        x: 20,
        y: 0,
    };
}

class Fruit {
    constructor() {
        this.x = Math.floor(Math.random() * column) * unit;
        this.y = Math.floor(Math.random() * row) * unit;
    }

    drawFruit() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, unit, unit);
    }

    pickALocation() {
        //
        let overlapping = false;
        let new_x;
        let new_y;

        function checkOverlap(new_x, new_y) {
            for (let i = 0; i < snake.length; i++) {
                if (new_x == snake[i].x && new_y == snake[i].y) {
                    overlapping = true;
                    return;
                } else {
                    overlapping = false;
                }
            }
        }

        // 一直重新隨機找fruit的新位置，直到overlapping為真
        do {
            new_x = Math.floor(Math.random() * column) * unit;
            new_y = Math.floor(Math.random() * row) * unit;
            checkOverlap(new_x, new_y);
        } while (overlapping);

        this.x = new_x;
        this.y = new_y;
    }
}

// 初始設定
createSnake();
let myFruit = new Fruit();

window.addEventListener("keydown", changeDirection);
let d = "Right";
function changeDirection(e) {
    // console.log(e);
    if (e.key == "ArrowRight" && d != "Left") {
        // console.log("你正在按向右鍵");
        d = "Right";
    } else if (e.key == "ArrowDown" && d != "Up") {
        // console.log("你正在按向下鍵");
        d = "Down";
    } else if (e.key == "ArrowLeft" && d != "Right") {
        // console.log("你正在按向左鍵");
        d = "Left";
    } else if (e.key == "ArrowUp" && d != "Down") {
        // console.log("你正在按向上鍵");
        d = "Up";
    }

    // 每次按下方向鍵之後，在下一幀被畫出來之前，不接受任何keydown事件
    // 用來防止連續按按鍵導致蛇在邏輯上自殺
    window.removeEventListener("keydown", changeDirection);
}

let highestScore;
loadHighestScore();
let score = 0;
document.getElementById("myScore").innerHTML = "遊戲分數：" + score;
document.getElementById("myScore2").innerHTML = "最高分數：" + highestScore;

function draw() {
    // 每次draw的第一步，要確認蛇有沒有咬到自己
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            clearInterval(myGame);
            alert("遊戲結束");
            // 這邊return，draw下面的程式碼都不會執行
            return;
        }
    }

    // 將背景設定為全黑，不然蛇的尾巴會一直留在畫布上，不會消失越變越長
    // 因為setInterval的關係，等於每0.1秒就先把畫布重置塗黑
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    myFruit.drawFruit();

    // 畫出蛇
    for (let i = 0; i < snake.length; i++) {
        // 畫出蛇身
        if (i == 0) {
            // 頭部綠色
            ctx.fillStyle = "lightgreen";
        } else {
            // 身體藍色
            ctx.fillStyle = "lightblue";
        }
        // 每格用白邊更顯眼
        ctx.strokeStyle = "white";

        // 穿牆，處理超過邊界時要從另一邊出現
        if (snake[i].x >= canvas.width) {
            snake[i].x = 0;
        }
        if (snake[i].x < 0) {
            snake[i].x = canvas.width - unit;
        }
        if (snake[i].y >= canvas.height) {
            snake[i].y = 0;
        }
        if (snake[i].y < 0) {
            snake[i].y = canvas.height - unit;
        }

        // 填滿跟框線，前兩個是起始點的xy座標，後兩個是長度
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
        ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
    }

    // 以目前的d變數方向，來決定蛇的下一幀要在哪個座標
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (d == "Left") {
        snakeX -= unit;
    } else if (d == "Up") {
        snakeY -= unit;
    } else if (d == "Right") {
        snakeX += unit;
    } else if (d == "Down") {
        snakeY += unit;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    // 確認蛇是否吃到果實
    // 移動中：最後一格消失、前進方向第一格出現蛇的頭部
    if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
        // console.log("吃到果實");
        myFruit.pickALocation();
        score++;
        setHighestScore(score);
        document.getElementById("myScore").innerHTML = "遊戲分數：" + score;
        document.getElementById("myScore2").innerHTML =
            "最高分數：" + highestScore;
    } else {
        snake.pop();
    }
    snake.unshift(newHead);
    window.addEventListener("keydown", changeDirection);
}

// 每0.1秒就重新執行draw這個function一次
let myGame = setInterval(draw, 100);

function loadHighestScore() {
    if (localStorage.getItem("highestScore") == null) {
        highestScore = 0;
    } else {
        highestScore = localStorage.getItem("highestScore");
    }
}

function setHighestScore(score) {
    if (score > highestScore) {
        localStorage.setItem("highestScore", score);
        highestScore = score;
    }
}
