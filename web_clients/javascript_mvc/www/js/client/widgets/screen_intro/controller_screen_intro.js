/***
	Intro Screen Controller
	Responsible for handling the intro screen controls
***/
define([
    'require',
    'jsclass/min/core',
    'client/base/controller',
    'client/configuration',
    'client/widgets/rpgsay/widget_rpgsay',
    'jquery.fullscreen/jquery.fullscreen-0.4.1.min'
], function (require) {
	'use strict';
	var Controller = require('client/base/controller'),
		CONFIGURATION = require('client/configuration'),
        WidgetRPGSay = require('client/widgets/rpgsay/widget_rpgsay');
	
	return new JS.Class(Controller, {
		'initialize': function(parent_controller, view, models) {
			this.callSuper(parent_controller, view, models);
            this.talk_timer = null;
		},

		'start': function() {
			this.models.top_images_model.loadFromServer( 0, CONFIGURATION.INTRO_TOP_X_IMAGES_COUNT );
            this.models.rpgsay_model = new WidgetRPGSay.model();

            this.models.rpgsay_model.runScript(this.models.page_model.announcer.getWelcomeScript());

            clearInterval(this.talk_timer);
            this.talk_timer = setInterval($.proxy(this.onTalkTimerFired, this), 15000);

			this.callSuper();
		},

        'onTalkTimerFired': function() {
            this.models.rpgsay_model.runScript(this.models.page_model.announcer.getTitleScript(this.models.top_images_model));
        },

		'onStartPressed': function() {
            $('body').fullscreen();
			this.models.page_model.changeScreen( "IN_GAME" );
		},

        'destroy': function() {
            clearInterval(this.talk_timer);
            this.callSuper();
        }
	});
});