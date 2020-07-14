//	material-tab-ui.js

	TabUI.add( "Material", "material-tab" );
	TabUI.append("Material");

	const material_droplist = (function( tab ){

	//	Materials droplist.
	//	When option is selected, switches to EditMode.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "Entities:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "material-entities-droplist";
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

	})( TabUI.Material.tab );

//	map-droplist-ui.js

	(function( tab ){

	//	Material map droplist.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "texture:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "material-map-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = ",";
		keys += "map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,"
		keys += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";

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

	})( TabUI.Material.tab );

//	undo-redo-ui.js

	(function( tab ){

	//	Undo/Redo button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var redo = document.createElement("div");
		redo.id = "material-redo-button";
		redo.textContent = "Redo";
		redo.style.cssText = "width:44%;float:left;height:40px;font-size:large;margin-right:15px;";
		redo.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		var undo = document.createElement("div");
		undo.id = "material-undo-button";
		undo.textContent = "Undo";
		undo.style.cssText = "width:44%;float:right;height:40px;font-size:large;margin-right:15px;";
		undo.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( redo );
		row.appendChild( undo );
		tab.appendChild( row );

	})( TabUI.Material.tab );

//	text-input-ui.js

	(function( tab ){

	//	Text input.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "margin-right:20px;height:30px;";

		var input = document.createElement("input");
		input.id = "material-text-input";
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

	})( TabUI.Material.tab );

//	key-droplist-ui.js

	(function( tab ){

	//	Keys mode droplist.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "key:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "material-keys-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = "";
		keys += "name,type,uuid,side,opacity,alphaTest,transparent,premultipliedAlpha,";
		keys += "fog,lights,visible,overdraw,dithering,precision,colorWrite,flatShading,vertexColors,";
		keys += "blending,blendSrc,blendDst,blendEquation,blendSrcAlpha,blendDstAlpha,blendEquationAlpha,";
		keys += "depthFunc,depthTest,depthWrite,shadowSide,clipShadows,clipIntersection,";
		keys += "polygonOffset,polygonOffsetUnits,polygonOffsetFactor,";
		keys += "metalness,roughness,bumpScale,reflectivity,";
		keys += "refractionRatio,displacementBias,displacementScale,normalMapType,";
		keys += "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,";
		keys += "wireframe,wireframeLinecap,wireframeLinejoin,wireframeLinewidth,";
		keys += "skinning,morphTargets,morphNormals,combine,shininess,";
		keys += "depthPacking,scale,gapSize,linecap,linejoin,linewidth,";
		keys += "dashSize,size,rotation,sizeAttenuation,needsUpdate";

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

	})( TabUI.Material.tab );

//	value-input-ui.js

	(function( tab ){

	//	Value input.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "value:";
		row.style.cssText = "margin:10px 15px;height:30px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "material-value-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "material-value-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "material-value-input";
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

	})( TabUI.Material.tab );

//	vector-droplist-ui.js

	(function( tab ){

	//	Vector mode droplist.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "vector:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "material-vector-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = "";
		keys += "normalScale";

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

	})( TabUI.Material.tab );

//	vector-x-ui.js

	(function( tab ){

	//	vector x.
	//	TODO: By holding key "shift" vectors x, y,
	//	increase/decrease together at same time.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "axis x:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "material-vector-x-decrease"; // "normal-scale-x-decrease"
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "material-vector-x-increase"; // "normal-scale-x-increase"
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "material-vector-x-input"; // "normal-scale-x-input"
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

	})( TabUI.Material.tab );

//	vector-y-ui.js

	(function( tab ){

	//	vector y.
	//	TODO: By holding key "shift" vectors x, y,
	//	increase/decrease together at same time.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "axis y:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "material-vector-y-decrease"; // "normal-scale-y-decrease"
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "material-vector-y-increase"; // "normal-scale-y-increase"
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "material-vector-y-input"; // "normal-scale-y-input"
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

	})( TabUI.Material.tab );

//	color-droplist-ui.js

	(function( tab ){

	//	Color mode droplist.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "color:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "material-color-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = "";
		keys += "color,emissive,specular";

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

	})( TabUI.Material.tab );

//	color-r-ui.js

	(function( tab ){

	//	color red (r).
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "red:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "material-color-r-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "material-color-r-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "material-color-r-input";
		input.setAttribute("placeholder", "r" );
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

	})( TabUI.Material.tab );

//	color-g-ui.js

	(function( tab ){

	//	color green (g).
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "green:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "material-color-g-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "material-color-g-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "material-color-g-input";
		input.setAttribute("placeholder", "g" );
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

	})( TabUI.Material.tab );

//	color-b-ui.js

	(function( tab ){

	//	color blue (b).
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "blue:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "material-color-b-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "material-color-b-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "material-color-b-input";
		input.setAttribute("placeholder", "b" );
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

	})( TabUI.Material.tab );

//	needs-update-ui.js

	(function( tab ){

	//	NeedsUpdate material button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "material-needs-update";
		button.textContent = "Material needs Update";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Material.tab );

//	exit-editor-ui.js

	(function( tab ){

	//	Exit edit mode button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "material-exit-mode";
		button.textContent = "Exit Edit Mode";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Material.tab );

//	===================================================================================================================  //

//	type-droplist-ui.js

	(function( tab ){

	//	Material Type droplist.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "type:";
		row.style.cssText = "height:40px;margin-top:40px;"

		var select = document.createElement("select");
		select.id = "material-type-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var types = "";
		types += "MeshBasicMaterial,MeshStandardMaterial,MeshLambertMaterial,MeshPhongMaterial,"
		types += "MeshDepthMaterial,MeshNormalMaterial,MeshToonMaterial,MeshPhysicalMaterial,PointsMaterial,"
		types += "LineBasicMaterial,LineDashedMaterial,RawShaderMaterial,ShaderMaterial,ShadowMaterial,SpriteMaterial";

		types.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

	//	Dont call watchers (is dummy droplist).
		select.addEventListener( "change", function(){
			this.blur(); // important!
		//	callWatchers(this, "onchange", "change", this.value ); // dummy droplist.
		});

		select.value = "MeshStandardMaterial";
		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Material.tab );

//	create-material-ui.js

	(function( tab ){

	//	Create material entity button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "create-material-button";
		button.textContent = "Create Material Entity";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Material.tab );

//	clone-material-ui.js

	(function( tab ){

	//	Clone material button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "clone-material-button";
		button.textContent = "Clone Material Entity";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Material.tab );

//	remove-material-ui.js

	(function( tab ){

	//	Remove material entity button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "remove-material-button";
		button.textContent = "Remove Material Entity";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Material.tab );
