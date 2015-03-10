# component-styleguide

## Introduction

Simple styleguide framework. Use [component-styleguide](https://www.npmjs.com/package/component-styleguide) as a dependency of your styleguide project.

The styleguide is modeled after [http://patternlab.io](http://patternlab.io). This is a simplified Node.js based version.

* Start building your component/pattern library straight away.
* Run as a styleguide server (for browsing the components, including the viewport resizer)

See [component-styleguide-example](http://github.com/webpro/component-styleguide-example) for an example setup, and a [live running example](http://component-styleguide-example.webpro.nl).

[Handlebars](http://handlebarsjs.com) is used as the template engine. You can organize and compile the CSS and JavaScript in any way you want. 

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

Or, specify some alternative settings (showing default values):

    styleguide({
        components: path.resolve(__dirname, 'components'),
        ext: 'html',
        data: path.resolve(__dirname, 'data'),
        static: path.resolve(__dirname, 'compiled')
    });

### Command Line Interface

Alternatively, the styleguide can be started from the CLI. With the default configuration:

    styleguide
    
Here's an example with parameters and their default settings:

    styleguide --components components --ext html --data data --static compiled

## Details

### Partials

Each template is automatically registered as a partial (e.g. you can reuse `{{> atoms/component}}` in templates).

### Stub data

All "data" files are concatenated into one "context" for the templates. E.g. `users.json` containing `[]` and `profile.json` containing `{}` will result in context data for the templates:

    {
       "users": [],
       "profile": {}
    }

E.g. the `{{#users}}` collection can now be iterated over in any template.

## License

[MIT](http://webpro.mit-license.org)
