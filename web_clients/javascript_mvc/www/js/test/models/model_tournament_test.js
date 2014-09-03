define(['require', 'squire', 'jquery'], function(require, Squire) {
    'use strict';
    describe('ModelTournament', function() {
        var ModelTournament,
            mock_data,
            mock_unbalanced_data;

        // Mock dependencies and module loading
        beforeEach(function(done) {
            var injector;

            injector = new Squire();

            injector.require(['client/models/model_tournament'], function(model_tournament_with_mocks) {
                ModelTournament = model_tournament_with_mocks;
                done();
            });
        });

        beforeEach(function(){
            this.model_tournament = new ModelTournament();

            spyOn(this.model_tournament, 'ajax');
            spyOn(this.model_tournament, 'modelWasUpdated');
        });

        beforeEach(function() {
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

            mock_unbalanced_data = {
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
                    },
                    {
                        "image_id": "789",
                        "page_url": "http://imgur.com/gallery/mLcWci0",
                        "image_url": "http://i.imgur.com/mLcWci0.png",
                        "thumbnail_url": "http://i.imgur.com/mLcWci0s.png",
                        "title": "Mock Top Image 5",
                        "rating": 7890.12
                    }
                ]
            };
        });

        // Tests
        describe('#startNewTournament', function() {
            it('should set its state to "loading", call the server to fetch a list of top images, then notify watchers', function() {
                var called_params;

                // Setup

                // Preconditions
                expect(this.model_tournament.images.length).toBe(0);
                expect(this.model_tournament.tournament_id).toBe(null);
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.INITIALIZED);

                // Run Test
                this.model_tournament.startNewTournament(8);

                // Postconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADING);
                expect(this.model_tournament.ajax).toHaveBeenCalled();

                called_params = this.model_tournament.ajax.calls.argsFor(0)[0];
                expect(called_params.url).toBe('/api/tournament.json');
                expect(called_params.method).toBe('POST');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();

                // Cleanup
            });

            it('should include the passed-in image id in its call the server to fetch a list of top images', function() {
                var called_params, mock_image;

                // Setup
                mock_image = {
                    'image_id': 'mock_image_id'
                };

                // Preconditions
                expect(this.model_tournament.images.length).toBe(0);
                expect(this.model_tournament.tournament_id).toBe(null);
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.INITIALIZED);

                // Run Test
                this.model_tournament.startNewTournament(8, mock_image);

                // Postconditions
                expect(this.model_tournament.ajax).toHaveBeenCalled();

                called_params = this.model_tournament.ajax.calls.argsFor(0)[0];
                expect(called_params.url).toBe('/api/tournament.json');
                expect(called_params.method).toBe('POST');
                expect(called_params.params.starting_image_id).toBe('mock_image_id');
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADING);

                // Cleanup
            });
        });

        describe('#onLoadComplete', function() {
            it('should update its state, populate its tournament id and list of images, then notify watchers', function() {
                // Setup
                this.model_tournament.startNewTournament();

                // Preconditions
                expect(this.model_tournament.images.length).toBe(0);
                expect(this.model_tournament.tournament_id).toBe(null);
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADING);

                // Run Test
                this.model_tournament.onLoadComplete(mock_data);

                // Postconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(4);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(0);
                expect(this.model_tournament.total_rounds).toBe(3);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Cleanup
            });

            it('should work properly even with byes', function() {
                // Setup
                this.model_tournament.startNewTournament();

                // Preconditions
                expect(this.model_tournament.images.length).toBe(0);
                expect(this.model_tournament.tournament_id).toBe(null);
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADING);

                // Run Test
                this.model_tournament.onLoadComplete(mock_unbalanced_data);

                // Postconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(5);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(0);
                expect(this.model_tournament.total_rounds).toBe(7);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Cleanup
            });

            it("should throw an error if called when not in the LOADING state", function() {
                var self;

                // Setup

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.INITIALIZED);

                // Run Test
                self = this;
                expect(function() {
                    self.model_tournament.onLoadComplete(mock_data);
                }).toThrow();

                // Postconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.INITIALIZED);

                // Cleanup
            });

            it('should throw an exception if tournament_id is missing', function() {
                var mock_empty_data, self;

                // Setup
                mock_empty_data = {
                    'images': []
                };

                this.model_tournament.startNewTournament();

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADING);

                // Run Test
                self = this;
                expect(function() {
                    self.model_tournament.onLoadComplete( mock_empty_data );
                }).toThrow();

                // Postconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.INITIALIZED);

                // Cleanup            
            });

            it('should throw an exception if given an empty images list', function() {
                var mock_empty_data, self;

                // Setup
                mock_empty_data = {
                    'tournament_id': 'mock_tournament_id',
                    'images': []
                };

                this.model_tournament.startNewTournament();

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADING);

                // Run Test
                self = this;
                expect(function() {
                    self.model_tournament.onLoadComplete( mock_empty_data );
                }).toThrow();

                // Postconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.INITIALIZED);

                // Cleanup            
            });

            it('should throw an exception if given a missing images list', function() {
                var mock_empty_data, self;

                // Setup
                mock_empty_data = {
                    'tournament_id': 'mock_tournament_id'
                };

                this.model_tournament.startNewTournament();

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADING);

                // Run Test
                self = this;
                expect(function() {
                    self.model_tournament.onLoadComplete( mock_empty_data );
                }).toThrow();

                // Postconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.INITIALIZED);

                // Cleanup            
            });

            it('should throw an exception if given a 1-length tournament', function() {
                var mock_small_data, mock_image;

                // Setup
                mock_small_data = {
                    'tournament_id': 'mock_tournament_id',
                    'images': []
                };

                mock_image = {
                    "image_id": 1,
                    "page_url": "mock_page_url",
                    "image_url": "mock_image_url",
                    "thumbnail_url": "mock_thumb_url",
                    "title": "Mock Image",
                    "rating": 1000
                };
                mock_small_data.images.push(mock_image);

                this.model_tournament.startNewTournament();

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADING);

                // Run Test
                self = this;
                expect(function() {
                    self.model_tournament.onLoadComplete( mock_small_data );
                }).toThrow();

                // Postconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.INITIALIZED);

                // Cleanup            
            });
        });

        describe('#onLoadFailure', function() {
            it('should set its state, log a message indicating a failure, and notify watchers', function() {
                // Setup
                spyOn(console, 'log');

                // Preconditions
                expect(this.model_tournament.images.length).toBe(0);
                expect(this.model_tournament.tournament_id).toBe(null);

                // Run Test
                this.model_tournament.onLoadFailure(null, "text status", "error code");

                // Postconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.ERROR);
                expect(this.model_tournament.images.length).toBe(0);
                expect(this.model_tournament.tournament_id).toBe(null);
                expect(console.log).toHaveBeenCalled();
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.total_rounds).toBeNull();

                // Cleanup
            });
        });

        describe('#registerWinner', function() {
            it('should set the round winner data, increment the round number, and notify watchers', function() {
                var round_data;

                // Setup
                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_data );

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(4);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(0);
                expect(this.model_tournament.total_rounds).toBe(3);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Run Test
                this.model_tournament.registerWinner("123");

                // Postconditions
                expect(this.model_tournament.round).toBe(1);
                round_data = this.model_tournament.getDataForRound(0);
                expect(round_data.winner.image_id).toBe("123");

                // Cleanup
            });

            it("should throw an error if given an image id that isn't in the current round", function() {
                var self;

                // Setup
                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_data );

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(4);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(0);
                expect(this.model_tournament.total_rounds).toBe(3);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Run Test
                self = this;
                expect(function() {
                    self.model_tournament.registerWinner("999999999");
                }).toThrow();

                // Postconditions

                // Cleanup
            });

            it('should change state to COMPLETE when the last round is called, and notify watchers', function() {
                // Setup
                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_data );
                this.model_tournament.registerWinner("123");
                this.model_tournament.registerWinner("321");

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(4);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(2);
                expect(this.model_tournament.total_rounds).toBe(3);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Run Test
                this.model_tournament.registerWinner("123");

                // Postconditions
                expect(this.model_tournament.round).toBe(3);
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.COMPLETE);

                // Cleanup
            });

            it("should throw an error if the tournament hasn't started", function() {
                var self;

                // Setup

                // Preconditions
                expect(this.model_tournament.round).toBe(null);
                expect(this.model_tournament.state).not.toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.state).not.toBe(this.model_tournament.CONSTANTS.COMPLETE);

                // Run Test
                self = this;
                expect(function() {
                    self.model_tournament.registerWinner("123");
                }).toThrow();

                // Postconditions
                expect(this.model_tournament.round).toBe(null);

                // Cleanup
            });

            it('should throw an error if the tournament is complete', function() {
                var self;

                // Setup
                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_data );
                this.model_tournament.registerWinner("123");
                this.model_tournament.registerWinner("654");
                this.model_tournament.registerWinner("123");

                // Preconditions
                expect(this.model_tournament.round).toBe(3);
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.COMPLETE);

                // Run Test
                self = this;
                expect(function() {
                    self.model_tournament.registerWinner("123");
                }).toThrow();

                // Postconditions

                // Cleanup
            });

            it('should function normally even with byes', function() {
                var round_data;

                // Setup
                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_unbalanced_data );

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(5);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(0);
                expect(this.model_tournament.total_rounds).toBe(7);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Run Test
                this.model_tournament.registerWinner("123");

                // Postconditions
                expect(this.model_tournament.round).toBe(1);
                round_data = this.model_tournament.getDataForRound(0);
                expect(round_data.winner.image_id).toBe("123");

                // Cleanup
            });

            it('should automatically progress past rounds with byes', function() {
                // Setup
                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_unbalanced_data );
                this.model_tournament.registerWinner("123");
                this.model_tournament.registerWinner("321");

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(5);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(4);
                expect(this.model_tournament.total_rounds).toBe(7);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Run Test
                this.model_tournament.registerWinner("123");

                expect(this.model_tournament.round).toBe(6);
                this.model_tournament.registerWinner("789");

                // Postconditions
                expect(this.model_tournament.round).toBe(7);
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.COMPLETE);

                // Cleanup
            });

            it('should run normally on a (procedurally generated, random-winner-selecting) 53-image tournament (which will naturally have byes), checking that it makes it to completion ok', function() {
                var i, mock_large_data, mock_image, match;

                // Setup
                mock_large_data = {
                    'tournament_id': 'mock_tournament_id',
                    'images': []
                };

                for( i = 0; i < 53; i++ ) {
                    mock_image = {
                        "image_id": i,
                        "page_url": "mock_page_url_" + i,
                        "image_url": "mock_image_url_" + i,
                        "thumbnail_url": "mock_thumb_url_" + i,
                        "title": "Mock Image " + i,
                        "rating": 1000 + i
                    };
                    mock_large_data.images.push(mock_image);
                }

                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_large_data );

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(53);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(0);
                expect(this.model_tournament.total_rounds).toBe(63);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Run Test
                // NOTE: This is not 63 rounds because several of the rounds are decided by bye, and
                // are therefore skipped from this perspective
                for( i = 0; i < 52; i++ ) {
                    match = this.model_tournament.getCurrentRoundData();
                    if( Math.random() < 0.5 ) {
                        this.model_tournament.registerWinner(match.player_1.image_id);
                    } else {
                        this.model_tournament.registerWinner(match.player_2.image_id);
                    }
                }

                // Postconditions
                expect(this.model_tournament.round).toBe(63);
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.COMPLETE);

                // Cleanup
            });
        });

        describe('#getCurrentRoundData', function() {
            it('should return data for the current round', function() {
                var round_data;

                // Setup
                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_data );
                this.model_tournament.registerWinner("123");
                this.model_tournament.registerWinner("321");

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(4);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(2);
                expect(this.model_tournament.total_rounds).toBe(3);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Run Test
                round_data = this.model_tournament.getCurrentRoundData();

                // Postconditions
                expect(round_data.round).toBe(2);
                expect(round_data.player_1.image_id).toBe("123");
                expect(round_data.player_2.image_id).toBe("321");
                expect(round_data.winner).toBeNull();

                // Cleanup
            });

            it("should throw an error if the tournament hasn't yet started", function() {
                var round_data, self;

                // Setup

                // Preconditions
                expect(this.model_tournament.state).not.toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.state).not.toBe(this.model_tournament.CONSTANTS.COMPLETE);

                // Run Test
                self = this;
                expect(function() {
                    round_data = self.model_tournament.getCurrentRoundData();
                }).toThrow();

                // Postconditions

                // Cleanup
            });

            it("should throw an error if the tournament is complete", function() {
                var round_data, self;

                // Setup
                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_data );
                this.model_tournament.registerWinner("123");
                this.model_tournament.registerWinner("321");
                this.model_tournament.registerWinner("123");

                // Preconditions
                expect(this.model_tournament.round).toBe(3);
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.COMPLETE);

                // Run Test
                self = this;
                expect(function() {
                    round_data = self.model_tournament.getCurrentRoundData();
                }).toThrow();

                // Postconditions

                // Cleanup
            });
        });

        describe('#getDataForRound', function() {
            it('should return data for the specified round number', function() {
                var round_data;

                // Setup
                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_data );

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(4);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(0);
                expect(this.model_tournament.total_rounds).toBe(3);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Run Test
                round_data = this.model_tournament.getDataForRound(1);

                // Postconditions
                expect(round_data.round).toBe(1);
                expect(round_data.player_1.image_id).toBe("321");
                expect(round_data.player_2.image_id).toBe("654");
                expect(round_data.winner).toBeNull();

                // Cleanup
            });

            it('should throw an error if given a non-numeric round', function() {
                var round_data, self;

                // Setup
                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_data );

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(4);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(0);
                expect(this.model_tournament.total_rounds).toBe(3);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Run Test
                self = this;
                expect(function() {
                    round_data = this.model_tournament.getDataForRound("hello");
                }).toThrow();

                // Postconditions

                // Cleanup
            });

            it('should throw an error if given a too-low round', function() {
                var round_data, self;

                // Setup
                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_data );

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(4);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(0);
                expect(this.model_tournament.total_rounds).toBe(3);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Run Test
                self = this;
                expect(function() {
                    round_data = self.model_tournament.getDataForRound(-1);
                }).toThrow();

                // Postconditions

                // Cleanup
            });

            it('should throw an error if given a too-high round ( >= than total_rounds )', function() {
                var round_data, self;

                // Setup
                this.model_tournament.startNewTournament();
                this.model_tournament.onLoadComplete( mock_data );

                // Preconditions
                expect(this.model_tournament.state).toBe(this.model_tournament.CONSTANTS.LOADED);
                expect(this.model_tournament.images.length).toBe(4);
                expect(this.model_tournament.tournament_id).toBe('mock_tournament_id');
                expect(this.model_tournament.modelWasUpdated).toHaveBeenCalled();
                expect(this.model_tournament.round).toBe(0);
                expect(this.model_tournament.total_rounds).toBe(3);
                expect(this.model_tournament.bracket).not.toBeNull();

                // Run Test
                self = this;
                expect(function() {
                    round_data = self.model_tournament.getDataForRound(999);
                }).toThrow();

                // Postconditions

                // Cleanup
            });
        });
    });
});