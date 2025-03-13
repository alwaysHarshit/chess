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
		["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"], // Black major pieces
		["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"], // Black pawns
		["", "", "", "", "", "", "", ""], // Empty rows
		["", "", "", "", "", "", "", ""], // Empty rows
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"], // White pawns
		["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]  // White major pieces
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

let board = [
	["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"], // Black major pieces
	["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"], // Black pawns
	["", "", "", "", "", "", "", ""], // Empty rows
	["", "", "", "", "", "", "", ""], // Empty rows
	["", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", ""],
	["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"], // White pawns
	["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]  // White major pieces
];
let selectedPiece = null;
let selectedCell = null;
let moves=null

export function handleClicks(e) {
	let row=parseInt(e.target.id[0]);
	let column=parseInt(e.target.id[1]);
	let  {piece, color} = getPieceFromBoard(board,row,column);
	//selecting piece
	if(!selectedPiece) {
		console.log("Selected Piece");
		selectedPiece = [row,column,piece,color];
		moves = getPossibleMoves(piece, row, column, color, board);
		highLightMoves(moves);
		return;
	}
	//Moving the selected piece
	let isValidMove = moves.some((move) =>String(move)===`${row}${column}`);
	console.log(isValidMove);

	if (isValidMove) {
		console.log("Selected Cell");
		makeMove([row, column], selectedPiece, board);
		console.log(board);
		selectedPiece = null;
		selectedCell = null;
		moves = null;
		removeMove();
		return;
	}
	//Clicking another piece resets selection
	selectedPiece = [row, column, piece, color];
	moves = getPossibleMoves(piece, row, column, color, board);
	removeMove();
	highLightMoves(moves);
}

