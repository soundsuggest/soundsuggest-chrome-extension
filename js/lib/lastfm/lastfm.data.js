var RECOMMENDATIONS         = [];
var TOP_ARTISTS             = [];
var NEIGHBOURS              = [];
var ARTISTS                 = [];
var ACTIVE_USER             = [];
var LIMIT_TOP_ARTISTS       = 10;
var LIMIT_RECOMMENDATIONS   = 10;
var LIMIT_NEIGHBOURS        = 10;
var LIMIT_SIMILAR           = 5;
var dataSTRUCTURE           = {
    items : new Array(),
    users : new Array()
};
var INDEX_NEIGHBOUR         = 0;
var INDEX_ARTIST            = 0;
var SESSION_KEY;
var userDATA                = {};
var artistDATA              = {};
var THRESHOLD               = Number(0.1);
var LAST_FM                 = {};
var DEBUG                   = false;

/**
 * <p>Create the data structure.</p>
 * @param {Object} params object structure : { user, lastfm, key }
 * @param {Function} callback the function executed at the end of this script.
 */
lastfm_data = function(params, callback) {
    LAST_FM                 = params.lastfm;
    ACTIVE_USER             = params.user;
    LIMIT_NEIGHBOURS        = Number(params.limit_neighbours) || 10;
    LIMIT_RECOMMENDATIONS   = Number(params.limit_recommendations) || 10;
    LIMIT_SIMILAR           = Number(params.limit_similar) || 5;
    LIMIT_TOP_ARTISTS       = Number(params.limit_top_artists) || 10;
    THRESHOLD               = Number(params.threshold) || Number(0.1);
    DEBUG                   = params.debug || false;
    SESSION_KEY             = params.key;
    
    algorithm1(callback);
};

/**
 * The algorithm to construct the datastructure is as follows:
 * <pre>
 * recommendations = user.getRecommendedArtists (active_user)
 * topartists = user.getTopArtists (active_user)
 * artists = union (recommendations, topartists)
 * neighbours = user.getNeighbours (active_user)
 * 
 * FOR EACH topartist IN topartists
 *      dataArtists[topartist].push (active_user)
 *      dataUsers[active_user].push (topartist)
 * END-FOR
 * 
 * FOR EACH artist IN artists
 *      similar_artists = artist.getSimilar (artist)
 *      list.push (similar_artists)
 *      list.push (artist)
 * 	FOR EACH neighbour IN neighbours
 *          IF tasteometer.compare (neighbour, list) > threshold THEN
 *          	dataArtists[artist].push (neighbour)
 *          	dataUsers[neighbour].push (artist)
 *          END-IF
 *      END-FOR
 * END-FOR
 * </pre>
 * @param {function} callback
 * @returns {undefined}
 */
algorithm1 = function (callback) {
    // First start by loading all the data
    // The second step is constructing the first data structure
    // Then the next step is converting this into the final structure
    loadData0(callback);
};

function loadData0(callback) {
    LAST_FM.user.getNeighbours({
        user    : ACTIVE_USER,
        limit   : LIMIT_NEIGHBOURS
    }, {
        success : function(data) {
            NEIGHBOURS = data;
            loadData1(callback);
        },
        error : function(data) {}
    });
}

function loadData1(callback) {
    LAST_FM.user.getRecommendedArtists({
        user    : ACTIVE_USER,
        limit   : LIMIT_RECOMMENDATIONS
    },{
        key : SESSION_KEY
    }, {
        success : function(data) {
            RECOMMENDATIONS = data;
            loadData2(callback);
        },
        error : function(data) {}
    });
}

function loadData2(callback) {
    LAST_FM.user.getTopArtists({
        user    : ACTIVE_USER,
        limit   : LIMIT_TOP_ARTISTS
    }, {
        success : function(data) {
            TOP_ARTISTS = data;
            
            userDATA[ACTIVE_USER] = new Array();
            for (var i = 0; i < NEIGHBOURS.neighbours.user.length; i++) {
                userDATA[NEIGHBOURS.neighbours.user[i].name] = new Array();
            }
            
            for (var i = 0; i < RECOMMENDATIONS.recommendations.artist.length; i++) {
                artistDATA[RECOMMENDATIONS.recommendations.artist[i].name] = new Array();
                ARTISTS.push(RECOMMENDATIONS.recommendations.artist[i].name);
            }
            
            for (var i = 0; i < TOP_ARTISTS.topartists.artist.length; i++) {
                artistDATA[TOP_ARTISTS.topartists.artist[i].name] = new Array();
                artistDATA[TOP_ARTISTS.topartists.artist[i].name].push(ACTIVE_USER);
                ARTISTS.push(TOP_ARTISTS.topartists.artist[i].name);
                userDATA[ACTIVE_USER].push(TOP_ARTISTS.topartists.artist[i].name);
            }
            
            if (DEBUG) {
                console.log('ALL ARTISTS : ');
                for (var i = 0; i < ARTISTS.length; i++) {
                    console.log('ARTISTS[' + i + '] == ' + ARTISTS[i]);
                }
                console.log('ALL NEIGHBOURS : ');
                for (var i = 0; i < NEIGHBOURS.neighbours.user.length; i++) {
                    console.log('NEIGHBOURS.neighbours.user[' + i + '].name == ' + NEIGHBOURS.neighbours.user[i].name);
                }
            }
            
            // START ARTISTS FOR EACH
            artistsRecursive1(0, callback);
        },
        error : function(data) {}
    });
}

// OUTER LOOP : for each artist
function artistsRecursive1(index_artist, callback) {
    if (Number(index_artist) === Number(ARTISTS.length)) {
        // END OF FIRST ALGORITHM; START SECOND ALGORITHM
        algorithm2();
        if (DEBUG) printJSON();
        // RETURN STRUCTURE
        callback(dataSTRUCTURE);
        return;
    }
    
    LAST_FM.artist.getSimilar({
        artist  : ARTISTS[index_artist],
        limit   : LIMIT_SIMILAR
    }, {
        success : function(data) {
            var similarArtists = '';
            for (var i = 0; i < Number(data.similarartists.artist.length); i++) {
                similarArtists += data.similarartists.artist[i].name + ',';
            }
            artistsRecursive2(similarArtists + ARTISTS[index_artist], index_artist, 0, callback);
        },
        error : function(data) {}
    });
}

// INNER LOOP : for each neighbour
function artistsRecursive2(similarArtists, index_artist, index_neighbour, callback) {
    if (Number(index_neighbour) === Number(NEIGHBOURS.neighbours.user.length)) {
        // ITERATED THOURGH ALL NEIGHBOURS, start over for new artist.
        index_artist++;
        artistsRecursive1(index_artist, callback);
        return;
    }
    
    LAST_FM.tasteometer.compare({
        type1 : 'user',
        value1 : NEIGHBOURS.neighbours.user[index_neighbour].name,
        type2 : 'artists',
        value2 : similarArtists
    }, {
        success : function(data) {
            if (Number(data.comparison.result.score) > Number(THRESHOLD)) {
                artistDATA[ARTISTS[index_artist]].push(NEIGHBOURS.neighbours.user[index_neighbour].name);
                userDATA[NEIGHBOURS.neighbours.user[index_neighbour].name].push(ARTISTS[index_artist]);
            }
            index_neighbour++;
            artistsRecursive2(similarArtists, index_artist, index_neighbour, callback);
        },
        error : function(data) {}
    });
}

/**
 * The algorithm to construct the final data structure is as follows :
 * <pre>
 * FOR EACH a IN dataArtists.keys
 * 	FOR EACH u IN artistData.get (a)
 *          boolean isRecommendation = true
 *          artist.put ("name", "item." + a.name)
 *          IF u == active_user
 *          	isRecommendation = false
 *          END-IF
 *          FOR d IN userData.get (u)
 *          	JSON.append ("edges", "item." + d.name + ".user." + u.name)
 *          END-FOR
 *      END-FOR
 *      artist.put ("recommendation", isRecommendation)
 *      JSON.append ("items", artist)
 * END-FOR
 * 
 * FOR EACH u IN userData.keys
 * 	user.put ("name", u.name)
 * 	user.put ("active", user == active_user)
 * 	FOR EACH a IN userData.get (u)
 *          user.append ("owned", "item." + a.name)
 *      END-FOR
 *      JSON.append ("users", user)
 * END-FOR
 * </pre>
 * @returns {undefined}
 */
algorithm2 = function() {
    for (var key in artistDATA) {
        var artist = {
            name            : "item." + encodeItemName(key),
            recommendation  : true,
            edges           : new Array(),
            owners          : new Array()
        };
        for (var i = 0; i < artistDATA[key].length; i++) {
            var u = artistDATA[key][i];
            if (u === ACTIVE_USER) {
                artist.recommendation = false;
            }
            for (var j = 0; j < userDATA[u].length; j++) {
                artist.edges.push("item." + encodeItemName(userDATA[u][j]) + ".user." + u);
            }
            artist.owners.push(u);
        }
        dataSTRUCTURE.items.push(artist);
    }
    
    for (var key in userDATA) {
        var user = {
            name    : key,
            active  : ((key === ACTIVE_USER)?true:false),
            owned   : new Array()
        };
        for (var i = 0; i < userDATA[key].length; i++) {
            user.owned.push("item." + encodeItemName(userDATA[key][i]));
        }
        dataSTRUCTURE.users.push(user);
    }
};

function printJSON() {
    var t = "\t";
    console.log("{");
    
    // ITEMS : 
    console.log(t + "items : [");
    dataSTRUCTURE.items.forEach(function(item) {
        console.log(t + t + "{");
        console.log(t + t + t + "name : " + item.name + ",");
        console.log(t + t + t + "recommendation : " + item.recommendation + ",");
        console.log(t + t + t + "edges : [");
        item.edges.forEach(function (edge) {
            console.log(t + t + t + "" + edge + ",");
        });
        console.log(t + t + t + "]");
        console.log(t + t + "},");
    });
    console.log(t + "]");
    
    // USERS
    console.log(t + "users : [");
    dataSTRUCTURE.users.forEach(function(user) {
        console.log(t + t + "{");
        console.log(t + t + t + "name : " + user.name + ",");
        console.log(t + t + t + "active : " + user.active + ",");
        console.log(t + t + t + "owned : [");
        user.owned.forEach(function (item) {
            console.log(t + t + t + t + "" + item + ",");
        });
        console.log(t + t + t + "]");
        console.log(t + t + "},");
    });
    console.log(t + "]");
    
    console.log("}");
}


function encodeItemName(artistname) {
    return artistname.toString().replace(/ /g, "_");
}