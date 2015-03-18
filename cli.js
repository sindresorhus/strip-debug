#!/usr/bin/env node
'use strict';
var fs = require('fs');
var getStdin = require('get-stdin');
var meow = require('meow');
var strip = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ strip-debug <input file> > <output file>',
		'  $ cat <input file> | strip-debug > <output file>',
		'',
		'Example',
		'  $ strip-debug src/app.js > dist/app.js',
		'  $ cat src/app.js | strip-debug > dist/app.js'
	].join('\n')
});

if (process.stdin.isTTY) {
	if (!cli.input[0]) {
		console.error('Input file required');
		process.exit(1);
	}

	process.stdout.write(strip(fs.readFileSync(cli.input[0], 'utf8')).toString());
} else {
	getStdin(function (data) {
		process.stdout.write(strip(data).toString());
	});
}
