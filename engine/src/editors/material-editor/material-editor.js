//	material-editor.js

	const materialEditor = new MaterialEditor();

/*
	const materialEditor = (function(){

		const RAD2DEG = THREE.Math.RAD2DEG;
		const DEG2RAD = THREE.Math.DEG2RAD;

		const undo = new UndoArray(); debugMode && console.log( {"undo": undo} ); // we could attach undo array on undo_button.
		const redo = new UndoArray(); debugMode && console.log( {"redo": redo} ); // we could attach redo array on redo_button.

	//	droplists.

		const key_droplist = document.querySelector("select#material-keys-droplist");
		const type_droplist = document.querySelector("select#material-type-droplist");
		const color_droplist = document.querySelector("select#material-color-droplist");
		const vector_droplist = document.querySelector("select#material-vector-droplist");
		const entity_droplist = document.querySelector("select#material-entities-droplist");
		const texture_droplist = document.querySelector("select#material-map-droplist");

	//	mouse inputs.

		const increase_v = document.querySelector("li#material-value-increase");
		const decrease_v = document.querySelector("li#material-value-decrease");
		const increase_x = document.querySelector("li#material-vector-x-increase");
		const increase_y = document.querySelector("li#material-vector-y-increase");
		const decrease_x = document.querySelector("li#material-vector-x-decrease");
		const decrease_y = document.querySelector("li#material-vector-y-decrease");

		const increase_r = document.querySelector("li#material-color-r-increase");
		const increase_g = document.querySelector("li#material-color-g-increase");
		const increase_b = document.querySelector("li#material-color-b-increase");
		const decrease_r = document.querySelector("li#material-color-r-decrease");
		const decrease_g = document.querySelector("li#material-color-g-decrease");
		const decrease_b = document.querySelector("li#material-color-b-decrease");

	//	keyboard inputs.

		const color_r = document.querySelector("input#material-color-r-input");
		const color_g = document.querySelector("input#material-color-g-input");
		const color_b = document.querySelector("input#material-color-b-input");
		const vector_x = document.querySelector("input#material-vector-x-input");
		const vector_y = document.querySelector("input#material-vector-y-input");
		const text_input  = document.querySelector("input#material-text-input");
		const value_input = document.querySelector("input#material-value-input");

	//	material tab buttons.

		const exit_button = document.querySelector("div#material-exit-mode");
		const redo_button = document.querySelector("div#material-redo-button");
		const undo_button = document.querySelector("div#material-undo-button");
		const clone_button = document.querySelector("div#clone-material-button");
		const create_button = document.querySelector("div#create-material-button");
		const remove_button = document.querySelector("div#remove-material-button");
		const needsUpdate_button = document.querySelector("div#material-needs-update");

	//	material editor.

		const editor = new MaterialEditor();

	//	editor helpers.

		function addtoUndo(){
			var json = editor.toJSON();
			json && undo.unshift( json );
			return;
		}

		function clearUndoRedo(){
			undo.clear();
			redo.clear();
			return;
		}

		function resetUIValues(){
			color_r.value = "";
			color_g.value = "";
			color_b.value = "";
			vector_x.value = "";
			vector_y.value = "";
			text_input.value = "";
			value_input.value = "";
			key_droplist.value = "";
			color_droplist.value = "";
			vector_droplist.value = "";
			entity_droplist.value = "";
			texture_droplist.value = "";
			return;
		}

	//	exit from edit mode.

		function exitFromEditMode(){
			editor.reset();
			resetUIValues();
			clearUndoRedo();
			return;
		}

		return editor;

	})();
*/