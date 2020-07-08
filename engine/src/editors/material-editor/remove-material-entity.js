//	remove-material-entity.js

	(function(remove_button,entity_droplist,entities){

		var interval;

		remove_button.addEventListener( "click", function(){
			clearTimeout( interval );
			interval = setTimeout(function(){

				var material = getMaterialByEntityId();
				if ( !(material && material.isMaterial) ) return;

			//	TODO: Are you sure?

			//	Remove material.
				if ( material && material.isMaterial ) {

				//	remove.
					entities.remove( material.id );

				//	Exit edit mode.
					entity_droplist.value = "";
					callWatchers( entity_droplist, "onchange", "change", "" );
				}

			}, 250);
		});

	})(
		document.querySelector("div#remove-material-button"), // remove_button,
		document.querySelector("select#material-entities-droplist"), // entity_droplist,
		material_entities // entities,
	);
