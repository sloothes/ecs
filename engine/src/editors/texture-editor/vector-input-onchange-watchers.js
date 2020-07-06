//	vector-input-onchange-watchers.js

//	vector-x input.

	(function(editor,keyInputControls,vector_x,vector_droplist,entity_droplist,undo_button,redo_button){

	//	blur.

		watch( vector_x, "onchange", function(){ vector_x.blur(); }); // EXPERIMANTAL!

	//	keyInputControls.

		function enableKeyInputControls(){
			keyInputControls.isDisabled = false;
		}

		function disableKeyInputControls(){
			keyInputControls.isDisabled = true;
		}

		vector_x.addEventListener( "blur", enableKeyInputControls );
		vector_x.addEventListener( "focus", disableKeyInputControls );

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

	//	onchange.

		watch( vector_x, "onchange", function(property, event, value){
		//	debugMode && console.log({item:vector_x,event:event,key:vector_droplist.value,x:value});

			if ( entity_droplist.value === "" ) return vector_x.value = "";
			if ( vector_droplist.value === "" ) return vector_x.value = "";

		//	"value" always comes as typeof "string".

			if ( value === undefined ) return vector_x.value = "";
			if ( value === "" ) return vector_x.value = "";
			if ( value === "NaN" ) return vector_x.value = "";
			if ( value === "undefined" ) return vector_x.value = "";

			var key = vector_droplist.value;

		//	disabled on key change.

			if ( editor[key] === undefined ) return vector_x.value = "";
			if ( !editor[key].isVector2 ) return vector_x.value = "";
			if ( isNaN(value) ) return vector_x.value = editor[key].x.toFixed(2);

		//	enabled on key change.

			switch (key) {

				case "center":
					var value = THREE.Math.clamp( Number(value), 0, 1 ); // important!
				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we has adding to Undo after the value has changed. (FIXED!)
					addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
					setTimeout(function(){ editor[key].x = Number(value); }); // important!
				//	editor[key].x = Number(value); // editor watcher updates value input.
				break;

				case "offset":
				case "repeat":
					var value = THREE.Math.clamp( Number(value), -100, 100 ); // number.
				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we has adding to Undo after the value has changed. (FIXED!)
					addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
					setTimeout(function(){ editor[key].x = Number(value); }); // important!
				//	editor[key].x = Number(value); // editor watcher updates value input.
				break;

				default:
					vector_x.value = "";
				break;
			}

		});

	})(
		textureEditor, // editor,
		keyInputControls, // keyInputControls,
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist"), // entity_droplist.
		document.querySelector("div#texture-undo-button"), // undo_button,
		document.querySelector("div#texture-redo-button")  // redo_button (only needed for the debug console.log).
	);


//	vector-y input.

	(function(editor,keyInputControls,vector_y,vector_droplist,entity_droplist,undo_button,redo_button){

	//	blur.

		watch( vector_y, "onchange", function(){ vector_y.blur(); }); // EXPERIMANTAL!

	//	keyInputControls.

		function enableKeyInputControls(){
			keyInputControls.isDisabled = false;
		}

		function disableKeyInputControls(){
			keyInputControls.isDisabled = true;
		}

		vector_y.addEventListener( "blur", enableKeyInputControls );
		vector_y.addEventListener( "focus", disableKeyInputControls );

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

	//	onchange.

		watch( vector_y, "onchange", function(property, event, value){
		//	debugMode && console.log({item:vector_y,event:event,key:vector_droplist.value,y:value});

			if ( entity_droplist.value === "" ) return vector_y.value = "";
			if ( vector_droplist.value === "" ) return vector_y.value = "";

		//	"value" always comes as typeof "string".

			if ( value === undefined ) return vector_y.value = "";
			if ( value === "" ) return vector_y.value = "";
			if ( value === "NaN" ) return vector_y.value = "";
			if ( value === "undefined" ) return vector_y.value = "";

			var key = vector_droplist.value;

		//	disabled on key change.

			if ( editor[key] === undefined ) return vector_y.value = "";
			if ( !editor[key].isVector2 ) return vector_y.value = "";
			if ( isNaN(value) ) return vector_y.value = editor[key].y.toFixed(2);

		//	enabled on key change.

			switch (key) {

				case "center":
					var value = THREE.Math.clamp( Number(value), 0, 1 ); // important!
				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we has adding to Undo after the value has changed. (FIXED!)
					addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
					setTimeout(function(){ editor[key].y = Number(value); }); // important!
				//	editor[key].y = Number(value); // editor watcher updates value input.
				break;

				case "offset":
				case "repeat":
					var value = THREE.Math.clamp( Number(value), -100, 100 ); // number.
				//	Before change the editor[key] value add an undo state in undo queue.
				//	Until now we has adding to Undo after the value has changed. (FIXED!)
					addtoUndo( editor,key,value,undo_button,redo_button ); // add to undo.
					setTimeout(function(){ editor[key].y = Number(value); }); // important!
				//	editor[key].y = Number(value); // editor watcher updates value input.
				break;

				default:
					vector_y.value = "";
				break;
			}

		});

	})(
		textureEditor, // editor,
		keyInputControls, // keyInputControls,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist"), // entity_droplist.
		document.querySelector("div#texture-undo-button"), // undo_button,
		document.querySelector("div#texture-redo-button")  // redo_button (only needed for the debug console.log).
	);


	//	vector_x.addEventListener( "change", vector_x.blur );
	//	vector_y.addEventListener( "change", vector_y.blur );
