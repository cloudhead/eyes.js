var util = require('util');
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
eyes.inspect({
    recommendations: [{
        id: 'a7a6576c2c822c8e2bd81a27e41437d8',
        key: [ 'spree', 3.764316258020699 ],
        value: {
            _id: 'a7a6576c2c822c8e2bd81a27e41437d8',
            _rev: '1-2e2d2f7fd858c4a5984bcf809d22ed98',
            type: 'domain',
            domain: 'spree',
            weight: 3.764316258020699,
            product_id: 30
        }
    }]
}, 'complex');

eyes.inspect([null], "null in array");

var inspect = eyes.inspector({ stream: null });

util.puts(inspect('something', "something"));
util.puts(inspect("something else"));

util.puts(inspect(["no color"], null, { styles: false }));

eyes.inspect('This String is truncated completely', 'String truncated completely', { maxStringLength: 0 });
eyes.inspect('This String is way too long', 'String too long', { maxStringLength: 12 });
eyes.inspect('This String is exactly right', 'String exactly short enough', { maxStringLength: 29 });
eyes.inspect('This String is short enough', 'String is shorter', { maxStringLength: 30 });

eyes.inspect(['a', 'b', 'c'], 'Array short enough', { maxArrayLength: 4 });
eyes.inspect(['a', 'b', 'c'], 'Array exactly short enough', { maxArrayLength: 3 });
eyes.inspect(['a', 'b', 'c'], 'Array length too long', { maxArrayLength: 2 });
eyes.inspect(['a', 'b', 'c'], 'Array length too long', { maxArrayLength: 1 });
eyes.inspect(['a', 'b', 'c'], 'Array trunctated completely', { maxArrayLength: 0 });

eyes.inspect({ 'a': 'A', 'b': 'B', 'c': 'C' }, 'Object short enough', { maxObjectKeys: 4 });
eyes.inspect({ 'a': 'A', 'b': 'B', 'c': 'C' }, 'Object exactly short enough', { maxObjectKeys: 3 });
eyes.inspect({ 'a': 'A', 'b': 'B', 'c': 'C' }, 'Object has too many keys', { maxObjectKeys: 2 });
eyes.inspect({ 'a': 'A', 'b': 'B', 'c': 'C' }, 'Object has too many keys', { maxObjectKeys: 1 });
eyes.inspect({ 'a': 'A', 'b': 'B', 'c': 'C' }, 'Object truncated completely', { maxObjectKeys: 0 });

eyes.inspect(1234567890, 'Number too long', { maxStringLength: 6 });

eyes.inspect({
    name:  "Something about ogres",
    story: "Once upon a time, in a land far far away.",
    tags: [
        "ogres",
        "donkey",
        "fairytail",
        "prince",
        "evil"
    ],
    related: [
        "A story about an angry prince and his quest to rule the land"
    ],
    link: "http://farfaraway.ff"
},
'Combination truncated',
{
    maxObjectKeys: 4,
    maxArrayLength: 2,
    maxStringLength: 39
});
