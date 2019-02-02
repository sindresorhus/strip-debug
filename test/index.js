import path from 'path';
import fs from 'fs';
import test from 'ava';
import {transformFileSync} from 'babel-core';

function trim(str) {
	return str.replace(/^\s+|\s+$/, '');
}

const fixturesDir = path.join(__dirname, 'fixtures');
fs.readdirSync(fixturesDir).forEach(caseName => {
	const fixtureDir = path.join(fixturesDir, caseName);
	const actualPath = path.join(fixtureDir, 'actual.js');
	const actual = transformFileSync(actualPath).code;

	const expected = fs.readFileSync(
		path.join(fixtureDir, 'expected.js')
	).toString();

	test(`should ${caseName}`, t => {
		t.is(trim(actual), trim(expected));
	});
});
