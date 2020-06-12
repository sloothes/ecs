//	keyboard.js

	const keyboard = new KeyboardState();
	const keyCodes = keyboard.keyCodes;

	const axisX = new THREE.Vector3(1,0,0);
	const axisY = new THREE.Vector3(0,1,0);
	const axisZ = new THREE.Vector3(0,0,1);

//	keyboard frontAngle eventListeners.
	window.addEventListener("keyup",   function(){ updateKeyboardFrontAngle( keyboard ); });
	window.addEventListener("keydown", function(){ updateKeyboardFrontAngle( keyboard ); });

	function updateKeyboardFrontAngle( keyboard ){

		const rad = Math.PI/4;
		const keyCodes = keyboard.keyCodes;
		const A=65, D=68, S=83, W=87;
		const Left=37, Up=38, Right=39, Down=40;

		var UP    = keyCodes[W] || keyCodes[Up];
		var LEFT  = keyCodes[A] || keyCodes[Left];
		var DOWN  = keyCodes[S] || keyCodes[Down];
		var RIGHT = keyCodes[D] || keyCodes[Right];

	//	debugMode && console.log( UP, LEFT, DOWN, RIGHT );

		if (  UP && !LEFT && !DOWN && !RIGHT ) keyboard.frontAngle = 0 * rad; //   0 deg.
		else if (  UP &&  LEFT && !DOWN && !RIGHT ) keyboard.frontAngle = 1 * rad; //  45 deg.
		else if ( !UP &&  LEFT && !DOWN && !RIGHT ) keyboard.frontAngle = 2 * rad; //  90 deg.
		else if ( !UP &&  LEFT &&  DOWN && !RIGHT ) keyboard.frontAngle = 3 * rad; // 135 deg.
		else if ( !UP && !LEFT &&  DOWN && !RIGHT ) keyboard.frontAngle = 4 * rad; // 180 deg.
		else if ( !UP && !LEFT &&  DOWN &&  RIGHT ) keyboard.frontAngle = 5 * rad; // 225 deg.
		else if ( !UP && !LEFT && !DOWN &&  RIGHT ) keyboard.frontAngle = 6 * rad; // 270 deg.
		else if (  UP && !LEFT && !DOWN &&  RIGHT ) keyboard.frontAngle = 7 * rad; // 315 deg.
	//	else if ( !UP && !LEFT && !DOWN && !RIGHT ) keyboard.frontAngle = 8 * rad; // 360 deg.

	}
