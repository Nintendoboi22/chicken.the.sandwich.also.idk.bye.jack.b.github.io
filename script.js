let balance = 1000;
let totalWinnings = 0;
let playtime = 0;
let gameMode = 1; // 1 for revealing 1 dealer card, 0 for none

document.getElementById('balance').innerText = balance;
document.getElementById('total-winnings').innerText = totalWinnings;
document.getElementById('playtime').innerText = playtime;

setInterval(() => {
    playtime++;
    document.getElementById('playtime').innerText = playtime;
}, 1000);

document.getElementById('hit').addEventListener('click', () => {
    // Hit logic
});

document.getElementById('stand').addEventListener('click', () => {
    // Stand logic
});

document.getElementById('double-down').addEventListener('click', () => {
    // Double Down logic
});

document.getElementById('insurance').addEventListener('click', () => {
    // Insurance logic
});

document.getElementById('reset').addEventListener('click', () => {
    location.reload();
});

document.getElementById('loan').addEventListener('click', () => {
    balance += 1000;
    document.getElementById('balance').innerText = balance;
    // Logic to repay loan
});

document.getElementById('change-mode').addEventListener('click', () => {
    gameMode = 1 - gameMode;
    if (gameMode === 0) {
        document.getElementById('insurance').style.display = 'none';
    } else {
        document.getElementById('insurance').style.display = 'inline';
    }
    // Logic to change game mode
});

document.getElementById('bet').addEventListener('change', (event) => {
    let bet = parseInt(event.target.value);
    if (bet > balance) {
        alert('Not enough balance!');
    } else {
        balance -= bet;
        document.getElementById('balance').innerText = balance;
        // Betting logic
    }
});

// Additional game logic for dealing cards, checking for wins/losses, etc.
