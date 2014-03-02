ilmomasiina-frontend
====================

[![Code Climate](https://codeclimate.com/github/atk-partio/ilmomasiina-frontend.png)](https://codeclimate.com/github/atk-partio/ilmomasiina-frontend)

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
Run the Karma test runner continuously
```bash
./node_modules/.bin/karma start
```

Run the tests just once
```bash
./gulp.sh run-tests
```

Also the tests are run once on each build and every time a javascript source file is changed, when the development server is being run. At the moment `gulp-karma` doesn't support failing the build, so failing tests do not fail the build, but will show on the terminal.
