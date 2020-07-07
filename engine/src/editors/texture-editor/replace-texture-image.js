//	replace_texture-image.js

	(function(viewer,input,droplist){

	//	Add watcher.

		watch( input, "onchange", function(property, action, files){

			if ( files.length === 0 ) return;

			var file = input.files[0];

		//	get texture.
			var texture = getTextureByEntityId( droplist.value ); // string.
			if ( !texture ) return; debugMode && console.log( texture );

			var img = new Image();
			img.addEventListener("load", function(){

			//	make power of two.
				var canvas = document.createElement("canvas");
				canvas.width = THREE.Math.floorPowerOfTwo( img.width );
				canvas.height = THREE.Math.floorPowerOfTwo( img.height );
				var context = canvas.getContext( "2d" );
				context.drawImage( img, 0, 0, canvas.width, canvas.height );
				debugMode && console.log( canvas );

			//	texture has gotten.
				if ( !texture ) return;
				texture.image = canvas;
				texture.name = file.name;
				texture.sourceFile = file.name;
				if ( texture.image !== undefined ) texture.needsUpdate = true; // important!
				if ( viewer && viewer.material ) viewer.material.needsUpdate = true; // important!
			//	TODO: Update texture entity option text.

			});

			var reader = new FileReader();
			reader.addEventListener("load", function() {
				img.name = file.name;
				img.src = reader.result;
			});

			reader.readAsDataURL(file);

		});

	})(
		textureViewer, // texture viewer.
		document.querySelector("input#image-file-input"), // image file input.
		document.querySelector("select#texture-entities-droplist") // texture entities droplist.
	);
