
	const cameraControls = (function( camera, object ){

		var cameraControls = new MW.TPSCameraControl(
			camera, 			// three.js camera.
			object,				// tracking object.
			{	
				el: renderer.domElement,
				offset: new THREE.Vector3( 0, 0, 0 ), // eye height.
				radius: 6, // default distance of the character to the camera.
				minRadius: 2,
				maxRadius: +Infinity,
				rigidObjects: [],
			}
		);

		(function update(){
			requestFrameID = requestAnimationFrame( update );
			if ( !cameraControls.camera ) return;
			if ( !cameraControls.trackObject ) return;
			cameraControls.update();
			cameraControls.frontAngle = cameraControls.getFrontAngle();
		})();

		return cameraControls;

	})( camera, localPlayer );

//	Helpers.

	function takeCameraControls( object, offset ){
		cameraControls.trackObject = object;
		cameraControls.offset.y = offset || 0;
	}
