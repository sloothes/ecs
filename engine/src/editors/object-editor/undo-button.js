//	undo-button.js

	(function(editor,undo_button,redo_button,entity_droplist){

		var interval;

		undo_button.undo = new UndoArray(); // we attach undo array on undo_button.undo to parse in functions.
		undo_button.redo = new UndoArray(); // we attach redo array on undo_button.redo to parse in functions.

		function undo(){

			if ( !undo_button.undo.length ) return;

		//	Get undo json.
			var json = undo_button.undo.shift();

			if ( !json ) return;

		//	Move json to redo.
			undo_button.redo.unshift( json );

			clearTimeout( interval );
			interval = setTimeout( function(){
				try {

				//	Parse editor state (undo).
					editor.parse( json ); // update.

				} catch(err){ debugMode && console.error(err); }

				debugMode && console.log( "undo:", undo_button.undo.length, "redo:", undo_button.redo.length );

			}, 250);

		}

		function redo(){

			if ( !undo_button.redo.length ) return;

		//	Get redo json.
			var json = undo_button.redo.shift();

			if ( !json ) return;

		//	Move json to undo.
			undo_button.undo.unshift( json );

			clearTimeout( interval );
			interval = setTimeout( function(){
				try {

				//	Parse editor state (redo).
					editor.parse( json ); // update.

				} catch(err){ debugMode && console.error(err); }

				debugMode && console.log( "undo:", undo_button.undo.length, "redo:", undo_button.redo.length );

			}, 250);

		};

	//	Add watcher (clear undo/redo arrays on change).
		watch(entity_droplist, "onchange", function(){
			undo_button.undo.clear();
			undo_button.redo.clear();
		});

		undo_button.addEventListener( "click", function(){
		//	debugMode && console.log("undo:",undo_button.undo.length,"redo:",undo_button.redo.length);
			if ( entity_droplist.value === "" ) { 
				undo_button.undo.clear();
				undo_button.redo.clear();
			}
			else undo_button.undo.length && undo(); // undo.
		});

		redo_button.addEventListener( "click", function(){
		//	debugMode && console.log("undo:",undo_button.undo.length,"redo:",undo_button.redo.length);
			if ( entity_droplist.value === "" ) { 
				undo_button.undo.clear();
				undo_button.redo.clear();
			}
			else undo_button.redo.length && redo(); // redo.
		});

	})(
		objectEditor, // editor,
		document.querySelector("div#editor-undo-button"), // undo_button,
		document.querySelector("div#editor-redo-button"), // redo_button,
		document.querySelector("select#editor-entities-droplist") // entity_droplist
	);
