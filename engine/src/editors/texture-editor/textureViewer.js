//	textureViewer.js

	const textureViewer = {

		canvas: document.querySelector("canvas#texture-viewer"),

	};

//	Texture Viewer scene.

	(function( textureViewer ){

	//	Viewer scene.

		textureViewer.scene = (function(){
			var scene = new THREE.Scene();
			scene.name = "viewer scene";
			return scene;
		})();

	//	Viewer camera.

		textureViewer.camera = (function(){
		//	var aspect = canvas.clientWidth / canvas.clientWidth;
			var camera  = new THREE.OrthographicCamera( -128,128,128,-128, 1, 1000 );
			camera.name = "viewer camera";
			camera.position.y = 10;
			camera.lookAt( 0,0,0 );
			textureViewer.scene.add( camera );
			return camera;
		})();

	//	Viewer light.

		textureViewer.light = (function(){
			var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
			light.name = "viewer light";
			camera.position.set( 0,10,0 );
			textureViewer.scene.add( light );
			return light;
		})();

	//	Viewer grid.

		textureViewer.grid = (function(){
			var helper = new THREE.GridHelper( 250, 10, 0x444444, 0x444444 );
			helper.name = "viewer grid";
			helper.position.y = 0.01;
			textureViewer.scene.add( helper );
			return helper;
		})();

	//  Viewr Renderer.

		textureViewer.renderer = new THREE.WebGLRenderer({
			alpha: true,  // for transparent rendering set alpha:true, important!
			canvas: textureViewer.canvas,
			antialias: true,
			preserveDrawingBuffer: true,
		});

		textureViewer.renderer.gammaInput = true;
		textureViewer.renderer.gammaOutput = true;
		textureViewer.renderer.shadowMap.enabled = true;
		textureViewer.renderer.setClearAlpha( 0 ); // for transparent rendering set clear alpha: 0.
		textureViewer.renderer.setClearColor( 0x000000, 0 ); // for transparent rendering set clear alpha: 0.
		textureViewer.renderer.setPixelRatio( window.devicePixelRatio );
		textureViewer.renderer.setSize( textureViewer.canvas.width, textureViewer.canvas.height );
		textureViewer.renderer.domElement.style.background = "none";  // transparent rendering. important!

		(function render(){
			requestAnimationFrame( render );
			textureViewer.renderer.render( textureViewer.scene, textureViewer.camera );
		})();

	//	Texture Viewer material.

		textureViewer.material = (function(){
			var mesh = new THREE.Mesh(
				new THREE.PlaneGeometry( 252, 252, 1, 1 ).rotateX(-Math.PI/2),
				new THREE.MeshLambertMaterial({ opacity:1, color:0x000000 })
			);  
			mesh.name = "texture viewer";
			mesh.material.name = "TextureViewerMaterial";
		//	material_entities.add( mesh.material );
			textureViewer.scene.add( mesh );
			return mesh.material;
		})();

	//	Texture Viewer center helper.

		textureViewer.center = (function(){

			var object = new THREE.Object3D(); // helper.
			var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

		//	cycle.

			(function(){
				var cycleGeometry = new THREE.CircleGeometry(5,32).rotateX(-Math.PI/2);
				var geometry = new THREE.EdgesGeometry( cycleGeometry );
				var segments = new THREE.LineSegments( geometry, material );
				object.add( segments );
			})();

		//	haircross.

			(function(){
				var geometry = new THREE.Geometry();
				geometry.vertices.push(
					new THREE.Vector3( -10, 0, 0 ),
					new THREE.Vector3(  10, 0, 0 )
				);
				var segments = new THREE.LineSegments( geometry, material );
				object.add( segments );
			})();

			(function(){
				var geometry = new THREE.Geometry();
				geometry.vertices.push(
					new THREE.Vector3( 0, 0, -10 ),
					new THREE.Vector3( 0, 0,  10 )
				);
				var segments = new THREE.LineSegments( geometry, material );
				object.add( segments );
			})();

			return object;
		})();

		textureViewer.scene.add( textureViewer.center );
		textureViewer.center.position.set(-125,0.1,125); // (x,y) = (0,0) important!
		debugMode && console.log( textureViewer.center );

	//	dispose.

		textureViewer.dispose = function(){

			(function( material ){
			//	dispose textures.
				material && material.map && material.map.dispose && material.map.dispose();
				material && material.bumpMap && material.bumpMap.dispose && material.bumpMap.dispose();
				material && material.alphaMap && material.alphaMap.dispose && material.alphaMap.dispose();
				material && material.normalMap && material.normalMap.dispose && material.normalMap.dispose();
				material && material.emissiveMap && material.emissiveMap.dispose && material.emissiveMap.dispose();
				material && material.roughnessMap && material.roughnessMap.dispose && material.roughnessMap.dispose();
				material && material.metalnessMap && material.metalnessMap.dispose && material.metalnessMap.dispose();
				material && material.displacementMap && material.displacementMap.dispose && material.displacementMap.dispose();
				material && material.lightMap && material.lightMap.dispose && material.lightMap.dispose();
				material && material.envMap && material.envMap.dispose && material.envMap.dispose();
				material && material.aoMap && material.aoMap.dispose && material.aoMap.dispose();
			})( textureViewer.material );

			(function(){
			//	remove textures.
				textureViewer.material.map = null;
				textureViewer.material.bumpMap = null;
				textureViewer.material.alphaMap = null;
				textureViewer.material.normalMap = null;
				textureViewer.material.emissiveMap = null;
				textureViewer.material.roughnessMap = null;
				textureViewer.material.metalnessMap = null;
				textureViewer.material.displacementMap = null;
				textureViewer.material.lightMap = null;
				textureViewer.material.envMap = null;
				textureViewer.material.aoMap = null;
			})();

		//	update material.
			textureViewer.material.needsUpdate = true; // important!
		}

	//	reset.

		textureViewer.reset = function(){
			textureViewer.dispose();
			textureViewer.material.color.setHex(0x000000);
			textureViewer.center.position.set(-125, 0.1, 125); // reset!
		}

	})( textureViewer );


/*	======================================================================================  */


//	texture-viewer-center.js

//	Experimental (Independent texture viewer center helper).
//	if not texture entity selected ( !entity_droplist.value )
//	move texture viewer center but not update texture editor.

	(function(viewer,vector_x,vector_y,increase_x,decrease_x,increase_y,decrease_y,droplist){

	//	var viewer     = textureViewer;
	//	var vector_x   = document.querySelector("input#texture-vector-x-input");
	//	var vector_y   = document.querySelector("input#texture-vector-y-input");
	//	var increase_x = document.querySelector("li#texture-vector-x-increase");
	//	var decrease_x = document.querySelector("li#texture-vector-x-decrease");
	//	var increase_y = document.querySelector("li#texture-vector-y-increase");
	//	var decrease_y = document.querySelector("li#texture-vector-y-decrease");
	//	var droplist   = document.querySelector("select#texture-entities-droplist");

		var interval;

		function onMouseDown(){ 

			if ( droplist.value ) return; // important!

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var step = 1, max = 125, min = -125;

				if ( button === increase_x || button === decrease_x ) {
					var value = viewer.center.position.x; // get value from center position (x).
					if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
					viewer.center.position.x = value;  // bypass editor (x).
					vector_x.value = (0.5 + (value/250)).toFixed(2); // bypass editor (x).
				}

				else if ( button === increase_y || button === decrease_y ) {
					var value = viewer.center.position.z; // get value from center position (z).
					if ( button === increase_y ) value = THREE.Math.clamp( value-step, min, max );
					if ( button === decrease_y ) value = THREE.Math.clamp( value+step, min, max );
					viewer.center.position.z = value;  // bypass editor (z).
					vector_y.value = (0.5 - (value/250)).toFixed(2); // bypass editor (z).
				}

				var dt = clock.getDelta();
				interval = setTimeout( update, dt );
			//	debugMode && console.log( "on center update:", interval );

			}, 500);

		}

		increase_x.addEventListener( "mousedown", onMouseDown );
		decrease_x.addEventListener( "mousedown", onMouseDown );
		increase_y.addEventListener( "mousedown", onMouseDown );
		decrease_y.addEventListener( "mousedown", onMouseDown );

		window.addEventListener( "mouseup", function (){
		//	debugMode && console.log( "on MouseUp:", interval );
			clearTimeout( interval ); // important!
		});

	})(
		textureViewer,
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("li#texture-vector-x-increase"), // increase_x,
		document.querySelector("li#texture-vector-x-decrease"), // decrease_x,
		document.querySelector("li#texture-vector-y-increase"), // increase_y,
		document.querySelector("li#texture-vector-y-decrease"), // decrease_y,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	);

//	Overwrite vector inputs reset.

//	Vector droplist on change watchers (Experimental).
//	Experimental (Independent texture viewer center helper).
//	if not texture entity selected ( !entity_droplist.value )
//	always display the texture viewer center helper value.

//	var viewer   = textureViewer;
//	var vector_x = document.querySelector("input#texture-vector-x-input"); // vector_x,
//	var vector_y = document.querySelector("input#texture-vector-y-input"); // vector_y,
//	var vector_droplist = document.querySelector("select#texture-vector-droplist"); // vector_droplist,
//	var entity_droplist = document.querySelector("select#texture-entities-droplist") // entity_droplist,

	(function(viewer,vector_x,vector_y,vector_droplist,entity_droplist){

		watch( entity_droplist, "onchange", function( property, event, value ){

			if ( value === "" ) {
				vector_x.value = (0.5 + (viewer.center.position.x/250)).toFixed(2); // display center value (x).
				vector_y.value = (0.5 - (viewer.center.position.z/250)).toFixed(2); // display center value (z).
			}

		});

		watch( vector_droplist, "onchange", function( property, event, value ){

			callWatchers( entity_droplist, "onchange", property, event, entity_droplist.value );

		});

		//	if ( entity_droplist.value === "" ) {
		//		vector_x.value = (0.5 + (viewer.center.position.x/250)).toFixed(2); // display center value (x).
		//		vector_y.value = (0.5 - (viewer.center.position.z/250)).toFixed(2); // display center value (z).
		//	}

	})(
		textureViewer, // viewer
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	);


/*	======================================================================================  */
