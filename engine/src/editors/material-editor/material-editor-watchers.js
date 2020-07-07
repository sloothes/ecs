//	material-editor-watchers.js

//	Material Editor Watchers.
//	Watch each object/property individually.
//	Synchronize material with material editor (brige).
//	KEEP IN MIND: watchers update only if the value has been changed.

	(function( editor,entity_droplist ){

		var material; // important!

	//	You can add a watcher to get texture only when entity droplist changes.
		watch( entity_droplist, "onchange", function( property, event, value ){
			material = getMaterialByEntityId( value ); // material id.
			debugMode && console.log({ item:entity_droplist,entity:material,"entity id":value });
		});

	//	.......................... add watchers here! ........................  //

	})( 
		materialEditor, // editor,
		document.querySelector("select#material-entities-droplist") // entity_droplist,
	);


//	Vectors.

	(function( editor,vector_x,vector_y,vector_droplist ){

	//	var material; // important!
	//	You can add a watcher to get texture only when entity droplist changes.
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		material = getMaterialByEntityId( value );
	//	});

	//	normalScale.

		watch( editor, "normalScale", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if (material && material.normalScale) 
				material.normalScale[key] = Number(editor.normalScale[key]);
		//	Display value.
			if ( vector_droplist.value === "normalScale" ){
				if ( key === "x" ) vector_x.value = editor.normalScale[key].toFixed(2);
				if ( key === "y" ) vector_y.value = editor.normalScale[key].toFixed(2);
			}
		});

	})( 
		materialEditor, // editor,
		document.querySelector("input#material-vector-x-input"),  // vector_x,
		document.querySelector("input#material-vector-y-input"),  // vector_y,
		document.querySelector("select#material-vector-droplist") // vector_droplist,
	);


//	Colors.

	(function( editor,color_r,color_g,color_b,color_droplist ){

	//	var material; // important!
	//	You can add a watcher to get texture only when entity droplist changes.
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		material = getMaterialByEntityId( value );
	//	});

	//	color.

		watch( editor, "color", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if (material && material.color) 
				material.color[key] = Number(editor.color[key]);
		//	Display value.
			if ( color_droplist.value === "color" ) {
				if ( key === "r" ) color_r.value = (255*editor.color[key]).toFixed(0);
				if ( key === "g" ) color_g.value = (255*editor.color[key]).toFixed(0);
				if ( key === "b" ) color_b.value = (255*editor.color[key]).toFixed(0);
			}
		});

	//	emissive.

		watch( editor, "emissive", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if (material && material.emissive) 
				material.emissive[key] = Number(editor.emissive[key]);
		//	Display value.
			if ( color_droplist.value === "emissive" ) {
				if ( key === "r" ) color_r.value = (255*editor.emissive[key]).toFixed(0);
				if ( key === "g" ) color_g.value = (255*editor.emissive[key]).toFixed(0);
				if ( key === "b" ) color_b.value = (255*editor.emissive[key]).toFixed(0);
			}
		});

	//	specular.

		watch( editor, "specular", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if (material && material.specular) 
				material.specular[key] = Number(editor.specular[key]);
		//	Display value.
			if ( color_droplist.value === "specular" ) {
				if ( key === "r" ) color_r.value = (255*editor.specular[key]).toFixed(0);
				if ( key === "g" ) color_g.value = (255*editor.specular[key]).toFixed(0);
				if ( key === "b" ) color_b.value = (255*editor.specular[key]).toFixed(0);
			}
		});

	})( 
		materialEditor, // editor,
		document.querySelector("input#material-color-r-input"),  // color_r,
		document.querySelector("input#material-color-g-input"),  // color_g,
		document.querySelector("input#material-color-b-input"),  // color_b,
		document.querySelector("select#material-color-droplist") // color_droplist,
	);













//	needsUpdate_button.

	(function( needsUpdate_button ){

		needsUpdate_button.addEventListener( "click", function(){
			var material = getMaterialByEntityId();
			if ( material ) material.needsUpdate = true;
		});

	})( document.querySelector("div#material-needs-update") );

