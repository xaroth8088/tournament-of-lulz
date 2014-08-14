define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';

    describe('WidgetPage.view', function() {
        var WidgetPage, MockWidget;

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

            injector.mock('client/widgets/screen_intro/widget_screen_intro', MockWidget);
            injector.mock('client/widgets/screen_intro/widget_screen_in_game', MockWidget);

            injector.require(['client/widgets/page/widget_page'], function(widget_with_mocks) {
                WidgetPage = widget_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.mock_model = new MockWidget.model();
            this.mock_model.CONSTANTS = {
                'SCREENS': {
                    'INTRO': 0,
                    'IN_GAME': 1,
                    'SHARE': 2
                }
            };
            this.mock_model.current_screen = this.mock_model.CONSTANTS.SCREENS.INTRO;

            this.mock_view = new MockWidget.view();
            this.mock_controller = new MockWidget.controller(null, this.mock_view, this.mock_model);
            this.view = new WidgetPage.view();
        });

        // Tests
        describe('#start', function() {
            it("should create a basic layout, and show a single screen", function() {
                // Setup

                // Preconditions
                expect(this.view.current_screen).toBeNull();
                expect(this.view.container.children().length).toBe(0);

                // Run Test
                this.view.start(this.mock_controller, {
                    'page_model': this.mock_model
                });

                // Postconditions
                expect(this.view.current_screen).not.toBeNull();
                expect(this.view.container.children().length).toBe(3);
                expect(this.view.container.children('div').filter(function() {
                    return $(this).css('display') !== 'none';
                }).length).toBe(1); // Check that exactly one child is not hidden
                expect(this.view.container.children('.intro').css('display')).not.toBe('none');

                // Cleanup
            });
        });

        describe('#onModelUpdated', function() {
            it("should update which screen is shown, and clean up the old screen", function() {
                // Setup
                this.view.start(this.mock_controller, {
                    'page_model': this.mock_model
                });

                // Preconditions
                expect(this.view.current_screen).not.toBeNull();
                expect(this.view.container.children().length).toBe(3);
                expect(this.view.container.children('div').filter(function() {
                    return $(this).css('display') !== 'none';
                }).length).toBe(1); // Check that exactly one child is not hidden
                expect(this.view.container.children('.intro').css('display')).not.toBe('none');

                this.mock_model.current_screen = this.mock_model.CONSTANTS.SCREENS.IN_GAME;

                // Run Test
                this.view.onModelUpdated();

                // Postconditions
                expect(this.view.current_screen).not.toBeNull();
                expect(this.view.container.children().length).toBe(3);
                expect(this.view.container.children('div').filter(function() {
                    return $(this).css('display') !== 'none';
                }).length).toBe(1); // Check that exactly one child is not hidden
                expect(this.view.container.children('.in_game').css('display')).not.toBe('none');

                // Cleanup
            });

            it("should log a message and do nothing else when an invalid screen is selected in the model", function() {
                // Setup
                this.view.start(this.mock_controller, {
                    'page_model': this.mock_model
                });
                spyOn(console, 'log');

                // Preconditions
                expect(this.view.current_screen).not.toBeNull();
                expect(this.view.container.children().length).toBe(3);
                expect(this.view.container.children('div').filter(function() {
                    return $(this).css('display') !== 'none';
                }).length).toBe(1); // Check that exactly one child is not hidden
                expect(this.view.container.children('.intro').css('display')).not.toBe('none');

                spyOn(this.view, 'removeSubwidget');
                spyOn(this.view, 'addSubwidget');
                this.mock_model.current_screen = "mock invalid screen";

                // Run Test
                this.view.onModelUpdated();

                // Postconditions
                expect(this.view.current_screen).not.toBeNull();
                expect(this.view.container.children().length).toBe(3);
                expect(this.view.container.children('div').filter(function() {
                    return $(this).css('display') !== 'none';
                }).length).toBe(1); // Check that exactly one child is not hidden
                expect(this.view.container.children('.intro').css('display')).not.toBe('none');
                expect(console.log).toHaveBeenCalled();
                expect(this.view.removeSubwidget).not.toHaveBeenCalled();
                expect(this.view.addSubwidget).not.toHaveBeenCalled();

                // Cleanup
            });
        });
    });
});