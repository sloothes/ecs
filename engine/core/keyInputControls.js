
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
			active = true;
		//	syncWithCameraController();
		//	characterController.isRunning = true; 
		});

		keyInputController.addEventListener( "movekeyoff", function () { 
			active = false;
		//	syncWithCameraController();
		//	characterController.isRunning = false; 
		});

		keyInputController.addEventListener( "jumpkeypress", function () { 
			characterController.jump(); 
		});

	//	sync with cameraControls.
		keyInputController.addEventListener( "movekeychange",  function(){
			active = true;
		//	syncWithCameraController();
		});

		(function update(){
			requestFrameID = requestAnimationFrame( update );

			if ( !active ) return;

			var cameraFrontAngle = cameraController.getFrontAngle();
			characterController.direction = (4 * rad) - cameraFrontAngle + step; // 1 deg.

		})();

		return keyInputController;

	})( localPlayer.controller, cameraControls );
