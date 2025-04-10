export function setupBoard() {
	console.log("Setting up chessboard...");
	let boardGeneration = document.getElementById('board');
	for (let row = 0; row < 8; row++) {
		for (let col = 0; col < 8; col++) {
			let cell = document.createElement("div");
			cell.classList.add("cell", (row + col) % 2 === 0 ? "white" : "black");
			boardGeneration.appendChild(cell);
			cell.setAttribute("id", `${row}${col}`);
			cell.style.animationDelay = `${(row + col) * 100}ms`;
		}
	}

	const initialBoard = [["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"], // Black major rules
		["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"], // Black pawns
		["", "", "", "", "", "", "", ""], // Empty rows
		["", "", "", "", "", "", "", ""], // Empty rows
		["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"], // White pawns
		["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]  // White major rules
	];

	setTimeout(() => {
		initialBoard.forEach((row, rowIndex) => {
			row.forEach((piece, colIndex) => {
				setTimeout(() => {
					if (piece) {
						let cell = document.getElementById(`${rowIndex}${colIndex}`);
						cell.innerHTML = piece;
					}
				}, (rowIndex + colIndex) * 100);
			});
		});
	}, 1000);

}