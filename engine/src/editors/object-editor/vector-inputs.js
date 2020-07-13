//	vector inputs.js


//	vector-x input.

	(function(editor,vector_x,vector_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch( vector_x, "onchange", function(property, event, value){
			debugMode && console.log({item:vector_x,event:event,key:vector_droplist.value,x:value});

			var key = vector_droplist.value; // important!
		//	value is vector_x.value, always typeof "string", (ecxept NaN, undefined)

			switch (key) {
				case "position":
					if ( isNaN(value) ) { value = 0; vector_x.value = "0.00"; } // avoid NaN.
					else value = Number(value); // meters, no limit.
					setTimeout(function(value){ editor[key].x = Number(value); }, null, value);
				break;
				case "rotation":
					if ( isNaN(value) ) { value = 0; vector_x.value = "0.0"; } // avoid NaN.
					else value = DEG2RAD * THREE.Math.clamp(Number(value), -180, 180); // rad!
					setTimeout(function(value){ editor[key].x = Number(value); }, null, value);
				break;
				case "scale":
					if ( isNaN( value ) ) { value = 100; vector_x.value = "100.0"; } // avoid NaN.
					if ( !Number(value) ) { value = 100; vector_x.value = "100.0"; } // avoid scale:0.
					value = Number(value)/100; // internal scale value 1/100.
					setTimeout(function(value){ editor[key].x = Number(value); }, null, value);
				break;
				case "quaternion":
					vector_x.value = editor[key].x.toFixed(3);
				break;
				default:
					vector_x.value = ""; return; // escape!
				break;
			}

		});

	})(
		objectEditor, // editor,
		document.querySelector("input#editor-vector-x-input"),  // vector_x,
		document.querySelector("select#editor-vector-droplist") // vector_droplist.
	);

//	vector-y input.

	(function(editor,vector_y,vector_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch( vector_y, "onchange", function(property, event, value){
			debugMode && console.log({item:vector_y,event:event,key:vector_droplist.value,y:value});

			var key = vector_droplist.value; // important!
		//	value is vector_y.value, always typeof "string", (ecxept NaN, undefined)

			switch (key) {
				case "position":
					if ( isNaN(value) ) { value = 0; vector_y.value = "0.00"; } // avoid NaN.
					else value = Number(value); // meters, no limit.
					setTimeout(function(value){ editor[key].y = Number(value); }, null, value);
				break;
				case "rotation":
					if ( isNaN(value) ) { value = 0; vector_y.value = "0.0"; } // avoid NaN.
					else value = DEG2RAD * THREE.Math.clamp(Number(value), -180, 180); // rad!
					setTimeout(function(value){ editor[key].y = Number(value); }, null, value);
				break;
				case "scale":
					if ( isNaN( value ) ) { value = 100; vector_y.value = "100.0"; } // avoid NaN.
					if ( !Number(value) ) { value = 100; vector_y.value = "100.0"; } // avoid scale:0.
					value = Number(value)/100; // internal scale value 1/100.
					setTimeout(function(value){ editor[key].y = Number(value); }, null, value);
				break;
				case "quaternion":
					vector_y.value = editor[key].y.toFixed(3);
				break;
				default:
					vector_y.value = ""; return;
				break;
			}

		});

	})(
		objectEditor, // editor,
		document.querySelector("input#editor-vector-y-input"),  // vector_y,
		document.querySelector("select#editor-vector-droplist") // vector_droplist.
	);

//	vector-z input.

	(function(editor,vector_z,vector_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch( vector_z, "onchange", function(property, event, value){
			debugMode && console.log({item:vector_z,event:event,key:vector_droplist.value,z:value});

			var key = vector_droplist.value; // important!
		//	value is vector_x.value, always typeof "string", (ecxept NaN, undefined)

			switch (key) {
				case "position":
					if ( isNaN(value) ) { value = 0; vector_z.value = "0.00" } // avoid NaN.
					else value = Number(value); // meters, no limit.
					setTimeout(function(value){ editor[key].z= Number(value); }, null, value);
				break;
				case "rotation":
					if ( isNaN(value) ) { value = 0; vector_z.value = "0.0" } // avoid NaN.
					else value = DEG2RAD * THREE.Math.clamp(Number(value), -180, 180); // rad!
					setTimeout(function(value){ editor[key].z = Number(value); }, null, value);
				break;
				case "scale":
					if ( isNaN( value ) ) { value = 100; vector_z.value = "100.0"; } // avoid NaN.
					if ( !Number(value) ) { value = 100; vector_z.value = "100.0"; } // avoid scale:0.
					value = Number(value)/100; // internal scale value 1/100.
					setTimeout(function(value){ editor[key].z = Number(value); }, null, value);
				break;
				case "quaternion":
					vector_z.value = editor[key].z.toFixed(3);
				break;
				default:
					vector_z.value = ""; return;
				break;
			}

		});

	})(
		objectEditor, // editor,
		document.querySelector("input#editor-vector-z-input"),  // vector_z,
		document.querySelector("select#editor-vector-droplist") // vector_droplist.
	);

//	vector-w input.

	(function(editor,vector_w,vector_droplist){

		watch( vector_w, "onchange", function(property, event, value){
			debugMode && console.log({item:vector_w,event:event,key:vector_droplist.value,w:value});

			var key = vector_droplist.value; // important!
		//	value is vector_w.value, always typeof "string", (ecxept NaN, undefined?)

			switch (key) {
				case "scale":
					if ( isNaN( value ) ) { value = 100; vector_w.value = "100.0"; } // avoid NaN.
					if ( !Number(value) ) { value = 100; vector_w.value = "100.0"; } // avoid scale:0.
					value = Number(value)/100; // internal scale value 1/100.
					setTimeout(function(key, value){ 
						editor[key].x = Number(value); 
						editor[key].y = Number(value); 
						editor[key].z = Number(value); 
					}, null, key, value);
				break;
				case "quaternion":
					vector_w.value = editor[key].w.toFixed(3);
				break;
				default:
					vector_w.value = ""; return;
				break;
			}

		});

	})(
		objectEditor, // editor,
		document.querySelector("input#editor-vector-w-input"),  // vector_z,
		document.querySelector("select#editor-vector-droplist") // vector_droplist.
	);


//	Call watchers.

	(function( input ){
	//	input.addEventListener( "blur", enableKeyInputControls );
	//	input.addEventListener( "focus", disableKeyInputControls );
		input.addEventListener( "change", function(){
			this.blur(); callWatchers(this, "onchange", "change", this.value );
		});
	})( document.querySelector("input#editor-vector-x-input") ); // vector_x.

	(function( input ){
	//	input.addEventListener( "blur", enableKeyInputControls );
	//	input.addEventListener( "focus", disableKeyInputControls );
		input.addEventListener( "change", function(){
			this.blur(); callWatchers(this, "onchange", "change", this.value );
		});
	})( document.querySelector("input#editor-vector-y-input") ); // vector_y.

	(function( input ){
	//	input.addEventListener( "blur", enableKeyInputControls );
	//	input.addEventListener( "focus", disableKeyInputControls );
		input.addEventListener( "change", function(){
			this.blur(); callWatchers(this, "onchange", "change", this.value );
		});
	})( document.querySelector("input#editor-vector-z-input") ); // vector_z.

	(function( input ){
	//	input.addEventListener( "blur", enableKeyInputControls );
	//	input.addEventListener( "focus", disableKeyInputControls );
		input.addEventListener( "change", function(){
			this.blur(); callWatchers(this, "onchange", "change", this.value );
		});
	})( document.querySelector("input#editor-vector-w-input") ); // vector_w.