import {getPieceColor} from "../utility.js";

export function queenMoves(row,col,color,board) {
	let moves = [];
	let r=row-1
	let c=col-1
	let isPieceFound=false;

	// knight's moves
	while(r>=0 && c>=0 && !isPieceFound){
		if(board[r][c]!==""){
			if(getPieceColor(board[r][c])!== color){
				moves.push(`${r}${c}`);
				isPieceFound=true;
			}
			break;
		}
		moves.push(`${r}${c}`)

		r--;
		c--;
	}

	r = row-1;
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

	//rook's moves
	 r=row-1;
	 c=col;
	isPieceFound=false;

	//check upward moment (7-0)
	while(r>=0 && !isPieceFound){
		if(board[r][c]!==""){
			if(getPieceColor(board[r][c])!== color){
				moves.push(`${r}${c}`);
				isPieceFound=true;
			}
			break;
		}
		moves.push(`${r}${c}`)
		r--;
	}

	//check downward movement(row:0-7)
	r = row===7?row:row+1;
	isPieceFound=false
	while(7>=r && !isPieceFound){
		if(board[r][c]!==""){
			if(getPieceColor(board[r][c])!== color){
				moves.push(`${r}${c}`);
				isPieceFound=true;
			}
			break;
		}
		moves.push(`${r}${c}`)
		r++
	}

	// check right movement(column:0-7)
	r=row
	c= col+1;
	isPieceFound=false
	while(7>=c && !isPieceFound){
		if(board[r][c]!==""){
			if(getPieceColor(board[r][c])!== color){
				moves.push(`${r}${c}`);
				isPieceFound=true;
			}
			break;
		}
		moves.push(`${r}${c}`)
		c++;
	}

	// check left movement(column:7-0)
	c = col===0?col:col-1;
	isPieceFound=false
	while(c>=0 && !isPieceFound){
		if(board[r][c]!==""){
			if(getPieceColor(board[r][c])!== color){
				moves.push(`${r}${c}`);
				isPieceFound=true;
			}
			break;
		}
		moves.push(`${r}${c}`)
		c--;
	}

	return moves;
}