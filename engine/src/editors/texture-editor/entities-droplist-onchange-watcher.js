	(function(editor,key_droplist,vector_droplist,entity_droplist){

	//	blur.

		key_droplist.addEventListener( "change", key_droplist.blur );
		vector_droplist.addEventListener( "change", vector_droplist.blur );
		entity_droplist.addEventListener( "change", entity_droplist.blur );

	//	watcher.

		watch( entity_droplist, "onchange", function( property, event, value ){
			editor.update( parseInt(value) ); // important! id.
			var key = key_droplist.value, vector = vector_droplist.value;
			callWatchers( key_droplist, "onchange", "change", key );
			callWatchers( vector_droplist, "onchange", "change", vector );
		});

	})(
		textureEditor, // editor,
		document.querySelector("select#texture-key-droplist"), // key_droplist
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist.
	);
