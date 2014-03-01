var gulp = require('gulp'),
    util = require('gulp-util'),
    path = require('path'),

    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),

    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var http = require('http'),
    ecstatic = require('ecstatic'),
    serverPort = 8080;

var paths = {
  app: path.join(__dirname, 'app'),
  styles: path.join(__dirname, 'styles')
}

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('build', ['scripts', 'styles']);

gulp.task('scripts', function() {
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

gulp.task('watch', ['build'], function() {
  return gulp.watch(paths.styles + '**/*.less', ['styles']);
});

gulp.task('serve', ['build'], function() {
  http.createServer(ecstatic( { root: paths.app })).listen(serverPort);
  util.log('Started a server that listens to the port ' + serverPort + '...');
});
