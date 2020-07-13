
//	Viewport tab.

	TabUI.add( "Viewport", "viewport-tab" );
	TabUI.append( "Viewport" );

	(function( tab ){

	//	Front viewer.
	//	var tab = TabUI.Viewport.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:260px;text-align:center;";

		var canvas = document.createElement("canvas");
		canvas.width = 256; canvas.height = 256;
		canvas.id = "front-view-canvas";
		canvas.style.cssText = "max-width:300px;max-height:300px;border:1px solid;margin:auto;";

	//	Front view (z).

		frontViewCamera = (function( d ){

			var camera = new THREE.OrthographicCamera( -d, +d, +d, -d, 1, 1000 );
			camera.name = "front camera";
			camera.position.z = 50;
			camera.lookAt( 0,1,0 );
			scene.add( camera );

			var renderer = new THREE.WebGLRenderer({
				alpha: true,  // for transparent rendering set alpha:true, important!
				canvas: canvas,
				antialias: true,
				preserveDrawingBuffer: true,
			});

			renderer.gammaInput = true;
			renderer.gammaOutput = true;
			renderer.shadowMap.enabled = true;
			renderer.setClearAlpha( 1 ); // for transparent rendering set clear alpha: 0.
			renderer.setClearColor( 0x000000, 1 ); // for transparent rendering set clear alpha: 0.
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( canvas.width, canvas.height );
			renderer.domElement.style.background = "none";  // transparent rendering. important!

			(function render(){
				requestFrameID = requestAnimationFrame( render );
				camera.position.x = localPlayer.position.x;
				camera.position.y = localPlayer.position.y;
				camera.lookAt( localPlayer.position );
				renderer.render( scene, camera );
			})();

			return camera;

		})( 1.5 );

		row.appendChild( canvas );
		tab.appendChild( row );

	})( TabUI.Viewport.tab );

	(function( tab ){

	//	Top viewer.
	//	var tab = TabUI.Viewport.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:260px;text-align:center;";

		var canvas = document.createElement("canvas");
		canvas.width = 256; canvas.height = 256;
		canvas.id = "top-view-canvas";
		canvas.style.cssText = "max-width:300px;max-height:300px;border:1px solid;margin:auto;";

	//	Top view (y).

		topViewCamera = (function( d ){

			var camera = new THREE.OrthographicCamera( -d, +d, +d, -d, 1, 1000 );
			camera.name = "top camera";
			camera.position.y = 50;
			camera.lookAt( 0,0,0 );
			scene.add( camera );

			var renderer = new THREE.WebGLRenderer({
				alpha: false,  // for transparent rendering set alpha:true, important!
				canvas: canvas,
				antialias: true,
				preserveDrawingBuffer: true,
			});

			renderer.gammaInput = true;
			renderer.gammaOutput = true;
			renderer.shadowMap.enabled = true;
			renderer.setClearAlpha( 1 ); // for transparent rendering set clear alpha: 0.
			renderer.setClearColor( 0x000000, 1 ); // for transparent rendering set clear alpha: 0.
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( canvas.width, canvas.height );
			renderer.domElement.style.background = "none";  // transparent rendering. important!

			(function render(){
				requestFrameID = requestAnimationFrame( render );
				camera.position.x = localPlayer.position.x;
				camera.position.z = localPlayer.position.z;
				camera.lookAt( localPlayer.position );
				renderer.render( scene, camera );
			})();

			return camera;

		})( 10 );

		row.appendChild( canvas );
		tab.appendChild( row );

	})( TabUI.Viewport.tab );

	(function( tab ){

	//	Side viewer.
	//	var tab = TabUI.Viewport.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:260px;text-align:center;";

		var canvas = document.createElement("canvas");
		canvas.width = 256; canvas.height = 256;
		canvas.id = "side-view-canvas";
		canvas.style.cssText = "max-width:300px;max-height:300px;border:1px solid;margin:auto;";

	//	Front view (x).

		frontViewCamera = (function( d ){

			var camera = new THREE.OrthographicCamera( -d, +d, +d, -d, 1, 1000 );
			camera.name = "front camera";
			camera.position.x = 50;
			camera.lookAt( 0,1,0 );
			scene.add( camera );

			var renderer = new THREE.WebGLRenderer({
				alpha: true,  // for transparent rendering set alpha:true, important!
				canvas: canvas,
				antialias: true,
				preserveDrawingBuffer: true,
			});

			renderer.gammaInput = true;
			renderer.gammaOutput = true;
			renderer.shadowMap.enabled = true;
			renderer.setClearAlpha( 1 ); // for transparent rendering set clear alpha: 0.
			renderer.setClearColor( 0x000000, 1 ); // for transparent rendering set clear alpha: 0.
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( canvas.width, canvas.height );
			renderer.domElement.style.background = "none";  // transparent rendering. important!

			(function render(){
				requestFrameID = requestAnimationFrame( render );
				camera.position.z = localPlayer.position.z;
				camera.position.y = localPlayer.position.y;
				camera.lookAt( localPlayer.position );
				renderer.render( scene, camera );
			})();

			return camera;

		})( 1.5 );

		row.appendChild( canvas );
		tab.appendChild( row );

	})( TabUI.Viewport.tab );
