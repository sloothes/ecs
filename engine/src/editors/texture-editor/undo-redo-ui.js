//	undo-redo-ui.js

	(function( tab ){

	//	Undo/Redo button.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var redo = document.createElement("div");
		redo.id = "texture-redo-button";
		redo.textContent = "Redo";
		redo.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		redo.style.cssText = "width:44%;float:left;height:40px;font-size:large;margin-right:15px;";

		var undo = document.createElement("div");
		undo.id = "texture-undo-button";
		undo.textContent = "Undo";
		undo.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		undo.style.cssText = "width:44%;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( redo );
		row.appendChild( undo );
		tab.appendChild( row );

	})( TabUI.Texture.tab );
