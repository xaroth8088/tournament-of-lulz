define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';
    describe('WidgetScreenInGame.view', function() {
        var WidgetScreenInGame, MockWidget;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector;

            injector = new Squire();

            injector.require(['test/mocks/widget/mock_widget'], function(mock_widget) {
                MockWidget = mock_widget;
                done();
            });
        });

        beforeEach(function(done) {
            var injector;

            injector = new Squire();

            injector.mock('client/widgets/loading/widget_loading', MockWidget);
            injector.mock('client/widgets/loading/widget_bracket', MockWidget);
            injector.mock('client/widgets/loading/widget_selecting', MockWidget);
            injector.mock('client/widgets/loading/widget_victory', MockWidget);
            injector.mock('client/widgets/loading/widget_error', MockWidget);

            injector.require(['client/widgets/screen_in_game/widget_screen_in_game'], function(widget_with_mocks) {
                WidgetScreenInGame = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.view = new WidgetScreenInGame.view();
        });

        // Tests
        describe('#start', function() {
            it("should create child elements to hold each of its modes", function() {
                var mock_tournament_model;
                // Setup
                mock_tournament_model = new MockWidget.model();
                mock_tournament_model.state = 'LOADING';
                mock_tournament_model.CONSTANTS = {
                    'LOADING': 'LOADING'
                };

                // Preconditions
                expect(this.view.container.children().length).toBe(0);

                // Run Test
                this.view.start(null, {
                    'tournament_model': mock_tournament_model,
                    'screen_in_game_model': new MockWidget.model()
                });

                // Postconditions
                expect(this.view.container.children().length).toBe(5);
                expect(this.view.container.find('.loading').length).toBe(1);
                expect(this.view.container.find('.bracket').length).toBe(1);
                expect(this.view.container.find('.selecting').length).toBe(1);
                expect(this.view.container.find('.victory').length).toBe(1);
                expect(this.view.container.find('.error').length).toBe(1);

                // Cleanup
            });
        });
    });
});