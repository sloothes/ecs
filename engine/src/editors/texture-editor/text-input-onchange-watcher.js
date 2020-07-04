//	text-input-onchange-watcher.js

	(function(editor,keyInputControls,text_input,key_droplist,entity_droplist){

	//	const RAD2DEG = 57.29577951308232;
	//	const DEG2RAD = 0.017453292519943295;

		function addtoUndo(){
			var json = editor.toJSON();
			json && undo.unshift( json );
			return;
		}

	//	blur.
	//	vector_x.addEventListener( "change", vector_x.blur );
	//	vector_y.addEventListener( "change", vector_y.blur );
	//	value_input.addEventListener( "change", value_input.blur );
		text_input.addEventListener( "change", text_input.blur );

	//	keyInputControls.

		function enableKeyInputControls(){
			keyInputControls.isDisabled = false;
		}

		function disableKeyInputControls(){
			keyInputControls.isDisabled = true;
		}

	//	blur.
	//	vector_x.addEventListener( "blur", enableKeyInputControls );
	//	vector_y.addEventListener( "blur", enableKeyInputControls );
	//	value_input.addEventListener( "blur", enableKeyInputControls );
		text_input.addEventListener( "blur", enableKeyInputControls );

	//	focus.
	//	vector_x.addEventListener( "focus", disableKeyInputControls );
	//	vector_y.addEventListener( "focus", disableKeyInputControls );
	//	value_input.addEventListener( "focus", disableKeyInputControls );
		text_input.addEventListener( "focus", disableKeyInputControls );

	//	onchange.

//		EXPERIMANTAL.
		watch( text_input, "onchange", function(property, event, value){
			debugMode && console.log({tab:"Texture",item:"text input",event:event,key:key_droplist.value,"value":value});

			var key = key_droplist.value; // important!

			if ( key === "uuid" ) text_input.value = editor[ key ];
			else if ( key_droplist.value === "" ) text_input.value = "";
			else if ( entity_droplist.value === "" ) text_input.value = "";
			else if ( key === "name" ) {
				if ( value === "" ) {
					text_input.value = editor[ key ]; return; // text_input.value, string.
				}
				if ( editor[ key ] !== value ) try {
					addtoUndo(); // text_input.value, string.
				} catch(err) { console.error("TODO:addtoUndo();"); }
				setTimeout(function(){ editor[ key ] = value; }); // text_input.value, string.
			} else text_input.value = "";

		});

//		text_input.addEventListener( "change", function(){
//
//			var key = key_droplist.value;
//
//			if ( key === "uuid" ) text_input.value = editor[ key ];
//			else if ( !key_droplist.value ) text_input.value = "";
//			else if ( !entity_droplist.value ) text_input.value = "";
//			else if ( key === "name" ) {
//				if ( text_input.value === "" ) return;
//				if ( editor[ key ] !== text_input.value ) addtoUndo();
//				setTimeout(function(){ editor[ key ] = text_input.value; });
//			} else text_input.value = "";
//
//		});

	})(
		textureEditor, // editor,
		keyInputControls, // keyInputControls,
		document.querySelector("input#texture-text-input"), // text_input,
	//	document.querySelector("input#texture-value-input"), // value_input,
	//	document.querySelector("input#texture-vector-x-input"), // vector_x,
	//	document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("select#texture-key-droplist"), // key_droplist
	//	document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist.
	);


