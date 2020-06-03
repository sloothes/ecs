//	keyboardState.js

	KeyboardState = function(){

	//	to store the current state.
		this.keyCodes = {};
		this.modifiers = {};

	//	create callback to bind/unbind keyboard events.
		var self = this;
		this._onKeyUp	= function(event){ self._onKeyChange(event, false);};
		this._onKeyDown	= function(event){ self._onKeyChange(event, true); };

	//	bind keyEvents.
		window.addEventListener("keyup", this._onKeyUp, false);
		window.addEventListener("keydown", this._onKeyDown, false);
	}

	KeyboardState.prototype.destroy	= function(){
	//	unbind keyEvents.
		window.removeEventListener("keyup", this._onKeyUp, false);
		window.removeEventListener("keydown", this._onKeyDown, false);
	}

	KeyboardState.MODIFIERS	= ["shift", "ctrl", "alt", "meta"];

	KeyboardState.ALIAS	= {
		"left"		: 37,
		"up"		: 38,
		"right"		: 39,
		"down"		: 40,
		"space"		: 32,
		"pageup"	: 33,
		"pagedown"	: 34,
		"tab"		: 9
	};

	KeyboardState.prototype._onKeyChange = function(event, pressed){
	//	debugMode && console.log("onKeyChange", pressed, event.keyCode,
	//		event.shiftKey, event.ctrlKey, event.altKey, event.metaKey);

	//	update this.keyCodes.
		var keyCode = event.keyCode;
		this.keyCodes[keyCode] = pressed;

	//	update this.modifiers.
		this.modifiers['shift'] = event.shiftKey;
		this.modifiers['ctrl']	= event.ctrlKey;
		this.modifiers['alt']	= event.altKey;
		this.modifiers['meta']	= event.metaKey;
	};

	KeyboardState.prototype.pressed	= function(keyDesc){
		var keys = keyDesc.split("+");
		for (var i = 0; i < keys.length; i++){
			var pressed, key = keys[i];
			if( KeyboardState.MODIFIERS.indexOf( key ) !== -1 ){
				pressed	= this.modifiers[key];
			} else if ( Object.keys(KeyboardState.ALIAS).indexOf( key ) != -1 ){
				pressed	= this.keyCodes[ KeyboardState.ALIAS[key] ];
			} else {
				pressed	= this.keyCodes[key.toUpperCase().charCodeAt(0)]
			}
			if( !pressed) return false;
		};
		return true;
	};
