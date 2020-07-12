//	entity-droplist.js

//	Call Watchers.

	(function( entity_droplist ){
		entity_droplist.addEventListener( "change", function(){
			this.blur(); callWatchers(this, "onchange", "change", this.value ); // important!
		});
	})( document.querySelector("select#editor-entities-droplist") ); // entity_droplist.


//	CameraControls rigid objects,
//	keeps camera controls rigid objects at edit mode.
	const rigidObjects = []; // cameraControls.rigidObjects;

//	Last editor entity droplist value.
//	keeps track of last entity droplist value.
	const latestEntityId = { value:"" }; // called first, updated last.
	watch( latestEntityId, "value", function(property, action, newValue, oldValue ){
		debugMode && console.log({item:latestEntityId,"new value":newValue,"old value":oldValue})
	});

//	Update latest entity value.
	(function( latestEntityId,entity_droplist ){
	//	keeps entity's droplist last value.
		watch(entity_droplist, "onchange", function( property, event, value ){
			latestEntityId.value = value; // when call lastEntity watcher can get the old value.
		});
	})(
		latestEntityId, document.querySelector("select#editor-entities-droplist") // entity_droplist.
	);


//	Update object editor.

	(function(editor,rigidObjects,latestEntity,cameraControls,localPlayer,keyInputControls,entity_droplist){

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

		function exitFromEditMode(){
			editor.reset(); // important!
			resetLatestEntityValue();
			enableCameraRigidObjects();
			takeCameraControls( localPlayer );
			keyInputControls.isDisabled = false;
			return;
		}

	//

		watch(entity_droplist, "onchange", function( property, event, value ){

			if ( editor.update( value ) ) {

			//	switchToEditMode.

				var object = getObjectByEntityId( value );
				if ( !object ) return exitFromEditMode();

			//	camera controls offset.
				if ( object.geometry && object.geometry.boundingSphere ) {
					var offset = object.geometry.boundingSphere.center;
					cameraControls.offset.copy( offset ); 
					cameraControls.offset.y *= 0.5;
				}

			//	Disable camera rigid objects.
				disableCameraRigidObjects();

			//	editor take camera controls.
				cameraControls.trackObject = editor; // or object?

			//	Disable key input controls.
				keyInputControls.isDisabled = true;

			} else {

				exitFromEditMode();

			}

		});

	})(
		objectEditor, // editor, 
		rigidObjects, latestEntityId, cameraControls, localPlayer, keyInputControls, 
		document.querySelector("select#geometry-entities-droplist") // entity_droplist.
	);


//	Call vector droplist watchers.

	(function(vector_droplist,entity_droplist){

		watch(entity_droplist, "onchange", function( property, event, value ){
			callWatchers( vector_droplist, "onchange", "change", vector_droplist.value )
		});

	})(
		document.querySelector("select#geometry-vector-droplist"), // vector_droplist.
		document.querySelector("select#geometry-entities-droplist") // entity_droplist.
	);


//	Update material editor droplist.

	(function(entity_droplist){

		watch(entity_droplist, "onchange", function( property, event, value ){

		//	Get material entities droplist.
			var selector = "select#material-entities-droplist";
			var material_droplist = document.querySelector(selector); if (!material_droplist) return;

		//	Get material id.
			var object = getObjectByEntityId( value ); if ( !object ) {
				return callWatchers( material_droplist, "onchange", "change", material_droplist.value = "" );
			}

			var material = object.material; if (!object.material) {
				return callWatchers( material_droplist, "onchange", "change", material_droplist.value = "" );
			}

			material && callWatchers( material_droplist, "onchange", "change", material_droplist.value = String(material.id) );

		});

	})( document.querySelector("select#geometry-entities-droplist") ); // entity_droplist.



