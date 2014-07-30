define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';
    describe('Controller', function() {
        var Controller;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector, builder;

            injector = new Squire();

            injector.require(['client/base/controller'], function(controller_with_mocks) {
                Controller = controller_with_mocks;
                done();
            });
        });

        beforeEach(function() {
            this.mock_view = {
                'start': function() {},
                'destroy': function() {}
            };
            this.controller = new Controller(null, this.mock_view);
        });

        // Tests
        describe('#startup', function() {
            it('should tell its view to start', function() {
                // Setup
                spyOn(this.mock_view, 'start');

                // Preconditions

                // Run Test
                this.controller.start();

                // Postconditions
                expect(this.mock_view.start).toHaveBeenCalled();

                // Cleanup
            });
        });

        describe('#destroy', function() {
            it('should tell its view to tear down', function() {
                // Setup
                spyOn(this.mock_view, 'destroy');

                // Preconditions

                // Run Test
                this.controller.destroy();

                // Postconditions
                expect(this.mock_view.destroy).toHaveBeenCalled();

                // Cleanup
            });
        });
    });
});