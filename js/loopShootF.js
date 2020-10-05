class LoopShoot{
	constructor(_level, _lsIndex, _ballRadius){

		//TODO: QUE to get in (if more than one ball reaches the collection point
		//		in one MOVE tick)
		//			- Collection is the only place they would bottle up

		//TODO: gravity of the collection point works in frame time

		this.ballRadius = _ballRadius;

		//position of center of the loopshoot
		this.collectPosition = new Vector2D(levels[_level].loopshoots[_lsIndex].cpX, 
											levels[_level].loopshoots[_lsIndex].cpY);

		this.collectRadius = levels[_level].loopshoots[_lsIndex].cpRadius;

		//incoming angle is in degrees, adjust to Radians for use here
		this.releaseAngle = levels[_level].loopshoots[_lsIndex].releaseAngle * (Math.PI/180);

		//array of Vector2D points
		this.points = [];

		//array of 'spaces' in the array (same number as points array)
		//	used for tracking where there are balls in the array
		this.spaces = [];

		for(var pt = 0; pt < levels[_level].loopshoots[_lsIndex].movePoints.length; pt++){
			//add a point to points array
			this.points[pt] = new Vector2D(levels[_level].loopshoots[_lsIndex].movePoints[pt].cX, 
											levels[_level].loopshoots[_lsIndex].movePoints[pt].cY);
			//add an false value (empty space) to the spaces array
			this.spaces[pt] = false;
		}

		//using DeltaTime to set the tick rate, so it is framerate independent
		this.tickRate = 1;//seconds

		//counter that will track the internal ticks of the loopShoot
		this.timeUntilTick = this.tickRate;
		
		

		/*//current angle of the shoot (shoot angle is the definition)
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
		this.normShootVector.normalize();*/

		/*

// angle in radians
var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

// angle in degrees
var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

angle in radian = angle in degree * Pi / 180

destX = currX + (distance * cos(radianAngle))
destY = currY + (distance * sin(radianAngle))

*/	
		/*//time between when the object gets to the shootPoint and when it is shot
		//(might add a phase where loopShoot moves and rotates before countdown starts?)
		this.shootWait = 180;

		this.hasObject = true;

		//can be 'center' or 'shoot' 
		//(or maybe 'end' if we are having the end attract the object when it is close enough)
		this.movingToward = 'shoot';

		this.drawRelativeToViewport = true;

		this.objDistToCenter = 0;*/



	}

	handleTick = function(_dt){

		


	}

	update = function(_dt){

		//decrement the tick counter
		this.timeUntilTick -= _dt;
		//check if we need to run a tick
		if(this.timeUntilTick <= 0){
			//INCREASE the tickTimer by the rateValue
			//	(leaving any remaining overflow time, so it won't lose time)
			this.timeUntilTick += this.tickRate;
			//run a tick
			this.handleTick(_dt);
		}

	}

	draw = function(){

		context.save();

		//DRAW BG LINE BETWEEN ALL POINTS (THICK AS A TUBE)
		context.beginPath();
		context.lineWidth = 25;
		context.lineCap = "round";
		context.strokeStyle = '#555';
		context.moveTo(this.collectPosition.x, this.collectPosition.y);
		for(var pt = 0; pt < this.points.length; pt++){
			context.lineTo(this.points[pt].x, this.points[pt].y);
		}
		context.stroke();



		//DRAW COLLECTION POINT
		context.beginPath();
		context.fillStyle = 'yellow';
		context.arc(this.collectPosition.x, this.collectPosition.y, 3, 0, Math.PI *2);
		context.fill();



		



		/*var usePosX = this.pos.x;
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
		*/
	

		context.restore();
	}
}