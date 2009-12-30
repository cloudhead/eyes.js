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
    defaults: {
        styles: {                // Styles applied to stdout
            all:   'cyan',       // Overall style applied to everything 
            label: 'underline',  // Inspection labels, like 'array' in `array: [1, 2, 3]`
            other: 'inverted',   // Objects which don't a literal representation, such as functions
            key:   'bold',       // The keys in object literals, like 'a' in `{a: 1}`
            special: '',         // null, undefined...
            bool: ''             // true & false
        },
        writer: process.stdio.write
    },

    // Return a curried inspect() function, with the `options` argument filled in.
    inspector: function (options) {
        var that = this;
        return function (obj, label, opts) {
            return that.inspect(obj, label,
                process.mixin(true, {}, options || {}, opts || {}));
        };
    },

    // Calls print() to output the inspected object
    inspect: function (obj, label, options) {
        options = process.mixin(true, {}, this.defaults, options || {})
        return this.print(this.stringify(obj, options.styles) + "\n", label, options);
    },

    // Output using the 'writer', and an optional label
    print: function (str, label, options) {
        return options.writer((label ? this.stylize(label, options.styles.label, options.styles) + ': ' : '') +
                                       this.stylize(str,   options.styles.all, options.styles));
    },

    // Convert any object to a string, ready for output.
    // When an 'array' or an 'object' are encountered, they are
    // passed to specialized functions, which can then recursively call
    // stringify().
    stringify: function (obj, styles) {
        var that = this, stylize = function (str, style) {
            return that.stylize(str, style, styles)
        };

        switch (typeOf(obj)) {
            case "string":
                if (obj.length === 1) { return "'" + obj + "'" }
                else { return '"' + obj + '"' }
            case "number"   : return obj + '';
            case "regexp"   : return obj + '';
            case "function" : return stylize("Function",  styles.other);
            case "null"     : return stylize("null",      styles.special);
            case "undefined": return stylize("undefined", styles.special);
            case "boolean"  : return stylize(obj + '',    styles.bool);
            case "array"    : return this.stringifyArray(obj,  styles);
            case "object"   : return this.stringifyObject(obj, styles);
        }
    },

    // Convert an array to a string, such as [1, 2, 3].
    // This function calls stringify() for each of the elements
    // in the array.
    stringifyArray: function (ary, styles) {
        var out = [];

        for (var i = 0; i < ary.length; i++) {
            out.push(this.stringify(ary[i], styles));
        }
        return '[' + out.join(', ') + ']';
    },

    // Convert an object to a string, such as {a: 1}.
    // This function calls stringify() for each of its values,
    // and does not output functions or prototype values.
    stringifyObject: function (obj, styles) {
        var out = [];

        for (var k in obj) {
            if (obj.hasOwnProperty(k) && !(obj[k] instanceof Function)) {
                out.push(this.stylize(k, styles.key, styles) + ': ' + this.stringify(obj[k], styles));
            }
        }
        return "{" + out.join(', ') + "}";
    },

    // Apply a style to a string, eventually,
    // I'd like this to support passing multiple
    // styles.
    stylize: function (str, style, styles) {
        var codes = {
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

