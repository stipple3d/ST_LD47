class InputHandler{
	constructor(){
		this.leftPressed = false;
		this.rightPressed = false;
		this.spacePressed = false;

		//currently respods to WASD and arrow keys, but will flag a direction false 
		//when EITHER key reprenting that direction is RELEASED
		//(could either keep track of last pressed or track each key and then have a 
		//	method to get 'leftPressed' and 'rightPressed' that checks if either key is pressed in 
		//	that direction)

		//if I use WASD (and others) in addition, will this assume that only one is 
		//used? (so, if upArrow is pressed and then W is pressed and then upArrow is 
		//released... is "up" NO LONGER PRESSED?)

		//TODO: what about a 'type' that keeps track of the last type of keys that was
		//		pressed (in above example, up would still be active, because W was last pressed 
		//		and the released key was an arrow...???)

		document.onkeydown = (e) =>{
			if(e.key == 'ArrowLeft' || e.key == 'a')
				this.leftPressed = true;
			else if(e.key == 'ArrowRight' || e.key == 'd')
				this.rightPressed = true;
			else if(e.code == 'Space')
				this.spacePressed = true;
		};

		document.onkeyup = (e) =>{
			if(e.key == 'ArrowLeft' || e.key == 'a')
				this.leftPressed = false;
			else if(e.key == 'ArrowRight' || e.key == 'd')
				this.rightPressed = false;
			else if(e.code == 'Space')
				this.spacePressed = false;
		};

	}
}