import {
	findKing,
	getCellsBetween,
	getPieceColor,
	getPieceFromBoard,
	makeMove, removeCheck,
	resetSelection
} from "./utility.js";
import {highLightMoves, removeMove} from "./UI.js";
import {getPossibleMoves} from "./moves.js";
import {checkForCheck, filterValidMovesForCheck} from "./check.js";


export function setupBoard() {
	console.log("Setting up chessboard...");
	let boardGeneration = document.getElementById('board');
	for (let row = 0; row < 8; row++) {
		for (let col = 0; col < 8; col++) {
			let cell = document.createElement("div");
			cell.classList.add("cell", (row + col) % 2 === 0 ? "white" : "black");
			boardGeneration.appendChild(cell);
			cell.setAttribute("id", `${row}${col}`);
			cell.style.animationDelay = `${(row + col) * 100}ms`;
		}
	}

	const initialBoard = [["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"], // Black major rules
		["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"], // Black pawns
		["", "", "", "", "", "", "", ""], // Empty rows
		["", "", "", "", "", "", "", ""], // Empty rows
		["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"], // White pawns
		["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]  // White major rules
	];

	setTimeout(() => {
		initialBoard.forEach((row, rowIndex) => {
			row.forEach((piece, colIndex) => {
				setTimeout(() => {
					if (piece) {
						let cell = document.getElementById(`${rowIndex}${colIndex}`);
						cell.innerHTML = piece;
					}
				}, (rowIndex + colIndex) * 100);
			});
		});
	}, 1000);

}

export let gameState = {
	board: [["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"], ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", ""], ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"], ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]],
	selectedPiece: {
		initialCoordinates: null, finalCoordinates: null, piece: null, color: null,
	},
	moves: null,
	turn: "black",
	Checkmate: {
		isCheck: false,
		kingPosition: [],
		movesOfCheckmate: [],  // all legal moves that can save king
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

	gameState.moves = getPossibleMoves(piece, row, column, color, gameState.board);

	if (gameState.Checkmate.isCheck) {
		//let validMoves = filterValidMovesForCheck(gameState.moves,gameState.Checkmate.possibleMovetoAvoidCheckmate,piece, row, column,color);
		let validMoves = simulatingMove(gameState.moves)
		if (validMoves.length) {
			gameState.moves = validMoves;
			highLightMoves(gameState.moves);
		} 
		else {
			console.log("No valid moves to escape check!");
		}
	} 
	else {
		if(gameState.selectedPiece.piece ==='♚' || gameState.selectedPiece.piece === '♔'){
			simulatingMove(gameState.moves);
		}
		if (gameState.moves.length) {
			highLightMoves(gameState.moves);
		} else {
			console.log("No valid moves!");
		}
	}
}

function handleMove(row, column) {
		const isValidMove = gameState.moves?.some(move => String(move) === `${row}${column}`);

		if (!isValidMove) return; // Ignore invalid moves
		// Move the piece
		makeMove([row, column], gameState.selectedPiece.initialCoordinates, gameState.board);
		if (gameState.Checkmate.isCheck) {
			console.log(gameState.Checkmate);
			removeCheck();
			console.log("Check removed",gameState);
		}
		//checking for check
		let c=checkForCheck(row, column);
		if(c){
			if(!iterateOverEveryPieceToGetPossibleMoves()){
				alert(`check! ${gameState.turn} wins`);
			}
			else {
				console.log("Check, but moves available");
			}
		}
		else{
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
					let isSafe = !gameState.Checkmate.movesOfCheckmate.flat().some(
						([r, c]) => r === row && c === col
					);
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
				const isAttacker = gameState.Checkmate.checkingPieces.some(
					p => p.position[0] === row && p.position[1] === col
				);

				if (isValid || isAttacker) {
					arrayOfMoves.push({
						piece: piece,
						color: pieceColor,
						move: move
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

function simulatingMove(validMoves) {
	console.log("Simulating moves...", validMoves);
	const safeMoves = [];

	validMoves.forEach(move => {
		const boardCopy = JSON.parse(JSON.stringify(gameState.board));

		const enemyKingColor = gameState.turn === "white" ? "black" : "white";
		const kingPosition = findKing(enemyKingColor, boardCopy); // Example: ["34"]

		const kingRow = parseInt(kingPosition[0][0]);
		const kingCol = parseInt(kingPosition[0][1]);

		const [targetRow, targetCol] = move.split("").map(Number);

		// Move the king on the copied board
		boardCopy[targetRow][targetCol] = boardCopy[kingRow][kingCol];
		boardCopy[kingRow][kingCol] = "";

		let isKingInCheck = false;

		// Check if any enemy piece can attack the new king position
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				const piece = boardCopy[row][col];
				if (piece === "") continue;

				const pieceColor = getPieceColor(piece);
				if (pieceColor === gameState.turn) continue; // Skip friendly pieces

				const possibleMoves = getPossibleMoves(piece, row, col, pieceColor, boardCopy);

				const checkDetected = possibleMoves.some(possibleMove => {
					const [moveRow, moveCol] = possibleMove.split("").map(Number);
					return moveRow === targetRow && moveCol === targetCol;
				});

				if (checkDetected) {
					console.log("🛑 Move", move, "would result in check from", piece, "at", row, col);
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
	return safeMoves;
}
