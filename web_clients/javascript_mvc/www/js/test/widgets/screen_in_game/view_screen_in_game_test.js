define(['require', 'squire', 'jquery', 'jsclass/min/core'], function(require, Squire) {
    'use strict';
    describe('WidgetScreenInGame.view', function() {
        var WidgetScreenInGame;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector;

            injector = new Squire();

            injector.require(['client/widgets/screen_in_game/widget_screen_in_game'], function(widget_with_mocks) {
                WidgetScreenInGame = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.view = new WidgetScreenInGame.view(null);
        });

        // Tests
        describe('#start', function() {
            it("should create a child element that says 'In Game'", function() {
                // Setup

                // Preconditions
                expect(this.view.container.children().length).toBe(0);

                // Run Test
                this.view.start(null, []);

                // Postconditions
                expect(this.view.container.children().length).toBe(1);
                expect(this.view.container.find('.in-game').html()).toBe("In Game");

                // Cleanup
            });
        });
    });
});