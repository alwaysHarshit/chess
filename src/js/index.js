import {handleClicks} from "./boardMangement/board.js";
import {setupBoard} from "./boardMangement/setupBoard.js";

document.addEventListener("DOMContentLoaded", () => {
	setupBoard();
	document.getElementById('board').addEventListener("click", handleClicks)
});