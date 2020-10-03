let canvas, context;
let game, gameLoop;
window.addEventListener('DOMContentLoaded', (e) =>{
	canvas = document.getElementById('game');
	context = canvas.getContext('2d');
	game = new LD47GameB();
	gameLoop = new GameLoop(game.render, game.update, 1);//renderCB, updateCB, FPS
	gameLoop.start();
});
