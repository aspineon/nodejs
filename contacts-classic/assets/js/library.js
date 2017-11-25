var library = (function () {
    'use strict';
    var api = {
            onReady: onReady,
            namespace: namespace,
            mix: mix,
            interpolate: interpolate
         },
         baseNamespace = {};

    api.on = function (target, event, callback, scope) {
        target.addEventListener(event, bind(scope || target, callback));
    };

    function onReady(callback) {
        api.on(window, 'load', callback, library);
    };

    function bind(scope, fn) {
        return function () {
            return fn.apply(scope, arguments);
        }
    }

    function namespace(path) {
        var currentNamespace = baseNamespace;
        path.split('.').forEach(function (pathElement) {
            if (!currentNamespace[pathElement]) {
                currentNamespace[pathElement] = {};
            }
            currentNamespace = currentNamespace[pathElement];
        });
        return currentNamespace;
    }

    function mix(source, destination) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                destination[key] = source[key];
            }
        }
        return destination;
    }

    
    function interpolate(template, data) {
        var result = template;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                result = result.replace('{{' + key + '}}', data[key]);
            }
        }
        return result;
    }

    if (!window.addEventListener) {
        api.on = function (target, event, callback) {
            target.attachEvent('on' + event, callback);
        };
    }

    return api;
})();