/***
	Image View
	Show one of the game's "image" objects.
***/
var ViewImage = new JS.Class(View, {
	'initialize': function( controller ) {
		'use strict';
		this.callSuper( controller );

		this.image_model = null;
	},

	'start': function(controller, models) {
		'use strict';
		this.callSuper(controller, models);

		this.image_model = models[0];
		this._draw();
	},

	'_initTemplate': function() {
		'use strict';
		this.callSuper();

		this.container.addClass( 'image' );
	},

	'_draw': function() {
		'use strict';

		if( this.image_model === null ) {
			this.container.hide();
		}

		this.container.show();

		this.container.css({
			'background-image': "url('" + this.image_model.thumbnail_url + "')"
		});
	},

	'destroy': function() {
		'use strict';

		this.callSuper();
	}
});