// add squares to grid
const numSquares = 225
const width = Math.sqrt(numSquares)
const grid = document.querySelector(".grid")
for (let i=0; i<numSquares; i++) {
	grid.appendChild(document.createElement("div"))
}
const gridSquares = document.querySelectorAll(".grid div")

// get result display
const resultDisplay = document.querySelector(".result")

// create alien invaders
const numAlienRows = 3
const numAliensPerRow = 10
const alienInvaders = new Array()
for (let i=0;i<numAlienRows; i++) {
	const alienRow = Array.from(Array(numAliensPerRow).keys()).map(value => value + i*15)
	alienInvaders.push(...alienRow)
}

function drawAliens() {
	for (let i=0;i<alienInvaders.length;i++) {
		gridSquares[alienInvaders[i]].classList.add("alien")
	}
}
drawAliens()

// remove alien invaders
function removeAliens() {
	for (let i=0; i<alienInvaders.length; i++) {
		gridSquares[alienInvaders[i]].classList.remove("alien")
	}
}

// add shooter square
let currentShooterIdx = 202
gridSquares[currentShooterIdx].classList.add("shooter")

// move shooter
function moveShooter(e) {
	// remove shooter
	gridSquares[currentShooterIdx].classList.remove("shooter")

	// receive movement
	switch(e.key) {
		case "ArrowLeft":
			// move one square left if not on left border
			if (currentShooterIdx % width !== 0) {
				currentShooterIdx -= 1
			}
			break
		case "ArrowRight":
			// move one squre right if not on right border
			if ((currentShooterIdx + 1) % width !== 0){
				currentShooterIdx += 1
			}
			break
	}

	// update shooter position
	gridSquares[currentShooterIdx].classList.add("shooter")
}
document.addEventListener("keydown", moveShooter)

// end game
function endGame() {
	resultDisplay.textContent = `GAME OVER - Final score: ${resultDisplay.textContent}`
	clearInterval(moveAliensId)
	document.removeEventListener("keydown", moveShooter)
	document.removeEventListener("keydown", shoot)
}
// move invaders
let direction = 1
let movingRight = true
function moveAliens() {
	// get left and right edges of the alienInvaders
	const leftEdge = alienInvaders[0] % width === 0
	const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1

	// remove invaders
	removeAliens()

	// move down if alien at right edge
	if (rightEdge && movingRight) {
		for (let i=0;i<alienInvaders.length;i++) {
			// get new index
			const newIndex = alienInvaders[i] + width

			// end game if alien reaches edge of grid
			if (newIndex > gridSquares.length - 1) {
				endGame()
			}

			alienInvaders[i] = newIndex

		}

		// change direction
		direction = -1
		movingRight = false

	} else if (leftEdge && !movingRight) {
		for (let i=0; i<alienInvaders.length;i++) {
			// get new index
			const newIndex = alienInvaders[i] + width

			// end game if alien reaches edge of grid
			if (newIndex > gridSquares.length - 1) {
				endGame()
			}
			alienInvaders[i] = newIndex
		}

		// change direction
		direction = 1
		movingRight = true
	} else {
		// move invaders one square
		for (let i=0;i<alienInvaders.length;i++) {
			// get new index
			const newIndex = alienInvaders[i] + direction

			// end game if alien reaches edge of grid
			if (newIndex > gridSquares.length - 1) {
				endGame()
			}

			alienInvaders[i] = newIndex
		}
	}

	// redraw aliens
	drawAliens()

	// end the game if collides with shooter
	if (gridSquares[currentShooterIdx].classList.contains("alien")) {
		endGame()
	}

	// end game if no more aliens
	if (alienInvaders.length === 0) {
		endGame()
	}


}

// move invaders every 0.5 seconds
moveAliensId = setInterval(moveAliens, 500)

// shoot aliens
function shoot(event) {
	// initialize laser start at current shooter position
	let currentLaserIdx = currentShooterIdx

	// function move laser
	function moveLaser() {
		// move laser
		gridSquares[currentLaserIdx].classList.remove("laser")

		// move laser up one row
		currentLaserIdx -= width

		// stop moving laser if off grid
		if (currentLaserIdx < 0) {
			clearInterval(laserId)
			return
		}

		// add laser to grid
		gridSquares[currentLaserIdx].classList.add("laser")

		// score points for invader collisions
		if (gridSquares[currentLaserIdx].classList.contains("alien")) {
			// remove laser from grid
			gridSquares[currentLaserIdx].classList.remove("laser")

			// remove invader
			gridSquares[currentLaserIdx].classList.remove("alien")
			const shotAlienIdx = alienInvaders.indexOf(currentLaserIdx)
			alienInvaders.splice(shotAlienIdx, 1)

			// score points
			resultDisplay.textContent = parseInt(resultDisplay.textContent) + 10

			// stop laser
			clearInterval(laserId)
		}

	}

	switch(event.key) {
		case "ArrowUp": {
			// move the laser
			const laserId = setInterval(moveLaser, 100)
		}
	}

	}

document.addEventListener("keydown", shoot)