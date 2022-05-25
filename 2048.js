let board;
let score = 0;
let rows = 4;
let columns = 4;

window.onload = function () {
	setGame();
};

function setGame() {
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	];

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			// Create <div id="0-0"></div>
			let tile = document.createElement("div");
			tile.id = r.toString() + "-" + c.toString();
			let num = board[r][c];
			updateTile(tile, num);
			document.getElementById("board").append(tile);
		}
	}
	setTwo();
	setTwo();
}

function hasEmptyTile() {
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			if (board[r][c] == 0) return true;
		}
	}
	return false;
}

function setTwo() {
	if (!hasEmptyTile()) return;

	let found = false;
	while (!found) {
		// Random r, c value
		let r = Math.floor(Math.random() * rows); // 0-1 * 4 -> 0 - 4
		let c = Math.floor(Math.random() * columns);

		if (board[r][c] == 0) {
			board[r][c] = 2;
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			tile.innerText = "2";
			tile.classList.add("x2");
			found = true;
		}
	}
}

function updateTile(tile, num) {
	tile.innerText = "";
	tile.classList.value = ""; // Clear the class list
	tile.classList.add("tile");
	if (num > 0) {
		tile.innerText = num;
		if (num <= 4096) tile.classList.add("x" + num.toString());
		else tile.classList.add("x8192");
	}
}

document.addEventListener("keyup", (e) => {
	if (e.code == "ArrowLeft") {
		slideLeft();
		setTwo();
	} else if (e.code == "ArrowRight") {
		slideRight();
		setTwo();
	} else if (e.code == "ArrowUp") {
		slideUp();
		setTwo();
	} else if (e.code == "ArrowDown") {
		slideDown();
		setTwo();
	}
	document.getElementById("score").innerText = score;
});

function filterZero(row) {
	return row.filter((num) => num != 0); // Create a new array without zeroes
}

function slide(row) {
	// [0, 2, 2, 2]
	row = filterZero(row); // Get rid of zeroes -> [2, 2, 2]

	// Slide
	for (let i = 0; i < row.length - 1; i++) {
		// Check every 2
		if (row[i] == row[i + 1]) {
			row[i] *= 2;
			row[i + 1] = 0;
			score += row[i];
		} // [2, 2, 2] -> [4, 0, 2]
	}
	row = filterZero(row); // [4, 2]

	// Add zeroes
	while (row.length < columns) {
		row.push(0);
	} // [4, 2, 0, 0]
	return row;
}

function slideLeft() {
	for (let r = 0; r < rows; r++) {
		let row = board[r];
		row = slide(row);
		board[r] = row;

		for (let c = 0; c < columns; c++) {
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile, num);
		}
	}
}

function slideRight() {
	for (let r = 0; r < rows; r++) {
		let row = board[r];
		row.reverse();
		row = slide(row);
		row.reverse();
		board[r] = row;

		for (let c = 0; c < columns; c++) {
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile, num);
		}
	}
}

function slideUp() {
	for (let c = 0; c < columns; c++) {
		let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
		row = slide(row);

		for (let r = 0; r < rows; r++) {
			board[r][c] = row[r];
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile, num);
		}
	}
}

function slideDown() {
	for (let c = 0; c < columns; c++) {
		let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
		row.reverse();
		row = slide(row);
		row.reverse();

		for (let r = 0; r < rows; r++) {
			board[r][c] = row[r];
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile, num);
		}
	}
}
