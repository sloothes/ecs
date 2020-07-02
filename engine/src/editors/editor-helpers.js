//	entity helpers.

	function getMaterialByEntityId( value ){

		var material_droplist = document.querySelector("select#material-entities-droplist");

		if ( arguments.length ) 
			var id = parseInt( value );
		else
			var id = parseInt( material_droplist.value );

		if ( id === NaN ) return;

		return material_entities.find( function( material ){
			return material.id === id;
		});
	}

	function getTextureByEntityId( value ){

		var texture_droplist = document.querySelector("select#texture-entities-droplist");

		if ( arguments.length ) 
			var id = parseInt( value );
		else
			var id = parseInt( texture_droplist.value );

		if ( id === NaN ) return;

		return texture_entities.find( function( texture ){
			return texture.id === id;
		});
	}
