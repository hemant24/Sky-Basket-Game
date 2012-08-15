(function(window){

	var radius = 38;
	var name = "Ball";
		
	function Ball(x, y , stage , world){
		this.skin=null;
		this.body =null;
		this.initialize(x, y ,stage,world);
	}
	
	var p = Ball.prototype ;

	var handleMouseOver = function (){
		document.body.style.cursor='pointer';
		//document.body.style.cursor='url(../assets/cur.png)';
	}
	var handleMouseDown = function(e){
		var dx = e.target.x - e.stageX ;
		var dy = -1;
		
		var strength = 0;
		var dir = 0;
		if(dx<0){
			dir = -1;
			dx = dx*-1;
		}else{
			dir = 1;
		}
		//console.log(dx);
		if( 0 < dx && dx<12){
			strength = 10;
		}else if( 12 < dx && dx < 24){
			strength = 20;
		}else{
			strength = 30
		}
		
		this.body.ApplyImpulse(new b2Vec2(strength*dir, dy*150), this.body.GetWorldCenter());
	}
	var handleMouseOut = function(){
		document.body.style.cursor='default';
	}
	
	var setUserData= function(body){
		body.SetUserData({
			name : name
		})
	}
	
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
		setUserData(this.body);
		/*Event handler*/
		this.skin.onMouseOver = handleMouseOver;
		this.skin.onMouseOut = handleMouseOut;
		this.skin.onPress = handleMouseDown;
		//console.log(this.skin);
	}
	
	p.update = function(){
		//console.log(p.skin.y);
		this.skin.rotation = this.body.GetAngle() * (180 / Math.PI);
		this.skin.x = this.body.GetWorldCenter().x * CONST.meterToPixel;
		this.skin.y = this.body.GetWorldCenter().y * CONST.meterToPixel;
	}


window.Ball = Ball;	
}(window));