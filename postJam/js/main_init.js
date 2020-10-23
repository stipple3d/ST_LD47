let canvas, context;
let game, gameLoop, inputHandler;

let bounceSoundA, releaseSoundA, deathSoundA, wallBounceA;

window.addEventListener('DOMContentLoaded', (e) =>{
	canvas = document.getElementById('game');
	context = canvas.getContext('2d');
	game = new Game();
	gameLoop = new GameLoop(game.render, game.update, 30);//renderCB, updateCB, FPS
	inputHandler = new InputHandler();

	//SOUNDS
	bounceSoundA = document.getElementById('bounceA');
	releaseSoundA = document.getElementById('releaseC');
	deathSoundA = document.getElementById('deathA');
	wallBounceA = document.getElementById('wallBounceA');


	gameLoop.start();
});