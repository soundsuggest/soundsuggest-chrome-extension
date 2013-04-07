/* *****************************************************************************
 * background.js
 * 
 * Processes calls to the chrome extension background page. Used for local
 * storage and calls to other websites and APIs.
 * 
 * Part of the SoundSuggest project. For more info consult:
 * http://soundsuggest.wordpress.com/ . Written by
 * Joris Schelfaut.
 **************************************************************************** */

// LISTENERS :
// -----------
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.extension.onMessage.addListener(doAction);

// GLOBAL VARIABLES AND CONSTANTS :
// --------------------------------
var API_KEY      = '828c109e6a54fffedad5177b194f7107';
var API_SECRET   = '7c2f09e6eb84e8a6183c59e0bc574f70';
var LAST_FM      = new LastFM({
    apiKey      : API_KEY,
    apiSecret   : API_SECRET,
    cache       : new LastFMCache()
});
var DATA_SERVICE = '';
var SESSION_KEY  = '';
var USERNAME     = '';

// FUNCTIONS :
// -----------
checkForValidUrl = function(tabId, changeInfo, tab) {
    if (tab.url.indexOf('last.fm/home') > -1) {
        chrome.pageAction.show(tabId);
    }
};

doAction = function(request, sender, sendResponse) {
    var action = request.action.toString().toLowerCase().split(".");
    if ("storage" === action[0]) {
        storageAction(action[1], request, sendResponse);
    } else if ("lastfm" === action[0]) {
        lastfmAction(action[1], request, sendResponse);
    }
};

storageAction = function(action, request, sendResponse) {
    if (action === 'set') {
        console.log('Storage action storage.set');
        var dataObj = {}; dataObj[request.data.key] = request.data.value;
        chrome.storage.local.set(dataObj, function() {
            console.log('Value [' + request.data.value + '] was saved with key [' + request.data.key + '].');
            sendResponse({ success : true });
        });
    } else if (action === 'get') {
        console.log('Storage action storage.get');
        chrome.storage.local.get(request.data.key, function(value) {
            console.log('Value [' + value[request.data.key] + '] was retrieved with key [' + request.data.key + '].');
            sendResponse({ value : value[request.data.key] });
        });
    } else {
        console.error('Undefined storage action.');
    }
    return true;
};

lastfmAction = function(action, request, sendResponse) {
    if (action === 'datastructure') {
        d3.json(DATA_SERVICE + "?key=" + SESSION_KEY + "&user=" + USERNAME, function(error, data) {
            sendResponse(data);
        });
    } else if (action === 'addrecommendation') {
        var artistname = request.params.artist;
        LAST_FM.library.addArtist({
            artist  : artistname,
            api_key : API_KEY
        },
        {
            key : SESSION_KEY
        },
        {
            success: function(data) {
                console.log(data);
                sendResponse({
                    session     : SESSION_KEY,
                    username    : USERNAME,
                    added       : artistname
                });
            },
            error: function(data_error) {
                console.error(data_error.error + " : " + data_error.message);
            }
        });
    } else {
        console.error('Undefined last.fm action.');
    }
    return true;
};