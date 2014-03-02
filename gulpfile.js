var gulp = require('gulp'),
    util = require('gulp-util'),
    path = require('path'),
    spawn = require('child_process').spawn,

    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),

    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),

    karmaRunner = require('karma').server,
    karmaConfigFile = 'karma.conf.js',
    protractor = require('gulp-protractor').protractor,
    webdriverUpdate = require('gulp-protractor').webdriver_update,
    wdHost = '127.0.0.1',
    wdPort = 9001,
    server;

var http = require('http'),
    ecstatic = require('ecstatic'),
    serverPort = 8080;

var paths = {
  app: path.join(__dirname, 'app'),
  styles: path.join(__dirname, 'styles'),
  scripts: path.join(__dirname, 'app', 'js')
}

function karmaSingleRun(callback, opts) {
  opts || (opts = {});
  opts.autoWatch = false;
  opts.singleRun = true;
  karmaRun(callback, opts);
}

function karmaRun(callback, opts) {
  var args, child;
  opts.configFile = path.join(__dirname, 'test', 'conf', karmaConfigFile);

  args = [ path.join(__dirname, 'test', 'utils', 'background_process.js'), JSON.stringify(opts)],
  child = spawn('node', args, { stdio: 'inherit' });
  child.on('exit', function(code) {
    callback(code);
  });
}

function serveApp(dir, port, host) {
  return http.createServer(ecstatic( { root: dir })).listen(port, host);
}

gulp.task('default', ['build-dev', 'serve', 'watch']);

/* TASKS FOR DEVELOPMENT */

gulp.task('build-dev', ['scripts-dev', 'karma-unit-singlerun', 'styles']);

gulp.task('scripts-dev', function() {
  return gulp.src('./app/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('styles', function() {
  return gulp.src('./styles/main.less')
    .pipe(less({
      paths: [ paths.styles ]
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./app/css'));
});

gulp.task('watch', ['build-dev'], function() {
  // when a .js file changes, process .js files and run unit tests
  gulp.watch([ './app/js/*.js', './app/js/**/*.js'], ['scripts-dev', 'karma-unit-singlerun-lenient']);
  // when a .less file changes, process .less files
  gulp.watch(paths.styles + '**/*.less', ['styles']);
});

gulp.task('serve', ['build-dev'], function() {
  http.createServer(ecstatic( { root: paths.app })).listen(serverPort);
  util.log('Started a server that listens to the port ' + serverPort + '...');
});

// unit testing task that fails the build if tests do not pass
gulp.task('karma-unit-singlerun', ['scripts-dev'], function(callback) {
  karmaSingleRun(callback);
});

// unit testing task that never fails a build, used for running unit tests after .js file changes
gulp.task('karma-unit-singlerun-lenient', ['scripts-dev'], function(callback) {
  var cb = function() {
    callback(0);
  };
  karmaSingleRun(cb);
});

/* TASKS FOR CONTINUOUS INTEGRATION */

// task that runs the tests for continuous integration
gulp.task('test', ['scripts-dev', 'karma-unit-for-ci', 'webdriver-update', 'serve-for-protractor', 'protractor']);

// unit testing task that fails the build, but runs the tests only on Firefox
gulp.task('karma-unit-for-ci', ['scripts-dev'], function(callback) {
  karmaSingleRun(callback, { browsers: ['Firefox'] });
});

gulp.task('webdriver-update', ['karma-unit-for-ci'], webdriverUpdate);

gulp.task('serve-for-protractor', ['webdriver-update'], function() {
  server = serveApp(path.join(__dirname, 'app'), wdPort, wdHost);
});

gulp.task('protractor', ['webdriver-update', 'serve-for-protractor'], function(cb) {
  return gulp.src(['./test/e2e/*.js'])
    .pipe(protractor({
      configFile: path.join(__dirname, 'test', 'conf', 'protractor.conf.js')
    })).on('error', function(e) {
      throw e; 
    }).on('end', function() {
      server.close();
      server = null;
    });
});
