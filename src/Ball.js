(function(window){

	var radius = 38;
		
	function Ball(x, y , stage , world){
		this.skin=null;
		this.body =null;
		this.initialize(x, y ,stage,world);
	}
	
	var p = Ball.prototype ;

	
	

	
	p.initialize = function(x,y ,stage, world){
		var bmp = new Bitmap('./assets/blackBall.png');
		bmp.regX = radius;
		bmp.regY = radius;
		bmp.x=x;
		bmp.y=y;
		this.skin = bmp;
		
		stage.addChild(bmp);
		
		var fixDef = new b2FixtureDef();
		fixDef.density = 1.0;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.5;
		fixDef.shape = new b2CircleShape(38*CONST.pixelToMeter);
		
		var bodyDef = new b2BodyDef();
			bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.x = bmp.x*CONST.pixelToMeter; 
		bodyDef.position.y = bmp.y*CONST.pixelToMeter;
	
		this.body = world.CreateBody(bodyDef);
		this.body.CreateFixture(fixDef);
		this.skin.body = this.body;
		
		
	}
	
	p.update = function(){
		//console.log(p.skin.y);
		this.skin.rotation = this.body.GetAngle() * (180 / Math.PI);
		this.skin.x = this.body.GetWorldCenter().x * CONST.meterToPixel;
		this.skin.y = this.body.GetWorldCenter().y * CONST.meterToPixel;
	}


window.Ball = Ball;	
}(window));