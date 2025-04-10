import {getPossibleMoves} from "./moves.js";
import {findKing, getCellsBetween, getPieceFromBoard} from "./utility.js";
import {gameState} from "./board.js";

export function checkForCheck(row, column) {

	const movesThatCanCheck = getPossibleMoves(gameState.selectedPiece.piece, row, column, gameState.turn, gameState.board);
	const kingPosition = findKing(gameState.turn, gameState.board);

	let check = movesThatCanCheck.some(move => move === kingPosition[0]);
	if (check) {
		gameState.Checkmate.isCheck = true;
		gameState.Checkmate.kingPosition = kingPosition[0];
		gameState.Checkmate.checkingPieces = [{
			piece: gameState.selectedPiece.piece,
			position: [row, column]
		}];
		const kingPosStr = kingPosition[0]; // e.g., "34"
		const kingPos = [parseInt(kingPosStr[0]), parseInt(kingPosStr[1])];
		let blockingCells= getCellsBetween(kingPos, [row, column]);
		gameState.Checkmate.movesOfCheckmate=[blockingCells];
		
		// highlight king in check
		let kingCell = document.getElementById(kingPosition[0]);
		kingCell.style.backgroundColor = "red";
		console.log(gameState.Checkmate)
		return true ;
	}
	else {
		gameState.Checkmate.isCheck = false;
		gameState.Checkmate.kingPosition = null;
		gameState.Checkmate.movesOfCheckmate = null;
		return false;
	}
}
export function filterValidMovesForCheck(movesOfSelectedPiece, MovesAllowed,piece,i,j,pieceColor) {
	console.log("movesOfSelectedPiece", movesOfSelectedPiece, "MovesAllowed", MovesAllowed, gameState.Checkmate.movesOfCheckmate);

	if (piece==="♔"||piece==="♚") {
		let arr = [];
		let moves = getPossibleMoves(piece, i, j, pieceColor, gameState.board)
		for (let moveStr of moves) {
			const row = parseInt(moveStr[0]);
			const col = parseInt(moveStr[1]);
			let isSafe = !gameState.Checkmate.movesOfCheckmate.flat().some(
				([r, c]) => r === row && c === col
			);
			if (isSafe) {
				arr.push(moveStr);
			}
		}
		console.log("arr", arr);
		return arr;
	}
	let validMoves = movesOfSelectedPiece.filter(move => MovesAllowed.includes(move));
	console.log("validMoves", validMoves);
	return validMoves;
}

