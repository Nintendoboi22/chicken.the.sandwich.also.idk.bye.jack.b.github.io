let balance = 1000;
let bet = 0;
let playerHand = [];
let dealerHand = [];
let deck = [];

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function startGame() {
    createDeck();
    shuffleDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    bet = 100; // Example bet
    balance -= bet;
    updateUI();
}

function updateUI() {
    document.getElementById('balance').innerText = balance;
    document.getElementById('bet').innerText = bet;
    document.getElementById('player-hand').innerText = handToString(playerHand);
    document.getElementById('dealer-hand').innerText = handToString(dealerHand);
}

function handToString(hand) {
    return hand.map(card => `${card.value} of ${card.suit}`).join(', ');
}

document.getElementById('hit').addEventListener('click', () => {
    playerHand.push(deck.pop());
    updateUI();
});

document.getElementById('stand').addEventListener('click', () => {
    // Dealer logic here
    updateUI();
});

document.getElementById('double-down').addEventListener('click', () => {
    bet *= 2;
    balance -= bet / 2;
    playerHand.push(deck.pop());
    updateUI();
});

document.getElementById('split').addEventListener('click', () => {
    // Split logic here
    updateUI();
});

document.getElementById('insurance').addEventListener('click', () => {
    // Insurance logic here
    updateUI();
});

startGame();
