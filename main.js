class Warp {
	// Straight-line distance on a two-dimensional grid is calculated as
	// the square root of the sum of the squares of the X and Y distances.
	// For a simple comparison to determine which of two distances is
	// larger, it would be sufficient to sum the squares and compare those,
	// but since our comparisons are taking into account the distance from
	// Spawn to the warp buttons we need the actual distances involved,
	// and so the dist() and dist2() methods calculate square roots.

	constructor(name, x, y, offset=0, needsElytra=0) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.offset = offset;
		this.needsElytra = needsElytra;
	}

	// fdist(): Calculate the square of the distance
	fdist(x, y) {
		let rx = x - this.x;
		let ry = y - this.y;
		return rx * rx + ry * ry;
	}

	// dist(): Distance from the Warp plus spawn->warp travel offset
	// Used for calculating actual total distances
	dist(x, y) {
		return Math.sqrt(this.fdist(x, y)) + this.offset;
	}

	// dist2(): Distance from the Warp, no offset
	// Used when displaying information to the user
	dist2(x, y) {
		return Math.sqrt(this.fdist(x, y));
	}
}

let warps = [];


// findClosest(): Iterate over all warps calculating distance to the
// desired destination point. Save the two nearest ones.
function findClosest(x, y) {
	let bi = 0;
	let best = [];
	best[0] = warps[0];
	// let best = [warps[0], warps[0]];
	for (let i = 1; i < warps.length; i++) {
		if (best[0].dist(x, y) > warps[i].dist(x, y)) {
			bi = i;
			best[1] = best[0];
			best[0] = warps[i];
		}
	}
	if (best[1].name === warps[0].name) {
		// If the *first* warp in the list was the closest one to
		// our target coords, then we didn't get a second-best,
		// so let's go find that one now.
		for (let i = 1; i < warps.length; i++) {
			if (i == bi) { console.log("SECOND: Skipping index " + i + "."); continue; }
			if (best[1].dist(x, y) > warps[i].dist(x, y)) {
				best[1] = warps[i];
			}
		}
	}
	return best;
}

function show_results(x, y, warp, outdiv, firstresult = 1) {
	if (firstresult) {
		closest = "closest"
	} else {
		closest = "next closest"
	}
	let str = "The " + closest + " warp to (" + x + ", " + y + ") is " + warp.name + ": (" + warp.x + ", " + warp.y + ").<br>The nether coordinates of " + warp.name + " are (" + Math.round(warp.x / 8) + ", " + Math.round(warp.y / 8) + ").<br>\n";
	//let str = "The closest warp to (" + x + ", " + y + ") is " + warp.name + ": (" + warp.x + ", " + warp.y + ").<br>\n";
	let rx = x - warp.x;
	let ry = y - warp.y;
	let heading = Math.round((Math.atan2(-rx, ry) * 1800 / Math.PI)) / 10;
	if (warp.needsElytra == ELYTRA_DISABLED) {
		str += "<b>ELYTRA IS DISABLED AT WARP</b>.<br><br>\n";
	} else if (warp.needsElytra == NEEDS_ELYTRA) {
		str += "ELYTRA IS REQUIRED.<br><br>\n";
	}
	str += "The location is " + Math.round(warp.dist2(x, y)) + " blocks away from the warp, at a heading of " + heading + "&deg;.<br>\n";
	if (firstresult) {

		str += "The nether coordinates of (" + x + ", " + y + ") are (" + Math.round(x / 8) + ", " + Math.round(y / 8) + ").\n";
		if (warp.offset != 0) {
			str += "<br><br>\n<font size='-1'>";
			str += "The distance shown is the actual straight-line distance from the arrival point.\n";
			str += " The nearest-warp calculation includes an additional travel distance of ";
			str += warp.offset + " blocks to account for travel from Spawn to the warp button.\n";
			str += " For some warps this additional distance also includes the distance needed";
			str += " to exit a building at arrival or to reach a secondary warp button.\n";
			str += "</font>\n";
		}
	}
	outdiv.innerHTML = str;
}

function run() {
	let out = document.getElementById("output");
	let secondblock = document.getElementById("additional_results");
	let secondout = document.getElementById("secondary");
	let x = document.getElementById("x").value;
	let y = document.getElementById("y").value;
	let result = findClosest(x, y);
	show_results(x, y, result[0], out, 1);

	if (secondblock != null) {
		if (result.length > 1) {
			secondblock.style = "display: block;";
			show_results(x, y, result[1], secondout, 0)
		} else {
			secondblock.style = "display: none;";
		}
	}
}

let ELYTRA_DISABLED = 2;
let NEEDS_ELYTRA = 1;
let NO_ELYTRA = 0;

// The distance offsets of various warps are obtained by performing
// distance calculations and truncating the results to whole numbers.
//
// When a warp has two steps, the distance offsets are expressed
// as the sum of the distances of the multiple steps.

// System warps
warps.push(new Warp("INVALID", 999999, 999999, 999999, NEEDS_ELYTRA));
warps.push(new Warp("Spawn", -524, 12));
warps.push(new Warp("Mob Farm/Comfy Fishing", 1237, -1815, 13, NO_ELYTRA));
warps.push(new Warp("Elytra Boost", -566, -44, 12, NEEDS_ELYTRA));
warps.push(new Warp("Bouncy Castle", -483, -84, 11, NO_ELYTRA));
warps.push(new Warp("PVP Lobby", -605, -96, 12, NO_ELYTRA));
warps.push(new Warp("Build PVP", 677, 710, 12+5, NEEDS_ELYTRA));
warps.push(new Warp("Mountain PVP", 16156, 9996, 12+3, NO_ELYTRA));
warps.push(new Warp("Redstone Museum", 5074, -2464, 12+20, NO_ELYTRA));

// Biome warps

warps.push(new Warp("Plains", -2155, 8920, 12+8, NO_ELYTRA));
warps.push(new Warp("Flower Forest", 8142, 4813, 12+13, NO_ELYTRA));
warps.push(new Warp("Pale Forest", -7027, 13544, 12+16, NO_ELYTRA));
warps.push(new Warp("Cherry Grove", -4496, -1936, 12+20, NO_ELYTRA));
warps.push(new Warp("Roofed Forest", -1371, 1010, 12+25, NO_ELYTRA));
warps.push(new Warp("Mushroom", 6263, -1709, 12+27, NO_ELYTRA));
warps.push(new Warp("Ice Spikes", -466, 4595, 12+27, NO_ELYTRA));
warps.push(new Warp("Desert", 1009, 8354, 12+27, NO_ELYTRA));
warps.push(new Warp("Mesa", -8019, -5839, 12+25, NO_ELYTRA));
warps.push(new Warp("Jungle", 8340, -11391, 12+23, NO_ELYTRA));

// Event warps

warps.push(new Warp("Event Center", -404, 160, 12, NO_ELYTRA));
warps.push(new Warp("Spleef Spectator", 424, 760, 16, NEEDS_ELYTRA));
warps.push(new Warp("Obstacle Course Spectator", 1060, 252, 14, NO_ELYTRA));
warps.push(new Warp("Island Map", -9890, -9744, 19, ELYTRA_DISABLED));
// Central City cannot be exited without elytra but elytra is disabled there.
// warps.push(new Warp("Central City", 813, 298, 19, ELYTRA_DISABLED));

// Monthly Build Highlights (player builds)

// End
