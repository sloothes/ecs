//	Entity Class.

	function Entity(){

		this._id = Entity.prototype._count++;

	}

	Entity.prototype = {

		_count: 0,
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


//	EntityCollection: 

	function EntityCollection(){
		Entity.call( this );
	};

	EntityCollection.prototype.isEntityCollection: true;
	EntityCollection.prototype.constructor: EntityCollection;

//	EntityManager-like implementation (inherits from Entity class).

//	function EntityCollection(){
//		var entity = new Entity();
//		Object.setPrototypeOf( entity, EntityCollection.prototype );
//		return entity;
//	};

//	EntityCollection.prototype = Object.create(Entity.prototype); 
//	EntityCollection.prototype.isEntityCollection = true; 



//	Entity Manager class.

//	Entity Manager: inherits (extends) Array class.
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

	EntityManager.prototype.remove = function(){
	//	params: {number:entity._id} or {object:entity} 

		if ( arguments.length < 1 ) return;

	//	Get removed _ids.
		var remove_ids = [];
		for ( var i in arguments ) {
			var param = arguments[i];
			if ( typeof param === "number" ) 
				remove_ids.unshift( param );     // remove_ids.push( param );
			else if ( typeof param === "object" && param.isEntity )
				remove_ids.unshift( param._id ); // remove_ids.push( param._id );
			else continue;
		}

		if ( !remove_ids.length ) return;
		console.log( "remove_ids:", remove_ids );

		var length = remove_ids.length;
		for ( var j = 0; j < length; j++ ) {

			var _id = remove_ids[ j ];

			//	Find index.
			var index = this.findIndex(function( item ){
				return item._id === _id;
			});

			if ( index < 0 ) return; // important!

			var removedItems = this.splice(index, 1);
			//	debugMode && console.log( removedItems );

			while ( removedItems.length ){
				var removed = removedItems.shift();
				//	debugMode && console.log( removed );
				removedEntities.push( removed );
			}

		}
	};

	EntityManager.prototype.clear = function(){

		this.length = 0;

	};

	//	Create entities managers.

	const entities = new EntityManager();
	const removedEntities = new EntityManager();

