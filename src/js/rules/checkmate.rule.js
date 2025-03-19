import { getPieceFromBoard } from "../utility.js";
import { getPossibleMoves } from "../moves.js";

// Check if the king of a given color is in check
function isKingInCheck(color, board) {
	const king = color === "white" ? "♔" : "♚";
	let kingPos = null;

	// Find the king's position
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			if (board[r][c] === king) {
				kingPos = [r, c];
				break;
			}
		}
		if (kingPos) break;
	}

	if (!kingPos) {
		console.error(`King not found for ${color}!`);
		return false; // King missing (edge case)
	}

	// Check if any opponent piece can attack the king
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const { piece, color: pieceColor } = getPieceFromBoard(board, r, c);
			if (piece && pieceColor !== color) {
				const opponentMoves = getPossibleMoves(piece, r, c, pieceColor, board) || [];
				if (opponentMoves.some(move => {
					const [moveRow, moveCol] = Array.isArray(move) ? move : [parseInt(move[0]), parseInt(move[1])];
					return moveRow === kingPos[0] && moveCol === kingPos[1];
				})) {
					return true;
				}
			}
		}
	}
	return false;
}

// Check if the game is in a checkmate state for a given color
function isCheckmate(color, board) {
	if (!isKingInCheck(color, board)) return false;

	// Check if any move can escape check
	for (let r = 0; r < 8; r++) {
		for (let c = 0; c < 8; c++) {
			const { piece, color: pieceColor } = getPieceFromBoard(board, r, c);
			if (piece && pieceColor === color) {
				const possibleMoves = getPossibleMoves(piece, r, c, color, board) || [];
				for (let move of possibleMoves) {
					const [moveRow, moveCol] = Array.isArray(move) ? move : [parseInt(move[0]), parseInt(move[1])];
					// Simulate move on a temp board
					const tempBoard = board.map(row => [...row]);
					tempBoard[moveRow][moveCol] = tempBoard[r][c];
					tempBoard[r][c] = "";
					if (!isKingInCheck(color, tempBoard)) {
						return false; // Escape found
					}
				}
			}
		}
	}
	return true; // No escape, checkmate
}

export { isKingInCheck, isCheckmate };