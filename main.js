class Warp {
	constructor(name, x, y) {
		this.name = name;
		this.x = x;
		this.y = y;
	}
	
	fdist(x, y) {
		let rx = x - this.x;
		let ry = y - this.y;
		return rx * rx + ry * ry;
	}
	
	dist(x, y) {
		return Math.sqrt(this.fdist(x, y));
	}
}

let warps = [];

function findClosest(x, y) {
	let best = warps[0];
	for(let i = 0; i < warps.length; i++) {
		if(best.fdist(x, y) > warps[i].fdist(x, y)) {
			best = warps[i];
		}
	}
	return best;
}

function run() {
	let out = document.getElementById("output");
	let x = document.getElementById("x").value;
	let y = document.getElementById("y").value;
	let warp = findClosest(x, y);
	let str = "The closest warp to (" + x + ", " + y + ") is " + warp.name + ": (" + warp.x + ", " + warp.y + ").<br>";
	let rx = x - warp.x;
	let ry = y - warp.y;
	let heading = Math.round((Math.atan2(-rx, ry) * 1800 / Math.PI)) / 10;
	str += "The location is " + Math.round(warp.dist(x, y)) + " blocks away from the warp, at a heading of " + heading + "°.<br>";
	str += "The nether coordinates are (" + Math.round(x / 8) + ", " + Math.round(y / 8) + ").";
	out.innerHTML = str;
}

// alert('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

// Standard warps
warps.push(new Warp("Spawn", 110, -32));
warps.push(new Warp("Elytra Boost", 153, -105));
warps.push(new Warp("Roofed Forest", -3677, 4453));
warps.push(new Warp("Jungle", -5763, 698));
warps.push(new Warp("Plains", -3846, 7094));
warps.push(new Warp("Desert", 2546, 1269));
warps.push(new Warp("Cave", -2080, 3737));
warps.push(new Warp("Snowy Plains", -5628, 7571));

// Event warps
// No event warps yet.
// warps.push(new Warp("Event Center", 0, 0));
