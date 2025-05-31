let colours = ["red","yellow","green","blue"];
let sequence = [];
let userSequence = [];
let btn;
let level = 0;
let start = false;
let levelNo = document.querySelector("h3");
let highest = 0;
let high = document.querySelector("h2");

function startGame() {
    if (start === false) {
        console.log("game started");
        start = true;
        setTimeout(levelup, 250); 
    }
}

document.addEventListener("click", function (event) {
    if (
        !event.target.matches("button.red") &&
        !event.target.matches("button.green") &&
        !event.target.matches("button.yellow") &&
        !event.target.matches("button.blue")
    ) {
        startGame();
    }
});

function flashBtn(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    },250);
}

function levelup(){
    userSequence = [];
    level ++;
    levelNo.innerText = `level ${level}`;
    let btnIdx = Math.floor(Math.random()*4);
    let colour = colours[btnIdx];
    sequence.push(colour);
    btn = document.querySelector("." + colour);
    flashBtn(btn);
}

function btnPress(event) {
    event.stopPropagation(); 
    if (start === false) {
        startGame();
        return; 
    }
    let button = this;
    flashBtn(this);
    let colour = button.getAttribute("id");
    console.log(colour);
    userSequence.push(colour);
    match(userSequence.length-1);
}

function match(idx){
    if(sequence[idx] === userSequence[idx]){
        if(userSequence.length === sequence.length){
            setTimeout(levelup, 1000);
        }
    }else{
        levelNo.innerText = `Game over! press any key to restart`;
        highest = Math.max(highest,level);
        level = 0;
        start = false; 
        high.innerHTML = `highest score: ${highest}`;
        sequence=[];
    }
}

let allBtns = document.querySelectorAll("button");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
