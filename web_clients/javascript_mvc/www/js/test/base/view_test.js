define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';
    describe('View', function() {
        var View, MockWidget;

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
            var injector, builder;

            injector = new Squire();

            injector.require(['client/base/view'], function(view_with_mocks) {
                View = view_with_mocks;
                done();
            });
        });

        beforeEach(function() {
            this.view = new View();
            this.mock_widget = new MockWidget.controller( this.view._controller, new View() );
            spyOn(this.mock_widget, 'destroy').and.callThrough();
        });

        afterEach(function() {
            this.view.destroy();
        });

        // Tests
        describe('#startup', function() {
            // Despite the _ in the name, _initTemplate() is part of the interface contract with its subclasses
            it('should create a blank container div and set up its template', function() {
                // Setup

                // Preconditions
                spyOn(this.view, '_initTemplate');

                // Run Test
                this.view.start();

                // Postconditions
                // Wrap the container, then ask that wrapper what its inner HTML is
                expect(this.view.container.wrap($('<p/>')).parent().html()).toBe("<div></div>");
                expect(this.view._initTemplate).toHaveBeenCalled();

                // Cleanup
            });

            it('should watch its models', function() {
                var mock_model;

                // Setup
                this.view = new View(['mock_model']);
                mock_model = new MockWidget.model();
                spyOn(mock_model, 'watch').and.callThrough();

                // Preconditions
                expect(this.view.models['mock_model']).toBeNull();
                expect(mock_model.watch).not.toHaveBeenCalled();

                // Run Test
                this.view.start(null, {
                    'mock_model': mock_model
                });

                // Postconditions
                expect(this.view.models['mock_model']).not.toBeNull();
                expect(mock_model.watch).toHaveBeenCalled();

                // Cleanup
            });

            it('should behave correctly even when Object has been extended', function() {
                var mock_model;

                // Setup
                Object.prototype.mock_example = function() {};

                this.view = new View(['mock_model']);
                mock_model = new MockWidget.model();
                spyOn(mock_model, 'watch').and.callThrough();

                // Preconditions
                expect(this.view.models['mock_model']).toBeNull();
                expect(mock_model.watch).not.toHaveBeenCalled();

                // Run Test
                this.view.start(null, {
                    'mock_model': mock_model
                });

                // Postconditions
                expect(this.view.models['mock_model']).not.toBeNull();
                expect(mock_model.watch).toHaveBeenCalled();

                // Cleanup
                delete Object.prototype.mock_example;
            });
        });

        describe('#destroy', function() {
            it('should destroy its subwidgets, unwatch its models, and remove itself from the DOM', function() {
                var temp_parent, mock_widget2, mock_model;

                // Setup
                this.view = new View(['mock_model']);
                this.view.container.wrap('<div/>');
                temp_parent = this.view.container.parent();

                mock_model = new MockWidget.model();
                spyOn(mock_model, 'watch').and.callThrough();
                spyOn(mock_model, 'unwatch').and.callThrough();

                this.view.start(null, {
                    'mock_model': mock_model
                });

                mock_widget2 = new MockWidget.controller( this.view._controller, new View() );
                spyOn(mock_widget2, 'destroy').and.callThrough();

                this.view.addSubwidget(this.mock_widget, this.view.container);
                this.view.addSubwidget(mock_widget2, this.view.container);

                // Preconditions
                expect(this.view.container.children()[0]).toBe(this.mock_widget.view.container[0]);
                expect(this.view.container.children()[1]).toBe(mock_widget2.view.container[0]);
                expect(this.view.models['mock_model']).not.toBeNull();
                expect(mock_model.watch).toHaveBeenCalled();
                expect(mock_model.unwatch).not.toHaveBeenCalled();

                // Run Test
                this.view.destroy();

                // Postconditions
                expect(temp_parent.children().length).toBe(0);
                expect(this.mock_widget.destroy).toHaveBeenCalled();
                expect(mock_widget2.destroy).toHaveBeenCalled();
                expect(mock_model.unwatch).toHaveBeenCalled();

                // Cleanup
                temp_parent.remove();
            });

            it('should behave correctly even when Object has been extended', function() {
                var mock_model;

                // Setup
                Object.prototype.mock_example = function() {};

                this.view = new View(['mock_model']);
                mock_model = new MockWidget.model();
                spyOn(mock_model, 'watch').and.callThrough();
                spyOn(mock_model, 'unwatch').and.callThrough();

                this.view.start(null, {
                    'mock_model': mock_model
                });

                // Preconditions
                expect(this.view.models['mock_model']).not.toBeNull();
                expect(mock_model.watch).toHaveBeenCalled();
                expect(mock_model.unwatch).not.toHaveBeenCalled();

                // Run Test
                this.view.destroy();

                // Postconditions
                expect(mock_model.unwatch).toHaveBeenCalled();

                // Cleanup
                delete Object.prototype.mock_example;
            });
        });

        describe('#subwidgets', function() {
            it('should append the child controller to DOM', function() {
                // Setup

                // Preconditions

                // Run Test
                this.view.addSubwidget(this.mock_widget, this.view.container);

                // Postconditions
                expect(this.view.container.children()[0]).toBe(this.mock_widget.view.container[0]);

                // Cleanup
            });

            it('should not re-append the child controller to DOM', function() {
                var test_view, test_widget;

                // Setup
                test_view = this.view;
                test_widget = this.mock_widget;

                test_view.addSubwidget(test_widget, test_view.container);

                // Preconditions

                // Run Test
                expect(function() {
                    test_view.addSubwidget(test_widget, test_view.container);
                }).toThrow("Attempted to re-add a subwidget.");

                // Postconditions
                expect(test_view.container.children()[0]).toBe(test_widget.view.container[0]);

                // Cleanup
            });

            it('should remove a specified subwidget, without touching others', function() {
                // Setup
                var mock_widget2;

                mock_widget2 = new MockWidget.controller( this.view._controller, new View() );
                spyOn(mock_widget2, 'destroy').and.callThrough();

                this.view.addSubwidget(this.mock_widget, this.view.container);
                this.view.addSubwidget(mock_widget2, this.view.container);

                // Preconditions
                expect(this.view.container.children()[0]).toBe(this.mock_widget.view.container[0]);
                expect(this.view.container.children()[1]).toBe(mock_widget2.view.container[0]);

                // Run Test
                // Don't remove the first widget, or else branch coverage won't be 100%
                this.view.removeSubwidget(mock_widget2);

                // Postconditions
                expect(this.mock_widget.destroy).not.toHaveBeenCalled();
                expect(mock_widget2.destroy).toHaveBeenCalled();
                expect(this.view.container.children()[0]).toBe(this.mock_widget.view.container[0]);
                expect(this.view._subwidgets.length).toBe(1);

                // Cleanup
            });

            it('should throw an exception if a non-added subwidget is removed', function() {
                var test_widget, test_view;

                // Setup
                test_view = this.view;
                test_widget = this.mock_widget;

                // Preconditions

                // Run Test

                // Postconditions
                expect(function() {
                    test_view.removeSubwidget(test_widget);
                }).toThrow();

                // Cleanup
            });

            it('should remove all subwidgets', function() {
                // Setup
                var mock_widget2;

                mock_widget2 = new MockWidget.controller( this.view._controller, new View() );
                spyOn(mock_widget2, 'destroy').and.callThrough();

                this.view.addSubwidget(this.mock_widget, this.view.container);
                this.view.addSubwidget(mock_widget2, this.view.container);

                // Preconditions
                expect(this.view.container.children()[0]).toBe(this.mock_widget.view.container[0]);
                expect(this.view.container.children()[1]).toBe(mock_widget2.view.container[0]);

                // Run Test
                this.view.removeAllSubwidgets();

                // Postconditions
                expect(this.mock_widget.destroy).toHaveBeenCalled();
                expect(mock_widget2.destroy).toHaveBeenCalled();
                expect(this.view.container.children().length).toBe(0);
                expect(this.view._subwidgets.length).toBe(0);

                // Cleanup
            });

            it('should do nothing if asked to remove a null subwidget' , function() {
                // Setup
                this.view.addSubwidget(this.mock_widget, this.view.container);

                // Preconditions
                expect(this.view.container.children()[0]).toBe(this.mock_widget.view.container[0]);

                // Run Test
                this.view.removeSubwidget(null);

                // Postconditions
                expect(this.view.container.children()[0]).toBe(this.mock_widget.view.container[0]);

                // Cleanup
            });
        });

        describe('#model updates', function() {
            // Despite the _ in the name, _draw() is part of the interface contract with its subclasses
            it('should call _draw() when its model is updated', function() {
                // Setup
                spyOn(this.view, '_draw').and.callThrough();

                // Preconditions

                // Run Test
                this.view.onModelUpdated();

                // Postconditions
                expect(this.view._draw).toHaveBeenCalled();

                // Cleanup
            });
        });
    });
});