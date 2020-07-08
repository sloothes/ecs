console.warn("IMPORTANT NOTE: MaterialEditorClass is still under developing. NOT READY FOR USE!");
console.warn("IMPORTANT NOTE: MaterialEditorClass is still under developing. NOT READY FOR USE!");
console.warn("IMPORTANT NOTE: MaterialEditorClass is still under developing. NOT READY FOR USE!");

//	Material Editor Class.

//	Material Editor: inherits THREE.Material class. (Material Manager-like implementation)
//	sources: https://stackoverflow.com/questions/26700164/extending-array-with-es6-classes
//	https://stackoverflow.com/questions/11337849/ways-to-extend-array-object-in-javascript

	function MaterialEditor(){
		var material = new THREE.Material();
		Object.setPrototypeOf( material, MaterialEditor.prototype );
		return material; // important!
	};

	MaterialEditor.prototype = Object.create(THREE.Material.prototype);

	var editor_debugger = (function( editor ){
	//	We parse "MaterialEditor.prototype" as "editor" 
	//	argument and returns a new MaterialEditor editor.

		var interval;
		const undo = [], redo = [];

		const entity_droplist = document.getElementById("material-entities-droplist");
		const vector_droplist = document.getElementById("material-vector-droplist");
		const texture_droplist = document.getElementById("material-map-droplist");
		const material_droplist = document.getElementById("material-type-droplist");

		const redo_button = document.getElementById("material-redo-button");
		const undo_button = document.getElementById("material-undo-button");
		const exit_edit_button = document.getElementById("material-exit-mode");
		const create_material_button = document.getElementById("create-material-button");
		const clone_material_button = document.getElementById("clone-material-button");
		const remove_material_button = document.getElementById("remove-material-button");

		const entitySelect = { value:entity_droplist.value };   // string.
		const vectorSelect = { value:vector_droplist.value };   // string.
		const textureSelect = { value:texture_droplist.value }; // string.
		const materialType = { value:material_droplist.value }; // string.

	//	editor helpers.

		function resetEntitySelectValue(){
			entitySelect.value = entity_droplist.value = "";
		}

		function resetVectorSelectValue(){
			vectorSelect.value = vector_droplist.value = "";
		}

		function resetTextureSelectValue(){
			textureSelect.value = texture_droplist.value = "";
		}

		function updateEntitySelectValue(){
			entitySelect.value = entity_droplist.value;
		}

		function updateVectorSelectValue(){
			vectorSelect.value = vector_droplist.value;
		}

		function updateTextureSelectValue(){
			textureSelect.value = texture_droplist.value;
		}

		function updateMaterialTypeValue(){
			materialType.value = material_droplist.value;
		}

		function addToRedo(){
			var json = editor.toJSON();
			json && redo.unshift( json );
			debugMode && console.log( arguments.callee.name+":", redo.length );
		}

		function addToUndo(){
			redo.length = 0; // important!
			var json = editor.toJSON();
			json && undo.unshift( json );
			debugMode && console.log( arguments.callee.name+":", undo.length );
		}

		function exitFromEditMode(){
			editor.reset(); // important!
			resetEntitySelectValue();
			return;
		}

		function switchToEditMode( value ){
			if ( !editor.update( value ) ) 
				exitFromEditMode();
		}

		function getMaterialByEntityId( value ){
			var id = parseInt( value );
			return material_entities.find( function( material ){
				return material.id === id;
			});
		}

		MaterialEditor.prototype.copy = function( source ){

		//	THREE Material.

			(function( editor ){

				var keys = "";

				keys += "name,type,uuid,side,opacity,alphaTest,transparent,premultipliedAlpha,";
				keys += "fog,lights,visible,overdraw,dithering,precision,colorWrite,flatShading,vertexColors,";
				keys += "blending,blendSrc,blendDst,blendEquation,blendSrcAlpha,blendDstAlpha,blendEquationAlpha,";
				keys += "depthFunc,depthTest,depthWrite,shadowSide,clipShadows,clipIntersection,";
				keys += "polygonOffset,polygonOffsetUnits,polygonOffsetFactor,";

				keys.split(",").forEach(function( key ){
					editor[ key ] = source[ key ];
				});

			})( this );

			(function( editor ){

				editor.userData = JSON.parse( JSON.stringify( source.userData ) );

				var srcPlanes = source.clippingPlanes,
					dstPlanes = null;

				if ( srcPlanes !== null ) {

					var n = srcPlanes.length;
					dstPlanes = new Array( n );

					for ( var i = 0; i !== n; ++ i )
						dstPlanes[ i ] = srcPlanes[ i ].clone();

				}

				editor.clippingPlanes = dstPlanes;

			})( this );

		//	THREE Mesh Material.

			(function( editor ){

				var keys = "color,emissive,specular,normalScale,";

				keys.split(",").forEach(function( key ){

					if ( source[ key ] === undefined ) delete editor[ key ];

					else if ( source[ key ] && editor[ key ] === undefined ) {
						switch ( key ){
							case "normalScale":
								editor[ key ] = new THREE.Vector2();
								break;
							default:
								editor[ key ] = new THREE.Color();
								break;
						} // end switch.
					} // end if else.

					//

					if ( source[ key ] && editor[ key ] ) {
						try {
							editor[ key ].copy( source[ key ] ); 
						} catch(err) {
							switch ( key ){
								case "color":
									editor[ key ].setRGB(1,1,1);
									break;
								case "emissive":
								case "specular":
									editor[ key ].setRGB(0,0,0);
									break;
								case "normalScale":
									editor[ key ].set(1,1);
									break;
							} // end switch(key).
						} // end catch(err).
					} // end if.

				}); // end forEach.

			})( this );

		//	THREE Mesh/Line/Point/Sprite Material.

			(function( editor ){

				var keys = "";

				keys += "map,aoMap,envMap,bumpMap,alphaMap,lightMap,normalMap,";
				keys += "emissiveMap,metalnessMap,roughnessMap,displacementMap,";
				keys += "metalness,roughness,bumpScale,reflectivity,normalMapType,";
				keys += "refractionRatio,displacementBias,displacementScale,";
				keys += "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,";
				keys += "wireframe,wireframeLinecap,wireframeLinejoin,wireframeLinewidth,";
				keys += "skinning,morphTargets,morphNormals,combine,shininess,specularMap,";
				keys += "gradientMap,depthPacking,scale,gapSize,linecap,linejoin,linewidth,";
				keys += "dashSize,size,rotation,sizeAttenuation";

				keys.split(",").forEach(function( key ){
					if ( source[ key ] === undefined ) 
						delete editor[key];
					else 
						editor[ key ] = source[ key ];
				});

			})( this );
		};

		MaterialEditor.prototype.reset = function(){

			this.copy( new THREE.Material() ); // overwrites material.copy();

			//	this.name = "materialEditor";

			undo.length = 0; redo.length = 0; // clear undo/redo.
			debugMode && console.log( "MaterialEditor.reset:", this );
		};

		MaterialEditor.prototype.update = function( value ){

		//	var editor = this;

		//	Reset editor.
			this.reset();

		//	Get new material.
			var material = getMaterialByEntityId( value ); 

			if ( !material ) return false; // important!

		//	Copy material.
			material && this.copy( material ); // overwrites material.copy();

		//	keep initial state.
			material && addToUndo();
			debugMode && console.log( "MaterialEditor updated:", this );

			return true; // important!
		};

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

			//	Copy state (undo).
				var loader = new THREE.MaterialLoader();
				editor.copy( loader.parse( json ) );

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

			//	Copy state (redo).
				var loader = new THREE.MaterialLoader();
				editor.copy( loader.parse( json ) );

			}, 250);
		};

		return new MaterialEditor();

	})( MaterialEditor.prototype ); // editor.


console.warn("IMPORTANT NOTE: MaterialEditorClass is still under developing. NOT READY FOR USE!");
console.warn("IMPORTANT NOTE: MaterialEditorClass is still under developing. NOT READY FOR USE!");
console.warn("IMPORTANT NOTE: MaterialEditorClass is still under developing. NOT READY FOR USE!");
