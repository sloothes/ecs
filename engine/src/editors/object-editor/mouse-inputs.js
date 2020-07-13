//	mouse-inputs.js


	function objectEditorVectorMouseInputs( editor,v,vector,increase,decrease,vector_droplist,entity_droplist,undo_button ){

		var state, interval, dt = 20;
		var meta = {geometries:{},materials:{},textures:{},images:{},shapes:{}};

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

	//	keep first mousedown event, ignore next events.

		function onfirstMouseDown(){
			state = {}; // reset.
			if ( entity_droplist.value === "" ) return; // important!
			var key = state.key = vector_droplist.value;
			state.value = editor[key][v];
			state.json = editor.toJSON( meta );
			this.removeEventListener( "mousedown", onfirstMouseDown );
			debugMode && console.log( {state:state,meta:meta} ); // debug!
		};

	//	on mouse down.

		function onMouseDown(){ 

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return;

			var button = this;

			interval = setTimeout( function update() {

				var key = vector_droplist.value;

				switch ( key ) {
					case "position":
						var p = 2, step = 1/Math.pow(10,p); // min = -100, max = 100;
						var value = Number(editor[ key ][v]); // get value from editor.
						if ( button === increase ) value += step;
						if ( button === decrease ) value -= step;
						editor[ key ][v] = round(value,6);
						interval = setTimeout( update, dt );
					break;
					case "rotation":
						var p = 1, step = 1/Math.pow(10,p), min = -180, max = 180;
						var value = RAD2DEG * Number(editor[ key ][v]); // get value from editor.
						if ( button === increase ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ][v] = round(DEG2RAD*value,6);
						interval = setTimeout( update, dt );
					break;
					case "scale":
						var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
						var value = Number(editor[ key ][v]); // get value from editor.
						if ( button === increase ) value += step;
						if ( button === decrease ) value -= step;
						editor[ key ][v] = round(value,6); // editor manager updates input value.
						interval = setTimeout( update, dt );
					break;
				}

			}, 500);

		}

	//	add undo.

		function addtoUndo( state,key,value ){
			if ( state.key !== key ) return; if ( state.value === value ) return;
			if ( state.json ) { var json = JSON.parse(JSON.stringify(state.json)); undo_button.undo.unshift(json); }
			debugMode && console.log( "undo:", undo_button.undo.length, "redo:", undo_button.redo.length ); return;
		}

	//	on mouse click.

		function onMouseClick(){

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return; // important!

			var button = this;
			var key = vector_droplist.value;

			switch ( key ) {
				case "position":
					var p = 2, step = 1/Math.pow(10,p); // min = -100, max = 100;
					var value = Number(editor[ key ][v]); // get value from editor.
					if ( button === increase ) value += step;
					if ( button === decrease ) value -= step;
					editor[ key ][v] = round(value,6); addtoUndo( state,key,value );
					interval = setTimeout( function(){ 
						button.addEventListener( "mousedown", onfirstMouseDown );
					}, 250);
				break;
				case "rotation":
					var p = 1, step = 1/Math.pow(10,p), min = -180, max = 180;
					var value = RAD2DEG * Number(editor[ key ][v]); // get value from editor.
					if ( button === increase ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease ) value = THREE.Math.clamp( value-step, min, max );
					editor[ key ][v] = round(DEG2RAD*value,6); addtoUndo( state,key,value );
					interval = setTimeout( function(){ 
						button.addEventListener( "mousedown", onfirstMouseDown );
					}, 250);
				break;
				case "scale":
					var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
					var value = Number(editor[ key ][v]); // get value from editor.
					if ( button === increase ) value += step;
					if ( button === decrease ) value -= step;
					editor[ key ][v] = round(value,6); addtoUndo( state,key,value );
					interval = setTimeout( function(){ 
						button.addEventListener( "mousedown", onfirstMouseDown );
					}, 250);
				break;
			}

			debugMode && console.log( "on Mouse Click:", interval );

		}

		increase.addEventListener( "mousedown", onfirstMouseDown );
		decrease.addEventListener( "mousedown", onfirstMouseDown );
		increase.addEventListener( "mousedown", onMouseDown );
		decrease.addEventListener( "mousedown", onMouseDown );
		window.addEventListener( "mouseup", function (){ 
			clearTimeout( interval ); }); // important!
		increase.addEventListener( "click", onMouseClick );
		decrease.addEventListener( "click", onMouseClick );

	}


//	vector-x mouse input.

	objectEditorVectorMouseInputs( objectEditor, "x",              // editor,
		document.querySelector("input#editor-vector-x-input"),     // vector_x,
		document.querySelector("li#editor-vector-x-increase"),     // increase_x,
		document.querySelector("li#editor-vector-x-decrease"),     // decrease_x,
		document.querySelector("select#editor-vector-droplist"),   // vector_droplist,
		document.querySelector("select#editor-entities-droplist"), // entity_droplist,
		document.querySelector("div#editor-undo-button")           // undo_button.
	);

//	vector-y mouse input.

	objectEditorVectorMouseInputs( objectEditor, "y",              // editor,
		document.querySelector("input#editor-vector-y-input"),     // vector_y,
		document.querySelector("li#editor-vector-y-increase"),     // increase_y,
		document.querySelector("li#editor-vector-y-decrease"),     // decrease_y,
		document.querySelector("select#editor-vector-droplist"),   // vector_droplist,
		document.querySelector("select#editor-entities-droplist"), // entity_droplist,
		document.querySelector("div#editor-undo-button")           // undo_button.
	);

//	vector-z mouse input.

	objectEditorVectorMouseInputs( objectEditor, "z",              // editor,
		document.querySelector("input#editor-vector-z-input"),     // vector_z,
		document.querySelector("li#editor-vector-z-increase"),     // increase_z,
		document.querySelector("li#editor-vector-z-decrease"),     // decrease_z,
		document.querySelector("select#editor-vector-droplist"),   // vector_droplist,
		document.querySelector("select#editor-entities-droplist"), // entity_droplist,
		document.querySelector("div#editor-undo-button")           // undo_button.
	);

