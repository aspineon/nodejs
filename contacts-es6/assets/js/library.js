var library = (function () {
    'use strict';
    var api = {
        namespace,
        interpolate,
        onReady(callback) {
            this.on(window, 'load', () => callback(library));
        },
        on(target, event, callback, scope = target) {
            target.addEventListener(event, callback.bind(scope));
        }
    },
    baseNamespace = {};

    function createNamespace(currentNamespace, pathElement) {
        return currentNamespace[pathElement] =  currentNamespace[pathElement] || {}
    }

    function namespace(path) {
        return path.split('.').reduce(createNamespace, baseNamespace);
    }

    function interpolate(template, data) {
        return Object.keys(data)
            .reduce((result, key) => result.replace('{{' + key + '}}', data[key]), template);
    }

    if (!window.addEventListener) {
        api.on = (target, event, callback) => target.attachEvent('on' + event, callback);
    }

    return api;
})();