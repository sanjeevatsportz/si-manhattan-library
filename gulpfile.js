var gulp = require('gulp');
var sass = require('gulp-sass');
var dartsass = require('gulp-dart-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var gcmq = require('gulp-group-css-media-queries');
var cleanCSS = require('gulp-clean-css');

// sass.compiler = require('node-sass');
/* task to convert sass to minifies css and generate map files resp. */
gulp.task('sass', function () {
	return gulp.src('./scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(dartsass().on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./css'));
});

/* task to group-css-media-queries */
gulp.task('gcmq', function () {
	return gulp.src('./css/**/*.css')
		.pipe(sourcemaps.init())
		.pipe(gcmq())
		.pipe(cleanCSS())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('css'));
});


/* task to reload browser automatically after the changes in file. */
gulp.task('serve', function () {
	browserSync.init({
		injectChanges: true,
		watch: true,
		proxy: "http://127.0.0.1:5500/"
	});

	
	gulp.watch(['./scss/**/*.scss'],{ usePolling: true }, gulp.series('sass',  done => {
		browserSync.reload();
		done();
	}));
});

/* task to generate and watch css for the first time */
gulp.task('default', gulp.series('serve'));