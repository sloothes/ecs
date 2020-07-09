//	create-geometry-entity.js

	(function(create_button,type_droplist,entity_droplist,material_entities,entities){

		var interval;

		create_button.addEventListener( "click", function(){
			clearTimeout( interval );
			interval = setTimeout(function(){
				callWatchers( create_button, "onclick", "click" );
			},250);
		});

		watch(create_button, "onclick", function(property, event, value){
			debugMode && console.log({property:property,event:event,value:value});

		//	Get type.
			var type = type_droplist.value; // string.
			if ( type === "" || type === undefined ) return;

		//	Create geometry.
			var geometry = new THREE[ type ]();
			if ( geometry === undefined ) return;

		//	Init params based on type.
			switch (type) {
				case "PlaneGeometry":
					geometry.translate(0, 0.5, 0);
				break;
			//	case "BoxGeometry":
			//	case "ConeGeometry":
			//	case "TorusGeometry":
			//	case "SphereGeometry":
			//	case "CylinderGeometry":
			//	case "OctahedronGeometry":
			//	case "DodecahedronGeometry":
			//	case "IcosahedronGeometry":
			//	case "TetrahedronGeometry":
			//	case "TorusKnotGeometry":
			//	case "CircleGeometry":
			//	case "RingGeometry":
			//	break;
			}

		//	Create mesh.
			var material = new THREE.MeshLambertMaterial({side:2});
			var mesh = new THREE.Mesh(geometry, material);
			mesh.name = type.replace("Geometry","") + mesh.id;
			scene.add( mesh );

		//	Add entities.
			entities.add( mesh );
			material_entities.add( material ); // important!

		//	Add to camera rigid objects.
		//	addtoRigidObjects( mesh.id );

		//	Enter edit mode.
			entity_droplist.value = String(mesh.id); // string, important!
			callWatchers(entity_droplist, "onchange", "change", entity_droplist.value);
		});

	})(
		document.querySelector("div#create-geometry-button"), // create_button,
		document.querySelector("select#geometry-type-droplist"), // type_droplist,
		document.querySelector("select#geometry-entities-droplist"), // entity_droplist,
		material_entities, entities // material_entities, entities.
	);
