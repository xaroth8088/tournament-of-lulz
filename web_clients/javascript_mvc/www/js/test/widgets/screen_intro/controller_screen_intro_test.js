define(['require', 'squire', 'jquery', 'jsclass/min/core'], function(require, Squire) {
    'use strict';
    describe('WidgetScreenIntro.controller', function() {
        var WidgetScreenIntro;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector;

            this.mock_top_images = jasmine.createSpyObj('ModelTopImages', ['loadFromServer']);
            this.mock_configuration = {
                'INTRO_TOP_X_IMAGES_COUNT': '1000'
            };
            injector = new Squire();

            injector.mock('client/models/model_top_images', Squire.Helpers.returns(this.mock_top_images));
            injector.mock('client/configuration', this.mock_configuration);

            injector.require(['client/widgets/screen_intro/widget_screen_intro'], function(widget_with_mocks) {
                WidgetScreenIntro = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.mock_model_page = jasmine.createSpyObj('ModelPage', ['changeScreen']);
            this.mock_view = jasmine.createSpyObj('View', ['start', 'setTopImagesModel']);
            this.controller = new WidgetScreenIntro.controller(null, this.mock_view, this.mock_model_page);
        });

        // Tests
        describe('#start', function() {
            it("should create and kick off a new top images model, and get its view associated with it", function() {
                // Setup

                // Preconditions
                expect(this.controller.page_model).toBeUndefined();
                expect(this.controller.top_images_model).toBeUndefined();
                expect(this.mock_top_images.loadFromServer).not.toHaveBeenCalled();
                expect(this.mock_view.setTopImagesModel).not.toHaveBeenCalled();

                // Run Test
                this.controller.start();

                // Postconditions
                expect(this.controller.page_model).toBe(this.mock_model_page);
                expect(this.controller.top_images_model).toBe(this.mock_top_images);
                expect(this.mock_top_images.loadFromServer).toHaveBeenCalledWith(0, this.mock_configuration.INTRO_TOP_X_IMAGES_COUNT);
                expect(this.mock_view.setTopImagesModel).toHaveBeenCalledWith(this.mock_top_images);

                // Cleanup
            });
        });

        describe('#onStartPressed', function() {
            it("should change the active page to the in-game screen", function() {
                // Setup
                this.controller.start();

                // Preconditions
                expect(this.controller.page_model).not.toBeUndefined();
                expect(this.controller.top_images_model).not.toBeUndefined();

                // Run Test
                this.controller.onStartPressed();

                // Postconditions
                expect(this.mock_model_page.changeScreen).toHaveBeenCalled();

                // Cleanup
            });

            it("should throw an exception if the controller hasn't yet been started", function() {
                // Setup

                // Preconditions
                expect(this.controller.page_model).toBeUndefined();
                expect(this.controller.top_images_model).toBeUndefined();
                expect(this.mock_top_images.loadFromServer).not.toHaveBeenCalled();
                expect(this.mock_view.setTopImagesModel).not.toHaveBeenCalled();

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