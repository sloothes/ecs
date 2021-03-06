//	Material Manager Class.

//	Material Manager: inherits (extends) Array class.
//	sources: https://stackoverflow.com/questions/26700164/extending-array-with-es6-classes
//	https://stackoverflow.com/questions/11337849/ways-to-extend-array-object-in-javascript

	function MaterialManager(){
		var array = new Array(0);
		Object.setPrototypeOf( array, MaterialManager.prototype );
		return array; // important!
	};

	MaterialManager.prototype = Object.create(Array.prototype);
	MaterialManager.prototype.move = function( entity, new_index ){

		var old_index = this.findIndex(function( item ){
			return item.id === entity.id;
		});

		if ( old_index < 0 ) return; // important!
		if ( old_index == new_index ) return;

		(function( arr, old_index, new_index ){

			if (new_index >= arr.length) {
				var k = new_index - arr.length + 1;
				while (k--) {
					arr.push(undefined);
				}
			}

			arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

		})( this, old_index, new_index);

	};

	MaterialManager.prototype.add = function(){
	//	params: {object:Material} 

		if ( arguments.length < 1 ) return;

		var materials  = [];

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

	//	var material_droplist = document.getElementById("material-entities-droplist");
	//	global const "material_droplist" is defined in MaterialTab.js;
		if ( !material_droplist ) return;

	//	Add options.
		while ( materials.length ) (function( material ){
			var str =  "", dot = ".", col = ":";
			var type = "object";
			var name = material.name || "mtl"+material.id;
			if ( material.type ) type = material.type.replace("Material","");
			var option = document.createElement("option");
			option.text = str+material.id+dot+type+col+name;
			option.value = material.id;
			material_droplist.appendChild( option );
		})( materials.shift() );
	};

	MaterialManager.prototype.remove = function(){
	//	params: {number:entity.id} or {object:entity} 

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

	//	var material_droplist = document.getElementById("material-entities-droplist");
	//	global const "material_droplist" is defined in MaterialTab.js;
		if ( !material_droplist ) return;

	//	Remove options.
		while ( remove_ids.length ) (function( id ){
			var selector = "option[value='" + id.toString() + "']"; // console.log( selector );
			var option = material_droplist.querySelector( selector ); // console.log(  option  );
			option && option.remove();
		})( remove_ids.shift() );

	};

	MaterialManager.prototype.clear = function(){

		this.length = 0;

	};

//	Create material managers.

	const material_entities = new MaterialManager(); // material entities array, important!.
	const removed_materials = new MaterialManager(); // material entities array, important!.
