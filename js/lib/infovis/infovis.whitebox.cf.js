function Whitebox(data, layout) {
    
    this.USERS      = ((data)?data.users:[]);
    this.ITEMS      = ((data)?data.items:[]);
    this.COLOURS    = {
        active : ((layout)?layout.active:'blue'),
        clicked : ((layout)?layout.clicked:'red'),
        mouseover : ((layout)?layout.mouseover:'red')
    };
    this.TENSION = ((layout)?layout.tension:Number(0.85));
    
    /**
     * @param {Object} params
     * @returns {undefined}
     */
    this.setLayout = function(params) {
        this.COLOURS['mouseover']  = params.mouseover + '-mouseover';
        this.COLOURS['clicked']    = params.clicked + '-clicked';
        this.COLOURS['active']     = params.active + '-active';
        this.TENSION = params.tension;
        return;
    };
    
    this.setData = function (data) {
        this.ITEMS = data.items;
        this.USERS = data.users;
        return;
    };
    
    /**
     * <p>
     * Clears the SVG element under #chart, as well as the .item-info and
     * #users elements.
     * </p>
     * @returns {unresolved}
     */
    this.destroy = function() {
        d3.select(".item-info").remove();
        jQuery("#users").html('');
        d3.select('svg').remove();
        return;
    };
    
    /**
     * <p>
     * Creates a new SVG visualization using the D3.js library.
     * </p>
     * @returns {Whitebox.create}
     */
    this.create = function() {
        var w = 500,
        h = w,
        rx = w / 2,
        ry = h / 2,
        userMap = {},
        activeuser;

        var cluster = d3.layout.cluster()
            .size([360, ry - 120])
            .sort(function(a, b) {
                return d3.ascending(a.key, b.key);
            });

        var bundle = d3.layout.bundle();

        var line = d3.svg.line.radial()
                .interpolate("bundle")
                .tension(this.TENSION)
                .radius(function(d) {
                    return d.y;
                })
                .angle(function(d) {
                    return d.x / 180 * Math.PI;
                });

        var div = d3.select("#chart");

        var svg = div.append("svg:svg")
                .attr("width", w)
                .attr("height", h)
                .append("svg:g")
                .attr("transform", "translate(" + rx + "," + ry + ")");

        this.USERS.forEach(function(user) {
            userMap[user.name] = {
                active  : user.active,
                items   : [],
                name    : user.name
            };
            user.owned.forEach(function(item) {
                userMap[user.name].items.push(item.split(".")[1]);
            });
            if (user.active) activeuser = user.name;
        });

        var packages = {
            root: function(items) {
                var map = {};

                function find(name, data) {
                    var node = map[name], i;
                    if (!node) {
                        node = map[name] = data || {name: name, children: []};
                        if (name.length) {
                            node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                            node.parent.children.push(node);
                            node.key = name.substring(i + 1);
                        }
                    }
                    return node;
                }

                items.forEach(function(d) {
                    find(d.name, d);
                });

                return map[""];
            },
            edges: function(nodes) {
                var map = {},
                    edges = [];

                nodes.forEach(function(d) {
                    map[d.name] = d;
                });

                nodes.forEach(function(d) {
                    if (d.edges)
                        d.edges.forEach(function(i) {
                            var temp    = i.split(".user.");
                            var target  = temp[0];
                            var owner   = temp[1];

                            edges.push({
                                source  : map[d.name],
                                target  : map[target],
                                owner   : owner,
                                active  : userMap[owner].active
                            });
                        });
                });
                return edges;
            }
        };

        createGraph(this.ITEMS, this.COLOURS, this.TENSION);
        createUserList(this.USERS, this.COLOURS);

        function createGraph(items, colours) {
            var nodes = cluster.nodes(packages.root(items)),
                links = packages.edges(nodes),
                splines = bundle(links);

            var path = svg.selectAll("path.link")
                    .data(links)
                    .enter().append("svg:path")
                    .attr("class", function(d) {
                        return "link source-" + d.source.key
                                + " target-" + d.target.key
                                + " link-owner-" + d.owner
                                + ((d.active)?(" link-activeuser " + colours['active']):"")
                                + " " + colours['mouseover']
                                + " " + colours['clicked'];
                    })
                    .attr("d", function(d, i) {
                        return line(splines[i]);
                    });

            svg.selectAll("g.node")
                    .data(nodes.filter(function(n) {
                        return !n.children;
                    }))
                    .enter()
                    .append("svg:g")
                    .attr("class", function(d) {
                        var users = "";
                        d.owners.forEach(function(i) {
                            users += " node-owner-" + i;
                        });
                        console.log(d.name + "[ recommendation == " + d.recommendation + "]");
                        return "node" + users + " "
                            + colours['mouseover'] + " "
                            + colours['clicked'] + " "
                            + ((d.recommendation)?"":(" node-activeuser " + colours['active']));
                    })
                    .attr("id", function(d) {
                        return "node-" + d.key;
                    })
                    .attr("transform", function(d) {
                        return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
                    })
                    .append("svg:text")
                    .attr("dx", function(d) {
                        return d.x < 180 ? 8 : -8;
                    })
                    .attr("dy", ".31em")
                    .attr("text-anchor", function(d) {
                        return d.x < 180 ? "start" : "end";
                    })
                    .attr("transform", function(d) {
                        return d.x < 180 ? null : "rotate(180)";
                    })
                    .text(function(d) {
                        return decodeItemName(d.key);
                    })
                    .on("mouseover", mouseoverItem)
                    .on("mouseout", mouseoutItem)
                    .on("click", clickItem);

            d3.select("input[type=range]").on("change", function() {
                line.tension(this.value / 100);
                path.attr("d", function(d, i) {
                    return line(splines[i]);
                });
            });
        }

        function createUserList(data, colours) {
            var neighbours = [];
            var activeuser = [];
            
            data.forEach(function (item) {
                if (! item.active) neighbours.push(item);
                else activeuser.push(item);
            });
            
            d3.select("#users").append("h3")
                .attr('id', 'users-active-user')
                .text('Active user');
            var ul1 = d3.select("#users").append("ul");
            ul1.selectAll("li")
                .data(activeuser)
                .enter()
                .append("li")
                .attr("class", function(user) {
                    var itemClasses = "";
                    userMap[user.name].items.forEach(function (item) {
                        itemClasses += " user-owns-" + item + " ";
                    });
                    return "user user-activeuser " + colours['active']
                            + " " + itemClasses + " "
                            + colours['mouseover'] + " " + colours['clicked'];
                })
                .attr("id", function(user) {
                    return "user-" + user.name;
                })
                .text(function(user) {
                    return user.name;
                })
                .on("click", clickUser)
                .on("mouseover", mouseoverUser)
                .on("mouseout", mouseoutUser);
            
            
            d3.select("#users").append("h3")
                .attr('id', 'users-neighbours')
                .text('Neighbours');
            var ul2 = d3.select("#users").append("ul");
            ul2.selectAll("li")
                .data(neighbours)
                .enter()
                .append("li")
                .attr("class", function(user) {
                    var itemClasses = "";
                    userMap[user.name].items.forEach(function (item) {
                        itemClasses += " user-owns-" + item + " ";
                    });
                    return "user " + itemClasses + " "
                        + colours['mouseover'] + " " + colours['clicked'];
                })
                .attr("id", function(user) {
                    return "user-" + user.name;
                })
                .text(function(user) {
                    return user.name;
                })
                .on("click", clickUser)
                .on("mouseover", mouseoverUser)
                .on("mouseout", mouseoutUser);
        }

        function mouseoverItem(d) {
            svg.selectAll("path.link.target-" + d.key)
                    .classed("target", true)
                    .each(updateNodes("source", true));
            
            svg.selectAll("path.link.source-" + d.key)
                    .classed("source", true)
                    .each(updateNodes("target", true));

            jQuery(".user-owns-" + d.key)
                .addClass("user-item-mouseover");
        }

        function mouseoutItem(d) {
            svg.selectAll("path.link.source-" + d.key)
                    .classed("source", false)
                    .each(updateNodes("target", false));
            
            svg.selectAll("path.link.target-" + d.key)
                    .classed("target", false)
                    .each(updateNodes("source", false));

            jQuery(".user-owns-" + d.key)
                .removeClass("user-item-mouseover");
        }
        
        function updateNodes(name, value) {
            return function(d) {
                if (value) this.parentNode.appendChild(this);
                svg.select("#node-" + d[name].key).classed(name, value);
            };
        }
        
        function itemSelect(d) {
            svg.selectAll("path.link.target-" + d.key)
                .classed("link-item-clicked", true);
            svg.selectAll("path.link.source-" + d.key)
                .classed("link-item-clicked", true);
            svg.select("#node-" + d.key)
                .classed("node-item-clicked item-clicked", true);
            itemInfoDiv(d.key, d.recommendation);
            jQuery(".user-owns-" + d.key)
                .addClass("user-item-clicked");
        }
        
        function itemInfoDiv(itemName, isRecommendation) {
            var div = d3.select('#item-info')
                .append('div')
                .classed('item-info', true)
                .attr('id', 'item-' + itemName);
            div.append('h3')
                .classed("item-recommendation", isRecommendation)
                .text(decodeItemName(itemName));
            div.append('div')
                .attr('id', 'item-info-description');
            div.append('div')
                .attr('id', 'item-info-controls');
            itemInfo(decodeItemName(itemName), isRecommendation, activeuser);
        }
        
        function decodeItemName(artistname) {
            return artistname.toString().replace(/_/g, " ");
        }
    
        function encodeItemName(artistname) {
            return artistname.toString().replace(/ /g, "_");
        }
        
        function itemDeselect(d) {
            svg.selectAll(".node-item-clicked")
                .classed("node-item-clicked", false);
            svg.selectAll(".link-item-clicked")
                .classed("link-item-clicked", false);
            svg.selectAll(".item-clicked")
                .classed("item-clicked", false);
            jQuery(".user-item-clicked")
                .removeClass("user-item-clicked");
            jQuery(".item-info")
                .remove();
        }
        
        function clickItem(d) {
            if (svg.selectAll(".item-clicked").empty() && jQuery(".user-clicked").length === 0) {
                itemSelect(d);
            } else if (jQuery(".user-clicked").length !== 0) {
                svg.selectAll(".node-user-clicked")
                    .classed("node-user-clicked", false);
                svg.selectAll(".link-user-clicked")
                    .classed("link-user-clicked", false);
                jQuery(".user-clicked")
                    .removeClass("user-clicked");
                jQuery(".user-info")
                    .remove();
                
                itemSelect(d);
            } else if (svg.select("#node-" + d.key).classed("item-clicked")) {
                itemDeselect(d);
            } else {
                itemDeselect(d);
                itemSelect(d);
            }
        }

        function mouseoverUser(user) {
            svg.selectAll("path.link.link-owner-" + user.name)
                    .classed("target", true)
                    .each(updateNodes("source", true));
            
            svg.selectAll("path.link.link-owner-" + user.name)
                    .classed("source", true)
                    .each(updateNodes("target", true));
            
            svg.select("#node-owner-" + user.name)
                .classed("node-user-mouseover user-mouseover", true);
        
            jQuery("#user-" + user.name).addClass("user-mouseover");
        }

        function mouseoutUser(user) {
            svg.selectAll("path.link.link-owner-" + user.name)
                    .classed("source", false)
                    .each(updateNodes("target", false));
            
            svg.selectAll("path.link.link-owner-" + user.name)
                    .classed("target", false)
                    .each(updateNodes("source", false));

            svg.selectAll(".node-user-mouseover")
                    .classed("node-user-mouseover", false);
            
            jQuery("#user-" + user.name).removeClass("user-mouseover");
        }
    
        function userSelect(user) {
            svg.selectAll(".link-owner-" + user.name)
                .classed("link-user-clicked", true);
            svg.selectAll(".node-owner-" + user.name)
                .classed("node-user-clicked", true);
            jQuery("#user-" + user.name)
                .addClass("user-clicked");
            userInfoDiv(user.name, user.active);
        }
        
        function userInfoDiv(userName, isActiveUser) {
            var div = d3.select('#user-info')
                .append('div')
                .classed('user-info', true)
                .attr('id', 'user-info-' + decodeUserName(userName));
            div.append('h3')
                .classed("user-info-active", isActiveUser)
                .text(decodeUserName(userName));
            div.append('div')
                .attr('id', 'user-info-description');
            div.append('div')
                .attr('id', 'user-info-controls');
            userInfo(decodeUserName(userName), isActiveUser, activeuser);
        }
        
        function decodeUserName(username) {
            return username;
        }
        
        function userDeselect(user) {
            svg.selectAll(".link-user-clicked")
                .classed("link-user-clicked", false);
            svg.selectAll(".node-user-clicked")
                .classed("node-user-clicked", false);
            jQuery(".user-clicked")
                .removeClass("user-clicked");
            jQuery(".user-info")
                .remove();
        }

        function clickUser(user) {
            if (svg.selectAll(".item-clicked").empty() && jQuery(".user-clicked").length === 0) {
                userSelect(user);
            } else if (! svg.selectAll(".item-clicked").empty()) {
                svg.selectAll(".node-item-clicked")
                    .classed("node-item-clicked", false);
                svg.selectAll(".link-item-clicked")
                    .classed("link-item-clicked", false);
                svg.selectAll(".item-clicked")
                    .classed("item-clicked", false);
                jQuery(".user-item-clicked")
                    .removeClass("user-item-clicked");
                jQuery(".item-info")
                    .remove();

                userSelect(user);
            } else if (jQuery("#user-" + user.name).hasClass("user-clicked")) {
                userDeselect(user);
            } else {
                userDeselect(user);
                userSelect(user);
            }
        }
        
        return;
    };

    /**
     * <p>
     * Clears all the selections from the visualization.
     * </p>
     * @returns {undefined}
     */
    this.clearSelection = function() {
        var svg = d3.select ('#chart svg');
        
        svg.selectAll(".node-item-clicked")
            .classed("node-item-clicked", false);
        svg.selectAll(".link-item-clicked")
            .classed("link-item-clicked", false);
        svg.selectAll(".item-clicked")
            .classed("item-clicked", false);
        jQuery(".user-item-clicked")
            .removeClass("user-item-clicked");
        jQuery(".item-info")
            .remove();
        
        svg.selectAll(".link-user-clicked")
            .classed("link-user-clicked", false);
        svg.selectAll(".node-user-clicked")
            .classed("node-user-clicked", false);
        jQuery(".user-clicked")
            .removeClass("user-clicked");
        jQuery(".user-info")
            .remove();
    
        return;
    };
};
