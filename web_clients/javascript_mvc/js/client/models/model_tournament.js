/***
	Tournament Model
	A representation of the server-side "tournament" object
***/
var ModelTournament = new JS.Class(Model,{
	'initialize': function() {
		'use strict';
		this.callSuper();

		this.tournament_id = null;
		this.images = [];
	},

	'startNewTournament': function( num_images, starting_image ) {
		'use strict';
		var request, params;

		params = {};
		params.num_images = num_images;
		if( starting_image !== undefined ) {
			params.starting_image_id = starting_image.image_id;
		}

		request = {
			'method': 'POST',
			'url': '/api/tournament.json',
			'params': params,
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

		this.tournament_id = data['tournament_id'];

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
