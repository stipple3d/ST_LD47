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

		for(var row = 0; row < this.gridRows; row++){
			this.grid[row] = [];
			for(var col = 0; col < this.gridRows; col++){
				this.grid[row][col] = new FadeAwayTileC(row, col, this.tileHeight, this.tileWidth);
				
				//if it is on the border, make it a wall
				if(row == 0 || row == this.gridRows -1 || 
					col == 0 || col == this.gridCols -1){
					this.grid[row][col].tileState = 'wall';
				}
				else
					this.grid[row][col].tileState = 'open';
			}
		}

		//make a blocked tile for testing
		//this.grid[4][1].tileState = 'block';

		//make the center tile an end state
		//this.grid[Math.floor(this.gridRows / 2)][Math.floor(this.gridCols /2)].tileState = 'end';
	}
	//NOTE: _dt is coming from gameLoop
	update = (_dt) =>{

		//activate the CURRENT loop tile
		this.grid[this.loopRow][this.loopCol].activate();

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