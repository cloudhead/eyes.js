Eyes
====

_a customizable value inspector for Node.js_

"raison d'etre"
---------------

I was tired of looking at cluttered output in the console. Something needed to be done.
`sys.inspect()` didn't display regexps correctly, and was too verbose. I had an hour or two to spare.

usage
-----

    var inspect = require('eyes').inspector({styles: {all: 'magenta'}});

    inspect(something); // inspect with the settings passed to `inspector`

or

    var eyes = require('eyes');

    eyes.inspect(something); // inspect with the default settings

customization
-------------

These are the default styles and settings used by _eyes_.

    styles: {                // Styles applied to stdout
        all:   'cyan',       // Overall style applied to everything 
        label: 'underline',  // Inspection labels, like 'array' in `array: [1, 2, 3]`
        other: 'inverted',   // Objects which don't a literal representation, such as functions
        key:   'bold',       // The keys in object literals, like 'a' in `{a: 1}`
        special: '',         // null, undefined...
        bool: ''             // true & false
    },
    writer: process.stdio.write

You can overwrite them with your own, by passing a similar object to `inspector()` or `inspect()`.

    var inspect = require('eyes').inspector({
        styles: {
            all: 'magenta',
            special: 'bold'
        }
    });

