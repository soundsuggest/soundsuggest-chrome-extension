/* *****************************************************************************
 * main.js
 * 
 * Injects a new HTML layout into the http://www.last.fm/home/recs web page.
 * Method definitions for creating the visualization and providing interaction
 * with it.
 * 
 * Part of the SoundSuggest project. For more info consult:
 * http://soundsuggest.wordpress.com/ . Written by
 * Joris Schelfaut.
 * ****************************************************************************/

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

/**
 * The colours of each element in the visualization.
 * @type Object
 */
var COLOURS = {
    active      : 'green',
    mouseover   : 'blue',
    clicked     : 'red'
};

var DATA = {};

var LIMIT_NEIGHBOURS        = 10;
var LIMIT_TOPARTISTS        = 10;
var LIMIT_RECOMMENDATIONS   = 10;
var THRESHOLD               = Number(0.1);

/**
 * Whether or not the data and visualization has completed loading.
 * @type Boolean
 */
var DATA_LOADED = false;

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
    content += '        <li><a href="http://soundsuggest.wordpress.com/application/help/" target="_blank" id="open-help" class="soundsuggest-button">Help</a></li>';
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
            .on('click', open_settings);
};

/**
 * <p>
 * Loads the JSON data and instantiates a Whitebox object that
 * creates the visualization.
 * </p>
 * <p>
 * If no settings are given, retrieve the stored settings;
 * if no settings have been stored, use the defaults. Else,
 * use the given settings.
 * </p>
 * @param {Object} settings
 * @param {Object} colours
 * @returns {undefined}
 */
loadVisualization = function(settings, colours) {
    if (DEBUG) console.log("main.js#loadVisualization");
    if (! settings) {
        chrome.extension.sendMessage({
            action: 'storage.get',
            params: {
                key : 'soundsuggest_settings_data_' + USERNAME
            }
        },
        function(a) {
            var settings_data = a.value;
            if (settings_data) {
                LIMIT_NEIGHBOURS        = settings_data.limit_neighbours || LIMIT_NEIGHBOURS;
                LIMIT_TOPARTISTS        = settings_data.limit_top_artists || LIMIT_TOPARTISTS;
                LIMIT_RECOMMENDATIONS   = settings_data.limit_recommendations || LIMIT_RECOMMENDATIONS;
                THRESHOLD               = settings_data.threshold || THRESHOLD;
            }
            chrome.extension.sendMessage({
                action: 'lastfm.recommender.load',
                params: {
                    username: USERNAME,
                    settings : {
                        limit_neighbours : LIMIT_NEIGHBOURS,
                        limit_top_artists : LIMIT_TOPARTISTS,
                        limit_recommendations : LIMIT_RECOMMENDATIONS,
                        threshold : THRESHOLD
                    }
                }
            },
            function(data) {
                loadColours(data, colours);
            });
        });
    } else {
        chrome.extension.sendMessage({
            action: 'lastfm.recommender.load',
            params: {
                username: USERNAME,
                settings : settings
            }
        },
        function(data) {
            loadColours(data, colours);
        });
    }
};

redrawVisualization = function(colours) {
    loadWhitebox(DATA, colours);
};

/**
 * If no colour settings are given, load the settings from the stored settings,
 * or use defaults, if nothing was stored. Else, use the given settings.
 * @param {type} data
 * @param {type} colours
 * @returns {undefined}
 */
loadColours = function (data, colours) {
    if (! colours) {
        chrome.extension.sendMessage({
            action: 'storage.get',
            params: {
                key : 'soundsuggest-colours-' + USERNAME
            }
        },
        function(a) {
            loadWhitebox(data, a.value);
        });
    } else {
        loadWhitebox(data, colours);
    }
};

/**
 * Creates the Whitebox object.
 * @param {type} data
 * @param {type} colours
 * @returns {undefined}
 */
loadWhitebox = function (data, colours) {
    COLOURS = colours || COLOURS;
    DATA = data || DATA;
    SPINNER.stop();
    WHITEBOX = new Whitebox();
    WHITEBOX.setColours(COLOURS);
    WHITEBOX.setData(DATA);
    WHITEBOX.create();
    DATA_LOADED = true;
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
        var playcount = '';
        
        if (! isrecommendation) {
            playcount += '<p>You have listened to this artist <strong>'
                + data.artist.stats.userplaycount + '</strong> times.</p>';
        }
        jQuery('#item-info-description')
            .append('<p>' + bio + '</p>' + playcount);
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
    if (DATA_LOADED) {
        if (WHITEBOX) WHITEBOX.clearSelection();
    } else {
        alert('Please wait until the data has finished loading before changing any settings.');
    }
};

var old_limit_neighbours;
var old_limit_topartists;
var old_limit_recommendations;

open_settings = function () {
    
    clear_selection();
    old_limit_neighbours = LIMIT_NEIGHBOURS;
    old_limit_topartists = LIMIT_TOPARTISTS;
    old_limit_recommendations = LIMIT_RECOMMENDATIONS;
    
    function settings_header() {
        var html = '';
        html += '<div id="soundsuggest-settings-header">';
        html += '   <h3>SoundSuggest Settings</h3>';
        html += '</div>';
        return html;
    }
    
    function settings_data() {
        var html = '';
        html += '<div id="soundsuggest-settings-data">';
        html += '   <h4>Data</h4>';
        html += '   <table>';
        html += '       <tr>';
        html += '           <td class="settings-table-row-info">';
        html += '               Number of neighbours : <strong id="soundsuggest-amount-neighbours">' + LIMIT_NEIGHBOURS + '</strong>';
        html += '           </td>';
        html += '           <td class="settings-table-row-slider">';
        html += '               <div id="soundsuggest-settings-slider-neighbours"></div>';
        html += '           </td>';
        html += '       </tr>';
        html += '       <tr>';
        html += '           <td class="settings-table-row-info">';
        html += '               Number of top artists from the active user\'s profile : <strong id="soundsuggest-amount-topartists">' + LIMIT_TOPARTISTS + '</strong>';
        html += '           </td>';
        html += '           <td class="settings-table-row-slider">';
        html += '               <div id="soundsuggest-settings-slider-topartists"></div>';
        html += '           </td>';
        html += '       </tr>';
        html += '       <tr>';
        html += '           <td class="settings-table-row-info">';
        html += '               Number of recommendations : <strong id="soundsuggest-amount-recommendations">' + LIMIT_RECOMMENDATIONS + '</strong>';
        html += '           </td>';
        html += '           <td class="settings-table-row-slider">';
        html += '               <div id="soundsuggest-settings-slider-recommendations"></div>';
        html += '           </td>';
        html += '       </tr>';
        /*html += '       <tr>';
        html += '           <td class="settings-table-row-info">';
        html += '               Threshold : <strong id="soundsuggest-amount-threshold">' + THRESHOLD + '</strong>';
        html += '           </td>';
        html += '           <td class="settings-table-row-slider">';
        html += '               <div id="soundsuggest-settings-slider-threshold"></div>';
        html += '           </td>';
        html += '       </tr>';*/
        html += '   </table>';
        html += '</div>';
        return html;
    }
    
    function settings_colours() {
        var html = '';
        html += '<div id="soundsuggest-settings-colours">';
        html += '   <h4>Colours</h4>';
        html += '   <table>';
        html += '   <tr>';
        html += '       <td class="settings-table-row-info">';
        html += '           Active user and active user\'s items : ';
        html += '       </td>';
        html += '       <td>';
        html += '           <select id="colour-select-active-user">';
        html += '               <option value="blue" ' + ((COLOURS.active === 'blue')?'selected':'') + '>Blue</option>';
        html += '               <option value="green" ' + ((COLOURS.active === 'green')?'selected':'') + '>Green</option>';
        html += '               <option value="red" ' + ((COLOURS.active === 'red')?'selected':'') + '>Red</option>';
        html += '           </select>';
        html += '       </td>';
        html += '   </tr>';
        html += '   <tr>';
        html += '       <td class="settings-table-row-info">';
        html += '           Highlight for clicking on an item or user : ';
        html += '       </td>';
        html += '       <td>';
        html += '           <select id="colour-select-clicked">';
        html += '               <option value="blue" ' + ((COLOURS.clicked === 'blue')?'selected':'') + '>Blue</option>';
        html += '               <option value="green" ' + ((COLOURS.clicked === 'green')?'selected':'') + '>Green</option>';
        html += '               <option value="red" ' + ((COLOURS.clicked === 'red')?'selected':'') + '>Red</option>';
        html += '           </select>';
        html += '       </td>';
        html += '   </tr>';
        html += '   <tr>';
        html += '       <td class="settings-table-row-info">';
        html += '           Highlight for hovering over an item or user : ';
        html += '       </td>';
        html += '       <td>';
        html += '           <select id="colour-select-mouseover">';
        html += '               <option value="blue" ' + ((COLOURS.mouseover === 'blue')?'selected':'') + '>Blue</option>';
        html += '               <option value="green" ' + ((COLOURS.mouseover === 'green')?'selected':'') + '>Green</option>';
        html += '               <option value="red" ' + ((COLOURS.mouseover === 'red')?'selected':'') + '>Red</option>';
        html += '           </select>';
        html += '       </td>';
        html += '   </tr>';
        html += '   </table>';
        html += '</div>';
        return html;
    }
    
    function settings_controls() {
        var html = '';
        html += '<div id="soundsuggest-settings-controls">';
        html += '   <a href="javascript:" id="soundsuggest-settings-save" class="soundsuggest-button">';
        html += '       Save';
        html += '   </a>';
        html += '   <a href="javascript:" id="soundsuggest-settings-cancel" class="soundsuggest-button">';
        html += '       Cancel';
        html += '   </a>';
        html += '</div>';
        return html;
    }
    
    if (DATA_LOADED) {
        var html = '';
        html += '<div id="soundsuggest-overlay-shadow">';
        html += '   <div id="soundsuggest-overlay">';
        html += '       ' + settings_header();
        html += '       <div id="soundsuggest-settings-content">';
        html += '           <p>The current settings are selected. Change them as desired here :</p>';
        html += '           ' + settings_data();
        html += '           ' + settings_colours();
        html += '       </div>';
        html += '       ' + settings_controls();
        html += '   </div>';
        html += '</div>';
        jQuery('#soundsuggest')
            .append(html);
        
        jQuery("#soundsuggest-settings-slider-neighbours").slider({
            value:LIMIT_NEIGHBOURS,
            min: 5,
            max: 50,
            step: 5,
            slide: function(event, ui) {
                jQuery('#soundsuggest-amount-neighbours').html(ui.value);
                LIMIT_NEIGHBOURS = ui.value;
            }
        });
    
        jQuery("#soundsuggest-settings-slider-topartists").slider({
            value: LIMIT_TOPARTISTS,
            min: 5,
            max: 50,
            step: 5,
            slide: function(event, ui) {
                jQuery('#soundsuggest-amount-topartists').html(ui.value);
                LIMIT_TOPARTISTS = ui.value;
            }
        });
        
        jQuery("#soundsuggest-settings-slider-recommendations").slider({
            value: LIMIT_RECOMMENDATIONS,
            min: 5,
            max: 50,
            step: 5,
            slide: function(event, ui) {
                jQuery('#soundsuggest-amount-recommendations').html(ui.value);
                LIMIT_RECOMMENDATIONS = ui.value;
            }
        });
        
        /*jQuery("#soundsuggest-settings-slider-threshold").slider({
            value: THRESHOLD,
            min: 0.1,
            max: 0.9,
            step: 0.1,
            slide: function(event, ui) {
                jQuery('#soundsuggest-amount-threshold').html(ui.value);
                THRESHOLD = ui.value;
            }
        });*/
        
        d3.select('#soundsuggest-settings-save')
            .on('click', save_settings);
        d3.select('#soundsuggest-settings-cancel')
                .on('click', cancel_settings);
    } else {
        alert('Please wait until the data has finished loading before changing any settings.');
    }
};

cancel_settings = function () {
    jQuery('#soundsuggest-overlay-shadow')
        .remove()
        .delay(800)
        .fadeIn(400);
};

save_settings = function () {
    COLOURS.active      = jQuery('#colour-select-active-user').find(':selected').val();
    COLOURS.clicked     = jQuery('#colour-select-clicked').find(':selected').val();
    COLOURS.mouseover   = jQuery('#colour-select-mouseover').find(':selected').val();
    
    chrome.extension.sendMessage({
        action: 'storage.set',
        params: {
            key : 'soundsuggest-colours-' + USERNAME,
            value : COLOURS
        }
    },
    function(a) {
        jQuery('#soundsuggest-overlay-shadow')
            .remove()
            .delay(800)
            .fadeIn(400);
        WHITEBOX.destroy();
        DATA_LOADED = false;
        startSpinner();
        if (old_limit_neighbours === LIMIT_NEIGHBOURS
                && old_limit_topartists === LIMIT_TOPARTISTS
                && old_limit_recommendations === LIMIT_RECOMMENDATIONS) {
            redrawVisualization(COLOURS);
        } else {
            loadVisualization({
                limit_neighbours : LIMIT_NEIGHBOURS,
                limit_top_artists : LIMIT_TOPARTISTS,
                limit_recommendations : LIMIT_RECOMMENDATIONS,
                threshold : THRESHOLD
            }, COLOURS);
        }
    });
};