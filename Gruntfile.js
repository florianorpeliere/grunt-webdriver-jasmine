module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Configuration to be run (and then tested).
        webdriver_jasmine: {
            options: {
                updateSauceJob: true,
                user: process.env.SAUCE_USERNAME,
                key: process.env.SAUCE_ACCESS_KEY,
                logLevel: 'verbose',
                desiredCapabilities: {
                    browserName: 'phantomjs'
                }
            },
            chrome_ci: {
                options: {
                    host: 'ondemand.saucelabs.com',
                    port: 80,
                    desiredCapabilities: {
                        browserName: 'chrome',
                        platform: 'Windows 8',
                        version: '31',
                        tags: ['chrome','Windows 8','31'],
                        name: 'grunt-webdriver test',
                        build: process.env.TRAVIS_BUILD_NUMBER || '008'
                    }
                }
            },
            chrome_ciTunnel: {
                options: {
                    port: 4445,
                    desiredCapabilities: {
                        browserName: 'chrome',
                        platform: 'Windows 8',
                        version: '31',
                        tags: ['chrome','Windows 8','31','sauce connect'],
                        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
                        name: 'grunt-webdriver test',
                        build: process.env.TRAVIS_BUILD_NUMBER
                    }
                }
            },
            local: ['spec/*']
        },

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'webdriver']);
    // default task for testing
    grunt.registerTask('test', ['webdriver_jasmine:local']);
    grunt.registerTask('testTravis', ['webdriver_jasmine:chrome_ci' ,'webdriver_jasmine:chrome_ciTunnel']);

};
