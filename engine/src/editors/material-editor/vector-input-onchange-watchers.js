//	vector-input-onchange-watchers.js

//	vector-x input.

	(function(editor,keyInputControls,vector_x,vector_droplist,entity_droplist,undo_button,redo_button){













	})(
		textureEditor, // editor,
		keyInputControls, // keyInputControls,
		document.querySelector("input#material-vector-x-input"), // vector_x,
		document.querySelector("select#material-vector-droplist"), // vector_droplist,
		document.querySelector("select#material-entities-droplist"), // entity_droplist.
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button")  // redo_button (only needed for the debug console.log).
	);
