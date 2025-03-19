import {getPieceFromBoard, makeMove} from "./utility.js";
import {removeMove,highLightMoves} from "./UI.js";
import {getPossibleMoves} from "./moves.js";

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

	const initialBoard = [
		["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"], // Black major rules
		["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"], // Black pawns
		["", "", "", "", "", "", "", ""], // Empty rows
		["", "", "", "", "", "", "", ""], // Empty rows
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"], // White pawns
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

let gameState = {
	board: [
		["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
		["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
		["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
	],
	selectedPiece: null,
	selectedCell: null,
	moves: null,
	turn: "white"
};

export function handleClicks(e) {
	const row = parseInt(e.target.id[0]);
	const column = parseInt(e.target.id[1]);
	const { piece, color } = getPieceFromBoard(gameState.board, row, column);

	// Early exit if no piece is clicked and nothing is selected
	 if (!piece && !gameState.selectedPiece) return;


	// Handle move if a piece is already selected
	if (gameState.selectedPiece) {
		const isValidMove = gameState.moves?.some(move => String(move) === `${row}${column}`);

		if (isValidMove) {
			console.log("Moving piece to", `${row}${column}`);
			makeMove([row, column], gameState.selectedPiece, gameState.board);
			 gameState.turn = gameState.turn === "white" ? "black" : "white";
			console.log("Updated board:", gameState.board);
			resetSelection();
			return;
		}
	}

	// Select or reselect a piece if one is clicked
	if (piece && gameState.turn === color) {
		console.log("Selected piece at", `${row}${column}`);
		selectPiece(row, column, piece, color);
	}
}

// Helper function to select a piece and highlight moves
function selectPiece(row, column, piece, color) {
	gameState.selectedPiece = [row, column, piece, color];
	gameState.moves = getPossibleMoves(piece, row, column, color, gameState.board);
	removeMove(); // Clear previous highlights
	if (gameState.moves?.length) {
		highLightMoves(gameState.moves);
	}
}

// Helper function to reset selection after a move
function resetSelection() {
	gameState.selectedPiece = null;
	gameState.selectedCell = null;
	gameState.moves = null;
	removeMove();
}

