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

		this.normShootVector = new Vector2D(this.shootPointRel.x, this.shootPointRel.y);
		this.normShootVector.normalize();

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
		this.shootWait = 180;

		this.hasObject = true;

		//can be 'center' or 'shoot' 
		//(or maybe 'end' if we are having the end attract the object when it is close enough)
		this.movingToward = 'shoot';

		this.drawRelativeToViewport = true;

		this.objDistToCenter = 0;

	}

	update = function(_dt){

		//objects only are controllable when they are in possession of the object
		if(this.hasObject){

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

			//recalc normalized shoot vector
			this.normShootVector.x = this.shootPointRel.x;
			this.normShootVector.y = this.shootPointRel.y;
			this.normShootVector.normalize();

			//DEPENDING ON IF OBJECT IS HEADING TO CENTER OR SHOOT, 
			//MAKE object's new position the same distance as it was from center 
			//PLUS any new movement 
			//IN THE NEW DIRECTION THAT THE LOOPSHOOT IS ALIGNED TO
			if(this.movingToward == 'shoot'){
				this.objDistToCenter += this.shootSpeed * _dt;

				if(this.objDistToCenter >= this.length /2){
					//REACHED SHOOT
					this.objDistToCenter = this.length /2;
					this.movingToward = 'waitingToShoot';
					this.shootWait = 36;
				}
				game.objectPos.x = this.pos.x + (this.objDistToCenter * Math.cos(this.angle));
				game.objectPos.y = this.pos.y + (this.objDistToCenter * Math.sin(this.angle));
			}
			else if(this.movingToward == 'center'){
				this.objDistToCenter -= this.shootSpeed * _dt;
				if(this.objDistToCenter <= 0){
					//REACHED CENTER
					this.objDistToCenter = 0;
					this.movingToward = 'shoot';
				}
				game.objectPos.x = this.pos.x;
				game.objectPos.y = this.pos.y;
			}
			else if(this.movingToward == 'waitingToShoot'){
				this.shootWait --;

				game.objectPos.x = this.pos.x + (this.objDistToCenter * Math.cos(this.angle));
				game.objectPos.y = this.pos.y + (this.objDistToCenter * Math.sin(this.angle));

				if(this.shootWait <= 0){
					//TIMER COMPLETE... SHOOT
					this.hasObject = false;
					game.objectSpeed.x = this.normShootVector.x * this.shootSpeed;
					game.objectSpeed.y = this.normShootVector.y * this.shootSpeed;
					//TODO: release the object
					this.movingToward = '';
				}
			}

			//TODO: if object reaches the shoot end, mark moveTo as '' & start shoot timer
			//TODO: if object reaches center, mark moveTo as 'shoot'
			//(in both these cases, make sure it either is snapped to exactly the end,
			//	or has any remaining distance applied to its next move)
		
		}

	}

	draw = function(_offsetX, _offsetY){

		context.save();

		var usePosX = this.pos.x;
		var usePosY = this.pos.y;
		//console.log('usePos: ' + usePosX + ', ' + usePosY);
		//console.log('offsets: ' + _offsetX + ', ' + _offsetY);

		if(this.drawRelativeToViewport){
			//the 300 here is the initial 'viewport' position
			usePosX += -_offsetX;
			usePosY += -_offsetY;
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
		
		context.lineTo(usePosX + this.shootPointRel.x + (this.normShootVector.x * this.shootSpeed), usePosY + this.shootPointRel.y + (this.normShootVector.y * this.shootSpeed));
		context.stroke();

		if(this.movingToward == 'waitingToShoot'){
			context.beginPath();
			context.fillStyle = 'black';
			context.font = "60px Arial";
			context.fillText(Math.round(this.shootWait /12) + '...', game.objectPos.x - 16, game.objectPos.y -20);
		}
		
	

		context.restore();
	}
}

class TestObject{
	constructor(_x, _y){

		//position of center of the loopshoot
		this.pos = new Vector2D(_x, _y);

		this.hasObject = false;

		this.radius = 10;


		this.drawRelativeToViewport = true;
	}

	update = function(_dt){

		this.radius += ((Math.random() - .5) * 1);
		if(this.radius <= 0)
			this.radius = .4;

	}

	draw = function(_offsetX, _offsetY){

		context.save();

		var usePosX = this.pos.x;
		var usePosY = this.pos.y;
		//console.log('usePos: ' + usePosX + ', ' + usePosY);
		//console.log('offsets: ' + _offsetX + ', ' + _offsetY);

		if(this.drawRelativeToViewport){
			//the 300 here is the initial 'viewport' position
			usePosX += -_offsetX;
			usePosY += -_offsetY;
		}

		//DRAW CENTER POINT
		context.beginPath();
		context.fillStyle = 'yellow';
		context.arc(usePosX, usePosY, this.radius, 0, Math.PI *2);
		context.fill();

		context.restore();
	}
}