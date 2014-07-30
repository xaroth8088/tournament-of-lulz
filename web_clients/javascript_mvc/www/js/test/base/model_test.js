define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';
    describe('Model', function() {
        var Model;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector, builder;

            injector = new Squire();
            builder = injector.mock('client/configuration', {
                'AJAX_DEFAULTS': {
                    'timeout': -888,
                },
                'INTRO_TOP_X_IMAGES_COUNT': 999
            });

            builder.require(['client/base/model'], function(model_with_mock) {
                Model = model_with_mock;
                done();
            });
        });

        beforeEach(function() {
            this.model = new Model();
        });

        // Tests
        describe('#model notifications', function() {
            it('should notify registered objects when updated', function() {
            	// Setup
            	var mock_view, mock_view2;

            	mock_view = {
            		'onModelUpdated': function() {}
            	};

                mock_view2 = {
                    'onModelUpdated': function() {}
                };

                spyOn( mock_view, 'onModelUpdated' );
                spyOn( mock_view2, 'onModelUpdated' );

                this.model.watch( mock_view );
                this.model.watch( mock_view2 );

            	// Preconditions
            	expect( this.model._watchers.length ).toBe( 2 );

            	// Run Test
            	this.model.modelWasUpdated();

            	// Postconditions
                expect(mock_view.onModelUpdated).toHaveBeenCalled();
                expect(mock_view2.onModelUpdated).toHaveBeenCalled();

            	// Cleanup
            });

            it('should not notify de-registered objects when updated', function() {
                // Setup
                var mock_view;

                mock_view = {
                    'onModelUpdated': function() {}
                };

                spyOn( mock_view, 'onModelUpdated' );

                this.model.watch( mock_view );

                // Preconditions
                expect( this.model._watchers.length ).toBe( 1 );

                // Run Test
                this.model.unwatch( mock_view );
                this.model.modelWasUpdated();

                // Postconditions
                expect(mock_view.onModelUpdated).not.toHaveBeenCalled();
                expect(this.model._watchers.length).toBe( 0 );

                // Cleanup
            });

            it('should only deregister the object passed in', function() {
            	// Setup
            	var mock_view, mock_view2;

                mock_view = {
                    'onModelUpdated': function() {}
                };

                mock_view2 = {
                    'onModelUpdated': function() {}
                };

                spyOn( mock_view, 'onModelUpdated' );
                spyOn( mock_view2, 'onModelUpdated' );

                this.model.watch( mock_view );
                this.model.watch( mock_view2 );

            	// Preconditions
            	expect( this.model._watchers.length ).toBe( 2 );

            	// Run Test
            	this.model.unwatch( mock_view2 );  // don't test removing the first one, or else the 'else' won't be covered.
            	this.model.modelWasUpdated();

            	// Postconditions
                expect(mock_view.onModelUpdated).toHaveBeenCalled();
                expect(mock_view2.onModelUpdated).not.toHaveBeenCalled();
            	expect(this.model._watchers.length).toBe( 1 );

            	// Cleanup
            });

            it("should throw an exception when asked to deregister a watcher that wasn't previously registered", function() {
                // Setup
                var mock_view, test_model;

                mock_view = {
                    'onModelUpdated': function() {}
                };

                spyOn( mock_view, 'onModelUpdated' );

                // Preconditions
                expect( this.model._watchers.length ).toBe( 0 );

                test_model = this.model;

                // Run Test
                expect(function() {
                    test_model.unwatch( mock_view );
                }).toThrow("Attempted to remove a watcher that hadn't previously registered as a watcher.");

                // Postconditions
                expect(mock_view.onModelUpdated).not.toHaveBeenCalled();

                // Cleanup
            });
        });

        describe('#ajax wrapper', function() {
            it('should make a jQuery $.ajax() call with parameters set/modified via configuration', function() {
                var params, called_params;

                // Setup
                spyOn($, 'ajax');
                params = {
                    'url': 'test_url'
                };

                // Preconditions

                // Run Test
                this.model.ajax(params);

                // Postconditions
                expect($.ajax).toHaveBeenCalled();
                called_params = $.ajax.calls.argsFor(0)[0];
                expect(called_params.url).toBe('test_url');
                expect(called_params.timeout).toBe(-888);

                // Cleanup
            });

            it('should make a jQuery $.ajax() call with a debug url, if specified via configuration', function(done) {
                var injector, builder;

                injector = new Squire();
                builder = injector.mock('client/configuration', {
                    'DEBUG_HOST': '0.0.0.0/',
                    'AJAX_DEFAULTS': {
                        'timeout': -777,
                    },
                    'INTRO_TOP_X_IMAGES_COUNT': 999
                });

                builder.require(['client/base/model'], function(model_with_mock) {
                    Model = model_with_mock;
                    var params, called_params, test_model;

                    // Setup
                    test_model = new Model();
                    spyOn($, 'ajax');
                    params = {
                        'url': 'test_url'
                    };

                    // Preconditions

                    // Run Test
                    test_model.ajax(params);

                    // Postconditions
                    expect($.ajax).toHaveBeenCalled();
                    called_params = $.ajax.calls.argsFor(0)[0];
                    expect(called_params.url).toBe('0.0.0.0/test_url');
                    expect(called_params.timeout).toBe(-777);

                    // Cleanup
                    done();
                });
            });
    	});
    });
});