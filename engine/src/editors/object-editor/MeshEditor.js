//	TextureEditor.js

	function TextureEditor(){
		var texture = new THREE.Texture();
		Object.setPrototypeOf( texture, TextureEditor.prototype );
		return texture; // important!
	}

	TextureEditor.prototype = Object.create(THREE.Texture.prototype); // important!

	TextureEditor.prototype.copy = function( source ){ 
		THREE.Texture.prototype.copy.call( this, source ); // important!
		return this;
	};

	TextureEditor.prototype.reset = function(){ 
		this.copy( new THREE.Texture() ); 
		this.name = "texture editor";
		this.uuid = THREE.Math.generateUUID();
	};

	TextureEditor.prototype.parse = function( json ){
	//	param: a texture json {object}
	//	the missing TextureLoader.parse;

		var editor = this;

		for ( var key in json ) {
			switch ( key ){

				case "image":
					console.warn("case:",key,"TODO!"); // TODO!
				break;

				case "center":
				case "offset":
				case "repeat":
					editor[ key ].x = json[ key ][0];
					editor[ key ].y = json[ key ][1];
				break;

				case "wrap":
					editor.wrapS = json[ key ][0];
					editor.wrapT = json[ key ][1];
				break;

				default:
					editor[ key ] = json[ key ];
				break;
			}
		}

	};

	TextureEditor.prototype.update = function( value ){

	//	Copies the values of the target texture of textures
	//	entity manager. Does not updates the target texture.
	//	dependences: texture_entities {texture manager},
	//	param: a texture id {string or number},

		var editor = this;

	//	get target texture.
		var texture = getTextureByEntityId( value );
		var isEditing = !!texture; // boolean!

	//	update editor (copy).
		if ( texture ) {
			editor.copy( texture );
			editor.name = texture.name;
			editor.uuid = texture.uuid;
		}

	//	return boolean.
		console.log("editor isEditing:", isEditing);
		return isEditing; // boolean, important!

	};

	const textureEditor = new TextureEditor();


//	==================================================================================================  //


//	MaterialEditor.js

	function MaterialEditor(){
		var material = new THREE.MeshStandardMaterial();
		Object.setPrototypeOf( material, MaterialEditor.prototype );
		return material; // important!
	}

	MaterialEditor.prototype = Object.create(THREE.MeshStandardMaterial.prototype); // important!

	MaterialEditor.prototype.copy = function( source ){ 
		THREE[ source.type ].prototype.copy.call( this, source ); // important!
		return this;
	};

	MaterialEditor.prototype.reset = function(){ 

		var editor = this;

		var keys = "";
		keys += "color,emissive,specular,normalScale,displacementScale,";
		keys += "name,type,uuid,side,opacity,alphaTest,transparent,premultipliedAlpha,";
		keys += "fog,lights,visible,overdraw,dithering,precision,colorWrite,flatShading,vertexColors,";
		keys += "blending,blendSrc,blendDst,blendEquation,blendSrcAlpha,blendDstAlpha,blendEquationAlpha,";
		keys += "depthFunc,depthTest,depthWrite,shadowSide,clipShadows,clipIntersection,";
		keys += "polygonOffset,polygonOffsetUnits,polygonOffsetFactor,";
		keys += "map,aoMap,envMap,bumpMap,alphaMap,lightMap,normalMap,specularMap,";
		keys += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap,";
		keys += "metalness,roughness,bumpScale,reflectivity,";
		keys += "refractionRatio,displacementBias,normalMapType,";
		keys += "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,";
		keys += "wireframe,wireframeLinecap,wireframeLinejoin,wireframeLinewidth,";
		keys += "skinning,morphTargets,morphNormals,combine,shininess,";
		keys += "depthPacking,scale,gapSize,linecap,linejoin,linewidth,";
		keys += "dashSize,size,rotation,sizeAttenuation,needsUpdate";

		var source = new THREE.MeshStandardMaterial();

		keys.split(",").forEach(function( key ){
			switch ( key ){

				case "name":
					editor.name = "material editor";
				break;

				case "color":
					if ( editor[ key ] === undefined )
						editor[ key ] = new THREE.Color(1,1,1);
					else
						editor[ key ].setRGB(1,1,1);
				break;

				case "emissive":
				case "specular":
					if ( editor[ key ] === undefined )
						editor[ key ] = new THREE.Color(0,0,0);
					else
						editor[ key ].setRGB(0,0,0);
				break;

				case "normalScale":
					if ( editor[ key ] === undefined )
						editor[ key ] = new THREE.Vector2(1,1);
					else
						editor[ key ].set(1,1);
				break;

				case "clippingPlanes": {

					var srcPlanes = source.clippingPlanes,
						dstPlanes = null;

					if ( srcPlanes !== null ) {

						var n = srcPlanes.length;
						dstPlanes = new Array( n );

						for ( var i = 0; i !== n; ++ i )
							dstPlanes[ i ] = srcPlanes[ i ].clone();

					}

					editor.clippingPlanes = dstPlanes;

				} break;

				case "userData":
					editor.userData = JSON.parse( JSON.stringify( source.userData ) );
				break;

				default:
					editor[ key ] = source[ key ];
				break;

			}
		});

		return this;
	};

	MaterialEditor.prototype.parse = function( json ){

		var editor = this;

		var textures = json.textures;
		if ( textures !== undefined ) debugMode && console.log( "textures:", textures );

		function getTexture( name ) {
			if ( textures[ name ] === undefined ) console.warn( "MaterialEditor.parse: Undefined texture", name );
			return textures[ name ];
		}

	//	var material = new THREE[ json.type ]();

		if ( json.uuid !== undefined ) editor.uuid = json.uuid;
		if ( json.name !== undefined ) editor.name = json.name;
		if ( json.color !== undefined ) editor.color.setHex( json.color );
		if ( json.roughness !== undefined ) editor.roughness = json.roughness;
		if ( json.metalness !== undefined ) editor.metalness = json.metalness;
		if ( json.emissive !== undefined ) editor.emissive.setHex( json.emissive );
		if ( json.specular !== undefined ) editor.specular.setHex( json.specular );
		if ( json.shininess !== undefined ) editor.shininess = json.shininess;
		if ( json.clearCoat !== undefined ) editor.clearCoat = json.clearCoat;
		if ( json.clearCoatRoughness !== undefined ) editor.clearCoatRoughness = json.clearCoatRoughness;
		if ( json.vertexColors !== undefined ) editor.vertexColors = json.vertexColors;
		if ( json.fog !== undefined ) editor.fog = json.fog;
		if ( json.flatShading !== undefined ) editor.flatShading = json.flatShading;
		if ( json.blending !== undefined ) editor.blending = json.blending;
		if ( json.side !== undefined ) editor.side = json.side;
		if ( json.opacity !== undefined ) editor.opacity = json.opacity;
		if ( json.transparent !== undefined ) editor.transparent = json.transparent;
		if ( json.alphaTest !== undefined ) editor.alphaTest = json.alphaTest;
		if ( json.depthTest !== undefined ) editor.depthTest = json.depthTest;
		if ( json.depthWrite !== undefined ) editor.depthWrite = json.depthWrite;
		if ( json.colorWrite !== undefined ) editor.colorWrite = json.colorWrite;
		if ( json.wireframe !== undefined ) editor.wireframe = json.wireframe;
		if ( json.wireframeLinewidth !== undefined ) editor.wireframeLinewidth = json.wireframeLinewidth;
		if ( json.wireframeLinecap !== undefined ) editor.wireframeLinecap = json.wireframeLinecap;
		if ( json.wireframeLinejoin !== undefined ) editor.wireframeLinejoin = json.wireframeLinejoin;

		if ( json.rotation !== undefined ) editor.rotation = json.rotation;

		if ( json.scale !== undefined ) editor.scale = json.scale;
		if ( json.linewidth !== 1 ) editor.linewidth = json.linewidth;
		if ( json.gapSize !== undefined ) editor.gapSize = json.gapSize;
		if ( json.dashSize !== undefined ) editor.dashSize = json.dashSize;

		if ( json.polygonOffset !== undefined ) editor.polygonOffset = json.polygonOffset;
		if ( json.polygonOffsetUnits !== undefined ) editor.polygonOffsetUnits = json.polygonOffsetUnits;
		if ( json.polygonOffsetFactor !== undefined ) editor.polygonOffsetFactor = json.polygonOffsetFactor;

		if ( json.skinning !== undefined ) editor.skinning = json.skinning;
		if ( json.dithering !== undefined ) editor.dithering = json.dithering;
		if ( json.morphTargets !== undefined ) editor.morphTargets = json.morphTargets;

		if ( json.visible !== undefined ) editor.visible = json.visible;
		if ( json.userData !== undefined ) editor.userData = json.userData;

	//	Shader Material.
		if ( json.uniforms !== undefined ) {
			for ( var name in json.uniforms ) {
				var uniform = json.uniforms[ name ];
				editor.uniforms[ name ] = {};
				switch ( uniform.type ) {
					case 't':
						editor.uniforms[ name ].value = getTexture( uniform.value );
					break;
					case 'c':
						editor.uniforms[ name ].value = new Color().setHex( uniform.value );
					break;
					case 'v2':
						editor.uniforms[ name ].value = new Vector2().fromArray( uniform.value );
					break;
					case 'v3':
						editor.uniforms[ name ].value = new Vector3().fromArray( uniform.value );
					break;
					case 'v4':
						editor.uniforms[ name ].value = new Vector4().fromArray( uniform.value );
					break;
					case 'm4':
						editor.uniforms[ name ].value = new Matrix4().fromArray( uniform.value );
					break;
					default:
						editor.uniforms[ name ].value = uniform.value;
					break;
				}
			}
		}

		if ( json.defines !== undefined ) editor.defines = json.defines;
		if ( json.vertexShader !== undefined ) editor.vertexShader = json.vertexShader;
		if ( json.fragmentShader !== undefined ) editor.fragmentShader = json.fragmentShader;

	//	Deprecated.
		if ( json.shading !== undefined ) editor.flatShading = json.shading === 1; // THREE.FlatShading

	//	PointsMaterial.
		if ( json.size !== undefined ) editor.size = json.size;
		if ( json.sizeAttenuation !== undefined ) editor.sizeAttenuation = json.sizeAttenuation;

	//	Texture maps.
		if ( json.map !== undefined ) editor.map = getTexture( json.map );
		if ( json.alphaMap !== undefined ) { editor.alphaMap = getTexture( json.alphaMap ); editor.transparent = true; }
		if ( json.bumpMap !== undefined ) editor.bumpMap = getTexture( json.bumpMap );
		if ( json.bumpScale !== undefined ) editor.bumpScale = json.bumpScale;
		if ( json.normalMap !== undefined ) editor.normalMap = getTexture( json.normalMap );
		if ( json.normalMapType !== undefined ) editor.normalMapType = json.normalMapType;
		if ( json.normalScale !== undefined ) {
			var normalScale = json.normalScale;
			if ( Array.isArray( normalScale ) === false ) normalScale = [ normalScale, normalScale ];
			[ editor.normalScale.x, editor.normalScale.y ] = normalScale;
		}

		if ( json.emissiveMap !== undefined ) editor.emissiveMap = getTexture( json.emissiveMap );
		if ( json.emissiveIntensity !== undefined ) editor.emissiveIntensity = json.emissiveIntensity;
		if ( json.specularMap !== undefined ) editor.specularMap = getTexture( json.specularMap );
		if ( json.roughnessMap !== undefined ) editor.roughnessMap = getTexture( json.roughnessMap );
		if ( json.metalnessMap !== undefined ) editor.metalnessMap = getTexture( json.metalnessMap );
		if ( json.displacementMap !== undefined ) editor.displacementMap = getTexture( json.displacementMap );
		if ( json.displacementBias !== undefined ) editor.displacementBias = json.displacementBias;
		if ( json.displacementScale !== undefined ) editor.displacementScale = json.displacementScale;

		if ( json.reflectivity !== undefined ) editor.reflectivity = json.reflectivity;
		if ( json.lightMap !== undefined ) editor.lightMap = getTexture( json.lightMap );
		if ( json.lightMapIntensity !== undefined ) editor.lightMapIntensity = json.lightMapIntensity;

		if ( json.aoMap !== undefined ) editor.aoMap = getTexture( json.aoMap );
		if ( json.envMap !== undefined ) editor.envMap = getTexture( json.envMap );
		if ( json.aoMapIntensity !== undefined ) editor.aoMapIntensity = json.aoMapIntensity;
		if ( json.gradientMap !== undefined ) editor.gradientMap = getTexture( json.gradientMap );

		return this;
	};

	MaterialEditor.prototype.update = function( value ){

	//	Copies the values of the target material of material
	//	entity manager. Does not updates the target material.
	//	dependences: material_entities {material manager},
	//	param: a material id {string or number},

		var editor = this;

		editor.reset(); // important!

	//	get target material.
		var material = getMaterialByEntityId( value );
		var isEditing = !!material; // boolean!

	//	update editor (copy).
		if ( material ){
			editor.copy( material );
			editor.type = material.type;
			editor.uuid = material.uuid;
		}

	//	return true.
		console.log("editor isEditing:", isEditing);
		return isEditing; // boolean, important!

	};

	const materialEditor = new MaterialEditor();


//	==================================================================================================  //


//	MeshEditor.js

	function MeshEditor(){
		var material = materialEditor;
		material.map = textureEditor;
		var geometry = new THREE.PlaneGeometry( 252, 252, 1, 1 ); // .rotateX(-Math.PI/2); // geometryEditor??
		var editor = new THREE.Mesh( geometry, material );
		Object.setPrototypeOf( object, MeshEditor.prototype );
		return editor; // important!
	}

	MeshEditor.prototype = Object.create(THREE.Mesh.prototype); // important!

	MeshEditor.prototype.reset = function(){ 

		var editor = this;

	//	TextureEditor.
		textureEditor.reset();

	//	MaterialEditor.
		materialEditor.reset();
		materialEditor.map = textureEditor;

	//	textureEditor.needsUpdate = true; // important!
	//	materialEditor.needsUpdate = true; // important!

		editor.scale.set(1,1,1);
		editor.position.set(0,0,0);
		editor.rotation.set(0,0,0);
		editor.quaternion.set(0,0,0,1);
		editor.material = materialEditor;
		editor.material.needsUpdate = true; // important!
		editor.material.map.needsUpdate = true; // important!
		editor.name = "mesh editor";

	};

	MeshEditor.prototype.update = function( value ){ 

	//	Copies the values of the target mesh of
	//	scene. Does not updates the target mesh.
	//	dependences: entities {scene},
	//	param: a object3D id {string or number}.

		var editor = this;

	//	Reset editor.
		editor.reset();

	//	Get new object.
		var object = getObjectByEntityId( value ); 
		var isEditing = !!object; // boolean!

	//	Update editor (copy).
		object && editor.copy( object );
		object.material && editor.material.update(material.id)
		debugMode && console.log( editor );

	//	update material editor.
		if ( object && object.material ) {
			(function( material ){
				var id = String(material.id);
				materialEditor.update( id );
				var selector = "select#material-entities-droplist";
				try {document.querySelector(selector).value = id;} catch(err){;}
			})( object.material );
		}

	//	update texture editor.
		if ( object && object.material && object.material.map ) {
			(function( texture ){
				var id = String(texture.id);
				textureEditor.update( id );
				var selector = "select#texture-entities-droplist";
				try {document.querySelector(selector).value = id;} catch(err){;}
			})( object.material.map );
		}

	//	return boolean.
		console.log("editor isEditing:", isEditing);
		return isEditing; // boolean, important!

	};

	const meshEditor = new MeshEditor(); // THREE.Mesh.
	debugMode && console.log( "editor:", meshEditor );


//	==================================================================================================  //


//	EditorViewer.js
