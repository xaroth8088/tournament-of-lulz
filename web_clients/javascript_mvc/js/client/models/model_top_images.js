/***
	Top Images Model
	Keeps track of the "top images", as reported by the server
***/
var ModelTopImages = new JS.Class(Model,{
	'initialize': function() {
		'use strict';
		this.callSuper();

		this.images = [];
	},

	'loadFromServer': function( start, limit ) {
		'use strict';
		var request;

		request = {
			'url': '/api/top_images',
			'params': {
				'start': start,
				'limit': limit
			},
			'context': this,
			'success': this.onLoadComplete,
			'error': this.onLoadFailure
		};
		this.ajax(request);
	},

	'onLoadComplete': function(data) {
		'use strict';
		var i, len, images, image;

		// TODO: never trust your server.  Check for malformed response data.
		images = data['images'];
		for( i = 0, len = images.length; i < len; i++ ) {
			image = new ModelImage();
			image.loadFromObject(images[i]);
			this.images.push(image);
		}

		this.modelWasUpdated();
	},

	'onLoadFailure': function(jqxhr, text_status, error_thrown) {
		'use strict';

		console.log("Loading top images failed:" + text_status + " (" + error_thrown + ")" );
	}
});
