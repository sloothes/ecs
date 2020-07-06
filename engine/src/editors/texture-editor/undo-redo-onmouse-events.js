// undo-redo-onmouse-events.js

	(function(editor,undo_button,redo_button,entity_droplist){

		undo_button.undo = new UndoArray(); // we attach undo array on undo_button.undo to parse in functions.
		redo_button.redo = new UndoArray(); // we attach redo array on redo_button.redo to parse in functions.

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