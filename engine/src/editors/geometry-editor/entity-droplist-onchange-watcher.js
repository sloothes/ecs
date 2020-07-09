//	entity-droplist-onchange-watcher.js

	(function(editor,vector_droplist,entity_droplist){

	//	watchers.

		watch( entity_droplist, "onchange", function( property, event, value ){
		//	if (entity_droplist.value !== value ) entity_droplist.value = value;
			editor.update( parseInt( value ) ); // important! string id.
			callWatchers( vector_droplist, "onchange", "change", vector_droplist.value );
		});

		watch( entity_droplist, "onchange", function( property, event, value ){
		//	if (entity_droplist.value !== value ) entity_droplist.value = value;
			var droplist = document.querySelector("select#material-entities-droplist");
			var object = getObjectByEntityId( value ); if ( !object ) return; 
			var material =  getMaterialByEntityId( object.material.id ); if ( !material ) return; 
			droplist.value = String(material.id); // stirng, important!
			callWatchers( droplist, "onchange", "change", droplist.value );
		});

	})(
		sceneEditor, // editor,
		document.querySelector("select#geometry-vector-droplist"),  // vector_droplist.
		document.querySelector("select#geometry-entities-droplist") // entity_droplist.
	);

