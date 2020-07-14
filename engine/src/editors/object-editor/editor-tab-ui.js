//	editor-tab-ui.js

	TabUI.add( "Editor", "editor-tab" );
	TabUI.append("Editor");

	const entity_droplist = (function( tab ){

	//	Entities droplist.
	//	When option is selected, switches to EditMode.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.textContent = "Entities:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "editor-entities-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		(function(){
			var option = document.createElement("option");
			option.value = "";
			select.appendChild( option );
		})();

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.Editor.tab );

//	editor-viewer-ui.js

	(function( tab ){

	//	Editor viewer.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.style.cssText = "display:none;height:260px;border:none;text-align:center;";

		var canvas = document.createElement("canvas");
		canvas.width = 256; canvas.height = 256;
		canvas.id = "editor-viewer";
		canvas.style.cssText = "width:256px;height:256px;margin:auto;";

		row.appendChild( canvas );
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	undo-redo-ui.js

	(function( tab ){

	//	Undo/Redo button.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var redo = document.createElement("div");
		redo.id = "editor-redo-button";
		redo.textContent = "Redo";
		redo.style.cssText = "width:44%;float:left;height:40px;font-size:large;margin-right:15px;";
		redo.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		var undo = document.createElement("div");
		undo.id = "editor-undo-button";
		undo.textContent = "Undo";
		undo.style.cssText = "width:44%;float:right;height:40px;font-size:large;margin-right:15px;";
		undo.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( redo );
		row.appendChild( undo );
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	text-input-ui.js

	(function( tab ){

	//	Text input.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.style.cssText = "margin-right:20px;height:30px;";

		var input = document.createElement("input");
		input.type = "text";
		input.id = "editor-text-input";
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

	})( TabUI.Editor.tab );

//	key-droplist-ui.js

	(function( tab ){

	//	Key droplist.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.textContent = "key:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "editor-key-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = "";
		keys += "uuid,name,visible,castShadow,renderOrder,receiveShadow,frustumCulled,matrixAutoUpdate";

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

	})( TabUI.Editor.tab );

//	value-input-ui.js

	(function( tab ){

	//	Value input.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.textContent = "value:";
		row.style.cssText = "margin:10px 15px;height:30px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "editor-value-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "editor-value-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "editor-value-input";
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

	})( TabUI.Editor.tab );

//	vector-droplist-ui.js

	(function( tab ){

	//	Vector mode droplist.
	//	When option is selected, switches to EditMode.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.textContent = "select:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "editor-vector-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var modes = "position,rotation,scale,quaternion";
		modes.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	vector-x-ui.js

	(function( tab ){

	//	vector x.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.textContent = "axis x:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "editor-vector-x-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "editor-vector-x-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "editor-vector-x-input";
		input.setAttribute("placeholder", "x" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	vector-y-ui.js

	(function( tab ){

	//	vector y.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.textContent = "axis y:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "editor-vector-y-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "editor-vector-y-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "editor-vector-y-input";
		input.setAttribute("placeholder", "y" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	vector-z-ui.js

	(function( tab ){

	//	vector z.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.textContent = "axis z:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "editor-vector-z-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "editor-vector-z-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "editor-vector-z-input";
		input.setAttribute("placeholder", "z" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	vector-w-ui.js

	(function( tab ){

	//	vector w.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.textContent = "vect w:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "editor-vector-w-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "editor-vector-w-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "editor-vector-w-input";
		input.setAttribute("placeholder", "w" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	reset-vectors-ui.js

	(function( tab ){

	//	Reset vectors button.
	//	Resets vector mode values.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "editor-reset-button";
		button.textContent = "Reset Vectors";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	needs-update-ui.js

	(function( tab ){

	//	Matrix World Needs Update button.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "matrix-needs-update";
		button.textContent = "Matrix needs Update";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	exit-editor-ui.js

	(function( tab ){

	//	Exit edit mode button.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "editor-exit-mode";
		button.textContent = "Exit Edit Mode";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Editor.tab );
