(function(window){

var LevelManager = function(world,easelStage){
	this.initialize(world,easelStage);

};
var b2dworld;
var stage;

var P = LevelManager.prototype;

P.initialize =function(world,easelStage){
	
	b2dworld = world;
	stage = easelStage;
	
	console.log('level manager is up');
}

P.nextLevel=function(){
			var levelObjects = [];
			var floorFixture = new b2FixtureDef;
			floorFixture.density = 1;
			floorFixture.restitution = 0;
			floorFixture.shape = new b2PolygonShape;
			floorFixture.shape.SetAsBox(800 *CONST.pixelToMeter, 10 *CONST.pixelToMeter);
			var floorBodyDef = new b2BodyDef;
			floorBodyDef.type = b2Body.b2_staticBody;
			floorBodyDef.position.x = 0*CONST.pixelToMeter;
			floorBodyDef.position.y = 509 *CONST.pixelToMeter;
			var floor = b2dworld.CreateBody(floorBodyDef);
			floor.CreateFixture(floorFixture);
			
			// boundaries - left
			var leftFixture = new b2FixtureDef;
			leftFixture.shape = new b2PolygonShape;
			leftFixture.shape.SetAsBox(10 *CONST.pixelToMeter, 550 *CONST.pixelToMeter);
			var leftBodyDef = new b2BodyDef;
			leftBodyDef.type = b2Body.b2_staticBody;
			leftBodyDef.position.x = -9 *CONST.pixelToMeter;
			leftBodyDef.position.y = -25 *CONST.pixelToMeter;
			var left = b2dworld.CreateBody(leftBodyDef);
			left.CreateFixture(leftFixture);
			// boundaries - right
			var rightFixture = new b2FixtureDef;
			rightFixture.shape = new b2PolygonShape;
			rightFixture.shape.SetAsBox(10*CONST.pixelToMeter, 550 *CONST.pixelToMeter);
			var rightBodyDef = new b2BodyDef;
			rightBodyDef.type = b2Body.b2_staticBody;
			rightBodyDef.position.x = 509 *CONST.pixelToMeter;
			rightBodyDef.position.y = -25 *CONST.pixelToMeter;
			var right = b2dworld.CreateBody(rightBodyDef);
			right.CreateFixture(rightFixture);
			
			var ball = new Ball(100,0,stage,b2dworld);
			
			
			
			var ball2 = new Ball(90,20,stage,b2dworld);
			
			/*

			ball2.skin.onClick = ball.skin.onClick=function(){
				this.body.ApplyImpulse(new b2Vec2(2*CONST.meterToPixel, - 3*CONST.meterToPixel), this.body.GetWorldCenter());
			};*/ 
			levelObjects.push(ball);
			levelObjects.push(ball2);
			return levelObjects;
			
}
	
window.LevelManager = LevelManager;

}(window));