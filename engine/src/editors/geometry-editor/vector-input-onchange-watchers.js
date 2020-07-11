//	vector-input-onchange-watchers.js

//	vector-x input.

	(function(editor,vector_x,vector_droplist,entity_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch( vector_x, "onchange", function(property, event, value){
			debugMode && console.log({item:vector_x,event:event,key:vector_droplist.value,x:value});

			var key = vector_droplist.value; // important!
		//	value is vector_x.value, always as typeof "string", (ecxept NaN, undefined?)

		//	We dont "escape", will use editor values on create geometry.
		//	if ( entity_droplist.value === "" ) return vector_x.value = "";
		//	if ( vector_droplist.value === "" ) return vector_x.value = "";
		//	editor watcher updates input only if the editor value has changed,
		//	so in this case we must explicitly update the input value manualy.

			switch (key) {
				case "position":
					if ( isNaN(value) ) { value = 0; vector_x.value = "0.00"; } // avoid NaN.
					else value = Number(value); // meters, no limit.
					setTimeout(function(value){ editor[key].x = Number(value); }, null, value);
				break;
				case "rotation":
					if ( isNaN(value) ) { value = 0; vector_x.value = "0.0"; } // avoid NaN.
					else value = DEG2RAD * THREE.Math.clamp(Number(value), -180, 180); // rad!
					setTimeout(function(value){ editor[key]._x = Number(value); }, null, value);
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

		//	editor manager watcher updates input values.
		//	setTimeout(function(value){ editor[key].x = Number(value); }, null, value);

		});

	})(
		objectEditor, // editor,
		document.querySelector("input#geometry-vector-x-input"), // vector_x,
		document.querySelector("select#geometry-vector-droplist"), // vector_droplist.
		document.querySelector("select#geometry-entities-droplist") // entity_droplist, not used!!!
	);

//	vector-y input.

	(function(editor,vector_y,vector_droplist,entity_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch( vector_y, "onchange", function(property, event, value){
			debugMode && console.log({item:vector_y,event:event,key:vector_droplist.value,y:value});

			var key = vector_droplist.value; // important!
		//	value is vector_y.value, always as typeof "string", (ecxept NaN, undefined?)

		//	We dont "escape", will use editor values on create geometry.
		//	if ( entity_droplist.value === "" ) return vector_x.value = "";
		//	if ( vector_droplist.value === "" ) return vector_x.value = "";
		//	editor watcher updates input only if the editor value has changed,
		//	so in this case we must explicitly update the input value manualy.

			switch (key) {
				case "position":
					if ( isNaN(value) ) { value = 0; vector_y.value = "0.00"; } // avoid NaN.
					else value = Number(value); // meters, no limit.
					setTimeout(function(value){ editor[key].y = Number(value); }, null, value);
				break;
				case "rotation":
					if ( isNaN(value) ) { value = 0; vector_y.value = "0.0"; } // avoid NaN.
					else value = DEG2RAD * THREE.Math.clamp(Number(value), -180, 180); // rad!
					setTimeout(function(value){ editor[key]._y = Number(value); }, null, value);
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

		//	editor manager watcher updates input values.
		//	setTimeout(function(value){ editor[key].y = Number(value); }, null, value);

		});

	})(
		objectEditor, // editor,
		document.querySelector("input#geometry-vector-y-input"), // vector_y,
		document.querySelector("select#geometry-vector-droplist"), // vector_droplist.
		document.querySelector("select#geometry-entities-droplist") // entity_droplist, not used!!!
	);

//	vector-z input.

	(function(editor,vector_z,vector_droplist,entity_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch( vector_z, "onchange", function(property, event, value){
			debugMode && console.log({item:vector_z,event:event,key:vector_droplist.value,z:value});

			var key = vector_droplist.value; // important!
		//	value is vector_x.value, always as typeof "string", (ecxept NaN, undefined?)

		//	We dont "escape", will use editor values on create geometry.
		//	if ( entity_droplist.value === "" ) return vector_x.value = "";
		//	if ( vector_droplist.value === "" ) return vector_x.value = "";
		//	editor watcher updates input only if the editor value has changed,
		//	so in this case we must explicitly update the input value manualy.

			switch (key) {
				case "position":
					if ( isNaN(value) ) { value = 0; vector_z.value = "0.00" } // avoid NaN.
					else value = Number(value); // meters, no limit.
					setTimeout(function(value){ editor[key].z= Number(value); }, null, value);
				break;
				case "rotation":
					if ( isNaN(value) ) { value = 0; vector_z.value = "0.0" } // avoid NaN.
					else value = DEG2RAD * THREE.Math.clamp(Number(value), -180, 180); // rad!
					setTimeout(function(value){ editor[key]._z = Number(value); }, null, value);
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

		//	editor manager watcher updates input values.
		//	setTimeout(function(value){ editor[key].z = Number(value); }, null, value);

		});

	})(
		objectEditor, // editor,
		document.querySelector("input#geometry-vector-z-input"), // vector_z,
		document.querySelector("select#geometry-vector-droplist"), // vector_droplist.
		document.querySelector("select#geometry-entities-droplist") // entity_droplist, not used!!!
	);

//	vector-w input.

	(function(editor,vector_w,vector_droplist,entity_droplist){

		watch( vector_w, "onchange", function(property, event, value){
			debugMode && console.log({item:vector_w,event:event,key:vector_droplist.value,w:value});

			var key = vector_droplist.value; // important!
		//	value is vector_w.value, always as typeof "string", (ecxept NaN, undefined?)

		//	We dont "escape", will use editor values on create geometry.
		//	if ( entity_droplist.value === "" ) return vector_x.value = "";
		//	if ( vector_droplist.value === "" ) return vector_x.value = "";
		//	editor watcher updates input only if the editor value has changed,
		//	so in this case we must explicitly update the input value manualy.

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

		//	editor manager watcher updates input values.
		//	setTimeout(function(value){ editor[key].w = Number(value); }, null, value);

		});

	})(
		objectEditor, // editor,
		document.querySelector("input#geometry-vector-w-input"), // vector_z,
		document.querySelector("select#geometry-vector-droplist"), // vector_droplist.
		document.querySelector("select#geometry-entities-droplist") // entity_droplist, not used!!!
	);
