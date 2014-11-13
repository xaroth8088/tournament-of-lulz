/***
 RPGSay View
 A fun way to show text
 ***/
define(['require', 'jsclass/min/core', 'client/base/view', 'velocity'], function (require) {
    'use strict';
    var View = require('client/base/view');

    return new JS.Class(View, {
        'initialize': function () {
            this.callSuper(['rpgsay_model']);
            this.timer = null;
            this.container.addClass('widget_rpgsay');
            this._last_speaker_on_left = true;
            this._running_script = false;
        },

        '_initTemplate': function () {
            this.callSuper();

            this.face = $('<div/>').addClass('face');
            this.container.append(this.face);

            this.text_box = $('<div/>').addClass('text_box');
            this.container.append(this.text_box);

            this._last_speaker = null;
            this._last_speaker_mood = null;
            this._last_speaker_on_left = true;

            // Hide it by default, so that appearing is always smooth
            this.container.hide();
        },

        '_draw': function () {
            if (this.models.rpgsay_model.script === null) {
                return;
            }

            clearTimeout(this.timer);
            this._initTemplate();

            this.container.show();

            // In theory, we're only redrawing when the model gets a new script, so kick things off
            this._setSpeakerImage();    // Set the initial speaker image, to reduce pop-in effect.

            // Set the initial side for the speaker
            this._last_speaker_on_left = this.models.rpgsay_model.speaker_on_left;

            this._animateContainer();
        },

        '_setSpeakerImage': function () {
            if (this._destroyed === true) {
                return;
            }

            if (this._last_speaker === this.models.rpgsay_model.speaker &&
                this._last_speaker_mood === this.models.rpgsay_model.mood &&
                this._last_speaker_on_left === this.models.rpgsay_model.speaker_on_left) {
                return;
            }

            this.container.removeClass();
            this.container.addClass("widget_rpgsay");
            this.face.removeClass();
            this.face.addClass("face");

            if (this.models.rpgsay_model.speaker !== null && this.models.rpgsay_model.mood) {
                this.container.addClass(this.models.rpgsay_model.speaker);
                this.face.addClass(this.models.rpgsay_model.mood);
            }
        },

        '_drawTextFrame': function () {
            var text_incomplete;

            if (this._destroyed === true) {
                return;
            }

            clearTimeout(this.timer);

            if (this.models.rpgsay_model.script === false ||
                this.models.rpgsay_model.script === null ||
                this.models.rpgsay_model.script === undefined) {
                return;
            }

            this._setSpeakerImage();

            this.text_box.text(this.models.rpgsay_model.getDisplayText());
            this.text_box.scrollTop(this.text_box.outerHeight());

            this._last_speaker = this.models.rpgsay_model.speaker;
            this._last_speaker_mood = this.models.rpgsay_model.mood;

            text_incomplete = this.models.rpgsay_model.advanceText();

            if (this._last_speaker_on_left === this.models.rpgsay_model.speaker_on_left) {
                // Normal text continues until end
                if (text_incomplete === true) {
                    this.timer = setTimeout($.proxy(this._drawTextFrame, this), this.models.rpgsay_model.text_speed);
                } else {
                    this.timer = setTimeout($.proxy(this._animateClose, this), this.models.rpgsay_model.autoclose_delay);
                }
            } else {
                // Speaker has changed sides
                // ( This will chain back into _drawTextFrame again )
                this.timer = setTimeout($.proxy(this._animateFaceSideChange, this), this.models.rpgsay_model.text_speed);
            }
        },

        '_animateFaceSideChange': function () {
            if (this._destroyed === true) {
                return;
            }

            this.text_box.text("");
            this._animateFaceOut();
        },

        '_animateFaceOut': function () {
            var x_offset;

            if (this._destroyed === true) {
                return;
            }

            x_offset = -this.face.outerWidth();

            this._last_speaker_on_left = this.models.rpgsay_model.speaker_on_left;

            $.Velocity.hook(this.face, "translateX", "0px");
            this.face.velocity({
                "translateX": x_offset + 'px'
            }, {
                "duration": this.models.rpgsay_model.face_appear_speed,
                "complete": $.proxy(this._animateFace, this)
            });
        },

        '_animateContainer': function () {
            if (this._destroyed === true) {
                return;
            }

            this.face.hide();

            $.Velocity.hook(this.container, "scaleX", 1);
            $.Velocity.hook(this.container, "scaleY", 0);
            $.Velocity.hook(this.container, "transformOriginX", "0px");
            $.Velocity.hook(this.container, "transformOriginY", "100%");

            this.container.velocity({
                "scaleX": 1,
                "scaleY": 1
            },{
                "duration": this.models.rpgsay_model.open_speed,
                "complete": $.proxy(this._animateFace, this)
            });
        },

        '_animateFace': function () {
            var x_offset;

            if (this._destroyed === true) {
                return;
            }

            this._setSpeakerImage();

            // Set the face direction and order
            // NOTE: The .hook() transforms has to happen here, because otherwise velocity
            // will override the 'transform' property when running the animations.
            if (this.models.rpgsay_model.speaker_on_left === false) {
                this.face.addClass("right");
                $.Velocity.hook(this.face, "scaleX", -1);
            } else {
                this.face.removeClass("right");
                $.Velocity.hook(this.face, "scaleX", 1);
            }

            this.face.show();
            this.face.outerHeight(this.face.parent().height());
            this.face.width(this.face.height());

            x_offset = -this.face.outerWidth();
            $.Velocity.hook(this.face, "translateX", x_offset + 'px' );
            this.face.velocity({
                "translateX": 0
            },{
                "duration": this.models.rpgsay_model.face_appear_speed
            }).velocity({
                "translateX": 0
            }, {
                "duration": this.models.rpgsay_model.pre_speech_delay,
                "complete": $.proxy(this._drawTextFrame, this)
            });
        },

        '_animateClose': function () {
            if (this._destroyed === true) {
                return;
            }

            // Clear out the text box
            this.text_box.text("");

            this.face.hide();
            this.text_box.empty();

            $.Velocity.hook(this.container, "scaleX", 1);
            $.Velocity.hook(this.container, "scaleY", 1);
            $.Velocity.hook(this.container, "transformOriginX", "0px");
            $.Velocity.hook(this.container, "transformOriginY", "100%");

            this.container.velocity({
                "scaleX": 1,
                "scaleY": 0
            }, {
                "duration": this.models.rpgsay_model.autoclose_speed
            });
        },

        'destroy': function () {
            clearTimeout(this.timer);
            this.callSuper();
        }
    });
});