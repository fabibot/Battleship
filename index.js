let caseClicked = "";
let playerCaseList = [];
let computerCaseList = [];

const playButton = document.querySelector(".divButton>button");
playButton.addEventListener("click", () => {
    resetGame();
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
        getComputerAttack(){
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

class ManageDOM {
    displayGrid(){
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
    
    displaySides(){
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
    printWinner(winner){
        console.log(`The winner is ${winner}`);
        const mainDiv = document.querySelector(".mainDiv")
        const gameboardDiv = document.querySelector(".gameboard");
        const replaceDiv = document.createElement("div");
        replaceDiv.classList.add("winnerDiv");
        replaceDiv.textContent = `The winner is ${winner}`;
        mainDiv.replaceChild(replaceDiv, gameboardDiv);
    }

    displayGameBoard(){
        const divButton = document.querySelector(".divButton");
        let h2 = document.createElement("h2");
        h2.textContent = "Place your ships (press R to reverse ship)";
        let readyButton = document.createElement("button");
        readyButton.textContent = "ready to fight !";
        readyButton.addEventListener("click", () => {
            let buttonPlay = document.createElement("button");
            buttonPlay.textContent = "replay";
            buttonPlay.addEventListener("click", () => {
                resetGame();
            });
            divButton.replaceChild(buttonPlay, readyButton);
            divButton.removeChild(h2);
            startGame();
        })
        let oldDiv = divButton.children;
        divButton.replaceChild(h2, oldDiv[0]);
        divButton.appendChild(readyButton);
        const mainDiv = document.querySelector(".mainDiv");
        const gameBoard = document.createElement("div");
        gameBoard.classList.add("gameboard");
        const playerDiv = document.createElement("div");
        playerDiv.setAttribute("id", "playerDiv");
        playerDiv.classList.add("side", "left"); 
        let h3Player = document.createElement("h3");
        h3Player.textContent = "Player Grid";
        let node = this.displayGrid();
        playerDiv.appendChild(h3Player);
        playerDiv.appendChild(node);
        gameBoard.appendChild(playerDiv);
        let mainDivChildren = mainDiv.children;
        if(!mainDivChildren[1]){
            mainDiv.appendChild(gameBoard);
        } else {
            mainDiv.replaceChild(gameBoard, mainDivChildren[1]);
        }
        const compDiv = document.createElement("div");
        compDiv.setAttribute("id", "computerDiv");
        compDiv.classList.add("side", "right"); 
        let h3comp = document.createElement("h3");
        h3comp.textContent = "computer Grid";
        let node2 = this.displayGrid();
        compDiv.appendChild(h3comp);
        compDiv.appendChild(node2);
        gameBoard.appendChild(compDiv);
    
        const allGrids = document.querySelectorAll(".grid");
        this.setGrid(allGrids[0]);
        this.setGrid(allGrids[1]);
        this.displaySides();
        this.placePlayerShips();

    }

    placePlayerShips(){
        let caseGridList = document.querySelectorAll(".grid > div");
        let positionList = [];
        let isShipVertical = false;
        let squareSizes = ['60px', '90px', '120px', '150px', '180px']
        let index = 0;
        const square = document.createElement('div');
        square.classList.add('square');
        document.body.appendChild(square);
        document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        square.style.left = mouseX - 15 + 'px';
        square.style.top = mouseY - 15 +'px';
        });
        window.addEventListener("keydown", (e) =>{
            let squareWidth = getComputedStyle(square).width;
            let squareHeight = getComputedStyle(square).height;
            if(e.key == "r" || e.key == "R"){
                if(isShipVertical){
                    isShipVertical = false;
                    square.style.width = squareHeight;
                    square.style.height = squareWidth;
                } else {
                    isShipVertical = true;
                    square.style.width = squareHeight;
                    square.style.height = squareWidth;
                }
            
            }
        });
        for(let i = 0; i < 100; i++){
            caseGridList[i].addEventListener('click', () =>{
                caseGridList[i].classList.add("shipAlive");
                let id = caseGridList[i].getAttribute("id");
                if(isShipVertical){
                    square.style.height = squareSizes[index];  //todo : : arranger l'aggrandissement PROGRESSIF de ca
                } else {
                    square.style.width = squareSizes[index];
                }
                index++
                console.log(square.style.height);
                positionList.push(id);
                console.log(positionList);
            });
        }

    }

    setGrid(grid){
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
    displayShips(ships){
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
}

let dom = new ManageDOM();

function resetGame(){ // appelé si play est clické!
    console.log("start game!");
    playerCaseList = [];
    computerCaseList = [];
    dom.displayGameBoard();
}

function startGame(){ //appelé si ready to fight est clické
    let game = new Gameboard(playerShipsObject, computerShipsObject);
    dom.displayShips(game.playerShips);
    const rightDiv = document.querySelector(".right");
    rightDiv.addEventListener("click", () => {
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
                dom.printWinner("Player");
            }
            setTimeout(() => {
                let computerAttack = game.getComputerAttack();
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










    module.exports = {
        Ship: Ship,
        Gameboard: Gameboard
        };