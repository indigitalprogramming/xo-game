function resetGame() {
    isStarted = false
    countOption = 1
    countBox = 0
    haveWinner = false
    startTimer(pause = true)
}

function resetScore() {
    countScoreX = 0
    countScoreO = 0
    countScoreD = 0
    updateScoreboard()
}

function resetBox(box, color) {
    box.classList.remove(color)
    box.innerText = ''
}