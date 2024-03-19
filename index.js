let caseClicked = "";
let playerCaseList = [];
let computerCaseList = [];

class Ship {
    constructor(lenght, position){
    this.lenght = lenght;
    this.position = position;
    this.isVertical = false;
    this.hitCount = 0;
    this.sunk = false;
    }
    hit(){
        this.hitCount++;
    }
    isShunk(){
        if(this.hitCount = this.lenght){
            this.sunk = true;
        }
    }
}

class Gameboard {
    constructor(playerArray, computerArray) {
        this.playerShips = this.placeTheShips(playerArray);
        this.computerShips = this.placeTheShips(computerArray);
        this.attackList = [];
    }
    placeTheShips(array) {
        let positionShips  = [];
        for(let position of array){
            let index = array.indexOf(position);
            let newShip = new Ship(index + 1, position.coordonée);
            if(position.orientation == "v") {
                newShip.isVertical = true;
            }
            positionShips.push(newShip);
        }
        return positionShips;

    }
    receiveAttack(attack, targetCamp) {
        let currentCase = "";
        for(let ship of targetCamp) {
            if(ship.isVertical == true) {
                let letter = ship.position[0];
                let number = ship.position[1];
                let lenght = ship.lenght;
                for(let i = 0; i < lenght; i++){
                    currentCase = letter + number;
                    number++;
                    if(currentCase == attack){
                        console.log("aille!"); 
                        ship.hit();
                        return true;
                    }
                }
            } else {
                let letter = ship.position[0];
                let number = ship.position[1];
                let lenght = ship.lenght;
                for(let i = 0; i < lenght; i++) {
                    let newLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
                    currentCase = letter + number;
                    letter = newLetter;
                    if(currentCase == attack){
                        console.log("aille!"); 
                        ship.hit();
                        return true;
                    }
                }
            }
        }
        return false;
    }
    checkIfWinner(player){
        let sunkShipCount = 0;
        for(let ship of player){
            if(ship.isShunk == true){
                sunkShipCount++;
            }
        }
        if(sunkShipCount == player.length){
            return true;
        } else {
            return false;
        }
    }
}

function setCase(grid){
    let letter = "A";
    let number = 1;
    let position = "";
    for(let i = 0; i < 100; i++){
        const gridCase = document.createElement("div");
        position = letter + number;
        let newLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
        letter = newLetter;
        if(letter == "K"){
            letter = "A";
            number++;
        }
        gridCase.setAttribute("id", position);
        gridCase.addEventListener("click", () => {
            caseClicked = gridCase.getAttribute('id');
            console.log(caseClicked);
        });
        grid.appendChild(gridCase);
    }
}


function startGame(){
    console.log("start game!");
    let game = new Gameboard(playerShipsObject, computerShipsObject);
    displayShips(game.playerShips);
    const rightDiv = document.querySelector(".right");
    rightDiv.addEventListener("click", () => {
    //player turn
    if(!playerCaseList.includes(caseClicked)){
        playerCaseList.push(caseClicked);
        playerTurn(caseClicked, game);
    }
    //computer turn
    let computerAttack = getComputerAttack();
    console.log("cumputer plays" + computerAttack);
    game.receiveAttack(computerAttack, game.playerShips);
    const caseClickedDiv = document.querySelectorAll((`#${computerAttack}`));
    caseClickedDiv[0].classList.add("clicked");   
    });
}

function displayShips(ships){
    let currentCase = "";
    for(let ship of ships) {
        if(ship.isVertical) {
            let letter = ship.position[0];
                let number = ship.position[1];
                let lenght = ship.lenght;
                for(let i = 0; i < lenght; i++){
                    currentCase = letter + number;
                    number++;
                    let caseShip = document.querySelector(`#${currentCase}`);
                    caseShip.classList.add("shipAlive")
                }
        } else {
            let letter = ship.position[0];
            let number = ship.position[1];
            let lenght = ship.lenght;
            for(let i = 0; i < lenght; i++) {
                let newLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
                currentCase = letter + number;
                letter = newLetter;
                let caseShip = document.querySelector(`#${currentCase}`);
                caseShip.classList.add("shipAlive")
            }
        }
    }
}

function playerTurn(caseClicked, game){
    console.log("player plays" + caseClicked);
    playerCaseList.push(caseClicked);
    game.receiveAttack(caseClicked, game.computerShips);
    const caseClickedDiv = document.querySelectorAll((`#${caseClicked}`));
    caseClickedDiv[1].classList.add("clicked");  
}

function getComputerAttack(){
    let attack;
    let letterList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const index = Math.floor(Math.random() * 10);
    let letter = letterList[index];
    let number =  Math.floor(Math.random() * 10) + 1;
    attack = letter + number; 
    while(computerCaseList.includes(attack)){
        const index = Math.floor(Math.random() * 10);
        let letter = letterList[index];
        let number =  Math.floor(Math.random() * 10) + 1;
        attack = letter + number; 
    }
    computerCaseList.push(attack);
    console.log(attack)
    return attack;
}

const playerGrid = document.querySelector("#playerDiv>div");
setCase(playerGrid);
const computerGrid = document.querySelector("#computerDiv>div");
setCase(computerGrid);

const playButton = document.querySelector(".divButton>button");
playButton.addEventListener("click", () => {
    startGame();
});

let playerShipsObject = [{coordonée : 'I9', orientation: "v"}, {coordonée : "D8", orientation: 'h'},
{coordonée : "G2", orientation: "h"}, {coordonée : "G4", orientation : "v"},
{coordonée :"B3", orientation : "v"}];
let computerShipsObject = [{coordonée : 'D4', orientation: "v"}, {coordonée : "F2", orientation: 'h'},
{coordonée : "B8", orientation: "v"}, {coordonée : "J2", orientation : "v"},
{coordonée :"D7", orientation : "h"}];



//créer Les joueurs 
//on joue contre un IA est passe aléatoirement ses pions
    //(elle ne doit pas placer 2x au mm endroit)

// créer la boucle de jeu

//créer un module pour interagrir avec le DOM




    module.exports = {
        Ship: Ship,
        Gameboard: Gameboard
        };