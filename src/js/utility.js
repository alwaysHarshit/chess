import {removeMove, updateUi} from "./UI.js";


export function getPieceColor(piece) {
	if (!piece) return null;
	let color = "♜,♞,♝,♛,♚,♟".includes(piece) ? "black" : "white";
	return color;
}

export function getPieceFromBoard(board, row, col) {
	let piece = board[row][col];
	let color = getPieceColor(piece);
	return {piece, color};
}

export function makeMove(selectedCell, selectedPiece, board) {
	console.log(selectedCell, selectedPiece);
	board[selectedCell[0]][selectedCell[1]] = board[selectedPiece[0]][selectedPiece[1]]
	board[selectedPiece[0]][selectedPiece[1]] = ""
	let fromCell = `${selectedPiece[0]}${selectedPiece[1]}`;
	let toCell = `${selectedCell[0]}${selectedCell[1]}`;
	updateUi(fromCell, toCell);
	selectedCell = null;
	selectedPiece = null;
	removeMove();


}