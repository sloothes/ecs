//	UndoArray Class (extends Array class).

	function UndoArray(){
		var array = new Array(0);
		Object.setPrototypeOf( array, UndoArray.prototype );
		return array; // important!
	}

	UndoArray.prototype = Object.create(Array.prototype); // important!
	UndoArray.prototype.clear = function(){ this.length = 0; };
	UndoArray.prototype.move = function( old_index, new_index ){
		if (new_index >= this.length) {
			var k = new_index - this.length + 1;
			while (k--) {
				this.push(undefined);
			}
		}
		this.splice(new_index, 0, this.splice(old_index, 1)[0]);
	}
