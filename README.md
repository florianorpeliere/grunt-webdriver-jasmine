# grunt-webdriver-jasmine

> grunt-webdriver-jasmine is a grunt plugin to run selenium tests with Jasmine and [WebdriverJS](http://webdriver.io)

This plugin is based on [grunt-webdriver](https://github.com/webdriverjs/grunt-webdriver) and [grunt-jasmine-node](https://github.com/jasmine-contrib/grunt-jasmine-node).

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains
how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process, you may
install this plugin with this command:

```shell
npm install grunt-webdriver-jasmine --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile
with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-webdriver-jasmine');
```

## The "webdriver-jasmine" task

### Overview
In your project's Gruntfile, add a section named `webdriver-jasmine` to the data
object passed into `grunt.initConfig()`.

_Run this task with the `grunt webdriver-jasmine` command._

```js
grunt.initConfig({
  'webdriver-jasmine': {
    options: {
        desiredCapabilities: {
            browserName: 'chrome'
        }
    },
    login: {
        tests: ['test/spec/login/*.js'],
        options: {
            // overwrite default settings
            desiredCapabilities: {
                browserName: 'firefox'
            }
        }
    },
    form: {
        tests: ['test/spec/form/*.js']
    }
    // ...
  },
})
```

#### example using [Sauce Labs](https://saucelabs.com)

If you specify a `tunnel-identifier` within your `desiredCapabilities` object, the task
will automatically try to establish a tunnel connection via [Sauce Connect](https://saucelabs.com/docs/connect).

```js
grunt.initConfig({
  webdriver: {
    options: {
        host: 'ondemand.saucelabs.com',
        port: 80,
        user: SAUCE_USERNAME,
        key: SAUCE_ACCESS_KEY,
        desiredCapabilities: {
            browserName: 'chrome',
            version: '27',
            platform: 'XP',
            'tunnel-identifier': 'my-tunnel'
        }
    },
    login: {
        tests: ['test/spec/login/*.js']
    },
    form: {
        tests: ['test/spec/form/*.js']
    }
    // ...
  },
})
```

### Options

All options get passed into the WebdriverJS `remote` function. So this is the place where
you can define your driver instance. You'll find more informations about all WebdriverJS
options [here](https://github.com/camme/webdriverjs/#options). You can overwrite these
options in any target. Also you have to define all Jasmine options inside jasmineOptions parameter. The following
are supported:

#### task specific options

##### updateSauceJob
Type: `Boolean`<br>
Default: *false*

If true it will automatically update the current job and does publish it.

##### output
Type: `String`
Default: *null*

If set grunt-webdriver-jasmine will pipe reporter output into given file path

##### quiet
Type: `Boolean`
Default: *false*

If true it prevents the original process.stdout.write from executing - no output at all

##### nospawn
Type: `Boolean`<br>
Default: *false*

If true it will not spawn a new selenium server process (useful when using Sauce Labs)

#### jasmine specific options

##### match
Type: `String`<br>
Default: *.*

Match only specs containing "REGEXPspec"

##### matchall
Type: `Boolean`<br>
Default: *false*

Relax requirement of "spec" in spec file names

##### specNameMatcher
Type: `String`<br>
Default: *spec*

Name of spec directory

##### helperNameMatcher
Type: `String`<br>
Default: *helpers*

Name of helper directory

##### showColors
Type: `Boolean`
Default: *true*

Indicates spec output should uses color to indicates passing (green) or failing (red) specs

##### includeStackTrace
Type: `Boolean`
Default: *true*

Indicates if the stack trace will be generated from a test failure

##### useHelpers
Type: `Boolean`
Default: *false*

If `true` task will try to load helper files

##### verbose
Type: `Boolean`
Default: *false*

Verbose output as the specs are running

##### jUnit

Type: `Object`
Default:

```
{
    report: false,
    savePath : "./reports/",
    useDotNotation: true,
    consolidate: true
}
```

export tests results as junitreport xml format

### Usage Examples

#### Required Options
In this example, the minimum required options are used to execute a simple
test script.

```js
grunt.initConfig({
  webdriver: {
    githubTest: {
      tests: './test/github-test.js'
    }
  },
})
```

The corresponding *Hello World* test script is using WebdriverJS API to search the
grunt-webdriver-jasmine repository on GitHub. The global `browser` variable lets you access
your client instance. See more functions and test examples in the [WebdriverJS](https://github.com/Camme/webdriverjs) repository.

```js
'use strict';

describe('grunt-webdriverjs test', function () {

    it('checks if title contains the search query', function(done) {

        browser
            .url('http://github.com')
            .setValue('#js-command-bar-field','grunt-webdriver')
            .submitForm('.command-bar-form')
            .getTitle(function(err,title) {
				expect(title.indexOf('grunt-webdriver')).not.toBe(-1);
				expect(err).toBe(null);
            })
            .end(done);

    });

});
```

## Contributing
Please fork, add specs, and send pull requests! In lieu of a formal styleguide, take care to
maintain the existing coding style.

## Release History
* 2014-04-21   v0.1.0   first working version, based on grunt-webdriver and grunt-jasmine-node