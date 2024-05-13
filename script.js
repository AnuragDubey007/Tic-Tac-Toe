let box=document.querySelectorAll(".boxes");
let resetBtn=document.querySelector(".reset");
let newgame=document.querySelector(".new-Btn");
let winner=document.querySelector(".Winner-Btn");
let home=document.querySelector(".home");
let cross_box=document.querySelector("#cross_box");
let zero_box=document.querySelector("#zero_box");


newgame.style.cursor="pointer";

let turno=true;
let gameended=false;
let count=0;

const winpatterns=[
    [1,2,3],
    [1,4,7],
    [1,5,9],
    [3,5,7],
    [3,6,9],
    [7,8,9,],
    [4,5,6],
    [2,5,8]
];


let cross=1;
let zero=0;
let firstchclicked=false;



    const firstchance=()=>{
              turno=false;  
              firstchclicked=true;
              cross_box.removeEventListener("click",firstchance);
    }
    const firstchancezero=()=>{
        turno=true;  
        firstchclicked=true;
        zero_box.removeEventListener("click",firstchancezero);
}



cross_box.addEventListener("click",()=>{
    cross_box.classList.toggle("clicked");

    setTimeout(()=>{
        cross_box.classList.remove("clicked");
    },100)
    
});

zero_box.addEventListener("click",()=>{
    zero_box.classList.toggle("clicked");
    setTimeout(()=>{
        zero_box.classList.remove("clicked");
    },100)
});

// cross_box.addEventListener("click", () => {
//     if (!firstchclicked) {
//         cross_box.classList.toggle("clicked");
//         turno = true;  // Set turn to true for crosses
//         zero_box.removeEventListener("click", firstchancezero);  // Remove event listener from zero box
//         firstchance();  // Call function to handle the first chance
//     }
//     setTimeout(() => {
//         cross_box.classList.remove("clicked");
//     }, 100)
// });

// zero_box.addEventListener("click", () => {
//     if (!firstchclicked) {
//         zero_box.classList.toggle("clicked");
//         turno = false;  // Set turn to false for zeros
//         cross_box.removeEventListener("click", firstchance);  // Remove event listener from cross box
//         firstchancezero();  // Call function to handle the first chance for zeros
//     }
//     setTimeout(() => {
//         zero_box.classList.remove("clicked");
//     }, 100)
// });

const resetgame=()=>{
    // Reset game state variables
    turno=true;
    gameended=false;
    home.style.height="100px";
    count=0;
    home.style.height = "140px"
    home.style.width = "100%";
    confetti.stop();
   

    // Clear the board
    box.forEach((b)=>{
            b.innerText="";// Reset innerText
            b.classList.remove("disabled");// Remove the disabled class

            // Clear the winner message
            winner.innerText="";
    })
}

zero_box.addEventListener("click",firstchancezero);
cross_box.addEventListener("click",firstchance);
resetBtn.addEventListener("click",resetgame);
newgame.addEventListener("click",resetgame);


box.forEach((b) => {
    b.addEventListener("click",()=>{
        if(gameended==true){

                return;
        }

        
        console.log("box was clicked");
        if(!b.classList.contains("disabled")){
        if(turno==true){//player x;
            
            b.innerHTML=`<img src="circle.png">`;
            turno=false;

        }
        else{//player O;

            b.innerHTML=`<img src="cross.png">`;
            turno=true;
        }
        b.classList.add("disabled");
        count++;

        checkWinner();// Check winner after each move

        if (count===9 && !gameended){ // Check for draw
            gameDraw();

        }
    }
    
    });

const gameDraw=()=>{
    winner.innerText=`Draw`;
    gameended=true;
    home.style.height="900px";
    newgame.style.height = "130px"
    newgame.style.width = "280px";
}
   
    
});
showwinner=(win)=>{
    winner.innerHTML="";
    winner.innerText=`Congratulations,Winner is ${win===`<img src="cross.png">` ? 'X' : 'O'}`;
    home.style.height="990px";
    newgame.style.height = "100px"
    newgame.style.width = "270px";
    confetti.start();
}

const checkWinner=()=>{
    for(let pattern of winpatterns){
        let box1val=box[pattern[0]-1].innerHTML;
        let box2val=box[pattern[1]-1].innerHTML;
        let box3val=box[pattern[2]-1].innerHTML;
        
        if(box1val!=""&&box2val!=""&&box3val!=""){
            if(box1val==box2val&&box2val==box3val){
                console.log("winner",box1val);
                    showwinner(box1val);
                    gameended=true;
                   
            }

        }
    }
    
}