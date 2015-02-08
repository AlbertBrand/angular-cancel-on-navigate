var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jscs = require('gulp-jscs'),
  jshint = require('gulp-jshint'),
  header = require('gulp-header'),
  pkg = require('./package.json');

var scriptsGlob = 'src/**/*.js';
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('lint', function () {
  gulp.src(scriptsGlob)
    .pipe(jshint());
});

gulp.task('default', ['lint'], function () {
  gulp.src(scriptsGlob)
    .pipe(concat('angularCancelOnNavigateModule.js'))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('build/'))

    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('build/'));
});