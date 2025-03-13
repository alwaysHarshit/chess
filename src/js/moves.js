import { pawnMoves } from "./pieces/pawn.js";
import { rookMoves } from "./pieces/rook.js";
 import { knightMoves } from "./pieces/knight.js";
 import { bishopMoves } from "./pieces/bishop.js";
// import { queenMoves } from "./pieces/queen.js";
// import { kingMoves } from "./pieces/king.js";


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
			//return queenMoves(row, col, color, board);
		case "♔":
		case "♚":
			//return kingMoves(row, col, color,board);
		default:
			return [];
	}
	return moves;
}
