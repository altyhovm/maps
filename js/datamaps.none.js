!function () {
    function a(a, b, c) {
        "undefined" == typeof c && (c = b, optionsValues = void 0);
        var d = "undefined" != typeof a ? a : b;
        if ("undefined" == typeof d)return null;
        if ("function" == typeof d) {
            var e = [c];
            return c.geography && (e = [c.geography, c.data]), d.apply(null, e)
        }
        return d
    }

    function b(a, b, c) {
        return this.svg = n.select(a).append("svg").attr("width", c || a.offsetWidth).attr("data-width", c || a.offsetWidth).attr("class", "datamap").attr("height", b || a.offsetHeight).style("overflow", "hidden"), this.options.responsive && (n.select(this.options.element).style({
            position: "relative",
            "padding-bottom": "60%"
        }), n.select(this.options.element).select("svg").style({
            position: "absolute",
            width: "100%",
            height: "100%"
        }), n.select(this.options.element).select("svg").select("g").selectAll("path").style("vector-effect", "non-scaling-stroke")), this.svg
    }

    function c(a, b) {
        var c, d, e = b.width || a.offsetWidth, f = b.height || a.offsetHeight, g = this.svg;
        return b && "undefined" == typeof b.scope && (b.scope = "world"), "usa" === b.scope ? c = n.geo.albersUsa().scale(e).translate([e / 2, f / 2]) : "world" === b.scope && (c = n.geo[b.projection]().scale((e + 1) / 2 / Math.PI).translate([e / 2, f / ("mercator" === b.projection ? 1.45 : 1.8)])), "orthographic" === b.projection && (g.append("defs").append("path").datum({type: "Sphere"}).attr("id", "sphere").attr("d", d), g.append("use").attr("class", "stroke").attr("xlink:href", "#sphere"), g.append("use").attr("class", "fill").attr("xlink:href", "#sphere"), c.scale(250).clipAngle(90).rotate(b.projectionConfig.rotation)), d = n.geo.path().projection(c), {
            path: d,
            projection: c
        }
    }

    function d() {
        n.select(".datamaps-style-block").empty() && n.select("head").append("style").attr("class", "datamaps-style-block").html('.datamap path.datamaps-graticule { fill: none; stroke: #777; stroke-width: 0.5px; stroke-opacity: .5; pointer-events: none; } .datamap .labels {pointer-events: none;} .datamap path {stroke: #FFFFFF; stroke-width: 1px;} .datamaps-legend dt, .datamaps-legend dd { float: left; margin: 0 3px 0 0;} .datamaps-legend dd {width: 20px; margin-right: 6px; border-radius: 3px;} .datamaps-legend {padding-bottom: 20px; z-index: 1001; position: absolute; left: 4px; font-size: 12px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;} .datamaps-hoverover {display: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; } .hoverinfo {padding: 4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; } .hoverinfo hr {border:1px dotted #CCC; }')
    }

    function e(b) {
        var c = this.options.fills, d = this.options.data || {}, e = this.options.geographyConfig, f = this.svg.select("g.datamaps-subunits");
        f.empty() && (f = this.addLayer("datamaps-subunits", null, !0));
        var g = o.feature(b, b.objects[this.options.scope]).features;
        e.hideAntarctica && (g = g.filter(function (a) {
            return "ATA" !== a.id
        }));
        var h = f.selectAll("path.datamaps-subunit").data(g);
        h.enter().append("path").attr("d", this.path).attr("class", function (a) {
            return "datamaps-subunit " + a.id
        }).attr("data-info", function (a) {
            return JSON.stringify(d[a.id])
        }).style("fill", function (b) {
            var e, f = d[b.id];
            return f && f.fillKey && (e = c[a(f.fillKey, {
                data: d[b.id],
                geography: b
            })]), "undefined" == typeof e && (e = a(f && f.fillColor, c.defaultFill, {data: d[b.id], geography: b})), e
        }).style("stroke-width", e.borderWidth).style("stroke", e.borderColor)
    }

    function f() {
        function b() {
            this.parentNode.appendChild(this)
        }

        var c = this.svg, d = this, e = this.options.geographyConfig;
        (e.highlightOnHover || e.popupOnHover) && c.selectAll(".datamaps-subunit").on("mouseover", function (f) {
            var g = n.select(this), h = d.options.data[f.id] || {};
            if (e.highlightOnHover) {
                var i = {
                    fill: g.style("fill"),
                    stroke: g.style("stroke"),
                    "stroke-width": g.style("stroke-width"),
                    "fill-opacity": g.style("fill-opacity")
                };
                g.style("fill", a(h.highlightFillColor, e.highlightFillColor, h)).style("stroke", a(h.highlightBorderColor, e.highlightBorderColor, h)).style("stroke-width", a(h.highlightBorderWidth, e.highlightBorderWidth, h)).style("fill-opacity", a(h.highlightFillOpacity, e.highlightFillOpacity, h)).attr("data-previousAttributes", JSON.stringify(i)), /((MSIE)|(Trident))/.test || b.call(this)
            }
            e.popupOnHover && d.updatePopup(g, f, e, c)
        }).on("mouseout", function () {
            var a = n.select(this);
            if (e.highlightOnHover) {
                var b = JSON.parse(a.attr("data-previousAttributes"));
                for (var c in b)a.style(c, b[c])
            }
            a.on("mousemove", null), n.selectAll(".datamaps-hoverover").style("display", "none")
        })
    }

    function g(a, b) {
        if (b = b || {}, this.options.fills) {
            var c = "<dl>", d = "";
            b.legendTitle && (c = "<h2>" + b.legendTitle + "</h2>" + c);
            for (var e in this.options.fills) {
                if ("defaultFill" === e) {
                    if (!b.defaultFillName)continue;
                    d = b.defaultFillName
                } else d = b.labels && b.labels[e] ? b.labels[e] : e + ": ";
                c += "<dt>" + d + "</dt>", c += '<dd style="background-color:' + this.options.fills[e] + '">&nbsp;</dd>'
            }
            c += "</dl>", n.select(this.options.element).append("div").attr("class", "datamaps-legend").html(c)
        }
    }

    function h() {
        var a = n.geo.graticule();
        this.svg.insert("path", ".datamaps-subunits").datum(a).attr("class", "datamaps-graticule").attr("d", this.path)
    }

    function i(b, c, d) {
        var e = this;
        if (this.svg, !c || c && !c.slice)throw"Datamaps Error - arcs must be an array";
        for (var f = 0; f < c.length; f++)c[f] = l(c[f], c[f].options), delete c[f].options;
        "undefined" == typeof d && (d = p.arcConfig);
        var g = b.selectAll("path.datamaps-arc").data(c, JSON.stringify), h = n.geo.path().projection(e.projection);
        g.enter().append("svg:path").attr("class", "datamaps-arc").style("stroke-linecap", "round").style("stroke", function (b) {
            return a(b.strokeColor, d.strokeColor, b)
        }).style("fill", "none").style("stroke-width", function (b) {
            return a(b.strokeWidth, d.strokeWidth, b)
        }).attr("d", function (b) {
            var c = e.latLngToXY(a(b.origin.latitude, b), a(b.origin.longitude, b)), f = e.latLngToXY(a(b.destination.latitude, b), a(b.destination.longitude, b)), g = [(c[0] + f[0]) / 2, (c[1] + f[1]) / 2];
            if (d.greatArc) {
                var i = n.geo.greatArc().source(function (b) {
                    return [a(b.origin.longitude, b), a(b.origin.latitude, b)]
                }).target(function (b) {
                    return [a(b.destination.longitude, b), a(b.destination.latitude, b)]
                });
                return h(i(b))
            }
            var j = a(b.arcSharpness, d.arcSharpness, b);
            return "M" + c[0] + "," + c[1] + "S" + (g[0] + 50 * j) + "," + (g[1] - 75 * j) + "," + f[0] + "," + f[1]
        }).transition().delay(100).style("fill", function (b) {
            var c = this.getTotalLength();
            return this.style.transition = this.style.WebkitTransition = "none", this.style.strokeDasharray = c + " " + c, this.style.strokeDashoffset = c, this.getBoundingClientRect(), this.style.transition = this.style.WebkitTransition = "stroke-dashoffset " + a(b.animationSpeed, d.animationSpeed, b) + "ms ease-out", this.style.strokeDashoffset = "0", "none"
        }), g.exit().transition().style("opacity", 0).remove()
    }

    function j(a, b) {
        var c = this;
        b = b || {};
        var d = this.projection([-67.707617, 42.722131]);
        this.svg.selectAll(".datamaps-subunit").attr("data-foo", function (e) {
            var f = c.path.centroid(e), g = 7.5, h = 5;
            ["FL", "KY", "MI"].indexOf(e.id) > -1 && (g = -2.5), "NY" === e.id && (g = -1), "MI" === e.id && (h = 18), "LA" === e.id && (g = 13);
            var i, j;
            i = f[0] - g, j = f[1] + h;
            var k = ["VT", "NH", "MA", "RI", "CT", "NJ", "DE", "MD", "DC"].indexOf(e.id);
            if (k > -1) {
                var l = d[1];
                i = d[0], j = l + k * (2 + (b.fontSize || 12)), a.append("line").attr("x1", i - 3).attr("y1", j - 5).attr("x2", f[0]).attr("y2", f[1]).style("stroke", b.labelColor || "#000").style("stroke-width", b.lineWidth || 1)
            }
            return a.append("text").attr("x", i).attr("y", j).style("font-size", (b.fontSize || 10) + "px").style("font-family", b.fontFamily || "Verdana").style("fill", b.labelColor || "#000").text(e.id), "bar"
        })
    }

    function k(b, c, d) {
        function e(a) {
            return "undefined" != typeof a && "undefined" != typeof a.latitude && "undefined" != typeof a.longitude
        }

        var f = this, g = this.options.fills, h = this.svg;
        if (!c || c && !c.slice)throw"Datamaps Error - bubbles must be an array";
        var i = b.selectAll("circle.datamaps-bubble").data(c, JSON.stringify);
        i.enter().append("svg:circle").attr("class", "datamaps-bubble").attr("cx", function (a) {
            var b;
            return e(a) ? b = f.latLngToXY(a.latitude, a.longitude) : a.centered && (b = f.path.centroid(h.select("path." + a.centered).data()[0])), b ? b[0] : void 0
        }).attr("cy", function (a) {
            var b;
            return e(a) ? b = f.latLngToXY(a.latitude, a.longitude) : a.centered && (b = f.path.centroid(h.select("path." + a.centered).data()[0])), b ? b[1] : void 0
        }).attr("r", 0).attr("data-info", function (a) {
            return JSON.stringify(a)
        }).style("stroke", function (b) {
            return a(b.borderColor, d.borderColor, b)
        }).style("stroke-width", function (b) {
            return a(b.borderWidth, d.borderWidth, b)
        }).style("fill-opacity", function (b) {
            return a(b.fillOpacity, d.fillOpacity, b)
        }).style("fill", function (b) {
            var c = g[a(b.fillKey, d.fillKey, b)];
            return c || g.defaultFill
        }).on("mouseover", function (b) {
            var c = n.select(this);
            if (d.highlightOnHover) {
                var e = {
                    fill: c.style("fill"),
                    stroke: c.style("stroke"),
                    "stroke-width": c.style("stroke-width"),
                    "fill-opacity": c.style("fill-opacity")
                };
                c.style("fill", a(b.highlightFillColor, d.highlightFillColor, b)).style("stroke", a(b.highlightBorderColor, d.highlightBorderColor, b)).style("stroke-width", a(b.highlightBorderWidth, d.highlightBorderWidth, b)).style("fill-opacity", a(b.highlightFillOpacity, d.highlightFillOpacity, b)).attr("data-previousAttributes", JSON.stringify(e))
            }
            d.popupOnHover && f.updatePopup(c, b, d, h)
        }).on("mouseout", function () {
            var a = n.select(this);
            if (d.highlightOnHover) {
                var b = JSON.parse(a.attr("data-previousAttributes"));
                for (var c in b)a.style(c, b[c])
            }
            n.selectAll(".datamaps-hoverover").style("display", "none")
        }).transition().duration(400).attr("r", function (b) {
            return a(b.radius, d.radius, b)
        }), i.exit().transition().delay(d.exitDelay).attr("r", 0).remove()
    }

    function l(a) {
        return Array.prototype.slice.call(arguments, 1).forEach(function (b) {
            if (b)for (var c in b)null == a[c] && (a[c] = b[c])
        }), a
    }

    function m(a) {
        if ("undefined" == typeof n || "undefined" == typeof o)throw new Error("Include d3.js (v3.0.3 or greater) and topojson on this page before creating a new map");
        return this.options = l(a, p), this.options.geographyConfig = l(a.geographyConfig, p.geographyConfig), this.options.projectionConfig = l(a.projectionConfig, p.projectionConfig), this.options.bubblesConfig = l(a.bubblesConfig, p.bubblesConfig), this.options.arcConfig = l(a.arcConfig, p.arcConfig), n.select(this.options.element).select("svg").length > 0 && b.call(this, this.options.element, this.options.height, this.options.width), this.addPlugin("bubbles", k), this.addPlugin("legend", g), this.addPlugin("arc", i), this.addPlugin("labels", j), this.addPlugin("graticule", h), this.options.disableDefaultStyles || d(), this.draw()
    }

    var n = window.d3, o = window.topojson, p = {
        scope: "world",
        responsive: !1,
        setProjection: c,
        projection: "equirectangular",
        dataType: "json",
        data: {},
        done: function () {
        },
        fills: {defaultFill: "#ABDDA4"},
        geographyConfig: {
            dataUrl: null,
            hideAntarctica: !0,
            borderWidth: 1,
            borderColor: "#FDFDFD",
            popupTemplate: function (a) {
                return '<div class="hoverinfo"><strong>' + a.properties.name + "</strong></div>"
            },
            popupOnHover: !0,
            highlightOnHover: !0,
            highlightFillColor: "#FC8D59",
            highlightBorderColor: "rgba(250, 15, 160, 0.2)",
            highlightBorderWidth: 2
        },
        projectionConfig: {rotation: [97, 0]},
        bubblesConfig: {
            borderWidth: 2,
            borderColor: "#FFFFFF",
            popupOnHover: !0,
            radius: null,
            popupTemplate: function (a, b) {
                return '<div class="hoverinfo"><strong>' + b.name + "</strong></div>"
            },
            fillOpacity: .75,
            animate: !0,
            highlightOnHover: !0,
            highlightFillColor: "#FC8D59",
            highlightBorderColor: "rgba(250, 15, 160, 0.2)",
            highlightBorderWidth: 2,
            highlightFillOpacity: .85,
            exitDelay: 100
        },
        arcConfig: {strokeColor: "#DD1C77", strokeWidth: 1, arcSharpness: 1, animationSpeed: 600}
    };
    m.prototype.resize = function () {
        var a = this, b = a.options;
        if (b.responsive) {
            var c = "-webkit-transform"in document.body.style ? "-webkit-" : "-moz-transform"in document.body.style ? "-moz-" : "-ms-transform"in document.body.style ? "-ms-" : "", d = b.element.clientWidth, e = n.select(b.element).select("svg").attr("data-width");
            n.select(b.element).select("svg").selectAll("g").style(c + "transform", "scale(" + d / e + ")")
        }
    }, m.prototype.draw = function () {
        function a(a) {
            b.options.dataUrl && n[b.options.dataType](b.options.dataUrl, function (a) {
                if ("csv" === b.options.dataType && a && a.slice) {
                    for (var c = {}, d = 0; d < a.length; d++)c[a[d].id] = a[d];
                    a = c
                }
                Datamaps.prototype.updateChoropleth.call(b, a)
            }), e.call(b, a), f.call(b), (b.options.geographyConfig.popupOnHover || b.options.bubblesConfig.popupOnHover) && (hoverover = n.select(b.options.element).append("div").attr("class", "datamaps-hoverover").style("z-index", 10001).style("position", "absolute")), b.options.done(b)
        }

        var b = this, c = b.options, d = c.setProjection.apply(b, [c.element, c]);
        return this.path = d.path, this.projection = d.projection, c.geographyConfig.dataUrl ? n.json(c.geographyConfig.dataUrl, function (c, d) {
            if (c)throw new Error(c);
            b.customTopo = d, a(d)
        }) : a(this[c.scope + "Topo"] || c.geographyConfig.dataJson), this
    }, m.prototype.worldTopo = "__WORLD__", m.prototype.usaTopo = "__USA__", m.prototype.latLngToXY = function (a, b) {
        return this.projection([b, a])
    }, m.prototype.addLayer = function (a, b, c) {
        var d;
        return d = c ? this.svg.insert("g", ":first-child") : this.svg.append("g"), d.attr("id", b || "").attr("class", a || "")
    }, m.prototype.updateChoropleth = function (a) {
        var b = this.svg;
        for (var c in a)if (a.hasOwnProperty(c)) {
            var d, e = a[c];
            if (!c)continue;
            d = "string" == typeof e ? e : "string" == typeof e.color ? e.color : this.options.fills[e.fillKey], e === Object(e) && (this.options.data[c] = l(e, this.options.data[c] || {}), this.svg.select("." + c).attr("data-info", JSON.stringify(this.options.data[c]))), b.selectAll("." + c).transition().style("fill", d)
        }
    }, m.prototype.updatePopup = function (a, b, c) {
        var d = this;
        a.on("mousemove", null), a.on("mousemove", function () {
            var e = n.mouse(d.options.element);
            n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("top", e[1] + 30 + "px").html(function () {
                var d = JSON.parse(a.attr("data-info"));
                return c.popupTemplate(b, d)
            }).style("left", e[0] + "px")
        }), n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("display", "block")
    }, m.prototype.addPlugin = function (a, b) {
        var c = this;
        "undefined" == typeof m.prototype[a] && (m.prototype[a] = function (d, e, f, g) {
            var h;
            "undefined" == typeof g && (g = !1), "function" == typeof e && (f = e, e = void 0), e = l(e || {}, c.options[a + "Config"]), !g && this.options[a + "Layer"] ? (h = this.options[a + "Layer"], e = e || this.options[a + "Options"]) : (h = this.addLayer(a), this.options[a + "Layer"] = h, this.options[a + "Options"] = e), b.apply(this, [h, d, e]), f && f(h)
        })
    }, "function" == typeof define && define.amd ? define("datamaps", function (a) {
        return n = a("d3"), o = a("topojson"), m
    }) : window.Datamap = window.Datamaps = m, window.jQuery && (window.jQuery.fn.datamaps = function (a, b) {
        a = a || {}, a.element = this[0];
        var c = new m(a);
        return "function" == typeof b && b(c, a), this
    })
}();