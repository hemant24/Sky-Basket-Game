(function(window){
	var SkyBasketGame = function(){};
	/*public variables will attached to P */
	var P = SkyBasketGame.prototype;
	
	
	/*private variables*/
	var canvas,debugCanvas,debugCanvas,stage,world,
	setup = (function($this){
		var Public={};
		Public.canvas = function(){
			canvas = document.getElementById('canvas');
			debugCanvas = document.getElementById('debugCanvas');
			context = canvas.getContext('2d');
			debugCanvas = debugCanvas.getContext('2d');
			stage = new Stage(canvas);
			stage.enableMouseOver(10); 
			stage.snapPixelsEnabled = true;
		};
		Public.ticker = function(){
			Ticker.setFPS(30);
			Ticker.useRAF = true;
			Ticker.addListener($this); 	
		};
		Public.createWorld = function(){
			world = new World(debugCanvas,stage);
		}
		Public.createMicroGShooter = function(){
			new MicroGShooter(stage, world.b2dWorld); //initialization will do all the work till now
		}
		return Public;
	}(P));
	/*end private variables*/
	
	P.startGame = function(){
		setup.canvas();
		setup.ticker();
		setup.createWorld();
		setup.createMicroGShooter();
		//setup level
		
	}
	
	P.tick = function(){
		//console.log(canvas);
		//get input
		world.update();
		stage.update();
		
	}
	
	window.SkyBasketGame = SkyBasketGame;
}(window))
