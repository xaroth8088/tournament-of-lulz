define(['require', 'squire', 'jquery', 'jsclass/min/core'], function(require, Squire) {
    'use strict';
    describe('ModelTopImages', function() {
        var ModelTopImages;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector;

            this.mock_image_class = jasmine.createSpyObj('mock_image_class', ['loadFromObject']);

            injector = new Squire();
            injector.mock('client/models/model_image', Squire.Helpers.returns(this.mock_image_class));

            injector.require(['client/models/model_top_images'], function(model_top_images_with_mocks) {
                ModelTopImages = model_top_images_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.model_top_images = new ModelTopImages();
            spyOn(this.model_top_images, 'modelWasUpdated');
        });

        // Tests
        describe('#loadFromServer', function() {
            it('should call the server to fetch a list of top images', function() {
                var called_params;

                // Setup
                spyOn(this.model_top_images, 'ajax');

                // Preconditions
                expect(this.model_top_images.images.length).toBe(0);

                // Run Test
                this.model_top_images.loadFromServer();

                // Postconditions
                expect(this.model_top_images.ajax).toHaveBeenCalled();

                called_params = this.model_top_images.ajax.calls.argsFor(0)[0];
                expect(called_params.url).toBe('/api/top_images.json');

                // Cleanup
            });
        });

        describe('#onLoadComplete', function() {
            it('should convert the "images" data into ModelImage objects and load them, then notify watchers', function() {
                var mock_data;

                // Setup
                mock_data = {
                    "images":
                    [
                        {
                            "image_id": "123",
                            "page_url": "http://imgur.com/gallery/w2RByDr",
                            "image_url": "http://i.imgur.com/w2RByDr.png",
                            "thumbnail_url": "http://i.imgur.com/w2RByDrs.png",
                            "title": "Mock Top Image 1",
                            "rating": 1234.56
                        },
                        {
                            "image_id": "456",
                            "page_url": "http://imgur.com/gallery/ex9i5Mv",
                            "image_url": "http://i.imgur.com/ex9i5Mv.png",
                            "thumbnail_url": "http://i.imgur.com/ex9i5Mvs.png",
                            "title": "Mock Top Image 2",
                            "rating": 6543.21
                        },
                        {
                            "image_id": "321",
                            "page_url": "http://imgur.com/gallery/Sba6Px8",
                            "image_url": "http://i.imgur.com/Sba6Px8.png",
                            "thumbnail_url": "http://i.imgur.com/Sba6Px8s.png",
                            "title": "Mock Top Image 3",
                            "rating": 1111.11
                        },
                        {
                            "image_id": "654",
                            "page_url": "http://imgur.com/gallery/mLcWci0",
                            "image_url": "http://i.imgur.com/mLcWci0.png",
                            "thumbnail_url": "http://i.imgur.com/mLcWci0s.png",
                            "title": "Mock Top Image 4",
                            "rating": 4321.98
                        }
                    ]
                };

                // Preconditions
                expect(this.model_top_images.images.length).toBe(0);

                // Run Test
                this.model_top_images.onLoadComplete(mock_data);

                // Postconditions
                expect(this.model_top_images.images.length).toBe(4);
                expect(this.mock_image_class.loadFromObject.calls.count()).toBe(4);
                expect(this.model_top_images.modelWasUpdated).toHaveBeenCalled();

                // Cleanup
            });

            it("should throw an exception if the 'images' data isn't present", function() {
                var mock_data;

                // Setup
                mock_data = {};

                // Preconditions
                expect(this.model_top_images.images.length).toBe(0);

                // Run Test
                expect(function() {
                    this.model_top_images.onLoadComplete(mock_data);
                }).toThrow();

                // Postconditions

                // Cleanup
            });

            it("should do nothing if the 'images' data is an empty array", function() {
                var mock_data;

                // Setup
                mock_data = {
                    'images': []
                };

                // Preconditions
                expect(this.model_top_images.images.length).toBe(0);

                // Run Test
                this.model_top_images.onLoadComplete(mock_data);

                // Postconditions
                expect(this.model_top_images.images.length).toBe(0);
                expect(this.mock_image_class.loadFromObject.calls.count()).toBe(0);

                // Cleanup
            });

            it("should throw an exception if the 'images' data isn't an array", function() {
                var mock_data;

                // Setup
                mock_data = {
                    'images': {}
                };

                // Preconditions
                expect(this.model_top_images.images.length).toBe(0);

                // Run Test
                expect(function() {
                    this.model_top_images.onLoadComplete(mock_data);
                }).toThrow();

                // Postconditions

                // Cleanup
            });
        });

        describe('#onLoadFailure', function() {
            it('should log a message indicating a failure', function() {
                // Setup
                spyOn(console, 'log');

                // Preconditions
                expect(this.model_top_images.images.length).toBe(0);

                // Run Test
                this.model_top_images.onLoadFailure(null, "text status", "error code");

                // Postconditions
                expect(this.model_top_images.images.length).toBe(0);
                expect(console.log).toHaveBeenCalled();

                // Cleanup
            });
        });
    });
});