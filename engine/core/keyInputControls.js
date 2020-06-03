
	const keyInputControls = (function( characterController, cameraController ){

		var active;
		const rad = Math.PI/2;
		const step = Math.PI/180;

		var keyInputController = new MW.KeyInputControl();

		function syncWithCameraController() {
			var cameraFrontAngle = cameraController.getFrontAngle();
			var characterFrontAngle = keyInputController.frontAngle;
			characterController.direction = (4 * rad) - cameraFrontAngle + characterFrontAngle;
		}

		keyInputController.addEventListener( "movekeyon", function () { 
			syncWithCameraController();
			characterController.isRunning = true; 
		});

		keyInputController.addEventListener( "movekeyoff", function () { 
		//	syncWithCameraController();
			characterController.isRunning = false; 
		});

		keyInputController.addEventListener( "jumpkeypress", function () { 
			characterController.jump(); 
		});

	//	sync with cameraControls.
		keyInputController.addEventListener( "movekeychange",  function(){
			syncWithCameraController();
		});

		return keyInputController;

	})( localPlayer.controller, cameraControls );
