let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.resetbtn');
let newBtn = document.querySelector('.newbtn');
let newBtn2 = document.querySelector('.newbtn2');
let msg = document.querySelector('.msg');
let msgContainer = document.querySelector('.msgContainer');

let drawmsg = document.querySelector('.drawmsg');
let drawContainer = document.querySelector('.drawContainer');


let turnO = true; //playerx, o
let turnCount = 0;
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
 ];

boxes.forEach((box) => {
  box.addEventListener("click",()=>{
    if(gameOver) return;
    if(turnO){
    box.innerText="O";
    box.style.color="#846C5B";
    turnO = false;
    }else{
      box.innerText="X";
      box.style.color="#36453B";
      turnO = true;
    }
    box.disabled=true;
    turnCount++;
    checkWinner();
    
    if(!gameOver && turnCount===9){
      draw();
    };

  });
});



const draw = () =>{
  disableBoxes();
  drawContainer.classList.remove("hide");
  drawmsg.innerText = `IT'S A DRAW ☹️! PLAY AGAIN ?`;
  msgContainer.classList.add("hide");
}


const disableBoxes = () =>{
  for(let box of boxes){
    box.disabled = true;
  }
}

const enableBoxes = () =>{
  for(let box of boxes){
    box.disabled = false;
    box.innerText="";
  }
}
const resetGame = () =>{
  turnO = true;
  turnCount = 0;
  gameOver=false;
  enableBoxes();
  msgContainer.classList.add("hide");
  drawContainer.classList.add("hide");
  
}
const checkWinner = () =>{
  for(let pattern of winPatterns){
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if(pos1!=""&&pos2!=""&&pos3!=""){
      if(pos1===pos2&&pos2===pos3){
      showWinner(pos1);
      return;
     }
    }
 }
     
  
};

const showWinner = (winner) =>{
  disableBoxes();
  msgContainer.classList.remove("hide");
  msg.innerText = `${winner} HAS WON THE GAME 🎉🥳!`;
  drawContainer.classList.add("hide");
  gameOver = true;
};


newBtn2.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame); 
newBtn.addEventListener("click",resetGame);
