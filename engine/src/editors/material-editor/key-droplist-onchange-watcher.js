//	key-droplist-onchange-watcher.js

	(function(editor,text_input,value_input,key_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch( key_droplist, "onchange", function( property, event, key ){
			debugMode && console.log({item:key_droplist,event:event,key:key});

			if ( key !== "" && editor[key] !== undefined ) {

				switch ( typeof editor[key] ) {

					case "string":
						[text_input.value, value_input.value] = [ editor[key], "" ];
					break;
				//
					case "number":

						if ( key === "rotation" ) {
							[value_input.value, text_input.value] = [ (RAD2DEG*editor[key]).toFixed(1), "" ]; break;
						}

						else if ( ("displacementScale,polygonOffsetUnits,polygonOffsetFactor,opacity,"
						+ "alphaTest,reflectivity,refractionRatio,bumpScale,metalness,roughness,displacementBias,"
						+ "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,wireframeLinewidth,"
						+ "linewidth,size,scale,gapSize,dashSize,shininess").split(",").includes(key) ) {

							[value_input.value, text_input.value] = [ editor[key].toFixed(2), "" ]; break;
						}

						else [value_input.value, text_input.value] = [ editor[key].toFixed(0), "" ];

					break;
				//
					case "boolean":
						[text_input.value, value_input.value] = [ "", editor[key] ];
					break;
				//
					default:
						[ value_input.value, text_input.value ] = ["",""];
					break;
				}

			} 

			else [ value_input.value, text_input.value ] = ["",""];

		});

	})(
		materialEditor, // editor,
		document.querySelector("input#material-text-input"), // text_input,
		document.querySelector("input#material-value-input"), // value_input,
		document.querySelector("select#material-keys-droplist") // key_droplist.
	);
