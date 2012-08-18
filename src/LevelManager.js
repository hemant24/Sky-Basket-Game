(function(window){

var LevelManager = function(world,easelStage){
	this.initialize(world,easelStage);

};
var b2dworld;
var stage;
var canvasHeight;
var canvasWidth;

var P = LevelManager.prototype;

P.initialize =function(world,easelStage){
	
	b2dworld = world;
	stage = easelStage;
	canvasHeight = stage.canvas.height;
	canvasWidth = stage.canvas.width;
	console.log('level manager is up');
}

P.nextLevel=function(){
			var levelObjects = [];
			var floorFixture = new b2FixtureDef;
			floorFixture.density = 1;
			floorFixture.restitution = 0;
			floorFixture.shape = new b2PolygonShape;
			floorFixture.shape.SetAsBox( (canvasWidth/2) *CONST.pixelToMeter, 10 *CONST.pixelToMeter);
			var floorBodyDef = new b2BodyDef;
			floorBodyDef.type = b2Body.b2_staticBody;
			floorBodyDef.position.x = (canvasWidth/2)*CONST.pixelToMeter;
			floorBodyDef.position.y = canvasHeight *CONST.pixelToMeter;
			var floor = b2dworld.CreateBody(floorBodyDef);
			floor.CreateFixture(floorFixture);
			floor.SetUserData({
				name : "Floor"
			})
			
			// boundaries - top
			var topFixture = new b2FixtureDef;
			topFixture.shape = new b2PolygonShape;
			topFixture.shape.SetAsBox((canvasWidth/2) *CONST.pixelToMeter, 10 *CONST.pixelToMeter);
			var rightBodyDef = new b2BodyDef;
			rightBodyDef.type = b2Body.b2_staticBody;
			rightBodyDef.position.x = (canvasWidth/2) *CONST.pixelToMeter;
			rightBodyDef.position.y = 0*CONST.pixelToMeter;
			var right = b2dworld.CreateBody(rightBodyDef);
			right.CreateFixture(topFixture);
			right.SetUserData({
				name : "Top"
			})
			
			// boundaries - left
			var leftFixture = new b2FixtureDef;
			leftFixture.shape = new b2PolygonShape;
			leftFixture.shape.SetAsBox(10 *CONST.pixelToMeter, (canvasHeight/2) *CONST.pixelToMeter);
			var leftBodyDef = new b2BodyDef;
			leftBodyDef.type = b2Body.b2_staticBody;
			leftBodyDef.position.x = 0 *CONST.pixelToMeter;
			leftBodyDef.position.y = (canvasHeight/2) *CONST.pixelToMeter;
			var left = b2dworld.CreateBody(leftBodyDef);
			left.CreateFixture(leftFixture);
			left.SetUserData({
				name : "Left"
			})
			// boundaries - right
			var rightFixture = new b2FixtureDef;
			rightFixture.shape = new b2PolygonShape;
			rightFixture.shape.SetAsBox(10*CONST.pixelToMeter, (canvasHeight/2) *CONST.pixelToMeter);
			var rightBodyDef = new b2BodyDef;
			rightBodyDef.type = b2Body.b2_staticBody;
			rightBodyDef.position.x = canvasWidth *CONST.pixelToMeter;
			rightBodyDef.position.y = (canvasHeight/2)*CONST.pixelToMeter;
			var right = b2dworld.CreateBody(rightBodyDef);
			right.CreateFixture(rightFixture);
			right.SetUserData({
				name : "Right"
			})
			
			
			
			var ball = new Ball(100,100,stage,b2dworld);
			
			var shooter = new MicroGShooter(stage,b2dworld);
			
			//var ball2 = new Ball(90,20,stage,b2dworld);
			
			/*

			ball2.skin.onClick = ball.skin.onClick=function(){
				this.body.ApplyImpulse(new b2Vec2(2*CONST.meterToPixel, - 3*CONST.meterToPixel), this.body.GetWorldCenter());
			};*/ 
		//	var test = new Test(stage,b2dworld);
			levelObjects.push(ball);
		//	levelObjects.push(test);
			levelObjects.push(shooter);
			return levelObjects;
			
}
	
window.LevelManager = LevelManager;

}(window));