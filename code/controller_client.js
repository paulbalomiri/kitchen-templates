this.CONTROLLER_NAME = RouteController.extend({
	template: "TEMPLATE_NAME",
	/*LAYOUT_TEMPLATE*/

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
	},

	action: function() {
		/*ACTION_FUNCTION*/
	},
	
	_onSubscribeCbs:{},
	/*
	 * You can add a subscription using this.CONTROLLER_NAME.onSubscribe 
	 * 2 ways to call this method
	 *
	 * The callback must return a single subscription handler or a list of them  (a subscription handler is the return value of Meteor.subscribe)
	 *  the callback is called using the route controller as `this` context and a `name` argument, which might be randomly generated on subscription.
	 *
	 * - `onSubscribe(cb)` or `onSubscribe(name,cb)` -> install the callback (name will be set to random if not suppied)
	 * - `onSubscribe(name)` -> remove any cb created for name
	 * 
	 * Meteor kitchen uses the name `'kitchen'` for it's `onSubscribe` registration. Replacing/removing that handler 
	 * prevents any subscription from the application JSON to be installed
	 *
	 *  @param [optional] name the name for this callback. If the name already has a callback assigned, 
	 *         that cb will be replaced. A random name will be picked if no name param is supplied
   *  @param cb the callback to be 
	 */
	onSubscribe:function(name, cb){
		if (_.isFunction(name)){
			cb=name;
			name=Random.id();
		} else if(name == null && cb ==null){
			throw new Error ('please supply at least one argument to CONTROLLER_NAME.onSubscribe');
		}
		if(cb==null){ // undefined== true
			delete this._onSubscribeCbs[name];
		} else {
			this._onSubscribeCbs[name]=cb;
		}
	},	

	isReady: function() {
		/*SUBSCRIPTION_PARAMS*/

		var subs = [];
		self= _.each(this._onSubscribeCbs , function(cb,name) {
			handlers = cb.call(this, name);
			if( _.isArray(handlers) ) {
				Array.prototype.push.apply(subs, handlers);
			}else{
				subs.push(handlers);
			}
		}, this);

		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		/*DATA_PARAMS*/

		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		/*AFTER_FUNCTION*/
	}
});
this.CONTROLLER_NAME.onSubscribe( 'kitchen', function() {
	return [/*SUBSCRIPTIONS*/];
});