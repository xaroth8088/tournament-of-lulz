define(['require', 'squire', 'jquery', 'jsclass/min/core'], function(require, Squire) {
    'use strict';
    describe('WidgetScreenInGame.controller', function() {
        var WidgetScreenInGame;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector;

            this.mock_game = jasmine.createSpyObj('ModelGame', ['start']);
            injector = new Squire();

            injector.mock('client/models/model_game', Squire.Helpers.returns(this.mock_game));

            injector.require(['client/widgets/screen_in_game/widget_screen_in_game'], function(widget_with_mocks) {
                WidgetScreenInGame = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.mock_view = jasmine.createSpyObj('View', ['start']);
            this.controller = new WidgetScreenInGame.controller(null, this.mock_view);
        });

        // Tests
        describe('#start', function() {
            it("should fail until more tests are written", function() {
                // Setup

                // Preconditions
                expect(this.controller.game_model).toBeUndefined();
                expect(this.mock_game.start).not.toHaveBeenCalled();

                // Run Test
                this.controller.start();

                // Postconditions
                expect(this.mock_game.start).toHaveBeenCalled();
                expect(this.controller.game_model).toBe(this.mock_game);

                // Cleanup
            });
        });
    });
});