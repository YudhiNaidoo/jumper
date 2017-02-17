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
    // Dont include js from profiles page
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
        gulp.watch('css_framework/static/src/**/*.scss', ['sass']);
        gulp.watch('css_framework/static/src/**/*.css', ['css']);

    });

    // Sass task
    gulp.task('sass', function(){
        gulp.src('css_framework/static/src/sass/project.scss')
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
            .pipe(concat('project.css'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('css_framework/static/src/css'));
    });


    // Css task
    // Dont include css from profiles page
    gulp.task('css', ['clean-css'], function(){
        gulp.src('css_framework/static/src/css/*.css')
            .pipe(sourcemaps.init())
            .pipe(cssnano())
            .pipe(concat('final.css'))
            .pipe(rename({suffix:'.min'}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('css_framework/static/build/css'));
    });


    // Default task
    gulp.task('default', ['scripts', 'watch', 'sass', 'css']);
