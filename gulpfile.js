var gulp = require('gulp');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');

var paths = {
	dist: './dist',
	libs: [],
	scripts: ['app/scripts/**/*.js'],
	styles: ['app/styles/**/*.css', 'node_modules/font-awesome/css/font-awesome.min.css'],
	html: ['app/index.html'],
	images: ['app/images/**/*.png'],
	extras: [
		'electron/main.js',
		'electron/app_icon.png',
		'electron/tray_icon.png',
		'electron/package.json',
		'favicon.ico'
	]
};

// clean distrubition directory
gulp.task('clean', () => {
 return gulp.src(paths.dist)
 .pipe(clean());
});

// process scripts and concatenate them into one output file
gulp.task('scripts', ['clean'], () => {
	gulp.src(paths.scripts)
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('app.js'))
	.pipe(gulp.dest(paths.dist + '/scripts'));
});

// process images and ouput them in dist
gulp.task('images', ['clean'], () => {
	gulp.src(paths.images)
	.pipe(gulp.dest(paths.dist + '/images'));
});

// process fonts
gulp.task('fonts', ['clean'], () => {
	return gulp.src('node_modules/font-awesome/fonts/fontawesome-webfont.*')
	.pipe(gulp.dest(paths.dist + '/fonts'));
});

// copy all other files to dist directly
gulp.task('copy', ['clean'], () => {
	// copy html
	gulp.src(paths.html)
	.pipe(gulp.dest(paths.dist));

	// copy styles
	gulp.src(paths.styles)
	.pipe(gulp.dest(paths.dist + '/styles'));

	// copy lib scripts
	gulp.src(paths.libs)
	.pipe(gulp.dest(paths.dist));

	// copy extra files
	gulp.src(paths.extras)
	.pipe(gulp.dest(paths.dist));
});

// development task to run anytime a file changes
gulp.task('watch', () => {
	gulp.watch('app/**/*', ['scripts', 'images', 'fonts', 'copy']);
});

// default task
gulp.task('start', ['clean', 'scripts', 'images', 'fonts', 'copy']);
