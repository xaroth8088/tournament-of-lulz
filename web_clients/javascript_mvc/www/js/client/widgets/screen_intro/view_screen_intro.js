/***
 Intro Screen View
 Shows the top 10 images, and presents "start tournament" functionality
 ***/
define(['require',
    'jsclass/min/core',
    'client/base/view',
    'jquery.transit/jquery.transit',
    'client/widgets/rpgsay/widget_rpgsay'
], function (require) {
    'use strict';
    var View = require('client/base/view'),
        WidgetRPGSay = require('client/widgets/rpgsay/widget_rpgsay');

    return new JS.Class(View, {
        'initialize': function () {
            this.callSuper(['top_images_model']);
            this.timer = null;
            this.image_shown = 0;
        },

        '_initTemplate': function () {
            var script, rpgsay_model;

            this.callSuper();
            this.container.addClass('widget_screen_intro');

            this.container.html('<div class="background"></div>\
            <div class="title_container">\
                <div class="title_text">Tournament Of Lulz</div>\
            </div>\
            <div class="button_container">\
                <button class="start_tournament">Start Tournament</button>\
            </div>\
            <div class="announcer_container">\
                <div class="announcer"></div>\
            </div>\
            ');

            script = {
                "text": "01234567890123456789012345678901234567890123456789",
                "events": {
                    '0': {
                        'text_speed': 100,
                        'speaker_image': 'css/images/announcers/green_hair/green_hair-0-0.png',
                        'speaker_on_left': false
                    },
                    '10': {
                        'speaker_on_left': true,
                        'speaker_image': 'css/images/announcers/green_hair/green_hair-1-0.png'
                    },
                    '20': {
                        'speaker_on_left': false,
                        'speaker_image': 'css/images/announcers/green_hair/green_hair-0-1.png'
                    },
                    '23': {
                        'speaker_image': 'css/images/announcers/green_hair/green_hair-0-2.png'
                    },
                    '26': {
                        'speaker_image': 'css/images/announcers/green_hair/green_hair-0-3.png'
                    },
                    '30': {
                        'speaker_on_left': true,
                        'speaker_image': 'css/images/announcers/green_hair/green_hair-1-1.png'
                    },
                    '40': {
                        'speaker_on_left': false,
                        'speaker_image': 'css/images/announcers/green_hair/green_hair-0-2.png'
                    }
                }
            };

            rpgsay_model = new WidgetRPGSay.model(script);
            this.addSubwidget(new WidgetRPGSay.controller(
                this._controller,
                new WidgetRPGSay.view(),
                {
                    'rpgsay_model': rpgsay_model
                }
            ), this.container.find('.announcer'));

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
