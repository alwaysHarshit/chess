import { getPieceColor } from "../utility.js";

export function kingMoves(row, col, color, board) {
	let moves = [];
	let allMoves = [
		[row - 1, col - 1], [row - 1, col], [row - 1, col + 1],  // Up-left, Up, Up-right
		[row, col - 1],                   [row, col + 1],        // Left, Right
		[row + 1, col - 1], [row + 1, col], [row + 1, col + 1]   // Down-left, Down, Down-right
	];

	let validMoves = allMoves.filter(([r, c]) => (r >= 0 && r <= 7) && (c >= 0 && c <= 7));

	validMoves.forEach(([r, c]) => {
		if (board[r][c] !== "") {
			console.log("A", r, c);
			if (getPieceColor(board[r][c]) !== color) {
				moves.push(`${r}${c}`);
				console.log("B", r, c);
			}
		} else {
			moves.push(`${r}${c}`);
			console.log("C", r, c);
		}
	});

	return moves;
}
