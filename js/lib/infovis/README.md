SOUNDSUGGEST - DIGITAL PROTOTYPE
================================

This is the visualization that was created for the SoundSuggest application, using the D3.js JavaScript library. The data is static and contained in a JSON file with the following structure:

    {
        "items" :
        [
                    {
                            "name"  : "item.SOME_ARTIST",
                            "edges" :
                            [
                                    "item.SOME_ARTIST.user.SOME_USER",
                                    ...
                            ],
                            "owners" :
                            [
                            "SOME_USER",
                            ...
                            ],
                            "isrecommendation" : "BOOLEAN"
                    },
                    ...
            ],
            users :
            [
                    {
                            "name"      : "SOME_USER",
                            "active"    : BOOLEAN
                    },
                    ...
            ]
    }

For more information consult: http://soundsuggest.wordpress.com/
