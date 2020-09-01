var playerName = $(".signin").val();
var score = 0;
var lives = 3;
var pipeSpeed = 1;
var level=1;
var birdSpeed = 1;
// sounds
var fly = new Audio();
fly.src = "audio/sfx_flap.wav";

var scoree = new Audio();
scoree.src = "audio/sfx_point.wav";

var die = new Audio();
die.src = "audio/sfx_die.wav";

var hit = new Audio();
hit.src = "audio/sfx_hit.wav";
function play() {
    document.querySelector(".welcome").style.display = "none";
    document.querySelector(".canvas").style.display = "block";
    document.querySelector('.controller').style.display = "block";
    document.querySelector('.player').style.display = "block";

    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d");
    const background = new Image();
    const foreground = new Image();
    const pipeNorth = new Image();
    const pipeSouth = new Image();

    var birdImage = new Image();
    var birdImageDie = new Image();
    const muteBtn = document.querySelector('.mute');
    var score_field = document.querySelector('#score');
    var pauseBtn = document.querySelector('.pause');
    var lives_field = document.querySelector('#live');
    var player_field = document.querySelector('.player');
    var level_field= document.querySelector('#level');
    var pipY = Math.floor((242) * Math.random()) - 242;
    var pause = false;


    birdImage.height = 50;
    birdImage.width = 50;
    
    background.src = "Images/background.jpg";
    foreground.src = "Images/foreground3.jpg";
    pipeNorth.src = "Images/pipeNorth.png";
    pipeSouth.src = "Images/pipeSouth.png";
    birdImage.src = "Images/bird.png";
    birdImage.id = "bird";

    // variables
    var distance = 100;
    var Constant = pipeNorth.height + distance;
    var pipX = canvas.width;
    var birdY = 100;
    var birdX = 10;
    
    pipes = [];
    pipes[0] = {
        x: pipX,
        y: pipY
        
    };
    document.querySelector('.mute').addEventListener('click', function () {
        console.log("btnn el mute ahuh")
        if (fly.muted == false) {
            fly.muted = true;
            die.muted=true;
            hit.muted=true;
            muteBtn.style.backgroundImage = "url('images/muted.png')";
        }
        else if (fly.muted == true) {
            fly.muted = false;
            die.muted=false;
            hit.muted=false;
            muteBtn.style.backgroundImage = "url('images/mute-icon.png')";
        }
        console.log(fly.muted);
    })
    function draw() {
        if (!pause) {
            player_field.innerHTML = playerName;
            ctx.drawImage(background, 0, 0, 600, 600);
            for (var i = 0; i < pipes.length; i++) {
                if(fly.muted == true){
                    fly.muted == true; 
                } else if (fly.muted == false){
                    fly.muted==false;
                }
                var North_Y = pipes[i].y;
                var South_Y = pipeNorth.height + distance + pipes[i].y;
                ctx.drawImage(pipeNorth, pipes[i].x, North_Y);
                ctx.drawImage(pipeSouth, pipes[i].x, South_Y);
                pipes[i].x = (pipes[i].x) - pipeSpeed; //speed
                if (pipes[i].x === 300 ) { //separating distance
                    pipes.push({
                        x: pipX,
                        y: Math.floor((pipeNorth.height) * Math.random()) - pipeNorth.height
                    });
                }
                if (
                    ((birdX + birdImage.width) >= pipes[i].x &&
                        birdX <= (pipes[i].x + pipeNorth.width) &&
                        (birdY <= (pipeNorth.height + pipes[i].y) || birdY + birdImage.height >= (pipeNorth.height + pipes[i].y + distance)) &&
                        (birdY <= pipeNorth.height || birdY >= pipeSouth.y || birdY + birdImage.height >= pipeNorth.height + distance)) ||
                    (birdY >= 425)) {
                    console.log("5abat");          // 5sert live
                    pause = true;
                    if (lives > 1) {
                        lives--;
                        pipY = pipes[i].y;
                        localStorage.setItem(`${playerName}_location`, pipY);
                        hit.play();
                        play();
                    }
                    else if(lives==1) {
                         lives--;                       //GameOver
                        pause = true;
                        die.play();
                        console.log("gameOver");
                        console.log(lives);
                    }
                    lives_field.innerHTML = lives;
                  localStorage.setItem(`${playerName}_lives`, lives);
                    var j = 0;
                    var x = document.getElementById("myCanvas");
                    birdImage.addEventListener("click", function () {
                        console.log("eman");
                    })
                    if (lives == 0) {
                        document.querySelector(".lastPage").style.display = "block";
                    }
                } else if (pipes[i].x + pipeNorth.width == birdX) {
                    score++;
                    localStorage.setItem(`${playerName}`, score);
                    score_field.innerHTML = score;
                    if (score%10==0) {
                        level++;
                        level_field.innerHTML=level;
                        localStorage.setItem(`${playerName}_level`,level);
                        pipeSpeed++;
                        birdSpeed++;
                        lives_field.innerHTML = lives;
                    }
                    }
            }
            //bird
            if (birdY <= 425) {
                ctx.drawImage(birdImage, birdX, birdY += birdSpeed, birdImage.width, birdImage.height);
            }
            if (birdY < 0) {
                birdY = 0;
            }
            lives_field.innerHTML = lives;
            ctx.drawImage(foreground, 0, 485, 600, 600);
            requestAnimationFrame(draw);
        }
    }
    document.onkeypress = function (event) {
        if (event.keyCode == 13) {
            fly.muted = true;
        }
        if (event.keyCode == 0 || event.keyCode == 32) {
            fly.play();
            if (pause == false) {
                if (birdY >= 20 && birdY <= 400) {
                    birdY -= 20;
                }
            }
        }
    }
    // pauseBtn.addEventListener('click', function () {
    //     if (pause == false) {
    //         pause = true;

    //         console.log("pause");
    //     }
    //     else if (pause == true) {
    //         pause = false;
    //          draw();
    //         console.log("un-pause");
    //     }

    // })
    draw();
}