class InputHandler{
	constructor(){

		this.leftPressed = false;
		this.rightPressed = false;
		this.upPressed = false;
		this.downPressed = false;

		//currently just arrows

		//if I use WASD (and others) in addition, will this assume that only one is 
		//used? (so, if upArrow is pressed and then W is pressed and then upArrow is 
		//released... is "up" NO LONGER PRESSED?)

		//TODO: what about a 'type' that keeps track of the last type of keys that was
		//		pressed (in above example, up would still be active, because W was last pressed 
		//		and the released key was an arrow...???)

		document.onkeydown = (e) =>{
			if(e.key == 'ArrowLeft')
				this.leftPressed = true;
			else if(e.key == 'ArrowRight')
				this.rightPressed = true;
			else if(e.key == 'ArrowUp')
				this.upPressed = true;
			else if(e.key == 'ArrowDown')
				this.downPressed = true;
		};

		document.onkeyup = (e) =>{
			if(e.key == 'ArrowLeft')
				this.leftPressed = false;
			else if(e.key == 'ArrowRight')
				this.rightPressed = false;
			else if(e.key == 'ArrowUp')
				this.upPressed = false;
			else if(e.key == 'ArrowDown')
				this.downPressed = false;
		};
	}
}