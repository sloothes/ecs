
	const keyInputControls = (function( characterController ){

		var keyInputControls = new MW.KeyInputControl();

		keyInputControls.addEventListener( "movekeyon", function () { 
			characterController.isRunning = true; 
		});

		keyInputControls.addEventListener( "movekeyoff", function () { 
			characterController.isRunning = false; 
		});

		keyInputControls.addEventListener( "jumpkeypress", function () { 
			characterController.jump(); 
		});

		// synch with keybord input and camera control input.
		keyInputControls.addEventListener( "movekeychange",  function () {
			var cameraFrontAngle = cameraControls.getFrontAngle();
			var characterFrontAngle = keyInputControls.frontAngle;
			characterController.direction = THREE.Math.degToRad( 360 ) - cameraFrontAngle + characterFrontAngle;
		});

	})( localPlayer.controller );
