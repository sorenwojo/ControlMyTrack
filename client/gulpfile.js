var gulp = require('gulp');
var del = require('del');

var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

var dest = 'public/';

gulp.task('publish-js', function() {
	var jsFiles = ['src/js/*'];

    gulp.src(plugins.mainBowerFiles().concat(jsFiles))
		.pipe(plugins.filter('**/*.js'))
		.pipe(gulp.dest(dest + 'script'));
});

gulp.task('clean-output', function(){
    del.sync(dest);
});

gulp.task('default', ['publish-js']);