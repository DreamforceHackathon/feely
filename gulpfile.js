var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-cssmin');
var rjs = require('gulp-requirejs');
var uglifyJs = require('gulp-uglify');
var zip = require('gulp-zip');

var paths = {
	target: '.tmp/public',
	assets: [
		'assets/**',
		'!assets/js/angular/*.js',
		'!assets/js/angular/*/*.js',
		'!assets/styles/*.css'
	],
	assetsToWatch: [
		'assets/**',
		'!assets/js/vendor/**'
	]
};

var cssFiles = [
	'assets/js/vendor/angular-loading-bar/build/loading-bar.min.css',
	'assets/styles/bootstrap.css',
	'assets/styles/font-awesome.min.css',
	'assets/styles/style.css'
];

gulp.task('uglifyJs', function () {
	rjs({
		baseUrl: "assets/js/angular",
		name: "Home",
		mainConfigFile: "assets/js/angular/Home.js",
		out: "home.min.js"
	})
	.pipe(uglifyJs())
	.pipe(gulp.dest(paths.target + '/js/angular'));
});

gulp.task('minifyCSS', function () {
	gulp.src(cssFiles)
		.pipe(concat('style.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest(paths.target + '/styles'));
});

gulp.task('compileAssets', function () {
	gulp.src(paths.assets)
		.pipe(gulp.dest(paths.target));
});

gulp.task('watch', function () {
	gulp.watch(paths.assetsToWatch, ['uglifyJs', 'minifyCSS', 'compileAssets']);
});

gulp.task('default', ['uglifyJs', 'minifyCSS', 'compileAssets', 'watch']);


/** Build for CocoonJS **/
gulp.task('build', function () {
	gulp.src('.tmp/public/js/angular/home.min.js')
		.pipe(gulp.dest('build/js/angular'));

	gulp.src('.tmp/public/styles/style.min.css')
		.pipe(gulp.dest('build/styles'));

	gulp.src('assets/fonts/**').pipe(gulp.dest('build/fonts'));
	gulp.src('assets/images/**').pipe(gulp.dest('build/images'));
	gulp.src('assets/index.html').pipe(gulp.dest('build'));
});

gulp.task('zip', function () {
	gulp.src('build/**')
		.pipe(zip('feely.zip'))
		.pipe(gulp.dest('assets'));
});
