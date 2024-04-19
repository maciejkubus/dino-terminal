const readline = require('readline')
const Cactus = require('./cactus')
const Bird = require('./bird')
const Rock = require('./rock')
const Building = require('./building')

let speed = 200
let updateInterval = null

const map = {
	width: 64,
	height: 8
}

const dino = {
	x: 8,
	y: 1,
	isJumping: false,
	points: 0
}

const obstacles = []

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getObstablesPoints = () => {
	let points = []
	obstacles.forEach(obs => {
		points = [...points, ...obs.getPoints()]
	})

	return points
}

const draw = () => {
	let obsPoints = getObstablesPoints()

	for(let y = 0; y <= map.height; y++) {
		let line = ""
		for(let x = 0; x <= map.width; x++) {
			let obstacle = '';
			obsPoints.forEach(obs => {
				if(obs.x == x && obs.y == y) {
					obstacle = obs.emoji
				}
			})
			
			if(obstacle != '') {
				line += obstacle
			}
			else if(y == 8) {
				line += '🟩'
			}
			else if(y == 0) {
				line += '🟦'
			}
			else if(y == 1) {
				line += '☁️ '
			}
			else if(x == dino.x && y == dino.y) {
				line += '🦖'
			}
			else {
				line += '⬛'
			}
		}
		console.log(line)
	}
	console.log('POINTS: ' + dino.points)
}

const move = () => {
	if(dino.isJumping == true) {
		dino.y--;
	}
	else if(dino.y < 7) {
		dino.y++;
	}

	if(dino.isJumping == true && dino.y == 3) {
		dino.isJumping = false
	}
}

const die = () => {
	console.clear();
	console.log('YOU DIED')
	console.log('POINTS: ' + dino.points)

	process.exit()
}


const spawnObstacle = () => {
	const randomObstacle = random(0, 3);
	
	if(randomObstacle == 0) {
		obstacles.push(new Cactus())
	} 
	else if (randomObstacle == 1) {
		obstacles.push(new Bird())
	}
	else if (randomObstacle == 2) {
		obstacles.push(new Rock())
	}
	else if(randomObstacle == 3) {
		obstacles.push(new Building())
	}

	setTimeout(spawnObstacle, random(2000, 5000))
}

const moveObstacles = () => {
	obstacles.forEach(obs => {
		obs.move()

		if(obs.collide(dino.x, dino.y)) {
			die()
		}
	})
}

const update = () => {
	console.clear();
	move();
	moveObstacles();
	draw();

	dino.points++;
}

const main = () => {
	readline.emitKeypressEvents(process.stdin);

	if (process.stdin.isTTY)
			process.stdin.setRawMode(true);

	process.stdin.on('keypress', (chunk, key) => {
		if(key.name == 'q') {
			process.exit()
		}
		else if(key.name == 'space' && dino.y == 7) {
			dino.isJumping = true
		}
	});

	updateInterval = setInterval(update, speed)

	setInterval(() => {
		if(speed >= 100) {
			clearInterval(updateInterval)
			speed--
			updateInterval = setInterval(update, speed)
		}
	}, 500)

	spawnObstacle()
}

main()