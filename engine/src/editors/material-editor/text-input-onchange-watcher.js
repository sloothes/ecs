//	text-input-onchange-watcher.js

	(function(editor,keyInputControls,text_input,value_input,key_droplist,entity_droplist,undo_button,redo_button){

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

	//	onchange.

		watch( text_input, "onchange", function(property, event, value){
			debugMode && console.log({item:text_input,event:event,key:key_droplist.value,value:value});

			if ( key_droplist.value === "" ) text_input.value = value = "";
			if ( entity_droplist.value === "" ) text_input.value = value = "";

			var key = key_droplist.value; // important!
		//	var value = text_input.value; // value.

			switch ( key ){

				case "":
				case "uuid":
				case "type":
				case "linecap":
				case "linejoin":
				case "wireframeLinecap":
					[ text_input.value, value_input.value ] = [ editor[key], "" ];
				break;

				case "name":

					if ( value === "" ) { 
						[text_input.value, value_input.value] = [ editor[key], "" ]; break; // important!
					}

				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we was adding to undo after the value has changed. (FIXED!)
					addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.

					setTimeout( function(){ editor[ key ] = value; });  // important!

				break;

				default:
					[ text_input.value, value_input.value ] = ["",""];
				break;
			}

		});

	})(
		materialEditor, // editor,
		keyInputControls, // keyInputControls,
		document.querySelector("input#material-text-input"), // text_input,
		document.querySelector("input#material-value-input"), // value_input,
		document.querySelector("select#material-keys-droplist"), // key_droplist
		document.querySelector("select#material-entities-droplist"), // entity_droplist.
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button")  // redo_button (only needed for the debug console.log).
	);


	//	blur.

	//	watch( text_input, "onchange", function(){ text_input.blur(); }); // EXPERIMANTAL!

	//	keyInputControls.

	//	function enableKeyInputControls(){
	//		keyInputControls.isDisabled = false;
	//	}

	//	function disableKeyInputControls(){
	//		keyInputControls.isDisabled = true;
	//	}

	//	text_input.addEventListener( "blur", enableKeyInputControls );
	//	text_input.addEventListener( "focus", disableKeyInputControls );
