class LD47GameD{
	constructor(_level = 0){

		this.levelIndex = _level;

		//pull level rows/cols out of current level data
		this.gridRows = levels.rows;
		this.gridCols = levels.cols;

		//calculate the size of the tiles
		//TODO: decide if this will always be square?
		this.tileWidth = canvas.width / this.gridCols;
		this.tileHeight = canvas.height / this.gridRows;

		//define empty grid
		this.grid = [];

		//define the mover position vars
		this.moverPosX;
		this.moverPosY;

		var currIndex = 0;
		for(var row = 0; row < this.gridRows; row++){
			this.grid[row] = [];
			for(var col = 0; col < this.gridRows; col++){
				this.grid[row][col] = new GridTile(row, col, this.tileHeight, this.tileWidth);
				
				//pass in the data value from the level gridData to each tile
				this.grid[row][col].value = levels.data[currIndex];

				currIndex ++;
			}
		}

	}


	//NOTE: _dt is coming from gameLoop
	update = (_dt) =>{

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

		//call draw on each of the tiles
		for(var row = 0; row < this.grid.length; row++){
			for(var col = 0; col < this.grid[row].length; col++){
				this.grid[row][col].draw();
			}
		}

		//DRAW PLAYER
		/*context.beginPath();
		context.fillStyle = 'white';
		context.arc(this.playerX, this.playerY, this.playerRadius, 0, Math.PI *2);
		context.fill();*/

		//write directions on screen
		/*context.beginPath();
		context.fillStyle = 'white';
		context.font = "30px Arial";
		context.fillText('L: ' + inputHandler.leftPressed + ', R: ' + inputHandler.rightPressed, 10,26);*/

		context.restore();
	}
}

class GridTile{
	constructor(_row, _col, _h, _w, _data){
		this.r = _row;
		this.c = _col;
		this.w = _w;
		this.h = _h;

		this.value = _data;

		this.bgPadding = 1;

	}

	rotate = function(){
		
	}

	pickUp = function(){
		
	}

	drop = function(){
		
	}

	draw = function(){

		context.save();

		//ALWAYS DRAW TILE BG
		context.beginPath();
		
		if(this.value == 'S')
			context.fillStyle = 'green';	
		else if(this.value == 'E')
			context.fillStyle = 'red';
		else if(this.value == 0)
			context.fillStyle = 'cyan';
		else if(this.value == 1)
			context.fillStyle = 'blue';
		else if(this.value == 2)
			context.fillStyle = 'purple';
		else
			context.fillStyle = 'yellow';//DEBUG

		context.rect(this.c * this.w + this.bgPadding, this.r * this.h + this.bgPadding, this.w - (this.bgPadding *2), this.h - (this.bgPadding *2));
		context.fill();

/*
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
		}*/

		context.restore();
	}
}