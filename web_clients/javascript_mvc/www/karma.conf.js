// Karma configuration
// Generated on Mon Jul 21 2014 08:51:24 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'js/test/test-main.js', included: true},
      {pattern: 'js/test/mocks/**/*.js', included: false},
      {pattern: 'js/test/**/*_test.js', included: false},
      {pattern: 'js/vendor/**/*.js', included: false},
      {pattern: 'js/client/**/*.js', included: false}
    ],


    // list of files to exclude
    exclude: [
      'js/client.js',
      'js/vendor/jsclass/src/**',
      'js/vendor/jsclass/min/test.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'js/client/**/*.js': ['coverage'],
        'js/test/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'html', 'coverage'],
    // reporters: ['progress', 'html'],

    htmlReporter: {
      outputDir: '../karma_html',
      templatePath: __dirname+'/../jasmine_template.html'
    },
    
    coverageReporter: {
      type : 'html',
      dir : '../coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    // browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
