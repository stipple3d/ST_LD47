class Game{
	constructor(_defaultLevel = 0){

		//TODO:

		//1) need the ability to load levels in from the game data, edit the loopshoot positions and elements
		//		and then exportDump text out to a div for copy paste back into the gameData.
		//		(the level can then be played through the game itself)

		//2) need the ability to change the canvas size (for various game play options?) in each level. 
		//		(always stays centered and UI needs to adjust and snap accordingly)

		//2B) this will require game code to change to accomodate the changing W/H and handle physics correctly

		//3) editor STATES:
		//		- menu: level select (within range of what is available)
		//		- editing
		//		- exporting (shows text and then waits for input)

		//4) ADD LOOPSHOOT
		//		- make selected
		//		- make sure it doesn't break anything if there are no points in a loopshoot

		//5) NEW LEVEL (from menu screen)
		//		- make sure having no loopshoots doesn't break anything 
		//			(maybe show a simple message if there are none)

		//6) mouse click (with SHIFT) to place new points in a Loopshoot
		//7) mouse click (with CTRL) to place new Loopshoot

		//8) key to GENERATE export code (not a different state, just spits out code into div
		//		and leaves what you had on screen as is... so, you could copy paste a save and 
		//		then make an option quickly)

		//9) FORMAT THE EXPORT DUMP WITH BREAKS SO IT PASTES IN CORRECTLY?

		canvas.width = 600;
		canvas.height = 660;

		this.editorState = 'menu';

		//can be true to have all loopshoots show (vs only selected/editing one)
		this.showAll = false;

	//***** GENERAL

		this.levelIndex = _defaultLevel;

	//***** BALLS

		//even though we are not having balls shown int he editor, we still need the setting for what the size is
		this.ballRadius = 10;

	//***** LOOPSHOOTS

		//loopShoot(s) array
		this.loopShoots = [];

		this.loopshootBeingEdited = 0;

		this.exportText = '';

	}

	setupLevel = function(){

		this.loopShoots = [];

		//populate the array from the data
		for(var s = 0; s < levels[this.levelIndex].loopshoots.length; s++){
			//just pass in the level and the LoopShoot's index 
			//and it will pull the rest from data
			this.loopShoots[s] = new LoopShoot(this.levelIndex, s, this.ballRadius);
			if(s == this.loopshootBeingEdited)
				this.loopShoots[s].isBeingEdited = true;
		}

	}

	keyPressed = function(_key){

		if(this.editorState == 'menu'){
			if(_key == 'ArrowLeft' && this.levelIndex > 0){
				this.levelIndex --;
			}
			else if(_key == 'ArrowRight' && this.levelIndex < levels.length -1){
				this.levelIndex ++;
			}
			else if(_key == 'Space'){
				//START LEVEL
				this.setupLevel();
				this.editorState = 'edit';
			}
		}
		else if(this.editorState == 'edit'){
			if(_key == 'Space'){
				//Toggle Show All
				this.showAll = !this.showAll;
			}
			else if(_key == 'w'){
				//NEXT LOOPSHOOT

				//stop editing current loopshoot
				this.loopShoots[this.loopshootBeingEdited].isBeingEdited = false;

				//increment and constrain index
				if(this.loopshootBeingEdited +1 >= this.loopShoots.length)
					this.loopshootBeingEdited = 0;
				else
					this.loopshootBeingEdited ++;

				//activate editing on next loopshoot
				this.loopShoots[this.loopshootBeingEdited].isBeingEdited = true;

			}
			else if(_key == 's'){
				//PREVIOUS LOOPSHOOT

				//stop editing current loopshoot
				this.loopShoots[this.loopshootBeingEdited].isBeingEdited = false;

				//decrement and constrain index
				if(this.loopshootBeingEdited <= 0)
					this.loopshootBeingEdited = this.loopShoots.length -1;
				else
					this.loopshootBeingEdited --;

				//activate editing on next loopshoot
				this.loopShoots[this.loopshootBeingEdited].isBeingEdited = true;

			}
			else if(_key == 'a'){
				//PREVIOUS POINT IN LOOPSHOOT
				this.loopShoots[this.loopshootBeingEdited].previousPoint();
			}
			else if(_key == 'd'){
				//NEXT POINT IN LOOPSHOOT
				this.loopShoots[this.loopshootBeingEdited].nextPoint();
			}
			else if(_key == 'p'){
				//TOGGLE POINTS EDIT (vs. COLLECTION POINT)
				this.loopShoots[this.loopshootBeingEdited].editingPoints = !this.loopShoots[this.loopshootBeingEdited].editingPoints;
			}
			else if(_key == 'y'){
				//ADD POINT TO LOOPSHOOT (will place at canvas center, added to END of the points)
				this.loopShoots[this.loopshootBeingEdited].addPoint();
			}
			else if(_key == 'g'){
				//EXPORT DUMP LEVEL DATA AS IS (stay in edit mode)
				this.exportDumpLevel();
			}
		}

	}

	exportDumpLevel = function(){

		this.exportText = '{title: \'' + 'NEW LEVEL' + '\', ballSpeed: ' + 200 + ', ballsToStart: ' + 1 + ', levelWidth: ' +
							600 + ', levelHeight: ' + 660 + ', topPadding: ' + 0 + ', bottomPadding: ' + 0 + ', loopshoots: [';

		var shootText;					

		for(var s = 0; s < this.loopShoots.length; s ++){
			this.exportText = this.exportText.concat('{cpX: ' + this.loopShoots[s].collectPosition.x +
						 ', cpY: ' + this.loopShoots[s].collectPosition.y + 
						 ', cpRadius: ' + this.loopShoots[s].collectRadius + 
						 ', movePoints: [');
			
			for(var sp = 0; sp < this.loopShoots[s].points.length; sp++){
				this.exportText = this.exportText.concat('{cX: ' + this.loopShoots[s].points[sp].x + ', cY: ' + this.loopShoots[s].points[sp].y + '},');
			}

			//TODO: remove release angle since it is being calculated automatically?
			this.exportText = this.exportText.concat('], releaseAngle: ' + 80 + '},');

		}
		this.exportText = this.exportText.concat(']},');

		console.log(this.exportText);
		

		exportDump.innerHTML = "" + this.exportText;
		console.log(exportDump.innerHTML);

	}


	//NOTE: _dt is coming from gameLoop
	update = (_dt) =>{

		if(this.editorState == 'menu'){

		}
		else if(this.editorState == 'edit'){

			//UPDATE LOOPSHOOTS
			for(var s = 0; s < this.loopShoots.length; s++){
				this.loopShoots[s].update(_dt);
			}

		}
		else if(this.editorState == 'export'){
			
		}

		
		
	}

	render = () =>{

		//clear the canvas each render
		context.clearRect(0, 0, canvas.width, canvas.height);

		//render player at current position each render
		context.save();


		if(this.editorState == 'menu'){

			context.beginPath();
			context.textAlign = "center";


			context.fillStyle = '#8ac80b';

			context.font = "80px Luckiest Guy";
			context.fillText('LoopShoots', canvas.width /2, 170);

			context.fillStyle = 'white';
			context.font = "32px Arial";
			context.fillText('by Stipple3D', canvas.width /2 + 120, 210);

			if(levels.length > 1){
				if(this.levelIndex != 0){
					context.font = "60px Arial";
					context.fillText('<', canvas.width /2 - 120, 400);
				}
				
				context.font = "60px Luckiest Guy";
			 	context.fillStyle = '#8ac80b';
				context.fillText(this.levelIndex.toString(), canvas.width /2, 400);

				if(this.levelIndex < levels.length -1){
					context.font = "60px Arial";
					context.fillStyle = 'white';
					context.fillText('>', canvas.width /2 + 120, 400);
				}

				context.fillStyle = 'white';
				context.font = "18px Arial";
				context.fillText('SELECT A LEVEL (LEFT/RIGHT)', canvas.width /2, 440);
			}

			context.fillStyle = '#8ac80b';
			context.font = "24px Arial";
			context.fillText('< SPACE BAR >    TO START', canvas.width /2, 580);

		}
		else if(this.editorState == 'edit'){

			context.beginPath();
			context.textAlign = "center";

			context.fillStyle = '#8ac80b';
			context.font = "20px Arial";
			context.fillText('< A/D > Cycle Points', canvas.width /2, canvas.height - 160);
			context.fillText('< W/S > Cycle Loopshoots', canvas.width /2, canvas.height - 120);
			context.fillText('< ARROWS > Position Selected Element', canvas.width /2, canvas.height - 80);
			context.fillText('< SPACE > Toggle Show All', canvas.width /2, canvas.height - 40);
			
			//DRAW LOOPSHOOTS
			for(var s = 0; s < this.loopShoots.length; s++){
				this.loopShoots[s].draw();
			}

		}
		else if(this.editorState == 'export'){
			
		}





		/*if(this.gameOver){

			context.beginPath();
			context.textAlign = "center";

			context.font = "80px Luckiest Guy";
			context.fillStyle = '#8ac80b';
			context.fillText('GAME OVER', canvas.width /2, 270);

			context.fillStyle = 'white';

			context.font = "48px Luckiest Guy";
			context.fillText('LoopShoots', canvas.width /2, 100);
			context.fillText('SCORE:  ' + this.score, canvas.width /2, 450);

			context.font = "20px Arial";
			context.fillText('< SPACE BAR >    TO PLAY AGAIN', canvas.width /2, canvas.width - 50);
			context.fillText('by Stipple3D', canvas.width /2 + 80, 125);
			
		}
		else if(this.intro){
			
			context.beginPath();
			context.textAlign = "center";


			context.fillStyle = '#8ac80b';

			context.font = "80px Luckiest Guy";
			context.fillText('LoopShoots', canvas.width /2, 170);

			context.fillStyle = 'white';
			context.font = "32px Arial";
			context.fillText('by Stipple3D', canvas.width /2 + 120, 210);

			

			context.font = "18px Arial";
			context.fillText('1) MOVE LEFT / RIGHT  (ARROWS, WASD)', canvas.width /2, 340);
			context.fillText('2) KEEP AS MANY BALLS UP AS YOU CAN', canvas.width /2, 390);
			context.fillText('3) POINTS AND EXTRA BALLS FOR TIME SPENT', canvas.width /2, 440);
			context.fillText('IN THE  "LOOPSHOOTS"', canvas.width /2, 465);

			context.fillStyle = '#8ac80b';
			context.font = "24px Arial";
			context.fillText('< SPACE BAR >    TO START', canvas.width /2, 580);
		}
		else{

			//RENDER LOOPSHOOTS
			for(var s = 0; s < this.loopShoots.length; s++){
				this.loopShoots[s].draw();
			}

			//write directions on screen
			context.beginPath();

			context.fillStyle = 'white';
			context.font = "24px Luckiest Guy";

			context.fillText('SCORE:  ' + this.score, 20, 30);
			context.textAlign = "center";
			context.fillText('NEXT BALL:  ' + (this.nextFreeBall - this.timeSpentInLoop), canvas.width /2 - 10, 30);
			context.textAlign = "left";
			context.font = "14px Arial";
			context.fillText('by Stipple3D', canvas.width - 103, 47);

			context.font = "28px Luckiest Guy";
			context.fillText('LoopShoots', canvas.width - 180, 30);

			context.fillStyle = '#8ac80b';
			context.fillText('x  ' + this.ballCount, 30, 60);

			//DRAW PADDLE
			context.beginPath();
			context.fillStyle = '#8ac80b';
			context.strokeStyle = '#white';
			context.rect(this.paddlePos.x - this.paddleWidth /2, this.paddlePos.y, this.paddleWidth, this.paddleHeight);
			context.fill();
			context.stroke();
			
		}*/

		context.restore();
	}
}

