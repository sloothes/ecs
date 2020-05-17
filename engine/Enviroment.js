//	## Enviroment

	MW.install( THREE ); // important!

//	Scene.
	const scene = new THREE.Scene();

//	Camera.
	const camera = (function(){
		var aspect = (window.innerWidth - 370) / window.innerHeight;
		return new THREE.PerspectiveCamera( 50, aspect, 1, 10000 );
	})();

	camera.position.set(0, 20, 50);

//  Camera Light.

	const cameraLight = (function(){

		var cameraLight = new THREE.DirectionalLight( 0xdfebff, 0.75 );
		cameraLight.position.set( 0, 500, 300 );
		cameraLight.castShadow = true;
		cameraLight.shadow.mapSize.width  = Math.pow(2, 10); // 2048;
		cameraLight.shadow.mapSize.height = Math.pow(2, 10); // 2048;

		var d = 30;
		cameraLight.shadow.camera.left = - d;
		cameraLight.shadow.camera.right = d;
		cameraLight.shadow.camera.top = d;
		cameraLight.shadow.camera.bottom = - d;
		cameraLight.shadow.camera.far = 10000;

		var shadowHelper = new THREE.CameraHelper(cameraLight.shadow.camera);
		shadowHelper.visible = false;

		scene.add( cameraLight, shadowHelper  );

		return cameraLight;
	})();

	(function update(){
		requestAnimationFrame( update );
		cameraLight.position.copy( camera.position );
	})();

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
		requestAnimationFrame( render );
		renderer.render( scene, camera );
	})();

//	Mouse (component).

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
		requestAnimationFrame( update );
		var delta = clock.getDelta();
		var elapsed = clock.getElapsedTime();
		world.step( Math.min( delta, 0.02 ) );
	})();
