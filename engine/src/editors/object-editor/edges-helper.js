//	edges-helper.js

	(function( scene,entity_droplist ){

		var interval;
		var edgeshelper;

		function destroyEdgesHelper(){
			if ( !edgeshelper ) return;
			scene.remove( edgeshelper ); 
			edgeshelper.geometry.dispose();
			edgeshelper.material.dispose();
			edgeshelper = undefined;
		}

		function createEdgesHelper( object ){

			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;

			var geometry = new THREE.EdgesGeometry( object.geometry );
			var material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
			var helper = new THREE.LineSegments( geometry, material );
			helper.scale.copy( object.scale );       // important!
			helper.position.copy( object.position ); // important!
			helper.rotation.copy( object.rotation ); // important!
			helper.name = object.name + ":edgeshelper";

			scene.add( helper );
			edgeshelper = helper;
		}

	//	Remove/Create edges helpers.

		watch(entity_droplist, "onchange", function( property, event, value ){

		//	Remove old edges helper.
			destroyEdgesHelper(); // remove old helper.

		//	Get object.
			var object = getObjectByEntityId( value );

		//	Create new edges helper.
			object && createEdgesHelper( object ); // add new helper.

		});

	})(
		scene, document.querySelector("select#editor-entities-droplist") // entity_droplist.
	);
