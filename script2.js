let balance = 1000;
let bet = 0;
let playerHand = [];
let dealerHand = [];
let deck = [];

function createDeck() {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    deck = [];
    for (let value of values) {
        for (let i = 0; i < 4; i++) { // 4 suits, but we won't display them
            deck.push({ value });
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
    updateUI();
}

function updateUI() {
    document.getElementById('balance').innerText = balance;
    document.getElementById('bet').innerText = bet;
    document.getElementById('player-hand').innerText = handToString(playerHand);
    document.getElementById('dealer-hand').innerText = dealerHandToString(dealerHand);
}

function handToString(hand) {
    return hand.map(card => card.value).join(', ');
}

function dealerHandToString(hand) {
    return `${hand[0].value}, [Hidden]`;
}

document.getElementById('place-bet').addEventListener('click', () => {
    const betAmount = parseInt(document.getElementById('bet-amount').value);
    if (betAmount > 0 && betAmount <= balance) {
        bet = betAmount;
        balance -= bet;
        startGame();
    } else {
        alert('Invalid bet amount');
    }
});

document.getElementById('hit').addEventListener('click', () => {
    playerHand.push(deck.pop());
    updateUI();
});

document.getElementById('stand').addEventListener('click', () => {
    // Dealer logic here
    updateUI();
});

document.getElementById('double-down').addEventListener('click', () => {
    if (balance >= bet) {
        bet *= 2;
        balance -= bet / 2;
        playerHand.push(deck.pop());
        updateUI();
    } else {
        alert('Not enough balance to double down');
    }
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