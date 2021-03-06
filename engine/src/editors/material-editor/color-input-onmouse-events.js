//	color-input-onmouse-events.js

//	color-r mouse input.

	(function( editor,color_r,increase_r,decrease_r,color_droplist,entity_droplist,undo_button,redo_button ){

		var state;
		var interval;

	//	keep first mousedown event, ignore next events.

		increase_r.addEventListener( "mousedown", onfirstMouseDown );
		decrease_r.addEventListener( "mousedown", onfirstMouseDown );

		//	state.meta = {images:{},textures:{}};
		//	var json = editor.toJSON(state.meta); // editor json.

		function onfirstMouseDown(){
			state = {};
			if ( entity_droplist.value === "" ) return; // important!
			var key = color_droplist.value;
			state.key = color_droplist.value; // key.
			state.value = editor[key].r;   // important!
			state.json = editor.toJSON(); // editor json.
			debugMode && console.log( "state:",state ); // debug!
		//	Remove on firstMouseDown event listener.
			this.removeEventListener( "mousedown", onfirstMouseDown ); // important!
		};

		increase_r.addEventListener( "mousedown", onMouseDown );
		decrease_r.addEventListener( "mousedown", onMouseDown );

		window.addEventListener( "mouseup", function (){
			clearTimeout( interval ); // important!
		});

		increase_r.addEventListener( "click", onMouseClick );
		decrease_r.addEventListener( "click", onMouseClick );

		function onMouseDown(){ 

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return; // important!

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var key = color_droplist.value;

				switch ( key ) {

					case "color":
					case "emissive":
					case "specular":
						var min = 0, max = 1, step = 1/255;
						var value = Number(editor[ key ].r); // get value from editor.
						if ( button === increase_r ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_r ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ].r = value;  // editor watcher updates input value.
						interval = setTimeout( update, clock.getDelta() );
					//	color_r.value = parseInt( 255 * ( editor[ key ].r = value ));
					break;
				}

			//	var dt = clock.getDelta();
			//	interval = setTimeout( update, dt );
			//	debugMode && console.log( "on update:", interval );

			}, 500);

		}

	//	add undo.

		function addtoUndo(state,key,value,undo_button,redo_button){
		//	debugMode && console.log({state:state,key:key,value:value});
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

			var button = this;
			var key = color_droplist.value;

			switch ( key ) {

				case "color":
				case "emissive":
				case "specular":
					var min = 0, max = 1, step = 1/255;
					var value = Number(editor[ key ].r); // get value from editor.
					if ( button === increase_r ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_r ) value = THREE.Math.clamp( value-step, min, max );
					interval = setTimeout( function(){ 
					//	Add on firstMouseDown event listener.
						button.addEventListener( "mousedown", onfirstMouseDown ); // important!
					//	Before change the editor[key] value add an undo state in undo queue.
					//	Until now we was adding to undo after the value has changed. (FIXED!)
						addtoUndo(state,key,value,undo_button,redo_button); // add to undo.
					}, 250);
					editor[ key ].r = value; // editor watcher updates input value.
				//	color_r.value = parseInt( 255 * ( editor[ key ].r = value ));
				break;

			}

			debugMode && console.log( "on Mouse Click:", interval );
		}

	})(
		materialEditor, // editor,
		document.querySelector("input#material-color-r-input"), // color_r,
		document.querySelector("li#material-color-r-increase"), // increase_r,
		document.querySelector("li#material-color-r-decrease"), // decrease_r,
		document.querySelector("select#material-color-droplist"), // color_droplist,
		document.querySelector("select#material-entities-droplist"), // entity_droplist,
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button")  // redo_button, (only needed for the debug console.log).
	);

//	color-g mouse input.

	(function( editor,color_g,increase_g,decrease_g,color_droplist,entity_droplist,undo_button,redo_button ){

		var state;
		var interval;

	//	keep first mousedown event, ignore next events.

		increase_g.addEventListener( "mousedown", onfirstMouseDown );
		decrease_g.addEventListener( "mousedown", onfirstMouseDown );

		//	state.meta = {images:{},textures:{}};
		//	var json = editor.toJSON(state.meta); // editor json.

		function onfirstMouseDown(){
			state = {};
			if ( entity_droplist.value === "" ) return; // important!
			var key = color_droplist.value;
			state.key = color_droplist.value; // key.
			state.value = editor[key].g;   // important!
			state.json = editor.toJSON(); // editor json.
			debugMode && console.log( "state:",state ); // debug!
		//	Remove on firstMouseDown event listener.
			this.removeEventListener( "mousedown", onfirstMouseDown ); // important!
		};

		increase_g.addEventListener( "mousedown", onMouseDown );
		decrease_g.addEventListener( "mousedown", onMouseDown );

		window.addEventListener( "mouseup", function (){
			clearTimeout( interval ); // important!
		});

		increase_g.addEventListener( "click", onMouseClick );
		decrease_g.addEventListener( "click", onMouseClick );

		function onMouseDown(){ 

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return; // important!

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var key = color_droplist.value;

				switch ( key ) {

					case "color":
					case "emissive":
					case "specular":
						var min = 0, max = 1, step = 1/255;
						var value = Number(editor[ key ].g); // get value from editor.
						if ( button === increase_g ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_g ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ].g = value;  // editor watcher updates input value.
						interval = setTimeout( update, clock.getDelta() );
					//	color_g.value = parseInt( 255 * ( editor[ key ].g = value ));
					break;
				}

			//	var dt = clock.getDelta();
			//	interval = setTimeout( update, dt );
			//	debugMode && console.log( "on update:", interval );

			}, 500);

		}

	//	add undo.

		function addtoUndo(state,key,value,undo_button,redo_button){
		//	debugMode && console.log({state:state,key:key,value:value});
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

			var button = this;
			var key = color_droplist.value;

			switch ( key ) {

				case "color":
				case "emissive":
				case "specular":
					var min = 0, max = 1, step = 1/255;
					var value = Number(editor[ key ].g); // get value from editor.
					if ( button === increase_g ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_g ) value = THREE.Math.clamp( value-step, min, max );
					interval = setTimeout( function(){ 
					//	Add on firstMouseDown event listener.
						button.addEventListener( "mousedown", onfirstMouseDown ); // important!
					//	Before change the editor[key] value add an undo state in undo queue.
					//	Until now we was adding to undo after the value has changed. (FIXED!)
						addtoUndo(state,key,value,undo_button,redo_button); // add to undo.
					}, 250);
					editor[ key ].g = value; // editor watcher updates input value.
				//	color_g.value = parseInt( 255 * ( editor[ key ].g = value ));
				break;

			}

			debugMode && console.log( "on Mouse Click:", interval );
		}

	})(
		materialEditor, // editor,
		document.querySelector("input#material-color-g-input"), // color_g,
		document.querySelector("li#material-color-g-increase"), // increase_g,
		document.querySelector("li#material-color-g-decrease"), // decrease_g,
		document.querySelector("select#material-color-droplist"), // color_droplist,
		document.querySelector("select#material-entities-droplist"), // entity_droplist,
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button")  // redo_button, (only needed for the debug console.log).
	);

//	color-b mouse input.

	(function( editor,color_b,increase_b,decrease_b,color_droplist,entity_droplist,undo_button,redo_button ){

		var state;
		var interval;

	//	keep first mousedown event, ignore next events.

		increase_b.addEventListener( "mousedown", onfirstMouseDown );
		decrease_b.addEventListener( "mousedown", onfirstMouseDown );

		//	state.meta = {images:{},textures:{}};
		//	var json = editor.toJSON(state.meta); // editor json.

		function onfirstMouseDown(){
			state = {};
			if ( entity_droplist.value === "" ) return; // important!
			var key = color_droplist.value;
			state.key = color_droplist.value; // key.
			state.value = editor[key].b;   // important!
			state.json = editor.toJSON(); // editor json.
			debugMode && console.log( "state:",state ); // debug!
		//	Remove on firstMouseDown event listener.
			this.removeEventListener( "mousedown", onfirstMouseDown ); // important!
		};

		increase_b.addEventListener( "mousedown", onMouseDown );
		decrease_b.addEventListener( "mousedown", onMouseDown );

		window.addEventListener( "mouseup", function (){
			clearTimeout( interval ); // important!
		});

		increase_b.addEventListener( "click", onMouseClick );
		decrease_b.addEventListener( "click", onMouseClick );

		function onMouseDown(){ 

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return; // important!

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var key = color_droplist.value;

				switch ( key ) {

					case "color":
					case "emissive":
					case "specular":
						var min = 0, max = 1, step = 1/255;
						var value = Number(editor[ key ].b); // get value from editor.
						if ( button === increase_b ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_b ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ].b = value;  // editor watcher updates input value.
						interval = setTimeout( update, clock.getDelta() );
					//	color_b.value = parseInt( 255 * ( editor[ key ].b = value ));
					break;
				}

			//	var dt = clock.getDelta();
			//	interval = setTimeout( update, dt );
			//	debugMode && console.log( "on update:", interval );

			}, 500);

		}

	//	add undo.

		function addtoUndo(state,key,value,undo_button,redo_button){
		//	debugMode && console.log({state:state,key:key,value:value});
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

			var button = this;
			var key = color_droplist.value;

			switch ( key ) {

				case "color":
				case "emissive":
				case "specular":
					var min = 0, max = 1, step = 1/255;
					var value = Number(editor[ key ].b); // get value from editor.
					if ( button === increase_b ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_b ) value = THREE.Math.clamp( value-step, min, max );
					interval = setTimeout( function(){ 
					//	Add on firstMouseDown event listener.
						button.addEventListener( "mousedown", onfirstMouseDown ); // important!
					//	Before change the editor[key] value add an undo state in undo queue.
					//	Until now we was adding to undo after the value has changed. (FIXED!)
						addtoUndo(state,key,value,undo_button,redo_button); // add to undo.
					}, 250);
					editor[ key ].b = value; // editor watcher updates input value.
				//	color_b.value = parseInt( 255 * ( editor[ key ].b = value ));
				break;

			}

			debugMode && console.log( "on Mouse Click:", interval );
		}

	})(
		materialEditor, // editor,
		document.querySelector("input#material-color-b-input"), // color_b,
		document.querySelector("li#material-color-b-increase"), // increase_b,
		document.querySelector("li#material-color-b-decrease"), // decrease_b,
		document.querySelector("select#material-color-droplist"), // color_droplist,
		document.querySelector("select#material-entities-droplist"), // entity_droplist,
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button")  // redo_button, (only needed for the debug console.log).
	);
