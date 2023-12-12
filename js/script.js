const gameOptions = document.querySelectorAll('.box')

const scoreX = document.querySelector('.x-score')
const scoreO = document.querySelector('.o-score')
const scoreD = document.querySelector('.d-score')

const gameResetButton = document.querySelector('.game-reset-btn')
const allResetButton = document.querySelector('.all-reset-btn')

const playAgainContainer = document.querySelector('.play-again-container')
const winner = document.querySelector('.winner')
const playAgainButton = document.querySelector('.play-again-btn')

const timer = document.querySelector('.timer')

let countOption = 1
let isStarted = false
let haveWinner = false

let countScoreX = 0
let countScoreO = 0
let countScoreD = 0
let countBox = 0

let intervalTime

gameOptions.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (box.innerText != '') return
        if (!isStarted) startTimer()
        markPlay(box, index)
    })
})

gameResetButton.addEventListener('click', () => {
    gameOptions.forEach((box) => {
        selectBoxColor(box)
    })
    resetGame()
})

allResetButton.addEventListener('click', () => {
    gameOptions.forEach((box) => {
        selectBoxColor(box)
    })
    resetGame()
    resetScore()
})

playAgainButton.addEventListener('click', () => {
    gameOptions.forEach((box) => {
        if (box.classList.contains('win')) {
            resetBox(box, 'win')
        } else if (box.classList.contains('red')) {
            resetBox(box, 'red')
        } else if (box.classList.contains('blue')) {
            resetBox(box, 'blue')
        }
    })
    resetGame()
    playAgainContainer.classList.remove('active')
})

function selectBoxColor(box) {
    if (box.classList.contains('red')) {
        resetBox(box, 'red')
    } else if (box.classList.contains('blue')) {
        resetBox(box, 'blue')
    }
}

function startTimer(pause) {
    if (haveWinner || pause) {
        clearInterval(intervalTime)
        timer.innerText = '00:00'
        pause = false
        return
    }

    isStarted = true
    counterS = 0
    counterM = 0
    
    intervalTime = setInterval(time, 1000)
    time()

    function time() {
        ++counterS
        if (counterS === 60) {
            ++counterM
            counterS = 0
        }
        if (counterS < 10 && counterM < 10) {
            timer.innerText = `0${counterM}:0${counterS}`
        } else if (counterS >= 10 && counterM < 10) {
            timer.innerText = `0${counterM}:${counterS}`
        } else if (counterS < 10 && counterM > 10) {
            timer.innerText = `${counterM}:0${counterS}`
        } else {
            timer.innerText = `${counterM}:${counterS}`
        }
    }
}

function markPlay(box, index) {
    countOption % 2 === 0 ? customBox('blue', 'O') : customBox('red', 'X')

    function customBox(color, text) {
        box.classList.add(color)
        box.innerText = text
        verifyWon(index, color)
        countOption++
    }
}

function verifyWon(index, color) {
    switch (index) {
        case 0: 
            wayWin(0, 1, 2, color)
            wayWin(0, 3, 6, color)
            wayWin(0, 4, 8, color)
            verifyDraw()
            break
        
        case 1:
            wayWin(0, 1, 2, color)
            wayWin(1, 4, 7, color)
            verifyDraw()
            break

        case 2:
            wayWin(0, 1, 2, color)
            wayWin(2, 5, 8, color)
            wayWin(2, 4, 6, color)
            verifyDraw()
            break
        
        case 3:
            wayWin(0, 3, 6, color)
            wayWin(3, 4, 5, color)
            verifyDraw()
            break

        case 4:
            wayWin(0, 4, 8, color)
            wayWin(1, 4, 7, color)
            wayWin(2, 4, 6, color)
            wayWin(3, 4, 5, color)
            verifyDraw()
            break

        case 5:
            wayWin(5, 2, 8, color)
            wayWin(5, 4, 3, color)
            verifyDraw()
            break

        case 6:
            wayWin(0, 3, 6, color)
            wayWin(6, 4, 2, color)
            wayWin(6, 7, 8, color)
            verifyDraw()
            break

        case 7:
            wayWin(6, 7, 8, color)
            wayWin(7, 4, 1, color)
            verifyDraw()
            break

        case 8:
            wayWin(0, 4, 8, color)
            wayWin(8, 5, 2, color)
            wayWin(8, 7, 6, color)
            verifyDraw()
            break
    }

    function verifyDraw() {
        gameOptions.forEach((box) => {
            if (box.innerText != '') {
                countBox++
                if (countBox === 9) {
                    configWin('yellow')
                }
            } else {
                countBox = 0
            }
        })
    }

    function wayWin(way1, way2, way3, color) {
        if (gameOptions[way1].classList.contains(color) &&
            gameOptions[way2].classList.contains(color) &&
            gameOptions[way3].classList.contains(color)) {
                winner(way1, way2, way3, color)
                configWin(color)
            }
    }

    function winner(way1, way2, way3, color) {
        resetBox(gameOptions[way1], color)
        resetBox(gameOptions[way2], color)
        resetBox(gameOptions[way3], color)

        addClass(gameOptions[way1])
        addClass(gameOptions[way2])
        addClass(gameOptions[way3])
    }
}

function configWin(color) {
    haveWinner = true
    startTimer()

    switch (color) {
        case 'red': 
            updateScoreboard('red')
            break
        case 'blue':
            updateScoreboard('blue')
            break
        case 'yellow':
            updateScoreboard('yellow')
            break
    } 

    playAgainContainer.classList.add('active')
}

function addClass(box) {
    box.classList.add('win')
}

function updateScoreboard(color = 0) {
    if (color === 0) {
        scoreD.innerText = `D: ${countScoreD}`
        scoreO.innerText = `O: ${countScoreO}`
        scoreX.innerText = `X: ${countScoreX}`
    } else {
        if (color === 'red') {
            countScoreX++
            scoreX.innerText = `X: ${countScoreX}`
            winner.innerText = `X is the grand winner.`
        } else if (color === 'blue') {
            countScoreO++
            scoreO.innerText = `O: ${countScoreO}`
            winner.innerText = `O is the grand winner.`
        } else if (color === 'yellow') {
            countScoreD++
            scoreD.innerText = `D: ${countScoreD}`
            winner.innerText = `Draw`
        }
    }
}  