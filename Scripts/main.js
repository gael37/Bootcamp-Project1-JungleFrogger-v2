function init() {

  const grid = document.querySelector('.grid')
  const gridWrapper = document.querySelector('.grid-wrapper')
  const start = document.querySelector('#start')
  const heroCell = document.querySelector('.hero')
  const audioTiger = document.querySelector('.audio-tiger')
  const audioSnake = document.querySelector('.audio-snake')
  const audioWater = document.querySelector('.audio-water')
  const audioLily = document.querySelector('.audio-lily')
  const audioCroco = document.querySelector('.audio-croco')
  const audioJeep = document.querySelector('.audio-jeep')
  const audioMusic = document.querySelector('.audio-music')
  const audioWin = document.querySelector('.audio-win')
  const audioLost = document.querySelector('.audio-lost')
  const audioYeah = document.querySelector('.audio-yeah')
  const displayTimeElapsed = document.querySelector('.time-elapsed')
  const displayBestTime = document.querySelector('.best-time')
  const livesDisplay = document.querySelector('#lives-display')

  // const board = document.querySelector('.grid')

  // GRID VARIABLES
  const width = 10 // width of our grid (number of cells in a row)
  const height = 10 // height of our grid (number of cells in a column)
  const cellCount = width * height
  const cells = []
  // HERO VARIABLES
  const startingPosition = 94
  let currentPosition = startingPosition
  let lives = 3
  let timerEnemy
  let timerGame = 0
  let timerGameId

  displayBestTime.innerHTML = getHighScore().toFixed(1) + ' s'
  displayBestTime.style.textAlign = 'center'

  function getHighScore() {
    return localStorage.getItem('jungle-frogger-high-score') ? parseFloat(localStorage.getItem('jungle-frogger-high-score')) : 0
  }

  function setHighScore(timerGame) {
    if (!getHighScore() || getHighScore() > timerGame) {
      localStorage.setItem('jungle-frogger-high-score', timerGame)
      displayBestTime.innerHTML = getHighScore().toFixed(1)
    }
  }

  // CREATION OF THE GRID
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      // Create the element using createElement
      const cell = document.createElement('div')
      // display the index of the element
      // cell.innerHTML = i
      // add the index as an data-id
      cell.dataset.index = i
      // append the new cell to the grid
      grid.appendChild(cell)
      // Push cell into array
      cells.push(cell)
    }
    for (let i = 0; i < cellCount; i++) {
      // Adding our character to the start position
      addHero(startingPosition)
    }
  }


  // CREATION OF THE BACKGROUND
  function createBG() {
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

  // CREATION OF ENEMY CLASS
  class Enemy {
    constructor(name, cssClass, initialPos, currentPos, finalPos) {
      this.name = name
      this.class = cssClass
      this.initialPos = initialPos
      this.currentPos = currentPos
      this.finalPos = finalPos
      // if (this.class === 'tiger') {
      //   this.sound = audioTiger
      // } else if (this.class === 'snake') {
      //   this.sound = audioSnake
      // } else if (this.class === 'water') {
      //   this.sound = audioWater
      // } else if (this.class === 'croco') {
      //   this.sound = audioCroco
      // }
    }

    movesRight() {
      let i = this.currentPos - 1
      timerEnemy = setInterval(() => {
        if (i === this.finalPos) {
          cells[i].classList.remove(this.class)
          i = this.initialPos - 1
        }
        cells[i + 1].classList.add(this.class)
        cells[i].classList.remove(this.class)
        i++
        checkCollision(currentPosition)
      }, 1000)
    }

    movesLeft() {
      let i = this.currentPos
      timerEnemy = setInterval(() => {
        if (i === this.finalPos) {
          cells[i].classList.remove(this.class)
          i = this.initialPos
        }
        cells[i - 1].classList.add(this.class)
        cells[i].classList.remove(this.class)
        i--
        checkCollision(currentPosition)
      }, 1000)
    }
  }

  // CREATION OF THE ANIMAL OBJECTS INSTANCES
  const tiger1 = new Enemy('tiger1', 'tiger', 80, 80, 89)
  const tiger2 = new Enemy('tiger2', 'tiger', 80, 83, 89)
  const tiger3 = new Enemy('tiger3', 'tiger', 80, 86, 89)

  const snake1 = new Enemy('snake1', 'snake', 69, 69, 60)
  const snake2 = new Enemy('snake2', 'snake', 69, 66, 60)
  const snake3 = new Enemy('snake3', 'snake', 69, 63, 60)

  const croco1 = new Enemy('croco1', 'croco', 29, 29, 20)
  const croco2 = new Enemy('croco2', 'croco', 29, 24, 20)

  const lilyPad1 = new Enemy('lilyPad1', 'lilyPad', 50, 50, 59)
  const lilyPad2 = new Enemy('lilyPad1', 'lilyPad', 50, 53, 59)
  const lilyPad3 = new Enemy('lilyPad1', 'lilyPad', 50, 57, 59)

  // EXECUTION

  createGrid()
  createBG()

  // FUNCTION START GAME
  function startGame() {
    displayTimeElapsed.style.textAlign = 'center'
    timerGameId = setInterval(() => {
      timerGame = timerGame + 0.1
      displayTimeElapsed.innerHTML = timerGame.toFixed(1) + ' s'
    }, 100)
    audioMusic.play()
    tiger1.movesRight()
    tiger2.movesRight()
    tiger3.movesRight()
    snake1.movesLeft()
    snake2.movesLeft()
    snake3.movesLeft()
    croco1.movesLeft()
    croco2.movesLeft()
    lilyPad1.movesRight()
    lilyPad2.movesRight()
    lilyPad3.movesRight()

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

  // FUNCTION HANDLE COLLISION
  function hitsHero(position) {
    lives -= 1
    if (lives > 0) {
      livesDisplay.innerHTML = lives ? '&#10084'.repeat(lives) : '&#128148'
      removeHero(position)
      addHero(startingPosition)
      setTimeout(() => {
        window.alert('Oops! Give it another try')
      }, 200)
      currentPosition = startingPosition
    } else {
      livesDisplay.innerHTML = lives ? '&#10084'.repeat(lives) : '&#128148'
      clearInterval(timerGameId)
      setHighScore()
      displayTimeElapsed.innerHTML = 'YOU LOST !'
      audioMusic.muted = true
      setTimeout(() => {
        audioLost.play()
        audioTiger.muted = true
        audioWater.muted = true
        audioSnake.muted = true
        audioCroco.muted = true
      }, 300)
      setTimeout(() => {
        gridWrapper.innerHTML = 'YOU LOST !'
        gridWrapper.style.color = 'red'
        gridWrapper.style.fontSize = '50px'

        document.removeEventListener('keydown', handleMovement)
      }, 2000)
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
  }

  const checkTimer = setInterval(() => {
    if (cells[currentPosition].classList.contains('jeep')) {
      clearInterval(timerGameId)
      setHighScore(timerGame)
      audioMusic.muted = true
      audioYeah.play()
      audioJeep.play()
      setTimeout(() => {
        audioYeah.muted = true
      }, 700)
      setTimeout(() => {
        audioWin.play()
      }, 1000)
      setTimeout(() => {
        audioJeep.muted = true
        audioWin.muted = true
        gridWrapper.innerHTML = 'You WON !<br>You cleared the level in ' + timerGame.toFixed(1) + 's'
        gridWrapper.style.textAlign = 'center'
        gridWrapper.style.color = 'green'
        gridWrapper.style.fontSize = '50px'
        document.removeEventListener('keydown', handleMovement)
      }, 2000)
    }
  }, 50)

  // EVENTS

  document.addEventListener('keydown', handleMovement)
  start.addEventListener('click', startGame)

}

window.addEventListener('DOMContentLoaded', init)


