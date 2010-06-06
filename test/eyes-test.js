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

var obj = {};
obj.that = { self: obj };
obj.self = obj;

eyes.inspect(obj, "circular object");
eyes.inspect({hello: 'moto'}, "small object");
eyes.inspect({hello: new(Array)(6) }, "big object");
eyes.inspect(["hello 'world'", 'hello "world"'], "quotes");

var inspect = eyes.inspector({ stream: null });

sys.puts(inspect('something', "something"));
sys.puts(inspect("something else"));
