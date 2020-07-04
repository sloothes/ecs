//	key-droplist-onchange-watcher.js

	(function(editor,text_input,value_input,key_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch( key_droplist, "onchange", function( property, event, key ){
			debugMode && console.log({item:key_droplist,event:event,key:key});

			if ( !key ) [ value_input.value, text_input.value ] = ["", ""];
			else if ( key == "name" || key == "uuid" ) {
				[ value_input.value, text_input.value ] = [ "", editor[key] ];
			} else if ( key == "rotation" ) {
				[ value_input.value, text_input.value ] = [ (RAD2DEG*editor[key]).toFixed(1), "" ];
			} else if ( key == "anisotropy" ) {
				[ value_input.value, text_input.value ] = [ editor[key].toFixed(2), "" ];
			} else {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

	})(
		textureEditor, // editor,
		document.querySelector("input#texture-text-input"), // text_input,
		document.querySelector("input#texture-value-input"), // value_input,
		document.querySelector("select#texture-key-droplist") // key_droplist.
	);
