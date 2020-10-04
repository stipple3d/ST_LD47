class RaycastGameA{
	//TODO: create a base class for ALL games and extend this from that class
	//		(specifically to work with the 's3dGameLoop')

	//TODO: this is working off of checking individula boundaries. How could this be used 
	//		for objects? (rect, polygons, circles?)
	//			- shapes hold an array of boundaries that are used passed to a 
	//				raycaster that is requesting a check against them?
	//				(NOT the actual shape, but an approximation, in the case of a 
	//				circle, that might be an octagon?)

	constructor(){

		//canvas 600 x 600

		this.clearOnRender = true;
		
		this.boundaries = [];
		for(var b = 0; b < data.boundaries.length; b++){
			this.boundaries[b] = new Boundary(	data.boundaries[b].x1,
												data.boundaries[b].y1,
												data.boundaries[b].x2,
												data.boundaries[b].y2);
		}

		this.useEmitter = true;

		if(this.useEmitter)
			this.emitter = new RayEmitter(300,300);
		else
			this.ray = new Ray(300, 300);

		this.canvasMouseX;
		this.canvasMouseY;

		//console.log(canvas);
		canvas.addEventListener("mousemove", (e) => {
			this.canvasMouseX = event.offsetX;
			this.canvasMouseY = event.offsetY;

			if(this.useEmitter)
				this.emitter.lookAt(this.canvasMouseX, this.canvasMouseY);
			else
				this.ray.lookAt(this.canvasMouseX, this.canvasMouseY);
		});


	}

	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{

		if(this.useEmitter){
			this.emitter.update(this.boundaries);
		}
		else{
			//THIS IS THE WAY TO CALL AN ARRAY WITH THE HELPER 'castToArray' FUNCTION
			this.ray.castToArray(this.boundaries);

			//THIS IS THE WAY TO CAST TO AN ARRAY CALLING EACH BOUNDARY ONE AT A TIME
			//(call clear = true on first and then false on all others)
			/*for(var b = 0; b < this.boundaries.length; b++){
				if(b == 0)
					this.ray.cast(this.boundaries[b], true);
				else
					this.ray.cast(this.boundaries[b], false);
			}*/
		}

		

		
		
			
	}

	render = () =>{
		//console.log('renderRunning');
		//check if we are to clear the BG on each render
		if(this.clearOnRender){
			//clear BG
			context.clearRect(0, 0, canvas.width, canvas.height);
		}
		//console.log(context);
		context.save();
		//_____________________
		//draw elements


		//draw boundaries
		for(var b = 0; b < this.boundaries.length; b++){
			this.boundaries[b].draw();
		}

		
		if(this.useEmitter)
			this.emitter.draw();
		else
			this.ray.draw();

		//_____________________
		context.restore();
	}
}

class RayEmitter{
	constructor(_x = 0, _y = 0, _numRays = 1, _fov = 0){
		this.pos = new Vector2(_x, _y);
		this.dir = new Vector2(1,1);

		this._rays = [];

		//if there is one ray, set it up to work same as a single array without emitter
		if(_numRays == 1){
			this._rays[0] = new Ray(_x, _y);
		}
		else{
			//TODO: figure out:
			//		- angle between each ray to have them cover the FOV set
			//		- function to calculate a 'look at' value (that takes
			//			into account the angle offset from the emitter's 'lookAt'
			//			direction)

/*

// angle in radians
var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

// angle in degrees
var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

*/
		}


	}

	lookAt = function(_x, _y){
		

		//TODO: adjust the angles of the rays within the emitter
		if(this._rays.length == 1){
			//just one ray means that the emitter functions the same as 
			//the base Ray class

			//pass the look at object through to the ONE RAY
			this._rays[0].lookAt(_x, _y);
		}
		else{
			//set the Emitters direction (center of FOV)
			this.dir.x = _x - this.pos.x;
			this.dir.y = _y - this.pos.y;
			this.dir.normalize();

			//*****MORE WILL NEED TO BE DONE HERE>>>>>
		}

	}

	update = function(_bArray){
		for(var r = 0; r < this._rays.length; r++){
			this._rays[r].castToArray(_bArray);
		}
	}

	draw = function(){

		for(var r = 0; r < this._rays.length; r++){
			this._rays[r].draw();
		}
	}
}

class Boundary{
	constructor(_x1, _y1, _x2, _y2){
		this.a = new Vector2(_x1, _y1);
		this.b = new Vector2(_x2, _y2);

		this.drawEndpoints = false;
	}

	draw = function(){

		context.fillStyle = 'white';
		context.strokeStyle = 'white';
		context.lineWidth = 1;


		context.beginPath();
		context.moveTo(this.a.x, this.a.y);
		context.lineTo(this.b.x, this.b.y);
		context.stroke();

		if(this.drawEndpoints){
			context.beginPath();
			context.arc(this.a.x, this.a.y, 4, 0, Math.PI *2);
			context.fill();

			context.beginPath();
			context.arc(this.b.x, this.b.y, 4, 0, Math.PI *2);
			context.fill();
		}

	}
}

class Vector2{
	constructor(_x, _y){
		this.x = _x;
		this.y = _y;
		//this.mag = this.getMag();
	}

	//V2 to V2 division, taking in the V2 to divide the current V2 BY
	//RETURN A NEW VECTOR (current is NOT changed)
	divide = function(_v2){
		return new Vector2(this.x / _v2.x, this.y / _v2.y);
	}

	//V2 to V2 multiplication, taking in the V2 to multiply the current V2 with
	//RETURN A NEW VECTOR (current is NOT changed)
	multiply = function(_v2){
		return new Vector2(this.x * _v2.x, this.y * _v2.y);
	}

	//returns the magnitude of the current V2
	getMag = function(){
		return Math.sqrt( (this.x * this.x) + (this.y * this.y) );
	}

	//calculates normalized values for the current V2 (AND SETS THEM)
	normalize = function(){
		var mag = this.getMag();
		this.x /= mag;
		this.y /= mag;
	}

	setMag = function(_m){
		//first, normalize the current V2
		this.normalize();
		//then multiply the current X/Y by requested magnitude
		this.x *= _m;
		this.y *= _m;
	}
}



class Ray{
	constructor(_x = 0, _y = 0){
		this.pos = new Vector2(_x, _y);
		this.dir = new Vector2(1,1);

		//TESTING
		/*console.log('dir(start): ', this.dir.x + ', ' + this.dir.y);
		this.dir.normalize();
		console.log('dir(mid): ', this.dir.x + ', ' + this.dir.y);
		this.dir.setMag(1.414213563);
		console.log('dir(end): ', this.dir.x + ', ' + this.dir.y);*/

		//calc vars
		this.x1;
		this.y1;
		this.x2;
		this.y2;
		this.x3;
		this.y3;
		this.x4;
		this.y4;

		//TODO: this could be DETECT layers or IGNORE layers
		//		(depends on the functionality)
		this.ignoreLayers = [];

		this.closestPoint = undefined;
		this.closestDist = 99999999;

	}

	lookAt = function(_x, _y){
		this.dir.x = _x - this.pos.x;
		this.dir.y = _y - this.pos.y;
		this.dir.normalize();
	}

	distanceTo = function(_v2){
		var xDif = Math.abs(this.pos.x - _v2.x);
		var yDif = Math.abs(this.pos.y - _v2.y);
		return Math.sqrt( (xDif * xDif) + (yDif * yDif) );
	}

	cast = function(_b, _clear = true, _rcLayer = ""){

		if(_clear){
			this.closestPoint = undefined;
			this.closestDist = 99999999;
		}

		//populate the vars with correct values
		//(readability)
		this.x1 = _b.a.x;
		this.y1 = _b.a.y;
		this.x2 = _b.b.x;
		this.y2 = _b.b.y;
		this.x3 = this.pos.x;
		this.y3 = this.pos.y;
		this.x4 = this.pos.x + this.dir.x;
		this.y4 = this.pos.y + this.dir.y;

		//formula to determine if the ray intersects the boundary
		//			1) YES or NO
		//			2) if so, what is the point of intersection

		var denom = (this.x1-this.x2) * (this.y3-this.y4) - (this.y1-this.y2) * (this.x3-this.x4);
		//if this is zero, the lines are parallel and will never intersect
		if(denom == 0)
			return this.closestPoint;

		//if not zero, continue
		var t = ((this.x1-this.x3) * (this.y3-this.y4) - (this.y1-this.y3) * (this.x3-this.x4)) / denom;
		var u = -(((this.x1-this.x2) * (this.y1-this.y3) - (this.y1-this.y2) * (this.x1-this.x3)) / denom);

		if(t > 0 && t < 1 && u > 0){
			//if there is an intersection store it in the newPoint var
			var newPt = new Vector2();
			//calculate its X/Y
			newPt.x = this.x1 + t * (this.x2 - this.x1);
			newPt.y = this.y1 + t * (this.y2 - this.y1);
			//if there is no stored closest point OR if this one is closer than the best so far...
			if(this.closestPoint == undefined || this.distanceTo(newPt) < this.closestDist){
				this.closestPoint = newPt;
				this.closestDist = this.distanceTo(newPt);
			}
			//else, this one is not better, skip on
		}

		return this.closestPoint;

	}

	castToArray = function(_bArray, _rcLayer = ''){
		//each call to castToArray clears any past closest point/dist
		this.closestPoint = undefined;
		this.closestDist = 99999999;

		for(var b = 0; b < _bArray.length; b++){
			//call cast on each boundary in the incoming array 
			//(specifying false for DO NOT CLEAR, so it keeps a running "best")
			this.cast(_bArray[b], false);
		}		
	}

	draw = function(){

		context.fillStyle = 'white';
		context.strokeStyle = 'white';
		context.lineWidth = 1;

		context.beginPath();
		context.moveTo(this.pos.x, this.pos.y);
		context.lineTo(this.pos.x + (this.dir.x * 50), this.pos.y + (this.dir.y * 50));
		context.stroke();

		context.beginPath();
		context.arc(this.pos.x, this.pos.y, 4, 0, Math.PI *2);
		context.fill();

		if(this.closestPoint != undefined){

			context.beginPath();
			context.fillStyle = 'red';
			context.arc(this.closestPoint.x, this.closestPoint.y, 4, 0, Math.PI *2);
			context.fill();

			context.beginPath();
			context.fillStyle = 'white';
			context.font = "20px Arial";
			context.fillText('CLOSEST: ' + Math.round(this.closestPoint.x) + ', ' + Math.round(this.closestPoint.y), 30, 30);
			context.stroke();
		}
	}
}

const data = {


boundaries: [
{x1: 100, y1: 100, x2: 300, y2: 100},
{x1: 550, y1: 150, x2: 550, y2: 550},
{x1: 100, y1: 350, x2: 300, y2: 550},
{x1: 500, y1: 200, x2: 500, y2: 500}
]


};