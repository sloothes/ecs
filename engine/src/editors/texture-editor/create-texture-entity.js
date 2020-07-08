//	create-texture-entity.js

	(function(input,entities){

	//	Add watcher.

		watch( input, "onchange", function(property, action, files){

			if ( files.length === 0 ) return;

			var file = input.files[0];

			var img = new Image();
			img.addEventListener("load", function(){

			//	make power of two.
				var canvas = document.createElement("canvas");
				canvas.width = THREE.Math.floorPowerOfTwo( img.width );
				canvas.height = THREE.Math.floorPowerOfTwo( img.height );
				var context = canvas.getContext( "2d" );
				context.drawImage( img, 0, 0, canvas.width, canvas.height );
				debugMode && console.log( canvas );

			//	create new texture.
				var texture = new THREE.Texture(canvas);
				debugMode && console.log( texture );
				texture.name = file.name;
				texture.sourceFile = file.name;
				texture.wrapS = texture.wrapT = 1000; // THREE.RepeatWrapping.
				entities.add( texture ); // texture manager.

			});

			var reader = new FileReader();
			reader.addEventListener("load", function() {
				img.name = file.name;
				img.src = reader.result;
			});

			reader.readAsDataURL(file);

		});

	})(
		document.querySelector("input#texture-file-input"), // input,
		texture_entities // entities,
	);
