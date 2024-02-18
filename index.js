let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

// Cloudie properties
let cloudieWidth = 88;
let cloudieHeight = 94;
let cloudieX = 50;
let cloudieY = boardHeight - cloudieHeight;
let cloudieImg;

// Create cloudie object
let cloudie = {
    x: cloudieX,
    y: cloudieY,
    width: cloudieWidth,
    height: cloudieHeight
};

// Chocolate properties
let chocolateArray = [];

let chocolate1Width = 34;
let chocolate2Width = 69;
let chocolate3Width = 102;

let chocolateHeight = 44;
let chocolateX = 700;
let chocolateY = boardHeight - chocolateHeight;

let chocolate1Img;
let chocolate2Img;
let chocolate3Img;

// Physics properties
let velocityX = -8; // moving left speed
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    // Loads cloudie image
    cloudieImg = new Image();
    cloudieImg.src = "pixelcloudie.png";
    cloudieImg.onload = function() {
        context.drawImage(cloudieImg, cloudie.x, cloudie.y, cloudie.width, cloudie.height);
    };

    // Loads chocolate images
    chocolate1Img = new Image();
    chocolate1Img.onload = function() {
        chocolate1Width = chocolate1Img.width; // Update chocolate1Width with actual width
    };
    chocolate1Img.src = "chocolate.png";

    chocolate2Img = new Image();
    chocolate2Img.onload = function() {
        chocolate2Width = chocolate2Img.width; // Update chocolate2Width with actual width
    };
    chocolate2Img.src = "chocolate2.png";

    chocolate3Img = new Image();
    chocolate3Img.onload = function() {
        chocolate3Width = chocolate3Img.width; // Update chocolate3Width with actual width
    };
    chocolate3Img.src = "chocolate3.png";

    requestAnimationFrame(update);
    setInterval(placeChocolate, 1000); // 1 second = 1000 milliseconds
    document.addEventListener("keyup", moveCloudie);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // Update cloudie position
    velocityY += gravity;
    cloudie.y = Math.min(cloudie.y + velocityY, cloudieY); // Apply gravity to current cloudie.y, making sure it doesn't exceed the ground
    context.drawImage(cloudieImg, cloudie.x, cloudie.y, cloudie.width, cloudie.height);

    // Update chocolate position and check collision
    for (let i = 0; i < chocolateArray.length; i++) {
        let chocolate = chocolateArray[i];
        chocolate.x += velocityX;
        context.drawImage(chocolate.img, chocolate.x, chocolate.y, chocolate.width, chocolate.height);

        if (detectCollision(cloudie, chocolate)) {
            gameOver = true;
            cloudieImg.src = "crying.png";
            cloudieImg.onload = function() {
                context.drawImage(cloudieImg, cloudie.x, cloudie.y, cloudie.width, cloudie.height);
            }
        }
    }

    // Update score
    context.fillStyle = "black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function moveCloudie(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && cloudie.y == cloudieY) {
        // Jump
        velocityY = -10;
    } else if (e.code == "ArrowDown" && cloudie.y == cloudieY) {
        // Duck
    }
}

function placeChocolate() {
    if (gameOver) {
        return;
    }

    let chocolate = {
        img: null,
        x: chocolateX,
        y: chocolateY,
        width: 0,
        height: chocolateHeight
    }

    let placeChocolateChance = Math.random();

    if (placeChocolateChance > .90) { // 10%
        chocolate.img = chocolate3Img;
        chocolate.width = chocolate3Width;
        chocolateArray.push(chocolate);
        playChocolateSound(); // Play the chocolate sound
    } 
    else if (placeChocolateChance > .70) { // 20%
        chocolate.img = chocolate2Img;
        chocolate.width = chocolate2Width;
        chocolateArray.push(chocolate);
        playChocolateSound(); // Play the chocolate sound
    } 
    else if (placeChocolateChance > .50) { // 20%
        chocolate.img = chocolate1Img;
        chocolate.width = chocolate1Width;
        chocolateArray.push(chocolate);
        playChocolateSound(); // Play the chocolate sound
    }

    if (chocolateArray.length > 5) {
        chocolateArray.shift(); // Remove the first element from the array so that the array doesn't constantly grow
    }
}

function playChocolateSound() {
    chocolateSound.play(); // Play the chocolate sound
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}
function darkmode(){
    var SetTheme = document.body;
    SetTheme.classList.toggle("dark-mode");
    var theme;
    if(SetTheme.classList.contains("dark-mode")){
        console.log("Dark mode");
        theme = "DARK";
        document.getElementById("mybtn").innerHTML = '<img src="sun.png" alt="Sun Icon">'; // Change button content to sun icon
        document.body.style.backgroundColor = '#000'; // Change background color to black
    } else {
        console.log("Light mode");
        theme = "LIGHT";
        document.getElementById("mybtn").innerHTML = '<img src="moon.png" alt="Moon Icon">'; // Change button content to moon icon
        document.body.style.backgroundColor = '#fff'; // Change background color to white
    }
    // Save the current theme preference to localStorage
    localStorage.setItem("PageTheme", JSON.stringify(theme));
}
