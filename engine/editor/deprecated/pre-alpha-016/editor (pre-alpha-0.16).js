//	keyboard.js

	const keyboard = new KeyboardState();
	const keyCodes = keyboard.keyCodes;

	const axisX = new THREE.Vector3(1,0,0);
	const axisY = new THREE.Vector3(0,1,0);
	const axisZ = new THREE.Vector3(0,0,1);


//	keyboard frontAngle eventListeners.
	window.addEventListener("keyup",   function(){ updateKeyboardFrontAngle( keyboard ); });
	window.addEventListener("keydown", function(){ updateKeyboardFrontAngle( keyboard ); });

	function updateKeyboardFrontAngle( keyboard ){

		const rad = Math.PI/4;
		const keyCodes = keyboard.keyCodes;
		const A=65, D=68, S=83, W=87;
		const Left=37, Up=38, Right=39, Down=40;

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

//	editor.js
//	Create an Object3D to hold editor values.
	const object3DEditor = (function( editor ){

		var k = 0;

		const undo = [];
		const redo = [];

		const RAD2DEG = THREE.Math.RAD2DEG;
		const DEG2RAD = THREE.Math.DEG2RAD;

	//	Editor helper (debug).
	//	editor.helper = (function(){
	//		var sphere = new THREE.SphereGeometry();
	//		var geometry = new THREE.EdgesGeometry( sphere );
	//		var material = new THREE.LineBasicMaterial( { color: 0xffff00 } );
	//		var editorHelper = new THREE.LineSegments( geometry, material );
	//		editorHelper.name = "Editor Helper";
	//		(function update(){
	//			requestAnimationFrame(update);
	//			editorHelper.scale.copy( editor.scale );
	//			editorHelper.rotation.copy( editor.rotation );
	//			editorHelper.position.copy( editor.position );
	//		})();
	//		return editorHelper;
	//	})();

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

		const redo_button = document.getElementById("editor-redo-button");
		const undo_button = document.getElementById("editor-undo-button");
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
		//	if ( localPlayer.getObjectById( id ) ) return false; // localPlayer child.
		//	debugMode && console.log( "checkId:", true );

			return true;
		}

		function getObjectByEntityId( value ){

			var check = checkId( value );
			if ( !check ) return undefined;
			var id = parseInt( value );
			return scene.getObjectById( id );
		}

		function resetEntitySelectValue(){
			entitySelect.value = entity_droplist.value = "";
		}

		function resetGeometryTypeValue(){
			geometryType.value = geometry_droplist.value = "";
		}

		function updateEntitySelectValue(){
			entitySelect.value = entity_droplist.value;
		}

		function updateVectorSelectValue(){
			vectorSelect.value = vector_droplist.value;
		}

		function addtoCameraRigidObjects( value ){
			var id = parseInt(value);
			if ( localPlayer.getObjectById(id) ) return; // localPlayer child.
			var object = getObjectByEntityId( value );
			if ( object && cameraControls.rigidObjects.findIndex( 
				function( item ){ 
					return item.id === object.id;
				}) > -1 ) return; // already exists in rigidObjects.
			object && cameraControls.rigidObjects.push( object );
		}

		function removefromCameraRigidObjects( value ){
			var index = cameraControls.rigidObjects
			.findIndex( function( object ){
				return object.id === parseInt( value );
			});
			if ( index < 0 ) return; // important!
			cameraControls.rigidObjects.splice( index, 1 );
		}

		function addToUndo(){
			redo.length = 0; // important!
			var json = editor.toJSON();
			json && undo.unshift( json );
		//	debugMode && console.log( "addToUndo!" );
		}

		function addToRedo(){
			var json = editor.toJSON();
			json && redo.unshift( json );
			debugMode && console.log( "addToRedo!" );
		}

		editor.reset = function(){
			editor.copy( new THREE.Object3D() );
			editor.name = "Editor";
			editor.isEditing = false; // edit mode off.
			undo.length = 0; redo.length = 0; // clear undo/redo.
			cancelAnimationFrame( editor.requestFrameID ); // cancel object update loop, important!
		//	debugMode && console.log( "editor reset:", editor );
		};

		editor.update = function( value ){

		//	Reset editor.
			editor.reset();

		//	Get new object.
			var object = getObjectByEntityId( value ); 

			if ( !object ) return false;

		//	Copy object.
			object && editor.copy( object );

		//	Edit mode.
			editor.isEditing = !!object;

		//	object update loop.
			object && (function update(){

				if ( object && editor.isEditing ) {

					object.scale.copy( editor.scale );
					object.rotation.copy( editor.rotation );
					object.position.copy( editor.position );
					editor.requestFrameID = requestAnimationFrame(update);
					return; // important!

				} 

				cancelAnimationFrame( editor.requestFrameID ); // important!

			})();

		//	keep initial state.
			object && editor.isEditing && addToUndo();
		//	debugMode && console.log( "editor updated:", object );

			return true;
		};

	//	Editor undo/redo.

		(function(){

			var interval;

			editor.undo = function(){ 

				if ( !undo.length ) return;

			//	Get undo json.
				var json = undo.shift();

				if ( !json ) return;

			//	Move json to redo.
				redo.unshift( json );

				clearTimeout( interval );
				interval = setTimeout( function(){

				//	Copy state (undo).
					var loader = new THREE.ObjectLoader();
					editor.copy( loader.parse( json ) );

				}, 250);
			};

			editor.redo = function(){

				if ( !redo.length ) return;

			//	Get redo json.
				var json = redo.shift();

				if ( !json ) return;

			//	Move json to undo.
				undo.unshift( json );

				clearTimeout( interval );
				interval = setTimeout( function(){

				//	Copy state (redo).
					var loader = new THREE.ObjectLoader();
					editor.copy( loader.parse( json ) );

				}, 250);
			};

		})();

	//	Editor Tab eventListners.

		(function(){

			var interval;
			var edgeshelper;

			function destroyEdgesHelper(){
				if ( !edgeshelper ) return;
				scene.remove( edgeshelper ); 
				entities.remove( edgeshelper.id );
				edgeshelper.geometry.dispose();
				edgeshelper.material.dispose();
				edgeshelper = undefined;
			}

			function createEdgesHelper( object ){

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
				entities.add( helper );
				edgeshelper = helper;
			}

		//	edgeshelper watcher.

			watch(entitySelect, function( prop, action, newValue, oldValue ){

			//	vectorSelect.value = vector_droplist.value; // important!

			//	Old edges helper.
				destroyEdgesHelper(); // old edges helper.

			//	Get object.
				var object = getObjectByEntityId( newValue );

			//	New edges helper.
				object && createEdgesHelper( object ); // new edges helper.

			});

		//	keyInput addtoUndo/addtoUndo eventListner.

			(function(){

				var interval;

				var keyCodes = keyboard.keyCodes;
				var modifiers = keyboard.modifiers;
				var LEFT=37, UP=38, RIGHT=39, DOWN=40;
				var A=65, D=68, E=69, F=70, G=71, H=72, Q=81, R=82, S=83, W=87, Z=90;

				function editKeyIsNotDown(){
					return !keyCodes[A]  && !keyCodes[D]  && !keyCodes[E]  
						&& !keyCodes[F]  && !keyCodes[Q]  && !keyCodes[R] 
						&& !keyCodes[S]  && !keyCodes[W]  && !keyCodes[G]  && !keyCodes[H]
						&& !keyCodes[37] && !keyCodes[38] && !keyCodes[39] && !keyCodes[40];
				}

				function isEditorKey(event){
					return event.code === "KeyA"    || event.code === "KeyD"       || event.code === "KeyE"
						|| event.code === "KeyF"    || event.code === "KeyQ"       || event.code === "KeyR"
						|| event.code === "KeyS"    || event.code === "KeyW"       || event.code === "KeyG"
						|| event.code === "KeyH"    || event.code === "ArrowLeft"  
						|| event.code === "ArrowUp" || event.code === "ArrowRight" || event.code === "ArrowDown";
				}

				function modifierIsDown(){
					return modifiers.shift || modifiers.ctrl || modifiers.alt || modifiers.meta;
				}

				window.addEventListener( "keyup", function(e){
				//	debugMode && console.log( "isEditKey:", isEditorKey(e) );

					clearTimeout( interval );

					if ( !isEditorKey(e) )   return;
					if ( !editor.isEditing ) return;
					if (  modifierIsDown() ) return;

				//	debugMode && console.log( "editKeyIsNotDown:", editKeyIsNotDown() );

					if ( isEditorKey(e) && editKeyIsNotDown() && !modifierIsDown() ) {
						interval = setTimeout( function(){
							editor.isEditing && editKeyIsNotDown() && !modifierIsDown() && addToUndo();
						}, 1000);
					}

				});

			})();

		//	mouse eventListner.

			function updateState( button ){

			//  object become editor.
			//	update() become updateState().
			//	update editor state by button click.

				var vector = vectorSelect.value;

				if ( vector === "position" ) {
					var step = 1/100; // 1 cm.
					if ( button === vect_x_increase ) editor.position.x += step/10; // 1 mm.
					if ( button === vect_y_increase ) editor.position.y += step/10; // 1 mm.
					if ( button === vect_z_increase ) editor.position.z += step/10; // 1 mm.
					if ( button === vect_x_decrease ) editor.position.x -= step/10; // 1 mm.
					if ( button === vect_y_decrease ) editor.position.y -= step/10; // 1 mm.
					if ( button === vect_z_decrease ) editor.position.z -= step/10; // 1 mm.
				}

				else if ( vector === "rotation" ) {
					var step = Math.PI/180; // 1 deg.
					if ( button === vect_x_increase ) editor.rotateOnAxis( axisX,  step/10 ); // 0.1 deg.
					if ( button === vect_y_increase ) editor.rotateOnAxis( axisY,  step/10 ); // 0.1 deg.
					if ( button === vect_z_increase ) editor.rotateOnAxis( axisZ,  step/10 ); // 0.1 deg.
					if ( button === vect_x_decrease ) editor.rotateOnAxis( axisX, -step/10 ); // 0.1 deg.
					if ( button === vect_y_decrease ) editor.rotateOnAxis( axisY, -step/10 ); // 0.1 deg.
					if ( button === vect_z_decrease ) editor.rotateOnAxis( axisZ, -step/10 ); // 0.1 deg.
				}

				else if ( vector === "scale" ) {

					var step = 1/100; // 1 %

					if ( button === vect_x_increase ) {
						editor.scale.x += step/10;     // 0.1 %.
						if ( Math.abs( editor.scale.x ) < step/10 ) 
							editor.scale.x = step/10;  // avoid scale.x:0.
					} else if ( button === vect_y_increase ) {
						editor.scale.y += step/5;      // 0.1 %.
						if ( Math.abs( editor.scale.y ) < step/10 ) 
							editor.scale.y = step/10;  // avoid scale.x:0.
					} else if ( button === vect_z_increase ) {
						editor.scale.z += step/5;      // 0.1 %.
						if ( Math.abs( editor.scale.z ) < step/10 ) 
							editor.scale.z = step/10;  // avoid scale.x:0.
					} else if ( button === vect_w_increase ) {
						editor.scale.x += step/10;     // 0.1 %.
						editor.scale.y += step/10;     // 0.1 %.
						editor.scale.z += step/10;     // 0.1 %.
						if ( Math.abs( editor.scale.x ) < step/10 ) 
							editor.scale.x = step/10;  // avoid scale.x:0.
						if ( Math.abs( editor.scale.y ) < step/10 ) 
							editor.scale.y = step/10;  // avoid scale.y:0.
						if ( Math.abs( editor.scale.z ) < step/10 ) 
							editor.scale.z = step/10;  // avoid scale.z:0.
					} else if ( button === vect_x_decrease ) {
						editor.scale.x -= step/10;     // 0.1 %,
						if ( Math.abs( editor.scale.x ) < step/10 ) 
							editor.scale.x = -step/10; // avoid scale.x:0,
					} else if ( button === vect_y_decrease ) {
						editor.scale.y -= step/10;     // 0.1 %,
						if ( Math.abs( editor.scale.y ) < step/10 ) 
							editor.scale.y = -step/10; // avoid scale.y:0,
					} else if ( button === vect_z_decrease ) {
						editor.scale.z -= step/10;     // 0.1 %,
						if ( Math.abs( editor.scale.z ) < step/10 ) 
							editor.scale.z = -step/10; // avoid scale.z:0,
					} else if ( button === vect_w_decrease ) {
						editor.scale.x -= step/10;     // 0.1 %,
						editor.scale.y -= step/10;     // 0.1 %,
						editor.scale.z -= step/10;     // 0.1 %,
						if ( Math.abs( editor.scale.x ) < step/10 ) 
							editor.scale.x = -step/10; // avoid scale.x:0,
						if ( Math.abs( editor.scale.y ) < step/10 ) 
							editor.scale.y = -step/10; // avoid scale.y:0,
						if ( Math.abs( editor.scale.z ) < step/10 ) 
							editor.scale.z = -step/10; // avoid scale.z:0,
					}
				}

				else if ( vector === "quaternion" ) {
					var step = 1/100;
					if ( button === vect_x_increase ) editor.quaternion.x += step/10; // 0.001
					if ( button === vect_y_increase ) editor.quaternion.y += step/10; // 0.001
					if ( button === vect_z_increase ) editor.quaternion.z += step/10; // 0.001
					if ( button === vect_w_increase ) editor.quaternion.w += step/10; // 0.001

					if ( button === vect_x_decrease ) editor.quaternion.x -= step/10; // 0.001
					if ( button === vect_y_decrease ) editor.quaternion.y -= step/10; // 0.001
					if ( button === vect_z_decrease ) editor.quaternion.z -= step/10; // 0.001
					if ( button === vect_w_decrease ) editor.quaternion.w -= step/10; // 0.001
				}

			}

			function onMouseClick(){ 

				clearTimeout( interval ); // important!
				if ( !editor.isEditing ) return;

			//	Update button.
				editor.isEditing && updateState( this );

			//	Edges helper.
				destroyEdgesHelper(); // old edges helper.

				setTimeout( function(){
					var value = entitySelect.value;
					var object = getObjectByEntityId( value );
					object && createEdgesHelper( object );  // new edges helper.
				});

			//	Undo/Redo.
				editor.isEditing && addToUndo();

				debugMode && console.log( "on Mouse Click:", interval );
			}

			function onMouseDown(){ 

				if ( !editor.isEditing ) return;

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function onUpdate() {
					if ( !editor.isEditing ) return;

					editor.isEditing && updateState( button );

					var dt = clock.getDelta();
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

		//	input eventListeners.

			vect_x_input.addEventListener( "change", function(){

				this.blur(); // important!
				var vector = vectorSelect.value;
				var thisValue = parseFloat( this.value );

				if ( !editor.isEditing ) 
					return void( this.value = editor[vector].x.toFixed(2) );
				else if ( vector === "scale" ) {
					if ( !thisValue ) 
						return void( editor.scale.x = 0.001 ); // avoid scale.x:0/NaN,
					else editor.scale.x = thisValue/100;
					if ( Math.abs( editor.scale.x ) < 0.001 ) editor[ vector ].x = 0.001; 
					addToUndo(); // Add undo state.
				} 
				else if ( thisValue == NaN )
					return void( this.value = editor[vector].x.toFixed(2) );
				else if ( vector === "rotation" ) {
					editor[ vector ].x = DEG2RAD*thisValue;
					addToUndo(); // Add undo state.
				} else {
					editor[ vector ].x = thisValue;
					addToUndo(); // Add undo state.
				}
			});

			vect_y_input.addEventListener( "change", function(){

				this.blur(); // important!
				var vector = vectorSelect.value;
				var thisValue = parseFloat( this.value );

				if ( !editor.isEditing ) 
					return void( this.value = editor[vector].y.toFixed(2) );
				else if ( vector === "scale" ) {
					if ( !thisValue ) 
						return void( editor.scale.y = 0.001 ); // avoid scale.y:0/NaN,
					else editor.scale.y = thisValue/100;
					if ( Math.abs( editor.scale.y ) < 0.001 ) editor[ vector ].y = 0.001; 
					addToUndo(); // Add undo state.
				} 
				else if ( thisValue == NaN )
					return void( this.value = editor[vector].y.toFixed(2) );
				else if ( vector === "rotation" ) {
					editor[vector].y = DEG2RAD*thisValue;
					addToUndo(); // Add undo state.
				} else {
					editor[vector].y = thisValue;
					addToUndo(); // Add undo state.
				}
			});

			vect_z_input.addEventListener( "change", function(){

				this.blur(); // important!
				var vector = vectorSelect.value;
				var thisValue = parseFloat( this.value );

				if ( !editor.isEditing || thisValue == NaN ) 
					return void( this.value = editor[vector].z.toFixed(2) );
				else if ( vector === "scale" ) {
					if ( !thisValue ) 
						return void( editor.scale.z = 0.001 ); // avoid scale.z:0/NaN,
					else editor.scale.z = thisValue/100;
					if ( Math.abs( editor.scale.z ) < 0.001 ) editor[ vector ].z = 0.001; 
					addToUndo(); // Add undo state.
				} 
				else if ( thisValue == NaN )
					return void( this.value = editor[vector].z.toFixed(2) );
				else if ( vector === "rotation" ) {
					editor[vector].z = DEG2RAD*thisValue;
					addToUndo(); // Add undo state.
				} else {
					editor[vector].z = thisValue;
					addToUndo(); // Add undo state.
				}
			});

			vect_w_input.addEventListener( "change", function(){

				this.blur(); // important!
				var vector = vectorSelect.value;
				var thisValue = parseFloat( this.value );

				if ( !editor.isEditing ) {
					return void( this.value = NaN );
				} else if ( vector === "rotation" ) {
					this.value = editor.rotation.order;
				} else if ( vector === "scale" ) {

					if ( !thisValue ) {
						editor.scale.x = 0.001; // avoid scale.x:0/NaN,
						editor.scale.y = 0.001; // avoid scale.y:0/NaN,
						editor.scale.z = 0.001; // avoid scale.z:0/NaN,
					//	this.value = 0.1.toFixed(2);
					} else {
						editor.scale.x = thisValue/100;
						editor.scale.y = thisValue/100;
						editor.scale.z = thisValue/100;
					}

					if ( Math.abs( editor.scale.x ) < 0.001 ) editor.scale.x = 0.001; 
					if ( Math.abs( editor.scale.y ) < 0.001 ) editor.scale.y = 0.001; 
					if ( Math.abs( editor.scale.z ) < 0.001 ) editor.scale.z = 0.001; 

					addToUndo(); //	Add undo state.

				} else if ( thisValue == NaN ) { 
				//	reset quaternion.
					editor.scale.set(1,1,1);
					editor.rotation.set(0,0,0);
					editor.quaternion.set(0,0,0,1);
				//	editor.update( entitySelect.value ); // important?
				} else if ( vector === "quaternion" ) {
					editor.quaternion.w = thisValue;
					addToUndo(); //	Add undo state.
				} else this.value = editor[vector].w;

			});

		})();

	//	Droplists.

		(function(){

			entity_droplist.addEventListener("change", onChangeSelectValue );
			vector_droplist.addEventListener("change", onChangeSelectValue );

			function onChangeSelectValue(){

				entity_droplist.blur();
				vector_droplist.blur();

				var value = entity_droplist.value;
				if ( checkId( value ) ) 
					entitySelect.value = entity_droplist.value;      // updateEntitySelectValue();
				else
					entitySelect.value = entity_droplist.value = ""; // resetEntitySelectValue();

				vectorSelect.value = vector_droplist.value;          //	updateVectorSelectValue();
			}

			geometry_droplist.addEventListener("change", function(){
				geometry_droplist.blur();
				geometryType.value = geometry_droplist.value;
			});

			geometryType.value = geometry_droplist.value = "BoxGeometry";

		})();

	//	Buttons.

		(function(){

			var interval;

			redo_button.addEventListener( "click", editor.redo );
			undo_button.addEventListener( "click", editor.undo );

			exit_edit_button.addEventListener( "click", function(){
				clearTimeout(interval);
				interval = setTimeout( resetEntitySelectValue, 250 );
			});

			reset_vectors_button.addEventListener( "click", function(){

				clearTimeout(interval);
				interval = setTimeout(function(){

					var value = entitySelect.value;

					if ( !checkId( value ) ) return editor.reset(); 
					if ( !editor.isEditing ) return editor.reset();

					if ( vectorSelect.value == "position" ) 
						editor.position.set(0,0,0);
					else if ( vectorSelect.value == "rotation" ) 
						editor.rotation.set(0,0,0);
					else if ( vectorSelect.value == "scale" )
						editor.scale.set(1,1,1);
					else if ( vectorSelect.value == "quaternion" )
						editor.quaternion.set(0,0,0,1);
				//	debugMode && console.log("reset", vectorSelect.value);
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
					mesh.name = type.replace("Geometry","") + ":"+mesh.id;
					scene.add( mesh );

				//	Add entity.
					entities.add( mesh );

				//	Add to camera rigid objects.
				//	addtoCameraRigidObjects( mesh.id );

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
						octreeIncludes( uuid ) && octree.removeThreeMesh( uuid );
					})();

				//	remove object.
					object.parent.remove( object );

				//	remove entity and option.
					entities.remove( id ); // important!

				//	Remove from camera rigid objects.
					removefromCameraRigidObjects( id );

				//	Exit edit mode. // resetEntitySelectValue();
					entitySelect.value = entity_droplist.value = "";
				//	entity_droplist.dispatchEvent(new Event("change"));
				}, 250);
			});

		})();

	//	Editor Tab watchers.

		(function(){

			watch(entitySelect, function( prop, action, newValue, oldValue ){
			//	debugMode && console.log( "entitySelect watch:", 
			//	prop, action, "newValue:", newValue, "oldValue:", oldValue  );

				updateOctree( oldValue ); // first, important!

			//	Add to camera rigid objects.
				!!oldValue && addtoCameraRigidObjects( oldValue );

				switchToEditMode( newValue ); // important!

			//	Display vectors direct from editor.
				updateVectorSelectValue();
			//	vectorSelect.value = vector_droplist.value;
				displayVectorValues( vectorSelect.value );

			});

			watch(vectorSelect, function( prop, action, newValue, oldValue ){
			//	debugMode && console.log( "vectorSelect watch:", prop, action, newValue );

			//	Update vectors direct from editor.
				displayVectorValues( vectorSelect.value );

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
			//	debugMode && console.log( "editor.position:", prop, action, newValue );
				if ( newValue === undefined ) return;
				if ( vectorSelect.value !== "position" ) return;
				if ( prop === "x" ) vect_x_input.value = newValue.toFixed(3);
				if ( prop === "y" ) vect_y_input.value = newValue.toFixed(3);
				if ( prop === "z" ) vect_z_input.value = newValue.toFixed(3);
			});

			watch( editor.rotation, function(prop, action, newValue, oldValue){
			//	debugMode && console.log( "editor.rotation:", prop, action, newValue );
				if ( newValue === undefined ) return;
				if ( vectorSelect.value !== "rotation" ) return;
				if ( prop === "_x" ) vect_x_input.value = (RAD2DEG*newValue).toFixed(2);
				if ( prop === "_y" ) vect_y_input.value = (RAD2DEG*newValue).toFixed(2);
				if ( prop === "_z" ) vect_z_input.value = (RAD2DEG*newValue).toFixed(2);
			});

			watch( editor.scale, function(prop, action, newValue, oldValue){
			//	debugMode && console.log( "editor.scale:", prop, action, newValue );
				if ( newValue === undefined ) return;
				if ( vectorSelect.value !== "scale" ) return;
				if ( prop === "x" ) vect_x_input.value = (100*newValue).toFixed(2);
				if ( prop === "y" ) vect_y_input.value = (100*newValue).toFixed(2);
				if ( prop === "z" ) vect_z_input.value = (100*newValue).toFixed(2);
				vect_w_input.value = (100 * ( ( editor.scale.x+editor.scale.y+editor.scale.z )/3 ) ).toFixed(2);
			});

		//	watch( editor.quaternion, function(prop, action, newValue, oldValue){
		//		debugMode && console.log( "editor.quaternion:", prop, action, newValue );
		//		if ( newValue === undefined ) return;
		//		if ( vectorSelect.value !== "quaternion" ) return;
		//		if ( prop === "_x" ) vect_x_input.value = newValue.toFixed(3);
		//		if ( prop === "_y" ) vect_y_input.value = newValue.toFixed(3);
		//		if ( prop === "_z" ) vect_z_input.value = newValue.toFixed(3);
		//		if ( prop === "_w" ) vect_w_input.value = newValue.toFixed(3);
		//	});

		})();

		function addtoOctree( value ){
			var object = getObjectByEntityId( value );

			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;
			if ( !object.geometry.isGeometry ) return;
			if ( localPlayer.getObjectById(object.id) ) return; // child of localPlayer.

		//	Import to octree.
			octree.importThreeMesh( object );
			return object; // important!
		}

		function removefromOctree( value ){
			var object = getObjectByEntityId( value );

			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;
			if ( !object.geometry.isGeometry ) return;

		//	Remove from octree.
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
			if ( localPlayer.getObjectById(object.id) ) return; // child of localPlayer.

		//	Import to octree.
			octree.importThreeMesh( object );
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

		function exitFromEditMode(){
			editor.reset(); // important!
			resetEntitySelectValue();
			takeCameraControls( localPlayer );
			keyInputControls.isDisabled = false;
		//	editor.helper && scene.remove( helper ); // debug!
		//	debugMode && console.log( "exitFromEditMode:", editor );
			return;
		}

		function switchToEditMode( value ){

			if ( editor.update( value ) ) {

				var object = getObjectByEntityId( value );
				if ( !object ) return exitFromEditMode();

			//	camera controls offset.
				if ( object.geometry && object.geometry.boundingSphere ) {
					var offset = object.geometry.boundingSphere.center;
					cameraControls.offset.copy( offset );
					cameraControls.offset.y *= 0.5;
				}

			//	Remove from camera rigid objects.
				removefromCameraRigidObjects( value );

			//	editor take camera controls.
				cameraControls.trackObject = editor;

			//	Disable key input controls.
				keyInputControls.isDisabled = true;

			//	debugMode && editor.isEditing && editor.helper && scene.add( helper );
			//	debugMode && console.log( "switchToEditMode:", object );
			} 

			else exitFromEditMode();

		}

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

	//	Editor Undo/Redo eventListner.

		window.addEventListener( "keypress", function(e){ 

			if ( e.code !== "KeyZ" ) return; // important!
			if ( !editor.isEditing ) return; // important!

			var keyZ = e.code === "KeyZ";    // important!

			var modifiers = keyboard.modifiers;
			var REDO = modifiers["ctrl"] &&  modifiers["shift"] && keyZ;
			var UNDO = modifiers["ctrl"] && !modifiers["shift"] && keyZ;

			( UNDO && editor.undo() ) || ( REDO && editor.redo() ); 
		});

	//	Editor keyInput systems.

		(function(){

			const clock = new THREE.Clock();
			const modifiers = keyboard.modifiers;
			const UP=38, DOWN=40, LEFT=37, RIGHT=39;
			const A=65, D=68, E=69, F=70, G=71, H=72, 
				  Q=81, R=82, S=83, T=84, W=87;

			function modifierIsDown(){
				return modifiers.alt   || modifiers.meta
					|| modifiers.shift || modifiers.ctrl; 
			}

		//	## EditorScalingSystem.

			function EditorScalingSystem( dt ){

				if ( !editor.isEditing ) return;
				if (  modifierIsDown() ) return;

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

		//	## EditorRotationSystem.

			function EditorRotationSystem( dt ){

				if ( !editor.isEditing ) return;
				if (  modifierIsDown() ) return;

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

		//	## EditorTranslationSystem.

			function EditorTranslationSystem( dt ){

				if ( !editor.isEditing ) return;
				if (  modifierIsDown() ) return;

				var UPDOWN = keyCodes[E] || keyCodes[Q];
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

		//	## Editor keyInput loop.

			(function update(){

				var dt = clock.getDelta();
				requestFrameID = requestAnimationFrame( update );

				if ( !editor.isEditing ) return;

				var SCALE = keyCodes[H] || keyCodes[G];
				var ROTATE = keyCodes[W] || keyCodes[A] || keyCodes[S] || keyCodes[D] || keyCodes[R] || keyCodes[F];
				var MOVE = keyCodes[E] || keyCodes[Q] || keyCodes[37] || keyCodes[38] || keyCodes[39] || keyCodes[40];

				SCALE && EditorScalingSystem( dt );
				ROTATE && EditorRotationSystem( dt );
				MOVE && EditorTranslationSystem( dt );

			})();

		})();

	//	Init editor.
		editor.reset();

	//	Add to scene.
		scene.add( editor ); // important!

		return editor;

	})( new THREE.Object3D() );

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
















