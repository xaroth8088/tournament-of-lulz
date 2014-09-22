/***
 Intro Screen View
 Shows the top 10 images, and presents "start tournament" functionality
 ***/
define(['require', 'jsclass/min/core', 'client/base/view', 'client/widgets/image/widget_image', 'jquery.transit/jquery.transit'], function (require) {
    'use strict';
    var View = require('client/base/view'),
        WidgetImage = require('client/widgets/image/widget_image');

    return new JS.Class(View, {
        'initialize': function () {
            this.callSuper(['top_images_model']);
            this.timer = null
            this.image_shown = 0;
        },

        '_initTemplate': function () {
            this.callSuper();
            this.container.addClass('widget_screen_intro');

            this.container.append('<div class="background"></div>');
            this.container.append('<div class="title_text">Tournament Of Lulz</div>');
            this.container.append('<button class="start_tournament">Start Tournament</button>');

            this.container.find('button').click($.proxy(this._controller.onStartPressed, this._controller));
        },

        '_draw': function () {
            this.removeAllSubwidgets();

            this._nextTopImage();
            clearTimeout(this.timer);
            this.timer = setInterval($.proxy(this._nextTopImage, this), 5000);
        },

        '_nextTopImage': function() {
            var len;

            len = this.models.top_images_model.images.length;
            if( len === 0 ) {
                return;
            }

            this.container.find('.background').css({
                'background-image': "url(" + this.models.top_images_model.images[this.image_shown % len].image_url + ")"
            });

            this.image_shown++;
        },

        'destroy': function() {
            clearInterval(this.timer);
            this.callSuper();
        }
    });
});
