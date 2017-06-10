/*
 Highcharts JS v1.2.5 (2010-04-13)

 (c) 2010 Torstein Hnsi

 License: www.highcharts.com/license
*/
(function() {
    function jc(a) {
        if (!a || a.constructor != Array) a = [a];
        return a
    }
    function Qa(a) {
        return a !== ma && a !== null
    }
    function da() {
        var a = arguments,
        b, c;
        for (b = 0; b < a.length; b++) {
            c = a[b];
            if (Qa(c)) return c
        }
    }
    function Gb(a, b, c) {
        var d, e = "",
        f = c ? "print": "",
        g = function(i) {
            return V("style", {
                type: "text/css",
                media: i ? "print": ""
            },
            null, va.getElementsByTagName("HEAD")[0])
        };
        kc || (kc = g());
        for (d in b) e += Pb(d) + ":" + b[d] + ";";
        if (Ra) {
            b = va.styleSheets;
            c && g(true);
            for (c = b.length - 1; c >= 0 && b[c].media != f;) c--;
            f = b[c];
            f.addRule(a, e)
        } else kc.appendChild(va.createTextNode(a + " {" + e + "}\n"))
    }
    function H(a, b) {
        a || (a = {});
        for (var c in b) a[c] = b[c];
        return a
    }
    function Vc(a) {
        Ba = aa(Ba, a);
        Cc();
        return Ba
    }
    function Ca(a) {
        Qb || (Qb = V(Va));
        a && Qb.appendChild(a);
        Qb.innerHTML = ""
    }
    function ab(a, b) {
        var c = function() {};
        c.prototype = new a;
        H(c.prototype, b);
        return c
    }
    function Hb(a, b) {
        if (typeof a == "string") return a;
        else if (a.linearGradient) {
            var c = b.createLinearGradient.apply(b, a.linearGradient);
            p(a.stops,
            function(d) {
                c.addColorStop(d[0], d[1])
            });
            return c
        }
    }
    function V(a, b, c, d, e) {
        a = va.createElement(a);
        b && H(a, b);
        e && ra(a, {
            padding: 0,
            border: "none",
            margin: 0
        });
        c && ra(a, c);
        d && d.appendChild(a);
        return a
    }
    function ra(a, b) {
        if (Ra) if (b.opacity !== ma) b.filter = "alpha(opacity=" + b.opacity * 100 + ")";
        H(a.style, b)
    }
    function Wc(a, b, c, d) {
        var e = Ba.lang;
        a = a;
        var f = isNaN(b = Da(b)) ? 2 : b;
        b = c === ma ? e.decimalPoint: c;
        d = d === ma ? e.thousandsSep: d;
        e = a < 0 ? "-": "";
        c = parseInt(a = Da( + a || 0).toFixed(f)) + "";
        var g = (g = c.length) > 3 ? g % 3 : 0;
        return e + (g ? c.substr(0, g) + d: "") + c.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + d) + (f ? b + Da(a - c).toFixed(f).slice(2) : "")
    }
    function lc(a, b, c) {
        function d(y) {
            return y.toString().replace(/^([0-9])$/, "0$1")
        }
        if (!Qa(b)) return "Invalid date";
        b = new Date(b * Sa);
        var e = b[mc](),
        f = b[nc](),
        g = b[Ib](),
        i = b[Rb](),
        k = b[Sb](),
        j = Ba.lang,
        r = j.weekdays;
        j = j.months;
        b = {
            a: r[f].substr(0, 3),
            A: r[f],
            d: d(g),
            e: g,
            b: j[i].substr(0, 3),
            B: j[i],
            m: d(i + 1),
            y: k.toString().substr(2, 2),
            Y: k,
            H: d(e),
            I: d(e % 12 || 12),
            l: e % 12 || 12,
            M: d(b[oc]()),
            p: e < 12 ? "AM": "PM",
            P: e < 12 ? "am": "pm",
            S: d(b.getSeconds())
        };
        for (var v in b) a = a.replace("%" + v, b[v]);
        return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
    }
    function Cc() {
        var a = Ba.global.useUTC;
        Tb = a ? Date.UTC: function(b, c, d, e, f, g) {
            return (new Date(b, c, da(d, 1), da(e, 0), da(f, 0), da(g, 0))).getTime()
        };
        oc = a ? "getUTCMinutes": "getMinutes";
        mc = a ? "getUTCHours": "getHours";
        nc = a ? "getUTCDay": "getDay";
        Ib = a ? "getUTCDate": "getDate";
        Rb = a ? "getUTCMonth": "getMonth";
        Sb = a ? "getUTCFullYear": "getFullYear";
        Dc = a ? "setUTCMinutes": "setMinutes";
        Ec = a ? "setUTCHours": "setHours";
        pc = a ? "setUTCDate": "setDate";
        Fc = a ? "setUTCMonth": "setMonth";
        Gc = a ? "setUTCFullYear": "setFullYear"
    }
    function Hc(a) {
        for (var b = {
            x: a.offsetLeft,
            y: a.offsetTop
        }; a.offsetParent;) {
            a = a.offsetParent;
            b.x += a.offsetLeft;
            b.y += a.offsetTop;
            if (a != va.body && a != va.documentElement) {
                b.x -= a.scrollLeft;
                b.y -= a.scrollTop
            }
        }
        return b
    }
    function Xc(a) {
        function b(l, h) {
            var s;
            h = da(h, true);
            na(t, "addSeries", {
                options: l
            },
            function() {
                s = d(l);
                s.isDirty = true;
                t.isDirty = true;
                h && t.redraw()
            });
            return s
        }
        function c() {
            var l = t.isDirty;
            p(ya,
            function(h) {
                if (h.isDirty) {
                    h.cleanData();
                    h.getSegments();
                    if (h.options.legendType == "point") l = true
                }
            });
            Cb = null;
            if (Ub) {
                p(Ka,
                function(h) {
                    h.setScale()
                });
                j();
                p(Ka,
                function(h) {
                    h.isDirty && h.redraw()
                })
            }
            p(ya,
            function(h) {
                h.isDirty && h.visible && h.redraw()
            });
            if (l) {
                if (Jb && Jb.renderHTML) {
                    Jb.renderHTML(true);
                    Jb.drawGraphics(true)
                }
                t.isDirty = false
            }
            ub && ub.resetTracker && ub.resetTracker();
            na(t, "redraw")
        }
        function d(l) {
            var h = l.type || A.defaultSeriesType,
            s = bb[h],
            q = t.hasRendered;
            if (q) if (Ea && h == "column") s = Ic;
            else if (!Ea && h == "bar") s = Vb;
            h = new s;
            h.init(t, l);
            if (!q && h.inverted) Ea = true;
            if (h.isCartesian) Ub = h.isCartesian;
            ya.push(h);
            return h
        }
        function e() {
            var l = a.loading;
            if (!vb) {
                vb = V(Va, {
                    className: "highcharts-loading"
                },
                H(l.style, {
                    left: ga + F,
                    top: I + F,
                    width: sa + F,
                    height: ka + F,
                    zIndex: 10,
                    display: "none"
                }), oa);
                V("span", {
                    innerHTML: a.lang.loading
                },
                l.labelStyle, vb)
            }
            ra(vb, {
                display: ""
            });
            Db(vb, {
                opacity: l.style.opacity
            },
            {
                duration: l.showDuration
            })
        }
        function f() {
            Db(vb, {
                opacity: 0
            },
            {
                duration: a.loading.hideDuration,
                complete: function() {
                    ra(vb, {
                        display: "none"
                    })
                }
            })
        }
        function g(l) {
            var h, s, q;
            for (h = 0; h < Ka.length; h++) if (Ka[h].options.id == l) return Ka[h];
            for (h = 0; h < ya.length; h++) if (ya[h].options.id == l) return ya[h];
            for (h = 0; h < ya.length; h++) {
                q = ya[h].data;
                for (s = 0; s < q.length; s++) if (q[s].id == l) return q[s]
            }
            return null
        }
        function i() {
            var l = va.getElementById(qc);
            if (l) lb = Hc(l)
        }
        function k() {
            var l = a.xAxis || {},
            h = a.yAxis || {},
            s;
            l = jc(l);
            p(l,
            function(q, M) {
                q.index = M;
                q.isX = true
            });
            h = jc(h);
            p(h,
            function(q, M) {
                q.index = M
            });
            Ka = l.concat(h);
            t.xAxis = [];
            t.yAxis = [];
            Ka = qb(Ka,
            function(q) {
                s = new Fa(t, q);
                t[s.isXAxis ? "xAxis": "yAxis"].push(s);
                return s
            });
            j()
        }
        function j() {
            A.alignTicks !== false && p(Ka,
            function(l) {
                l.adjustTickAmount()
            })
        }
        function r() {
            var l = [];
            p(ya,
            function(h) {
                l = l.concat(Wb(h.data,
                function(s) {
                    return s.selected
                }))
            });
            return l
        }
        function v() {
            return Wb(ya,
            function(l) {
                return l.selected
            })
        }
        function y(l) {
            var h = Ba.lang;
            t.toolbar.add("zoom", h.resetZoom, h.resetZoomTitle,
            function() {
                na(t, "selection", {
                    resetSelection: true
                },
                y);
                t.toolbar.remove("zoom")
            }); ! l || l.resetSelection ? p(Ka,
            function(s) {
                s.setExtremes(null, null, false)
            }) : p(l.xAxis.concat(l.yAxis),
            function(s) {
                var q = s.axis;
                if (t.tracker[q.isXAxis ? "zoomX": "zoomY"]) q.setExtremes(s.min, s.max, false)
            });
            c()
        }
        function R() {
            var l = a.title,
            h = a.subtitle;
            if (!t.titleLayer) {
                var s = new pa("title-layer", oa, null, {
                    zIndex: 2
                });
                l && l.text && V("h2", {
                    className: "highcharts-title",
                    innerHTML: ""
                },
                l.style, s.div);
                h && h.text && V("h3", {
                    className: "highcharts-subtitle",
                    innerHTML: h.text
                },
                h.style, s.div);
                t.titleLayer = s
            }
        }
        function E() {
            var l = true;
            for (var h in t.resources) t.resources[h] || (l = false);
            l && K()
        }
        function K() {
            k();
            p(ya,
            function(l) {
                l.translate();
                l.setTooltipPoints();
                l.createArea()
            });
            t.render = Wa;
            setTimeout(function() {
                Wa();
                na(t, "load")
            },
            0)
        }
        function C() {
            Xa = A.renderTo;
            qc = "highcharts-" + rc++;
            if (typeof Xa == "string") Xa = va.getElementById(Xa);
            Xa.innerHTML = "";
            if (!Xa.offsetWidth) {
                rb = Xa.cloneNode(0);
                ra(rb, {
                    position: wa,
                    top: "-9999px",
                    display: ""
                });
                va.body.appendChild(rb)
            }
            var l = (rb || Xa).offsetHeight;
            mb = A.width || (rb || Xa).offsetWidth || 600;
            Ga = A.height || (l > I + cb ? l: 0) || 400;
            oa = V(Va, {
                className: "highcharts-container" + (A.className ? " " + A.className: ""),
                id: qc
            },
            H({
                position: Xb,
                overflow: db,
                width: mb + F,
                height: Ga + F,
                textAlign: "left"
            },
            A.style), rb || Xa)
        }
        function Wa() {
            var l, h = a.labels,
            s = a.credits;
            l = 2 * (A.borderWidth || 0) + (A.shadow ? 8 : 0);
            Jc.drawRect(l / 2, l / 2, mb - l, Ga - l, A.borderColor, A.borderWidth, A.borderRadius, A.backgroundColor, A.shadow);
            Jc.drawRect(ga, I, sa, ka, null, null, null, A.plotBackgroundColor, null, Yb); (new pa("plot-border", oa, null, {
                zIndex: 4
            })).drawRect(ga, I, sa, ka, A.plotBorderColor, A.plotBorderWidth, null, null, A.plotShadow);
            Ra && Gb(".highcharts-image-map", {
                display: "none"
            },
            "print");
            Ub && p(Ka,
            function(q) {
                q.render()
            });
            R();
            h.items && p(h.items,
            function() {
                var q = H({
                    className: "highcharts-label"
                },
                this.attributes);
                sc.drawHtml(this.html, q, H(h.style, this.style))
            });
            p(ya,
            function(q) {
                q.render()
            });
            Jb = t.legend = new nb(t);
            if (!t.toolbar) t.toolbar = Kb(t);
            if (s.enabled && !t.credits) t.credits = V("a", {
                className: "highcharts-credits",
                href: s.href,
                innerHTML: s.text,
                target: s.target
            },
            H(s.style, {
                zIndex: 8
            }), oa);
            t.hasRendered = true;
            if (rb) {
                Xa.appendChild(oa);
                Ca(rb);
                i()
            }
        }
        function La() {
            function l(h) {
                var s = h.attributes,
                q, M;
                if (s) {
                    q = s.length;
                    for (q = q - 1; q >= 0; q -= 1) {
                        M = s[q].name;
                        try {
                            if (typeof h[M] == "function") h[M] = null
                        } catch(ea) {}
                    }
                }
                if (s = h.childNodes) {
                    q = s.length;
                    for (q = q - 1; q >= 0; q--) {
                        s = h.childNodes[q];
                        l(s);
                        s.childNodes.length || Ca(s)
                    }
                }
            }
            p(ya,
            function(h) {
                h.destroy()
            });
            ya = [];
            l(oa)
        }
        function Fa(l, h) {
            function s() {
                h = aa(L ? Zb: tc, Y ? la ? Yc: Kc: la ? Zc: $c, h)
            }
            function q() {
                var m = [],
                n;
                Ma = Ta = null;
                $b = [];
                p(ya,
                function(u) {
                    n = false;
                    p(["xAxis", "yAxis"],
                    function(J) {
                        if ((J == "xAxis" && L || J == "yAxis" && !L) && (u.options[J] == h.index || u.options[J] === ma && h.index == 0)) {
                            u[J] = Ya;
                            $b.push(u);
                            n = true
                        }
                    });
                    if (!u.visible && A.ignoreHiddenSeries) n = false;
                    if (n) {
                        var x;
                        if (!L) {
                            x = u.options.stacking;
                            ac = x == "percent";
                            if (x) {
                                var z = m[u.type] || [];
                                m[u.type] = z
                            }
                            if (ac) {
                                Ma = 0;
                                Ta = 99
                            }
                        }
                        if (u.isCartesian) {
                            p(u.data,
                            function(J) {
                                var G = J.x,
                                ja = J.y;
                                if (Ma === null) Ma = Ta = J[wb];
                                if (L) if (G > Ta) Ta = G;
                                else {
                                    if (G < Ma) Ma = G
                                } else if (Qa(ja)) {
                                    if (x) z[G] = z[G] ? z[G] + ja: ja;
                                    J = z ? z[G] : ja;
                                    if (!ac) if (J > Ta) Ta = J;
                                    else if (J < Ma) Ma = J;
                                    if (x) eb[u.type][G] = {
                                        total: J,
                                        cum: J
                                    }
                                }
                            });
                            if (!L && /(area|column|bar)/.test(u.type)) if (Ma >= 0) {
                                Ma = 0;
                                Lc = true
                            } else if (Ta < 0) {
                                Ta = 0;
                                Mc = true
                            }
                        }
                    }
                })
            }
            function M(m, n, u) {
                var x = 1,
                z = 0;
                if (u) {
                    x *= -1;
                    z = sb
                }
                if (xb) {
                    x *= -1;
                    z -= x * sb
                }
                if (n) {
                    if (xb) m = sb - m;
                    m = m / yb + W
                } else m = x * (m - W) * yb + z;
                return m
            }
            function ea(m, n, u) {
                if (u) {
                    var x, z, J;
                    x = M(m);
                    var G;
                    m = z = x + bc;
                    x = J = Ga - x - bc;
                    if (Y) {
                        x = I;
                        J = Ga - cb;
                        if (m < ga || m > ga + sa) G = true
                    } else {
                        m = ga;
                        z = mb - fb;
                        if (x < I || x > I + ka) G = true
                    }
                    G || Nc.drawLine(m, x, z, J, n, u)
                }
            }
            function xa(m, n, u) {
                m = Lb(m, W);
                n = Math.min(n, ha);
                var x = (n - m) * yb;
                ea(m + (n - m) / 2, u, x)
            }
            function D(m, n, u, x, z, J, G) {
                var ja, ba, gb, N = h.labels;
                if (n == "inside") z = -z;
                if (la) z = -z;
                n = ba = M(m + zb) + bc;
                ja = gb = Ga - M(m + zb) - bc;
                if (Y) {
                    ja = Ga - cb - (la ? ka: 0) + Ua;
                    gb = ja + z
                } else {
                    n = ga + (la ? sa: 0) + Ua;
                    ba = n - z
                }
                x && Eb.drawLine(n, ja, ba, gb, u, x);
                if (J && N.enabled) if ((m = cc.call({
                    index: G,
                    isFirst: m == fa[0],
                    isLast: m == fa[fa.length - 1],
                    value: Ha && Ha[m] ? Ha[m] : m
                })) || m === 0) Eb.addText(m, n + N.x - (zb && Y ? zb * yb * (xb ? -1 : 1) : 0), ja + N.y - (zb && !Y ? zb * yb * (xb ? 1 : -1) : 0), N.style, N.rotation, N.align)
            }
            function ia(m, n) {
                var u;
                da(h.allowDecimals, true);
                Mb = n ? 1 : ta.pow(10, Za(ta.log(m) / ta.LN10));
                u = m / Mb;
                n || (n = [1, 2, 2.5, 5, 10]);
                for (var x = 0; x < n.length; x++) {
                    m = n[x];
                    if (u <= (n[x] + (n[x + 1] || n[x])) / 2) break
                }
                m *= Mb;
                return m
            }
            function U() {
                fa = [];
                for (var m = Ba.global.useUTC,
                n = 1E3 / Sa,
                u = 6E4 / Sa,
                x = 36E5 / Sa,
                z = 864E5 / Sa,
                J = 6048E5 / Sa,
                G = 2592E6 / Sa,
                ja = 31556952E3 / Sa,
                ba = [["second", n, [1, 2, 5, 10, 15, 30]], ["minute", u, [1, 2, 5, 10, 15, 30]], ["hour", x, [1, 2, 3, 4, 6, 8, 12]], ["day", z, [1, 2]], ["week", J, [1, 2]], ["month", G, [1, 2, 3, 4, 6]], ["year", ja, null]], gb = ba[6], N = gb[1], Z = gb[2], $a = 0; $a < ba.length; $a++) {
                    gb = ba[$a];
                    N = gb[1];
                    Z = gb[2];
                    if (ba[$a + 1]) {
                        var ad = (N * Z[Z.length - 1] + ba[$a + 1][1]) / 2;
                        if (Ia <= ad) break
                    }
                }
                if (N == ja && Ia < 5 * N) Z = [1, 2, 5];
                ba = ia(Ia / N, Z);
                var tb;
                Z = new Date(W * Sa);
                Z.setMilliseconds(0);
                if (N >= n) Z.setSeconds(N >= u ? 0 : ba * Za(Z.getSeconds() / ba));
                if (N >= u) Z[Dc](N >= x ? 0 : ba * Za(Z[oc]() / ba));
                if (N >= x) Z[Ec](N >= z ? 0 : ba * Za(Z[mc]() / ba));
                if (N >= z) Z[pc](N >= G ? 1 : ba * Za(Z[Ib]() / ba));
                if (N >= G) {
                    Z[Fc](N >= ja ? 0 : ba * Za(Z[Rb]() / ba));
                    tb = Z[Sb]()
                }
                if (N >= ja) {
                    tb -= tb % ba;
                    Z[Gc](tb)
                }
                N == J && Z[pc](Z[Ib]() - Z[nc]() + h.startOfWeek);
                $a = 1;
                n = Z.getTime() / Sa;
                tb = Z[Sb]();
                u = Z[Rb]();
                for (x = Z[Ib](); n < ha && $a < sa;) {
                    fa.push(n);
                    if (N == ja) n = Tb(tb + $a * ba, 0) / Sa;
                    else if (N == G) n = Tb(tb, u + $a * ba) / Sa;
                    else if (!m && (N == z || N == J)) n = Tb(tb, u, x + $a * ba * (N == z ? 1 : 7));
                    else n += N * ba;
                    $a++
                }
                fa.push(n);
                h.labels.formatter || (cc = function() {
                    return lc(h.dateTimeLabelFormats[gb[0]], this.value, 1)
                })
            }
            function X() {
                var m = function(x) {
                    var z = (Mb < 1 ? O(1 / Mb) : 1) * 10;
                    return O(x * z) / z
                },
                n;
                n = Za(W / Ia) * Ia;
                var u = ta.ceil(ha / Ia) * Ia;
                fa = [];
                for (n = m(n); n <= u;) {
                    fa.push(n);
                    n = m(n + Ia)
                }
                if (Ha) {
                    W -= 0.5;
                    ha += 0.5
                }
                cc || (cc = function() {
                    return this.value
                })
            }
            function ca() {
                hb ? U() : X();
                var m = fa[0],
                n = fa[fa.length - 1];
                if (h.startOnTick) W = m;
                else W > m && fa.shift();
                if (h.endOnTick) ha = n;
                else ha < n && fa.pop()
            }
            function za() {
                if (!hb && !Ha) {
                    var m = Fb,
                    n = fa.length;
                    Fb = Cb[wb];
                    if (n < Fb) {
                        for (; fa.length < Fb;) fa.push(fa[fa.length - 1] + Ia);
                        yb *= (n - 1) / (Fb - 1)
                    }
                    if (Qa(m) && Fb != m) Ya.isDirty = true
                }
            }
            function P() {
                var m, n, u, x = W,
                z = ha;
                m = h.maxZoom;
                var J;
                q();
                W = da(Oc, h.min, Ma);
                ha = da(Pc, h.max, Ta);
                if (ha - W < m) {
                    J = (m - ha + W) / 2;
                    W = Lb(W - J, da(h.min, W - J));
                    ha = ta.min(W + m, da(h.max, W + m))
                }
                if (!Ha && !ac) {
                    m = ha - W || 1;
                    if (!Qa(h.min) && Qc && (Ma < 0 || !Lc)) W -= m * Qc;
                    if (!Qa(h.max) && Rc && (Ta > 0 || !Mc)) ha += m * Rc
                }
                Ia = Ha || W == ha ? 1 : h.tickInterval == "auto" ? (ha - W) * h.tickPixelInterval / sb: h.tickInterval;
                if (!hb && h.tickInterval == "auto") Ia = ia(Ia);
                uc = h.minorTickInterval == "auto" && Ia ? Ia / 5 : h.minorTickInterval;
                ca();
                yb = sb / (ha - W || 1);
                Cb || (Cb = {
                    x: 0,
                    y: 0
                });
                if (!hb && fa.length > Cb[wb]) Cb[wb] = fa.length;
                if (!L) for (n in eb) for (u in eb[n]) eb[n][u].cum = eb[n][u].total;
                Ya.isDirty = W != x || ha != z
            }
            function Aa(m, n, u) {
                u = da(u, true);
                na(Ya, "setExtremes", {
                    min: m,
                    max: n
                },
                function() {
                    if (Ha) {
                        if (m < 0) m = 0;
                        if (n > Ha.length - 1) n = Ha.length - 1
                    }
                    Oc = m;
                    Pc = n;
                    u && l.redraw()
                })
            }
            function w(m, n) {
                Ha = m;
                da(n, true) && o()
            }
            function qa() {
                return {
                    min: W,
                    max: ha,
                    dataMin: Ma,
                    dataMax: Ta
                }
            }
            function S(m) {
                var n = m.width,
                u = n ? vc: wc;
                u.push(m);
                n ? ea(m.value, m.color, m.width) : xa(m.from, m.to, m.color)
            }
            function Na(m) {
                p([wc, vc],
                function(n) {
                    for (var u = 0; u < n.length; u++) if (n[u].id == m) {
                        n.splice(u, 1);
                        break
                    }
                });
                Q()
            }
            function o() {
                ub.resetTracker && ub.resetTracker();
                Q();
                p($b,
                function(m) {
                    m.isDirty = true
                })
            }
            function Q() {
                var m = h.title,
                n = h.alternateGridColor,
                u = h.minorTickWidth,
                x = h.lineWidth,
                z, J;
                z = $b.length && Qa(W) && Qa(ha);
                Eb.clear();
                Nc.clear();
                if (z) {
                    n && p(fa,
                    function(G, ja) {
                        if (ja % 2 == 0 && G < ha) xa(G, fa[ja + 1] !== ma ? fa[ja + 1] : ha, n)
                    });
                    p(wc,
                    function(G) {
                        xa(G.from, G.to, G.color)
                    });
                    if (uc && !Ha) for (z = W; z <= ha; z += uc) {
                        ea(z, h.minorGridLineColor, h.minorGridLineWidth);
                        u && D(z, h.minorTickPosition, h.minorTickColor, u, h.minorTickLength)
                    }
                    p(fa,
                    function(G, ja) {
                        J = G + zb;
                        ea(J, h.gridLineColor, h.gridLineWidth);
                        D(G, h.tickPosition, h.tickColor, h.tickWidth, h.tickLength, !(G == W && !h.showFirstLabel || G == ha && !h.showLastLabel), ja)
                    });
                    p(vc,
                    function(G) {
                        ea(G.value, G.color, G.width)
                    })
                }
                if (x) {
                    u = ga + (la ? sa: 0) + Ua;
                    z = Ga - cb - (la ? ka: 0) + Ua;
                    Eb.drawLine(Y ? ga: u, Y ? z: I, Y ? mb - fb: u, Y ? z: Ga - cb, h.lineColor, x)
                }
                if (m && m.enabled && m.text) {
                    x = Y ? ga: I;
                    u = Y ? sa: ka;
                    x = {
                        low: x + (Y ? 0 : u),
                        middle: x + u / 2,
                        high: x + (Y ? u: 0)
                    } [m.align];
                    u = (Y ? I + ka: ga) + (Y ? 1 : -1) * (la ? -1 : 1) * m.margin - (Ra ? parseInt(m.style.fontSize || m.style.font.replace(/^[a-z ]+/, "")) / 3 : 0);
                    Eb.addText(m.text, Y ? x: u + (la ? sa: 0) + Ua, Y ? u - (la ? ka: 0) + Ua: x, m.style, m.rotation || 0, {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } [m.align])
                }
                Eb.strokeText();
                Ya.isDirty = false
            }
            var L = h.isX,
            la = h.opposite,
            Y = Ea ? !L: L,
            eb = {
                bar: {},
                column: {},
                area: {},
                areaspline: {}
            };
            s();
            var Ya = this,
            hb = h.type == "datetime",
            Ua = h.offset || 0,
            wb = L ? "x": "y",
            sb = Y ? sa: ka,
            yb,
            bc = Y ? ga: cb,
            Eb = new pa("axis-layer", oa, null, {
                zIndex: 7
            }),
            Nc = new pa("grid-layer", oa, null, {
                zIndex: 1
            }),
            Ma,
            Ta,
            $b,
            Oc,
            Pc,
            ha = null,
            W = null,
            Qc = h.minPadding,
            Rc = h.maxPadding,
            Lc,
            Mc,
            ac,
            Sc = h.events,
            xc,
            wc = h.plotBands || [],
            vc = h.plotLines || [],
            Ia,
            uc,
            Mb,
            fa,
            Fb,
            cc = h.labels.formatter,
            Ha = h.categories || L && l.columnCount,
            xb = h.reversed,
            zb = Ha && h.tickmarkPlacement == "between" ? 0.5 : 0;
            if (Ea && L && xb === ma) xb = true;
            la || (Ua *= -1);
            if (Y) Ua *= -1;
            H(Ya, {
                addPlotBand: S,
                addPlotLine: S,
                adjustTickAmount: za,
                categories: Ha,
                getExtremes: qa,
                isXAxis: L,
                options: h,
                render: Q,
                setExtremes: Aa,
                setScale: P,
                setCategories: w,
                translate: M,
                redraw: o,
                removePlotBand: Na,
                removePlotLine: Na,
                reversed: xb,
                stacks: eb
            });
            for (xc in Sc) Oa(Ya, xc, Sc[xc]);
            P()
        }
        function Kb() {
            function l(M, ea, xa, D) {
                if (!q[M]) {
                    ea = V(Va, {
                        innerHTML: ea,
                        title: xa,
                        onclick: D
                    },
                    H(a.toolbar.itemStyle, {
                        zIndex: 1003
                    }), s.div);
                    q[M] = ea
                }
            }
            function h(M) {
                Ca(q[M]);
                q[M] = null
            }
            var s, q = {};
            s = new pa("toolbar", oa, null, {
                zIndex: 1004,
                width: "auto",
                height: "auto"
            });
            return {
                add: l,
                remove: h
            }
        }
        function ob(l, h) {
            function s(o) {
                o = o || Pa.event;
                if (!o.target) o.target = o.srcElement;
                if (!o.pageX) o.pageX = o.clientX + (va.documentElement.scrollLeft || va.body.scrollLeft);
                if (!o.pageY) o.pageY = o.clientY + (va.documentElement.scrollTop || va.body.scrollTop);
                return o
            }
            function q(o) {
                var Q = {
                    xAxis: [],
                    yAxis: []
                };
                p(Ka,
                function(L) {
                    var la = L.translate,
                    Y = L.isXAxis,
                    eb = Ea ? !Y: Y;
                    Q[Y ? "xAxis": "yAxis"].push({
                        axis: L,
                        value: la(eb ? o.pageX - lb.x - ga: ka - o.pageY + lb.y + I, true)
                    })
                });
                return Q
            }
            function M() {
                ib.onmousedown = function(o) {
                    o = s(o);
                    o.preventDefault && o.preventDefault();
                    l.mouseIsDown = Nb = true;
                    X = o.pageX;
                    ca = o.pageY;
                    if (Ub && (w || qa)) {
                        P || (P = V(Va, null, {
                            position: wa,
                            border: "none",
                            background: "#4572A7",
                            opacity: 0.25,
                            width: S ? 0 : sa + F,
                            height: Na ? 0 : ka + F
                        }));
                        sc.div.appendChild(P)
                    }
                };
                ib.onmousemove = function(o) {
                    o = s(o);
                    o.returnValue = false;
                    if (Nb) {
                        za = Math.sqrt(Math.pow(X - o.pageX, 2) + Math.pow(ca - o.pageY, 2)) > 10;
                        if (S) {
                            var Q = o.pageX - X;
                            ra(P, {
                                width: Da(Q) + F,
                                left: (Q > 0 ? 0 : Q) + X - lb.x - ga + F
                            })
                        }
                        if (Na) {
                            o = o.pageY - ca;
                            ra(P, {
                                height: Da(o) + F,
                                top: (o > 0 ? 0 : o) + +ca - lb.y - I + F
                            })
                        }
                    } else ea(o);
                    return false
                };
                ib.onmouseup = function() {
                    var o;
                    if (P) {
                        var Q = {
                            xAxis: [],
                            yAxis: []
                        },
                        L = P.offsetLeft,
                        la = P.offsetTop,
                        Y = P.offsetWidth,
                        eb = P.offsetHeight;
                        if (za) {
                            p(Ka,
                            function(Ya) {
                                var hb = Ya.translate,
                                Ua = Ya.isXAxis,
                                wb = Ea ? !Ua: Ua,
                                sb = hb(wb ? L: ka - la - eb, true);
                                hb = hb(wb ? L + Y: ka - la, true);
                                Q[Ua ? "xAxis": "yAxis"].push({
                                    axis: Ya,
                                    min: ta.min(sb, hb),
                                    max: Lb(sb, hb)
                                })
                            });
                            na(l, "selection", Q, y);
                            o = true
                        }
                        Ca(P);
                        P = null
                    }
                    l.mouseIsDown = Nb = za = false
                };
                ib.onmouseout = function(o) {
                    o = o || Pa.event;
                    if ((o = o.relatedTarget || o.toElement) && o != dc && o.tagName != "AREA") {
                        D();
                        l.mouseIsDown = Nb = za = false
                    }
                };
                ib.onclick = function(o) {
                    o = s(o);
                    o.cancelBubble = true;
                    if (!za) if (U && o.target.tagName == "AREA") {
                        var Q = U.plotX,
                        L = U.plotY;
                        H(U, {
                            pageX: lb.x + ga + (Ea ? sa - L: Q),
                            pageY: lb.y + I + (Ea ? ka - Q: L)
                        });
                        na(l.hoverSeries, "click", H(o, {
                            point: U
                        }));
                        U.firePointEvent("click", o)
                    } else {
                        H(o, q(o));
                        na(l, "click", o)
                    }
                    za = false
                }
            }
            function ea(o) {
                var Q = l.hoverPoint,
                L = l.hoverSeries;
                if (L) {
                    Q || (Q = L.tooltipPoints[Ea ? o.pageY - lb.y - I: o.pageX - lb.x - ga]);
                    if (Q && Q != U) {
                        U && U.firePointEvent("mouseOut");
                        Q.firePointEvent("mouseOver");
                        Ab && Ab.refresh(Q);
                        U = Q
                    }
                }
            }
            function xa() {
                var o = "highchartsMap" + bd++;
                l.imagemap = ib = V("map", {
                    name: o,
                    id: o,
                    className: "highcharts-image-map"
                },
                null, oa);
                dc = V("img", {
                    useMap: "#" + o
                },
                {
                    width: sa + F,
                    height: ka + F,
                    left: ga + F,
                    top: I + F,
                    opacity: 0,
                    border: "none",
                    position: wa,
                    clip: "rect(1px," + sa + "px," + ka + "px,1px)",
                    zIndex: 9
                },
                ib);
                if (!Ra) dc.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            }
            function D() {
                Ab && Ab.hide();
                if (l.hoverSeries) {
                    l.hoverSeries.setState();
                    U = l.hoverSeries = null
                }
            }
            function ia(o) {
                var Q = 0,
                L, la = ib.childNodes;
                for (L = 0; L < la.length; L++) if (la[L].isLegendArea) {
                    Q = L + 1;
                    break
                }
                ib.insertBefore(o, la[Q])
            }
            var U, X, ca, za, P, Aa = A.zoomType,
            w = /x/.test(Aa),
            qa = /y/.test(Aa),
            S = w && !Ea || qa && Ea,
            Na = qa && !Ea || w && Ea;
            xa();
            if (h.enabled) l.tooltip = Ab = jb(h);
            M();
            setInterval(function() {
                yc && yc()
            },
            32);
            H(this, {
                insertAtFront: ia,
                zoomX: w,
                zoomY: qa,
                resetTracker: D
            })
        }
        function jb(l) {
            function h(ia, U) {
                var X = ia.tooltipPos;
                U = ia.series;
                var ca = l.borderColor || ia.color || U.color || "#606060",
                za = t.inverted,
                P, Aa, w, qa = ea.offsetHeight;
                w = ia.tooltipText;
                M = U;
                P = X ? X[0] : za ? sa - ia.plotY: ia.plotX;
                X = X ? X[1] : za ? ka - ia.plotX: ia.plotY;
                if (P >= 0 && P <= sa && X >= 0 && X <= ka) Aa = true;
                if (w === false || !Aa) q();
                else {
                    ea.innerHTML = w;
                    ra(ea, {
                        overflow: ec
                    });
                    Aa = ea.offsetWidth - xa;
                    w = ea.offsetHeight - xa;
                    ra(ea, {
                        overflow: db
                    });
                    if (Aa > (D.w || 0) + 20 || Aa < (D.w || 0) - 20 || w > D.h || D.c != ca || qa != ea.offsetHeight) {
                        D.clear();
                        D.drawRect(xa / 2, xa / 2, Aa + 20, w, ca, xa, l.borderRadius, l.backgroundColor, l.shadow);
                        H(D, {
                            w: Aa,
                            h: w,
                            c: ca
                        })
                    }
                    ca = P - D.w + ga - 35;
                    P = X - D.h + 10 + I;
                    if (ca < 5) {
                        ca = 5;
                        P -= 20
                    }
                    if (P < 5) P = 5;
                    else if (P + D.h > Ga) P = Ga - D.h - 5;
                    s(O(ca), O(P));
                    U.drawPointState(ia, "hover");
                    kb.style.visibility = ec
                }
            }
            function s(ia, U) {
                var X = kb.style.visibility == db,
                ca = X ? ia: (kb.offsetLeft + ia) / 2;
                X = X ? U: (kb.offsetTop + U) / 2;
                ra(kb, {
                    left: ca + F,
                    top: X + F
                });
                yc = Da(ia - ca) > 1 || Da(U - X) > 1 ?
                function() {
                    s(ia, U)
                }: null
            }
            function q() {
                if (kb) kb.style.visibility = db;
                M && M.drawPointState()
            }
            var M, ea, xa = l.borderWidth,
            D;
            kb = V(Va, null, {
                position: wa,
                visibility: db,
                overflow: db,
                padding: "0 50px 5px 0",
                zIndex: 8
            },
            oa);
            D = new pa("tooltip-box", kb, null, {
                width: mb + F,
                height: Ga + F
            });
            ea = V(Va, {
                className: "highcharts-tooltip"
            },
            H(l.style, {
                maxWidth: mb - 40 + F,
                textOverflow: "ellipsis",
                position: Xb,
                zIndex: 2
            }), kb);
            return {
                refresh: h,
                hide: q
            }
        }
        var nb = function(l) {
            function h(Aa) {
                if (Aa) {
                    p(U,
                    function(w) {
                        Ca(w.legendItem)
                    });
                    U = []
                }
                P && za.reverse();
                p(za,
                function(w) {
                    if (w.options.showInLegend) {
                        var qa = w.options.legendType == "point" ? w.data: [w];
                        p(qa,
                        function(S) {
                            S.simpleSymbol = /(bar|pie|area|column)/.test(w.type);
                            S.legendItem = M = V("li", {
                                innerHTML: q.labelFormatter.call(S),
                                className: S.visible ? "": Ob
                            },
                            null, D.firstChild);
                            if (S.options && S.options.showCheckbox) S.checkbox = V("input", {
                                type: "checkbox",
                                checked: S.selected,
                                defaultChecked: S.selected
                            },
                            q.itemCheckboxStyle, M);
                            Oa(M, "mouseover",
                            function() {
                                S.setState("hover")
                            });
                            Oa(M, "mouseout",
                            function() {
                                S.setState()
                            });
                            Oa(M, "click",
                            function(Na) {
                                Na = Na.target;
                                var o = "legendItemClick",
                                Q = function() {
                                    S.setVisible()
                                };
                                if (Na.tagName == "INPUT") na(S, "checkboxClick", {
                                    checked: Na.checked
                                },
                                function() {
                                    S.select()
                                });
                                else S.firePointEvent ? S.firePointEvent(o, null, Q) : na(S, o, null, Q)
                            });
                            U.push(S)
                        })
                    }
                });
                P && za.reverse()
            }
            function s(Aa) {
                if (Aa) {
                    X.clear();
                    Ca(ca);
                    ca = null
                }
                if (za.length) {
                    if (q.borderWidth || q.backgroundColor) X.drawRect(D.offsetLeft, D.offsetTop, D.offsetWidth, D.offsetHeight, q.borderColor, q.borderWidth, q.borderRadius, q.backgroundColor, q.shadow);
                    p(U,
                    function(w) {
                        if (w.legendItem) {
                            var qa = w.legendItem,
                            S = D.offsetLeft + qa.offsetLeft;
                            qa = D.offsetTop + qa.offsetTop + qa.offsetHeight / 2;
                            var Na = w.legendItem.className == Ob,
                            o = Na ? q.itemHiddenStyle.color: w.color; ! w.simpleSymbol && w.options && w.options.lineWidth && X.drawLine(S, qa, S + xa, qa, o, w.options.lineWidth);
                            if (w.simpleSymbol) X.drawRect(S, qa - 6, 16, 12, null, 0, 2, o);
                            else if (w.options && w.options.marker && w.options.marker.enabled) w.drawMarker(X, S + xa / 2, qa, aa(w.options.marker, Na ? {
                                fillColor: o,
                                lineColor: o
                            }: null))
                        }
                    });
                    if (ib) {
                        ca = V("area", {
                            shape: "rect",
                            isLegendArea: true,
                            coords: [D.offsetLeft - ga, D.offsetTop - I, D.offsetLeft + D.offsetWidth - ga, D.offsetTop + D.offsetHeight - I].join(",")
                        });
                        ub.insertAtFront(ca);
                        ca.onmouseover = function(w) {
                            w = w || Pa.event;
                            w = w.relatedTarget || w.fromElement;
                            if (w != D && !Nb) {
                                Ab && Ab.hide();
                                ra(D, {
                                    zIndex: 10
                                })
                            }
                        };
                        D.onmouseout = ca.onmouseout = function(w) {
                            w = w || Pa.event;
                            if ((w = w.relatedTarget || w.toElement) && (w == dc || w.tagName == "AREA" && w != ca)) ra(D, {
                                zIndex: 7
                            })
                        }
                    }
                }
            }
            var q = l.options.legend;
            if (q.enabled) {
                var M, ea = q.layout,
                xa = q.symbolWidth,
                D, ia = "#" + oa.id + " .highcharts-legend li",
                U = [],
                X = new pa("legend", oa, null, {
                    zIndex: 7
                }),
                ca,
                za = l.series,
                P = q.reversed;
                this.dom = D = V(Va, {
                    className: "highcharts-legend highcharts-legend-" + ea,
                    innerHTML: '<ul style="margin:0;padding:0"></ul>'
                },
                H({
                    position: wa,
                    zIndex: 7
                },
                q.style), oa);
                Gb(ia, H(q.itemStyle, {
                    paddingLeft: xa + q.symbolPadding + F,
                    "float": ea == "horizontal" ? "left": "none"
                }));
                Gb(ia + ":hover", q.itemHoverStyle);
                Gb(ia + "." + Ob, q.itemHiddenStyle);
                Gb(".highcharts-legend-horizontal li", {
                    "float": "left"
                });
                h();
                s();
                return {
                    renderHTML: h,
                    drawGraphics: s
                }
            }
        };
        Pa.G_vmlCanvasManager && Pa.G_vmlCanvasManager.init_(document);
        Zb = aa(Zb, Ba.xAxis);
        tc = aa(tc, Ba.yAxis);
        Ba.xAxis = Ba.yAxis = null;
        a = aa(Ba, a);
        var A = a.chart,
        T = A.margin;
        T = typeof T == "number" ? [T, T, T, T] : T;
        var I = T[0],
        fb = T[1],
        cb = T[2],
        ga = T[3],
        Xa,
        rb,
        oa,
        qc,
        mb,
        Ga;
        C();
        var t = this;
        T = A.events;
        var zc, ib, Ab, Nb, Jc = new pa("chart-background", oa),
        vb,
        sc,
        ka,
        sa,
        ub,
        dc,
        Jb,
        lb = Hc(oa),
        Ub = A.showAxes,
        Ka = [],
        Cb,
        ya = [],
        Yb,
        Ea,
        yc,
        kb;
        fc = Bb = 0;
        Oa(Pa, "resize", i);
        Oa(Pa, "unload", La);
        if (T) for (zc in T) Oa(t, zc, T[zc]);
        t.addLoading = function(l) {
            t.resources[l] = false
        };
        t.clearLoading = function(l) {
            t.resources[l] = true;
            E()
        };
        t.options = a;
        t.series = ya;
        t.container = oa;
        t.resources = {};
        t.inverted = Ea = a.chart.inverted;
        t.chartWidth = mb;
        t.chartHeight = Ga;
        t.plotWidth = sa = mb - ga - fb;
        t.plotHeight = ka = Ga - I - cb;
        t.plotLeft = ga;
        t.plotTop = I;
        t.redraw = c;
        t.addSeries = b;
        t.getSelectedPoints = r;
        t.getSelectedSeries = v;
        t.showLoading = e;
        t.hideLoading = f;
        t.get = g;
        t.destroy = La;
        t.updatePosition = i;
        t.plotLayer = sc = new pa("plot", oa, null, {
            position: wa,
            width: sa + F,
            height: ka + F,
            left: ga + F,
            top: I + F,
            overflow: db,
            zIndex: 3
        });
        if (A.plotBackgroundImage) {
            t.addLoading("plotBack");
            Yb = V("img");
            Yb.onload = function() {
                t.clearLoading("plotBack")
            };
            Yb.src = A.plotBackgroundImage
        }
        p(a.series || [],
        function(l) {
            d(l)
        });
        t.tracker = ub = new ob(t, a.tooltip);
        E()
    }
    function Tc(a) {
        for (var b = [], c = [], d = 0; d < a.length; d++) {
            b[d] = a[d].plotX;
            c[d] = a[d].plotY
        }
        this.xdata = b;
        this.ydata = c;
        a = [];
        this.y2 = [];
        var e = c.length;
        this.n = e;
        this.y2[0] = 0;
        this.y2[e - 1] = 0;
        a[0] = 0;
        for (d = 1; d < e - 1; d++) {
            var f = b[d + 1] - b[d - 1];
            f = (b[d] - b[d - 1]) / f;
            var g = f * this.y2[d - 1] + 2;
            this.y2[d] = (f - 1) / g;
            a[d] = (c[d + 1] - c[d]) / (b[d + 1] - b[d]) - (c[d] - c[d - 1]) / (b[d] - b[d - 1]);
            a[d] = (6 * a[d] / (b[d + 1] - b[d - 1]) - f * a[d - 1]) / g
        }
        for (b = e - 2; b >= 0; b--) this.y2[b] = this.y2[b] * this.y2[b + 1] + a[b]
    }
    var ma, va = document,
    Pa = window,
    ta = Math,
    O = ta.round,
    Za = ta.floor,
    Lb = ta.max,
    Da = ta.abs,
    gc = ta.cos,
    hc = ta.sin,
    B = navigator.userAgent,
    Ra = /msie/i.test(B) && !Pa.opera,
    cd = /AppleWebKit/.test(B),
    kc,
    bd = 0,
    Bb,
    fc,
    Uc = {},
    rc = 0,
    Sa = 1,
    Qb,
    Va = "div",
    wa = "absolute",
    Xb = "relative",
    db = "hidden",
    Ob = "highcharts-" + db,
    ec = "visible",
    F = "px",
    Tb,
    oc,
    mc,
    nc,
    Ib,
    Rb,
    Sb,
    Dc,
    Ec,
    pc,
    Fc,
    Gc,
    ua = (B = Pa.HighchartsAdapter) || {},
    p = ua.each,
    Wb = ua.grep,
    qb = ua.map,
    aa = ua.merge,
    Pb = ua.hyphenate,
    Oa = ua.addEvent,
    na = ua.fireEvent,
    Db = ua.animate,
    Ac = ua.getAjax,
    bb = {};
    if (!B && Pa.jQuery) {
        var pb = jQuery;
        p = function(a, b) {
            for (var c = 0,
            d = a.length; c < d; c++) if (b.call(a[c], a[c], c, a) === false) return c
        };
        Wb = pb.grep;
        qb = function(a, b) {
            for (var c = [], d = 0, e = a.length; d < e; d++) c[d] = b.call(a[d], a[d], d, a);
            return c
        };
        aa = function() {
            var a = arguments;
            return pb.extend(true, null, a[0], a[1], a[2], a[3])
        };
        Pb = function(a) {
            return a.replace(/([A-Z])/g,
            function(b, c) {
                return "-" + c.toLowerCase()
            })
        };
        Oa = function(a, b, c) {
            pb(a).bind(b, c)
        };
        na = function(a, b, c, d) {
            var e = pb.Event(b),
            f = "detached" + b;
            H(e, c);
            if (a[b]) {
                a[f] = a[b];
                a[b] = null
            }
            pb(a).trigger(e);
            if (a[f]) {
                a[b] = a[f];
                a[f] = null
            }
            d && !e.isDefaultPrevented() && d(e)
        };
        Db = function(a, b, c) {
            pb(a).animate(b, c)
        };
        Ac = function(a, b) {
            pb.get(a, null, b)
        };
        pb.extend(pb.easing, {
            easeOutQuad: function(a, b, c, d, e) {
                return - d * (b /= e) * (b - 2) + c
            }
        })
    } else if (!B && Pa.MooTools) {
        p = $each;
        qb = function(a, b) {
            return a.map(b)
        };
        Wb = function(a, b) {
            return a.filter(b)
        };
        aa = $merge;
        Pb = function(a) {
            return a.hyphenate()
        };
        Oa = function(a, b, c) {
            if (!a.addEvent) if (a.nodeName) a = $(a);
            else H(a, new Events);
            a.addEvent(b, c)
        };
        na = function(a, b, c, d) {
            b = new Event({
                type: b,
                target: a
            });
            b = H(b, c);
            b.preventDefault = function() {
                d = null
            };
            a.fireEvent && a.fireEvent(b.type, b);
            d && d(b)
        };
        Db = function(a, b, c) {
            a = new Fx.Morph($(a), H(c, {
                transition: Fx.Transitions.Quad.easeInOut
            }));
            a.start(b)
        };
        Ac = function(a, b) { (new Request({
                url: a,
                method: "get",
                onSuccess: b
            })).send()
        }
    }
    B = 'normal 12px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif';
    ua = {
        enabled: true,
        align: "center",
        x: 0,
        y: 15,
        style: {
            color: "#666",
            font: B.replace("12px", "11px")
        }
    };
    var Ba = {
        colors: ["#4572A7", "#AA4643", "#89A54E", "#80699B", "#3D96AE", "#DB843D", "#92A8CD", "#A47D7C", "#B5CA92"],
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
            loading: "Loading...",
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            decimalPoint: ".",
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: ","
        },
        global: {
            useUTC: true
        },
        chart: {
            margin: [50, 50, 60, 80],
            borderColor: "#4572A7",
            borderRadius: 5,
            defaultSeriesType: "line",
            ignoreHiddenSeries: true,
            plotBorderColor: "#C0C0C0"
        },
        title: {
            text: "",
            style: {
                textAlign: "center",
                color: "#E0E0E0",
                font: B.replace("12px", "16px"),
                margin: "10px 0 0 0"
            }
        },
        subtitle: {
            text: "",
            style: {
                textAlign: "center",
                color: "#6D869F",
                font: B,
                margin: 0
            }
        },
        plotOptions: {
            line: {
                allowPointSelect: false,
                showCheckbox: false,
                animation: true,
                events: {},
                lineWidth: 2,
                shadow: true,
                marker: {
                    enabled: true,
                    symbol: "auto",
                    lineWidth: 0,
                    radius: 4,
                    lineColor: "#FFFFFF",
                    fillColor: "auto",
                    states: {
                        hover: {},
                        select: {
                            fillColor: "#FFFFFF",
                            lineColor: "auto",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: aa(ua, {
                    enabled: false,
                    y: -6,
                    formatter: function() {
                        return this.y
                    }
                }),
                showInLegend: true,
                states: {
                    hover: {
                        lineWidth: 3,
                        marker: {}
                    },
                    select: {
                        marker: {}
                    }
                }
            }
        },
        labels: {
            style: {
                position: wa,
                color: "#3E576F",
                font: B
            }
        },
        legend: {
            enabled: true,
            layout: "horizontal",
            labelFormatter: function() {
                return this.name
            },
            borderColor: "#909090",
            borderRadius: 5,
            shadow: true,
            style: {
                bottom: "10px",
                left: "80px",
                padding: "5px"
            },
            itemStyle: {
                listStyle: "none",
                margin: 0,
                padding: "0 2em 0 0",
                font: B,
                cursor: "pointer",
                color: "#3E576F",
                position: Xb
            },
            itemHoverStyle: {
                color: "#000"
            },
            itemHiddenStyle: {
                color: "#CCC"
            },
            itemCheckboxStyle: {
                position: wa,
                right: 0
            },
            symbolWidth: 16,
            symbolPadding: 5
        },
        loading: {
            hideDuration: 100,
            labelStyle: {
                font: B.replace("normal", "bold"),
                position: Xb,
                top: "1em"
            },
            showDuration: 100,
            style: {
                position: wa,
                backgroundColor: "white",
                opacity: 0.5,
                textAlign: "center"
            }
        },
        tooltip: {
            enabled: true,
            formatter: function() {
                var a = this,
                b = a.series,
                c = b.xAxis,
                d = a.x;
                return "<b>" + (a.point.name || b.name) + "</b><br/>" + (Qa(d) ? "时间: " + (c && c.options.type == "datetime" ? lc("%Y-%m-%d %H:%M:%S", d) : d) + "<br/>": "") + (a.point.name || b.name)  + a.y
            },
            backgroundColor: "rgba(255, 255, 255, .85)",
            borderWidth: 2,
            borderRadius: 5,
            shadow: true,
            snap: 10,
            style: {
                color: "#333333",
                font: B,
                fontSize: "9pt",
                padding: "5px",
                whiteSpace: "nowrap"
            }
        },
        toolbar: {
            itemStyle: {
                color: "#4572A7",
                cursor: "pointer",
                margin: "20px",
                font: B
            }
        },
        credits: {
            style: {
                position: wa,
                right: "10px",
                bottom: "5px",
                color: "#999",
                textDecoration: "none",
                font: B.replace("12px", "10px")
            },
            target: "_self"
        }
    },
    Zb = {
        dateTimeLabelFormats: {
            second: "%H:%M:%S",
            minute: "%H:%M",
            hour: "%H:%M",
            day: "%e. %b",
            week: "%e. %b",
            month: "%b '%y",
            year: "%Y"
        },
        endOnTick: false,
        gridLineColor: "#C0C0C0",
        labels: ua,
        lineColor: "#C0D0E0",
        lineWidth: 1,
        max: null,
        min: null,
        maxZoom: null,
        minorGridLineColor: "#E0E0E0",
        minorGridLineWidth: 1,
        minorTickColor: "#A0A0A0",
        minorTickLength: 2,
        minorTickPosition: "outside",
        minorTickWidth: 1,
        showFirstLabel: true,
        showLastLabel: false,
        startOfWeek: 1,
        startOnTick: false,
        tickColor: "#C0D0E0",
        tickInterval: "auto",
        tickLength: 5,
        tickmarkPlacement: "between",
        tickPixelInterval: 100,
        tickPosition: "outside",
        tickWidth: 1,
        title: {
            enabled: false,
            text: "X-values",
            align: "middle",
            margin: 35,
            style: {
                color: "#6D869F",
                font: B.replace("normal", "bold")
            }
        },
        type: "linear"
    },
    tc = aa(Zb, {
        endOnTick: true,
        gridLineWidth: 1,
        tickPixelInterval: 72,
        showLastLabel: true,
        labels: {
            align: "right",
            x: -8,
            y: 3
        },
        lineWidth: 0,
        maxPadding: 0.05,
        minPadding: 0.05,
        startOnTick: true,
        tickWidth: 0,
        title: {
            enabled: true,
            margin: 40,
            rotation: 270,
            text: "Y-values"
        }
    }),
    $c = {
        labels: {
            align: "right",
            x: -8,
            y: 3
        },
        title: {
            rotation: 270
        }
    },
    Zc = {
        labels: {
            align: "left",
            x: 8,
            y: 3
        },
        title: {
            rotation: 90
        }
    },
    Kc = {
        labels: {
            align: "center",
            x: 0,
            y: 14
        },
        title: {
            rotation: 0
        }
    },
    Yc = aa(Kc, {
        labels: {
            y: -5
        }
    });
    B = Ba.plotOptions;
    ua = B.line;
    B.spline = aa(ua);
    B.scatter = aa(ua, {
        lineWidth: 0,
        states: {
            hover: {
                lineWidth: 0
            }
        }
    });
    B.area = aa(ua, {
        fillColor: "auto"
    });
    B.areaspline = aa(B.area);
    B.column = aa(ua, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 0,
        groupPadding: 0.2,
        pointPadding: 0.1,
        states: {
            hover: {
                brightness: 0.1,
                shadow: false
            },
            select: {
                color: "#C0C0C0",
                borderColor: "#000000",
                shadow: false
            }
        }
    });
    B.bar = aa(B.column, {
        dataLabels: {
            align: "left",
            x: 5,
            y: 0
        }
    });
    B.pie = aa(ua, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        center: ["50%", "50%"],
        legendType: "point",
        size: "90%",
        slicedOffset: 10,
        states: {
            hover: {
                brightness: 0.1,
                shadow: false
            }
        }
    });
    Cc();
    var Bc = function(a) {
        function b(i) {
            if (g = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(i)) f = [parseInt(g[1]), parseInt(g[2]), parseInt(g[3]), parseFloat(g[4])];
            else if (g = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(i)) f = [parseInt(g[1], 16), parseInt(g[2], 16), parseInt(g[3], 16), 1]
        }
        function c() {
            return f && !isNaN(f[0]) ? "rgba(" + f.join(",") + ")": a
        }
        function d(i) {
            if (typeof i == "number" && i != 0) for (var k = 0; k < 3; k++) {
                f[k] += parseInt(i * 255);
                if (f[k] < 0) f[k] = 0;
                if (f[k] > 255) f[k] = 255
            }
            return this
        }
        function e(i) {
            f[3] = i;
            return this
        }
        var f = [],
        g;
        b(a);
        return {
            get: c,
            brighten: d,
            setOpacity: e
        }
    },
    pa = function(a, b, c, d) {
        var e = this,
        f = b.style;
        c = H({
            className: "highcharts-" + a
        },
        c);
        d = H({
            width: f.width,
            height: f.height,
            position: wa,
            top: 0,
            left: 0,
            margin: 0,
            padding: 0,
            border: "none"
        },
        d);
        a = V(Va, c, d, b);
        H(e, {
            div: a,
            width: parseInt(d.width),
            height: parseInt(d.height)
        });
        e.svg = Ra ? "": '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + e.width + 'px" height="' + e.height + '">';
        e.basicSvg = e.svg
    };
    pa.prototype = {
        getCtx: function() {
            if (!this.ctx) {
                var a = V("canvas", {
                    id: "highcharts-canvas-" + rc++,
                    width: this.width,
                    height: this.height
                },
                {
                    position: wa
                },
                this.div);
                if (Ra) {
                    G_vmlCanvasManager.initElement(a);
                    a = va.getElementById(a.id)
                }
                this.ctx = a.getContext("2d")
            }
            return this.ctx
        },
        getSvg: function() {
            if (!this.svgObject) {
                var a = this,
                b = a.div,
                c = a.width;
                a = a.height;
                if (Ra) {
                    if (!va.namespaces.g_vml_) {
                        va.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml");
                        va.createStyleSheet().cssText = "g_vml_\\:*{behavior:url(#default#VML)}"
                    }
                    this.svgObject = V(Va, null, {
                        width: c + F,
                        height: a + F,
                        position: wa
                    },
                    b)
                } else this.svgObject = V("object", {
                    width: c,
                    height: a,
                    type: "image/svg+xml"
                },
                {
                    position: wa,
                    left: 0,
                    top: 0
                },
                b)
            }
            return this.svgObject
        },
        drawLine: function(a, b, c, d, e, f) {
            var g = this.getCtx();
            if (a == c) a = c = O(a) + f % 2 / 2;
            if (b == d) b = d = O(b) + f % 2 / 2;
            g.lineWidth = f;
            g.lineCap = "round";
            g.beginPath();
            g.moveTo(a, b);
            g.strokeStyle = e;
            g.lineTo(c, d);
            g.closePath();
            g.stroke()
        },
        drawPolyLine: function(a, b, c, d, e) {
            var f = this.getCtx(),
            g = [];
            if (d && c) {
                p(a,
                function(i) {
                    g.push(i === ma ? i: i + 1)
                });
                for (d = 1; d <= 3; d++) this.drawPolyLine(g, "rgba(0, 0, 0, " + 0.05 * d + ")", 6 - 2 * d)
            }
            f.beginPath();
            for (d = 0; d < a.length; d += 2) f[d == 0 ? "moveTo": "lineTo"](a[d], a[d + 1]);
            H(f, {
                lineWidth: c,
                lineJoin: "round"
            });
            if (b && c) {
                f.strokeStyle = Hb(b, f);
                f.stroke()
            }
            if (e) {
                f.fillStyle = Hb(e, f);
                f.fill()
            }
        },
        drawRect: function(a, b, c, d, e, f, g, i, k, j) {
            var r = function() {
                var R;
                if (c > 0 && d > 0) {
                    v.beginPath();
                    if (g) {
                        v.moveTo(a, b + g);
                        v.lineTo(a, b + d - g);
                        v.quadraticCurveTo(a, b + d, a + g, b + d);
                        v.lineTo(a + c - g, b + d);
                        v.quadraticCurveTo(a + c, b + d, a + c, b + d - g);
                        v.lineTo(a + c, b + g);
                        v.quadraticCurveTo(a + c, b, a + c - g, b);
                        v.lineTo(a + g, b);
                        v.quadraticCurveTo(a, b, a, b + g)
                    } else v.rect(a, b, c, d);
                    v.closePath();
                    R = true
                }
                return R
            },
            v = this.getCtx(),
            y = (f || 0) % 2 / 2;
            a = O(a) + y;
            b = O(b) + y;
            c = O(c - 2 * y);
            d = O(d - 2 * y);
            if (k) for (k = 1; k <= 3; k++) this.drawRect(a + 1, b + 1, c, d, "rgba(0, 0, 0, " + 0.05 * k + ")", 6 - 2 * k, g);
            j && v.drawImage(j, a, b, c, d);
            if (r()) {
                if (i) {
                    v.fillStyle = Hb(i, v);
                    v.fill();
                    Pa.G_vmlCanvasManager && r()
                }
                if (f) {
                    v.strokeStyle = Hb(e, v);
                    v.lineWidth = f;
                    v.stroke()
                }
            }
        },
        drawSymbol: function(a, b, c, d, e, f, g) {
            var i = this.getCtx(),
            k = /^url\((.*?)\)$/;
            i.beginPath();
            if (a == "square") {
                a = 0.707 * d;
                i.moveTo(b - a, c - a);
                i.lineTo(b + a, c - a);
                i.lineTo(b + a, c + a);
                i.lineTo(b - a, c + a);
                i.lineTo(b - a, c - a)
            } else if (a == "triangle") {
                c++;
                i.moveTo(b, c - 1.33 * d);
                i.lineTo(b + d, c + 0.67 * d);
                i.lineTo(b - d, c + 0.67 * d);
                i.lineTo(b, c - 1.33 * d)
            } else if (a == "triangle-down") {
                c--;
                i.moveTo(b, c + 1.33 * d);
                i.lineTo(b - d, c - 0.67 * d);
                i.lineTo(b + d, c - 0.67 * d);
                i.lineTo(b, c + 1.33 * d)
            } else if (a == "diamond") {
                i.moveTo(b, c - d);
                i.lineTo(b + d, c);
                i.lineTo(b, c + d);
                i.lineTo(b - d, c);
                i.lineTo(b, c - d)
            } else k.test(a) ? V("img", {
                onload: function() {
                    var j = this,
                    r = Uc[j.src] || [j.width, j.height];
                    ra(j, {
                        left: O(b - r[0] / 2) + F,
                        top: O(c - r[1] / 2) + F,
                        visibility: ec
                    });
                    Uc[j.src] = r
                },
                src: a.match(k)[1]
            },
            {
                position: wa,
                visibility: Ra ? ec: db
            },
            this.div) : i.arc(b, c, d, 0, 2 * ta.PI, true);
            if (g) {
                i.fillStyle = g;
                i.fill()
            }
            if (f && e) {
                i.strokeStyle = f || "rgb(100, 100, 255)";
                i.lineWidth = e || 2;
                i.stroke()
            }
        },
        drawHtml: function(a, b, c) {
            V(Va, H(b, {
                innerHTML: a
            }), H(c, {
                position: wa
            }), this.div)
        },
        drawText: function() {
            this.addText.apply(this, arguments);
            this.strokeText()
        },
        addText: function(a, b, c, d, e, f) {
            if (a || a === 0) {
                var g = this,
                i, k = g.div,
                j, r = "";
                d = d || {};
                var v = d.color || "#000000";
                f = f || "left";
                var y = parseInt(d.fontSize || d.font.replace(/^[a-z ]+/, ""));
                for (var R in d) r += Pb(R) + ":" + d[R] + ";";
                p(["MozTransform", "WebkitTransform", "transform"],
                function(Wa) {
                    if (Wa in k.style) j = Wa
                });
                if (!e || j) {
                    a = V("span", {
                        innerHTML: a
                    },
                    H(d, {
                        position: wa,
                        left: b + F,
                        whiteSpace: "nowrap",
                        bottom: O(g.height - c - y * 0.25) + F,
                        color: v
                    }), k);
                    r = a.offsetWidth;
                    if (f == "right") ra(a, {
                        left: b - r + F
                    });
                    else f == "center" && ra(a, {
                        left: O(b - r / 2) + F
                    });
                    if (e) {
                        f = {
                            left: 0,
                            center: 50,
                            right: 100
                        } [f];
                        a.style[j] = "rotate(" + e + "deg)";
                        a.style[j + "Origin"] = f + "% 100%"
                    }
                } else if (Ra) {
                    i = true;
                    d = (e || 0) * ta.PI * 2 / 360;
                    e = gc(d);
                    d = hc(d);
                    R = g.width;
                    y = y / 3 || 3;
                    var E = f == "left",
                    K = f == "right",
                    C = E ? b: b - R * e;
                    b = K ? b: b + R * e;
                    E = E ? c: c - R * d;
                    c = K ? c: c + R * d;
                    C += y * d;
                    b += y * d;
                    E -= y * e;
                    c -= y * e;
                    if (Da(C - b) < 0.1) C += 0.1;
                    if (Da(E - c) < 0.1) E += 0.1;
                    g.svg += '<g_vml_:line from="' + C + ", " + E + '" to="' + b + ", " + c + '" stroked="false"><g_vml_:fill on="true" color="' + v + '"/><g_vml_:path textpathok="true"/><g_vml_:textpath on="true" string="' + a + '" style="v-text-align:' + f + ";" + r + '"/></g_vml_:line>'
                } else {
                    i = true;
                    g.svg += '<g><text transform="translate(' + b + "," + c + ") rotate(" + (e || 0) + ')" style="fill:' + v + ";text-anchor:" + {
                        left: "start",
                        center: "middle",
                        right: "end"
                    } [f] + ";" + r.replace(/"/g, "'") + '">' + a + "</text></g>"
                }
                g.hasObject = i
            }
        },
        strokeText: function() {
            if (this.hasObject) {
                var a = this.getSvg(),
                b = this.svg;
                if (Ra) a.innerHTML = b;
                else {
                    a.data = "data:image/svg+xml," + b + "</svg>";
                    cd && this.div.appendChild(a)
                }
            }
        },
        clear: function() {
            var a = this,
            b = this.div;
            b = b.childNodes;
            a.ctx && a.ctx.clearRect(0, 0, a.width, a.height);
            if (a.svgObject) {
                Ca(a.svgObject);
                a.svgObject = null;
                a.svg = a.basicSvg
            }
            for (var c = b.length - 1; c >= 0; c--) {
                a = b[c];
                /(SPAN|IMG)/.test(a.tagName) && Ca(a)
            }
        },
        hide: function() {
            ra(this.div, {
                display: "none"
            })
        },
        show: function() {
            ra(this.div, {
                display: ""
            })
        },
        destroy: function() {
            Ca(this.div);
            return null
        }
    };
    var ic = function() {};
    ic.prototype = {
        init: function(a, b) {
            var c = this;
            c.series = a;
            c.applyOptions(b);
            return c
        },
        applyOptions: function(a) {
            var b = this,
            c = b.series;
            if (typeof a == "number" || a === null) b.y = a;
            else if (typeof a == "object" && typeof a.length != "number") {
                H(b, a);
                b.options = a
            } else if (typeof a[0] == "string") {
                b.name = a[0];
                b.y = a[1]
            } else if (typeof a[0] == "number") {
                b.x = a[0];
                b.y = a[1]
            }
            if (b.x === ma) b.x = c.autoIncrement()
        },
        destroy: function() {
            var a = this;
            a.stateLayer && a.stateLayer.destroy();
            for (prop in a) a[prop] = null
        },
        select: function(a, b) {
            var c = this,
            d = c.series,
            e = d.chart,
            f, g, i = da(c.stateLayer, d.singlePointLayer, e.singlePointLayer);
            c.selected = a = da(a, !c.selected);
            d.isDirty = true;
            c.firePointEvent(a ? "select": "unselect");
            i && i.clear();
            p(e.series,
            function(k) {
                f = k.stateLayers;
                b || p(k.data,
                function(j) {
                    if (j.selected && j != c) {
                        j.selected = false;
                        na(j, "unselect");
                        k.isDirty = true
                    }
                });
                if (k.isDirty) {
                    for (g in f) f[g].clear();
                    k.render()
                }
            })
        },
        update: function(a, b) {
            var c = this,
            d = c.series;
            b = da(b, true);
            c.firePointEvent("update", {
                options: a
            },
            function() {
                c.applyOptions(a);
                d.isDirty = true;
                b && d.chart.redraw()
            })
        },
        remove: function(a) {
            var b = this,
            c = b.series,
            d = c.chart,
            e = c.data;
            a = da(a, true);
            b.firePointEvent("remove", null,
            function() {
                p(e,
                function(f, g) {
                    f == b && e.splice(g, 1)
                });
                if (b.layer) b.layer = b.layer.destroy();
                if (b.legendItem) {
                    Ca(b.legendItem);
                    b.legendItem = null;
                    d.isDirty = true
                }
                c.isDirty = true;
                a && d.redraw()
            })
        },
        firePointEvent: function(a, b, c) {
            var d = this,
            e = this.series;
            e = e.options;
            if (e.point.events[a] || d.options && d.options.events && d.options.events[a]) this.importEvents();
            if (a == "click" && e.allowPointSelect) c = function(f) {
                d.select(null, f.ctrlKey || f.metaKey || f.shiftKey)
            };
            na(this, a, b, c)
        },
        importEvents: function() {
            if (!this.hasImportedEvents) {
                var a = this,
                b = aa(a.series.options.point, a.options);
                b = b.events;
                var c;
                a.events = b;
                for (c in b) Oa(a, c, b[c]);
                this.hasImportedEvents = true
            }
        },
        setTooltipText: function() {
            var a = this;
            a.tooltipText = a.series.chart.options.tooltip.formatter.call({
                series: a.series,
                point: a,
                x: a.category,
                y: a.y,
                percentage: a.percentage,
                total: a.stackTotal
            })
        }
    };
    var Ja = function() {
        this.isCartesian = true;
        this.type = "line";
        this.pointClass = ic
    };
    Ja.prototype = {
        init: function(a, b) {
            var c = this,
            d, e = a.series.length;
            c.chart = a;
            b = c.setOptions(b);
            H(c, {
                index: e,
                options: b,
                name: b.name || "Series " + (e + 1),
                state: "",
                visible: b.visible !== false,
                selected: b.selected == true
            });
            a = b.events;
            for (d in a) Oa(c, d, a[d]);
            c.getColor();
            c.getSymbol();
            c.getData(b)
        },
        getData: function(a) {
            var b = this,
            c = b.chart,
            d = "series" + rc++;
            if (!a.data && a.dataURL) {
                c.addLoading(d);
                Ac(a.dataURL,
                function(e) {
                    b.dataLoaded(e);
                    c.clearLoading(d)
                })
            } else b.dataLoaded(a.data)
        },
        dataLoaded: function(a) {
            var b = this,
            c = b.chart,
            d = b.options,
            e = [""],
            f = d.dataParser,
            g = {},
            i;
            if (d.dataURL && !f) f = function(k) {
                return eval(k)
            };
            if (f) a = f.call(b, a);
            b.layerGroup = i = new pa("series-group", c.plotLayer.div, null, {
                zIndex: 2
            });
            d.states.hover.enabled && e.push("hover");
            p(e,
            function(k) {
                g[k] = new pa("state-" + k, i.div)
            });
            b.stateLayers = g;
            b.setData(a, false)
        },
        autoIncrement: function() {
            var a = this,
            b = a.options,
            c = a.xIncrement;
            c = da(c, b.pointStart, 0);
            a.pointInterval = da(a.pointInterval, b.pointInterval, 1);
            a.xIncrement = c + a.pointInterval;
            return c
        },
        cleanData: function() {
            var a = this;
            a = a.data;
            var b;
            a.sort(function(c, d) {
                return c.x - d.x
            });
            for (b = a.length - 1; b >= 0; b--) a[b - 1] && a[b - 1].x == a[b].x && a.splice(b - 1, 1)
        },
        getSegments: function() {
            var a = -1,
            b = [],
            c = this.data;
            p(c,
            function(d, e) {
                if (d.y === null) {
                    e > a + 1 && b.push(c.slice(a + 1, e));
                    a = e
                } else e == c.length - 1 && b.push(c.slice(a + 1, e + 1))
            });
            this.segments = b
        },
        setOptions: function(a) {
            var b = this.chart.options.plotOptions;
            a = aa(b[this.type], b.series, a);
            b = a.marker;
            var c = a.states.hover.marker;
            if (c.lineWidth === ma) c.lineWidth = b.lineWidth + 1;
            if (c.radius === ma) c.radius = b.radius + 1;
            return a
        },
        getColor: function() {
            var a = this.chart.options.colors;
            this.color = this.options.color || a[Bb++] || "#0000ff";
            if (Bb >= a.length) Bb = 0
        },
        getSymbol: function() {
            var a = this.chart.options.symbols,
            b = this.options.marker.symbol || "auto";
            if (b == "auto") b = a[fc++];
            this.symbol = b;
            if (fc >= a.length) fc = 0
        },
        addPoint: function(a, b, c) {
            var d = this,
            e = d.data;
            a = (new d.pointClass).init(d, a);
            b = da(b, true);
            e.push(a);
            c && e.shift();
            d.isDirty = true;
            b && d.chart.redraw()
        },
        setData: function(a, b) {
            var c = this;
            c.xIncrement = null;
            a = qb(jc(a),
            function(d) {
                return (new c.pointClass).init(c, d)
            });
            c.data = a;
            c.cleanData();
            c.getSegments();
            c.isDirty = true;
            da(b, true) && c.chart.redraw()
        },
        remove: function(a) {
            var b = this,
            c = b.chart;
            a = da(a, true);
            if (!b.isRemoving) {
                b.isRemoving = true;
                na(b, "remove", null,
                function() {
                    Ca(b.layerGroup.div);
                    p(b.areas,
                    function(d) {
                        Ca(d)
                    });
                    Ca(b.legendItem);
                    b.legendItem = null;
                    p(c.series,
                    function(d, e) {
                        d == b && c.series.splice(e, 1)
                    });
                    c.isDirty = true;
                    a && c.redraw()
                })
            }
            b.isRemoving = false
        },
        translate: function() {
            var a = this.chart,
            b = this,
            c = b.options.stacking,
            d = b.xAxis.categories,
            e = b.yAxis,
            f = e.stacks[b.type];
            p(this.data,
            function(g) {
                var i = g.x,
                k = g.y,
                j;
                g.plotX = b.xAxis.translate(g.x);
                if (c && b.visible && f[i]) {
                    j = f[i];
                    i = j.total;
                    j.cum = j = j.cum - k;
                    k = j + k;
                    if (c == "percent") {
                        j = i ? j * 100 / i: 0;
                        k = i ? k * 100 / i: 0
                    }
                    g.percentage = i ? g.y * 100 / i: 0;
                    g.stackTotal = i;
                    g.yBottom = e.translate(j, 0, 1)
                }
                if (k !== null) g.plotY = e.translate(k, 0, 1);
                g.clientX = a.inverted ? a.plotHeight - g.plotX + a.plotTop: g.plotX + a.plotLeft;
                g.category = d && d[g.x] !== ma ? d[g.x] : g.x
            })
        },
        setTooltipPoints: function(a) {
            var b = this,
            c = b.chart,
            d = c.inverted,
            e = [],
            f = d ? c.plotHeight: c.plotWidth,
            g,
            i,
            k = [];
            if (a) b.tooltipPoints = null;
            p(b.segments,
            function(j) {
                e = e.concat(j)
            });
            if (b.xAxis.reversed) e = e.reverse();
            p(e,
            function(j, r) {
                b.tooltipPoints || j.setTooltipText();
                g = e[r - 1] ? e[r - 1].high + 1 : 0;
                for (i = j.high = e[r + 1] ? Za((j.plotX + (e[r + 1] ? e[r + 1].plotX: f)) / 2) : f; g <= i;) k[d ? f - g++:g++] = j
            });
            b.tooltipPoints = k
        },
        drawLine: function(a) {
            var b, c = this,
            d = c.options,
            e = c.chart,
            f = d.animation && c.animate,
            g = c.stateLayers[a],
            i = d.lineColor || c.color,
            k = d.fillColor == "auto" ? Bc(c.color).setOpacity(d.fillOpacity || 0.75).get() : d.fillColor,
            j = e.inverted,
            r = (j ? 0 : e.plotHeight) - c.yAxis.translate(0);
            if (a) d = aa(d, d.states[a]);
            f && c.animate(true);
            p(c.segments,
            function(v) {
                var y = [],
                R = [];
                p(v,
                function(E, K) {
                    if (K && d.step) {
                        K = v[K - 1];
                        y.push(j ? e.plotWidth - K.plotY: E.plotX, j ? e.plotHeight - E.plotX: K.plotY)
                    }
                    y.push(j ? e.plotWidth - E.plotY: E.plotX, j ? e.plotHeight - E.plotX: E.plotY)
                });
                if (/area/.test(c.type)) {
                    for (b = 0; b < y.length; b++) R.push(y[b]);
                    if (d.stacking && c.type != "areaspline") for (b = v.length - 1; b >= 0; b--) R.push(v[b].plotX, v[b].yBottom);
                    else R.push(j ? r: v[v.length - 1].plotX, j ? e.plotHeight - v[v.length - 1].plotX: r, j ? r: v[0].plotX, j ? e.plotHeight - v[0].plotX: r);
                    g.drawPolyLine(R, null, null, d.shadow, k)
                }
                d.lineWidth && g.drawPolyLine(y, i, d.lineWidth, d.shadow)
            });
            f && c.animate()
        },
        animate: function(a) {
            var b = this,
            c = b.chart,
            d = c.inverted,
            e = b.layerGroup.div;
            if (b.visible) if (a) ra(e, H({
                overflow: db
            },
            d ? {
                height: 0
            }: {
                width: 0
            }));
            else {
                Db(e, d ? {
                    height: c.plotHeight + F
                }: {
                    width: c.plotWidth + F
                },
                {
                    duration: 1E3
                });
                this.animate = null
            }
        },
        drawPoints: function(a) {
            var b = this,
            c = b.stateLayers[a];
            a = b.options;
            var d = a.marker;
            a = b.data;
            var e = b.chart,
            f = e.inverted;
            d.enabled && p(a,
            function(g) {
                if (g.plotY !== ma) b.drawMarker(c, f ? e.plotWidth - g.plotY: g.plotX, f ? e.plotHeight - g.plotX: g.plotY, aa(d, g.marker));
                g.selected && b.drawPointState(g, "select", c)
            })
        },
        drawMarker: function(a, b, c, d) {
            if (d.lineColor == "auto") d.lineColor = this.color;
            if (d.fillColor == "auto") d.fillColor = this.color;
            if (d.symbol == "auto") d.symbol = this.symbol;
            a.drawSymbol(d.symbol, b, c, d.radius, d.lineWidth, d.lineColor, d.fillColor)
        },
        drawDataLabels: function() {
            if (this.options.dataLabels.enabled) {
                var a = this,
                b, c, d = a.data,
                e = a.options.dataLabels,
                f, g = a.dataLabelsLayer,
                i = a.chart,
                k = i.inverted,
                j = a.type,
                r = j == "pie",
                v;
                if (g) g.clear();
                else a.dataLabelsLayer = g = new pa("data-labels", a.layerGroup.div, null, {
                    zIndex: 1
                });
                e.style.color = e.color == "auto" ? a.color: e.color;
                p(d,
                function(y) {
                    var R = y.plotX,
                    E = y.plotY,
                    K = y.tooltipPos;
                    f = e.formatter.call({
                        x: y.x,
                        y: y.y,
                        series: a,
                        point: y
                    });
                    b = (k ? i.plotWidth - E: R) + e.x;
                    c = (k ? i.plotHeight - R: E) + e.y;
                    if (K) {
                        b = K[0] + e.x;
                        c = K[1] + e.y
                    }
                    if (r) {
                        if (!y.dataLabelsLayer) y.dataLabelsLayer = new pa("data-labels", y.layer.div, null, {
                            zIndex: 3
                        });
                        g = y.dataLabelsLayer
                    }
                    v = e.align;
                    if (j == "column") b += {
                        center: y.w / 2,
                        right: y.w
                    } [v] || 0;
                    if (f) g[r ? "drawText": "addText"](f, b, c, e.style, e.rotation, v)
                });
                r || g.strokeText()
            }
        },
        drawPointState: function(a, b, c) {
            var d = this.chart,
            e = d.inverted,
            f = b == "hover";
            c = c || d.singlePointLayer;
            var g = this.options;
            if (f) {
                if (!c) c = d.singlePointLayer = new pa("single-point", d.plotLayer.div, null, {
                    zIndex: 3
                });
                c.clear()
            }
            if (b) {
                var i = g.states[b].marker;
                b = g.marker.states[b];
                if (f && b.radius === ma) b.radius = i.radius + 2;
                if ((f = aa(g.marker, a.marker, i, b)) && f.enabled) this.drawMarker(c, e ? d.plotWidth - a.plotY: a.plotX, e ? d.plotHeight - a.plotX: a.plotY, f)
            }
        },
        destroy: function() {
            var a = this,
            b;
            p(a.data,
            function(c) {
                c.destroy()
            });
            for (b in a) a[b] = null
        },
        render: function() {
            var a = this,
            b, c = a.stateLayers;
            a.drawDataLabels();
            if (a.visible) for (b in c) {
                a.drawLine(b);
                a.drawPoints(b)
            } else a.setVisible(false, false);
            if (!a.hasRendered && c.hover) {
                c.hover.hide();
                hasRendered = true
            }
            a.isDirty = false
        },
        redraw: function() {
            var a = this;
            a.translate();
            a.setTooltipPoints(true);
            a.createArea();
            a.clear();
            a.render()
        },
        clear: function() {
            var a = this.stateLayers;
            for (var b in a) {
                a[b].clear();
                a[b].cleared = true
            }
            if (this.dataLabelsLayer) {
                this.dataLabelsLayer.clear();
                this.hasDrawnDataLabels = false
            }
        },
        setState: function(a) {
            a = a || "";
            if (this.state != a) {
                var b = this,
                c = b.stateLayers,
                d = c[a];
                c = c[b.state];
                var e = b.singlePointLayer || b.chart.singlePointLayer;
                b.state = a;
                if (d) if (a) d.show();
                else {
                    c && c.hide();
                    e && e.clear()
                }
            }
        },
        setVisible: function(a, b) {
            var c = this,
            d = c.chart,
            e = c.layerGroup,
            f = c.legendItem,
            g = c.areas,
            i = c.visible;
            if (c.visible = a = a === ma ? !i: a) {
                c.isDirty = true;
                e.show()
            } else e.hide();
            if (f) {
                f.className = a ? "": Ob;
                d.legend.drawGraphics(true)
            }
            g && p(g,
            function(k) {
                a ? d.tracker.insertAtFront(k) : Ca(k)
            });
            d.options.chart.ignoreHiddenSeries && c.options.stacking && p(d.series,
            function(k) {
                if (k.options.stacking && k.visible) k.isDirty = true
            });
            b !== false && d.redraw();
            na(c, a ? "show": "hide")
        },
        show: function() {
            this.setVisible(true)
        },
        hide: function() {
            this.setVisible(false)
        },
        select: function(a) {
            var b = this;
            b.selected = a = a === ma ? !b.selected: a;
            if (b.checkbox) b.checkbox.checked = a;
            na(b, a ? "select": "unselect")
        },
        getAreaCoords: function() {
            var a = this,
            b = this.chart,
            c = b.inverted,
            d = b.plotWidth,
            e = b.plotHeight,
            f = a.xAxis.reversed,
            g, i = b.options.tooltip.snap,
            k = [];
            p(a.splinedata || a.segments,
            function(j, r) {
                if ((g = j.length > 1 && j[0].x > j[1].x) && !f || f && !g) j = j.reverse();
                var v = [],
                y = [],
                R = [];
                p([y, R],
                function(E) {
                    for (var K = 0,
                    C = 0,
                    Wa, La, Fa = [j[0]], Kb = E == y ? 1 : -1, ob, jb, nb, A, T, I, fb; j[C];) {
                        if (j[C].plotX > j[K].plotX + i || C == j.length - 1) {
                            Wa = j[C];
                            La = j.slice(K, C - 1);
                            p(La,
                            function(cb) {
                                if (Kb * cb.plotY < Kb * Wa.plotY) Wa = cb
                            });
                            if (O(j[K].plotX) < O(Wa.plotX) || j[C].plotX > j[K].plotX + i) Fa.push(Wa);
                            K = C
                        }
                        C++
                    }
                    Fa[Fa.length - 1] != j[j.length - 1] && Fa.push(j[j.length - 1]);
                    for (C = 0; C < Fa.length; C++) if (C > 0) {
                        jb = Fa[C].plotX;
                        ob = Fa[C].plotY;
                        K = Fa[C - 1].plotX;
                        La = Fa[C - 1].plotY;
                        A = jb - Fa[C - 1].plotX;
                        I = T = ob - Fa[C - 1].plotY;
                        nb = -A;
                        fb = ta.sqrt(ta.pow(I, 2) + ta.pow(nb, 2));
                        if (C == 1) {
                            K -= i / fb * A;
                            La -= i / fb * T
                        } else if (C == Fa.length - 1) {
                            jb += i / fb * A;
                            ob += i / fb * T
                        }
                        A = Kb * i / fb;
                        K = O(K + A * I);
                        La = O(La + A * nb);
                        jb = O(jb + A * I);
                        nb = O(ob + A * nb);
                        if (E[E.length - 1] && E[E.length - 1][0] > K) for (ob = false; ! ob;) {
                            T = E.pop();
                            I = E[E.length - 1];
                            if (!I) break;
                            A = (La - nb) / (K - jb);
                            T = (I[1] - T[1]) / (I[0] - T[0]);
                            T = ( - T * I[0] + I[1] + A * K - La) / (A - T);
                            A = A * (T - K) + La;
                            if (T > I[0]) {
                                E.push([O(T), O(A), 1]);
                                ob = true
                            }
                        } else isNaN(K) || E.push([K, La]);
                        E[E.length - 1] && E[E.length - 1][0] < jb && E.push([jb, nb])
                    }
                });
                for (r = 0; r < y.length; r++) v.push(c ? d - y[r][1] : y[r][0], c ? e - y[r][0] : y[r][1]);
                for (r = R.length - 1; r >= 0; r--) v.push(c ? d - R[r][1] : R[r][0], c ? e - R[r][0] : R[r][1]);
                v.length || v.push(O(j[0].plotX), O(j[0].plotY));
                v.length && k.push([v.join(",")])
            });
            return k
        },
        createArea: function() {
            if (this.options.enableMouseTracking !== false) {
                var a, b = this,
                c = b.options,
                d = b.chart,
                e = d.tracker,
                f = b.getAreaCoords(),
                g = [],
                i = b.areas,
                k;
                i && p(i,
                function(j) {
                    Ca(j)
                });
                p(f,
                function(j) {
                    k = /^[0-9]+,[0-9]+$/.test(j[0]);
                    a = V("area", {
                        shape: k ? "circle": "poly",
                        chart: d,
                        coords: j[0] + (k ? "," + d.options.tooltip.snap: ""),
                        onmouseover: function() {
                            if (! (!b.visible || d.mouseIsDown)) {
                                var r = d.hoverSeries;
                                d.hoverPoint = j[1];
                                c.events.mouseOver && na(b, "mouseOver", {
                                    point: d.hoverPoint
                                });
                                r && r != b && r.setState();
                                /(column|bar|pie)/.test(b.type) || e.insertAtFront(a);
                                b.setState("hover");
                                d.hoverSeries = b
                            }
                        },
                        onmouseout: function() {
                            var r = d.hoverSeries;
                            r && c.events.mouseOut && na(r, "mouseOut")
                        }
                    });
                    if (c.cursor == "pointer") a.href = "javascript:;";
                    e.insertAtFront(a);
                    g.push(a)
                });
                b.areas = g
            }
        }
    };
    B = ab(Ja);
    bb.line = B;
    B = ab(Ja, {
        type: "area"
    });
    bb.area = B;
    B = ab(Ja, {
        type: "spline",
        translate: function() {
            var a = this;
            Ja.prototype.translate.apply(a, arguments);
            a.splinedata = a.getSplineData()
        },
        drawLine: function() {
            var a = this,
            b = a.segments;
            a.segments = a.splinedata;
            Ja.prototype.drawLine.apply(a, arguments);
            a.segments = b
        },
        getSplineData: function() {
            var a = this,
            b = a.chart,
            c = [],
            d;
            p(a.segments,
            function(e) {
                if (a.xAxis.reversed) e = e.reverse();
                var f = [],
                g,
                i;
                p(e,
                function(k, j) {
                    g = e[j + 2] || e[j + 1] || k;
                    i = e[j - 2] || e[j - 1] || k;
                    g.plotX > 0 && i.plotY < b.plotWidth && f.push(k)
                });
                if (f.length > 1) d = O(Lb(b.plotWidth, f[f.length - 1].clientX - f[0].clientX) / 3);
                c.push(e.length > 1 ? d ? (new Tc(f)).get(d) : [] : e)
            });
            return a.splinedata = c
        }
    });
    bb.spline = B;
    Tc.prototype = {
        get: function(a) {
            a || (a = 50);
            var b = this.n;
            b = (this.xdata[b - 1] - this.xdata[0]) / (a - 1);
            var c = [],
            d = [];
            c[0] = this.xdata[0];
            d[0] = this.ydata[0];
            for (var e = [{
                plotX: c[0],
                plotY: d[0]
            }], f = 1; f < a; f++) {
                c[f] = c[0] + f * b;
                d[f] = this.interpolate(c[f]);
                e[f] = {
                    plotX: c[f],
                    plotY: d[f]
                }
            }
            return e
        },
        interpolate: function(a) {
            for (var b = this.n - 1,
            c = 0; b - c > 1;) {
                var d = (b + c) / 2;
                if (this.xdata[Za(d)] > a) b = d;
                else c = d
            }
            b = Za(b);
            c = Za(c);
            d = this.xdata[b] - this.xdata[c];
            var e = (this.xdata[b] - a) / d;
            a = (a - this.xdata[c]) / d;
            return e * this.ydata[c] + a * this.ydata[b] + ((e * e * e - e) * this.y2[c] + (a * a * a - a) * this.y2[b]) * d * d / 6
        }
    };
    B = ab(B, {
        type: "areaspline"
    });
    bb.areaspline = B;
    var Vb = ab(Ja, {
        type: "column",
        init: function() {
            Ja.prototype.init.apply(this, arguments);
            var a = this,
            b = a.chart;
            b.hasRendered && p(b.series,
            function(c) {
                if (c.type == a.type) c.isDirty = true
            })
        },
        translate: function() {
            var a = this,
            b = a.chart,
            c = 0,
            d;
            Ja.prototype.translate.apply(a);
            p(b.series,
            function(C) {
                if (C.type == a.type) if (C.options.stacking) {
                    Qa(d) || (d = c++);
                    C.columnIndex = d
                } else C.columnIndex = c++
            });
            var e = a.options,
            f = a.data,
            g = b.inverted,
            i = b.plotWidth,
            k = b.plotHeight,
            j = a.closestPoints;
            j = Da(f[1] ? f[j].plotX - f[j - 1].plotX: g ? k: i);
            var r = j * e.groupPadding,
            v = j - 2 * r;
            v = v / c;
            var y = e.pointWidth;
            e = Qa(y) ? (v - y) / 2 : v * e.pointPadding;
            var R = da(y, v - 2 * e);
            b = (b.options.xAxis.reversed ? c - a.columnIndex: a.columnIndex) || 0;
            var E = -(j / 2) + r + b * v + e,
            K = a.yAxis.translate(0);
            p(f,
            function(C) {
                C.plotX += E;
                C.w = R;
                C.y0 = (g ? i: k) - K;
                C.h = (C.yBottom || C.y0) - C.plotY
            })
        },
        drawLine: function() {},
        getSymbol: function() {},
        drawPoints: function(a) {
            var b = this,
            c = b.options,
            d = b.chart,
            e = c.animation && b.animate,
            f = d.inverted,
            g = b.data,
            i = b.stateLayers[a];
            e && this.animate(true);
            p(g,
            function(k) {
                if (k.plotY !== ma) i.drawRect(f ? k.h >= 0 ? d.plotWidth - k.plotY - k.h: d.plotWidth - k.plotY: k.plotX, f ? d.plotHeight - k.plotX - k.w: k.h >= 0 ? k.plotY: k.plotY + k.h, f ? Da(k.h) : k.w, f ? k.w: Da(k.h), c.borderColor, c.borderWidth, c.borderRadius, k.color || b.color, c.shadow);
                k.selected && b.drawPointState(k, "select", i)
            });
            e && b.animate()
        },
        drawPointState: function(a, b, c) {
            var d = this,
            e = d.chart,
            f = d.options,
            g = a ? a.options: null,
            i = e.inverted;
            c = c || d.singlePointLayer;
            if (b == "hover") {
                if (!c) c = d.singlePointLayer = new pa("single-point", d.layerGroup.div);
                c.clear()
            }
            if (b && this.options.states[b]) {
                b = aa(f, f.states[b], g);
                c.drawRect(i ? e.plotWidth - a.plotY - a.h: a.plotX, i ? e.plotHeight - a.plotX - a.w: a.plotY, i ? a.h: a.w, i ? a.w: a.h, b.borderColor, b.borderWidth, b.borderRadius, Bc(b.color || this.color).brighten(b.brightness).get(), b.shadow)
            }
        },
        getAreaCoords: function() {
            var a = [],
            b = this.chart,
            c = b.inverted;
            p(this.data,
            function(d) {
                var e = Lb(Da(d.h), 3) * (d.h < 0 ? -1 : 1),
                f = c ? b.plotWidth - d.plotY - e: d.plotX,
                g = c ? b.plotHeight - d.plotX - d.w: d.plotY,
                i = g + (c ? d.w: e);
                e = f + (c ? e: d.w);
                if (!c && Da(e - f) < 1) e = f + 1;
                else if (c && Da(g - i) < 1) g = i + 1;
                a.push([qb([f, i, f, g, e, g, e, i], O).join(","), d])
            });
            return a
        },
        cleanData: function() {
            var a = this,
            b = a.data,
            c, d, e, f;
            Ja.prototype.cleanData.apply(a);
            for (f = b.length - 1; f >= 0; f--) if (b[f - 1]) {
                c = b[f].x - b[f - 1].x;
                if (d === ma || c < d) {
                    d = c;
                    e = f
                }
            }
            a.closestPoints = e
        },
        animate: function(a) {
            var b = this,
            c = b.chart,
            d = c.inverted,
            e = b.layerGroup.div;
            if (a) e.style[d ? "left": "top"] = (d ? -c.plotWidth: c.plotHeight) + F;
            else {
                Db(e, c.inverted ? {
                    left: 0
                }: {
                    top: 0
                });
                b.animate = null
            }
        },
        remove: function() {
            var a = this,
            b = a.chart;
            b.hasRendered && p(b.series,
            function(c) {
                if (c.type == a.type) c.isDirty = true
            });
            Ja.prototype.remove.apply(a, arguments)
        }
    });
    bb.column = Vb;
    var Ic = ab(Vb, {
        type: "bar",
        init: function(a) {
            a.inverted = this.inverted = true;
            Vb.prototype.init.apply(this, arguments)
        }
    });
    bb.bar = Ic;
    B = ab(Ja, {
        type: "scatter",
        getAreaCoords: function() {
            var a = this.data,
            b = [];
            p(a,
            function(c) {
                b.push([[O(c.plotX), O(c.plotY)].join(","), c])
            });
            return b
        },
        cleanData: function() {}
    });
    bb.scatter = B;
    B = ab(ic, {
        setState: function(a) {
            this.series.drawPointState(this, a)
        },
        init: function() {
            ic.prototype.init.apply(this, arguments);
            var a = this,
            b = a.series,
            c = b.chart.options.colors;
            H(a, {
                visible: a.visible !== false,
                name: da(a.name, "Slice"),
                color: a.color || c[Bb++]
            });
            if (Bb >= c.length) Bb = 0;
            if (!a.layer) a.layer = new pa("pie", b.layerGroup.div);
            b = function() {
                a.slice()
            };
            Oa(a, "select", b);
            Oa(a, "unselect", b);
            return a
        },
        setVisible: function(a) {
            var b = this,
            c = b.layer,
            d = b.legendItem; (b.visible = a = a === ma ? !b.visible: a) ? c.show() : c.hide();
            if (d) {
                d.className = a ? "": Ob;
                b.series.chart.legend.drawGraphics(true)
            }
        },
        slice: function(a, b) {
            var c = this,
            d = c.series;
            b = da(b, true);
            c.sliced = Qa(a) ? a: !c.sliced;
            d.isDirty = true;
            b && d.chart.redraw()
        }
    });
    B = ab(Ja, {
        type: "pie",
        isCartesian: false,
        pointClass: B,
        getColor: function() {},
        translate: function() {
            var a = 0,
            b = this,
            c = -0.25,
            d = b.options,
            e = d.slicedOffset,
            f = d.center,
            g = b.chart;
            b = b.data;
            var i = 2 * ta.PI,
            k;
            f.push(d.size);
            f = qb(f,
            function(j, r) {
                return /%$/.test(j) ? g["plot" + (r ? "Height": "Width")] * parseInt(j) / 100 : j
            });
            p(b,
            function(j) {
                a += j.y
            });
            p(b,
            function(j) {
                k = a ? j.y / a: 0;
                j.start = c * i;
                c += k;
                j.end = c * i;
                j.percentage = k * 100;
                j.center = [f[0], f[1]];
                j.size = f[2];
                var r = (j.end + j.start) / 2;
                j.centerSliced = qb([gc(r) * e + f[0], hc(r) * e + f[1]], O)
            });
            this.setTooltipPoints()
        },
        render: function() {
            this.drawPoints();
            this.drawDataLabels()
        },
        drawPoints: function() {
            var a = this;
            p(this.data,
            function(b) {
                a.drawPoint(b, b.layer.getCtx(), b.color);
                b.visible === false && b.setVisible(false);
                b.selected && a.drawPointState(b, "select", b.layer)
            })
        },
        getSymbol: function() {},
        drawPointState: function(a, b, c) {
            var d = this,
            e = d.options;
            if (a) {
                c = c || a.stateLayer;
                if (b == "hover") {
                    if (!c) c = a.stateLayer = new pa("single-point", a.layer.div);
                    c.clear()
                }
                if (b && d.options.states[b]) {
                    b = aa(e, e.states[b]);
                    this.drawPoint(a, c.getCtx(), b.color || a.color, b.brightness)
                }
            }
            d.hoverPoint && d.hoverPoint.stateLayer && d.hoverPoint.stateLayer.clear();
            d.hoverPoint = a
        },
        drawPoint: function(a, b, c, d) {
            var e = this.options,
            f = a.sliced ? a.centerSliced: a.center,
            g = f[0];
            f = f[1];
            var i = a.size,
            k = e.borderWidth,
            j = Ra && a.percentage == 100 ? a.start: a.end;
            if (a.y > 0) {
                b.fillStyle = Hb(Bc(c).brighten(d).get(b), b);
                b.strokeStyle = e.borderColor;
                b.lineWidth = k;
                b.beginPath();
                b.moveTo(g, f);
                b.arc(g, f, i / 2, a.start, j, false);
                b.lineTo(g, f);
                b.closePath();
                b.fill();
                k && b.stroke()
            }
        },
        getAreaCoords: function() {
            var a = [];
            p(this.data,
            function(b) {
                for (var c = b.center[0], d = b.center[1], e = b.size / 2, f = b.start, g = b.end, i = [], k = f; k; k += 0.25) {
                    if (k >= g) k = g;
                    i = i.concat([c + gc(k) * e, d + hc(k) * e]);
                    if (k >= g) break
                }
                i = i.concat([c, d]);
                b.tooltipPos = [c + 2 * gc((f + g) / 2) * e / 3, d + 2 * hc((f + g) / 2) * e / 3];
                a.push([qb(i, O).join(","), b])
            });
            return a
        },
        setData: function() {
            var a = this,
            b = a.data,
            c;
            if (b) for (c = b.length - 1; c >= 0; c--) b[c].remove();
            Ja.prototype.setData.apply(a, arguments)
        },
        clear: function() {
            p(this.data,
            function(a) {
                a.layer.clear();
                a.dataLabelsLayer && a.dataLabelsLayer.clear();
                a.stateLayer && a.stateLayer.clear()
            })
        }
    });
    bb.pie = B;
    Highcharts = {
        numberFormat: Wc,
        dateFormat: lc,
        defaultOptions: Ba,
        setOptions: Vc,
        Chart: Xc,
        extendClass: ab,
        seriesTypes: bb,
        Layer: pa
    }
})();