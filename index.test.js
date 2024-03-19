const { Ship,
Gameboard } = require('./index.js');

const playerShips = [{coordonée : 'I9', orientation: "v"}, {coordonée : "D8", orientation: 'h'},
{coordonée : "G2", orientation: "h"}, {coordonée : "G4", orientation : "v"},
{coordonée :"B3", orientation : "v"}];
const computerShips =  [{coordonée : 'D4', orientation: "v"}, {coordonée : "F2", orientation: 'h'},
{coordonée : "B8", orientation: "v"}, {coordonée : "J2", orientation : "v"},
{coordonée :"D7", orientation : "h"}];

test("get lenght of a Ship", () => {
    let shipTest = new Ship(2);
    let lenghtTest = shipTest.lenght;
    expect(lenghtTest).toBe(2);
});

test("Hit a ship", () => {
    let shipTest = new Ship(3);
    shipTest.hit(); 
    let hitTotal = shipTest.hitCount;
    expect(hitTotal).toBe(1);
});
test("Placement of the ships", () => {
    let game = new Gameboard(playerShips, computerShips);
    let positionShip1 = game.playerShips[0].position;
    expect(positionShip1).toBe("I9");
});

test("hit the ship", () =>{
    let game = new Gameboard(playerShips, computerShips);
    let result =  game.receiveAttack("G7", game.playerShips);
    expect(result).toBeTruthy();
})

test("failed to hit the ship", () =>{
    let game = new Gameboard(playerShips, computerShips);
    let result =  game.receiveAttack("B8", game.playerShips);
    expect(result).not.toBeTruthy();
});

test("Check is there is a winner", () =>{
    let game = new Gameboard(playerShips, computerShips);
    let result = game.checkIfWinner(game.playerShips);
    expect(result).not.toBeTruthy();
});
