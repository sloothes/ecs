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

			//	Naming.
				material.name = "new material";

			//	Add entity.
				entities.add( material );

			//	Enter edit mode.
				entity_droplist.value = String(material.id); // string, important!
				callWatchers( entity_droplist, "onchange", "change", entity_droplist.value );

			}, 250);
		});

	})(
		document.querySelector("div#create-material-button"), // create_button,
		document.querySelector("select#material-type-droplist"), // type_droplist,
		document.querySelector("select#material-entities-droplist"), // entity_droplist,
		material_entities // entities,
	);
