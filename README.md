# component-styleguide

## Introduction

Simple styleguide framework.

The styleguide is modeled after [http://patternlab.io](http://patternlab.io). This is a simplified Node.js based version, including:

* Component library
* Static site generator (to browse the components, including the viewport resizer)

Handlebars is used as the template engine, but you can use any compiler for CSS and JavaScript.

## Install

    npm install component-styleguide --save

## Usage

### Structure

Make up a directory structure, for example:

    .
    ├── components
    │   ├── atoms
    │   ├── molecules
    │   └── organisms
    └── data

Put templates and partials in the `atoms`, `molecules`, and `organisms` directories. Additionally, the `templates` and `pages` directories can be used. By default, the extension `html` is expected, but you can configure any other extension. Optionally, put `*.json` files in the `/data` directory.

### Start (and configure)

    var styleguide = require('component-styleguide');
    
    styleguide();

Or, specify some alternative settings (here with the defaults):

    styleguide({
        components: path.resolve(__dirname, 'components'),
        ext: 'html',
        data: path.resolve(__dirname, 'data'),
        static: path.resolve(__dirname, 'compiled')
    });

### Command Line Interface

Alternatively, the styleguide can be started from the CLI. With the default configuration:

    styleguide
    
Here's an example with all default settings:

    styleguide --components components --ext html --data data --static compiled

## Details

* The Handlebars template engine is used. See the [Handlebars](http://handlebarsjs.com/) website for details.
* Each template is automatically registered as a partial (e.g. you can use `{{> atoms/component}}` in templates).
* See [component-styleguide-example](http://github.com/webpro/component-styleguide-example) for a full example setup.
* Stub data:

All "data" files are concatenated into one "context" for the templates. E.g. `users.json` containing `[]` and `profile.json` will result in context (data) for the templates:

    {
       "users": [],
       "profile": {}
    }

E.g. the `{{#users}}` collection can now be iterated over in any template.

## License

[MIT](http://webpro.mit-license.org)
