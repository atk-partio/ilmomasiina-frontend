ilmomasiina-frontend
====================

[![Code Climate](https://codeclimate.com/github/atk-partio/ilmomasiina-frontend.png)](https://codeclimate.com/github/atk-partio/ilmomasiina-frontend) [![Build Status](https://travis-ci.org/atk-partio/ilmomasiina-frontend.png?branch=master)](https://travis-ci.org/atk-partio/ilmomasiina-frontend)

Requirements
------------
* [Node.js](http://nodejs.org/download/) >= 0.8
* [npm](https://npmjs.org)

Installing
----------
```bash
npm install
```

Building
--------
```bash
./gulp.sh
```

Run tests
---------
Run the Karma unit test runner continuously, useful for e.g. TDD
```bash
./node_modules/.bin/karma start
```

Run all the tests just once, useful for the last check before pushing
```bash
npm test
```

Run just the web tests
```bash
./gulp.sh protractor
```

Also the tests are run once on each build and every time a javascript source file is changed, when the development server is being run. At the moment `gulp-karma` doesn't support failing the build, so failing tests do not fail the build, but will show on the terminal.
