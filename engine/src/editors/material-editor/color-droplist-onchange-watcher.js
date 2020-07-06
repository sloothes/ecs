//	color-droplist-onchange-watcher.js

	(function(editor,color_r,color_g,color_b,color_droplist){

		watch( color_droplist, "onchange", function( property, event, key ){
			debugMode && console.log({item:color_droplist,event:event,key:key});

			if ( key === "" )                     [color_r.value, color_g.value, color_b.value] = ["","",""];
			else if ( editor[key] === undefined ) [color_r.value, color_g.value, color_b.value] = ["","",""];
			else if ( !editor[key].isColor )      [color_r.value, color_g.value, color_b.value] = ["","",""];

			else [ color_r.value, color_g.value, color_b.value ] = [ 
				parseInt( 255*editor[ key ].r ).toFixed(0),
				parseInt( 255*editor[ key ].g ).toFixed(0),
				parseInt( 255*editor[ key ].b ).toFixed(0)
			];

		});

	})(
		materialEditor, // editor,
		document.querySelector("input#material-color-r-input"), // color_r,
		document.querySelector("input#material-color-g-input"), // color_g,
		document.querySelector("input#material-color-b-input"), // color_b,
		document.querySelector("select#material-color-droplist") // color_droplist.
	);
