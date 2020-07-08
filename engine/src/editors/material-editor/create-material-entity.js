//	create-material-entity.js

	(function(create_button,type_droplist,entity_droplist,entities){

		var interval;

		create_button.addEventListener( "click", function(){
			clearTimeout( interval );
			interval = setTimeout(function(){

			//	Get type.
				var type = type_droplist.value;
				if ( type === "" || type === undefined ) return;

			//	Init properties based on type.
				switch (type) {
					//	case "PointsMaterial":
					//	case "SpriteMaterial":
					//	case "ShaderMaterial":
					//	case "ShadowMaterial":
					//	case "MeshToonMaterial":
					//	case "MeshBasicMaterial":
					//	case "MeshPhongMaterial":
					//	case "MeshDepthMaterial":
					//	case "MeshNormalMaterial":
					//	case "MeshLambertMaterial":
					//	case "MeshStandardMaterial":
					//	case "MeshPhysicalMaterial":
					//	case "RawShaderMaterial":
					//	case "LineBasicMaterial":
					//	case "LineDashedMaterial":
					//	break;
				}

			//	Create.
				var material = new THREE[ type ]();
				if ( material === undefined ) return;

			//	Name it.
				material.name = "new material"+material.id;

			//	Add entity.
				entities.add( material );

			//	Enter edit mode.
				entity_droplist.value = String(material.id);
				callWatchers( entity_droplist, "onchange", "change", String(material.id) );

			}, 250);
		});

	})(
		document.querySelector("div#create-material-button"), // create_button,
		document.querySelector("select#material-type-droplist"), // type_droplist,
		document.querySelector("select#material-entities-droplist"), // entity_droplist,
		material_entities // entities,
	);

//	clone-material-entity.js

	(function(clone_button,entity_droplist,entities){

		clone_button.addEventListener( "click", function(){
			clearTimeout( interval );
			interval = setTimeout(function(){

			//	Get source.
				var source = getMaterialByEntityId();
				if ( !(source && source.isMaterial) ) return;

			//	Clone source.
				if ( source && source.isMaterial ) {

				//	clone.
					var material = material.clone();

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


//	remove-material-entity.js

	(function(remove_button,entity_droplist,entities){

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
