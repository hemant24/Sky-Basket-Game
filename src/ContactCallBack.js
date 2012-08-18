(function(window){

function ContactCallBack(){
}

var P = ContactCallBack.prototype = new b2ContactListener();

P.BeginContact = function(contact){

	var onebody = contact.GetFixtureA().GetBody().GetUserData().name;
	var otherBody = contact.GetFixtureB().GetBody().GetUserData().name;
	var ball = null;
	var shooter = null;
	if( (onebody == "Shooter" && otherBody=="Ball") || (otherBody =="Shooter" && onebody=="Ball") ){
		if(onebody =="Ball"){
			ball = contact.GetFixtureA().GetBody();
			shooter = contact.GetFixtureB().GetBody();
		}else{
			ball = contact.GetFixtureB().GetBody();
			shooter = contact.GetFixtureA().GetBody();
		}
		
		shooter.GetUserData()['ball']=ball;
	}
	

	

}

P.EndContact	= function(contact){
	

	var onebody = contact.GetFixtureA().GetBody().GetUserData().name;
	var otherBody = contact.GetFixtureB().GetBody().GetUserData().name;
	var ball = null;
	var shooter = null;
	if( (onebody == "Shooter" && otherBody=="Ball") || (otherBody =="Shooter" && onebody=="Ball") ){
		if(onebody =="Ball"){
			ball = contact.GetFixtureA().GetBody();
			shooter = contact.GetFixtureB().GetBody();
		}else{
			ball = contact.GetFixtureB().GetBody();
			shooter = contact.GetFixtureA().GetBody();
		}
		if(shooter.GetUserData().ball){
			shooter.GetUserData().ball.SetLinearVelocity(shooter.GetUserData().ball['oldVelocity']);
			shooter.GetUserData().ball['lock']=false
			shooter.GetUserData()['ball']=null;
		}
	}

		}
P.PostSolve		= function(contact){

				}
				
P.PreSolve = function(contact){

}



window.ContactCallBack = ContactCallBack;	
}(window));