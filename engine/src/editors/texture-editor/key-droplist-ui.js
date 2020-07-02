//	key-droplist-ui.js

	(function( tab ){

	//	Key droplist.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.textContent = "key:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "texture-key-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = "";
		keys += "uuid,name,flipY,format,rotation,mapping,minFilter,magFilter,anisotropy,wrapS,wrapT";

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

	//	Add a watcher.
		watch(select, "onchange", function(property, event, value){
			debugMode && console.log({item:"droplist",event:event,"key":value});
		});

	//	Call watchers.
		select.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Texture.tab );
