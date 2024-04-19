class Cactus {
	type = 'cactus';
	emoji = '🌵';
	x = 64;
	y = 7;
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

module.exports = Cactus