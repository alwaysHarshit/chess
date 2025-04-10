import {findKing, getPieceColor, getPieceFromBoard, makeMove, removeCheck, resetSelection} from "../utility.js";
import {getPossibleMoves} from "../moves.js";
import {checkForCheck} from "../check.js";
import {highLightMoves} from "../UI.js";


export let gameState = {
	board: [["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"], ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"], ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]],
	selectedPiece: {
		initialCoordinates: null, finalCoordinates: null, piece: null, color: null,
	},
	moves: null,
	turn: "black",
	Checkmate: {
		isCheck: false, kingPosition: [], movesOfCheckmate: [],  // all legal moves that can save king
		checkingPieces: [],     // pieces putting the king in check
		possibleMovetoAvoidCheckmate: [], // all possible moves to avoid checkmate
	}

};

export function handleClicks(e) {
	const row = parseInt(e.target.id[0]);
	const column = parseInt(e.target.id[1]);
	const {piece, color} = getPieceFromBoard(gameState.board, row, column);

	// If clicking on a piece of the same turn, allow reselection
	if (piece && gameState.selectedPiece.piece && color === gameState.turn) {
		console.log("Re-selecting piece...");
		handleSelection(row, column, piece, color);
		return;
	}

	// If no piece is selected yet
	if (!gameState.selectedPiece.piece) {
		if (piece) {
			console.log("Selecting piece...");
			handleSelection(row, column, piece, color);
		}
	}
	// If a piece is selected, try to move
	else {
		console.log("Moving piece...");
		handleMove(row, column);
	}
}

function handleSelection(row, column, piece, color) {

	// Only allow the correct turn's player to move
	if (gameState.turn !== color) {
		console.log(`It's ${gameState.turn} turn!`);
		return;
	}

	gameState.selectedPiece = {
		initialCoordinates: [row, column], finalCoordinates: null, piece: piece, color: color
	};

	let gettingAllPossibleMoves = getPossibleMoves(piece, row, column, color, gameState.board);

	gameState.moves=simulatePieceMoves(gettingAllPossibleMoves,row,column, piece);
	highLightMoves(gameState.moves)
	
}

function handleMove(row, column,piece, color) {
	const isValidMove = gameState.moves?.some(move => String(move) === `${row}${column}`);

	if (!isValidMove) return; // Ignore invalid moves
	// Move the piece
	makeMove([row, column], gameState.selectedPiece.initialCoordinates, gameState.board);
	if (gameState.Checkmate.isCheck) {
		console.log(gameState.Checkmate);
		removeCheck();
		console.log("Check removed", gameState);
	}
	//checking for check
	let c = checkForCheck(row, column);
	if (c) {
		if (!iterateOverEveryPieceToGetPossibleMoves()) {
			alert(`check! ${gameState.turn} wins`);
		} else {
			console.log("Check, but moves available");
		}
	} else {
		console.log("No check");

	}

	// Switch turn
	gameState.turn = gameState.turn === "white" ? "black" : "white";

	// Reset selection
	resetSelection();
}

function iterateOverEveryPieceToGetPossibleMoves() {
	console.log("Iterating over every piece to get possible moves...");

	let arrayOfMoves = [];
	let hasLegalMove = false; // ✅ Track if *any* legal move exists (king or not)

	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			let piece = gameState.board[i][j];
			if (piece === "") continue;

			let pieceColor = getPieceColor(piece);
			if (pieceColor === gameState.turn) continue; // Skip friendly pieces

			// ✅ King case: only check if it has legal moves, don't store them
			if (piece === "♚" || piece === "♔") {
				let moves = getPossibleMoves(piece, i, j, pieceColor, gameState.board);
				for (let moveStr of moves) {
					const row = parseInt(moveStr[0]);
					const col = parseInt(moveStr[1]);
					let isSafe = !gameState.Checkmate.movesOfCheckmate.flat().some(([r, c]) => r === row && c === col);
					if (isSafe) {
						hasLegalMove = true;
						break; // No need to check further
					}
				}
				continue;
			}

			// ✅ Non-king pieces: collect valid moves and store them
			const moves = getPossibleMoves(piece, i, j, pieceColor, gameState.board);
			let allowedMoves = gameState.Checkmate.movesOfCheckmate.flat();

			for (let move of moves) {
				let row = parseInt(move[0]);
				let col = parseInt(move[1]);

				let isValid = allowedMoves.some(([r, c]) => r === row && c === col);
				const isAttacker = gameState.Checkmate.checkingPieces.some(p => p.position[0] === row && p.position[1] === col);

				if (isValid || isAttacker) {
					arrayOfMoves.push({
						piece: piece, color: pieceColor, move: move
					});
					hasLegalMove = true;
				}
			}
		}
	}

	// ✅ Save only non-king moves
	gameState.Checkmate.possibleMovetoAvoidCheckmate = arrayOfMoves.map(move => move.move);
	console.log("All possible moves: ", arrayOfMoves);
	return hasLegalMove;
}

function simulatePieceMoves(validMoves, fromRow, fromCol, piece) {
	console.log("Simulating piece moves...", validMoves);
	const safeMoves = [];

	validMoves.forEach(move => {
		console.log("Simulating piece move...", move);
		const boardCopy = JSON.parse(JSON.stringify(gameState.board));

		const [targetRow, targetCol] = move.split("").map(Number);
		console.log("targetRow and targetCol", targetRow, targetCol);

		// Simulate the move
		boardCopy[targetRow][targetCol] = piece;
		boardCopy[fromRow][fromCol] = "";
		console.log(boardCopy);

		const kingColor = getPieceColor(piece); // Same color as the moved piece
		const kingPosition = findKing(kingColor, boardCopy);
		console.log("kingPosition", kingPosition,"king Color ",kingColor);
		if (!kingPosition || kingPosition.length === 0) {
			console.warn("King not found on the board!");
			return;
		}

		const kingRow = parseInt(kingPosition[0][0]);
		const kingCol = parseInt(kingPosition[0][1]);

		let isKingInCheck = false;

		// Check if any enemy piece can attack the king
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				const enemyPiece = boardCopy[row][col];
				if (enemyPiece === "") continue;

				const enemyColor = getPieceColor(enemyPiece);
				if (enemyColor === kingColor) continue; // Skip friendly pieces

				const enemyMoves = getPossibleMoves(enemyPiece, row, col, enemyColor, boardCopy);

				const kingUnderAttack = enemyMoves.some(move => {
					const [mRow, mCol] = move.split("").map(Number);
					return mRow === kingRow && mCol === kingCol;
				});

				if (kingUnderAttack) {
					console.log("🛑 Move", move, "puts king in check from", enemyPiece, "at", row, col);
					isKingInCheck = true;
					break;
				}
			}
			if (isKingInCheck) break;
		}

		if (!isKingInCheck) {
			safeMoves.push(move);
		}
	});

	console.log("✅ Safe moves:", safeMoves);
	return safeMoves.length > 0 ? safeMoves : [];
}

