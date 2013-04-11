var lastfm = {
    
    api : {

        chrome : {

            album : {
                addTags : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.album.addTags',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                getBuylinks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.album.getBuylinks',
                        params      : params
                    },
                    callback);
                },
                getInfo : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.album.getInfo',
                        params      : params
                    },
                    callback);
                },
                getShouts : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.album.getShouts',
                        params      : params
                    },
                    callback);
                },
                getTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.album.getTags',
                        params      : params
                    },
                    callback);
                },
                getTopTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.album.getTopTags',
                        params      : params
                    },
                    callback);
                },
                removeTag : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.album.removeTag',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                search : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.album.search',
                        params      : params
                    },
                    callback);
                },
                share : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.album.share',
                        session     : session,
                        params      : params
                    },
                    callback);
                }
            },

            artist : {
                addTags : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.addTags',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                getCorrection : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.getCorrection',
                        params      : params
                    },
                    callback);
                },
                getEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.getEvents',
                        params      : params
                    },
                    callback);
                },
                getInfo : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.getInfo',
                        params      : params
                    },
                    callback);
                },
                getPastEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.getPastEvents',
                        params      : params
                    },
                    callback);
                },
                getPodcast : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.getPodcast',
                        params      : params
                    },
                    callback);
                },
                getShouts : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.getShouts',
                        params      : params
                    },
                    callback);
                },
                getSimilar : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.getSimilar',
                        params      : params
                    },
                    callback);
                },
                getTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.getTags',
                        params      : params
                    },
                    callback);
                },
                getTopAlbums : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.getTopAlbums',
                        params      : params
                    },
                    callback);
                },
                getTopFans : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.getTopFans',
                        params      : params
                    },
                    callback);
                },
                getTopTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.getTopTags',
                        params      : params
                    },
                    callback);
                },
                getTopTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.getTopTracks',
                        params      : params
                    },
                    callback);
                },
                removeTag : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.removeTag',
                        params      : params
                    },
                    callback);
                },
                search : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.search',
                        params      : params
                    },
                    callback);
                },
                share : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.share',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                shout : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.artist.shout',
                        session     : session,
                        params      : params
                    },
                    callback);
                }
            },

            auth : {
                getMobileSession : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.auth.getMobileSession',
                        params      : params
                    },
                    callback);
                },
                getSession : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.auth.getSession',
                        params      : params
                    },
                    callback);
                },
                getToken : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.auth.getToken',
                        params      : params
                    },
                    callback);
                }
            },

            chart : {
                getHypedArtists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.chart.getHypedArtists',
                        params      : params
                    },
                    callback);
                },
                getHypedTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.chart.getHypedTracks',
                        params      : params
                    },
                    callback);
                },
                getLovedTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.chart.getLovedTracks',
                        params      : params
                    },
                    callback);
                },
                getTopArtists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.chart.getTopArtists',
                        params      : params
                    },
                    callback);
                },
                getTopTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.chart.getTopTags',
                        params      : params
                    },
                    callback);
                },
                getTopTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.chart.getTopTracks',
                        params      : params
                    },
                    callback);
                }
            },

            event : {
                attend : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.event.attend',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                getAttendees : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.event.getAttendees',
                        params      : params
                    },
                    callback);
                },
                getInfo : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.event.getInfo',
                        params      : params
                    },
                    callback);
                },
                getShouts : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.event.getShouts',
                        params      : params
                    },
                    callback);
                },
                share : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.event.share',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                shout : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.event.shout',
                        session     : session,
                        params      : params
                    },
                    callback);
                }
            },

            geo : {
                getEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.geo.getEvents',
                        params      : params
                    },
                    callback);
                },
                getMetroArtistChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.geo.getMetroArtistChart',
                        params      : params
                    },
                    callback);
                },
                getMetroHypeArtistChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.geo.getMetroHypeArtistChart',
                        params      : params
                    },
                    callback);
                },
                getMetroHypeTrackChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.geo.getMetroHypeTrackChart',
                        params      : params
                    },
                    callback);
                },
                getMetroTrackChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.geo.getMetroTrackChart',
                        params      : params
                    },
                    callback);
                },
                getMetroUniqueArtistChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.geo.getMetroUniqueArtistChart',
                        params      : params
                    },
                    callback);
                },
                getMetroUniqueTrackChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.geo.getMetroUniqueTrackChart',
                        params      : params
                    },
                    callback);
                },
                getMetroWeeklyChartlist : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.geo.getMetroWeeklyChartlist',
                        params      : params
                    },
                    callback);
                },
                getMetros : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.geo.getMetros',
                        params      : params
                    },
                    callback);
                },
                getTopArtists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.geo.getTopArtists',
                        params      : params
                    },
                    callback);
                },
                getTopTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.geo.getTopTracks',
                        params      : params
                    },
                    callback);
                }
            },

            group : {
                getHype : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.group.getHype',
                        params      : params
                    },
                    callback);
                },
                getMembers : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.group.getMembers',
                        params      : params
                    },
                    callback);
                },
                getWeeklyAlbumChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.group.getWeeklyAlbumChart',
                        params      : params
                    },
                    callback);
                },
                getWeeklyArtistChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.group.getWeeklyArtistChart',
                        params      : params
                    },
                    callback);
                },
                getWeeklyChartList : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.group.getWeeklyChartList',
                        params      : params
                    },
                    callback);
                },
                getWeeklyTrackChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.group.getWeeklyTrackChart',
                        params      : params
                    },
                    callback);
                }
            },

            library : {
                addAlbum : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.library.addAlbum',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                addArtist : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.library.addArtist',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                addTrack : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.library.addTrack',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                getAlbums : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.library.getAlbums',
                        params  : params
                    },
                    callback);
                },
                getArtists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.library.getArtists',
                        params  : params
                    },
                    callback);
                },
                getTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.library.getTracks',
                        params  : params
                    },
                    callback);
                },
                removeAlbum : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.library.removeAlbum',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                removeArtist : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.library.removeArtist',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                removeScrobble : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.library.removeScrobble',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                removeTrack : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.library.removeTrack',
                        session : session,
                        params  : params
                    },
                    callback);
                }
            },

            playlist : {
                addTrack : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.playlist.addTrack',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                create : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.playlist.create',
                        session : session,
                        params  : params
                    },
                    callback);
                }
            },

            radio : {
                getPlaylist : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.radio.getPlaylist',
                        params    : params
                    },
                    callback);
                },
                search : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.radio.search',
                        params    : params
                    },
                    callback);
                },
                tune : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.radio.search',
                        session : session,
                        params  : params
                    },
                    callback);
                }
            },

            tag : {
                getInfo : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.tag.getInfo',
                        params    : params
                    },
                    callback);
                },
                getSimilar : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.tag.getSimilar',
                        params    : params
                    },
                    callback);
                },
                getTopAlbums : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.tag.getTopAlbums',
                        params    : params
                    },
                    callback);
                },
                getTopArtists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.tag.getTopArtists',
                        params    : params
                    },
                    callback);
                },
                getTopTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.tag.getTopTags',
                        params    : params
                    },
                    callback);
                },
                getTopTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.tag.getTopTracks',
                        params    : params
                    },
                    callback);
                },
                getWeeklyArtistChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.tag.getWeeklyArtistChart',
                        params    : params
                    },
                    callback);
                },
                getWeeklyChartList : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.tag.getWeeklyChartList',
                        params    : params
                    },
                    callback);
                },
                search : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.tag.search',
                        params    : params
                    },
                    callback);
                }
            },

            tasteometer : {
                compare : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.tasteometer.compare',
                        params    : params
                    },
                    callback);
                },
                compareGroup : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.tasteometer.compareGroup',
                        params    : params
                    },
                    callback);
                }
            },

            track : {
                addTags : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.addTags',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                ban : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.ban',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                getBuylinks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.getWeeklyTrackChart',
                        params      : params
                    },
                    callback);
                },
                getCorrection : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.getCorrection',
                        params      : params
                    },
                    callback);
                },
                getFingerprintMetaparams : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.getFingerprintMetaparams',
                        params      : params
                    },
                    callback);
                },
                getInfo : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.getInfo',
                        params      : params
                    },
                    callback);
                },
                getShouts : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.getShouts',
                        params      : params
                    },
                    callback);
                },
                getSimilar : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.getSimilar',
                        params      : params
                    },
                    callback);
                },
                getTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.getTags',
                        params      : params
                    },
                    callback);
                },
                getTopFans : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.getTopFans',
                        params      : params
                    },
                    callback);
                },
                getTopTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.getTopTags',
                        params      : params
                    },
                    callback);
                },
                love : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.love',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                removeTag : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.removeTag',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                scrobble : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.scrobble',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                search : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.search',
                        params      : params
                    },
                    callback);
                },
                share : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.share',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                unban : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.unban',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                unlove : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.unlove',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                updateNowPlaying : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.track.updateNowPlaying',
                        session     : session,
                        params      : params
                    },
                    callback);
                }
            },

            user : {
                getArtistTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getArtistTracks',
                        params    : params
                    },
                    callback);
                },
                getBannedTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getBannedTracks',
                        params    : params
                    },
                    callback);
                },
                getEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getEvents',
                        params    : params
                    },
                    callback);
                },
                getFriends : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getFriends',
                        params    : params
                    },
                    callback);
                },
                getInfo : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getInfo',
                        params    : params
                    },
                    callback);
                },
                getLovedTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getLovedTracks',
                        params    : params
                    },
                    callback);
                },
                getNeighbours : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getNeighbours',
                        params    : params
                    },
                    callback);
                },
                getNewReleases : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getNewReleases',
                        params    : params
                    },
                    callback);
                },
                getPastEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getPastEvents',
                        params    : params
                    },
                    callback);
                },
                getPersonalTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getPersonalTags',
                        params    : params
                    },
                    callback);
                },
                getPlaylists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getPlaylists',
                        params    : params
                    },
                    callback);
                },
                getRecentStations : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getRecentStations',
                        params    : params
                    },
                    callback);
                },
                getRecentTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getRecentTracks',
                        params  : params
                    },
                    callback);
                },
                getRecommendedArtists : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.user.getRecommendedArtists',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                getRecommendedEvents : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getRecommendedEvents',
                        session     : session,
                        params  : params
                    },
                    callback);
                },
                getShouts : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getShouts',
                        params  : params
                    },
                    callback);
                },
                getTopAlbums : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getTopAlbums',
                        params  : params
                    },
                    callback);
                },
                getTopArtists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getTopArtists',
                        params    : params
                    },
                    callback);
                },
                getTopTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getTopTags',
                        params    : params
                    },
                    callback);
                },
                getTopTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getTopTracks',
                        params    : params
                    },
                    callback);
                },
                getWeeklyAlbumChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getWeeklyAlbumChart',
                        params    : params
                    },
                    callback);
                },
                getWeeklyArtistChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getWeeklyArtistChart',
                        params    : params
                    },
                    callback);
                },
                getWeeklyChartList : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getWeeklyChartList',
                        params    : params
                    },
                    callback);
                },
                getWeeklyTrackChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.user.getWeeklyTrackChart',
                        params    : params
                    },
                    callback);
                },
                shout : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'lastfm.user.shout',
                        session     : session,
                        params      : params
                    },
                    callback);
                }
            },

            venue : {
                getEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.venue.getEvents',
                        params    : params
                    },
                    callback);
                },
                getPastEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.venue.getPastEvents',
                        params    : params
                    },
                    callback);
                },
                search : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'lastfm.venue.search',
                        params    : params
                    },
                    callback);
                }
            }
        }
    }
};