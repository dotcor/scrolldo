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
	}
};

var ScrollDo = function(opts) {
	this.opts 		= opts ? $.extend(scrollDoDefaults, opts) : scrollDoDefaults;
	this.$win 		= $(window);
	this.winO 		= this.$win.scrollTop();
	this.winH 		= this.$win.height();
	this.progress 	= 0;
	this.startPoint	= null;
	this.endPoint 	= null;
	this.path 		= null;
	this.$animated 	= null;
	this.$observed 	= null;
}

ScrollDo.prototype.init = function(optionalParam) {
	var _this = this;

	_this.$animated 	= $(_this.opts.animated);
	_this.$observed 	= $(_this.opts.observed);
	_this.startPoint 	= _this.getElementBreakpoint(_this.opts.start);
	_this.endPoint 		= _this.getElementBreakpoint(_this.opts.end);
	_this.path 			= _this.endPoint - _this.startPoint;

	_this.$win.on('scroll', function(){
		_this.handleScroll();

	});
	_this.$win.on('resize orientationchange', function(){
		_this.handleResize();

		_this.debug();
	});
}

ScrollDo.prototype.handleScroll = function() {
	var _this 	= this;
	var cssData = {};

	_this.winO 	= _this.$win.scrollTop();
	_this.progress 	= Math.min(Math.max(  (_this.winO - _this.startPoint) / _this.path, 0), 1);

	Object.keys(_this.opts.properties).forEach(function(propKey) {
		cssData[propKey] = _this.getPropValue(_this.opts.properties[propKey], _this.progress);
	});

	_this.debug(cssData);
	_this.$animated.css(cssData);
}

ScrollDo.prototype.handleResize = function() {
	var _this 			= this;
	_this.winH 			= _this.$win.height();
	_this.startPoint	= _this.getElementBreakpoint(_this.opts.start);
	_this.endPoint 		= _this.getElementBreakpoint(_this.opts.end);
	_this.path 			= _this.endPoint - _this.startPoint;

	_this.handleScroll();
}

ScrollDo.prototype.getElementBreakpoint = function(state /* start or end */) {
	var _this 	= this;
	var bp 		= _this.$observed.offset().top + state.is;
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

ScrollDo.prototype.getPropValue = function(prop, pct) {
	var path = prop.to - prop.from;

	return prop.pref + (prop.from + path * pct) + prop.suff;
}


ScrollDo.prototype.debug = function(cssData) {
	var _this = this;

	$('#debug').text(JSON.stringify({
		path: _this.path,
		progress: _this.progress,
		startPoint: _this.startPoint,
		endPoint: _this.endPoint,
		winO: _this.winO,
		css: cssData
	},  null, 2));
}