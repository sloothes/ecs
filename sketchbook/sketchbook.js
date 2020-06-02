//	Camera controller.

	function CameraController( camera ){

		var sensitivityX = 1;
		var sensitivityY = sensitivityX;

		this.camera = camera;
		this.target = new THREE.Vector3();
		this.sensitivity = new THREE.Vector2(sensitivityX, sensitivityY);

		this.radius = 3;
		this.theta = 0;
		this.phi = 0;

		this.onMouseDownPosition = new THREE.Vector2();
		this.onMouseDownTheta = this.theta;
		this.onMouseDownPhi = this.phi;

		this.setSensitivity = function(sensitivityX, sensitivityY ) {
			this.sensitivity = new THREE.Vector2(sensitivityX, sensitivityY);
		};

		this.setRadius = function(value){
			this.radius = Math.max(0.001, value);
		};

		this.move = function(deltaX, deltaY){
			this.theta -= deltaX * this.sensitivity.x;
			this.theta %= 720;
			this.phi += deltaY * this.sensitivity.y;
			this.phi = Math.min(170, Math.max(-170, this.phi));
		};

		this.update = function(){
			this.camera.position.x = this.target.x + this.radius * Math.sin(this.theta * Math.PI / 360) * Math.cos(this.phi * Math.PI / 360);
			this.camera.position.y = this.target.y + this.radius * Math.sin(this.phi * Math.PI / 360);
			this.camera.position.z = this.target.z + this.radius * Math.cos(this.theta * Math.PI / 360) * Math.cos(this.phi * Math.PI / 360);
			this.camera.updateMatrix();
			this.camera.lookAt(this.target);
		};
	}

//	InputManager.

	function InputManager (world, domElement){

		this.world = world;
		this.domElement = domElement || document.body;
		this.pointerLock = this.world.params.Pointer_Lock;
		this.isLocked = false;

	//	Bindings for later event use.

	//	Mouse.
		this.boundOnMouseDown = evt => this.onMouseDown(evt);
		this.boundOnMouseMove = evt => this.onMouseMove(evt);
		this.boundOnMouseUp = evt => this.onMouseUp(evt);
		this.boundOnMouseWheelMove = evt => this.onMouseWheelMove(evt);

	//	Pointer lock.
		this.boundOnPointerlockChange = evt => this.onPointerlockChange(evt);
		this.boundOnPointerlockError = evt => this.onPointerlockError(evt);

	//	Keys.
		this.boundOnKeyDown = evt => this.onKeyDown(evt);
		this.boundOnKeyUp = evt => this.onKeyUp(evt);

	//	Init event listeners.

	//	Mouse.
		this.domElement.addEventListener("mousedown", this.boundOnMouseDown, false);
		document.addEventListener("wheel", this.boundOnMouseWheelMove, false);
		document.addEventListener("pointerlockchange", this.boundOnPointerlockChange, false);
		document.addEventListener("pointerlockerror", this.boundOnPointerlockError, false);

	//	Keys.
		document.addEventListener("keydown", this.boundOnKeyDown, false);
		document.addEventListener("keyup", this.boundOnKeyUp, false);

		this.setPointerLock = function(enabled){
			this.pointerLock = enabled;
		}

		this.onPointerlockChange = function(event){
			if (document.pointerLockElement === this.domElement){
				this.domElement.addEventListener("mousemove", this.boundOnMouseMove, false);
				this.domElement.addEventListener("mouseup", this.boundOnMouseUp, false);
				this.isLocked = true;
			} else {
				this.domElement.removeEventListener("mousemove", this.boundOnMouseMove, false);
				this.domElement.removeEventListener("mouseup", this.boundOnMouseUp, false);
				this.isLocked = false;
			}
		}

		this.onPointerlockError = function(event){
			console.error("PointerLockControls: Unable to use Pointer Lock API");
		}

		this.onMouseDown = function(event){
			if (this.pointerLock) {
				this.domElement.requestPointerLock();
			} else {
				this.domElement.addEventListener("mousemove", this.boundOnMouseMove, false);
				this.domElement.addEventListener("mouseup", this.boundOnMouseUp, false);
			}

			if (this.world.gameMode !== undefined) {
				this.world.gameMode.handleAction(event, 'mouse' + event.button, true);
			}
		}

		this.onMouseMove = function(event) {
			if (this.world.gameMode !== undefined) {
				this.world.gameMode.handleMouseMove(event, event.movementX, event.movementY);
			}
		}

		this.onMouseUp = function(event) {
			if (!this.pointerLock) {
				this.domElement.removeEventListener("mousemove", this.boundOnMouseMove, false);
				this.domElement.removeEventListener("mouseup", this.boundOnMouseUp, false);
			}

			if (this.world.gameMode !== undefined) {
				this.world.gameMode.handleAction(event, 'mouse' + event.button, false);
			}
		}

		this.onKeyDown = function(event) {
			if (this.world.gameMode !== undefined) {
				this.world.gameMode.handleAction(event, event.keyCode, true);
			}
		}

		this.onKeyUp = function(event) {
			if (this.world.gameMode !== undefined) {
				this.world.gameMode.handleAction(event, event.keyCode, false);
			}
		}

		this.onMouseWheelMove = function(event) {
			if (this.world.gameMode !== undefined) {
				this.world.gameMode.handleScroll(event, event.deltaY);
			}
		}
	}


//	Controls.

	function EventControl(){

		this.value = false;
		this.justPressed = false;
		this.justReleased = false;
	}

	function LerpControl(){

		this.value = false;
		this.floatValue = 0;

	}

//	GameModes.

	function GameModesBase(){

		this.init = function(){};
		this.update = function() {};

		this.handleAction = function(event, key, value) {
			key = event.keyCode;

			if (key == '84' && value == true) {
				if (this.world.timeScaleTarget < 0.5) {
					this.world.timeScaleTarget = 1;
				} else {
					this.world.timeScaleTarget = 0.3;
				}
			}
		};

		this.handleScroll = function(event, value) {};
		this.handleMouseMove = function(event, deltaX, deltaY) {};

		this.checkIfWorldIsSet = function(){
			if(this.world === undefined) {
				console.error('Calling gameMode init() without having specified gameMode\'s world first: ' + this);
			}
		};

		this.scrollTheTimeScale = function(scrollAmount) {

		// Changing time scale with scroll wheel
			const timeScaleBottomLimit = 0.003;
			const timeScaleChangeSpeed = 1.3;

			if (scrollAmount > 0) {
				this.world.timeScaleTarget /= timeScaleChangeSpeed;
				if (this.world.timeScaleTarget < timeScaleBottomLimit) this.world.timeScaleTarget = 0;
			} else {
				this.world.timeScaleTarget *= timeScaleChangeSpeed;
				if (this.world.timeScaleTarget < timeScaleBottomLimit) this.world.timeScaleTarget = timeScaleBottomLimit;
				this.world.timeScaleTarget = Math.min(this.world.timeScaleTarget, 1);
				if (this.world.params.Time_Scale > 0.9) this.world.params.Time_Scale *= timeScaleChangeSpeed;
			}
		};
	}

//	Character controls game mode. Allows player to control a character.
//	@param {Character} character Character to control 

	function CharacterControls( character ){

		GameModesBase.call( this );

		this.character = character;

	// 	Keymap.

		this.keymap = {

			'87': { action: 'up' },
			'83': { action: 'down' },
			'65': { action: 'left' },
			'68': { action: 'right' },
			'16': { action: 'run' },
			'32': { action: 'jump' },
			'69': { action: 'use' },

		// 	Mouse events are generated in the input manager.

			// 	'mouse' + event.button.
			'mouse0': { action: 'primary' },
			'mouse1': { action: 'secondary' },
			'mouse2': { action: 'tertiary' }
		};

		this.init = function() {

			this.checkIfWorldIsSet();

			this.world.cameraController.setRadius(1.8);
			this.world.cameraDistanceTarget = 1.8;
			this.world.dirLight.target = this.character;
		};

	//	Handles game keys based on supplied inputs.
	//	@param {*} event Keyboard or mouse event
	//	@param {char} key Key or button pressed
	//	@param {boolean} value Value to be assigned to action

		this.handleAction = function(event, key, value) {

			GameModesBase.handleAction(event, key, value);

			if (key == '86' && value == true) {

				if(this.world.cameraDistanceTarget > 1.8) {
					this.world.cameraDistanceTarget = 1.1;
				}
				else if(this.world.cameraDistanceTarget > 1.3) {
					this.world.cameraDistanceTarget = 2.1;
				}
				else if(this.world.cameraDistanceTarget > 0) {
					this.world.cameraDistanceTarget = 1.6;
				}

			} else if (key == '70' && value == true) {

				let forward = new THREE.Vector3().copy(this.character.orientation);
				let ball = new Object();
				ball.setPhysics(new ObjectPhysics.Sphere({
					mass: 1,
					radius: 0.3,
					position: new CANNON.Vec3().copy(this.character.position).vadd(forward)
				}));
				ball.setModelFromPhysicsShape();
				this.world.add(ball);

				this.world.balls.push(ball);

				if(this.world.balls.length > 10) {
					this.world.remove(this.world.balls[0]);
					_.pull(this.world.balls, this.world.balls[0]);
				}
			}

		//	Free cam.
			if (key == '67' && value == true && event.shiftKey == true) {
				this.character.resetControls();
				this.world.setGameMode(new GameModes.FreeCameraControls(this));
			}

		// 	Is key bound to action.
			if (key in this.keymap) {
				this.character.setControl(this.keymap[key].action, value);
			}

		};

		this.handleScroll = function(event, value) {
			this.scrollTheTimeScale(value);
		};

		this.handleMouseMove = function(event, deltaX, deltaY) {
			this.world.cameraController.move(deltaX, deltaY);
		};

		this.update = function() {

			if ( !_.includes(this.world.characters, this.character ) ) {

				this.world.setGameMode( new GameModes.FreeCameraControls() );

			} else {

				//	Look in camera's direction
				this.character.viewVector = new THREE.Vector3().subVectors(this.character.position, this.world.camera.position);

				//	Make light follow player (for shadows)
				this.world.dirLight.position.set(
					this.character.position.x + this.world.sun.x * 15,
					this.character.position.y + this.world.sun.y * 15,
					this.character.position.z + this.world.sun.z * 15);

				//	Position camera
				this.world.cameraController.target.set(
					this.character.position.x,
					this.character.position.y + this.character.height / 1.7,
					this.character.position.z
				);
			}
		};
	}

	CharacterControls.prototype = Object.create( GameModesBase.prototype );
	CharacterControls.prototype.constructor = CharacterControls;

//	Object.

	function SbObject( model, physics ) {

		THREE.Object3D.call( this );

		this.isObject = true;

		this.model = model;
		this.physics = physics;

		this.update = function(timeStep) {

			if (this.physics.visual != undefined) {
				this.physics.visual.position.copy(this.position);
				this.physics.visual.quaternion.copy(this.quaternion);
			}

			if (this.model != undefined) {
				this.model.position.copy(this.position);
				this.model.quaternion.copy(this.quaternion);
			}
		};

		this.setModel = function(model) {
			this.model = model;
		};

		this.setModelFromPhysicsShape = function() {
			this.model = this.physics.getVisualModel({ visible: true, wireframe: false });
		};

		this.setPhysics = function(physics) {
			this.physics = physics;
		};

		this.addToWorld = function(world) {

			if (_.includes(world.objects, this)) {

				console.warn('Adding object to a world in which it already exists.');

			} else  {

				world.objects.push(this);

				if (this.physics.physical !== undefined) {
					world.physicsWorld.addBody(this.physics.physical);
				}

				if (this.physics.visual !== undefined) {
					world.graphicsWorld.add(this.physics.visual);
				}

				if (this.model !== undefined) {
					world.graphicsWorld.add(this.model);
				}
			}
		};

	}

	SbObject.prototype = Object.create( THREE.Object3D.prototype );
	SbObject.prototype.constructor = SbObject;











//	export { CameraController } from './core/CameraController';
//	export { Character } from './characters/Character';
//	export { CharacterAI } from './characters/CharacterAI/_export';
//	export { CharacterStates } from './characters/CharacterStates/_export';
//	export { Controls } from './core/Controls';
//	export { GameModes } from './gameModes/_export';
//	export { InputManager } from './core/InputManager';
//	export { Item } from './objects/Item';
//	export { Object } from './objects/Object';
//	export { ObjectPhysics } from './objects/ObjectPhysics';
//	export { Shaders } from '../lib/shaders/Shaders';
//	export { Simulation } from './simulation/_export';
//	export { Utilities } from './core/Utilities';
//	export { World } from './core/World';

//	import * as THREEImport from 'three';
//	export let THREE = THREEImport;

//	export { FBXLoader } from '../lib/utils/FBXLoader';
//	export { default as GLTFLoader } from 'three-gltf-loader';
