class GameLoop{
	constructor(_renderCB, _updateCB, _fps = 60){
		this.fps = _fps
		this.renderCB = _renderCB;
		this.updateCB = _updateCB;
		this.accTime = 0;
		this.lastTime;
		//translate the requested FPS to SECONDS (per frame) between UPDATES (not renders)
		//from here this is "deltaTime"
		this.dt = 1 / this.fps; // for 60 FPS, this will be 1/60 = .0166666r
		//ref to the 'requestAnimationFrame' (for use in canceling it on a stop call)
		this.raf;
		this.updated = false;
	}
	//NOTE: 'time' is coming from the requestAnimationFrame (ms since the game was loaded)
	processFrame = (time) => {
		//console.log('accTime (start): ', this.accTime);
		this.accTime += (time - this.lastTime) /1000;
		//console.log('accTime (added): ', this.accTime);

		while(this.accTime >= this.dt){
			//console.log('accTimeBigEnough');
			if(this.updateCB != undefined){
				//console.log('callingUpdate');
				this.updateCB(this.dt);//passing out DeltaTime in the update
			}
			this.accTime -= this.dt;
			this.updated = true;
		}
		if(this.updated){
			if(this.renderCB != undefined){
				this.renderCB();
			}
			this.updated = false;
		}
		this.lastTime = time;
		this.requestAFrame();
	}
	start = function(){
		this.lastTime = window.performance.now();
		this.requestAFrame();
	}
	requestAFrame = function(){
		//console.log('RAF');
		this.raf = window.requestAnimationFrame(this.processFrame);
	}
	stop = function(){
		window.cancelAnimationFrame(this.raf);
	}
}