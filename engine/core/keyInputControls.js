//	keyInputControls.js

	const keyInputControls = (function( characterController, cameraController ){

		const rad = Math.PI/2;
		const deg = Math.PI/180;
		const clock = new THREE.Clock();
		const keyboard = new KeyboardState();
		const keyCodes = keyboard.keyCodes;
		const keyInputController = new MW.KeyInputControl();

		var SPACE=32, PAGEUP=33, PAGEDOWN=34;
		var A=65, D=68, S=83, W=87, LEFT=37, UP=38, RIGHT=39, DOWN=40;

		//	var JUMP     = keyCodes[32]; // "space".
		//	var UP       = keyCodes[33] || keyCodes[69]; // "page UP"     or "E"
		//	var DOWN     = keyCodes[34] || keyCodes[81]; // "page DOWN"   or "Q"
		//	var LEFT     = keyCodes[37] || keyCodes[68]; // "arrow LEFT"  or "D"
		//	var RIGHT    = keyCodes[39] || keyCodes[65]; // "arrow RIGHT" or "A"
		//	var FORWARD  = keyCodes[38] || keyCodes[87]; // "arrow UP"    or "W"
		//	var BACKWARD = keyCodes[40] || keyCodes[83]; // "arrow DOWN"  or "S"

		characterController.movementSpeed = 5; // debug!

		function syncWithCameraController() {
			var cameraFrontAngle = cameraController.getFrontAngle();
			var characterFrontAngle = keyInputController.frontAngle;
			characterController.direction = (4 * rad) - cameraFrontAngle + characterFrontAngle;
		}

		function resetMovementSpeedDirection(){
			var movementSpeed = Math.abs( characterController.movementSpeed );
			characterController.movementSpeed = movementSpeed;
			return movementSpeed;
		}

		function updateMovementSpeedDirection( backward ){
			var movementSpeed = resetMovementSpeedDirection(); 
			if ( backward ) 
				characterController.movementSpeed = -movementSpeed;
		}

		function updateControllerDirection( dt ){
			var left = keyCodes[LEFT], right = keyCodes[RIGHT];
			if ( left && !right ) 
				characterController.direction += dt*rad; // step;
			else if ( right && !left ) 
				characterController.direction -= dt*rad; // step;
		}

		keyInputController.addEventListener( "movekeyon", onMoveKeyChange);
		keyInputController.addEventListener( "movekeychange", onMoveKeyChange);

		function onMoveKeyChange(){

			var left  = keyCodes[LEFT],  forwards = keyCodes[UP],
				right = keyCodes[RIGHT], backward = keyCodes[DOWN];

			var turnkey = left || right;
			var movekey = forwards || backward;

			if (  !movekey && turnkey ) {

				characterController.isRunning = false; 

			} else if ( movekey || turnkey ) {

				updateMovementSpeedDirection( backward );
				characterController.isRunning = true; 

			} else if ( !movekey && !turnkey ) {

				syncWithCameraController();
				resetMovementSpeedDirection();
				characterController.isRunning = true; 

			} else {

				debugMode && console.error( 
					"onMoveKeyChangeExecption:",
					"turnkey:", turnkey, "movekey:", movekey,
				);

			}

		}

		keyInputController.addEventListener( "movekeyoff", function() { 
			resetMovementSpeedDirection();
			characterController.isRunning = false; 
		});

		keyInputController.addEventListener( "jumpkeypress", function() { 
			characterController.jump(); 
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

//	event listener helpers.

	const enableKeyInputControls = function(){
		keyInputControls.isDisabled = false;
	}

	const disableKeyInputControls = function(){
		keyInputControls.isDisabled = true;
	}
