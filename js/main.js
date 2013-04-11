var SPINNER;
var WHITEBOX;
var SESSION_KEY;
var USERNAME;
var TOKEN;
var API_KEY = '828c109e6a54fffedad5177b194f7107';
var DEBUG   = true;
var HIDDEN  = false;

jQuery(document).ready(function() {
    if (DEBUG) console.log("Starting Chrome Extension.");
    getUsername();
    createLayout();
    if (DEBUG) console.log("Layout created.");
    startSpinner();
    if (DEBUG) console.log("Spinner created.");
    if (DEBUG) console.log("Loading session data.");
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
    jQuery('#soundsuggest')
        .append('<div id="soundsuggest-header"></div>');
    jQuery('#soundsuggest-header')
        .append('<h2 class="header">SoundSuggest</h2>');
    d3.select('#soundsuggest-header')
        .append('button')
        .text('show/hide')
        .attr('id', 'toggle-soundsuggest-content')
        .on('click', toggle_hide);
    jQuery('#soundsuggest')
        .append('<div id="soundsuggest-content"></div>');
    jQuery('#soundsuggest-content')
        .append('<div class="soundsuggest-chart" id="chart"></div>');
    jQuery('#soundsuggest-content')
        .append('<div class="soundsuggest-users" id="users"></div>');
    jQuery('#soundsuggest-content')
        .append('<div class="soundsuggest-item-info" id="item-info"></div>');
    jQuery('#chart')
        .append('<div id="spinner"></div>');
    
    jQuery('#soundsuggest')
        .append('<div id="soundsuggest-footer"></div>');
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
    /*chrome.extension.sendMessage({
        action  : 'lastfm.recommender.load',
        params  : {
            username : USERNAME
        }
    },
    function (data) {
        SPINNER.stop();
        WHITEBOX = new Whitebox();
        WHITEBOX.create(data);
    });
    */
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
        action  : 'storage.get',
        params  : {
            key : 'SESSION_KEY'
        }
    },
    function (a) {
        SESSION_KEY = a.value;
        if (DEBUG) console.log('SESSION_KEY == ' + SESSION_KEY);
        if (! SESSION_KEY) {
            TOKEN = $.url().param('token');
            if (! TOKEN) window.location = 'http://www.last.fm/api/auth/?api_key=' + API_KEY + '&cb=' + window.location;
            lastfm.api.chrome.auth.getSession({
                token   : TOKEN,
                api_key : API_KEY
            }, function(data) {
                SESSION_KEY = data.key;
                if (DEBUG) console.log('SESSION_KEY == ' + SESSION_KEY);
                loadVisualization();
            });
        } else {
            loadVisualization();
        }
    });
};

/**
 * <p>
 * Initializes the global parameter <code>USERNAME</code>.
 * </p>
 * @returns {undefined}
 */
getUsername = function() {
    if (DEBUG) console.log("main.js#getUsername");
    USERNAME = $('#idBadgerUser').attr('href').split("user/")[1];
    if (DEBUG) console.log('USERNAME == ' + USERNAME);
};

/**
 * <p>
 * Initializes the global parameter <code>SPINNER</code> and starts
 * the Spinner.
 * </p>
 * @returns {undefined}
 */
startSpinner = function() {
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
        zIndex: 2e9,
        top: '200px',
        left: 'auto'
    }).spin(document.getElementById("spinner"));
};

/**
 * <p>
 * Adds a given artist recommendation to the active user's library
 * and refreshes the visualization.
 * </p>
 * @param {type} artist
 * @returns {undefined}
 */
addRecommendation = function(artist) {
    if (DEBUG) console.log("main.js#addRecommendation");
    chrome.extension.sendMessage({
        action      : 'lastfm.recommender.add',
        session     : SESSION_KEY,
        params      : {
            artist : artist
        }
    },
    function(data) {
        if (DEBUG) console.log(data);
        WHITEBOX.destroy();
        loadVisualization();
    });
};

toggle_hide = function() {
    if (DEBUG) console.log("main.js#toggle_hide");
    jQuery('#soundsuggest-content')
        .toggle();
};

itemInfo = function(itemname, isrecommendation, user) {
    lastfm.api.chrome.artist.getInfo({
        artist    : itemname,
        user      : user
    }, function(data) {
            var bio = data.artist.bio.summary;
            jQuery('#item-info-description')
                .append(bio);
            if (isrecommendation) {
                d3.select('#item-info-controls')
                    .append('p')
                    .classed('buttons', true)
                    .attr('onclick', 'addRecommendation("' + itemname + '");')
                    .append('a')
                    .classed('lfmButton lfmBigButton lfmAddButton', true)
                    .append('strong')
                    .text('Add to Your Library');
            }
        });
};

userInfo = function(userName, isActiveUser, activeuser) {
    
};