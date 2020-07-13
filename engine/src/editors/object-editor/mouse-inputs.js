//	mouse-inputs.js


//	vector-x mouse input.

	(function( editor,vector_x,increase_x,decrease_x,vector_droplist,entity_droplist,undo_button ){

		var state, interval, dt = 20;

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

	//	keep first mousedown event, ignore next events.

		increase_x.addEventListener( "mousedown", onfirstMouseDown );
		decrease_x.addEventListener( "mousedown", onfirstMouseDown );
		var meta = {geometries:{},materials:{},textures:{},images:{},shapes:{}};

		function onfirstMouseDown(){
			state = {}; // reset.
			if ( entity_droplist.value === "" ) return; // important!
			var key = state.key = vector_droplist.value;
			state.value = editor[key].x;
			state.json = editor.toJSON( meta );
			debugMode && console.log( {state:state,meta:meta} ); // debug!
		//	Remove on firstMouseDown event listener. // important!
			this.removeEventListener( "mousedown", onfirstMouseDown );
		};
	//
		increase_x.addEventListener( "mousedown", onMouseDown );
		decrease_x.addEventListener( "mousedown", onMouseDown );
		window.addEventListener( "mouseup", function (){ 
			clearTimeout( interval ); }); // important!
		increase_x.addEventListener( "click", onMouseClick );
		decrease_x.addEventListener( "click", onMouseClick );

		function onMouseDown(){ 

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return;

			var button = this;

			interval = setTimeout( function update() {

				var key = vector_droplist.value;

				switch ( key ) {
					case "position":
						var p = 2, step = 1/Math.pow(10,p); // min = -100, max = 100;
						var value = Number(editor[ key ].x); // get value from editor.
						if ( button === increase_x ) value += step;
						if ( button === decrease_x ) value -= step;
						editor[ key ].x = round(value, p); // editor manager updates input value.
						interval = setTimeout( update, dt );
					break;
					case "rotation":
						var p = 1, step = 1/Math.pow(10,p), min = -180, max = 180;
						var value = RAD2DEG * Number(editor[ key ].x); // get value from editor.
						if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ].x = DEG2RAD * round(value, p); // editor manager updates input value.
						interval = setTimeout( update, dt );
					break;
					case "scale":
						var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
						var value = Number(editor[ key ].x); // get value from editor.
						if ( button === increase_x ) value += step;
						if ( button === decrease_x ) value -= step;
						editor[ key ].x = round(value, p); // editor manager updates input value.
						interval = setTimeout( update, dt );
					break;
				}

			}, 500);

		} // end onMouseDown.

	//	add undo.
		function addtoUndo(state,key,value,undo_button){
			if ( state.key !== key ) return; if ( state.value === value ) return;
			if ( state.json ) { var json = JSON.parse(JSON.stringify(state.json)); undo_button.undo.unshift(json); }
			debugMode && console.log( "undo:", undo_button.undo.length, "redo:", undo_button.redo.length ); return;
		}

		function onMouseClick(){

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return; // important!

			var button = this;
			var key = vector_droplist.value;

			switch ( key ) {
				case "position":
					var p = 2, step = 1/Math.pow(10,p); // min = -100, max = 100;
					var value = Number(editor[ key ].x); // get value from editor.
					if ( button === increase_x ) value += step;
					if ( button === decrease_x ) value -= step;
					editor[ key ].x = round(value,6); addtoUndo( state,key,value,undo_button );
					interval = setTimeout( function(){ 
						button.addEventListener( "mousedown", onfirstMouseDown ); // important!
					}, 250);
				break;
				case "rotation":
					var p = 1, step = 1/Math.pow(10,p), min = -180, max = 180;
					var value = RAD2DEG * Number(editor[ key ].x); // get value from editor.
					if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
					editor[ key ].x = round(DEG2RAD*value,6); addtoUndo( state,key,value,undo_button );
					interval = setTimeout( function(){ 
						button.addEventListener( "mousedown", onfirstMouseDown ); // important!
					}, 250);
				break;
				case "scale":
					var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
					var value = Number(editor[ key ].x); // get value from editor.
					if ( button === increase_x ) value += step;
					if ( button === decrease_x ) value -= step;
					editor[ key ].x = round(value,6); addtoUndo( state,key,value,undo_button );
					interval = setTimeout( function(){ 
						button.addEventListener( "mousedown", onfirstMouseDown ); // important!
					}, 250);
				break;
			}

			debugMode && console.log( "on Mouse Click:", interval );

		} // end onMouseClick.

	})(
		objectEditor,                                              // editor,
		document.querySelector("input#editor-vector-x-input"),     // vector_x,
		document.querySelector("li#editor-vector-x-increase"),     // increase_x,
		document.querySelector("li#editor-vector-x-decrease"),     // decrease_x,
		document.querySelector("select#editor-vector-droplist"),   // vector_droplist,
		document.querySelector("select#editor-entities-droplist"), // entity_droplist,
		document.querySelector("div#editor-undo-button")           // undo_button.
	);

