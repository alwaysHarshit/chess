import {handleClicks, setupBoard} from "./js/board.js";

document.addEventListener("DOMContentLoaded", () => {
	setupBoard();
	document.getElementById('board').addEventListener("click", handleClicks)
});