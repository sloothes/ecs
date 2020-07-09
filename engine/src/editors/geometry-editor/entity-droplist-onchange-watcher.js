//	entity-droplist-onchange-watcher.js

	(function(editor,vector_droplist,entity_droplist,material_droplist){

	//	watchers.

		watch( entity_droplist, "onchange", function( property, event, value ){
		//	if (entity_droplist.value !== value ) entity_droplist.value = value;
			editor.update( parseInt( value ) ); // important! string id.
			callWatchers( vector_droplist, "onchange", "change", vector_droplist.value );
		});

		watch( entity_droplist, "onchange", function( property, event, value ){
		//	if (entity_droplist.value !== value ) entity_droplist.value = value;
			var object = getObjectByEntityId( value ); if ( !object ) return; 
			var material =  getMaterialByEntityId( object.material.id ); if ( !material ) return; 
			material_droplist.value = String(material.id); // stirng, important!
			callWatchers( material_droplist, "onchange", "change", material_droplist.value );
		});

	})(
		sceneEditor, // editor,
		document.querySelector("select#geometry-vector-droplist"),   // vector_droplist.
		document.querySelector("select#geometry-entities-droplist"), // entity_droplist.
		document.querySelector("select#material-entities-droplist")  // material_droplist.
	);

