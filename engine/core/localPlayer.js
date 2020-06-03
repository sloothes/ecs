//	localPlayer entity.

	const localPlayer = (function(){

		var radius = 0.85;

	//	player.
		var player = (function(){
			var player = new THREE.Object3D();
			player.position.set( 0, 0, 0 );
			player.name = "localPlayer";
			scene.add( player );
			return player;
		})();

	//	player helper.
		var helper = (function( r ){
			var sphere = new THREE.SphereGeometry( r, 8, 6 );
			var geometry = new THREE.EdgesGeometry( sphere );
			var material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
			var segments = new THREE.LineSegments( geometry, material );
			segments.name = "playerhelper";
			return segments;
		})( radius );

		player.add( helper );

	//	player controller.
		var characterController = (function( object, radius ){
			var controller = new MW.CharacterController( object, radius );
			controller.movementSpeed = 10;
			controller.maxSlopeGradient = 0.5;
			controller.center.set(0, 1, 0);
			world.add( controller );
			(function reset(){
				player.requestFrameID = requestAnimationFrame( reset );
				if ( controller.center.y < -10 ) controller.center.set(0, 10, 0);
			})();
			return controller;
		})( player, radius );

		player.controller = characterController;

	//	Update rotation.
		(function update(){
			player.requestFrameID = requestAnimationFrame( update );
			player.rotation.y = characterController.direction + Math.PI;
		})();

	//	Take CameraLight control.
		takeCameraLight( player );

		return player;
	})();
