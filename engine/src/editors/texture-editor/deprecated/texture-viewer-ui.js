//	texture-viewer-ui.js

	(function( tab ){

	//	Texture viewer.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:260px;border:none;text-align:center;";

		var canvas = document.createElement("canvas");
		canvas.width = 256; canvas.height = 256;
		canvas.id = "texture-viewer";
		canvas.style.cssText = "width:256px;height:256px;margin:auto;";

		row.appendChild( canvas );
		tab.appendChild( row );

	})( TabUI.Texture.tab );
