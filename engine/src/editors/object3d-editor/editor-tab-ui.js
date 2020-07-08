//	editor-tab-ui.js

	TabUI.add( "Editor", "editor-tab" );
	TabUI.append("Editor");

	const entity_droplist = (function( tab ){

	//	Entities droplist.
	//	When option is selected, switches to EditMode.

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.textContent = "Entities:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "entities-droplist";
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

//	vector-droplist-ui.js

	(function( tab ){

	//	Vector mode droplist.
	//	When option is selected, switches to EditMode.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.textContent = "select:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "vector-mode-droplist";
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
		row.textContent = "vect x:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "vector-x-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "vector-x-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "input-vector-x";
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
		row.textContent = "vect y:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "vector-y-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "vector-y-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "input-vector-y";
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

//	vector-zy-ui.js

	(function( tab ){

	//	vector z.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.textContent = "vect z:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "vector-z-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "vector-z-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "input-vector-z";
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
		prev.id = "vector-w-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "vector-w-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "input-vector-w";
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
		button.id = "reset-vectors-button";
		button.textContent = "Reset Vectors";
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
		button.id = "exit-edit-mode";
		button.textContent = "Exit Edit Mode";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	geometry-droplist-ui.js

	(function( tab ){

	//	Geometries droplist.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.textContent = "Geometry:";
		row.style.cssText = "height:40px;margin-top:40px;"

		var select = document.createElement("select");
		select.id = "editor-geometry-droplist";
		select.style.cssText = "width:150px;color:#000;float:right;"
			+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
			+ "font-size:20px;margin-left:10px;margin-right:15px;";

		(function(){

			var geometries = "PlaneGeometry,BoxGeometry,SphereGeometry,CylinderGeometry,"
			+"ConeGeometry,DodecahedronGeometry,IcosahedronGeometry,OctahedronGeometry,"
			+"TetrahedronGeometry,TorusGeometry,TorusKnotGeometry,CircleGeometry,RingGeometry";

			geometries.split(",").forEach(function( name ){
				var option = document.createElement("option");
				option.text = name;
				option.value = name;
				select.appendChild( option );
			});

		})();

		select.value = "PlaneGeometry";
		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	create-geometry-ui.js

	(function( tab ){

	//	Create geometry button.
	//	Creates a mesh geometry
	//	and switch to EditMode.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "create-geometry-button";
		button.textContent = "Create Geometry Entity";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	clone-geometry-ui.js

	(function( tab ){

	//	Clone geometry button.
	//	Clones selected mesh 
	//	with the same geometry
	//	and switch to EditMode.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "clone-geometry-button";
		button.textContent = "Clone Geometry Entity";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	remove-geometry-ui.js

	(function( tab ){

	//	Remove entity button.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "remove-geometry-button";
		button.textContent = "Remove Geometry Entity";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Editor.tab );

//	addto-octree-ui.js

	(function( tab ){

	//	Add to world octree button.
	//	var tab = TabUI.Editor.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "add-world-octree";
		button.textContent = "Add to World Octree";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Editor.tab );

