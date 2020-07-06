//	material-editor.js

	const materialEditor = new MaterialEditor();

/*
	const materialEditor = (function(){

		const RAD2DEG = THREE.Math.RAD2DEG;
		const DEG2RAD = THREE.Math.DEG2RAD;

		const undo = new UndoArray(); debugMode && console.log( {"undo": undo} ); // we could attach undo array on undo_button.
		const redo = new UndoArray(); debugMode && console.log( {"redo": redo} ); // we could attach redo array on redo_button.

	//	droplists.

		const key_droplist = document.getElementById("material-keys-droplist");
		const type_droplist = document.getElementById("material-type-droplist");
		const color_droplist = document.getElementById("material-color-droplist");
		const vector_droplist = document.getElementById("material-vector-droplist");
		const entity_droplist = document.getElementById("material-entities-droplist");
		const texture_droplist = document.getElementById("material-map-droplist");

	//	mouse inputs.

		const increase_v = document.getElementById("material-value-increase");
		const decrease_v = document.getElementById("material-value-decrease");
		const increase_x = document.getElementById("material-vector-x-increase");
		const increase_y = document.getElementById("material-vector-y-increase");
		const decrease_x = document.getElementById("material-vector-x-decrease");
		const decrease_y = document.getElementById("material-vector-y-decrease");

		const increase_r = document.getElementById("material-color-r-increase");
		const increase_g = document.getElementById("material-color-g-increase");
		const increase_b = document.getElementById("material-color-b-increase");
		const decrease_r = document.getElementById("material-color-r-decrease");
		const decrease_g = document.getElementById("material-color-g-decrease");
		const decrease_b = document.getElementById("material-color-b-decrease");

	//	keyboard inputs.

		const color_r = document.getElementById("material-color-r-input");
		const color_g = document.getElementById("material-color-g-input");
		const color_b = document.getElementById("material-color-b-input");
		const vector_x = document.getElementById("material-vector-x-input");
		const vector_y = document.getElementById("material-vector-y-input");
		const text_input  = document.getElementById("material-text-input");
		const value_input = document.getElementById("material-value-input");

	//	material tab buttons.

		const exit_button = document.getElementById("material-exit-mode");
		const redo_button = document.getElementById("material-redo-button");
		const undo_button = document.getElementById("material-undo-button");
		const clone_button = document.getElementById("clone-material-button");
		const create_button = document.getElementById("create-material-button");
		const remove_button = document.getElementById("remove-material-button");
		const needsUpdate_button = document.getElementById("material-needs-update");

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
		//	clearUndoRedo();
			return;
		}

		return editor;

	})();
*/