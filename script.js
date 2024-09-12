let gameOver = false;
let userBet = 0;
let userMoney = 1000; // Starting money
let startTime = Date.now();

function displayDealerHand() {
    const dealerHandElement = document.getElementById('dealer-hand');
    dealerHandElement.innerHTML = '';

    if (gameOver) {
        dealer.hand.forEach(card => {
            dealerHandElement.innerHTML += `<div class="card">${card}</div>`;
        });
    } else {
        dealerHandElement.innerHTML += `<div class="card">${dealer.hand[0]}</div>`;
        dealerHandElement.innerHTML += `<div class="card">??</div>`;
    }
}

function startGame() {
    gameOver = false;
    // Initialize other game state variables
    displayDealerHand();
    updateStats();
}

function resetBet() {
    userBet = 0;
    document.getElementById('current-bet').innerText = userBet;
}

function endGame(result) {
    gameOver = true;
    displayDealerHand();

    if (result === 'win') {
        userMoney += userBet * 2;
    } else if (result === 'insurance') {
        userMoney += userBet / 2;
    }

    userBet = 0;
    document.getElementById('current-bet').innerText = userBet;
    document.getElementById('user-money').innerText = userMoney;
}

function updateStats() {
    let timePlayed = Math.floor((Date.now() - startTime) / 60000);
    document.getElementById('time-played').innerText = timePlayed;
    document.getElementById('total-winnings').innerText = userMoney;
}

setInterval(updateStats, 1000);

function checkDebt() {
    if (userMoney < 0) {
        document.getElementById('total-winnings').innerText = `-${Math.abs(userMoney)}`;
    }

    if (userMoney === 0) {
        if (confirm("You have $0. Would you like to take a $1,000 loan? You must return $1,250 in 10 minutes or the game will reset.")) {
            userMoney += 1000;
            setTimeout(() => {
                if (userMoney < 1250) {
                    alert("You failed to repay the loan. The game will reset.");
                    location.reload();
                } else {
                    userMoney -= 1250;
                }
            }, 600000); // 10 minutes
        }
    }
}

setInterval(checkDebt, 1000);

function takeInsurance() {
    endGame('insurance');
}
