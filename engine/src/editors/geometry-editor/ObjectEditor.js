//	ObjectEditor.js

//	It is not really geometry editor but object3D 
//	or mesh editor. Could be called "ObjectEditor".

	function ObjectEditor(){
		var object = new THREE.Object3D();
		Object.setPrototypeOf( object, ObjectEditor.prototype );
		return object; // important!
	}

	ObjectEditor.prototype = Object.create(THREE.Object3D.prototype); // important!

	ObjectEditor.prototype.reset = function(){ 

		var editor = this;

		editor.copy( new THREE.Object3D() );
		editor.name = "scene editor";
	//	editor.isEditing = false; // edit mode off.
	//	undo.length = 0; redo.length = 0; // clear undo/redo.
	//	cancelAnimationFrame( editor.requestFrameID ); // cancel object update loop, important!

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

	const objectEditor = new ObjectEditor(); // object3D.
//	scene.add( ObjectEditor ); // important!












	//	Edit mode.
	//	editor.isEditing = !!object;
	//	object update loop.
	//	object && (function update(){
	//		if ( object && editor.isEditing ) {
	//			object.scale.copy( editor.scale );
	//			object.rotation.copy( editor.rotation );
	//			object.position.copy( editor.position );
	//			editor.requestFrameID = requestAnimationFrame(update);
	//			return; // important!
	//		} 
	//		cancelAnimationFrame( editor.requestFrameID ); // important!
	//	})();
	//	keep initial state.
	//	object && editor.isEditing && addToUndo();
	//	debugMode && console.log( "editor updated:", object );