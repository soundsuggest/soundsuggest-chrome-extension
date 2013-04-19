/**
 * Instantiation of the Spinner class.
 * @type Spinner
 */
var SPINNER;
/**
 * Instantiation of the Whitebox class.
 * @type Whitebox
 */
var WHITEBOX;
/**
 * The session key.
 * @type String
 */
var SESSION_KEY;
/**
 * The active user's name.
 * @type String
 */
var USERNAME;
/**
 * The token authenticated by the user.
 * @type String
 */
var TOKEN;
/**
 * Flag whether or not to show debugging data in the console.
 * @type Boolean
 */
var DEBUG = false;

jQuery(document).ready(function() {
    if (DEBUG) console.log("main.js :: document ready.");
    getUsername();
    createLayout();
    startSpinner();
    getSession();
});

/**
 * <p>
 * Creates the <em>HTML</em> layout for that will be
 * injected into the Last.fm page by the Chrome Extension.
 * </p>
 * @returns {undefined}
 */
createLayout = function() {
    if (DEBUG) console.log("main.js#createLayout");
    jQuery('<div class="soundsuggest" id="soundsuggest"></div>')
        .insertAfter('h1.heading');

    var header  = '<div id="soundsuggest-header">';
    var content = '<div id="soundsuggest-content">';
    var footer  = '<div id="soundsuggest-footer">';
    header += '<h2>SoundSuggest - Visualization of Music Suggestions</h2>';
    header += '<a class="soundsuggest-button" id="toggle-soundsuggest-content">Show / Hide</a>';
    content += '<div id="chart"><div id="spinner"></div></div>';
    content += '<div id="soundsuggest-controls">';
    content += '    <ul id="soundsuggest-controls-ul">';
    content += '        <li><a href="javascript:" id="open-help" class="soundsuggest-button">Help</a></li>';
    content += '        <li><a href="javascript:" id="soundsuggest-clear" class="soundsuggest-button">Clear Selection</a></li>';
    content += '        <li><a href="javascript:" id="soundsuggest-settings" class="soundsuggest-button">Settings</a></li>';
    content += '    </ul>';
    content += '</div>';
    content += '<div id="users"></div>';
    content += '<div id="item-info"></div>';
    content += '<div id="user-info"></div>';
    footer  += '';

    jQuery('#soundsuggest')
        .append(header + '</div>');
    jQuery('#soundsuggest')
        .append(content + '</div>');
    jQuery('#soundsuggest')
        .append(footer + '</div>');

    d3.select('#toggle-soundsuggest-content')
            .on('click', toggle_hide);
    d3.select('#soundsuggest-clear')
            .on('click', clear_selection);
    d3.select('#soundsuggest-settings')
            .on('click', settings);

    $("#open-help").click(function() {
        $.fancybox.open({
            href: 'http://soundsuggest.wordpress.com/application/help/',
            type: 'iframe',
            padding: 5
        });
    });
};

/**
 * <p>
 * Loads the JSON data and instantiates a Whitebox object that
 * creates the visualization.
 * </p>
 * @returns {undefined}
 */
loadVisualization = function() {
    if (DEBUG) console.log("main.js#loadVisualization");
    chrome.extension.sendMessage({
        action: 'lastfm.recommender.load',
        params: {
            username: USERNAME
        }
    },
    function(data) {
        SPINNER.stop();
        WHITEBOX = new Whitebox();
        WHITEBOX.create(data);
    });
};

/**
 * <p>
 * Initializes the <code>SESSION_KEY</code> global parameter. The method
 * works as follows :
 * </p>
 * <pre>
 * IF key IN local_storage THEN
 *      loadVisualization
 * ELSE
 *      IF token IN url
 *          get_session
 *          loadVisualization
 *      ELSE
 *          get_token
 *          get_session
 *          loadVisualization
 *      END-IF
 *  END-IF
 * </pre>
 * @param {type} action
 * @returns {undefined}
 */
getSession = function(action) {
    if (DEBUG) console.log("main.js#getSession");
    chrome.extension.sendMessage({
        action: 'storage.get',
        params: {
            key: USERNAME
        }
    },
    function(a) {
        SESSION_KEY = a.value;
        if (DEBUG) console.log('SESSION_KEY == ' + SESSION_KEY);
        if (!SESSION_KEY) {

            TOKEN = $.url().param('token');
            if (!TOKEN) {
                window.location = 'http://www.last.fm/api/auth/?api_key=828c109e6a54fffedad5177b194f7107&cb=' + window.location;
            } else {
                if (DEBUG) console.log('lastfm.api.chrome.auth.getSession');
                lastfm.api.chrome.auth.getSession({
                    token: TOKEN,
                    username: USERNAME
                }, function(data) {
                    SESSION_KEY = data.key;
                    if (DEBUG) console.log('SESSION_KEY == ' + SESSION_KEY);
                    loadVisualization();
                });
            }
        } else {
            loadVisualization();
        }
    });
};

/**
 * <p>
 * Initializes the global parameter <code>USERNAME</code>.
 * </p>
 * @returns {String} username
 */
getUsername = function() {
    if (DEBUG) console.log("main.js#getUsername");
    USERNAME = $('#idBadgerUser').attr('href').split("user/")[1];
    if (DEBUG) console.log('USERNAME == ' + USERNAME);
    return USERNAME;
};

/**
 * <p>
 * Initializes the global parameter <code>SPINNER</code> and starts
 * the Spinner.
 * </p>
 * @returns {undefined}
 */
startSpinner = function() {
    if (DEBUG) console.log("main.js#startSpinner");
    SPINNER = new Spinner({
        lines: 13,
        length: 20,
        width: 10,
        radius: 50,
        corners: 1,
        rotate: 0,
        direction: 1,
        color: '#000',
        speed: 1,
        trail: 60,
        shadow: false,
        hwaccel: false,
        className: 'spinner',
        zIndex: 2,
        top: '180px',
        left: 'auto'
    }).spin(document.getElementById("spinner"));
};

/**
 * <p>
 * Adds a given artist recommendation to the active user's library
 * and refreshes the visualization.
 * </p>
 * @param {Event} e
 * @returns {undefined}
 */
function addRecommendation(e) {
    if (DEBUG) console.log("main.js#addRecommendation");
    var artist = e.target.children[0].innerHTML;
    if (DEBUG) console.log("main.js#addRecommendation :: adding " + artist);
    chrome.extension.sendMessage({
        action: 'lastfm.recommender.add',
        params: {
            artist      : artist,
            username    : USERNAME
        }
    },
    function(data) {
        if (DEBUG) console.log('main.js#addRecommendation :: data.added : ' + data.added);
        WHITEBOX.destroy();
        startSpinner();
        loadVisualization();
    });
};

toggle_hide = function() {
    if (DEBUG) console.log("main.js#toggle_hide");
    jQuery('#soundsuggest-content').toggle();
};

/**
 * <p>
 * Creates extra elements for the item info div element.
 * </p>
 * @param {type} itemname
 * @param {type} isrecommendation
 * @param {type} user
 * @returns {undefined}
 */
itemInfo = function(itemname, isrecommendation, user) {
    if (DEBUG) console.log("main.js#itemInfo");
    lastfm.api.chrome.artist.getInfo({
        artist      : itemname,
        username    : user
    }, function(data) {
        var bio = data.artist.bio.summary;
        var playcount = 'You have listened to this artist <strong>'
                + data.artist.stats.userplaycount + '</strong> times.';
        jQuery('#item-info-description')
            .append('<p>' + bio + '</p><p>' + playcount + '</p>');
        d3.select('#item-info-controls')
            .append('a')
            .attr('id', 'soundsuggest-button-open')
            .classed('soundsuggest-button', true)
            .attr('href', data.artist.url)
            .attr('target', '_blank')
            .text('See Full Profile');
    });
};

/**
 * <p>
 * Creates extra elements for the user info div element.
 * </p>
 * @param {type} userName
 * @param {type} isActiveUser
 * @param {type} activeuser
 * @returns {undefined}
 */
userInfo = function(userName, isActiveUser, activeuser) {
    if (DEBUG) console.log("main.js#userInfo");
    var html = '';
    var userinfo;
    if (!isActiveUser) {
        lastfm.api.chrome.user.getInfo({
            user: userName
        }, function(response1) {
            userinfo = response1;
            lastfm.api.chrome.tasteometer.compare({
                value1  : activeuser,
                value2  : userName,
                type1   : 'user',
                type2   : 'user',
                limit   : 5
            }, function(response2) {
            
                function a(obj) {
                    return '<em><a href="' + obj.url
                            + '" target="_blank" title="'
                            + obj.name + '">' + obj.name + '</a></em>';
                }

                var score = Number(response2.comparison.result.score) * 100;

                html += '<p>The similarity score between you and <strong>'
                        + userName + '</strong>'
                        + ' equals <strong>' + score.toFixed(2)
                        + '%</strong>.</p>';
                
                html += '<p>';
                var incommon = response2.comparison.result.artists.artist;
                if (Number(incommon.length) !== Number(0)) {
                    if (Number(incommon.length) > Number(1)) {
                        var artists = '';
                        for (var i = 0; i < incommon.length - 2; i++) {
                            artists += a(incommon[i]) + ', ';
                        }
                        artists += a(incommon[incommon.length - 2])
                                + ' and ' + a(incommon[incommon.length - 1]);
                        html += 'Artists you have in common with <strong>'
                             + userName + '</strong> include: ' + artists;
                    } else {
                        html += 'You have one artist in common with <strong>'
                             + userName + '</strong>, namely: '
                             + a(incommon[0]) + '.';
                    }
                } else {
                    html += 'You have no artists in common with <strong>'
                         + userName + '</strong>.';
                }
                html += '</p>';
                
                jQuery('#user-info-description')
                    .append(html);
                d3.select('#user-info-controls')
                    .append('a')
                    .attr('id', 'soundsuggest-button-open')
                    .classed('soundsuggest-button', true)
                    .attr('href', userinfo.user.url)
                    .attr('target', '_blank')
                    .text('See Full Profile');
            });
        });
    } else {
        // Active user's profile.
    }
};

clear_selection = function () {
    WHITEBOX.clearSelection();
};

settings = function () {
    
};