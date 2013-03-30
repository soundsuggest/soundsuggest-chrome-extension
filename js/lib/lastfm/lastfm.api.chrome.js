/**
 * <p>
 * Sends a request to the background page. There the recommended artists are
 * retrieved from the Last.fm API and sent back to the calling function.
 * </p>
 * @param {type} data : { username, limit, token }
 * @param {type} callback
 * @returns {undefined}
 */
chrome_getRecommendedArtists = function(data, callback) {
    chrome.extension.sendMessage({
        action  : 'user.getrecommendedartists',
        data    : data
    },
    callback);
};

/**
 * <p>
 * Sends a request to the background page. There the top artists for a 
 * particular user are retrieved from the Last.fm API and sent back to the
 * calling function.
 * </p>
 * @param {type} data : { username, limit }
 * @param {type} callback
 * @returns {undefined}
 */
chrome_getTopArtists = function(data, callback) {
    chrome.extension.sendMessage({
        action: 'user.gettopartists',
        data: data
    },
    callback);
};

