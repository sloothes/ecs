//	TextureEditor.js

	function TextureEditor(){
		var texture = new THREE.Texture();
		Object.setPrototypeOf( texture, TextureEditor.prototype );
		return texture; // important!
	}

	TextureEditor.prototype = Object.create(THREE.Texture.prototype); // important!

	TextureEditor.prototype.copy = function( source ){ 
		THREE.Texture.prototype.copy.call( this, source ); // important!
		return this;
	};

	TextureEditor.prototype.reset = function(){ 
		this.copy( new THREE.Texture() ); 
		this.uuid = THREE.Math.generateUUID();
	};

	TextureEditor.prototype.fromJSON = function( json ){
	//	param: a texture json {object}
	//	the missing TextureLoader.parse;

		var editor = this;

		for ( var key in json ) {
			switch ( key ){

				case "image":
					console.warn("case:",key,"TODO!"); // TODO!
				break;

				case "center":
				case "offset":
				case "repeat":
					editor[ key ].x = json[ key ][0];
					editor[ key ].y = json[ key ][1];
				break;

				case "wrap":
					editor.wrapS = json[ key ][0];
					editor.wrapT = json[ key ][1];
				break;

				default:
					editor[ key ] = json[ key ];
				break;
			}
		}

	};

	TextureEditor.prototype.undo = function(){

		var editor = this;

		if ( !undo.length ) return;

	//	Get undo json.
		var json = undo.shift();

		if ( !json ) return;

	//	Move json to redo.
		redo.unshift( json );

		clearTimeout( interval );
		interval = setTimeout( function(){

		//	Copy texture state (undo).
			editor.fromJSON( json ); // update.

			debugMode && console.log( "undo:", undo.length, "redo:", redo.length );

		}, 250);

	};

	TextureEditor.prototype.redo = function(){

		var editor = this;

		if ( !redo.length ) return;

	//	Get redo json.
		var json = redo.shift();

		if ( !json ) return;

	//	Move json to undo.
		undo.unshift( json );

		clearTimeout( interval );
		interval = setTimeout( function(){

		//	Copy texture state (redo).
			editor.fromJSON( json ); // update.

			debugMode && console.log( "undo:", undo.length, "redo:", redo.length );

		}, 250);
	};

	TextureEditor.prototype.update = function( value ){

	//	Copies the values of the target texture of textures
	//	entity manager. Does not updates the target texture.
	//	dependences: texture_entities {texture manager},
	//	param: a texture id {string or number},

		var editor = this;

	//	get target texture.
		var texture = getTextureByEntityId( value );
	//	debugMode && console.log( "target texture:", texture );

		if ( !texture ) {
			editor.reset();
			console.log("editor update:", false);
			return false; // important!
		}

	//	copy texture (update).
		editor.copy( texture );
		editor.name = texture.name;
		editor.uuid = texture.uuid;

	//	return true.
		console.log("editor update:", true);
		return true; // important!

	};


/*  ========================================================================================  */


//	textureEditor.js

	const textureEditor = (function( entities,viewer ){

		const RAD2DEG = THREE.Math.RAD2DEG;
		const DEG2RAD = THREE.Math.DEG2RAD;

		const undo = new UndoArray(); debugMode && console.log( {"undo": undo} );
		const redo = new UndoArray(); debugMode && console.log( {"redo": redo} );

	//	droplists.

		const map_droplist    = document.querySelector("select#material-map-droplist");
		const key_droplist    = document.querySelector("select#texture-key-droplist");
		const vector_droplist = document.querySelector("select#texture-vector-droplist");
		const entity_droplist = document.querySelector("select#texture-entities-droplist");

	//	mouse inputs.

		const increase_v = document.querySelector("li#texture-value-increase");
		const increase_x = document.querySelector("li#texture-vector-x-increase");
		const increase_y = document.querySelector("li#texture-vector-y-increase");

		const decrease_v = document.querySelector("li#texture-value-decrease");
		const decrease_x = document.querySelector("li#texture-vector-x-decrease");
		const decrease_y = document.querySelector("li#texture-vector-y-decrease");

	//	keyboard inputs.

		const vector_x    = document.querySelector("input#texture-vector-x-input");
		const vector_y    = document.querySelector("input#texture-vector-y-input");
		const text_input  = document.querySelector("input#texture-text-input");
		const value_input = document.querySelector("input#texture-value-input");

	//	texture tab buttons.

		const exit_button = document.querySelector("div#texture-exit-mode");
		const redo_button = document.querySelector("div#texture-redo-button");
		const undo_button = document.querySelector("div#texture-undo-button");
		const create_button = document.querySelector("div#create-texture-button");
		const replace_button = document.querySelector("div#replace-image-button");
		const needsUpdate_button = document.querySelector("div#texture-needs-update");

	//	texture tab file inputs.

		const image_fileinput = document.querySelector("input#image-file-input");
		const texture_fileinput = document.querySelector("input#texture-file-input");

	//	texture editor.

		const editor = new TextureEditor();

	//	editor helpers.

		function addtoUndo(){
			var json = editor.toJSON();
			json && undo.unshift( json );
			return;
		}

		function clearUndoRedo(){
			undo.clear();
			redo.clear();
			return;
		}

		function resetUIValues(){
			vector_x.value = "";
			vector_y.value = "";
			text_input.value = "";
			value_input.value = "";
			key_droplist.value = "";
			vector_droplist.value = "";
			entity_droplist.value = "";
			return;
		}

	//	exit from edit mode.

		function exitFromEditMode(){
			editor.reset();
			resetUIValues();
			clearUndoRedo();
			viewer.reset();
			return;
		}

		return editor;

	})( texture_entities, textureViewer );

/*  ========================================================================================  */






















/*  ========================================================================================  */

//	textureEditorWatchers.js

//	Texture Editor Watchers.
//	Watch each object/property individually.
//	Synchronize texture with texture editor (brige).
//	KEEP IN MIND: watchers update only if the value has been changed.

/*
	(function( editor,viewer,entity_droplist,getTextureByEntityId ){

		var texture; // imporant!

		watch( entity_droplist, "onchange", function( property, event, value ){
			texture = getTextureByEntityId( value ); // id.
		});

	//	.......................................................................

	//	Image. TODO!
		watch( editor.image, function( key, action, value, oldValue ){
			debugMode && console.log("editor:",{"key":key,"action":action,"value":value,"devNote":"TODO"});
		//	clearTimeout( interval );
		});

	})( 
		textureEditor, // editor,
		textureViewer, // viewer,
		document.querySelector("select#texture-entities-droplist"), // entity_droplist,
		getTextureByEntityId // function helper,
	);
*/

//	textureEditorVectorInputWatchers.js

	(function( editor,vector_x,vector_y,vector_droplist,getTextureByEntityId ){

	//	var texture; // imporant!
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		texture = getTextureByEntityId( value ); // id.
	//	});

		watch( editor.center, function( key, action, value ){
		//	debugMode && console.log( "editor.center:", key, action, value );
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture.center[ key ] = editor.center[ key ];
			if ( key === "x" ) textureViewer.center.position.x = -125 + round(250*editor.center[key], 2); // important! (corect)
			if ( key === "y" ) textureViewer.center.position.z =  125 - round(250*editor.center[key], 2); // important! (corect)
			if ( vector_droplist.value === "center" ) {
				if ( key === "x" ) vector_x.value = editor.center[key].toFixed(2); // display.
				if ( key === "y" ) vector_y.value = editor.center[key].toFixed(2); // display.
			}
		});

		watch( editor.offset, function( key, action, value ){
		//	debugMode && console.log( "editor.offset:", key, action, value );
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture.offset[ key ] = editor.offset[ key ];
			if ( vector_droplist.value === "offset" ) {
				if ( key === "x" ) vector_x.value = editor.offset[key].toFixed(2);
				if ( key === "y" ) vector_y.value = editor.offset[key].toFixed(2);
			}
		});

		watch( editor.repeat, function( key, action, value ){
		//	debugMode && console.log( "editor.repeat:", key, action, value );
			var texture = getTextureByEntityId( value ); // id.
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
		getTextureByEntityId // function helper,
	);


//	textureEditorTextInputStringWatchers.js

	(function( editor,input,droplist,getTextureByEntityId ){

	//	var texture; // imporant!
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		texture = getTextureByEntityId( value ); // id.
	//	});

		watch( editor, "name", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = editor[ key ];
			if ( droplist.value === key ) input.value = editor[ key ];
		});

		watch( editor, "uuid", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = editor[ key ];
			if ( droplist.value === key ) input.value = editor[ key ];
		});

	})( 
		textureEditor, // editor,
		document.querySelector("input#texture-text-input"), // text_input,
		document.querySelector("select#texture-key-droplist"), // key_droplist,
		getTextureByEntityId // function helper,
	);


//	textureEditorValueInputNumberWatchers.js

	(function( editor,viewer,input,droplist,getTextureByEntityId ){

	//	var texture; // imporant!
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		texture = getTextureByEntityId( value ); // id.
	//	});

		watch( editor, "anisotropy", function( key, action, value ){
		//	debugMode && console.log( "editor:", key, action, value );
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = editor[ key ];
			if ( droplist.value === key ) inpt.value = editor[ key ].toFixed(2);
		});

		watch( editor, "rotation", function( key, action, value ){
		//	debugMode && console.log( "editor:", key, action, value );
			const RAD2DEG = 57.29577951308232;
			const DEG2RAD = 0.017453292519943295;
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = editor[ key ];
			if ( droplist.value === key ) input.value = (RAD2DEG*editor[key]).toFixed(1); // string.
		});

	})( 
		textureEditor, // editor,
		textureViewer, // viewer,
		document.querySelector("input#texture-value-input"), // value_input,
		document.querySelector("select#texture-key-droplist"), // key_droplist,
		getTextureByEntityId // function helper,
	);


//	textureEditorValueInputConstantWatchers.js

	(function( editor,viewer,input,droplist,getTextureByEntityId ){

	//	var texture; // imporant!
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		texture = getTextureByEntityId( value ); // id.
	//	});

		watch( editor, "format", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = editor[ key ];
			if ( droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "mapping", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = editor[ key ];
			if ( droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "wrapS", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = editor[ key ];
			if ( droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "wrapT", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = editor[ key ];
			if ( droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "minFilter", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = editor[ key ];
			if ( droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "magFilter", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = editor[ key ];
			if ( droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "type", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = editor[ key ];
			if ( droplist.value === key ) input.value = editor[ key ];
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
		getTextureByEntityId // function helper,
	);


//	textureEditorValueInputBooleanWatchers.js

	(function( editor,viewer,input,droplist,getTextureByEntityId ){

	//	var texture; // imporant!
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		texture = getTextureByEntityId( value ); // id.
	//	});

		watch( editor, "flipY", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = Boolean(editor[key]);
			if ( droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "premultiplyAlpha", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = Boolean(editor[key]);
			if ( droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "matrixAutoUpdate", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = Boolean(editor[key]);
			if ( droplist.value === key ) input.value = editor[ key ];
			if ( viewer.material && viewer.material.map ) {
				viewer.material.needsUpdate = true;
				if (viewer.material.map.image !== undefined) 
					viewer.material.map.needsUpdate = true;
			}
		});

		watch( editor, "generateMipmaps", function( key, action, value ){
			var texture = getTextureByEntityId( value ); // id.
			if (texture) texture[ key ] = Boolean(editor[key]);
			if ( droplist.value === key ) input.value = editor[ key ];
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
		getTextureByEntityId // function helper,
	);
