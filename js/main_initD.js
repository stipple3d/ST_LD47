let canvas, context;
let game, gameLoop, inputHandler;
window.addEventListener('DOMContentLoaded', (e) =>{
	canvas = document.getElementById('game');
	context = canvas.getContext('2d');
	game = new LD47GameD(0);
	gameLoop = new GameLoop(game.render, game.update, 10);//renderCB, updateCB, FPS
	inputHandler = new InputHandler();
	gameLoop.start();
});
//0=right, 1=down, 2=left, 3=up
const levels = {
title: 'level 1',
rows: 6,
cols: 6,
data: [
0,0,0,0,0,0,
'S',1,,0,2,'E',
0,0,1,0,1,0,
0,2,2,0,1,0,
0,2,1,1,2,0,
0,0,0,0,0,0
],
pathDirs: [0,0,1,1,2,1,0,0,0,3,3,3,0]
};
