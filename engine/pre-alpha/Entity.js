//	entities array manager.

	const entities = [];
	const removedEntities = [];

	entities.move = function( entity, new_index ){

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

	entities.remove = function( _id ){

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

	};

//	Entity Class.

	function Entity(){

		this._id = Entity.prototype._count++;

	}

	Entity.prototype = {

		get length(){ return Object.keys(this).length - 1 },

	};

	Entity.prototype._count = 0;
	Entity.prototype.isEntity = true;
	Entity.prototype.constructor = Entity;

	Entity.prototype.add = function(key, object){
		var err = "EntityAddComponentError: component key is not defined!";

		if ( !key ) throw err;

		this[ key ] = object;
		return this;
	};

	Entity.prototype.remove = function(key){
		var err = "EntityRemoveComponentError: component key is not defined!";

		if (!key) throw err;
	//	debugMode && console.log( "remove:", this[ key ] );

		delete this[ key ];
		return this;
	};


/*
		add( key, object ){
			if ( !key ) throw "EntityAddComponentError: component key is not defined!";
			this[ key ] = object;
			return this;
		},

		remove( key ){
			if ( !key ) throw "EntityRemoveComponentError: component key is not defined!";
			delete this[ key ];
			return this;
		},
*/
