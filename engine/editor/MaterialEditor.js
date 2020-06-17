
//	Material Editor.

//	Create a Material to hold editor values.
//	TO TRY: Create a json material to hold data.
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

		function addToUndo( material ){
			redo.length = 0; // important!
			var json = material.toJSON();
			json && undo.unshift( json );
		//	There is issue when try to parse json
		//	from the loader. Make custom .toJSON?
		//	var json = editor.toJSON();
		//	json && undo.unshift( json );
		//	debugMode && console.log( arguments.callee.name, 
		//		"undo:", undo.length, "redo:", redo.length );
		}

		function addToRedo( material ){
			var json = material.toJSON();
			json && redo.unshift( json );
		//	There is issue when try to parse json
		//	from the loader. Make custom .toJSON?
		//	var json = editor.toJSON();
		//	json && redo.unshift( json );
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

			//	editor.copy( source ); // overwrite editor.copy();

				undo.length = 0; redo.length = 0; // clear undo/redo.
				debugMode && console.log( "editor reset:", editor );
			};

			editor.reset(); // important!

		})();

	//	editor update.

		editor.update = function( value ){

		//	Reset editor.
			editor.reset();

		//	Get new material.
			var material = getMaterialByEntityId( value ); 

			if ( !material ) {
			//	debugMode && console.log( false );
				return false; // important!
			}

		//	Copy material.
			material && editor.copy( material );

		//	editor.type = material.type; // important!
		//	editor.name = material.name; // important!
		//	editor.uuid = material.uuid; //	important!

		//	keep initial state.
			material && addToUndo( material );
			debugMode && console.log( "editor updated:", editor );

		//	debugMode && console.log( true );
			return true; // important!
		};

	//	editor undo/redo.

		(function(){

			var interval;

			editor.undo = function(){ 

				if ( !undo.length ) return;

			//	Get undo json.
				var json = undo.shift();

				if ( !json ) return;

			//	Move json to redo.
				redo.unshift( json );

				clearTimeout( interval );
				interval = setTimeout( function(){

				//	Copy state (undo).
				//	There is hex color issue when try to parse
				//	json from loader. Must make custom loader.
					var loader = new THREE.MaterialLoader();
					var material = loader.parse( json ); // issue - error!!!
					debugMode && console.log( material );
					editor.copy( material );

					debugMode && console.log( "undo:", 
					undo.length, "redo:", redo.length );

				}, 250);
			};

			editor.redo = function(){

				if ( !redo.length ) return;

			//	Get redo json.
				var json = redo.shift();

				if ( !json ) return;

				debugMode && console.log( json ); // debug!

			//	Move json to undo.
				undo.unshift( json );

				clearTimeout( interval );
				interval = setTimeout( function(){

				//	Copy state (redo).
					var loader = new THREE.MaterialLoader();
				//	There is hex color issue when try to parse
				//	json from loader. Must make custom loader.
					var material = loader.parse( json ); // issue - error!!!
					debugMode && console.log( material );
					editor.copy( material );

					debugMode && console.log( "undo:", 
					undo.length, "redo:", redo.length );

				}, 250);
			};

		})();

	//	buttons.

		(function(){

			var interval;

			redo_button.addEventListener( "click", editor.redo );
			undo_button.addEventListener( "click", editor.undo );

			exit_edit_button.addEventListener( "click",  function(){
				clearTimeout( interval );
				interval = setTimeout(function(){
					resetEntitySelectValue(); // exit from edit mode.
				}, 250);
			});

		})();

	//	droplists.

		(function(){

			function blur_droplists(){
				type_droplist.blur();
				param_droplist.blur();
				scale_droplist.blur();
				color_droplist.blur();
				entity_droplist.blur();
				texture_droplist.blur();
			};

			entity_droplist.addEventListener("change", function(){

				blur_droplists();

			//	update editor.

				entitySelect.value = entity_droplist.value; // update editor.

			//	reset texture/param/scale.

				paramSelect.value = param_droplist.value = ""; // reset.
				scaleSelect.value = scale_droplist.value = ""; // reset.
				textureSelect.value = texture_droplist.value = ""; // reset.

			//	update color vectors.

				if ( entitySelect.value ) {

					if ( editor.color ) updateColorSelectValue("color");
					else if ( editor.emissive ) updateColorSelectValue("emissive");
					else if ( editor.specular ) updateColorSelectValue("specular");

				}

			});

			param_droplist.addEventListener("change", function(){

				blur_droplists();

				if ( entitySelect.value ) {

					var key = param_droplist.value;

				//	TODO: cases depended on texture select value?

					if ( editor[ key ] !== undefined )
						paramSelect.value = param_droplist.value; // update.
					else
						paramSelect.value = param_droplist.value = ""; // reset.
				} 

				else paramSelect.value = param_droplist.value = ""; // reset.

			});

			texture_droplist.addEventListener("change", function(){

				blur_droplists();

			//	DO NOT USE resetTextureSelectValue(); stack overflow!
			//	DO NOT USE updateTextureSelectValue(); stack overflow!

				if ( entitySelect.value && texture_droplist.value ) {

					textureSelect.value = texture_droplist.value; // update.

					if ( textureSelect.value === "normalMap"
					&& editor.normalMap && editor.normalScale ) {
						updateScaleSelectValue( "normalScale" ); // update.
					} 

					else if ( textureSelect.value === "displacementMap"
					&& editor.displacementMap && editor.displacementScale ) {
						updateScaleSelectValue( "displacementScale" ); // update.
					} 

					else scaleSelect.value = scale_droplist.value = ""; // reset.

				} else {

					scaleSelect.value = scale_droplist.value = "";     // reset.
					textureSelect.value = texture_droplist.value = ""; // reset.
				}
			});

			scale_droplist.addEventListener("change", function(){

				blur_droplists();

			//	DO NOT USE resetScaleSelectValue(); stack overflow!
			//	DO NOT USE updateScaleSelectValue(); stack overflow!

				if ( entitySelect.value && textureSelect.value && ( 
					( textureSelect.value === "normalMap" && editor.normalMap && editor.normalScale ) ||
					( textureSelect.value === "displacementMap" && editor.displacementMap && editor.displacementScale ) 
				) ) 
					scaleSelect.value = scale_droplist.value; // update.
				else 
					scaleSelect.value = scale_droplist.value = ""; // reset.
			});

			color_droplist.addEventListener("change", function(){

				blur_droplists();

			//	DO NOT USE resetColorSelectValue(); stack overflow!
			//	DO NOT USE updateColorSelectValue(); stack overflow!

				if ( entitySelect.value && ( 
					 editor.color || editor.emissive || editor.specular
				) ) 
					colorSelect.value = color_droplist.value; // update.
				else 
					colorSelect.value = color_droplist.value = ""; // reset.
			});

		})();

	//	scale inputs.

		(function(){

			var interval;

			const scale_x_input = document.getElementById("material-scale-x-input");
			const scale_y_input = document.getElementById("material-scale-y-input");

			const scale_x_increase = document.getElementById("material-scale-x-increase");
			const scale_y_increase = document.getElementById("material-scale-y-increase");
			const scale_x_decrease = document.getElementById("material-scale-x-decrease");
			const scale_y_decrease = document.getElementById("material-scale-y-decrease");

			scale_x_input.addEventListener( "change", onInputChange );
			scale_y_input.addEventListener( "change", onInputChange );

			function onInputChange(){

				this.blur();

				var material = getMaterialByEntityId( entitySelect.value );

				var step = 1/100;

				if ( !material ) return resetValues();

				if ( !(entitySelect.value && scaleSelect.value) ) return resetValues();

				if ( material && entitySelect.value && scaleSelect.value ) {

				//	Update.
					updateScale( this ); // update.

				//	Undo/Redo.
					addToUndo(); // undo/redo.

				}

				function resetValues(){

					if ( textureSelect.value !== "normalMap" && textureSelect.value !== "displacementMap" ) {
						scale_x_input.value = scale_y_input.value = ""; return; // reset.
					} 

					if ( editor.normalMap === undefined && editor.displacementMap === undefined ) {
						scale_x_input.value = scale_y_input.value = ""; return; // reset.
					} 

					if ( !scaleSelect.value ) {
						scale_x_input.value = scale_y_input.value = ""; return; // reset.
					} 

					if ( scaleSelect.value !== "normalScale" && scaleSelect.value !== "displacementScale" ) {
						scale_x_input.value = scale_y_input.value = ""; return; // reset.
					}

					var value = 1;
					scale_x_input.value = value.toFixed(2); // string.
					scale_y_input.value = value.toFixed(2); // string.

					return;
				}

				function displayValue( input ){

					if ( !input || !scaleSelect.value ) return resetValues();
					if ( editor.normalMap === undefined && editor.displacementMap === undefined ) return resetValues();
					if ( textureSelect.value !== "normalMap" && textureSelect.value !== "displacementMap" ) return resetValues();
					if ( scaleSelect.value !== "normalScale" && scaleSelect.value !== "displacementScale" ) return resetValues();

					var key = scaleSelect.value;

					if ( input === scale_x_input ) input.value = parseFloat( editor[ key ].x ).toFixed(2); // string.
					if ( input === scale_y_input ) input.value = parseFloat( editor[ key ].y ).toFixed(2); // string.

					return;
				}

				function updateScale( input ){

					if ( !input || !scaleSelect.value ) return resetValues();
					if ( editor.normalMap === undefined && editor.displacementMap === undefined ) return resetValues();
					if ( textureSelect.value !== "normalMap" && textureSelect.value !== "displacementMap" ) return resetValues();
					if ( scaleSelect.value !== "normalScale" && scaleSelect.value !== "displacementScale" ) return resetValues();

					var max = 10, min = -max;
					var key = scaleSelect.value;
					var value = THREE.Math.clamp( parseFloat( input.value ) % max, min, max );

					if ( input === scale_x_input ) editor[ key ].x = value; // update editor.
					if ( input === scale_y_input ) editor[ key ].y = value; // update editor.

					material.normalScale && editor.normalScale && material.normalScale.copy( editor.normalScale ); // update material.
					material.displacementScale && editor.displacementScale && material.displacementScale.copy( editor.displacementScale ); // update material.

					return displayValue( input );
				}

			}

			scale_x_increase.addEventListener( "mousedown", onMouseDown );
			scale_y_increase.addEventListener( "mousedown", onMouseDown );
			scale_x_decrease.addEventListener( "mousedown", onMouseDown );
			scale_y_decrease.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
				clearTimeout( interval ); // important!
			//	debugMode && console.log( "on MouseUp:", interval );
			});

			scale_x_increase.addEventListener( "click", onMouseClick );
			scale_y_increase.addEventListener( "click", onMouseClick );
			scale_x_decrease.addEventListener( "click", onMouseClick );
			scale_y_decrease.addEventListener( "click", onMouseClick );

			function updateScale( button ){

				if ( !( button && scaleSelect.value) ) return;

				var step = 1/100;
				var max = 10, min = -max;
				var key = scaleSelect.value;

				var x = editor[key].x; 
				var y = editor[key].y; 

				if ( button === scale_x_increase ) editor[ key ].x = Math.min(max, x + step);
				if ( button === scale_y_increase ) editor[ key ].y = Math.min(max, y + step);
				if ( button === scale_x_decrease ) editor[ key ].x = Math.max(min, x - step);
				if ( button === scale_y_decrease ) editor[ key ].y = Math.max(min, y - step);

				displayVectorValues( scaleSelect.value );
			}

			function onMouseClick(){

			//	clearTimeout( interval ); // important!

				if ( !scaleSelect.value ) return; // !editor.isEditing;
				if ( !entitySelect.value ) return; // !editor.isEditing;

				var material = getMaterialByEntityId( entitySelect.value );

				if ( !material ) return;
				if ( !material.normalMap && !material.displacementMap ) return;
				if ( !material.normalScale && !material.displacementScale ) return;

				if ( !editor.normalMap && !editor.displacementMap ) return;
				if ( !editor.normalScale && !editor.displacementScale ) return;

			//	Update editor.
				entitySelect.value && scaleSelect.value && updateScale( this ); // editor.isEditing, update editor.

			//	Update material.
				material.normalScale && editor.normalScale && material.normalScale.copy( editor.normalScale ); // update material.
				material.displacementScale && editor.displacementScale && material.displacementScale.copy( editor.displacementScale ); // update material.

			//	Undo/Redo.
				entitySelect.value && addToUndo();

				debugMode && console.log( "on Mouse Click:", interval );

			}

			function onMouseDown(){ 

				clearTimeout( interval ); // important!

				if ( !scaleSelect.value ) return; // !editor.isEditing;
				if ( !entitySelect.value ) return; // !editor.isEditing;

				var material = getMaterialByEntityId( entitySelect.value );

				if ( !material ) return;
				if ( !material.normalMap && !material.displacementMap ) return;
				if ( !material.normalScale && !material.displacementScale ) return;

				if ( !editor.normalMap && !editor.displacementMap ) return;
				if ( !editor.normalScale && !editor.displacementScale ) return;

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function onUpdate() {

					if ( !material ) return;
					if ( !scaleSelect.value ) return;
					if ( !entitySelect.value ) return;

				//	Update editor.
					entitySelect.value && scaleSelect.value && updateScale( button ); // editor.isEditing, update editor.

				//	Update material.
					material.normalScale && editor.normalScale && material.normalScale.copy( editor.normalScale ); // update material.
					material.displacementScale && editor.displacementScale && material.displacementScale.copy( editor.displacementScale ); // update material.

					var dt = clock.getDelta();
					interval = setTimeout( onUpdate, dt );
				//	debugMode && console.log( "on Update:", interval );

				}, 500);
			}

		})();















		return editor;

	})( new THREE.Material() );
