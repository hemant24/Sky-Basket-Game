(function(window){

	/*private variables */
	
	var skinRadius = 50;
	var radius = 38; //sensor radius
	var name = "Shooter";
	var arrowHeight = 12.5;
	var arrowIndex = 1;
	var circleAlpha = 0.7;
	var arrowAlpha ; //not using currently
	
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

	/*end private variables */
	function MicroGShooter(stage , world){
		this.skin=null;
		this.body =null;
		this.initialize(stage,world);
	}
	
	var p = MicroGShooter.prototype ;
	
	p.initialize = function(stage, world){
	    var shooterSkin = new Container();
		var cirlceSkin = new Bitmap('./assets/shooter.png');
		cirlceSkin.name = "ball"
		var arrowSkin  = new Bitmap('./assets/arrow.png');
		arrowSkin.name = "arrow"
		arrowSkin.rotation = 0;
		arrowSkin.scaleX =0;
		arrowSkin.regY = arrowHeight;
		cirlceSkin.regX = skinRadius;
		cirlceSkin.regY = skinRadius;
		cirlceSkin.x =0;
		cirlceSkin.y = 0;
		cirlceSkin.alpha=circleAlpha;
		
		
		shooterSkin.addChild(cirlceSkin);
		shooterSkin.addChild(arrowSkin); //Hemant it need to be there at index 1 okay..
		arrowIndex = 1;
		
		this.skin = shooterSkin;
		stage.addChild(shooterSkin);
		
		var fixDef = new b2FixtureDef();
		fixDef.friction = 0;
		fixDef.restitution = 0;
		fixDef.isSensor = true;
		fixDef.shape = new b2CircleShape(radius*CONST.pixelToMeter);
		
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_kineticBody;
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
										var x = e.stageX - lockEvent.stageX  ;
										var y =  e.stageY - lockEvent.stageY ;
										var angle = getAngle(x,y);
										var length = Math.sqrt( Math.pow(x,2) + Math.pow(y,2))
										shooter.skin.children[arrowIndex].scaleX = length/100;
										shooter.skin.children[arrowIndex].rotation=getAngle(x,y);
										shooter.body.GetUserData().ball['force'] = new b2Vec2(-x*3 , -y*3);
									}
								}
							}(this);
							
		stage.onMouseUp = function(shooter){
								return function(e){
									if(shooter.body.GetUserData().ball){
										if(shooter.body.GetUserData().ball.lock){
											var b = shooter.body.GetUserData().ball;
											shooter.skin.children[arrowIndex].scaleX = 0;
											b.ApplyImpulse(shooter.body.GetUserData().ball['force'], b.GetWorldCenter());
											shooter.body.GetUserData().ball['lock']=false;
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
	}
	p.update = function(){
		if(this.body.GetUserData().ball){
			var b = this.body.GetUserData().ball;
			this.body.GetUserData().ball["oldVelocity"]  = b.GetLinearVelocity();
			b.SetLinearVelocity(new b2Vec2( (1/2)*b.GetLinearVelocity().x,(1/2)*b.GetLinearVelocity().y));
		}else{
			if(this.skin.children[arrowIndex].scaleX!=0)
				this.skin.children[arrowIndex].scaleX = this.skin.children[arrowIndex].scaleX/10;
		}
	}



window.MicroGShooter = MicroGShooter;	
}(window));