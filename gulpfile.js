const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require ('gulp-imagemin');
const uglify = require ('gulp-uglify');

function ComprimeJavaScript() {
    return gulp.src('./source/script/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'))
}

function ComprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}


exports.default = function() {
    gulp.watch('./source/styles/*.scss',{ ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/images/*',{ ignoreInitial: false}, gulp.series(ComprimeImagens));
    gulp.watch('./source/styles/*.scss',{ ignoreInitial: false}, gulp.series(ComprimeJavaScript));
}