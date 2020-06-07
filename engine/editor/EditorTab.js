
//	Editor tab.

//	TabUI.append("Editor");
//	TabUI.Editor.role.classList.add("active");
//	TabUI.Editor.tab.classList.add("in","active");

	(function(){

	//	Entities droplist.
	//	When option is selected, switches to EditMode.

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.textContent = "Entities:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "entities-droplist";
		select.style.cssText = "width:190px;color:#000;float:right;"
			+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
			+ "font-size:20px;margin-left:10px;margin-right:15px;";

		(function(){
			var option = document.createElement("option");
			option.value = "";
			select.appendChild( option );
		})();

		row.appendChild( select );
		tab.appendChild( row );

	})();

	(function(){

	//	Vector mode droplist.
	//	When option is selected, switches to EditMode.

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.textContent = "select:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "vector-mode-droplist";
		select.style.cssText = "width:190px;color:#000;float:right;"
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

	})();

//	Vector controls.

	(function(){

	//	vector x.

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.textContent = "vector x:";
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

	})();

	(function(){

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.textContent = "vector y:";
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

	})();

	(function(){

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.textContent = "vector z:";
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

	})();

	(function(){

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.textContent = "vector w:";
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
		input.setAttribute("placeholder", "z" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
			+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})();

	(function(){

	//	Reset vectors button.
	//	Resets vector mode values.

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "reset-vectors-button";
		button.textContent = "Reset Vectors";
		button.style.cssText = "width:295px;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})();

	(function(){

	//	Geometries droplist (TODO).

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.textContent = "Geometry:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "editor-geometry-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
			+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
			+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var watchObj = {value:select.value};

		select.addEventListener("change", function(e){
			watchObj.value = select.value;
		});

		(function(){

			var geometries = "PlaneGeometry,BoxGeometry,CircleGeometry,ConeGeometry,CylinderGeometry,"
			+"DodecahedronGeometry,EdgesGeometry,ExtrudeGeometry,IcosahedronGeometry,LatheGeometry,"
			+"OctahedronGeometry,ParametricGeometry,PolyhedronGeometry,RingGeometry,ShapeGeometry,"
			+"SphereGeometry,TetrahedronGeometry,TextGeometry,TorusGeometry,TorusKnotGeometry,"
			+"TubeGeometry,WireframeGeometry";

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

	})();

	(function(){

	//	New plane geometry button.
	//	Creates a mesh plane 1x1 (m2),
	//	and switch to EditMode.

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "new-plane-geometry";
		button.textContent = "Create Plane Geometry";
		button.style.cssText = "width:295px;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})();

	(function(){

	//	New box geometry button.
	//	Creates a mesh box 1x1 (m3),
	//	and switch to EditMode.

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "new-box-geometry";
		button.textContent = "Create Box Geometry";
		button.style.cssText = "width:295px;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})();

	(function(){

	//	Add to world octree button.

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "add-world-octree";
		button.textContent = "Add to World Octree";
		button.style.cssText = "width:295px;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.addEventListener( "click", function(){

		});

		row.appendChild( button );
	//	tab.appendChild( row );

	})();

	(function(){

	//	Exit edit mode button.

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "exit-edit-mode";
		button.textContent = "Exit Edit Mode";
		button.style.cssText = "width:295px;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		button.addEventListener( "click", function(){
			var select = document.getElementById("entities-droplist");
			select.value = "";
			select.dispatchEvent(new Event("change")); // important!
		});

		row.appendChild( button );
		tab.appendChild( row );

	})();
