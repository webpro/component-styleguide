var path = require('path'),
    fs = require('fs'),
    glob = require('glob');

function isAtomic(type) {
    return ['atoms', 'molecules', 'organisms'].indexOf(type) !== -1;
}

function getComponentsInfo(templates, partials, data) {

    var components = {flat: [], typed: []},
        component,
        matches,
        type,
        re = /([^\/]+)\/([^\.]+)(\.html)/;

    for(var tplName in templates) {
        matches = tplName.match(re);
        type = matches[1];
        component = {
            type: type,
            name: matches[2],
            path: tplName,
            capitalizedName: getCapitalizedString(matches[2]),
            isAtomic: isAtomic(type),
            content: templates[tplName](data, {
                partials: partials
            })
        };

        if(isAtomic(type)) {
            components.flat.push(component);
        }
        components.typed[type] = components.typed[type] || [];
        components.typed[type].push(component);
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
