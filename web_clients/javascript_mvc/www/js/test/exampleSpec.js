define(['require', 'jquery', 'client/base/model'], function(require) {
    'use strict';
    var Model = require('client/base/model');

    describe('just checking', function() {

        it('works for app', function() {
            var test;

            test = new Model();
            
            expect(true).toBeTruthy();
        });
    });
});