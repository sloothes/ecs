
const keyInputControls = (function( characterController, cameraController ){

	const rad = Math.PI/2;
	const deg = Math.PI/180;
	const clock = new THREE.Clock();
	const keyboard = new KeyboardState();
	const keyCodes = keyboard.keyCodes;
	const keyInputController = new MW.KeyInputControl();

	//	var JUMP     = keyCodes[32]; // "space".
	//	var UP       = keyCodes[33] || keyCodes[69]; // "page UP"     or "E"
	//	var DOWN     = keyCodes[34] || keyCodes[81]; // "page DOWN"   or "Q"
	//	var LEFT     = keyCodes[37] || keyCodes[68]; // "arrow LEFT"  or "D"
	//	var RIGHT    = keyCodes[39] || keyCodes[65]; // "arrow RIGHT" or "A"
	//	var FORWARD  = keyCodes[38] || keyCodes[87]; // "arrow UP"    or "W"
	//	var BACKWARD = keyCodes[40] || keyCodes[83]; // "arrow DOWN"  or "S"

	characterController.movementSpeed = 5; // debug!

	function resetMovementSpeedDirection(){
		var movementSpeed = Math.abs( characterController.movementSpeed );
		characterController.movementSpeed = movementSpeed;
	}

	function updateMovementSpeedDirection(FORWARD, BACKWARD){
		var movementSpeed = Math.abs( characterController.movementSpeed );
		if ( !FORWARD && BACKWARD ) 
			characterController.movementSpeed = -movementSpeed;
		else characterController.movementSpeed = movementSpeed;
	}

	function updateControllerDirection( dt ){
		var left  = keyCodes[37] || keyCodes[68]; // "arrow LEFT"  or "D"
		var right = keyCodes[39] || keyCodes[65]; // "arrow RIGHT" or "A"
		if ( left && !right ) 
			characterController.direction -= dt*rad; // step;
		else if ( right && !left ) 
			characterController.direction += dt*rad; // step;
	}

	function syncWithCameraController() {
		var cameraFrontAngle = cameraController.getFrontAngle();
		var characterFrontAngle = keyInputController.frontAngle;
		characterController.direction = (4 * rad) - cameraFrontAngle + characterFrontAngle;
	}

	keyInputController.addEventListener( "movekeyon", function() { 
		var forwards = keyCodes[38] || keyCodes[87]; // "arrow UP"    or "W"
		var backward = keyCodes[40] || keyCodes[83]; // "arrow DOWN"  or "S"
		updateMovementSpeedDirection( forwards, backward );
		if ( forwards || backward ) characterController.isRunning = true;
	});

	keyInputController.addEventListener( "movekeyoff", function() { 
		resetMovementSpeedDirection();
		characterController.isRunning = false; 
	});

	keyInputController.addEventListener( "jumpkeypress", function() { 
		characterController.jump(); 
	});

	keyInputController.addEventListener( "movekeychange", function(){
	//	syncWithCameraController();
		var forwards = keyCodes[38] || keyCodes[87]; // "arrow UP"    or "W"
		var backward = keyCodes[40] || keyCodes[83]; // "arrow DOWN"  or "S"
		updateMovementSpeedDirection( forwards, backward );
		(function(){
			if ( forwards || backward ) 
				characterController.isRunning = true; 
			else if ( !forwards && !backward )
				characterController.isRunning = false; 
		})();
	});

	(function update(){

		requestFrameID = requestAnimationFrame( update );
		if (  keyInputController.isDisabled ) return;
	//	if ( !keyInputController.isMoveKeyHolded ) return;

		var dt = clock.getDelta();
		updateControllerDirection( dt );

	})();

	return keyInputController;

})( localPlayer.controller, cameraControls );
