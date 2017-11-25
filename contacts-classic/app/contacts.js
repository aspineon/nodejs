library.onReady(function () {
    var cardsElement = document.querySelector('#cards'),
        remoting = this.namespace('pl.library.remoting'),
        cardTemplate = '';

    function onContactsLoaded(contacts) {
        var cards = '';
        contacts.forEach(function (contact) {
            cards += library.interpolate(cardTemplate, contact);
        });
        cardsElement.innerHTML = cards;
    }

    function onError(xhr) {
        console.log(xhr);
    }

    function loadContacts() {
        remoting.ajax({
            url: 'data/contacts.json',
            success: onContactsLoaded,
            failure: onError
        });
    }

    function onTemplateLoaded(template) {
        cardTemplate = template;
        loadContacts();
    }

    remoting.ajax({
        url: 'assets/template/card.html',
        success: onTemplateLoaded,
        failure: onError,
        type: 'template'
    });
});