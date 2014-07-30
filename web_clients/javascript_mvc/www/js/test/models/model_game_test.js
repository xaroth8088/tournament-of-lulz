define(['require', 'squire', 'jquery', 'jsclass/min/core'], function(require, Squire) {
    'use strict';
    describe('ModelGame', function() {
        var ModelGame;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector, builder, mock_tournament;

            mock_tournament = new JS.Class({
                'initialize': function() {},
                'this_is_a_mock': true
            });

            injector = new Squire();
            builder = injector.mock('client/models/model_tournament', mock_tournament);

            injector.require(['client/models/model_game'], function(model_game_with_mocks) {
                ModelGame = model_game_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.model_game = new ModelGame();
        });

        // Tests
        describe('#startup', function() {
            it('should create a new tournament', function() {
                // Setup

                // Preconditions
                expect(this.model_game.tournament).toBeNull();

                // Run Test
                this.model_game.start();

                // Postconditions
                expect(this.model_game.tournament.this_is_a_mock).toBeTruthy(); // Did a ModelTournament instance get created as our tournament?

                // Cleanup
            });
        });
    });
});