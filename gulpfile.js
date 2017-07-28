const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');

var files = ['source/fonts/**/*.*', 'source/images/**/*.*', 'source/svg/**/*.*', 'source/*'];

gulp.task('serve', ['scripts', 'styles', 'copy'], function () {
    gulp.watch('source/scripts/**/*.js', ['scripts']);
    gulp.watch('source/styles/**/*.scss', ['styles']);
    gulp.watch(files, ['copy']);
});

gulp.task('scripts', function () {
    gulp.src('source/scripts/**/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('public/scripts/'));
});

gulp.task('styles', function () {
    gulp.src(['source/styles/**/*.scss', 'source/styles/**/*.css'])
        .pipe(concat('styles.css'))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('public/styles/'));
});

gulp.task('copy', function () {
    return gulp.src(files, {
            base: 'source/'
        })
        .pipe(gulp.dest('public/'));
});

gulp.task('default', ['serve']);
gulp.task('build', ['scripts', 'styles', 'copy']);
