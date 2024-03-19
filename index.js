let caseClicked = "";
let playerCaseList = [];
let computerCaseList = [];

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
        if(this.hitCount == this.lenght){
            this.isShunk = true;
        }
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


function startGame(){
    console.log("start game!");
    playerCaseList = [];
    computerCaseList = [];
    displayGameBoard();
    let game = new Gameboard(playerShipsObject, computerShipsObject);
    displayShips(game.playerShips);
    const rightDiv = document.querySelector(".right");
    rightDiv.addEventListener("click", () => {
        //player turn
        if(!playerCaseList.includes(caseClicked)){
            playerCaseList.push(caseClicked);
            playerCaseList.push(caseClicked);
            let isHit = game.receiveAttack(caseClicked, game.computerShips);
            const caseClickedDiv = document.querySelectorAll((`#${caseClicked}`));
            if(isHit){
                caseClickedDiv[1].classList.add("shipSunk");
            } else {
                caseClickedDiv[1].classList.add("clicked");
            }
            if(game.checkIfWinner(game.computerShips)){
                printWinner("Player");
            }
        //computer turn
            setTimeout(() => {
                let computerAttack = getComputerAttack();
                let isHit = game.receiveAttack(computerAttack, game.playerShips);
                const caseClickedDiv = document.querySelectorAll((`#${computerAttack}`));
                if(isHit){
                    caseClickedDiv[0].classList.add("shipSunk");
                } else {
                    caseClickedDiv[0].classList.add("clicked");
                }
                if(game.checkIfWinner(game.playerShips)){
                    printWinner("Cumputer");
                }
            }, 700);
        }
    });
}

function setGrid(grid){
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
        });
        grid.appendChild(gridCase);
    }
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
    return attack;
}

function displayGameBoard(){
    const mainDiv = document.querySelector(".mainDiv");
    const gameBoard = document.createElement("div");
    gameBoard.classList.add("gameboard");
    const playerDiv = document.createElement("div");
    playerDiv.setAttribute("id", "playerDiv");
    playerDiv.classList.add("side", "left"); 
    let h3Player = document.createElement("h3");
    h3Player.textContent = "Player Grid";
    let node = displayGrid();
    playerDiv.appendChild(h3Player);
    playerDiv.appendChild(node);
    gameBoard.appendChild(playerDiv);
    const winnerDiv = document.querySelector(".winnerDiv");
    if(!winnerDiv){
        mainDiv.appendChild(gameBoard);
    } else {
        mainDiv.replaceChild(gameBoard, winnerDiv);
    }

    const compDiv = document.createElement("div");
    compDiv.setAttribute("id", "computerDiv");
    compDiv.classList.add("side", "right"); 
    let h3comp = document.createElement("h3");
    h3comp.textContent = "computer Grid";
    let node2 = displayGrid();
    compDiv.appendChild(h3comp);
    compDiv.appendChild(node2);
    gameBoard.appendChild(compDiv);

    const allGrids = document.querySelectorAll(".grid");
    setGrid(allGrids[0]);
    setGrid(allGrids[1]);
    displaySides();
}

function displayGrid(){
    let node = document.createElement("div");
    node.classList.add("board");
    let divLetter = document.createElement("div");
    let divNumber = document.createElement("div");
    let divgrid  = document.createElement("div");
    divLetter.classList.add("letters");
    divNumber.classList.add("numbers");
    divgrid.classList.add("grid");
    node.appendChild(divLetter);
    node.appendChild(divNumber);
    node.appendChild(divgrid);
    return node;
}

function displaySides(){
    const lettersDiv = document.querySelectorAll(".letters");
    const numbersDiv = document.querySelectorAll(".numbers");
    for(let j = 0; j < 2; j++){
        let firstLetter = "@";
        let firstNumber = 1;
        for(let i = 0; i < 10; i++){
            let div = document.createElement("div");
            let newLetter = String.fromCharCode(firstLetter.charCodeAt(0) + 1);
            firstLetter = newLetter;
            div.textContent = newLetter;
            lettersDiv[j].appendChild(div);
            let div2 = document.createElement("div");
            div2.textContent = firstNumber++;
            numbersDiv[j].appendChild(div2);
        }
    }
}
function printWinner(winner){
    console.log(`The winner is ${winner}`);
    const mainDiv = document.querySelector(".mainDiv")
    const gameboardDiv = document.querySelector(".gameboard");
    const replaceDiv = document.createElement("div");
    replaceDiv.classList.add("winnerDiv");
    replaceDiv.textContent = `The winner is ${winner}`;
    mainDiv.replaceChild(replaceDiv, gameboardDiv);
}







    module.exports = {
        Ship: Ship,
        Gameboard: Gameboard
        };