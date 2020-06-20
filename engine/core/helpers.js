
//	Global helpers.

	Number.prototype.format = function (){
		return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	};

//	save_file.js
	function saveString( text, filename ) {
		save( new Blob( [ text ], { type: "text/plain" } ), filename );
	}

	function saveArrayBuffer( buffer, filename ) {
		save( new Blob( [ buffer ], { type: "application/octet-stream" } ), filename );
	}

	function save( blob, filename ) {

		var link = document.createElement( "a" );
		link.href = URL.createObjectURL( blob );
		link.download = filename || "untitled";
		link.click();

	}

//	mod.js
	function mod( a, n ) { return ( a % n + n ) % n; }

//	round.js
	function round(number, precision) {
		var shift = function (number, precision, reverseShift) {
			if (reverseShift) {
				precision = -precision;
			}  
			numArray = ("" + number).split("e");
			return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
		};
		return shift(Math.round(shift(number, precision, false)), precision, true);
	}

//	array_move.js
	function array_move( arr, old_index, new_index ){

		if (new_index >= arr.length) {
			var k = new_index - arr.length + 1;
			while (k--) {
				arr.push(undefined);
			}
		}

		arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
	}

//	deep_copy.js
	function deepCopy(obj) {
		if (Object.prototype.toString.call(obj) === "[object Array]") {
			var out = [], i = 0, len = obj.length;
			for ( ; i < len; i++ ) {
				out[i] = arguments.callee(obj[i]);
			}
		//	console.log("out:", out);
			return out;
		}
		if (typeof obj === "object") {
			var out = {}, i;
			for ( i in obj ) {
				out[i] = arguments.callee(obj[i]);
			}
		//	console.log("out:", out);
			return out;
		}
		return obj;
	}

	function copyObject(obj) {

	//	1. copy has same prototype as orig
		var copy = Object.create(Object.getPrototypeOf(obj));

	//	2. copy has all of orig’s properties
		copyOwnPropertiesFrom(copy, obj);

		return copy; // warning: shallow copy!

	//	The properties are copied from orig to copy via this function:

		function copyOwnPropertiesFrom(target, source) {
			Object.getOwnPropertyNames(source).forEach(function(propKey) {
				var desc = Object.getOwnPropertyDescriptor(source, propKey);
				Object.defineProperty(target, propKey, desc);
			});
			return target;
		};

	}

//	three-quaternion-from-normal.
//	Builds a ThreeJS quaternion from a normal vector.
//	This is useful for getting meshes to 'point' in the direction of a vector.

//	Usage: quat = quaternionFromNormal(normal, [quaternionTarget])
//	Builds a quaternion from the normal (a normalized THREE.Vector3), 
//	storing the result in quaternionTarget (a THREE.Quaternion) 
//	or creating a new quaternion object if no target is specified.
//	The quaternion target is returned.

//	Example:
//	Say we want mesh to point from A to B point.
	//	var A = new THREE.Vector3(1, 0, 0);
	//	var B = new THREE.Vector3(2, 5,-1);
//	Get normal A->B.
	//	var normal = B.clone().sub(A).normalize();
//	Get orientation.
	//	var quaternion = quaternionFromNormal(normal);
//	Apply orientation to mesh.
	//	mesh.quaternion.copy(quaternion);

	function quaternionFromNormal( normal, quaternion ){

		return setDirection(normal, quaternion);

		function setDirection(normal, quaternion) {
			quaternion = quaternion || new THREE.Quaternion();
		//	vector is assumed to be normalized.
			if (normal.y > 0.99999) {
				quaternion.set(0, 0, 0, 1);
			} else if (normal.y < -0.99999) {
				quaternion.set(1, 0, 0, 0);
			} else {
				var axis = new THREE.Vector3();
				axis.set(normal.z, 0, -normal.x).normalize();
				var radians = Math.acos(normal.y);
				quaternion.setFromAxisAngle(axis, radians);
			}

			return quaternion;
		}
	}

//	Returns an object with all in-scene materials
//	keeping material.uuid but new material.id(s).

	function cloneSceneMaterials(){

		var meta = { 
			geometries:{}, materials:{}, 
			textures:{}, images:{}, shapes:{} 
		}; 

		scene.toJSON( meta );

		var loader = new THREE.ObjectLoader();
		return loader.parseMaterials( meta.materials );
	}
