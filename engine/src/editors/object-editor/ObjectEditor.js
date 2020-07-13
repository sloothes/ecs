//	ObjectEditor.js

	function ObjectEditor(){
		var object = new THREE.Object3D();
		Object.setPrototypeOf( object, ObjectEditor.prototype );
		return object; // important!
	}

	ObjectEditor.prototype = Object.create(THREE.Object3D.prototype); // important!

	ObjectEditor.prototype.reset = function(){ 

		var editor = this;
		editor.copy( new THREE.Object3D() );
		editor.name = "object editor";

	};

	ObjectEditor.prototype.update = function( value ){ 

	//	Copies the values of the target object3D of
	//	scene. Does not updates the target object3D.
	//	dependences: entities {scene},
	//	param: a object3D id {string or number}.

		var editor = this;

	//	Reset editor.
		editor.reset();

	//	Get new object.
		var object = getObjectByEntityId( value ); 
		var isEditing = !!object; // boolean!

	//	Update editor (copy).
		object && editor.copy( object );

	//	return boolean.
		console.log("editor isEditing:", isEditing);
		return isEditing; // boolean, important!

	};

	const objectEditor = new ObjectEditor();
//	Note: When editor is not added in scene
//	doesn't update matrix/matrixWorld json.
//	When is added in scene updates matrixes.
	scene.add( objectEditor ); // important!
