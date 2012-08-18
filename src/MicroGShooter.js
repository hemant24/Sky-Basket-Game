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
	
	var getAngle = function (x,y){
		var angle = Math.atan2(-x,y)* (180/Math.PI);
		var offset = 270;
		if(angle<0){
			angle = 360+angle;
		}
		return (angle+offset)%360;
	}

	
	p.initialize = function(stage, world){
	    var body = new Container();
		var ballSkin = new Bitmap('./assets/shooter.png');
		ballSkin.name = "ball"
		var arrowSkin  = new Bitmap('./assets/arrow.png');
		arrowSkin.name = "arrow"
		arrowSkin.rotation = 0;
		ballSkin.regX = radius;
		ballSkin.regY = radius;
		ballSkin.x =0;
		ballSkin.y = 0;
		ballSkin.alpha=0.7;
		this.skin = body;
		
		body.addChild(ballSkin);
		body.addChild(arrowSkin);
		
			
		stage.addChild(body);
		
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
									var move = false;
									var rotate = false;
									
									if(shooter.body.GetUserData().ball){
										if(shooter.body.GetUserData().ball.lock){
											rotate=true;
											move = false;
										}else{
											move = true;
											rotate= false;
										}
										
									}else{
										move = true;
										rotate= false;
									}
									if(move){
										shooter.body.SetPosition(new b2Vec2(e.stageX*CONST.pixelToMeter,e.stageY*CONST.pixelToMeter))
										shooter.skin.x = e.stageX;
										shooter.skin.y = e.stageY;
									}
									if(rotate){
										var lockEvent = shooter.body.GetUserData().ball.lockEvent ;
										//console.log(e);
										var x = e.stageX - lockEvent.stageX  ;
										var y =  e.stageY - lockEvent.stageY ;
										console.log('x: '+x);
										console.log('y: '+y);
									
										console.log(getAngle(x,y));
										var angle = getAngle(x,y)
										//console.log( 'angle is '  + angle)
										var arrowSkin = null;
										for(var part in shooter.skin.children){
											if(part.name="arrow"){
												
											}
										}
										shooter.skin.children[1].rotation=getAngle(x,y);
										//console.log( Math.atan2(e.stageX,e.stageY) * (180/Math.PI));
										shooter.body.GetUserData().ball['force'] = new b2Vec2(-x*3 , -y*3)
										//console.log('rotating .. ' +(a-b));
										
									}
										//console.log(shooter);
								}
							}(this);
							
		stage.onMouseUp = function(shooter){
								return function(e){
									if(shooter.body.GetUserData().ball){
										if(shooter.body.GetUserData().ball.lock){
											var b = shooter.body.GetUserData().ball;
											b.ApplyImpulse(shooter.body.GetUserData().ball['force'], b.GetWorldCenter());
											shooter.body.GetUserData().ball['lock']=false
											//shooter.body.GetUserData().ball=null;
											
										}else{
										//	shooter.body.GetUserData().ball['lock']=true I think not required
										}
										
									}
								}
							}(this); 
		
		stage.onMouseDown  = function(shooter){
								return function(e){
									if(shooter.body.GetUserData().ball){
										shooter.body.GetUserData().ball['lock']=true
										shooter.body.GetUserData().ball['lockEvent'] = e;
									}
								}
							}(this); 
		//console.log(this.skin);
	}
	
	p.update = function(){

		if(this.body.GetUserData().ball){
			var b = this.body.GetUserData().ball;
			//console.log('h'+b.GetLinearVelocity().y);
			//b.ApplyForce(new b2Vec2(0 , -150),b.GetWorldCenter());
			this.body.GetUserData().ball["oldVelocity"]  = b.GetLinearVelocity();
			b.SetLinearVelocity(new b2Vec2( (1/2)*b.GetLinearVelocity().x,(1/2)*b.GetLinearVelocity().y));
		}
	}



window.MicroGShooter = MicroGShooter;	
}(window));