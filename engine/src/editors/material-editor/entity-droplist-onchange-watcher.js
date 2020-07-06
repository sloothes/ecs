//	entity-droplist-onchange-watcher.js

	(function(editor,map_droplist,key_droplist,vector_droplist,color_droplist,entity_droplist){

	//	blur.

		watch( map_droplist, "onchange", function(){ map_droplist.blur(); });       // EXPERIMANTAL!
		watch( key_droplist, "onchange", function(){ key_droplist.blur(); });       // EXPERIMANTAL!
		watch( vector_droplist, "onchange", function(){ vector_droplist.blur(); }); // EXPERIMANTAL!
		watch( color_droplist, "onchange", function(){ color_droplist.blur(); });   // EXPERIMANTAL!
		watch( entity_droplist, "onchange", function(){ entity_droplist.blur(); }); // EXPERIMANTAL!

	//	watcher.

		watch( entity_droplist, "onchange", function( property, event, value ){
			editor.update( parseInt( value ) ); // important! id.
			callWatchers( map_droplist, "onchange", "change", map_droplist.value );
			callWatchers( key_droplist, "onchange", "change", key_droplist.value );
			callWatchers( vector_droplist, "onchange", "change", vector_droplist.value );
			callWatchers( color_droplist, "onchange", "change", color_droplist.value );
		//	callWatchers( entity_droplist, "onchange", "change", entity_droplist.value );  // stack overflow!
		});

	})(
		materialEditor, // editor,
		document.querySelector("select#material-map-droplist"),     // map_droplist.
		document.querySelector("select#material-keys-droplist"),    // key_droplist.
		document.querySelector("select#material-vector-droplist"),  // vector_droplist.
		document.querySelector("select#material-color-droplist"),   // vector_droplist.
		document.querySelector("select#material-entities-droplist") // entity_droplist.
	);

	//	map_droplist.addEventListener( "change", map_droplist.blur );
	//	key_droplist.addEventListener( "change", key_droplist.blur );
	//	vector_droplist.addEventListener( "change", vector_droplist.blur );
	//	color_droplist.addEventListener( "change", color_droplist.blur );
	//	entity_droplist.addEventListener( "change", entity_droplist.blur );
