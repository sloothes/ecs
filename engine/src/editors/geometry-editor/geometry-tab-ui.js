//	geometry-tab-ui.js

	TabUI.add( "Geometry", "geometry-tab" );
	TabUI.append("Geometry");

/*
	const entity_droplist = (function( tab ){

	//	Entities droplist.
	//	When option is selected, switches to EditMode.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "Entities:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "geometry-entities-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
			+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
			+ "font-size:20px;margin-left:10px;margin-right:15px;";

		(function(){
			var option = document.createElement("option");
			option.value = "";
			select.appendChild( option );
		})();

	//	watch(select, "onchange", function(property,event,value){;}); // debug!

	//	Call watchers.
		select.addEventListener( "change", function(){
			this.blur(); callWatchers(this, "onchange", "change", this.value ); // important!
		});

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.Geometry.tab );

//	undo-redo-ui.js

	(function( tab ){

	//	Undo/Redo button.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var redo = document.createElement("div");
		redo.id = "geometry-redo-button";
		redo.textContent = "Redo";
		redo.style.cssText = "width:44%;float:left;height:40px;font-size:large;margin-right:15px;";
		redo.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		var undo = document.createElement("div");
		undo.id = "geometry-undo-button";
		undo.textContent = "Undo";
		undo.style.cssText = "width:44%;float:right;height:40px;font-size:large;margin-right:15px;";
		undo.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( redo );
		row.appendChild( undo );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	vector-droplist-ui.js

	(function( tab ){

	//	Vector mode droplist.
	//	When option is selected, switches to EditMode.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "select:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "geometry-vector-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
			+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
			+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var modes = "position,rotation,scale,quaternion,translation";
		modes.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

	//	watch(select, "onchange", function(property,event,value){;}); // debug!

	//	Call watchers.
		select.addEventListener( "change", function(){
			this.blur(); callWatchers(this, "onchange", "change", this.value ); // important!
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	vector-x-ui.js

	(function( tab ){

	//	vector x.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "vect x:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "geometry-vector-x-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "geometry-vector-x-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "geometry-vector-x-input";
		input.setAttribute("placeholder", "x" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
			+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

	//	watch(input, "onchange", function(property,event,value){;}); // debug!

	//	Call watchers.
		input.addEventListener( "change", function(){
			this.blur(); callWatchers(this, "onchange", "change", this.value ); // important!
		});

	//	keyInputControls.
		input.addEventListener( "blur", enableKeyInputControls );
		input.addEventListener( "focus", disableKeyInputControls );

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	vector-y-ui.js

	(function( tab ){

	//	vector y.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "vect y:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "geometry-vector-y-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "geometry-vector-y-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "geometry-vector-y-input";
		input.setAttribute("placeholder", "y" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
			+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

	//	watch(input, "onchange", function(property,event,value){;}); // debug!

	//	Call watchers.
		input.addEventListener( "change", function(){
			this.blur(); callWatchers(this, "onchange", "change", this.value ); // important!
		});

	//	keyInputControls.
		input.addEventListener( "blur", enableKeyInputControls );
		input.addEventListener( "focus", disableKeyInputControls );

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	vector-z-ui.js

	(function( tab ){

	//	vector z.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "vect z:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "geometry-vector-z-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "geometry-vector-z-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "geometry-vector-z-input";
		input.setAttribute("placeholder", "z" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
			+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

	//	watch(input, "onchange", function(property,event,value){;}); // debug!

	//	Call watchers.
		input.addEventListener( "change", function(){
			this.blur(); callWatchers(this, "onchange", "change", this.value ); // important!
		});

	//	keyInputControls.
		input.addEventListener( "blur", enableKeyInputControls );
		input.addEventListener( "focus", disableKeyInputControls );

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	vector-w-ui.js

	(function( tab ){

	//	vector w.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "vect w:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "geometry-vector-w-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "geometry-vector-w-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "geometry-vector-w-input";
		input.setAttribute("placeholder", "w" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
			+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

	//	watch(input, "onchange", function(property,event,value){;}); // debug!

	//	Call watchers.
		input.addEventListener( "change", function(){
			this.blur(); callWatchers(this, "onchange", "change", this.value ); // important!
		});

	//	keyInputControls.
		input.addEventListener( "blur", enableKeyInputControls );
		input.addEventListener( "focus", disableKeyInputControls );

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	reset-vectors-ui.js

	(function( tab ){

	//	Reset vectors button.
	//	Resets vector mode values.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "geometry-reset-button";
		button.textContent = "Reset Vectors";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	exit-editor-ui.js

	(function( tab ){

	//	Exit edit mode button.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "geometry-exit-mode";
		button.textContent = "Exit Edit Mode";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );
*/

//	geometry-droplist-ui.js

	(function( tab ){

	//	Geometries droplist.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "Geometry:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "geometry-type-droplist"; // renamed from "editor-geometry-droplist".
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

	//	Dont call watchers (dummy droplist).
		select.addEventListener( "change", function(){ this.blur(); }); // important!

		select.value = "BoxGeometry";
		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	create-geometry-ui.js

	(function( tab ){

	//	Create geometry button.
	//	Creates a mesh geometry
	//	and switch to EditMode.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "create-geometry-button";
		button.textContent = "Create Geometry Entity";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	clone-geometry-ui.js

	(function( tab ){

	//	Clone geometry button.
	//	Clones selected mesh 
	//	with the same geometry
	//	and switch to EditMode.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "clone-geometry-button";
		button.textContent = "Clone Geometry Entity";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	remove-geometry-ui.js

	(function( tab ){

	//	Remove entity button.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "remove-geometry-button";
		button.textContent = "Remove Geometry Entity";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

/*
//	octree-geometry-ui.js

	(function( tab ){

	//	Add to world octree button.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "octree-geometry-button";
		button.textContent = "Add to MeshWorld";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

	(function( tab ){

	//	Remove from world octree button.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "remove-octree-button";
		button.textContent = "Remove from MeshWorld";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );
*/

//	octree-geometry-ui.js

	(function( tab ){

	//	Add to world octree button.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "octree-add-button";
		button.textContent = "Add to MeshWorld";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

	(function( tab ){

	//	Remove from world octree button.
	//	var tab = TabUI.MeshWorld.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "octree-remove-button";
		button.textContent = "Remove from MeshWorld";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

