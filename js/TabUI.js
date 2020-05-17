//	TabUI.js

(function(){

	TabUI = {};

	TabUI.add = function(name, id){

		var role, pill, tab;

		role = document.createElement("li");
		role.setAttribute("role", "presentation");
		role.style.display = "inline-block";

		pill = document.createElement("a");
		pill.href = "#"+id; // important!
		pill.setAttribute("data-toggle", "pill");
		pill.classList.add("pills","right-pill");
		pill.text = name; // pill.innerHTML = name;
		role.appendChild( pill );

		tab = document.createElement("li");
		tab.id = id; // important!
		tab.classList.add("component-pane","tab-pane","fade");

	//	document.getElementById("side-tab-panel").appendChild( tab );
	//	document.getElementById("side-tab-pills").appendChild( role );

		this[ name ] = {
			id: id,
			tab: tab,
			role: role,
			pill: pill,
			name: name,
		};

		return tab;

	};

	TabUI.append = function(){

		for ( var arg in arguments ){

			var name = arguments[ arg ];

			document.getElementById("side-tab-panel").appendChild( this[ name ].tab );
			document.getElementById("side-tab-pills").appendChild( this[ name ].role );

		}
	};

//	TODO.
//	TabUI.show = function(){};
//	TabUI.hide = function(){};
//	TabUI.remove = function(){};

})();

function createSidePanel(){

	var sidePanel = document.createElement("div");
	sidePanel.id = "side-panel";
	sidePanel.classList.add("side-panel", "pinned");
	sidePanel.style.cssText = "position:absolute;top:0;right:0;bottom:0;width:370px;background:rgba(255,255,255,0.9);"
		+ " -webkit-transform:translateX(0px); -webkit-transition:-webkit-transform 500ms ease-out; z-index:9999;";

	var container = document.createElement("div");
	container.id = "side-panel-content";
	container.style.cssText = "position:absolute;top:20px;left:40px;bottom:20px;right:20px;overflow-x:hidden;";

	var sidePillBar = document.createElement("div");
	sidePillBar.id = "side-pill-bar";
	sidePillBar.classList.add("side-holder");
	sidePillBar.style.cssText = "margin-bottom:20px;";
	container.appendChild( sidePillBar );

	var sideTabPills = document.createElement("ul");
	sideTabPills.id = "side-tab-pills";
	sideTabPills.classList.add("nav","nav-tabs","nav-pills");
	sideTabPills.style.cssText = "display:inline-flex!important;overflow-y:hidden;width:300px;scroll-behavior:smooth;";
	sidePillBar.appendChild( sideTabPills );

	var sideTabPanel = document.createElement("div");
	sideTabPanel.id = "side-tab-panel";
	sideTabPanel.classList.add("tab-content");
	container.appendChild( sideTabPanel );

	sidePanel.addEventListener( "mouseenter", function(){
		return; // debug!
		this.classList.toggle( "pinned", true );
		this.style["-webkit-transform"] = "translateX( 0 )";
	});

	sidePanel.addEventListener( "mouseleave", function(){
		return; // debug!
		this.classList.toggle( "pinned", false );
		this.style["-webkit-transform"] = "translateX( 340px )";
	});

	sidePanel.appendChild( container );
	
	return sidePanel;
}

function createLoadingBar(){

	var container = document.createElement("div");
	container.id = "loading-bar";
	container.classList.add("middle");

	var progress = document.createElement("div");
	progress.style.width = "250px";
	progress.style.height = "fit-content";
	progress.classList.add("progress");
	container.appendChild( progress );

	var bar = document.createElement("div");
	bar.style.width = "100%";
	bar.textContent = "Loading...";
	bar.setAttribute("role", "progressbar");
	bar.setAttribute("aria-valuemin", "0");
	bar.setAttribute("aria-valuemax", "100");
	bar.classList.add("progress-bar", "progress-bar-striped", "active");
	progress.appendChild( bar );

	return container;

}
