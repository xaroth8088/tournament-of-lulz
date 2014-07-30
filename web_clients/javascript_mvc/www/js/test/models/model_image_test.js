define(['require', 'squire', 'jquery', 'jsclass/min/core'], function(require, Squire) {
    'use strict';
    describe('ModelImage', function() {
        var ModelImage;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector;

            injector = new Squire();

            injector.require(['client/models/model_image'], function(model_image_with_mocks) {
                ModelImage = model_image_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.model_image = new ModelImage();
        });

        // Tests
        describe('#loadFromObject', function() {
            it('should use a json object to populate itself, then notify its watchers that it updated', function() {
            	var data;

                // Setup
                data = {
					'image_id': 1,
					'page_url': 2,
					'image_url': 3,
					'thumbnail_url': 4,
					'title': 5,
					'rating': 6
                };

                spyOn(this.model_image, 'modelWasUpdated');

                // Preconditions
                expect(this.model_image.image_id).toBeNull();
                expect(this.model_image.page_url).toBeNull();
                expect(this.model_image.image_url).toBeNull();
                expect(this.model_image.thumbnail_url).toBeNull();
                expect(this.model_image.title).toBeNull();
                expect(this.model_image.rating).toBeNull();

                // Run Test
                this.model_image.loadFromObject(data);

                // Postconditions
                expect(this.model_image.image_id).toBe(1);
                expect(this.model_image.page_url).toBe(2);
                expect(this.model_image.image_url).toBe(3);
                expect(this.model_image.thumbnail_url).toBe(4);
                expect(this.model_image.title).toBe(5);
                expect(this.model_image.rating).toBe(6);

                expect(this.model_image.modelWasUpdated).toHaveBeenCalled();

                // Cleanup
            });
        });
    });
});