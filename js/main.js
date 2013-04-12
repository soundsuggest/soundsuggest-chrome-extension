var SPINNER;
var WHITEBOX;
var SESSION_KEY;
var USERNAME;
var TOKEN;
var API_KEY = '828c109e6a54fffedad5177b194f7107';
var DEBUG   = true;

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
    header += '<button id="toggle-soundsuggest-content">show/hide</button>';
    
    content += '<div id="chart"><div id="spinner"></div></div>';
    content += '<div id="soundsuggest-controls">';
    content += '    <ul id="soundsuggest-controls-ul">';
    content += '        <li><a href="javascript:" id="open-help">Help</a></li>';
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
    
    $("#open-help").click(function() {
        $.fancybox.open({
            href : 'http://soundsuggest.wordpress.com/application/help/',
            type : 'iframe',
            padding : 5
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
            key : USERNAME
        }
    },
    function (a) {
        SESSION_KEY = a.value;
        if (DEBUG) console.log('SESSION_KEY == ' + SESSION_KEY);
        if (! SESSION_KEY) {
            TOKEN = $.url().param('token');
            if (! TOKEN) window.location = 'http://www.last.fm/api/auth/?api_key=' + API_KEY + '&cb=' + window.location;
            lastfm.api.chrome.auth.getSession({
                token      : TOKEN,
                username   : USERNAME,
                api_key    : API_KEY
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
 * @param {Event} e
 * @returns {undefined}
 */
function addRecommendation(e) {
    if (DEBUG) console.log("main.js#addRecommendation");
    var artist = e.target.children[0].innerHTML;
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
    if (DEBUG) console.log("main.js#itemInfo");
    lastfm.api.chrome.artist.getInfo({
        artist    : itemname,
        user      : user
    }, function(data) {
        var bio = data.artist.bio.summary;
        jQuery('#item-info-description')
            .append(bio);
        if (isrecommendation) {
            var div = d3.select('#item-info-controls')
                .append('div')
                .classed('soundsuggest-button', true)
                .attr('id', 'soundsuggest-button-add')
                .text('Add to Your Library');
            div.append('div')
                .classed('soundsuggest-button-parameter', true)
                .text(itemname);
            document.querySelector('#soundsuggest-button-add').addEventListener('click', addRecommendation);
        }
    });
};

userInfo = function(userName, isActiveUser, activeuser) {
    if (DEBUG) console.log("main.js#userInfo");
    var html = '';
    var userinfo;
    if (! isActiveUser) {
        lastfm.api.chrome.user.getInfo({
            user      : userName
        }, function(response1) {
            userinfo = response1;
            lastfm.api.chrome.tasteometer.compare({
                value1  : activeuser,
                value2  : userName,
                type1   : 'user',
                type2   : 'user'
            }, function(response2) {
                
                var score = Number(response2.comparison.result.score) * 100;
                
                html += '<p>The similarity score between you and ' + userName
                        + ' equals ' + score.toFixed(2)
                        + '%.</p>';
                html += '<p>Click <a href="' + userinfo.user.url
                        + '" target="_blank" title="' + userinfo.user.name
                        + '\'s profile">here</a> to visit the full profile.</p>';
                jQuery('#user-info-description')
                    .append(html);
            });
        });
    } else {
        // Active user's profile.
    }
};
