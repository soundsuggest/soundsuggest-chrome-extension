function addRecommendation(artist) {
    chrome.extension.sendMessage({
        action      : 'lastfm.addrecommendation',
        session     : SESSION_KEY,
        params      : {
            artist : artist
        }
    },
    function(data) {
        // Refresh.
    });
}