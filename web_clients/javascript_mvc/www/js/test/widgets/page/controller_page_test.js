define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';
    describe('WidgetPage.controller', function() {
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
            this.mock_model_page = jasmine.createSpy('ModelPage');
            this.mock_view = jasmine.createSpyObj('View', ['start']);
            this.controller = new WidgetPage.controller(null, this.mock_view, this.mock_model_page);
        });

        // Tests
        describe('#start', function() {
            it("should instantiate cleanly", function() {
                // Setup

                // Preconditions

                // Run Test
                expect(function() {
                    var mock_model_page, mock_view, controller;
                    mock_model_page = jasmine.createSpy('ModelPage');
                    mock_view = jasmine.createSpyObj('View', ['start']);
                    controller = new WidgetPage.controller(null, mock_view, mock_model_page);
                }).not.toThrow();

                // Postconditions

                // Cleanup
            });
        });
    });
});