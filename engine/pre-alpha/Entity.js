//	Entity class.

	function Entity(){

		this._id = EntityManager.prototype._count++;

	}

	Entity.prototype.isEntity = true; // primative type.

	Entity.prototype.length = function(){
		return Object.keys(this).length - 1;
	};

	Entity.prototype.add = function(component, name){
		var err = "EntityAddComponentError: component name is not defined!";

		if ( !name ) name = component.constructor.name;
		if ( !name ) {
			console.error(err);
			return this;
		}
		this[ name ] = component;
		return this;
	};

	Entity.prototype.remove = function(component){
		var err = "EntityRemoveComponentError: component name is not defined!";

		var name;
		switch( typeof component ){

			case "string":
				name = component;
				break;

			case "object":
				name = component.constructor.name;
				break;

			case "function":
				name = component.prototype.constructor.name;
				break;

			case "number":
				break;
		}

		if (!name) throw err;
		//	debugMode && console.log("remove:", name);

		delete this[ name ];
		return this;
	};
