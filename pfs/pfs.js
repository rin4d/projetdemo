const containingChoiceComputer = document.getElementById('choice-computer');
const containingChoiceUser = document.getElementById('choice-user');
const containingChoiceResult = document.getElementById('result');

const choicesPossible = document.querySelectorAll('button');
let choiceUser;
let result;
let choiceComputer;

choicesPossible.forEach(choicePossible => choicePossible.addEventListener('click',(e)=>{
    choiceUser = e.target.id ;
    containingChoiceUser.innerHTML = `<img src="${choiceUser}.png">`;
    getComputerChoice();
    verification();
}))

function getComputerChoice(){
    let random = Math.floor(Math.random()*3)+1;
    if(random === 1){
        choiceComputer = "pierre";
    }
    if(random === 2){
        choiceComputer = "papier";
    }
    if(random === 3){
        choiceComputer = "ciseaux";
    }
    containingChoiceComputer.innerHTML = `<img src="${choiceComputer}.png">`;
}

function verification(){
    if(choiceUser == choiceComputer){
        result = "Egalité";
    }
    if(choiceUser == "pierre" && choiceComputer == "papier"){
        result = "Perdue !";
    }
    if(choiceUser == "papier" && choiceComputer == "ciseaux"){
        result = "Perdue !";
    }
    if(choiceUser == "ciseaux" && choiceComputer == "pierre"){
        result = "Perdue !";
    }
    if(choiceUser == "pierre" && choiceComputer == "ciseaux"){
        result = "Gagné !";
    }
    if(choiceUser == "ciseaux" && choiceComputer == "papier"){
        result = "Gagné !";
    }
    if(choiceUser == "papier" && choiceComputer == "pierre"){
        result = "Gagné !";
    }
    containingChoiceResult.innerHTML = result;
}