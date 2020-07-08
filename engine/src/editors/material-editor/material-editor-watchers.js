//	material-editor-watchers.js

//	Material Editor Watchers.
//	Watch each object/property individually.
//	Synchronize material with material editor (brige).
//	KEEP IN MIND: watchers update only if the value has been changed.

	(function( editor,entity_droplist ){

		var material; // important!

	//	You can add a watcher to update material only when entity droplist changes.
		watch( entity_droplist, "onchange", function( property, event, value ){
			material = getMaterialByEntityId( value ); // material id.
			debugMode && console.log({ item:entity_droplist,entity:material,"entity id":value });
		});

	//	.......................... add watchers here! ........................  //

	})( 
		materialEditor, // editor,
		document.querySelector("select#material-entities-droplist") // entity_droplist,
	);


//	Vectors.

	(function( editor,vector_x,vector_y,vector_droplist,entity_droplist ){

		var material; // important!
	//	Add a watcher to update material only when entity droplist changes.
		watch( entity_droplist, "onchange", function( property, event, value ){
			material = getMaterialByEntityId( value );
		});

	//	normalScale.

		watch( editor, "normalScale", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if (material && material.normalScale) 
				material.normalScale[key] = Number(editor.normalScale[key]);
		//	Display value.
			if ( vector_droplist.value === "normalScale" ){
				if ( key === "x" ) vector_x.value = Number(editor.normalScale[key]).toFixed(2);
				if ( key === "y" ) vector_y.value = Number(editor.normalScale[key]).toFixed(2);
			}
		});

	})( 
		materialEditor, // editor,
		document.querySelector("input#material-vector-x-input"),  // vector_x,
		document.querySelector("input#material-vector-y-input"),  // vector_y,
		document.querySelector("select#material-vector-droplist"), // vector_droplist,
		document.querySelector("select#material-entities-droplist") // entity_droplist,
	);


//	Colors.

	(function( editor,color_r,color_g,color_b,color_droplist,entity_droplist ){

		var material; // important!
	//	Add a watcher to update material only when entity droplist changes.
		watch( entity_droplist, "onchange", function( property, event, value ){
			material = getMaterialByEntityId( value );
		});

	//	color.

		watch( editor, "color", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if (material && material.color) 
				material.color[key] = Number(editor.color[key]);
		//	Display value.
			if ( color_droplist.value === "color" ) {
				if ( key === "r" ) color_r.value = Number(255*editor.color[key]).toFixed(0);
				if ( key === "g" ) color_g.value = Number(255*editor.color[key]).toFixed(0);
				if ( key === "b" ) color_b.value = Number(255*editor.color[key]).toFixed(0);
			}
		});

	//	emissive.

		watch( editor, "emissive", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if (material && material.emissive) 
				material.emissive[key] = Number(editor.emissive[key]);
		//	Display value.
			if ( color_droplist.value === "emissive" ) {
				if ( key === "r" ) color_r.value = Number(255*editor.emissive[key]).toFixed(0);
				if ( key === "g" ) color_g.value = Number(255*editor.emissive[key]).toFixed(0);
				if ( key === "b" ) color_b.value = Number(255*editor.emissive[key]).toFixed(0);
			}
		});

	//	specular.

		watch( editor, "specular", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if (material && material.specular) 
				material.specular[key] = Number(editor.specular[key]);
		//	Display value.
			if ( color_droplist.value === "specular" ) {
				if ( key === "r" ) color_r.value = Number(255*editor.specular[key]).toFixed(0);
				if ( key === "g" ) color_g.value = Number(255*editor.specular[key]).toFixed(0);
				if ( key === "b" ) color_b.value = Number(255*editor.specular[key]).toFixed(0);
			}
		});

	})( 
		materialEditor, // editor,
		document.querySelector("input#material-color-r-input"),  // color_r,
		document.querySelector("input#material-color-g-input"),  // color_g,
		document.querySelector("input#material-color-b-input"),  // color_b,
		document.querySelector("select#material-color-droplist"), // color_droplist,
		document.querySelector("select#material-entities-droplist") // entity_droplist,
	);

//	Strings.

	(function( editor,text_input,value_input,key_droplist ){

	//	var material; // important!
	//	Add a watcher to update material only when entity droplist changes.
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		material = getMaterialByEntityId( value );
	//	});

		watch( editor, "name", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = String(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ text_input.value, value_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "uuid", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = String(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ text_input.value, value_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "type", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = String(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ text_input.value, value_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "wireframeLinecap", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = String(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ text_input.value, value_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "wireframeLinejoin", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = String(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ text_input.value, value_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "precision", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = String(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ text_input.value, value_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "linecap", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = String(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ text_input.value, value_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "linejoin", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = String(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ text_input.value, value_input.value ] = [ editor[key], "" ];
			}
		});

	})( 
		materialEditor, // editor,
		document.querySelector("input#material-text-input"),  // text_input,
		document.querySelector("input#material-value-input"),  // value_input,
		document.querySelector("select#material-keys-droplist") // key_droplist,
	);

//	Boolean.

	(function( editor,text_input,value_input,key_droplist ){

	//	var material; // important!
	//	Add a watcher to update material only when entity droplist changes.
	//	watch( entity_droplist, "onchange", function( property, event, value ){
	//		material = getMaterialByEntityId( value );
	//	});

		watch( editor, "visible", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ text_input.value, value_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "alphaTest", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "transparent", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "premultipliedAlpha", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "fog", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "lights", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "dithering", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "colorWrite", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "flatShading", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "wireframe", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "depthTest", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "depthWrite", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "clipIntersection", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "clipShadows", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "polygonOffset", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "skinning", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "morphTargets", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "morphNormals", function( key, action, value ){
			var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Boolean(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

	})( 
		materialEditor, // editor,
		document.querySelector("input#material-text-input"),  // text_input,
		document.querySelector("input#material-value-input"),  // value_input,
		document.querySelector("select#material-keys-droplist") // key_droplist,
	);

//	Number.

	(function( editor,text_input,value_input,key_droplist ){

		var material; // important!
	//	Add a watcher to update material only when entity droplist changes.
		watch( entity_droplist, "onchange", function( property, event, value ){
			material = getMaterialByEntityId( value );
		});

	//	Float.

		watch( editor, "opacity", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key].toFixed(2), "" ];
			}
		});

	//	Integer.

		watch( editor, "side", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ text_input.value, value_input.value ] = [ editor[key].toFixed(0), "" ];
			}
		});

	//	Number.

		watch( editor, "overdraw", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "vertexColors", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "blending", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "blendSrc", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "blendDst", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "blendEquation", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "blendSrcAlpha", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "blendDstAlpha", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "blendEquationAlpha", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "depthFunc", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		watch( editor, "wireframeLinewidth", function( key, action, value ){
		//	var material = getMaterialByEntityId(); if ( !material ) return;
		//	Update material.
			if ( material ) material[key] = Number(editor[key]);
		//	Display value.
			if ( key_droplist.value === key ) {
				[ value_input.value, text_input.value ] = [ editor[key], "" ];
			}
		});

		//	"displacementScale,polygonOffsetUnits,polygonOffsetFactor,,"
		//	"alphaTest,reflectivity,refractionRatio,bumpScale,metalness,roughness,displacementBias,"
		//	"aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,,"
		//	"linewidth,size,scale,gapSize,dashSize,shininess,rotation,"
		//	"normalMapType,combine,polygonOffsetUnits,polygonOffsetFactor"











	})( 
		materialEditor, // editor,
		document.querySelector("input#material-text-input"),  // text_input,
		document.querySelector("input#material-value-input"),  // value_input,
		document.querySelector("select#material-keys-droplist") // key_droplist,
	);

//	needsUpdate_button.

	(function( needsUpdate_button ){

		needsUpdate_button.addEventListener( "click", function(){
			var material = getMaterialByEntityId();
			if ( material ) material.needsUpdate = true;
		});

	})( document.querySelector("div#material-needs-update") );

