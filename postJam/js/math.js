class Vector2D{
	constructor(_x = 0, _y = 0){
		this.x = _x;
		this.y = _y;
	}
	divide = function(_v2){
		return new Vector2D(this.x / _v2.x, this.y / _v2.y);
	}
	multiply = function(_v2){
		return new Vector2D(this.x * _v2.x, this.y * _v2.y);
	}
	getMag = function(){
		return Math.sqrt( (this.x * this.x) + (this.y * this.y) );
	}
	normalize = function(){
		var mag = this.getMag();
		//console.log('vec(start): ' + this.x + ', ' + this.y);
		//console.log('mag: ' + mag);
		this.x /= mag;
		this.y /= mag;
		//console.log('vec(after): ' + this.x + ', ' + this.y);
	}
	getNormalized = function(){
		var normVec = new Vector2D(this.x, this.y);
		normVec.normalize();
		return normVec;
	}
	setMag = function(_m){
		this.normalize();
		this.x *= _m;
		this.y *= _m;
	}
}