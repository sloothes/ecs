//	camera-controls-rigid-objects.js

	const rigidObjects = []; // cameraControls.rigidObjects;

	function addtoRigidObjects( value ){
		var id = parseInt(value);
	//	if ( !checkId( value ) ) return;
	//	if ( localPlayer.getObjectById(id) ) return; // localPlayer child.
		var object = getObjectByEntityId( value );
		if ( object && rigidObjects.findIndex( function( item ){ 
			return item.id === object.id;
		}) > -1 ) return; // already exists in rigidObjects.
		object && object.isMesh && rigidObjects.push( object );
	}

	function removefromRigidObjects( value ){
		var index = rigidObjects.findIndex( 
			function( object ){
				return object.id === parseInt( value );
			});
		if ( index < 0 ) return; // important!
		rigidObjects.splice( index, 1 );
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


//	octree-helpers.js

	function addtoOctree( value ){

	//	DevNote: You have to add all objects with the 
	//	same geometry.uuid. 
	//	READ explanation at removefromOctree comments.

		var object = getObjectByEntityId( value );

		if ( !object ) return;
		if ( !object.isMesh ) return;
		if ( !object.geometry ) return;
		if ( !object.geometry.isGeometry ) return;
		if ( localPlayer.getObjectById(object.id) ) return; // localPlayer child.

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

//	renamed from "octreeIncluded" to "octreeIncludes".
	function octreeIncludes( uuid ){
		var result;
		octree.nodes.forEach(function (nodeDepth) {
			if ( result ) return;
			nodeDepth.forEach(function (node) {
				if ( result ) return;
				node.trianglePool.forEach(function (face) {
					if ( result ) return;
					if (face.meshID === uuid) result = true;
				});
			});
		});
		return result;
	}


//	create-geometry-entity.js

	(function(create_button,type_droplist,entity_droplist,entities){

		var interval;

		create_button.addEventListener( "click", function(){
			clearTimeout( interval );
			interval = setTimeout(function(){
				callWatchers( create_button, "onclick", "click", type_droplist.value );
			},250);
		});

		watch(create_button, "onclick", function(property, event, type){
			debugMode && console.log({item:create_button,event:event,type:type});

		//	Get type.
			var type = type_droplist.value; // string.
			if ( type === "" || type === undefined ) return;

		//	Create geometry.
			var geometry = new THREE[ type ]();
			if ( geometry === undefined ) return;

		//	Init params based on type.
			switch (type) {
				case "PlaneGeometry":
					geometry.translate(0, 0.5, 0);
				break;
			//	case "BoxGeometry":
			//	case "ConeGeometry":
			//	case "TorusGeometry":
			//	case "SphereGeometry":
			//	case "CylinderGeometry":
			//	case "OctahedronGeometry":
			//	case "DodecahedronGeometry":
			//	case "IcosahedronGeometry":
			//	case "TetrahedronGeometry":
			//	case "TorusKnotGeometry":
			//	case "CircleGeometry":
			//	case "RingGeometry":
			//	break;
			}

		//	Create mesh.
			var material = new THREE.MeshLambertMaterial({side:2});
			var mesh = new THREE.Mesh(geometry, material);
			mesh.name = type.replace("Geometry","") + mesh.id;
			scene.add( mesh );

		//	Add entity.
			entities && entities.add( mesh );

		//	Add material entity.
			try { material_entities && material_entities.add( material ); } 
			catch (err){ debugMode && console.error(err); } // important!

		//	Add to camera rigid objects.
		//	addtoRigidObjects( mesh.id );

		//	Enter edit mode.
		//	entity_droplist.value = String(mesh.id); // string, important!
			callWatchers(entity_droplist, "onchange", "change", entity_droplist.value = String(mesh.id) );
		});

	})(
		document.querySelector("div#create-geometry-button"), // create_button,
		document.querySelector("select#geometry-type-droplist"), // type_droplist,
		document.querySelector("select#geometry-entities-droplist"), // entity_droplist,
		entities // entities.
	);


//	clone-geometry-entity.js

	(function(clone_button,entity_droplist,entities){

		var interval;

		clone_button.addEventListener( "click", function(){
			clearTimeout( interval );
			interval = setTimeout(function(){
				callWatchers( clone_button, "onclick", "click", entity_droplist.value );
			},250);
		});

		watch(clone_button, "onclick", function(property, event, value){
			debugMode && console.log({item:clone_button,event:event,value:value});
		//	if ( value !== entity_droplist.value ) return;

		//	if ( !editor.isEditing ) return; // some paranoid safety!
		//	if ( !entitySelect.value ) return; // more paranoid safety!

		//	Get source.
		//	var id = parseInt( entitySelect.value );
			var id = parseInt( value ); if ( isNaN(id) ) return;

			var source = getObjectByEntityId( id );
			if ( !(source && source.isMesh && source.geometry) ) return;

		//	Clone source.
			if ( source.isMesh && source.geometry ) {
			//	clone.
				var mesh = source.clone();

			//	rename.
				mesh.name = source.name.replace(/:clone/g,"") + ":clone"; // TODO: better renameing.

			//	translate.
				mesh.position.y += 1; // (m)

			//	add to scene.
				scene.add( mesh );

			//	add to entities.
				entities && entities.add( mesh );

			//	mesh geometry/material is same as source geometry/material.
			//	try { material_entities && material_entities.add( material );
			//	catch (err){ debugMode && console.error(err); } // important!

			//	Enter edit mode.
			//	entity_droplist.value = String(mesh.id); // string, important!
				callWatchers(entity_droplist, "onchange", "change", entity_droplist.value = String(mesh.id) );
			}

		});

	})(
		document.querySelector("div#clone-geometry-button"), // clone_button,
		document.querySelector("select#geometry-entities-droplist"), // entity_droplist,
		entities // entities.
	);


//	remove-geometry-entity.js

	(function(remove_button,type_droplist,entity_droplist,entities){

		var interval;

		remove_button.addEventListener( "click", function(){
			clearTimeout( interval );
			interval = setTimeout(function(){
				callWatchers( remove_button, "onclick", "click", entity_droplist.value );
			},250);
		});

		watch(remove_button, "onclick", function(property, event, value){
			debugMode && console.log({item:remove_button,event:event,value:value});
		//	if ( value !== entity_droplist.value ) return;

		//	var value = entity_droplist.value;
		//	if ( !checkId( value ) ) return;
		//	var id = parseInt( entity_droplist.value );
		//	debugMode && console.log("id:", id );
		//	if ( localPlayer.getObjectById(id) ) return; // localPlayer child.

			var id = parseInt( value ); if ( isNaN(id) ) return;

			var object = getObjectByEntityId( value ); // id as string.
			if ( !(object && object.parent) ) return; // avoid to remove scene???

		//	remove octree.
			if ( object.isMesh && object.geometry ) (function(){
				var uuid = object.geometry.uuid;
				octreeIncludes( uuid ) && octree.removeThreeMesh( uuid );
			})();

		//	remove object.
			object.parent.remove( object );

		//	remove entity and option.
			entities.remove( id ); // important!

		//	Remove from camera rigid objects.
			removefromRigidObjects( id );

		//	Exit edit mode. // resetEntitySelectValue();
		//	entity_droplist.value = "";
			callWatchers(entity_droplist, "onchange", "change", entity_droplist.value = "" ); 
		});

	})(
		document.querySelector("div#remove-geometry-button"), // remove_button,
		document.querySelector("select#geometry-type-droplist"), // type_droplist,
		document.querySelector("select#geometry-entities-droplist"), // entity_droplist,
		entities // entities.
	);
