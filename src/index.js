import {handleClicks} from "./js/boardMangement/board.js";
import {setupBoard} from "./js/boardMangement/setupBoard.js";

document.addEventListener("DOMContentLoaded", () => {
	setupBoard();
	document.getElementById('board').addEventListener("click", handleClicks)
});