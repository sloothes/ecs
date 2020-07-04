//	vector-input-onchange-watchers.js


//	vector-x input onchange.

	(function(editor,keyInputControls,vector_x,vector_droplist,entity_droplist){

		function addtoUndo(){
			var json = editor.toJSON();
			json && undo.unshift( json );
			debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
			return;
		}

	//	blur.
	//	vector_x.addEventListener( "change", vector_x.blur );
		watch( vector_x, "onchange", function(){ vector_x.blur(); }); // EXPERIMANTAL!

	//	keyInputControls.

		function enableKeyInputControls(){
			keyInputControls.isDisabled = false;
		}

		function disableKeyInputControls(){
			keyInputControls.isDisabled = true;
		}

	//	onblur.
		vector_x.addEventListener( "blur", enableKeyInputControls );

	//	onfocus.
		vector_x.addEventListener( "focus", disableKeyInputControls );

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
		//	Before change the editor[key] value add an undo state in undo queue.
		//	Until now we has adding to Undo after the value has changed. (FIXED!)

			switch (key) {

				case "center":
					var value = THREE.Math.clamp( Number(value), 0, 1 ); // important!
					if ( editor[key].x !== Number(value) ) 
						try { addtoUndo(); } catch(err) { console.warn("TODO:addtoUndo();"); } // debug!
				//	editor watcher updates value input.
					setTimeout(function(){ editor[key].x = Number(value); }); // important!
				//	editor[key].x = Number(value);
				break;

				case "offset":
				case "repeat":
					var value = THREE.Math.clamp( Number(value), -100, 100 ); // number.
					if ( editor[key].x !== Number(value) ) 
						try { addtoUndo(); } catch(err) { console.warn("TODO:addtoUndo();"); } // debug!
				//	editor watcher updates value input.
					setTimeout(function(){ editor[key].x = Number(value); }); // important!
				//	editor[key].x = Number(value);
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
		document.querySelector("select#texture-entities-droplist") // entity_droplist.
	);


//	vector-y input onchange.

	(function(editor,keyInputControls,vector_y,vector_droplist,entity_droplist){

		function addtoUndo(){
			var json = editor.toJSON();
			json && undo.unshift( json );
			debugMode && console.log( "undo:", undo.length, "redo:", redo.length ); 
			return;
		}

	//	blur.
	//	vector_y.addEventListener( "change", vector_y.blur );
		watch( vector_y, "onchange", function(){ vector_y.blur(); }); // EXPERIMANTAL!

	//	keyInputControls.

		function enableKeyInputControls(){
			keyInputControls.isDisabled = false;
		}

		function disableKeyInputControls(){
			keyInputControls.isDisabled = true;
		}

	//	onblur.
		vector_y.addEventListener( "blur", enableKeyInputControls );

	//	onfocus.
		vector_y.addEventListener( "focus", disableKeyInputControls );

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
		//	Before change the editor[key] value add an undo state in undo queue.
		//	Until now we has adding to Undo after the value has changed. (FIXED!)

			switch (key) {

				case "center":
					var value = THREE.Math.clamp( Number(value), 0, 1 ); // important!
					if ( editor[key].y !== Number(value) ) 
						try { addtoUndo(); } catch(err) { console.warn("TODO:addtoUndo();"); } // debug!
				//	editor watcher updates value input.
					setTimeout(function(){ editor[key].y = Number(value); }); // important!
				//	editor[key].y = Number(value);
				break;

				case "offset":
				case "repeat":
					var value = THREE.Math.clamp( Number(value), -100, 100 ); // number.
					if ( editor[key].y !== Number(value) ) 
						try { addtoUndo(); } catch(err) { console.warn("TODO:addtoUndo();"); } // debug!
				//	editor watcher updates value input.
					setTimeout(function(){ editor[key].y = Number(value); }); // important!
				//	editor[key].y = Number(value);
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
		document.querySelector("select#texture-entities-droplist") // entity_droplist.
	);
