# scrolldo
Scroll-tied animations for webpages



```

$('.animated-element').scrollDo({
	start: {
		whenElement: 'top' // top, middle, bottom, (of the element)
		is: 300, // 300, 300px, 30vw, 30vh, support
		fromViewport: 'top' // top, middle, bottom of the viewport
	},
	end: {
		whenElement: 'bottom' // top, middle, bottom (of the element)
		is: -300, // 300, 300px, 30vw, 30vh, support
		fromViewport: 'top' // top, middle, bottom of the viewport
	},
	animated: '.animated-element',
	observed: '.observed-element',
	properties: {
		top: {
			suff: 'px'
			keyframe: {
				"0": 100,
				"100": 900
			}
		},
		rotate: {
			from: 0,
			to: 360,
			suff: 'deg'
		}
	}
});
```

TODO:

* keyframe styles { 0:, 100: }
* include easing function for path calculation
* conditional execution - let user pass function returning Boolean - useful if the element should animate on mobile 