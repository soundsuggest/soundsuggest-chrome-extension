/* *****************************************************************************
 * background.js
 * 
 * Processes calls to the chrome extension background page. Used for local
 * storage and calls to other websites and APIs.
 * 
 * Part of the SoundSuggest project. For more info consult:
 * http://soundsuggest.wordpress.com/ . Written by
 * Joris Schelfaut.
 * ****************************************************************************/

// LISTENERS :
// -----------
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.extension.onMessage.addListener(doAction);

// GLOBAL VARIABLES AND CONSTANTS :
// --------------------------------
var API_KEY         = '828c109e6a54fffedad5177b194f7107';
var API_SECRET      = '7c2f09e6eb84e8a6183c59e0bc574f70';
var LAST_FM         = new LastFM({
    apiKey      : API_KEY,
    apiSecret   : API_SECRET,
    cache       : new LastFMCache(),
    apiUrl      : 'https://ws.audioscrobbler.com/2.0/'
});
var DATA_SERVICE    = 'https://x8-esoteric-code-c.appspot.com/';
var SESSION_KEY     = '';
var USERNAME        = '';
var TOKEN           = '';
var DEBUG           = false;
var DATA_SETTINGS   = {
    limit_neighbours : 10,
    limit_recommendations : 10,
    limit_similar : 10,
    limit_top_artists : 10,
    threshold : Number(0.1)
};

if (DEBUG) console.log("Global variables loaded.");

// FUNCTIONS :
// -----------
function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf('last.fm/home') > -1) {
        chrome.pageAction.show(tabId);
    }
}

function doAction(request, sender, sendResponse) {
    if (DEBUG) console.log("background.js#doAction");
    var action = request.action.toString().toLowerCase().split(".");
    if ("storage" === action[0]) {
        storageAction(action[1], request, sendResponse);
    } else if ("lastfm" === action[0]) {
        lastfmAction(action[1] + "." + action[2], request, sendResponse);
    }
    return true;
}

function storageAction(action, request, sendResponse) {
    if (DEBUG) console.log("background.js#storageAction");
    if (action === 'set') {
        if (DEBUG) console.log("background.js#storageAction#set");
        var dataObj = {}; dataObj[request.params.key] = request.params.value;
        chrome.storage.local.set(dataObj, function() {
            if (DEBUG) console.log('Value [' + request.params.value + '] was saved with key [' + request.params.key + '].');
            sendResponse({ success : true });
        });
    } else if (action === 'get') {
        if (DEBUG) console.log("background.js#storageAction#get");
        USERNAME = request.params.key;
        chrome.storage.local.get(request.params.key, function(value) {
            if (DEBUG) console.log('Value [' + value[USERNAME] + '] was retrieved with key [' + USERNAME + '].');
            sendResponse({ value : value[USERNAME] });
        });
    } else {
        console.error('Undefined storage action.');
    }
    return true;
}

function lastfmAction(action, request, sendResponse) {
    if (DEBUG) console.log("background.js#lastfmAction");
    if (action === 'recommender.load') {
        if (DEBUG) console.log("background.js#lastfmAction#recommender.load");
        
        // USERNAME :
        USERNAME = request.params.username;
        
        // RETRIEVE THE SESSION KEY
        chrome.storage.local.get(USERNAME, function(value) {
            
            DATA_SETTINGS.key = value[USERNAME];
            DATA_SETTINGS.user = USERNAME;
            DATA_SETTINGS.lastfm = LAST_FM;
            
            // RETRIEVE STORED SETTINGS
            chrome.storage.local.get('soundsuggest_settings_data_' + USERNAME, function(value) {
                var stored_settings = value['soundsuggest_settings_data_' + USERNAME];
                
                var limit_neighbours1;
                var limit_recommendations1;
                var limit_similar1;
                var limit_top_artists1;
                var threshold1;
                if (request.params.settings) {
                    limit_neighbours1 = request.params.settings.limit_neighbours;
                    limit_recommendations1 = request.params.settings.limit_recommendations ;
                    limit_similar1 = request.params.settings.limit_similar;
                    limit_top_artists1 = request.params.settings.limit_top_artists;
                    threshold1 = request.params.settings.threshold;
                }
                
                var limit_neighbours2;
                var limit_recommendations2;
                var limit_similar2;
                var limit_top_artists2;
                var threshold2;
                if (stored_settings) {
                    limit_neighbours2 = stored_settings.limit_neighbours;
                    limit_recommendations2 = stored_settings.limit_recommendations;
                    limit_similar2 = stored_settings.limit_similar;
                    limit_top_artists2 = stored_settings.limit_top_artists;
                    threshold2 = stored_settings.threshold;
                }
                
                DATA_SETTINGS.limit_neighbours =
                        limit_neighbours1
                        || limit_neighbours2
                        || DATA_SETTINGS.limit_neighbours;
                DATA_SETTINGS.limit_recommendations =
                        limit_recommendations1
                        || limit_recommendations2
                        || DATA_SETTINGS.limit_recommendations;
                DATA_SETTINGS.limit_similar =
                        limit_similar1
                        || limit_similar2
                        || DATA_SETTINGS.limit_similar;
                DATA_SETTINGS.limit_top_artists = 
                        limit_top_artists1
                        || limit_top_artists2
                        || DATA_SETTINGS.limit_top_artists;
                DATA_SETTINGS.threshold =
                        threshold1
                        || threshold2
                        || DATA_SETTINGS.threshold;

                var dataObj = {}; dataObj['soundsuggest_settings_data_' + USERNAME] = DATA_SETTINGS;
                
                // UPDATE THE SETTINGS
                chrome.storage.local.set(dataObj, function() {
                    lastfm_data(DATA_SETTINGS, function(data) {
                        sendResponse(data);
                    });
                });
            });
        });
    } else if (action === 'recommender.add') {
        if (DEBUG) console.log("background.js#lastfmAction#recommender.add");
        var artistname = request.params.artist;
        USERNAME = request.params.username;
        chrome.storage.local.get(USERNAME, function(value) {
            LAST_FM.library.addArtist({
                artist  : artistname,
                api_key : API_KEY
            }, {
                key : value[USERNAME]
            }, {
                success: function(data) {
                    sendResponse({
                        added : artistname
                    });
                },
                error: function(data_error) {
                    console.error(data_error.error + " : " + data_error.message);
                }
            });
        });
    } else if (action === 'auth.getsession') {
        if (DEBUG) console.log("background.js#lastfmAction#auth.getsession");
        TOKEN = request.params.token;
        USERNAME = request.params.username;
        LAST_FM.auth.getSession({
            token: TOKEN
        }, {
            success: function(data_sess) {
                SESSION_KEY = data_sess.session.key;
                var dataObj = {}; dataObj[USERNAME] = SESSION_KEY;
                chrome.storage.local.set(dataObj, function() {
                    if (DEBUG) console.log('Value [' + SESSION_KEY + '] was saved with key [\'' + USERNAME + '\'].');
                    sendResponse({ key : SESSION_KEY });
                });
            },
            error : function(data_error) {
                console.error(data_error.error + " : " + data_error.message);
            }
        });
    } else if (action === 'artist.getinfo') {
        if (DEBUG) console.log("background.js#lastfmAction#artist.getinfo");
        LAST_FM.artist.getInfo({
            artist    : request.params.artist,
            username  : request.params.username
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
        if (DEBUG) console.log("background.js#lastfmAction#user.getinfo");
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
        if (DEBUG) console.log("background.js#lastfmAction#tasteometer.compare");
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
}