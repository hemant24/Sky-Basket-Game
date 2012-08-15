(function(window){

	var radius = 50;
	var name = "Shooter";
	
	function MicroGShooter(stage , world){
		this.skin=null;
		this.body =null;
		this.initialize(stage,world);
	}
	
	var p = MicroGShooter.prototype ;


	var handleMouseDown = function(e){
		//console.log('MicroG Mouse Down');
	}
	var handleMouseUp = function(){
		//console.log('MicroG Mouse Up');
	}
	
		
	var setUserData= function(body){
		body.SetUserData({
			name : name
		})
	}
	

	
	p.initialize = function(stage, world){
		var bmp = new Bitmap('./assets/shooter.png');
		bmp.regX = radius;
		bmp.regY = radius;
		bmp.x =	0;
		bmp.y = 0;
		bmp.alpha=0.7;
		this.skin = bmp;
		
		stage.addChild(bmp);
		
		var fixDef = new b2FixtureDef();
		//fixDef.density = 1.0;
		fixDef.friction = 0;
		fixDef.restitution = 0;
		fixDef.isSensor = true;
		fixDef.shape = new b2CircleShape(38*CONST.pixelToMeter);
		
		var bodyDef = new b2BodyDef();
		//bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.type = b2Body.b2_kineticBody;
		/* will get from mouse mouse event 
		bodyDef.position.x = bmp.x*CONST.pixelToMeter; 
		bodyDef.position.y = bmp.y*CONST.pixelToMeter;
		*/
		
		this.body = world.CreateBody(bodyDef);
		this.body.CreateFixture(fixDef);
		setUserData(this.body);
		
		/*Event handler*/
		stage.onMouseMove = function(shooter){
								return function(e){
									shooter.body.SetPosition(new b2Vec2(e.stageX*CONST.pixelToMeter,e.stageY*CONST.pixelToMeter))
									shooter.skin.x = e.stageX;
									shooter.skin.y = e.stageY;
									//console.log(shooter);
								}
							}(this);
		stage.onMouseUp = handleMouseUp;
		stage.onMouseDown  = handleMouseDown;
		//console.log(this.skin);
	}
	



window.MicroGShooter = MicroGShooter;	
}(window));