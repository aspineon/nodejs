library.onReady(($) => {
    var cardsElement = document.querySelector('#cards'),
        remoting = $.namespace('pl.library.remoting'),
        cardTemplate = '';

    function createCard(cards, contact) {
        return cards += $.interpolate(cardTemplate, contact);
    }

    function onContactsLoaded(contacts) {
        cardsElement.innerHTML = contacts.reduce(createCard, '');
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