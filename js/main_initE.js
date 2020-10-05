let canvas, context;
let game, gameLoop, inputHandler;
window.addEventListener('DOMContentLoaded', (e) =>{
	canvas = document.getElementById('game');
	context = canvas.getContext('2d');
	game = new LD47Game();
	gameLoop = new GameLoop(game.render, game.update, 30);//renderCB, updateCB, FPS
	inputHandler = new InputHandler();
	gameLoop.start();
});

const levels = [

{
title: 'level1', 
shootX: 300, shootY: 300, shootAngle: 0
}

];