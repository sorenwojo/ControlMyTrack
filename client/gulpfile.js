var gulp = require('gulp');
var del = require('del');

var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

var dest = '../server/public/';

gulp.task('publish-js', function() {
	var jsFiles = ['src/script/*'];

    gulp.src(plugins.mainBowerFiles().concat(jsFiles))
		.pipe(gulp.dest(dest + 'script'));
});

gulp.task('publish-html', function() {
	gulp.src(["src/*.html", "src/.htm"])
		.pipe(gulp.dest(dest));
});

gulp.task('publish-css', function() {
	gulp.src(["src/style/*"])
		.pipe(gulp.dest(dest + '/style'));
});

gulp.task('clean-output', function(){
    del.sync(dest);
});

gulp.task('default', ['publish-js', 'publish-html', 'publish-css']);