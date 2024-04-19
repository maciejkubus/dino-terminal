class Building {
	type = 'building';
	emoji = '🧱';
	bricks = [
		{ x: 63, y: 6 },
		{ x: 63, y: 7 },
		{ x: 64, y: 6 },
		{ x: 64, y: 7 },
	]
	move = function() {
		this.bricks.forEach(brick => {
			brick.x--
		})
	}
	getPoints = function() {
		return this.bricks.map(brick => ({ x: brick.x, y: brick.y, emoji: this.emoji}))
	}
	collide = function(x, y) {
		let isColliding = false;

		this.bricks.forEach(brick => {
			if(brick.x == x & brick.y == y) {
				isColliding = true
			}
		})

		return isColliding
	}
}

module.exports = Building