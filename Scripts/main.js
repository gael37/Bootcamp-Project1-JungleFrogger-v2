function init() {

  // DOM objects
  const grid = document.querySelector('.grid')
  const gridWrapper = document.querySelector('.grid-wrapper')
  const start = document.querySelector('#start')
  const imageJungle = document.querySelector('#image-jungle')
  const startHard = document.querySelector('#start-hard')
  const resetButton = document.querySelector('#reset-button')
  const audioTiger = document.querySelector('.audio-tiger')
  const audioSnake = document.querySelector('.audio-snake')
  const audioWater = document.querySelector('.audio-water')
  const audioCroco = document.querySelector('.audio-croco')
  const audioGorilla = document.querySelector('.audio-gorilla')
  const audioMosquito = document.querySelector('.audio-mosquito')
  const audioJeep = document.querySelector('.audio-jeep')
  const audioMusic = document.querySelector('.audio-music')
  const audioWin = document.querySelector('.audio-win')
  const audioLost = document.querySelector('.audio-lost')
  const audioYeah = document.querySelector('.audio-yeah')
  const displayTimeElapsed = document.querySelector('.time-elapsed')
  const displayBestTime = document.querySelector('.best-time')
  const displayBestTimeHard = document.querySelector('.best-time-hard')
  const livesDisplay = document.querySelector('#lives-display')
  const hint = document.querySelector('.hint')
  const gameMessage = document.querySelector('.game-message')
  const gameWonMessage = document.querySelector('.game-won-message')
  const gameLostMessage = document.querySelector('.game-lost-message')
  const gameRunningVisual = document.querySelector('.game-running-visual')
  const gameStoppedVisual = document.querySelector('.game-stopped-visual')

  // GRID VARIABLES
  const width = 10 // width of our grid (number of cells in a row)
  const height = 10 // height of our grid (number of cells in a column)
  const cellCount = width * height
  const cells = []

  // HERO VARIABLES
  let startingPosition = 94
  let currentPosition = startingPosition
  let lives = 3
  let timerGame = 0
  let timerGameHard = 0
  let timerGameId
  let animalTimer
  let fastAnimalTimer
  let gameRunning = false
  let gameReset = false
  let gridCreated = false
  let gameHardPaused = false
  let gameHardRunning = false
  let gameNormalPaused = false
  let gameNormalRunning = false

  // local storage for high score functions
  displayBestTime.innerHTML = 'NORMAL  ' + getHighScore().toFixed(1) + ' s'
  displayBestTime.style.textAlign = 'center'
  displayBestTimeHard.innerHTML = 'HARD  ' + getHighScoreHard().toFixed(1) + ' s'
  displayBestTimeHard.style.textAlign = 'center'

  function getHighScore() {
    return localStorage.getItem('jungle-frogger-high-score') ? parseFloat(localStorage.getItem('jungle-frogger-high-score')) : 0
  }
  function getHighScoreHard() {
    return localStorage.getItem('jungle-frogger-high-score-hard') ? parseFloat(localStorage.getItem('jungle-frogger-high-score-hard')) : 0
  }
  function setHighScore(score) {
    if (!getHighScore() || getHighScore() > score) {
      localStorage.setItem('jungle-frogger-high-score', score)
      displayBestTime.innerHTML = getHighScore().toFixed(1)
    }
  }
  function setHighScoreHard(score) {
    if (!getHighScoreHard() || getHighScoreHard() > score) {
      localStorage.setItem('jungle-frogger-high-score-hard', score)
      displayBestTimeHard.innerHTML = getHighScoreHard().toFixed(1)
    }
  }

  // START BUTTON CONTENT

  startHard.innerHTML = '<p><strong><big>START</big></strong><br><strong><big>GAME</big></strong><br><br>hard</p>'
  start.innerHTML = '<p><strong><big>START</big></strong><br><strong><big>GAME</big></strong><br><br>normal</p>'

  // CREATION OF THE GRID
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.dataset.index = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    for (let i = 0; i < cellCount; i++) {
      addHero(startingPosition)
    }
  }

  // CREATION OF THE BACKGROUND
  function createBGNeutral() {
    for (let i = 0; i < cellCount; i++) {
      cells[i].classList.add('grass')
    }
    for (let i = 0; i < 8; i++) {
      cells[i].classList.add('water')
    }
    for (let i = 10; i < 16; i++) {
      cells[i].classList.add('water')
    }
    for (let i = 30; i < 40; i++) {
      cells[i].classList.add('water')
      cells[i].style.height = '15%'
    }
    for (let i = 50; i < 60; i++) {
      cells[i].classList.add('water')
    }
    cells[9].classList.add('water')
    cells[17].classList.add('water')
    cells[19].classList.add('water')
    cells[14].classList.add('tree')
    cells[14].classList.remove('water')
    cells[16].classList.add('tree')
    cells[16].classList.remove('water')
    cells[8].classList.add('jeep')
    cells[32].classList.add('bridge')
    cells[32].classList.remove('water')
  }

  function createBGNormal() {
    for (let i = 0; i < cellCount; i++) {
      cells[i].classList.add('grass')
    }
    for (let i = 0; i < 8; i++) {
      cells[i].classList.add('water')
    }
    for (let i = 10; i < 16; i++) {
      cells[i].classList.add('water')
    }
    for (let i = 30; i < 40; i++) {
      cells[i].classList.add('water')
      cells[i].style.height = '15%'
    }
    for (let i = 50; i < 60; i++) {
      cells[i].classList.add('water')
    }
    cells[9].classList.add('water')
    cells[17].classList.add('water')
    cells[19].classList.add('water')
    cells[14].classList.add('tree')
    cells[14].classList.remove('water')
    cells[16].classList.add('tree')
    cells[16].classList.remove('water')
    cells[8].classList.add('jeep')
    cells[32].classList.add('bridge')
    cells[32].classList.remove('water')
    cells[80].classList.add('tiger')
    cells[83].classList.add('tiger')
    cells[86].classList.add('tiger')
    cells[69].classList.add('snake')
    cells[66].classList.add('snake')
    cells[63].classList.add('snake')
    cells[24].classList.add('croco')
    cells[50].classList.add('lilyPad')
    cells[53].classList.add('lilyPad')
    cells[57].classList.add('lilyPad')
  }

  function createBGHard() {
    for (let i = 0; i < cellCount; i++) {
      cells[i].classList.add('grass')
    }
    for (let i = 0; i < 8; i++) {
      cells[i].classList.add('water')
    }
    for (let i = 10; i < 16; i++) {
      cells[i].classList.add('water')
    }
    for (let i = 30; i < 40; i++) {
      cells[i].classList.add('water')
      cells[i].style.height = '15%'
    }
    for (let i = 50; i < 60; i++) {
      cells[i].classList.add('water')
    }
    cells[9].classList.add('water')
    cells[17].classList.add('water')
    cells[19].classList.add('water')
    cells[14].classList.add('tree')
    cells[14].classList.remove('water')
    cells[16].classList.add('tree')
    cells[16].classList.remove('water')
    cells[8].classList.add('jeep')
    cells[32].classList.add('bridge')
    cells[32].classList.remove('water')
    cells[80].classList.add('tiger')
    cells[83].classList.add('tiger')
    cells[86].classList.add('tiger')
    cells[69].classList.add('snake')
    cells[66].classList.add('snake')
    cells[63].classList.add('snake')
    cells[24].classList.add('croco')
    cells[21].classList.add('croco')
    cells[50].classList.add('lilyPad')
    cells[53].classList.add('lilyPad')
    cells[57].classList.add('lilyPad')
    cells[41].classList.add('mosquito')
    cells[32].classList.add('mosquito')
    cells[72].classList.add('gorilla')


  }
  // CREATION OF ENEMY CLASS
  class Enemy {
    constructor(name, cssClass, initialPos, currentPos, finalPos) {
      this.name = name
      this.class = cssClass
      this.initialPos = initialPos
      this.currentPos = currentPos
      this.finalPos = finalPos
    }

    movesRight() {
      if (this.currentPos !== this.finalPos) {
        cells[this.currentPos].classList.remove(this.class)
        cells[this.currentPos + 1].classList.add(this.class)
        this.currentPos = this.currentPos + 1
      } else {
        cells[this.currentPos].classList.remove(this.class)
        cells[this.initialPos].classList.add(this.class)
        this.currentPos = this.initialPos
      }
      checkCollision(currentPosition)
    }

    movesLeft() {
      if (this.currentPos !== this.finalPos) {
        cells[this.currentPos].classList.remove(this.class)
        cells[this.currentPos - 1].classList.add(this.class)
        this.currentPos = this.currentPos - 1
      } else {
        cells[this.currentPos].classList.remove(this.class)
        cells[this.initialPos].classList.add(this.class)
        this.currentPos = this.initialPos
      }
      checkCollision(currentPosition)
    }
  }

  // CREATION OF THE ANIMAL OBJECTS INSTANCES
  const tiger1 = new Enemy('tiger1', 'tiger', 80, 80, 89)
  const tiger2 = new Enemy('tiger2', 'tiger', 80, 83, 89)
  const tiger3 = new Enemy('tiger3', 'tiger', 80, 86, 89)
  const snake1 = new Enemy('snake1', 'snake', 69, 69, 60)
  const snake2 = new Enemy('snake2', 'snake', 69, 66, 60)
  const snake3 = new Enemy('snake3', 'snake', 69, 63, 60)
  const croco1 = new Enemy('croco1', 'croco', 29, 24, 20)
  const croco2 = new Enemy('croco2', 'croco', 20, 21, 29)
  const lilyPad1 = new Enemy('lilyPad1', 'lilyPad', 50, 50, 59)
  const lilyPad2 = new Enemy('lilyPad2', 'lilyPad', 50, 53, 59)
  const lilyPad3 = new Enemy('lilyPad3', 'lilyPad', 50, 57, 59)
  const mosquito1 = new Enemy('mosquito1', 'mosquito', 49, 41, 40)
  const mosquito2 = new Enemy('mosquito2', 'mosquito', 30, 32, 39)
  const gorilla1 = new Enemy('gorilla1', 'gorilla', 70, 72, 79)

  // FUNCTION START GAME
  function startGame() {
    if (gameHardRunning || gameHardPaused) {
      handleReset()
      gameHardPaused = false
      gameHardRunning = false
      startingPosition = 94
      currentPosition = 94
    }
    gameMessage.style.color = 'black'
    gameMessage.style.fontSize = '1em'
    gameMessage.innerText = 'Find your way to the car!'
    // gameMessage.style.visibility = 'visible'
    if (!gridCreated) {
      createGrid()
      gridCreated = true
    }
    // startHard.style.visibility = 'hidden'
    if (gameNormalRunning) {
      document.removeEventListener('keydown', handleMovement)
      start.innerHTML = 'CONTINUE'
      gameNormalPaused = true
      gameNormalRunning = false
      clearInterval(animalTimer)
      clearInterval(fastAnimalTimer)
      clearInterval(timerGame)
      clearInterval(timerGameId)
      audioMusic.muted = true
      startingPosition = currentPosition
    } else {
      createBGNormal()
      addHero(startingPosition)
      document.addEventListener('keydown', handleMovement)
      gameNormalRunning = true
      gameHardPaused = false
      start.innerHTML = 'PAUSE'
      audioMusic.play()
      gridWrapper.style.background = 'none'
      // if (startingPosition === 94) {
      //   createGrid()
      // }
      // createBG()
      displayTimeElapsed.style.textAlign = 'center'
      timerGameId = setInterval(() => {
        timerGame = timerGame + 0.1
        displayTimeElapsed.innerHTML = timerGame.toFixed(1) + ' s'
      }, 100)
      animalTimer = setInterval(() => {
        tiger1.movesRight()
        tiger2.movesRight()
        tiger3.movesRight()

        lilyPad1.movesRight()
        lilyPad2.movesRight()
        lilyPad3.movesRight()

      }, 1000)
      fastAnimalTimer = setInterval(() => {
        snake1.movesLeft()
        snake2.movesLeft()
        snake3.movesLeft()
        croco1.movesLeft()
      }, 700)
    }
  }

  // FUNCTION START HARD GAME
  function startHardGame() {
    if (gameNormalRunning || gameNormalPaused) {
      handleReset()
      gameNormalPaused = false
      gameNormalRunning = false
      startingPosition = 94
      currentPosition = 94
    }
    // gameMessage.style.visibility = 'visible'
    gameMessage.style.color = 'black'
    gameMessage.style.fontSize = '1em'
    gameMessage.innerText = 'Find your way to the car!'
    if (!gridCreated) {
      createGrid()
      gridCreated = true
    }
    if (gameHardRunning) {
      document.removeEventListener('keydown', handleMovement)
      startHard.innerHTML = 'CONTINUE'
      gameHardPaused = true
      gameHardRunning = false
      clearInterval(animalTimer)
      clearInterval(fastAnimalTimer)
      clearInterval(timerGameHard)
      clearInterval(timerGameId)
      audioMusic.muted = true
      startingPosition = currentPosition
    } else {
      createBGHard()
      addHero(startingPosition)
      document.addEventListener('keydown', handleMovement)
      gameHardRunning = true
      gameHardPaused = false
      audioMusic.play()
      startHard.innerHTML = 'PAUSE'
      gridWrapper.style.background = 'none'
      // if (startingPosition === 94) {
      //   createGrid()
      // }
      // createBG()
      displayTimeElapsed.style.textAlign = 'center'
      timerGameId = setInterval(() => {
        timerGameHard = timerGameHard + 0.1
        displayTimeElapsed.innerHTML = timerGameHard.toFixed(1) + ' s'
      }, 100)
      animalTimer = setInterval(() => {
        tiger1.movesRight()
        tiger2.movesRight()
        tiger3.movesRight()
        lilyPad1.movesRight()
        lilyPad2.movesRight()
        lilyPad3.movesRight()
      }, 1000)
      fastAnimalTimer = setInterval(() => {
        mosquito1.movesLeft()
        mosquito2.movesRight()
        snake1.movesLeft()
        snake2.movesLeft()
        snake3.movesLeft()
        croco1.movesLeft()
        croco2.movesRight()
        gorilla1.movesRight()
      }, 700)
    }
  }

  // RESET FUNCTION

  const handleReset = () => {
    start.style.visibility = 'visible'
    startHard.style.visibility = 'visible'
    resetButton.style.visibility = 'visible'
    gameMessage.style.fontSize = '1em'
    gameMessage.style.color = 'black'
    document.removeEventListener('keydown', handleMovement)
    lives = 3
    livesDisplay.innerHTML = lives ? '&#10084'.repeat(lives) : '&#128148'
    timerGame = 0
    timerGameHard = 0
    clearInterval(timerGame)
    clearInterval(timerGameHard)
    clearInterval(timerGameId)
    clearInterval(fastAnimalTimer)
    clearInterval(animalTimer)
    cells.forEach(cell => {
      cell.className = ''
    })
    createBGNeutral()
    currentPosition = 94
    gameMessage.innerText = ''
    displayTimeElapsed.innerText = ''
    startHard.innerHTML = '<p><strong><big>START</big></strong><br><strong><big>GAME</big></strong><br><br>hard</p>'
    start.innerHTML = '<p><strong><big>START</big></strong><br><strong><big>GAME</big></strong><br><br>normal</p>'
    gameHardPaused = false
    gameHardRunning = false
    gameNormalPaused = false
    gameNormalRunning = false
    start.style.visibility = 'visible'
    startHard.style.visibility = 'visible'
  }

  // FUNCTIONS TO HANDLE MOVEMENT OF HERO

  function addHero(position) {
    cells[position].classList.add('hero')
  }

  function removeHero(position) {
    cells[position].classList.remove('hero')
  }

  function handleMovement(event) {
    const key = event.keyCode
    const up = 38
    const down = 40
    const left = 37
    const right = 39
    removeHero(currentPosition)
    if (key === right && currentPosition % width !== width - 1) {
      console.log('RIGHT')
      currentPosition++
    } else if (key === left && currentPosition % width !== 0) {
      console.log('LEFT')
      currentPosition--
    } else if (key === up && currentPosition >= width) {
      console.log('UP')
      currentPosition -= width
    } else if (key === down && currentPosition < cellCount - width) {
      console.log('DOWN')
      currentPosition += width
    }
    addHero(currentPosition)
    checkCollision(currentPosition)
  }

  // FUNCTION HANDLE COLLISION AND WHEN PLAYER LOSES
  function hitsHero(position) {
    removeHero(position)
    addHero(startingPosition)
    lives -= 1
    currentPosition = 94
    console.log(lives)
    console.log(currentPosition)
    // console.log(lives)
    livesDisplay.innerHTML = lives ? '&#10084'.repeat(lives) : '&#128148'
    if (lives === 1) {
      document.removeEventListener('keydown', handleMovement)

      gameMessage.innerText = 'hint: climbing a tree can save your life'
      setTimeout(() => {
        window.alert('Oops! Give it another try')
        document.addEventListener('keydown', handleMovement)
      }, 300)
    } else if (lives === 2) {
      document.removeEventListener('keydown', handleMovement)

      setTimeout(() => {
        window.alert('Oops! Give it another try')
        document.addEventListener('keydown', handleMovement)
      }, 300)
    } else {
      handleReset()
      lives = 0
      livesDisplay.innerHTML = lives ? '&#10084'.repeat(lives) : '&#128148'
      setHighScore()
      displayTimeElapsed.innerHTML = 'YOU LOST !'
      audioMusic.muted = true
      setTimeout(() => {
        audioLost.play()
        // audioTiger.muted = true
        // audioWater.muted = true
        // audioSnake.muted = true
        // audioCroco.muted = true
      }, 300)
      gameMessage.innerHTML = 'YOU LOST !'
      gameMessage.style.color = 'red'
      gameMessage.style.fontSize = '1.5em'
      start.style.visibility = 'hidden'
      startHard.style.visibility = 'hidden'
    }
  }

  // COLLISION DETECTION

  function checkCollision(position) {
    if (cells[position].classList.contains('tiger')) {
      audioTiger.play()
      hitsHero(currentPosition)
    }
    if (cells[position].classList.contains('snake')) {
      audioSnake.play()
      hitsHero(currentPosition)
    }
    if (cells[position].classList.contains('water') && !(cells[position].classList.contains('lilyPad'))) {
      audioWater.play()
      hitsHero(currentPosition)
    }
    if (cells[position].classList.contains('croco')) {
      audioCroco.play()
      hitsHero(currentPosition)
    }
    if (cells[position].classList.contains('gorilla')) {
      audioGorilla.play()
      hitsHero(currentPosition)
    }
    if (cells[position].classList.contains('mosquito')) {
      audioMosquito.play()
      hitsHero(currentPosition)
    }
  }

  // WHEN PLAYER WINS
  const checkTimer = setInterval(() => {
    if (cells[currentPosition].classList.contains('jeep')) {
      document.removeEventListener('keydown', handleMovement)
      start.style.visibility = 'hidden'
      startHard.style.visibility = 'hidden'
      // resetButton.style.visibility = 'hidden'
      clearInterval(timerGame)
      clearInterval(timerGameHard)
      clearInterval(timerGameId)
      clearInterval(fastAnimalTimer)
      clearInterval(animalTimer)
      gameMessage.style.color = 'green'
      gameMessage.style.fontSize = '50px'
      if (timerGame > 0) {
        setHighScore(timerGame)
        gameMessage.innerText = 'You WON !You cleared the level in ' + timerGame.toFixed(1) + 's'
      } else {
        setHighScoreHard(timerGameHard)
        gameMessage.innerText = 'You WON !Congrats! You cleared the hard level in ' + timerGameHard.toFixed(1) + 's'
      }
      audioMusic.muted = true
      audioYeah.play()
      audioJeep.play()
      setTimeout(() => {
        audioYeah.muted = true
      }, 1000)
      setTimeout(() => {
        audioWin.play()
      }, 1200)
      setTimeout(() => {
        audioJeep.muted = true
        audioWin.muted = true
      }, 2000)
      // setTimeout(() => {
      //   start.style.visibility = 'visible'
      //   startHard.style.visibility = 'visible'
      //   resetButton.style.visibility = 'visible'
      // }, 2000)
      // setTimeout(() => {
      //   gameMessage.innerHTML = ''
      // }, 3000)
      // setTimeout(() => {
      //   handleReset()
      // }, 6000)
    }
  }, 50)
  // EVENTS

  document.addEventListener('keydown', handleMovement)
  start.addEventListener('click', startGame)
  startHard.addEventListener('click', startHardGame)
  resetButton.addEventListener('click', handleReset)

}

window.addEventListener('DOMContentLoaded', init)


