const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const image = require('gulp-image');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

gulp.task('scripts', function() {
  gulp.src('source/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts/'));
});

gulp.task('styles', function() {
  gulp.src('source/styles/**/*.scss')
    .pipe(concat('styles.css'))
    .pipe(sass())
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('public/styles/'));
});

gulp.task('images', function() {
  gulp.src('source/images/*')
    .pipe(image())
    .pipe(gulp.dest('public/images/'));
});

gulp.task('views', function() {
  gulp.src('source/views/*')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('public/views/'));
});

gulp.task('others', function() {
  gulp.src('source/*')
    .pipe(gulp.dest('public/'));
});

gulp.task('default', ['scripts', 'styles', 'views', 'images', 'others'], function() {
  gulp.watch('source/scripts/**/*.js', ['scripts']);
  gulp.watch('source/views/**/*.html', ['views']);
  gulp.watch('source/styles/**/*.scss', ['styles']);
  gulp.watch('source/images/**/*', ['images']);
  gulp.watch('source/*', ['others']);
});
