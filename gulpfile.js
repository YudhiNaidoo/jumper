    // Required
    var gulp = require('gulp');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var sass = require('gulp-sass');
    var cssnano = require('gulp-cssnano');
    var concat = require('gulp-concat');
    var rev = require('gulp-rev');
    var clean = require('gulp-clean');
    var sourcemaps = require('gulp-sourcemaps');
    var autoprefixer = require('gulp-autoprefixer');
    var merge = require('merge-stream');

    // Clean old files in build before creating new file
    gulp.task('clean-scripts', function () {
        return gulp.src('css_framework/static/build/js/*.min.js', {read: false})
        .pipe(clean());
    });

    gulp.task('clean-css', function () {
        return gulp.src('css_framework/static/build/css/*.min.css', {read: false})
        .pipe(clean());
    });

    // Scripts task
    gulp.task('scripts', ['clean-scripts'], function(){
        gulp.src(['css_framework/static/src/js/jquery.js',
            'css_framework/static/src/js/flickity.js',
            'css_framework/static/src/js/project.js'])
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concat('final.js'))
            .pipe(rename({suffix:'.min'}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('css_framework/static/build/js'));
    });

    // Watch task
    gulp.task('watch', function(){
        gulp.watch('css_framework/static/src/**/*.js', ['scripts']);
        gulp.watch('css_framework/static/src/**/*.css', ['css']);

    });

<<<<<<< HEAD
    // Sass task
    gulp.task('sass', function(){
        gulp.src('css_framework/static/src/sass/project.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                "browserslist": [
                    "Chrome",
                    "Safari",
                    "Firefox",
                    "iOS",
                    "Explorer"
                  ],
                cascade: false
            }))
            .pipe(concat('project.css'))
            .pipe(gulp.dest('css_framework/static/src/css'));
    });
=======
>>>>>>> 2a0d65e72ba0c8de605a654ca24b0c8d33ae3cf5

    // CSS Task
    gulp.task('css', function() {
        var streamOne = gulp.src(['css_framework/static/src/css/*.css'])
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(concat('file-one.css'));

        var streamTwo = gulp.src(['css_framework/static/src/sass/project.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            "browserslist": [
                "Chrome",
                "Safari",
                "Firefox",
                "iOS",
                "Explorer"
              ],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(concat('file-two.css'));


        var mergedStream = merge(streamOne, streamTwo)
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(concat('final.css'))
        .pipe(rename({suffix:'.min'}))
        .pipe(rev())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css_framework/static/build/css'));


        return mergedStream;
    });



    // Default task
    gulp.task('default', ['scripts', 'watch', 'css']);
