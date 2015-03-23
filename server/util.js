var path = require('path'),
    fs = require('fs'),
    glob = require('glob');

var atomicStructure = [
    {name: 'atoms', inOverview: true, icon: 'dot-single'},
    {name: 'molecules', inOverview: true, icon: 'flow-line'},
    {name: 'organisms', inOverview: true, icon: 'flow-tree'},
    {name: 'templates', inOverview: false, icon: 'file'},
    {name: 'pages', inOverview: false, icon: 'article'}
];

function getComponentsInfo(options) {

    var components = {all: [], menu: [], overview: [], typed: []},
        component,
        matches,
        componentType,
        componentName,
        re = /([^\/]+)\/([^\.]+)(\.html)/;

    for(var tplName in options.templates) {
        matches = tplName.match(re);
        componentType = matches ? matches[1] : options.rootName;
        componentName = matches ? matches[2] : tplName.replace(/\.html/, '');
        component = {
            type: componentType,
            name: componentName,
            path: tplName,
            capitalizedName: getCapitalizedString(componentName),
            template: fs.readFileSync(path.resolve(options.componentDir, tplName)).toString(),
            content: options.templates[tplName](options.data, {
                partials: options.partials
            })
        };

        components.all.push(component);

        components.typed[componentType] = components.typed[componentType] || [];
        components.typed[componentType].push(component);

    }

    atomicStructure.unshift({name: options.rootName, inOverview: true});

    atomicStructure.forEach(function(atomicType) {
        if(components.typed[atomicType.name] && components.typed[atomicType.name].length > 0) {
            atomicType.components = components.typed[atomicType.name];
            components.menu.push(atomicType);
            if(atomicType.inOverview) {
                components.overview = components.overview.concat(components.typed[atomicType.name]);
            }
            delete components.typed[atomicType.name];
        }
    });

    for(var type in components.typed) {
        components.menu.push({
            name: type,
            components: components.typed[type]
        });
        components.overview = components.overview.concat(components.typed[type]);
    }

    return components;
}

function getCapitalizedString(s) {
    return s.split('-').map(function(word) {
        return word.charAt(0).toUpperCase() + word.substring(1);
    }).join(' ')
}

function getTemplateData(pattern) {
    var dataFiles = glob.sync(pattern),
        data = {};
    dataFiles.forEach(function(file) {
        var key = path.basename(file, '.json');
        data[key] = require(file);
    });
    return data;
}

module.exports = {
    getComponentsInfo: getComponentsInfo,
    getTemplateData: getTemplateData
};
