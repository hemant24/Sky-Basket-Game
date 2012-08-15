(function(window){

function ContactCallBack(){
}

var P = ContactCallBack.prototype = new b2ContactListener();

P.BeginContact = function(contact){

	var onebody = contact.GetFixtureA().GetBody().GetUserData().name;
	var otherBody = contact.GetFixtureB().GetBody().GetUserData().name;
	console.log('onebody : '+onebody +' otherbody : ' + otherBody);
	if( (onebody == "Shooter" && otherBody=="Ball") || (otherBody =="Shooter" && onebody=="Ball") ){
		console.log('contact begin');
		if(onebody =="Ball"){
			//contact.GetFixtureA().GetBody().ApplyImpulse(new b2Vec2(150,-150), contact.GetFixtureA().GetBody().GetWorldCenter());
		}else{
			//contact.GetFixtureB().GetBody().ApplyImpulse(new b2Vec2(150,-150), contact.GetFixtureB().GetBody().GetWorldCenter());
		}
	}

}

P.EndContact	= function(contact){

	var onebody = contact.GetFixtureA().GetBody().GetUserData().name;
	var otherBody = contact.GetFixtureB().GetBody().GetUserData().name;
	if( (onebody == "Shooter" && otherBody=="Ball") || (otherBody =="Ball" && onebody=="Shooter") ){
		console.log('contact end');
	}					
				}
P.PostSolve		= function(contact){

				}
				
P.PreSolve = function(contact){

}



window.ContactCallBack = ContactCallBack;	
}(window));