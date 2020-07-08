//	clone-material-entity.js

	(function(clone_button,entity_droplist,entities){

		var interval;

		clone_button.addEventListener( "click", function(){
			clearTimeout( interval );
			interval = setTimeout(function(){

			//	Get source.
				var source = getMaterialByEntityId();
				if ( !(source && source.isMaterial) ) return;

			//	Clone source.
				if ( source && source.isMaterial ) {

				//	clone.
					var material = source.clone();

				//	rename, TODO: better renameing.
					material.name = source.name.replace(/:clone/g,"") + ":clone";

				//	add entity.
					entities.add( material );

				//	Enter edit mode.
					entity_droplist.value = String(material.id);
					callWatchers( entity_droplist, "onchange", "change", String(material.id) );
				}

			}, 250);
		});

	})(
		document.querySelector("div#clone-material-button"), // clone_button,
		document.querySelector("select#material-entities-droplist"), // entity_droplist,
		material_entities // entities,
	);
