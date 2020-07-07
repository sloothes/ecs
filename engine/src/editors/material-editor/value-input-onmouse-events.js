//	value-input-onmouse-events.js

	(function( editor,increase_v,decrease_v,text_input,value_input,key_droplist,entity_droplist,undo_button,redo_button ){

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

			if ( entity_droplist.value === "" ) return;

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
					interval = setTimeout( update, clock.getDelta() ); // setTimeout!
				//	debugMode && console.log( "on mousedown:", interval ); // debug!
				//	value_input.value = ( RAD2DEG * ( editor[ key ] = value) ).toFixed(1); // string.
				}

				function updateFloatNumberValue(min, max, step){
					var value = Number(editor[ key ]); // get value from editor.
					if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
					editor[key] = value; // editor watcher updates input value.
					interval = setTimeout( update, clock.getDelta() ); // setTimeout!
				//	debugMode && console.log( "on mousedown:", interval ); // debug!
				//	value_input.value = ( editor[key] = round(value, 2) ).toFixed(2);
				}

				function updateIntegerNumberValue(min, max){
					var value = parseInt(editor[ key ]); // get value from editor.
					if ( button === increase_v ) value = THREE.Math.clamp( ++value, min, max );
					if ( button === decrease_v ) value = THREE.Math.clamp( --value, min, max );
					editor[key] = parseInt(value); // editor watcher updates input value.
					interval = setTimeout( update, clock.getDelta() ); // setTimeout!
				//	debugMode && console.log( "on mousedown:", interval ); // debug!
				//	value_input.value = ( editor[key] = parseInt(value) ).toFixed(0);
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

			if ( key_droplist.value === "" ) return;
			if ( key_droplist.value === "name" ) return;
			if ( key_droplist.value === "type" ) return;

		//	enabled on mouse click.

			var button = this;
			var key = key_droplist.value;

			function updateFloatRotationValue(){
				var step = 0.1 * Math.PI/180; // 0.1 deg.
				var min = -Math.PI, max = Math.PI;
				var value = Number(editor[ key ]); // get value from editor, rad.
				if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN editor[key] value.
				if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max ); // rad.
				if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max ); // rad.
				interval = setTimeout( function(){ 
				//	Add on firstMouseDown event listener.
					button.addEventListener( "mousedown", onfirstMouseDown ); // important!
				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we was adding to undo after the value has changed. (FIXED!)
					addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
				}, 250);
				editor[ key ] = Number(value); // editor watcher updates value input.
			//	value_input.value = (RAD2DEG*editor[key]).toFixed(1); // display.
			}

			function updateFloatNumberValue(min, max, step){
				var value = Number(editor[ key ]); // get value from editor.
				if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN editor[key] value.
				if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
				if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
				interval = setTimeout( function(){ 
				//	Add on firstMouseDown event listener.
					button.addEventListener( "mousedown", onfirstMouseDown ); // important!
				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we was adding to undo after the value has changed. (FIXED!)
					addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
				}, 250);
				editor[ key ] = Number(value); // editor watcher updates value input.
			//	value_input.value = editor[key].toFixed(2); // display.
			}

			function updateIntegerNumberValue(min, max){
				var value = parseInt(editor[ key ]); // get value from editor.
				if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN editor[key] value.
				if ( button === increase_v ) value = THREE.Math.clamp( ++value, min, max );
				if ( button === decrease_v ) value = THREE.Math.clamp( --value, min, max );
				interval = setTimeout( function(){ 
				//	Add on firstMouseDown event listener.
					button.addEventListener( "mousedown", onfirstMouseDown ); // important!
				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we was adding to undo after the value has changed. (FIXED!)
					addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
				}, 250);
				editor[ key ] = parseInt(value); // editor watcher updates value input.
			}

			function updateConstantStringValue( values ){
				var min = 0, max = values.length;
				var value = editor[ key ]; // string.
				var index = values.findIndex(function( item ){ return item === value; });
				if ( button === increase_v ) value = values[ ( ++index % max + max ) % max ]; // mod();
				if ( button === decrease_v ) value = values[ ( --index % max + max ) % max ]; // mod();
				interval = setTimeout( function(){ 
				//	Add on firstMouseDown event listener.
					button.addEventListener( "mousedown", onfirstMouseDown ); // important!
				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we was adding to undo after the value has changed. (FIXED!)
					addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
				}, 250);
				editor[ key ] = String(value); // editor watcher updates value input.
			}

			function updateConstantNumberValue( values ){
				var min = 0, max = values.length;
				var value = Number(editor[ key ]); // get value from editor.
				var index = values.findIndex(function( item ){ return item === value; });
				if ( button === increase_v ) value = values[ ( ++index % max + max ) % max ]; // mod();
				if ( button === decrease_v ) value = values[ ( --index % max + max ) % max ]; // mod();
				interval = setTimeout( function(){ 
				//	Add on firstMouseDown event listener.
					button.addEventListener( "mousedown", onfirstMouseDown ); // important!
				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we was adding to undo after the value has changed. (FIXED!)
					addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
				}, 250);
				editor[ key ] = Number(value); // editor watcher updates value input.
			}

			switch ( key ){

			// disabled:
				case "name":
				case "type":
					text_input.value = editor[key] || ""; // disabled on mouse click.
				break;

			//	string type:
				case "uuid": 
					(function(){
						var value = THREE.Math.generateUUID(); // string
						interval = setTimeout( function(){ 
						//	Add on firstMouseDown event listener.
							button.addEventListener( "mousedown", onfirstMouseDown ); // important!
						//	Before change the editor[key] value add an undo state in undo queue.
						//	Until now we was adding to undo after the value has changed. (FIXED!)
							addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
						}, 250);
						text_input.value = editor[ key ] = value; // editor watcher updates value input.
					})();
				break;
				case "linecap":
				case "wireframeLinecap":
					updateConstantStringValue(["butt","round","square"]);
				break;
				case "linejoin":
					updateConstantStringValue(["bevel","round","miter"]);
				break;
				case "precision":
					updateConstantStringValue(["highp","mediump","lowp"]);
				break;

			//	boolean type:
				case "fog":
				case "lights":
				case "flatShading":
				case "transparent":
				case "depthTest":
				case "depthWrite":
				case "clipIntersection":
				case "clipShadows":
				case "colorWrite":
				case "polygonOffset":
				case "dithering":
				case "premultipliedAlpha":
				case "visible":
				case "wireframe":
				case "skinning":
				case "morphTargets":
				case "morphNormals":
			//	case "needsUpdate":
				case "sizeAttenuation":
					(function(){
						var value = !editor[ key ]; // boolean.
						interval = setTimeout( function(){ 
						//	Add on firstMouseDown event listener.
							button.addEventListener( "mousedown", onfirstMouseDown ); // important!
						//	Before change the editor[key] value add an undo state in undo queue.
						//	Until now we was adding to undo after the value has changed. (FIXED!)
							addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
						}, 250);
						value_input.value = editor[ key ] = value; // editor watcher updates value input.
					})();
				break;

			//	number type:
				case "blending":
					updateConstantNumberValue([
						THREE.NoBlending,THREE.NormalBlending,THREE.AdditiveBlending,
						THREE.SubtractiveBlending,THREE.MultiplyBlending,THREE.CustomBlending
					]);
				break;
				case "side":
					updateConstantNumberValue([THREE.FrontSide,THREE.BackSide,THREE.DoubleSide]);
				break;
				case "vertexColors":
					updateConstantNumberValue([THREE.NoColors,THREE.FaceColors,THREE.VertexColors]);
				break;
				case "blendDst":
				case "blendSrc":
					updateConstantNumberValue([THREE.ZeroFactor,THREE.OneFactor,THREE.SrcColorFactor,
						THREE.OneMinusSrcColorFactor,THREE.SrcAlphaFactor,THREE.OneMinusSrcAlphaFactor,
						THREE.DstAlphaFactor,THREE.OneMinusDstAlphaFactor,THREE.DstColorFactor,
						THREE.OneMinusDstColorFactor,THREE.SrcAlphaSaturateFactor
					]);
				break;
				case "blendEquation":
					updateConstantNumberValue([THREE.AddEquation,THREE.SubtractEquation,
						THREE.ReverseSubtractEquation,THREE.MinEquation,THREE.MaxEquation
					]);
				break;
				case "depthFunc":
					updateConstantNumberValue([THREE.NeverDepth,THREE.AlwaysDepth,THREE.LessDepth,
						THREE.LessEqualDepth,THREE.GreaterEqualDepth,THREE.GreaterDepth,THREE.NotEqualDepth
					]);
				break;
				case "normalMapType":
					updateConstantNumberValue([THREE.TangentSpaceNormalMap,THREE.ObjectSpaceNormalMap]);
				break;
				case "combine":
					updateConstantNumberValue([THREE.MultiplyOperation,THREE.MixOperation,THREE.AddOperation]);
				break;
			//
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
				case "depthPacking":
					//	???
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

			//	disabled:
				default:
					value_input.value = editor[key] || ""; // disabled on mouse click.
				break;
			}

			debugMode && console.log( "on Mouse Click:", interval );

		} // end onMouseClick

	})(
		materialEditor, // editor,
		document.querySelector("li#material-value-increase"), // increase_v
		document.querySelector("li#material-value-decrease"), // decrease_v
		document.querySelector("input#material-text-input"),  // text_input,
		document.querySelector("input#material-value-input"), //value_input,
		document.querySelector("select#material-keys-droplist"), // key_droplist
		document.querySelector("select#material-entities-droplist"), // entity_droplist.
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button")  // redo_button, (only needed for the debug console.log).
	);
