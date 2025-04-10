import {removeMove, updateUi} from "./UI.js";
import {gameState} from "./boardMangement/board.js";


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

	board[selectedCell[0]][selectedCell[1]] = board[selectedPiece[0]][selectedPiece[1]]
	board[selectedPiece[0]][selectedPiece[1]] = ""
	let fromCell = `${selectedPiece[0]}${selectedPiece[1]}`;
	let toCell = `${selectedCell[0]}${selectedCell[1]}`;
	updateUi(fromCell, toCell);
	removeMove();
}

export function findKing(color, board) {
	const kingSymbol = color === "white" ? "♔" : "♚";
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			if (board[r][c] === kingSymbol) {
				return [`${r}${c}`];
			}
		}
	}
	return null; // Should never happen in a valid game
}

export function getCellsBetween(kingPos, attackerPos) {
	console.log("function called","king", kingPos, "attacker", attackerPos);
	let [kingRow, kingCol] = kingPos;
	let [attackerRow, attackerCol] = attackerPos;
	let cellsBetween = [];

	// Vertical Attack (same column)
	if (kingCol === attackerCol) {
		console.log("Vertical Attack");
		let minRow = Math.min(kingRow, attackerRow);
		let maxRow = Math.max(kingRow, attackerRow);
		for (let r = minRow + 1; r < maxRow; r++) {
			cellsBetween.push([r, kingCol]);
		}
	}

	// Horizontal Attack (same row)
	else if (kingRow === attackerRow) {
		console.log("Horizontal Attack");
		let minCol = Math.min(kingCol, attackerCol);
		let maxCol = Math.max(kingCol, attackerCol);
		for (let c = minCol + 1; c < maxCol; c++) {
			cellsBetween.push([kingRow, c]);
		}
	}

	// Diagonal Attack
	else if (Math.abs(kingRow - attackerRow) === Math.abs(kingCol - attackerCol)) {
		console.log("Diagonal Attack Detected");

		let rowStep = attackerRow > kingRow ? 1 : -1;
		let colStep = attackerCol > kingCol ? 1 : -1;

		let r = kingRow + rowStep;
		let c = kingCol + colStep;

		while (r !== attackerRow && c !== attackerCol) {
			cellsBetween.push([r, c]);
			r += rowStep;
			c += colStep;

			// Failsafe check (should never hit if logic is valid)
			if (r < 0 || r > 7 || c < 0 || c > 7) break;
		}
	}

	return cellsBetween;
}

export function resetSelection() {
	gameState.selectedPiece = {
		initialCoordinates: null, finalCoordinates: null, piece: null, color: null
	};
	gameState.moves = null;
	removeMove();
}
export function removeCheck(){
	let kingCell = document.getElementById(gameState.Checkmate.kingPosition);
	kingCell.style.backgroundColor = "";
	gameState.Checkmate.kingPosition = null;
	gameState.Checkmate.isCheck = false;
	gameState.Checkmate.movesOfCheckmate = null;
	gameState.Checkmate.checkingPieces = [];
	gameState.Checkmate.possibleMovetoAvoidCheckmate = [];
	return;
}