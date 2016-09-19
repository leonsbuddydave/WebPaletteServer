var gulp = require('gulp');
var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')();

// Use the one provided or make the assumption that these projects
// are in the same directory
var commandMapDir = argv.commandMapDir || '../WebPaletteDefinitions/definitions/';

var PORT = argv.port || 6969;

gulp.task('dev', () => {
	$.nodemon({
		script: 'app/index.js',
		ext: 'js',
		args: ['--mode=dev', '--command-map-dir=' + commandMapDir]
	})
});

gulp.task('start', () => {
	$.nodemon({
		script: 'app/index.js',
		args: ['--port=' + PORT]
	})
});