//	TexturesManager.js

//	Textures Manager Class: inherits (extends) Array class.
//	sources: https://stackoverflow.com/questions/26700164/extending-array-with-es6-classes.
//	https://stackoverflow.com/questions/11337849/ways-to-extend-array-object-in-javascript.

	function TexturesManager(){
		var array = new Array(0);
		Object.setPrototypeOf( array, TexturesManager.prototype );
		return array; // important!
	}

	TexturesManager.prototype = Object.create(Array.prototype);

	TexturesManager.prototype.move = function( entity, new_index ){

		var old_index = this.findIndex(function( item ){
			return item.id === entity.id;
		});

		if ( old_index < 0 ) return; // important!
		if ( old_index == new_index ) return;
		if (new_index >= this.length) {
			var k = new_index - this.length + 1;
			while (k--) {
				this.push(undefined);
			}
		}

		this.splice(new_index, 0, this.splice(old_index, 1)[0]);

	};

	TexturesManager.prototype.add = function(){
	//	params: {object:Texture} 
	//	dependences: texture_droplist {HTML select element}

		if ( arguments.length < 1 ) return;

		var textures = [];

	//	Get textures/ids.
		for ( var i in arguments ) {
			var param = arguments[i];
			if ( typeof param === "object" && param.isTexture && param.id !== undefined )
				textures.push( param );  // meterial;
			else 
				continue;
		}

		if ( !textures.length ) return;
	//	console.log( "textures:", textures );

		var length = textures.length;
		for ( var j = 0; j < length; j++ ) {
			this.push( textures[j] );
		}

	//	Add options.

		(function(){

			try {

			//	global const "texture_droplist" is defined in TextureTab.js;
				var selector = "select#texture-entities-droplist";
				var texture_droplist = document.querySelector(selector);

				if ( !texture_droplist ) throw selector+" droplist not found!";

			//	Add options.
				while ( textures.length ) (function( texture ){
					var str =  "", dot = ".", col = ":";
					var name = texture.name || "texture";
					var option = document.createElement("option");
					option.text = str+texture.id+dot+name+col+texture.id;
					option.value = texture.id;
					texture_droplist.appendChild( option );
				})( textures.shift() );

			} catch(err){ console.error( err ); }

		})();

	};

	TexturesManager.prototype.remove = function(){
	//	params: {number:entity.id} or {object:entity} 
	//	dependences: texture_droplist {HTML select element}

		if ( arguments.length < 1 ) return;

	//	Get removed ids.
		var remove_ids = [];
		for ( var i in arguments ) {
			var param = arguments[i];
			if ( typeof param === "number" && param % 1 === 0 ) // integer. 
				remove_ids.unshift( param );    // remove_ids.push( param );
			else if ( typeof param === "object" && param.isTexture && param.id !== undefined )
				remove_ids.unshift( param.id ); // remove_ids.push( param.id );
			else 
				continue;
		}

		if ( !remove_ids.length ) return;
	//	console.log( "remove_ids:", remove_ids );

		var length = remove_ids.length;
		for ( var j = 0; j < length; j++ ) {

			var _id = remove_ids[ j ];

		//	Find index.
			var index = this.findIndex(function( item ){
				return item.id === _id;
			});

			if ( index < 0 ) continue; // important!

			var removedItems = this.splice(index, 1);
		//	debugMode && console.log( removedItems );

			while ( removedItems.length ){
				var removed = removedItems.shift();
			//	debugMode && console.log( removed );
				removed_textures.push( removed );
			}
		}

	//	Remove options.

		(function(){

			try {

			//	global const "texture_droplist" is defined in TextureTab.js;
				var selector = "select#texture-entities-droplist";
				var texture_droplist = document.querySelector(selector);

				if ( !texture_droplist ) throw selector+" droplist not found!";

			//	Remove options.
				while ( remove_ids.length ) (function( id ){
					var selector = "option[value='" + String(id) + "']"; // console.log( selector );
					var option = texture_droplist.querySelector( selector ); // console.log(  option  );
					option && option.remove();
				})( remove_ids.shift() );

			} catch(err){ console.error( err ); }

		})();

	};

	TexturesManager.prototype.getTextureById = function( value ){

		var id = parseInt( value );
		if ( isNaN( id ) ) return;

		return this.find( function( texture ){
			return texture.id === id;
		});

	};

	TexturesManager.prototype.clear = function(){

		this.length = 0;

	};

//	Create texture managers.

	const textures_entities = new TexturesManager(); // texture entities array, important!.
	const removed_textures  = new TexturesManager(); // texture entities array, important!.

//