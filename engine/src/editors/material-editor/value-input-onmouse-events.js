//	value-input-onmouse-events.js

	(function(editor,increase_v,decrease_v,key_droplist,entity_droplist,undo_button,redo_button){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		var state;
		var interval;

		increase_v.addEventListener( "mousedown", onfirstMouseDown );
		decrease_v.addEventListener( "mousedown", onfirstMouseDown );

		function onfirstMouseDown(){
			state = {};
			var key = key_droplist.value;
			state.key = key_droplist.value;
			state.value = editor[ key ];
			state.json = editor.toJSON(); // editor json.
			debugMode && console.log( "state:",state ); // debug!
		//	Remove on firstMouseDown event listener.
			this.removeEventListener( "mousedown", onfirstMouseDown ); // important!
		};

		increase_v.addEventListener( "mousedown", onMouseDown );
		decrease_v.addEventListener( "mousedown", onMouseDown );

		window.addEventListener( "mouseup", function (){
			clearTimeout( interval ); // important!
		});

		increase_v.addEventListener( "click", onMouseClick );
		decrease_v.addEventListener( "click", onMouseClick );

		function onMouseDown(){ 

			clearTimeout( interval ); // important!

			if ( !entity_droplist.value ) return;

		//	disabled on mouse down.

			if ( key_droplist.value === "" ) return;
		//	var key = key_droplist.value;
		//	if ( isNaN(editor[key]) ) return; // avoid to pass NaN value!

		//	enabled on mouse down.

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

			//	get key in every event.
				var key = key_droplist.value; // important!
			//	if ( isNaN(editor[key]) ) return; // avoid to pass NaN value!

				function updateFloatRotationValue(){
					var step = 0.1 * Math.PI/180; // 0.1 deg.
					var min = -Math.PI, max = Math.PI;
					var value = Number(editor[ key ]); // get value from editor.
					if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
					editor[ key ] = value; // editor watcher updates input value.
				//	value_input.value = ( RAD2DEG * ( editor[ key ] = value) ).toFixed(1); // string.
					interval = setTimeout( update, clock.getDelta() ); // setTimeout!
					debugMode && console.log( "on mousedown:", interval ); // debug!
				}

				function updateFloatNumberValue(min, max, step){
					var value = Number(editor[ key ]); // get value from editor.
					if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
					editor[key] = value; // editor watcher updates input value.
				//	value_input.value = ( editor[key] = round(value, 2) ).toFixed(2);
					interval = setTimeout( update, clock.getDelta() ); // setTimeout!
					debugMode && console.log( "on mousedown:", interval ); // debug!
				}

				function updateIntegerNumberValue(min, max){
					var value = parseInt(editor[ key ]); // get value from editor.
					if ( button === increase_v ) value = THREE.Math.clamp( ++value, min, max );
					if ( button === decrease_v ) value = THREE.Math.clamp( --value, min, max );
					editor[key] = parseInt(value); // editor watcher updates input value.
				//	value_input.value = ( editor[key] = parseInt(value) ).toFixed(0);
					interval = setTimeout( update, clock.getDelta() ); // setTimeout!
					debugMode && console.log( "on mousedown:", interval ); // debug!
				}

				switch ( key ){

				//	enabled on mouse down.
					case "polygonOffsetUnits":
					case "polygonOffsetFactor":
						updateIntegerNumberValue(-100, 100);
					break;
					case "displacementScale":
						updateFloatNumberValue(-100, 100, 1/100);
					break;
					case "bumpScale":
					case "metalness":
					case "roughness":
					case "displacementBias":
						updateFloatNumberValue(-10, 10, 1/100);
					break;
					case "refractionRatio":
						updateFloatNumberValue(-1, 1, 1/100);
					break;
					case "opacity":
					case "overdraw":
					case "alphaTest":
					case "reflectivity":
					case "wireframeLinewidth":
						updateFloatNumberValue(0, 1, 1/100);
					break;
					case "linewidth":
					case "aoMapIntensity":
					case "envMapIntensity":
					case "emissiveIntensity":
					case "lightMapIntensity":
						updateFloatNumberValue(0, 100, 1/100);
					break;
					case "size":
					case "scale":
					case "gapSize":
					case "dashSize":
					case "shininess":
						updateFloatNumberValue(0, 1000, 1/100);
					break;
					case "rotation":
						updateFloatRotationValue();
					break;
				}

			//	var dt = clock.getDelta();
			//	interval = setTimeout( update, dt );
			//	debugMode && console.log( "on mousedown:", interval );

			}, 500);

		} // end onMouseDown





	})(
		materialEditor, // editor,
		document.querySelector("li#material-value-increase"), // increase_v
		document.querySelector("li#material-value-decrease"), // decrease_v
		document.querySelector("select#material-keys-droplist"), // key_droplist
		document.querySelector("select#material-entities-droplist"), // entity_droplist.
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button")  // redo_button, (only needed for the debug console.log).
	);
