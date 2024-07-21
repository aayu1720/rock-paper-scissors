const choices = ["rock", "paper", "scissors"];
const colourMap = {
    rock : 'bx3',
    paper: 'bx1', 
    scissors: 'bx2', 
};

const choicesButton = document.querySelectorAll('.choices');
const buttonContainer = document.querySelector('.btn-container');
const playerPickedChoice = document.querySelector('.playerPickedResult');
const pcPickedChoice = document.querySelector('.pcPickedResult');
const resultDisplay = document.querySelector('.resultDisplay');
const playAgainButton = document.querySelector('.playAgain');
const playerWinningStatusDisplay = document.querySelector('.playerWinningStatus');
const playerScoreDisplay = document.getElementById('playerScoreDisplay');
const computerScoreDisplay = document.getElementById('computerScoreDisplay');
const nextButton = document.querySelector('.nextButton');
const againstPC = document.querySelector('.againstPc');
const playerPickedResultBox = document.querySelector('.playerPickedResultBox');
const pcPickedResultBox = document.querySelector('.pcPickedResultBox');
const playerSpanElementBox = document.getElementById('playerAmimation');
const computerSpanElementBox = document.getElementById('pcAmimation');
const popupDiv = document.getElementById("popupDiv");

let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

function saveScores() {
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
}

function updateScoreDisplay() {
    document.getElementById('playerScoreDisplay').innerText = playerScore;
    document.getElementById('computerScoreDisplay').innerText = computerScore;
}

document.addEventListener('DOMContentLoaded', updateScoreDisplay);

choicesButton.forEach(button => {
    button.addEventListener('click', computerSelect);
    button.addEventListener('click', playerSelect);
})

function playerSelect(event){
    const playerChoice = event.target.value;
    playerPickedChoice.style.background = `var(--${playerChoice}) no-repeat center`;
    playerPickedChoice.style.border = `16px solid var(--${colourMap[playerChoice]})`;
    buttonContainer.style.display = 'none';
    resultDisplay.style.display = 'flex';
}

function computerSelect(event){
    const playerChoice = event.target.value;
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    addStyleToComputerChoice(computerChoice);
    const playerWinningStatus = getWinner(playerChoice, computerChoice);
    updateScore(playerWinningStatus);
    playerWinningStatusDisplay.innerHTML = playerWinningStatus;
    playAgainButton.addEventListener('click', startGameAgain)
}

function addStyleToComputerChoice(computerChoice){
    pcPickedChoice.style.background = `var(--${computerChoice}) no-repeat center`; 
    pcPickedChoice.style.border = `16px solid var(--${colourMap[computerChoice]})`;
}

function startGameAgain(){
    buttonContainer.style.display = 'flex';
    againstPC.style.visibility = 'visible';
    resultDisplay.style.display = 'none';
    nextButton.style.display = 'none';
    removeAnimate('animate');
    hideAnimationSpanOnLostSide(true, true, "block");
    popupDiv.style.right = '20px'
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "TIE UP";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        return "YOU WIN";
    } else {
        return "YOU LOST";
    }
}

function removeAnimate(className){
    if(playerPickedResultBox.classList.contains(className)){
        playerPickedResultBox.classList.remove(className);
    }
    if(pcPickedResultBox.classList.contains(className)){
        pcPickedResultBox.classList.remove(className);
    }
}

function hideAnimationSpanOnLostSide(player, pc, display){
    if(player){
        playerSpanElementBox.style.display = display;
    } 
    if(pc){
        computerSpanElementBox.style.display = display;
    }
}

function updateScore(status) {
    if (status === "YOU WIN") {
        playerScore++;
        playerScoreDisplay.innerHTML = playerScore;
        saveScores();
        nextButton.style.display = 'block';
        popupDiv.style.right = '160px'
        nextButton.addEventListener('click', navigateToNewPage)
        playerPickedResultBox.classList.add('animate');
        hideAnimationSpanOnLostSide(false, true, 'none');
    } else if (status === "YOU LOST") {
        computerScore++;
        computerScoreDisplay.innerHTML = computerScore;
        saveScores();
        pcPickedResultBox.classList.add('animate');
        hideAnimationSpanOnLostSide(true, false, 'none');
    }else{
        againstPC.style.visibility = 'hidden';
        playAgainButton.innerHTML = 'Replay';
        hideAnimationSpanOnLostSide(true, true, 'none');
    }
}

function navigateToNewPage() {
    window.location.href = "./winpage/final.html";   
} 

const rulesButton = document.querySelector(".rulesButton");
const closeBtn = document.querySelector(".closeBtn");

rulesButton.addEventListener("click", () => {
    if (
        popupDiv.style.display === "none" ||
        popupDiv.style.display === ""
    ) {
        popupDiv.style.display = "block";
    }
});

closeBtn.addEventListener("click", () => {
    popupDiv.style.display = "none";
    rulesButton.textContent = "Rules";
});