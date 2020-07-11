//	vector-input-onmouse-events.js


//	vector-x mouse input.

	(function( editor,vector_x,increase_x,decrease_x,vector_droplist,entity_droplist,undo_button,redo_button ){

		var state;
		var interval;

	//	keep first mousedown event, ignore next events.

		increase_x.addEventListener( "mousedown", onfirstMouseDown );
		decrease_x.addEventListener( "mousedown", onfirstMouseDown );

		var meta = {geometries:{},materials:{},textures:{},images:{},shapes:{}};

		function onfirstMouseDown(){
			state = {};
			if ( entity_droplist.value === "" ) return; // important!
			if ( vector_droplist.value === "quaternion" ) return; // important!
			var key = vector_droplist.value;
			state.key = vector_droplist.value; // key.
			state.value = editor[key].x;   // important!
			state.json = editor.toJSON( meta ); // editor json.
			debugMode && console.log( {state:state,meta:meta} ); // debug!
		//	Remove on firstMouseDown event listener.
			this.removeEventListener( "mousedown", onfirstMouseDown ); // important!
		};

		increase_x.addEventListener( "mousedown", onMouseDown );
		decrease_x.addEventListener( "mousedown", onMouseDown );
		window.addEventListener( "mouseup", function (){
			clearTimeout( interval ); // important!
		});
		increase_x.addEventListener( "click", onMouseClick );
		decrease_x.addEventListener( "click", onMouseClick );

		function onMouseDown(){ 

			clearTimeout( interval ); // important!

		//	We dont "escape", will use editor values on create geometry.
		//	if ( entity_droplist.value === "" ) return; // important!
		//	if ( vector_droplist.value === "quaternion" ) return;

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var key = vector_droplist.value;
			//	if ( key === "quaternion" ) return;

				switch ( key ) {
					case "position":
						var p = 2, step = 1/Math.pow(10,p); // min = -100, max = 100;
						var value = Number(editor[ key ].x); // get value from editor.
						if ( button === increase_x ) value += step;
						if ( button === decrease_x ) value -= step;
						editor[ key ].x = round(value, p); // editor watcher updates input value.
						interval = setTimeout( update, clock.getDelta() );
					break;
					case "rotation":
						var p = 1, step = (1/Math.pow(10,p)) * Math.PI/180; // 0.1 deg.
						var max = Math.PI, min = -max;
						var value = Number(editor[ key ].x); // get value from editor.
						if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ]._x = round(value, p); // editor watcher updates input value.
						interval = setTimeout( update, clock.getDelta() );
					break;
					case "scale":
						var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
						var value = Number(editor[ key ].x); // get value from editor.
						if ( button === increase_x ) value += step;
						if ( button === decrease_x ) value -= step;
						editor[ key ].x = round(value, p); // editor watcher updates input value.
						interval = setTimeout( update, clock.getDelta() );
					break;
				}

			}, 500);

		} // end onMouseDown.

	//	TODO: add undo.
	//	function addtoUndo(state,key,value,undo_button,redo_button){
	//		if ( state.key !== key ) return;
	//		if ( state.value === value ) return;
	//		state.json && undo_button.undo.unshift( state.json );
	//		try { debugMode && console.log( 
	//			"undo:", undo_button.undo.length, 
	//		"redo:", redo_button.redo.length 
	//		); } catch(err){;}
	//		return;
	//	}

		function onMouseClick(){

			clearTimeout( interval ); // important!

		//	We dont "escape", will use editor values on create geometry.
		//	if ( entity_droplist.value === "" ) return; // important!
		//	if ( vector_droplist.value === "quaternion" ) return;

			var button = this;

			var key = vector_droplist.value;
		//	if ( key === "quaternion" ) return;

			switch ( key ) {
				case "position":
					var p = 2, step = 1/Math.pow(10,p); // min = -100, max = 100;
					var value = Number(editor[ key ].x); // get value from editor.
					if ( button === increase_x ) value += step;
					if ( button === decrease_x ) value -= step;
					editor[ key ].x = round(value, p); // editor watcher updates input value.
					interval = setTimeout( update, clock.getDelta() );
				break;
				case "rotation":
					var p = 1, step = (1/Math.pow(10,p)) * Math.PI/180; // 0.1 deg.
					var max = Math.PI, min = -max;
					var value = Number(editor[ key ].x); // get value from editor.
					if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
					editor[ key ]._x = round(value, p); // editor watcher updates input value.
					interval = setTimeout( update, clock.getDelta() );
				break;
				case "scale":
					var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
					var value = Number(editor[ key ].x); // get value from editor.
					if ( button === increase_x ) value += step;
					if ( button === decrease_x ) value -= step;
					editor[ key ].x = round(value, p); // editor watcher updates input value.
					interval = setTimeout( update, clock.getDelta() );
				break;
			}

			debugMode && console.log( "on Mouse Click:", interval );

		} // end onMouseClick.

	})(
		objectEditor, // editor,
		document.querySelector("input#geometry-vector-x-input"), // vector_x,
		document.querySelector("li#geometry-vector-x-increase"), // increase_x,
		document.querySelector("li#geometry-vector-x-decrease"), // decrease_x,
		document.querySelector("select#geometry-vector-droplist"), // vector_droplist,
		document.querySelector("select#geometry-entities-droplist"), // entity_droplist,
		document.querySelector("div#geometry-undo-button"), // undo_button,
		document.querySelector("div#geometry-redo-button")  // redo_button, (only needed for the debug console.log).
	);


//	vector-y mouse input.

	(function( editor,vector_y,increase_y,decrease_y,vector_droplist,entity_droplist,undo_button,redo_button ){

		var state;
		var interval;

	//	keep first mousedown event, ignore next events.

		increase_y.addEventListener( "mousedown", onfirstMouseDown );
		decrease_y.addEventListener( "mousedown", onfirstMouseDown );

		var meta = {geometries:{},materials:{},textures:{},images:{},shapes:{}};

		function onfirstMouseDown(){
			state = {};
			if ( entity_droplist.value === "" ) return; // important!
			if ( vector_droplist.value === "quaternion" ) return; // important!
			var key = vector_droplist.value;
			state.key = vector_droplist.value; // key.
			state.value = editor[key].y;   // important!
			state.json = editor.toJSON( meta ); // editor json.
			debugMode && console.log( {state:state,meta:meta} ); // debug!
		//	Remove on firstMouseDown event listener.
			this.removeEventListener( "mousedown", onfirstMouseDown ); // important!
		};

		increase_y.addEventListener( "mousedown", onMouseDown );
		decrease_y.addEventListener( "mousedown", onMouseDown );
		window.addEventListener( "mouseup", function (){
			clearTimeout( interval ); // important!
		});
		increase_y.addEventListener( "click", onMouseClick );
		decrease_y.addEventListener( "click", onMouseClick );

		function onMouseDown(){ 

			clearTimeout( interval ); // important!

		//	We dont "escape", will use editor values on create geometry.
		//	if ( entity_droplist.value === "" ) return; // important!
		//	if ( vector_droplist.value === "quaternion" ) return;

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var key = vector_droplist.value;
			//	if ( key === "quaternion" ) return;

				switch ( key ) {
					case "position":
						var p = 2, step = 1/Math.pow(10,p); // min = -100, max = 100;
						var value = Number(editor[ key ].y); // get value from editor.
						if ( button === increase_y ) value += step;
						if ( button === decrease_y ) value -= step;
						editor[ key ].y = round(value, p); // editor watcher updates input value.
						interval = setTimeout( update, clock.getDelta() );
					break;
					case "rotation":
						var p = 1, step = (1/Math.pow(10,p)) * Math.PI/180; // 0.1 deg.
						var max = Math.PI, min = -max;
						var value = Number(editor[ key ].y); // get value from editor.
						if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ]._y = round(value, p); // editor watcher updates input value.
						interval = setTimeout( update, clock.getDelta() );
					break;
					case "scale":
						var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
						var value = Number(editor[ key ].y); // get value from editor.
						if ( button === increase_y ) value += step;
						if ( button === decrease_y ) value -= step;
						editor[ key ].y = round(value, p); // editor watcher updates input value.
						interval = setTimeout( update, clock.getDelta() );
					break;
				}

			}, 500);

		} // end onMouseDown.

	//	TODO: add undo.
	//	function addtoUndo(state,key,value,undo_button,redo_button){
	//		if ( state.key !== key ) return;
	//		if ( state.value === value ) return;
	//		state.json && undo_button.undo.unshift( state.json );
	//		try { debugMode && console.log( 
	//			"undo:", undo_button.undo.length, 
	//		"redo:", redo_button.redo.length 
	//		); } catch(err){;}
	//		return;
	//	}

		function onMouseClick(){

			clearTimeout( interval ); // important!

		//	We dont "escape", will use editor values on create geometry.
		//	if ( entity_droplist.value === "" ) return; // important!
		//	if ( vector_droplist.value === "quaternion" ) return;

			var button = this;

			var key = vector_droplist.value;
		//	if ( key === "quaternion" ) return;

			switch ( key ) {
				case "position":
					var p = 2, step = 1/Math.pow(10,p); // min = -100, max = 100;
					var value = Number(editor[ key ].y); // get value from editor.
					if ( button === increase_y ) value += step;
					if ( button === decrease_y ) value -= step;
					editor[ key ].y = round(value, p); // editor watcher updates input value.
					interval = setTimeout( update, clock.getDelta() );
				break;
				case "rotation":
					var p = 1, step = (1/Math.pow(10,p)) * Math.PI/180; // 0.1 deg.
					var max = Math.PI, min = -max;
					var value = Number(editor[ key ].y); // get value from editor.
					if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
					editor[ key ]._y = round(value, p); // editor watcher updates input value.
					interval = setTimeout( update, clock.getDelta() );
				break;
				case "scale":
					var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
					var value = Number(editor[ key ].y); // get value from editor.
					if ( button === increase_y ) value += step;
					if ( button === decrease_y ) value -= step;
					editor[ key ].y = round(value, p); // editor watcher updates input value.
					interval = setTimeout( update, clock.getDelta() );
				break;
			}

			debugMode && console.log( "on Mouse Click:", interval );

		} // end onMouseClick.

	})(
		objectEditor, // editor,
		document.querySelector("input#geometry-vector-y-input"), // vector_y,
		document.querySelector("li#geometry-vector-y-increase"), // increase_y,
		document.querySelector("li#geometry-vector-y-decrease"), // decrease_y,
		document.querySelector("select#geometry-vector-droplist"), // vector_droplist,
		document.querySelector("select#geometry-entities-droplist"), // entity_droplist,
		document.querySelector("div#geometry-undo-button"), // undo_button,
		document.querySelector("div#geometry-redo-button")  // redo_button, (only needed for the debug console.log).
	);
