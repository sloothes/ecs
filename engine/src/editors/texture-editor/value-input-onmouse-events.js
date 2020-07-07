//	value-input-onmouse-events.js

	(function(editor,increase_v,decrease_v,key_droplist,entity_droplist,undo_button,redo_button){

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

			if ( entity_droplist.value === "" ) return;

		//	disabled on mouse down.

			if ( key_droplist.value === "name" ) return;
			if ( key_droplist.value === "uuid" ) return;
			if ( key_droplist.value === "flipY" ) return;
			if ( key_droplist.value === "wrapS" ) return;
			if ( key_droplist.value === "wrapT" ) return;
			if ( key_droplist.value === "format" ) return;
			if ( key_droplist.value === "mapping" ) return;
			if ( key_droplist.value === "minFilter" ) return;
			if ( key_droplist.value === "magFilter" ) return;

		//	enabled on mouse down.

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var key = key_droplist.value;

				if ( key === "rotation" ) (function(){

					var step = 0.1 * Math.PI/180; // 0.1 deg.
					var max = Math.PI, min = -max;
					var value = Number(editor[ key ]); // get value from editor.
					if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
					editor[ key ] = value; // editor watcher updates input value.

				})();

				else if ( key === "anisotropy" ) (function(){

					var step = 1/100, max = 1, min = -max;
					var value = Number(editor[ key ]); // get value from editor.
					if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
					editor[key] = round(value, 2); // editor watcher updates input value.

				})();

				var dt = clock.getDelta();
				interval = setTimeout( update, dt );
			//	debugMode && console.log( "on mousedown:", interval );

			}, 500);

		} // end onMouseDown

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

			if ( entity_droplist.value === "" ) return;

		//	disabled on mouse click.

			if ( key_droplist.value === "name" ) return;

		//	enabled on mouse click.

			var button = this;
			var key = key_droplist.value;

			function updateConstantInputValue( values ){
				var min = 0, max = values.length;
				var value = Number(editor[ key ]); // get value from editor.
				var index = values.findIndex(function( item ){ return item === value; });
				if ( button === increase_v ) value = values[ ( ++index % max + max ) % max ]; // mod();
				if ( button === decrease_v ) value = values[ ( --index % max + max ) % max ]; // mod();
			//	debugMode && console.log( key === state.key && value !== state.value );
				interval = setTimeout( function(){ 
				//	Add on firstMouseDown event listener.
					button.addEventListener( "mousedown", onfirstMouseDown ); // important!
				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we was adding to undo after the value has changed. (FIXED!)
					addtoUndo( state,key,value,undo_button,redo_button ); // add to undo.
				}, 250); 
				editor[ key ] = value; // number, editor watcher updates value input.
			}

			switch ( key ){

				case "uuid": 
					editor[ key ] = THREE.Math.generateUUID(); // string, editor watcher updates input value.
				break;

				case "flipY":
					editor[ key ] = !editor[ key ]; // boolean, editor watcher updates input value.
				break;

				case "format":
					updateConstantInputValue([ // order matters...
						THREE.AlphaFormat,THREE.RGBFormat,THREE.RGBAFormat,THREE.LuminanceFormat,
						THREE.LuminanceAlphaFormat, THREE.DepthFormat, THREE.DepthStencilFormat 
					]);
				break;

				case "mapping":
					updateConstantInputValue([ // order matters...
						THREE.UVMapping,THREE.CubeReflectionMapping,THREE.CubeRefractionMapping,
						THREE.EquirectangularReflectionMapping,THREE.EquirectangularRefractionMapping,
						THREE.SphericalReflectionMapping,THREE.CubeUVReflectionMapping,THREE.CubeUVRefractionMapping
					]);
				break;

				case "encoding":
					updateConstantInputValue([ // order matters...
						THREE.LinearEncoding,THREE.sRGBEncoding,THREE.GammaEncoding,THREE.RGBEEncoding,
						THREE.LogLuvEncoding,THREE.RGBM7Encoding,THREE.RGBM16Encoding,THREE.RGBDEncoding,
						THREE.BasicDepthPacking,THREE.RGBADepthPacking 
					]);
				break;

				case "magFilter":
					updateConstantInputValue([ THREE.NearestFilter,THREE.LinearFilter ]);
				break;

				case "minFilter":
					updateConstantInputValue([ // order matters...
						THREE.NearestFilter,THREE.NearestMipMapNearestFilter,
						THREE.NearestMipMapLinearFilter,THREE.LinearFilter,
						THREE.LinearMipMapNearestFilter,THREE.LinearMipMapLinearFilter 
					]);
				break;

				case "wrapS":
				case "wrapT":
					updateConstantInputValue([ // order matters...
						THREE.RepeatWrapping,THREE.ClampToEdgeWrapping,THREE.MirroredRepeatWrapping 
					]);
				break;

				case "anisotropy":
					(function(){
						var step = 1/100, max = 1, min = -max;
						var value = Number(editor[ key ]); // get value from editor.
						if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
						interval = setTimeout( function(){ 
						//	Add on firstMouseDown event listener.
							button.addEventListener( "mousedown", onfirstMouseDown ); // important!
						//	Before change the editor[key] value add an undo state in undo queue.
						//	Until now we was adding to undo after the value has changed. (FIXED!)
							addtoUndo( state,key,value,undo_button,redo_button ); // add to undo.
						}, 250);
						editor[ key ] = round(value, 2); // editor watcher updates input value.
					})();
				break;

				case "rotation":
					(function(){
						var step = 0.1 * Math.PI/180; // 0.1 deg.
						var max = Math.PI, min = -max;
						var value = Number(editor[ key ]); // get value from editor.
						if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
						interval = setTimeout( function(){ 
						//	Add on firstMouseDown event listener.
							button.addEventListener( "mousedown", onfirstMouseDown ); // important!
						//	Before change the editor[key] value add an undo state in undo queue.
						//	Until now we was adding to undo after the value has changed. (FIXED!)
							addtoUndo( state,key,value,undo_button,redo_button ); // add to undo.
						}, 250);
						editor[ key ] = value; // editor watcher updates input value.
					})();
				break;

			} // end switch

			debugMode && console.log( "on Mouse Click:", interval );

		} // end onMouseClick


	})(
		textureEditor, // editor,
		document.querySelector("li#texture-value-increase"), // increase_v,
		document.querySelector("li#texture-value-decrease"), // decrease_v,
		document.querySelector("select#texture-key-droplist"), // key_droplist,
		document.querySelector("select#texture-entities-droplist"), // entity_droplist,
		document.querySelector("div#texture-undo-button").undo, // undo array,
		document.querySelector("div#texture-redo-button").redo // redo array, (only needed for the debug console.log).
	);
