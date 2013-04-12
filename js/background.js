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
    cache       : new LastFMCache(),
    apiUrl      : 'https://ws.audioscrobbler.com/2.0/'
});
var DATA_SERVICE = 'https://x8-esoteric-code-c.appspot.com/';
var SESSION_KEY  = '';
var USERNAME     = '';
var TOKEN        = '';
var DEBUG        = false;

if (DEBUG) console.log("Global variables loaded.");

// FUNCTIONS :
// -----------
function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf('last.fm/home') > -1) {
        chrome.pageAction.show(tabId);
    }
};

function doAction(request, sender, sendResponse) {
    if (DEBUG) console.log("background.js#doAction");
    var action = request.action.toString().toLowerCase().split(".");
    if ("storage" === action[0]) {
        storageAction(action[1], request, sendResponse);
    } else if ("lastfm" === action[0]) {
        lastfmAction(action[1] + "." + action[2], request, sendResponse);
    }
    return true;
};

function storageAction(action, request, sendResponse) {
    if (DEBUG) console.log("background.js#storageAction");
    if (action === 'set') {
        if (DEBUG) console.log('Storage action storage.set');
        var dataObj = {}; dataObj[request.params.key] = request.data.value;
        chrome.storage.local.set(dataObj, function() {
            if (DEBUG) console.log('Value [' + request.params.value + '] was saved with key [' + request.params.key + '].');
            sendResponse({ success : true });
        });
    } else if (action === 'get') {
        if (DEBUG) console.log('Storage action storage.get');
        chrome.storage.local.get(request.params.key, function(value) {
            if (DEBUG) console.log('Value [' + value[request.params.key] + '] was retrieved with key [' + request.params.key + '].');
            sendResponse({ value : value[request.params.key] });
        });
    } else {
        console.error('Undefined storage action.');
    }
    return true;
};

function lastfmAction(action, request, sendResponse) {
    if (DEBUG) console.log("background.js#lastfmAction");
    if (action === 'recommender.load') {
        USERNAME = request.params.username;
        chrome.storage.local.get(USERNAME, function(value) {
            d3.json(DATA_SERVICE + "?key=" + value[USERNAME] + "&user=" + USERNAME, function(error, data) {
                sendResponse(data);
            });
        });
        
    } else if (action === 'recommender.add') {
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
    } else if (action === 'auth.getsession') {
        TOKEN = request.params.token;
        USERNAME = request.params.username;
        LAST_FM.auth.getSession({
                token: TOKEN
            }, {
                success: function(data_sess) {
                    SESSION_KEY = data_sess.session.key;
                    var dataObj = {}; dataObj[USERNAME] = SESSION_KEY;
                    chrome.storage.local.set(dataObj, function() {
                        console.log('Value [' + SESSION_KEY + '] was saved with key [\'' + USERNAME + '\'].');
                        sendResponse({ key : SESSION_KEY });
                    });
                },
                error : function(data_error) {
                    console.error(data_error.error + " : " + data_error.message);
                }
            });
    } else if (action === 'artist.getinfo') {
        LAST_FM.artist.getInfo({
            artist    : request.params.artist,
            user      : request.params.user
        },
        {
            success: function(data) {
                sendResponse(data);
            },
            error: function(data) {
                console.error(data.error + " " + data.message);
            }
        });
    } else if (action === 'user.getinfo') {
        LAST_FM.user.getInfo({
            user      : request.params.user
        },
        {
            success: function(data) {
                sendResponse(data);
            },
            error: function(data) {
                console.error(data.error + " " + data.message);
            }
        });
    } else if (action === 'tasteometer.compare') {
        LAST_FM.tasteometer.compare({
            value1  : request.params.value1,
            value2  : request.params.value2,
            type1   : request.params.type1,
            type2   : request.params.type2
        },
        {
            success: function(data) {
                sendResponse(data);
            },
            error: function(data) {
                console.error(data.error + " " + data.message);
            }
        });
    } else {
        console.error('Undefined last.fm action.');
    }
    return true;
};