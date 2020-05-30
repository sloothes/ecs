//	Entity Manager class.


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

/*

//	WARNING: his is not an Array; is an array-like object.

	function EntityManager(){

		Array.call( this );

	};


	EntityManager.prototype = Object.assign( Object.create(Array.prototype), {

		constructor: EntityManager,
	//	isArray: true, // this is not Array.

		move: function( entity, new_index ){

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

		},

		remove: function( _id ){

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

		},
		
		clear: function(){
			this.length = 0;
		},

	});

	const entities = new EntityManager();
	const removedEntities = new EntityManager();
*/
