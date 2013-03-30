/*
 * Part of the SoundSuggest project. For more info consult:
 * http://soundsuggest.wordpress.com/ . Written by
 * Joris Schelfaut.
 */
// First : check if a session key was stored

// IF NOT : fetch new token from last.fm API

/*
console.log("Start script.");
var token = $.url().param('token');
console.log("Token received : " + token);

if (!token) {
    console.log("Redirect - retrieve and authenticate token.");
    window.location = 'http://www.last.fm/api/auth/?api_key=828c109e6a54fffedad5177b194f7107&cb=http://last.fm/home/';
} else {
    console.log("Token received : " + token);
    chrome_getRecommendedArtists({
        user    : 'noisedriver',
        limit   : 20,
        token   : token
    },
    function(data_recs) {
        var list = '<ol>';
        for (var i = 0; i < data_recs.data.recommendations.artist.length; i++) {
            list += '<li>' + data_recs.data.recommendations.artist[i].name + '</li>';
        }
        jQuery(list + '</ol>').appendTo('#homeHead');
    });
}
console.log("End script.");
*/

console.log("+-Start script.");

var KEY = 'name';
var VALUE = 'Joris';

console.log("| chrome.extension.sendMessage");
console.log("|\taction : storage.set");
chrome.extension.sendMessage({
        action  : 'storage.set',
        data    : {
            key : KEY,
            value : VALUE
        }
    },
    function (a) {
        console.log('|\t-->Successfully stored value with corresponding key!');
        console.log("| chrome.extension.sendMessage");
        console.log("|\taction : storage.get");
        chrome.extension.sendMessage({
                action  : 'storage.get',
                data    : {
                    key : KEY
                }
            },
            function (a) {
                console.log('|\t-->Retrieved : ' + a.value);
                console.log("+-End script.");
            });
    });
