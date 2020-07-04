//	value-input-onchange-watcher.js

	(function(editor,keyInputControls,value_input,key_droplist,entity_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		function addtoUndo(){
			var json = editor.toJSON();
			json && undo.unshift( json );
			debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
			return;
		}

	//	blur.
	//	vector_x.addEventListener( "change", vector_x.blur );
	//	vector_y.addEventListener( "change", vector_y.blur );
	//	value_input.addEventListener( "change", value_input.blur );
		watch( value_input, "onchange", function(){ value_input.blur(); }); // EXPERIMANTAL!

	//	keyInputControls.

		function enableKeyInputControls(){
			keyInputControls.isDisabled = false;
		}

		function disableKeyInputControls(){
			keyInputControls.isDisabled = true;
		}

	//	onblur.
	//	vector_x.addEventListener( "blur", enableKeyInputControls );
	//	vector_y.addEventListener( "blur", enableKeyInputControls );
		value_input.addEventListener( "blur", enableKeyInputControls );

	//	onfocus.
	//	vector_x.addEventListener( "focus", disableKeyInputControls );
	//	vector_y.addEventListener( "focus", disableKeyInputControls );
		value_input.addEventListener( "focus", disableKeyInputControls );

	//	onchange.

	//	EXPERIMANTAL.
		watch( value_input, "onchange", function(property, event, value){
			debugMode && console.log({item:value_input,event:event,key:key_droplist.value,value:value});

			if ( entity_droplist.value === "" ) value_input.value = value = ""; // string.

			var key = key_droplist.value; // important!
		//	var value = Number(value_input.value); // value, number!

		//	disabled on input change.

		//	if ( key === "" ) value_input.value = value = ""; // string.
		//	if ( key === "name") value_input.value = value = ""; // string.
		//	if ( key === "uuid" ) value_input.value = value = ""; // string.
		//	if ( isNaN( Number(value) ) ) value_input.value = value = ""; // string.
		//	if ( entity_droplist.value === "" ) value_input.value = value = ""; // string.

		//	enabled on input change.
		//	Before change the editor[key] value, add an undo state in undo queue.
		//	Until now we has adding to Undo after the value has changed. (FIXED!)

			switch ( key ){

				case "":
				case "name":
				case "uuid":
					value_input.value = value = ""; // dispbled.
				break;

				case "flipY":
					if ( value.toLowerCase() === "false" ) value = 0;      // accept "false" string.
					else if ( value.toLowerCase() === "true" ) value = 1;  // accept "true" string.
					else if ( isNaN(value) ) value = Boolean(editor[key]); // avoid to pass NaN value!
					else value = Boolean(value); // convert to boolean, important!

					if ( editor[key] !== Boolean(value) ) 
						try { addtoUndo(); } catch(err) { console.error("TODO:addtoUndo();"); } // debug!
				//	editor watcher updates input only if the editor value has changed,
				//	so in this case we must explicitly update the input value manualy.
					else value_input.value = editor[key]; // boolean as string.
				//	editor watcher updates value input.
					setTimeout( function(){ editor[key] = Boolean(value); });
				break;

				case "format":
					if ( [1021, 1022, 1023, 1024, 1025, 1026, 1027].includes( Number(value) ) ) {
						if ( editor[key] !== Number(value) ) 
							try { addtoUndo(); } catch(err) { console.error("TODO:addtoUndo();"); } // debug!
					//	editor watcher updates input only if the editor value has changed,
					//	so in this case we must explicitly update the input value manualy.
						else value_input.value = editor[key]; // number as string.
					//	editor watcher updates value input.
						setTimeout( function(){ editor[key] = Number(value); });
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key];
					else value_input.value = editor[key] = 1023; // reset.
				break;

				case "mapping":
					if ( [300, 301, 302, 303, 304, 305, 306, 307].includes( Number(value) ) ) {
						if ( editor[key] !== Number(value) ) 
							try { addtoUndo(); } catch(err) { console.error("TODO:addtoUndo();"); } // debug!
					//	editor watcher updates input only if the editor value has changed,
					//	so in this case we must explicitly update the input value manualy.
						else value_input.value = editor[key]; // number as string.
					//	editor watcher updates value input.
						setTimeout( function(){ editor[ key ] = Number(value); });
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key];
					else value_input.value = editor[key] = 300; // reset.
				break;

				case "encoding":
					if ( [3000, 3001, 3007, 3002, 3003, 3004, 3005, 3006, 3200, 3201].includes( Number(value) ) ) {
						if ( editor[key] !== Number(value) ) 
							try { addtoUndo(); } catch(err) { console.error("TODO:addtoUndo();"); } // debug!
					//	editor watcher updates input only if the editor value has changed,
					//	so in this case we must explicitly update the input value manualy.
						else value_input.value = editor[key]; // number as string.
					//	editor watcher updates value input.
						setTimeout( function(){ editor[ key ] = Number(value); });
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key];
					else value_input.value = editor[key] = 3000; // reset.
				break;

				case "magFilter":
					if ( [1003, 1006].includes( Number(value) ) ) {
						if ( editor[key] !== Number(value) ) 
							try { addtoUndo(); } catch(err) { console.error("addtoUndo();"); } // debug!
					//	editor watcher updates input only if the editor value has changed,
					//	so in this case we must explicitly update the input value manualy.
						else value_input.value = editor[key]; // number as string.
					//	editor watcher updates value input.
						setTimeout( function(){ editor[ key ] = Number(value); });
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key];
					else value_input.value = editor[key] = 1006; // reset.
				break;

				case "minFilter":
					if ( [1003, 1004, 1005, 1006, 1007, 1008].includes( Number(value) ) ) {
						if ( editor[key] !== Number(value) ) 
							try { addtoUndo(); } catch(err) { console.error("TODO:addtoUndo();"); } // debug!
					//	editor watcher updates input only if the editor value has changed,
					//	so in this case we must explicitly update the input value manualy.
						else value_input.value = editor[key]; // number as string.
					//	editor watcher updates value input.
						setTimeout( function(){ editor[ key ] = Number(value); });
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key];
					else value_input.value = editor[key] = 1008; // reset.
				break;

				case "wrapS":
				case "wrapT":
					if ( [1000, 1001, 1002].includes( Number(value) ) ) {
						if ( editor[key] !== Number(value) ) 
							try { addtoUndo(); } catch(err) { console.error("TODO:addtoUndo();"); } // debug!
					//	editor watcher updates input only if the editor value has changed,
					//	so in this case we must explicitly update the input value manualy.
						else value_input.value = editor[key]; // number as string.
					//	editor watcher updates value input.
						setTimeout( function(){ editor[ key ] = Number(value); });
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key];
					else value_input.value = editor[key] = 1000; // reset.
				break;

				case "anisotropy":
					if ( !isNaN( Number(value) ) ) {
						if ( editor[key] !== THREE.Math.clamp(value,-1,1) ) 
							try { addtoUndo(); } catch(err) { console.error("TODO:addtoUndo();"); } // debug!
					//	editor watcher updates input only if the editor value has changed,
					//	so in this case we must explicitly update the input value manualy.
						else value_input.value = editor[key].toFixed(2); // number as string.
					//	editor watcher updates value input.
						setTimeout(function(){ editor[ key ] = THREE.Math.clamp(value,-1,1); });
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key].toFixed(2);
					else value_input.value = editor[key] = 1; // reset.
				break;

				case "rotation":
					if ( !isNaN( Number(value) ) ) { 
						if ( editor[key] !== THREE.Math.clamp(DEG2RAD*value,-Math.PI, Math.PI) ) 
							try { addtoUndo(); } catch(err) { console.error("TODO:addtoUndo();"); } // debug!
					//	editor watcher updates input only if the editor value has changed,
					//	so in this case we must explicitly update the input value manualy.
						else value_input.value = (RAD2DEG*editor[key]).toFixed(1); // number as string.
					//	editor watcher updates value input.
						setTimeout(function(){ editor[key] = THREE.Math.clamp(DEG2RAD*value,-Math.PI, Math.PI); });
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = THREE.Math.clamp((RAD2DEG*editor[key]),-180,180).toFixed(1);
					else value_input.value = editor[key] = 0; // reset.
				break;

				default:
					value_input.value = value = "";
				break;

			} // end switch.

		});

	})(
		textureEditor, // editor,
		keyInputControls, // keyInputControls,
	//	document.querySelector("input#texture-text-input"), // text_input,
		document.querySelector("input#texture-value-input"), // value_input,
	//	document.querySelector("input#texture-vector-x-input"), // vector_x,
	//	document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("select#texture-key-droplist"), // key_droplist
	//	document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist.
	);


//  ==========================================================================================  //

//	vector-input-onchange-watchers.js

//	vector-x-input-onchange-watcher.js

	(function(editor,keyInputControls,vector_x,vector_droplist,entity_droplist){

		function addtoUndo(){
			var json = editor.toJSON();
			json && undo.unshift( json );
			debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
			return;
		}

	//	blur.
	//	vector_x.addEventListener( "change", vector_x.blur );
		watch( vector_x, "onchange", function(){ vector_x.blur(); }); // EXPERIMANTAL!

	//	keyInputControls.

		function enableKeyInputControls(){
			keyInputControls.isDisabled = false;
		}

		function disableKeyInputControls(){
			keyInputControls.isDisabled = true;
		}

	//	onblur.
		vector_x.addEventListener( "blur", enableKeyInputControls );

	//	onfocus.
		vector_x.addEventListener( "focus", disableKeyInputControls );

	//	onchange.

		watch( vector_x, "onchange", function(property, event, value){
		//	debugMode && console.log({item:vector_x,event:event,key:vector_droplist.value,x:value});

			if ( entity_droplist.value === "" ) return vector_x.value = "";
			if ( vector_droplist.value === "" ) return vector_x.value = "";

		//	"value" always comes as typeof "string".

			if ( value === undefined ) return vector_x.value = "";
			if ( value === "" ) return vector_x.value = "";
			if ( value === "NaN" ) return vector_x.value = "";
			if ( value === "undefined" ) return vector_x.value = "";

			var key = vector_droplist.value;

		//	disabled on key change.

			if ( editor[key] === undefined ) return vector_x.value = "";
			if ( !editor[key].isVector2 ) return vector_x.value = "";
			if ( isNaN(value) ) return vector_x.value = editor[key].x.toFixed(2);

		//	enabled on key change.
		//	Before change the editor[key] value add an undo state in undo queue.
		//	Until now we has adding to Undo after the value has changed. (FIXED!)

			switch (key) {

				case "center":
					var value = THREE.Math.clamp( Number(value), 0, 1 ); // important!
					if ( editor[key].x !== Number(value) ) 
						try { addtoUndo(); } catch(err) { console.error("TODO:addtoUndo();"); } // debug!
				//	editor watcher updates value input.
					editor[key].x = Number(value);
				//	setTimeout(function(){ editor[key].x = Number(value); }); // important!
				break;

				case "offset":
				case "repeat":
					var value = THREE.Math.clamp( Number(value), -100, 100 ); // number.
					if ( editor[key].x !== Number(value) ) 
						try { addtoUndo(); } catch(err) { console.error("TODO:addtoUndo();"); } // debug!
				//	editor watcher updates value input.
					editor[key].x = Number(value);
				//	setTimeout(function(){ editor[key].x = Number(value); }); // important!
				break;

				default:
					vector_x.value = "";
				break;
			}

		});

	})(
		textureEditor, // editor,
		keyInputControls, // keyInputControls,
	//	document.querySelector("input#texture-text-input"), // text_input,
	//	document.querySelector("input#texture-value-input"), // value_input,
		document.querySelector("input#texture-vector-x-input"), // vector_x,
	//	document.querySelector("input#texture-vector-y-input"), // vector_y,
	//	document.querySelector("select#texture-key-droplist"), // key_droplist
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist.
	);

//  ==========================================================================================  //


//	vector-y-input-onchange-watcher.js

	(function(editor,keyInputControls,vector_y,vector_droplist,entity_droplist){

		function addtoUndo(){
			var json = editor.toJSON();
			json && undo.unshift( json );
			debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
			return;
		}

	//	blur.
	//	vector_y.addEventListener( "change", vector_y.blur );
		watch( vector_y, "onchange", function(){ vector_y.blur(); }); // EXPERIMANTAL!

	//	keyInputControls.

		function enableKeyInputControls(){
			keyInputControls.isDisabled = false;
		}

		function disableKeyInputControls(){
			keyInputControls.isDisabled = true;
		}

	//	onblur.
		vector_y.addEventListener( "blur", enableKeyInputControls );

	//	onfocus.
		vector_y.addEventListener( "focus", disableKeyInputControls );

	//	onchange.

		watch( vector_y, "onchange", function(property, event, value){
		//	debugMode && console.log({item:vector_y,event:event,key:vector_droplist.value,y:value});

			if ( entity_droplist.value === "" ) return vector_y.value = "";
			if ( vector_droplist.value === "" ) return vector_y.value = "";

		//	"value" always comes as typeof "string".

			if ( value === undefined ) return vector_y.value = "";
			if ( value === "" ) return vector_y.value = "";
			if ( value === "NaN" ) return vector_y.value = "";
			if ( value === "undefined" ) return vector_y.value = "";

			var key = vector_droplist.value;

		//	disabled on key change.

			if ( editor[key] === undefined ) return vector_y.value = "";
			if ( !editor[key].isVector2 ) return vector_y.value = "";
			if ( isNaN(value) ) return vector_y.value = editor[key].y.toFixed(2);

		//	enabled on key change.
		//	Before change the editor[key] value add an undo state in undo queue.
		//	Until now we has adding to Undo after the value has changed. (FIXED!)

			switch (key) {

				case "center":
					var value = THREE.Math.clamp( Number(value), 0, 1 ); // important!
					if ( editor[key].y !== Number(value) ) 
						try { addtoUndo(); } catch(err) { console.error("TODO:addtoUndo();"); } // debug!
				//	editor watcher updates value input.
					editor[key].y = Number(value);
				//	setTimeout(function(){ editor[key].y = Number(value); }); // important!
				break;

				case "offset":
				case "repeat":
					var value = THREE.Math.clamp( Number(value), -100, 100 ); // number.
					if ( editor[key].y !== Number(value) ) 
						try { addtoUndo(); } catch(err) { console.error("TODO:addtoUndo();"); } // debug!
				//	editor watcher updates value input.
					editor[key].y = Number(value);
				//	setTimeout(function(){ editor[key].y = Number(value); }); // important!
				break;

				default:
					vector_y.value = "";
				break;
			}

		});

	})(
		textureEditor, // editor,
		keyInputControls, // keyInputControls,
	//	document.querySelector("input#texture-text-input"), // text_input,
	//	document.querySelector("input#texture-value-input"), // value_input,
	//	document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
	//	document.querySelector("select#texture-key-droplist"), // key_droplist
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist.
	);

//  ==========================================================================================  //
