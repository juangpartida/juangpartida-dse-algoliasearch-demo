import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// node_modules/algoliasearch/dist/algoliasearch-lite.umd.js
var require_algoliasearch_lite_umd = __commonJS({
  "node_modules/algoliasearch/dist/algoliasearch-lite.umd.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).algoliasearch = t();
    }(exports, function() {
      "use strict";
      function e(e2, t2, r2) {
        return t2 in e2 ? Object.defineProperty(e2, t2, { value: r2, enumerable: true, configurable: true, writable: true }) : e2[t2] = r2, e2;
      }
      function t(e2, t2) {
        var r2 = Object.keys(e2);
        if (Object.getOwnPropertySymbols) {
          var n2 = Object.getOwnPropertySymbols(e2);
          t2 && (n2 = n2.filter(function(t3) {
            return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
          })), r2.push.apply(r2, n2);
        }
        return r2;
      }
      function r(r2) {
        for (var n2 = 1; n2 < arguments.length; n2++) {
          var o2 = null != arguments[n2] ? arguments[n2] : {};
          n2 % 2 ? t(Object(o2), true).forEach(function(t2) {
            e(r2, t2, o2[t2]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r2, Object.getOwnPropertyDescriptors(o2)) : t(Object(o2)).forEach(function(e2) {
            Object.defineProperty(r2, e2, Object.getOwnPropertyDescriptor(o2, e2));
          });
        }
        return r2;
      }
      function n(e2, t2) {
        if (null == e2) return {};
        var r2, n2, o2 = function(e3, t3) {
          if (null == e3) return {};
          var r3, n3, o3 = {}, a3 = Object.keys(e3);
          for (n3 = 0; n3 < a3.length; n3++) r3 = a3[n3], t3.indexOf(r3) >= 0 || (o3[r3] = e3[r3]);
          return o3;
        }(e2, t2);
        if (Object.getOwnPropertySymbols) {
          var a2 = Object.getOwnPropertySymbols(e2);
          for (n2 = 0; n2 < a2.length; n2++) r2 = a2[n2], t2.indexOf(r2) >= 0 || Object.prototype.propertyIsEnumerable.call(e2, r2) && (o2[r2] = e2[r2]);
        }
        return o2;
      }
      function o(e2, t2) {
        return function(e3) {
          if (Array.isArray(e3)) return e3;
        }(e2) || function(e3, t3) {
          if (!(Symbol.iterator in Object(e3) || "[object Arguments]" === Object.prototype.toString.call(e3))) return;
          var r2 = [], n2 = true, o2 = false, a2 = void 0;
          try {
            for (var u2, i2 = e3[Symbol.iterator](); !(n2 = (u2 = i2.next()).done) && (r2.push(u2.value), !t3 || r2.length !== t3); n2 = true) ;
          } catch (e4) {
            o2 = true, a2 = e4;
          } finally {
            try {
              n2 || null == i2.return || i2.return();
            } finally {
              if (o2) throw a2;
            }
          }
          return r2;
        }(e2, t2) || function() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }();
      }
      function a(e2) {
        return function(e3) {
          if (Array.isArray(e3)) {
            for (var t2 = 0, r2 = new Array(e3.length); t2 < e3.length; t2++) r2[t2] = e3[t2];
            return r2;
          }
        }(e2) || function(e3) {
          if (Symbol.iterator in Object(e3) || "[object Arguments]" === Object.prototype.toString.call(e3)) return Array.from(e3);
        }(e2) || function() {
          throw new TypeError("Invalid attempt to spread non-iterable instance");
        }();
      }
      function u(e2) {
        var t2, r2 = "algoliasearch-client-js-".concat(e2.key), n2 = function() {
          return void 0 === t2 && (t2 = e2.localStorage || window.localStorage), t2;
        }, a2 = function() {
          return JSON.parse(n2().getItem(r2) || "{}");
        }, u2 = function(e3) {
          n2().setItem(r2, JSON.stringify(e3));
        }, i2 = function() {
          var t3 = e2.timeToLive ? 1e3 * e2.timeToLive : null, r3 = a2(), n3 = Object.fromEntries(Object.entries(r3).filter(function(e3) {
            return void 0 !== o(e3, 2)[1].timestamp;
          }));
          if (u2(n3), t3) {
            var i3 = Object.fromEntries(Object.entries(n3).filter(function(e3) {
              var r4 = o(e3, 2)[1], n4 = (/* @__PURE__ */ new Date()).getTime();
              return !(r4.timestamp + t3 < n4);
            }));
            u2(i3);
          }
        };
        return { get: function(e3, t3) {
          var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
            return Promise.resolve();
          } };
          return Promise.resolve().then(function() {
            i2();
            var t4 = JSON.stringify(e3);
            return a2()[t4];
          }).then(function(e4) {
            return Promise.all([e4 ? e4.value : t3(), void 0 !== e4]);
          }).then(function(e4) {
            var t4 = o(e4, 2), n3 = t4[0], a3 = t4[1];
            return Promise.all([n3, a3 || r3.miss(n3)]);
          }).then(function(e4) {
            return o(e4, 1)[0];
          });
        }, set: function(e3, t3) {
          return Promise.resolve().then(function() {
            var o2 = a2();
            return o2[JSON.stringify(e3)] = { timestamp: (/* @__PURE__ */ new Date()).getTime(), value: t3 }, n2().setItem(r2, JSON.stringify(o2)), t3;
          });
        }, delete: function(e3) {
          return Promise.resolve().then(function() {
            var t3 = a2();
            delete t3[JSON.stringify(e3)], n2().setItem(r2, JSON.stringify(t3));
          });
        }, clear: function() {
          return Promise.resolve().then(function() {
            n2().removeItem(r2);
          });
        } };
      }
      function i(e2) {
        var t2 = a(e2.caches), r2 = t2.shift();
        return void 0 === r2 ? { get: function(e3, t3) {
          var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
            return Promise.resolve();
          } }, n2 = t3();
          return n2.then(function(e4) {
            return Promise.all([e4, r3.miss(e4)]);
          }).then(function(e4) {
            return o(e4, 1)[0];
          });
        }, set: function(e3, t3) {
          return Promise.resolve(t3);
        }, delete: function(e3) {
          return Promise.resolve();
        }, clear: function() {
          return Promise.resolve();
        } } : { get: function(e3, n2) {
          var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
            return Promise.resolve();
          } };
          return r2.get(e3, n2, o2).catch(function() {
            return i({ caches: t2 }).get(e3, n2, o2);
          });
        }, set: function(e3, n2) {
          return r2.set(e3, n2).catch(function() {
            return i({ caches: t2 }).set(e3, n2);
          });
        }, delete: function(e3) {
          return r2.delete(e3).catch(function() {
            return i({ caches: t2 }).delete(e3);
          });
        }, clear: function() {
          return r2.clear().catch(function() {
            return i({ caches: t2 }).clear();
          });
        } };
      }
      function s() {
        var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { serializable: true }, t2 = {};
        return { get: function(r2, n2) {
          var o2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { miss: function() {
            return Promise.resolve();
          } }, a2 = JSON.stringify(r2);
          if (a2 in t2) return Promise.resolve(e2.serializable ? JSON.parse(t2[a2]) : t2[a2]);
          var u2 = n2(), i2 = o2 && o2.miss || function() {
            return Promise.resolve();
          };
          return u2.then(function(e3) {
            return i2(e3);
          }).then(function() {
            return u2;
          });
        }, set: function(r2, n2) {
          return t2[JSON.stringify(r2)] = e2.serializable ? JSON.stringify(n2) : n2, Promise.resolve(n2);
        }, delete: function(e3) {
          return delete t2[JSON.stringify(e3)], Promise.resolve();
        }, clear: function() {
          return t2 = {}, Promise.resolve();
        } };
      }
      function c(e2) {
        for (var t2 = e2.length - 1; t2 > 0; t2--) {
          var r2 = Math.floor(Math.random() * (t2 + 1)), n2 = e2[t2];
          e2[t2] = e2[r2], e2[r2] = n2;
        }
        return e2;
      }
      function l(e2, t2) {
        return t2 ? (Object.keys(t2).forEach(function(r2) {
          e2[r2] = t2[r2](e2);
        }), e2) : e2;
      }
      function f(e2) {
        for (var t2 = arguments.length, r2 = new Array(t2 > 1 ? t2 - 1 : 0), n2 = 1; n2 < t2; n2++) r2[n2 - 1] = arguments[n2];
        var o2 = 0;
        return e2.replace(/%s/g, function() {
          return encodeURIComponent(r2[o2++]);
        });
      }
      var h = { WithinQueryParameters: 0, WithinHeaders: 1 };
      function m(e2, t2) {
        var r2 = e2 || {}, n2 = r2.data || {};
        return Object.keys(r2).forEach(function(e3) {
          -1 === ["timeout", "headers", "queryParameters", "data", "cacheable"].indexOf(e3) && (n2[e3] = r2[e3]);
        }), { data: Object.entries(n2).length > 0 ? n2 : void 0, timeout: r2.timeout || t2, headers: r2.headers || {}, queryParameters: r2.queryParameters || {}, cacheable: r2.cacheable };
      }
      var d = { Read: 1, Write: 2, Any: 3 }, p = 1, v = 2, g = 3;
      function y(e2) {
        var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : p;
        return r(r({}, e2), {}, { status: t2, lastUpdate: Date.now() });
      }
      function b(e2) {
        return "string" == typeof e2 ? { protocol: "https", url: e2, accept: d.Any } : { protocol: e2.protocol || "https", url: e2.url, accept: e2.accept || d.Any };
      }
      var O = "GET", P = "POST";
      function q(e2, t2) {
        return Promise.all(t2.map(function(t3) {
          return e2.get(t3, function() {
            return Promise.resolve(y(t3));
          });
        })).then(function(e3) {
          var r2 = e3.filter(function(e4) {
            return function(e5) {
              return e5.status === p || Date.now() - e5.lastUpdate > 12e4;
            }(e4);
          }), n2 = e3.filter(function(e4) {
            return function(e5) {
              return e5.status === g && Date.now() - e5.lastUpdate <= 12e4;
            }(e4);
          }), o2 = [].concat(a(r2), a(n2));
          return { getTimeout: function(e4, t3) {
            return (0 === n2.length && 0 === e4 ? 1 : n2.length + 3 + e4) * t3;
          }, statelessHosts: o2.length > 0 ? o2.map(function(e4) {
            return b(e4);
          }) : t2 };
        });
      }
      function j(e2, t2, n2, o2) {
        var u2 = [], i2 = function(e3, t3) {
          if (e3.method === O || void 0 === e3.data && void 0 === t3.data) return;
          var n3 = Array.isArray(e3.data) ? e3.data : r(r({}, e3.data), t3.data);
          return JSON.stringify(n3);
        }(n2, o2), s2 = function(e3, t3) {
          var n3 = r(r({}, e3.headers), t3.headers), o3 = {};
          return Object.keys(n3).forEach(function(e4) {
            var t4 = n3[e4];
            o3[e4.toLowerCase()] = t4;
          }), o3;
        }(e2, o2), c2 = n2.method, l2 = n2.method !== O ? {} : r(r({}, n2.data), o2.data), f2 = r(r(r({ "x-algolia-agent": e2.userAgent.value }, e2.queryParameters), l2), o2.queryParameters), h2 = 0, m2 = function t3(r2, a2) {
          var l3 = r2.pop();
          if (void 0 === l3) throw { name: "RetryError", message: "Unreachable hosts - your application id may be incorrect. If the error persists, please reach out to the Algolia Support team: https://alg.li/support .", transporterStackTrace: A(u2) };
          var m3 = { data: i2, headers: s2, method: c2, url: S(l3, n2.path, f2), connectTimeout: a2(h2, e2.timeouts.connect), responseTimeout: a2(h2, o2.timeout) }, d2 = function(e3) {
            var t4 = { request: m3, response: e3, host: l3, triesLeft: r2.length };
            return u2.push(t4), t4;
          }, p2 = { onSuccess: function(e3) {
            return function(e4) {
              try {
                return JSON.parse(e4.content);
              } catch (t4) {
                throw /* @__PURE__ */ function(e5, t5) {
                  return { name: "DeserializationError", message: e5, response: t5 };
                }(t4.message, e4);
              }
            }(e3);
          }, onRetry: function(n3) {
            var o3 = d2(n3);
            return n3.isTimedOut && h2++, Promise.all([e2.logger.info("Retryable failure", x(o3)), e2.hostsCache.set(l3, y(l3, n3.isTimedOut ? g : v))]).then(function() {
              return t3(r2, a2);
            });
          }, onFail: function(e3) {
            throw d2(e3), function(e4, t4) {
              var r3 = e4.content, n3 = e4.status, o3 = r3;
              try {
                o3 = JSON.parse(r3).message;
              } catch (e5) {
              }
              return /* @__PURE__ */ function(e5, t5, r4) {
                return { name: "ApiError", message: e5, status: t5, transporterStackTrace: r4 };
              }(o3, n3, t4);
            }(e3, A(u2));
          } };
          return e2.requester.send(m3).then(function(e3) {
            return function(e4, t4) {
              return function(e5) {
                var t5 = e5.status;
                return e5.isTimedOut || function(e6) {
                  var t6 = e6.isTimedOut, r3 = e6.status;
                  return !t6 && 0 == ~~r3;
                }(e5) || 2 != ~~(t5 / 100) && 4 != ~~(t5 / 100);
              }(e4) ? t4.onRetry(e4) : 2 == ~~(e4.status / 100) ? t4.onSuccess(e4) : t4.onFail(e4);
            }(e3, p2);
          });
        };
        return q(e2.hostsCache, t2).then(function(e3) {
          return m2(a(e3.statelessHosts).reverse(), e3.getTimeout);
        });
      }
      function w(e2) {
        var t2 = { value: "Algolia for JavaScript (".concat(e2, ")"), add: function(e3) {
          var r2 = "; ".concat(e3.segment).concat(void 0 !== e3.version ? " (".concat(e3.version, ")") : "");
          return -1 === t2.value.indexOf(r2) && (t2.value = "".concat(t2.value).concat(r2)), t2;
        } };
        return t2;
      }
      function S(e2, t2, r2) {
        var n2 = T(r2), o2 = "".concat(e2.protocol, "://").concat(e2.url, "/").concat("/" === t2.charAt(0) ? t2.substr(1) : t2);
        return n2.length && (o2 += "?".concat(n2)), o2;
      }
      function T(e2) {
        return Object.keys(e2).map(function(t2) {
          return f("%s=%s", t2, (r2 = e2[t2], "[object Object]" === Object.prototype.toString.call(r2) || "[object Array]" === Object.prototype.toString.call(r2) ? JSON.stringify(e2[t2]) : e2[t2]));
          var r2;
        }).join("&");
      }
      function A(e2) {
        return e2.map(function(e3) {
          return x(e3);
        });
      }
      function x(e2) {
        var t2 = e2.request.headers["x-algolia-api-key"] ? { "x-algolia-api-key": "*****" } : {};
        return r(r({}, e2), {}, { request: r(r({}, e2.request), {}, { headers: r(r({}, e2.request.headers), t2) }) });
      }
      var N = function(e2) {
        var t2 = e2.appId, n2 = /* @__PURE__ */ function(e3, t3, r2) {
          var n3 = { "x-algolia-api-key": r2, "x-algolia-application-id": t3 };
          return { headers: function() {
            return e3 === h.WithinHeaders ? n3 : {};
          }, queryParameters: function() {
            return e3 === h.WithinQueryParameters ? n3 : {};
          } };
        }(void 0 !== e2.authMode ? e2.authMode : h.WithinHeaders, t2, e2.apiKey), a2 = function(e3) {
          var t3 = e3.hostsCache, r2 = e3.logger, n3 = e3.requester, a3 = e3.requestsCache, u2 = e3.responsesCache, i2 = e3.timeouts, s2 = e3.userAgent, c2 = e3.hosts, l2 = e3.queryParameters, f2 = { hostsCache: t3, logger: r2, requester: n3, requestsCache: a3, responsesCache: u2, timeouts: i2, userAgent: s2, headers: e3.headers, queryParameters: l2, hosts: c2.map(function(e4) {
            return b(e4);
          }), read: function(e4, t4) {
            var r3 = m(t4, f2.timeouts.read), n4 = function() {
              return j(f2, f2.hosts.filter(function(e5) {
                return 0 != (e5.accept & d.Read);
              }), e4, r3);
            };
            if (true !== (void 0 !== r3.cacheable ? r3.cacheable : e4.cacheable)) return n4();
            var a4 = { request: e4, mappedRequestOptions: r3, transporter: { queryParameters: f2.queryParameters, headers: f2.headers } };
            return f2.responsesCache.get(a4, function() {
              return f2.requestsCache.get(a4, function() {
                return f2.requestsCache.set(a4, n4()).then(function(e5) {
                  return Promise.all([f2.requestsCache.delete(a4), e5]);
                }, function(e5) {
                  return Promise.all([f2.requestsCache.delete(a4), Promise.reject(e5)]);
                }).then(function(e5) {
                  var t5 = o(e5, 2);
                  t5[0];
                  return t5[1];
                });
              });
            }, { miss: function(e5) {
              return f2.responsesCache.set(a4, e5);
            } });
          }, write: function(e4, t4) {
            return j(f2, f2.hosts.filter(function(e5) {
              return 0 != (e5.accept & d.Write);
            }), e4, m(t4, f2.timeouts.write));
          } };
          return f2;
        }(r(r({ hosts: [{ url: "".concat(t2, "-dsn.algolia.net"), accept: d.Read }, { url: "".concat(t2, ".algolia.net"), accept: d.Write }].concat(c([{ url: "".concat(t2, "-1.algolianet.com") }, { url: "".concat(t2, "-2.algolianet.com") }, { url: "".concat(t2, "-3.algolianet.com") }])) }, e2), {}, { headers: r(r(r({}, n2.headers()), { "content-type": "application/x-www-form-urlencoded" }), e2.headers), queryParameters: r(r({}, n2.queryParameters()), e2.queryParameters) }));
        return l({ transporter: a2, appId: t2, addAlgoliaAgent: function(e3, t3) {
          a2.userAgent.add({ segment: e3, version: t3 });
        }, clearCache: function() {
          return Promise.all([a2.requestsCache.clear(), a2.responsesCache.clear()]).then(function() {
          });
        } }, e2.methods);
      }, C = function(e2) {
        return function(t2, r2) {
          return t2.method === O ? e2.transporter.read(t2, r2) : e2.transporter.write(t2, r2);
        };
      }, E = function(e2) {
        return function(t2) {
          var r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = { transporter: e2.transporter, appId: e2.appId, indexName: t2 };
          return l(n2, r2.methods);
        };
      }, J = function(e2) {
        return function(t2, n2) {
          var o2 = t2.map(function(e3) {
            return r(r({}, e3), {}, { params: T(e3.params || {}) });
          });
          return e2.transporter.read({ method: P, path: "1/indexes/*/queries", data: { requests: o2 }, cacheable: true }, n2);
        };
      }, k = function(e2) {
        return function(t2, o2) {
          return Promise.all(t2.map(function(t3) {
            var a2 = t3.params, u2 = a2.facetName, i2 = a2.facetQuery, s2 = n(a2, ["facetName", "facetQuery"]);
            return E(e2)(t3.indexName, { methods: { searchForFacetValues: F } }).searchForFacetValues(u2, i2, r(r({}, o2), s2));
          }));
        };
      }, I = function(e2) {
        return function(t2, r2, n2) {
          return e2.transporter.read({ method: P, path: f("1/answers/%s/prediction", e2.indexName), data: { query: t2, queryLanguages: r2 }, cacheable: true }, n2);
        };
      }, R = function(e2) {
        return function(t2, r2) {
          return e2.transporter.read({ method: P, path: f("1/indexes/%s/query", e2.indexName), data: { query: t2 }, cacheable: true }, r2);
        };
      }, F = function(e2) {
        return function(t2, r2, n2) {
          return e2.transporter.read({ method: P, path: f("1/indexes/%s/facets/%s/query", e2.indexName, t2), data: { facetQuery: r2 }, cacheable: true }, n2);
        };
      }, D = 1, W = 2, H = 3;
      var Q = function(e2) {
        return function(t2, n2) {
          var o2 = t2.map(function(e3) {
            return r(r({}, e3), {}, { threshold: e3.threshold || 0 });
          });
          return e2.transporter.read({ method: P, path: "1/indexes/*/recommendations", data: { requests: o2 }, cacheable: true }, n2);
        };
      };
      function L(e2, t2, n2) {
        var o2, a2 = { appId: e2, apiKey: t2, timeouts: { connect: 1, read: 2, write: 30 }, requester: { send: function(e3) {
          return new Promise(function(t3) {
            var r2 = new XMLHttpRequest();
            r2.open(e3.method, e3.url, true), Object.keys(e3.headers).forEach(function(t4) {
              return r2.setRequestHeader(t4, e3.headers[t4]);
            });
            var n3, o3 = function(e4, n4) {
              return setTimeout(function() {
                r2.abort(), t3({ status: 0, content: n4, isTimedOut: true });
              }, 1e3 * e4);
            }, a3 = o3(e3.connectTimeout, "Connection timeout");
            r2.onreadystatechange = function() {
              r2.readyState > r2.OPENED && void 0 === n3 && (clearTimeout(a3), n3 = o3(e3.responseTimeout, "Socket timeout"));
            }, r2.onerror = function() {
              0 === r2.status && (clearTimeout(a3), clearTimeout(n3), t3({ content: r2.responseText || "Network request failed", status: r2.status, isTimedOut: false }));
            }, r2.onload = function() {
              clearTimeout(a3), clearTimeout(n3), t3({ content: r2.responseText, status: r2.status, isTimedOut: false });
            }, r2.send(e3.data);
          });
        } }, logger: (o2 = H, { debug: function(e3, t3) {
          return D >= o2 && console.debug(e3, t3), Promise.resolve();
        }, info: function(e3, t3) {
          return W >= o2 && console.info(e3, t3), Promise.resolve();
        }, error: function(e3, t3) {
          return console.error(e3, t3), Promise.resolve();
        } }), responsesCache: s(), requestsCache: s({ serializable: false }), hostsCache: i({ caches: [u({ key: "".concat("4.24.0", "-").concat(e2) }), s()] }), userAgent: w("4.24.0").add({ segment: "Browser", version: "lite" }), authMode: h.WithinQueryParameters };
        return N(r(r(r({}, a2), n2), {}, { methods: { search: J, searchForFacetValues: k, multipleQueries: J, multipleSearchForFacetValues: k, customRequest: C, initIndex: function(e3) {
          return function(t3) {
            return E(e3)(t3, { methods: { search: R, searchForFacetValues: F, findAnswers: I } });
          };
        }, getRecommendations: Q } }));
      }
      return L.version = "4.24.0", L;
    });
  }
});
export default require_algoliasearch_lite_umd();
/*! Bundled license information:

algoliasearch/dist/algoliasearch-lite.umd.js:
  (*! algoliasearch-lite.umd.js | 4.24.0 | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript *)
*/
//# sourceMappingURL=algoliasearch_lite.js.map
