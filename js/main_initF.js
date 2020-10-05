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
//TODO: make 'movePoints' 'relativeMovePoints' 
//(and have loopShoots handle figuring out what that means in setup)
const levels = [

{
title: 'LOOP LOOP TEST', 
ballSpeed: 5, 
loopshoots: [

	{cpX: 150, cpY: 100, cpRadius: 50, 
	movePoints: [
		{cX: 150, cY: 75},
		{cX: 150, cY: 50},
		{cX: 150, cY: 25},
		{cX: 175, cY: 25},
		{cX: 200, cY: 25},
		{cX: 225, cY: 25},
		{cX: 250, cY: 25},
		{cX: 275, cY: 25},
		{cX: 300, cY: 25},
		{cX: 325, cY: 25},
		{cX: 350, cY: 25},
		{cX: 375, cY: 25},
		{cX: 400, cY: 25},
		{cX: 425, cY: 25},
		{cX: 450, cY: 25},
		{cX: 450, cY: 50},
		{cX: 450, cY: 75},
		{cX: 450, cY: 100}
	],
	releaseAngle: 270},

	{cpX: 450, cpY: 500, cpRadius: 50, 
	movePoints: [
		{cX: 450, cY: 525},
		{cX: 450, cY: 575},
		{cX: 150, cY: 575},
		{cX: 150, cY: 525},
		{cX: 150, cY: 500}
	],
	releaseAngle: 90}
]
}

];