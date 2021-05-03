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
	let str = "The closest warp to (" + x + ", " + y + ") is " + warp.name + ".<br>";
	let rx = x - warp.x;
	let ry = y - warp.y;
	let heading = Math.round((Math.atan2(-rx, ry) * 1800 / Math.PI)) / 10;
	str += "It is " + Math.round(warp.dist(x, y)) + " blocks away, at a heading of " + heading + "°.<br>";
	str += "The nether coordinates are (" + Math.round(x / 8) + ", " + Math.round(y / 8) + ").";
	out.innerHTML = str;
}

warps.push(new Warp("Mega Taiga", 3843, -6199));
warps.push(new Warp("Roofed Forest", 1894, 5831));
warps.push(new Warp("Jungle", 5120, -362));
warps.push(new Warp("Savannah Village", 9767, 325));
warps.push(new Warp("Birch Forest", 1947, -4204));
warps.push(new Warp("Plains", 3849, 6781));
warps.push(new Warp("Swamp", 5011, -1836));
warps.push(new Warp("Mountain", -1886, -3682));
warps.push(new Warp("Desert", 3078, -3616));
warps.push(new Warp("Mesa", 6901, -4985));
warps.push(new Warp("Temp Warp", 11199, 10905));
warps.push(new Warp("Comfy Fishing", 7302, -2420));
warps.push(new Warp("Ice Spikes", -6381, -838));
warps.push(new Warp("Frozen Ocean", 3422, 8901));
warps.push(new Warp("Island", -5039, -7325));
warps.push(new Warp("Mushroom Island", -5474, 7983));
warps.push(new Warp("Flower Forest", -2313, -7975));
warps.push(new Warp("Elytra Boost", 1734, 95));
