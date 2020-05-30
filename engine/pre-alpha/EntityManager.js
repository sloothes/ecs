//	Entity Manager class.

//	Entity Manager: inherits (extends) Array class.
//	sources: https://stackoverflow.com/questions/26700164/extending-array-with-es6-classes
//	https://stackoverflow.com/questions/11337849/ways-to-extend-array-object-in-javascript

	function EntityManager(){
		var array = new Array(0);
		Object.setPrototypeOf( array, EntityManager.prototype ); // important!
		return array; // important!
	};

	EntityManager.prototype = Object.create(Array.prototype); // important!

//	DevNote: EntityManager returns an Array.
//	EntityManager now inherits an Array constructor that has the Array methods.
//	In my point of view, creates a function (that's create an local array),
//	sets the prototype to EntityManager's function prototype, and returns the
//	local array. (It doesn't use "this" keyword, so is it simple function?
//	...or because it doen't return primative type, is it a class function? ).
//	Then inside EntityManager.prototype creates an Array prototype. Now,
//	EntityManager.prototype doesn't have a constructor and inherits the 
//	constructor from the EntityManager.prototype.prototype that is Array
//	constructor. For this Array.isArray(EntityManager.prototype) is false.
 
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
				remove_ids.push( param );
			else if ( typeof param === "object" && param.isEntity )
				remove_ids.push( param._id );
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


//	========================================================================================  //

/*
//	const entities = [];
//	const removedEntities = [];

	function EntityManager(){};

	EntityManager.prototype._count = 0;
	EntityManager.prototype.isEntityManager = true;

	EntityManager.prototype.create = function(){
		return new Entity();
	};

	EntityManager.prototype.clear = function(){
		removedEntities.length = 0;
	};

	EntityManager.prototype.push = function( entity ){
		entities.push( entity );
	};

	EntityManager.prototype.unshift = function( entity ){
		entities.unshift( entity );
	};

	EntityManager.prototype.addComponents = function( entity, components ){

		if ( !components ) return;
		if ( !components.length ) return;

		for (var i = 0; i < components.length; i++){
			entity.add( components[i] );
		}

		return entity;
	};

	EntityManager.prototype.removeComponents = function( entity, components ){

		if ( !components ) return;
		if ( !entity.length() ) return;
		if ( !components.length ) return;

		for (var i = 0; i < components.length; i++){
			entity.remove( components[i] );
		}

		return entity;
	};

	EntityManager.prototype.move = function( entity, new_index ){

		var old_index = entities.findIndex(function( item ){
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

		})( entities, old_index, new_index );

	};

	EntityManager.prototype.remove = function( _id ){

		var index = entities.findIndex(function( item ){
			return item._id === _id;
		});

		if ( index < 0 ) return; // important!

		var removedItems = entities.splice(index, 1);
		//	debugMode && console.log( removedItems );

		while ( removedItems.length ){
			var removed = removedItems.shift();
		//	debugMode && console.log( removed );
			removedEntities.push( removed );
		}

	};
*/
