class Warp {
	// Distance is calculated as the square root of the sum of squares. For
	// determining which distance is greater, we don't need to do the square
	// root calculations, unless our calculation includes the offsets.

	constructor(name, x, y, offset=0) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.offset = offset;
	}
	
	// fdist(): Calculate the square of the distance
	fdist(x, y) {
		let rx = x - this.x;
		let ry = y - this.y;
		return rx * rx + ry * ry;
	}
	
	// dist(): Distance from the Warp plus spawn->warp travel offset
	dist(x, y) {
		return Math.sqrt(this.fdist(x, y)) + this.offset;
	}

	// dist2(): Distance from the Warp, no offset
	dist2(x, y) {
		return Math.sqrt(this.fdist(x, y));
	}
}

let warps = [];

// This version of findClosest() doesn't do expensive square-root calculations
// because they're not necessary for comparing which one is longer, only for
// showing the final distance value.
// function findClosest(x, y) {
// 	let best = warps[0];
// 	for(let i = 0; i < warps.length; i++) {
// 		if(best.fdist(x, y) > warps[i].fdist(x, y)) {
// 			best = warps[i];
// 		}
// 	}
// 	return best;
// }

// This version of findClosest() does the expensive square-root calculations
// because the distance value being calculated needs to include the offset,
// the distance traveled from Spawn to reach the alternate starting point.
// There's no way to calculate distance+offset without the actual distance.
function findClosest(x, y) {
	let best = warps[0];
	for(let i = 0; i < warps.length; i++) {
		if(best.dist(x, y) > warps[i].dist(x, y)) {
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
	let str = "The closest warp to (" + x + ", " + y + ") is " + warp.name + ": (" + warp.x + ", " + warp.y + ").<br>\n";
	let rx = x - warp.x;
	let ry = y - warp.y;
	let heading = Math.round((Math.atan2(-rx, ry) * 1800 / Math.PI)) / 10;
	str += "The location is " + Math.round(warp.dist2(x, y)) + " blocks away from the warp, at a heading of " + heading + "&deg;.<br>\n";
	str += "The nether coordinates of (" + x + ", " + y + ") are (" + Math.round(x / 8) + ", " + Math.round(y / 8) + ").\n";
	if (warp.offset != 0) {
		str += "<br><br>\n<font size='-1'>";
		str += "The distance shown is the actual straight-line distance from the arrival point.\n";
		str += " The nearest-warp calculation includes an additional travel distance of " + warp.offset + " blocks to account for travel from Spawn to the warp button.\n";
		str += " For some warps this additional distance also includes the distance needed to exit a building at arrival or to reach a secondary warp button.\n";
		str += "</font>\n";
	}
	out.innerHTML = str;
}

// alert('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

// System warps
warps.push(new Warp("INVALID", 999999,999999,999999));
warps.push(new Warp("Spawn", 110, -32));
warps.push(new Warp("Build PVP", 8929, -1129, 76));
warps.push(new Warp("Celestial Citadel PVP", 26960, 35720, 75));
warps.push(new Warp("Comfy Fishing", 2622, 110, 71));
warps.push(new Warp("Elytra Boost", 153, -105, 71));
warps.push(new Warp("Mob Farm", -2077, 12495, 72));
warps.push(new Warp("PVP Mountain", -7618, 7147, 78));

// Biome warps
warps.push(new Warp("Cave", -2080, 3737, 70));
warps.push(new Warp("Cherry Grove", -22345, -20092, 62));
warps.push(new Warp("Desert", 2546, 1269, 71));
warps.push(new Warp("Flower Forest", 2353, 6959, 62));
warps.push(new Warp("Island", 2324, -931, 66));
warps.push(new Warp("Jungle", -5763, 698, 66));
warps.push(new Warp("Mega Taiga", -628, 2176, 70));
warps.push(new Warp("Mesa", 3091, -732, 71));
warps.push(new Warp("Mountain", 954, 2576, 71));
warps.push(new Warp("Mushroom Village", 12187, 7231, 64));
warps.push(new Warp("Plains", -3846, 7094, 72));
warps.push(new Warp("Roofed Forest", -3677, 4453, 64));
warps.push(new Warp("Savannah", 4182, -1776, 68));
warps.push(new Warp("Snowy Plains", -5628, 7571, 60));
warps.push(new Warp("Swamp", -7342, -14615, 60));
warps.push(new Warp("\"Temp Warp\"", 3645, -6828, 70));

// Event warps
warps.push(new Warp("Izonti Dig (Jeep down the road, near Spawn)", 3164, -20026, 344));
warps.push(new Warp("Event Center", -3323, -251, 71));
warps.push(new Warp("March 2023 Build Comp (via Event Center, Build Competition)", -7300, 10000, 99));
warps.push(new Warp("Obstacle Course Spectator (via Event Center, Weekly Events)", 7607, 9446, 110));
warps.push(new Warp("Team Axolotl (via Event Center, Build Competition)", -8447, 8595, 94));
warps.push(new Warp("Team Shark (via Event Center, Build Competition)", -17003, 1474, 96));
warps.push(new Warp("Team Snake (via Event Center, Build Competition)", 12176, -3923, 98));
warps.push(new Warp("Treasure Hunt (via Event Center, Weekly Events)", 11098, -7629, 114));
warps.push(new Warp("Spleef Spectator (via Event Center, Weekly Events)", -3610, 103, 127));
warps.push(new Warp("Team 1: Dragon (via Event Center, Build Competition)", 17278, -21124, 100));
warps.push(new Warp("Team 2: Caladrius (via Event Center, Build Competition)", 9014, 9072, 102));
warps.push(new Warp("Team 3: Unicorn (via Event Center, Build Competition)", -17348, 564, 104));

// Monthly Build Highlights (player builds)
warps.push(new Warp("Safe Survival City (Event Center, Other Events, November 2023 Build Highlight", -1264, 3295, 100));
warps.push(new Warp("ItsImmi's Base (Event Center, Other Events, December 2023 Build Highlight", -7939, 15461, 100));
