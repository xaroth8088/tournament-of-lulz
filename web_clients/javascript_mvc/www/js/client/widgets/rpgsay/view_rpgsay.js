/***
 RPGSay View
 A fun way to show text
 ***/
define(['require', 'jsclass/min/core', 'client/base/view'], function (require) {
    'use strict';
    var View = require('client/base/view');

    return new JS.Class(View, {
        'initialize': function () {
            this.callSuper(['rpgsay_model']);
            this.timer = null;
            this.container.addClass('widget_rpgsay');
            this.last_speaker_side = true;
            this._running_script = false;
        },

        '_initTemplate': function () {
            this.callSuper();

            this.face = $('<div/>').addClass('face');
            this.container.append(this.face);

            this.text_box = $('<div/>').addClass('text_box');
            this.container.append(this.text_box);

            // Hide it by default, so that appearing is always smooth
            this.container.hide();
        },

        '_draw': function () {
            if( this.models.rpgsay_model.script === null ) {
                return;
            }

            this.container.show();

            // In theory, we're only redrawing when the model gets a new script, so kick things off
            this._setSpeakerImage();    // Set the initial speaker image, to reduce pop-in effect.

            // Set the initial side for the speaker
            this.last_speaker_side = this.models.rpgsay_model.speaker_on_left;

            this._animateContainer();
        },

        '_setSpeakerImage': function() {
            if( this._destroyed === true ) {
                return;
            }

            this.container.removeClass();
            this.container.addClass("widget_rpgsay");
            this.face.removeClass();
            this.face.addClass("face");

            if( this.models.rpgsay_model.speaker_on_left === false ) {
                this.face.addClass("right");
                this.face.css({
                    "transform": "scaleX(-1)"
                });
            } else {
                this.face.css({
                    "transform": "scaleX(1)"
                });
            }

            if (this.models.rpgsay_model.speaker !== null && this.models.rpgsay_model.mood) {
                this.container.addClass(this.models.rpgsay_model.speaker);
                this.face.addClass(this.models.rpgsay_model.mood);
            }
        },

        '_drawTextFrame': function () {
            var text_incomplete;

            if( this._destroyed === true ) {
                return;
            }

            clearTimeout(this.timer);

            this._setSpeakerImage();

            this.text_box.text(this.models.rpgsay_model.getDisplayText());

            text_incomplete = this.models.rpgsay_model.advanceText();

            if( this.last_speaker_side === this.models.rpgsay_model.speaker_on_left ) {
                // Normal text continues until end
                if (text_incomplete === true) {
                    this.timer = setTimeout($.proxy(this._drawTextFrame, this), this.models.rpgsay_model.text_speed);
                } else {
                    this.timer = setTimeout($.proxy(this._animateClose, this), this.models.rpgsay_model.autoclose_delay);
                }
            } else {
                // Speaker has changed sides
                // ( This will chain back into _drawTextFrame again )
                setTimeout($.proxy( this._animateFaceSideChange, this), this.models.rpgsay_model.text_speed );
            }
        },

        '_animateFaceSideChange': function() {
            if( this._destroyed === true ) {
                return;
            }

            this.text_box.text("");
            this._animateFaceOut();
        },

        '_animateFaceOut': function() {
            var x_offset;

            if( this._destroyed === true ) {
                return;
            }

            x_offset = -this.face.outerWidth();

            this.last_speaker_side = this.models.rpgsay_model.speaker_on_left;

            this.face.css({
                x: 0
            }).transition({
                x: x_offset + 'px'
            }, this.models.rpgsay_model.face_appear_speed, $.proxy(this._animateFace, this));
        },

        '_animateContainer': function() {
            if( this._destroyed === true ) {
                return;
            }

            this.face.hide();
            this.container.css({
                scale: [1, 0],
                transformOrigin: '0px 100%'
            }).transition({
                scale: [1, 1]
            }, this.models.rpgsay_model.open_speed, $.proxy(this._animateFace, this));
        },

        '_animateFace': function() {
            var x_offset;

            if( this._destroyed === true ) {
                return;
            }

            this._setSpeakerImage();

            this.face.show();
            this.face.outerHeight(this.face.parent().height());
            this.face.width(this.face.height());

            x_offset = -this.face.outerWidth();

            this.face.css({
                x: x_offset + 'px'
            }).transition({
                x: 0
            }, this.models.rpgsay_model.face_appear_speed).transition({
                x: 0
            }, this.models.rpgsay_model.pre_speech_delay, $.proxy(this._drawTextFrame, this));
        },

        '_animateClose': function() {
            if( this._destroyed === true ) {
                return;
            }

            // Clear out the text box
            this.text_box.text("");

            this.face.hide();
            this.text_box.empty();
            this.container.css({
                scale: [1, 1]
            }).transition({
                scale: [1, 0],
                transformOrigin: '0px 100%'
            }, this.models.rpgsay_model.autoclose_speed);
        },

        'destroy': function () {
            clearTimeout(this.timer);
            this.callSuper();
        }
    });
});