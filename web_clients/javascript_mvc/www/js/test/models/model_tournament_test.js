define(['require', 'squire', 'jquery', 'jsclass/min/core'], function(require, Squire) {
    'use strict';
    describe('ModelTournament', function() {
        var ModelTournament;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector;

            injector = new Squire();

            this.mock_image_class = jasmine.createSpyObj('mock_image_class', ['loadFromObject']);

            injector = new Squire();
            injector.mock('client/models/model_image', Squire.Helpers.returns(this.mock_image_class));

            injector.require(['client/models/model_tournament'], function(model_tournament_with_mocks) {
                ModelTournament = model_tournament_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.model_tournament = new ModelTournament();
            spyOn(this.model_tournament, 'modelWasUpdated');
        });

        // Tests
        describe('#startNewTournament', function() {
            it('should call the server to fetch a list of top images', function() {
                var called_params;

                // Setup
                spyOn(this.model_tournament, 'ajax');

                // Preconditions
                expect(this.model_tournament.images.length).toBe(0);
                expect(this.model_tournament.tournament_id).toBe(null);

                // Run Test
                this.model_tournament.startNewTournament(8);

                // Postconditions
                expect(this.model_tournament.ajax).toHaveBeenCalled();

                called_params = this.model_tournament.ajax.calls.argsFor(0)[0];
                expect(called_params.url).toBe('/api/tournament.json');
                expect(called_params.method).toBe('POST');

                // Cleanup
            });

            it('should include the passed-in image id in its call the server to fetch a list of top images', function() {
                var called_params, mock_image;

                // Setup
                mock_image = {
                    'image_id': 'mock_image_id'
                };
                spyOn(this.model_tournament, 'ajax');

                // Preconditions
                expect(this.model_tournament.images.length).toBe(0);
                expect(this.model_tournament.tournament_id).toBe(null);

                // Run Test
                this.model_tournament.startNewTournament(8, mock_image);

                // Postconditions
                expect(this.model_tournament.ajax).toHaveBeenCalled();

                called_params = this.model_tournament.ajax.calls.argsFor(0)[0];
                expect(called_params.url).toBe('/api/tournament.json');
                expect(called_params.method).toBe('POST');
                expect(called_params.params.starting_image_id).toBe('mock_image_id');

                // Cleanup
            });
        });

        describe('#onLoadComplete', function() {
            it('should populate its tournament id and list of images, then notify watchers', function() {
                var mock_data;

                // Setup
                mock_data = {
                    'tournament_id': 'mock_tournament_id',
                    'images': [
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
                expect(this.model_tournament.images.length).toBe(0);
                expect(this.model_tournament.tournament_id).toBe(null);

                // Run Test
                this.model_tournament.onLoadComplete(mock_data);

                // Postconditions
                expect(this.model_tournament.images.length).toBe(4);
                expect(this.mock_image_class.loadFromObject.calls.count()).toBe(4);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();

                // Cleanup
            });
        });

        describe('#onLoadFailure', function() {
            it('should log a message indicating a failure', function() {
                // Setup
                spyOn(console, 'log');

                // Preconditions
                expect(this.model_tournament.images.length).toBe(0);
                expect(this.model_tournament.tournament_id).toBe(null);

                // Run Test
                this.model_tournament.onLoadFailure(null, "text status", "error code");

                // Postconditions
                expect(this.model_tournament.images.length).toBe(0);
                expect(this.model_tournament.tournament_id).toBe(null);
                expect(console.log).toHaveBeenCalled();

                // Cleanup
            });
        });
    });
});