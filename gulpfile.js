const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');

function minify() {
  return src('src/css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({suffix: '.min'}))
      .pipe(dest('dist/css'));
}

function style() {
  return src('./src/sass/*.sass')
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(dest('./src/css'))
      .pipe(browserSync.stream())
}

function server() {
  style();
  browserSync.init({
    server: {
      baseDir: "./src/"
    }
  })
  watch("./src/sass/**/*.sass", style);
  watch("./src/js/**/*.js").on('change', browserSync.reload);
  watch("./src/*.html").on('change', browserSync.reload);
}

exports.style = style;
exports.server = server;
exports.minify = minify;