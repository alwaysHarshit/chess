import {getPieceColor} from "../utility.js";

export function bishopMoves(row, col, color,board) {
	let moves = [];
	let r=row-1
	let c=col-1
	let isPieceFound=false;
	while(r>=0 && c>=0 && !isPieceFound){
		if(board[r][c]!==""){
			if(getPieceColor(board[r][c])!== color){
				moves.push(`${r}${c}`);
				isPieceFound=true;
			}
			break;
		}
		moves.push(`${r}${c}`)
		console.log(r,moves)
		r--;
		c--;
	}

	r = row-1;
	c=col+1;
	isPieceFound=false
	while(7>=r && r>=0  && !isPieceFound){
		if(board[r][c]!==""){
			console.log("jello")
			if(getPieceColor(board[r][c])!== color){
				console.log("kello")
				moves.push(`${r}${c}`);
				isPieceFound=true;
			}
			break;
		}
		moves.push(`${r}${c}`)
		r--;
		c++
	}

	r=row+1;
	c=col-1;
	isPieceFound=false
	while(7>=r && r>=0  && !isPieceFound){
		if(board[r][c]!==""){
			if(getPieceColor(board[r][c])!== color){
				moves.push(`${r}${c}`);
				isPieceFound=true;
			}
			break;
		}
		moves.push(`${r}${c}`)
		r++;
		c--
	}
	r=row+1;
	c=col+1;
	isPieceFound=false
	while(7>=r && r>=0  && !isPieceFound){
		if(board[r][c]!==""){
			if(getPieceColor(board[r][c])!== color){
				moves.push(`${r}${c}`);
				isPieceFound=true;
			}
			break;
		}
		moves.push(`${r}${c}`)
		r++;
		c++;
	}
	return moves;
}