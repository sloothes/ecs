//	## Enviroment

	MW.install( THREE ); // important!

//	Scene.

	const scene = new THREE.Scene();
	scene.name = "scene";


//	Camera.

	const camera = (function(){
		var aspect = (window.innerWidth - 370) / window.innerHeight;
		return new THREE.PerspectiveCamera( 50, aspect, 1, 10000 );
	})();

	camera.name = "camera";
	camera.position.set(0,1,5);


//  Camera Light.

	const cameraLight = (function(){

		var cameraLight = new THREE.DirectionalLight( 0xdfebff, 0.75 );
		cameraLight.name = "camera light";
		cameraLight.castShadow = true;
		cameraLight.position.set( 0, 2, 10 );
		cameraLight.shadow.mapSize.width  = Math.pow(2, 10); // 2048;
		cameraLight.shadow.mapSize.height = Math.pow(2, 10); // 2048;


		var d = 30;
		cameraLight.shadow.camera.left = - d;
		cameraLight.shadow.camera.right = d;
		cameraLight.shadow.camera.top = d;
		cameraLight.shadow.camera.bottom = - d;
		cameraLight.shadow.camera.far = 10000;
		cameraLight.shadow.camera.name = "shadow camera";

		scene.add( cameraLight );

		(function update(){
			requestFrameID = requestAnimationFrame( update );
			cameraLight.position.copy( camera.position );
		})();

		return cameraLight;

	})();

	const shadowCameraHelper = (function(){
		var shadowHelper = new THREE.CameraHelper(cameraLight.shadow.camera);
		shadowHelper.name = "shadow camera helper";
		shadowHelper.visible = false;
	//	scene.add( shadowHelper );
		return shadowHelper;
	})();

//	helper.

	function takeCameraLight( target ){
		cameraLight.target = target;
	}


//  Renderer.

	const renderer = new THREE.WebGLRenderer({
		alpha: true,  // for transparent rendering set alpha:true, important!
		antialias: true,
		preserveDrawingBuffer: true,
	});

	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;
	renderer.setClearAlpha( 1 ); // for transparent rendering set clear alpha: 0.
	renderer.setClearColor( 0x000000, 1 ); // for transparent rendering set clear alpha: 0.
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( (window.innerWidth - 370), window.innerHeight );
	renderer.domElement.style.background = "none";  // transparent rendering. important!
	document.body.appendChild( renderer.domElement );

	window.addEventListener("resize", function onWindowResize() {
		renderer.setSize( (window.innerWidth - 370), window.innerHeight );
		camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
		camera.updateProjectionMatrix();
	});

	(function render(){
		requestFrameID = requestAnimationFrame( render );
		renderer.render( scene, camera );
	})();


//	Mouse.

	const mouse = new THREE.Vector2();

	renderer.domElement.addEventListener("mousemove", function(e) {
		mouse.x = ( e.clientX / this.clientWidth ) * 2 - 1;
		mouse.y = - ( e.clientY / this.clientHeight ) * 2 + 1;
	});


//	World - Octree.

	const world = new MW.World();

	const octree = (function(){
		var x = 150, y = 150, z = 150;
		var min = new THREE.Vector3( -x, -y, -z );
		var max = new THREE.Vector3(  x,  y,  z );
		var partition = 5; // nodes: Math.pow( 8, partition )
		return new MW.Octree( min, max, partition );
	})();

	world.add( octree );

	const clock = new THREE.Clock();

	(function update(){
		requestFrameID = requestAnimationFrame( update );
		var delta = clock.getDelta();
		var elapsed = clock.getElapsedTime();
		world.step( Math.min( delta, 0.02 ) );
	})();


//	Ground (component).

	const ground = new THREE.Mesh(
		new THREE.PlaneGeometry( 300, 300, 1, 1 ).rotateX(-Math.PI/2),
		new THREE.MeshLambertMaterial({ 
			opacity:1, 
			color:0x829ec4,
		})
	);

	ground.name = "ground";
	ground.position.y = 0;
	octree.importThreeMesh( ground ); // important!

//	Ground Helper (component).
	const groundHelper = new THREE.GridHelper( 300, 300, 0x444444, 0x444444 );
	groundHelper.name = "ground helper";
	scene.add( groundHelper );


