(function(window){

	var radius = 50;
	var name = "Test";
	
	function Test(stage , world){
		this.skin=null;
		this.body =null;
		this.initialize(stage,world);
	}
	
	var p = Test.prototype ;



		
	var setUserData= function(body){
		body.SetUserData({
			name : name
		})
	}
	

	
	p.initialize = function(stage, world){
		
		
		var fixDef = new b2FixtureDef();
		//fixDef.density = 1.0;
		fixDef.friction = 0;
		fixDef.restitution = 0;
		//fixDef.isSensor = true;
		fixDef.shape = new b2CircleShape(38*CONST.pixelToMeter);
		
		var bodyDef = new b2BodyDef();
		//bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.type = b2Body.b2_kineticBody;
	
		bodyDef.position.x = 100*CONST.pixelToMeter; 
		bodyDef.position.y = 300*CONST.pixelToMeter;
		
		
		this.body = world.CreateBody(bodyDef);
		this.body.CreateFixture(fixDef);
		setUserData(this.body);
	}
	



window.Test = Test;	
}(window));