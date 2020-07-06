// exit-edit-onmouse-events.js

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
		document.querySelector("select#texture-entities-droplist") // entity_droplist
	);

