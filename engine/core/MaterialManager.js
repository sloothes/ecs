//	MaterialManager.js

//	Material Manager Class: inherits (extends) Array class.
//	sources: https://stackoverflow.com/questions/26700164/extending-array-with-es6-classes.
//	https://stackoverflow.com/questions/11337849/ways-to-extend-array-object-in-javascript.

	function MaterialManager(){
		var array = new Array(0);
		Object.setPrototypeOf( array, MaterialManager.prototype );
		return array; // important!
	}

	MaterialManager.prototype = Object.create(Array.prototype);

	MaterialManager.prototype.move = function( entity, new_index ){

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

	MaterialManager.prototype.add = function(){
	//	params: {object:Material} 
	//	dependences: material_droplist {HTML select element}

		if ( arguments.length < 1 ) return;

		var materials = [];

	//	Get materials/ids.
		for ( var i in arguments ) {
			var param = arguments[i];
			if ( typeof param === "object" && param.isMaterial && param.id !== undefined )
				materials.push( param );  // meterial;
			else 
				continue;
		}

		if ( !materials.length ) return;
	//	console.log( "materials:", materials );

		var length = materials.length;
		for ( var j = 0; j < length; j++ ) {
			this.push( materials[j] );
		}

	//	Add options.

		(function(){

			try {

			//	global const "material_droplist" is defined in material-tab-ui.js;
				var selector = "select#material-entities-droplist";
				var material_droplist = document.querySelector(selector);

				if ( !material_droplist ) return;

			//	Add options.
				while ( materials.length ) (function( material ){
					var str =  "", dot = ".", col = ":", type = "";
				//	TODO: better naming.
				//	var type = "object";
					var id = String(material.id);
					var name = material.name || "material";
					switch ( material.type ) {
						case "MeshToonMaterial":
						case "MeshBasicMaterial":
						case "MeshPhongMaterial":
						case "MeshDepthMaterial":
						case "MeshNormalMaterial":
						case "MeshLambertMaterial":
						case "MeshStandardMaterial":
						case "MeshPhysicalMaterial":
							type = material.type.replace("Mesh","");
						break;
						case "LineBasicMaterial":
						case "LineDashedMaterial":
						case "RawShaderMaterial":
							type = material.type.replace("Material","");
						break;
						case "PointsMaterial":
						case "SpriteMaterial":
						case "ShaderMaterial":
						case "ShadowMaterial":
							type = material.type;
						break;
					}
					var option = document.createElement("option");
					option.text = str+id+dot+type+col+name+id;
					option.value = String(material.id);
					material_droplist.appendChild( option );
				})( materials.shift() );

			} catch(err){ console.warn( selector, "did not found!" ); }

		})();

	};

	MaterialManager.prototype.remove = function(){
	//	params: {number:entity.id} or {object:entity} 
	//	dependences: material_droplist {HTML select element}

		if ( arguments.length < 1 ) return;

	//	Get removed ids.
		var remove_ids = [];
		for ( var i in arguments ) {
			var param = arguments[i];
			if ( typeof param === "number" && param % 1 === 0 ) // integer. 
				remove_ids.unshift( param );    // remove_ids.push( param );
			else if ( typeof param === "object" && param.isMaterial && param.id !== undefined )
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
				removed_materials.push( removed );
			}
		}

	//	Remove options.

		(function(){

			try {

			//	global const "material_droplist" is defined in material-tab-ui.js;
				var selector = "select#material-entities-droplist";
				var material_droplist = document.querySelector(selector);

				if ( !material_droplist ) return;

			//	Remove options.
				while ( remove_ids.length ) (function( id ){
					var selector = "option[value='" + String(id) + "']"; // console.log( selector );
					var option = material_droplist.querySelector( selector ); // console.log(  option  );
					option && option.remove();
				})( remove_ids.shift() );

			} catch(err){ console.warn( selector, "did not found!" ); }

		})();

	};

	MaterialManager.prototype.getMaterialById = function( value ){

		var id = parseInt( value );
		if ( isNaN( id ) ) return;

		return this.find( function( material ){
			return material.id === id;
		});

	};

	MaterialManager.prototype.clear = function(){

		this.length = 0;

	};

//	Create material managers.

	const material_entities = new MaterialManager(); // material entities array, important!.
	const removed_materials = new MaterialManager(); // material entities array, important!.

//