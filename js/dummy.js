
$('.animated-element').serve({
	start: {
		whenElement: 'top' // top, middle, bottom, 
		is: 300, // 300, 300px, 0.3vw support
		fromViewport: 'top' // top, middle, bottom of the viewport
	},
	end: {
		whenElement: 'bottom' // top, middle, bottom (of the element)
		is: -300,
		fromViewport: 'top' // top, middle, bottom of the viewport
	},
	animated: '.animated-element',
	observed: '.observed-element',
	properties: {
		top: {
			from: 100,
			to: 900,
			suff: 'px'
		},
		rotate: {
			from: 0,
			to: 360,
			suff: 'deg'
		}
	}

	// ketframe style ?
	// 0%
	// 60%
	// 100%
	// 
	// easing func !
	// 
	// conditional
});