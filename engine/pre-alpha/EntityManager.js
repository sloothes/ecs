//	Entity Manager.

	const entities = [];
	const removedEntities = [];

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
	};

	EntityManager.prototype.removeComponents = function( entity, components ){

		if ( !components ) return;
		if ( !entity.length() ) return;
		if ( !components.length ) return;

		for (var i = 0; i < components.length; i++){
			entity.remove( components[i] );
		}
	};

	EntityManager.prototype.move = function( entity, new_index ){

		var old_index = entities.findIndex(function( item ){
			return item.id === entity.id;
		});

		if ( old_index < 0 ) return; // important!
		if ( old_index == new_index ) return;

		(function( entities, old_index, new_index ){

			if (new_index >= arr.length) {
				var k = new_index - arr.length + 1;
				while (k--) {
					arr.push(undefined);
				}
			}

			arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
		})();

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
