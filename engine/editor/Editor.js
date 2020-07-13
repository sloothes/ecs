//	Editor.js

//	Create a mesh object to hold, objectEditor, materialEditor, 
//	and textureEditor. Editor must not added to scene (updating 
//	errors) but you must always copy the matrix of the editing 
//	object. You save the state of the editor as json and you 
//	parse the json state with a THREE.ObjectLoader.

	function Editor(){
		var editor = new THREE.Mesh( new THREE.PlaneGeometry() );
		Object.setPrototypeOf( editor, Editor.prototype );
		return editor; // important!
	}

	Editor.prototype = Object.create(THREE.Mesh.prototype); // important!

	Editor.prototype.reset = function(){ 

		var editor = this;
		editor.copy( objectEditor );
		editor.name = "editor";
		return editor;

	};

	ObjectEditor.prototype.update = function( value ){ 

	//	Copies the values of the target object3D of
	//	scene. Does not updates the target object3D.
	//	dependences: entities {scene},
	//	param: a object3D id {string or number}.

		var editor = this;

	//	Reset editor.
		editor.reset();

	//	Update editor (copy).
		editor.copy( objectEditor );

	//	return this.
		return editor;

	};

	const editor = new Editor().reset();
//	Note: Editor is not been added in scene so doesn't 
//	update matrix for json. You must explicity copy the 
//	objectEditor matrix. DO NOT ADD THIS EDITOR TO SCENE.