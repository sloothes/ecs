//	texture-tab-ui.js

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

	//	Call watchers.
		select.addEventListener( "change", function(){
			this.blur(); // important!
			callWatchers(this, "onchange", "change", this.value );
		});

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.Texture.tab );

//	texture-viewer-ui.js

	(function( tab ){

	//	Texture viewer.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "display:none;height:260px;border:none;text-align:center;";

		var canvas = document.createElement("canvas");
		canvas.width = 256; canvas.height = 256;
		canvas.id = "texture-viewer";
		canvas.style.cssText = "width:256px;height:256px;margin:auto;";

		row.appendChild( canvas );
		tab.appendChild( row );

	})( TabUI.Texture.tab );

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

	//	Call watchers.
		input.addEventListener( "change", function(){
			this.blur(); // important!
			callWatchers(this, "onchange", "change", this.value );
		});

	//	keyInputControls.
		input.addEventListener( "blur", enableKeyInputControls );
		input.addEventListener( "focus", disableKeyInputControls );

		row.appendChild(input);
		tab.appendChild( row );

	})( TabUI.Texture.tab );

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

	//	Call watchers.
		select.addEventListener( "change", function(){
			this.blur(); // important!
			callWatchers(this, "onchange", "change", this.value );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Texture.tab );

//	value-input-ui.js

	(function( tab ){

	//	Value input.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.textContent = "value:";
		row.style.cssText = "margin:10px 15px;height:30px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "texture-value-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "texture-value-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "texture-value-input";
		input.setAttribute("placeholder", "value" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

	//	Call watchers.
		input.addEventListener( "change", function(){
			this.blur(); // important!
			callWatchers(this, "onchange", "change", this.value );
		});

	//	keyInputControls.
		input.addEventListener( "blur", enableKeyInputControls );
		input.addEventListener( "focus", disableKeyInputControls );

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Texture.tab );

//	vector-droplist-ui.js

	(function( tab ){

	//	Vector mode droplist.
	//	When option is selected, switches to EditMode.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.textContent = "select:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "texture-vector-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = "";
		keys += "offset,repeat,center";

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

	//	Call watchers.
		select.addEventListener( "change", function(){
			this.blur(); // important!
			callWatchers(this, "onchange", "change", this.value );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Texture.tab );

//	vector-x-ui.js

	(function( tab ){

	//	vector x.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.textContent = "vect x:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "texture-vector-x-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "texture-vector-x-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "texture-vector-x-input";
		input.setAttribute("placeholder", "x" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
			+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

	//	Call watchers.
		input.addEventListener( "change", function(){
			this.blur(); // important!
			callWatchers(this, "onchange", "change", this.value );
		});

	//	keyInputControls.
		input.addEventListener( "blur", enableKeyInputControls );
		input.addEventListener( "focus", disableKeyInputControls );

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Texture.tab );

//	vector-y-ui.js

	(function( tab ){

	//	vector y.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.textContent = "vect y:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "texture-vector-y-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "texture-vector-y-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "texture-vector-y-input";
		input.setAttribute("placeholder", "y" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
			+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

	//	Call watchers.
		input.addEventListener( "change", function(){
			this.blur(); // important!
			callWatchers(this, "onchange", "change", this.value );
		});

	//	keyInputControls.
		input.addEventListener( "blur", enableKeyInputControls );
		input.addEventListener( "focus", disableKeyInputControls );

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Texture.tab );

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

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Texture.tab, getTextureByEntityId );

//	exit-editor-ui.js

	(function( tab ){

	//	Exit edit mode button.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "texture-exit-mode";
		button.textContent = "Exit Edit Mode";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Texture.tab );

//	create-texture-ui.js

	(function( tab ){

	//	Create texture button.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "create-texture-button";
		button.textContent = "Create Texture Entity";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		var input = document.createElement("input");
		input.type = "file";
		input.id = "texture-file-input";
		input.style.cssText = "display:none;";
		button.appendChild( input );

		button.addEventListener( "click", function(){
			input.files.length = 0; input.click();
		});

	//	Call watchers.
		input.addEventListener( "change", function(){
			callWatchers( this, "onchange", "change", this.files );
		});

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Texture.tab );

//	clone-texture-ui.js

	(function( tab ){

	//	Clone texture button.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "clone-texture-button";
		button.textContent = "Clone Texture Entity";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Texture.tab );

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

	//	Call watchers.
		input.addEventListener( "change", function(){
			callWatchers( this, "onchange", "change", this.files );
		});

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Texture.tab );

//	remove-texture-ui.js

	(function( tab ){

	//	Remove texture entity button.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "remove-texture-button";
		button.textContent = "Remove Texture Entity";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Texture.tab );
