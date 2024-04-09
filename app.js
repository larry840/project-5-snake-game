const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;

let snake = []; // array中每個元素都是一個物件
// 物件的工作是用來儲存身體的x, y座標
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

function draw() {
    console.log("正在執行draw...");

    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            ctx.fillStyle = "lightgreen";
        } else {
            ctx.fillStyle = "lightblue";
        }
        ctx.strokeStyle = "white";

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
        snakeY += unit;
    } else if (d == "Down") {
        snakeY += unit;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    };
}

// let myGame = setInterval(draw, 100);
