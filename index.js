//01- clock logic 
const clock = document.getElementById('clock')
const dt = document.getElementById('dt')
setInterval(function () {
  let clk  = new Date();
  clock.innerHTML=clk.toLocaleTimeString()
},1000)

setInterval(function(){
  let dtr = new Date();
  dt.innerHTML = dtr.toDateString()
},1000)


//genrate the random color
const randomcolor=function(){
    const hex ="0123456789ABCDEF"
    let color = '#'
    for(let i=0; i<6;i++){
     color +=hex[Math.floor(Math.random()*16)]
     
    }
    return color;
}
let  intervalId 
startchanging = function(){
    intervalId =setInterval(changeBgColor,1000);
    function changeBgColor(){
    document.body.style.backgroundColor =randomcolor()
}
}
stopchanging =function(){
    clearInterval(intervalId)
    intervalId =null;
}
document.querySelector('#start').addEventListener('click',startchanging,false)
document.querySelector('#stop').addEventListener('click',stopchanging,false)


//guessing game 
//04-guess no 
let randomNo = parseInt(Math.random()*100+1)  
const userInput = document.querySelector("#guessField")
const submit  = document.querySelector("#subt") 
const guessSlot =document.querySelector('.guesses')
const remaining =document.querySelector('.lastResult')
const lowhi  = document.querySelector('.lowOrhi')
const startOver =document.querySelector('.resultparas')

const p = document.createElement('p')
let prevguess = []
let numguess = 1
let playGame = true

//step-1 user Enter here
if(playGame){ 
      submit.addEventListener('click',function(e){
      e.preventDefault()//khi bhejna nhi hai

      const userGuess = parseInt(userInput.value) 
      console.log(userGuess)
      validateguess(userGuess)//next element  me fwd
   })
}
//step-2 validation game
function validateguess(userGuess){
     if(isNaN(userGuess)){ // check if no not int  
           alert('This is not the valid No') 
     }
     else if(userGuess<1){
     alert('No  is less then 0')// no is less then 0  
     }
     else if(userGuess>100){
      alert('No  is more then 100')// no is less then 0  
      }
      else{
       prevguess.push(userGuess)
       if(numguess===11){
         displayguess(userGuess)
         displayMessage(`Game over. Random no is ${randomNo}`);
         endgame()
       }  
       else{
         displayguess(userGuess)
         checkguess(userGuess)
       }
      }
}
//step-3 checking the user no and random no  
function checkguess(userGuess){
  if(userGuess=== randomNo){
   displayMessage(`your guess is Correct `)
   endgame()
  }
  else if(userGuess < randomNo){
   displayMessage(`Your guess is too low`)
  }
  else if(userGuess > randomNo){
   displayMessage(`Your guess is too high`)
  }
}
//step-04 reaming input [low(numberguess) or high(remaning guess)]
function displayguess(userGuess){
  userInput.value=''
  guessSlot.innerHTML += `${userGuess}  `
  numguess++;
  remaining.innerHTML=`${11-numguess}`
}
//step 05 display
function displayMessage(message){
  lowhi.innerHTML =`<h2>${message}</h2>`
}
//step 06 end the game 
function endgame(){
    userInput.value='';
    userInput.setAttribute('disabled','');
    p.classList.add('button');
    p.innerHTML = `<h1 id="newGame">new game</h1>`;
    startOver.appendChild(p)
    playGame =false;
    startnew()
   }
//07 start new  game
function startnew(){

  const newGameButton = document.querySelector('#newGame')
   newGameButton.addEventListener('click',function(e){
   randomNo = parseInt(Math.random()*100+1);
   prevguess=[]
   numguess=1
   guessSlot.innerHTML=''
  // remaining.innerHTML=`${11-numguess}`
   userInput.removeAttribute('disabled')
   startOver.removeChild(p)
   playGame =true
})
}
