//	entity helpers.

	function getObjectByEntityId( value ){

		var entity_droplist = document.querySelector("select#editor-entities-droplist");

		if ( arguments.length ) 
			var id = parseInt( value );
		else
			var id = parseInt( entity_droplist.value );

		if ( isNaN(id) ) return;

		return scene.getObjectById( id );
	}

	function getMaterialByEntityId( value ){

		var entity_droplist = document.querySelector("select#material-entities-droplist");

		if ( arguments.length ) 
			var id = parseInt( value );
		else
			var id = parseInt( entity_droplist.value );

		if ( isNaN(id) ) return;

		return material_entities.find( function( material ){
			return material.id === id;
		});
	}

	function getTextureByEntityId( value ){

		var entity_droplist = document.querySelector("select#texture-entities-droplist");

		if ( arguments.length ) 
			var id = parseInt( value );
		else
			var id = parseInt( entity_droplist.value );

		if ( isNaN(id) ) return;

		return texture_entities.find( function( texture ){
			return texture.id === id;
		});
	}
