class LD47GameB{
	constructor(){
		this.playerX = canvas.width /2;
		this.playerY = canvas.height /2;
		this.moveAmount = 20;
	}
	//NOTE: _dt is coming from gameLoop
	update = (_dt) =>{
		//move the player 1/2 move amount +/- in x/y directions each update
		this.playerX += (Math.random() - 0.5) * this.moveAmount;
		this.playerY += (Math.random() - 0.5) * this.moveAmount;
	}

	render = () =>{
		//console.log('render: playerX: ', this.playerX);
		
		//clear the canvas each render
		//context.clearRect(0, 0, canvas.width, canvas.height);

		//render player at current position each render
		context.save();

		context.beginPath();
		context.fillStyle = 'green';
		context.arc(this.playerX, this.playerY, 20, 0, Math.PI *2)
		context.fill();

		context.restore();
	}
}