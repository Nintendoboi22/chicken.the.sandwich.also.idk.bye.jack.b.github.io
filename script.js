let balance = 1000;
let totalWinnings = 0;
let playtime = 0;
let gameMode = 1; // 1 for revealing 1 dealer card, 0 for none
let deck = [];
let playerCards = [];
let dealerCards = [];
let betAmount = 0;

document.getElementById('balance').innerText = balance;
document.getElementById('total-winnings').innerText = totalWinnings;
document.getElementById('playtime').innerText = playtime;

// Initialize playtime counter
setInterval(() => {
    playtime++;
    document.getElementById('playtime').innerText = playtime;
}, 1000);

// Deck initialization
function initializeDeck() {
    let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];

    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ value, suit });
        });
    });

    // Shuffle the deck
    deck.sort(() => Math.random() - 0.5);
}

// Card dealing logic
function dealCard() {
    return deck.pop();
}

function updateCardsDisplay() {
    document.getElementById('player-cards').innerText = playerCards.map(card => `${card.value} of ${card.suit}`).join(', ');
    document.getElementById('dealer-cards').innerText = dealerCards.slice(0, gameMode === 1 ? 1 : dealerCards.length)
        .map(card => `${card.value} of ${card.suit}`).join(', ');
}

// Hit button logic
document.getElementById('hit').addEventListener('click', () => {
    playerCards.push(dealCard());
    updateCardsDisplay();
    checkPlayerBust();
});

// Stand button logic
document.getElementById('stand').addEventListener('click', () => {
    dealerTurn();
});

// Double Down logic
document.getElementById('double-down').addEventListener('click', () => {
    if (balance >= betAmount) {
        betAmount *= 2;
        balance -= betAmount;
        document.getElementById('balance').innerText = balance;
        playerCards.push(dealCard());
        updateCardsDisplay();
        checkPlayerBust();
        dealerTurn();
    } else {
        alert('Not enough balance to double down!');
    }
});

// Insurance logic (optional based on dealer's visible card)
document.getElementById('insurance').addEventListener('click', () => {
    if (dealerCards[0].value === 'A') {
        let insurance = betAmount / 2;
        balance -= insurance;
        document.getElementById('balance').innerText = balance;
        // Additional insurance logic
    } else {
        alert('Insurance is only available when dealer has an Ace showing.');
    }
});

// Reset game
document.getElementById('reset').addEventListener('click', () => {
    location.reload();
});

// Loan logic
document.getElementById('loan').addEventListener('click', () => {
    balance += 1000;
    document.getElementById('balance').innerText = balance;
    document.getElementById('loan').style.display = 'none';
});

// Change game mode logic
document.getElementById('change-mode').addEventListener('click', () => {
    gameMode = 1 - gameMode;
    if (gameMode === 0) {
        document.getElementById('insurance').style.display = 'none';
    } else {
        document.getElementById('insurance').style.display = 'inline';
    }
    updateCardsDisplay();
});

// Bet input logic
document.getElementById('bet').addEventListener('change', (event) => {
    let bet = parseInt(event.target.value);
    if (isNaN(bet) || bet <= 0) {
        alert('Invalid bet amount!');
        event.target.value = '';
    } else if (bet > balance) {
        alert('Not enough balance!');
    } else {
        betAmount = bet;
        balance -= bet;
        document.getElementById('balance').innerText = balance;
        startGame();
    }
});

// Start game logic
function startGame() {
    initializeDeck();
    playerCards = [dealCard(), dealCard()];
    dealerCards = [dealCard(), dealCard()];
    updateCardsDisplay();
}

// Dealer's turn
function dealerTurn() {
    while (calculateHandValue(dealerCards) < 17) {
        dealerCards.push(dealCard());
    }
    updateCardsDisplay();
    checkWinner();
}

// Hand value calculation
function calculateHandValue(hand) {
    let value = 0;
    let aces = 0;
    hand.forEach(card => {
        if (['J', 'Q', 'K'].includes(card.value)) {
            value += 10;
        } else if (card.value === 'A') {
            value += 11;
            aces++;
        } else {
            value += parseInt(card.value);
        }
    });

    // Adjust for aces
    while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
    }

    return value;
}

// Check if player busts
function checkPlayerBust() {
    if (calculateHandValue(playerCards) > 21) {
        alert('You busted!');
        resetRound();
    }
}

// Check who won
function checkWinner() {
    let playerValue = calculateHandValue(playerCards);
    let dealerValue = calculateHandValue(dealerCards);

    if (playerValue > 21) {
        alert('You lose!');
    } else if (dealerValue > 21 || playerValue > dealerValue) {
        alert('You win!');
        balance += betAmount * 2; // Double payout for win
    } else if (playerValue < dealerValue) {
        alert('Dealer wins!');
    } else {
        alert('It\'s a tie!');
        balance += betAmount; // Return bet on tie
    }

    document.getElementById('balance').innerText = balance;
    resetRound();
}

// Reset round for new hand
function resetRound() {
    playerCards = [];
    dealerCards = [];
    betAmount = 0;
    document.getElementById('bet').value = '';
}