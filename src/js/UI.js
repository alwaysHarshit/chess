export function updateUi(fromCell, toCell) {

	let fromElement = document.getElementById(String(fromCell));
	let toElement = document.getElementById(String(toCell));


	if (!fromElement || !toElement) return; // Ensure elements exist

	toElement.innerHTML = fromElement.innerHTML;
	fromElement.innerHTML = "";
}

let previousMoves = [];
export function removeMove(previousMove) {
	previousMoves.forEach((move) => {
		let cell = document.getElementById(`${move[0]}${move[1]}`);
		if (cell) {
			cell.style.backgroundColor = ""; // Reset color
		}
	});
	previousMoves.length = 0;
}
export function highLightMoves(moves) {
	moves.forEach((move) => {
		let cell = document.getElementById(`${move[0]}${move[1]}`);
		if (cell) {
			cell.style.backgroundColor = "red";
		}
		previousMoves.push(move); // Store new moves
	});
};