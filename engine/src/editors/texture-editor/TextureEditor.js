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

/*
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
*/

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


