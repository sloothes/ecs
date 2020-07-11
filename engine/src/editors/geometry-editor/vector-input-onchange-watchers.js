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

			switch (key) {
				case "position":
					if ( isNaN(value) ) value = 0; // avaid NaN value, reset!
					else value = Number(value); // meters, no limit.
					setTimeout(function(value){ editor[key].x = Number(value); }, null, value);
				break;
				case "rotation":
					if ( isNaN(value) ) value = 0; // avaid NaN value, reset!
					else value = DEG2RAD * THREE.Math.clamp(Number(value), -180, 180); // rad, important!
					setTimeout(function(value){ editor[key]._x = Number(value); }, null, value);
				break;
				case "scale":
					if ( isNaN(value) ) value = 1; // avaid NaN value, reset to 100%.
					else if ( !Number(value) ) value = 1; // avoid scale:0, reset.
					else value = Number(value)/100; // internal scale value 1/100.
					setTimeout(function(value){ editor[key].x = Number(value); }, null, value);
				break;
				case "quaternion":
					vector_x.value = editor[key]._x.toFixed(3); //  no modification.
				break;
				default:
					vector_x.value = ""; return; // escape!
				break;
			}

			//	editor watcher updates input only if the editor value has changed,
			//	so in this case we must explicitly update the input value manualy.
			//  else value_input.value = editor[key]; // boolean as string.

		//	editor manager watcher updates input values.
		//	setTimeout(function(value){ editor[key].x = Number(value); }, null, value);

		});

	})(
		sceneEditor, // editor,
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

			switch (key) {
				case "position":
					if ( isNaN(value) ) value = 0; // avaid NaN value, reset!
					else value = Number(value); // meters, no limit.
					setTimeout(function(value){ editor[key].y = Number(value); }, null, value);
				break;
				case "rotation":
					if ( isNaN(value) ) value = 0; // avaid NaN value, reset!
					else value = DEG2RAD * THREE.Math.clamp(Number(value), -180, 180); // rad, important!
					setTimeout(function(value){ editor[key]._y = Number(value); }, null, value);
				break;
				case "scale":
					if ( isNaN(value) ) value = 1; // avaid NaN value, reset to 100%.
					else if ( !Number(value) ) value = 1; // avoid scale:0, reset.
					else value = Number(value)/100; // internal scale value 1/100.
					setTimeout(function(value){ editor[key].y = Number(value); }, null, value);
				break;
				case "quaternion":
					vector_y.value = editor[key]._y.toFixed(3); //  no modification.
				break;
				default:
					vector_y.value = ""; return; // escape!
				break;
			}

			//	editor watcher updates input only if the editor value has changed,
			//	so in this case we must explicitly update the input value manualy.
			//  else value_input.value = editor[key]; // boolean as string.

		//	editor manager watcher updates input values.
		//	setTimeout(function(value){ editor[key].y = Number(value); }, null, value);

		});

	})(
		sceneEditor, // editor,
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

			switch (key) {
				case "position":
					if ( isNaN(value) ) value = 0; // avaid NaN value, reset!
					else value = Number(value); // meters, no limit.
					setTimeout(function(value){ editor[key].z= Number(value); }, null, value);
				break;
				case "rotation":
					if ( isNaN(value) ) value = 0; // avaid NaN value, reset!
					else value = DEG2RAD * THREE.Math.clamp(Number(value), -180, 180); // rad, important!
					setTimeout(function(value){ editor[key]._z = Number(value); }, null, value);
				break;
				case "scale":
					if ( isNaN(value) ) value = 1; // avaid NaN value, reset to 100%.
					else if ( !Number(value) ) value = 1; // avoid scale:0, reset.
					else value = Number(value)/100; // internal scale value 1/100.
					setTimeout(function(value){ editor[key].z = Number(value); }, null, value);
				break;
				case "quaternion":
					vector_z.value = editor[key]._z.toFixed(3); //  no modification.
				break;
				default:
					vector_z.value = ""; return; // escape!
				break;
			}

			//	editor watcher updates input only if the editor value has changed,
			//	so in this case we must explicitly update the input value manualy.
			//  else value_input.value = editor[key]; // boolean as string.

		//	editor manager watcher updates input values.
		//	setTimeout(function(value){ editor[key].z = Number(value); }, null, value);

		});

	})(
		sceneEditor, // editor,
		document.querySelector("input#geometry-vector-z-input"), // vector_z,
		document.querySelector("select#geometry-vector-droplist"), // vector_droplist.
		document.querySelector("select#geometry-entities-droplist") // entity_droplist, not used!!!
	);
