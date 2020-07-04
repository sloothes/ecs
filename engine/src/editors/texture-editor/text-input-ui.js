//	text-input-ui.js

	(function( tab ){

	//	Text input.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "margin-right:20px;height:30px;";

		var input = document.createElement("input");
		input.type = "text";
		input.id = "texture-text-input";
		input.setAttribute("placeholder", "text input" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "width:-webkit-fill-available;color:#000;display:inline;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

	//	Add a watcher.
		watch(input, "onchange", function(property, event, value){
		//	debugMode && console.log({item:input,event:event,value:value});
		});

	//	Call watchers.
		input.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		row.appendChild(input);
		tab.appendChild( row );

	})( TabUI.Texture.tab );

