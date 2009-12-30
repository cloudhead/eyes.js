//
// Eyes.js - a customizable value inspector for Node.js
//
//   usage:
//
//       var inspect = require('eyes').inspector({style: 'magenta'});
//
//       inspect(something); // inspect with the settings passed to `inspector`
//
//     or
//
//       var eyes = require('eyes');
//
//       eyes.inspect(something); // inspect with the default settings
//
var eyes = {
    // Default options. All options are merged with it, to inspect()
    defaults: {style: 'cyan', writer: process.stdio.write},

    // Return a curried inspect() function, with the `options` argument filled in.
    inspector: function (options) {
        var that = this;
        return function (obj, label, opts) {
            return that.inspect(obj, label,
                process.mixin({}, options || {}, opts || {}));
        };
    },

    // Calls print() to output the inspected object
    inspect: function (obj, label, options) {
        options = process.mixin({}, this.defaults, options || {})
        return this.print(this.stringify(obj) + "\n", label, options);
    },

    // Output using the 'writer', and an optional label
    print: function (str, label, options) {
        return options.writer((label ? this.stylize(label, 'underline') + ': ' : '') +
                                       this.stylize(str, options.style));
    },

    // Convert any object to a string, ready for output.
    // When an 'array' or an 'object' are encountered, they are
    // passed to specialized functions, which can then recursively call
    // stringify().
    stringify: function (obj) {
        switch (typeOf(obj)) {
            case "string":
                if (obj.length === 1) { return "'" + obj + "'" }
                else { return '"' + obj + '"' }
            case "number"   : return obj.toString();
            case "function" : return this.stylize("Function", 'inverse');
            case "regexp"   : return obj.toString();
            case "array"    : return this.stringifyArray(obj);
            case "null"     : return "null";
            case "undefined": return "undefined";
            case "object"   : return this.stringifyObject(obj);
        }
    },

    // Convert an array to a string, such as [1, 2, 3].
    // This function calls stringify() for each of the elements
    // in the array.
    stringifyArray: function (ary) {
        var out = [];

        for (var i = 0; i < ary.length; i++) {
            out.push(this.stringify(ary[i]));
        }
        return '[' + out.join(', ') + ']';
    },

    // Convert an object to a string, such as {a: 1}.
    // This function calls stringify() for each of its values,
    // and does not output functions or prototype values.
    stringifyObject: function (obj) {
        var out = [];

        for (var k in obj) {
            if (obj.hasOwnProperty(k) && !(obj[k] instanceof Function)) {
                out.push(this.stylize(k, 'bold') + ': ' + this.stringify(obj[k]));
            }
        }
        return "{" + out.join(', ') + "}";
    },

    // Apply a style to a string, eventually,
    // I'd like this to support passing multiple
    // styles.
    stylize: function (str, style) {
        var styles = {
            'bold'      : [1,  22],
            'underline' : [4,  24],
            'inverse'   : [7,  27],
            'cyan'      : [36, 39],
            'magenta'   : [35, 39],
            'yellow'    : [33, 39],
            'green'     : [32, 39],
            'red'       : [31, 39]
        };

        if (style) {
            return '\033[' + styles[style][0] + 'm' + str +
                   '\033[' + styles[style][1] + 'm';
        } else { return str }
    }
};

// CommonJS module support
process.mixin(exports, eyes);

// A better `typeof`
function typeOf(value) {
    var s = typeof value;

    if (s === 'object' || s === 'function') {
        if (value) {
            if (value instanceof Array) { s = 'array' }
            else if (value instanceof RegExp) { s = 'regexp' }
        } else { s = 'null' }
    }
    return s;
}

