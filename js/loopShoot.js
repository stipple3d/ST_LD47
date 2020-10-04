class LoopShoot{
	constructor(_x, _y, _angleInDeg){

		//position of center of the loopshoot
		this.pos = new Vector2D(_x, _y);
		/*this.x = _x;
		this.y = _y;*/

		//current angle of the shoot (shoot angle is the definition)
		this.angle = _angleInDeg * (Math.PI/180);
		//console.log('angle(deg): ' + _angleInDeg + ', angle(rad): ' + this.angle);

		//total levngth of the shoot 
		//(shootPoint to endPoint, center is midpoint between these)
		this.length = 100;

		this.shootPointRel = new Vector2D((this.length/2) * Math.cos(this.angle), (this.length/2) * Math.sin(this.angle));
		this.endPointRel = new Vector2D((this.length/2) * Math.cos(this.angle + Math.PI), (this.length/2) * Math.sin(this.angle + Math.PI));
		
		this.shootSpeed = 5;

		this.rotateSpeed = 10 * (Math.PI/180);
		/*

// angle in radians
var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

// angle in degrees
var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

angle in radian = angle in degree * Pi / 180

destX = currX + (distance * cos(radianAngle))
destY = currY + (distance * sin(radianAngle))

*/	
		//time between when the object gets to the shootPoint and when it is shot
		//(might add a phase where loopShoot moves and rotates before countdown starts?)
		this.shootWait = 3;

		this.hasObject = true;

		//can be 'center' or 'shoot' 
		//(or maybe 'end' if we are having the end attract the object when it is close enough)
		this.movingToward = 'shoot';

		this.drawRelativeToViewport = true;

	}

	update = function(_dt){

		//objects only are controllable when they are in possession of the object
		if(this.hasObject){

			//TODO: calculate and store distance of the object from the center


			//ROTATE CCW
			if(inputHandler.leftPressed && !inputHandler.rightPressed)
				this.angle -= this.rotateSpeed;
			//ROTATE CW
			else if(inputHandler.rightPressed && !inputHandler.leftPressed)
				this.angle += this.rotateSpeed;

			//recalc shoot and end points (relative vals)
			this.shootPointRel.x = (this.length/2) * Math.cos(this.angle);
			this.shootPointRel.y = (this.length/2) * Math.sin(this.angle);
			this.endPointRel.x = (this.length/2) * Math.cos(this.angle + Math.PI);
			this.endPointRel.y = (this.length/2) * Math.sin(this.angle + Math.PI);
		
		}

	}

	draw = function(_vpPos){

		context.save();

		var usePosX = this.pos.x;
		var usePosY = this.pos.y;
		console.log('usePos: ' + usePosX + ', ' + usePosY);

		if(this.drawRelativeToViewport){
			//the 300 here is the initial 'viewport' position
			usePosX += -_vpPos.x + canvas.width /2;
			usePosY += -_vpPos.y + canvas.height /2;
		}

		//DRAW SHOOT BG LINE
		context.beginPath();
		context.strokeStyle = '#777';
		context.lineCap = "round";
		context.lineWidth = this.length * .33333;
		context.moveTo(usePosX + this.endPointRel.x, usePosY + this.endPointRel.y);
		context.lineTo(usePosX + this.shootPointRel.x, usePosY + this.shootPointRel.y);
		context.stroke();

		//DRAW CENTER POINT
		context.beginPath();
		context.fillStyle = 'yellow';
		context.arc(usePosX, usePosY, 3, 0, Math.PI *2);
		context.fill();

		//DRAW SHOOT POINT
		context.beginPath();
		context.fillStyle = 'red';
		context.arc(usePosX + this.shootPointRel.x, usePosY + this.shootPointRel.y, 6, 0, Math.PI *2);
		context.fill();

		//DRAW END POINT
		context.beginPath();
		context.fillStyle = 'blue';
		context.arc(usePosX + this.endPointRel.x, usePosY + this.endPointRel.y, 6, 0, Math.PI *2);
		context.fill();

		//DRAW A NORMALIZED (& amultiplied by the shootSpeed) VECTOR STARTING AT SHOOT POINT
		context.beginPath();
		context.lineWidth = 1;
		context.lineCap = "butt";
		context.strokeStyle = 'white';
		context.moveTo(usePosX + this.shootPointRel.x, usePosY + this.shootPointRel.y);
		var normShootVector = new Vector2D(this.shootPointRel.x, this.shootPointRel.y);
		normShootVector.normalize();
		context.lineTo(usePosX + this.shootPointRel.x + (normShootVector.x * this.shootSpeed), usePosY + this.shootPointRel.y + (normShootVector.y * this.shootSpeed));
		context.stroke();

		context.restore();
	}
}

class TestObject{
	constructor(_x, _y, _angleInDeg){

		//position of center of the loopshoot
		this.pos = new Vector2D(_x, _y);
		
		//current angle of the shoot (shoot angle is the definition)
		this.angle = _angleInDeg * (Math.PI/180);

		this.radius = 10;
	}

	update = function(_dt){

		this.radius += ((Math.random() - .5) * 1);

	}

	draw = function(){

		context.save();

		//DRAW CENTER POINT
		context.beginPath();
		context.fillStyle = 'yellow';
		context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI *2);
		context.fill();

		context.restore();
	}
}