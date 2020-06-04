
const joystickControls = (function(cameraController, characterController){

	var joysticControls1 = document.createElement( "div" );
	joysticControls1.id = "joystick-controls-1";
	joysticControls1.classList.add("joystick-controls");
	document.body.appendChild( joysticControls1 );

	var joysticControls2 = document.createElement( "div" );
	joysticControls2.id = "joystick-controls-2";
	joysticControls2.classList.add("joystick-controls");
	document.body.appendChild( joysticControls2 );

	var joystick1Selector  = "#joystick1";
	var joystick2Selector  = "#joystick2";
	var jumpButtonSelector = "#jumpButton";

	var joystickControlsSelector  = ".joystick-controls";
	var joystickControls1Selector = "#joystick-controls-1";
	var joystickControls2Selector = "#joystick-controls-2";

	var cameraJoystick = new virtualInput.Joystick( $( joystickControls1Selector ), 94, { id: "joystick1" } );
	var playerJoystick = new virtualInput.Joystick( $( joystickControls2Selector ), 94, { id: "joystick2" } );
	var jumpButton     = new virtualInput.Button(   $( joystickControls1Selector ), 58, { id: "jumpButton", label: "<b>JUMP</b>" } ); // buttonSvgSrc

	playerJoystick.addEventListener( "active", function onActive() { 

		if (  characterController.isJumping 
			|| !characterController.isGrounded 
			||  characterController.isOnSlope ) {
			return;
		}

		characterController.isRunning = true;

	});

	playerJoystick.addEventListener( "disactive", function onDisactive() { 

		if (  characterController.isJumping 
			|| !characterController.isGrounded 
			||  characterController.isOnSlope ) {
			return;
		}

		characterController.isRunning = false;

	});

	jumpButton.addEventListener( "press", function onPress() { 

		if (  characterController.isJumping 
			|| !characterController.isGrounded 
			||  characterController.isOnSlope ) {
			return;
		}

		characterController.jump();

	});

//	updates.

	const rad = Math.PI/2;

	playerJoystick.update = function(){

		if ( this.isActive ) {

			characterController.direction = (3 * rad) - cameraController.getFrontAngle() + this.angle;

		}
	};

	cameraJoystick.update = function(){

		if ( this.isActive ) {

			cameraController.setLatLon(
				cameraController.lat + this.position.y * 0.5, // deg.
				cameraController.lon - this.position.x        // deg.
			);

		}
	};

	(function update(){
		cameraJoystick.update();
		playerJoystick.update();
		requestFrameID = requestAnimationFrame( update );
	})();


	return playerJoystick;

})( cameraControls, localPlayer.controller );
