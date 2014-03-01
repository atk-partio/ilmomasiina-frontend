var gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less');

gulp.task('default', function() {
  // default task
});

gulp.task('less', function() {
  gulp.src('./styles/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'styles') ]
    }))
    .pipe(gulp.dest('./app/css'));
});