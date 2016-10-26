;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {

		var scrolldo = new ScrollDo({
			start: {
				whenElement: 'middle',
				is: 0,
				fromViewport: 'middle'
			},
			end: {
				whenElement: 'bottom',
				is: 0,
				fromViewport: 'middle'
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
			}
		});

		scrolldo.init();
	});
})(jQuery, window, document);
