//	localPlayer.js

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

	//	helper.
		var helper = (function( r ){
			var sphere = new THREE.SphereGeometry( r, 8, 6 );
			var geometry = new THREE.EdgesGeometry( sphere );
			var material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
			var segments = new THREE.LineSegments( geometry, material );
			segments.name = "playerhelper";
			return segments;
		})( radius );

		player.add( helper );

	//	controller.
		player.controller = (function( object, radius ){
			var h = 2*Math.PI;
			var controller = new MW.CharacterController( object, radius );
			controller.movementSpeed = 10;
			controller.maxSlopeGradient = 0.5;
			controller.center.set(0, h, 0);
			world.add( controller );
			(function reset(){
				player.requestFrameID = requestAnimationFrame( reset );
				if ( controller.center.y < -1 ) controller.center.set(0, h, 0);
			})();
			return controller;
		})( player, radius );

	//	rotation.
		(function update(){
			player.requestFrameID = requestAnimationFrame( update );
			player.rotation.y = player.controller.direction + Math.PI;
		})();

	//	cameraLight control.
		takeCameraLight( player );

		return player;
	})();
