import {getPieceFromBoard} from "../utility.js";

export function rookMoves(row, col, color,board) {
	let moves=[];
	const r=row
	const c= col
	let start=color==="white"?6:1;
	let end= color==="white"?0:7;
	let direction= color==="white"?-1:1;

	for (let j = row; j <= end;j+=direction) {
		let pieceColor = getPieceFromBoard(board, j, col).color;
		if ((pieceColor !==null && pieceColor !== color) || board[j][col]===""){
			moves.push(`${j}${col}`);
		}
	}
	for (let i = col; i <= end;i+=direction){
		let pieceColor = getPieceFromBoard(board, r, i).color;
		console.log(pieceColor);
		if ((pieceColor !==null && pieceColor !== color) || board[r][i]===""){
			moves.push(`${r}${i}`);
		}
	}
	console.log(moves);
	return moves;
}
