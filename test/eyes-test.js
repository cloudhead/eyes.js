var sys = require('sys');
var eyes = require('../lib/eyes');

eyes.inspect({
    number: 42,
    string: "John Galt",
    regexp: /[a-z]+/,
    array: [99, 168, 'x', {}],
    func: function () {},
    bool: false,
    nil: null,
    undef: undefined,
    object: {attr: []}
}, "native types");

eyes.inspect({
    number: new(Number)(42),
    string: new(String)("John Galt"),
    regexp: new(RegExp)(/[a-z]+/),
    array: new(Array)(99, 168, 'x', {}),
    bool: new(Boolean)(false),
    object: new(Object)({attr: []}),
    date: new(Date)
}, "wrapped types");

var inspect = eyes.inspector({ writer: false });

sys.puts(inspect('something', "something"));
sys.puts(inspect("something else"));
