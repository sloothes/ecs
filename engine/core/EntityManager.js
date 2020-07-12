//	EntityManager.js

//	Entity Manager Class: inherits (extends) Array class.
//	sources: https://stackoverflow.com/questions/26700164/extending-array-with-es6-classes
//	https://stackoverflow.com/questions/11337849/ways-to-extend-array-object-in-javascript

	function EntityManager(){
		var array = new Array(0);
		Object.setPrototypeOf( array, EntityManager.prototype );
		return array; // important!
	};

	EntityManager.prototype = Object.create(Array.prototype);

	EntityManager.prototype.move = function( entity, new_index ){

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

	EntityManager.prototype.add = function(){
	//	params: {object:Object3D} or {object:entity} 

		if ( arguments.length < 1 ) return;

		var added_objs = [];
		var adding_ids = [];

	//	Get objects/ids.
		for ( var i in arguments ) {
			var param = arguments[i];
			if ( typeof param === "object" 
			&& (param.isObject3D || param.isEntity) 
			&& param.id !== undefined ) {
				added_objs.push( param );    // keep objects to create options;
				adding_ids.push( param.id ); // adding_ids.unshift( param.id );
			} else 
				continue;
		}

		if ( !adding_ids.length ) return;
	//	console.log( "adding_ids:", adding_ids );

		var length = adding_ids.length;
		for ( var j = 0; j < length; j++ ) {
			var _id = adding_ids[ j ];

		//	Find index.
			var index = this.findIndex(function( item ){
				return item.id === _id;
			});

			if ( index > -1 ) {
			//	Remove from added_objs.
				added_objs.splice(j, 1);
				continue; // important!
			}

		//	Add entity.
			this.push({id:_id});
		}

	//	Add options.

		(function(){

			try {

			//	global const "entity_droplist" is defined in geometry-tab-ui.js;
				var selector = "select#editor-entities-droplist";
				var entity_droplist = document.querySelector(selector);

				if ( !entity_droplist ) throw selector+" droplist not found!";

			//	Add options.
				while ( added_objs.length ) (function(object){
					var str =  "", dot = ".", col = ":";
					var type = "object";
					var name = object.name;
					if ( object.type ) type = object.type;
					var option = document.createElement("option");
					option.text = str+object.id+dot+type+col+name;
					option.value = object.id;
					entity_droplist.appendChild( option );
				})( added_objs.shift() );

			} catch(err){ console.error( err ); }

		})();

	};

	EntityManager.prototype.remove = function(){
	//	params: {number:entity.id} or {object:entity} 

		if ( arguments.length < 1 ) return;

	//	Get removed ids.
		var remove_ids = [];
		for ( var i in arguments ) {
			var param = arguments[i];
			if ( typeof param === "number" && param % 1 === 0 ) // integer. 
				remove_ids.unshift( param );    // remove_ids.push( param );
			else if ( typeof param === "object" 
			&& (param.isEntity || param.isObject3D) 
			&& param.id !== undefined )
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
				removedEntities.push( removed );
			}
		}

	//	Remove options.

		(function(){

			try {

			//	global const "entity_droplist" is defined in geometry-tab-ui.js;
				var selector = "select#editor-entities-droplist";
				var entity_droplist = document.querySelector(selector);

				if ( !entity_droplist ) throw selector+" droplist not found!";

			//	Remove options.
				while ( remove_ids.length ) (function(id){
					var selector = "option[value='" + String(id) + "']"; // console.log( selector );
					var option = entity_droplist.querySelector( selector ); // console.log(  option  );
					option && option.remove();
				})( remove_ids.shift() );

			} catch(err){ console.error( err ); }

		})();

	};

	EntityManager.prototype.getObjectById = function( value ){

		var id = parseInt( value );
		if ( isNaN( id ) ) return;

		return scene.getObjectById( id );

	};

	EntityManager.prototype.clear = function(){

		this.length = 0;

	};

//	Create entity managers.
	const entities = new EntityManager();
	const removedEntities = new EntityManager();


//	==========================================================================================  //


//	Entity.js

//	Entity Class.
//	Creates an entity object that accepts components (data).
//	An entity object does not passed as is in EntityManager.
//	In EntityManager passed only the id of the entity object.
//	In other words an entity is a plain object like Object3D.

	var entityId = 0;

	function Entity(){

		Object.defineProperty( this, "id", { value: entityId ++ } );

	}

	Entity.prototype = {

		isEntity: true,
		constructor: Entity,

		add(key, value){
			if ( !key ) throw "EntityAddComponentError: component key is not defined!";
			this[ key ] = object;
			return this;
		},

		remove(key){
			if (!key) throw "EntityRemoveComponentError: component key is not defined!";
			delete this[ key ];
			return this;
		},

		get length(){ return Object.keys(this).length - 1 },

	};


//	==========================================================================================  //
