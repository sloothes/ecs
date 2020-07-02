//	replace-image-ui.js

	(function( tab ){

	//	Replace image button.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "replace-image-button";
		button.textContent = "Replace Texture Image";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		var input = document.createElement("input");
		input.type = "file";
		input.id = "image-file-input";
		input.style.cssText = "display:none;";
		button.appendChild( input );

		button.addEventListener( "click", function(){
			input.files.length = 0; input.click();
		});

	//	Add a watcher.
		watch( input, "onchange", function(property, event, value){
			debugMode && console.log({item:"input",event:event,"files":value});
		});

	//	Call watchers.
		input.addEventListener( "change", function(){
			callWatchers( this, "onchange", "change", this.files );
		});

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Texture.tab );
