//	texture-editor-watchers.js
//	TODO: rename to "texture-editor-manager.js"

//	Texture Editor Manager.
//	Watch each object/property individually.
//	Synchronize texture with texture editor (brige).
//	KEEP IN MIND: watchers update only if the value has been changed.


	(function( editor,viewer,entity_droplist ){

		var texture; // imporant!
	//	You can add a watcher to get texture only when entity droplist changes.
		watch( entity_droplist, "onchange", function( property, event, value ){
			texture = getTextureByEntityId( value ); // texture id.
			debugMode && console.log({ item:entity_droplist,entity:texture,"entity.id":value });
		});

	//	.......................... add watchers here! ........................  //

	//	Image. TODO!
	//	watch( editor.image, function( key, action, value, oldValue ){
	//		debugMode && console.log("editor:",{"key":key,"action":action,"value":value,"devNote":"TODO"});
	//	//	clearTimeout( interval );
	//	});

	})( 
		textureEditor, textureViewer, // editor, viewer,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	);


//	Texture needsUpdate button.

	(function( needsUpdate_button ){

		needsUpdate_button.addEventListener( "click", function(){
			var texture = getTextureByEntityId(); if (!texture) return;
			if ( texture && texture.image ) texture.needsUpdate = true;
		});

	})( document.querySelector("div#texture-needs-update") );



//	textureEditorVectorInputWatchers.js

	(function( editor,viewer,vector_x,vector_y,vector_droplist,entity_droplist ){

	//	var texture; // imporant!
	//	You can add a watcher to get texture only when entity droplist changes.
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		texture = getTextureByEntityId( value ); // id.
	//	});

		watch( editor.center, function( key, action, value ){
		//	debugMode && console.log( "editor.center:", key, action, value );
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture.center[ key ] = editor.center[ key ];
			if ( key === "x" ) viewer.center.position.x = -125 + round(250*editor.center[key], 2); // important! (corect)
			if ( key === "y" ) viewer.center.position.z =  125 - round(250*editor.center[key], 2); // important! (corect)
			if ( vector_droplist.value === "center" ) {
				if ( key === "x" ) vector_x.value = editor.center[key].toFixed(2); // display.
				if ( key === "y" ) vector_y.value = editor.center[key].toFixed(2); // display.
			}
		});

		watch( editor.offset, function( key, action, value ){
		//	debugMode && console.log( "editor.offset:", key, action, value );
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture.offset[ key ] = editor.offset[ key ];
			if ( vector_droplist.value === "offset" ) {
				if ( key === "x" ) vector_x.value = editor.offset[key].toFixed(2);
				if ( key === "y" ) vector_y.value = editor.offset[key].toFixed(2);
			}
		});

		watch( editor.repeat, function( key, action, value ){
		//	debugMode && console.log( "editor.repeat:", key, action, value );
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture.repeat[ key ] = editor.repeat[ key ];
			if ( vector_droplist.value === "repeat" ) {
				if ( key === "x" ) vector_x.value = editor.repeat[key].toFixed(2);
				if ( key === "y" ) vector_y.value = editor.repeat[key].toFixed(2);
			}
		});

	})( 
		textureEditor, // editor,
		textureViewer, // viewer,
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	);



//	textureEditorTextInputStringWatchers.js

	(function( editor,input,key_droplist,entity_droplist ){

	//	var texture; // imporant!
	//	You can add a watcher to get texture only when entity droplist changes.
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		texture = getTextureByEntityId( value ); // id.
	//	});

		watch( editor, "name", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = editor[ key ];
			if ( key_droplist.value === key ) input.value = editor[ key ];
		});

		watch( editor, "uuid", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = editor[ key ];
			if ( key_droplist.value === key ) input.value = editor[ key ];
		});

	})( 
		textureEditor, // editor,
		document.querySelector("input#texture-text-input"), // text_input,
		document.querySelector("select#texture-key-droplist"), // key_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	);



//	textureEditorValueInputNumberWatchers.js

	(function( editor,viewer,input,key_droplist,entity_droplist ){

	//	var texture; // imporant!
	//	You can add a watcher to get texture only when entity droplist changes.
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		texture = getTextureByEntityId( value ); // id.
	//	});

		watch( editor, "anisotropy", function( key, action, value ){
		//	debugMode && console.log( "editor:", key, action, value );
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = editor[ key ];
			if ( key_droplist.value === key ) input.value = editor[ key ].toFixed(2);
		});

		watch( editor, "rotation", function( key, action, value ){
		//	debugMode && console.log( "editor:", key, action, value );
			const RAD2DEG = 57.29577951308232;
			const DEG2RAD = 0.017453292519943295;
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = editor[ key ];
			if ( key_droplist.value === key ) input.value = (RAD2DEG*editor[key]).toFixed(1); // string.
		});

	})( 
		textureEditor, // editor,
		textureViewer, // viewer,
		document.querySelector("input#texture-value-input"), // value_input,
		document.querySelector("select#texture-key-droplist"), // key_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	);



//	textureEditorValueInputConstantWatchers.js

	(function( editor,viewer,input,key_droplist,entity_droplist ){

	//	var texture; // imporant!
	//	You can add a watcher to get texture only when entity droplist changes.
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		texture = getTextureByEntityId( value ); // id.
	//	});

		watch( editor, "format", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = editor[ key ];
			if ( key_droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "mapping", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = editor[ key ];
			if ( key_droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "wrapS", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = editor[ key ];
			if ( key_droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "wrapT", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = editor[ key ];
			if ( key_droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "minFilter", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = editor[ key ];
			if ( key_droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "magFilter", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = editor[ key ];
			if ( key_droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "type", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = editor[ key ];
			if ( key_droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

	})( 
		textureEditor, // editor,
		textureViewer, // viewer,
		document.querySelector("input#texture-value-input"), // value_input,
		document.querySelector("select#texture-key-droplist"), // key_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	);



//	textureEditorValueInputBooleanWatchers.js

	(function( editor,viewer,input,key_droplist,entity_droplist ){

	//	var texture; // imporant!
	//	You can add a watcher to get texture only when entity droplist changes.
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		texture = getTextureByEntityId( value ); // id.
	//	});

		watch( editor, "flipY", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = Boolean(editor[key]);
			if ( key_droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "premultiplyAlpha", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = Boolean(editor[key]);
			if ( key_droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "matrixAutoUpdate", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = Boolean(editor[key]);
			if ( key_droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "generateMipmaps", function( key, action, value ){
			var texture = getTextureByEntityId(); // id, entity_droplist.value.
			if (texture) texture[ key ] = Boolean(editor[key]);
			if ( key_droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

	})( 
		textureEditor, // editor,
		textureViewer, // viewer,
		document.querySelector("input#texture-value-input"), // value_input,
		document.querySelector("select#texture-key-droplist"), // key_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	);

