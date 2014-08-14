define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';
    describe('WidgetPage.model', function() {
        var WidgetPage;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector;

            injector = new Squire();

            injector.require(['client/widgets/page/widget_page'], function(widget_with_mocks) {
                WidgetPage = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.model = new WidgetPage.model();
        });

        // Tests
        describe('#changeScreen', function() {
            it("should set the new screen and notify watchers", function() {
                // Setup
                spyOn(this.model, 'modelWasUpdated');

                // Preconditions
                expect(this.model.current_screen).toBe(this.model.CONSTANTS.SCREENS.INTRO);
                expect(this.model.modelWasUpdated).not.toHaveBeenCalled();

                // Run Test
                this.model.changeScreen("IN_GAME");

                // Postconditions
                expect(this.model.current_screen).toBe(this.model.CONSTANTS.SCREENS.IN_GAME);
                expect(this.model.modelWasUpdated).toHaveBeenCalled();

                // Cleanup
            });

            it("should not notify watchers if trying to change to the same screen", function() {
                // Setup
                spyOn(this.model, 'modelWasUpdated');

                // Preconditions
                expect(this.model.current_screen).toBe(this.model.CONSTANTS.SCREENS.INTRO);
                expect(this.model.modelWasUpdated).not.toHaveBeenCalled();

                // Run Test
                this.model.changeScreen("INTRO");

                // Postconditions
                expect(this.model.current_screen).toBe(this.model.CONSTANTS.SCREENS.INTRO);
                expect(this.model.modelWasUpdated).not.toHaveBeenCalled();

                // Cleanup
            });

            it("should log an error and abort if given a screen that isn't in the constants", function() {
                // Setup
                spyOn(this.model, 'modelWasUpdated');
                spyOn(console, 'log');

                // Preconditions
                expect(this.model.current_screen).toBe(this.model.CONSTANTS.SCREENS.INTRO);
                expect(this.model.modelWasUpdated).not.toHaveBeenCalled();
                expect(console.log).not.toHaveBeenCalled();

                // Run Test
                this.model.changeScreen("mock screen that doesn't exist");

                // Postconditions
                expect(this.model.current_screen).toBe(this.model.CONSTANTS.SCREENS.INTRO);
                expect(this.model.modelWasUpdated).not.toHaveBeenCalled();
                expect(console.log).toHaveBeenCalled();

                // Cleanup
            });
        });
    });
});