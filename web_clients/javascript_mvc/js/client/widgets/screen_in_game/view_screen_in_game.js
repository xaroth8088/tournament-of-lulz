/***
	InGame Screen View
	Manages in-game state
***/
var ViewScreenInGame = new JS.Class(View, {
	'initialize': function( controller ) {
		'use strict';
		this.callSuper( controller );
	},

	'start': function(controller, models) {
		'use strict';
		this.callSuper(controller, models);
	},

	'_initTemplate': function() {
		'use strict';
		this.callSuper();

		this.container.append('\
			<div class="in-game">In Game</div>\
		');
	},

	'_draw': function() {
		'use strict';
	},

	'destroy': function() {
		'use strict';

		this.callSuper();
	}
});