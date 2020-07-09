//	vector-droplist-onchange-watcher.js

	(function(editor,vector_x,vector_y,vector_z,vector_w,vector_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch(vector_droplist, "onchange", function( property, event, key ){
			debugMode && console.log({item:vector_droplist,event:event,key:key});

			if ( key === "" || editor[key] === undefined ) {
				[vector_x.value, vector_y.value, vector_z.value, vector_w.value] = ["","","",""]; return;
			}

			switch ( key ) {
				case "":
					[vector_x.value, vector_y.value, vector_z.value, vector_w.value] = ["","","",""]; return;
				break;
				case "position":
					[vector_x.value, vector_y.value, 
					vector_z.value, vector_w.value] = [
						editor[key].x.toFixed(2), 
						editor[key].y.toFixed(2), 
						editor[key].z.toFixed(2), "" ];
				break;
				case "rotation":
					[vector_x.value, vector_y.value, 
					vector_z.value, vector_w.value] = [
						(RAD2DEG*editor[key]._x).toFixed(1), 
						(RAD2DEG*editor[key]._y).toFixed(1), 
						(RAD2DEG*editor[key]._z).toFixed(1), "" ];
				break;
				case "scale":
					[vector_x.value, vector_y.value, vector_z.value, vector_w.value] = [
						(100*editor[key].x).toFixed(1), 
						(100*editor[key].y).toFixed(1), (100*editor[key].z).toFixed(1), 
						(100*(editor[key].x+editor[key].y+editor[key].z)/3).toFixed(1) 
					];
				break;
				case "quaternion":
					[vector_x.value, vector_y.value, vector_z.value, vector_w.value] = [
						editor[key]._x.toFixed(3), editor[key]._y.toFixed(3), 
						editor[key]._z.toFixed(3), editor[key]._w.toFixed(3) 
					];
				break;
			}

		});

	})(
		sceneEditor, // editor,
		document.querySelector("input#geometry-vector-x-input"), // vector_x,
		document.querySelector("input#geometry-vector-y-input"), // vector_y,
		document.querySelector("input#geometry-vector-z-input"), // vector_z,
		document.querySelector("input#geometry-vector-w-input"), // vector_w,
		document.querySelector("select#geometry-vector-droplist") // vector_droplist.
	);

