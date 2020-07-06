//	vector-droplist-onchange-watcher.js

	(function(editor,vector_x,vector_y,vector_droplist){

		watch( vector_droplist, "onchange", function( property, event, key ){
			debugMode && console.log({item:vector_droplist,event:event,key:key});

			if ( key === "" )                         [vector_x.value, vector_y.value] = ["",""];
			else if ( editor[key] === undefined )     [vector_x.value, vector_y.value] = ["",""];
			else if ( !editor[key].isVector2 )        [vector_x.value, vector_y.value] = ["",""];
			else [ vector_x.value, vector_y.value ] = [ editor[key].x.toFixed(2), editor[key].y.toFixed(2) ];

		});

	})(
		materialEditor, // editor,
		document.querySelector("input#material-vector-x-input"),  // vector_x,
		document.querySelector("input#material-vector-y-input"),  // vector_y,
		document.querySelector("select#material-vector-droplist") // vector_droplist.
	);
