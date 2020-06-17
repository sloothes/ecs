
//	Material Tab.

	TabUI.add( "Material", "material-tab" );

	TabUI.append("Material");
//	TabUI.Editor.role.classList.add("active");
//	TabUI.Editor.tab.classList.add("in","active");

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

	//	Param mode droplist.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "param:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "material-param-droplist";
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
		keys += "refractionRatio,displacementBias,normalMapType,";
		keys += "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,";
		keys += "wireframe,wireframeLinecap,wireframeLinejoin,wireframeLinewidth,";
		keys += "skinning,morphTargets,morphNormals,combine,shininess,";
		keys += "depthPacking,scale,gapSize,linecap,linejoin,linewidth,";
		keys += "dashSize,size,rotation,sizeAttenuation";

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Material.tab );

	(function( tab ){

	//	param value.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "value:";
		row.style.cssText = "margin:10px 15px;height:30px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "material-param-value-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "material-param-value-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "material-param-value-input";
		input.setAttribute("placeholder", "v" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Material.tab );

	(function( tab ){

	//	Scale mode droplist.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "scale:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "material-scale-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = "";
		keys += "normalScale,displacementScale";

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Material.tab );

	(function( tab ){

	//	vector x.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "vect x:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "material-scale-x-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "material-scale-x-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "material-scale-x-input";
		input.setAttribute("placeholder", "x" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Material.tab );

	(function( tab ){

	//	vector y.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.textContent = "vect y:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "material-scale-y-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "material-scale-y-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "material-scale-y-input";
		input.setAttribute("placeholder", "y" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

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

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Material.tab );

	(function( tab ){

	//	Clone material button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "material-clone-button";
		button.textContent = "Clone Material";
		button.style.cssText = "width:295px;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

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
		button.style.cssText = "width:295px;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Material.tab );

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

		(function(){

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

		})();

		select.value = "MeshStandardMaterial";
		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Material.tab );

//	===================================================================================================================  //

	(function( tab ){

	//	Create material entity button.
	//	var tab = TabUI.Material.tab;

		var row = document.createElement("h3");
		row.style.cssText = "display:none;height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "create-material-button";
		button.textContent = "Create Material Entity";
		button.style.cssText = "width:295px;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

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
		button.style.cssText = "width:295px;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

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
		button.style.cssText = "width:295px;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Material.tab );

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

			//	Init params based on type.
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

//	===================================================================================================================  //
