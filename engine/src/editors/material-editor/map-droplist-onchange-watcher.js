//	map-droplist-onchange-watcher.js

	(function(editor,map_droplist,vector_x,vector_y,vector_droplist){

		watch( map_droplist, "onchange", function( property, event, map ){
			debugMode && console.log({item:map_droplist,event:event,map:map});

			var key = vector_droplist.value;

			if ( map !== "normalMap" )         [vector_x.value, vector_y.value] = ["",""];
			else if ( key !== "normalScale" )  [vector_x.value, vector_y.value] = ["",""];
			else if ( editor[map] == null)     [vector_x.value, vector_y.value] = ["",""];
			else if ( editor[key] == null)     [vector_x.value, vector_y.value] = ["",""];
			else if ( !editor[map].isTexture ) [vector_x.value, vector_y.value] = ["",""];
			else if ( !editor[key].isVector2 ) [vector_x.value, vector_y.value] = ["",""];
			else [ vector_x.value, vector_y.value ] = [ editor[key].x.toFixed(2), editor[key].y.toFixed(2) ];

		});

	})(
		materialEditor, // editor,
		document.querySelector("select#material-map-droplist"), // map_droplist.
		document.querySelector("input#material-vector-x-input"),  // vector_x,
		document.querySelector("input#material-vector-y-input"),  // vector_y,
		document.querySelector("select#material-vector-droplist") // vector_droplist.
	);


//	if ( !map || editor[map] == null || !editor[map].isTexture ) 
//		return [vector_x.value, vector_y.value] = ["",""];
//	var key = vector_droplist.value;
//	if ( map === "normalMap" && key === "normalScale" 
//	&& editor[ key ] && editor[ key ].isVector2 ) 
//		[ vector_x.value, vector_y.value ] = [ 
//			editor[key].x.toFixed(2), editor[key].y.toFixed(2) 
//		];
//	else [vector_x.value, vector_y.value] = ["",""];
