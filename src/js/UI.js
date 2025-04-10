export function updateUi(fromCell, toCell) {

		const fromElement = document.getElementById(String(fromCell));
		const toElement = document.getElementById(String(toCell));

		toElement.innerHTML = fromElement.innerHTML;
		fromElement.innerHTML = "";
}

let previousMoves = new Set();

export function removeMove() {
	previousMoves.forEach(move => {
		const cell = document.getElementById(`${move[0]}${move[1]}`);
		if (cell) cell.style.backgroundColor = ""; // Reset color
	});
	previousMoves.clear(); // Clear all stored moves
}

export function highLightMoves(moves) {
	removeMove(); // Remove previous highlights before adding new ones
	moves.forEach(move => {
		const cell = document.getElementById(`${move[0]}${move[1]}`);
		if (cell) {
			cell.style.backgroundColor = "#53aedd";
			previousMoves.add(move); // Store new move positions
		}
	});
}