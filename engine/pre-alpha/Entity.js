//	Entity class.

	function Entity(){

		this._id = Entity.prototype._count++;

	}

	Entity.prototype = {

		get length(){ return Object.keys(this).length - 1 },

	};

	Entity.prototype.constructor = Entity;
	Entity.prototype._count = 0;
	Entity.prototype.isEntity = true; // primative type.

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
