//	value-input-onchange-watcher.js

	(function(editor,keyInputControls,value_input,key_droplist,entity_droplist,undo_button,redo_button){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

	//	add undo.

		function addtoUndo(editor,key,value,undo_button,redo_button){
			if ( editor[ key ] === value ) return;
			var json = editor.toJSON();
			json && undo_button.undo.unshift( json );
			try { debugMode && console.log( 
				"undo:", undo_button.undo.length, 
				"redo:", redo_button.redo.length 
			); } catch(err){;}
			return;
		}

	//	onchange (EXPERIMANTAL).

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
		//	Until now we was adding to undo after the value has changed. (FIXED!)

			switch ( key ){

				case "":
				case "name":
				case "uuid":
					value_input.value = value = ""; return; // dispbled.
				break;

				case "flipY":
					if ( value === "0" ) value = false;                        // accept "0", string.
					else if ( value === "1" ) value = true;                    // accept "1", string.
					else if ( value.toLowerCase() === "true" ) value = true;   // accept "true" string.
					else if ( value.toLowerCase() === "false" ) value = false; // accept "false" string.
				//	else if ( isNaN(value) ) value = Boolean(editor[key]);     // avoid to pass NaN value!
					else value = Boolean(editor[key]); // return editor value, important!

					if ( editor[key] !== Boolean(value) ) {
					//	Before change the editor[key] value add an undo state in undo queue.
					//	Until now we was adding to undo after the value has changed. (FIXED!)
						addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
					//	editor watcher updates value input.
						setTimeout( function(){ editor[key] = Boolean(value); });
					//	editor watcher updates input only if the editor value has changed,
					//	so in this case we must explicitly update the input value manualy.
					} else value_input.value = editor[key]; // boolean as string.

				break;

				case "format":
					if ( [1021, 1022, 1023, 1024, 1025, 1026, 1027].includes( Number(value) ) ) {
						if ( editor[key] !== Number(value) ) {
						//	Before change the editor[key] value add an undo state in undo queue.
						//	Until now we was adding to undo after the value has changed. (FIXED!)
							addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
						//	editor watcher updates value input.
							setTimeout( function(){ editor[key] = Number(value); });
						//	editor watcher updates input only if the editor value has changed,
						//	so in this case we must explicitly update the input value manualy.
						} else value_input.value = editor[key]; // number as string.
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key];
					else value_input.value = editor[key] = 1023; // reset.
				break;

				case "mapping":
					if ( [300, 301, 302, 303, 304, 305, 306, 307].includes( Number(value) ) ) {
						if ( editor[key] !== Number(value) ) {
						//	Before change the editor[key] value add an undo state in undo queue.
						//	Until now we was adding to undo after the value has changed. (FIXED!)
							addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
						//	editor watcher updates value input.
							setTimeout( function(){ editor[key] = Number(value); });
						//	editor watcher updates input only if the editor value has changed,
						//	so in this case we must explicitly update the input value manualy.
						} else value_input.value = editor[key]; // number as string.
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key];
					else value_input.value = editor[key] = 300; // reset.
				break;

				case "encoding":
					if ( [3000, 3001, 3007, 3002, 3003, 3004, 3005, 3006, 3200, 3201].includes( Number(value) ) ) {
						if ( editor[key] !== Number(value) ) {
						//	Before change the editor[key] value add an undo state in undo queue.
						//	Until now we was adding to undo after the value has changed. (FIXED!)
							addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
						//	editor watcher updates value input.
							setTimeout( function(){ editor[key] = Number(value); });
						//	editor watcher updates input only if the editor value has changed,
						//	so in this case we must explicitly update the input value manualy.
						} else value_input.value = editor[key]; // number as string.
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key];
					else value_input.value = editor[key] = 3000; // reset.
				break;

				case "magFilter":
					if ( [1003, 1006].includes( Number(value) ) ) {
						if ( editor[key] !== Number(value) ) {
						//	Before change the editor[key] value add an undo state in undo queue.
						//	Until now we was adding to undo after the value has changed. (FIXED!)
							addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
						//	editor watcher updates value input.
							setTimeout( function(){ editor[key] = Number(value); });
						//	editor watcher updates input only if the editor value has changed,
						//	so in this case we must explicitly update the input value manualy.
						} else value_input.value = editor[key]; // number as string.
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key];
					else value_input.value = editor[key] = 1006; // reset.
				break;

				case "minFilter":
					if ( [1003, 1004, 1005, 1006, 1007, 1008].includes( Number(value) ) ) {
						if ( editor[key] !== Number(value) ) {
						//	Before change the editor[key] value add an undo state in undo queue.
						//	Until now we was adding to undo after the value has changed. (FIXED!)
							addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
						//	editor watcher updates value input.
							setTimeout( function(){ editor[key] = Number(value); });
						//	editor watcher updates input only if the editor value has changed,
						//	so in this case we must explicitly update the input value manualy.
						} else value_input.value = editor[key]; // number as string.
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key];
					else value_input.value = editor[key] = 1008; // reset.
				break;

				case "wrapS":
				case "wrapT":
					if ( [1000, 1001, 1002].includes( Number(value) ) ) {
						if ( editor[key] !== Number(value) ) {
						//	Before change the editor[key] value add an undo state in undo queue.
						//	Until now we was adding to undo after the value has changed. (FIXED!)
							addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
						//	editor watcher updates value input.
							setTimeout( function(){ editor[key] = Number(value); });
						//	editor watcher updates input only if the editor value has changed,
						//	so in this case we must explicitly update the input value manualy.
						} else value_input.value = editor[key]; // number as string.
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key];
					else value_input.value = editor[key] = 1000; // reset.
				break;

				case "anisotropy":
					if ( !isNaN( Number(value) ) ) {
						if ( editor[key] !== THREE.Math.clamp(value,-1,1) ) {
						//	Before change the editor[key] value add an undo state in undo queue.
						//	Until now we was adding to undo after the value has changed. (FIXED!)
							addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
						//	editor watcher updates value input.
							setTimeout(function(){ editor[ key ] = THREE.Math.clamp(value,-1,1); });
						//	editor watcher updates input only if the editor value has changed,
						//	so in this case we must explicitly update the input value manualy.
						} else value_input.value = editor[key].toFixed(2); // number as string.
					} 
					else if ( !isNaN( editor[key]) ) 
						value_input.value = editor[key].toFixed(2);
					else value_input.value = editor[key] = 1; // reset.
				break;

				case "rotation":
					if ( !isNaN( Number(value) ) ) { 
						if ( editor[key] !== THREE.Math.clamp(DEG2RAD*value,-Math.PI, Math.PI) ) {
						//	Before change the editor[key] value add an undo state in undo queue.
						//	Until now we was adding to undo after the value has changed. (FIXED!)
							addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
						//	editor watcher updates value input.
							setTimeout(function(){ editor[key] = THREE.Math.clamp(DEG2RAD*value,-Math.PI, Math.PI); });
						//	editor watcher updates input only if the editor value has changed,
						//	so in this case we must explicitly update the input value manualy.
						} else value_input.value = (RAD2DEG*editor[key]).toFixed(1); // number as string.
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
		document.querySelector("input#texture-value-input"), // value_input,
		document.querySelector("select#texture-key-droplist"), // key_droplist
		document.querySelector("select#texture-entities-droplist"), // entity_droplist.
		document.querySelector("div#texture-undo-button"), // undo_button,
		document.querySelector("div#texture-redo-button")  // redo_button.
	);

	//	blur.

	//	watch( value_input, "onchange", function(){ value_input.blur(); }); // EXPERIMANTAL!

	//	keyInputControls.

	//	function enableKeyInputControls(){
	//		keyInputControls.isDisabled = false;
	//	}

	//	function disableKeyInputControls(){
	//		keyInputControls.isDisabled = true;
	//	}

	//	value_input.addEventListener( "blur", enableKeyInputControls );
	//	value_input.addEventListener( "focus", disableKeyInputControls );
