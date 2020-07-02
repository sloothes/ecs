//	Texture tab.

	TabUI.add( "Texture", "texture-tab" );
	TabUI.append( "Texture" );

	const texture_droplist = (function( tab ){

	//	Textures droplist.
	//	When option is selected, switches to EditMode.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.textContent = "Entities:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "texture-entities-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		(function(){
			var option = document.createElement("option");
			option.value = "";
			select.appendChild( option );
		})();

	//	Add a watcher.
		watch(select, "onchange", function(property, event, value){
			debugMode && console.log({item:"texture",event:event,"item id":value});
		});

	//	Call watchers.
		select.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.Texture.tab );

