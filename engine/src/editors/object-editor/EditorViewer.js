//	EditorViewer.js

	const editorViewer = {

		canvas: document.querySelector("canvas#editor-viewer"),

	};

//	Texture Viewer scene.

	(function( viewer ){

	//	Viewer scene.

		viewer.scene = (function(){
			var scene = new THREE.Scene();
			scene.name = "viewer scene";
			return scene;
		})();

	//	Viewer camera.

		viewer.camera = (function(){
			var aspect = (viewer.canvas.width / viewer.canvas.height);
			return new THREE.PerspectiveCamera( 35, aspect, 1, 10000 );
		})();

	//	Viewer controls.

		viewer.controls = (function(){
			return new THREE.EditorControls(viewer.camera, viewer.canvas)
		})();

	//	Viewer light.

		viewer.light = (function(){
			var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
			light.name = "viewer light";
			light.position.set( 0,100,0 );
			viewer.scene.add( light );
			return light;
		})();

	//	Viewer grid.

		viewer.grid = (function(){
			var helper = new THREE.GridHelper( 10, 10, 0x444444, 0x444444 );
			helper.name = "viewer grid";
			helper.position.y = 0.01;
			viewer.scene.add( helper );
			return helper;
		})();

	//  Viewr Renderer.

		viewer.renderer = new THREE.WebGLRenderer({
			alpha: true,  // for transparent rendering set alpha:true, important!
			canvas: viewer.canvas,
			antialias: true,
			preserveDrawingBuffer: true,
		});

		viewer.renderer.gammaInput = true;
		viewer.renderer.gammaOutput = true;
		viewer.renderer.shadowMap.enabled = true;
		viewer.renderer.setClearAlpha( 0 ); // for transparent rendering set clear alpha: 0.
		viewer.renderer.setClearColor( 0x000000, 0 ); // for transparent rendering set clear alpha: 0.
		viewer.renderer.setPixelRatio( window.devicePixelRatio );
		viewer.renderer.setSize( viewer.canvas.width, viewer.canvas.height );
		viewer.renderer.domElement.style.background = "none";  // transparent rendering. important!

		(function render(){
			requestAnimationFrame( render );
			viewer.renderer.render( viewer.scene, viewer.camera );
		})();

		viewer.camera.position.set(0,10,0);
		viewer.controls.focus(viewer.grid);
		viewer.camera.lookAt(viewer.controls.center);
		viewer.camera.position.y = 16.5;

	})( editorViewer );


//	Add/Copy an object to editor viewer (EXPERIMENTAL).

	(function(viewer,entity_droplist){

		var object; // keeps track of select object.

		watch(entity_droplist, "onchange", function( property, event, value ){

		//	remove old object.
			if ( object ) viewer.scene.remove( object );

		//	choose new object.
			object = getObjectByEntityId( value ); if ( !object ) return;

		//	change object parent (here is the trick; this will draw a copy(?) of
		//	the object in viewer scene without remove the object from main scene).
			object.parent = viewer.scene; // important!

		//	Add object to viewer scene.
			viewer.scene.add( object );

		//	view setup.
			viewer.camera.position.z = -20;
			viewer.controls.focus( object, true );
			viewer.camera.lookAt( viewer.controls.center );

		});

	})( editorViewer, document.querySelector("select#editor-entities-droplist") ); // viewer, entity_droplist