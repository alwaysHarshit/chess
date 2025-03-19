import {getPieceColor} from "../utility.js";

export function knightMoves(row,col,color,board){
	let moves=[]
	let allMoves=[
		[row-2,col-1],
		[row-2,col+1],
		[row+2,col-1],
		[row+2,col+1],
		[row-1,col-2],
		[row-1,col+2],
		[row+1,col-2],
		[row+1,col+2]
	]
	let validMoves=allMoves.filter(([r,c])=> (r>=0 && r<=7 )&& (c>=0 && c<=7));
	validMoves.forEach(move =>{
		let row=move[0];
		let col=move[1];
		if(board[row][col]!==""){
			console.log("A",row, col);
			if(getPieceColor(board[row][col]) !== color){
				moves.push(`${row}${col}`);
				console.log("B",row, col);
			}
		}
		else {
			moves.push(`${row}${col}`);
			console.log("C",row, col);
		}

	})
	return moves;
}