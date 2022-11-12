// add squares to grid
const numSquares = 225
const grid = document.querySelector(".grid")
for (let i=0; i<numSquares; i++) {
	grid.appendChild(document.createElement("div"))
}
const gridSquares = document.querySelectorAll(".grid div")

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
			if (currentShooterIdx % Math.sqrt(numSquares) !== 0) {
				currentShooterIdx -= 1
			}
			break
		case "ArrowRight":
			// move one squre right if not on right border
			if ((currentShooterIdx + 1) % Math.sqrt(numSquares) !== 0){
				currentShooterIdx += 1
			}
			break
	}

	// update shooter position
	gridSquares[currentShooterIdx].classList.add("shooter")
}

document.addEventListener("keydown", moveShooter)