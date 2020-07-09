//	entity-droplist-onchange-watcher.js

//	keeps track of last entity droplist value.
	const latestEntity = { value:"" }; // called first, updated last.

//	keeps camera controls rigid objects at edit mode.
	const rigidObjects = []; // cameraControls.rigidObjects;

	(function(scene, entity_droplist){

		var interval;
		var edgeshelper;

		function destroyEdgesHelper(){
			if ( !edgeshelper ) return;
			scene.remove( edgeshelper ); 
		//	entities.remove( edgeshelper.id );
			edgeshelper.geometry.dispose();
			edgeshelper.material.dispose();
			edgeshelper = undefined;
		}

		function createEdgesHelper( object ){

			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;

			var geometry = new THREE.EdgesGeometry( object.geometry );
			var material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
			var helper = new THREE.LineSegments( geometry, material );
			helper.scale.copy( object.scale );       // important!
			helper.position.copy( object.position ); // important!
			helper.rotation.copy( object.rotation ); // important!
			helper.name = object.name + ":edgeshelper";

			scene.add( helper );
		//	entities.add( helper );
			edgeshelper = helper;
		}

	//	edgeshelper watcher.

		watch(entity_droplist, "onchange", function( property, event, value ){

		//	Remove old edges helper.
			destroyEdgesHelper(); // remove old helper.

		//	Get object.
			var object = getObjectByEntityId( value );

		//	Create new edges helper.
			object && createEdgesHelper( object ); // add new helper.

		});

	})(
		scene, document.querySelector("select#geometry-entities-droplist") // entity_droplist.
	);


















/*
	(function(editor,octree,localPlayer,rigidObjects,cameraControls,keyInputControls,vector_droplist,entity_droplist,latestEntity){

		function getObjectsByGeometry( uuid ){
			return scene.children.filter(function(child){
				return child.geometry && child.geometry.uuid === uuid; // same geometry.
			}).filter(function( object ){
				return !localPlayer.getObjectById(object.id); // not localPlayer child.
			})
		}

		function removefromOctree( value ){
		//	Removes from octree all objects (geometry
		//	faces) that have the same geometry.uuid.
		//	DevNote: It would be better if was using
		//	mesh.uuid and not geometry.uuid. (TODO).

			var object = getObjectByEntityId( value );

			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;
			if ( !object.geometry.isGeometry ) return;

		//	Remove from octree.
		//	DevNote: removes all object's geometry 
		//	faces that have same geometry.uuid.
			var uuid = object.geometry.uuid;
			uuid && octree.removeThreeMesh( uuid );

			return object; // important!
		}

		function addtoOctree( value ){

		//	DevNote: You have to add all objects with the 
		//	same geometry.uuid. 
		//	READ explanation at removefromOctree comments.

			var object = getObjectByEntityId( value );

			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;
			if ( !object.geometry.isGeometry ) return;

		//	Import to octree.
		//	octree.importThreeMesh( object );
		//	Import all objects with same geometry to octree.
		//	READ explanation at removefromOctree() comments.
			var uuid = object.geometry.uuid;
			var meshes = getObjectsByGeometry(uuid);
			while ( meshes.length ) {
				octree.importThreeMesh( meshes.shift() );
			}

			return object; // important!
		}

		function updateOctree( value ){
			var object = removefromOctree( value );

			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;
			if ( !object.geometry.isGeometry ) return;
			if ( localPlayer.getObjectById(object.id) ) return; // localPlayer child.

		//	Import to octree. 
		//	octree.importThreeMesh( object );
		//	Use addtoOctree() to import to octree.
		//	READ explanation at removefromOctree() comments.
			addtoOctree( value ); 
		}

		function addtoRigidObjects( value ){
			var id = parseInt(value);
		//	if ( localPlayer.getObjectById(id) ) return; // localPlayer child.
			var object = getObjectByEntityId( value );
			if ( object && rigidObjects.findIndex( function( item ){ 
				return item.id === object.id;
			}) > -1 ) return; // already exists in rigidObjects.
			object && object.isMesh && rigidObjects.push( object );
		}

	//	we need to keep track of the old value of entity droplist.
		watch(entity_droplist, "onchange", function( prop, event, value ){
		//	debugMode && console.log( "entitySelect watch:", 
		//	prop, action, "new value:", value, "old value:", oldValue  );

			updateOctree( latestEntity.value ); // first, important!

		//	Add to camera rigid objects.
			!!latestEntity.value && addtoRigidObjects( latestEntity.value );

		//	switchToEditMode( newValue ); // important!

		//	Display vectors direct from editor.
		//	updateVectorSelectValue();
		//	vectorSelect.value = vector_droplist.value;
		//	displayVectorValues( vectorSelect.value );

		});

	})(
		sceneEditor, octree, localPlayer, // editor, octree, localPlayer,
		rigidObjects, cameraControls, keyInputControls,
		document.querySelector("select#geometry-vector-droplist"),  // vector_droplist.
		document.querySelector("select#geometry-entities-droplist"), // entity_droplist.
		latestEntity // lattest entity value.
	);

	(function(editor,latestEntity,localPlayer,cameraControls,keyInputControls,rigidObjects,entity_droplist){

		function addtoRigidObjects( value ){
			var id = parseInt(value);
		//	if ( localPlayer.getObjectById(id) ) return; // localPlayer child.
			var object = getObjectByEntityId( value );
			if ( object && rigidObjects.findIndex( function( item ){ 
				return item.id === object.id;
			}) > -1 ) return; // already exists in rigidObjects.
			object && object.isMesh && rigidObjects.push( object );
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

		function latestEntityValueReset(){
			latestEntity.value = entity_droplist.value = "";
		//	callWatchers( entity_droplist, "onchange", "change", "" );
		//	entity_droplist.dispatchEvent( new Event("change") );
		}

		function exitFromEditMode(){
			editor.reset(); // important!
			latestEntityValueReset(); // !!!
			enableCameraRigidObjects();
			takeCameraControls( localPlayer );
			keyInputControls.isDisabled = false;
			return;
		}

		watch(entity_droplist, function( prop, event, value ){

		//	switchToEditMode( value ); // important!

			if ( editor.update( value ) ) {

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
				cameraControls.trackObject = object; // editor;

			//	Disable key input controls.
				keyInputControls.isDisabled = true;

			} 

			else exitFromEditMode();

		});

	})(
		sceneEditor, latestEntity, // editor, latestEntity,
		octree, localPlayer, rigidObjects, cameraControls, keyInputControls,
		document.querySelector("select#geometry-entities-droplist") // entity_droplist.
	);

	//	function switchToEditMode( value ){
	//		if ( editor.update( value ) ) {
	//			var object = getObjectByEntityId( value );
	//			if ( !object ) return exitFromEditMode();
	//		//	camera controls offset.
	//			if ( object.geometry && object.geometry.boundingSphere ) {
	//				var offset = object.geometry.boundingSphere.center;
	//				cameraControls.offset.copy( offset );
	//				cameraControls.offset.y *= 0.5;
	//			}
	//		//	Disable camera rigid objects.
	//			disableCameraRigidObjects();
	//		//	editor take camera controls.
	//			cameraControls.trackObject = object; // editor;
	//		//	Disable key input controls.
	//			keyInputControls.isDisabled = true;
	//		} 
	//		else exitFromEditMode();
	//	}

	(function(editor,vector_droplist,entity_droplist){

		watch( entity_droplist, "onchange", function( property, event, value ){
		//	if (entity_droplist.value !== value ) entity_droplist.value = value;
			editor.update( parseInt( value ) ); // important! string id.
			callWatchers( vector_droplist, "onchange", "change", vector_droplist.value );
		});

		watch( entity_droplist, "onchange", function( property, event, value ){
		//	if (entity_droplist.value !== value ) entity_droplist.value = value;
			var droplist = document.querySelector("select#material-entities-droplist");
			var object = getObjectByEntityId( value ); if ( !object ) return; 
			var material =  getMaterialByEntityId( object.material.id ); if ( !material ) return; 
			droplist.value = String(material.id); // stirng, important!
			callWatchers( droplist, "onchange", "change", droplist.value );
		});

	})(
		sceneEditor, // editor, 
		document.querySelector("select#geometry-vector-droplist"),  // vector_droplist.
		document.querySelector("select#geometry-entities-droplist") // entity_droplist.
	);

//	Update latestEntity.

	(function(latestEntity,entity_droplist){

	//	update latestEntity value (always last!).
		watch( entity_droplist, "value", function( property, action, value ){

			latestEntity.value = value; // always last, important!

		});

	})(
		latestEntity, document.querySelector("select#geometry-entities-droplist") // entity_droplist.
	);
*/


//	vector-droplist-onchange-watcher.js
/*
	(function(editor,octree,localPlayer,vector_droplist,entity_droplist){

		function getObjectsByGeometry( uuid ){
			return scene.children.filter(function(child){
				return child.geometry && child.geometry.uuid === uuid; // same geometry.
			}).filter(function( object ){
				return !localPlayer.getObjectById(object.id); // not localPlayer child.
			})
		}

		function addtoOctree( value ){

		//	DevNote: You have to add all objects with the 
		//	same geometry.uuid. 
		//	READ explanation at removefromOctree comments.

			var object = getObjectByEntityId( value );

			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;
			if ( !object.geometry.isGeometry ) return;
		//	if ( localPlayer.getObjectById(object.id) ) return; // localPlayer child.

		//	Import to octree.
		//	octree.importThreeMesh( object );
		//	Import all objects with same geometry to octree.
		//	READ explanation at removefromOctree() comments.
			var uuid = object.geometry.uuid;
			var meshes = getObjectsByGeometry(uuid);
			while ( meshes.length ) {
				octree.importThreeMesh( meshes.shift() );
			}

			return object; // important!
		}


		watch(vector_droplist, "onchange", function( prop, event, newValue, oldValue ){
		//	debugMode && console.log( "vectorSelect watch:", prop, action, newValue );

		//	Update vectors direct from editor.
			displayVectorValues( vectorSelect.value );

		});

	})(
		sceneEditor, octree, localPlayer, // editor, octree, localPlayer,
		document.querySelector("select#geometry-vector-droplist"),  // vector_droplist.
		document.querySelector("select#geometry-entities-droplist") // entity_droplist.
	);
*/