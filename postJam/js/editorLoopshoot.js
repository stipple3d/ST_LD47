class LoopShoot{
	constructor(_level, _lsIndex, _ballRadius, _new = false){//NOTE: REMOVED BALLSPEED FROM GAME VERSION

		this.ballRadius = _ballRadius;

		//if the incoming _new flag is true, this loopshoot is being added/starting the new level
		//(start it at the center of the canvas and with 2 points so that it will work)
		if(_new){
			this.collectPosition = new Vector2D(canvas.width /2, canvas.height /2);
			//TODO: setting in gameData/game?
			this.collectRadius = 75;
			//array of Vector2D points
			this.points = [];
			//add TWO points to points array (so that release angle calculation will work)
			this.points.push(new Vector2D(canvas.width /2 + 40, canvas.height /2));
			this.points.push(new Vector2D(canvas.width /2 + 80, canvas.height /2));
			
		}
		//if not new, use the level/lsIndex values to pull info from levelData
		else{
			//position of center of the loopshoot
			this.collectPosition = new Vector2D(levels[_level].loopshoots[_lsIndex].cpX, 
												levels[_level].loopshoots[_lsIndex].cpY);

			this.collectRadius = levels[_level].loopshoots[_lsIndex].cpRadius;

			//array of Vector2D points
			this.points = [];

			for(var pt = 0; pt < levels[_level].loopshoots[_lsIndex].movePoints.length; pt++){
				//add a point to points array
				this.points[pt] = new Vector2D(levels[_level].loopshoots[_lsIndex].movePoints[pt].cX, 
												levels[_level].loopshoots[_lsIndex].movePoints[pt].cY);
			}
		}

		//this.releaseAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
		this.releaseAngle = Math.atan2(this.points[this.points.length -1].y - this.points[this.points.length -2].y, 
										this.points[this.points.length -1].x - this.points[this.points.length -2].x);
		
		//is this loopshoot the one being edited?
		this.isBeingEdited = false;
		//which point index is the one currently being edited
		this.selectedPoint = 0;
		//are we editing points? 
		//	(if not and we are being edited, we are editing the loopshoot itself)
		this.editingPoints = false;

	}

	previousPoint = function(){

		//decrement and constrain index
		if(this.selectedPoint <= 0)
			this.selectedPoint = this.points.length -1;
		else
			this.selectedPoint --;

	}

	nextPoint = function(){

		//increment and constrain index
		if(this.selectedPoint +1 >= this.points.length)
			this.selectedPoint = 0;
		else
			this.selectedPoint ++;

	}

	addPoint = function(){
		
		//add a point the the array
		this.points.push(new Vector2D(canvas.width /2, canvas.height /2));
		//make that new point the selected point
		this.selectedPoint = this.points.length -1;

	}

	update = function(_dt){

		if(this.isBeingEdited){
			if(this.editingPoints){

				//EDITING A POINT

				//HORIZONTAL INPUT
				if(inputHandler.leftArrowPressed && !inputHandler.RightArrowPressed){
					//MOVE POINT LEFT
					this.points[this.selectedPoint].x --;
				}
				else if(inputHandler.rightArrowPressed && !inputHandler.leftArrowPressed){
					//MOVE POINT RIGHT
					this.points[this.selectedPoint].x ++;
				}

				//VERTICAL INPUT
				if(inputHandler.upArrowPressed && !inputHandler.downArrowPressed){
					//MOVE POINT UP
					this.points[this.selectedPoint].y --;
				}
				else if(inputHandler.downArrowPressed && !inputHandler.upArrowPressed){
					//MOVE POINT DOWN
					this.points[this.selectedPoint].y ++;
				}



			}
			else{
				//EDITING COLLECTION POINT (loopshoot position as a whole)

				//HORIZONTAL INPUT
				if(inputHandler.leftArrowPressed && !inputHandler.RightArrowPressed){
					//MOVE COLLECTION POINT LEFT
					this.collectPosition.x --;
				}
				else if(inputHandler.rightArrowPressed && !inputHandler.leftArrowPressed){
					//MOVE COLLECTION POINT RIGHT
					this.collectPosition.x ++;
				}

				//VERTICAL INPUT
				if(inputHandler.upArrowPressed && !inputHandler.downArrowPressed){
					//MOVE COLLECTION POINT UP
					this.collectPosition.y --;
				}
				else if(inputHandler.downArrowPressed && !inputHandler.upArrowPressed){
					//MOVE COLLECTION POINT DOWN
					this.collectPosition.y ++;
				}
			}
		}

	}

	draw = function(){

		

		//only draw the loopshoot if editor is wanting all to be show OR if this is the selected LS
		if(game.showAll || this.isBeingEdited){
			
			context.save();

			//DRAW COLLECTION POINT RADIUS LINE (dashed)
			context.beginPath();
			context.lineWidth = 1;
			context.fillStyle = '#444';
			context.strokeStyle = '#666';
			context.setLineDash([10, 10]);
			context.arc(this.collectPosition.x, this.collectPosition.y, this.collectRadius, 0, Math.PI *2);
			context.stroke();
			context.fill();

		//*** TUBE LINE
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

			//2nD stroke to fill in and make a border
			context.beginPath();
			context.lineWidth = 21;
			context.lineCap = "round";
			context.strokeStyle = '#333';
			context.moveTo(this.collectPosition.x, this.collectPosition.y);
			for(var pt = 0; pt < this.points.length; pt++){
				context.lineTo(this.points[pt].x, this.points[pt].y);
			}
			context.stroke();

			



		


			//DRAW SPACES (empty or full)
			for(var sp = 0; sp < this.points.length; sp++){
				context.beginPath();
				if(this.editingPoints && sp == this.selectedPoint)
					context.fillStyle = '#777';
				else
					context.fillStyle = '#555';

				context.arc(this.points[sp].x, this.points[sp].y, this.ballRadius, 0, Math.PI *2);
				context.fill();
				
			}
			
			
			

		//*** DRAW COLLECTION POINT
			context.beginPath();
			context.fillStyle = 'yellow';
			context.arc(this.collectPosition.x, this.collectPosition.y, 3, 0, Math.PI *2);
			context.fill();

			context.restore();
		}

	}
}