
//	Texture tab.

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

	//	Add a watcher.
		watch(select, "onchange", function(property, event, value){
			debugMode && console.log({item:"texture",event:event,"item id":value});
		});

	//	Call watchers.
		select.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

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
		input.type = "text";
		input.id = "texture-text-input";
		input.setAttribute("placeholder", "text input" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "width:-webkit-fill-available;color:#000;display:inline;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

	//	Add a watcher.
		watch(input, "onchange", function(property, event, value){
			debugMode && console.log({item:"input",event:event,"value":value});
		});

	//	Call watchers.
		input.addEventListener( "change", function(){
			callWatchers(this, "onchange", "change", this.value );
		});

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
		keys += "uuid,name,flipY,format,rotation,mapping,minFilter,magFilter,anisotropy,wrapS,wrapT,needsUpdate";

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

	//	Add a watcher.
		watch(input, "onchange", function(property, event, value){
			debugMode && console.log({item:"input",event:event,"value":value});
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
		keys += "offset,repeat,center";

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

	//	Add a watcher.
		watch(input, "onchange", function(property, event, value){
			debugMode && console.log({item:"input",event:event,"vector-x":value});
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

	//	Add a watcher.
		watch(input, "onchange", function(property, event, value){
			debugMode && console.log({item:"input",event:event,"vector-y":value});
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

	})( TabUI.Texture.tab );

	(function( tab ){

	//	NeedsUpdate texture button.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "texture-needs-update";
		button.textContent = "Texture needs Update";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
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
			input.files.length = 0; input.click();
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
			input.files.length = 0; input.click();
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


//  =====================================================================================  //


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

//	Create texture managers.

	const texture_entities = new TextureManager(); // texture entities array, important!.
	const removed_textures = new TextureManager(); // texture entities array, important!.

//  =====================================================================================  //


//	TextureEditor.js

	const textureEditor = (function(){

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

	//

		const RAD2DEG = THREE.Math.RAD2DEG;
		const DEG2RAD = THREE.Math.DEG2RAD;

	//	droplists.

		const map_droplist    = document.getElementById("material-map-droplist");
		const key_droplist    = document.getElementById("texture-key-droplist");
		const vector_droplist = document.getElementById("texture-vector-droplist");
		const entity_droplist = document.getElementById("texture-entities-droplist");

	//	mouse inputs.

		const increase_v = document.getElementById("texture-value-increase");
		const increase_x = document.getElementById("texture-vector-x-increase");
		const increase_y = document.getElementById("texture-vector-y-increase");

		const decrease_v = document.getElementById("texture-value-decrease");
		const decrease_x = document.getElementById("texture-vector-x-decrease");
		const decrease_y = document.getElementById("texture-vector-y-decrease");

	//	keyboard inputs.

		const vector_x    = document.getElementById("texture-vector-x-input");
		const vector_y    = document.getElementById("texture-vector-y-input");
		const text_input  = document.getElementById("texture-text-input");
		const value_input = document.getElementById("texture-value-input");

	//	texture tab buttons.

		const exit_button = document.getElementById("texture-exit-mode");
		const redo_button = document.getElementById("texture-redo-button");
		const undo_button = document.getElementById("texture-undo-button");
		const create_button = document.getElementById("create-texture-button");
		const replace_button = document.getElementById("replace-image-button");
		const needsUpdate_button = document.getElementById("texture-needs-update");

	//	texture tab file inputs.

		const image_fileinput = document.getElementById("image-file-input");
		const texture_fileinput = document.getElementById("texture-file-input");

	//	TextureEditor class (extends THREE.Texture Class).
	//	A THREE.Texture that holds editor values. Extends THREE.Texture.

		const editor = (function(){

			var interval;

			function TextureEditor(){
				var texture = new THREE.Texture();
				Object.setPrototypeOf( texture, TextureEditor.prototype );
				return texture; // important!
			}

			TextureEditor.prototype = Object.create(THREE.Texture.prototype); // important!

			TextureEditor.prototype.copy = function( source ){ 
				THREE[ source.type ].prototype.copy.call( this, source ); // important!
				return this;
			};

			TextureEditor.prototype.reset = function(){ 
				this.copy( new THREE.Texture() ); 
				this.uuid = THREE.Math.generateUUID();
			};

			TextureEditor.prototype.fromJSON = function( json ){
			//	param: a texture json {object}
			//	the missing TextureLoader.parse;

				var editor = this;

				for ( var key in json ) {
					switch ( key ){

						case "image":
							console.warn("case:",key,"TODO!"); // TODO!
						break;

						case "center":
						case "offset":
						case "repeat":
							editor[ key ].x = json[ key ][0];
							editor[ key ].y = json[ key ][1];
						break;

						case "wrap":
							editor.wrapS = json[ key ][0];
							editor.wrapT = json[ key ][1];
						break;

						default:
							editor[ key ] = json[ key ];
						break;
					}
				}

			};

			TextureEditor.prototype.undo = function(){

				var editor = this;

				if ( !undo.length ) return;

			//	Get undo json.
				var json = undo.shift();

				if ( !json ) return;

			//	Move json to redo.
				redo.unshift( json );

				clearTimeout( interval );
				interval = setTimeout( function(){

				//	Copy texture state (undo).
					editor.fromJSON( json ); // update.

					debugMode && console.log( "undo:", undo.length, "redo:", redo.length );

				}, 250);

			};

			TextureEditor.prototype.redo = function(){

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

			TextureEditor.prototype.update = function( value ){

			//	Copies the values of the target texture of textures
			//	entity manager. Does not updates the target texture.
			//	dependences: texture_entities {texture manager},
			//	param: a texture id {string or number},

				var editor = this;

			//	get target texture.
				var texture = texture_entities.getTextureById( value );
			//	debugMode && console.log( "target texture:", texture );

				if ( !texture ) {
					editor.reset();
					console.log("editor update:", false);
					return false; // important!
				}

			//	copy texture (update).
				editor.copy( texture );
				editor.name = texture.name;
				editor.uuid = texture.uuid;

			//	return true.
				console.log("editor update:", true);
				return true; // important!

			};

			return new TextureEditor();

		})();

	//	helpers.

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

		function getTextureByEntityId( value ){

			var texture_droplist = document.getElementById("texture-entities-droplist"); // important!

			if ( arguments.length ) 
				var id = parseInt( value );
			else
				var id = parseInt( texture_droplist.value );

			if ( id === NaN ) return;

			return texture_entities.find( function( texture ){
				return texture.id === id;
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
			vector_x.value = "";
			vector_y.value = "";
			text_input.value = "";
			value_input.value = "";
			key_droplist.value = "";
			vector_droplist.value = "";
			entity_droplist.value = "";
		//	state.update(); // imporant!
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

		//	const exit_button = document.getElementById("texture-exit-mode");
		//	const undo_button = document.getElementById("texture-undo-button");
		//	const redo_button = document.getElementById("texture-redo-button");

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

		//	const key_droplist    = document.getElementById("texture-key-droplist");
		//	const vector_droplist = document.getElementById("texture-vector-droplist");
		//	const entity_droplist = document.getElementById("texture-entities-droplist");

			key_droplist.addEventListener( "change", key_droplist.blur );
			vector_droplist.addEventListener( "change", vector_droplist.blur );
			entity_droplist.addEventListener( "change", entity_droplist.blur );

			document.getElementById("material-map-droplist").addEventListener( "change", function(){
				if ( !document.getElementById("material-entities-droplist").value ) return;

				var map = document.getElementById("material-map-droplist").value;
				var material = material_entities.getMaterialById( Number(this.value) );

				if ( material && map !== "" && material[map] && material[map].isTexture ) {

					callWatchers( entity_droplist, "onchange", "change", 
					entity_droplist.value = String(material[map].id) );

				} else exitFromEditMode();

			});

			watch( vector_droplist, "onchange", function( property, event, key ){
				if ( !key ) [vector_x.value, vector_y.value] = [ "", "" ];
				else [vector_x.value, vector_y.value] = [editor[key].x, editor[key].y];
			});

			watch( key_droplist, "onchange", function( property, event, key ){
				if ( !key ) [ value_input.value, text_input.value ] = ["", ""];
				else if ( key == "name" || key == "uuid" ) {
					[ value_input.value, text_input.value ] = [ "", editor[key] ];
				} else {
					[ value_input.value, text_input.value ] = [ editor[key], "" ];
				}
			});

			watch( entity_droplist, "onchange", function( property, event, value ){
				editor.update( parseInt(value) ); // important! id.
				var key = key_droplist.value, vector = vector_droplist.value;
				callWatchers( key_droplist, "onchange", "change", key );
				callWatchers( vector_droplist, "onchange", "change", vector );
			});

		})();

	//	Tab keyboard inputs.

		(function(){

			var interval;

		//	const vector_x = document.getElementById("texture-vector-x-input");
		//	const vector_y = document.getElementById("texture-vector-y-input");
		//	const text_input = document.getElementById("texture-text-input");
		//	const value_input = document.getElementById("texture-value-input");

		//	keyInputs blur.

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

			vector_x.addEventListener( "blur", enableKeyInputControls );
			vector_y.addEventListener( "blur", enableKeyInputControls );
			text_input.addEventListener( "blur", enableKeyInputControls );
			value_input.addEventListener( "blur", enableKeyInputControls );

			vector_x.addEventListener( "focus", disableKeyInputControls );
			vector_y.addEventListener( "focus", disableKeyInputControls );
			text_input.addEventListener( "focus", disableKeyInputControls );
			value_input.addEventListener( "focus", disableKeyInputControls );

		//	keyinputs change.

			text_input.addEventListener( "change", function(){

				var key = key_droplist.value;

				if ( key === "uuid" ) text_input.value = editor[ key ];
				else if ( !key_droplist.value ) text_input.value = "";
				else if ( !entity_droplist.value ) text_input.value = "";
				else if ( key === "name" ) editor[ key ] = text_input.value;
				else text_input.value = "";

			});

			value_input.addEventListener( "change", function(){

				var key = key_droplist.value;
				var value = Number(value_input.value); // number!

			//	disabled on key change.

				if ( !key_droplist.value || !entity_droplist.value ) value = "";
				if ( isNaN( value ) || key === "uuid" || key === "name") value = "";

			//	enabled on key change.

				switch ( key ){

					case "flipY":
						value_input.value = editor[key] = Boolean(value);
					break;

					case "format":
						if ( [1021, 1022, 1023, 1024, 1025, 1026, 1027].includes( value ) ) editor[ key ] = Number(value);
						else if ( !isNaN( editor[key]) ) value_input.value = editor[key];
						else value_input.value = editor[key] = 1023; // reset.
					break;

					case "mapping":
						if ( [300, 301, 302, 303, 304, 305, 306, 307].includes( value ) ) editor[ key ] = Number(value);
						else if ( !isNaN( editor[key]) ) value_input.value = editor[key];
						else value_input.value = editor[key] = 300; // reset.
					break;

					case "encoding":
						if ( [3000, 3001, 3007, 3002, 3003, 3004, 3005, 3006, 3200, 3201].includes( value ) ) editor[ key ] = Number(value);
						else if ( !isNaN( editor[key]) ) value_input.value = editor[key];
						else value_input.value = editor[key] = 3000; // reset.
					break;

					case "magFilter":
						if ( [1003, 1006].includes( value ) )editor[ key ] = Number(value);
						else if ( !isNaN( editor[key]) ) value_input.value = editor[key];
						else value_input.value = editor[key] = 1006; // reset.
					break;

					case "minFilter":
						if ( [1003, 1004, 1005, 1006, 1007, 1008].includes( value ) )editor[ key ] = Number(value);
						else if ( !isNaN( editor[key]) ) value_input.value = editor[key];
						else value_input.value = editor[key] = 1008; // reset.
					break;

					case "anisotropy":
						if ( !isNaN( value ) ) 
							value_input.value = ( editor[ key ] = THREE.Math.clamp(value,1,-1) ).toFixed(1);
						else if ( !isNaN( editor[key]) ) 
							value_input.value = editor[key].toFixed(2);
						else value_input.value = editor[key] = 1; // reset.
					break;

					case "rotation":
						if ( !isNaN( value ) ) {
							editor[key] = THREE.Math.clamp(DEG2RAD*value,-Math.PI, Math.PI);
							value_input.value = THREE.Math.clamp((value),-180,180).toFixed(1);
						} else if ( !isNaN( editor[key]) ) 
							value_input.value = THREE.Math.clamp((RAD2DEG*editor[key]),-180,180).toFixed(1);
						else value_input.value = editor[key] = 0; // reset.
					break;
				}

			});

		})();

	//	mouse inputs.

		(function(){

			var interval;

		//	const increase_v = document.getElementById("texture-value-increase");
		//	const decrease_v = document.getElementById("texture-value-decrease");
		//	const value_input = document.getElementById("texture-value-input");
		//	const key_droplist = document.getElementById("texture-key-droplist");
		//	const entity_droplist = document.getElementById("texture-entities-droplist");

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

				if ( !entity_droplist.value ) return;

			//	disabled on mouse down.

				if ( key_droplist.value === "name" ) return;
				if ( key_droplist.value === "uuid" ) return;
				if ( key_droplist.value === "flipY" ) return;
				if ( key_droplist.value === "format" ) return;
				if ( key_droplist.value === "mapping" ) return;
				if ( key_droplist.value === "minFilter" ) return;
				if ( key_droplist.value === "magFilter" ) return;

			//	enabled on mouse down.

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function update() {

					var key = key_droplist.value;

					if ( key === "rotation" ) (function(){

						var step = 0.1 * Math.PI/180; // 0.1 deg.
						var max = Math.PI, min = -max;
						var value = Number(editor[ key ]); // get value from editor.
						if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
						value_input.value = ( RAD2DEG * ( editor[ key ] = value) ).toFixed(1); // string.

					})();

					else if ( key === "anisotropy" ) (function(){

						var step = 1/100, max = 1, min = -max;
						var value = Number(editor[ key ]); // get value from editor.
						if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
						value_input.value = ( editor[key] = round(value, 2) ).toFixed(2);

					})();

					var dt = clock.getDelta();
					interval = setTimeout( update, dt );
				//	debugMode && console.log( "on mousedown:", interval );

				}, 500);
			}

			function onMouseClick(){

				var button = this;

				clearTimeout( interval ); // important!

				if ( !entity_droplist.value ) return;

				var key = key_droplist.value;

			//	disabled on mouse click.

				if ( key === "name" ) return;

			//	enabled on mouse click.

				function updateConstantInputValue( values ){
					var min = 0, max = values.length;
					var value = Number(editor[ key ]); // get value from editor.
					var index = values.findIndex(function( item ){ return item === value; });
					if ( button === increase_v ) value = values[ ( ++index % max + max ) % max ]; // mod();
					if ( button === decrease_v ) value = values[ ( --index % max + max ) % max ]; // mod();
					value_input.value = editor[ key ] = value; // number.
				}

				switch ( key ){

					case "uuid": 
						text_input.value = editor[ key ] = THREE.Math.generateUUID(); // string.
					break;

					case "flipY":
						value_input.value = editor[ key ] = !editor[ key ]; // boolean.
					break;

					case "format":
						updateConstantInputValue([ // order matters...
							THREE.AlphaFormat,THREE.RGBFormat,THREE.RGBAFormat,THREE.LuminanceFormat,
							THREE.LuminanceAlphaFormat, THREE.DepthFormat, THREE.DepthStencilFormat 
						]);
					break;

					case "mapping":
						updateConstantInputValue([ // order matters...
							THREE.UVMapping,THREE.CubeReflectionMapping,THREE.CubeRefractionMapping,
							THREE.EquirectangularReflectionMapping,THREE.EquirectangularRefractionMapping,
							THREE.SphericalReflectionMapping,THREE.CubeUVReflectionMapping,THREE.CubeUVRefractionMapping
						]);
					break;

					case "encoding":
						updateConstantInputValue([ // order matters...
							THREE.LinearEncoding,THREE.sRGBEncoding,THREE.GammaEncoding,THREE.RGBEEncoding,
							THREE.LogLuvEncoding,THREE.RGBM7Encoding,THREE.RGBM16Encoding,THREE.RGBDEncoding,
							THREE.BasicDepthPacking,THREE.RGBADepthPacking 
						]);
					break;

					case "magFilter":
						updateConstantInputValue([ THREE.NearestFilter,THREE.LinearFilter ]);
					break;

					case "minFilter":
						updateConstantInputValue([ // order matters...
							THREE.NearestFilter,THREE.NearestMipMapNearestFilter,
							THREE.NearestMipMapLinearFilter,THREE.LinearFilter,
							THREE.LinearMipMapNearestFilter,THREE.LinearMipMapLinearFilter 
						]);
					break;

					case "rotation":
						(function(){
							var step = 0.1 * Math.PI/180; // 0.1 deg.
							var max = Math.PI, min = -max;
							var value = Number(editor[ key ]); // get value from editor.
							if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
							if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
							value_input.value = ( RAD2DEG * ( editor[ key ] = value) ).toFixed(1); // string.
						})();
					break;

					case "anisotropy":
						(function(){
							var step = 1/100, max = 1, min = -max;
							var value = Number(editor[ key ]); // get value from editor.
							if ( button === increase_v ) value = THREE.Math.clamp( value+step, min, max );
							if ( button === decrease_v ) value = THREE.Math.clamp( value-step, min, max );
							value_input.value = ( editor[key] = round(value, 2) ).toFixed(2);
						})();
					break;

					case "wrapS":
					case "wrapT":
						updateConstantInputValue([ // order matters...
							THREE.RepeatWrapping,THREE.ClampToEdgeWrapping,THREE.MirroredRepeatWrapping 
						]);
					break;

				}

			//	add undo.
				interval = setTimeout( function(){
					entity_droplist.value && addtoUndo();
					debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
				}, 250);

				debugMode && console.log( "on Mouse Click:", interval );

			}

		})();

		(function(){

			var interval;

		//	const vector_x   = document.getElementById("texture-vector-x-input");
		//	const vector_y   = document.getElementById("texture-vector-y-input");
		//	const increase_x = document.getElementById("texture-vector-x-increase");
		//	const increase_y = document.getElementById("texture-vector-y-increase");
		//	const decrease_x = document.getElementById("texture-vector-x-decrease");
		//	const decrease_y = document.getElementById("texture-vector-y-decrease");
		//	const vector_droplist = document.getElementById("texture-vector-droplist");
		//	const entity_droplist = document.getElementById("texture-entities-droplist");

			increase_x.addEventListener( "mousedown", onMouseDown );
			decrease_x.addEventListener( "mousedown", onMouseDown );
			increase_y.addEventListener( "mousedown", onMouseDown );
			decrease_y.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
			//	debugMode && console.log( "on MouseUp:", interval );
				clearTimeout( interval ); // important!
			});

			increase_x.addEventListener( "click", onMouseClick );
			decrease_x.addEventListener( "click", onMouseClick );
			increase_y.addEventListener( "click", onMouseClick );
			decrease_y.addEventListener( "click", onMouseClick );

			function onMouseDown(){ 

				clearTimeout( interval ); // important!

				if ( !entity_droplist.value ) return;

			//	disabled on mouse down.

				if ( vector_droplist.value === "wrap" ) return;

			//	enabled on mouse down.

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function onUpdate() {

					var key = vector_droplist.value;

					if ( key ) (function(){

						var step = 1/100, max = 1000, min = -max;

						if ( button === increase_x || button === decrease_x ) {
							var value = Number(editor[ key ].x); // get value from editor.
							if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
							if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
							vector_x.value = ( editor[ key ].x = round(value, 2) ).toFixed(2); // string.
						}

						else if ( button === increase_y || button === decrease_y ) {
							var value = Number(editor[ key ].y); // get value from editor.
							if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
							if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
							vector_y.value = ( editor[ key ].y = round(value, 2) ).toFixed(2); // string.
						}

					})();

					var dt = clock.getDelta();
					interval = setTimeout( onUpdate, dt );
				//	debugMode && console.log( "on Update:", interval );

				}, 500);
			}

			function onMouseClick(){

				clearTimeout( interval ); // important!

				if ( !entity_droplist.value ) return;

				var button = this;

				var key = vector_droplist.value;

			//	enabled on mouse click.

				if ( key ) (function(){

					var step = 1/100, max = 1000, min = -max;

					if ( button === increase_x || button === decrease_x ) {
						var value = Number(editor[ key ].x); // get value from editor.
						if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
						vector_x.value = ( editor[ key ].x = round(value, 2) ).toFixed(2);
					//	callWatchers(vector_x, "onchange", "change", value);
					}

					else if ( button === increase_y || button === decrease_y ) {
						var value = Number(editor[ key ].y); // get value from editor.
						if ( button === increase_y ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease_y ) value = THREE.Math.clamp( value-step, min, max );
						vector_y.value = ( editor[ key ].y = round(value, 2) ).toFixed(2);
					//	callWatchers(vector_y, "onchange", "change", value);
					}

				})();

			//	add undo.
				interval = setTimeout( function(){
					entity_droplist.value && addtoUndo();
					debugMode && console.log( "undo:", undo.length, "redo:", redo.length );
				}, 250);

				debugMode && console.log( "on Mouse Click:", interval );

			}

		})();

	//	Texture Editor Watchers.
	//	Watch each object/property individually.

		(function( editor ){

			var interval;
			var texture; // imporant!

			watch( entity_droplist, "onchange", function( property, event, value ){
				texture = texture_entities.getTextureById( value ); // id.
			});

		//	Vectors.
			watch( editor.center, function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture.center[ key ] = editor.center[ key ];
			//	clearTimeout( interval );
			});
			watch( editor.offset, function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture.offset[ key ] = editor.offset[ key ];
			//	clearTimeout( interval );
			});
			watch( editor.repeat, function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture.repeat[ key ] = editor.repeat[ key ];
			//	clearTimeout( interval );
			});

		//	Numbers.
			watch( editor, "anisotropy", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});
			watch( editor, "rotation", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});

		//	Strings.
			watch( editor, "name", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});
			watch( editor, "uuid", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});

		//	Constants.
			watch( editor, "format", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});
			watch( editor, "mapping", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});
			watch( editor, "wrapS", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});
			watch( editor, "wrapT", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});
			watch( editor, "minFilter", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});
			watch( editor, "magFilter", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});
			watch( editor, "type", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});

		//	Boolean.
			watch( editor, "flipY", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});
			watch( editor, "premultiplyAlpha", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});
			watch( editor, "matrixAutoUpdate", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});
			watch( editor, "generateMipmaps", function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
				if (texture) texture[ key ] = editor[ key ];
			//	clearTimeout( interval );
			});

		//	Texture needsUpdate button.

			watch( editor, "needsUpdate", function( key, action, value ){
				if ( texture ) texture[key] = Boolean(editor[key]); // copy.
			});
			needsUpdate_button.addEventListener( "click", function(){
				if ( texture ) texture.needsUpdate = true;
			});

		//	Image. TODO!
			watch( editor.image, function( key, action, value, oldValue ){
				debugMode && console.log("editor:",{"key":key,"action":action,"value":value});
			//	clearTimeout( interval );
			});

		})( editor );

		return editor;  // important!

	})();
