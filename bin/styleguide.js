#!/usr/bin/env node

var path = require('path'),
    parseArgs = require('minimist'),
    styleguide = require('../server');

var argv = parseArgs(process.argv.slice(2));

styleguide({
    components: argv.components ? path.resolve(argv.components) : null,
    ext: argv.ext,
    data: argv.data ? path.resolve(argv.data) : null,
    static: argv.static ? path.resolve(argv.static) : null
});
