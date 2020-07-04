//	vector-input-onmouse-events.js

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
			if ( entity_droplist.value === "" ) return; // important!
			if ( vector_droplist.value === "center" ) return; // important!
			var key = vector_droplist.value;
			state.key = vector_droplist.value;
			state.value = editor[ key ];
			state.json = editor.toJSON(); // editor json.
			debugMode && console.log( "state:",state ); // debug!
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

			if ( entity_droplist.value === "" ) return; // important!
			if ( vector_droplist.value === "center" ) return; // important!

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var key = vector_droplist.value;
				if ( key === "center" ) return; // important!

				if ( key ) {

					var step = 1/100, min = -100, max = 100;

					if ( button === increase_x || button === decrease_x ) {
						var value = Number(editor[ key ].x); // get value from editor.
						if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ].x = round(value, 2); // editor watcher updates vector_x input value.
					}

					else if ( button === increase_y || button === decrease_y ) {
						var value = Number(editor[ key ].y); // get value from editor.
						if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ].y = round(value, 2); // editor watcher updates vector_y input value.
					}

				}

				var dt = clock.getDelta();
				interval = setTimeout( update, dt );
			//	debugMode && console.log( "on update:", interval );

			}, 500);

		} // end onMouseDown.

		function onMouseClick(){

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return; // important!
			if ( vector_droplist.value === "center" ) return; // important!

			var button = this;

			var key = vector_droplist.value;
			if ( key === "center" ) return;

		//	Before change the editor[key] value add an undo state in undo queue.
		//	Until now we has adding to Undo after the value has changed. (FIXED!)

			if ( key ) {

				var step = 1/100, min = -100, max = 100;

				if ( button === increase_x || button === decrease_x ) {
					var value = Number(editor[ key ].x); // get value from editor.
					if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
					editor[ key ].x = round(value, 2); // editor watcher updates vector_x input value.
				}

				else if ( button === increase_y || button === decrease_y ) {
					var value = Number(editor[ key ].y); // get value from editor.
					if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
					editor[ key ].y = round(value, 2); // editor watcher updates vector_y input value.
				}

			}

			debugMode && console.log( "on Mouse Click:", interval );

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
