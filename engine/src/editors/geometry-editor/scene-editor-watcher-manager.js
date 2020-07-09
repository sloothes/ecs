//	scene-editor-watcher-manager.js


//	Scene Editor Watcher Manager.
//	Watch each object/property individually.
//	Synchronize object3d with scene editor (brige).
//	KEEP IN MIND: watchers update only if the value has been changed.

	(function(editor,value_input,key_droplist,entity_droplist){

	//	var object; // important!
	//	Add a watcher to update object only when entity droplist changes.
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		object = getObjectByEntityId( value );
	//	});

	//	............................ add watchers here ............................  //

		watch( editor, "type", function( key, action, value ){
			var object = getObjectByEntityId(); if (!object) return;
		//	TODO.
			debugMode && console.log({ key:key,action:action,value:value });
		});

		watch( editor, "visible", function( key, action, value ){
			var object = getObjectByEntityId(); if (!object) return;
		//	TODO.
			debugMode && console.log({ key:key,action:action,value:value });
		});

	//	.................................. TODO ..................................  //

	})(
		sceneEditor, // editor,
		document.querySelector("input#geometry-value-input"),  // value_input,
		document.querySelector("select#geometry-key-droplist"), // key_droplist,
		document.querySelector("select#geometry-entities-droplist") // entity_droplist,
	);


	(function(editor,vector_x,vector_y,vector_z,vector_w,vector_droplist,entity_droplist){

		var object;

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

	//	Add a watcher to update object only when entity droplist changes.
		watch( entity_droplist, "onchange", function( property, event, value ){
			object = getObjectByEntityId( value );
		});

		watch( editor, "position", function( key, action, value ){
		//	var object = getObjectByEntityId();
		//	Update object ( value === editor.position[key] ).
			if ( object && object.position ) object.position[key] = Number(value);
		//	Display value.
			if ( vector_droplist.value === "position" ) {
				if ( key === "x" ) vector_x.value = value.toFixed(2);
				if ( key === "y" ) vector_y.value = value.toFixed(2);
				if ( key === "z" ) vector_z.value = value.toFixed(2);
			}
		});

		watch( editor, "rotation", function( key, action, value ){
		//	var object = getObjectByEntityId();
		//	Update object ( value === editor.rotation[key] ).
			if ( object && object.rotation ) object.rotation[key] = Number(value);		
		//	Display value.
			if ( vector_droplist.value === "rotation" ) {
				if ( key === "_x" ) vector_x.value = (RAD2DEG*value).toFixed(1);
				if ( key === "_y" ) vector_y.value = (RAD2DEG*value).toFixed(1);
				if ( key === "_z" ) vector_z.value = (RAD2DEG*value).toFixed(1);
			}
		});

		watch( editor, "scale", function( key, action, value ){
		//	var object = getObjectByEntityId();
		//	Update object ( value === editor.scale[key] ).
			if ( object && object.scale ) object.scale[key] = Number(value);		
		//	Display value.
			if ( vector_droplist.value === "scale" ) {
				if ( key === "x" ) vector_x.value = (100*value).toFixed(1);
				if ( key === "y" ) vector_y.value = (100*value).toFixed(1);
				if ( key === "z" ) vector_z.value = (100*value).toFixed(1);
				vector_w.value = (100*((editor.scale.x+editor.scale.y+editor.scale.z)/3)).toFixed(2);
			}
		});

		watch( editor, "quaternion", function( key, action, value ){
		//	var object = getObjectByEntityId();
		//	DO NOT MODIFY QUATERNION (value === editor.quaternion[key]).
		//	if ( object && object.quaternion ) 
		//		object.quaternion[key] = Number(editor.quaternion[key]);		
		//	Display value.
			if ( vector_droplist.value === "quaternion" ) {
				if ( key === "_x" ) vector_x.value = value.toFixed(3);
				if ( key === "_y" ) vector_y.value = value.toFixed(3);
				if ( key === "_z" ) vector_z.value = value.toFixed(3);
				if ( key === "_w" ) vector_w.value = value.toFixed(3);
			}
		});

	})(
		sceneEditor, // editor,
		document.querySelector("input#geometry-vector-x-input"),  // vector_x,
		document.querySelector("input#geometry-vector-y-input"),  // vector_y,
		document.querySelector("input#geometry-vector-z-input"),  // vector_z,
		document.querySelector("input#geometry-vector-w-input"),  // vector_w,
		document.querySelector("select#geometry-vector-droplist"), // vector_droplist,
		document.querySelector("select#geometry-entities-droplist") // entity_droplist,
	);
