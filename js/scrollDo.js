var scrollDoDefaults = {
	start: {
		whenElement: 'top', // top, middle, bottom (of the element)
		is: 0, // 300, 300px, 0.3vw support
		fromViewport: 'top' // top, middle, bottom of the viewport
	},
	end: {
		whenElement: 'bottom', // top, middle, bottom (of the element)
		is: 0,
		fromViewport: 'top' // top, middle, bottom of the viewport
	},
	animated: '.animated-element',
	observed: '.observed-element',
	properties: {
		top: {
			pref: '',
			from: 100,
			to: 900,
			suff: 'px'
		}
	},
	'debug': false
};

var ScrollDo = function(opts) {
	opts = opts || {};

	this.initOpts 	= $.extend(true, {}, scrollDoDefaults, opts);
	this.opts 		= $.extend(true, {}, scrollDoDefaults, opts);
	this.$win 		= $(window);
	this.winO 		= this.$win.scrollTop();
	this.winH 		= this.$win.height();
	this.winW 		= this.$win.width();
	this.progress 	= 0;
	this.startPoint	= null;
	this.endPoint 	= null;
	this.path 		= null;
	this.$animated 	= null;
	this.$observed 	= null;
	this.debugger 	= null;
}

ScrollDo.prototype.init = function(/*optionalParam*/) {
	var _this = this;

	// cache jQ elements
	_this.$animated 	= $(_this.opts.animated);
	_this.$observed 	= $(_this.opts.observed);

	_this.opts.start.is = _this.parseOffset(_this.initOpts.start.is);
	_this.opts.end.is 	= _this.parseOffset(_this.initOpts.end.is);

	// calculate the animation "path"
	_this.startPoint 	= _this.getElementBreakpoint(_this.opts.start);
	_this.endPoint 		= _this.getElementBreakpoint(_this.opts.end);
	_this.path 			= _this.endPoint - _this.startPoint;

	// prepare debug container
	if ( this.opts.debug ) {
		var $currentDebugger = $('#debug');

		_this.debugger = $currentDebugger.length ? $currentDebugger : $('<div id="debug" />').appendTo('body');
	}

	// attach handlers
	_this.$win.on('scroll', function(){
		_this.handleScroll();

	});
	_this.$win.on('resize orientationchange', function(){
		_this.handleResize();
	});
}

ScrollDo.prototype.handleScroll = function() {
	var _this 	= this;
	var cssData = {};

	_this.winO 		= _this.$win.scrollTop();

	// 0	if the start breakpoint is not yet reached
	// 0-1 	if the the position is between the two breakpoints
	// 1 	if the end breakpoint is passed
	_this.progress 	= Math.min( Math.max( (_this.winO - _this.startPoint) / _this.path, 0), 1 );

	// build css 
	Object.keys(_this.opts.properties).forEach(function(propKey) {
		cssData[propKey] = _this.getValueString(_this.opts.properties[propKey], _this.progress);
	});

	// set css
	_this.$animated.css(cssData);

	if ( _this.opts.debug ) {

		_this.updateDebugger(cssData);
	}
}

ScrollDo.prototype.handleResize = function() {
	var _this 			= this;

	// update vars
	_this.winH 			= _this.$win.height();
	_this.winW 			= _this.$win.width();

	// recalculate path
	_this.opts.start.is = _this.parseOffset(_this.initOpts.start.is);
	_this.opts.end.is 	= _this.parseOffset(_this.initOpts.end.is);

	_this.startPoint	= _this.getElementBreakpoint(_this.opts.start);
	_this.endPoint 		= _this.getElementBreakpoint(_this.opts.end);
	_this.path 			= _this.endPoint - _this.startPoint;

	_this.handleScroll();
}

ScrollDo.prototype.parseOffset = function(value) {
	var _this 	= this;
	var out 	= parseInt(value, 10);

	if ( typeof value === 'string' ) {
		out = parseInt(value, 10);

		if ( value.indexOf('vw') > -1 ) {
			out *= (_this.winW / 100);

		} else if ( value.indexOf('vh') > -1 ) {
			out *= (_this.winH / 100);

		}
	}	

	out = isNaN(out) ? 0 : Math.round(out);

	return out;
}

ScrollDo.prototype.getElementBreakpoint = function(state /* start or end */) {
	var _this 	= this;
	var bp 		= _this.$observed.offset().top - state.is;
	var elemH 	= _this.$observed.outerHeight();

	if (state.whenElement == 'bottom') {
		bp += elemH;

	} else if (state.whenElement == 'middle') {
		bp += (elemH / 2); 

	}

	if (state.fromViewport == 'bottom') {
		bp -= _this.winH;

	} else if (state.fromViewport == 'middle') {
		bp -= (_this.winH / 2);

	}

	return bp;
}

ScrollDo.prototype.getValueString = function(prop, pct) {
	var path = prop.to - prop.from;

	return prop.pref + (prop.from + path * pct) + prop.suff;
}


ScrollDo.prototype.updateDebugger = function(cssData) {
	var _this = this;

	_this.debugger.text( 
		JSON.stringify({
			path: _this.path,
			progress: _this.progress,
			startPoint: _this.startPoint,
			endPoint: _this.endPoint,
			winO: _this.winO,
			css: cssData
		}, null, 2)
	);
}