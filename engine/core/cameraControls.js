
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
			cameraControls.update();
			requestFrameID = requestAnimationFrame( update );
		})();

		return cameraControls;

	})( camera, localPlayer );
