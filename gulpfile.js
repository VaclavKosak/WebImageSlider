
let gulp = require("gulp");
let sass = require("gulp-sass");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let cssnano = require("cssnano");
let sourcemaps = require("gulp-sourcemaps");
var ts = require('gulp-typescript');

let paths = {
    css: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "src/scss/**/*.scss",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "css"
    },
    js: {
        src: "src/js/**/*.ts",
        dest: "js"
    }
};

/***
 * TYPESCIRPT
 */
function scripts() {
    return(
      gulp
          .src(paths.js.src)
          .pipe(ts({
              noImplicitAny: true,
              outFile: 'web-bundle.js'
          }))
          .pipe(gulp.dest(paths.js.dest)
    ));
}

/***
 * CSS
 */
function style() {
    return (
        gulp
            .src(paths.css.src)
            // Initialize sourcemaps before compilation starts
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            // Use postcss with autoprefixer and compress the compiled file using cssnano
            .pipe(postcss([autoprefixer(), cssnano()]))
            // Now add/write the sourcemaps
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.css.dest))
    );
}

/***
 * FILEWATCH
 */
function watch(){
    style();
    scripts();

    gulp.watch(paths.css.src, style);

    gulp.watch(paths.js.src, scripts);
}


/***
 * RUN
 */

exports.style = style;
exports.watch = watch;
exports.scripts = scripts;