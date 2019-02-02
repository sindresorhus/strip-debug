function logs() {
	alert('info');
}

function test() {
	window.alert("foo");
}

var test = () => alert("foo");

"use strict";
alert("foo");
foo();

if (console) {
	alert("foo", "bar");
}

foo && alert("foo");

if (foo) alert("foo")
nextLine();