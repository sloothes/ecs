
//	tiny-ecs.js
//	TinyECS: A mean lean Entity-Component-System library.
//	https://github.com/bvalosek/tiny-ecs 

//	Entity.js
const Entity = (function(){

	//	Basic component-driven object with facade functions 
	//	for interacting with the injected EntityManager object.

	function Entity(){

		// Unique identifier.
		this.id = nextId++;

		//	Ref to the manager for this facade, injected right after being.
		this._manager = null;

		//	List of all the types of components on this entity.
		this._Components = [];

		//	All tags that this entity currently has.
		this._tags = [];
	}

	//	Re-init for pooling purposes.
	Entity.prototype.__init = function(){
		this.id                 = nextId++;
		this._manager           = null;
		this._Components.length = 0;
		this._tags.length       = 0;
	};

	var nextId = 0;

	Entity.prototype.addComponent = function(TComponent){
		//	param {Function} TComponent
		//	return {Entity} This entity.
		this._manager.entityAddComponent(this, TComponent);
		return this;
	};

	Entity.prototype.removeComponent = function(TComponent){
		//	param {Function} TComponent
		//	return {Entity} This entity.
		this._manager.entityRemoveComponent(this, TComponent);
		return this;
	};

	Entity.prototype.hasComponent = function(TComponent){
		//	param {Function} TComponent
		//	return {boolean} True if this entity has TComponent.
		return !!~this._Components.indexOf(TComponent);
	};

	//	Drop all components.
	Entity.prototype.removeAllComponents = function(){
		return this._manager.entityRemoveAllComponents(this);
	};

	Entity.prototype.hasAllComponents = function(Components){
		//	param {Array.<Function>} Components
		//	return {boolean} True if entity has all Components.
		var b = true;

		for (var i = 0; i < Components.length; i++) {
			var C = Components[i];
			b &= !!~this._Components.indexOf(C);
		}

		return b;
	};

	Entity.prototype.hasTag = function(tag){
		//	param {String} tag
		//	return {boolean} True if entity has tag.
		return !!~this._tags.indexOf(tag);
	};

	Entity.prototype.addTag = function(tag){
		//	param {String} tag
		//	return {Entity} This entity.
		this._manager.entityAddTag(this, tag);
		return this;
	};

	Entity.prototype.removeTag = function(tag){
		//	param {String} tag
		//	return {Entity} This entity.
		this._manager.entityRemoveTag(this, tag);
		return this;
	};

	//	Fire off an event on the messanger with this entity as the first parameter.
	Entity.prototype.trigger = function(eventName, option){
		//	param {String} eventName
		//	param {Object=} option
		this._manager.trigger(eventName, this, option);
	};

	//	Remove the entity.
	Entity.prototype.remove = function(){
		return this._manager.removeEntity(this);
	};

	return Entity;
})();

//	Event.js
const Event = (function(){

	function Event(name, callback){
		this._name     = name || 'name';
		this._callback = callback || null;

		// Additional filters
		this._Components = [];
		this._entity     = null;
	}

	Event.prototype.fire = function(eventName, entity, option){
		//	param {String} eventName
		//	param {{hasAllComponents:Function}} entity
		//	param {Object=} option
		//	return {Boolean} True if fired.
		// Name check
		if (eventName !== this._name)
			return false;

		// Component filters
		var Comps = this._Components;
		if (entity && entity.hasAllComponents && Comps.length) {
			if (!entity || !entity.hasAllComponents(Comps))
				return false;
		}

		// Entity filter
		if (this._entity !== null && this._entity !== entity) {
			return false;
		}

		// Made it
		this._callback(entity, option);
		return true;
	};

	Event.prototype.whereEntity = function(entity){
		//	param {Entity} entity The entity that the event has to match.
		//	return {Event} This object.
		if (this._entity)
			throw new Error('Cannot call whereEntity twice');
		this._entity = entity;
		return this;
	};

	Event.prototype.whereComponent = function(T){
		//	param {Function} T
		//	return {Event} This object.
		this._Components.push(T);
		return this;
	};

	Event.prototype.whereComponents = function(Components){
		//	param {Array.<Function>} Components
		//	return {Event} This object.
		this._Components = this._Components.concat(Components);
		return this;
	};

	return Event;
})();


//	Messager.js
const Messenger = (function( Event ){

	//	General event aggregation with 
	//	filtering on components or tags.

	function Messenger(){
		this._events = {};
		this.fired   = 0;
		this.handled = 0;
	}

	Messenger.prototype.listenTo = function(eventName, callback){
		//	param {String} eventName
		//	param {Function} callback
		//	return {Event}
		if (!this._events[eventName])
			this._events[eventName] = [];

		var event = new Event(eventName, callback);

		//	Dump and chump
		this._events[eventName].push(event);
		return event;
	};

	Messenger.prototype.trigger = function(eventName, entity, option){
		//	param {String} eventName
		//	param {Object=} entity
		//	param {Option=} option
		this.fired++;

		var events = this._events[eventName];
		if (!events) return;

		//	Try all events
		for (var n = 0; n < events.length; n++) {
			var event = events[n];
			if (event.fire(eventName, entity, option))
				this.handled++;
		}
	};

	//	Reset stats (should be done in the primary loop).
	Messenger.prototype.resetCounters = function(){
		this.fired = this.handled = 0;
	};

	return Messenger;
})( Event );


//	Loop.js
const Loop = (function( Messenger ){

	//	Game loop with independent clock events 
	//	for fixed durations and variable durations.

	function Loop(messenger){
		//	Messenger we'll use for clock signals
		//	param {Messenger} messenger
		this.messenger = messenger || new Messenger();

		this.fixedDuration = 8;
		this.started       = false;

		//	Live stats.
		this.currentTime        = 0;
		this.fixedStepsPerFrame = 0;
		this.fixedTimePerFrame  = 0;
		this.renderTimePerFrame = 0;
		this.frameTime          = 0;
	}

	//	Happens at a variable rate based on system (render loop)
	Loop.TICK = "Loop#TICK"; //	event

	//	Happens at a fixed length (simulation loop)
	Loop.FIXED_TICK = "Loop#FIXED_TICK"; //	event

	//	Fire.
	Loop.prototype.start = function(){
		if (this.started) return;

		//	Loop params and syncing.
		var lastTime  = 0;
		var simAcc    = 0;
		var simTime   = 0;
		var simStep   = this.fixedDuration;
		var messenger = this.messenger;
		var _this     = this;

		//	Stats.
		var simStart = 0;
		var renderStart = 0;
		var frameStart = 0;

		function loop(time) {
			global.requestAnimationFrame(loop);

			//	Log duration of each raf-fired frame.
			if (frameStart)
				_this.frameTime = global.performance.now() - frameStart;
			frameStart = global.performance.now();

			//	Determine what our delta is since last raf-frame.
			var dt = lastTime ? time - lastTime : 0;

			messenger.resetCounters();

			//	Dump as much time that has passed 
			//	into the simulator time accumulator.
			simAcc += dt;

			//	Continue to step the fixed loop until 
			//	we run out of time on the accumulator.
			_this.fixedStepsPerFrame = 0;
			simStart = global.performance.now();
			while (simAcc >= simStep) {
				messenger.trigger(Loop.FIXED_TICK, simStep, simTime);
				simTime += simStep;
				simAcc -= simStep;
				_this.fixedStepsPerFrame++;
			}
			_this.fixedTimePerFrame = global.performance.now() - simStart;
			_this.currentTime = simTime;

			//	Fire the variable step clock once.
			renderStart = global.performance.now();
			messenger.trigger(Loop.TICK, dt, time);
			_this.renderTimePerFrame = global.performance.now() - renderStart;
			lastTime = time;
		}

		//	BOOM.
		global.requestAnimationFrame(loop);
		this.started = true;
	};

	//	Convenience function for variable tick event.
	Loop.prototype.onTick = function(fn){
		//	param {Function} fn
		return this.messenger.listenTo(Loop.TICK, fn);
	};

	//	Convenience function for fixed tick event.
	Loop.prototype.onFixedTick = function(fn){
		//	param {Function} fn
		return this.messenger.listenTo(Loop.FIXED_TICK, fn);
	};

	return Loop;
})( Messenger );


//	ObjectPool.js
const ObjectPool = (function(){

	//	Minimize garbage collector thrashing by re-using existing objects 
	//	instead of creating new ones. Requires manually lifecycle management.

	function ObjectPool(T){
		//	param {Function} T
		this.freeList = [];
		this.count    = 0;
		this.T        = T;
	}

	//	Get a pooled object
	ObjectPool.prototype.aquire = function(){
		//	Grow the list by 20%ish if we're out.
		if (this.freeList.length <= 0) {
			this.expand(Math.round(this.count*0.2) + 1);
		}

		var item = this.freeList.pop();

		//	We can provide explicit initing, 
		//	otherwise re-call constructor (hackish).
		if (item.__init)
			item.__init();
		else
			this.T.call(item);

		return item;
	};

	//	Return an object back to the pool.
	ObjectPool.prototype.release = function(item){
		this.freeList.push(item);
	};

	ObjectPool.prototype.expand = function(count){
		//	param {Number} Amount of new objects to allocate for this pool.
		for (var n = 0; n < count; n++)
			this.freeList.push(new this.T());
		this.count += count;
	};

	ObjectPool.prototype.totalSize = function(){
		//	return {Number} Total amount of allocated objects (available and in-use).
		return this.count;
	};

	ObjectPool.prototype.totalFree = function(){
		//	return {Number} Total number of objects currently available.
		return this.freeList.length;
	};

	ObjectPool.prototype.totalUsed = function(){
		//	return {Number} Total number of objects currently in-use.
		return this.count - this.freeList.length;
	};

	return ObjectPool;
})();


//	Vec2.js
const Vec2 = (function( ObjectPool ){

	//	2D Cartesian vector with built-in (optional) object pool.

	function Vec2(x, y){
		//	param {Number} x
		//	param {Number} y
		this.x = +x || 0.0;
		this.y = +y || 0.0;
	}

	//	Reset for pool.
	Vec2.prototype.__init = function(){
		this.clear();
	};

	//	Interal static object pool
	var pool = new ObjectPool(Vec2);

	//	Get a vector from the pool.
	Vec2.aquire = function(){
		//	return {Vec2}
		return pool.aquire();
	};

	//	Return a vector to the pool.
	Vec2.release = function(v){
		//	param {Vec2} v
		//	return {Number}
		if (v) pool.release(v);
		return pool.count - pool.freeList.length;
	};

	//	Reset this vector to (0,0).
	Vec2.prototype.clear = function(){
		//	return {Vec2} This vector.
		this.x = this.y = 0.0;
		return this;
	};

	//	Assign this vector the value of another.
	Vec2.prototype.assign = function(v){
		//	param {Vec2} v
		//	return {Vec2} This vector.
		this.x = v.x;
		this.y = v.y;
		return this;
	};

	//	Determine if this vector is equal to another.
	Vec2.prototype.equals = function(v){
		//	param {Vec2} v
		//	return {Boolean} True if vectors are equal.
		return this.x === v.x && this.y === v.y;
	};

	//	Set this vector to a set of coordinates.
	Vec2.prototype.set = function(x, y){
		//	param {Number} x
		//	param {Number} y
		//	return {Vec2} This vector.
		this.x = +x;
		this.y = +y;
		return this;
	};

	//	Limit this vector to a specific magnitude.
	Vec2.prototype.limit = function(size){
		//	param {Number} size
		//	return {Vec2} This vector.
		size = +size;
		if (!size)
			return this;
		else if (this.magnitude() > size)
			return this.normalize(size);
		else
			return this;
	};

	//	Normalize this vector.
	Vec2.prototype.normalize = function(m){
		//	param {Number=} m Length.
		//	return {Vec2} This vector.
		m = m || +1.0;
		var length = Math.sqrt(this.x * this.x + this.y * this.y);
		this.x = m * this.x / length;
		this.y = m * this.y / length;
		return this;
	};

	//	Project this vector onto another.
	Vec2.prototype.project = function(v){
		//	param {Vec2} v
		//	return {Vec2} This vector.
		var m = v.dot(this) / v.magnitude2();
		this.assign(v).smult(m);
		return this;
	};

	//	Make this vector perpandicular.
	Vec2.prototype.perp = function(){
		//	return {Vec2} This vector.
		var x  = this.x;
		this.x = -this.y;
		this.y = x;
		return this;
	};

	//	Left-hand perpandicular.
	Vec2.prototype.lperp = function(){
		var x  = this.x;
		this.x = this.y;
		this.y = -x;
		return this;
	};

	//	Subtract some vector from this one.
	Vec2.prototype.sub = function(v){
		//	param {Vec2} v
		//	return {Vec2} This vector.
		this.x -= v.x;
		this.y -= v.y;
		return this;
	};

	//	Add some vector to this one.
	Vec2.prototype.add = function(v){
		//	param {Vec2} v
		//	return {Vec2} This vector.
		this.x += v.x;
		this.y += v.y;
		return this;
	};

	//	Scalar multiply this vector by a value.
	Vec2.prototype.smult = function(n){
		//	param {Number} n
		//	return {Vec2} This vector.
		n = +n;
		this.x *= n;
		this.y *= n;
		return this;
	};

	//	Rotate this vector clockwise about the origin by a certain angle.
	Vec2.prototype.rotate = function(theta){
		//	param {Number} theta
		//	return {Vec2} This vector.
		return this.set(
			this.x * Math.cos(theta) - this.y * Math.sin(theta),
			this.x * Math.sin(theta) + this.y * Math.cos(theta)
		);
	};

	//	Get the dot product of this vector and another.
	Vec2.prototype.dot = function(v){
		//	param {Vec2} v
		//	return {Number}
		return +(this.x * v.x + this.y * v.y);
	};

	//	Get the determinate of this vector and another.
	Vec2.prototype.det = function(v){
		//	param {Vec2} v
		//	return {Number}
		return +(this.x * v.y - this.y * v.x);
	};

	//	Get the magnitude of this vector.
	Vec2.prototype.magnitude = function(){
		//	return {Number}
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	//	Get the squared magnitude of this vector.
	Vec2.prototype.magnitude2 = function(){
		//	return {Number}
		return this.x * this.x + this.y * this.y;
	};

	var _vTemp = new Vec2();

	//	Distance between two vectors.
	Vec2.prototype.distance = function(v){
		//	param {Vec2} v
		//	return {Number}
		_vTemp.assign(this).sub(v);
		return _vTemp.magnitude();
	};

	//	Distance squared between two vectors.
	Vec2.prototype.distance2 = function(v){
		//	param {Vec2} v
		//	return {Number}
		_vTemp.assign(this).sub(v);
		return _vTemp.magnitude2();
	};

	//	Get the angle of this vector.
	Vec2.prototype.angle = function(){
		//	return {Number}
		return Math.atan2(this.y, this.x);
	};

	//	Get the angle between this vector and another.
	Vec2.prototype.angleBetween = function(v){
		//	param {Vec2} v
		//	return {Number}
		return Math.atan2(this.det(v), this.dot(v));
	};

	//	Make a pooled copy of this vector
	Vec2.prototype.pcopy = function(){
		//	return {Vec2} A new vector.
		return Vec2.aquire().assign(this);
	};

	//	Make a copy of this vector.
	Vec2.prototype.copy = function(){
		//	return {Vec2} A new vector.
		return new Vec2().assign(this);
	};

	//	Create a vector with a specific angle and magnitude.
	Vec2.fromAngle = function(theta, m){
		//	param {Number} theta
		//	param {Number=} m
		//	return {Vec2} A new vector.
		m = +m || 1.0;
		return new Vec2(Math.cos(theta) * m, Math.sin(theta) * m);
	};

	//	Create a pooled vector with a specific angle and magnitude.
	Vec2.pfromAngle = function(theta, m){
		//	param {Number} theta
		//	param {Number} m
		//	return {Vec2} A new vector.
		m = +m || 1.0;
		return Vec2.aquire().set(
			Math.cos(theta) * m,
			Math.sin(theta) * m
		);
	};

	//	Determine if two rectangles, defined by 
	Vec2.rectIntersect = function(p1, r1, p2, r2){
		//	param {Vec2} p1 Position of rectangle 1
		//	param {Vec2} r1 Halfwidths of rectangle 1
		//	param {Vec2} p2 Position of rectangle 2
		//	param {Vec2} r2 Halfwidths of rectangle 2
		//	return {Boolean} True if they intersect

		//	Basically, rectangles dont intersect if one's bottom is higher 
		//	than ones top, ones left is more left than ones right, etc
		//	a position and a halfwidth vector, overlap.

		var a = p1.x + r1.x < p2.x - r2.x;
		var b = p1.x - r1.x > p2.x + r2.x;
		var c = p1.y + r1.y < p2.y - r2.y;
		var d = p1.y - r1.y > p2.y + r2.y;

		//	We want if they do.
		return !(a || b || c || d);
	};

	//	Determine if two circles, determined by a position and radius, overlap.
	Vec2.circleIntersect = function(p1, r1, p2, r2){
		//	param {Vec2} p1
		//	param {Number} r1
		//	param {Vec2} p2
		//	param {Number} r2
		var minDist2 = (r1 + r2) * (r1+ r2);
		return p1.distance2(p2) <= minDist2;
	};

	//	Determines if rectangle 1 is entirely inside of rectangle 2.
	Vec2.rectContains = function(p1, r1, p2, r2){
		//	param {Vec2} p1 Position of rectangle 1
		//	param {Vec2} r1 Halfwidths of rectangle 1
		//	param {Vec2} p2 Position of rectangle 2
		//	param {Vec2} r2 Halfwidths of rectangle 2
		//	return {Boolean} True if they rectangle 1 is inside of rectangle 2
		if (p1.x - r1.x < p2.x - r2.x) return false;
		if (p1.x + r1.x > p2.x + r2.x) return false;
		if (p1.y - r1.y < p2.y - r2.y) return false;
		if (p1.y + r1.y > p2.y + r2.y) return false;

		return true;
	};

	//	Convert a rectangle specified by top-left  
	//	point + size into center location + halfwidths.
	Vec2.sizeToHwidth = function(position, size, outPosition, outHwidth){
		//	param {Vec2} position
		//	param {Vec2} size
		//	param {Vec2} outPosition Output position
		//	param {Vec2} outHwidth Output hwidths
		outHwidth.assign(size).smult(0.5);
		outPosition.assign(position).add(outHwidth);
	};

	//	Output this vector.
	Vec2.prototype.toString = function(){
		return "" + (this.x.toFixed(2)) + "," + (this.y.toFixed(2));
	};

	return Vec2;
})( ObjectPool );


//	Transform.js

const Transform = (function( Vec2 ){

	//	Basic transform component.

	function Transform(){
		this.position = new Vec2();

		//	cached.
		this._absPosition = new Vec2();

		this.__init();
	}

	//	Reset for pool.
	Transform.prototype.__init = function(){
		this.position.clear();
		this._absPosition.clear();

		this.rotation = 0;
		this.scale    = 1;
		this.parent   = null;
	};

	//	Absolute world position.
	Transform.prototype.absPosition = function(){
		//	return {Vec2}
		var position = this._absPosition.assign(this.position);

		//	Trivial case, no parent.
		if (!this.parent) {
			return position;
		}

		var parent = this.parent;

		position

		//	Rotate our angle by parent's angle.
			.rotate(parent.absRotation())

		//	Scale by parents scale.
			.smult(parent.absScale())

		//	Add parent's position.
			.add(parent.absPosition());

		return position;
	};

	//	The absolute world rotation of this component.
	Transform.prototype.absRotation = function(){
		//	return {Number}

		//	Trivial case.
		if (!this.parent)
			return this.rotation;

		//	This + parent.
		var r = this.rotation + this.parent.absRotation();

		return r % (Math.PI*2);
	};

	//	The absolute world scale of this component.
	Transform.prototype.absScale = function(){
		//	return {Number}

		//	Trivial case.
		if (!this.parent) {
			return this.scale;
		}

		//	This + parent.
		return this.scale * this.parent.absScale();
	};

	return Transform;
})( Vec2 );


//	EntityManager.js
const EntityManager = (function( Entity, ObjectPool, Messenger, Transform ){

	//	Manage, create, and destroy entities. Can use methods to mutate 
	//	entities (tags, components) directly or via the facade on the Entity.

	function EntityManager(messenger){
		//	param {Messenger} messenger

		//	Event messenger, injected.
		//	type {Messenger}
		this.messenger = messenger;

		//	Map of tags to the list of their entities.
		this._tags = {};

		//	type {Array.<Entity>}
		this._entities = [];

		//	type {Array.<Group>}
		this._groups = {};

		//	Pool entities.
		this._entityPool = new ObjectPool(Entity);

		//	Map of component names to their respective object pools.
		this._componentPools = {};
	}

	//	Fired AFTER an entity has be created.
	EntityManager.ENTITY_CREATED = "EntityManager#ENTITY_CREATED"; // event.

	//	Fired BEFORE an entity has been removed.
	EntityManager.ENTITY_REMOVE = "EntityManager#ENTITY_REMOVE"; // event.

	//	Fired AFTER a component has been removed.
	EntityManager.COMPONENT_ADDED = "EntityManager#COMPONENT_ADDED"; // event.

	//	Fired BEFORE a component has been removed.
	EntityManager.COMPONENT_REMOVE = "EntityManager#COMPONENT_REMOVE"; // event.

	//	Used for indexing our component groups.
	function Group(Components, entities){
		//	constructor
		//	param {Array.<Function>} Components
		//	param {Array<Entity>} entities
		this.Components = Components || [];
		this.entities = entities || [];
	}

	//	Get a new entity.
	EntityManager.prototype.createEntity = function(){
		//	return {Entity}
		var entity = this._entityPool.aquire();

		this._entities.push(entity);
		entity._manager = this;
		this._trigger(EntityManager.ENTITY_CREATED, entity);
		return entity;
	};

	//	Create a new entity with a Transform automatically attached.
	EntityManager.prototype.create = function(){
		//	return {Entity}
		return this.createEntity().addComponent(Transform);
	};

	//	Cleanly remove entities based on tag. Avoids loop issues.
	EntityManager.prototype.removeEntitiesByTag = function(tag){
		//	param {String} tag
		var entities = this._tags[tag];

		if (!entities) return;

		for (var x = entities.length - 1; x >= 0; x--) {
			var entity = entities[x];
			entity.remove();
		}
	};

	//	Dump all entities out of the manager. Avoids loop issues.
	EntityManager.prototype.removeAllEntities = function(){
		for (var x = this._entities.length - 1; x >= 0; x--) {
			this._entities[x].remove();
		}
	};

	//	Drop an entity. Returns it to the pool 
	//	and fires all events for removing components as well.
	EntityManager.prototype.removeEntity = function(entity){
		//	param {Entity} entity
		var index = this._entities.indexOf(entity);

		if (!~index) 
			throw new Error('Tried to remove entity not in list');

		this.entityRemoveAllComponents(entity);

		//	Remove from entity list.
		this._trigger(EntityManager.ENTITY_REMOVE, entity);
		this._entities.splice(index, 1);

		//	Remove entity from any tag groups and clear the on-entity ref.
		entity._tags.length = 0;
		for (var tag in this._tags) {
			var entities = this._tags[tag];
			var n = entities.indexOf(entity);
			if (~n) entities.splice(n, 1);
		}

		//	Prevent any acecss and free.
		entity._manager = null;
		this._entityPool.release(entity);
	};

	EntityManager.prototype.entityAddTag = function(entity, tag){
		//	param {Entity} entity
		//	param {String} tag
		var entities = this._tags[tag];

		if (!entities) entities = this._tags[tag] = [];

		//	Don't add if already there.
		if (~entities.indexOf(entity)) return;

		//	Add to our tag index AND the list on the entity.
		entities.push(entity);
		entity._tags.push(tag);
	};

	EntityManager.prototype.entityRemoveTag = function(entity, tag){
		//	param {Entity} entity
		//	param {String} tag
		var entities = this._tags[tag];
		if (!entities) return;

		var index = entities.indexOf(entity);
		if (!~index) return;

		//	Remove from our index AND the list on the entity.
		entities.splice(index, 1);
		entity._tags.splice(entity._tags.indexOf(tag), 1);
	};

	EntityManager.prototype.entityAddComponent = function(entity, Component){
		//	param {Entity} entity
		//	param {Function} Component

		if (~entity._Components.indexOf(Component)) return;

		entity._Components.push(Component);

		//	Create the reference on the entity to this (aquired) component.
		var cName = componentPropertyName(Component);
		var cPool = this._componentPools[cName];
		if (!cPool) cPool = this._componentPools[cName] = new ObjectPool(Component);
		var component = cPool.aquire();
		entity[cName] = component;

		//	Check each indexed group to see if we need to add this entity to the list.
		for (var groupName in this._groups) {
			var group = this._groups[groupName];

			//	Only add this entity to a group index if this component is in the group,
			//	this entity has all the components of the group, and its not already in
			//	the index.
			if (!~group.Components.indexOf(Component))
				continue;
			if (!entity.hasAllComponents(group.Components))
				continue;
			if (~group.entities.indexOf(entity))
				continue;

			group.entities.push(entity);
		}

		this._trigger(EntityManager.COMPONENT_ADDED, entity, Component);
	};

	//	Drop all components on an entity. Avoids loop issues.
	EntityManager.prototype.entityRemoveAllComponents = function(entity){
		//	param {Entity} entity
		var Cs = entity._Components;

		for (var j = Cs.length - 1; j >= 0; j--) {
			var C = Cs[j];
			entity.removeComponent(C);
		}
	};

	EntityManager.prototype.entityRemoveComponent = function(entity, Component){
		//	param {Entity} entity
		//	param {Function} Component
		var index = entity._Components.indexOf(Component);
		if (!~index) return;

		this._trigger(EntityManager.COMPONENT_REMOVE, entity, Component);

		//	Check each indexed group to see if we need to remove it.
		for (var groupName in this._groups) {
			var group = this._groups[groupName];

			if (!~group.Components.indexOf(Component))
				continue;
			if (!entity.hasAllComponents(group.Components))
				continue;

			var loc = group.entities.indexOf(entity);
			if (~loc) {
				group.entities.splice(loc, 1);
			}
		}

		//	Remove T listing on entity and property ref, then free the component.
		var propName = componentPropertyName(Component);
		entity._Components.splice(index, 1);
		var component = entity[propName];
		delete entity[propName];
		this._componentPools[propName].release(component);
	};

	//	Get a list of entities that have a certain set of components.
	EntityManager.prototype.queryComponents = function(Components){
		//	param {Array.<Function>} Components
		//	return {Array.<Entity>}
		var group = this._groups[groupKey(Components)];

		if (!group) {
			group = this._indexGroup(Components);
		}

		return group.entities;
	};

	//	Get a list of entities that all have a certain tag.
	EntityManager.prototype.queryTag = function(tag){
		//	param {String} tag
		//	return {Array.<Entity>}
		var entities = this._tags[tag];

		if (entities === undefined)
			entities = this._tags[tag] = [];

		return entities;
	};

	EntityManager.prototype.count = function(){
		//	return {Number} Total number of entities.
		return this._entities.length;
	};

	//	Get information about the object pools of the entities and the 
	//	various components. NOT optimized or garbage collector friendly.
	EntityManager.prototype.poolStats = function(){
		//	return {Object}
		var stats = {};
		var e = this._entityPool;
		stats.entity = {
			used: this._entityPool.totalUsed(),
			size: this._entityPool.count
		};

		for (var cName in this._componentPools) {
			var pool = this._componentPools[cName];
			stats[cName] = {
				used: pool.totalUsed(),
				size: pool.count
			};
		}

		return stats;
	};

	//	Create an index of entities with a set of components.
	EntityManager.prototype._indexGroup = function(Components){
		//	param {Array.<Function>} Components
		var key = groupKey(Components);

		if (this._groups[key]) return;

		var group = this._groups[key] = new Group(Components);

		for (var n = 0; n < this._entities.length; n++) {
			var entity = this._entities[n];
			if (entity.hasAllComponents(Components)) {
				group.entities.push(entity);
			}
		}

		return group;
	};

	//	Trigger the messenger if we have one.
	EntityManager.prototype._trigger = function(event, a, b){
		//	param {String} event
		//	param {Object=} a
		//	param {Object=} b
		if (this.messenger)
			this.messenger.trigger(event, a, b);
	};

	function componentPropertyName(Component){
		//	param {Function} Component
		//	return {String}
		var name = getName(Component);
		return name.charAt(0).toLowerCase() + name.slice(1);
	}

	function groupKey(Components){
		//	param {Array.<Function>} Components
		//	return {String}
		var names = [];
		for (var n = 0; n < Components.length; n++) {
			var T = Components[n];
			names.push(getName(T));
		}

		return names
			.map(function(x) { return x.toLowerCase(); })
			.sort()
			.join('-');
	}

	//	Get the name of a function (e.g. constructor).
	function getName(f){
		//	param {Function} f
		//	return {String} The function name.
		var FUNCTION_NAME = /function\s+([^\s(]+)/;

		var name = "";

		if (f instanceof Function) {
			if (f.name) {
				return f.name;
			}

			var match = f.toString().match(FUNCTION_NAME);

			if (match) {
				name = match[1];
			}
		} else if (f && f.constructor instanceof Function) {
			name = getName(f.constructor);
		}

		return name;
	}

	return EntityManager;
})( Entity, ObjectPool, Messenger, Transform );
