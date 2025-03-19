import { getPieceFromBoard} from "../utility.js";

export const pawnMoves = (row, col, color,board) => {
	console.log(row, col, color, board);
	let moves=[];
	let start=color==="white"?6:1;
	let end= color==="white"?0:7;
	let direction= color==="white"?-1:1;

	//getPieceFromBoard(board, row+2*direction, col).color !==color
	// Normal forward move (only if empty)
	if(board[row+direction][col]===""){
		moves.push(`${row+direction}${col}`);
		if(row===start &&board[row+2*direction][col]===""){
			moves.push(`${row+2*direction}${col}`);
		}
	}
	//check or diagonals
	for (let i of [-1, 1]) {
		let pieceColor = getPieceFromBoard(board, row + direction, col + i).color;
		if (pieceColor !==null && pieceColor !== color) {
			moves.push(`${row + direction}${col + i}`);
		}
	}


	return moves;
};