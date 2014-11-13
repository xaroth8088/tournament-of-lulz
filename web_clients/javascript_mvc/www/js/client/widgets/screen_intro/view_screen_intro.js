/***
 Intro Screen View
 Shows the top 10 images, and presents "start tournament" functionality
 ***/
define(['require',
    'jsclass/min/core',
    'client/base/view',
    'client/widgets/rpgsay/widget_rpgsay'
], function (require) {
    'use strict';
    var View = require('client/base/view'),
        WidgetRPGSay = require('client/widgets/rpgsay/widget_rpgsay');

    return new JS.Class(View, {
        'initialize': function () {
            this.callSuper(['top_images_model', 'page_model', 'rpgsay_model']);
            this.timer = null;
            this.image_shown = 0;
        },

        '_initTemplate': function () {
            this.callSuper();
            this.container.addClass('widget_screen_intro');

            this.container.html('<div class="background"></div>\
            <div class="title_container">\
                <div class="title_text">Tournament Of Lulz</div>\
            </div>\
            <div class="button_container">\
                <button class="start_tournament">Start Tournament</button>\
            </div>\
            <div class="announcer_container"></div>\
            ');

            this.addSubwidget(new WidgetRPGSay.controller(
                this._controller,
                new WidgetRPGSay.view(),
                {
                    'rpgsay_model': this.models.rpgsay_model
                }
            ), this.container.find('.announcer_container'));

            this.container.find('button').click($.proxy(this._controller.onStartPressed, this._controller));
        },

        '_draw': function () {
            this._nextTopImage();
            clearTimeout(this.timer);
            this.timer = setInterval($.proxy(this._nextTopImage, this), 5000);
        },

        '_nextTopImage': function () {
            var len;

            len = this.models.top_images_model.images.length;
            if (len === 0) {
                return;
            }

            this.container.find('.background').css({
                'background-image': "url(" + this.models.top_images_model.images[this.image_shown % len].image_url + ")"
            });

            this.image_shown++;
        },

        'destroy': function () {
            clearInterval(this.timer);
            this.callSuper();
        }
    });
});
