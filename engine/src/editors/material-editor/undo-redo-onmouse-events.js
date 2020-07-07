// undo-redo-onmouse-events.js

	(function(editor,undo_button,redo_button,entity_droplist){

		undo_button.undo = new UndoArray(); // we attach undo array on undo_button.undo to parse in functions.
		redo_button.redo = new UndoArray(); // we attach redo array on redo_button.redo to parse in functions.

		var interval;

		function undo(){

			if ( !undo_button.undo.length ) return;

		//	Get undo json.
			var json = undo_button.undo.shift();

			if ( !json ) return;

		//	Move json to redo.
			redo_button.redo.unshift( json );

			clearTimeout( interval );
			interval = setTimeout( function(){
				try {

				//	Copy material state (undo).
					var loader = new THREE.MaterialLoader();
					var material = loader.parse( json );
					editor.copy( material ); // update.

				} catch(err){ debugMode && console.error(err); }

				debugMode && console.log( "undo:", undo_button.undo.length, "redo:", redo_button.redo.length );

			}, 250);

		}

		function redo(){

			if ( !redo_button.redo.length ) return;

		//	Get redo json.
			var json = redo_button.redo.shift();

			if ( !json ) return;

		//	Move json to undo.
			undo_button.undo.unshift( json );

			clearTimeout( interval );
			interval = setTimeout( function(){
				try {

				//	Copy material state (undo).
					var loader = new THREE.MaterialLoader();
					var material = loader.parse( json );
					editor.copy( material ); // update.

				} catch(err){ debugMode && console.error(err); }

				debugMode && console.log( "undo:", undo_button.undo.length, "redo:", redo_button.redo.length );

			}, 250);

		};

		undo_button.addEventListener( "click", function(){
		//	debugMode && console.log("undo:",undo_button.undo.length,"redo:",redo_button.redo.length);
			if ( entity_droplist.value === "" ) { 
			//	clearUndoRedo();
				undo_button.undo.clear();
				redo_button.redo.clear();
			}
			else undo_button.undo.length && undo(); // undo.
		});

		redo_button.addEventListener( "click", function(){
		//	debugMode && console.log("undo:",undo_button.undo.length,"redo:",redo_button.redo.length);
			if ( entity_droplist.value === "" ) { 
			//	clearUndoRedo();
				undo_button.undo.clear();
				redo_button.redo.clear();
			}
			else redo_button.redo.length && redo(); // redo.
		});

	})(
		materialEditor, // editor,
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button"), // redo_button,
		document.querySelector("select#material-entities-droplist") // entity_droplist
	);
