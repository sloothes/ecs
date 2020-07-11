//	reset-vectors-onmouse-events.js

	(function( editor,reset_button,vector_x,vector_y,vector_z,vector_w,vector_droplist ){

		var interval;

		reset_button.addEventListener( "click", function(){
			clearTimeout(interval);
			interval = setTimeout(function(){
				callWatchers( reset_button, "onclick", "click", vector_droplist.value );
			}, 250);
		});

		watch( reset_button, "onclick", function( property, event, key ){
			debugMode && console.log({item:reset_button,event:event,key:key});

			switch ( key ) {
				case "position":
					editor.position.set(0,0,0); vector_w.value = "";
				break;
				case "rotation":
					editor.rotation.set(0,0,0); vector_w.value = "";
				break;
				case "scale":
					editor.scale.set(1,1,1); vector_w.value = "100.0";
				break;
				case "quaternion":
					editor.quaternion.set(0,0,0,1);
				break;
				default:
					[vector_x.value,vector_y.value,vector_z.value,vector_w.value] = ["","","",""];
				break;
			}

		});

	})(
		objectEditor, // editor,
		document.querySelector("div#geometry-reset-button"), // reset_button,
		document.querySelector("input#geometry-vector-x-input"), // vector_x,
		document.querySelector("input#geometry-vector-y-input"), // vector_y,
		document.querySelector("input#geometry-vector-z-input"), // vector_z,
		document.querySelector("input#geometry-vector-w-input"), // vector_w,
		document.querySelector("select#geometry-vector-droplist"), // vector_droplist.
	);
