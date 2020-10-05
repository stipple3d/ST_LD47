class Viewport{
	constructor(_worldX, _worldY, _w, _h, _buffer){

		//camera position is stored as the Viewport's CENTER
		//(in pixels, relative to the canvas' TL corner)
		this.worldPosition = new Vector2D(_worldX, _worldY);


		//initial position (osset values can be calculated from this)
		this.initialPosition = new Vector2D(_worldX, _worldY);

		
		this.width = _w;
		this.height = _h;

		//an additional pixel value to add to all bounds returned from this viewport
		//(this will force thing to draw even if their positions (generally 'centers' in this
		//game) fall outside the viewport bounds, but they would still be visible (and therefore
		//important))
		this.buffer = _buffer;

		this.screenOffsetX = this.worldPosition.x - this.initialPosition.x;
		this.screenOffsetY = this.worldPosition.y - this.initialPosition.y;
		
	}

	getLeftBounds = function(){
		return this.worldPosition.x - (this.width /2) - this.buffer;
	}
	getRightBounds = function(){
		return this.worldPosition.x + (this.width /2) + this.buffer;
	}
	getTopBounds = function(){
		return this.worldPosition.y - (this.height /2) - this.buffer;
	}
	getBottomBounds = function(){
		return this.worldPosition.y + (this.height /2) + this.buffer;
	}

	//drawing and bounds are all relative to the world coords
	isInView = function(_obj){
		if(_obj.pos.x >= this.getLeftBounds() && 
			_obj.pos.x <= this.getRightBounds() &&
			_obj.pos.y >= this.getTopBounds() && 
			_obj.pos.y <= this.getBottomBounds())
			return true;
		else
			return false;
	}

	setPosition = function(_x, _y){
		this.worldPosition.x = _x;
		this.worldPosition.y = _y;
		//recalc the offsets from the initial position (used for adjusting the objects 
		//drawing in the canvas)
		this.screenOffsetX = this.worldPosition.x - this.initialPosition.x;
		this.screenOffsetY = this.worldPosition.y - this.initialPosition.y;
	}
}