define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';
    describe('WidgetScreenIntro.controller', function() {
        var WidgetScreenIntro, MockWidget;

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

            this.mock_configuration = {
                'INTRO_TOP_X_IMAGES_COUNT': '1000'
            };
            injector = new Squire();

            injector.mock('client/configuration', this.mock_configuration);

            injector.require(['client/widgets/screen_intro/widget_screen_intro'], function(widget_with_mocks) {
                WidgetScreenIntro = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.mock_top_images = new MockWidget.model();
            this.mock_top_images.loadFromServer = jasmine.createSpy('loadFromServer');

            this.mock_model_page = new MockWidget.model();
            this.mock_model_page.changeScreen = jasmine.createSpy('changeScreen');

            this.mock_view = new MockWidget.view();
            this.controller = new WidgetScreenIntro.controller(null, this.mock_view, {
                'page_model': this.mock_model_page,
                'top_images_model': this.mock_top_images
            });
        });

        // Tests
        describe('#start', function() {
            it("should kick off the top images model", function() {
                // Setup

                // Preconditions
                expect(this.mock_top_images.loadFromServer).not.toHaveBeenCalled();

                // Run Test
                this.controller.start();

                // Postconditions
                expect(this.mock_top_images.loadFromServer).toHaveBeenCalledWith(0, this.mock_configuration.INTRO_TOP_X_IMAGES_COUNT);

                // Cleanup
            });
        });

        describe('#onStartPressed', function() {
            it("should change the active page to the in-game screen", function() {
                // Setup
                this.controller.start();

                // Preconditions

                // Run Test
                this.controller.onStartPressed();

                // Postconditions
                expect(this.mock_model_page.changeScreen).toHaveBeenCalled();

                // Cleanup
            });

            it("should throw an exception if the controller hasn't yet been started", function() {
                // Setup

                // Preconditions
                expect(this.mock_top_images.loadFromServer).not.toHaveBeenCalled();

                // Run Test
                expect(function() {
                    this.controller.onStartPressed();
                }).toThrow();

                // Postconditions

                // Cleanup
            });
        });
    });
});