class Bird {
	type = 'bird';
	emoji = '🐦';
	x = 64;
	y = 4;
	constructor() {
		setInterval(() => {
			if(this.y == 4) {
				this.y = 5
			} else {
				this.y = 4
			}
		}, 1000)
	}
	move = function() {
		this.x--
	}
	getPoints = function() {
		return [{
			x: this.x,
			y: this.y,
			emoji: this.emoji
		}]
	}
	collide = function(x, y) {
		return this.x == x && this.y == y
	}
}

module.exports = Bird