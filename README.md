Eyes.js
=======

_a customizable value inspector for Node.js_

'raison d'etre'
--------------

I was tired of looking at cluttered output in the console. Something needed to be done.
`sys.inspect()` didn't display regexps correctly, and was too verbose. I had an hour or two to spare.

usage
-----

    var inspect = require('eyes').inspector({style: 'magenta'});

    inspect(something); // inspect with the settings passed to `inspector`

or

    var eyes = require('eyes');

    eyes.inspect(something); // inspect with the default settings

### More coming soon! ###
