//	exit-edit-mode.js

	(function(editor,exit_button,entity_droplist){

		var interval;

		exit_button.addEventListener( "click", function(){
			clearTimeout(interval);
			interval = setTimeout(function(){
				callWatchers( entity_droplist, "onchange", "change", entity_droplist.value = "" ); // exit edit mode.
			}, 250);
		});

	})( objectEditor, // editor, 
		document.querySelector("div#editor-exit-mode"), // exit_button,
		document.querySelector("select#editor-entities-droplist") // entity_droplist.
	 ); 
