function logs() {
	console.log('info');
}

function test() {
	window.console.log("foo");
}

var test = () => console.log("foo");

"use strict";
console.log("foo");
foo();

if (console) {
	console.log("foo", "bar");
}

foo && console.log("foo");

if (foo) console.log("foo")
nextLine();