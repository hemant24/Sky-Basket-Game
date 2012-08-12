(function(window){

var World = function(debugCanvas,easelStage){
	this.initialize(debugCanvas,easelStage);

};
/* private variable */


var world;
var times=0;
var levelManager ;
var addDebug = function(debugContext) {
			var debugDraw = new b2DebugDraw();
			debugDraw.SetSprite(debugContext);
			debugDraw.SetDrawScale(CONST.scale);
			debugDraw.SetFillAlpha(0.7);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			world.SetDebugDraw(debugDraw);
		}
/* end private variable */
		
var P = World.prototype;
var levelObjects = [];
P.initialize = function(debugCanvas,easelStage){
	world = new b2World(new b2Vec2(0,CONST.gravity), true);
	addDebug(debugCanvas);
	levelManager = new LevelManager(world,easelStage);
	levelObjects = levelManager.nextLevel();
	console.log('world created ' + world);
}

P.update = function(){
	//console.log('update called :'+times++);
	world.Step(CONST.timestep, 10, 10);
	//world.ClearForces();
	//world.m_debugDraw.m_sprite.graphics.clear();
	world.DrawDebugData();
	
	for( var a in levelObjects){
		levelObjects[a].update();
	}
}

window.World = World;

}(window));