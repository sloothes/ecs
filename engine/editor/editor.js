//	Editor.

	const axisX = new THREE.Vector3(1,0,0);
	const axisY = new THREE.Vector3(0,1,0);
	const axisZ = new THREE.Vector3(0,0,1);
	const keyboard = new KeyboardState();
	const keyCodes = keyboard.keyCodes;

//	Create a Object3D entity to hold editor-tab values.
	const editor = new THREE.Object3D(); //	editor must not added in scene.
//	entities.add( editor ); // debug!

	(function( editor ){

		var k = 0;

		const undo = [];
		const redo = [];

		const RAD2DEG = THREE.Math.RAD2DEG;
		const DEG2RAD = THREE.Math.DEG2RAD;

		const vect_x_input = document.getElementById("input-vector-x");
		const vect_y_input = document.getElementById("input-vector-y");
		const vect_z_input = document.getElementById("input-vector-z");
		const vect_w_input = document.getElementById("input-vector-w");

		const vect_x_increase = document.getElementById("vector-x-increase");
		const vect_y_increase = document.getElementById("vector-y-increase");
		const vect_z_increase = document.getElementById("vector-z-increase");
		const vect_w_increase = document.getElementById("vector-w-increase");
		const vect_x_decrease = document.getElementById("vector-x-decrease");
		const vect_y_decrease = document.getElementById("vector-y-decrease");
		const vect_z_decrease = document.getElementById("vector-z-decrease");
		const vect_w_decrease = document.getElementById("vector-w-decrease");

		const entity_droplist = document.getElementById("entities-droplist");
		const vector_droplist = document.getElementById("vector-mode-droplist");
		const geometry_droplist = document.getElementById("editor-geometry-droplist");

		const exit_edit_button = document.getElementById("exit-edit-mode");
		const reset_vectors_button = document.getElementById("reset-vectors-button");
		const box_geometry_button = document.getElementById("new-box-geometry");
		const plane_geometry_button = document.getElementById("new-plane-geometry");
		const create_geometry_button = document.getElementById("create-geometry-button");
		const remove_geometry_button = document.getElementById("remove-geometry-button");

		const entitySelect = { value:entity_droplist.value };   // string.
		const vectorSelect = { value:vector_droplist.value };   // string.
		const geometryType = { value:geometry_droplist.value }; // string.

		function checkId( value ){

			var id = parseInt( value );

			if ( id === NaN ) return false;
			if ( id === scene.id ) return false;
			if ( id === camera.id ) return false;
			if ( id === editor.id ) return false;
			if ( id === localPlayer.id ) return false;
			if ( id === cameraLight.id ) return false;
			if ( id === shadowCameraHelper.id ) return false;
			if ( id === cameraLight.shadow.camera.id ) return false;
			if ( id !== parseInt( entity_droplist.value ) ) return false;
			debugMode && console.log( "checkId:", true );

			return true;
		}

		function getObjectByEntityId( id ){

			var object = scene.getObjectById( id );

			if ( !object ) return undefined;
			if ( object === scene ) return undefined;
			if ( object === camera ) return undefined;
			if ( object === editor ) return undefined;
			if ( object === localPlayer ) return undefined;
			if ( object === cameraLight ) return undefined;
			if ( object === shadowCameraHelper ) return undefined;
			if ( object === cameraLight.shadow.camera ) return undefined;
			debugMode && console.log( "getObjectByEntityId:", object );

			return object;
		}

		function resetEntitySelectValue(){
			entitySelect.value = entity_droplist.value = "";
		}

		function resetGeometryTypeValue(){
			geometryType.value = geometry_droplist.value = "";
		}

		function addToUndo( object ){
			var json = copyObject3dState( object );
			json && undo.unshift( json );
		}

		function addToRedo( object ){
			var json = copyObject3dState( object );
			json && redo.unshift( json );
		}

	// 	Copy object state to undo/undo, 
	//	without copy geometry/materials.
		function copyObject3dState( object ){
			if ( !object ) return;
			if ( !object.isObject3D ) return;
		//	create a new Object3D, 
			var object3d = new THREE.Object3D();
		//	copy object to object3d,
			object3d.copy( object );
		//	return json.
			return object3d.toJSON();
		}

		editor.reset = function(){
			editor.copy( new THREE.Object3D() );
			editor.name = "Editor";
			editor.isEditing = false;
			undo.length = 0; redo.length = 0;
			debugMode && console.log( "editor reset!" );
		};

		editor.update = function( value ){

			var check = checkId( value );
			if ( !check ) return;

			var id = parseInt( value );
			var object = getObjectByEntityId(id);
			if ( !object ) return;

		//	Edit mode.
			editor.isEditing = !!object;

		//	Undo/Redo.
			addToUndo( object ); // important!

		//	Copy object.
			object && object.isObject3D && editor.copy( object );
			debugMode && console.log( "editor update!", editor );
		};

		editor.undo = function(){ 
			if ( !undo.length ) return; // important!

		//	Get object.
			var id = parseInt( entitySelect.value );
			var object = scene.getObjectById( id );

		//	Create a redo json.
			object && addToRedo( object );

		//	Get undo json.
			var json = undo.shift();
			if ( !json ) return;

		//	Copy state (undo).
			var loader = new THREE.ObjectLoader();
			object && object.copy( loader.parse( json ) );
		};

		editor.redo = function(){
			if ( !redo.length ) return; // important!

		//	Get object.
			var id = parseInt( entitySelect.value );
			var object = scene.getObjectById( id );

		//	Create an undo json.
			object && addToUndo( object );

		//	Get redo json.
			var json = redo.shift();
			if ( !json ) return;

		//	Copy state (redo).
			var loader = new THREE.ObjectLoader();
			object && object.copy( loader.parse( json ) );
		};

	//	Editor Tab eventListners.

		(function(){

			var object;
			var interval;
			var edgeshelper;

		//	const axisX = new THREE.Vector3(1,0,0);
		//	const axisY = new THREE.Vector3(0,1,0);
		//	const axisZ = new THREE.Vector3(0,0,1);

			watch(entitySelect, function( prop, action, newValue, oldValue ){

			//	Old edges helper.
				destroyEdgesHelper(); // old edges helper.

				if ( !checkId( newValue ) ) { object = undefined; return; }

				var id = parseInt( newValue );
				if ( !getObjectByEntityId( id ) ) { object = undefined; return; }

				object = getObjectByEntityId( id );
				debugMode && console.log( "entitySelect watch:", object );

			//	New edges helper.
				object && createEdgesHelper(); // new edges helper.

			});

			function destroyEdgesHelper(){
				if ( !edgeshelper ) return;
				scene.remove( edgeshelper ); 
				entities.remove( edgeshelper.id );
				edgeshelper.geometry.dispose();
				edgeshelper.material.dispose();
				edgeshelper = undefined;
			}

			function createEdgesHelper(){

				if ( !object ) return;
				if ( !object.isMesh ) return;
				if ( !object.geometry ) return;
				if ( localPlayer.getObjectById( object.id) ) return; // child of localPlayer.

				var geometry = new THREE.EdgesGeometry( object.geometry );
				var material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
				var helper = new THREE.LineSegments( geometry, material );
				helper.scale.copy( object.scale );       // important!
				helper.position.copy( object.position ); // important!
				helper.rotation.copy( object.rotation ); // important!
				helper.name = object.name + ":edgeshelper";

				scene.add( helper );
				entities.add( helper ); // ???
				edgeshelper = helper;
			}

			function onMouseClick(){ 

				clearTimeout( interval ); // important!

				if ( !object ) return;
				object && update( this );

			//	Edges helper.
				object && createEdgesHelper();

				debugMode && console.log( "on Mouse Click:", interval );
			}

			function onMouseDown(){ 

				if ( !object ) return;

			//	Edges helper.
				destroyEdgesHelper(); // old edges helper.
			//	object && setTimeout( createEdgesHelper );

			//	Undo/Redo.
				object && addToUndo( object );

				var button = this;
				var clock = new THREE.Clock();
				interval = setTimeout( function onUpdate() {
					if ( !object ) return;
					var dt = clock.getDelta();
					object && update( button );
					interval = setTimeout( onUpdate, dt );
				//	debugMode && console.log( "on Update:", interval );

				}, 500);
			}

			vect_x_increase.addEventListener( "mousedown", onMouseDown );
			vect_y_increase.addEventListener( "mousedown", onMouseDown );
			vect_z_increase.addEventListener( "mousedown", onMouseDown );
			vect_w_increase.addEventListener( "mousedown", onMouseDown );
			vect_x_decrease.addEventListener( "mousedown", onMouseDown );
			vect_y_decrease.addEventListener( "mousedown", onMouseDown );
			vect_z_decrease.addEventListener( "mousedown", onMouseDown );
			vect_w_decrease.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
				clearTimeout( interval ); // important!
			//	debugMode && console.log( "on MouseUp:", interval );
			});

			vect_x_increase.addEventListener( "click", onMouseClick );
			vect_y_increase.addEventListener( "click", onMouseClick );
			vect_z_increase.addEventListener( "click", onMouseClick );
			vect_w_increase.addEventListener( "click", onMouseClick );
			vect_x_decrease.addEventListener( "click", onMouseClick );
			vect_y_decrease.addEventListener( "click", onMouseClick );
			vect_z_decrease.addEventListener( "click", onMouseClick );
			vect_w_decrease.addEventListener( "click", onMouseClick );

			vect_x_input.addEventListener( "change", function(){

				this.blur(); // important!
				var vector = vectorSelect.value;
				var thisValue = parseFloat( this.value );

				if ( !object ) 
					return void( this.value = editor[vector].x.toFixed(2) );
				else if ( vector === "scale" ) {
					if ( !thisValue ) 
						return void( object.scale.x = 0.001 ); // avoid scale.x:0/NaN,
					else object.scale.x = thisValue/100;
					if ( Math.abs( object.scale.x ) < 0.001 ) object[ vector ].x = 0.001; 
				} 
				else if ( thisValue == NaN )
					return void( this.value = editor[vector].x.toFixed(2) );
				else if ( vector === "rotation" )
					object[ vector ].x = DEG2RAD*thisValue;
				else
					object[ vector ].x = thisValue;
			});

			vect_y_input.addEventListener( "change", function(){

				this.blur(); // important!
				var vector = vectorSelect.value;
				var thisValue = parseFloat( this.value );

				if ( !object ) 
					return void( this.value = editor[vector].y.toFixed(2) );
				else if ( vector === "scale" ) {
					if ( !thisValue ) 
						return void( object.scale.y = 0.001 ); // avoid scale.y:0/NaN,
					else object.scale.y = thisValue/100;
					if ( Math.abs( object.scale.y ) < 0.001 ) object[ vector ].y = 0.001; 
				} 
				else if ( thisValue == NaN )
					return void( this.value = editor[vector].y.toFixed(2) );
				else if ( vector === "rotation" )
					object[vector].y = DEG2RAD*thisValue;
				else
					object[vector].y = thisValue;
			});

			vect_z_input.addEventListener( "change", function(){

				this.blur(); // important!
				var vector = vectorSelect.value;
				var thisValue = parseFloat( this.value );

				if ( !object || thisValue == NaN ) 
					return void( this.value = editor[vector].z.toFixed(2) );
				else if ( vector === "scale" ) {
					if ( !thisValue ) 
						return void( object.scale.z = 0.001 ); // avoid scale.z:0/NaN,
					else object.scale.z = thisValue/100;
					if ( Math.abs( object.scale.z ) < 0.001 ) object[ vector ].z = 0.001; 
				} 
				else if ( thisValue == NaN )
					return void( this.value = editor[vector].z.toFixed(2) );
				else if ( vector === "rotation" )
					object[vector].z = DEG2RAD*thisValue;
				else
					object[vector].z = thisValue;
			});

			vect_w_input.addEventListener( "change", function(){

				this.blur(); // important!
				var vector = vectorSelect.value;
				var thisValue = parseFloat( this.value );

				if ( !object ) {
					return void( this.value = NaN );
				} else if ( vector === "rotation" ) {
					this.value = object.rotation.order;
				} else if ( vector === "scale" ) {
					if ( !thisValue ) {
						object.scale.x = 0.001; // avoid scale.x:0/NaN,
						object.scale.y = 0.001; // avoid scale.y:0/NaN,
						object.scale.z = 0.001; // avoid scale.z:0/NaN,
					//	this.value = 0.1.toFixed(2);
					} else {
						object.scale.x = thisValue/100;
						object.scale.y = thisValue/100;
						object.scale.z = thisValue/100;
					}
					if ( Math.abs( object.scale.x ) < 0.001 ) object.scale.x = 0.001; 
					if ( Math.abs( object.scale.y ) < 0.001 ) object.scale.y = 0.001; 
					if ( Math.abs( object.scale.z ) < 0.001 ) object.scale.z = 0.001; 
				//	this.value = ( 100*(object.scale.x+object.scale.y+object.scale.z)/3 ).toFixed(2)
				} else if ( thisValue == NaN ) { 
				//	reset quaternion.
					object.scale.set(1,1,1);
					object.rotation.set(0,0,0);
					object.quaternion.set(0,0,0,1);
					object.updateMatrixWorld(true); // important?
					editor.copy( object );          // important?
				} else if ( vector === "quaternion" ) {
					object.quaternion.w = thisValue;
				} else this.value = editor[vector].w;
			});

			function update( button ){

				if ( !object ) return;

				var vector = vectorSelect.value;

				if ( vector === "position" ) {
					var step = 1/100; // 1 cm.
					if ( button === vect_x_increase ) object.position.x += step/10; // 1 mm.
					if ( button === vect_y_increase ) object.position.y += step/10; // 1 mm.
					if ( button === vect_z_increase ) object.position.z += step/10; // 1 mm.
					if ( button === vect_x_decrease ) object.position.x -= step/10; // 1 mm.
					if ( button === vect_y_decrease ) object.position.y -= step/10; // 1 mm.
					if ( button === vect_z_decrease ) object.position.z -= step/10; // 1 mm.
				}

				else if ( vector === "rotation" ) {
					var step = Math.PI/180; // 1 deg.
					if ( button === vect_x_increase ) object.rotateOnAxis( axisX,  step/10 ); // 0.1 deg.
					if ( button === vect_y_increase ) object.rotateOnAxis( axisY,  step/10 ); // 0.1 deg.
					if ( button === vect_z_increase ) object.rotateOnAxis( axisZ,  step/10 ); // 0.1 deg.
					if ( button === vect_x_decrease ) object.rotateOnAxis( axisX, -step/10 ); // 0.1 deg.
					if ( button === vect_y_decrease ) object.rotateOnAxis( axisY, -step/10 ); // 0.1 deg.
					if ( button === vect_z_decrease ) object.rotateOnAxis( axisZ, -step/10 ); // 0.1 deg.
				}

				else if ( vector === "scale" ) {

					var step = 1/100; // 1 %

					if ( button === vect_x_increase ) {
						object.scale.x += step/10;     // 0.1 %.
						if ( Math.abs( object.scale.x ) < step/10 ) 
							object.scale.x = step/10;  // avoid scale.x:0.
					} else if ( button === vect_y_increase ) {
						object.scale.y += step/5;      // 0.1 %.
						if ( Math.abs( object.scale.y ) < step/10 ) 
							object.scale.y = step/10;  // avoid scale.x:0.
					} else if ( button === vect_z_increase ) {
						object.scale.z += step/5;      // 0.1 %.
						if ( Math.abs( object.scale.z ) < step/10 ) 
							object.scale.z = step/10;  // avoid scale.x:0.
					} else if ( button === vect_w_increase ) {
						object.scale.x += step/10;     // 0.1 %.
						object.scale.y += step/10;     // 0.1 %.
						object.scale.z += step/10;     // 0.1 %.
						if ( Math.abs( object.scale.x ) < step/10 ) 
							object.scale.x = step/10;  // avoid scale.x:0.
						if ( Math.abs( object.scale.y ) < step/10 ) 
							object.scale.y = step/10;  // avoid scale.y:0.
						if ( Math.abs( object.scale.z ) < step/10 ) 
							object.scale.z = step/10;  // avoid scale.z:0.
					} else if ( button === vect_x_decrease ) {
						object.scale.x -= step/10;     // 0.1 %,
						if ( Math.abs( object.scale.x ) < step/10 ) 
							object.scale.x = -step/10; // avoid scale.x:0,
					} else if ( button === vect_y_decrease ) {
						object.scale.y -= step/10;     // 0.1 %,
						if ( Math.abs( object.scale.y ) < step/10 ) 
							object.scale.y = -step/10; // avoid scale.y:0,
					} else if ( button === vect_z_decrease ) {
						object.scale.z -= step/10;     // 0.1 %,
						if ( Math.abs( object.scale.z ) < step/10 ) 
							object.scale.z = -step/10; // avoid scale.z:0,
					} else if ( button === vect_w_decrease ) {
						object.scale.x -= step/10;     // 0.1 %,
						object.scale.y -= step/10;     // 0.1 %,
						object.scale.z -= step/10;     // 0.1 %,
						if ( Math.abs( object.scale.x ) < step/10 ) 
							object.scale.x = -step/10; // avoid scale.x:0,
						if ( Math.abs( object.scale.y ) < step/10 ) 
							object.scale.y = -step/10; // avoid scale.y:0,
						if ( Math.abs( object.scale.z ) < step/10 ) 
							object.scale.z = -step/10; // avoid scale.z:0,
					}
				}

				else if ( vector === "quaternion" ) {
					var step = 1/100;
					if ( button === vect_x_increase ) object.quaternion.x += step/10; // 0.001
					if ( button === vect_y_increase ) object.quaternion.y += step/10; // 0.001
					if ( button === vect_z_increase ) object.quaternion.z += step/10; // 0.001
					if ( button === vect_w_increase ) object.quaternion.w += step/10; // 0.001

					if ( button === vect_x_decrease ) object.quaternion.x -= step/10; // 0.001
					if ( button === vect_y_decrease ) object.quaternion.y -= step/10; // 0.001
					if ( button === vect_z_decrease ) object.quaternion.z -= step/10; // 0.001
					if ( button === vect_w_decrease ) object.quaternion.w -= step/10; // 0.001
				}

			}

		})();

	//	Droplists.

		(function(){

			entity_droplist.addEventListener("change", function(){
				entity_droplist.blur();
				var value = entity_droplist.value;
				if ( checkId( value ) ) 
					entitySelect.value = entity_droplist.value; // update.
				else
					entitySelect.value = entity_droplist.value = ""; // reset.
			});

			vector_droplist.addEventListener("change", function(){
				vector_droplist.blur();
				var value = entity_droplist.value;
				if ( checkId( value ) ) 
					vectorSelect.value = vector_droplist.value; // update.
				else 
					entitySelect.value = entity_droplist.value = ""; // reset.
			});

			geometry_droplist.addEventListener("change", function(){
				geometry_droplist.blur();
				geometryType.value = geometry_droplist.value;
			});

			geometryType.value = geometry_droplist.value = "BoxGeometry";

		})();

	//	Buttons.

		(function(){

			var interval;

			exit_edit_button.addEventListener( "click", function(){
				clearTimeout(interval);
				interval = setTimeout(function(){
					entitySelect.value = entity_droplist.value = "";
				//	entity_droplist.dispatchEvent(new Event("change"));
				}, 250);
			});

			reset_vectors_button.addEventListener( "click", function(){

				clearTimeout(interval);
				interval = setTimeout(function(){

					var value = entitySelect.value;
					if ( !checkId( value ) ) return editor.reset(); 

					var id = parseInt( entitySelect.value );
					var object = getObjectByEntityId( id );
					if ( !object ) return editor.reset();

					if ( vectorSelect.value == "position" ) 
						object.position.set(0,0,0);
					else if ( vectorSelect.value == "rotation" ) 
						object.rotation.set(0,0,0);
					else if ( vectorSelect.value == "scale" )
						object.scale.set(1,1,1);
					else if ( vectorSelect.value == "quaternion" )
						object.quaternion.set(0,0,0,1);
					debugMode && console.log("reset", vectorSelect.value);
				}, 250);
			});

			create_geometry_button.addEventListener( "click", function(){
				clearTimeout( interval );
				interval = setTimeout(function(){

				//	Get type.
					var type = geometryType.value; // string.
					if ( type === "" || type === undefined ) return;

				//	Create geometry.
					var geometry = new THREE[ type ]();
					if ( geometry === undefined ) return;

					switch (type) {
						case "PlaneGeometry":
							geometry.translate(0, 0.5, 0);
						break;
					}

				//	Create mesh.
					var material = new THREE.MeshLambertMaterial({side:2});
					var mesh = new THREE.Mesh(geometry, material);
					mesh.name = type.replace("Geometry","") + mesh.id;
					scene.add( mesh );

				//	Add entity.
					entities.add( mesh );

				//	Enter edit mode.
					entitySelect.value = entity_droplist.value = mesh.id.toString();
				//	entity_droplist.dispatchEvent(new Event("change")); // important!

				}, 250);
			});

			remove_geometry_button.addEventListener( "click", function(){
				clearTimeout( interval );
				interval = setTimeout(function(){

					var value = entitySelect.value;
					if ( !checkId( value ) ) return;

					var id = parseInt( entitySelect.value );
					debugMode && console.log("id:", id );
					if ( localPlayer.getObjectById(id) ) return; // is child of localPlayer.

					var object = getObjectByEntityId( id );
					if ( !(object && object.parent) ) return;

				//	remove octree.
					if ( object.isMesh && object.geometry ) (function(){
						var uuid = object.geometry.uuid;
						if ( octreeIncluded( uuid ) ) octree.removeThreeMesh( uuid );
					})();

				//	remove object.
					object.parent.remove( object );

				//	remove entity and option.
					entities.remove( id ); // important!

				//	Exit edit mode.
					entitySelect.value = entity_droplist.value = "";
				//	entity_droplist.dispatchEvent(new Event("change"));
				}, 250);
			});

		})();

	//	Editor Tab watchers.

		(function(){

			watch(vectorSelect, function( prop, action, newValue, oldValue ){
				debugMode && console.log( "vector droplist:", prop, action, newValue );

			//	Update vectors direct from editor.
				displayVectorValues( vectorSelect.value );

			});

			watch(entitySelect, function( prop, action, newValue, oldValue ){
				debugMode && console.log( "entity droplist:", prop, action, parseInt(newValue)  );

				editor.reset(); // important!

			//	Update old octree (first) important!
				if ( oldValue != "" ) updateOctree( oldValue );

			//	Exit edit mode.
				if ( newValue == "" ) exitFromEditMode();

			//	Switch to edit mode.
				if ( newValue != "" ) switchToEditMode( newValue );

			//	Display vectors direct from editor.
				displayVectorValues( vectorSelect.value );
			//	callWatchers(vectorSelect, "value");

			});

		})();

	//	Editor Object3D watchers.

		(function(){

			watch( editor, "type", function(prop, action, newValue, oldValue){
				debugMode && console.log( "type:", prop, action, newValue );
			});

			watch( editor, "visible", function(prop, action, newValue, oldValue){
				debugMode && console.log( "visible:", prop, action, newValue );
			});

			watch( editor.position, function(prop, action, newValue, oldValue){
			//	debugMode && console.log( "position:", prop, action, newValue );
				if ( newValue === undefined ) return;
				if ( vectorSelect.value !== "position" ) return;
				if ( prop === "x" ) vect_x_input.value = newValue.toFixed(3);
				if ( prop === "y" ) vect_y_input.value = newValue.toFixed(3);
				if ( prop === "z" ) vect_z_input.value = newValue.toFixed(3);
			});

			watch( editor.rotation, function(prop, action, newValue, oldValue){
			//	debugMode && console.log( "rotation:", prop, action, newValue );
				if ( newValue === undefined ) return;
				if ( vectorSelect.value !== "rotation" ) return;
				if ( prop === "_x" ) vect_x_input.value = (RAD2DEG*newValue).toFixed(2);
				if ( prop === "_y" ) vect_y_input.value = (RAD2DEG*newValue).toFixed(2);
				if ( prop === "_z" ) vect_z_input.value = (RAD2DEG*newValue).toFixed(2);
			});

			watch( editor.scale, function(prop, action, newValue, oldValue){
			//	debugMode && console.log( "scale:", prop, action, newValue );
				if ( newValue === undefined ) return;
				if ( vectorSelect.value !== "scale" ) return;
				if ( prop === "x" ) vect_x_input.value = (100*newValue).toFixed(2);
				if ( prop === "y" ) vect_y_input.value = (100*newValue).toFixed(2);
				if ( prop === "z" ) vect_z_input.value = (100*newValue).toFixed(2);
				vect_w_input.value = (100 * ( ( editor.scale.x+editor.scale.y+editor.scale.z )/3 ) ).toFixed(2);
			});

			watch( editor.quaternion, function(prop, action, newValue, oldValue){
			//	debugMode && console.log( "quaternion:", prop, action, newValue );
				if ( newValue === undefined ) return;
				if ( vectorSelect.value !== "quaternion" ) return;
				if ( prop === "_x" ) vect_x_input.value = newValue.toFixed(3);
				if ( prop === "_y" ) vect_y_input.value = newValue.toFixed(3);
				if ( prop === "_z" ) vect_z_input.value = newValue.toFixed(3);
				if ( prop === "_w" ) vect_w_input.value = newValue.toFixed(3);
			});

		})();

		function displayVectorValues( vector ){

			if ( vector === "position" ) {
				vect_x_input.value = ( editor[ vector ].x ).toFixed(3);
				vect_y_input.value = ( editor[ vector ].y ).toFixed(3);
				vect_z_input.value = ( editor[ vector ].z ).toFixed(3);
				vect_w_input.value = NaN;
			}

			else if ( vector === "rotation" ) {
				vect_x_input.value = ( RAD2DEG*editor[ vector ].x ).toFixed(2);
				vect_y_input.value = ( RAD2DEG*editor[ vector ].y ).toFixed(2);
				vect_z_input.value = ( RAD2DEG*editor[ vector ].z ).toFixed(2);
				vect_w_input.value = editor[ vector ].order;
			} 

			else if ( vector === "scale" ) {
				vect_x_input.value = ( 100*editor[ vector ].x ).toFixed(2);
				vect_y_input.value = ( 100*editor[ vector ].y ).toFixed(2);
				vect_z_input.value = ( 100*editor[ vector ].z ).toFixed(2);
				vect_w_input.value = ( 100*(editor[vector].x + editor[vector].y + editor[vector].z) / 3 ).toFixed(2);
			}

			else if ( vector === "quaternion" ) {
				vect_x_input.value = ( editor[ vector ].x ).toFixed(3);
				vect_y_input.value = ( editor[ vector ].y ).toFixed(3);
				vect_z_input.value = ( editor[ vector ].z ).toFixed(3);
				vect_w_input.value = ( editor[ vector ].w ).toFixed(3);
			}

			else {
				vect_x_input.value = ( editor[ vector ].x ).toFixed(2);
				vect_y_input.value = ( editor[ vector ].y ).toFixed(2);
				vect_z_input.value = ( editor[ vector ].z ).toFixed(2);
				vect_w_input.value = NaN;
			}

		}

		function addtoOctree( value ){
			var id = parseInt( value );
			if ( id === NaN ) return;
			var object = scene.getObjectById( id );
			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;
			if ( !object.geometry.isGeometry ) return;
			var uuid = object.geometry.uuid;
		//	if not child of localPlayer import to octree.
			if ( !localPlayer.getObjectById(object.id) )
				octree.importThreeMesh( object );
			return object;
		}

		function removefromOctree( value ){
			var id = parseInt( value );
			if ( id === NaN ) return;
			var object = scene.getObjectById( id );
			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;
			if ( !object.geometry.isGeometry ) return;
			var uuid = object.geometry.uuid;
			octree.removeThreeMesh( uuid );
			return object; // important!
		}

		function updateOctree( value ){
			var object = removefromOctree( value );
			if ( !object ) return;
		//	if not child of localPlayer import to octree.
			if ( !localPlayer.getObjectById(object.id) ) {
				octree.importThreeMesh( object );
			}
		}

		function octreeIncluded( uuid ){
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
			debugMode && console.log( "octreeIncluded:", result );
			return result;
		}

		function exitFromEditMode(){
			takeCameraControls( localPlayer );
			keyInputControls.isDisabled = false;
			entitySelect.value = entity_droplist.value = "";
			return void 0;
		}

		function switchToEditMode( value ){

			if ( !checkId( value ) ) return exitFromEditMode();

			var id = parseInt( value );
			var object = getObjectByEntityId( id );
			if ( !object ) return exitFromEditMode();

		//	Take camera controls.
			if ( object.geometry && object.geometry.boundingSphere ) {
				var offset = object.geometry.boundingSphere.center;
				cameraControls.trackObject = object;
				cameraControls.offset.copy( offset );
				cameraControls.offset.y *= 0.5;
			} else takeCameraControls( object );

		//	Update editor object.
			editor.update( id );

		//	Disable key input controls.
			keyInputControls.isDisabled = true;
		}

	//	Geometry.

		(function(){

			plane_geometry_button && plane_geometry_button.addEventListener( "click", function(){

				var material = new THREE.MeshStandardMaterial({side:2});
			//	var entity_droplist = document.getElementById("entities-droplist");

			//	Create plane.
				var w = 1, h = 1, d = 1;
				var x = 0, y = h/2, z =  0;
				var plane = new THREE.PlaneGeometry(w,h,d);
				plane.translate(0, h/2, 0);
				var mesh = new THREE.Mesh(plane, material);
				mesh.name = "plane "+ k++;
				mesh.position.set(x,0,z);
				scene.add( mesh );

			//	Create entity.
				entities.push({id:mesh.id})

			//	Create option.
				var name = mesh.name;
				var uuid = mesh.uuid;
				var option = document.createElement("option");
				var text = ""+mesh.id+"."+mesh.type+":"+mesh.name;
				option.text = text;
				option.value = mesh.id;
				entity_droplist.appendChild( option );

			//	Set new value.
				entitySelect.value = entity_droplist.value = mesh.id.toString();
			//	entity_droplist.dispatchEvent(new Event("change")); // important!

			});

			box_geometry_button && box_geometry_button.addEventListener( "click", function(){

				var material = new THREE.MeshStandardMaterial();
			//	var entity_droplist = document.getElementById("entities-droplist");

			//	Create box.
				var w = 1, h = 1, d = 1;
				var x = 0, y = h/2, z =  0;
				var box = new THREE.BoxGeometry(w,h,d);
			//	box.translate(0, h/2, 0);
				var mesh = new THREE.Mesh(box, material);
				mesh.name = "box "+ k++;
				mesh.position.set(x,0,z);
				scene.add( mesh );

			//	Create entity.
				entities.push({id:mesh.id})

			//	Create option.
				var name = mesh.name;
				var uuid = mesh.uuid;
				var option = document.createElement("option");
				var text = ""+mesh.id+"."+mesh.type+":"+mesh.name;
				option.text = text;
				option.value = mesh.id;
				entity_droplist.appendChild( option );

			//	Set new value.
				entitySelect.value = entity_droplist.value = mesh.id.toString();
			//	entity_droplist.dispatchEvent(new Event("change")); // important!

			});

		})();

	//	Editor Undo/Redo eventListner.

		window.addEventListener("keyup", function(e){ 

			if ( e.code !== "KeyZ" ) return; // important!
			if ( !editor.isEditing ) return; // important!

			var keyZ = e.code === "KeyZ";    // important!

			var modifiers = keyboard.modifiers;
			var REDO = modifiers["ctrl"] &&  modifiers["shift"] && keyZ;
			var UNDO = modifiers["ctrl"] && !modifiers["shift"] && keyZ;

			( UNDO && editor.undo() ) || ( REDO && editor.redo() ); 
		});

	//	Init editor.

		editor.reset();

	})( editor );


/*
//	Move on axis Y (up/down).

	function translateOnScreenAxisY( dt, object, mode, down ){
		if ( !object ) return;
		var rad = 0;
		var verticalAngle;
		var movementSpeed = Math.max(dt, 0.01); // step.
		var cameraFrontAngle = cameraControls.phi;
		if (down) verticalAngle = -Math.PI/2; // down.
		else verticalAngle      =  Math.PI/2; // up.
		var direction = rad - cameraFrontAngle + verticalAngle;
		var directionOnAxisY = Math.sin(direction);
		var y = directionOnAxisY * movementSpeed;
		object[mode].y += y; 
	}

//	Move on plane XZ (left/right/forwards/backward).

	function translateOnScreenPlaneXZ( dt, object, mode ) {
		if ( !object ) return;
		var rad = 2 * Math.PI;  // keyboard input.
		var movementSpeed = Math.max(dt, 0.01); // step.
		var cameraFrontAngle = rad + cameraControls.theta;
	//	var keyboardFrontAngle = keyboard.frontAngle;
		var direction = rad - cameraFrontAngle; // + keyboard.frontAngle;
		var directionOnAxisX = -Math.sin(direction);
		var directionOnAxisZ = -Math.cos(direction);
		var x = directionOnAxisX * movementSpeed;
		var z = directionOnAxisZ * movementSpeed;
		object[mode].x += x; 
		object[mode].z += z;
	}
*/

//	Editor systems.

//	const axisX = new THREE.Vector3(1,0,0);
//	const axisY = new THREE.Vector3(0,1,0);
//	const axisZ = new THREE.Vector3(0,0,1);

//	const keyboard = new KeyboardState();
//	const keyCodes = keyboard.keyCodes;

	window.addEventListener("keyup",   function(){ updateKeyboardFrontAngle( keyboard ); });
	window.addEventListener("keydown", function(){ updateKeyboardFrontAngle( keyboard ); });

	function updateKeyboardFrontAngle( keyboard ){

		const rad = Math.PI/4;
		const keyCodes = keyboard.keyCodes;
		var A=65, D=68, S=83, W=87;
		var Left=37, Up=38, Right=39, Down=40;

		var UP    = keyCodes[W] || keyCodes[Up];
		var LEFT  = keyCodes[A] || keyCodes[Left];
		var DOWN  = keyCodes[S] || keyCodes[Down];
		var RIGHT = keyCodes[D] || keyCodes[Right];

	//	debugMode && console.log( UP, LEFT, DOWN, RIGHT );

		if (  UP && !LEFT && !DOWN && !RIGHT ) keyboard.frontAngle = 0 * rad; //   0 deg.
		else if (  UP &&  LEFT && !DOWN && !RIGHT ) keyboard.frontAngle = 1 * rad; //  45 deg.
		else if ( !UP &&  LEFT && !DOWN && !RIGHT ) keyboard.frontAngle = 2 * rad; //  90 deg.
		else if ( !UP &&  LEFT &&  DOWN && !RIGHT ) keyboard.frontAngle = 3 * rad; // 135 deg.
		else if ( !UP && !LEFT &&  DOWN && !RIGHT ) keyboard.frontAngle = 4 * rad; // 180 deg.
		else if ( !UP && !LEFT &&  DOWN &&  RIGHT ) keyboard.frontAngle = 5 * rad; // 225 deg.
		else if ( !UP && !LEFT && !DOWN &&  RIGHT ) keyboard.frontAngle = 6 * rad; // 270 deg.
		else if (  UP && !LEFT && !DOWN &&  RIGHT ) keyboard.frontAngle = 7 * rad; // 315 deg.
	//	else if ( !UP && !LEFT && !DOWN && !RIGHT ) keyboard.frontAngle = 8 * rad; // 360 deg.

	}

//	## EditorRotationSystem.

	function EditorRotationSystem(dt, entity){

		try {

			if ( entity.id.toString() != entity_droplist.value ) return;

			var object = scene.getObjectById( entity.id );
			var required = object && object.geometry && object.rotation;
			if ( !required ) return; // important!

			var rad = Math.max(dt, 0.02);
			var keyCodes = keyboard.keyCodes;
			var UP=38, DOWN=40, LEFT=37, RIGHT=39;
			var D=68, A=65, W=87, S=83, R=82, F=70;

		//	Rotation (local coordinates).
			keyCodes[ UP ]  && object.rotateOnAxis( axisX,  rad );
			keyCodes[DOWN]  && object.rotateOnAxis( axisX, -rad );
			keyCodes[LEFT]  && object.rotateOnAxis( axisY, -rad );
			keyCodes[RIGHT] && object.rotateOnAxis( axisY,  rad );

		//	Reset rotation.
			keyCodes[R] && object.rotation.set(0,0,0);
			keyCodes[F] && object.setRotationFromQuaternion(camera.quaternion);

		//	Update editor object.
			object && object.rotation && editor.rotation.copy( object.rotation ); // important!

		} catch(err){
			debugMode && console.error( "EditorRotationError:", err );
		};

	}

//	## EditorTranslationSystem.

	function EditorTranslationSystem(dt, entity){

		try {

			if ( entity.id.toString() != entity_droplist.value ) return;

			var object = scene.getObjectById( entity.id );
			var required = object && object.geometry && object.position;
			if ( !required ) return; // important!

			var keyCodes = keyboard.keyCodes;
			var object = scene.getObjectById( entity.id );
			var LEFT=37, RIGHT=39, UP=38, DOWN=40;
			var A=65, D=68, E=69, F=70, Q=81, R=82, S=83, W=87;

		//	Move up/down.

			if ( keyCodes[E] || keyCodes[Q] ) (function(up, down){

				var rad = 0;
				var keyboardFrontAngle = 0;
				var movementSpeed = Math.max(dt, 0.05);
				var cameraFrontAngle = cameraControls.phi;
				if ( up ) keyboardFrontAngle =  Math.PI/2;
				if (down) keyboardFrontAngle = -Math.PI/2;
				var direction = rad - cameraFrontAngle + keyboardFrontAngle;
				var directionOnAxisY = Math.sin(direction);
				var y = directionOnAxisY * movementSpeed;
				object.position.y += y; 

			})( keyCodes[E], keyCodes[Q] );

		//	Move left/right/forwards/backward

			if (  keyCodes[W] || keyCodes[A] 
				|| keyCodes[S] || keyCodes[D] ) (function() {

			//	var rad = 6 * Math.PI/4;  // joystick input.
				var rad = 8 * Math.PI/4;  // keyboard input.
				var movementSpeed = Math.max(dt, 0.05);
				var cameraFrontAngle = cameraControls.getFrontAngle();
				var keyboardFrontAngle = keyboard.frontAngle;
				var direction = rad - cameraFrontAngle + keyboardFrontAngle;
				var directionOnAxisX = -Math.sin(direction);
				var directionOnAxisZ = -Math.cos(direction);
				var x = directionOnAxisX * movementSpeed;
				var z = directionOnAxisZ * movementSpeed;
				object.position.x += x; 
				object.position.z += z;

			})();

		//	Update editor object.
			object && object.position && editor.position.copy( object.position ); // important!

		} catch(err){
			debugMode && console.error( "EditorTranslationError:", err );
		};

	}

//	## EditorScalingSystem.

	function EditorScalingSystem(dt, entity){

		try {

			if ( entity.id.toString() != entity_droplist.value ) return;

			var object = scene.getObjectById( entity.id );
			var required = object && object.geometry && object.scale;
			if ( !required ) return; // important!

			//	TODO.

		//	Update editor object.
			object && object.scale && editor.scale.copy( object.scale ); // important!

		} catch(err){
			debugMode && console.error( "EditorScalingError:", err );
		};

	}

//	const clock = new THREE.Clock();

	(function update(){

	//	EditMode Loop.

		var dt = clock.getDelta();
		requestFrameID = requestAnimationFrame( update );

		for (var i = 0; i < entities.length; i++){

			var entity = entities[i];
			if ( entity.id === scene.id ) continue; // important!
			if ( entity.id === camera.id ) continue; // important!
			if ( entity.id === editor.id ) continue; // important!
			if ( entity.id === localPlayer.id ) continue; // important!
			if ( entity.id === cameraLight.id ) continue; // important!
			if ( entity.id === shadowCameraHelper.id ) continue; // important!
			if ( parseInt( entity_droplist.value ) === NaN ) continue; // important!
			if ( entity.id !== parseInt( entity_droplist.value ) ) continue; // very important!

			EditorScalingSystem(dt, entity);
			EditorRotationSystem(dt, entity);
			EditorTranslationSystem(dt, entity);

		}

	})();

/*
//	!!! DEMO !!! IMPORTANT! !!! DEMO !!! IMPORTANT! !!! DEMO !!!
	function translateOnScreenAxis( object ){
	//	(from MW character controller).
	//	var rad = 3 * Math.PI/2 // joystick input.
		var rad = 2 * Math.PI;  // keyboard input.
		var movementSpeed = 0.05; // (m/fps) => 5cm/fps
		var cameraFrontAngle = cameraControls.getFrontAngle();
		var keyboardFrontAngle = keyboard.frontAngle;
		var direction = rad - cameraFrontAngle + keyboardFrontAngle;
		var directionOnAxisX = -Math.sin(direction);
		var directionOnAxisZ = -Math.cos(direction);
		var x = directionOnAxisX * movementSpeed;
		var z = directionOnAxisZ * movementSpeed;
		var velocity = new THREE.Vector3(x,0,z);
		object.position.x += velocity.x; 
		object.position.z += velocity.z;
	}
//	!!! DEMO !!! IMPORTANT! !!! DEMO !!! IMPORTANT! !!! DEMO !!!
*/
















