//	texture-viewer-center.js

	(function( editor,viewer,vector_x,vector_y,vector_droplist,entity_droplist,getTextureByEntityId ){

//		Stack overflow!!!
//		watch( vector_droplist, "onchange", function( property, event, value ){
//			callWatchers( entity_droplist, "onchange", event, entity_droplist.value );
//		});

		watch( entity_droplist, "onchange", function( property, event, value ){
		//	debugMode && console.log({item:entity_droplist,event:event,value:value});

			if ( value === "" ) {

				viewer.material.map = null;
				viewer.material.needsUpdate = true;
				viewer.material.color.setHex(0x000000);
			//	viewer.center.position.set(-125, 0.1, 125);
				vector_x.value = (0.5 + (viewer.center.position.x/250)).toFixed(2); // display center value (x).
				vector_y.value = (0.5 - (viewer.center.position.z/250)).toFixed(2); // display center value (z).
				return;
			}

			if ( getTextureByEntityId(value) === undefined )  {

				viewer.material.map = null;
				viewer.material.needsUpdate = true;
				viewer.material.color.setHex(0x000000);
			//	viewer.center.position.set(-125, 0.1, 125);
				vector_x.value = (0.5 + (viewer.center.position.x/250)).toFixed(2); // display center value (x).
				vector_y.value = (0.5 - (viewer.center.position.z/250)).toFixed(2); // display center value (z).
				return;
			}

			var texture = getTextureByEntityId( value ); // not need variable (value)!
			//	debugMode && console.log( texture );

			viewer.material.map = texture;
			viewer.material.needsUpdate = true;
			viewer.material.color.setHex(0xffffff);
			if ( viewer.material.map.image !== undefined ) {
				viewer.material.map.needsUpdate = true;
			}

		//	Update viewer center helper.
			viewer.center.position.x = -125 + (250 * editor.center.x);
			viewer.center.position.z =  125 - (250 * editor.center.y);

		});

	})( 
		textureEditor, 
		textureViewer, 
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist"), // entity_droplist.
		getTextureByEntityId // helper function.
	);


//	texture viewer center: on mouse input events.

	(function( editor,viewer,vector_x,vector_y,increase_x,decrease_x,increase_y,decrease_y,vector_droplist,entity_droplist,undo,redo ){

		var state;
		var interval;

	//	keep first mousedown event, ignore next events.

		increase_x.addEventListener( "mousedown", onfirstMouseDown );
		decrease_x.addEventListener( "mousedown", onfirstMouseDown );
		increase_y.addEventListener( "mousedown", onfirstMouseDown );
		decrease_y.addEventListener( "mousedown", onfirstMouseDown );

		function onfirstMouseDown(){
			state = {};
			var key = vector_droplist.value;
			state.key = vector_droplist.value;
			state.value = editor[ key ];
			state.json = editor.toJSON(); // editor json.
		//	Remove on firstMouseDown event listener.
			this.removeEventListener( "mousedown", onfirstMouseDown ); // important!
		//	TODO: You must pass editor undo/redo arrays!
		//	debugMode && console.log( {"state":state,"undo":undo.length,"redo":redo.length} );
		};

		increase_x.addEventListener( "mousedown", onMouseDown );
		decrease_x.addEventListener( "mousedown", onMouseDown );
		increase_y.addEventListener( "mousedown", onMouseDown );
		decrease_y.addEventListener( "mousedown", onMouseDown );

		window.addEventListener( "mouseup", function (){
			clearTimeout( interval ); // important!
		});

		increase_x.addEventListener( "click", onMouseClick );
		decrease_x.addEventListener( "click", onMouseClick );
		increase_y.addEventListener( "click", onMouseClick );
		decrease_y.addEventListener( "click", onMouseClick );

		function onMouseDown(){ 

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return;
			if ( vector_droplist !== "center" ) return;

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var key = vector_droplist.value;
				if ( key !== "center" ) return;

				var step = 1/100, min = 0, max = 1;

				if ( button === increase_x || button === decrease_x ) {
					var value = Number(editor.center.x); // get value from editor.
					if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
					editor.center.x = round(value, 2); // editor watcher updates vector_x value.
				}

				else if ( button === increase_y || button === decrease_y ) {
					var value = Number(editor.center.y); // get value from editor.
					if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
					editor.center.y = round(value, 2); // editor watcher updates vector_y value.
				}

				var dt = clock.getDelta();
				interval = setTimeout( update, dt );
			//	debugMode && console.log( "on update:", interval );

			}, 500);

		} // end onMouseDown.

		function onMouseClick(){

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return;
			if ( vector_droplist !== "center" ) return;

			var button = this;

			var key = vector_droplist.value;
			if ( key !== "center" ) return;

			var step = 1/100, min = 0, max = 1;

		//	Before change the editor[key] value add an undo state in undo queue.
		//	Until now we has adding to Undo after the value has changed. (FIXED!)

			if ( button === increase_x || button === decrease_x ) {
				var value = Number(editor.center.x); // get value from editor.
				if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
				if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
				if ( key === state.key && value !== state.value ) {
					interval = setTimeout( function(){ 
					//	Add on firstMouseDown event listener.
						button.addEventListener( "mousedown", onfirstMouseDown ); // important!
					//	TODO: You must pass editor undo/redo arrays!
					//	try { state.json && undo.unshift( state.json ); // Add to undo.
					//		debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
					//	} catch(err){ console.error("TODO:You must pass undo/redo arrays."); }
					}, 250);
				}
				editor.center.x = round(value, 2); // editor watcher updates vector_x input value.
			}

			else if ( button === increase_y || button === decrease_y ) {
				var value = Number(editor.center.y); // get value from editor.
				if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
				if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
				if ( key === state.key && value !== state.value ) {
					interval = setTimeout( function(){ 
					//	Add on firstMouseDown event listener.
						button.addEventListener( "mousedown", onfirstMouseDown ); // important!
					//	TODO: You must pass editor undo/redo arrays!
					//	try { state.json && undo.unshift( state.json ); // Add to undo.
					//		debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
					//	} catch(err){ console.error("TODO:You must pass undo/redo arrays."); }
					}, 250);
				}
				editor.center.y = round(value, 2); // editor watcher updates vector_y input value.
			}

		} // end onMouseClick.

	})(
		textureEditor, // editor,
		textureViewer, // viewer,
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("li#texture-vector-x-increase"), // increase_x,
		document.querySelector("li#texture-vector-x-decrease"), // decrease_x,
		document.querySelector("li#texture-vector-y-increase"), // increase_y,
		document.querySelector("li#texture-vector-y-decrease"), // decrease_y,
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	//	undo, redo // TODO: pass editor undo/redo arrays.
	);




//	Experimental (Independent texture viewer center helper).
//	if not texture entity selected ( !entity_droplist.value )
//	move texture viewer center but not update texture editor.

	(function(viewer,vector_x,vector_y,increase_x,decrease_x,increase_y,decrease_y,entity_droplist){

		var interval;

		increase_x.addEventListener( "mousedown", onMouseDown );
		decrease_x.addEventListener( "mousedown", onMouseDown );
		increase_y.addEventListener( "mousedown", onMouseDown );
		decrease_y.addEventListener( "mousedown", onMouseDown );

		window.addEventListener( "mouseup", function (){
			clearTimeout( interval ); // important!
		});

		function onMouseDown(){ 

			if ( entity_droplist.value ) return; // important!

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var step = 1, max = 125, min = -125;

				if ( button === increase_x || button === decrease_x ) {
					var value = viewer.center.position.x; // get value from center position (x).
					if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
					viewer.center.position.x = value;  // bypass editor (x).
					vector_x.value = (0.5 + (value/250)).toFixed(2); // bypass editor (x).
				}

				else if ( button === increase_y || button === decrease_y ) {
					var value = viewer.center.position.z; // get value from center position (z).
					if ( button === increase_y ) value = THREE.Math.clamp( value-step, min, max );
					if ( button === decrease_y ) value = THREE.Math.clamp( value+step, min, max );
					viewer.center.position.z = value;  // bypass editor (z).
					vector_y.value = (0.5 - (value/250)).toFixed(2); // bypass editor (z).
				}

				var dt = clock.getDelta();
				interval = setTimeout( update, dt );
			//	debugMode && console.log( "on center update:", interval );

			}, 500);

		}

	})(
		textureViewer,
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("li#texture-vector-x-increase"), // increase_x,
		document.querySelector("li#texture-vector-x-decrease"), // decrease_x,
		document.querySelector("li#texture-vector-y-increase"), // increase_y,
		document.querySelector("li#texture-vector-y-decrease"), // decrease_y,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	);

//	Overwrite vector inputs reset.
/*
//	Vector droplist on change watchers (Experimental).
//	Experimental (Independent texture viewer center helper).
//	if not texture entity selected ( !entity_droplist.value )
//	always display the texture viewer center helper value.

//	var viewer   = textureViewer;
//	var vector_x = document.querySelector("input#texture-vector-x-input"); // vector_x,
//	var vector_y = document.querySelector("input#texture-vector-y-input"); // vector_y,
//	var vector_droplist = document.querySelector("select#texture-vector-droplist"); // vector_droplist,
//	var entity_droplist = document.querySelector("select#texture-entities-droplist") // entity_droplist,

	(function(viewer,vector_x,vector_y,vector_droplist,entity_droplist){

		watch( entity_droplist, "onchange", function( property, event, value ){

			if ( value === "" ) {
				vector_x.value = (0.5 + (viewer.center.position.x/250)).toFixed(2); // display center value (x).
				vector_y.value = (0.5 - (viewer.center.position.z/250)).toFixed(2); // display center value (z).
			}

		});

	//	watch( vector_droplist, "onchange", function( property, event, value ){
	//		if ( entity_droplist.value === "" ) {
	//			vector_x.value = (0.5 + (viewer.center.position.x/250)).toFixed(2); // display center value (x).
	//			vector_y.value = (0.5 - (viewer.center.position.z/250)).toFixed(2); // display center value (z).
	//		}
	//	});

		watch( vector_droplist, "onchange", function( property, event, value ){

			callWatchers( entity_droplist, "onchange", event, entity_droplist.value );

		});

	})(
		textureViewer, // viewer
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	);
*/
