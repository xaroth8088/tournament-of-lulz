define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';
    describe('WidgetScreenIntro.view', function() {
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

            injector = new Squire();

            injector.require(['client/widgets/screen_intro/widget_screen_intro'], function(widget_with_mocks) {
                WidgetScreenIntro = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.mock_controller = jasmine.createSpyObj('ControllerScreenIntro', ['onStartPressed']);
            this.view = new WidgetScreenIntro.view();
        });

        // Tests
        describe('#start', function() {
            it("should create a basic layout", function() {
                var mock_top_images, mock_rpgsay, mock_page;

                // Setup
                mock_top_images = new MockWidget.model();
                mock_top_images.images = [];

                mock_rpgsay = new MockWidget.model();
                mock_page = new MockWidget.model();

                // Preconditions
                expect(this.view.models.top_images_model).toBeNull();

                // Run Test
                this.view.start(this.mock_controller, {
                    'top_images_model': mock_top_images,
                    'rpgsay_model': mock_rpgsay,
                    'page_model': mock_page
                });

                // Postconditions
                expect(this.view.container.children('').length).toBe(4);
                expect(this.view.container.find('button').length).toBe(1);

                // Cleanup
            });
        });

        describe('#onModelUpdated', function() {
            var mock_top_images, mock_rpgsay, mock_page;

            beforeEach( function() {
                mock_top_images = new MockWidget.model();
                mock_top_images.images = [];

                mock_rpgsay = new MockWidget.model();
                mock_page = new MockWidget.model();

                this.view.start(this.mock_controller, {
                    'top_images_model': mock_top_images,
                    'rpgsay_model': mock_rpgsay,
                    'page_model': mock_page
                });
            });

            afterEach( function() {
                this.view.destroy();
            });

            it("should set the background image and create an interval to switch the background image periodically", function() {
                var old_timer;

                // Setup
                this.view.models.top_images_model.images = [];
                this.view.models.top_images_model.images.push(new MockWidget.model());
                old_timer = this.view.timer;

                // Preconditions
                expect(this.view.container.find('.background').css('background-image')).toBe('');
                expect(old_timer).not.toBeNull();

                // Run Test
                this.view.onModelUpdated();

                // Postconditions
                expect(this.view.container.find('.background').css('background-image')).not.toBe('');
                expect(this.view.timer).not.toBe(old_timer);

                // Cleanup
            });

            it("should set/replace its interval to update the background image", function() {
                var old_timer;

                // Setup
                old_timer = this.view.timer;

                // Preconditions
                expect(old_timer).not.toBeNull();

                // Run Test
                this.view.onModelUpdated();

                // Postconditions
                expect(this.view.timer).not.toBe(old_timer);

                // Cleanup
            });

            it("should not update the background image if there are none to show (timer should still update, though)", function() {
                var old_timer;

                // Setup
                old_timer = this.view.timer;

                // Preconditions
                expect(old_timer).not.toBeNull();
                expect(this.view.container.find('.background').css('background-image')).toBe('');

                // Run Test
                this.view.onModelUpdated();

                // Postconditions
                expect(this.view.container.find('.background').css('background-image')).toBe('');
                expect(this.view.timer).not.toBe(old_timer);

                // Cleanup
            });
        });

        describe('#destroy', function() {
            var mock_top_images, mock_rpgsay, mock_page;

            beforeEach( function() {
                mock_top_images = new MockWidget.model();
                mock_top_images.images = [];

                mock_rpgsay = new MockWidget.model();
                mock_page = new MockWidget.model();

                this.view.start(this.mock_controller, {
                    'top_images_model': mock_top_images,
                    'rpgsay_model': mock_rpgsay,
                    'page_model': mock_page
                });
            });

            it('should stop its timer', function() {
                // Setup
                spyOn(window, "clearInterval").and.callThrough();

                // Preconditions

                // Run Test
                this.view.destroy();

                // Postconditions
                expect(clearInterval).toHaveBeenCalled();

                // Cleanup
            });
        });
    });
});