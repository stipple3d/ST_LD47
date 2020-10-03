let canvas, context;
let game, gameLoop, inputHandler;
window.addEventListener('DOMContentLoaded', (e) =>{
	canvas = document.getElementById('game');
	context = canvas.getContext('2d');
	game = new LD47GameC(21, 21);
	gameLoop = new GameLoop(game.render, game.update, 10);//renderCB, updateCB, FPS
	inputHandler = new InputHandler();
	gameLoop.start();
});
