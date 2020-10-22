let canvas, context;
let game, gameLoop, inputHandler;
window.addEventListener('DOMContentLoaded', (e) =>{
	canvas = document.getElementById('game');
	context = canvas.getContext('2d');

	//TODO: set canvas w/h to the level being worked on

	game = new Game();
	gameLoop = new GameLoop(game.render, game.update, 30);//renderCB, updateCB, FPS
	inputHandler = new InputHandler();
	gameLoop.start();
});