
	const keyInputControls = (function( characterController, cameraController ){

		var keyInputController = new MW.KeyInputControl();

		function syncWithCameraController() {
			var rad = Math.PI/2;
			var cameraFrontAngle = cameraController.getFrontAngle();
			var characterFrontAngle = keyInputController.frontAngle;
			characterController.direction = (4 * rad) - cameraFrontAngle + characterFrontAngle;
		});

		keyInputController.addEventListener( "movekeyon", function () { 
			syncWithCameraController();
			characterController.isRunning = true; 
		});

		keyInputController.addEventListener( "movekeyoff", function () { 
			syncWithCameraController();
			characterController.isRunning = false; 
		});

		keyInputController.addEventListener( "jumpkeypress", function () { 
			characterController.jump(); 
		});

	//	sync with cameraControls.
		keyInputController.addEventListener( "movekeychange",  syncWithCameraController );
		
		return keyInputController;

	})( localPlayer.controller, cameraControls );
