//	key-inputs.js


	(function(editor){

		var interval;

		const clock = new THREE.Clock();
		const modifiers = keyboard.modifiers;
		const UP=38, DOWN=40, LEFT=37, RIGHT=39;
		const A=65, D=68, E=69, F=70, G=71, H=72, 
			  Q=81, R=82, S=83, T=84, W=87;

		function modifierIsDown(){
			return modifiers.alt   || modifiers.meta
				|| modifiers.shift || modifiers.ctrl; 
		}











	})(objectEditor);


	(function(document,keyboard,entity_droplist){
		document.addEventListener("keypress", function(e){
			if ( !entity_droplist.value ) return;
			debugMode && console.log("keyCodes:", keyboard.keyCodes);
		});
	})( 
		document, keyboard, // document, keyboard,
		document.querySelector("select#editor-entities-droplist") // entity_droplist.
	);
