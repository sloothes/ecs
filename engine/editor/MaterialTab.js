
//	Material Tab.

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

	//	Add a watcher.
		watch(select, "onchange", function(property, event, value){
			debugMode && console.log({item:"material",event:event,"item id":value});
		});

	//	Call watchers.
		select.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.Material.tab );

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

	//	Add a watcher.
		watch(select, "onchange", function(property, event, value){
			debugMode && console.log({item:"droplist",event:event,"map":value});
		});

	//	Call watchers.
		select.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Material.tab );

	(function( tab ){

	//	Import map texture button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "display:none;height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "material-map-import-button";
		button.textContent = "Import Texture";
		button.style.cssText = "width:295px;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		var input = document.createElement("input");
		input.type = "file";
		input.id = "material-map-file-input";
		input.style.cssText = "display:none;";
		button.appendChild( input );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Material.tab );

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

	//	Add a watcher.
		watch(input, "onchange", function(property, event, value){
			debugMode && console.log({item:"text input",event:event,"value":value});
		});

	//	Call watchers.
		input.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		row.appendChild(input);
		tab.appendChild( row );

	})( TabUI.Material.tab );

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

	})( TabUI.Material.tab );

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

	//	Add a watcher.
		watch(input, "onchange", function(property, event, value){
			debugMode && console.log({item:"value input",event:event,"value":value});
		});

	//	Call watchers.
		input.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Material.tab );

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

	//	Add a watcher.
		watch(select, "onchange", function(property, event, value){
			debugMode && console.log({item:"droplist",event:event,"vector":value});
		});

	//	Call watchers.
		select.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Material.tab );

	(function( tab ){

	//	vector x.
	//	TODO: By holding key "shift" vectors x, y,
	//	increase/decrease together at same time.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "vect x:";
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

	//	Add a watcher.
		watch(input, "onchange", function(property, event, value){
			debugMode && console.log({item:"vector input",event:event,"x":value});
		});

	//	Call watchers.
		input.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Material.tab );

	(function( tab ){

	//	vector y.
	//	TODO: By holding key "shift" vectors x, y,
	//	increase/decrease together at same time.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "vect y:";
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

	//	Add a watcher.
		watch(input, "onchange", function(property, event, value){
			debugMode && console.log({item:"vector input",event:event,"y":value});
		});

	//	Call watchers.
		input.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Material.tab );

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

	//	Add a watcher.
		watch(select, "onchange", function(property, event, value){
			debugMode && console.log({item:"droplist",event:event,"color":value});
		});

	//	Call watchers.
		select.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Material.tab );

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

	//	Add a watcher.
		watch(input, "onchange", function(property, event, value){
			debugMode && console.log({item:"color input",event:event,"red":value});
		});

	//	Call watchers.
		input.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Material.tab );

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

	//	Add a watcher.
		watch(input, "onchange", function(property, event, value){
			debugMode && console.log({item:"color input",event:event,"green":value});
		});

	//	Call watchers.
		input.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Material.tab );

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

	//	Add a watcher.
		watch(input, "onchange", function(property, event, value){
			debugMode && console.log({item:"color input",event:event,"blue":value});
		});

	//	Call watchers.
		input.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Material.tab );

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

	(function( tab ){

	//	Clone material button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "display:none;height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "material-clone-button";
		button.textContent = "Clone Material";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Material.tab );

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

	(function( tab ){

	//	Material Type droplist.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "Material:";
		row.style.cssText = "display:none;height:40px;margin-top:40px;"

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

	//	Add a watcher.
		watch(select, "onchange", function(property, event, value){
			debugMode && console.log({item:"droplist",event:event,"type":value});
		});

	//	Call watchers.
		select.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

		select.value = "MeshStandardMaterial";
		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Material.tab );

	(function( tab ){

	//	Create material entity button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "display:none;height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "create-material-button";
		button.textContent = "Create Material Entity";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Material.tab );

	(function( tab ){

	//	Clone material button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "display:none;height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "clone-material-button";
		button.textContent = "Clone Material Entity";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Material.tab );

	(function( tab ){

	//	Remove material entity button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "display:none;height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "remove-material-button";
		button.textContent = "Remove Material Entity";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Material.tab );

/*
	(function(){

		var interval;

		const entity_droplist = document.getElementById("material-entities-droplist");
		const material_droplist = document.getElementById("material-type-droplist");
		const create_material_button = document.getElementById("create-material-button");
		const clone_material_button = document.getElementById("clone-material-button");
		const remove_material_button = document.getElementById("remove-material-button");

	//	const entitySelect  = { value:entity_droplist.value };   // string.
	//	const materialType  = { value:material_droplist.value }; // string.

		function getMaterialByEntityId( value ){
			var id = parseInt( value );
			return material_entities.find( function( material ){
				return material.id === id;
			});
		}

		create_material_button.addEventListener( "click", function(){
			clearTimeout( interval );
			interval = setTimeout(function(){

			//	Get type.
				var type = material_droplist.value;
				if ( type === "" || type === undefined ) return;

			//	Init material properties based on material type.
				switch (type) {
				//	case "PointsMaterial":
				//	case "SpriteMaterial":
				//	case "ShaderMaterial":
				//	case "ShadowMaterial":
				//	case "MeshToonMaterial":
				//	case "MeshBasicMaterial":
				//	case "MeshPhongMaterial":
				//	case "MeshDepthMaterial":
				//	case "MeshNormalMaterial":
				//	case "MeshLambertMaterial":
				//	case "MeshStandardMaterial":
				//	case "MeshPhysicalMaterial":
				//	case "RawShaderMaterial":
				//	case "LineBasicMaterial":
				//	case "LineDashedMaterial":
				//	break;
				}

			//	Create.
				var material = new THREE[ type ]();
				if ( material === undefined ) return;
			//	Name it.
				material.name = "mtl"+material.id;
			//	Add entity.
				material_entities.add( material );

			//	Enter edit mode.
				entity_droplist.value = material.id.toString();
				entity_droplist.dispatchEvent(new Event("change")); // important!

			}, 250);
		});

		clone_material_button.addEventListener( "click", function(){
			clearTimeout( interval );
			interval = setTimeout(function(){

				var id = parseInt( entitySelect.value );
				if ( id === NaN || id === undefined ) return;

				//	Get source.
				var source = getMaterialByEntityId( id );
				if ( !(source && source.isMaterial) ) return;

				//	Clone source.
				if ( source && source.isMaterial ) {
					//	clone.
					var material = material.clone();
					//	rename.
					material.name = source.name.replace(/:clone/g,"") + ":clone"; // TODO: better renameing.
					//	add entity.
					material_entities.add( material );
					//	update entity select value (switch editor target).
					entity_droplist.value = mesh.id.toString();
					entity_droplist.dispatchEvent(new Event("change")); // important!
				}

			}, 250);
		});

		remove_material_button.addEventListener( "click", function(){
			clearTimeout( interval );
			interval = setTimeout(function(){

				var id = parseInt( entity_droplist.value );
				if ( id === NaN || id === undefined ) return;

			//	Remove material.
				material_entities.remove( id );

			}, 250);
		});

	})();
*/

//	===================================================================================================================  //

//	Material Manager Class.

//	Material Manager: inherits (extends) Array class.
//	sources: https://stackoverflow.com/questions/26700164/extending-array-with-es6-classes
//	https://stackoverflow.com/questions/11337849/ways-to-extend-array-object-in-javascript

	function MaterialManager(){
		var array = new Array(0);
		Object.setPrototypeOf( array, MaterialManager.prototype );
		return array; // important!
	};

	MaterialManager.prototype = Object.create(Array.prototype);
	MaterialManager.prototype.move = function( entity, new_index ){

		var old_index = this.findIndex(function( item ){
			return item.id === entity.id;
		});

		if ( old_index < 0 ) return; // important!
		if ( old_index == new_index ) return;

		(function( arr, old_index, new_index ){

			if (new_index >= arr.length) {
				var k = new_index - arr.length + 1;
				while (k--) {
					arr.push(undefined);
				}
			}

			arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

		})( this, old_index, new_index);

	};

	MaterialManager.prototype.add = function(){
	//	params: {object:Material} 

		if ( arguments.length < 1 ) return;

		var materials  = [];

	//	Get materials/ids.
		for ( var i in arguments ) {
			var param = arguments[i];
			if ( typeof param === "object" && param.isMaterial && param.id !== undefined )
				materials.push( param );  // meterial;
			else 
				continue;
		}

		if ( !materials.length ) return;
	//	console.log( "materials:", materials );

		var length = materials.length;
		for ( var j = 0; j < length; j++ ) {
			this.push( materials[j] );
		}

	//	global const "material_droplist" is defined in MaterialTab.js;
	//	var material_droplist = document.getElementById("material-entities-droplist");

		if ( !material_droplist ) return;

	//	Add options.
		while ( materials.length ) (function( material ){
			var str =  "", dot = ".", col = ":";
			var type = "object";
			var name = material.name || "mtl"+material.id;
			if ( material.type ) type = material.type.replace("Material","");
			var option = document.createElement("option");
			option.text = str+material.id+dot+type+col+name;
			option.value = material.id;
			material_droplist.appendChild( option );
		})( materials.shift() );
	};

	MaterialManager.prototype.remove = function(){
	//	params: {number:entity.id} or {object:entity} 

		if ( arguments.length < 1 ) return;

	//	Get removed ids.
		var remove_ids = [];
		for ( var i in arguments ) {
			var param = arguments[i];
			if ( typeof param === "number" && param % 1 === 0 ) // integer. 
				remove_ids.unshift( param );    // remove_ids.push( param );
			else if ( typeof param === "object" && param.isMaterial && param.id !== undefined )
				remove_ids.unshift( param.id ); // remove_ids.push( param.id );
			else 
				continue;
		}

		if ( !remove_ids.length ) return;
	//	console.log( "remove_ids:", remove_ids );

		var length = remove_ids.length;
		for ( var j = 0; j < length; j++ ) {

			var _id = remove_ids[ j ];

		//	Find index.
			var index = this.findIndex(function( item ){
				return item.id === _id;
			});

			if ( index < 0 ) continue; // important!

			var removedItems = this.splice(index, 1);
		//	debugMode && console.log( removedItems );

			while ( removedItems.length ){
				var removed = removedItems.shift();
			//	debugMode && console.log( removed );
				removed_materials.push( removed );
			}
		}

	//	global const "material_droplist" is defined in MaterialTab.js;
	//	var material_droplist = document.getElementById("material-entities-droplist");

		if ( !material_droplist ) return;

	//	Remove options.
		while ( remove_ids.length ) (function( id ){
			var selector = "option[value='" + id.toString() + "']"; // console.log( selector );
			var option = material_droplist.querySelector( selector ); // console.log(  option  );
			option && option.remove();
		})( remove_ids.shift() );

	};

	MaterialManager.prototype.clear = function(){

		this.length = 0;

	};

	MaterialManager.prototype.getMaterialById = function( value ){

		var id = parseInt( value );
		if ( id === NaN ) return;

		return this.find( function( texture ){
			return texture.id === id;
		});

	};

//	Create material managers.

	const material_entities = new MaterialManager(); // material entities array, important!.
	const removed_materials = new MaterialManager(); // material entities array, important!.

//	===================================================================================================================  //

//	MaterialEditor.js

//	Create a Material to hold editor values.

	const materialEditor = (function(){

	//	UndoArray Class (extends Array class).

		function UndoArray(){
			var array = new Array(0);
			Object.setPrototypeOf( array, UndoArray.prototype );
			return array; // important!
		}

		UndoArray.prototype = Object.create(Array.prototype); // important!
		UndoArray.prototype.clear = function(){ this.length = 0; };
		UndoArray.prototype.move = array_move.bind(UndoArray.prototype); // TO BE TESTED!!!

		const undo = new UndoArray(); debugMode && console.log( {"undo": undo} );
		const redo = new UndoArray(); debugMode && console.log( {"redo": redo} );

		const RAD2DEG = THREE.Math.RAD2DEG;
		const DEG2RAD = THREE.Math.DEG2RAD;

	//	droplists.

		const key_droplist = document.getElementById("material-keys-droplist");
		const type_droplist = document.getElementById("material-type-droplist");
		const color_droplist = document.getElementById("material-color-droplist");
		const vector_droplist = document.getElementById("material-vector-droplist");
		const entity_droplist = document.getElementById("material-entities-droplist");
		const texture_droplist = document.getElementById("material-map-droplist");

	//	mouse inputs.

		const increase_v = document.getElementById("material-value-increase");
		const decrease_v = document.getElementById("material-value-decrease");
		const increase_x = document.getElementById("material-vector-x-increase");
		const increase_y = document.getElementById("material-vector-y-increase");
		const decrease_x = document.getElementById("material-vector-x-decrease");
		const decrease_y = document.getElementById("material-vector-y-decrease");

		const increase_r = document.getElementById("material-color-r-increase");
		const increase_g = document.getElementById("material-color-g-increase");
		const increase_b = document.getElementById("material-color-b-increase");
		const decrease_r = document.getElementById("material-color-r-decrease");
		const decrease_g = document.getElementById("material-color-g-decrease");
		const decrease_b = document.getElementById("material-color-b-decrease");

	//	keyboard inputs.

		const color_r = document.getElementById("material-color-r-input");
		const color_g = document.getElementById("material-color-g-input");
		const color_b = document.getElementById("material-color-b-input");
		const vector_x = document.getElementById("material-vector-x-input");
		const vector_y = document.getElementById("material-vector-y-input");
		const text_input  = document.getElementById("material-text-input");
		const value_input = document.getElementById("material-value-input");

	//	material tab buttons.

		const exit_button = document.getElementById("material-exit-mode");
		const redo_button = document.getElementById("material-redo-button");
		const undo_button = document.getElementById("material-undo-button");
		const clone_button = document.getElementById("clone-material-button");
		const create_button = document.getElementById("create-material-button");
		const remove_button = document.getElementById("remove-material-button");
		const needsUpdate_button = document.getElementById("material-needs-update");

	//	MaterialEditor class (extends THREE.MeshStandardMaterial Class).
	//	A THREE.Material that holds editor values. Extends THREE.Material.

		const editor = (function(){

			var interval;

			function MaterialEditor(){
				var material = new THREE.Material();
				Object.setPrototypeOf( material, MaterialEditor.prototype );
				return material; // important!
			}

			MaterialEditor.prototype = Object.create(THREE.Material.prototype); // important!

			MaterialEditor.prototype.copy = function( source ){ 
				THREE[ source.type ].prototype.copy.call( this, source ); // important!
				return this;
			};

			MaterialEditor.prototype.reset = function(){ 

				var source = new THREE.MeshStandardMaterial();

				var keys = "";
				keys += "color,emissive,specular,normalScale,displacementScale,";
				keys += "name,type,uuid,side,opacity,alphaTest,transparent,premultipliedAlpha,";
				keys += "fog,lights,visible,overdraw,dithering,precision,colorWrite,flatShading,vertexColors,";
				keys += "blending,blendSrc,blendDst,blendEquation,blendSrcAlpha,blendDstAlpha,blendEquationAlpha,";
				keys += "depthFunc,depthTest,depthWrite,shadowSide,clipShadows,clipIntersection,";
				keys += "polygonOffset,polygonOffsetUnits,polygonOffsetFactor,";
				keys += "map,aoMap,envMap,bumpMap,alphaMap,lightMap,normalMap,specularMap,";
				keys += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap,";
				keys += "metalness,roughness,bumpScale,reflectivity,";
				keys += "refractionRatio,displacementBias,normalMapType,";
				keys += "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,";
				keys += "wireframe,wireframeLinecap,wireframeLinejoin,wireframeLinewidth,";
				keys += "skinning,morphTargets,morphNormals,combine,shininess,";
				keys += "depthPacking,scale,gapSize,linecap,linejoin,linewidth,";
				keys += "dashSize,size,rotation,sizeAttenuation,needsUpdate";

				keys.split(",").forEach(function( key ){
					switch ( key ){

						case "name":
							editor.name = "editor";
						break;

						case "color":
							if ( editor[ key ] === undefined )
								editor[ key ] = new THREE.Color(1,1,1);
							else
								editor[ key ].setRGB(1,1,1);
						break;

						case "emissive":
						case "specular":
							if ( editor[ key ] === undefined )
								editor[ key ] = new THREE.Color(0,0,0);
							else
								editor[ key ].setRGB(0,0,0);
						break;

						case "normalScale":
							if ( editor[ key ] === undefined )
								editor[ key ] = new THREE.Vector2(1,1);
							else
								editor[ key ].set(1,1);
						break;

						default:
							editor[ key ] = source[ key ];
						break;

						case "clippingPlanes": {

							var srcPlanes = source.clippingPlanes,
								dstPlanes = null;

							if ( srcPlanes !== null ) {

								var n = srcPlanes.length;
								dstPlanes = new Array( n );

								for ( var i = 0; i !== n; ++ i )
									dstPlanes[ i ] = srcPlanes[ i ].clone();

							}

							editor.clippingPlanes = dstPlanes;

						} break;

						case "userData":
							editor.userData = JSON.parse( JSON.stringify( source.userData ) );
						break;

					}
				});

			//	debugMode && console.log("reset:", {"editor": editor});

				return this;
			};

			MaterialEditor.prototype.fromJSON = function( json ){
			//	param: a texture json {object}

				var editor = this;

				var loader = new THREE.MaterialLoader();
				var material = loader.parse( json );
				debugMode && console.log( material );

				editor.reset(); // important!

				editor.copy( material );
				editor.type = material.type;
				editor.uuid = material.uuid;

			};

			MaterialEditor.prototype.undo = function(){

				var editor = this;

				if ( !undo.length ) return;

			//	Get undo json.
				var json = undo.shift();

				if ( !json ) return;

			//	Move json to redo.
				redo.unshift( json );

				clearTimeout( interval );
				interval = setTimeout( function(){

				//	Copy material state (undo).
					editor.fromJSON( json ); // update.

					debugMode && console.log( "undo:", undo.length, "redo:", redo.length );

				}, 250);

			};

			MaterialEditor.prototype.redo = function(){

				var editor = this;

				if ( !redo.length ) return;

			//	Get redo json.
				var json = redo.shift();

				if ( !json ) return;

			//	Move json to undo.
				undo.unshift( json );

				clearTimeout( interval );
				interval = setTimeout( function(){

				//	Copy texture state (redo).
					editor.fromJSON( json ); // update.

					debugMode && console.log( "undo:", undo.length, "redo:", redo.length );

				}, 250);
			};

			MaterialEditor.prototype.update = function( value ){

			//	Copies the values of the target material of material
			//	entity manager. Does not updates the target material.
			//	dependences: material_entities {material manager},
			//	param: a material id {string or number},

				var editor = this;

				editor.reset(); // important!

			//	get target material.
				var material = material_entities.getMaterialById( value );
			//	debugMode && console.log( "editor material:", material );

				if ( !material ) {
					editor.reset();
					console.log("editor update:", false);
					return false; // important!
				}

			//	copy material (update).
				editor.copy( material );
				editor.type = material.type;
				editor.uuid = material.uuid;

			//	return true.
				console.log("editor update:", true);
				return true; // important!

			};

			return new MaterialEditor();

		})();

	//	editor.reset(); // important!

	//	helpers.

		function getObjectByEntityId( value ){

			var entities_droplist = document.getElementById("entities-droplist"); // important!

			if ( arguments.length ) 
				var id = parseInt( value );
			else
				var id = parseInt( entities_droplist.value );

			if ( isNaN(id) ) return;

			return scene.getObjectById( id );
		}

		function getMaterialByEntityId( value ){

			var material_droplist = document.getElementById("material-entities-droplist"); // important!

			if ( arguments.length ) 
				var id = parseInt( value );
			else
				var id = parseInt( material_droplist.value );

			if ( isNaN(id) ) return;

			return material_entities.find( function( material ){
				return material.id === id;
			});
		}

	//	add to undo/redo.
	//	You want addtoUndo to keyinput change event and to mouse
	//	clickend event.
	//	Should you place addtoUndo on each keyinput change event?
	//	Should you place addtoUndo on each mouse clickend event?
	// 	Watch editor value and if is differend add an undo json?

		function addtoUndo(){
			var json = editor.toJSON();
			json && undo.unshift( json );
			return;
		}

		function clearUndoRedo(){
			undo.clear();
			redo.clear();
			return;
		}

		function resetUIValues(){
			color_r.value = "";
			color_g.value = "";
			color_b.value = "";
			vector_x.value = "";
			vector_y.value = "";
			text_input.value = "";
			value_input.value = "";
			key_droplist.value = "";
			color_droplist.value = "";
			vector_droplist.value = "";
			entity_droplist.value = "";
			texture_droplist.value = "";
			return;
		}

	//	exit from edit mode.

		function exitFromEditMode(){
			editor.reset();
			resetUIValues();
			clearUndoRedo();
			return;
		}

	//	Undo/Redo/Exit buttons.

		(function(){

			var interval;

			exit_button.addEventListener( "click", function(){
				clearTimeout( interval ); 
				interval = setTimeout( exitFromEditMode, 250);
			});

			undo_button.addEventListener( "click", function(){
				debugMode && console.log("undo:",undo.length,"redo:",redo.length);
				if ( !entity_droplist.value ) clearUndoRedo();
				else undo.length && editor.undo(); // undo.
			});

			redo_button.addEventListener( "click", function(){
				debugMode && console.log("undo:",undo.length,"redo:",redo.length);
				if ( !entity_droplist.value ) clearUndoRedo();
				else redo.length && editor.redo(); // redo.
			});

		})();

	//	Tab droplists.

		(function(){

			key_droplist.addEventListener( "change", key_droplist.blur );
			color_droplist.addEventListener( "change", color_droplist.blur );
			vector_droplist.addEventListener( "change", vector_droplist.blur );
			entity_droplist.addEventListener( "change", entity_droplist.blur );
			texture_droplist.addEventListener( "change", texture_droplist.blur );

			document.getElementById("entities-droplist").addEventListener( "change", function(){

				var object = scene.getObjectById( Number(this.value) );

				if ( object && object.material ) {

					if ( !Array.isArray(object.material) ) 
						callWatchers( entity_droplist, "onchange", "change", 
						entity_droplist.value = String(object.material.id) );
					if ( Array.isArray(object.material) && object.material.length ) 
						callWatchers( entity_droplist, "onchange", "change", 
						entity_droplist.value = String(object.material[0].id) );

				}  else exitFromEditMode();

				// else callWatchers( entity_droplist, "onchange", "change", entity_droplist.value = "" );

			});


			watch( key_droplist, "onchange", function( property, event, key ){

				if ( !key || editor[key] == undefined ) 
					return [ value_input.value, text_input.value ] = ["",""];

				if ( key && editor[key] !== undefined && typeof editor[key] === "string" ) {

				//	debugMode && console.log( typeof editor[key]  ); // debug!

					[text_input.value, value_input.value] = [ editor[key], "" ];

				} else if ( key && editor[key] !== undefined && typeof editor[key] === "number" ) {

				//	debugMode && console.log( typeof editor[key]  ); // debug!

					if ( ("displacementScale,polygonOffsetUnits,polygonOffsetFactor,opacity,"
					+ "alphaTest,reflectivity,refractionRatio,bumpScale,metalness,roughness,displacementBias,"
					+ "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,wireframeLinewidth,"
					+ "linewidth,size,scale,gapSize,dashSize,shininess").split(",").includes(key) ) {

					//	debugMode && console.log( "number (1):", typeof editor[key]  ); // debug!

						[value_input.value, text_input.value] = [ editor[key].toFixed(2), "" ];

					} else if ( key === "rotation" ) {

						[value_input.value, text_input.value] = [ (RAD2DEG*editor[key]).toFixed(1), "" ];

					} else [value_input.value, text_input.value] = [ editor[key].toFixed(0), "" ];

				} else if ( key && editor[key] !== undefined && typeof editor[key] === "boolean" ) {

				//	debugMode && console.log( typeof editor[key]  ); // debug!

					[text_input.value, value_input.value] = [ "", editor[key] ];

				} else [ value_input.value, text_input.value ] = ["",""];

			});

			watch( vector_droplist, "onchange", function( property, event, key ){

				if ( key && editor[key] !== undefined && editor[key].isVector2 ) 

					[ vector_x.value, vector_y.value ] = [ 
						editor[key].x.toFixed(2), editor[key].y.toFixed(2) 
					];

				else [vector_x.value, vector_y.value] = ["",""];

			});

			watch( color_droplist, "onchange", function( property, event, key ){

				if ( key && editor[key] !== undefined && editor[key].isColor ) 

					[ color_r.value, color_g.value, color_b.value ] = [ 
						parseInt( 255*editor[ key ].r ).toFixed(0),
						parseInt( 255*editor[ key ].g ).toFixed(0),
						parseInt( 255*editor[ key ].b ).toFixed(0)
					];

				else [color_r.value, color_g.value, color_b.value] = ["","",""];

			});

			watch( texture_droplist, "onchange", function( property, event, map ){

				if ( !map || editor[map] == null || !editor[map].isTexture ) 
					return [vector_x.value, vector_y.value] = ["",""];

				var key = vector_droplist.value;

				if ( map === "normalMap" && key === "normalScale" 
				&& editor[ key ] && editor[ key ].isVector2 ) 

					[ vector_x.value, vector_y.value ] = [ 
						editor[key].x.toFixed(2), editor[key].y.toFixed(2) 
					];

				else [vector_x.value, vector_y.value] = ["",""];

			});

			watch( entity_droplist, "onchange", function( property, event, value ){
				editor.update( parseInt( value ) ); // important! id.
				callWatchers( key_droplist, "onchange", "change", key_droplist.value );
				callWatchers( color_droplist, "onchange", "change", color_droplist.value );
				callWatchers( vector_droplist, "onchange", "change", vector_droplist.value );
				callWatchers( texture_droplist, "onchange", "change", texture_droplist.value );
			});

		})();

	//	Tab keyboard inputs.

		(function(){

			var interval;

		//	keyInputs blur.

			color_r.addEventListener( "change", color_r.blur );
			color_g.addEventListener( "change", color_g.blur );
			color_b.addEventListener( "change", color_b.blur );
			vector_x.addEventListener( "change", vector_x.blur );
			vector_y.addEventListener( "change", vector_y.blur );
			text_input.addEventListener( "change", text_input.blur );
			value_input.addEventListener( "change", value_input.blur );

		//	keyInputControls.

			function enableKeyInputControls(){
				keyInputControls.isDisabled = false;
			}

			function disableKeyInputControls(){
				keyInputControls.isDisabled = true;
			}

			color_r.addEventListener( "blur", enableKeyInputControls );
			color_g.addEventListener( "blur", enableKeyInputControls );
			color_b.addEventListener( "blur", enableKeyInputControls );
			vector_x.addEventListener( "blur", enableKeyInputControls );
			vector_y.addEventListener( "blur", enableKeyInputControls );
			text_input.addEventListener( "blur", enableKeyInputControls );
			value_input.addEventListener( "blur", enableKeyInputControls );

			color_r.addEventListener( "focus", disableKeyInputControls );
			color_g.addEventListener( "focus", disableKeyInputControls );
			color_b.addEventListener( "focus", disableKeyInputControls );
			vector_x.addEventListener( "focus", disableKeyInputControls );
			vector_y.addEventListener( "focus", disableKeyInputControls );
			text_input.addEventListener( "focus", disableKeyInputControls );
			value_input.addEventListener( "focus", disableKeyInputControls );

		//	keyinputs change.

		//	Text input update editor value on keyinput change watch event.
			watch( text_input, "onchange", function(property, event, value){
				debugMode && console.log({item:"text input",event:event,"value":value});

				if ( !key_droplist.value ) return text_input.value = "";
				if ( !entity_droplist.value ) return text_input.value = "";

			//	"value" always comes as typeof "string".

				if ( value === "" )  return text_input.value = "";
				if ( value === "undefined" ) return text_input.value = "";

				var key = key_droplist.value;
				var value = text_input.value; // string.

				switch ( key ){

				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we was adding to undo after the value has changed. (FIXED!)

					case "name":
						if ( editor[key] !== value ) {
							addtoUndo(); editor[ key ] = value; // important!
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
						}
					break;

					case "uuid":
					case "type":
					case "linecap":
					case "linejoin":
					case "wireframeLinecap":
						text_input.value = editor[ key ];
					break;

					default:
						[ value_input.value, text_input.value ] = ["",""];
					break;
				}

			});

		//	Value input update editor value on keyinput change watch event.
			watch( value_input, "onchange", function(property, event, value){
			//	debugMode && console.log({item:"value input",event:event,"value":value});

				if ( !key_droplist.value ) return value_input.value = "";
				if ( !entity_droplist.value ) return value_input.value = "";

			//	"value" always comes as typeof "string", (ecxept NaN, undefined?)

				if ( value === undefined ) return value_input.value = "";
				if ( value === "" ) return value_input.value = "";
				if ( value === "NaN" ) return value_input.value = "";
				if ( value === "undefined" ) return value_input.value = "";

				var key = key_droplist.value;

			//	disabled on key change.

				if ( typeof editor[key] === "string" ) value_input.value = "";

			//	enabled on key change.

				else if ( typeof editor[key] === "boolean" ) {

					if ( value.toLowerCase() === "false" ) value = 0;     // accept "false" string.
					else if ( value.toLowerCase() === "true" ) value = 1; // accept "true" string.
					else if ( isNaN(value) ) return value_input.value = editor[ key ]; // avoid to pass NaN value!
					else value = Number(value); // convert to number, important!

				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we was adding to undo after the value has changed. (FIXED!)

					if ( editor[key] !== Boolean(value) ) {
						addtoUndo(); editor[key] = Boolean(value); // important!
						debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
					}

					value_input.value = editor[ key ]; // display value.
				}

				else if ( typeof editor[key] === "number" ) {

					if ( isNaN(value) ) return value_input.value = editor[ key ];
					if ( isNaN(editor[key]) ) return value_input.value = ""; // avoid to pass NaN value!

				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we was adding to undo after the value has changed. (FIXED!)

					switch ( key ) {

						case "displacementScale":
						case "polygonOffsetUnits":
						case "polygonOffsetFactor":
							var value = THREE.Math.clamp(Number(value), -100, 100);
							if ( editor[key] !== value ) { addtoUndo(); editor[key] = Number(value); 
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "opacity":
						case "overdraw":
						case "alphaTest":
						case "reflectivity":
							var value = THREE.Math.clamp(Number(value), 0, 1);
							if ( editor[key] !== value ) { addtoUndo(); editor[key] = Number(value); 
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "refractionRatio":
							var value = THREE.Math.clamp(Number(value), -1, 1);
							if ( editor[key] !== value ) { addtoUndo(); editor[key] = Number(value); 
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "bumpScale":
						case "metalness":
						case "roughness":
						case "displacementBias":
						case "aoMapIntensity":
						case "envMapIntensity":
						case "emissiveIntensity":
						case "lightMapIntensity":
						case "wireframeLinewidth":
							var value = THREE.Math.clamp(Number(value), -10, 10);
							if ( editor[key] !== value ) { addtoUndo(); editor[key] = Number(value); 
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "linewidth":
							var value = THREE.Math.clamp(Number(value), 0, 100);
							if ( editor[key] !== value ) { addtoUndo(); editor[key] = Number(value); 
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "size":
						case "scale":
						case "gapSize":
						case "dashSize":
						case "shininess":
							var value = THREE.Math.clamp(Number(value), 0, 1000);
							if ( editor[key] !== value ) { addtoUndo(); editor[key] = Number(value); 
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "rotation":
							var value = DEG2RAD*THREE.Math.clamp(Number(value), -180, 180);
							if ( editor[key] !== value ) { addtoUndo(); editor[key] = Number(value); 
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
					//
						case "blending":
							if ( "0,1,2,3,4,5".split(",").includes(value) 
							&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
								debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "side":
							if ( "0,1,2".split(",").includes(value) 
							&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
								debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "vertexColors":
							if ( "0,1,2".split(",").includes(value) 
							&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
								debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "blendDst":
						case "blendSrc":
							if ( "200,201,202,203,204,205,206,207,208,209,210".split(",").includes(value)
							&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
								debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "blendEquation":
							if ( "100,101,102,103,104".split(",").includes(value)
							&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
								debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "depthFunc":
							if ( "0,1,2,3,4,5,6,7".split(",").includes(value)
							&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
								debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "normalMapType":
							if ( "0,1".includes(value)
							&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
								debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;
						case "combine":
							if ( "0,1,2".includes(value)
							&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
								debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
						break;

					}

					if ( key === "rotation" )
						value_input.value = RAD2DEG*editor[key].toFixed(1); // display value.
					else 
						value_input.value = editor[ key ]; // display value.
				}

			//

				else if ( typeof editor[key] === "undefined" ) {

				 //	string type values.

					if ( "uuid,type,linecap,linejoin,wireframeLinecap,name".split(",").includes(key) ) {

						value_input.value = "";

				//	boolean type values.

					} else if ( ("fog,lights,flatShading,transparent,depthTest,"
					+ "depthWrite,clipIntersection,clipShadows,colorWrite,polygonOffset,"
					+ "dithering,premultipliedAlpha,visible,needsUpdate,wireframe,"
					+ "skinning,morphTargets,morphNormals").split(",").includes(key) ) {

						if ( value === "false" ) value = 0;       // accepts "false" string.
						else if ( value === "true" ) value = 1;   // accepts "true" string.
						else if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN value!
						else value = Number(value); // convert to number, important!

					//	Before change the editor[key] value add an undo state in undo queue.
					//	Until now we was adding to undo after the value has changed. (FIXED!)

						if ( editor[key] !== Boolean(value) ) {
							addtoUndo(); editor[key] = Boolean(value); // important!
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
						}

						value_input.value = editor[ key ]; // display value.

				//	number type values.

					} else if ( ("displacementScale,polygonOffsetUnits,polygonOffsetFactor,opacity,overdraw,"
					+ "alphaTest,reflectivity,refractionRatio,bumpScale,metalness,roughness,displacementBias,"
					+ "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,wireframeLinewidth,"
					+ "linewidth,size,scale,gapSize,dashSize,shininess,rotation").split(",").includes(key) ) {

					//	Before change the editor[key] value add an undo state in undo queue.
					//	Until now we was adding to undo after the value has changed. (FIXED!)

						if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN value!

						switch ( key ) {

							case "displacementScale":
							case "polygonOffsetUnits":
							case "polygonOffsetFactor":
								var value = THREE.Math.clamp(Number(value), -100, 100); // number.
							break;
							case "opacity":
							case "overdraw":
							case "alphaTest":
							case "reflectivity":
								var value = THREE.Math.clamp(Number(value), 0, 1); // number.
							break;
							case "refractionRatio":
								var value = THREE.Math.clamp(Number(value), -1, 1); // number.
							break;
							case "bumpScale":
							case "metalness":
							case "roughness":
							case "displacementBias":
							case "aoMapIntensity":
							case "envMapIntensity":
							case "emissiveIntensity":
							case "lightMapIntensity":
							case "wireframeLinewidth":
								var value = THREE.Math.clamp(Number(value), -10, 10); // number.
							break;
							case "linewidth":
								var value = THREE.Math.clamp(Number(value), 0, 100); // number.
							break;
							case "size":
							case "scale":
							case "gapSize":
							case "dashSize":
							case "shininess":
								var value = THREE.Math.clamp(Number(value), 0, 1000); // number.
							break;
							case "rotation":
								var value = DEG2RAD*THREE.Math.clamp(Number(value), -180, 180); // number.
							break;

						}

						if ( !isNaN(value) && editor[key] !== Number(value) ) {
							addtoUndo(); editor[key] = Number(value); // important!
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
						}

						value_input.value = editor[ key ]; // display value.

					} else if ( ("blending,side,vertexColors,blendDst,blendSrc,blendEquation,depthFunc,"
					+ "normalMapType,combine,polygonOffsetUnits,polygonOffsetFactor").split(",").includes(key) ) {

					//	Before change the editor[key] value add an undo state in undo queue.
					//	Until now we was adding to undo after the value has changed. (FIXED!)

						switch ( key ) {

							case "blending":
								if ( "0,1,2,3,4,5".split(",").includes(value) 
								&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
									debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
							break;
							case "side":
								if ( "0,1,2".split(",").includes(value) 
								&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
									debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
							break;
							case "vertexColors":
								if ( "0,1,2".split(",").includes(value) 
								&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
									debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
							break;
							case "blendDst":
							case "blendSrc":
								if ( "200,201,202,203,204,205,206,207,208,209,210".split(",").includes(value)
								&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
									debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
							break;
							case "blendEquation":
								if ( "100,101,102,103,104".split(",").includes(value)
								&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
									debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
							break;
							case "depthFunc":
								if ( "0,1,2,3,4,5,6,7".split(",").includes(value)
								&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
									debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
							break;
							case "normalMapType":
								if ( "0,1".includes(value)
								&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
									debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
							break;
							case "combine":
								if ( "0,1,2".includes(value)
								&& editor[key] !== Number(value) ) { addtoUndo(); editor[key] = Number(value); 
									debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); }
							break;
						}

						value_input.value = editor[ key ]; // display value.
					}

				} else [ value_input.value, text_input.value ] = ["",""];

			});

		//	Vector input (x) update editor vector value on keyinput change watch event.
			watch( vector_x, "onchange", function(property, event, value){
			//	debugMode && console.log({item:"vector x",event:event,"value":value});

				if ( key_droplist.value === "" ) return vector_x.value = "";
				if ( entity_droplist.value === "" ) return vector_x.value = "";

			//	"value" always comes as typeof "string".

				if ( value === undefined ) return vector_x.value = "";
				if ( value === "" ) return vector_x.value = "";
				if ( value === "NaN" ) return vector_x.value = "";
				if ( value === "undefined" ) return vector_x.value = "";

				var key = vector_droplist.value;

			//	disabled on key change.

				if ( editor[key] === undefined ) vector_x.value = "";
				else if ( !editor[key].isVector2 ) vector_x.value = "";
				else if ( isNaN(value) ) vector_x.value = editor[key].x.toFixed(2);

			//	enabled on key change.
			//	Before change the editor[key] value add an undo state in undo queue.
			//	Until now we was adding to undo after the value has changed. (FIXED!)

				else if ( ["normalScale"].includes(key) ) {

					var value = THREE.Math.clamp( Number(value), -100, 100 ); // number.

					if ( editor[key].x !== Number(value) ) { 
						addtoUndo(); editor[key].x = Number(value); // important!
						debugMode && console.log( "undo:", undo.length, "redo:", redo.length, "value:", value );
					}

					vector_x.value = editor[key].x.toFixed(2); // display value.
				}

			});


		//	Vector input (y) update editor vector value on keyinput change watch event.
			watch( vector_y, "onchange", function(property, event, value){
			//	debugMode && console.log({item:"vector y",event:event,"value":value});

				if ( key_droplist.value === "" ) return vector_y.value = "";
				if ( entity_droplist.value === "" ) return vector_y.value = "";

			//	"value" always comes as typeof "string".

				if ( value === undefined ) return vector_y.value = "";
				if ( value === "" ) return vector_y.value = "";
				if ( value === "NaN" ) return vector_y.value = "";
				if ( value === "undefined" ) return vector_y.value = "";

				var key = vector_droplist.value;

			//	disabled on key change.

				if ( editor[key] === undefined ) vector_y.value = "";
				else if ( !editor[key].isVector2 ) vector_y.value = "";
				else if ( isNaN(value) ) vector_y.value = editor[key].y.toFixed(2);

			//	enabled on key change.
			//	Before change the editor[key] value add an undo state in undo queue.
			//	Until now we was adding to undo after the value has changed. (FIXED!)

				else if ( ["normalScale"].includes(key) ) {

					var value = THREE.Math.clamp( Number(value), -100, 100 ); // number.

					if ( editor[key].y !== Number(value) ) { 
						addtoUndo(); editor[key].y = Number(value); // important!
						debugMode && console.log( "undo:", undo.length, "redo:", redo.length, "value:", value );
					}

					vector_y.value = editor[key].y.toFixed(2); // display value.
				}

			});


		//	Color input (r) update editor color value on keyinput change watch event.
			watch( color_r, "onchange", function(property, event, value){
				debugMode && console.log({item:"color r",event:event,"value":value});

				if ( color_droplist.value === "" ) return color_r.value = "";
				if ( entity_droplist.value === "" ) return color_r.value = "";

			//	"value" always comes as typeof "string".

				if ( value === "" ) return color_r.value = "";
				if ( value === "undefined" ) return color_r.value = "";

				var key = color_droplist.value;

			//	disabled on key change.

				if ( editor[key] === undefined ) value_input.value = "";
				else if ( !editor[key].isColor ) value_input.value = "";
				else if ( isNaN(value) ) color_r.value = (255*editor[key].r).toFixed(0);

			//	enabled on key change.
			//	Before change the editor[key] value add an undo state in undo queue.
			//	Until now we was adding to undo after the value has changed. (FIXED!)

				else if ( ["color","emissive","specular"].includes(key) ) {

					var value = THREE.Math.clamp( (Number(value) % 256) / 255, 0, 1 ); // normalize.

					if ( editor[key].r !== value ) { addtoUndo(); editor[key].r = value; // important!

						debugMode && console.log( "undo:", undo.length, "redo:", redo.length, "value:", value );
					}
				}

				color_r.value = Number(255*editor[key].r).toFixed(0); // display value.

			});

		//	Color input (g) update editor color value on keyinput change watch event.
			watch( color_g, "onchange", function(property, event, value){
				debugMode && console.log({item:"color g",event:event,"value":value});

				if ( color_droplist.value === "" ) return color_g.value = "";
				if ( entity_droplist.value === "" ) return color_g.value = "";

			//	"value" always comes as typeof "string".

				if ( value === "" ) return color_g.value = "";
				if ( value === "undefined" ) return color_g.value = "";

				var key = color_droplist.value;

			//	disabled on key change.

				if ( editor[key] === undefined ) value_input.value = "";
				else if ( !editor[key].isColor ) value_input.value = "";
				else if ( isNaN(value) ) color_g.value = (255*editor[key].g).toFixed(0);

			//	enabled on key change.
			//	Before change the editor[key] value add an undo state in undo queue.
			//	Until now we was adding to undo after the value has changed. (FIXED!)

				else if ( ["color","emissive","specular"].includes(key) ) {

					var value = THREE.Math.clamp( (Number(value) % 256) / 255, 0, 1 ); // normalize.

					if ( editor[key].g !== value ) { addtoUndo(); editor[key].g = value; // important!

						debugMode && console.log( "undo:", undo.length, "redo:", redo.length, "value:", value );
					}
				}

				color_g.value = Number(255*editor[key].g).toFixed(0); // display value.

			});

		//	Color input (b) update editor color value on keyinput change watch event.
			watch( color_b, "onchange", function(property, event, value){
				debugMode && console.log({item:"color b",event:event,"value":value});

				if ( color_droplist.value === "" ) return color_b.value = "";
				if ( entity_droplist.value === "" ) return color_b.value = "";

			//	"value" always comes as typeof "string".

				if ( value === "" ) return color_b.value = "";
				if ( value === "undefined" ) return color_b.value = "";

				var key = color_droplist.value;

			//	disabled on key change.

				if ( editor[key] === undefined ) value_input.value = "";
				else if ( !editor[key].isColor ) value_input.value = "";
				else if ( isNaN(value) ) color_b.value = (255*editor[key].b).toFixed(0);

			//	enabled on key change.
			//	Before change the editor[key] value add an undo state in undo queue.
			//	Until now we was adding to undo after the value has changed. (FIXED!)

				else if ( ["color","emissive","specular"].includes(key) ) {

					var value = THREE.Math.clamp( (Number(value) % 256) / 255, 0, 1 ); // normalize.

					if ( editor[key].b !== value ) { addtoUndo(); editor[key].b = value; // important!

						debugMode && console.log( "undo:", undo.length, "redo:", redo.length, "value:", value );
					}
				}

				color_b.value = Number(255*editor[key].b).toFixed(0); // display value.

			});

		})();

	//	key/value mouse inputs.

		(function(){

			var interval;

		//	keep first, ignore next events.

			var state;
			function onfirstMouseDown(){
				state = {};
				var key = key_droplist.value;
				state.key = key;
				state.value = editor[ key ];
				state.json = editor.toJSON();
				console.log( "state:", state, "undo:", undo.length, "redo:", redo.length );
			//	Remove on firstMouseDown event listener.
				this.removeEventListener( "mousedown", onfirstMouseDown ); // important!
			};

			increase_v.addEventListener( "mousedown", onfirstMouseDown );
			decrease_v.addEventListener( "mousedown", onfirstMouseDown );

			increase_v.addEventListener( "mousedown", onMouseDown );
			decrease_v.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
			//	debugMode && console.log( "on MouseUp:", interval );
				clearTimeout( interval ); // important!
			});

			increase_v.addEventListener( "click", onMouseClick );
			decrease_v.addEventListener( "click", onMouseClick );

			function onMouseDown(){

				clearTimeout( interval ); // important!

				if ( !entity_droplist.value === "" ) return;

			//	disabled on mouse down.

				if ( key_droplist.value === "" ) return;
				if ( isNaN(editor[key_droplist.value]) ) return; // avoid to pass NaN value!

			//	enabled on mouse down.

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function update() {

					var key = key_droplist.value;

					if ( isNaN(editor[key]) ) return; // avoid to pass NaN value!

					function updateFloatRotationValue(){
						var step = 0.1 * Math.PI/180; // 0.1 deg.
						var min = -Math.PI, max = Math.PI;
						var value = Number(editor[ key ]); // get value from editor.
						if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
						value_input.value = ( RAD2DEG * ( editor[ key ] = value) ).toFixed(1); // string.
					}

					function updateFloatNumberValue(min, max, step){
						var value = Number(editor[ key ]); // get value from editor.
						if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
						value_input.value = ( editor[key] = round(value, 2) ).toFixed(2);
					}

					function updateIntegerNumberValue(min, max){
						var value = parseInt(editor[ key ]); // get value from editor.
						if ( button === increase_v ) value = THREE.Math.clamp( ++value, min, max );
						if ( button === decrease_v ) value = THREE.Math.clamp( --value, min, max );
						value_input.value = ( editor[key] = parseInt(value) ).toFixed(0);
					}

					switch ( key ){

						case "polygonOffsetUnits":
						case "polygonOffsetFactor":
							updateIntegerNumberValue(-100, 100);
						break;
						case "displacementScale":
							updateFloatNumberValue(-100, 100, 1/100);
						break;
						case "bumpScale":
						case "metalness":
						case "roughness":
						case "displacementBias":
							updateFloatNumberValue(-10, 10, 1/100);
						break;
						case "refractionRatio":
							updateFloatNumberValue(-1, 1, 1/100);
						break;
						case "opacity":
						case "overdraw":
						case "alphaTest":
						case "reflectivity":
						case "wireframeLinewidth":
							updateFloatNumberValue(0, 1, 1/100);
						break;
						case "linewidth":
						case "aoMapIntensity":
						case "envMapIntensity":
						case "emissiveIntensity":
						case "lightMapIntensity":
							updateFloatNumberValue(0, 100, 1/100);
						break;
						case "size":
						case "scale":
						case "gapSize":
						case "dashSize":
						case "shininess":
							updateFloatNumberValue(0, 1000, 1/100);
						break;
						case "rotation":
							updateFloatRotationValue();
						break;
					}

					var dt = clock.getDelta();
					interval = setTimeout( update, dt );
				//	debugMode && console.log( "on mousedown:", interval );

				}, 500);
			}

			function onMouseClick(){

				clearTimeout( interval ); // important!

				if ( !entity_droplist.value === "" ) return;

			//	disabled on mouse click.

				if ( key_droplist.value === "" ) return;
				if ( key_droplist.value === "name" ) return;
				if ( key_droplist.value === "type" ) return;

			//	enabled on mouse click.

				var button = this;
				var key = key_droplist.value;

			//	if ( isNaN(editor[key]) ) value_input.value = ""; // avoid to pass NaN value!


			//	Before change the editor[key] value add an undo state in undo queue.
			//	Until now we was adding to undo after the value has changed. (FIXED!)

				function updateFloatRotationValue(){
					var step = 0.1 * Math.PI/180; // 0.1 deg.
					var min = -Math.PI, max = Math.PI;
					var value = Number(editor[ key ]); // get value from editor, rad.
					if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN editor[key] value.
					if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max ); // rad.
					if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max ); // rad.
				//	Bypass watcher.
					if ( value !== state.value ) 
						interval = setTimeout( function(){ 
							state.json && undo.unshift( state.json ); // Add to undo.
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
							button.addEventListener( "mousedown", onfirstMouseDown ); // important!
						}, 250);
				//	update editor value.
					editor[ key ] = value; value_input.value = (RAD2DEG*editor[key]).toFixed(1); // display.
				}

				function updateFloatNumberValue(min, max, step){
					var value = Number(editor[ key ]); // get value from editor.
					if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN editor[key] value.
					if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
				//	Bypass watcher.
					if ( value !== state.value ) 
						interval = setTimeout( function(){ 
							state.json && undo.unshift( state.json ); // Add to undo.
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
							button.addEventListener( "mousedown", onfirstMouseDown ); // important!
						}, 250);
				//	update editor value.
					editor[ key ] = value; value_input.value = editor[key].toFixed(2); // display.
				}

				function updateIntegerNumberValue(min, max){
					var value = parseInt(editor[ key ]); // get value from editor.
					if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN editor[key] value.
					if ( button === increase_v ) value = THREE.Math.clamp( ++value, min, max );
					if ( button === decrease_v ) value = THREE.Math.clamp( --value, min, max );
				//	Bypass watcher.
					if ( value !== state.value ) interval = setTimeout( function(){ 
						state.json && undo.unshift( state.json ); // Add to undo.
						debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
						button.addEventListener( "mousedown", onfirstMouseDown ); // important!
					}, 250);
				//	update editor value.
					value_input.value = editor[ key ] = value; // display.
				}

				function updateConstantStringValue( values ){
					var min = 0, max = values.length;
					var value = editor[ key ]; // string.
					var index = values.findIndex(function( item ){ return item === value; });
					if ( button === increase_v ) value = values[ ( ++index % max + max ) % max ]; // mod();
					if ( button === decrease_v ) value = values[ ( --index % max + max ) % max ]; // mod();
				//	Bypass watcher.
					if ( value !== state.value ) 
						interval = setTimeout( function(){ 
							state.json && undo.unshift( state.json ); // Add to undo.
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
							button.addEventListener( "mousedown", onfirstMouseDown ); // important!
						}, 250);
				//	update editor value.
					text_input.value = editor[ key ] = value; // display.
				}

				function updateConstantNumberValue( values ){
					var min = 0, max = values.length;
					var value = Number(editor[ key ]); // get value from editor.
					var index = values.findIndex(function( item ){ return item === value; });
					if ( button === increase_v ) value = values[ ( ++index % max + max ) % max ]; // mod();
					if ( button === decrease_v ) value = values[ ( --index % max + max ) % max ]; // mod();
				//	Bypass watcher.
					if ( value !== state.value ) 
						interval = setTimeout( function(){ 
							state.json && undo.unshift( state.json ); // Add to undo.
							debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
							button.addEventListener( "mousedown", onfirstMouseDown ); // important!
						}, 250);
				//	update editor value.
					value_input.value = editor[ key ] = value; // display.
				}

				switch ( key ){

				//	string:
					case "name":
					case "type":
						text_input.value = editor[ key ]; // disabled on mouse click.
					break;

					case "uuid": 
					//	Bypass watcher.
						(function(){
							var value = THREE.Math.generateUUID(); // string
						//	Bypass watcher.
							if ( value !== state.value ) 
								interval = setTimeout( function(){ 
									state.json && undo.unshift( state.json ); // Add to undo.
									debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
									button.addEventListener( "mousedown", onfirstMouseDown ); // important!
								}, 250);
						//	update editor value.
							text_input.value = editor[ key ] = value; // display.
						})();
					break;

					case "linecap":
					case "wireframeLinecap":
						updateConstantStringValue(["butt","round","square"]);
					break;
					case "linejoin":
						updateConstantStringValue(["bevel","round","miter"]);
					break;
					case "precision":
						updateConstantStringValue(["highp","mediump","lowp"]);
					break;

				//	boolean:
					case "fog":
					case "lights":
					case "flatShading":
					case "transparent":
					case "depthTest":
					case "depthWrite":
					case "clipIntersection":
					case "clipShadows":
					case "colorWrite":
					case "polygonOffset":
					case "dithering":
					case "premultipliedAlpha":
					case "visible":
					case "wireframe":
					case "skinning":
					case "morphTargets":
					case "morphNormals":
				//	case "needsUpdate":
					case "sizeAttenuation":
					//	Bypass watcher.
						(function(){
							var value = !editor[ key ]; // boolean.
						//	Bypass watcher.
							if ( value !== state.value ) 
								interval = setTimeout( function(){ 
									state.json && undo.unshift( state.json ); // Add to undo.
									debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
									button.addEventListener( "mousedown", onfirstMouseDown ); // important!
								}, 250);
						//	update editor value.
							value_input.value = editor[ key ] = value; // display.
						})();
					break;

				//	number:
					case "blending":
						updateConstantNumberValue([
							THREE.NoBlending,THREE.NormalBlending,THREE.AdditiveBlending,
							THREE.SubtractiveBlending,THREE.MultiplyBlending,THREE.CustomBlending
						]);
					break;
					case "side":
						updateConstantNumberValue([THREE.FrontSide,THREE.BackSide,THREE.DoubleSide]);
					break;
					case "vertexColors":
						updateConstantNumberValue([THREE.NoColors,THREE.FaceColors,THREE.VertexColors]);
					break;
					case "blendDst":
					case "blendSrc":
						updateConstantNumberValue([THREE.ZeroFactor,THREE.OneFactor,THREE.SrcColorFactor,
							THREE.OneMinusSrcColorFactor,THREE.SrcAlphaFactor,THREE.OneMinusSrcAlphaFactor,
							THREE.DstAlphaFactor,THREE.OneMinusDstAlphaFactor,THREE.DstColorFactor,
							THREE.OneMinusDstColorFactor,THREE.SrcAlphaSaturateFactor
						]);
					break;
					case "blendEquation":
						updateConstantNumberValue([THREE.AddEquation,THREE.SubtractEquation,
							THREE.ReverseSubtractEquation,THREE.MinEquation,THREE.MaxEquation
						]);
					break;
					case "depthFunc":
						updateConstantNumberValue([THREE.NeverDepth,THREE.AlwaysDepth,THREE.LessDepth,
							THREE.LessEqualDepth,THREE.GreaterEqualDepth,THREE.GreaterDepth,THREE.NotEqualDepth
						]);
					break;
					case "normalMapType":
						updateConstantNumberValue([THREE.TangentSpaceNormalMap,THREE.ObjectSpaceNormalMap]);
					break;
					case "combine":
						updateConstantNumberValue([THREE.MultiplyOperation,THREE.MixOperation,THREE.AddOperation]);
					break;
				//
					case "polygonOffsetUnits":
					case "polygonOffsetFactor":
						updateIntegerNumberValue(-100, 100);
					break;
					case "displacementScale":
						updateFloatNumberValue(-100, 100, 1/100);
					break;
					case "bumpScale":
					case "metalness":
					case "roughness":
					case "displacementBias":
						updateFloatNumberValue(-10, 10, 1/100);
					break;
					case "refractionRatio":
						updateFloatNumberValue(-1, 1, 1/100);
					break;
					case "opacity":
					case "overdraw":
					case "alphaTest":
					case "reflectivity":
					case "wireframeLinewidth":
						updateFloatNumberValue(0, 1, 1/100);
					break;
					case "linewidth":
					case "aoMapIntensity":
					case "envMapIntensity":
					case "emissiveIntensity":
					case "lightMapIntensity":
						updateFloatNumberValue(0, 100, 1/100);
					break;
					case "depthPacking":
						//	???
					break;
					case "size":
					case "scale":
					case "gapSize":
					case "dashSize":
					case "shininess":
						updateFloatNumberValue(0, 1000, 1/100);
					break;
					case "rotation":
						updateFloatRotationValue();
					break;

					default:
						value_input.value = editor[key] || ""; // disabled on mouse click.
					break;
				}

				debugMode && console.log( "on Mouse Click:", interval );

			//	call watcher to add undo.
			//	interval = setTimeout( function(){
			//		watchValue.value = editor[ key ];
			//	}, 250);

			}

		})();

	//	vector mouse inputs.

		(function(){

			var interval;

		//	First "mousedown" event (mousedown, onWatchValue ) eventListener, sets the values in 
		//	the "watchValue" object and the ( mousedown, onWatchValue ) eventListener is removed.
		//	Last "click" event ( click, onMouseClick ) eventListener, changes the watchValue.value 
		//	and calls the watcher, which restore the (mousedown, onWatchValue ) eventListener.

			var watchValue = {
				entity:undefined, // material.id,
				button:undefined, // current button.
				key:undefined,    // editor key,
				value:undefined,  // editor[key].x
			};

		//	Initialize watchValue.
			watch( entity_droplist, "onchange", function( property, event, id ){
			//	debugMode && console.log({item:"droplist",event:event,"value":id});
			//	watchValue.button = increase_x; watchValue.key = vector_droplist.value;
			//	watchValue.value = editor[vector_droplist.value].x; watchValue.entity = id; 
			});

		//	Will trigger when clicking has finished (and value has changed).
			watch( watchValue, "value", function( prop, action, value, oldValue ){
				debugMode && console.log({ event:"on click end", "new value":value, "old value":oldValue });

				if ( watchValue.button == null ) return;
				if ( entity_droplist.value === "" ) return;

			//	Add event listener.
				watchValue.button && watchValue.button.addEventListener( "mousedown", onWatchValue ); // important!

			//	Add to undo.
				entity_droplist.value && addtoUndo(); // add to undo.
				debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
			});

		//	keep first, ignore next events.
			increase_x.addEventListener( "mousedown", onWatchValue );
			decrease_x.addEventListener( "mousedown", onWatchValue );

			function onWatchValue(){

				var button = this;
				if ( entity_droplist.value === "" ) return;
				if ( vector_droplist.value === "" ) return;

				watchValue.button = button;
				watchValue.key = vector_droplist.value;
				watchValue.entity = parseInt(entity_droplist.value);
				watchValue.value = editor[vector_droplist.value].x; // editor[key].x
				button.removeEventListener( "mousedown", onWatchValue ); // important!
			}

			increase_x.addEventListener( "mousedown", onMouseDown );
			decrease_x.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
			//	debugMode && console.log( "on MouseUp:", interval );
				clearTimeout( interval ); // important!
			});

			increase_x.addEventListener( "click", onMouseClick );
			decrease_x.addEventListener( "click", onMouseClick );

			function onMouseDown(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse down.

				if ( vector_droplist.value === "" ) return;

			//	enabled on mouse down.

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function update() {

					var key = vector_droplist.value;
					var step = 1/100, min = -100, max = 100;

					var value = Number(editor[ key ].x); // get value from editor.
					if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
					vector_x.value = ( editor[ key ].x = round(value, 2) ).toFixed(2);

					var dt = clock.getDelta();
					interval = setTimeout( update, dt );
				//	debugMode && console.log( "on Update:", interval );


				}, 500);

			}

			function onMouseClick(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse click.

				if ( vector_droplist.value === "" ) return;

			//	enabled on mouse click.

				var button = this;
				var key = vector_droplist.value;
				var step = 1/100, min = -100, max = 100;

				var value = Number(editor[ key ].x); // get value from editor.
				if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
				if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
				vector_x.value = ( editor[ key ].x = round(value, 2) ).toFixed(2);

				debugMode && console.log( "on Mouse Click:", interval );

			//	call watcher to add undo.
				interval = setTimeout( function(){
					watchValue.value = editor[key].x;
				}, 250);

			}

		})();

		(function(){

			var interval;

			var watchValue = {
				entity:undefined, // material.id,
				button:undefined, // current button.
				key:undefined,    // editor key,
				value:undefined,  // editor[key].y
			};

		//	Initialize watchValue.
			watch( entity_droplist, "onchange", function( property, event, id ){
			//	debugMode && console.log({item:"droplist",event:event,"value":id});
			//	watchValue.button = increase_y; watchValue.key = vector_droplist.value;
			//	watchValue.value = editor[vector_droplist.value].y; watchValue.entity = id; 
			});

		//	Will trigger when clicking has finished (and value has changed).
			watch( watchValue, "value", function( prop, action, value, oldValue ){
				debugMode && console.log({ event:"on click end", "new value":value, "old value":oldValue });

				if ( watchValue.button == null ) return;
				if ( entity_droplist.value === "" ) return;

			//	Add event listener.
				watchValue.button && watchValue.button.addEventListener( "mousedown", onWatchValue ); // important!

			//	Add to undo.
				entity_droplist.value && addtoUndo(); // add to undo.
				debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
			});

		//	keep first, ignore next events.
			increase_y.addEventListener( "mousedown", onWatchValue );
			decrease_y.addEventListener( "mousedown", onWatchValue );

			function onWatchValue(){

				var button = this;
				if ( entity_droplist.value === "" ) return;
				if ( vector_droplist.value === "" ) return;

				watchValue.button = button;
				watchValue.key = vector_droplist.value;
				watchValue.entity = parseInt(entity_droplist.value);
				watchValue.value = editor[vector_droplist.value].y; // editor[key].y
				button.removeEventListener( "mousedown", onWatchValue ); // important!
			}

			increase_y.addEventListener( "mousedown", onMouseDown );
			decrease_y.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
			//	debugMode && console.log( "on MouseUp:", interval );
				clearTimeout( interval ); // important!
			});

			increase_y.addEventListener( "click", onMouseClick );
			decrease_y.addEventListener( "click", onMouseClick );

			function onMouseDown(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse down.

				if ( vector_droplist.value === "" ) return;
				//	return [ vector_x.value, vector_y.value ] = ["",""];

			//	enabled on mouse down.

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function update() {

					var key = vector_droplist.value;
					var step = 1/100, min = -100, max = 100;

					var value = Number(editor[ key ].y); // get value from editor.
					if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
					vector_y.value = ( editor[ key ].y = round(value, 2) ).toFixed(2);

					var dt = clock.getDelta();
					interval = setTimeout( update, dt );
				//	debugMode && console.log( "on Update:", interval );

				}, 500);

			}

			function onMouseClick(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse click.

				if ( vector_droplist.value === "" ) return;
				//	return [ vector_x.value, vector_y.value ] = ["",""];

			//	enabled on mouse click.

				var button = this;
				var key = vector_droplist.value;
				var step = 1/100, min = -100, max = 100;

				var value = Number(editor[ key ].y); // get value from editor.
				if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
				if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
				vector_y.value = ( editor[ key ].y = round(value, 2) ).toFixed(2);

				debugMode && console.log( "on Mouse Click:", interval );

			//	call watcher to add undo.
				interval = setTimeout( function(){
					watchValue.value = editor[key].y;
				}, 250);

			}

		})();

	//	color mouse inputs.

		(function(){

			var interval;

		//	First "mousedown" event (mousedown, onWatchValue ) eventListener, sets the values in 
		//	the "watchValue" object and the ( mousedown, onWatchValue ) eventListener is removed.
		//	Last "click" event ( click, onMouseClick ) eventListener, changes the watchValue.value 
		//	and calls the watcher, which restore the (mousedown, onWatchValue ) eventListener.

			var watchValue = {
				entity:undefined, // material.id,
				button:undefined, // current button.
				key:undefined,    // editor key,
				value:undefined,  // editor[key].r
			};

		//	Initialize watchValue.
			watch( entity_droplist, "onchange", function( property, event, id ){
			//	debugMode && console.log({item:"droplist",event:event,"value":id});
			//	watchValue.button = increase_r; watchValue.key = color_droplist.value;
			//	watchValue.value = editor[color_droplist.value].r; watchValue.entity = id; 
			});

		//	Will trigger when clicking has finished (and value has changed).
			watch( watchValue, "value", function( prop, action, value, oldValue ){
				debugMode && console.log({ event:"on click end", "new value":value, "old value":oldValue });

				if ( watchValue.button == null ) return;
				if ( entity_droplist.value === "" ) return;

			//	Add event listener.
				watchValue.button && watchValue.button.addEventListener( "mousedown", onWatchValue ); // important!

			//	Add to undo.
				entity_droplist.value && addtoUndo(); // add to undo.
				debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
			});

		//	keep first, ignore next events.
			increase_r.addEventListener( "mousedown", onWatchValue );
			decrease_r.addEventListener( "mousedown", onWatchValue );

			function onWatchValue(){

				var button = this;
				if ( entity_droplist.value === "" ) return;
				if ( color_droplist.value  === "" ) return;

				watchValue.button = button;
				watchValue.key = color_droplist.value;
				watchValue.entity = parseInt(entity_droplist.value); // material.id,
				watchValue.value = editor[color_droplist.value].r;   // editor[key].r
				button.removeEventListener( "mousedown", onWatchValue ); // important!
			}

			increase_r.addEventListener( "mousedown", onMouseDown );
			decrease_r.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
			//	debugMode && console.log( "on MouseUp:", interval );
				clearTimeout( interval ); // important!
			});

			increase_r.addEventListener( "click", onMouseClick );
			decrease_r.addEventListener( "click", onMouseClick );

			function onMouseDown(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse down.

				if ( color_droplist.value === "" ) return;

			//	enabled on mouse down.

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function update() {

					var key = color_droplist.value;
					var min = 0, max = 1, step = 1/255;

					var value = Number(editor[ key ].r); // get value from editor.
					if ( button === increase_r ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_r ) value = THREE.Math.clamp( value-step, min, max );
					color_r.value = parseInt( 255 * ( editor[ key ].r = value ));

					var dt = clock.getDelta();
					interval = setTimeout( update, dt );
				//	debugMode && console.log( "on Update:", interval );

				}, 500);

			}

			function onMouseClick(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse click.

				if ( color_droplist.value === "" ) return;

			//	enabled on mouse click.

				var button = this;
				var key = color_droplist.value;
				var min = 0, max = 1, step = 1/255;

				var value = Number(editor[ key ].r); // get value from editor.
				if ( button === increase_r ) value = THREE.Math.clamp( value+step, min, max );
				if ( button === decrease_r ) value = THREE.Math.clamp( value-step, min, max );
				color_r.value = parseInt( 255 * ( editor[ key ].r = value ));

				debugMode && console.log( "on Mouse Click:", interval );

			//	call watcher to add undo.
				interval = setTimeout( function(){
					watchValue.value = editor[key].r;
				}, 250);

			}

		})();

		(function(){

			var interval;

			var watchValue = {
				entity:undefined, // material.id,
				button:undefined, // current button.
				key:undefined,    // editor key,
				value:undefined,  // editor[key].g
			};

		//	Initialize watchValue.
			watch( entity_droplist, "onchange", function( property, event, id ){
			//	debugMode && console.log({item:"droplist",event:event,"value":id});
			//	watchValue.button = increase_g; watchValue.key = color_droplist.value;
			//	watchValue.value = editor[color_droplist.value].g; watchValue.entity = id; 
			});

		//	Will trigger when clicking has finished (and value has changed).
			watch( watchValue, "value", function( prop, action, value, oldValue ){
				debugMode && console.log({ event:"on click end", "new value":value, "old value":oldValue });

				if ( watchValue.button == null ) return;
				if ( entity_droplist.value === "" ) return;

			//	Add event listener.
				watchValue.button && watchValue.button.addEventListener( "mousedown", onWatchValue ); // important!

			//	Add to undo.
				entity_droplist.value && addtoUndo(); // add to undo.
				debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
			});

		//	keep first, ignore next events.
			increase_g.addEventListener( "mousedown", onWatchValue );
			decrease_g.addEventListener( "mousedown", onWatchValue );

			function onWatchValue(){

				var button = this;
				if ( entity_droplist.value === "" ) return;
				if ( color_droplist.value  === "" ) return;

				watchValue.button = button;
				watchValue.key = color_droplist.value;
				watchValue.entity = parseInt(entity_droplist.value); // material.id,
				watchValue.value = editor[color_droplist.value].g;   // editor[key].g
				button.removeEventListener( "mousedown", onWatchValue ); // important!
			}

			increase_g.addEventListener( "mousedown", onMouseDown );
			decrease_g.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
			//	debugMode && console.log( "on MouseUp:", interval );
				clearTimeout( interval ); // important!
			});

			increase_g.addEventListener( "click", onMouseClick );
			decrease_g.addEventListener( "click", onMouseClick );

			function onMouseDown(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse down.

				if ( color_droplist.value === "" ) return;

			//	enabled on mouse down.

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function update() {

					var key = color_droplist.value;
					var min = 0, max = 1, step = 1/255;

					var value = Number(editor[ key ].g); // get value from editor.
					if ( button === increase_g ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_g ) value = THREE.Math.clamp( value-step, min, max );
					color_g.value = parseInt( 255 * ( editor[ key ].g = value ));

					var dt = clock.getDelta();
					interval = setTimeout( update, dt );
				//	debugMode && console.log( "on Update:", interval );

				}, 500);

			}

			function onMouseClick(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse click.

				if ( color_droplist.value === "" ) return;

			//	enabled on mouse click.

				var button = this;
				var key = color_droplist.value;
				var min = 0, max = 1, step = 1/255;

				var value = Number(editor[ key ].g); // get value from editor.
				if ( button === increase_g ) value = THREE.Math.clamp( value+step, min, max );
				if ( button === decrease_g ) value = THREE.Math.clamp( value-step, min, max );
				color_g.value = parseInt( 255 * ( editor[ key ].g = value ));

				debugMode && console.log( "on Mouse Click:", interval );

			//	call watcher to add undo.
				interval = setTimeout( function(){
					watchValue.value = editor[key].g;
				}, 250);

			}

		})();

		(function(){

			var interval;

			var watchValue = {
				entity:undefined, // material.id,
				button:undefined, // current button.
				key:undefined,    // editor key,
				value:undefined,  // editor[key].b
			};

		//	Initialize watchValue.
			watch( entity_droplist, "onchange", function( property, event, id ){
			//	debugMode && console.log({item:"droplist",event:event,"value":id});
			//	watchValue.button = increase_b; watchValue.key = color_droplist.value;
			//	watchValue.value = editor[color_droplist.value].b; watchValue.entity = id; 
			});

		//	Will trigger when clicking has finished (and value has changed).
			watch( watchValue, "value", function( prop, action, value, oldValue ){
				debugMode && console.log({ event:"on click end", "new value":value, "old value":oldValue });

				if ( watchValue.button == null ) return;
				if ( entity_droplist.value === "" ) return;

			//	Add event listener.
				watchValue.button && watchValue.button.addEventListener( "mousedown", onWatchValue ); // important!

			//	Add to undo.
				entity_droplist.value && addtoUndo(); // add to undo.
				debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
			});

		//	keep first, ignore next events.
			increase_b.addEventListener( "mousedown", onWatchValue );
			decrease_b.addEventListener( "mousedown", onWatchValue );

			function onWatchValue(){

				var button = this;
				if ( entity_droplist.value === "" ) return;
				if ( color_droplist.value  === "" ) return;

				watchValue.button = button;
				watchValue.key = color_droplist.value;
				watchValue.entity = parseInt(entity_droplist.value); // material.id,
				watchValue.value = editor[color_droplist.value].b;   // editor[key].b
				button.removeEventListener( "mousedown", onWatchValue ); // important!
			}

			increase_b.addEventListener( "mousedown", onMouseDown );
			decrease_b.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
			//	debugMode && console.log( "on MouseUp:", interval );
				clearTimeout( interval ); // important!
			});

			increase_b.addEventListener( "click", onMouseClick );
			decrease_b.addEventListener( "click", onMouseClick );

			function onMouseDown(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse down.

				if ( color_droplist.value === "" ) return;

			//	enabled on mouse down.

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function update() {

					var key = color_droplist.value;
					var min = 0, max = 1, step = 1/255;

					var value = Number(editor[ key ].b); // get value from editor.
					if ( button === increase_b ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_b ) value = THREE.Math.clamp( value-step, min, max );
					color_b.value = parseInt( 255 * ( editor[ key ].b = value ));

					var dt = clock.getDelta();
					interval = setTimeout( update, dt );
				//	debugMode && console.log( "on Update:", interval );

				}, 500);

			}

			function onMouseClick(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse click.

				if ( color_droplist.value === "" ) return;

			//	enabled on mouse click.

				var button = this;
				var key = color_droplist.value;
				var min = 0, max = 1, step = 1/255;

				var value = Number(editor[ key ].b); // get value from editor.
				if ( button === increase_b ) value = THREE.Math.clamp( value+step, min, max );
				if ( button === decrease_b ) value = THREE.Math.clamp( value-step, min, max );
				color_b.value = parseInt( 255 * ( editor[ key ].b = value ));

				debugMode && console.log( "on Mouse Click:", interval );

			//	call watcher to add undo.
				interval = setTimeout( function(){
					watchValue.value = editor[key].b;
				}, 250);

			}

		})();

	//	Material Editor Watchers.
	//	Watch each object/property individually.
	//	Synchronize material with material editor (brige).
	//	KEEP IN MIND: watchers update only if the value has been changed.

		(function( editor ){

			var interval;
			var material; // important!

			watch( entity_droplist, "onchange", function( property, event, value ){
				material = material_entities.getMaterialById( value ); // material.id.
				debugMode && console.log({item:"droplist",event:event,"material":material});
			});

		//	Vector.
			watch( editor.normalScale, ["x","y"], function( v, action, value ){
				if (material && material.normalScale) material.normalScale[v] = Number(editor.normalScale[v]); // copy.
			});

		//	Colors.
			watch( editor.color, ["r","g","b"], function( c, action, value ){
				if (material && material.color) material.color[c] = Number(editor.color[c]); // copy.
			});
			watch( editor.emissive, ["r","g","b"], function( c, action, value ){
				if (material && material.emissive) material.emissive[c] = Number(editor.emissive[c]); // copy.
			});
			watch( editor.specular, ["r","g","b"], function( c, action, value ){
				if (material && material.specular) material.specular[c] = Number(editor.specular[c]); // copy.
			});

		//	String.
			watch( editor, "name", function( key, action, value ){
				if ( material ) material[key] = String(editor[key]); // copy.
			});
			watch( editor, "uuid", function( key, action, value ){
				if ( material ) material[key] = String(editor[key]); // copy.
			});


		//	Values.
			watch( editor, "side", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});
			watch( editor, "visible", function( key, action, value ){
				if ( material ) material[key] = Boolean(editor[key]); // copy.
			});
			watch( editor, "opacity", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});
			watch( editor, "alphaTest", function( key, action, value ){
				if ( material ) material[key] = Boolean(editor[key]); // copy.
			});
			watch( editor, "transparent", function( key, action, value ){
				if ( material ) material[key] = Boolean(editor[key]); // copy.
			});
			watch( editor, "premultipliedAlpha", function( key, action, value ){
				if ( material ) material[key] = Boolean(editor[key]); // copy.
			});

			watch( editor, "fog", function( key, action, value ){
				if ( material ) material[key] = Boolean(editor[key]); // copy.
			});
			watch( editor, "lights", function( key, action, value ){
				if ( material ) material[key] = Boolean(editor[key]); // copy.
			});
			watch( editor, "dithering", function( key, action, value ){
				if ( material ) material[key] = Boolean(editor[key]); // copy.
			});
			watch( editor, "colorWrite", function( key, action, value ){
				if ( material ) material[key] = Boolean(editor[key]); // copy.
			});
			watch( editor, "flatShading", function( key, action, value ){
				if ( material ) material[key] = Boolean(editor[key]); // copy.
			});

			watch( editor, "overdraw", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});
			watch( editor, "vertexColors", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});
			watch( editor, "blending", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});
			watch( editor, "blendSrc", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});
			watch( editor, "blendDst", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});
			watch( editor, "blendEquation", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});
			watch( editor, "blendSrcAlpha", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});
			watch( editor, "blendDstAlpha", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});
			watch( editor, "blendEquationAlpha", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});
			watch( editor, "depthFunc", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});

			watch( editor, "wireframe", function( key, action, value ){
				if ( material ) material[key] = Boolean(editor[key]); // copy.
			});
			watch( editor, "wireframeLinecap", function( key, action, value ){
				if ( material ) material[key] = String(editor[key]); // copy.
			});
			watch( editor, "wireframeLinejoin", function( key, action, value ){
				if ( material ) material[key] = String(editor[key]); // copy.
			});
			watch( editor, "wireframeLinewidth", function( key, action, value ){
				if ( material ) material[key] = Number(editor[key]); // copy.
			});

			watch( editor, "precision", function( key, action, value ){
				if ( material ) material[key] = String(editor[key]); // copy.
			});

		//	Material needsUpdate button.

			watch( editor, "needsUpdate", function( key, action, value ){
				if ( material ) material[key] = Boolean(editor[key]); // copy.
			});
			needsUpdate_button.addEventListener( "click", function(){
				if ( material ) material.needsUpdate = true;
			});

		})( editor.reset() ); // important! (reset initializes editor)

		return editor; // important!

	})();






































/*
//	MaterialEditor.js

//	Create a Material to hold editor values.

	const materialEditor = (function(){

	//	UndoArray Class (extends Array class).

		function UndoArray(){
			var array = new Array(0);
			Object.setPrototypeOf( array, UndoArray.prototype );
			return array; // important!
		}

		UndoArray.prototype = Object.create(Array.prototype); // important!
		UndoArray.prototype.clear = function(){ this.length = 0; };
		UndoArray.prototype.move = array_move.bind(UndoArray.prototype); // TO BE TESTED!!!

		const undo = new UndoArray(); debugMode && console.log( {"undo": undo} );
		const redo = new UndoArray(); debugMode && console.log( {"redo": redo} );

		const RAD2DEG = THREE.Math.RAD2DEG;
		const DEG2RAD = THREE.Math.DEG2RAD;

	//	droplists.

		const key_droplist = document.getElementById("material-keys-droplist");
		const type_droplist = document.getElementById("material-type-droplist");
		const color_droplist = document.getElementById("material-color-droplist");
		const vector_droplist = document.getElementById("material-vector-droplist");
		const entity_droplist = document.getElementById("material-entities-droplist");
		const texture_droplist = document.getElementById("material-map-droplist");

	//	mouse inputs.

		const increase_v = document.getElementById("material-value-increase");
		const decrease_v = document.getElementById("material-value-decrease");
		const increase_x = document.getElementById("material-vector-x-increase");
		const increase_y = document.getElementById("material-vector-y-increase");
		const decrease_x = document.getElementById("material-vector-x-decrease");
		const decrease_y = document.getElementById("material-vector-y-decrease");

		const increase_r = document.getElementById("material-color-r-increase");
		const increase_g = document.getElementById("material-color-g-increase");
		const increase_b = document.getElementById("material-color-b-increase");
		const decrease_r = document.getElementById("material-color-r-decrease");
		const decrease_g = document.getElementById("material-color-g-decrease");
		const decrease_b = document.getElementById("material-color-b-decrease");

	//	keyboard inputs.

		const color_r = document.getElementById("material-color-r-input");
		const color_g = document.getElementById("material-color-g-input");
		const color_b = document.getElementById("material-color-b-input");
		const vector_x = document.getElementById("material-vector-x-input");
		const vector_y = document.getElementById("material-vector-y-input");
		const text_input  = document.getElementById("material-text-input");
		const value_input = document.getElementById("material-value-input");

	//	material tab buttons.

		const exit_button = document.getElementById("material-exit-mode");
		const redo_button = document.getElementById("material-redo-button");
		const undo_button = document.getElementById("material-undo-button");
		const clone_button = document.getElementById("clone-material-button");
		const create_button = document.getElementById("create-material-button");
		const remove_button = document.getElementById("remove-material-button");

	//	MaterialEditor class (extends THREE.MeshStandardMaterial Class).
	//	A THREE.Material that holds editor values. Extends THREE.Material.

		const editor = (function(){

			var interval;

			function MaterialEditor(){
				var material = new THREE.Material();
				Object.setPrototypeOf( material, MaterialEditor.prototype );
				return material; // important!
			}

			MaterialEditor.prototype = Object.create(THREE.Material.prototype); // important!

			MaterialEditor.prototype.copy = function( source ){ 
				THREE[ source.type ].prototype.copy.call( this, source ); // important!
				return this;
			};

			MaterialEditor.prototype.reset = function(){ 

				var source = new THREE.MeshStandardMaterial();

				var keys = "";
				keys += "color,emissive,specular,normalScale,displacementScale,";
				keys += "name,type,uuid,side,opacity,alphaTest,transparent,premultipliedAlpha,";
				keys += "fog,lights,visible,overdraw,dithering,precision,colorWrite,flatShading,vertexColors,";
				keys += "blending,blendSrc,blendDst,blendEquation,blendSrcAlpha,blendDstAlpha,blendEquationAlpha,";
				keys += "depthFunc,depthTest,depthWrite,shadowSide,clipShadows,clipIntersection,";
				keys += "polygonOffset,polygonOffsetUnits,polygonOffsetFactor,";
				keys += "map,aoMap,envMap,bumpMap,alphaMap,lightMap,normalMap,specularMap,";
				keys += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap,";
				keys += "metalness,roughness,bumpScale,reflectivity,";
				keys += "refractionRatio,displacementBias,normalMapType,";
				keys += "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,";
				keys += "wireframe,wireframeLinecap,wireframeLinejoin,wireframeLinewidth,";
				keys += "skinning,morphTargets,morphNormals,combine,shininess,";
				keys += "depthPacking,scale,gapSize,linecap,linejoin,linewidth,";
				keys += "dashSize,size,rotation,sizeAttenuation";

				keys.split(",").forEach(function( key ){
					switch ( key ){

						case "name":
							editor.name = "editor";
						break;

						case "color":
							if ( editor[ key ] === undefined )
								editor[ key ] = new THREE.Color(1,1,1);
							else
								editor[ key ].setRGB(1,1,1);
						break;

						case "emissive":
						case "specular":
							if ( editor[ key ] === undefined )
								editor[ key ] = new THREE.Color(0,0,0);
							else
								editor[ key ].setRGB(0,0,0);
						break;

						case "normalScale":
							if ( editor[ key ] === undefined )
								editor[ key ] = new THREE.Vector2(1,1);
							else
								editor[ key ].set(1,1);
						break;

						default:
							editor[ key ] = source[ key ];
						break;

						case "clippingPlanes": {

							var srcPlanes = source.clippingPlanes,
								dstPlanes = null;

							if ( srcPlanes !== null ) {

								var n = srcPlanes.length;
								dstPlanes = new Array( n );

								for ( var i = 0; i !== n; ++ i )
									dstPlanes[ i ] = srcPlanes[ i ].clone();

							}

							editor.clippingPlanes = dstPlanes;

						} break;

						case "userData":
							editor.userData = JSON.parse( JSON.stringify( source.userData ) );
						break;

					}
				});

			//	debugMode && console.log("reset:", {"editor": editor});

				return this;
			};

			MaterialEditor.prototype.fromJSON = function( json ){
			//	param: a texture json {object}

				var editor = this;

				var loader = new THREE.MaterialLoader();
				var material = loader.parse( json );
				debugMode && console.log( material );

				editor.reset(); // important!

				editor.copy( material );
				editor.type = material.type;
				editor.uuid = material.uuid;

			};

			MaterialEditor.prototype.undo = function(){

				var editor = this;

				if ( !undo.length ) return;

			//	Get undo json.
				var json = undo.shift();

				if ( !json ) return;

			//	Move json to redo.
				redo.unshift( json );

				clearTimeout( interval );
				interval = setTimeout( function(){

				//	Copy material state (undo).
					editor.fromJSON( json ); // update.

					debugMode && console.log( "undo:", undo.length, "redo:", redo.length );

				}, 250);

			};

			MaterialEditor.prototype.redo = function(){

				var editor = this;

				if ( !redo.length ) return;

			//	Get redo json.
				var json = redo.shift();

				if ( !json ) return;

			//	Move json to undo.
				undo.unshift( json );

				clearTimeout( interval );
				interval = setTimeout( function(){

				//	Copy texture state (redo).
					editor.fromJSON( json ); // update.

					debugMode && console.log( "undo:", undo.length, "redo:", redo.length );

				}, 250);
			};

			MaterialEditor.prototype.update = function( value ){

			//	Copies the values of the target material of material
			//	entity manager. Does not updates the target material.
			//	dependences: material_entities {material manager},
			//	param: a material id {string or number},

				var editor = this;

				editor.reset(); // important!

			//	get target material.
				var material = material_entities.getMaterialById( value );
			//	debugMode && console.log( "editor material:", material );

				if ( !material ) {
					editor.reset();
					console.log("editor update:", false);
					return false; // important!
				}

			//	copy material (update).
				editor.copy( material );
				editor.type = material.type;
				editor.uuid = material.uuid;

			//	return true.
				console.log("editor update:", true);
				return true; // important!

			};

			return new MaterialEditor();

		})();

	//	editor.reset(); // important!

	//	helpers.

		function getObjectByEntityId( value ){

			var entities_droplist = document.getElementById("entities-droplist"); // important!

			if ( arguments.length ) 
				var id = parseInt( value );
			else
				var id = parseInt( entities_droplist.value );

			if ( id === NaN ) return;

			return scene.getObjectById( id );
		}

		function getMaterialByEntityId( value ){

			var material_droplist = document.getElementById("material-entities-droplist"); // important!

			if ( arguments.length ) 
				var id = parseInt( value );
			else
				var id = parseInt( material_droplist.value );

			if ( id === NaN ) return;

			return material_entities.find( function( material ){
				return material.id === id;
			});
		}

	//	add to undo/redo.

		function addtoUndo(){
			var json = editor.toJSON();
			json && undo.unshift( json );
			return;
		}

		function clearUndoRedo(){
			undo.clear();
			redo.clear();
			return;
		}

		function resetUIValues(){
			color_r.value = "";
			color_g.value = "";
			color_b.value = "";
			vector_x.value = "";
			vector_y.value = "";
			text_input.value = "";
			value_input.value = "";
			key_droplist.value = "";
			color_droplist.value = "";
			vector_droplist.value = "";
			entity_droplist.value = "";
			return;
		}

	//	exit from edit mode.

		function exitFromEditMode(){
			editor.reset();
			resetUIValues();
			clearUndoRedo();
			return;
		}

	//	Undo/Redo/Exit buttons.

		(function(){

			var interval;

			exit_button.addEventListener( "click", function(){
				clearTimeout( interval ); 
				interval = setTimeout( exitFromEditMode, 250);
			});

			undo_button.addEventListener( "click", function(){
				debugMode && console.log("undo:",undo.length,"redo:",redo.length);
				if ( !entity_droplist.value ) clearUndoRedo();
				else undo.length && editor.undo(); // undo.
			});

			redo_button.addEventListener( "click", function(){
				debugMode && console.log("undo:",undo.length,"redo:",redo.length);
				if ( !entity_droplist.value ) clearUndoRedo();
				else redo.length && editor.redo(); // redo.
			});

		})();

	//	Tab droplists.

		(function(){

			key_droplist.addEventListener( "change", key_droplist.blur );
			color_droplist.addEventListener( "change", color_droplist.blur );
			vector_droplist.addEventListener( "change", vector_droplist.blur );
			entity_droplist.addEventListener( "change", entity_droplist.blur );
			texture_droplist.addEventListener( "change", texture_droplist.blur );

			watch( key_droplist, "onchange", function( property, event, key ){

				if ( key && editor[key] !== undefined && typeof editor[key] === "string" )
					[text_input.value, value_input.value] = [ editor[key], "" ];

				else if ( key && editor[key] !== undefined && typeof editor[key] === "number" )
					[text_input.value, value_input.value] = [ "", editor[key] ];

				else if ( key && editor[key] !== undefined && typeof editor[key] === "boolean" )
					[text_input.value, value_input.value] = [ "", editor[key] ];

				else [ value_input.value, text_input.value ] = ["",""];

			});

			watch( vector_droplist, "onchange", function( property, event, key ){

				if ( key && editor[key] !== undefined && editor[key].isVector2 ) 

					[ vector_x.value, vector_y.value ] = [ 
						editor[key].x.toFixed(2), editor[key].y.toFixed(2) 
					];

				else [vector_x.value, vector_y.value] = ["",""];

			});

			watch( color_droplist, "onchange", function( property, event, key ){

				if ( key && editor[key] !== undefined && editor[key].isColor ) 

					[ color_r.value, color_g.value, color_b.value ] = [ 
						parseInt( 255*editor[ key ].r ).toFixed(0),
						parseInt( 255*editor[ key ].g ).toFixed(0),
						parseInt( 255*editor[ key ].b ).toFixed(0)
					];

				else [color_r.value, color_g.value, color_b.value] = ["","",""];

			});

			watch( texture_droplist, "onchange", function( property, event, map ){

				if ( !map || editor[map] == null || !editor[map].isTexture ) 
					return [vector_x.value, vector_y.value] = ["",""];

				var key = vector_droplist.value;

				if ( map === "normalMap" && key === "normalScale" 
				&& editor[ key ] && editor[ key ].isVector2 ) 

					[ vector_x.value, vector_y.value ] = [ 
						editor[key].x.toFixed(2), editor[key].y.toFixed(2) 
					];

				else [vector_x.value, vector_y.value] = ["",""];

			});

			watch( entity_droplist, "onchange", function( property, event, value ){
				editor.update( parseInt( value ) ); // important! id.
				callWatchers( key_droplist, "onchange", "change", key_droplist.value );
				callWatchers( color_droplist, "onchange", "change", color_droplist.value );
				callWatchers( vector_droplist, "onchange", "change", vector_droplist.value );
				callWatchers( texture_droplist, "onchange", "change", texture_droplist.value );

			});

		})();

	//	Tab keyboard inputs.

		(function(){

			var interval;

		//	keyInputs blur.

			color_r.addEventListener( "change", color_r.blur );
			color_g.addEventListener( "change", color_g.blur );
			color_b.addEventListener( "change", color_b.blur );
			vector_x.addEventListener( "change", vector_x.blur );
			vector_y.addEventListener( "change", vector_y.blur );
			text_input.addEventListener( "change", text_input.blur );
			value_input.addEventListener( "change", value_input.blur );

		//	keyInputControls.

			function enableKeyInputControls(){
				keyInputControls.isDisabled = false;
			}

			function disableKeyInputControls(){
				keyInputControls.isDisabled = true;
			}

			color_r.addEventListener( "blur", enableKeyInputControls );
			color_g.addEventListener( "blur", enableKeyInputControls );
			color_b.addEventListener( "blur", enableKeyInputControls );
			vector_x.addEventListener( "blur", enableKeyInputControls );
			vector_y.addEventListener( "blur", enableKeyInputControls );
			text_input.addEventListener( "blur", enableKeyInputControls );
			value_input.addEventListener( "blur", enableKeyInputControls );

			color_r.addEventListener( "focus", disableKeyInputControls );
			color_g.addEventListener( "focus", disableKeyInputControls );
			color_b.addEventListener( "focus", disableKeyInputControls );
			vector_x.addEventListener( "focus", disableKeyInputControls );
			vector_y.addEventListener( "focus", disableKeyInputControls );
			text_input.addEventListener( "focus", disableKeyInputControls );
			value_input.addEventListener( "focus", disableKeyInputControls );

		//	keyinputs change.

			text_input.addEventListener( "change", function(){

				if ( !key_droplist.value ) return text_input.value = "";
				if ( !entity_droplist.value ) return text_input.value = "";

				var key = key_droplist.value;
				var value = text_input.value; // string.

				if ( key && value !== "" && value !== "undefined" ) 

					switch ( key ){

						case "name":
							editor[ key ] = value;
						break;

						case "uuid":
						case "type":
						case "linecap":
						case "linejoin":
						case "wireframeLinecap":
							text_input.value = editor[ key ];
						break;

						default:
							[ value_input.value, text_input.value ] = ["",""];
						break;
					}

				else [ value_input.value, text_input.value ] = ["",""];

			//	TODO: add to undo.

			});

			value_input.addEventListener( "change", function(){

				if ( !key_droplist.value ) return value_input.value = "";
				if ( !entity_droplist.value ) return value_input.value = "";

				var key = key_droplist.value;
				var value = Number(value_input.value); // number.

				if ( isNaN(value) ) return value_input.value = "";

			//	disabled on key change.

				if ( key && editor[key] !== undefined )

					if ( typeof editor[key] === "string" ) value_input.value = "";
					if ( typeof editor[key] === "number" ) value_input.value = value;
					if ( typeof editor[key] === "boolean" ) value_input.value = Boolean(value);

				else if ( key && editor[key] === undefined )

					switch ( key ){

					//	string:
						case "uuid":
						case "type":
						case "linecap":
						case "linejoin":
						case "wireframeLinecap":
						case "name":
							value_input.value = "";
						break;

					//	number:
						case "blending":
						case "side":
						case "vertexColors":
						case "opacity":
						case "blendSrc":
						case "blendDst":
						case "blendEquation":
						case "depthFunc":
						case "polygonOffsetFactor":
						case "polygonOffsetUnits":
						case "alphaTest,overdraw":
						case "displacementScale":
						case "metalness":
						case "roughness":
						case "bumpScale":
						case "refractionRatio":
						case "displacementBias":
						case "normalMapType":
						case "aoMapIntensity":
						case "envMapIntensity":
						case "emissiveIntensity":
						case "lightMapIntensity":
						case "wireframeLinewidth":
						case "reflectivity":
						case "combine":
						case "linewidth":
						case "shininess":
						case "depthPacking":
						case "scale":
						case "gapSize":
						case "dashSize":
						case "size":
						case "rotation":
						case "sizeAttenuation":
							editor[ key ] = value;
						break;

					//	boolean:
						case "fog":
						case "lights":
						case "flatShading":
						case "transparent":
						case "depthTest":
						case "depthWrite":
						case "clipIntersection":
						case "clipShadows":
						case "colorWrite":
						case "polygonOffset":
						case "dithering":
						case "premultipliedAlpha":
						case "visible":
						case "needsUpdate":
						case "wireframe":
						case "skinning":
						case "morphTargets":
						case "morphNormals":
							editor[ key ] = Boolean(value);
						break;

						default:
							[ value_input.value, text_input.value ] = ["",""];
						break;
					}

				else [ value_input.value, text_input.value ] = ["",""];

			//	TODO: add to undo.

			});

			vector_x.addEventListener( "change", onScaleInput )
			vector_y.addEventListener( "change", onScaleInput )

			function onScaleInput(){

				if ( this.value === "" ) return;
				if ( this.value == null ) return this.value = "";

				var key = vector_droplist.value;
				var map = texture_droplist.value;

				if ( key !== "normalScale" || map !== "normalMap") 
					return [vector_x.value, vector_y.value] = ["",""];

				if ( !editor.normalScale || !editor.normalScale.isVector2 )
					return [vector_x.value, vector_y.value] = ["",""];

				if ( editor.normalScale && editor.normalScale.isVector2 ) {

					var x = Number( vector_x.value ); // number. 
					if ( isNaN(x) ) vector_x.value = "";
					else editor.normalScale.x = x;

					var y = Number( vector_y.value ); // number. 
					if ( isNaN(y) ) vector_y.value = "";
					else editor.normalScale.y = y;

				}

			//	TODO: add to undo.

			}

			color_r.addEventListener( "change", onColorInput )
			color_g.addEventListener( "change", onColorInput )
			color_b.addEventListener( "change", onColorInput )

			function onColorInput(){

				if ( this.value === "" ) return;
				if ( this.value == null ) return this.value = "";

				if ( !entity_droplist.value || !color_droplist.value ) {
					[color_r.value, color_g.value, color_b.value] = ["","",""]; return;
				}

				var key = color_droplist.value;

				if ( key !== "color" || key !== "emissive" || key !== "specular" ) {
					[color_r.value, color_g.value, color_b.value] = ["","",""]; return;
				}

				var value = THREE.Math.clamp( Number(this.value), 0, 255) ;

				if ( editor[key] && editor[key].isColor ) {

					if ( isNaN(value) ) {
						if ( this === color_r ) color_r.value = parseInt(255*editor[key].r);
						if ( this === color_g ) color_g.value = parseInt(255*editor[key].g);
						if ( this === color_b ) color_b.value = parseInt(255*editor[key].b);
					} else {
						if ( this === color_r ) editor[key].r = Number(value)/255;
						if ( this === color_g ) editor[key].g = Number(value)/255;
						if ( this === color_b ) editor[key].b = Number(value)/255;
					}

				} else [color_r.value, color_g.value, color_b.value] = ["","",""];

			//	TODO: add to undo.

			}

		})();

	//	mouse inputs.

		(function(){

			var interval;

		//	First "mousedown" event (mousedown, onWatchValue ) eventListener, sets the values in 
		//	the "watchValue" object and the ( mousedown, onWatchValue ) eventListener is removed.
		//	Last "click" event ( click, onMouseClick ) eventListener, changes the watchValue.value 
		//	and calls the watcher, which restore the (mousedown, onWatchValue ) eventListener.

			var watchValue = {
				key:null,    // editor key,
				value:null,  // editor[key].
				button:null, // current button.
				entity:null, // material.id,
			};

		//	Will trigger when clicking has finished (and a value has changed).
			watch( watchValue, "value", function( prop, action, value, oldValue ){
				debugMode && console.log({ event:"on click end", "new value":value, "old value":oldValue });

				if ( watchValue.button == null ) return;
				if ( entity_droplist.value === "" ) return;

			//	Add event listener.
				watchValue.button && watchValue.button.addEventListener( "mousedown", onWatchValue ); // important!

			//	Add to undo.
				entity_droplist.value && addtoUndo(); // add to undo.
				debugMode && console.log( "undo:", undo.length, "redo:", redo.length );

			});

		//	keep first, ignore next events.
			increase_v.addEventListener( "mousedown", onWatchValue );
			decrease_v.addEventListener( "mousedown", onWatchValue );

			function onWatchValue(){

				var button = this;
				if ( entity_droplist.value === "" ) return;

				watchValue.button = button;
				watchValue.key = key_droplist.value;
				watchValue.value = editor[ key_droplist.value ]; // editor[key].
				watchValue.entity = parseInt(entity_droplist.value);
				button.removeEventListener( "mousedown", onWatchValue ); // important!
			}

			increase_v.addEventListener( "mousedown", onMouseDown );
			decrease_v.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
			//	debugMode && console.log( "on MouseUp:", interval );
				clearTimeout( interval ); // important!
			});

			increase_v.addEventListener( "click", onMouseClick );
			decrease_v.addEventListener( "click", onMouseClick );

			function onMouseDown(){

				clearTimeout( interval ); // important!

				if ( !entity_droplist.value === "" ) return;

			//	disabled on mouse down.

				if ( key_droplist.value === "" ) return;

			//	enabled on mouse down.

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function update() {

					var key = key_droplist.value;

					function updateFloatRotationValue(){
						var step = 0.1 * Math.PI/180; // 0.1 deg.
						var min = -Math.PI, max = Math.PI;
						var value = Number(editor[ key ]); // get value from editor.
						if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
						value_input.value = ( RAD2DEG * ( editor[ key ] = value) ).toFixed(1); // string.
					}

					function updateFloatNumberValue(min, max, step){
						var value = Number(editor[ key ]); // get value from editor.
						if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
						value_input.value = ( editor[key] = round(value, 2) ).toFixed(2);
					}

					function updateIntegerNumberValue(min, max){
						var value = parseInt(editor[ key ]); // get value from editor.
						if ( button === increase_v ) value = THREE.Math.clamp( ++value, min, max );
						if ( button === decrease_v ) value = THREE.Math.clamp( --value, min, max );
						value_input.value = ( editor[key] = parseInt(value) ).toFixed(0);
					}

					switch ( key ){

						case "polygonOffsetUnits":
						case "polygonOffsetFactor":
							updateIntegerNumberValue(-100, 100);
						break;
						case "opacity":
						case "overdraw":
						case "alphaTest":
							updateFloatNumberValue(0, 1, 1/100);
						break;
						case "bumpScale":
						case "metalness":
						case "roughness":
						case "displacementBias":
							updateFloatNumberValue(-10, 10, 1/100);
						break;
						case "displacementScale":
							updateFloatNumberValue(-100, 100, 1/100);
						break;
						case "refractionRatio":
							updateFloatNumberValue(-1, 1, 1/100);
						break;
						case "aoMapIntensity":
						case "envMapIntensity":
						case "emissiveIntensity":
						case "lightMapIntensity":
						case "wireframeLinewidth":
							updateFloatNumberValue(-10, 10, 1/100);
						break;
						case "reflectivity":
							updateFloatNumberValue(0, 1, 1/100);
						break;
						case "linewidth":
							updateFloatNumberValue(0, 100, 1/100);
						break;
						case "shininess":
							updateFloatNumberValue(0, 1000, 1/100);
						break;
						case "size":
						case "scale":
						case "gapSize":
						case "dashSize":
							updateFloatNumberValue(0, 1000, 1/100);
						break;
						case "rotation":
							updateFloatRotationValue();
						break;
					}

					var dt = clock.getDelta();
					interval = setTimeout( update, dt );
				//	debugMode && console.log( "on mousedown:", interval );

				}, 500);
			}

			function onMouseClick(){

				clearTimeout( interval ); // important!

				if ( !entity_droplist.value === "" ) return;

			//	disabled on mouse click.

				if ( key_droplist.value === "" ) return;
				if ( key_droplist.value === "name" ) return;
				if ( key_droplist.value === "type" ) return;

			//	enabled on mouse click.

				var button = this;
				var key = key_droplist.value;

				function updateFloatRotationValue(){
					var step = 0.1 * Math.PI/180; // 0.1 deg.
					var min = -Math.PI, max = Math.PI;
					var value = Number(editor[ key ]); // get value from editor.
					if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
					value_input.value = ( RAD2DEG * ( editor[ key ] = value) ).toFixed(1); // string.
				}

				function updateFloatNumberValue(min, max, step){
					var value = Number(editor[ key ]); // get value from editor.
					if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
					value_input.value = ( editor[key] = round(value, 2) ).toFixed(2);
				}

				function updateIntegerNumberValue(min, max){
					var value = parseInt(editor[ key ]); // get value from editor.
					if ( button === increase_v ) value = THREE.Math.clamp( ++value, min, max );
					if ( button === decrease_v ) value = THREE.Math.clamp( --value, min, max );
					value_input.value = ( editor[key] = parseInt(value) ).toFixed(0);
				}

				function updateConstantStringValue( values ){
					var min = 0, max = values.length;
					var value = editor[ key ]; // string
					var index = values.findIndex(function( item ){ return item === value; });
					if ( button === increase_v ) value = values[ ( ++index % max + max ) % max ]; // mod();
					if ( button === decrease_v ) value = values[ ( --index % max + max ) % max ]; // mod();
					text_input.value = editor[ key ] = value; // string.
				}

				function updateConstantNumberValue( values ){
					var min = 0, max = values.length;
					var value = Number(editor[ key ]); // get value from editor.
					var index = values.findIndex(function( item ){ return item === value; });
					if ( button === increase_v ) value = values[ ( ++index % max + max ) % max ]; // mod();
					if ( button === decrease_v ) value = values[ ( --index % max + max ) % max ]; // mod();
					value_input.value = editor[ key ] = value; // number.
				}

				switch ( key ){

				//	string:
					case "name":
					case "type":
						text_input.value = editor[ key ]; // disabled on mouse click.
					break;
					case "uuid": 
						text_input.value = editor[ key ] = THREE.Math.generateUUID(); // string.
					break;
					case "linecap":
					case "wireframeLinecap":
						updateConstantStringValue(["butt","round","square"]);
					break;
					case "linejoin":
						updateConstantStringValue(["bevel","round","miter"]);
					break;
					case "precision":
						updateConstantStringValue(["highp","mediump","lowp"]);
					break;

				//	boolean:
					case "fog":
					case "lights":
					case "flatShading":
					case "transparent":
					case "depthTest":
					case "depthWrite":
					case "clipIntersection":
					case "clipShadows":
					case "colorWrite":
					case "polygonOffset":
					case "dithering":
					case "premultipliedAlpha":
					case "visible":
					case "needsUpdate":
					case "wireframe":
					case "skinning":
					case "morphTargets":
					case "morphNormals":
					case "sizeAttenuation":
						value_input.value = editor[ key ] = !editor[ key ]; // boolean.
					break;

				//	number:
					case "blending":
						updateConstantNumberValue([
							THREE.NoBlending,THREE.NormalBlending,THREE.AdditiveBlending,
							THREE.SubtractiveBlending,THREE.MultiplyBlending,THREE.CustomBlending
						]);
					break;
					case "side":
						updateConstantNumberValue([THREE.FrontSide,THREE.BackSide,THREE.DoubleSide]);
					break;
					case "vertexColors":
						updateConstantNumberValue([THREE.NoColors,THREE.FaceColors,THREE.VertexColors]);
					break;
					case "blendDst":
					case "blendSrc":
						updateConstantNumberValue([THREE.ZeroFactor,THREE.OneFactor,THREE.SrcColorFactor,
							THREE.OneMinusSrcColorFactor,THREE.SrcAlphaFactor,THREE.OneMinusSrcAlphaFactor,
							THREE.DstAlphaFactor,THREE.OneMinusDstAlphaFactor,THREE.DstColorFactor,
							THREE.OneMinusDstColorFactor,THREE.SrcAlphaSaturateFactor
						]);
					break;
					case "blendEquation":
						updateConstantNumberValue([THREE.AddEquation,THREE.SubtractEquation,
							THREE.ReverseSubtractEquation,THREE.MinEquation,THREE.MaxEquation
						]);
					break;
					case "depthFunc":
						updateConstantNumberValue([THREE.NeverDepth,THREE.AlwaysDepth,THREE.LessDepth,
							THREE.LessEqualDepth,THREE.GreaterEqualDepth,THREE.GreaterDepth,THREE.NotEqualDepth
						]);
					break;
					case "normalMapType":
						updateConstantNumberValue([THREE.TangentSpaceNormalMap,THREE.ObjectSpaceNormalMap]);
					break;
					case "combine":
						updateConstantNumberValue([THREE.MultiplyOperation,THREE.MixOperation,THREE.AddOperation]);
					break;
					case "polygonOffsetUnits":
					case "polygonOffsetFactor":
						updateIntegerNumberValue(-100, 100);
					break;
					case "opacity":
					case "overdraw":
					case "alphaTest":
						updateFloatNumberValue(0, 1, 1/100);
					break;
					case "bumpScale":
					case "metalness":
					case "roughness":
					case "displacementBias":
						updateFloatNumberValue(-10, 10, 1/100);
					break;
					case "displacementScale":
						updateFloatNumberValue(-100, 100, 1/100);
					break;
					case "refractionRatio":
						updateFloatNumberValue(-1, 1, 1/100);
					break;
					case "aoMapIntensity":
					case "envMapIntensity":
					case "emissiveIntensity":
					case "lightMapIntensity":
					case "wireframeLinewidth":
						updateFloatNumberValue(-10, 10, 1/100);
					break;
					case "reflectivity":
						updateFloatNumberValue(0, 1, 1/100);
					break;
					case "linewidth":
						updateFloatNumberValue(0, 100, 1/100);
					break;
					case "shininess":
						updateFloatNumberValue(0, 1000, 1/100);
					break;
					case "depthPacking":
						//	???
					break;
					case "size":
					case "scale":
					case "gapSize":
					case "dashSize":
						updateFloatNumberValue(0, 1000, 1/100);
					break;
					case "rotation":
						updateFloatRotationValue();
					break;

					default:
						value_input.value = ""; // disabled on mouse click.
					break;
				}

				debugMode && console.log( "on Mouse Click:", interval );

			//	call watcher to add undo.
				interval = setTimeout( function(){
					watchValue.value = editor[ key ];
				}, 250);

			}

		})();

		(function(){

			var interval;

		//	First "mousedown" event (mousedown, onWatchValue ) eventListener, sets the values in 
		//	the "watchValue" object and the ( mousedown, onWatchValue ) eventListener is removed.
		//	Last "click" event ( click, onMouseClick ) eventListener, changes the watchValue.value 
		//	and calls the watcher, which restore the (mousedown, onWatchValue ) eventListener.

			var watchValue = {
				entity:null, // material.id,
				button:null, // current button.
				key:null,    // editor key,
				vector: new THREE.Vector2(1,1), // editor[key].
			};

		//	Will trigger when clicking has finished (and a value has changed).
			watch( watchValue.vector, ["x","y"], function( prop, action, value, oldValue ){
				clearTimeout( interval );
				interval = setTimeout(function(){
					debugMode && console.log({ event:"on click end", "new value":value, "old value":oldValue });

					if ( watchValue.button == null ) return;
					if ( entity_droplist.value === "" ) return;

				//	Add event listener.
					watchValue.button && watchValue.button.addEventListener( "mousedown", onWatchValue ); // important!

				//	Add to undo.
					entity_droplist.value && addtoUndo(); // add to undo.
					debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
				}, 100);
			});

		//	keep first, ignore next events.
			increase_x.addEventListener( "mousedown", onWatchValue );
			increase_y.addEventListener( "mousedown", onWatchValue );
			decrease_x.addEventListener( "mousedown", onWatchValue );
			decrease_y.addEventListener( "mousedown", onWatchValue );

			function onWatchValue(){

				var button = this;
				if ( entity_droplist.value === "" ) return;
				if ( vector_droplist.value === "" ) return;

				watchValue.button = button;
				watchValue.key = vector_droplist.value;
				watchValue.entity = parseInt(entity_droplist.value);
				watchValue.vector.copy( editor[vector_droplist.value] ); // editor[key]
				button.removeEventListener( "mousedown", onWatchValue ); // important!
			}

			increase_x.addEventListener( "mousedown", onMouseDown );
			increase_y.addEventListener( "mousedown", onMouseDown );
			decrease_x.addEventListener( "mousedown", onMouseDown );
			decrease_y.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
			//	debugMode && console.log( "on MouseUp:", interval );
				clearTimeout( interval ); // important!
			});

			increase_x.addEventListener( "click", onMouseClick );
			increase_y.addEventListener( "click", onMouseClick );
			decrease_x.addEventListener( "click", onMouseClick );
			decrease_y.addEventListener( "click", onMouseClick );

			function onMouseDown(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse down.

				if ( vector_droplist.value !== "normalScale" || texture_droplist.value !== "normalMap" ) 
					return [ vector_x.value, vector_y.value ] = ["",""];

			//	enabled on mouse down.

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function update() {

					var key = vector_droplist.value;

					if ( key ) (function(){

						var step = 1/100, min = -100, max = 100;

						if ( button === increase_x || button === decrease_x ) {
							var value = Number(editor[ key ].x); // get value from editor.
							if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
							if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
							vector_x.value = ( editor[ key ].x = round(value, 2) ).toFixed(2);
						}

						else if ( button === increase_y || button === decrease_y ) {
							var value = Number(editor[ key ].y); // get value from editor.
							if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
							if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
							vector_y.value = ( editor[ key ].y = round(value, 2) ).toFixed(2);
						}

						var dt = clock.getDelta();
						interval = setTimeout( update, dt );
					//	debugMode && console.log( "on Update:", interval );

					})();

				}, 500);

			}

			function onMouseClick(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse click.

				if ( vector_droplist.value !== "normalScale" || texture_droplist.value !== "normalMap" )
					return [ vector_x.value, vector_y.value ] = ["",""];

			//	enabled on mouse click.

				var button = this;
				var key = vector_droplist.value;

				if ( key && key === "normalScale" && editor[key] && editor[key].isVector2 ) (function(){

					var step = 1/100, min = -100, max = 100;

					if ( button === increase_x || button === decrease_x ) {
						var value = Number(editor[ key ].x); // get value from editor.
						if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
						vector_x.value = ( editor[ key ].x = round(value, 2) ).toFixed(2);
					}

					else if ( button === increase_y || button === decrease_y ) {
						var value = Number(editor[ key ].y); // get value from editor.
						if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
						vector_y.value = ( editor[ key ].y = round(value, 2) ).toFixed(2);
					}

				//	call watcher to add undo.
					interval = setTimeout( function(){
						watchValue.vector.copy( editor[key] );
					}, 250);

				})();

				else [ vector_x.value, vector_y.value ] = ["",""];

				debugMode && console.log( "on Mouse Click:", interval );

			}

		})();

		(function(){

			var interval;

		//	First "mousedown" event (mousedown, onWatchValue ) eventListener, sets the values in 
		//	the "watchValue" object and the ( mousedown, onWatchValue ) eventListener is removed.
		//	Last "click" event ( click, onMouseClick ) eventListener, changes the watchValue.value 
		//	and calls the watcher, which restore the (mousedown, onWatchValue ) eventListener.

			var watchValue = {
				entity:null, // material.id,
				button:null, // current button.
				key:null,    // editor key,
				color: new THREE.Color(1,1,1), // editor[key].
			};

		//	Will trigger when clicking has finished (and a value has changed).
			watch( watchValue.color, ["r","g","b"], function( prop, action, value, oldValue ){
				clearTimeout( interval );
				interval = setTimeout(function(){
					debugMode && console.log({ event:"on click end", "new value":value, "old value":oldValue });

					if ( watchValue.button == null ) return;
					if ( entity_droplist.value === "" ) return;

				//	Add event listener.
					watchValue.button && watchValue.button.addEventListener( "mousedown", onWatchValue ); // important!

				//	Add to undo.
					entity_droplist.value && addtoUndo(); // add to undo.
					debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
				}, 100);
			});

		//	keep first, ignore next events.
			increase_r.addEventListener( "mousedown", onWatchValue );
			increase_g.addEventListener( "mousedown", onWatchValue );
			increase_b.addEventListener( "mousedown", onWatchValue );
			decrease_r.addEventListener( "mousedown", onWatchValue );
			decrease_g.addEventListener( "mousedown", onWatchValue );
			decrease_b.addEventListener( "mousedown", onWatchValue );

			function onWatchValue(){

				var button = this;
				if ( entity_droplist.value === "" ) return;
				if ( color_droplist.value === "" ) return;

				watchValue.button = button;
				watchValue.key = color_droplist.value;
				watchValue.entity = parseInt(entity_droplist.value);
				watchValue.color.copy( editor[color_droplist.value] ); // editor[key]
				button.removeEventListener( "mousedown", onWatchValue ); // important!
			}

			increase_r.addEventListener( "mousedown", onMouseDown );
			increase_g.addEventListener( "mousedown", onMouseDown );
			increase_b.addEventListener( "mousedown", onMouseDown );
			decrease_r.addEventListener( "mousedown", onMouseDown );
			decrease_g.addEventListener( "mousedown", onMouseDown );
			decrease_b.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
			//	debugMode && console.log( "on MouseUp:", interval );
				clearTimeout( interval ); // important!
			});

			increase_r.addEventListener( "click", onMouseClick );
			increase_g.addEventListener( "click", onMouseClick );
			increase_b.addEventListener( "click", onMouseClick );
			decrease_r.addEventListener( "click", onMouseClick );
			decrease_g.addEventListener( "click", onMouseClick );
			decrease_b.addEventListener( "click", onMouseClick );

			function onMouseDown(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse down.

				if ( color_droplist.value === "" ) 
					return [ color_r.value, color_g.value, color_b.value ] = ["","",""];

			//	enabled on mouse down.

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function update() {

					var key = color_droplist.value;

					if ( key ) (function(){

						var min = 0, max = 1, step = 1/255;

						if ( button === increase_r || button === decrease_r ) {
							var value = Number(editor[ key ].r); // get value from editor.
							if ( button === increase_r ) value = THREE.Math.clamp( value+step, min, max );
							if ( button === decrease_r ) value = THREE.Math.clamp( value-step, min, max );
							color_r.value = parseInt( 255 * ( editor[ key ].r = value ));
						}

						else if ( button === increase_g || button === decrease_g ) {
							var value = Number(editor[ key ].g); // get value from editor.
							if ( button === increase_g ) value = THREE.Math.clamp( value+step, min, max );
							if ( button === decrease_g ) value = THREE.Math.clamp( value-step, min, max );
							color_g.value = parseInt( 255 * ( editor[ key ].g = value ));
						}

						else if ( button === increase_b || button === decrease_b ) {
							var value = Number(editor[ key ].b); // get value from editor.
							if ( button === increase_b ) value = THREE.Math.clamp( value+step, min, max );
							if ( button === decrease_b ) value = THREE.Math.clamp( value-step, min, max );
							color_b.value = parseInt( 255 * ( editor[ key ].b = value ));
						}

						var dt = clock.getDelta();
						interval = setTimeout( update, dt );
					//	debugMode && console.log( "on Update:", interval );

					})();

				}, 500);

			}

			function onMouseClick(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

			//	disabled on mouse down.

				if ( color_droplist.value === "" ) 
					return [ color_r.value, color_g.value, color_b.value ] = ["","",""];

			//	enabled on mouse click.

				var button = this;
				var key = color_droplist.value;

				if ( key && editor[key] && editor[key].isColor ) (function(){

					var min = 0, max = 1, step = 1/255;

					if ( button === increase_r || button === decrease_r ) {
						var value = Number(editor[ key ].r); // get value from editor.
						if ( button === increase_r ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_r ) value = THREE.Math.clamp( value-step, min, max );
						color_r.value = parseInt( 255 * ( editor[ key ].r = value ));
					}

					else if ( button === increase_g || button === decrease_g ) {
						var value = Number(editor[ key ].g); // get value from editor.
						if ( button === increase_g ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_g ) value = THREE.Math.clamp( value-step, min, max );
						color_g.value = parseInt( 255 * ( editor[ key ].g = value ));
					}

					else if ( button === increase_b || button === decrease_b ) {
						var value = Number(editor[ key ].b); // get value from editor.
						if ( button === increase_b ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_b ) value = THREE.Math.clamp( value-step, min, max );
						color_b.value = parseInt( 255 * ( editor[ key ].b = value ));
					}

				//	call watcher to add undo.
					interval = setTimeout( function(){
						watchValue.color.copy( editor[key] );
					}, 250);

				})();

				else [ color_r.value, color_g.value, color_b.value ] = ["","",""];

				debugMode && console.log( "on Mouse Click:", interval );

			}

		})();







	//	Material Editor Watchers.
	//	Watch each object/property individually.

		(function( editor ){

			var material;
			var interval;

			watch( entity_droplist, "onchange", function( property, event, value ){
				material = material_entities.getMaterialById( value ); // id.
				debugMode && console.log({item:"droplist",event:event,"material":material});
			});

		//	Colors.
			watch( editor.color, ["r","g","b"], function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (material && material.color) material.color[ key ] = editor.color[ key ];
			//	clearTimeout( interval );
			});
			watch( editor.emissive, ["r","g","b"], function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (material && material.emissive) material.emissive[ key ] = editor.emissive[ key ];
			//	clearTimeout( interval );
			});
			watch( editor.specular, ["r","g","b"], function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (material && material.specular) material.specular[ key ] = editor.specular[ key ];
			//	clearTimeout( interval );
			});

		})( editor.reset() ); // important!

		return editor; // important!

	})();

*/