class LD47Game{
	constructor(_level = 0){

		this.levelIndex = _level;

		this.loopShoot = new LoopShoot(levels[this.levelIndex].shootX, levels[this.levelIndex].shootY, levels[this.levelIndex].shootAngle);

		this.drawableObjects = [];

		this.drawableObjects.push(this.loopShoot);

		this.objectPos = new Vector2D(this.loopShoot.pos.x, this.loopShoot.pos.y);

		this.viewportPos = new Vector2D(canvas.width /2, canvas.height /2);
		this.viewportWidth = 200;
		this.viewportHeight = 200;

		this.viewportBuffer = 60;

	}


	//NOTE: _dt is coming from gameLoop
	update = (_dt) =>{


		//move viewport (with keys for now)

		if(inputHandler.leftPressed)
			this.viewportPos.x -= 20 * _dt;
		if(inputHandler.rightPressed)
			this.viewportPos.x += 20 * _dt;
		if(inputHandler.upPressed)
			this.viewportPos.y -= 20 * _dt;
		if(inputHandler.downPressed)
			this.viewportPos.y += 20 * _dt;

		//check all objects in the drawableObjects array and if they are in the viewport area
		//update them

		for(var dobj = 0; dobj < this.drawableObjects.length; dobj++){
			if(this.isInViewport(this.drawableObjects[dobj]))
				this.drawableObjects[dobj].update(_dt);
		}

		
			
		
	}

	isInViewport = function(_obj){
		if(_obj.pos.x >= this.viewportPos.x - this.viewportWidth /2 && 
			_obj.pos.x <= this.viewportPos.x + this.viewportWidth /2 &&
			_obj.pos.y >= this.viewportPos.y - this.viewportHeight /2 && 
			_obj.pos.y <= this.viewportPos.y + this.viewportHeight /2)
			return true;
		else
			return false;
	}

	render = () =>{

		//clear the canvas each render
		context.clearRect(0, 0, canvas.width, canvas.height);

		//render player at current position each render
		context.save();

		//check all objects in the drawableObjects array and if they are in the viewport area
		//render them
		
		for(var dobj = 0; dobj < this.drawableObjects.length; dobj++){
			if(this.isInViewport(this.drawableObjects[dobj]))
				this.drawableObjects[dobj].draw(this.viewportPos);
			
		}
		

		//call draw on the loopShoot
		//this.loopShoot.draw();



		//DRAW viewport area, replicating the canvas size (for debugging and testing)
		//(and draw a buffer line (dashed) of where the objects actually get drawn to)
		context.beginPath();
		context.strokeStyle = '#555';
		context.lineWidth = 1;
		context.rect(300 - (this.viewportWidth /2), 300 - (this.viewportHeight /2), this.viewportWidth, this.viewportHeight);
		context.rect(300 - (this.viewportWidth /2) + this.viewportBuffer, 300 - (this.viewportHeight /2) + this.viewportBuffer, this.viewportWidth - (this.viewportBuffer *2), this.viewportHeight - (this.viewportBuffer *2));
		context.stroke();

		context.restore();
	}
}

