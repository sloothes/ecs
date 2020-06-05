
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

		var watchObj = {value:select.value};
		select.addEventListener("change", function(e){
			watchObj.value = select.value;
		});

		var observer = watch(watchObj, "value", function( prop, action, newValue, oldValue ){
			debugMode && console.log( prop, action, newValue, oldValue );

			(function( value ){
				var id = parseInt( value );
				var object = scene.getObjectById( id );
				if ( !object || !object.isMesh ) return;
				var uuid = object.geometry.uuid;
				debugMode && console.log( uuid );
				octree.removeThreeMesh( uuid );
				octree.importThreeMesh( object );
			})( oldValue );

			(function( value ){
			//	Exit edit mode.
				if ( newValue != "" ) return;
				takeCameraControls( localPlayer );
				keyInputControls.isDisabled = false;
			})( newValue );

			(function( value ){
				if ( newValue == "" ) return;
				keyInputControls.isDisabled = true;

				var id = parseInt( value );
				var object = scene.getObjectById( id );
			//	debugMode && console.log( object );

				if ( !object ) return;
				if ( object === camera ) return;
				if ( object === cameraLight ) return;
				if ( object.name == "shadow helper") return;
				if ( object === cameraLight.shadow.camera ) return;
				if ( object.name == "shadow camera helper") return;
				if ( object.geometry && object.geometry.boundingSphere ) {
					var offset = object.geometry.boundingSphere.center;
					cameraControls.trackObject = object;
					cameraControls.offset.copy( offset );
					cameraControls.offset.y *= 0.5;
				} else takeCameraControls( object );

				keyInputControls.isDisabled = true;
			})( newValue );

		});

		row.appendChild( select );
		tab.appendChild( row );

	})();

	(function(){

	//	Geometries droplist (TODO).

		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.textContent = "Geometry:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "geometry-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
			+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
			+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var watchObj = {value:select.value};

		select.addEventListener("change", function(e){
			watchObj.value = select.value;
		});

		(function(){

			var geometries = [
				"BoxGeometry",
				"CircleGeometry",
				"ConeGeometry",
				"CylinderGeometry",
				"DodecahedronGeometry",
				"EdgesGeometry",
				"ExtrudeGeometry",
				"IcosahedronGeometry",
				"LatheGeometry",
				"OctahedronGeometry",
				"ParametricGeometry",
				"PlaneGeometry",
				"PolyhedronGeometry",
				"RingGeometry",
				"ShapeGeometry",
				"SphereGeometry",
				"TetrahedronGeometry",
				"TextGeometry",
				"TorusGeometry",
				"TorusKnotGeometry",
				"TubeGeometry",
				"WireframeGeometry",
			];

			geometries.forEach(function( name ){
				var option = document.createElement("option");
				option.text = name;
				option.value = name;
				select.appendChild( option );
			});

		})();

		select.value = "BoxGeometry";
		row.appendChild( select );
		tab.appendChild( row );

	})();

	(function(){

	//	New box geometry button.
	//	Creates a mesh box 10x10.
	//	and switch to EditMode.

		var k = 1;
		var tab = TabUI.Editor.tab;
		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "new-box-geometry";
		button.textContent = "Create Box Geometry";
		button.style.cssText = "width:295px;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		button.addEventListener( "click", function(){

			var select = document.getElementById("entities-droplist");
			var material = new THREE.MeshStandardMaterial();

		//	Create box.
			var w = 10, h = 10, d = 10;
			var x = 0, y = h/2, z =  0;
			var box = new THREE.BoxGeometry(w,h,d);
			box.translate(0, h/2, 0);
			var mesh = new THREE.Mesh(box, material);
			mesh.name = "box "+ k++;
			mesh.position.set(x,0,z);
			scene.add( mesh );

		//	Create entity.
			entities.push({id:mesh.id})

		//	Create option.
			var name = mesh.name;
			var uuid = mesh.uuid;
			var option = document.createElement("option");
			var text = ""+mesh.id+"."+mesh.type+":"+mesh.name;
			option.text = text;
			option.value = mesh.id;
			select.appendChild( option );

		//	Set new value.
			select.value = ""+mesh.id;
			select.dispatchEvent(new Event("change")); // important!

		});

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
