//	key-inputs.js

	(function(editor,keyboard,entity_droplist){

		var interval;

		const clock = new THREE.Clock();
		const keyCodes = keyboard.keyCodes;
		const modifiers = keyboard.modifiers;
		const UP=38, DOWN=40, LEFT=37, RIGHT=39;
		const A=65, D=68, E=69, F=70, G=71, H=72, 
			  Q=81, R=82, S=83, T=84, W=87;

		function modifierIsDown(){
			return modifiers.alt   || modifiers.meta
				|| modifiers.shift || modifiers.ctrl; 
		}

	//	EditorScalingSystem.

		function EditorScalingSystem( dt ){

			if ( keyCodes[H] ) {
				editor.scale.x += dt;
				editor.scale.y += dt;
				editor.scale.z += dt;
			}

			else if ( keyCodes[G] ) {
				editor.scale.x -= dt;
				editor.scale.y -= dt;
				editor.scale.z -= dt;
			} 

		}

	//	EditorRotationSystem.

		function EditorRotationSystem( dt ){

			var rad = Math.max(dt, 0.02);

		//	Rotation (local coordinates).
			keyCodes[W] && editor.rotateOnAxis( axisX,  rad );
			keyCodes[S] && editor.rotateOnAxis( axisX, -rad );
			keyCodes[A] && editor.rotateOnAxis( axisY, -rad );
			keyCodes[D] && editor.rotateOnAxis( axisY,  rad );

		//	Reset rotation.
			keyCodes[R] && editor.rotation.set(0,0,0);
			keyCodes[F] && editor.setRotationFromQuaternion(camera.quaternion);

		}

	//	EditorTranslationSystem.

		function EditorTranslationSystem( dt ){

			var UPDOWN = keyCodes[E]  || keyCodes[Q];
			var ARROWS = keyCodes[37] || keyCodes[38] || keyCodes[39] || keyCodes[40];

		//	Move up/down.

			UPDOWN && (function(up, down){

				var rad = 0;
				var keyboardFrontAngle = 0;
				var movementSpeed = Math.max(dt, 0.05);
				var cameraFrontAngle = cameraControls.phi;
				if ( up ) keyboardFrontAngle =  Math.PI/2;
				if (down) keyboardFrontAngle = -Math.PI/2;
				var direction = rad - cameraFrontAngle + keyboardFrontAngle;
				var directionOnAxisY = Math.sin(direction);
				var y = directionOnAxisY * movementSpeed;
				editor.position.y += y; 

			})( keyCodes[E], keyCodes[Q] );

		//	Move left/right/forwards/backward

			ARROWS && (function() {

				var rad = 8 * Math.PI/4;  // keyboard input.
				var movementSpeed = Math.max(dt, 0.05);
				var cameraFrontAngle = cameraControls.getFrontAngle();
				var keyboardFrontAngle = keyboard.frontAngle;
				var direction = rad - cameraFrontAngle + keyboardFrontAngle;
				var directionOnAxisX = -Math.sin(direction);
				var directionOnAxisZ = -Math.cos(direction);
				var x = directionOnAxisX * movementSpeed;
				var z = directionOnAxisZ * movementSpeed;
				editor.position.x += x; 
				editor.position.z += z;

			})();

		}

		document.addEventListener("keypress", function(){

			var dt = Math.min(clock.getDelta(),0.02); 
			debugMode && console.log( "dt:", round(dt,6) );

			if ( modifierIsDown() ) return;
			if ( !entity_droplist.value ) return;

			var SCALE  = keyCodes[H] || keyCodes[G];
			var ROTATE = keyCodes[W] || keyCodes[A] || keyCodes[S]  || keyCodes[D]  || keyCodes[R]  || keyCodes[F];
			var MOVING = keyCodes[E] || keyCodes[Q] || keyCodes[37] || keyCodes[38] || keyCodes[39] || keyCodes[40];

			SCALE  && EditorScalingSystem( dt );
			ROTATE && EditorRotationSystem( dt );
			MOVING && EditorTranslationSystem( dt );

		});

	})( 
		objectEditor, keyboard, // editor, keyboard,
		document.querySelector("select#editor-entities-droplist") // entity_droplist.
	);


