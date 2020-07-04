//	text-input-onchange-watcher.js

	(function(editor,keyInputControls,text_input,key_droplist,entity_droplist){

		function addtoUndo(){
			var json = editor.toJSON();
			json && undo.unshift( json );
			return;
		}

	//	blur.
	//	text_input.addEventListener( "change", text_input.blur );
		watch( text_input, "onchange", function(){ text_input.blur(); }); // EXPERIMANTAL!

	//	keyInputControls.

		function enableKeyInputControls(){
			keyInputControls.isDisabled = false;
		}

		function disableKeyInputControls(){
			keyInputControls.isDisabled = true;
		}

		text_input.addEventListener( "blur", enableKeyInputControls );
		text_input.addEventListener( "focus", disableKeyInputControls );

	//	onchange.

	//	EXPERIMANTAL.
		watch( text_input, "onchange", function(property, event, value){
			debugMode && console.log({item:text_input,event:event,key:key_droplist.value,value:value});

			if ( key_droplist.value === "" ) text_input.value = value = "";
			if ( entity_droplist.value === "" ) text_input.value = value = "";

//			var key = key_droplist.value; // important!
//
//			if ( key === "uuid" ) text_input.value = editor[ key ];
//			else if ( key_droplist.value === "" ) text_input.value = "";
//			else if ( entity_droplist.value === "" ) text_input.value = "";
//			else if ( key === "name" ) {
//				if ( value === "" ) {
//					text_input.value = editor[ key ]; return; // text_input.value, string.
//				}
//				if ( editor[ key ] !== value ) try {
//					addtoUndo(); // text_input.value, string.
//				} catch(err) { console.error("TODO:addtoUndo();"); }
//				setTimeout(function(){ editor[ key ] = value; }); // text_input.value, string.
//			} else text_input.value = "";

			var key = key_droplist.value; // important!

			switch ( key ){

				case "uuid":
					text_input.value = editor[ key ];
				break;

				case "name":
					if ( value === "" ) {
						text_input.value = editor[ key ]; // text_input.value, string.
						break;
					}
					if ( editor[ key ] !== value ) try {
						addtoUndo(); // text_input.value, string.
					} catch(err) { console.warn("TODO:addtoUndo();"); }
					setTimeout(function(){ editor[ key ] = value; }); // text_input.value, string.
				break;

				default:
					text_input.value = value = "";
				break;
			}

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
		document.querySelector("select#texture-key-droplist"), // key_droplist
		document.querySelector("select#texture-entities-droplist") // entity_droplist.
	);


