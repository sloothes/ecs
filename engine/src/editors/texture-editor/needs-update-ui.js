//	needs-update-ui.js

	(function( tab,getTextureByEntityId ){

	//	NeedsUpdate texture button.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "texture-needs-update";
		button.textContent = "Texture needs Update";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		button.addEventListener( "click", function(){
			var texture = getTextureByEntityId( value ); // id.
			if ( texture && texture.image ) texture.needsUpdate = true;
		});

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Texture.tab, getTextureByEntityId );

