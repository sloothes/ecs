
//	Texture tab.

	TabUI.add( "Texture", "texture-tab" );
	TabUI.append( "Texture" );

	TabUI.Editor.role.classList.remove("active");
	TabUI.Editor.tab.classList.remove("in","active");
	TabUI.Texture.role.classList.add("active");
	TabUI.Texture.tab.classList.add("in","active");

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

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.Texture.tab );

	const textureViewerMaterial = (function( tab ){

	//	Texture viewer.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:260px;border:none;text-align:center;";

		var canvas = document.createElement("canvas");
		canvas.width = 256; canvas.height = 256;
		canvas.id = "texture-viewer";
		canvas.style.cssText = "max-width:300px;max-height:300px;margin:auto;";

	//	Viewer scene.

		const scene = (function(){
			var scene = new THREE.Scene();
			scene.name = "viewer scene";
			return scene;
		})();

		const camera = (function(){
		//	var aspect = canvas.clientWidth / canvas.clientWidth;
			var camera  = new THREE.OrthographicCamera( -128,128,128,-128, 1, 1000 );
			camera.name = "viewer camera";
			camera.position.y = 10;
			camera.lookAt( 0,0,0 );
			scene.add( camera );
			return camera;
		})();

		const light = (function(){
			var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
			light.name = "viewer light";
			camera.position.set( 0,10,0 );
			scene.add( light );
			return light;
		})();

		const grid = (function(){
			var helper = new THREE.GridHelper( 250, 10, 0x444444, 0x444444 );
			helper.name = "viewer grid";
			helper.position.y = 0.01;
			scene.add( helper );
			return helper;
		})();

		const material = (function(){
			var mesh = new THREE.Mesh(
				new THREE.PlaneGeometry( 252, 252, 1, 1 ).rotateX(-Math.PI/2),
				new THREE.MeshLambertMaterial({ opacity:1, color:0x000000 })
			);  
			mesh.name = "texture viewer";
			mesh.material.name = "TextureViewerMaterial";
			material_entities.add( mesh.material );
			scene.add( mesh );
			return mesh.material;
		})();

	//  Renderer.

		const renderer = new THREE.WebGLRenderer({
			alpha: true,  // for transparent rendering set alpha:true, important!
			canvas: canvas,
			antialias: true,
			preserveDrawingBuffer: true,
		});

		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		renderer.shadowMap.enabled = true;
		renderer.setClearAlpha( 0 ); // for transparent rendering set clear alpha: 0.
		renderer.setClearColor( 0x000000, 0 ); // for transparent rendering set clear alpha: 0.
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( canvas.width, canvas.height );
		renderer.domElement.style.background = "none";  // transparent rendering. important!

	//	window.addEventListener("resize", function onWindowResize() {
	//		renderer.setSize( canvas.width, canvas.width );
	//		camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
	//		camera.updateProjectionMatrix();
	//	});

		(function render(){
			requestAnimationFrame( render );
			renderer.render( scene, camera );
		})();

		row.appendChild( canvas );
		tab.appendChild( row );

		return material; // important!

	})( TabUI.Texture.tab );

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

	(function( tab ){

	//	Text input.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "margin-right:20px;height:30px;";

		var input = document.createElement("input");
		input.id = "texture-text-input";
		input.setAttribute("placeholder", "text input" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "width:-webkit-fill-available;color:#000;display:inline;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		row.appendChild(input);
		tab.appendChild( row );

	})( TabUI.Texture.tab );

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
		keys += "uuid,name,mapping,rotation,format,minFilter,magFilter,anisotropy,flipY";

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Texture.tab );

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

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Texture.tab );

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
		keys += "offset,repeat,center,wrap";

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Texture.tab );

//	Vector controls.

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

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Texture.tab );

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

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Texture.tab );

	(function( tab ){

	//	Clone texture button.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "display:none;height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "clone-texture-button";
		button.textContent = "Clone Texture";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Texture.tab );


	(function( tab ){

	//	Import texture button.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "display:none;height:40px;margin-bottom:20px;"

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
			input.files.length = 0;
			input.click();
		});

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Texture.tab );

	(function( tab ){

	//	Replace image button.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "display:none;height:40px;margin-bottom:20px;"

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
			input.files.length = 0;
			input.click();
		});

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Texture.tab );

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


//  ======================================================================================  //


//	Texture Manager Class.

//	Texture Manager: inherits from EntityManager class.
//	sources: https://stackoverflow.com/questions/26700164/extending-array-with-es6-classes
//	https://stackoverflow.com/questions/11337849/ways-to-extend-array-object-in-javascript

	function TextureManager(){
		var array = new Array(0);
		Object.setPrototypeOf( array, TextureManager.prototype );
		return array; // important!
	}

	TextureManager.prototype = Object.create(Array.prototype);

	TextureManager.prototype.move = function( entity, new_index ){

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

	TextureManager.prototype.add = function(){
	//	params: {object:Texture} 

		if ( arguments.length < 1 ) return;

		var textures = [];

	//	Get textures/ids.
		for ( var i in arguments ) {
			var param = arguments[i];
			if ( typeof param === "object" && param.isTexture && param.id !== undefined )
				textures.push( param );  // meterial;
			else 
				continue;
		}

		if ( !textures.length ) return;
	//	console.log( "textures:", textures );

		var length = textures.length;
		for ( var j = 0; j < length; j++ ) {
			this.push( textures[j] );
		}

	//	global const "texture_droplist" is defined in TextureTab.js;
	//	var texture_droplist = document.getElementById("texture-entities-droplist");

		if ( !texture_droplist ) return;

	//	Add options.
		while ( textures.length ) (function( texture ){
			var str =  "", dot = ".", col = ":";
			var name = texture.name || "texture";
			var option = document.createElement("option");
			option.text = str+texture.id+dot+name+col+texture.id;
			option.value = texture.id;
			texture_droplist.appendChild( option );
		})( textures.shift() );
	};

	TextureManager.prototype.remove = function(){
	//	params: {number:entity.id} or {object:entity} 

		if ( arguments.length < 1 ) return;

	//	Get removed ids.
		var remove_ids = [];
		for ( var i in arguments ) {
			var param = arguments[i];
			if ( typeof param === "number" && param % 1 === 0 ) // integer. 
				remove_ids.unshift( param );    // remove_ids.push( param );
			else if ( typeof param === "object" && param.isTexture && param.id !== undefined )
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
				removed_textures.push( removed );
			}
		}

	//	global const "texture_droplist" is defined in TextureTab.js;
	//	var texture_droplist = document.getElementById("texture-entities-droplist");

		if ( !texture_droplist ) return;

	//	Remove options.
		while ( remove_ids.length ) (function( id ){
			var selector = "option[value='" + id.toString() + "']"; // console.log( selector );
			var option = texture_droplist.querySelector( selector ); // console.log(  option  );
			option && option.remove();
		})( remove_ids.shift() );

	};

	TextureManager.prototype.clear = function(){

		this.length = 0;

	};

	TextureManager.prototype.getTextureById = function( value ){

		var id = parseInt( value );
		if ( id === NaN ) return;

		return this.find( function( texture ){
			return texture.id === id;
		});

	};

	const texture_entities = new TextureManager(); // texture entities array, important!.
	const removed_textures = new TextureManager(); // texture entities array, important!.

//  ======================================================================================  //
