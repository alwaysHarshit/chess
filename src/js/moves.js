import { pawnMoves } from "./rules/pawn.js";
import { rookMoves } from "./rules/rook.js";
 import { knightMoves } from "./rules/knight.js";
 import { bishopMoves } from "./rules/bishop.js";
 import { queenMoves } from "./rules/queen.js";
import { kingMoves } from "./rules/king.js";


export function getPossibleMoves(piece, row, col, color,board) {
	let moves=[]
	switch (piece) {
		case "♙":
		case "♟":
			moves=pawnMoves(row, col, color, board);
			break;
		case "♖":
		case "♜":
			moves=rookMoves(row, col, color,board);
			break;
		case "♘":
		case "♞":
			moves= knightMoves(row, col, color, board);
			break;
		case "♗":
		case "♝":
			moves=bishopMoves(row, col, color, board);
			break;
		case "♕":
		case "♛":
			moves= queenMoves(row, col, color, board);
			break;
		case "♔":
		case "♚":
			moves=kingMoves(row, col, color,board);
			break;
		default:
			return [];
	}
	return moves;
}
