var lastfm = {

    api : {

        chrome : {

            album : {
                addTags : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'album.addTags',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                getBuylinks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'album.getBuylinks',
                        params      : params
                    },
                    callback);
                },
                getInfo : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'album.getInfo',
                        params      : params
                    },
                    callback);
                },
                getShouts : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'album.getShouts',
                        params      : params
                    },
                    callback);
                },
                getTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'album.getTags',
                        params      : params
                    },
                    callback);
                },
                getTopTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'album.getTopTags',
                        params      : params
                    },
                    callback);
                },
                removeTag : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'album.removeTag',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                search : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'album.search',
                        params      : params
                    },
                    callback);
                },
                share : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'album.share',
                        session     : session,
                        params      : params
                    },
                    callback);
                }
            },

            artist : {
                addTags : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.addTags',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                getCorrection : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.getCorrection',
                        params      : params
                    },
                    callback);
                },
                getEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.getEvents',
                        params      : params
                    },
                    callback);
                },
                getInfo : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.getInfo',
                        params      : params
                    },
                    callback);
                },
                getPastEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.getPastEvents',
                        params      : params
                    },
                    callback);
                },
                getPodcast : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.getPodcast',
                        params      : params
                    },
                    callback);
                },
                getShouts : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.getShouts',
                        params      : params
                    },
                    callback);
                },
                getSimilar : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.getSimilar',
                        params      : params
                    },
                    callback);
                },
                getTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.getTags',
                        params      : params
                    },
                    callback);
                },
                getTopAlbums : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.getTopAlbums',
                        params      : params
                    },
                    callback);
                },
                getTopFans : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.getTopFans',
                        params      : params
                    },
                    callback);
                },
                getTopTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.getTopTags',
                        params      : params
                    },
                    callback);
                },
                getTopTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.getTopTracks',
                        params      : params
                    },
                    callback);
                },
                removeTag : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.removeTag',
                        params      : params
                    },
                    callback);
                },
                search : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.search',
                        params      : params
                    },
                    callback);
                },
                share : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.share',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                shout : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'artist.shout',
                        session     : session,
                        params      : params
                    },
                    callback);
                }
            },

            auth : {
                getMobileSession : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'auth.getMobileSession',
                        params      : params
                    },
                    callback);
                },
                getSession : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'auth.getSession',
                        params      : params
                    },
                    callback);
                },
                getToken : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'auth.getToken',
                        params      : params
                    },
                    callback);
                }
            },

            chart : {
                getHypedArtists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'chart.getHypedArtists',
                        params      : params
                    },
                    callback);
                },
                getHypedTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'chart.getHypedTracks',
                        params      : params
                    },
                    callback);
                },
                getLovedTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'chart.getLovedTracks',
                        params      : params
                    },
                    callback);
                },
                getTopArtists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'chart.getTopArtists',
                        params      : params
                    },
                    callback);
                },
                getTopTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'chart.getTopTags',
                        params      : params
                    },
                    callback);
                },
                getTopTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'chart.getTopTracks',
                        params      : params
                    },
                    callback);
                }
            },

            event : {
                attend : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'event.attend',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                getAttendees : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'event.getAttendees',
                        params      : params
                    },
                    callback);
                },
                getInfo : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'event.getInfo',
                        params      : params
                    },
                    callback);
                },
                getShouts : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'event.getShouts',
                        params      : params
                    },
                    callback);
                },
                share : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'event.share',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                shout : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'event.shout',
                        session     : session,
                        params      : params
                    },
                    callback);
                }
            },

            geo : {
                getEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'geo.getEvents',
                        params      : params
                    },
                    callback);
                },
                getMetroArtistChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'geo.getMetroArtistChart',
                        params      : params
                    },
                    callback);
                },
                getMetroHypeArtistChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'geo.getMetroHypeArtistChart',
                        params      : params
                    },
                    callback);
                },
                getMetroHypeTrackChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'geo.getMetroHypeTrackChart',
                        params      : params
                    },
                    callback);
                },
                getMetroTrackChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'geo.getMetroTrackChart',
                        params      : params
                    },
                    callback);
                },
                getMetroUniqueArtistChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'geo.getMetroUniqueArtistChart',
                        params      : params
                    },
                    callback);
                },
                getMetroUniqueTrackChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'geo.getMetroUniqueTrackChart',
                        params      : params
                    },
                    callback);
                },
                getMetroWeeklyChartlist : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'geo.getMetroWeeklyChartlist',
                        params      : params
                    },
                    callback);
                },
                getMetros : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'geo.getMetros',
                        params      : params
                    },
                    callback);
                },
                getTopArtists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'geo.getTopArtists',
                        params      : params
                    },
                    callback);
                },
                getTopTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'geo.getTopTracks',
                        params      : params
                    },
                    callback);
                }
            },

            group : {
                getHype : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'group.getHype',
                        params      : params
                    },
                    callback);
                },
                getMembers : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'group.getMembers',
                        params      : params
                    },
                    callback);
                },
                getWeeklyAlbumChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'group.getWeeklyAlbumChart',
                        params      : params
                    },
                    callback);
                },
                getWeeklyArtistChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'group.getWeeklyArtistChart',
                        params      : params
                    },
                    callback);
                },
                getWeeklyChartList : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'group.getWeeklyChartList',
                        params      : params
                    },
                    callback);
                },
                getWeeklyTrackChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'group.getWeeklyTrackChart',
                        params      : params
                    },
                    callback);
                }
            },

            library : {
                addAlbum : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'library.addAlbum',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                addArtist : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'library.addArtist',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                addTrack : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'library.addTrack',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                getAlbums : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'library.getAlbums',
                        params  : params
                    },
                    callback);
                },
                getArtists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'library.getArtists',
                        params  : params
                    },
                    callback);
                },
                getTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'library.getTracks',
                        params  : params
                    },
                    callback);
                },
                removeAlbum : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'library.removeAlbum',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                removeArtist : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'library.removeArtist',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                removeScrobble : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'library.removeScrobble',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                removeTrack : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'library.removeTrack',
                        session : session,
                        params  : params
                    },
                    callback);
                }
            },

            playlist : {
                addTrack : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'playlist.addTrack',
                        session : session,
                        params  : params
                    },
                    callback);
                },
                create : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'playlist.create',
                        session : session,
                        params  : params
                    },
                    callback);
                }
            },

            radio : {
                getPlaylist : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'radio.getPlaylist',
                        params    : params
                    },
                    callback);
                },
                search : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'radio.search',
                        params    : params
                    },
                    callback);
                },
                tune : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'radio.search',
                        session : session,
                        params  : params
                    },
                    callback);
                }
            },

            tag : {
                getInfo : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'tag.getInfo',
                        params    : params
                    },
                    callback);
                },
                getSimilar : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'tag.getSimilar',
                        params    : params
                    },
                    callback);
                },
                getTopAlbums : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'tag.getTopAlbums',
                        params    : params
                    },
                    callback);
                },
                getTopArtists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'tag.getTopArtists',
                        params    : params
                    },
                    callback);
                },
                getTopTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'tag.getTopTags',
                        params    : params
                    },
                    callback);
                },
                getTopTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'tag.getTopTracks',
                        params    : params
                    },
                    callback);
                },
                getWeeklyArtistChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'tag.getWeeklyArtistChart',
                        params    : params
                    },
                    callback);
                },
                getWeeklyChartList : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'tag.getWeeklyChartList',
                        params    : params
                    },
                    callback);
                },
                search : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'tag.search',
                        params    : params
                    },
                    callback);
                }
            },

            tasteometer : {
                compare : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'tasteometer.compare',
                        params    : params
                    },
                    callback);
                },
                compareGroup : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'tasteometer.compareGroup',
                        params    : params
                    },
                    callback);
                }
            },

            track : {
                addTags : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.addTags',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                ban : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.ban',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                getBuylinks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.getWeeklyTrackChart',
                        params      : params
                    },
                    callback);
                },
                getCorrection : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.getCorrection',
                        params      : params
                    },
                    callback);
                },
                getFingerprintMetaparams : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.getFingerprintMetaparams',
                        params      : params
                    },
                    callback);
                },
                getInfo : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.getInfo',
                        params      : params
                    },
                    callback);
                },
                getShouts : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.getShouts',
                        params      : params
                    },
                    callback);
                },
                getSimilar : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.getSimilar',
                        params      : params
                    },
                    callback);
                },
                getTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.getTags',
                        params      : params
                    },
                    callback);
                },
                getTopFans : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.getTopFans',
                        params      : params
                    },
                    callback);
                },
                getTopTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.getTopTags',
                        params      : params
                    },
                    callback);
                },
                love : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.love',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                removeTag : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.removeTag',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                scrobble : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.scrobble',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                search : function(params, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.search',
                        params      : params
                    },
                    callback);
                },
                share : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.share',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                unban : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.unban',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                unlove : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.unlove',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                updateNowPlaying : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'track.updateNowPlaying',
                        session     : session,
                        params      : params
                    },
                    callback);
                }
            },

            user : {
                getArtistTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getArtistTracks',
                        params    : params
                    },
                    callback);
                },
                getBannedTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getBannedTracks',
                        params    : params
                    },
                    callback);
                },
                getEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getEvents',
                        params    : params
                    },
                    callback);
                },
                getFriends : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getFriends',
                        params    : params
                    },
                    callback);
                },
                getInfo : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getInfo',
                        params    : params
                    },
                    callback);
                },
                getLovedTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getLovedTracks',
                        params    : params
                    },
                    callback);
                },
                getNeighbours : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getNeighbours',
                        params    : params
                    },
                    callback);
                },
                getNewReleases : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getNewReleases',
                        params    : params
                    },
                    callback);
                },
                getPastEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getPastEvents',
                        params    : params
                    },
                    callback);
                },
                getPersonalTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getPersonalTags',
                        params    : params
                    },
                    callback);
                },
                getPlaylists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getPlaylists',
                        params    : params
                    },
                    callback);
                },
                getRecentStations : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getRecentStations',
                        params    : params
                    },
                    callback);
                },
                getRecentTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getRecentTracks',
                        params  : params
                    },
                    callback);
                },
                getRecommendedArtists : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'user.getRecommendedArtists',
                        session     : session,
                        params      : params
                    },
                    callback);
                },
                getRecommendedEvents : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getRecommendedEvents',
                        session     : session,
                        params  : params
                    },
                    callback);
                },
                getShouts : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getShouts',
                        params  : params
                    },
                    callback);
                },
                getTopAlbums : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getTopAlbums',
                        params  : params
                    },
                    callback);
                },
                getTopArtists : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getTopArtists',
                        params    : params
                    },
                    callback);
                },
                getTopTags : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getTopTags',
                        params    : params
                    },
                    callback);
                },
                getTopTracks : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getTopTracks',
                        params    : params
                    },
                    callback);
                },
                getWeeklyAlbumChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getWeeklyAlbumChart',
                        params    : params
                    },
                    callback);
                },
                getWeeklyArtistChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getWeeklyArtistChart',
                        params    : params
                    },
                    callback);
                },
                getWeeklyChartList : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getWeeklyChartList',
                        params    : params
                    },
                    callback);
                },
                getWeeklyTrackChart : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'user.getWeeklyTrackChart',
                        params    : params
                    },
                    callback);
                },
                shout : function(params, session, callback) {
                    chrome.extension.sendMessage({
                        action      : 'user.shout',
                        session     : session,
                        params      : params
                    },
                    callback);
                }
            },

            venue : {
                getEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'venue.getEvents',
                        params    : params
                    },
                    callback);
                },
                getPastEvents : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'venue.getPastEvents',
                        params    : params
                    },
                    callback);
                },
                search : function(params, callback) {
                    chrome.extension.sendMessage({
                        action  : 'venue.search',
                        params    : params
                    },
                    callback);
                }
            }
        }
    }
};