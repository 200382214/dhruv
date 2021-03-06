// Step 1a - Select and store the gameboard element
const gameboard = document.querySelector('#gameboard');

// Step 1b - Select and store the score element
const score = document.querySelector('#score');

// Step 1c - Select and store the cards element
const cards = document.querySelector('#cards');

// Step 1d - Select and store the message element
const msg = document.querySelector('#message');





// Step 2 - Create an array of cards
const cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
let deck = [];

function shuffleDeck() {
    // Step 2b - Create a placeholder array//--> not required--//

    // Step 2c - Iterate through card values 4 times
    for (i = 0; i < 4; i++) {
        let tmp = cardValues.slice(0);
        // Step 2d - Using a conditional loop
        while (tmp.length != 0) {
            // Step 2e - Select a random card from the array
            let randomCard = Math.floor(Math.random() * tmp.length);
            // Step 2f - Add the card to the deck array
            deck.push(tmp.splice(randomCard, 1)[0])
        }
    }
}

// Step 2g - Call the shuffleDeck function
shuffleDeck();
console.log(deck)

// Step 3a - Create an array to store 2 players
var players = ['Player1', 'Player2'];
let playerScore = [0, 0];
// Step 3b - Create a variable to store the current player
let currentPlayer = 0;
//score for 2 playerss/

// Step 3c - Create a variable to store the first selected card
let currentCard = null;

// Step 4 - Iterate through the deck and bind a click event to each one
for (let cardValue of deck) {
    // Step 4a - Create a new div element to be a card
    let cardEle = document.createElement('div');
    // document.getElementById('cards').appendChild(cardEle);

    // Step 3b - Add a 'card' class to the class list on the new div element
    cardEle.classList.add('card');

    // Step 3c - Add a data value to the card with the card's value in it
    cardEle.dataset.value = cardValue;

    // Step 3c - Bind the cardSelected function
    // to the click event on the cardEle
    
    cardEle.addEventListener('click', cardSelected);
    gameboard.append(cardEle);
};


// Step 5 - Create a function to store the logic
// for when a card is selected
function cardSelected(e) {
              e.target.innerHTML = e.target.dataset.value;

    //to show valueof clicked card//
    
    // Step 5a - Check if there is already a card selected
    if (currentCard != null) {
        // Step 6 - Compare the cards
        if (currentCard.textContent === e.target.textContent) {
            // Step 6b - Add a class to the 2 card elements
            // flipping them over
            e.target.classList.add('flipped');
            currentCard.classList.add('flipped');
              

            // Step 6c - Add a point to the score for this player
            playerScore[currentPlayer] += 1;
            //to manipulate score//
            score.textContent = playerScore.toString();


            // Step 6d - Tell the player to go again
            // (use string interpolation to show which player you're addressing)
            msg.textContent = `Congratulations! ${players[currentPlayer]}, please go again!`;
        } else {
            // Step 6e - Provide a fail message to the player
            msg.textContent = "Oh, so sorry!!! But yer' not psychic!";

            // Step 6f - Using a ternary, change players
            currentPlayer = (currentPlayer === 0) ? 1 : 0;
            //my comment-reset value for current card//
            currentCard = undefined;

            // Step 6g - Concatenate a message to the message element
            // advising player 2 that it's their turn now
            // (use string interpolation to show which player you're addressing)
            msg.textContent = `${players[currentPlayer]}, your turn!`;
        }
        currentCard = null;

    } else {
        // Step 5b - Assign the card to currentCard
        currentCard = e.target;
        // Step 5c - Tell the player to select another card
        // (use string interpolation to show which player you're addressing)
        msg.textContent = `${players[currentPlayer]}, please select another card`;
    }

}

// Step 7 - Check if the board is full
if (document.querySelector('.flipped') === 52) {
    // Step 7a - Check if one of the players has won
    if (playerScore[0] > playerScore[1]) {
        // Step 7b - Tell the player they've won
        // (use string interpolation to show which player you're addressing)
        msg.textContent = `${players[currentPlayer]}, you won!!! Congratulations!`;

    } else if (playerScore[1] > playerScore[0]) {
        msg.textContent = `${players[currentPlayer]}, you won!!! Congratulations!`;

    } else {
        // Step 7c - Tell the players that the game has ended in a tie
        msg.textContent = "The game was a tie! Nice try!";
    }
}

// Take it further - Reset the board allowing the user to play again (Worth 20% of the final grade)
/*
  Step 1 - You will need a reset button in index.html
  Step 2 - You will need to bind an event listener
           that detects the click and executes a function
  Step 3 - You will need to reset all the pieces on the
           board
  Step 4 - You will need to reset the messages
  Step 5 - You will need to reset the players
*/
let reset = document.getElementById('reset');
reset.addEventListener('click',() => window.location.reload());

    gameboard.classList.remove('card');
