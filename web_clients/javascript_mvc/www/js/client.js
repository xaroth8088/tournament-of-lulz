// Configure loading modules from the vendor directory,
// except for 'client' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'js/vendor',
    paths: {
		jquery: 'jquery/jquery-2.1.1.min',
        client: '../client'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['client/main']);
