//	TextureViewerCenter.js

	(function( editor,viewer,getTextureByEntityId,vector_x,vector_y,vector_droplist,entity_droplist){

		watch( entity_droplist, "onchange", function( property, event, value ){
		//	debugMode && console.log({item:entity_droplist,event:event,value:value});

			if ( value === "" ) {

				viewer.material.map = null;
				viewer.material.needsUpdate = true;
				viewer.material.color.setHex(0x000000);
			//	viewer.center.position.set(-125, 0.1, 125);
				vector_x.value = (0.5 + (viewer.center.position.x/250)).toFixed(2); // display center value (x).
				vector_y.value = (0.5 - (viewer.center.position.z/250)).toFixed(2); // display center value (z).
				return;
			}

			if ( !getTextureByEntityId(value) )  {

				viewer.material.map = null;
				viewer.material.needsUpdate = true;
				viewer.material.color.setHex(0x000000);
				viewer.center.position.set(-125, 0.1, 125);
				return;
			}

			var texture = getTextureByEntityId( value ); // debugMode && console.log( texture );

			viewer.material.map = texture;
			viewer.material.needsUpdate = true;
			viewer.material.color.setHex(0xffffff);
			if ( viewer.material.map.image !== undefined ) {
				viewer.material.map.needsUpdate = true;
			}

		//	Update viewer center helper.
			viewer.center.position.x = -125 + (250 * editor.center.x);
			viewer.center.position.z =  125 - (250 * editor.center.y);

		});

//		Stack overflow!!!
//		watch( vector_droplist, "onchange", function( property, event, value ){
//
//			callWatchers( entity_droplist, "onchange", event, entity_droplist.value );
//
//		});

	})( 
		textureEditor, 
		textureViewer, 
		getTextureByEntityId, // helper function.
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist.
	);

//	Experimental (Independent texture viewer center helper).
//	if not texture entity selected ( !entity_droplist.value )
//	move texture viewer center but not update texture editor.

	(function(viewer,vector_x,vector_y,increase_x,decrease_x,increase_y,decrease_y,entity_droplist){

		var interval;

		increase_x.addEventListener( "mousedown", onMouseDown );
		decrease_x.addEventListener( "mousedown", onMouseDown );
		increase_y.addEventListener( "mousedown", onMouseDown );
		decrease_y.addEventListener( "mousedown", onMouseDown );

		window.addEventListener( "mouseup", function (){
			clearTimeout( interval ); // important!
		});

		function onMouseDown(){ 

			if ( entity_droplist.value ) return; // important!

			var button = this;
			var clock = new THREE.Clock();

			interval = setTimeout( function update() {

				var step = 1, max = 125, min = -125;

				if ( button === increase_x || button === decrease_x ) {
					var value = viewer.center.position.x; // get value from center position (x).
					if ( button === increase_x ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease_x ) value = THREE.Math.clamp( value-step, min, max );
					viewer.center.position.x = value;  // bypass editor (x).
					vector_x.value = (0.5 + (value/250)).toFixed(2); // bypass editor (x).
				}

				else if ( button === increase_y || button === decrease_y ) {
					var value = viewer.center.position.z; // get value from center position (z).
					if ( button === increase_y ) value = THREE.Math.clamp( value-step, min, max );
					if ( button === decrease_y ) value = THREE.Math.clamp( value+step, min, max );
					viewer.center.position.z = value;  // bypass editor (z).
					vector_y.value = (0.5 - (value/250)).toFixed(2); // bypass editor (z).
				}

				var dt = clock.getDelta();
				interval = setTimeout( update, dt );
			//	debugMode && console.log( "on center update:", interval );

			}, 500);

		}

	})(
		textureViewer,
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("li#texture-vector-x-increase"), // increase_x,
		document.querySelector("li#texture-vector-x-decrease"), // decrease_x,
		document.querySelector("li#texture-vector-y-increase"), // increase_y,
		document.querySelector("li#texture-vector-y-decrease"), // decrease_y,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	);

//	Overwrite vector inputs reset.
/*
//	Vector droplist on change watchers (Experimental).
//	Experimental (Independent texture viewer center helper).
//	if not texture entity selected ( !entity_droplist.value )
//	always display the texture viewer center helper value.

//	var viewer   = textureViewer;
//	var vector_x = document.querySelector("input#texture-vector-x-input"); // vector_x,
//	var vector_y = document.querySelector("input#texture-vector-y-input"); // vector_y,
//	var vector_droplist = document.querySelector("select#texture-vector-droplist"); // vector_droplist,
//	var entity_droplist = document.querySelector("select#texture-entities-droplist") // entity_droplist,

	(function(viewer,vector_x,vector_y,vector_droplist,entity_droplist){

		watch( entity_droplist, "onchange", function( property, event, value ){

			if ( value === "" ) {
				vector_x.value = (0.5 + (viewer.center.position.x/250)).toFixed(2); // display center value (x).
				vector_y.value = (0.5 - (viewer.center.position.z/250)).toFixed(2); // display center value (z).
			}

		});

	//	watch( vector_droplist, "onchange", function( property, event, value ){
	//		if ( entity_droplist.value === "" ) {
	//			vector_x.value = (0.5 + (viewer.center.position.x/250)).toFixed(2); // display center value (x).
	//			vector_y.value = (0.5 - (viewer.center.position.z/250)).toFixed(2); // display center value (z).
	//		}
	//	});

		watch( vector_droplist, "onchange", function( property, event, value ){

			callWatchers( entity_droplist, "onchange", event, entity_droplist.value );

		});

	})(
		textureViewer, // viewer
		document.querySelector("input#texture-vector-x-input"), // vector_x,
		document.querySelector("input#texture-vector-y-input"), // vector_y,
		document.querySelector("select#texture-vector-droplist"), // vector_droplist,
		document.querySelector("select#texture-entities-droplist") // entity_droplist,
	);
*/
