
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

		const keySelect     = { value:"" }; // string.
		const scaleSelect   = { value:"" }; // string.
		const colorSelect   = { value:"" }; // string.
		const materialType  = { value:"" }; // string.
		const entitySelect  = { value:"" }; // string.
		const textureSelect = { value:"" }; // string.

		const entity_droplist = document.getElementById("material-entities-droplist");
		const texture_droplist = document.getElementById("material-map-droplist");
		const keys_droplist = document.getElementById("material-keys-droplist");
		const scale_droplist = document.getElementById("material-scale-droplist");
		const color_droplist = document.getElementById("material-color-droplist");
		const type_droplist = document.getElementById("material-type-droplist");

	//	buttons.

		const redo_button = document.getElementById("material-redo-button");
		const undo_button = document.getElementById("material-undo-button");
		const exit_edit_button = document.getElementById("material-exit-mode");
		const create_material_button = document.getElementById("create-material-button");
		const clone_material_button = document.getElementById("clone-material-button");
		const remove_material_button = document.getElementById("remove-material-button");

	//	key input buttons.

		const material_value_input = document.getElementById("material-value-input");
		const increase_value_button = document.getElementById("material-value-increase");
		const decrease_value_button = document.getElementById("material-value-decrease");

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

		function resetKeyInputValues(){ 
			material_value_input.value = ""; 
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

		function updateKeyInputValues( key ){
			if ( editor[ key ] === undefined ) return resetKeyInputValues();
			material_value_input.value = editor[ key ];
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
					updateKeyInputValues( value );
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
		function resetKeySelectValue(){ 
			keySelect.value = keys_droplist.value = ""; 
			keys_droplist.dispatchEvent( new Event("change") );
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

		function updateKeySelectValue( value ){ 
			if ( value === undefined ) {
				keySelect.value = keys_droplist.value; 
			} else {
				keySelect.value = keys_droplist.value = value;
				keys_droplist.dispatchEvent( new Event("change") );
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
			resetKeySelectValue();
			resetScaleSelectValue();
			resetColorSelectValue();
			resetKeyInputValues();
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
					var loader = new THREE.MaterialLoader();
					var material = loader.parse( json ); // issue - error!!!
				//	debugMode && console.log( material );
				//	update editor.
					editor.copy( material ); // overwrite.
				//	update material.
					getMaterialByEntityId( entitySelect.value ).copy( material );
					debugMode && console.log( "undo:", undo.length, "redo:", redo.length );

				}, 250);
			};

			editor.redo = function(){

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
					var material = loader.parse( json ); // issue - error!!!
				//	debugMode && console.log( material );
				//	update editor.
					editor.copy( material ); // overwrite.
				//	update material.
					getMaterialByEntityId( entitySelect.value ).copy( material );
					debugMode && console.log( "undo:", undo.length, "redo:", redo.length );

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
				keys_droplist.blur();
				scale_droplist.blur();
				color_droplist.blur();
				entity_droplist.blur();
				texture_droplist.blur();
			};

			entity_droplist.addEventListener("change", function(){

				blur_droplists();

			//	update editor.

				entitySelect.value = entity_droplist.value; // update editor.

			//	reset texture/keys/scale.

				keySelect.value = keys_droplist.value = ""; // reset.
				scaleSelect.value = scale_droplist.value = ""; // reset.
				textureSelect.value = texture_droplist.value = ""; // reset.

			//	update color vectors.

				if ( entitySelect.value ) {

					if ( editor.color ) updateColorSelectValue("color");
					else if ( editor.emissive ) updateColorSelectValue("emissive");
					else if ( editor.specular ) updateColorSelectValue("specular");

				}

			});

			keys_droplist.addEventListener("change", function(){

				blur_droplists();

				if ( entitySelect.value ) {

					var key = keys_droplist.value;

				//	TODO: cases depended on texture select value?

					if ( editor[ key ] !== undefined )
						keySelect.value = keys_droplist.value; // update.
					else
						keySelect.value = keys_droplist.value = ""; // reset.
				} 

				else keySelect.value = keys_droplist.value = ""; // reset.

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
					addToUndo( material ); // undo/redo.

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

			function updateEditor( button ){

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
				entitySelect.value && scaleSelect.value && updateEditor( this ); // editor.isEditing, update editor.

			//	Update material.
				entitySelect.value && material.normalScale && editor.normalScale && material.normalScale.copy( editor.normalScale ); // update material.
				entitySelect.value && material.displacementScale && editor.displacementScale && material.displacementScale.copy( editor.displacementScale ); // update material.

			//	Undo/Redo.
				entitySelect.value && addToUndo( material );

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
					entitySelect.value && scaleSelect.value && updateEditor( button ); // editor.isEditing, update editor.

				//	Update material.
					entitySelect.value && material.normalScale && editor.normalScale && material.normalScale.copy( editor.normalScale ); // update material.
					entitySelect.value && material.displacementScale && editor.displacementScale && material.displacementScale.copy( editor.displacementScale ); // update material.

					var dt = clock.getDelta();
					interval = setTimeout( onUpdate, dt );
				//	debugMode && console.log( "on Update:", interval );

				}, 500);
			}

		})();

	//	color inputs.

		(function(){

			var interval;

			const color_r_input = document.getElementById("material-color-r-input");
			const color_g_input = document.getElementById("material-color-g-input");
			const color_b_input = document.getElementById("material-color-b-input");

			const color_r_increase = document.getElementById("material-color-r-increase");
			const color_g_increase = document.getElementById("material-color-g-increase");
			const color_b_increase = document.getElementById("material-color-b-increase");

			const color_r_decrease = document.getElementById("material-color-r-decrease");
			const color_g_decrease = document.getElementById("material-color-g-decrease");
			const color_b_decrease = document.getElementById("material-color-b-decrease");

			color_r_input.addEventListener( "change", onInputChange );
			color_g_input.addEventListener( "change", onInputChange );
			color_b_input.addEventListener( "change", onInputChange );

			function onInputChange(){

				this.blur(); // important!

				var step = 1/255;

				var material = getMaterialByEntityId( entitySelect.value );

				if ( !(entitySelect.value && colorSelect.value) ) return resetValues();

				if ( material && entitySelect.value && colorSelect.value ) {

				//	Update.
					updateColor( this ); // update.

				//	Undo/Redo.
					addToUndo( material ); // undo/redo.

				}

				function resetValues(){

					color_r_input.value = parseInt( 255 * editor.color.r ).toFixed(0); // string.
					color_g_input.value = parseInt( 255 * editor.color.g ).toFixed(0); // string.
					color_b_input.value = parseInt( 255 * editor.color.b ).toFixed(0); // string.

					return;
				}

				function displayValue( input ){

					if ( !(input && colorSelect.value) ) return resetValues();

					var key = colorSelect.value;
					if ( input === color_r_input ) input.value = parseInt( 255 * editor[ key ].r ).toFixed(0); // string.
					if ( input === color_g_input ) input.value = parseInt( 255 * editor[ key ].g ).toFixed(0); // string.
					if ( input === color_b_input ) input.value = parseInt( 255 * editor[ key ].b ).toFixed(0); // string.

					return;
				}

				function updateColor( input ){

					if ( !(input && colorSelect.value) ) return resetValues();

					var key = colorSelect.value;
					var value = step * Math.abs( parseInt( input.value ) % 256 );

					if ( input === color_r_input ) editor[ key ].r = value; // update editor.
					if ( input === color_g_input ) editor[ key ].g = value; // update editor.
					if ( input === color_b_input ) editor[ key ].b = value; // update editor.

					material.color && editor.color && material.color.copy( editor.color ); // update material.
					material.emissive && editor.emissive && material.emissive.copy( editor.emissive ); // update material.
					material.specular && editor.specular && material.specular.copy( editor.specular ); // update material.

					return displayValue( input );
				}

			}

			color_r_increase.addEventListener( "mousedown", onMouseDown );
			color_g_increase.addEventListener( "mousedown", onMouseDown );
			color_b_increase.addEventListener( "mousedown", onMouseDown );
			color_r_decrease.addEventListener( "mousedown", onMouseDown );
			color_g_decrease.addEventListener( "mousedown", onMouseDown );
			color_b_decrease.addEventListener( "mousedown", onMouseDown );

			window.addEventListener( "mouseup", function (){
				clearTimeout( interval ); // important!
			//	debugMode && console.log( "on MouseUp:", interval );
			});

			color_r_increase.addEventListener( "click", onMouseClick );
			color_g_increase.addEventListener( "click", onMouseClick );
			color_b_increase.addEventListener( "click", onMouseClick );
			color_r_decrease.addEventListener( "click", onMouseClick );
			color_g_decrease.addEventListener( "click", onMouseClick );
			color_b_decrease.addEventListener( "click", onMouseClick );

			function updateEditor( button ){

				var step = 1/255;
				var max = 1, min = 0;
				var key = colorSelect.value;

				var r = editor[key].r; 
				var g = editor[key].g; 
				var b = editor[key].b;

				if ( button === color_r_increase ) editor[ key ].r = Math.min(max, r + step);
				if ( button === color_g_increase ) editor[ key ].g = Math.min(max, g + step);
				if ( button === color_b_increase ) editor[ key ].b = Math.min(max, b + step);

				if ( button === color_r_decrease ) editor[ key ].r = Math.max(min, r - step);
				if ( button === color_g_decrease ) editor[ key ].g = Math.max(min, g - step);
				if ( button === color_b_decrease ) editor[ key ].b = Math.max(min, b - step);

				displayVectorValues( colorSelect.value );
			}

			function onMouseClick(){

			//	clearTimeout( interval ); // important!

				if ( !colorSelect.value ) return;
				if ( !entitySelect.value ) return;

				var material = getMaterialByEntityId( entitySelect.value );

				if ( !material ) return;

			//	Update editor.
				entitySelect.value && colorSelect.value && updateEditor( this ); // update editor.

			//	Update material.
				entitySelect.value && material.color && editor.color && material.color.copy( editor.color ); // update material.
				entitySelect.value && material.emissive && editor.emissive && material.emissive.copy( editor.emissive ); // update material.
				entitySelect.value && material.specular && editor.specular && material.specular.copy( editor.specular ); // update material.

			//	Undo/Redo.
				entitySelect.value && addToUndo( material );

				debugMode && console.log( "on Mouse Click:", interval );

			}

			function onMouseDown(){ 

				clearTimeout( interval ); // important!

				if ( !colorSelect.value ) return; // !editor.isEditing;
				if ( !entitySelect.value ) return; // !editor.isEditing;

				var material = getMaterialByEntityId( entitySelect.value );

				if ( !material ) return;

				var button = this;
				var clock = new THREE.Clock();

				interval = setTimeout( function onUpdate() {

					if ( !material ) return;
					if ( !colorSelect.value ) return;
					if ( !entitySelect.value ) return;

					entitySelect.value && colorSelect.value && updateEditor( button ); // update editor.

				//	update material.
					entitySelect.value && material.color && editor.color && material.color.copy( editor.color ); // update material.
					entitySelect.value && material.emissive && editor.emissive && material.emissive.copy( editor.emissive ); // update material.
					entitySelect.value && material.specular && editor.specular && material.specular.copy( editor.specular ); // update material.

					var dt = clock.getDelta();
					interval = setTimeout( onUpdate, dt );
				//	debugMode && console.log( "on Update:", interval );

				}, 500);
			}

		})();

	//	key inputs.

		(function(){

			var interval;

			const material_value_input = document.getElementById("material-value-input");
			const material_value_increase = document.getElementById("material-value-increase");
			const material_value_decrease = document.getElementById("material-value-decrease");

			window.addEventListener( "mouseup", function (){
				clearTimeout( interval ); // important!
			//	debugMode && console.log( "on MouseUp:", interval );
			});

			material_value_input.addEventListener( "change", onInputChange );
			material_value_increase.addEventListener( "click", onMouseClick );
			material_value_decrease.addEventListener( "click", onMouseClick );

			function onMouseClick(){

				if ( !(entitySelect.value && keySelect.value) ) return;

				var material = getMaterialByEntityId( entitySelect.value );

				if ( !material ) return;

				var key = keySelect.value;

			//	is boolean.

				if ( typeof material[ key ] === "boolean" ) {
					editor[ key ] = !editor[ key ]; // update editor.
					material[ key ] = editor[ key ]; // update material.
					material_value_input.value = editor[ key ]; // display value.
					addToUndo( material ); // undo/redo.
					return;
				}

			//	is number.

				if ( typeof material[ key ] === "number" ) {

				//	TODO.

					return;
				}

			//	is string.

				if ( typeof material[ key ] === "string" ) {

				//	TODO.

					return;
				}

			}

			function onInputChange(){

				this.blur(); // important!

				if ( !(entitySelect.value && keySelect.value) ) return;

				var material = getMaterialByEntityId( entitySelect.value );

				if ( !material ) return;
				var key = keySelect.value;

			//	is boolean.

				if ( typeof material[ key ] === "boolean" ) {
					editor[ key ] = !editor[ key ]; // update editor.
					material[ key ] = editor[ key ]; // update material.
					material_value_input.value = editor[ key ]; // display value.
					addToUndo( material ); // undo/redo.
					return;
				}

			//	is number.

				if ( typeof material[ key ] === "number" ) {

				//	TODO.

					return;
				}

			//	is string.

				if ( typeof material[ key ] === "string" ) {

				//	TODO.

					return;
				}

			}

		})();

	//	Watchers.

		(function(){

		//	Update material tab entity droplist when an editor tab entity selected.
			watch(editorTabSelect, function( prop, action, newValue, oldValue ){
			//	debugMode && console.log( "editorSelect watch:", 
			//	prop, action, "newValue:", newValue, "oldValue:", oldValue  );

				if ( !newValue ) return resetEntitySelectValue();

			//	Get object.
				var object = getObjectByEntityId( newValue );
				if ( !(object && object.material) ) return; // important!

			//	Get material.
				var material;
				if ( Array.isArray( object.material ) ) 
					material = object.material[0]; // get first material.
				else 
					material = object.material;

				updateEntitySelectValue( material.id.toString() ); // string.

			});

		//	Update material tab editor.

			watch(entitySelect, function( prop, action, newValue, oldValue ){
			//	debugMode && console.log( "entitySelect watch:", 
			//	prop, action, "newValue:", newValue, "oldValue:", oldValue  );

				switchToEditMode( newValue ); // important!

			//	Display vectors direct from editor.
				updateEntitySelectValue();
				updateTextureSelectValue();
				updateKeySelectValue();
				updateScaleSelectValue();
				updateColorSelectValue();
				updateMaterialTypeValue();

			//	Update vectors direct from editor.
				displayVectorValues( keySelect.value );
				displayVectorValues( scaleSelect.value );
				displayVectorValues( colorSelect.value );

			});

			watch(textureSelect, function( prop, action, newValue, oldValue ){
				debugMode && console.log( "textureSelect watch:", prop, action, newValue );

						//	TODO.

			//	Update texture direct from editor.
				displayVectorValues( keySelect.value );
				displayVectorValues( scaleSelect.value );
				displayVectorValues( colorSelect.value );

			});

			watch(keySelect, function( prop, action, newValue, oldValue ){
				debugMode && console.log( "keySelect watch:", prop, action, newValue );

						//	TODO.

			//	Update vectors direct from editor.
				displayVectorValues( newValue );

			});

			watch(scaleSelect, function( prop, action, newValue, oldValue ){
				debugMode && console.log( "scaleSelect watch:", prop, action, newValue );

						//	TODO.

			//	Update vectors direct from editor.
				displayVectorValues( newValue );

			});

			watch(colorSelect, function( prop, action, newValue, oldValue ){
				debugMode && console.log( "colorSelect watch:", prop, action, newValue );

						//	TODO.

			//	Update vectors direct from editor.
				displayVectorValues( newValue );

			});

		})();


		return editor;

	})( new THREE.Material() );
