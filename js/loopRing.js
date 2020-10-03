class LoopRing{
	constructor(_elementSize, _elementShape = 'square', _ringPadding = 0){
		this.eSize = _elementSize;
		//this.eSpacing = _elementSpacing;
		this.eShape = _elementShape;
		this.ringPadding = _ringPadding;

		this.elementsWide;
		this.elementsHigh;

		if(this.eShape == 'circle'){
			this.elementsWide = Math.floor(canvas.width / (this.eSize *2));
			this.elementsHigh = Math.floor(canvas.height / (this.eSize *2));
		}
		else if(this.eShape == 'square'){
			this.elementsWide = Math.floor(canvas.width / this.eSize);
			this.elementsHigh = Math.floor(canvas.height / (this.eSize));
		}
		else{
			console.log('unexpected element shape in loop ring');
		}

		this.elements;
		this.initLoop();

		this.loopIndex;
	}

	initLoop = function(){

		this.elements = [];

		var ele;

		if(this.eShape == 'circle'){

			for(var et = 0; et < this.elementsWide; et++){
				ele = new RingElement('circle', this.eSize, (et * this.eSize * 2) + this.eSize, this.eSize);
				this.elements.push(ele);
			}
		}
		else if(this.eShape == 'square'){
			//TOP ROW (L --> R)
			for(var et = 0; et < this.elementsWide; et++){
				
				ele = new RingElement('square', this.eSize, et * this.eSize, 0);
				this.elements.push(ele);
			}
			//THEN DOWN RIGHT SIDE
			for(var er = 1; er < this.elementsHigh; er++){
				ele = new RingElement('square', this.eSize, canvas.width - this.eSize, er * this.eSize);
				this.elements.push(ele);
			}
			//BOTTOM ROW (R --> L)
			for(var eb = this.elementsWide -2; eb >= 0; eb--){
				
				ele = new RingElement('square', this.eSize, eb * this.eSize, canvas.height - this.eSize);
				this.elements.push(ele);
			}
			//BACK UP LEFT SIDE
			for(var el = this.elementsHigh -2; el >= 1; el--){
				ele = new RingElement('square', this.eSize, 0, el * this.eSize);
				this.elements.push(ele);
			}

		}
		
		this.loopIndex = 0;
	}

	render = function(){

		context.clearRect(0, 0, canvas.width, canvas.height);

		

		//ACTIVATE THE CURRENT ELEMENT
		this.elements[this.loopIndex].activate();

		//INCREMENT AND CONSTRAIN THE INDEX
		this.loopIndex ++;
		if(this.loopIndex >= this.elements.length){
			this.loopIndex = 0;
		}

		//DRAW ALL ELEMENTS (THEY WILL HANDLE LOSING OPACITY)
		for(var e = 0; e < this.elements.length; e++){
			this.elements[e].draw();
		}
	}
}

class RingElement{
	constructor(_shape, _size, _x, _y){

		//shapes are either circle or square
		this.shape = _shape;
		//size is either the width AND height... OR, the radius
		//(depending on the shape)
		this.size = _size;
		this.x = _x;
		this.y = _y;

		//TODO: hold a color and opacity
		//		(will come to maxOpacity and then fade out at a certain rate)
		this.opacity = 0;
		this.lostOpacity = .2;

	}

	activate = function(){
		this.opacity = 1;
	}

	draw = function(){
		if(this.opacity != 0){
			context.save();
			context.globalAlpha = this.opacity;
			context.beginPath();
			context.fillStyle = '#999';
			if(this.shape == 'circle'){
				context.arc(this.x, this.y, this.size, 0, Math.PI *2);
			}
			else if(this.shape == 'square'){
				context.rect(this.x +1, this.y +1, this.size -2, this.size -2);
			}
			context.fill();
			context.globalAlpha = 1;
			context.restore();

			this.opacity -= this.lostOpacity;
			if(this.opacity < 0)
				this.opacity = 0;
		}
	}
}