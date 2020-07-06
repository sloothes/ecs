// exit-edit-onmouse-events.js

	(function( editor,exit_button,undo_button,redo_button,color_r,color_g,color_b,vector_x,vector_y,text_input,value_input,map_droplist,key_droplist,color_droplist,vector_droplist,entity_droplist ){

		var interval;

		exit_button.addEventListener( "click", function(){
			clearTimeout( interval ); 
			interval = setTimeout( function exitFromEditMode(){

				editor.reset();

			//	clearUndoRedo();
				(function() {
					undo_button.undo.clear();
					redo_button.redo.clear();
				})();

			//	resetUIValues();
				(function() {
					color_r.value = "";
					color_g.value = "";
					color_b.value = "";
					vector_x.value = "";
					vector_y.value = "";
					text_input.value = "";
					value_input.value = "";
					map_droplist.value = "";
					key_droplist.value = "";
					color_droplist.value = "";
					vector_droplist.value = "";
					entity_droplist.value = "";
				})();

				debugMode && console.log("exit material edit mode.");

				return;

			}, 250);
		});

	})(
		materialEditor, // editor,
		document.querySelector("div#material-exit-mode"), // exit_button,
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button"), // redo_button,
		document.querySelector("input#material-color-r-input"), // color_r,
		document.querySelector("input#material-color-g-input"), // color_g,
		document.querySelector("input#material-color-b-input"), // color_b,
		document.querySelector("input#material-vector-x-input"), // vector_x,
		document.querySelector("input#material-vector-y-input"), // vector_y,
		document.querySelector("input#material-text-input"), // text_input,
		document.querySelector("input#material-value-input"), // value_input,
		document.querySelector("select#material-map-droplist"), // map_droplist,
		document.querySelector("select#material-keys-droplist"), // key_droplist,
		document.querySelector("select#material-color-droplist"), // color_droplist,
		document.querySelector("select#material-vector-droplist"), // vector_droplist,
		document.querySelector("select#material-entities-droplist") // entity_droplist
	);
