let canvas, context;

let loopRing;

const lrElementSize = 15;

window.addEventListener('DOMContentLoaded', (e) =>{
	canvas = document.getElementById('game');
	context = canvas.getContext('2d');

	console.log(canvas);

	/*context.beginPath();
	context.fillStyle = 'red';
	context.rect(10,10,40,40);
	context.fill();*/

	//(_elementSize, _elementShape, _ringPadding)
	loopRing = new LoopRing(lrElementSize, 'square');

	setInterval(() =>{
		loopRing.render();

		context.save();
		context.beginPath();
		context.fillStyle = '#999';
		context.rect(lrElementSize +1, lrElementSize +1, canvas.width - (lrElementSize *2) -2, canvas.height - (lrElementSize *2) -2);
		context.fill();
		context.restore();

	}, 60);

});
