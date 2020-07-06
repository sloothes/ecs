//	MaterialEditor.js

	function MaterialEditor(){
		var material = new THREE.Material();
		Object.setPrototypeOf( material, MaterialEditor.prototype );
		return material; // important!
	}

	MaterialEditor.prototype = Object.create(THREE.Material.prototype); // important!

	MaterialEditor.prototype.copy = function( source ){ 
		THREE[ source.type ].prototype.copy.call( this, source ); // important!
		return this;
	};

	MaterialEditor.prototype.reset = function(){ 

		var editor = this;

		var keys = "";
		keys += "color,emissive,specular,normalScale,displacementScale,";
		keys += "name,type,uuid,side,opacity,alphaTest,transparent,premultipliedAlpha,";
		keys += "fog,lights,visible,overdraw,dithering,precision,colorWrite,flatShading,vertexColors,";
		keys += "blending,blendSrc,blendDst,blendEquation,blendSrcAlpha,blendDstAlpha,blendEquationAlpha,";
		keys += "depthFunc,depthTest,depthWrite,shadowSide,clipShadows,clipIntersection,";
		keys += "polygonOffset,polygonOffsetUnits,polygonOffsetFactor,";
		keys += "map,aoMap,envMap,bumpMap,alphaMap,lightMap,normalMap,specularMap,";
		keys += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap,";
		keys += "metalness,roughness,bumpScale,reflectivity,";
		keys += "refractionRatio,displacementBias,normalMapType,";
		keys += "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,";
		keys += "wireframe,wireframeLinecap,wireframeLinejoin,wireframeLinewidth,";
		keys += "skinning,morphTargets,morphNormals,combine,shininess,";
		keys += "depthPacking,scale,gapSize,linecap,linejoin,linewidth,";
		keys += "dashSize,size,rotation,sizeAttenuation,needsUpdate";

		var source = new THREE.MeshStandardMaterial();

		keys.split(",").forEach(function( key ){
			switch ( key ){

				case "name":
					editor.name = "editor";
				break;

				case "color":
					if ( editor[ key ] === undefined )
						editor[ key ] = new THREE.Color(1,1,1);
					else
						editor[ key ].setRGB(1,1,1);
				break;

				case "emissive":
				case "specular":
					if ( editor[ key ] === undefined )
						editor[ key ] = new THREE.Color(0,0,0);
					else
						editor[ key ].setRGB(0,0,0);
				break;

				case "normalScale":
					if ( editor[ key ] === undefined )
						editor[ key ] = new THREE.Vector2(1,1);
					else
						editor[ key ].set(1,1);
				break;

				case "clippingPlanes": {

					var srcPlanes = source.clippingPlanes,
						dstPlanes = null;

					if ( srcPlanes !== null ) {

						var n = srcPlanes.length;
						dstPlanes = new Array( n );

						for ( var i = 0; i !== n; ++ i )
							dstPlanes[ i ] = srcPlanes[ i ].clone();

					}

					editor.clippingPlanes = dstPlanes;

				} break;

				case "userData":
					editor.userData = JSON.parse( JSON.stringify( source.userData ) );
				break;

				default:
					editor[ key ] = source[ key ];
				break;

			}
		});

		return this;
	};

/*
	MaterialEditor.prototype.fromJSON = function( json ){
	//	param: a texture json {object}

		var editor = this;

		var loader = new THREE.MaterialLoader();
		var material = loader.parse( json );
		debugMode && console.log( material );

		editor.reset(); // important!

		editor.copy( material );
		editor.type = material.type;
		editor.uuid = material.uuid;

	};
*/

	MaterialEditor.prototype.update = function( value ){

	//	Copies the values of the target material of material
	//	entity manager. Does not updates the target material.
	//	dependences: material_entities {material manager},
	//	param: a material id {string or number},

		var editor = this;

		editor.reset(); // important!

	//	get target material.
		var material = material_entities.getMaterialById( value );
	//	debugMode && console.log( "editor material:", material );

		if ( !material ) {
			editor.reset();
			console.log("editor update:", false);
			return false; // important!
		}

	//	copy material (update).
		editor.copy( material );
		editor.type = material.type;
		editor.uuid = material.uuid;

	//	return true.
		console.log("editor update:", true);
		return true; // important!

	};

	const materialEditor = new MaterialEditor();

/*
	MaterialEditor.prototype.undo = function(){

		var editor = this;

		if ( !undo.length ) return;

	//	Get undo json.
		var json = undo.shift();

		if ( !json ) return;

	//	Move json to redo.
		redo.unshift( json );

		clearTimeout( interval );
		interval = setTimeout( function(){

		//	Copy material state (undo).
			editor.fromJSON( json ); // update.

			debugMode && console.log( "undo:", undo.length, "redo:", redo.length );

		}, 250);

	};

	MaterialEditor.prototype.redo = function(){

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
*/
