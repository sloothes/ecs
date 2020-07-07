//	value-input-onchange-watcher.js

	(function(editor,keyInputControls,text_input,value_input,key_droplist,entity_droplist,undo_button,redo_button){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

	//	add undo.

		function addtoUndo(editor,key,value,undo_button,redo_button){
			if ( editor[ key ] === value ) return;
			var json = editor.toJSON();
			json && undo_button.undo.unshift( json );
			try { debugMode && console.log( 
				"undo:", undo_button.undo.length, 
				"redo:", redo_button.redo.length 
			); } catch(err){;}
			return;
		}

	//	watcher.

		watch( value_input, "onchange", function(property, event, value){
			debugMode && console.log({item:value_input,event:event,key:key_droplist.value,value:value});

			var key = key_droplist.value; // key.
		//	var value = value_input.value; // value.

			if ( key_droplist.value === "" ) value = "";
			if ( entity_droplist.value === "" ) value = "";

		//	"value" always comes as typeof "string", (ecxept NaN, undefined?)

		//	if ( value === "" ) value = "";
		//	if ( isNaN(value) ) value = "";
			if ( value === "NaN" ) value = "";
			if ( value === undefined ) value = "";
			if ( value === "undefined" ) value = "";
			if ( typeof editor[key] === "string" ) value = "";

			switch ( key ){

				case "":
					[ text_input.value, value_input.value ] = ["",""]; return; // important!
				break;

			//	typeof editor[key] === "string" || typeof editor[key] === "undefined"

				case "name":
				case "type":
				case "uuid":
				case "linecap":
				case "linejoin":
				case "wireframeLinecap":
					[ text_input.value, value_input.value ] = [ editor[key], "" ]; return; // important!
				break;

			//	typeof editor[key] === "boolean" || typeof editor[key] === "undefined"

				case "fog":
				case "lights":
				case "flatShading":
				case "transparent":
				case "depthTest":
				case "depthWrite":
				case "clipIntersection":
				case "clipShadows":
				case "colorWrite":
				case "polygonOffset":
				case "dithering":
				case "premultipliedAlpha":
				case "visible":
				case "wireframe":
				case "skinning":
				case "morphTargets":
				case "morphNormals":
					if ( value === "0" ) value = false;                        // accept "0", string.
					else if ( value === "1" ) value = true;                    // accept "1", string.
					else if ( value.toLowerCase() === "true" ) value = true;   // accept "true" string.
					else if ( value.toLowerCase() === "false" ) value = false; // accept "false" string.
				//	return editor value, important!
					else value = Boolean(editor[key]); // important!
				break;

			//	typeof editor[key] === "number" || typeof editor[key] === "undefined"

				case "displacementScale":
				case "polygonOffsetUnits":
				case "polygonOffsetFactor":
					value = THREE.Math.clamp(Number(value), -100, 100); // number.
				break;
				case "opacity":
				case "overdraw":
				case "alphaTest":
				case "reflectivity":
					value = THREE.Math.clamp(Number(value), 0, 1); // number.
				break;
				case "refractionRatio":
					value = THREE.Math.clamp(Number(value), -1, 1); // number.
				break;
				case "bumpScale":
				case "metalness":
				case "roughness":
				case "displacementBias":
				case "aoMapIntensity":
				case "envMapIntensity":
				case "emissiveIntensity":
				case "lightMapIntensity":
				case "wireframeLinewidth":
					value = THREE.Math.clamp(Number(value), -10, 10); // number.
				break;
				case "linewidth":
					value = THREE.Math.clamp(Number(value), 0, 100); // number.
				break;
				case "size":
				case "scale":
				case "gapSize":
				case "dashSize":
				case "shininess":
					value = THREE.Math.clamp(Number(value), 0, 1000); // number.
				break;
				case "rotation":
					value = DEG2RAD*THREE.Math.clamp(Number(value), -180, 180); // number.
				break;
				case "blending":
					if ( "0,1,2,3,4,5".split(",").includes(value) ) value = Number(value); 
				break;
				case "side":
					if ( "0,1,2".split(",").includes(value) ) value = Number(value); 
				break;
				case "vertexColors":
					if ( "0,1,2".split(",").includes(value) ) value = Number(value); 
				break;
				case "blendDst":
				case "blendSrc":
					if ( "200,201,202,203,204,205,206,207,208,209,210".split(",").includes(value) ) value = Number(value); 
				break;
				case "blendEquation":
					if ( "100,101,102,103,104".split(",").includes(value) ) value = Number(value); 
				break;
				case "depthFunc":
					if ( "0,1,2,3,4,5,6,7".split(",").includes(value) ) value = Number(value); 
				break;
				case "normalMapType":
					if ( "0,1".includes(value) ) value = Number(value); 
				break;
				case "combine":
					if ( "0,1,2".includes(value) ) value = Number(value); 
				break;

				default:
					[ text_input.value, value_input.value ] = ["",""]; return; // important!
				break;
			}

			if ( key && (typeof value === "boolean" || typeof value === "number") && ( ""
			//	typeof editor[key] === "string" || typeof editor[key] === "undefined"
			//	+ "uuid,type,linecap,linejoin,wireframeLinecap,name,"
			//	typeof editor[key] === "boolean" || typeof editor[key] === "undefined"
				+ "fog,lights,flatShading,transparent,depthTest,depthWrite,clipIntersection,clipShadows,"
				+ "colorWrite,polygonOffset,dithering,premultipliedAlpha,visible,needsUpdate,wireframe,"
				+ "skinning,morphTargets,morphNormals,"
			//	typeof editor[key] === "number" || typeof editor[key] === "undefined"
				+ "displacementScale,polygonOffsetUnits,polygonOffsetFactor,opacity,overdraw,"
				+ "alphaTest,reflectivity,refractionRatio,bumpScale,metalness,roughness,displacementBias,"
				+ "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,wireframeLinewidth,"
				+ "linewidth,size,scale,gapSize,dashSize,shininess,rotation,"
				+ "blending,side,vertexColors,blendDst,blendSrc,blendEquation,depthFunc,"
				+ "normalMapType,combine,polygonOffsetUnits,polygonOffsetFactor").split(",").includes(key) 
			) {

			//	Before change the editor[key] value add an undo state in undo queue.
			//	Until now we was adding to undo after the value has changed. (FIXED!)
				addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
				setTimeout( function(){ editor[ key ] = value; });  // important!
			}

		});

	})(
		materialEditor, // editor,
		keyInputControls, // keyInputControls,
		document.querySelector("input#material-text-input"), // text_input,
		document.querySelector("input#material-value-input"), // value_input,
		document.querySelector("select#material-keys-droplist"), // key_droplist
		document.querySelector("select#material-entities-droplist"), // entity_droplist.
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button")  // redo_button (only needed for the debug console.log).
	);


	//	blur.

	//	watch( value_input, "onchange", function(){ value_input.blur(); }); // EXPERIMANTAL!

	//	keyInputControls.

	//	function enableKeyInputControls(){
	//		keyInputControls.isDisabled = false;
	//	}

	//	function disableKeyInputControls(){
	//		keyInputControls.isDisabled = true;
	//	}

	//	value_input.addEventListener( "blur", enableKeyInputControls );
	//	value_input.addEventListener( "focus", disableKeyInputControls );



/*
		if ( typeof editor[key] === "string" ) return (function(){
			value_input.value = ""; // text_input.value = editor[key]; return;
		})();

		else if ( typeof editor[key] === "boolean" ) return (function(){
		//	.................................................... return;
		})();

		else if ( typeof editor[key] === "number" ) return (function(){
		//	.................................................... return;
		})();

		else if ( typeof editor[key] === "undefined" ) return (function(){

		 //	string type values.
			if ( "uuid,type,linecap,linejoin,wireframeLinecap,name".split(",").includes(key) ) 
				value_input.value = ""; return;
		//	boolean type values.
			else if ( ("fog,lights,flatShading,transparent,depthTest,"
			+ "depthWrite,clipIntersection,clipShadows,colorWrite,polygonOffset,"
			+ "dithering,premultipliedAlpha,visible,needsUpdate,wireframe,"
			+ "skinning,morphTargets,morphNormals").split(",").includes(key) ) {
			//	........................................................ return;
		//	number type values.
			} else if ( ("displacementScale,polygonOffsetUnits,polygonOffsetFactor,opacity,overdraw,"
			+ "alphaTest,reflectivity,refractionRatio,bumpScale,metalness,roughness,displacementBias,"
			+ "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,wireframeLinewidth,"
			+ "linewidth,size,scale,gapSize,dashSize,shininess,rotation").split(",").includes(key) ) {
			//	.............................................................................. return;
			} else if ( ("blending,side,vertexColors,blendDst,blendSrc,blendEquation,depthFunc,"
			+ "normalMapType,combine,polygonOffsetUnits,polygonOffsetFactor").split(",").includes(key) ) {
			//	.................................................................................. return;
			}
			return;
		})();
*/