(function(window){

var World = function(debugCanvas,easelStage){
	this.initialize(debugCanvas,easelStage);

};
/* private variable */



var times=0;
var levelManager ;
var addDebug = function(debugContext) {
			var debugDraw = new b2DebugDraw();
			debugDraw.SetSprite(debugContext);
			debugDraw.SetDrawScale(CONST.scale);
			debugDraw.SetFillAlpha(0.7);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			P.b2dWorld.SetDebugDraw(debugDraw);
		}

/* end private variable */
		
var P = World.prototype;
var levelObjects = [];

P.b2dWorld ;

P.initialize = function(debugCanvas,easelStage){
	P.b2dWorld = new b2World(new b2Vec2(0,CONST.gravity), false); //TODO : turn it on man!!!
	addDebug(debugCanvas);
	levelManager = new LevelManager(P.b2dWorld ,easelStage);
	levelObjects = levelManager.nextLevel();
	P.b2dWorld.SetContactListener(new ContactCallBack());

}

P.update = function(){
	//console.log('update called :'+times++);
	P.b2dWorld.Step(CONST.timestep, 10, 10);
	P.b2dWorld.ClearForces();
	P.b2dWorld.m_debugDraw.m_sprite.graphics.clear();
	P.b2dWorld.DrawDebugData();
	for( var a in levelObjects){
		if(levelObjects[a].update)
		levelObjects[a].update();
	}
}

window.World = World;

}(window));