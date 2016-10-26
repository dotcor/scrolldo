;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {

		var scrolldo = new ScrollDo({
			start: {
				whenElement: 'top',
				is: '30vh',
				fromViewport: 'top'
			},
			end: {
				whenElement: 'top',
				is: '-200vh',
				fromViewport: 'bottom'
			},
			animated: '.animated-element',
			observed: '.observed-element',
			properties: {
				transform: {
					pref: 'rotate(',
					from: 0,
					to: 360,
					suff: 'deg)'
				}
			},
			'debug': true
		}); 

		scrolldo.init();
	});
})(jQuery, window, document);
