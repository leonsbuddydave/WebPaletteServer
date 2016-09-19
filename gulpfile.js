var gulp = require('gulp');
var argv = require('yargs').argv;
var fs = require('fs-extra');
var request = require('request');
var AdmZip = require('adm-zip');
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

gulp.task('clean', (cb) => {
	fs.remove('./tmp', () => {
		fs.mkdir('./tmp', cb);	
	});
});

gulp.task('retrieve-command-maps', ['clean'], (cb) => {
	request('http://github.com/leonsbuddydave/WebPaletteDefinitions/archive/master.zip')
		.pipe(fs.createWriteStream('./tmp/WebPaletteDefinitions.zip'))
		.on('finish', () => {
			var zip = new AdmZip('./tmp/WebPaletteDefinitions.zip');
			zip.extractEntryTo('WebPaletteDefinitions-master/definitions/', './tmp/definitions', false, true);
			cb();
		});
});

gulp.task('start', ['retrieve-command-maps'], () => {
	$.nodemon({
		script: 'app/index.js',
		args: ['--port=' + PORT, '--command-map-dir=./tmp/definitions/']
	})
});