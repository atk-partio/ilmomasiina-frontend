var gulp = require('gulp'),
    util = require('gulp-util'),
    path = require('path'),

    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),

    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),

    karma = require('gulp-karma');

var http = require('http'),
    ecstatic = require('ecstatic'),
    serverPort = 8080;

var paths = {
  app: path.join(__dirname, 'app'),
  styles: path.join(__dirname, 'styles'),
  scripts: path.join(__dirname, 'app', 'js')
}

gulp.task('default', ['run-tests', 'build', 'serve', 'watch']);

gulp.task('build', ['run-tests', 'scripts', 'styles']);

gulp.task('scripts', ['run-tests'], function() {
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

gulp.task('run-tests', function() {
  var testFiles = [
    'test/spec/**/*.js',
    'app/bower_components/jquery/dist/jquery.js',
    'app/bower_components/underscore/underscore.js',
    'app/bower_components/angular/angular.js',
    'app/bower_components/angular-route/angular-route.js',
    'app/bower_components/angular-mocks/angular-mocks.js',
    'app/js/*.js',
    'app/js/**/*.js'
  ];

  return gulp.src(testFiles)
    .pipe(karma({
      configFile: './karma.conf.js',
      action: 'run'
    }));
});

gulp.task('watch', ['build'], function() {
  gulp.watch([ './app/js/*.js', './app/js/**/*.js'], ['scripts']);
  gulp.watch(paths.styles + '**/*.less', ['styles']);
});

gulp.task('serve', ['build'], function() {
  http.createServer(ecstatic( { root: paths.app })).listen(serverPort);
  util.log('Started a server that listens to the port ' + serverPort + '...');
});
