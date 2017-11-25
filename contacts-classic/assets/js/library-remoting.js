if (!library) {
    throw 'Core library not found';
}

(function($) {
    var remoting = $.namespace('pl.library.remoting');

    function doNothing() {
    }

    function prepareSettings(config) {
        return $.mix(config, {
            method: 'GET',
            url: '',
            data: {},
            success: doNothing,
            failure: doNothing,
            type: 'json'
        });
    }

    remoting.ajax = function(config) {
        var settings = prepareSettings(config),
            xhr = new XMLHttpRequest();
        
        xhr.open(settings.method, settings.url);   
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status <= 301) {
                    settings.success(settings.type === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText);
                } else {
                    settings.failure(xhr);
                }
            }
        }; 
        xhr.send(settings.data);
    };

})(library);