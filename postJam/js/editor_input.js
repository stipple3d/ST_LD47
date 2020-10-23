class InputHandler{
	constructor(){
		this.leftArrowPressed = false;
		this.rightArrowPressed = false;
		this.upArrowPressed = false;
		this.downArrowPressed = false;
		this.wPressed = false;
		this.aPressed = false;
		this.sPressed = false;
		this.dPressed = false;
		this.spacePressed = false;

		this.pPressed = false;
		this.yPressed = false;
		this.gPressed = false;
		this.nPressed = false;

		document.onkeydown = (e) =>{
			if(e.key == 'ArrowLeft' && !this.leftArrowPressed){
				this.leftArrowPressed = true;
				game.keyPressed(e.key);
			}
			else if(e.key == 'ArrowRight' && !this.rightArrowPressed){
				this.rightArrowPressed = true;
				game.keyPressed(e.key);
			}
			else if(e.key == 'ArrowUp' && !this.upArrowPressed){
				this.upArrowPressed = true;
				game.keyPressed(e.key);
			}
			else if(e.key == 'ArrowDown' && !this.downArrowPressed){
				this.downArrowPressed = true;
				game.keyPressed(e.key);
			}
			else if(e.key == 'w' && !this.wPressed){
				this.wPressed = true;
				game.keyPressed(e.key);
			}
			else if(e.key == 'a' && !this.aPressed){
				this.aPressed = true;
				game.keyPressed(e.key);
			}
			else if(e.key == 's' && !this.sPressed){
				this.sPressed = true;
				game.keyPressed(e.key);
			}
			else if(e.key == 'd' && !this.dPressed){
				this.dPressed = true;
				game.keyPressed(e.key);
			}
			else if(e.code == 'Space' && !this.spacePressed){
				this.spacePressed = true;
				game.keyPressed(e.code);
			}

			else if(e.key == 'p' && !this.pPressed){
				this.pPressed = true;
				game.keyPressed(e.key);
			}
			else if(e.key == 'y' && !this.yPressed){
				this.yPressed = true;
				game.keyPressed(e.key);
			}
			else if(e.key == 'g' && !this.gPressed){
				this.gPressed = true;
				game.keyPressed(e.key);
			}
			else if(e.key == 'n' && !this.nPressed){
				this.nPressed = true;
				game.keyPressed(e.key);
			}
		}

		document.onkeyup = (e) =>{
			if(e.key == 'ArrowLeft') this.leftArrowPressed = false;
			else if(e.key == 'ArrowRight') this.rightArrowPressed = false;
			else if(e.key == 'ArrowUp') this.upArrowPressed = false;
			else if(e.key == 'ArrowDown') this.downArrowPressed = false;
			else if(e.key == 'w') this.wPressed = false;
			else if(e.key == 'a') this.aPressed = false;
			else if(e.key == 's') this.sPressed = false;
			else if(e.key == 'd') this.dPressed = false;
			else if(e.code == 'Space') this.spacePressed = false;

			else if(e.key == 'p') this.pPressed = false;
			else if(e.key == 'y') this.yPressed = false;
			else if(e.key == 'g') this.yPressed = false;
			else if(e.key == 'n') this.nPressed = false;
		};

	}
}