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
	if (warp.needsElytra) {
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

// System warps
warps.push(new Warp("INVALID", 999999, 999999, 999999, 1));
// warps.push(new Warp("Spawn", 0, 0));

// Biome warps

// Event warps

// Monthly Build Highlights (player builds)

// End
