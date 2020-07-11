//	reset-vectors-onmouse-events.js

	(function( editor,reset_button,vector_x,vector_y,vector_z,vector_w,vector_droplist ){

		var interval;

		reset_button.addEventListener( "click", function(){
			clearTimeout(interval);
			interval = setTimeout(function(){
				callWatchers( reset_button, "onclick", "click", vector_droplist.value );
			}, 250);
		});

		watch( reset_button, "onclick", function( property, event, key ){
			debugMode && console.log({item:reset_button,event:event,key:key});

			switch ( key ) {
				case "position":
					editor.position.set(0,0,0); vector_w.value = "";
				break;
				case "rotation":
					editor.rotation.set(0,0,0); vector_w.value = "";
				break;
				case "scale":
					editor.scale.set(1,1,1); vector_w.value = "100.0";
				break;
				case "quaternion":
					editor.quaternion.set(0,0,0,1);
				break;
				default:
					[vector_x.value,vector_y.value,vector_z.value,vector_w.value] = ["","","",""];
				break;
			}

		});

	})(
		objectEditor, // editor,
		document.querySelector("div#geometry-reset-button"), // reset_button,
		document.querySelector("input#geometry-vector-x-input"), // vector_x,
		document.querySelector("input#geometry-vector-y-input"), // vector_y,
		document.querySelector("input#geometry-vector-z-input"), // vector_z,
		document.querySelector("input#geometry-vector-w-input"), // vector_w,
		document.querySelector("select#geometry-vector-droplist") // vector_droplist.
	);


//	exit-edit-onmouse-events.js

	(function(editor,rigidObjects,latestEntity,cameraControls,localPlayer,keyInputControls,exit_button){

		var interval;

		exit_button.addEventListener( "click", function(){
			clearTimeout(interval);
			interval = setTimeout(function(){
				callWatchers( exit_button, "onclick", "click" );
			}, 250);
		});

	//	Exit from edit mode.

		function resetLatestEntityValue(){
			latestEntity.value = entity_droplist.value = "";
		}

		function enableCameraRigidObjects(){
			while (rigidObjects.length) {
				var object = rigidObjects.shift();
				object.isMesh && cameraControls.rigidObjects.push( object ); // cleanup.
			}
		}

		function disableCameraRigidObjects(){
			while (cameraControls.rigidObjects.length) {
				var object = cameraControls.rigidObjects.shift()
				object.isMesh && rigidObjects.push( object ); // cleanup.
			}
		}

		function takeCameraControls( object, offset ){
			cameraControls.trackObject = object;
			cameraControls.offset.y = offset || 0;
		}

		watch( exit_button, "onclick", function exitFromEditMode( prop, event ){
			debugMode && console.log({item:exit_button,property:prop,event:event});

			editor.reset(); // important!
			resetLatestEntityValue();
			enableCameraRigidObjects();
			takeCameraControls( localPlayer );
			keyInputControls.isDisabled = false;

		});

	})(
		objectEditor, // editor, 
		rigidObjects, latestEntity, cameraControls, localPlayer, keyInputControls, 
		document.querySelector("div#geometry-exit-mode") // exit_button,
	);


	//	objectEditor, // editor,
	//	document.querySelector("input#geometry-vector-x-input"), // vector_x,
	//	document.querySelector("input#geometry-vector-y-input"), // vector_y,
	//	document.querySelector("input#geometry-vector-z-input"), // vector_z,
	//	document.querySelector("input#geometry-vector-w-input"), // vector_w,
	//	document.querySelector("select#geometry-vector-droplist"), // vector_droplist,
	//	document.querySelector("select#geometry-entities-droplist") // entity_droplist.
