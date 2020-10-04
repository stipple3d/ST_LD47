class LD47GameC{
	constructor(_rows, _cols){

		this.gridRows = _rows;
		this.gridCols = _cols;

		this.tileWidth = canvas.width / this.gridCols;
		this.tileHeight = canvas.height / this.gridRows;

		this.grid = [];

		//track the current loop direction, row/col
		this.dir = 'right';
		this.loopRow = 0;
		this.loopCol = 0;

		this.stepIn = true;

		//store the current bounds index values in each direction
		//(these will shrink as the loop moves inwards)
		this.bounds = {left: 0, right: this.gridCols -1, top: 0, bottom: this.gridRows -1};

		//if we are stepping in, the starting bounds needs to be
		//increased by 1
		if(this.stepIn)
			this.bounds.top ++;

		var currIndex = 0;

		for(var row = 0; row < this.gridRows; row++){
			this.grid[row] = [];
			for(var col = 0; col < this.gridRows; col++){
				this.grid[row][col] = new FadeAwayTileC(row, col, this.tileHeight, this.tileWidth);
				
				/*//if it is on the border, make it a wall
				if(row == 0 || row == this.gridRows -1 || 
					col == 0 || col == this.gridCols -1){
					this.grid[row][col].tileState = 'wall';
				}
				else
					this.grid[row][col].tileState = 'open';*/

				//USE WALL DATA TO SET INITIAL WALLS

				if(wallData[currIndex] == 0)
					this.grid[row][col].tileState = 'open';
				else if(wallData[currIndex] == 1)
					this.grid[row][col].tileState = 'wall';

				currIndex ++;
			}
		}

		//array of blocks (will be playable in order as each is collected)
		this.blocks = [
		{row: 4, col: 1},
		//{row: 18, col: 13},
		{row: 3, col: 10},
		{row: 16, col: 4},
		{row: 8, col: 14},
		{row: 13, col: 7}
		];

		//turn on first block
		this.blockIndex = 0;
		this.grid[this.blocks[this.blockIndex].row][this.blocks[this.blockIndex].col].tileState = 'block';

		this.playerSpeed = 100;
		this.playerRadius = (this.tileWidth/2) *.5;
		this.playerX = canvas.width /2;
		this.playerY = canvas.height /2;

		//store the players (center) Row/Col for use in identifying neighbors to check collisions against
		this.playerRow = Math.floor(this.playerY / this.tileHeight);
		this.playerCol = Math.floor(this.playerX / this.tileWidth);

		//make the center tile an end state
		this.grid[Math.floor(this.gridRows / 2)][Math.floor(this.gridCols /2)].tileState = 'end';
	

	}

	updatePlayerPosition = function(_pX, _pY){
		
		this.playerX = _pX;
		this.playerY = _pY;

		//store Row/Col for next move
		this.playerRow = Math.floor(this.playerY / this.tileHeight);
		this.playerCol = Math.floor(this.playerX / this.tileWidth);


		//check if the new tile (center point) is a block
		if(this.grid[this.playerRow][this.playerCol].tileState == 'block'){

			//if it is, make it an open tile now
			this.grid[this.playerRow][this.playerCol].tileState = 'open';

			//activate the next block in the blocks array (if there are any left)
			this.blockIndex ++;
			if(this.blockIndex < this.blocks.length){
				this.grid[this.blocks[this.blockIndex].row][this.blocks[this.blockIndex].col].tileState = 'block';
			}

		}

	}

	//NOTE: _dt is coming from gameLoop
	update = (_dt) =>{

		//MOVE PLAYER

		//calculate X/Y change values based on input keys
		var changeX = 0;
		var changeY = 0;

		if(inputHandler.leftPressed)
			changeX -= this.playerSpeed * _dt;
		if(inputHandler.rightPressed)
			changeX += this.playerSpeed * _dt;
		if(inputHandler.upPressed)
			changeY -= this.playerSpeed * _dt;
		if(inputHandler.downPressed)
			changeY += this.playerSpeed * _dt;

		//only process player collisions and surround tiles if the player is moving
		if(changeX != 0 || changeY != 0){

			//new potential X/Y is the current position plus the change in each direction
			var potX = this.playerX + changeX;
			var potY = this.playerY + changeY;

			//figure out what POTENTIAL tile the CENTER of the player WOULD BE in (Row/Col)
			//var potRow = Math.floor(constrainedY / this.tileHeight);
			//var potCol = Math.floor(constrainedX / this.tileWidth);

			var potTopY = potY - this.playerRadius;
			var potBottomY = potY + this.playerRadius; 
			var potLeftX = potX - this.playerRadius;
			var potRightX = potX + this.playerRadius;

			//NOTE: assuming that the player can never go into the outer ring of tiles
			//		(otherwise the neighbor checks will break)

			//first check L/R collisions
			if(changeX > 0){
				//MOVING RIGHT

				//is the right side of the player beyond the previous moves tile's right edge 
				//(are we moving into a new column?)
				if(potRightX > (this.playerCol + 1) * this.tileWidth){

					//NE tile is wall AND potTop is extending into next tile up
					//OR.... E tile is a wall (can we assume we are at least a little inside the bounds of the E tile, vertically?)
					//OR.... SE tile is a wall AND potBottom is extending into the next tile down
					if(			(this.grid[this.playerRow -1][this.playerCol +1].tileState == 'wall' && potTopY < this.playerRow * this.tileHeight) ||
								this.grid[this.playerRow][this.playerCol +1].tileState == 'wall' ||
								(this.grid[this.playerRow +1][this.playerCol +1].tileState == 'wall' && potBottomY > this.playerRow * this.tileHeight + this.tileHeight)
						){
						//constrain to the RIGHT edge of the current tile
						potX = (this.playerCol * this.tileWidth + this.tileWidth) - this.playerRadius;
					}
					
				}
				//else, not moving outside of current tile horizontally

			}
			else if(changeX < 0){
				//MOVING LEFT

				//is the left side of the player beyond the previous moves tile's left edge 
				//(are we moving into a new column?)
				if(potLeftX < this.playerCol * this.tileWidth){

					//NW tile is wall AND potTop is extending into next tile up
					//OR.... W tile is a wall (can we assume we are at least a little inside the bounds of the E tile, vertically?)
					//OR.... SW tile is a wall AND potBottom is extending into the next tile down
					if(			(this.grid[this.playerRow -1][this.playerCol -1].tileState == 'wall' && potTopY < this.playerRow * this.tileHeight) ||
								this.grid[this.playerRow][this.playerCol -1].tileState == 'wall' ||
								(this.grid[this.playerRow +1][this.playerCol -1].tileState == 'wall' && potBottomY > this.playerRow * this.tileHeight + this.tileHeight)
						){
						//constrain to the LEFT edge of the current tile
						potX = this.playerCol * this.tileWidth + this.playerRadius;
					}
					
				}
				//else, not moving outside of current tile horizontally

			}
			//ELSE NO L/R MOVEMENT

			//then,  check U/D collisions
			if(changeY > 0){
				//MOVING DOWN

				//is the bottom of the player beyond the previous moves tile's top edge
				//(are we moving to a new tile)
				if(potBottomY > (this.playerRow * this .tileHeight) + this.tileHeight){

					//SW tile is a wall AND potLeft is extending into next tile left
					//OR... S tile is a wall (can we assume we are at least a little inside the bounds of the S tile, horizontally?)
					//OR... SE tile is a wall AND potRight is extending into the tile Right
					if(			(this.grid[this.playerRow +1][this.playerCol -1].tileState == 'wall' && potLeftX < this.playerCol * this.tileWidth) ||
								this.grid[this.playerRow +1][this.playerCol].tileState == 'wall' ||
								(this.grid[this.playerRow +1][this.playerCol +1].tileState == 'wall' && potRightX > this.playerCol * this.tileWidth + this.tileWidth)
						){
						//constrain to the BOTTOM edge of the current tile
						potY = this.playerRow * this.tileHeight + this.tileHeight - this.playerRadius;
					}
				}

			}
			else if(changeY < 0){
				//MOVING UP

				//is the top of the player beyond the previous moves tile's top edge
				//(are we moving to a new tile)
				if(potTopY < this.playerRow * this .tileHeight){

					//NW tile is a wall AND potLeft is extending into next tile left
					//OR... N tile is a wall (can we assume we are at least a little inside the bounds of the N tile, horizontally?)
					//OR... NE tile is a wall AND potRight is extending into the tile Right
					if(			(this.grid[this.playerRow -1][this.playerCol -1].tileState == 'wall' && potLeftX < this.playerCol * this.tileWidth) ||
								this.grid[this.playerRow -1][this.playerCol].tileState == 'wall' ||
								(this.grid[this.playerRow -1][this.playerCol +1].tileState == 'wall' && potRightX > this.playerCol * this.tileWidth + this.tileWidth)
						){
						//constrain to the TOP edge of the current tile
						potY = this.playerRow * this.tileHeight + this.playerRadius;
					}
				}

			}
			//ELSE NO U/D MOVEMENT

			//move player to new position
			this.updatePlayerPosition(potX, potY);

			//if that tile is the current block, turn it to an open tile

			//keep track of what tile(s) the player is in (if the loop hits the player, 
			//what happens?)


		}

		

		//MOVE LOOP

		//activate the CURRENT loop tile
		this.grid[this.loopRow][this.loopCol].activate();

		//check if the 

		//move the loop for the next step
		if(this.dir == 'right'){
			if(this.loopCol == this.bounds.right){
				//we are at the right bounded edge, start moving down
				this.dir = 'down';
				this.loopRow ++;
			}
			else{
				this.loopCol ++;
			}
		}
		else if(this.dir == 'down'){
			if(this.loopRow == this.bounds.bottom){
				this.dir = 'left';
				this.loopCol --;
			}
			else{
				this.loopRow ++;
			}
		}
		else if(this.dir == 'left'){
			if(this.loopCol == this.bounds.left){
				this.dir = 'up';
				this.loopRow --;
			}
			else{
				this.loopCol --;
			}
		}
		else if(this.dir == 'up'){

			if(this.loopRow == this.bounds.top){
				this.dir = 'right';
				this.loopCol ++;
				if(this.stepIn){
					//THIS IS ALSO THE END OF THE LOOP
					//reduce all bounds by one
					this.bounds.left ++;
					this.bounds.top ++;
					this.bounds.right --;
					this.bounds.bottom --;
				}
			}
			else{
				this.loopRow --;
			}
		}
	}

	render = () =>{
		//console.log('render: playerX: ', this.playerX);
		
		//clear the canvas each render
		context.clearRect(0, 0, canvas.width, canvas.height);

		//render player at current position each render
		context.save();

		/*context.beginPath();
		context.fillStyle = 'red';
		context.arc(canvas.width / 2, canvas.height /2, 20, 0, Math.PI *2)
		context.fill();*/

		for(var row = 0; row < this.grid.length; row++){
			for(var col = 0; col < this.grid[row].length; col++){
				console.log();
				this.grid[row][col].draw();
			}
		}

		//DRAW PLAYER
		context.beginPath();
		context.fillStyle = 'white';
		context.arc(this.playerX, this.playerY, this.playerRadius, 0, Math.PI *2);
		context.fill();

		//write directions on screen
		/*context.beginPath();
		context.fillStyle = 'white';
		context.font = "30px Arial";
		context.fillText('L: ' + inputHandler.leftPressed + ', R: ' + inputHandler.rightPressed, 10,26);*/

		context.restore();
	}
}

class FadeAwayTileC{
	constructor(_row, _col, _h, _w){
		this.r = _row;
		this.c = _col;
		this.w = _w;
		this.h = _h;

		//opacity (will come to maxOpacity and then fade out at a certain rate)
		this.opacity = 0;
		this.lostOpacity = .2;

		this.wallColor = '#555';
		this.openColor = '#777';
		this.blockColor = 'red';
		this.endColor = '#336699'

		this.faderColor = '#999'

		this.bgPadding = 2;
		this.faderPadding = 4;

		this.tileState = 'wall';//wall, open, block
		//walls: only relevant to tplayer movement, they do not block the ring mover
				//(outer ring is all walls? so the player has time to get their bearings)
			//***some 'trailing' effect on these tiles
		//open: player can move on these tiles (maze). the ring mover will turn 
		//		them to wall on touching them
		//blocks: one in every ring? these are open tiles to the player, but will 
		//			end the level if the ring reaches them. The player clears them by walking through the tile

	}

	activate = function(){
		//handle opacity (for drawing fading element)
		this.opacity = 1;

		//handle changing state of tile
		if(this.tileState == 'wall'){

		}
		else if(this.tileState == 'open'){
			this.tileState = 'wall';
		}
		else if(this.tileState == 'block'){
			alert('hit a block: game over!');
		}
		else if(this.tileState == 'end'){
			alert('reached the end!!!');
		}
	}

	draw = function(){

		context.save();

		//ALWAYS DRAW TILE BG
		context.beginPath();
		
		if(this.tileState == 'wall')
			context.fillStyle = this.wallColor;	
		else if(this.tileState == 'open')
			context.fillStyle = this.openColor;
		else if(this.tileState == 'block')
			context.fillStyle = this.blockColor;
		else if(this.tileState == 'end')
			context.fillStyle = this.endColor;
		else
			context.fillStyle = 'yellow';//DEBUG

		context.rect(this.c * this.w + this.bgPadding, this.r * this.h + this.bgPadding, this.w - (this.bgPadding *2), this.h - (this.bgPadding *2));
		context.fill();

		//IF THERE IS A FADING ELEMENT ON THIS TILE, DRAW IT OVER THE BG
		if(this.opacity != 0){
			
			context.globalAlpha = this.opacity;
			context.beginPath();
			context.fillStyle = this.faderColor;
			context.rect(this.c * this.w + this.faderPadding, this.r * this.h + this.faderPadding, this.w - (this.faderPadding *2), this.h - (this.faderPadding *2));
			context.fill();
			context.globalAlpha = 1;

			//THEN REDUCE THE OPACITY FOR NEXT DRAW
			this.opacity -= this.lostOpacity;
			if(this.opacity < 0)
				this.opacity = 0;
		}

		context.restore();
	}
}