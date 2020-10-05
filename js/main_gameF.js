class LD47Game{
	constructor(_level = 0){

		

	//***** GENERAL

		this.levelIndex = _level;



	//***** LOOPSHOOTS

		//loopShoot(s) array
		this.loopShoots = [];

		//populate the array from the data
		for(var s = 0; s < levels[this.levelIndex].loopshoots.length; s++){
			//just pass in the level and the LoopShoot's index 
			//and it will pull the rest from data
			this.loopShoots[s] = new LoopShoot(this.levelIndex, s, this.ballRadius);
		}

		//TODO: loopshoot 'collision' zones
		



	//***** BALLS

		this.ballRadius = 20;

		//SINGLE BALL SPEED? (for the level)
		//(pixels per second)
		this.ballSpeed = levels[this.levelIndex].ballSpeed;

		//TODO: balls array
		this.ballsInPlay = [];

		//TODO: way to remove a ball from the array

		//TODO: way to add a ball?

		//TEST: add a ball headed toward one of the collection points
		var ball = new Ball();

		

	//***** PHYSICS

		//TODO: side wall bounces

		//TODO: bottom edge death

		














	}


	//NOTE: _dt is coming from gameLoop
	update = (_dt) =>{



		//TODO: UPDATE FREE MOVING BALLS
		//		(ball position will determine if the loopShoots can 'collect the balls')


		//UPDATE LOOPSHOOTS
		for(var s = 0; s < this.loopShoots.length; s++){
			this.loopShoots[s].update(_dt);
		}







		/*//move object (with keys for now)
		this.containerFound = false;

		//TODO: this should not happen. The player does not control the object. 
		//		(update the objects position in the object that is holding it,
		//		OR... move it in its current path if it is free floating)

		for(var dobj = 0; dobj < this.drawableObjects.length; dobj++){
			if(this.viewPort.isInView(this.drawableObjects[dobj]) &&
				this.drawableObjects[dobj].hasObject)
				this.containerFound = true;
				this.drawableObjects[dobj].update(_dt);
		}

		if(!this.containerFound){
			
			//TODO: move the 'free-floating' object its set speed
			this.objectPos.x += this.objectSpeed.x * _dt;
			this.objectPos.y += this.objectSpeed.y * _dt;
		}

		//TODO: THEN, match the viewPort pos to the objects position

		//have viewport position match the 'object'
		this.viewPort.setPosition(this.objectPos.x, this.objectPos.y);

		//THEN, ...
		//check all objects in the drawableObjects array and if they are in the viewport area
		//update them
		//NOTE: DO NOT update the one that is holding the object AGAIN...

		for(var dobj = 0; dobj < this.drawableObjects.length; dobj++){
			if(this.viewPort.isInView(this.drawableObjects[dobj])&&
				!this.drawableObjects[dobj].hasObject)
				this.drawableObjects[dobj].update(_dt);
		}
*/
		
			
		
	}

	render = () =>{

		//clear the canvas each render
		context.clearRect(0, 0, canvas.width, canvas.height);

		//render player at current position each render
		context.save();





		//RENDER LOOPSHOOTS
		for(var s = 0; s < this.loopShoots.length; s++){
			this.loopShoots[s].draw();
		}









		//check all objects in the drawableObjects array and if they are in the viewport area
		//render them
		
		/*for(var dobj = 0; dobj < this.drawableObjects.length; dobj++){
			if(this.viewPort.isInView(this.drawableObjects[dobj]))
				this.drawableObjects[dobj].draw(this.viewPort.screenOffsetX, this.viewPort.screenOffsetY);
			
		}

		context.beginPath();
		context.fillStyle = 'white';
		
		context.arc(this.objectPos.x + (-this.viewPort.screenOffsetX), this.objectPos.y + (-this.viewPort.screenOffsetY), 6, 0, Math.PI *2);
		
		context.fill();

		//write directions on screen
		context.beginPath();
		context.fillStyle = 'white';
		context.font = "12px Arial";

		context.fillText('OBJECT X: ' + Math.round(this.objectPos.x) + ', Y: ' + Math.round(this.objectPos.y), canvas.width /2,canvas.height /2 + 50);

		context.fillText('shootPointRel X: ' + this.loopShoot.shootPointRel.x + ', Y: ' + this.loopShoot.shootPointRel.y, canvas.width /2,canvas.height /2 -70);
		context.fillText('LOOPSHOOT X: ' + this.loopShoot.pos.x + ', Y: ' + this.loopShoot.pos.y, canvas.width /2,canvas.height /2 -50);
		

		context.fillText('VIEWPORT-W X: ' + this.viewPort.worldPosition.x + ', Y: ' + this.viewPort.worldPosition.y, 10,75);
		context.fillText('OFFSETS X: ' + this.viewPort.screenOffsetX + ', Y: ' + this.viewPort.screenOffsetY, 10,100);



		//DRAW viewport area, replicating the canvas size (for debugging and testing)
		//(and draw a buffer line (dashed) of where the objects actually get drawn to)
		context.beginPath();
		context.strokeStyle = '#555';
		context.lineWidth = 1;
		context.rect(this.viewPort.initialPosition.x - (this.viewPort.width /2), this.viewPort.initialPosition.y - (this.viewPort.height /2), this.viewPort.width, this.viewPort.height);
		context.rect(this.viewPort.initialPosition.x - (this.viewPort.width /2) - this.viewPort.buffer, this.viewPort.initialPosition.y - (this.viewPort.height /2) - this.viewPort.buffer, this.viewPort.width + (this.viewPort.buffer *2), this.viewPort.height + (this.viewPort.buffer *2));
		context.stroke();

		context.beginPath();
		context.moveTo(canvas.width /2, 100);
		context.lineTo(canvas.width /2, 500);
		context.stroke();

		context.beginPath();
		context.moveTo(canvas.width /2 - 25, 100);
		context.lineTo(canvas.width /2 - 25, 500);
		context.stroke();

		context.beginPath();
		context.moveTo(canvas.width /2 - 50, 100);
		context.lineTo(canvas.width /2 - 50, 500);
		context.stroke();

		context.beginPath();
		context.moveTo(100, canvas.height /2);
		context.lineTo(500, canvas.height /2);
		context.stroke();*/
		

		context.restore();
	}
}

