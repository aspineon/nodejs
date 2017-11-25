const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const concat = require('gulp-concat');
const minifyCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const inject = require('gulp-inject');

const buildDir = 'dist';

const css = [
    'assets/css/*.css'
];

const scripts = [
    'assets/js/library.js',
    'assets/js/library-*.js',
    'app/*.js'
];

const resources = [
    'assets/img/*',
    'assets/template/*',
    'data/*'
];

gulp.task('clean', function () {
    return del(buildDir);
});

gulp.task('css', function () {
    return gulp.src(css)
        .pipe(concat('style.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(buildDir + '/assets/css'));
});

gulp.task('scripts', function () {
    return gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(buildDir + '/app'));
});

gulp.task('resources', function () {
    return gulp.src(resources, { base: "." })
        .pipe(gulp.dest(buildDir));
});

gulp.task('dev', function () {
    const src = gulp.src(scripts.concat(css), {read: false});
    return gulp.src('index_base.html')
        .pipe(rename('index.html'))
        .pipe(inject(src, {addRootSlash: false}))
        .pipe(gulp.dest('.'));
});

gulp.task('prod', ['css', 'scripts', 'resources'], function () {
    const src = gulp.src(['app/app.js', 'assets/css/style.css'], {read: false});
    return gulp.src('index_base.html')
        .pipe(rename('index.html'))
        .pipe(inject(src, {addRootSlash: false}))
        .pipe(gulp.dest(buildDir));
});