//	entity-droplist-onchange-watcher.js

	(function(editor,key_droplist,vector_droplist,entity_droplist){

	//	watcher.

		watch( entity_droplist, "onchange", function( property, event, value ){
			editor.update( parseInt(value) ); // important! id.
			callWatchers( key_droplist, "onchange", "change", key_droplist.value );
			callWatchers( vector_droplist, "onchange", "change", vector_droplist.value );
		});

	})(
		textureEditor, // editor,
		document.querySelector("select#texture-key-droplist"), // key_droplist
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist.
	);

	//	blur.

	//	watch( key_droplist, "onchange", function(){ key_droplist.blur(); });       // EXPERIMANTAL!
	//	watch( vector_droplist, "onchange", function(){ vector_droplist.blur(); }); // EXPERIMANTAL!
	//	watch( entity_droplist, "onchange", function(){ entity_droplist.blur(); }); // EXPERIMANTAL!
