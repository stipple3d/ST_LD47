class LD47Game{
	constructor(_level = 0){

		this.levelIndex = _level;

		this.loopShoot = new LoopShoot(levels[this.levelIndex].shootX, levels[this.levelIndex].shootY, levels[this.levelIndex].shootAngle);

		this.drawableObjects = [];

		this.drawableObjects.push(this.loopShoot);

		var testObj = new TestObject(100, 100);
		this.drawableObjects.push(testObj);
		testObj = new TestObject(200, 500);
		this.drawableObjects.push(testObj);
		testObj = new TestObject(500, 200);
		this.drawableObjects.push(testObj);
		testObj = new TestObject(500, 500);
		this.drawableObjects.push(testObj);

		this.objectPos = new Vector2D(this.loopShoot.pos.x, this.loopShoot.pos.y);

		this.objectSpeed = new Vector2D();

		this.viewPort = new Viewport(canvas.width /2, canvas.height /2, 400, 400, 60);

		this.containerFound;

		//TODO: if object is free-floating, each of these objects will check if the object is 
		//		within its circle of influence and if it is, attract/repel it a certain amount 
		//		based on distance and attraction/repulsion force
		this.forceObjects = [];

	}


	//NOTE: _dt is coming from gameLoop
	update = (_dt) =>{

		//move object (with keys for now)
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

		
			
		
	}

	render = () =>{

		//clear the canvas each render
		context.clearRect(0, 0, canvas.width, canvas.height);

		//render player at current position each render
		context.save();

		//check all objects in the drawableObjects array and if they are in the viewport area
		//render them
		
		for(var dobj = 0; dobj < this.drawableObjects.length; dobj++){
			if(this.viewPort.isInView(this.drawableObjects[dobj]))
				this.drawableObjects[dobj].draw(this.viewPort.screenOffsetX, this.viewPort.screenOffsetY);
			
		}

		context.beginPath();
		context.fillStyle = 'white';
		/*if(this.containerFound)
			context.arc(this.objectPos.x, this.objectPos.y, 6, 0, Math.PI *2);
		else
			context.arc(this.objectPos.x + (-this.viewPort.screenOffsetX), this.objectPos.y + (-this.viewPort.screenOffsetY), 6, 0, Math.PI *2);
		*/
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
		context.stroke();
		

		context.restore();
	}
}

