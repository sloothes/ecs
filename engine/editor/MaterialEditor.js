
//	Material Editor.

//	Create a Material to hold editor values.
	const materialEditor = (function( editor ){

		const undo = [], redo = [];

	//	Editor tab.

		const editorTabSelect = { value:"" };

		(function( selector ){
			TabUI.Editor.tab.querySelector(selector).addEventListener("change", function(){
				editorTabSelect.value = this.value;  // string.
			});
		})("select#entities-droplist");


	//	droplists.

		const entity_droplist = document.getElementById("material-entities-droplist");
		const texture_droplist = document.getElementById("material-map-droplist");
		const param_droplist = document.getElementById("material-param-droplist");
		const scale_droplist = document.getElementById("material-scale-droplist");
		const color_droplist = document.getElementById("material-color-droplist");
		const type_droplist = document.getElementById("material-type-droplist");

		const entitySelect  = { value:"" }; // string.
		const textureSelect = { value:"" }; // string.
		const paramSelect   = { value:"" }; // string.
		const scaleSelect   = { value:"" }; // string.
		const colorSelect   = { value:"" }; // string.
		const materialType  = { value:"" }; // string.

	//	buttons.

		const redo_button = document.getElementById("material-redo-button");
		const undo_button = document.getElementById("material-undo-button");
		const exit_edit_button = document.getElementById("material-exit-mode");
		const create_material_button = document.getElementById("create-material-button");
		const clone_material_button = document.getElementById("clone-material-button");
		const remove_material_button = document.getElementById("remove-material-button");

	//	param input buttons.

		const material_param_input = document.getElementById("material-param-value-input");
		const increase_param_v_button = document.getElementById("material-param-value-increase");
		const decrease_param_v_button = document.getElementById("material-param-value-decrease");

	//	scale input buttons.

		const material_scale_x_input = document.getElementById("material-scale-x-input");
		const material_scale_y_input = document.getElementById("material-scale-y-input");
		const increase_scale_x_button = document.getElementById("material-scale-x-increase");
		const increase_scale_y_button = document.getElementById("material-scale-y-increase");
		const decrease_scale_x_button = document.getElementById("material-scale-x-decrease");
		const decrease_scale_y_button = document.getElementById("material-scale-y-decrease");

	//	color input buttons.

		const material_color_r_input = document.getElementById("material-color-r-input");
		const material_color_g_input = document.getElementById("material-color-g-input");
		const material_color_b_input = document.getElementById("material-color-b-input");
		const increase_color_r_button = document.getElementById("material-color-r-increase");
		const increase_color_g_button = document.getElementById("material-color-g-increase");
		const increase_color_b_button = document.getElementById("material-color-b-increase");
		const decrease_color_r_button = document.getElementById("material-color-r-decrease");
		const decrease_color_g_button = document.getElementById("material-color-g-decrease");
		const decrease_color_b_button = document.getElementById("material-color-b-decrease");

	//	helpers.

		function getObjectByEntityId( value ){
			var id = parseInt( value );
			if ( id === NaN ) return;
			return scene.getObjectById( id );
		}

		function getMaterialByEntityId( value ){
			var id = parseInt( value );
			return material_entities.find( function( material ){
				return material.id === id;
			});
		}

	//	add to undo/redo.

		function addToUndo(){
			redo.length = 0; // important!
			var json = editor.toJSON();
			json && undo.unshift( json );
		//	debugMode && console.log( arguments.callee.name, 
		//		"undo:", undo.length, "redo:", redo.length );
		}

		function addToRedo(){
			var json = editor.toJSON();
			json && redo.unshift( json );
		//	debugMode && console.log( arguments.callee.name, 
		//		"undo:", undo.length, "redo:", redo.length );
		}

	//	reset input values.

		function resetParamInputValues(){ 
			material_param_input.value = ""; 
			return;
		}

		function resetScaleInputValues(){ 
			material_scale_x_input.value = "";
			material_scale_y_input.value = "";
			return;
		}

		function resetColorInputValues(){ 
			material_color_r_input.value = "";
			material_color_g_input.value = "";
			material_color_b_input.value = "";
			return;
		}

	//	update input values.

		function updateParamInputValues( key ){
			if ( editor[ key ] === undefined ) return resetParamInputValues();
			material_param_input.value = editor[ key ];
		}

		function updateScaleInputValues( key ){
			if ( editor[ key ] === undefined ) return resetScaleInputValues();
			material_scale_x_input.value = parseFloat( editor[ key ].x ).toFixed(2);
			material_scale_y_input.value = parseFloat( editor[ key ].y ).toFixed(2);
		}

		function updateColorInputValues( key ){
			if ( editor[ key ] === undefined ) return resetColorInputValues();
			material_color_r_input.value = parseInt( 255*editor[ key ].r ).toFixed(0);
			material_color_g_input.value = parseInt( 255*editor[ key ].g ).toFixed(0);
			material_color_b_input.value = parseInt( 255*editor[ key ].b ).toFixed(0);
		}

	//	display vector values.

		function displayVectorValues( value ){

			switch ( value ){
				case "color":
				case "emissive":
				case "specular":
					updateColorInputValues( value );
				break;

				case "normalScale":
				case "displacementScale":
					updateScaleInputValues( value );
				break;

				default:
					updateParamInputValues( value );
				break;
			}

		}

	//	reset select droplist values.

		function resetEntitySelectValue(){ 
			entitySelect.value = entity_droplist.value = ""; 
			entity_droplist.dispatchEvent( new Event("change") );
		}
		function resetTextureSelectValue(){ 
			textureSelect.value = texture_droplist.value = ""; 
			texture_droplist.dispatchEvent( new Event("change") );
		}
		function resetParamSelectValue(){ 
			paramSelect.value = param_droplist.value = ""; 
			param_droplist.dispatchEvent( new Event("change") );
		}
		function resetScaleSelectValue(){ 
			scaleSelect.value = scale_droplist.value = ""; 
			scale_droplist.dispatchEvent( new Event("change") );
		}
		function resetColorSelectValue(){ 
			colorSelect.value = color_droplist.value = ""; 
			color_droplist.dispatchEvent( new Event("change") );
		}
		function resetMaterialTypeValue(){ 
			materialType.value = type_droplist.value = ""; 
			type_droplist.dispatchEvent( new Event("change") );
		}

	//	update select droplist values.

		function updateEntitySelectValue( value ){ 
			if ( value === undefined ) {
				entitySelect.value = entity_droplist.value; 
			} else {
				entitySelect.value = entity_droplist.value = value;
				entity_droplist.dispatchEvent( new Event("change") );
			}
		}

		function updateTextureSelectValue( value ){ 
			if ( value === undefined ) {
				textureSelect.value = texture_droplist.value; 
			} else {
				textureSelect.value = texture_droplist.value = value;
				texture_droplist.dispatchEvent( new Event("change") );
			}
		}

		function updateParamSelectValue( value ){ 
			if ( value === undefined ) {
				paramSelect.value = param_droplist.value; 
			} else {
				paramSelect.value = param_droplist.value = value;
				param_droplist.dispatchEvent( new Event("change") );
			}
		}

		function updateScaleSelectValue( value ){ 
			if ( value === undefined ) {
				scaleSelect.value = scale_droplist.value; 
			} else {
				scaleSelect.value = scale_droplist.value = value;
				scale_droplist.dispatchEvent( new Event("change") );
			}
		}

		function updateColorSelectValue( value ){ 
			if ( value === undefined ) {
				colorSelect.value = color_droplist.value; 
			} else {
				colorSelect.value = color_droplist.value = value;
				color_droplist.dispatchEvent( new Event("change") );
			}
		}

		function updateMaterialTypeValue( value ){ 
			if ( value === undefined ) {
				materialType.value = type_droplist.value; 
			} else {
				materialType.value = type_droplist.value = value;
				type_droplist.dispatchEvent( new Event("change") );
			}
		}

	//	exit from edit mode.

		function exitFromEditMode(){
			editor.reset(); // important!
			resetEntitySelectValue();
			resetTextureSelectValue();
			resetParamSelectValue();
			resetScaleSelectValue();
			resetColorSelectValue();
			resetParamInputValues();
			resetColorInputValues();
			resetScaleInputValues();
			debugMode && console.log( arguments.callee.name, editor );
			return;
		}

	//	switch to edit mode.

		function switchToEditMode( value ){
			if ( !editor.update( value ) ) exitFromEditMode();
		}

	//	editor copy (overwrite).

		editor.copy = function( material ){
			Object.keys( material ).filter( function( key ){
				return typeof material[ key ] != "function";
			}).forEach( function( key ){
				try {
					if ( typeof material[ key ] === "object" ) {
						for ( var k in material[ key ] ){
							editor[ key ][ k ] = material[ key ][ k ];
						}
					} else {
						editor[ key ] = material[ key ];
					}
				} catch(err){
				//	debugMode && console.warn(err);
				}
			});
		};

	//	editor reset.

		(function(){

			editor.reset = function(){

				var source = new THREE.Material();
			//	editor.copy( source ); // overwrite editor.copy();

			//	reset.

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
				keys += "dashSize,size,rotation,sizeAttenuation";


				keys.split(",").forEach(function( key ){
					switch ( key ){

						case "name":
							editor.name = "material editor";
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
								editor[ key ] = new THREE.Color(1,1,1);
							else
								editor[ key ].setRGB(0,0,0);
						break;

						case "normalScale":
						case "displacementScale":
							if ( editor[ key ] === undefined )
								editor[ key ] = new THREE.Vector2(1,1);
							else
								editor[ key ].set(1,1);
						break;

						default:
							editor[ key ] = source[ key ];
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

					}
				});

				undo.length = 0; redo.length = 0; // clear undo/redo.
				debugMode && console.log( "material editor reset:", editor );
			};

			editor.reset(); // important!

		})();








































		return editor;

	})( new THREE.Material() );
