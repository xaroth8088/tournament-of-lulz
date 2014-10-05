/***
	RPGSay Model
	A fun way to show text

    Script format:
        * text (string) - The text to say.
        * events (object) - An object describing configuration at various times during the text.
                            The key is the character at which the configuration takes effect.  Note that
                                the configuration takes effect *before* the character is displayed.
                            The value is an event object (see below).

                            Most likely, you'll want to set an event for character 0 with your starting state.
        * open_speed (int) [200] - The time, in ms, taken to open the box initially.
        * face_appear_speed (int) [400] - The time, in ms, taken to show the character portrait initially.
        * autoclose_delay (int) [1250] - The delay, in ms, before the dialog box automatically dismisses itself.
        * autoclose_speed (int) [200] - The time, in ms, taken to close the box when done.


    Event object options:
        * speaker (string) [blank] - The character class to add.
        * mood (string) ["neutral"] - The character's mood.  Used as a CSS class to decide which image to show.
        * text_speed (int) [50] - The delay, in ms, between each character.  Can be used to effect a pause in the speech
                                  if given as a large number, followed by a normal value on the next character.
        * speaker_on_left (boolean) [true] - Whether the speaker image appears on the left or the right of the dialog.
                                             When this value switches, the text box will clear, permitting a
                                             conversation to happen between two parties.
        * pre_speech_delay (int) [250] - The delay, in ms, between when the face appears and when text begins to display.

***/
define(['require', 'jsclass/min/core', 'client/base/model'], function (require) {
	'use strict';
	var Model = require('client/base/model');

	return new JS.Class(Model,{
		'initialize': function() {
            this.callSuper();
            this._resetToDefaults();
        },

        '_resetToDefaults': function() {
            this.script = null;
            this.speaker = null;
            this.mood = "neutral";
            this.text_speed = 50;
            this.autoclose_delay = 1250;
            this.open_speed = 200;
            this.face_appear_speed = 400;
            this.autoclose_speed = 200;
            this.pre_speech_delay = 250;

            this.text_position = 0;
            this._text_start = 0;

            this.speaker_on_left = true;

            this._running_script = false;
        },

        'runScript': function(script) {
            if( this._running_script !== false ) {
                return; // Don't permit switching the script while a previous one is running.
            }

            if( script === false || script === null ) {
                return; // Don't do anything if given an empty script
            }

            this._resetToDefaults();
            this.script = script;

            if (script.autoclose_delay !== undefined) {
                this.autoclose_delay = script.autoclose_delay;
            }

            if (script.open_speed !== undefined) {
                this.open_speed = script.open_speed;
            }

            if (script.face_appear_speed !== undefined) {
                this.face_appear_speed = script.face_appear_speed;
            }

            if (script.autoclose_speed !== undefined) {
                this.autoclose_speed = script.autoclose_speed;
            }

            // Apply any event at position 0, so that initial state can be properly drawn
            this._applyEvents();

            this._running_script = true;

            this.modelWasUpdated();
		},

        /* Advances the state machine one character.
            Returns true if there's more text to display.
            Returns false if we're at the end and the auto-close timer should be triggered.
         */
        'advanceText': function() {
            this._applyEvents();

            this.text_position++;
            if( this.text_position > this.script.text.length ) {
                this._running_script = false;
                return false;
            }

            return true;
        },

        'getDisplayText': function() {
            return this.script.text.substr(this._text_start, this.text_position - this._text_start);
        },

        '_applyEvents': function() {
            var event;

            if( this.script.events === undefined || this.script.events[this.text_position] === undefined ) {
                return;
            }

            event = this.script.events[this.text_position];

            if( event.speaker !== undefined ) {
                this.speaker = event.speaker;
            }

            if( event.mood !== undefined ) {
                this.mood = event.mood;
            }

            if( event.text_speed !== undefined ) {
                this.text_speed = event.text_speed;
            }

            if( event.pre_speech_delay !== undefined ) {
                this.pre_speech_delay = event.pre_speech_delay;
            }

            if( event.speaker_on_left !== undefined ) {
                if( this.speaker_on_left !== event.speaker_on_left ) {
                    this._text_start = this.text_position;
                }
                this.speaker_on_left = event.speaker_on_left;
            }
        }
	});
});
