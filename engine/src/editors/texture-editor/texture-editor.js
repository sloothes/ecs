//	texture-editor.js

	const textureEditor = new TextureEditor();

/*
	const textureEditor = (function( entities,viewer ){

		const RAD2DEG = THREE.Math.RAD2DEG;
		const DEG2RAD = THREE.Math.DEG2RAD;

		const undo = new UndoArray(); debugMode && console.log( {"undo": undo} ); // we could attach undo array on undo_button.
		const redo = new UndoArray(); debugMode && console.log( {"redo": redo} ); // we could attach redo array on redo_button.

	//	droplists.

		const map_droplist    = document.querySelector("select#material-map-droplist");
		const key_droplist    = document.querySelector("select#texture-key-droplist");
		const vector_droplist = document.querySelector("select#texture-vector-droplist");
		const entity_droplist = document.querySelector("select#texture-entities-droplist");

	//	mouse inputs.

		const increase_v = document.querySelector("li#texture-value-increase");
		const increase_x = document.querySelector("li#texture-vector-x-increase");
		const increase_y = document.querySelector("li#texture-vector-y-increase");

		const decrease_v = document.querySelector("li#texture-value-decrease");
		const decrease_x = document.querySelector("li#texture-vector-x-decrease");
		const decrease_y = document.querySelector("li#texture-vector-y-decrease");

	//	keyboard inputs.

		const vector_x    = document.querySelector("input#texture-vector-x-input");
		const vector_y    = document.querySelector("input#texture-vector-y-input");
		const text_input  = document.querySelector("input#texture-text-input");
		const value_input = document.querySelector("input#texture-value-input");

	//	texture tab buttons.

		const exit_button = document.querySelector("div#texture-exit-mode");
		const redo_button = document.querySelector("div#texture-redo-button");
		const undo_button = document.querySelector("div#texture-undo-button");
		const create_button = document.querySelector("div#create-texture-button");
		const replace_button = document.querySelector("div#replace-image-button");
		const needsUpdate_button = document.querySelector("div#texture-needs-update");

	//	texture tab file inputs.

		const image_fileinput = document.querySelector("input#image-file-input");
		const texture_fileinput = document.querySelector("input#texture-file-input");

	//	texture editor.

		const editor = new TextureEditor();

	//	editor helpers.

		function addtoUndo(){
			var json = editor.toJSON();
			json && undo.unshift( json );
			return;
		}

		function clearUndoRedo(){
			undo.clear();
			redo.clear();
			return;
		}

		function resetUIValues(){
			vector_x.value = "";
			vector_y.value = "";
			text_input.value = "";
			value_input.value = "";
			key_droplist.value = "";
			vector_droplist.value = "";
			entity_droplist.value = "";
			return;
		}

	//	exit from edit mode.

		function exitFromEditMode(){
			editor.reset();
			resetUIValues();
			clearUndoRedo();
			viewer.reset();
			return;
		}

		return editor;

	})( texture_entities, textureViewer );
*/

//	============================ Undo/Redo/Exit buttons ============================  //

// undo-redo-onmouse-events.js

	(function(editor,undo_button,redo_button,entity_droplist){

		undo_button.undo = undo; // we attach undo array on undo_button.undo to parse in functions.
		redo_button.redo = redo; // we attach redo array on redo_button.redo to parse in functions.

		undo_button.addEventListener( "click", function(){
			debugMode && console.log("undo:",undo_button.undo.length,"redo:",redo_button.redo.length);
			if ( entity_droplist.value === "" ) { 
			//	clearUndoRedo();
				undo_button.undo.clear();
				redo_button.redo.clear();
			}
			else undo_button.undo.length && editor.undo(); // undo.
		});

		redo_button.addEventListener( "click", function(){
			debugMode && console.log("undo:",undo_button.undo.length,"redo:",redo_button.redo.length);
			if ( entity_droplist.value === "" ) { 
			//	clearUndoRedo();
				undo_button.undo.clear();
				redo_button.redo.clear();
			}
			else redo_button.redo.length && editor.redo(); // redo.
		});

	})(
		textureEditor, // editor,
		document.querySelector("div#texture-undo-button"), // undo_button,
		document.querySelector("div#texture-redo-button"),  // redo_button,
		document.querySelector("select#select#texture-entities-droplist") // entity_droplist
	);

// exit-editor-onmouse-events.js

	(function(editor,viewer,exit_button,undo_button,redo_button,text_input,value_input,vector_x,vector_y,key_droplist,vector_droplist,entity_droplist){

		var interval;

		exit_button.addEventListener( "click", function(){
			clearTimeout( interval ); 
			interval = setTimeout( function exitFromEditMode(){

				editor.reset();
				viewer.reset();

			//	clearUndoRedo();
				(function() {
					undo_button.undo.clear();
					redo_button.redo.clear();
				})();

			//	resetUIValues();
				(function() {
					vector_x.value = "";
					vector_y.value = "";
					text_input.value = "";
					value_input.value = "";
					key_droplist.value = "";
					vector_droplist.value = "";
					entity_droplist.value = "";
				})();

				return;

			}, 250);
		});

	})(
		textureEditor, // editor,
		textureViewer, // viewer,
		document.querySelector("div#texture-exit-mode"),   // exit_button,
		document.querySelector("div#texture-undo-button"), // undo_button,
		document.querySelector("div#texture-redo-button"),  // redo_button,
		document.querySelector("input#texture-text-input"), // text_input,
		document.querySelector("input#texture-value-input"), // value_input,
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("select#texture-key-droplist"), // key_droplist,
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#select#texture-entities-droplist") // entity_droplist
	);

