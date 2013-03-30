/*
 * Part of the SoundSuggest project. For more info consult:
 * http://soundsuggest.wordpress.com/ . Written by
 * Joris Schelfaut.
 */

/*
 * NOTE : to make this file work, you'll need to change the
 * URL used in "js/lib/lastfm/lastfm.api.js" from
 * http://ws.audioscrobbler.com/2.0/ to https://ws.audioscrobbler.com/2.0/ ,
 * as Chrome Extensions only allow HTTPS calls, as specified in
 * "manifest.json" under  "content_security_policy" : "script-src 'self'
 * https://ws.audioscrobbler.com/2.0/; object-src 'self'".
 * 
 */

// LISTENERS :
// -----------
/* 
 * Listen for any changes to the URL of any tab.
 */
chrome.tabs.onUpdated.addListener(checkForValidUrl);
/*
 * The onMessage method is a part of chrome.extension
 * http://developer.chrome.com/extensions/extension.html
 */
//chrome.extension.onMessage.addListener(loadRecommendedArtists);

chrome.extension.onMessage.addListener(storageAction);


// GLOBAL VARIABLES AND CONSTANTS :
// --------------------------------
var api_key     = '828c109e6a54fffedad5177b194f7107';
var api_secret  = '7c2f09e6eb84e8a6183c59e0bc574f70';
var cache       = new LastFMCache();
var lastfm      = new LastFM({
    apiKey    : api_key,
    apiSecret : api_secret,
    cache     : cache
});

// FUNCTIONS :
// -----------
/**
 * Called when the url of a tab changes.
 * @param {type} tabId
 * @param {type} changeInfo
 * @param {type} tab
 * @returns {undefined}
 */
function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf('last.fm/home') > -1) {
        chrome.pageAction.show(tabId);
    }
};

// https://developer.chrome.com/extensions/storage.html
function storeValue(value, key) {
    //chrome.storage.local.set(dataObj, function() { /*...*/ });
    // instead of anonumous object { key : value }
    
}

function retrieveValue(key) {
    
}

function storageAction(request, sender, sendResponse) {
    if (request.action === 'storage.set') {
        console.log('Storage action storage.set');
        var dataObj = {}; dataObj[request.data.key] = request.data.value;
        chrome.storage.local.set(dataObj, function() {
            console.log('Value [' + request.data.value + '] was saved with key [' + request.data.key + '].');
            sendResponse({ success : true });
        });
    } else if (request.action === 'storage.get') {
        console.log('Storage action storage.get');
        chrome.storage.local.get(request.data.key, function(value) {
            console.log('Value [' + value[request.data.key] + '] was retrieved with key [' + request.data.key + '].');
            sendResponse({ value : value[request.data.key] });
        });
    } else {
        console.error('Undefined storage action.');
    }
    return true;
}

/**
 * 
 * @param {type} request
 * @param {type} sender
 * @param {type} sendResponse
 * @returns {Boolean}
 */
function loadRecommendedArtists(request, sender, sendResponse) {
    if (request.action === 'user.getrecommendedartists') {
        //if (! localStorage["lastfm_session"]) {
        if (! retrieveValue("lastfm_session")) {
            console.log("Get a session object");
            lastfm.auth.getSession({
                token: request.data.token
            }, {
                success: function(data_sess) {
                    console.log("Retrieved a session object from Last.fm API.");
                    //localStorage.setItem ('lastfm_session', data_sess.session);
                    //console.log('A session key was saved : ' + localStorage['lastfm_session'].key);
                    
                    storeValue(data_sess.session, 'lastfm_session');
                    console.log('A session key was saved : ' + retrieveValue("lastfm_session").key);
                    
                    getRecommendedArtists(request.data.user, request.data.limit);
                },
                error: function(data_sess_error) {
                    console.log(data_sess_error.error + " : " + data_sess_error.message);
                }
            });
        } else {
            getRecommendedArtists(request.data.user, request.data.limit);
        }
        return true;
    }
    return false;
};

/**
 * 
 * @param {type} user
 * @param {type} limit
 * @returns {undefined}
 */
function getRecommendedArtists(user, limit) {
    lastfm.user.getRecommendedArtists({
        user    : user,
        limit   : limit
    },
    {
        //key : localStorage['lastfm_session'].key
        key : retrieveValue('lastfm_session').key
        // session object : http://www.last.fm/api/show/auth.getSession
        /*
         * {
         *      key
         *      name
         *      subscriber
         * }
         */
        // only key is really relevant - key lifetime is infinite --> store for each user
    },
    {
        success: function(data_recs) {
            for (var i = 0; i < data_recs.recommendations.artist.length; i++) {
                console.log("data.recommendations.artist[" + i + "] = "
                        + data_recs.recommendations.artist[i].name);
            }
            sendResponse({ data : data_recs });
        },
        error: function(data_recs_error) {
            console.log(data_recs_error.error + " : " + data_recs_error.message);
        }
    });
}