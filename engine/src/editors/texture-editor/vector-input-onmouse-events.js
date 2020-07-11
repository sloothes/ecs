//	vector-input-onmouse-events.js


//	vector-x mouse input.

	(function( editor,vector_x,increase_x,decrease_x,vector_droplist,entity_droplist,undo_button,redo_button ){

		var state;
		var interval;

	//	keep first mousedown event, ignore next events.

		increase_x.addEventListener( "mousedown", onfirstMouseDown );
		decrease_x.addEventListener( "mousedown", onfirstMouseDown );

		//	state.meta = {images:{},textures:{}};
		//	var json = editor.toJSON(state.meta); // editor json.

		function onfirstMouseDown(){
			state = {};
			if ( entity_droplist.value === "" ) return; // important!
			if ( vector_droplist.value === "center" ) return; // important!
			var key = vector_droplist.value;
			state.key = vector_droplist.value; // key.
			state.value = editor[key].x;   // important!
			state.json = editor.toJSON(); // editor json.
			debugMode && console.log( "state:",state ); // debug!
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

			if ( entity_droplist.value === "" ) return; // important!
			if ( vector_droplist.value === "center" ) return; // important!

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var key = vector_droplist.value;
				if ( key === "center" ) return; // important!

				switch ( key ) {

					case "offset":
					case "repeat":
						var step = 1/100, min = -100, max = 100;
						var value = Number(editor[ key ].x); // get value from editor.
						if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ].x = round(value, 2); // editor watcher updates input value.
						interval = setTimeout( update, clock.getDelta() );
					break;
				}

			//	var dt = clock.getDelta();
			//	interval = setTimeout( update, dt );
			//	debugMode && console.log( "on update:", interval );

			}, 500);

		} // end onMouseDown.

	//	add undo.

		function addtoUndo(state,key,value,undo_button,redo_button){
			if ( state.key !== key ) return;
			if ( state.value === value ) return;
			state.json && undo_button.undo.unshift( state.json );
			try { debugMode && console.log( 
				"undo:", undo_button.undo.length, 
				"redo:", redo_button.redo.length 
			); } catch(err){;}
			return;
		}

		function onMouseClick(){

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return; // important!
			if ( vector_droplist.value === "center" ) return; // important!

			var button = this;

			var key = vector_droplist.value;
			if ( key === "center" ) return;

			switch ( key ) {

				case "offset":
				case "repeat":
					var step = 1/100, min = -100, max = 100;
					var value = Number(editor[ key ].x); // get value from editor.
					if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
					interval = setTimeout( function(){ 
					//	Add on firstMouseDown event listener.
						button.addEventListener( "mousedown", onfirstMouseDown ); // important!
					//	Before change the editor[key] value add an undo state in undo queue.
					//	Until now we was adding to undo after the value has changed. (FIXED!)
						addtoUndo(state,key,value,undo_button,redo_button); // add to undo.
					}, 250);
					editor[ key ].x = round(value, 2); // editor watcher updates input value.
				break;

			}

			debugMode && console.log( "on Mouse Click:", interval );

		} // end onMouseClick.

	})(
		textureEditor, // editor,
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("li#texture-vector-x-increase"), // increase_x,
		document.querySelector("li#texture-vector-x-decrease"), // decrease_x,
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist"), // entity_droplist,
		document.querySelector("div#texture-undo-button"), // undo_button,
		document.querySelector("div#texture-redo-button")  // redo_button, (only needed for the debug console.log).
	);

//	vector-y mouse input.

	(function( editor,vector_y,increase_y,decrease_y,vector_droplist,entity_droplist,undo_button,redo_button ){

		var state;
		var interval;

	//	keep first mousedown event, ignore next events.

		increase_y.addEventListener( "mousedown", onfirstMouseDown );
		decrease_y.addEventListener( "mousedown", onfirstMouseDown );

		//	state.meta = {images:{},textures:{}};
		//	var json = editor.toJSON(state.meta); // editor json.

		function onfirstMouseDown(){
			state = {};
			if ( entity_droplist.value === "" ) return; // important!
			if ( vector_droplist.value === "center" ) return; // important!
			var key = vector_droplist.value;
			state.key = vector_droplist.value;
			state.value = editor[ key ].y;
			state.json = editor.toJSON(); // editor json.
			debugMode && console.log( "state:",state ); // debug!
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

			if ( entity_droplist.value === "" ) return; // important!
			if ( vector_droplist.value === "center" ) return; // important!

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var key = vector_droplist.value;
				if ( key === "center" ) return; // important!

				switch ( key ) {

					case "offset":
					case "repeat":
						var step = 1/100, min = -100, max = 100;
						var value = Number(editor[ key ].y); // get value from editor.
						if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ].y = round(value, 2); // editor watcher updates vector_y input value.
						interval = setTimeout( update, clock.getDelta() );
					break;
				}

			//	var dt = clock.getDelta();
			//	interval = setTimeout( update, dt );
			//	debugMode && console.log( "on update:", interval );

			}, 500);

		} // end onMouseDown.

	//	add undo.

		function addtoUndo(state,key,value,undo_button,redo_button){
			if ( state.key !== key ) return;
			if ( state.value === value ) return;
			state.json && undo_button.undo.unshift( state.json );
			try { debugMode && console.log( 
				"undo:", undo_button.undo.length, 
				"redo:", redo_button.redo.length 
			); } catch(err){;}
			return;
		}

		function onMouseClick(){

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return; // important!
			if ( vector_droplist.value === "center" ) return; // important!

			var button = this;

			var key = vector_droplist.value;
			if ( key === "center" ) return;

			switch ( key ) {

				case "offset":
				case "repeat":
					var step = 1/100, min = -100, max = 100;
					var value = Number(editor[ key ].y); // get value from editor.
					if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
					interval = setTimeout( function(){ 
					//	Add on firstMouseDown event listener.
						button.addEventListener( "mousedown", onfirstMouseDown ); // important!
					//	Before change the editor[key] value add an undo state in undo queue.
					//	Until now we was adding to undo after the value has changed. (FIXED!)
						addtoUndo(state,key,value,undo_button,redo_button); // add to undo.
					}, 250);
					editor[ key ].y = round(value, 2); // editor watcher updates input value.
				break;
			}

			debugMode && console.log( "on Mouse Click:", interval );

		} // end onMouseClick.

	})(
		textureEditor, // editor,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("li#texture-vector-y-increase"), // increase_y,
		document.querySelector("li#texture-vector-y-decrease"), // decrease_y,
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist"), // entity_droplist,
		document.querySelector("div#texture-undo-button"), // undo_button,
		document.querySelector("div#texture-redo-button")  // redo_button, (only needed for the debug console.log).
	);
