function collides(objekat, wall) {
	return (
		objekat.x < wall.x + wall.w &&
		objekat.x + objekat.w > wall.x &&
		objekat.y < wall.y + wall.h &&
		objekat.y + objekat.h > wall.y
	);
}
function CollisionObjectObject(a, b) {
	return (
		((a.x + a.w > b.x && a.x + a.w < b.x + b.w) || (a.x < b.x + b.w && a.x > b.x)) &&
		((a.y + a.h > b.y && a.y + a.h < b.y + b.h) || (a.y < b.y + b.h && a.y > b.y))
	);
}
function CollisionObjectCircle(a, b) {
	return (
		((a.x + a.w >= b.x && a.x + a.w <= b.x + b.w) || (a.x <= b.x + b.w && a.x >= b.x)) &&
		((a.y + a.h >= b.y && a.y + a.h <= b.y + b.h) || (a.y <= b.y + b.h && a.y >= b.y))
	);
}
function CollisionCharacterCharacter(a, b) {
	return (
		((a.x + a.w >= b.x && a.x + a.w <= b.x + b.w) || (a.x <= b.x + b.w && a.x >= b.x)) &&
		((a.y + a.h >= b.y && a.y + a.h <= b.y + b.h) || (a.y <= b.y + b.h && a.y >= b.y))
	);
}

function Snap(a, val = constants.size) {
	return floor(a / val) * val;
}