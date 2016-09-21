!function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "codemirror"], a) : a(window.jQuery, window.CodeMirror)
}(function (a, b) {
    "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function (a, b) {
        var c, d, e = this.length >>> 0, f = !1;
        for (1 < arguments.length && (d = b, f = !0), c = 0; e > c; ++c)
            this.hasOwnProperty(c) && (f ? d = a(d, this[c], c, this) : (d = this[c], f = !0));
        if (!f)
            throw new TypeError("Reduce of empty array with no initial value");
        return d
    });
    var c = {bMac: navigator.appVersion.indexOf("Mac") > -1, bMSIE: navigator.userAgent.indexOf("MSIE") > -1, bFF: navigator.userAgent.indexOf("Firefox") > -1, bCodeMirror: !!b}, d = function () {
        var a = function (a) {
            return function (b) {
                return a === b
            }
        }, b = function (a, b) {
            return a === b
        }, c = function () {
            return!1
        }, d = function (a) {
            return function () {
                return!a.apply(a, arguments)
            }
        }, e = function (a) {
            return a
        };
        return{eq: a, eq2: b, fail: c, not: d, self: e}
    }(), e = function () {
        var a = function (a) {
            return a[0]
        }, b = function (a) {
            return a[a.length - 1]
        }, c = function (a) {
            return a.slice(0, a.length - 1)
        }, e = function (a) {
            return a.slice(1)
        }, f = function (a, b) {
            return b = b || d.self, a.reduce(function (a, c) {
                return a + b(c)
            }, 0)
        }, g = function (a) {
            for (var b = [], c = -1, d = a.length; ++c < d; )
                b[c] = a[c];
            return b
        }, h = function (c, d) {
            if (0 === c.length)
                return[];
            var f = e(c);
            return f.reduce(function (a, c) {
                var e = b(a);
                return d(b(e), c) ? e[e.length] = c : a[a.length] = [c], a
            }, [[a(c)]])
        }, i = function (a) {
            for (var b = [], c = 0, d = a.length; d > c; c++)
                a[c] && b.push(a[c]);
            return b
        };
        return{head: a, last: b, initial: c, tail: e, sum: f, from: g, compact: i, clusterBy: h}
    }(), f = function () {
        var b = function (a) {
            return function (b) {
                return b && b.nodeName === a
            }
        }, c = function (a) {
            return a && /^DIV|^P|^LI|^H[1-7]/.test(a.nodeName)
        }, g = "<p><br/></p>", h = function (a) {
            return a && /^UL|^OL/.test(a.nodeName)
        }, i = function (b) {
            return b && a(b).hasClass("note-editable")
        }, j = function (b) {
            return b && a(b).hasClass("note-control-sizing")
        }, k = function (a, b) {
            for (; a; ) {
                if (b(a))
                    return a;
                a = a.parentNode
            }
            return null
        }, l = function (a, b) {
            b = b || d.fail;
            var c = [];
            return k(a, function (a) {
                return c.push(a), b(a)
            }), c
        }, m = function (b, c) {
            for (var d = l(b), e = c; e; e = e.parentNode)
                if (a.inArray(e, d) > -1)
                    return e;
            return null
        }, n = function (a, b) {
            var c = [], d = !1, e = !1, f = function (g) {
                if (g) {
                    if (g === a && (d = !0), d && !e && c.push(g), g === b)
                        return e = !0, void 0;
                    for (var h = 0, i = g.childNodes.length; i > h; h++)
                        f(g.childNodes[h])
                }
            };
            return f(m(a, b)), c
        }, o = function (a, b) {
            b = b || d.fail;
            for (var c = []; a && (c.push(a), !b(a)); )
                a = a.previousSibling;
            return c
        }, p = function (a, b) {
            b = b || d.fail;
            for (var c = []; a && (c.push(a), !b(a)); )
                a = a.nextSibling;
            return c
        }, q = function (a, b) {
            var c = b.nextSibling, d = b.parentNode;
            return c ? d.insertBefore(a, c) : d.appendChild(a), a
        }, r = function (b, c) {
            return a.each(c, function (a, c) {
                b.appendChild(c)
            }), b
        }, s = b("#text"), t = function (a) {
            return s(a) ? a.nodeValue.length : a.childNodes.length
        }, u = function (a) {
            for (var b = 0; a = a.previousSibling; )
                b += 1;
            return b
        }, v = function (b, c) {
            var f = e.initial(l(c, d.eq(b)));
            return a.map(f, u).reverse()
        }, w = function (a, b) {
            for (var c = a, d = 0, e = b.length; e > d; d++)
                c = c.childNodes[b[d]];
            return c
        }, x = function (a, b) {
            if (0 === b)
                return a;
            if (b >= t(a))
                return a.nextSibling;
            if (s(a))
                return a.splitText(b);
            var c = a.childNodes[b];
            return a = q(a.cloneNode(!1), a), r(a, p(c))
        }, y = function (a, b, c) {
            var e = l(b, d.eq(a));
            return 1 === e.length ? x(b, c) : e.reduce(function (a, d) {
                var e = d.cloneNode(!1);
                return q(e, d), a === b && (a = x(a, c)), r(e, p(a)), e
            })
        }, z = function (a, b) {
            if (a && a.parentNode) {
                if (a.removeNode)
                    return a.removeNode(b);
                var c = a.parentNode;
                if (!b) {
                    var d, e, f = [];
                    for (d = 0, e = a.childNodes.length; e > d; d++)
                        f.push(a.childNodes[d]);
                    for (d = 0, e = f.length; e > d; d++)
                        c.insertBefore(f[d], a)
                }
                c.removeChild(a)
            }
        }, A = function (a) {
            return f.isTextarea(a[0]) ? a.val() : a.html()
        };
        return{emptyPara: g, isText: s, isPara: c, isList: h, isEditable: i, isControlSizing: j, isAnchor: b("A"), isDiv: b("DIV"), isSpan: b("SPAN"), isB: b("B"), isU: b("U"), isS: b("S"), isI: b("I"), isImg: b("IMG"), isTextarea: b("TEXTAREA"), ancestor: k, listAncestor: l, listNext: p, listPrev: o, commonAncestor: m, listBetween: n, insertAfter: q, position: u, makeOffsetPath: v, fromOffsetPath: w, split: y, remove: z, html: A}
    }(), g = function () {
        var b = !!document.createRange, c = function (a, b) {
            var c, d, g = a.parentElement(), h = document.body.createTextRange(), i = e.from(g.childNodes);
            for (c = 0; c < i.length; c++)
                if (!f.isText(i[c])) {
                    if (h.moveToElementText(i[c]), h.compareEndPoints("StartToStart", a) >= 0)
                        break;
                    d = i[c]
                }
            if (0 !== c && f.isText(i[c - 1])) {
                var j = document.body.createTextRange(), k = null;
                j.moveToElementText(d || g), j.collapse(!d), k = d ? d.nextSibling : g.firstChild;
                var l = a.duplicate();
                l.setEndPoint("StartToStart", j);
                for (var m = l.text.replace(/[\r\n]/g, "").length; m > k.nodeValue.length && k.nextSibling; )
                    m -= k.nodeValue.length, k = k.nextSibling;
                {
                    k.nodeValue
                }
                b && k.nextSibling && f.isText(k.nextSibling) && m === k.nodeValue.length && (m -= k.nodeValue.length, k = k.nextSibling), g = k, c = m
            }
            return{cont: g, offset: c}
        }, g = function (a) {
            var b = function (a, c) {
                var g, h;
                if (f.isText(a)) {
                    var i = f.listPrev(a, d.not(f.isText)), j = e.last(i).previousSibling;
                    g = j || a.parentNode, c += e.sum(e.tail(i), f.length), h = !j
                } else {
                    if (g = a.childNodes[c] || a, f.isText(g))
                        return b(g, c);
                    c = 0, h = !1
                }
                return{cont: g, collapseToStart: h, offset: c}
            }, c = document.body.createTextRange(), g = b(a.cont, a.offset);
            return c.moveToElementText(g.cont), c.collapse(g.collapseToStart), c.moveStart("character", g.offset), c
        }, h = function (c, h, i, j) {
            this.sc = c, this.so = h, this.ec = i, this.eo = j;
            var k = function () {
                if (b) {
                    var a = document.createRange();
                    return a.setStart(c, h), a.setEnd(i, j), a
                }
                var d = g({cont: c, offset: h});
                return d.setEndPoint("EndToEnd", g({cont: i, offset: j})), d
            };
            this.select = function () {
                var a = k();
                if (b) {
                    var c = document.getSelection();
                    c.rangeCount > 0 && c.removeAllRanges(), c.addRange(a)
                } else
                    a.select()
            }, this.listPara = function () {
                var b = f.listBetween(c, i), g = e.compact(a.map(b, function (a) {
                    return f.ancestor(a, f.isPara)
                }));
                return a.map(e.clusterBy(g, d.eq2), e.head)
            };
            var l = function (a) {
                return function () {
                    var b = f.ancestor(c, a);
                    return b && b === f.ancestor(i, a)
                }
            };
            this.isOnEditable = l(f.isEditable), this.isOnList = l(f.isList), this.isOnAnchor = l(f.isAnchor), this.isCollapsed = function () {
                return c === i && h === j
            }, this.insertNode = function (a) {
                var c = k();
                b ? c.insertNode(a) : c.pasteHTML(a.outerHTML)
            }, this.toString = function () {
                var a = k();
                return b ? a.toString() : a.text
            }, this.bookmark = function (a) {
                return{s: {path: f.makeOffsetPath(a, c), offset: h}, e: {path: f.makeOffsetPath(a, i), offset: j}}
            }
        };
        return{create: function (a, d, e, f) {
                if (0 === arguments.length)
                    if (b) {
                        var g = document.getSelection();
                        if (0 === g.rangeCount)
                            return null;
                        var i = g.getRangeAt(0);
                        a = i.startContainer, d = i.startOffset, e = i.endContainer, f = i.endOffset
                    } else {
                        var j = document.selection.createRange(), k = j.duplicate();
                        k.collapse(!1);
                        var l = j;
                        l.collapse(!0);
                        var m = c(l, !0), n = c(k, !1);
                        a = m.cont, d = m.offset, e = n.cont, f = n.offset
                    }
                else
                    2 === arguments.length && (e = a, f = d);
                return new h(a, d, e, f)
            }, createFromBookmark: function (a, b) {
                var c = f.fromOffsetPath(a, b.s.path), d = b.s.offset, e = f.fromOffsetPath(a, b.e.path), g = b.e.offset;
                return new h(c, d, e, g)
            }}
    }(), h = function () {
        var b = function (b) {
            return a.Deferred(function (a) {
                var c = new FileReader;
                c.onload = function (b) {
                    a.resolve(b.target.result)
                }, c.onerror = function () {
                    a.reject(this)
                }, c.readAsDataURL(b)
            }).promise()
        }, c = function (b) {
            return a.Deferred(function (a) {
                function c() {
                    e(), a.resolve(f)
                }
                function d() {
                    e(), a.reject(f)
                }
                function e() {
                    f.onload = null, f.onerror = null, f.onabort = null
                }
                var f = new Image;
                f.onload = c, f.onerror = d, f.onabort = d, f.src = b
            }).promise()
        };
        return{readFile: b, loadImage: c}
    }(), i = function () {
        this.stylePara = function (b, c) {
            var d = b.listPara();
            a.each(d, function (b, d) {
                a.each(c, function (a, b) {
                    d.style[a] = b
                })
            })
        }, this.current = function (b, c) {
            var d = a(f.isText(b.sc) ? b.sc.parentNode : b.sc), e = d.css(["font-size", "text-align", "list-style-type", "line-height"]) || {};
            if (e["font-size"] = parseInt(e["font-size"]), e["font-bold"] = document.queryCommandState("bold") ? "bold" : "normal", e["font-italic"] = document.queryCommandState("italic") ? "italic" : "normal", e["font-underline"] = document.queryCommandState("underline") ? "underline" : "normal", b.isOnList()) {
                var g = ["circle", "disc", "disc-leading-zero", "square"], h = a.inArray(e["list-style-type"], g) > -1;
                e["list-style"] = h ? "unordered" : "ordered"
            } else
                e["list-style"] = "none";
            var i = f.ancestor(b.sc, f.isPara);
            if (i && i.style["line-height"])
                e["line-height"] = i.style.lineHeight;
            else {
                var j = parseInt(e["line-height"]) / parseInt(e["font-size"]);
                e["line-height"] = j.toFixed(1)
            }
            return e.image = f.isImg(c) && c, e.anchor = b.isOnAnchor() && f.ancestor(b.sc, f.isAnchor), e.aAncestor = f.listAncestor(b.sc, f.isEditable), e
        }
    }, j = function () {
        var a = [], b = [], c = function (a) {
            var b = a[0], c = g.create();
            return{contents: a.html(), bookmark: c.bookmark(b), scrollTop: a.scrollTop()}
        }, d = function (a, b) {
            a.html(b.contents).scrollTop(b.scrollTop), g.createFromBookmark(a[0], b.bookmark).select()
        };
        this.undo = function (e) {
            var f = c(e);
            0 !== a.length && (d(e, a.pop()), b.push(f))
        }, this.redo = function (e) {
            var f = c(e);
            0 !== b.length && (d(e, b.pop()), a.push(f))
        }, this.recordUndo = function (d) {
            b = [], a.push(c(d))
        }
    }, k = function () {
        this.saveRange = function (a) {
            a.data("range", g.create())
        }, this.restoreRange = function (a) {
            var b = a.data("range");
            b && b.select()
        };
        var b = new i;
        this.currentStyle = function (a) {
            var c = g.create();
            return c.isOnEditable() && b.current(c, a)
        }, this.tab = function (b) {
            d(b);
            var c = g.create(), e = new Array(b.data("tabsize") + 1).join("&nbsp;");
            c.insertNode(a('<span id="noteTab">' + e + "</span>")[0]);
            var h = a("#noteTab").removeAttr("id");
            c = g.create(h[0], 1), c.select(), f.remove(h[0])
        }, this.undo = function (a) {
            a.data("NoteHistory").undo(a)
        }, this.redo = function (a) {
            a.data("NoteHistory").redo(a)
        };
        for (var d = this.recordUndo = function (a) {
            a.data("NoteHistory").recordUndo(a)
        }, e = ["bold", "italic", "underline", "strikethrough", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "insertOrderedList", "insertUnorderedList", "indent", "outdent", "formatBlock", "removeFormat", "backColor", "foreColor", "insertHorizontalRule"], j = 0, k = e.length; k > j; j++)
            this[e[j]] = function (a) {
                return function (b, c) {
                    d(b), document.execCommand(a, !1, c)
                }
            }(e[j]);
        this.insertImage = function (b, c) {
            h.loadImage(c).done(function (e) {
                d(b);
                var f = a("<img>").attr("src", c);
                f.css("width", Math.min(b.width(), e.width)), g.create().insertNode(f[0])
            }).fail(function () {
                var a = b.data("callbacks");
                a.onImageUploadError && a.onImageUploadError()
            })
        }, this.insertVideo = function (b, c) {
            var d, e = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/, f = c.match(e), h = /\/\/instagram.com\/p\/(.[a-zA-Z0-9]*)/, i = c.match(h), j = /\/\/vine.co\/v\/(.[a-zA-Z0-9]*)/, k = c.match(j), l = /\/\/(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/, m = c.match(l), n = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/, o = c.match(n);
            if (f && 11 === f[2].length) {
                var p = f[2];
                d = a("<iframe>").attr("src", "http://www.youtube.com/embed/" + p).attr("width", "640").attr("height", "360")
            } else
                i && i[0].length > 0 ? d = a("<iframe>").attr("src", i[0] + "/embed/").attr("width", "612").attr("height", "710").attr("scrolling", "no").attr("allowtransparency", "true") : k && k[0].length > 0 ? d = a("<iframe>").attr("src", k[0] + "/embed/simple").attr("width", "600").attr("height", "600").attr("class", "vine-embed") : m && m[3].length > 0 ? d = a("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("src", "//player.vimeo.com/video/" + m[3]).attr("width", "640").attr("height", "360") : o && o[2].length > 0 && (d = a("<iframe>").attr("src", "http://www.dailymotion.com/embed/video/" + o[2]).attr("width", "640").attr("height", "360"));
            d && (d.attr("frameborder", 0), g.create().insertNode(d[0]))
        }, this.formatBlock = function (a, b) {
            d(a), b = c.bMSIE ? "<" + b + ">" : b, document.execCommand("FormatBlock", !1, b)
        }, this.fontSize = function (a, b) {
            d(a), document.execCommand("fontSize", !1, 3), c.bFF ? a.find("font[size=3]").removeAttr("size").css("font-size", b + "px") : a.find("span").filter(function () {
                return"medium" === this.style.fontSize
            }).css("font-size", b + "px")
        }, this.lineHeight = function (a, c) {
            d(a), b.stylePara(g.create(), {lineHeight: c})
        }, this.unlink = function (a) {
            var b = g.create();
            if (b.isOnAnchor()) {
                d(a);
                var c = f.ancestor(b.sc, f.isAnchor);
                b = g.create(c, 0, c, 1), b.select(), document.execCommand("unlink")
            }
        }, this.setLinkDialog = function (b, e) {
            var h = g.create();
            if (h.isOnAnchor()) {
                var i = f.ancestor(h.sc, f.isAnchor);
                h = g.create(i, 0, i, 1)
            }
            e({range: h, text: h.toString(), url: h.isOnAnchor() ? f.ancestor(h.sc, f.isAnchor).href : ""}, function (e) {
                h.select(), d(b);
                var f;
                if (f = -1 !== e.indexOf("@") ? -1 !== e.indexOf(":") ? e : "mailto:" + e : -1 !== e.indexOf("://") ? e : "http://" + e, c.bMSIE && h.isCollapsed()) {
                    h.insertNode(a('<A id="linkAnchor">' + e + "</A>")[0]);
                    var i = a("#linkAnchor").removeAttr("id").attr("href", f);
                    h = g.create(i[0], 0, i[0], 1), h.select()
                } else
                    document.execCommand("createlink", !1, f)
            })
        }, this.setVideoDialog = function (a, b) {
            var c = g.create(), e = this;
            if (c.isOnAnchor()) {
                var h = f.ancestor(c.sc, f.isAnchor);
                c = g.create(h, 0, h, 1)
            }
            b({range: c, text: c.toString()}, function (b) {
                c.select(), d(a), e.insertVideo(a, b)
            })
        }, this.color = function (a, b) {
            var c = JSON.parse(b), e = c.foreColor, f = c.backColor;
            d(a), e && document.execCommand("foreColor", !1, e), f && document.execCommand("backColor", !1, f)
        }, this.insertTable = function (b, e) {
            d(b);
            for (var f, h = e.split("x"), i = h[0], j = h[1], k = [], l = c.bMSIE ? "&nbsp;" : "<br/>", m = 0; i > m; m++)
                k.push("<td>" + l + "</td>");
            f = k.join("");
            for (var n, o = [], p = 0; j > p; p++)
                o.push("<tr>" + f + "</tr>");
            n = o.join("");
            var q = '<table class="table table-bordered">' + n + "</table>";
            g.create().insertNode(a(q)[0])
        }, this.floatMe = function (a, b, c) {
            d(a), c.style.cssFloat = b
        }, this.resize = function (a, b, c) {
            d(a), c.style.width = a.width() * b + "px", c.style.height = ""
        }, this.resizeTo = function (a, b) {
            var c = a.y / a.x, d = b.data("ratio");
            b.css({width: d > c ? a.x : a.y / d, height: d > c ? a.x * d : a.y})
        }
    }, l = function () {
        this.update = function (b, c) {
            var d = function (b, c) {
                b.find(".dropdown-menu li a").each(function () {
                    var b = parseFloat(a(this).data("value")) === c;
                    this.className = b ? "checked" : ""
                })
            }, e = b.find(".note-fontsize");
            e.find(".note-current-fontsize").html(c["font-size"]), d(e, parseFloat(c["font-size"]));
            var f = b.find(".note-height");
            d(f, parseFloat(c["line-height"]));
            var g = function (a, c) {
                var d = b.find(a);
                d[c() ? "addClass" : "removeClass"]("active")
            };
            g('button[data-event="bold"]', function () {
                return"bold" === c["font-bold"]
            }), g('button[data-event="italic"]', function () {
                return"italic" === c["font-italic"]
            }), g('button[data-event="underline"]', function () {
                return"underline" === c["font-underline"]
            }), g('button[data-event="justifyLeft"]', function () {
                return"left" === c["text-align"] || "start" === c["text-align"]
            }), g('button[data-event="justifyCenter"]', function () {
                return"center" === c["text-align"]
            }), g('button[data-event="justifyRight"]', function () {
                return"right" === c["text-align"]
            }), g('button[data-event="justifyFull"]', function () {
                return"justify" === c["text-align"]
            }), g('button[data-event="insertUnorderedList"]', function () {
                return"unordered" === c["list-style"]
            }), g('button[data-event="insertOrderedList"]', function () {
                return"ordered" === c["list-style"]
            })
        }, this.updateRecentColor = function (b, c, d) {
            var e = a(b).closest(".note-color"), f = e.find(".note-recent-color"), g = JSON.parse(f.attr("data-value"));
            g[c] = d, f.attr("data-value", JSON.stringify(g));
            var h = "backColor" === c ? "background-color" : "color";
            f.find("i").css(h, d)
        }, this.updateFullscreen = function (a, b) {
            var c = a.find('button[data-event="fullscreen"]');
            c[b ? "addClass" : "removeClass"]("active")
        }, this.updateCodeview = function (a, b) {
            var c = a.find('button[data-event="codeview"]');
            c[b ? "addClass" : "removeClass"]("active")
        }, this.enable = function (a) {
            a.find("button").not('button[data-event="codeview"]').removeClass("disabled")
        }, this.disable = function (a) {
            a.find("button").not('button[data-event="codeview"]').addClass("disabled")
        }
    }, m = function () {
        var b = function (b, c) {
            var d = a(c), e = d.position(), f = d.height();
            b.css({display: "block", left: e.left, top: e.top + f})
        };
        this.update = function (a, c) {
            var d = a.find(".note-link-popover"), e = a.find(".note-image-popover");
            if (c.anchor) {
                var f = d.find("a");
                f.attr("href", c.anchor.href).html(c.anchor.href), b(d, c.anchor)
            } else
                d.hide();
            c.image ? b(e, c.image) : e.hide()
        }, this.hide = function (a) {
            a.children().hide()
        }
    }, n = function () {
        this.update = function (b, c) {
            var d = b.find(".note-control-selection");
            if (c.image) {
                var e = a(c.image), f = e.position(), g = {w: e.width(), h: e.height()};
                d.css({display: "block", left: f.left, top: f.top, width: g.w, height: g.h}).data("target", c.image);
                var h = g.w + "x" + g.h;
                d.find(".note-control-selection-info").text(h)
            } else
                d.hide()
        }, this.hide = function (a) {
            a.children().hide()
        }
    }, o = function () {
        var b = function (a, b) {
            b ? a.removeClass("disabled").attr("disabled", !1) : a.addClass("disabled").attr("disabled", !0)
        };
        this.showImageDialog = function (c, d, e) {
            var f = c.find(".note-image-dialog"), g = c.find(".note-image-input"), h = c.find(".note-image-url"), i = c.find(".note-image-btn");
            f.on("shown.bs.modal", function () {
                g.on("change", function () {
                    d(this.files), a(this).val(""), f.modal("hide")
                }), h.val("").keyup(function () {
                    b(i, h.val())
                }).trigger("focus"), i.click(function (a) {
                    f.modal("hide"), e(h.val()), a.preventDefault()
                })
            }).on("hidden.bs.modal", function () {
                g.off("change"), f.off("shown.bs.modal hidden.bs.modal"), h.off("keyup"), i.off("click")
            }).modal("show")
        }, this.showVideoDialog = function (a, c, d) {
            var e = a.find(".note-video-dialog"), f = e.find(".note-video-url"), g = e.find(".note-video-btn");
            e.on("shown.bs.modal", function () {
                f.val(c.text).keyup(function () {
                    b(g, f.val())
                }).trigger("keyup").trigger("focus"), g.click(function (a) {
                    e.modal("hide"), d(f.val()), a.preventDefault()
                })
            }).on("hidden.bs.modal", function () {
                f.off("keyup"), g.off("click"), e.off("show.bs.modal hidden.bs.modal")
            }).modal("show")
        }, this.showLinkDialog = function (a, c, d) {
            var e = a.find(".note-link-dialog"), f = e.find(".note-link-text"), g = e.find(".note-link-url"), h = e.find(".note-link-btn");
            e.on("shown.bs.modal", function () {
                f.html(c.text), g.val(c.url).keyup(function () {
                    b(h, g.val()), c.text || f.html(g.val())
                }).trigger("focus"), h.click(function (a) {
                    e.modal("hide"), d(g.val()), a.preventDefault()
                })
            }).on("hidden.bs.modal", function () {
                g.off("keyup"), h.off("click"), e.off("shown.bs.modal hidden.bs.modal")
            }).modal("show")
        }, this.showHelpDialog = function (a) {
            a.find(".note-help-dialog").modal("show")
        }
    }, p = function () {
        var d = new k, e = new l, g = new m, i = new n, j = new o, p = {BACKSPACE: 8, TAB: 9, ENTER: 13, SPACE: 32, NUM0: 48, NUM1: 49, NUM6: 54, NUM7: 55, NUM8: 56, B: 66, E: 69, I: 73, J: 74, K: 75, L: 76, R: 82, S: 83, U: 85, Y: 89, Z: 90, SLASH: 191, LEFTBRACKET: 219, BACKSLACH: 220, RIGHTBRACKET: 221}, q = function (b) {
            var c = a(b).closest(".note-editor");
            return{editor: function () {
                    return c
                }, toolbar: function () {
                    return c.find(".note-toolbar")
                }, editable: function () {
                    return c.find(".note-editable")
                }, codable: function () {
                    return c.find(".note-codable")
                }, statusbar: function () {
                    return c.find(".note-statusbar")
                }, popover: function () {
                    return c.find(".note-popover")
                }, handle: function () {
                    return c.find(".note-handle")
                }, dialog: function () {
                    return c.find(".note-dialog")
                }}
        }, r = function (a) {
            var b = c.bMac ? a.metaKey : a.ctrlKey, e = a.shiftKey, f = a.keyCode, g = b || e || f === p.TAB, h = g ? q(a.target) : null;
            if (f === p.TAB && h.editable().data("tabsize"))
                d.tab(h.editable());
            else if (b && (e && f === p.Z || f === p.Y))
                d.redo(h.editable());
            else if (b && f === p.Z)
                d.undo(h.editable());
            else if (b && f === p.B)
                d.bold(h.editable());
            else if (b && f === p.I)
                d.italic(h.editable());
            else if (b && f === p.U)
                d.underline(h.editable());
            else if (b && e && f === p.S)
                d.strikethrough(h.editable());
            else if (b && f === p.BACKSLACH)
                d.removeFormat(h.editable());
            else if (b && f === p.K)
                h.editable(), d.setLinkDialog(h.editable(), function (a, b) {
                    j.showLinkDialog(h.dialog(), a, b)
                });
            else if (b && f === p.SLASH)
                j.showHelpDialog(h.dialog());
            else if (b && e && f === p.L)
                d.justifyLeft(h.editable());
            else if (b && e && f === p.E)
                d.justifyCenter(h.editable());
            else if (b && e && f === p.R)
                d.justifyRight(h.editable());
            else if (b && e && f === p.J)
                d.justifyFull(h.editable());
            else if (b && e && f === p.NUM7)
                d.insertUnorderedList(h.editable());
            else if (b && e && f === p.NUM8)
                d.insertOrderedList(h.editable());
            else if (b && f === p.LEFTBRACKET)
                d.outdent(h.editable());
            else if (b && f === p.RIGHTBRACKET)
                d.indent(h.editable());
            else if (b && f === p.NUM0)
                d.formatBlock(h.editable(), "P");
            else if (b && p.NUM1 <= f && f <= p.NUM6) {
                var i = "H" + String.fromCharCode(f);
                d.formatBlock(h.editable(), i)
            } else {
                if (!b || f !== p.ENTER)
                    return(f === p.BACKSPACE || f === p.ENTER || f === p.SPACE) && d.recordUndo(q(a.target).editable()), void 0;
                d.insertHorizontalRule(h.editable())
            }
            a.preventDefault()
        }, s = function (b, c) {
            var e = b.data("callbacks");
            d.restoreRange(b), e.onImageUpload ? e.onImageUpload(c, d, b) : a.each(c, function (a, c) {
                h.readFile(c).done(function (a) {
                    d.insertImage(b, a)
                }).fail(function () {
                    e.onImageUploadError && e.onImageUploadError()
                })
            })
        }, t = function (a) {
            var b = a.originalEvent.dataTransfer;
            if (b && b.files) {
                var c = q(a.currentTarget || a.target);
                c.editable().focus(), s(c.editable(), b.files)
            }
            a.preventDefault()
        }, u = function (a) {
            f.isImg(a.target) && a.preventDefault()
        }, v = function (a) {
            var b = q(a.currentTarget || a.target), c = d.currentStyle(a.target);
            c && (e.update(b.toolbar(), c), g.update(b.popover(), c), i.update(b.handle(), c))
        }, w = function (a) {
            var b = q(a.currentTarget || a.target);
            g.hide(b.popover()), i.hide(b.handle())
        }, x = function (b) {
            if (f.isControlSizing(b.target)) {
                var c, e = q(b.target), h = e.handle(), j = e.popover(), k = e.editable(), l = e.editor(), m = h.find(".note-control-selection").data("target"), n = a(m), o = n.offset(), p = a(document).scrollTop();
                l.on("mousemove", function (a) {
                    c = {x: a.clientX - o.left, y: a.clientY - (o.top - p)}, d.resizeTo(c, n), i.update(h, {image: m}), g.update(j, {image: m})
                }).on("mouseup", function () {
                    l.off("mousemove").off("mouseup")
                }), n.data("ratio") || n.data("ratio", n.height() / n.width()), d.recordUndo(k), b.stopPropagation(), b.preventDefault()
            }
        }, y = function (b) {
            var c = a(b.target).closest("[data-event]");
            c.length > 0 && b.preventDefault()
        }, z = function (g) {
            var h = a(g.target).closest("[data-event]");
            if (h.length > 0) {
                var i, k = h.attr("data-event"), l = h.attr("data-value"), m = q(g.target), n = m.editor(), o = m.toolbar(), p = m.dialog(), r = m.editable(), t = m.codable();
                if (-1 !== a.inArray(k, ["resize", "floatMe"])) {
                    var u = m.handle(), w = u.find(".note-control-selection");
                    i = w.data("target")
                }
                if (d[k] && (r.trigger("focus"), d[k](r, l, i)), -1 !== a.inArray(k, ["backColor", "foreColor"]))
                    e.updateRecentColor(h[0], k, l);
                else if ("showLinkDialog" === k)
                    r.focus(), d.setLinkDialog(r, function (a, b) {
                        j.showLinkDialog(p, a, b)
                    });
                else if ("showImageDialog" === k)
                    r.focus(), j.showImageDialog(p, function (a) {
                        s(r, a)
                    }, function (a) {
                        d.restoreRange(r), d.insertImage(r, a)
                    });
                else if ("showVideoDialog" === k)
                    r.focus(), d.setVideoDialog(r, function (a, b) {
                        j.showVideoDialog(p, a, b)
                    });
                else if ("showHelpDialog" === k)
                    j.showHelpDialog(p);
                else if ("fullscreen" === k) {
                    n.toggleClass("fullscreen");
                    var x = function () {
                        var b = a(window).height() - o.outerHeight();
                        r.css("height", b)
                    }, y = n.hasClass("fullscreen");
                    if (y)
                        r.data("orgHeight", r.css("height")), a(window).resize(x).trigger("resize");
                    else {
                        var z = !!r.data("optionHeight");
                        r.css("height", z ? r.data("orgHeight") : "auto"), a(window).off("resize")
                    }
                    e.updateFullscreen(o, y)
                } else if ("codeview" === k) {
                    n.toggleClass("codeview");
                    var A = n.hasClass("codeview");
                    if (A) {
                        if (t.val(r.html()), t.height(r.height()), e.disable(o), t.focus(), c.bCodeMirror) {
                            var B = b.fromTextArea(t[0], a.extend({mode: "text/html", lineNumbers: !0}, n.data("options").codemirror));
                            B.setSize(null, r.outerHeight()), B.autoFormatRange && B.autoFormatRange({line: 0, ch: 0}, {line: B.lineCount(), ch: B.getTextArea().value.length}), t.data("cmEditor", B)
                        }
                    } else
                        c.bCodeMirror && t.data("cmEditor").toTextArea(), r.html(t.val() || f.emptyPara), r.height(r.data("optionHeight") ? t.height() : "auto"), e.enable(o), r.focus();
                    e.updateCodeview(m.toolbar(), A)
                }
                v(g)
            }
        }, A = 24, B = function (b) {
            var c = a(document), d = q(b.target), e = d.editable(), f = e.offset().top - c.scrollTop(), g = function (a) {
                e.height(a.clientY - (f + A))
            }, h = function () {
                c.unbind("mousemove", g).unbind("mouseup", h)
            };
            c.mousemove(g).mouseup(h), b.stopPropagation(), b.preventDefault()
        }, C = 18, D = function (b) {
            var c, d = a(b.target.parentNode), e = d.next(), f = d.find(".note-dimension-picker-mousecatcher"), g = d.find(".note-dimension-picker-highlighted"), h = d.find(".note-dimension-picker-unhighlighted");
            if (void 0 === b.offsetX) {
                var i = a(b.target).offset();
                c = {x: b.pageX - i.left, y: b.pageY - i.top}
            } else
                c = {x: b.offsetX, y: b.offsetY};
            var j = {c: Math.ceil(c.x / C) || 1, r: Math.ceil(c.y / C) || 1};
            g.css({width: j.c + "em", height: j.r + "em"}), f.attr("data-value", j.c + "x" + j.r), 3 < j.c && j.c < 10 && h.css({width: j.c + 1 + "em"}), 3 < j.r && j.r < 10 && h.css({height: j.r + 1 + "em"}), e.html(j.c + " x " + j.r)
        }, E = function (b) {
            var c = a(), d = b.dropzone, e = b.dropzone.find(".note-dropzone-message");
            a(document).on("dragenter", function (a) {
                var f = b.editor.hasClass("codeview");
                f || 0 !== c.length || (b.editor.addClass("dragover"), d.width(b.editor.width()), d.height(b.editor.height()), e.text("Drag Image Here")), c = c.add(a.target)
            }).on("dragleave", function (a) {
                c = c.not(a.target), 0 === c.length && b.editor.removeClass("dragover")
            }).on("drop", function () {
                c = a(), b.editor.removeClass("dragover")
            }), d.on("dragenter", function () {
                d.addClass("hover"), e.text("Drop Image")
            }).on("dragleave", function () {
                d.removeClass("hover"), e.text("Drag Image Here")
            }), d.on("drop", function (a) {
                t(a)
            }).on("dragover", !1)
        };
        this.attach = function (a, b) {
            a.editable.on("keydown", r), a.editable.on("mousedown", u), a.editable.on("keyup mouseup", v), a.editable.on("scroll", w), E(a), a.handle.on("mousedown", x), a.toolbar.on("click", z), a.popover.on("click", z), a.toolbar.on("mousedown", y), a.popover.on("mousedown", y), a.statusbar.on("mousedown", B);
            var c = a.toolbar, e = c.find(".note-dimension-picker-mousecatcher");
            e.on("mousemove", D), a.editable.on("blur", function () {
                d.saveRange(a.editable)
            }), b.onenter && a.editable.keypress(function (a) {
                a.keyCode === p.ENTER && b.onenter(a)
            }), b.onfocus && a.editable.focus(b.onfocus), b.onblur && a.editable.blur(b.onblur), b.onkeyup && a.editable.keyup(b.onkeyup), b.onkeydown && a.editable.keydown(b.onkeydown), a.editable.data("callbacks", {onChange: b.onChange, onAutoSave: b.onAutoSave, onPasteBefore: b.onPasteBefore, onPasteAfter: b.onPasteAfter, onImageUpload: b.onImageUpload, onImageUploadError: b.onImageUpload, onFileUpload: b.onFileUpload, onFileUploadError: b.onFileUpload})
        }, this.dettach = function (a) {
            a.editable.off(), a.toolbar.off(), a.handle.off(), a.popover.off()
        }
    }, q = function () {
        var b, d, e, g, h;
        b = {picture: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small" title="' + a.image.image + '" data-event="showImageDialog" tabindex="-1"><i class="fa fa-picture-o icon-picture"></i></button>'
            }, link: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small" title="' + a.link.link + '" data-event="showLinkDialog" data-shortcut="Ctrl+K" data-mac-shortcut="âŒ˜+K" tabindex="-1"><i class="fa fa-link icon-link"></i></button>'
            }, video: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small" title="' + a.video.video + '" data-event="showVideoDialog" tabindex="-1"><i class="fa fa-youtube-play icon-play"></i></button>'
            }, table: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" title="' + a.table.table + '" data-toggle="dropdown" tabindex="-1"><i class="fa fa-table icon-table"></i> <span class="caret"></span></button><ul class="dropdown-menu"><div class="note-dimension-picker"><div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"></div><div class="note-dimension-picker-highlighted"></div><div class="note-dimension-picker-unhighlighted"></div></div><div class="note-dimension-display"> 1 x 1 </div></ul>'
            }, style: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" title="' + a.style.style + '" data-toggle="dropdown" tabindex="-1"><i class="fa fa-magic icon-magic"></i> <span class="caret"></span></button><ul class="dropdown-menu"><li><a data-event="formatBlock" data-value="p">' + a.style.normal + '</a></li><li><a data-event="formatBlock" data-value="blockquote"><blockquote>' + a.style.blockquote + '</blockquote></a></li><li><a data-event="formatBlock" data-value="pre">' + a.style.pre + '</a></li><li><a data-event="formatBlock" data-value="h1"><h1>' + a.style.h1 + '</h1></a></li><li><a data-event="formatBlock" data-value="h2"><h2>' + a.style.h2 + '</h2></a></li><li><a data-event="formatBlock" data-value="h3"><h3>' + a.style.h3 + '</h3></a></li><li><a data-event="formatBlock" data-value="h4"><h4>' + a.style.h4 + '</h4></a></li><li><a data-event="formatBlock" data-value="h5"><h5>' + a.style.h5 + '</h5></a></li><li><a data-event="formatBlock" data-value="h6"><h6>' + a.style.h6 + "</h6></a></li></ul>"
            }, fontsize: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" data-toggle="dropdown" title="' + a.font.size + '" tabindex="-1"><span class="note-current-fontsize">11</span> <b class="caret"></b></button><ul class="dropdown-menu"><li><a data-event="fontSize" data-value="8"><i class="fa fa-check icon-ok"></i> 8</a></li><li><a data-event="fontSize" data-value="9"><i class="fa fa-check icon-ok"></i> 9</a></li><li><a data-event="fontSize" data-value="10"><i class="fa fa-check icon-ok"></i> 10</a></li><li><a data-event="fontSize" data-value="11"><i class="fa fa-check icon-ok"></i> 11</a></li><li><a data-event="fontSize" data-value="12"><i class="fa fa-check icon-ok"></i> 12</a></li><li><a data-event="fontSize" data-value="14"><i class="fa fa-check icon-ok"></i> 14</a></li><li><a data-event="fontSize" data-value="18"><i class="fa fa-check icon-ok"></i> 18</a></li><li><a data-event="fontSize" data-value="24"><i class="fa fa-check icon-ok"></i> 24</a></li><li><a data-event="fontSize" data-value="36"><i class="fa fa-check icon-ok"></i> 36</a></li></ul>'
            }, color: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small note-recent-color" title="' + a.color.recent + '" data-event="color" data-value=\'{"backColor":"yellow"}\' tabindex="-1"><i class="fa fa-font icon-font" style="color:black;background-color:yellow;"></i></button><button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" title="' + a.color.more + '" data-toggle="dropdown" tabindex="-1"><span class="caret"></span></button><ul class="dropdown-menu"><li><div class="btn-group"><div class="note-palette-title">' + a.color.background + '</div><div class="note-color-reset" data-event="backColor" data-value="inherit" title="' + a.color.transparent + '">' + a.color.setTransparent + '</div><div class="note-color-palette" data-target-event="backColor"></div></div><div class="btn-group"><div class="note-palette-title">' + a.color.foreground + '</div><div class="note-color-reset" data-event="foreColor" data-value="inherit" title="' + a.color.reset + '">' + a.color.resetToDefault + '</div><div class="note-color-palette" data-target-event="foreColor"></div></div></li></ul>'
            }, bold: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small" title="' + a.font.bold + '" data-shortcut="Ctrl+B" data-mac-shortcut="âŒ˜+B" data-event="bold" tabindex="-1"><i class="fa fa-bold icon-bold"></i></button>'
            }, italic: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small" title="' + a.font.italic + '" data-shortcut="Ctrl+I" data-mac-shortcut="âŒ˜+I" data-event="italic" tabindex="-1"><i class="fa fa-italic icon-italic"></i></button>'
            }, underline: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small" title="' + a.font.underline + '" data-shortcut="Ctrl+U" data-mac-shortcut="âŒ˜+U" data-event="underline" tabindex="-1"><i class="fa fa-underline icon-underline"></i></button>'
            }, clear: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small" title="' + a.font.clear + '" data-shortcut="Ctrl+\\" data-mac-shortcut="âŒ˜+\\" data-event="removeFormat" tabindex="-1"><i class="fa fa-eraser icon-eraser"></i></button>'
            }, ul: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small" title="' + a.lists.unordered + '" data-shortcut="Ctrl+Shift+8" data-mac-shortcut="âŒ˜+â‡§+7" data-event="insertUnorderedList" tabindex="-1"><i class="fa fa-list-ul icon-list-ul"></i></button>'
            }, ol: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small" title="' + a.lists.ordered + '" data-shortcut="Ctrl+Shift+7" data-mac-shortcut="âŒ˜+â‡§+8" data-event="insertOrderedList" tabindex="-1"><i class="fa fa-list-ol icon-list-ol"></i></button>'
            }, paragraph: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" title="' + a.paragraph.paragraph + '" data-toggle="dropdown" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i>  <span class="caret"></span></button><ul class="dropdown-menu"><li><div class="note-align btn-group"><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.paragraph.left + '" data-shortcut="Ctrl+Shift+L" data-mac-shortcut="âŒ˜+â‡§+L" data-event="justifyLeft" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.paragraph.center + '" data-shortcut="Ctrl+Shift+E" data-mac-shortcut="âŒ˜+â‡§+E" data-event="justifyCenter" tabindex="-1"><i class="fa fa-align-center icon-align-center"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.paragraph.right + '" data-shortcut="Ctrl+Shift+R" data-mac-shortcut="âŒ˜+â‡§+R" data-event="justifyRight" tabindex="-1"><i class="fa fa-align-right icon-align-right"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.paragraph.justify + '" data-shortcut="Ctrl+Shift+J" data-mac-shortcut="âŒ˜+â‡§+J" data-event="justifyFull" tabindex="-1"><i class="fa fa-align-justify icon-align-justify"></i></button></div></li><li><div class="note-list btn-group"><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.paragraph.outdent + '" data-shortcut="Ctrl+[" data-mac-shortcut="âŒ˜+[" data-event="outdent" tabindex="-1"><i class="fa fa-outdent icon-indent-left"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.paragraph.indent + '" data-shortcut="Ctrl+]" data-mac-shortcut="âŒ˜+]" data-event="indent" tabindex="-1"><i class="fa fa-indent icon-indent-right"></i></button></li></ul>'
            }, height: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small dropdown-toggle" data-toggle="dropdown" title="' + a.font.height + '" tabindex="-1"><i class="fa fa-text-height icon-text-height"></i>&nbsp; <b class="caret"></b></button><ul class="dropdown-menu"><li><a data-event="lineHeight" data-value="1.0"><i class="fa fa-check icon-ok"></i> 1.0</a></li><li><a data-event="lineHeight" data-value="1.2"><i class="fa fa-check icon-ok"></i> 1.2</a></li><li><a data-event="lineHeight" data-value="1.4"><i class="fa fa-check icon-ok"></i> 1.4</a></li><li><a data-event="lineHeight" data-value="1.5"><i class="fa fa-check icon-ok"></i> 1.5</a></li><li><a data-event="lineHeight" data-value="1.6"><i class="fa fa-check icon-ok"></i> 1.6</a></li><li><a data-event="lineHeight" data-value="1.8"><i class="fa fa-check icon-ok"></i> 1.8</a></li><li><a data-event="lineHeight" data-value="2.0"><i class="fa fa-check icon-ok"></i> 2.0</a></li><li><a data-event="lineHeight" data-value="3.0"><i class="fa fa-check icon-ok"></i> 3.0</a></li></ul>'
            }, help: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small" title="' + a.options.help + '" data-shortcut="Ctrl+/" data-mac-shortcut="âŒ˜+/" data-event="showHelpDialog" tabindex="-1"><i class="fa fa-question icon-question"></i></button>'
            }, fullscreen: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small" title="' + a.options.fullscreen + '" data-event="fullscreen" tabindex="-1"><i class="fa fa-arrows-alt icon-fullscreen"></i></button>'
            }, codeview: function (a) {
                return'<button type="button" class="btn btn-default btn-sm btn-small" title="' + a.options.codeview + '" data-event="codeview" tabindex="-1"><i class="fa fa-code icon-code"></i></button>'
            }}, d = function (a) {
            return'<div class="note-popover"><div class="note-link-popover popover bottom in" style="display: none;"><div class="arrow"></div><div class="popover-content note-link-content"><a href="http://www.google.com" target="_blank">www.google.com</a>&nbsp;&nbsp;<div class="note-insert btn-group"><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.link.edit + '" data-event="showLinkDialog" tabindex="-1"><i class="fa fa-edit icon-edit"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.link.unlink + '" data-event="unlink" tabindex="-1"><i class="fa fa-unlink icon-unlink"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.video.videoLink + '" data-event="showVideoDialog" tabindex="-1"><i class="fa fa-youtube-play icon-play"></i></button></div></div></div><div class="note-image-popover popover bottom in" style="display: none;"><div class="arrow"></div><div class="popover-content note-image-content"><div class="btn-group"><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.image.resizeFull + '" data-event="resize" data-value="1" tabindex="-1"><span class="note-fontsize-10">100%</span> </button><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.image.resizeHalf + '" data-event="resize" data-value="0.5" tabindex="-1"><span class="note-fontsize-10">50%</span> </button><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.image.resizeQuarter + '" data-event="resize" data-value="0.25" tabindex="-1"><span class="note-fontsize-10">25%</span> </button></div><div class="btn-group"><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.image.floatLeft + '" data-event="floatMe" data-value="left" tabindex="-1"><i class="fa fa-align-left icon-align-left"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.image.floatRight + '" data-event="floatMe" data-value="right" tabindex="-1"><i class="fa fa-align-right icon-align-right"></i></button><button type="button" class="btn btn-default btn-sm btn-small" title="' + a.image.floatNone + '" data-event="floatMe" data-value="none" tabindex="-1"><i class="fa fa-align-justify icon-align-justify"></i></button></div></div></div></div>'
        }, e = '<div class="note-handle"><div class="note-control-selection"><div class="note-control-selection-bg"></div><div class="note-control-holder note-control-nw"></div><div class="note-control-holder note-control-ne"></div><div class="note-control-holder note-control-sw"></div><div class="note-control-sizing note-control-se"></div><div class="note-control-selection-info"></div></div></div>';
        var i = function (a) {
            return'<table class="note-shortcut"><thead><tr><th></th><th>' + a.shortcut.textFormatting + "</th></tr></thead><tbody><tr><td>âŒ˜ + B</td><td>" + a.font.bold + "</td></tr><tr><td>âŒ˜ + I</td><td>" + a.font.italic + "</td></tr><tr><td>âŒ˜ + U</td><td>" + a.font.underline + "</td></tr><tr><td>âŒ˜ + â‡§ + S</td><td>" + a.font.strike + "</td></tr><tr><td>âŒ˜ + \\</td><td>" + a.font.clear + "</td></tr></tr></tbody></table>"
        }, k = function (a) {
            return'<table class="note-shortcut"><thead><tr><th></th><th>' + a.shortcut.action + "</th></tr></thead><tbody><tr><td>âŒ˜ + Z</td><td>" + a.history.undo + "</td></tr><tr><td>âŒ˜ + â‡§ + Z</td><td>" + a.history.redo + "</td></tr><tr><td>âŒ˜ + ]</td><td>" + a.paragraph.indent + "</td></tr><tr><td>âŒ˜ + [</td><td>" + a.paragraph.outdent + "</td></tr><tr><td>âŒ˜ + K</td><td>" + a.link.insert + "</td></tr><tr><td>âŒ˜ + ENTER</td><td>" + a.hr.insert + "</td></tr></tbody></table>"
        }, l = function (a) {
            return'<table class="note-shortcut"><thead><tr><th></th><th>' + a.shortcut.paragraphFormatting + "</th></tr></thead><tbody><tr><td>âŒ˜ + â‡§ + L</td><td>" + a.paragraph.left + "</td></tr><tr><td>âŒ˜ + â‡§ + E</td><td>" + a.paragraph.center + "</td></tr><tr><td>âŒ˜ + â‡§ + R</td><td>" + a.paragraph.right + "</td></tr><tr><td>âŒ˜ + â‡§ + J</td><td>" + a.paragraph.justify + "</td></tr><tr><td>âŒ˜ + â‡§ + NUM7</td><td>" + a.lists.ordered + "</td></tr><tr><td>âŒ˜ + â‡§ + NUM8</td><td>" + a.lists.unordered + "</td></tr></tbody></table>"
        }, m = function (a) {
            return'<table class="note-shortcut"><thead><tr><th></th><th>' + a.shortcut.documentStyle + "</th></tr></thead><tbody><tr><td>âŒ˜ + NUM0</td><td>" + a.style.normal + "</td></tr><tr><td>âŒ˜ + NUM1</td><td>" + a.style.h1 + "</td></tr><tr><td>âŒ˜ + NUM2</td><td>" + a.style.h2 + "</td></tr><tr><td>âŒ˜ + NUM3</td><td>" + a.style.h3 + "</td></tr><tr><td>âŒ˜ + NUM4</td><td>" + a.style.h4 + "</td></tr><tr><td>âŒ˜ + NUM5</td><td>" + a.style.h5 + "</td></tr><tr><td>âŒ˜ + NUM6</td><td>" + a.style.h6 + "</td></tr></tbody></table>"
        }, n = function (a) {
            return'<table class="note-shortcut-layout"><tbody><tr><td>' + k(a) + "</td><td>" + i(a) + "</td></tr><tr><td>" + m(a) + "</td><td>" + l(a) + "</td></tr></tbody></table>"
        }, o = function (a) {
            return a.replace(/âŒ˜/g, "Ctrl").replace(/â‡§/g, "Shift")
        };
        g = function (a) {
            return'<div class="note-dialog"><div class="note-image-dialog modal" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" aria-hidden="true" tabindex="-1">Ã—</button><h4>' + a.image.insert + '</h4></div><div class="modal-body"><div class="row-fluid"><h5>' + a.image.selectFromFiles + '</h5><input class="note-image-input" type="file" name="files" accept="image/*" /><h5>' + a.image.url + '</h5><input class="note-image-url form-control span12" type="text" /></div></div><div class="modal-footer"><button href="#" class="btn btn-primary note-image-btn disabled" disabled="disabled">' + a.image.insert + '</button></div></div></div></div><div class="note-link-dialog modal" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" aria-hidden="true" tabindex="-1">Ã—</button><h4>' + a.link.insert + '</h4></div><div class="modal-body"><div class="row-fluid"><div class="form-group"><label>' + a.link.textToDisplay + '</label><span class="note-link-text form-control input-xlarge uneditable-input" /></div><div class="form-group"><label>' + a.link.url + '</label><input class="note-link-url form-control span12" type="text" /></div></div></div><div class="modal-footer"><button href="#" class="btn btn-primary note-link-btn disabled" disabled="disabled">' + a.link.insert + '</button></div></div></div></div><div class="note-video-dialog modal" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" aria-hidden="true" tabindex="-1">Ã—</button><h4>' + a.video.insert + '</h4></div><div class="modal-body"><div class="row-fluid"><div class="form-group"><label>' + a.video.url + '</label>&nbsp;<small class="text-muted">' + a.video.providers + '</small><input class="note-video-url form-control span12" type="text" /></div></div></div><div class="modal-footer"><button href="#" class="btn btn-primary note-video-btn disabled" disabled="disabled">' + a.video.insert + '</button></div></div></div></div><div class="note-help-dialog modal" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="modal-background"><a class="modal-close pull-right" aria-hidden="true" tabindex="-1">' + a.shortcut.close + '</a><div class="title">' + a.shortcut.shortcuts + "</div>" + (c.bMac ? n(a) : o(n(a))) + '<p class="text-center"><a href="//hackerwins.github.io/summernote/" target="_blank">Summernote 0.5.0</a> Â· <a href="//github.com/HackerWins/summernote" target="_blank">Project</a> Â· <a href="//github.com/HackerWins/summernote/issues" target="_blank">Issues</a></p></div></div></div></div></div>'
        }, h = '<div class="note-resizebar"><div class="note-icon-bar"></div><div class="note-icon-bar"></div><div class="note-icon-bar"></div></div>';
        var p = function (b, d) {
            b.find("button").each(function (b, d) {
                var e = a(d), f = e.attr(c.bMac ? "data-mac-shortcut" : "data-shortcut");
                f && e.attr("title", function (a, b) {
                    return b + " (" + f + ")"
                })
            }).tooltip({container: "body", placement: d || "top"})
        }, q = [["#000000", "#424242", "#636363", "#9C9C94", "#CEC6CE", "#EFEFEF", "#F7F7F7", "#FFFFFF"], ["#FF0000", "#FF9C00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#9C00FF", "#FF00FF"], ["#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE"], ["#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD"], ["#E76363", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5"], ["#CE0000", "#E79439", "#EFC631", "#6BA54A", "#4A7B8C", "#3984C6", "#634AA5", "#A54A7B"], ["#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842"], ["#630000", "#7B3900", "#846300", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]], r = function (b) {
            b.find(".note-color-palette").each(function () {
                for (var b = a(this), c = b.attr("data-target-event"), d = [], e = 0, f = q.length; f > e; e++) {
                    for (var g = q[e], h = [], i = 0, j = g.length; j > i; i++) {
                        var k = g[i];
                        h.push(['<button type="button" class="note-color-btn" style="background-color:', k, ';" data-event="', c, '" data-value="', k, '" title="', k, '" data-toggle="button" tabindex="-1"></button>'].join(""))
                    }
                    d.push("<div>" + h.join("") + "</div>")
                }
                b.html(d.join(""))
            })
        };
        this.createLayout = function (c, i) {
            var k = i.height, l = i.tabsize, m = i.toolbar, n = a.summernote.lang[i.lang];
            if (!c.next().hasClass("note-editor")) {
                var o = a('<div class="note-editor"></div>');
                o.data("options", i), k > 0 && a('<div class="note-statusbar">' + h + "</div>").prependTo(o);
                var q = a('<div class="note-editable" contentEditable="true"></div>').prependTo(o);
                k && (q.height(k), q.data("optionHeight", k)), l && q.data("tabsize", l), q.html(f.html(c) || f.emptyPara), q.data("NoteHistory", new j), a('<textarea class="note-codable"></textarea>').prependTo(o), setTimeout(function () {
                    document.execCommand("styleWithCSS", 0, !0)
                });
                for (var s = "", t = 0, u = m.length; u > t; t++) {
                    var v = m[t];
                    s += '<div class="note-' + v[0] + ' btn-group">';
                    for (var w = 0, x = v[1].length; x > w; w++)
                        s += b[v[1][w]](n);
                    s += "</div>"
                }
                s = '<div class="note-toolbar btn-toolbar">' + s + "</div>";
                var y = a(s).prependTo(o);
                r(y), p(y, "bottom");
                var z = a(d(n)).prependTo(o);
                p(z), a(e).prependTo(o);
                var A = a(g(n)).prependTo(o);
                A.find("button.close, a.modal-close").click(function () {
                    a(this).closest(".modal").modal("hide")
                }), a('<div class="note-dropzone"><div class="note-dropzone-message"></div></div>').prependTo(o), o.insertAfter(c), c.hide()
            }
        };
        var s = this.layoutInfoFromHolder = function (a) {
            var b = a.next();
            if (b.hasClass("note-editor"))
                return{editor: b, dropzone: b.find(".note-dropzone"), toolbar: b.find(".note-toolbar"), editable: b.find(".note-editable"), codable: b.find(".note-codable"), statusbar: b.find(".note-statusbar"), popover: b.find(".note-popover"), handle: b.find(".note-handle"), dialog: b.find(".note-dialog")}
        };
        this.removeLayout = function (a) {
            var b = s(a);
            b && (a.html(b.editable.html()), b.editor.remove(), a.show())
        }
    }, r = new q, s = new p;
    a.summernote = a.summernote || {}, a.extend(a.summernote, {version: "0.5.0", lang: {"en-US": {font: {bold: "Bold", italic: "Italic", underline: "Underline", strike: "Strike", clear: "Remove Font Style", height: "Line Height", size: "Font Size"}, image: {image: "Picture", insert: "Insert Image", resizeFull: "Resize Full", resizeHalf: "Resize Half", resizeQuarter: "Resize Quarter", floatLeft: "Float Left", floatRight: "Float Right", floatNone: "Float None", dragImageHere: "Drag an image here", selectFromFiles: "Select from files", url: "Image URL"}, link: {link: "Link", insert: "Insert Link", unlink: "Unlink", edit: "Edit", textToDisplay: "Text to display", url: "To what URL should this link go?"}, video: {video: "Video", videoLink: "Video Link", insert: "Insert Video", url: "Video URL?", providers: "(YouTube, Vimeo, Vine, Instagram, or DailyMotion)"}, table: {table: "Table"}, hr: {insert: "Insert Horizontal Rule"}, style: {style: "Style", normal: "Normal", blockquote: "Quote", pre: "Code", h1: "Header 1", h2: "Header 2", h3: "Header 3", h4: "Header 4", h5: "Header 5", h6: "Header 6"}, lists: {unordered: "Unordered list", ordered: "Ordered list"}, options: {help: "Help", fullscreen: "Full Screen", codeview: "Code View"}, paragraph: {paragraph: "Paragraph", outdent: "Outdent", indent: "Indent", left: "Align left", center: "Align center", right: "Align right", justify: "Justify full"}, color: {recent: "Recent Color", more: "More Color", background: "BackColor", foreground: "FontColor", transparent: "Transparent", setTransparent: "Set transparent", reset: "Reset", resetToDefault: "Reset to default"}, shortcut: {shortcuts: "Keyboard shortcuts", close: "Close", textFormatting: "Text formatting", action: "Action", paragraphFormatting: "Paragraph formatting", documentStyle: "Document Style"}, history: {undo: "Undo", redo: "Redo"}}}}), a.fn.extend({summernote: function (b) {
            if (b = a.extend({toolbar: [["style", ["style"]], ["font", ["bold", "italic", "underline", "clear"]], ["fontsize", ["fontsize"]], ["color", ["color"]], ["para", ["ul", "ol", "paragraph"]], ["height", ["height"]], ["table", ["table"]], ["insert", ["link", "picture", "video"]], ["view", ["fullscreen", "codeview"]], ["help", ["help"]]], lang: "en-US"}, b), this.each(function (c, d) {
                var e = a(d);
                r.createLayout(e, b);
                var g = r.layoutInfoFromHolder(e);
                s.attach(g, b), f.isTextarea(e[0]) && e.closest("form").submit(function () {
                    e.html(e.code())
                })
            }), this.first() && b.focus) {
                var c = r.layoutInfoFromHolder(this.first());
                c.editable.focus()
            }
            this.length > 0 && b.oninit && b.oninit()
        }, code: function (b) {
            if (void 0 === b) {
                var d = this.first();
                if (0 === d.length)
                    return;
                var e = r.layoutInfoFromHolder(d);
                if (e && e.editable) {
                    var f = e.editor.hasClass("codeview");
                    return f && c.bCodeMirror && e.codable.data("cmEditor").save(), f ? e.codable.val() : e.editable.html()
                }
                return d.html()
            }
            this.each(function (c, d) {
                var e = r.layoutInfoFromHolder(a(d));
                e && e.editable && e.editable.html(b)
            })
        }, destroy: function () {
            this.each(function (b, c) {
                var d = a(c), e = r.layoutInfoFromHolder(d);
                e && e.editable && (s.dettach(e), r.removeLayout(d))
            })
        }, summernoteInner: function () {
            return{dom: f, list: e, func: d, range: g}
        }})
});