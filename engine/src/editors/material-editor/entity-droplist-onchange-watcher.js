//	entity-droplist-onchange-watcher.js

	(function(editor,map_droplist,key_droplist,type_droplist,vector_droplist,color_droplist,entity_droplist){

	//	watcher.

		watch( entity_droplist, "onchange", function( property, event, value ){
		//	if (entity_droplist.value !== value ) entity_droplist.value = value;
			editor.update( parseInt( value ) ); // important! string id.
			callWatchers( map_droplist, "onchange", "change", map_droplist.value );
			callWatchers( key_droplist, "onchange", "change", key_droplist.value );
			callWatchers( vector_droplist, "onchange", "change", vector_droplist.value );
			callWatchers( color_droplist, "onchange", "change", color_droplist.value );
			callWatchers( type_droplist, "onchange", "change", editor.type );
		});

	})(
		materialEditor, // editor,
		document.querySelector("select#material-map-droplist"),     // map_droplist.
		document.querySelector("select#material-keys-droplist"),    // key_droplist.
		document.querySelector("select#material-type-droplist"),    // type_droplist.
		document.querySelector("select#material-vector-droplist"),  // vector_droplist.
		document.querySelector("select#material-color-droplist"),   // vector_droplist.
		document.querySelector("select#material-entities-droplist") // entity_droplist.
	);

	//	blur.

	//	watch( map_droplist, "onchange", function(){ map_droplist.blur(); });       // EXPERIMANTAL!
	//	watch( key_droplist, "onchange", function(){ key_droplist.blur(); });       // EXPERIMANTAL!
	//	watch( vector_droplist, "onchange", function(){ vector_droplist.blur(); }); // EXPERIMANTAL!
	//	watch( color_droplist, "onchange", function(){ color_droplist.blur(); });   // EXPERIMANTAL!
	//	watch( entity_droplist, "onchange", function(){ entity_droplist.blur(); }); // EXPERIMANTAL!
