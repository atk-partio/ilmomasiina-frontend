var gulp = require('gulp'),
    util = require('gulp-util'),
    path = require('path'),
    less = require('gulp-less');

var http = require('http'),
    ecstatic = require('ecstatic'),
    serverPort = 8080;

var paths = {
  app: path.join(__dirname, 'app'),
  styles: path.join(__dirname, 'styles')
}

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('build', ['styles']);

gulp.task('styles', function() {
  gulp.src('./styles/main.less')
    .pipe(less({
      paths: [ paths.styles ]
    }))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.styles + '**/*.less', ['styles']);
});

gulp.task('serve', function() {
  http.createServer(ecstatic( { root: paths.app })).listen(serverPort);
  util.log('Started a server that listens to the port ' + serverPort + '...');
});
