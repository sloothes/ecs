//	color-input-onchange-watchers.js

//	color-r input.

	(function(editor,color_r,color_droplist,entity_droplist,undo_button,redo_button){

	//	add undo.

		function addtoUndo(editor,key,r,value,undo_button,redo_button){
			if ( editor[key][r] === value ) return;
			var json = editor.toJSON();
			json && undo_button.undo.unshift( json );
			try { debugMode && console.log( 
				"undo:", undo_button.undo.length, 
				"redo:", redo_button.redo.length 
			); } catch(err){;}
			return;
		}

	//	onchange.

		watch( color_r, "onchange", function(property, event, value){
			debugMode && console.log({item:color_r,event:event,key:color_droplist.value,r:value});

			var key = color_droplist.value;
		//	var value = color_r.value // value;

			if ( color_droplist.value === "" ) return color_r.value = "";
			if ( entity_droplist.value === "" ) return color_r.value = "";

		//	"value" always comes as typeof "string", (ecxept NaN, undefined?)

			if ( value === "" ) return color_r.value = "";
			if ( value === "undefined" ) return color_r.value = "";

		//	disabled on key change.

			if ( editor[key] === undefined ) return color_r.value = "";
			else if ( !editor[key].isColor ) return color_r.value = "";
			else if ( isNaN(value) ) return color_r.value = (255*editor[key].r).toFixed(0);

		//	enabled on key change.

			switch (key) {

				case "color":
				case "emissive":
				case "specular":
					value = THREE.Math.clamp( (Number(value) % 256) / 255, 0, 1 );
				break;

				default:
					color_r.value = ""; return;
				break;
			}

		//	Before change the editor[key] value add an undo state in undo queue.
		//	Until now we has adding to Undo after the value has changed. (FIXED!)
			addtoUndo( editor,key,"r",value,undo_button,redo_button ); // add to undo.
			setTimeout(function(){ editor[key].r = Number(value); }); // important!

		});

	})(
		materialEditor, // editor,
		document.querySelector("input#material-color-r-input"), // color_r,
		document.querySelector("select#material-color-droplist"), // color_droplist,
		document.querySelector("select#material-entities-droplist"), // entity_droplist.
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button")  // redo_button (only needed for the debug console.log).
	);

//	color-g input.

	(function(editor,color_g,color_droplist,entity_droplist,undo_button,redo_button){

	//	add undo.

		function addtoUndo(editor,key,g,value,undo_button,redo_button){
			if ( editor[key][g] === value ) return;
			var json = editor.toJSON();
			json && undo_button.undo.unshift( json );
			try { debugMode && console.log( 
				"undo:", undo_button.undo.length, 
				"redo:", redo_button.redo.length 
			); } catch(err){;}
			return;
		}

	//	onchange.

		watch( color_g, "onchange", function(property, event, value){
			debugMode && console.log({item:color_g,event:event,key:color_droplist.value,g:value});

			var key = color_droplist.value;
		//	var value = color_g.value // value;

			if ( color_droplist.value === "" ) return color_g.value = "";
			if ( entity_droplist.value === "" ) return color_g.value = "";

		//	"value" always comes as typeof "string", (ecxept NaN, undefined?)

			if ( value === "" ) return color_g.value = "";
			if ( value === "undefined" ) return color_g.value = "";

		//	disabled on key change.

			if ( editor[key] === undefined ) return color_g.value = "";
			else if ( !editor[key].isColor ) return color_g.value = "";
			else if ( isNaN(value) ) return color_g.value = (255*editor[key].g).toFixed(0);

		//	enabled on key change.

			switch (key) {

				case "color":
				case "emissive":
				case "specular":
					value = THREE.Math.clamp( (Number(value) % 256) / 255, 0, 1 );
				break;

				default:
					color_g.value = ""; return;
				break;
			}

		//	Before change the editor[key] value add an undo state in undo queue.
		//	Until now we has adding to Undo after the value has changed. (FIXED!)
			addtoUndo( editor,key,"g",value,undo_button,redo_button ); // add to undo.
			setTimeout(function(){ editor[key].g = Number(value); }); // important!

		});

	})(
		materialEditor, // editor,
		document.querySelector("input#material-color-g-input"), // color_g,
		document.querySelector("select#material-color-droplist"), // color_droplist,
		document.querySelector("select#material-entities-droplist"), // entity_droplist.
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button")  // redo_button (only needed for the debug console.log).
	);

//	color-g input.

	(function(editor,color_b,color_droplist,entity_droplist,undo_button,redo_button){

	//	add undo.

		function addtoUndo(editor,key,b,value,undo_button,redo_button){
			if ( editor[key][b] === value ) return;
			var json = editor.toJSON();
			json && undo_button.undo.unshift( json );
			try { debugMode && console.log( 
				"undo:", undo_button.undo.length, 
				"redo:", redo_button.redo.length 
			); } catch(err){;}
			return;
		}

	//	onchange.

		watch( color_b, "onchange", function(property, event, value){
			debugMode && console.log({item:color_b,event:event,key:color_droplist.value,b:value});

			var key = color_droplist.value;
		//	var value = color_b.value // value;

			if ( color_droplist.value === "" ) return color_b.value = "";
			if ( entity_droplist.value === "" ) return color_b.value = "";

		//	"value" always comes as typeof "string", (ecxept NaN, undefined?)

			if ( value === "" ) return color_b.value = "";
			if ( value === "undefined" ) return color_b.value = "";

		//	disabled on key change.

			if ( editor[key] === undefined ) return color_b.value = "";
			else if ( !editor[key].isColor ) return color_b.value = "";
			else if ( isNaN(value) ) return color_b.value = (255*editor[key].b).toFixed(0);

		//	enabled on key change.

			switch (key) {

				case "color":
				case "emissive":
				case "specular":
					value = THREE.Math.clamp( (Number(value) % 256) / 255, 0, 1 );
				break;

				default:
					color_b.value = ""; return;
				break;
			}

		//	Before change the editor[key] value add an undo state in undo queue.
		//	Until now we has adding to Undo after the value has changed. (FIXED!)
			addtoUndo( editor,key,"b",value,undo_button,redo_button ); // add to undo.
			setTimeout(function(){ editor[key].b = Number(value); }); // important!

		});

	})(
		materialEditor, // editor,
		document.querySelector("input#material-color-b-input"), // color_b,
		document.querySelector("select#material-color-droplist"), // color_droplist,
		document.querySelector("select#material-entities-droplist"), // entity_droplist.
		document.querySelector("div#material-undo-button"), // undo_button,
		document.querySelector("div#material-redo-button")  // redo_button (only needed for the debug console.log).
	);
