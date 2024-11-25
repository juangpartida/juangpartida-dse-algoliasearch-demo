import {
  require_react
} from "./chunk-32E4H3EV.js";
import {
  __commonJS,
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@algolia/events/events.js
var require_events = __commonJS({
  "node_modules/@algolia/events/events.js"(exports, module) {
    function EventEmitter2() {
      this._events = this._events || {};
      this._maxListeners = this._maxListeners || void 0;
    }
    module.exports = EventEmitter2;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._maxListeners = void 0;
    EventEmitter2.defaultMaxListeners = 10;
    EventEmitter2.prototype.setMaxListeners = function(n) {
      if (!isNumber(n) || n < 0 || isNaN(n))
        throw TypeError("n must be a positive number");
      this._maxListeners = n;
      return this;
    };
    EventEmitter2.prototype.emit = function(type) {
      var er, handler, len, args, i, listeners;
      if (!this._events)
        this._events = {};
      if (type === "error") {
        if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
          er = arguments[1];
          if (er instanceof Error) {
            throw er;
          } else {
            var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
            err.context = er;
            throw err;
          }
        }
      }
      handler = this._events[type];
      if (isUndefined(handler))
        return false;
      if (isFunction(handler)) {
        switch (arguments.length) {
          case 1:
            handler.call(this);
            break;
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          default:
            args = Array.prototype.slice.call(arguments, 1);
            handler.apply(this, args);
        }
      } else if (isObject(handler)) {
        args = Array.prototype.slice.call(arguments, 1);
        listeners = handler.slice();
        len = listeners.length;
        for (i = 0; i < len; i++)
          listeners[i].apply(this, args);
      }
      return true;
    };
    EventEmitter2.prototype.addListener = function(type, listener) {
      var m;
      if (!isFunction(listener))
        throw TypeError("listener must be a function");
      if (!this._events)
        this._events = {};
      if (this._events.newListener)
        this.emit(
          "newListener",
          type,
          isFunction(listener.listener) ? listener.listener : listener
        );
      if (!this._events[type])
        this._events[type] = listener;
      else if (isObject(this._events[type]))
        this._events[type].push(listener);
      else
        this._events[type] = [this._events[type], listener];
      if (isObject(this._events[type]) && !this._events[type].warned) {
        if (!isUndefined(this._maxListeners)) {
          m = this._maxListeners;
        } else {
          m = EventEmitter2.defaultMaxListeners;
        }
        if (m && m > 0 && this._events[type].length > m) {
          this._events[type].warned = true;
          console.error(
            "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
            this._events[type].length
          );
          if (typeof console.trace === "function") {
            console.trace();
          }
        }
      }
      return this;
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.once = function(type, listener) {
      if (!isFunction(listener))
        throw TypeError("listener must be a function");
      var fired = false;
      function g() {
        this.removeListener(type, g);
        if (!fired) {
          fired = true;
          listener.apply(this, arguments);
        }
      }
      g.listener = listener;
      this.on(type, g);
      return this;
    };
    EventEmitter2.prototype.removeListener = function(type, listener) {
      var list, position, length, i;
      if (!isFunction(listener))
        throw TypeError("listener must be a function");
      if (!this._events || !this._events[type])
        return this;
      list = this._events[type];
      length = list.length;
      position = -1;
      if (list === listener || isFunction(list.listener) && list.listener === listener) {
        delete this._events[type];
        if (this._events.removeListener)
          this.emit("removeListener", type, listener);
      } else if (isObject(list)) {
        for (i = length; i-- > 0; ) {
          if (list[i] === listener || list[i].listener && list[i].listener === listener) {
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (list.length === 1) {
          list.length = 0;
          delete this._events[type];
        } else {
          list.splice(position, 1);
        }
        if (this._events.removeListener)
          this.emit("removeListener", type, listener);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function(type) {
      var key, listeners;
      if (!this._events)
        return this;
      if (!this._events.removeListener) {
        if (arguments.length === 0)
          this._events = {};
        else if (this._events[type])
          delete this._events[type];
        return this;
      }
      if (arguments.length === 0) {
        for (key in this._events) {
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = {};
        return this;
      }
      listeners = this._events[type];
      if (isFunction(listeners)) {
        this.removeListener(type, listeners);
      } else if (listeners) {
        while (listeners.length)
          this.removeListener(type, listeners[listeners.length - 1]);
      }
      delete this._events[type];
      return this;
    };
    EventEmitter2.prototype.listeners = function(type) {
      var ret;
      if (!this._events || !this._events[type])
        ret = [];
      else if (isFunction(this._events[type]))
        ret = [this._events[type]];
      else
        ret = this._events[type].slice();
      return ret;
    };
    EventEmitter2.prototype.listenerCount = function(type) {
      if (this._events) {
        var evlistener = this._events[type];
        if (isFunction(evlistener))
          return 1;
        else if (evlistener)
          return evlistener.length;
      }
      return 0;
    };
    EventEmitter2.listenerCount = function(emitter, type) {
      return emitter.listenerCount(type);
    };
    function isFunction(arg) {
      return typeof arg === "function";
    }
    function isNumber(arg) {
      return typeof arg === "number";
    }
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    function isUndefined(arg) {
      return arg === void 0;
    }
  }
});

// node_modules/algoliasearch-helper/src/functions/inherits.js
var require_inherits = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/inherits.js"(exports, module) {
    "use strict";
    function inherits(ctor, superCtor) {
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
    module.exports = inherits;
  }
});

// node_modules/algoliasearch-helper/src/DerivedHelper/index.js
var require_DerivedHelper = __commonJS({
  "node_modules/algoliasearch-helper/src/DerivedHelper/index.js"(exports, module) {
    "use strict";
    var EventEmitter2 = require_events();
    var inherits = require_inherits();
    function DerivedHelper(mainHelper, fn, recommendFn) {
      this.main = mainHelper;
      this.fn = fn;
      this.recommendFn = recommendFn;
      this.lastResults = null;
      this.lastRecommendResults = null;
    }
    inherits(DerivedHelper, EventEmitter2);
    DerivedHelper.prototype.detach = function() {
      this.removeAllListeners();
      this.main.detachDerivedHelper(this);
    };
    DerivedHelper.prototype.getModifiedState = function(parameters) {
      return this.fn(parameters);
    };
    DerivedHelper.prototype.getModifiedRecommendState = function(parameters) {
      return this.recommendFn(parameters);
    };
    module.exports = DerivedHelper;
  }
});

// node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js
var require_escapeFacetValue = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js"(exports, module) {
    "use strict";
    function escapeFacetValue2(value) {
      if (typeof value !== "string") return value;
      return String(value).replace(/^-/, "\\-");
    }
    function unescapeFacetValue2(value) {
      if (typeof value !== "string") return value;
      return value.replace(/^\\-/, "-");
    }
    module.exports = {
      escapeFacetValue: escapeFacetValue2,
      unescapeFacetValue: unescapeFacetValue2
    };
  }
});

// node_modules/algoliasearch-helper/src/functions/merge.js
var require_merge = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/merge.js"(exports, module) {
    "use strict";
    function clone(value) {
      if (typeof value === "object" && value !== null) {
        return _merge(Array.isArray(value) ? [] : {}, value);
      }
      return value;
    }
    function isObjectOrArrayOrFunction(value) {
      return typeof value === "function" || Array.isArray(value) || Object.prototype.toString.call(value) === "[object Object]";
    }
    function _merge(target, source) {
      if (target === source) {
        return target;
      }
      for (var key in source) {
        if (!Object.prototype.hasOwnProperty.call(source, key) || key === "__proto__" || key === "constructor") {
          continue;
        }
        var sourceVal = source[key];
        var targetVal = target[key];
        if (typeof targetVal !== "undefined" && typeof sourceVal === "undefined") {
          continue;
        }
        if (isObjectOrArrayOrFunction(targetVal) && isObjectOrArrayOrFunction(sourceVal)) {
          target[key] = _merge(targetVal, sourceVal);
        } else {
          target[key] = clone(sourceVal);
        }
      }
      return target;
    }
    function merge(target) {
      if (!isObjectOrArrayOrFunction(target)) {
        target = {};
      }
      for (var i = 1, l = arguments.length; i < l; i++) {
        var source = arguments[i];
        if (isObjectOrArrayOrFunction(source)) {
          _merge(target, source);
        }
      }
      return target;
    }
    module.exports = merge;
  }
});

// node_modules/algoliasearch-helper/src/functions/objectHasKeys.js
var require_objectHasKeys = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/objectHasKeys.js"(exports, module) {
    "use strict";
    function objectHasKeys(obj) {
      return obj && Object.keys(obj).length > 0;
    }
    module.exports = objectHasKeys;
  }
});

// node_modules/algoliasearch-helper/src/functions/omit.js
var require_omit = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/omit.js"(exports, module) {
    "use strict";
    function _objectWithoutPropertiesLoose53(source, excluded) {
      if (source === null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key;
      var i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    module.exports = _objectWithoutPropertiesLoose53;
  }
});

// node_modules/algoliasearch-helper/src/RecommendParameters/index.js
var require_RecommendParameters = __commonJS({
  "node_modules/algoliasearch-helper/src/RecommendParameters/index.js"(exports, module) {
    "use strict";
    function RecommendParameters(opts) {
      opts = opts || {};
      this.params = opts.params || [];
    }
    RecommendParameters.prototype = {
      constructor: RecommendParameters,
      addParams: function(params) {
        var newParams = this.params.slice();
        newParams.push(params);
        return new RecommendParameters({ params: newParams });
      },
      removeParams: function(id2) {
        return new RecommendParameters({
          params: this.params.filter(function(param) {
            return param.$$id !== id2;
          })
        });
      },
      addFrequentlyBoughtTogether: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "bought-together" })
        );
      },
      addRelatedProducts: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "related-products" })
        );
      },
      addTrendingItems: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "trending-items" })
        );
      },
      addTrendingFacets: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "trending-facets" })
        );
      },
      addLookingSimilar: function(params) {
        return this.addParams(
          Object.assign({}, params, { model: "looking-similar" })
        );
      },
      _buildQueries: function(indexName, cache) {
        return this.params.filter(function(params) {
          return cache[params.$$id] === void 0;
        }).map(function(params) {
          var query = Object.assign({}, params, {
            indexName,
            // @TODO: remove this if it ever gets handled by the API
            threshold: params.threshold || 0
          });
          delete query.$$id;
          return query;
        });
      }
    };
    module.exports = RecommendParameters;
  }
});

// node_modules/algoliasearch-helper/src/RecommendResults/index.js
var require_RecommendResults = __commonJS({
  "node_modules/algoliasearch-helper/src/RecommendResults/index.js"(exports, module) {
    "use strict";
    function RecommendResults(state, results) {
      this._state = state;
      this._rawResults = {};
      var self = this;
      state.params.forEach(function(param) {
        var id2 = param.$$id;
        self[id2] = results[id2];
        self._rawResults[id2] = results[id2];
      });
    }
    RecommendResults.prototype = {
      constructor: RecommendResults
    };
    module.exports = RecommendResults;
  }
});

// node_modules/algoliasearch-helper/src/requestBuilder.js
var require_requestBuilder = __commonJS({
  "node_modules/algoliasearch-helper/src/requestBuilder.js"(exports, module) {
    "use strict";
    var merge = require_merge();
    function sortObject(obj) {
      return Object.keys(obj).sort().reduce(function(acc, curr) {
        acc[curr] = obj[curr];
        return acc;
      }, {});
    }
    var requestBuilder = {
      /**
       * Get all the queries to send to the client, those queries can used directly
       * with the Algolia client.
       * @private
       * @param  {string} index The name of the index
       * @param  {SearchParameters} state The state from which to get the queries
       * @return {object[]} The queries
       */
      _getQueries: function getQueries(index3, state) {
        var queries = [];
        queries.push({
          indexName: index3,
          params: requestBuilder._getHitsSearchParams(state)
        });
        state.getRefinedDisjunctiveFacets().forEach(function(refinedFacet) {
          queries.push({
            indexName: index3,
            params: requestBuilder._getDisjunctiveFacetSearchParams(
              state,
              refinedFacet
            )
          });
        });
        state.getRefinedHierarchicalFacets().forEach(function(refinedFacet) {
          var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
          var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
          var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
          if (currentRefinement.length > 0 && currentRefinement[0].split(separator).length > 1) {
            var filtersMap = currentRefinement[0].split(separator).slice(0, -1).reduce(function createFiltersMap(map, segment, level) {
              return map.concat({
                attribute: hierarchicalFacet.attributes[level],
                value: level === 0 ? segment : [map[map.length - 1].value, segment].join(separator)
              });
            }, []);
            filtersMap.forEach(function(filter, level) {
              var params = requestBuilder._getDisjunctiveFacetSearchParams(
                state,
                filter.attribute,
                level === 0
              );
              function hasHierarchicalFacetFilter(value) {
                return hierarchicalFacet.attributes.some(function(attribute) {
                  return attribute === value.split(":")[0];
                });
              }
              var filteredFacetFilters = (params.facetFilters || []).reduce(
                function(acc, facetFilter) {
                  if (Array.isArray(facetFilter)) {
                    var filtered = facetFilter.filter(function(filterValue) {
                      return !hasHierarchicalFacetFilter(filterValue);
                    });
                    if (filtered.length > 0) {
                      acc.push(filtered);
                    }
                  }
                  if (typeof facetFilter === "string" && !hasHierarchicalFacetFilter(facetFilter)) {
                    acc.push(facetFilter);
                  }
                  return acc;
                },
                []
              );
              var parent = filtersMap[level - 1];
              if (level > 0) {
                params.facetFilters = filteredFacetFilters.concat(
                  parent.attribute + ":" + parent.value
                );
              } else if (filteredFacetFilters.length > 0) {
                params.facetFilters = filteredFacetFilters;
              } else {
                delete params.facetFilters;
              }
              queries.push({ indexName: index3, params });
            });
          }
        });
        return queries;
      },
      /**
       * Build search parameters used to fetch hits
       * @private
       * @param  {SearchParameters} state The state from which to get the queries
       * @return {object.<string, any>} The search parameters for hits
       */
      _getHitsSearchParams: function(state) {
        var facets = state.facets.concat(state.disjunctiveFacets).concat(requestBuilder._getHitsHierarchicalFacetsAttributes(state)).sort();
        var facetFilters = requestBuilder._getFacetFilters(state);
        var numericFilters = requestBuilder._getNumericFilters(state);
        var tagFilters = requestBuilder._getTagFilters(state);
        var additionalParams = {};
        if (facets.length > 0) {
          additionalParams.facets = facets.indexOf("*") > -1 ? ["*"] : facets;
        }
        if (tagFilters.length > 0) {
          additionalParams.tagFilters = tagFilters;
        }
        if (facetFilters.length > 0) {
          additionalParams.facetFilters = facetFilters;
        }
        if (numericFilters.length > 0) {
          additionalParams.numericFilters = numericFilters;
        }
        return sortObject(merge({}, state.getQueryParams(), additionalParams));
      },
      /**
       * Build search parameters used to fetch a disjunctive facet
       * @private
       * @param  {SearchParameters} state The state from which to get the queries
       * @param  {string} facet the associated facet name
       * @param  {boolean} hierarchicalRootLevel ?? FIXME
       * @return {object} The search parameters for a disjunctive facet
       */
      _getDisjunctiveFacetSearchParams: function(state, facet, hierarchicalRootLevel) {
        var facetFilters = requestBuilder._getFacetFilters(
          state,
          facet,
          hierarchicalRootLevel
        );
        var numericFilters = requestBuilder._getNumericFilters(state, facet);
        var tagFilters = requestBuilder._getTagFilters(state);
        var additionalParams = {
          hitsPerPage: 0,
          page: 0,
          analytics: false,
          clickAnalytics: false
        };
        if (tagFilters.length > 0) {
          additionalParams.tagFilters = tagFilters;
        }
        var hierarchicalFacet = state.getHierarchicalFacetByName(facet);
        if (hierarchicalFacet) {
          additionalParams.facets = requestBuilder._getDisjunctiveHierarchicalFacetAttribute(
            state,
            hierarchicalFacet,
            hierarchicalRootLevel
          );
        } else {
          additionalParams.facets = facet;
        }
        if (numericFilters.length > 0) {
          additionalParams.numericFilters = numericFilters;
        }
        if (facetFilters.length > 0) {
          additionalParams.facetFilters = facetFilters;
        }
        return sortObject(merge({}, state.getQueryParams(), additionalParams));
      },
      /**
       * Return the numeric filters in an algolia request fashion
       * @private
       * @param {SearchParameters} state the state from which to get the filters
       * @param {string} [facetName] the name of the attribute for which the filters should be excluded
       * @return {string[]} the numeric filters in the algolia format
       */
      _getNumericFilters: function(state, facetName) {
        if (state.numericFilters) {
          return state.numericFilters;
        }
        var numericFilters = [];
        Object.keys(state.numericRefinements).forEach(function(attribute) {
          var operators = state.numericRefinements[attribute] || {};
          Object.keys(operators).forEach(function(operator) {
            var values = operators[operator] || [];
            if (facetName !== attribute) {
              values.forEach(function(value) {
                if (Array.isArray(value)) {
                  var vs = value.map(function(v) {
                    return attribute + operator + v;
                  });
                  numericFilters.push(vs);
                } else {
                  numericFilters.push(attribute + operator + value);
                }
              });
            }
          });
        });
        return numericFilters;
      },
      /**
       * Return the tags filters depending on which format is used, either tagFilters or tagRefinements
       * @private
       * @param {SearchParameters} state the state from which to get the filters
       * @return {string} Tag filters in a single string
       */
      _getTagFilters: function(state) {
        if (state.tagFilters) {
          return state.tagFilters;
        }
        return state.tagRefinements.join(",");
      },
      /**
       * Build facetFilters parameter based on current refinements. The array returned
       * contains strings representing the facet filters in the algolia format.
       * @private
       * @param  {SearchParameters} state The state from which to get the queries
       * @param  {string} [facet] if set, the current disjunctive facet
       * @param  {boolean} [hierarchicalRootLevel] ?? FIXME
       * @return {array.<string>} The facet filters in the algolia format
       */
      _getFacetFilters: function(state, facet, hierarchicalRootLevel) {
        var facetFilters = [];
        var facetsRefinements = state.facetsRefinements || {};
        Object.keys(facetsRefinements).sort().forEach(function(facetName) {
          var facetValues = facetsRefinements[facetName] || [];
          facetValues.slice().sort().forEach(function(facetValue) {
            facetFilters.push(facetName + ":" + facetValue);
          });
        });
        var facetsExcludes = state.facetsExcludes || {};
        Object.keys(facetsExcludes).sort().forEach(function(facetName) {
          var facetValues = facetsExcludes[facetName] || [];
          facetValues.sort().forEach(function(facetValue) {
            facetFilters.push(facetName + ":-" + facetValue);
          });
        });
        var disjunctiveFacetsRefinements = state.disjunctiveFacetsRefinements || {};
        Object.keys(disjunctiveFacetsRefinements).sort().forEach(function(facetName) {
          var facetValues = disjunctiveFacetsRefinements[facetName] || [];
          if (facetName === facet || !facetValues || facetValues.length === 0) {
            return;
          }
          var orFilters = [];
          facetValues.slice().sort().forEach(function(facetValue) {
            orFilters.push(facetName + ":" + facetValue);
          });
          facetFilters.push(orFilters);
        });
        var hierarchicalFacetsRefinements = state.hierarchicalFacetsRefinements || {};
        Object.keys(hierarchicalFacetsRefinements).sort().forEach(function(facetName) {
          var facetValues = hierarchicalFacetsRefinements[facetName] || [];
          var facetValue = facetValues[0];
          if (facetValue === void 0) {
            return;
          }
          var hierarchicalFacet = state.getHierarchicalFacetByName(facetName);
          var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
          var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
          var attributeToRefine;
          var attributesIndex;
          if (facet === facetName) {
            if (facetValue.indexOf(separator) === -1 || !rootPath && hierarchicalRootLevel === true || rootPath && rootPath.split(separator).length === facetValue.split(separator).length) {
              return;
            }
            if (!rootPath) {
              attributesIndex = facetValue.split(separator).length - 2;
              facetValue = facetValue.slice(0, facetValue.lastIndexOf(separator));
            } else {
              attributesIndex = rootPath.split(separator).length - 1;
              facetValue = rootPath;
            }
            attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
          } else {
            attributesIndex = facetValue.split(separator).length - 1;
            attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
          }
          if (attributeToRefine) {
            facetFilters.push([attributeToRefine + ":" + facetValue]);
          }
        });
        return facetFilters;
      },
      _getHitsHierarchicalFacetsAttributes: function(state) {
        var out = [];
        return state.hierarchicalFacets.reduce(
          // ask for as much levels as there's hierarchical refinements
          function getHitsAttributesForHierarchicalFacet(allAttributes, hierarchicalFacet) {
            var hierarchicalRefinement = state.getHierarchicalRefinement(
              hierarchicalFacet.name
            )[0];
            if (!hierarchicalRefinement) {
              allAttributes.push(hierarchicalFacet.attributes[0]);
              return allAttributes;
            }
            var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
            var level = hierarchicalRefinement.split(separator).length;
            var newAttributes = hierarchicalFacet.attributes.slice(0, level + 1);
            return allAttributes.concat(newAttributes);
          },
          out
        );
      },
      _getDisjunctiveHierarchicalFacetAttribute: function(state, hierarchicalFacet, rootLevel) {
        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        if (rootLevel === true) {
          var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
          var attributeIndex = 0;
          if (rootPath) {
            attributeIndex = rootPath.split(separator).length;
          }
          return [hierarchicalFacet.attributes[attributeIndex]];
        }
        var hierarchicalRefinement = state.getHierarchicalRefinement(hierarchicalFacet.name)[0] || "";
        var parentLevel = hierarchicalRefinement.split(separator).length - 1;
        return hierarchicalFacet.attributes.slice(0, parentLevel + 1);
      },
      getSearchForFacetQuery: function(facetName, query, maxFacetHits, state) {
        var stateForSearchForFacetValues = state.isDisjunctiveFacet(facetName) ? state.clearRefinements(facetName) : state;
        var searchForFacetSearchParameters = {
          facetQuery: query,
          facetName
        };
        if (typeof maxFacetHits === "number") {
          searchForFacetSearchParameters.maxFacetHits = maxFacetHits;
        }
        return sortObject(
          merge(
            {},
            requestBuilder._getHitsSearchParams(stateForSearchForFacetValues),
            searchForFacetSearchParameters
          )
        );
      }
    };
    module.exports = requestBuilder;
  }
});

// node_modules/algoliasearch-helper/src/functions/defaultsPure.js
var require_defaultsPure = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/defaultsPure.js"(exports, module) {
    "use strict";
    module.exports = function defaultsPure() {
      var sources = Array.prototype.slice.call(arguments);
      return sources.reduceRight(function(acc, source) {
        Object.keys(Object(source)).forEach(function(key) {
          if (source[key] === void 0) {
            return;
          }
          if (acc[key] !== void 0) {
            delete acc[key];
          }
          acc[key] = source[key];
        });
        return acc;
      }, {});
    };
  }
});

// node_modules/algoliasearch-helper/src/functions/find.js
var require_find = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/find.js"(exports, module) {
    "use strict";
    module.exports = function find2(array, comparator) {
      if (!Array.isArray(array)) {
        return void 0;
      }
      for (var i = 0; i < array.length; i++) {
        if (comparator(array[i])) {
          return array[i];
        }
      }
      return void 0;
    };
  }
});

// node_modules/algoliasearch-helper/src/functions/intersection.js
var require_intersection = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/intersection.js"(exports, module) {
    "use strict";
    function intersection(arr1, arr2) {
      return arr1.filter(function(value, index3) {
        return arr2.indexOf(value) > -1 && arr1.indexOf(value) === index3;
      });
    }
    module.exports = intersection;
  }
});

// node_modules/algoliasearch-helper/src/functions/valToNumber.js
var require_valToNumber = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/valToNumber.js"(exports, module) {
    "use strict";
    function valToNumber(v) {
      if (typeof v === "number") {
        return v;
      } else if (typeof v === "string") {
        return parseFloat(v);
      } else if (Array.isArray(v)) {
        return v.map(valToNumber);
      }
      throw new Error(
        "The value should be a number, a parsable string or an array of those."
      );
    }
    module.exports = valToNumber;
  }
});

// node_modules/algoliasearch-helper/src/utils/isValidUserToken.js
var require_isValidUserToken = __commonJS({
  "node_modules/algoliasearch-helper/src/utils/isValidUserToken.js"(exports, module) {
    "use strict";
    module.exports = function isValidUserToken(userToken) {
      if (userToken === null) {
        return false;
      }
      return /^[a-zA-Z0-9_-]{1,64}$/.test(userToken);
    };
  }
});

// node_modules/algoliasearch-helper/src/SearchParameters/RefinementList.js
var require_RefinementList = __commonJS({
  "node_modules/algoliasearch-helper/src/SearchParameters/RefinementList.js"(exports, module) {
    "use strict";
    var defaultsPure = require_defaultsPure();
    var objectHasKeys = require_objectHasKeys();
    var omit = require_omit();
    var lib = {
      /**
       * Adds a refinement to a RefinementList
       * @param {RefinementList} refinementList the initial list
       * @param {string} attribute the attribute to refine
       * @param {string} value the value of the refinement, if the value is not a string it will be converted
       * @return {RefinementList} a new and updated refinement list
       */
      addRefinement: function addRefinement(refinementList, attribute, value) {
        if (lib.isRefined(refinementList, attribute, value)) {
          return refinementList;
        }
        var valueAsString = "" + value;
        var facetRefinement = !refinementList[attribute] ? [valueAsString] : refinementList[attribute].concat(valueAsString);
        var mod = {};
        mod[attribute] = facetRefinement;
        return defaultsPure({}, mod, refinementList);
      },
      /**
       * Removes refinement(s) for an attribute:
       *  - if the value is specified removes the refinement for the value on the attribute
       *  - if no value is specified removes all the refinements for this attribute
       * @param {RefinementList} refinementList the initial list
       * @param {string} attribute the attribute to refine
       * @param {string} [value] the value of the refinement
       * @return {RefinementList} a new and updated refinement lst
       */
      removeRefinement: function removeRefinement(refinementList, attribute, value) {
        if (value === void 0) {
          return lib.clearRefinement(refinementList, function(v, f) {
            return attribute === f;
          });
        }
        var valueAsString = "" + value;
        return lib.clearRefinement(refinementList, function(v, f) {
          return attribute === f && valueAsString === v;
        });
      },
      /**
       * Toggles the refinement value for an attribute.
       * @param {RefinementList} refinementList the initial list
       * @param {string} attribute the attribute to refine
       * @param {string} value the value of the refinement
       * @return {RefinementList} a new and updated list
       */
      toggleRefinement: function toggleRefinement(refinementList, attribute, value) {
        if (value === void 0)
          throw new Error("toggleRefinement should be used with a value");
        if (lib.isRefined(refinementList, attribute, value)) {
          return lib.removeRefinement(refinementList, attribute, value);
        }
        return lib.addRefinement(refinementList, attribute, value);
      },
      /**
       * Clear all or parts of a RefinementList. Depending on the arguments, three
       * kinds of behavior can happen:
       *  - if no attribute is provided: clears the whole list
       *  - if an attribute is provided as a string: clears the list for the specific attribute
       *  - if an attribute is provided as a function: discards the elements for which the function returns true
       * @param {RefinementList} refinementList the initial list
       * @param {string} [attribute] the attribute or function to discard
       * @param {string} [refinementType] optional parameter to give more context to the attribute function
       * @return {RefinementList} a new and updated refinement list
       */
      clearRefinement: function clearRefinement2(refinementList, attribute, refinementType) {
        if (attribute === void 0) {
          if (!objectHasKeys(refinementList)) {
            return refinementList;
          }
          return {};
        } else if (typeof attribute === "string") {
          return omit(refinementList, [attribute]);
        } else if (typeof attribute === "function") {
          var hasChanged = false;
          var newRefinementList = Object.keys(refinementList).reduce(
            function(memo, key) {
              var values = refinementList[key] || [];
              var facetList = values.filter(function(value) {
                return !attribute(value, key, refinementType);
              });
              if (facetList.length !== values.length) {
                hasChanged = true;
              }
              memo[key] = facetList;
              return memo;
            },
            {}
          );
          if (hasChanged) return newRefinementList;
          return refinementList;
        }
        return void 0;
      },
      /**
       * Test if the refinement value is used for the attribute. If no refinement value
       * is provided, test if the refinementList contains any refinement for the
       * given attribute.
       * @param {RefinementList} refinementList the list of refinement
       * @param {string} attribute name of the attribute
       * @param {string} [refinementValue] value of the filter/refinement
       * @return {boolean} true if the attribute is refined, false otherwise
       */
      isRefined: function isRefined2(refinementList, attribute, refinementValue) {
        var containsRefinements = Boolean(refinementList[attribute]) && refinementList[attribute].length > 0;
        if (refinementValue === void 0 || !containsRefinements) {
          return containsRefinements;
        }
        var refinementValueAsString = "" + refinementValue;
        return refinementList[attribute].indexOf(refinementValueAsString) !== -1;
      }
    };
    module.exports = lib;
  }
});

// node_modules/algoliasearch-helper/src/SearchParameters/index.js
var require_SearchParameters = __commonJS({
  "node_modules/algoliasearch-helper/src/SearchParameters/index.js"(exports, module) {
    "use strict";
    var defaultsPure = require_defaultsPure();
    var find2 = require_find();
    var intersection = require_intersection();
    var merge = require_merge();
    var objectHasKeys = require_objectHasKeys();
    var omit = require_omit();
    var valToNumber = require_valToNumber();
    var isValidUserToken = require_isValidUserToken();
    var RefinementList3 = require_RefinementList();
    function isEqualNumericRefinement(a, b) {
      if (Array.isArray(a) && Array.isArray(b)) {
        return a.length === b.length && a.every(function(el, i) {
          return isEqualNumericRefinement(b[i], el);
        });
      }
      return a === b;
    }
    function findArray(array, searchedValue) {
      return find2(array, function(currentValue) {
        return isEqualNumericRefinement(currentValue, searchedValue);
      });
    }
    function SearchParameters(newParameters) {
      var params = newParameters ? SearchParameters._parseNumbers(newParameters) : {};
      if (params.userToken !== void 0 && !isValidUserToken(params.userToken)) {
        console.warn(
          "[algoliasearch-helper] The `userToken` parameter is invalid. This can lead to wrong analytics.\n  - Format: [a-zA-Z0-9_-]{1,64}"
        );
      }
      this.facets = params.facets || [];
      this.disjunctiveFacets = params.disjunctiveFacets || [];
      this.hierarchicalFacets = params.hierarchicalFacets || [];
      this.facetsRefinements = params.facetsRefinements || {};
      this.facetsExcludes = params.facetsExcludes || {};
      this.disjunctiveFacetsRefinements = params.disjunctiveFacetsRefinements || {};
      this.numericRefinements = params.numericRefinements || {};
      this.tagRefinements = params.tagRefinements || [];
      this.hierarchicalFacetsRefinements = params.hierarchicalFacetsRefinements || {};
      var self = this;
      Object.keys(params).forEach(function(paramName) {
        var isKeyKnown = SearchParameters.PARAMETERS.indexOf(paramName) !== -1;
        var isValueDefined = params[paramName] !== void 0;
        if (!isKeyKnown && isValueDefined) {
          self[paramName] = params[paramName];
        }
      });
    }
    SearchParameters.PARAMETERS = Object.keys(new SearchParameters());
    SearchParameters._parseNumbers = function(partialState) {
      if (partialState instanceof SearchParameters) return partialState;
      var numbers = {};
      var numberKeys = [
        "aroundPrecision",
        "aroundRadius",
        "getRankingInfo",
        "minWordSizefor2Typos",
        "minWordSizefor1Typo",
        "page",
        "maxValuesPerFacet",
        "distinct",
        "minimumAroundRadius",
        "hitsPerPage",
        "minProximity"
      ];
      numberKeys.forEach(function(k) {
        var value = partialState[k];
        if (typeof value === "string") {
          var parsedValue = parseFloat(value);
          numbers[k] = isNaN(parsedValue) ? value : parsedValue;
        }
      });
      if (Array.isArray(partialState.insideBoundingBox)) {
        numbers.insideBoundingBox = partialState.insideBoundingBox.map(function(geoRect) {
          if (Array.isArray(geoRect)) {
            return geoRect.map(function(value) {
              return parseFloat(value);
            });
          }
          return geoRect;
        });
      }
      if (partialState.numericRefinements) {
        var numericRefinements = {};
        Object.keys(partialState.numericRefinements).forEach(function(attribute) {
          var operators = partialState.numericRefinements[attribute] || {};
          numericRefinements[attribute] = {};
          Object.keys(operators).forEach(function(operator) {
            var values = operators[operator];
            var parsedValues = values.map(function(v) {
              if (Array.isArray(v)) {
                return v.map(function(vPrime) {
                  if (typeof vPrime === "string") {
                    return parseFloat(vPrime);
                  }
                  return vPrime;
                });
              } else if (typeof v === "string") {
                return parseFloat(v);
              }
              return v;
            });
            numericRefinements[attribute][operator] = parsedValues;
          });
        });
        numbers.numericRefinements = numericRefinements;
      }
      return merge(partialState, numbers);
    };
    SearchParameters.make = function makeSearchParameters(newParameters) {
      var instance = new SearchParameters(newParameters);
      var hierarchicalFacets = newParameters.hierarchicalFacets || [];
      hierarchicalFacets.forEach(function(facet) {
        if (facet.rootPath) {
          var currentRefinement = instance.getHierarchicalRefinement(facet.name);
          if (currentRefinement.length > 0 && currentRefinement[0].indexOf(facet.rootPath) !== 0) {
            instance = instance.clearRefinements(facet.name);
          }
          currentRefinement = instance.getHierarchicalRefinement(facet.name);
          if (currentRefinement.length === 0) {
            instance = instance.toggleHierarchicalFacetRefinement(
              facet.name,
              facet.rootPath
            );
          }
        }
      });
      return instance;
    };
    SearchParameters.validate = function(currentState, parameters) {
      var params = parameters || {};
      if (currentState.tagFilters && params.tagRefinements && params.tagRefinements.length > 0) {
        return new Error(
          "[Tags] Cannot switch from the managed tag API to the advanced API. It is probably an error, if it is really what you want, you should first clear the tags with clearTags method."
        );
      }
      if (currentState.tagRefinements.length > 0 && params.tagFilters) {
        return new Error(
          "[Tags] Cannot switch from the advanced tag API to the managed API. It is probably an error, if it is not, you should first clear the tags with clearTags method."
        );
      }
      if (currentState.numericFilters && params.numericRefinements && objectHasKeys(params.numericRefinements)) {
        return new Error(
          "[Numeric filters] Can't switch from the advanced to the managed API. It is probably an error, if this is really what you want, you have to first clear the numeric filters."
        );
      }
      if (objectHasKeys(currentState.numericRefinements) && params.numericFilters) {
        return new Error(
          "[Numeric filters] Can't switch from the managed API to the advanced. It is probably an error, if this is really what you want, you have to first clear the numeric filters."
        );
      }
      return null;
    };
    SearchParameters.prototype = {
      constructor: SearchParameters,
      /**
       * Remove all refinements (disjunctive + conjunctive + excludes + numeric filters)
       * @method
       * @param {undefined|string|SearchParameters.clearCallback} [attribute] optional string or function
       * - If not given, means to clear all the filters.
       * - If `string`, means to clear all refinements for the `attribute` named filter.
       * - If `function`, means to clear all the refinements that return truthy values.
       * @return {SearchParameters} new instance with filters cleared
       */
      clearRefinements: function clearRefinements2(attribute) {
        var patch = {
          numericRefinements: this._clearNumericRefinements(attribute),
          facetsRefinements: RefinementList3.clearRefinement(
            this.facetsRefinements,
            attribute,
            "conjunctiveFacet"
          ),
          facetsExcludes: RefinementList3.clearRefinement(
            this.facetsExcludes,
            attribute,
            "exclude"
          ),
          disjunctiveFacetsRefinements: RefinementList3.clearRefinement(
            this.disjunctiveFacetsRefinements,
            attribute,
            "disjunctiveFacet"
          ),
          hierarchicalFacetsRefinements: RefinementList3.clearRefinement(
            this.hierarchicalFacetsRefinements,
            attribute,
            "hierarchicalFacet"
          )
        };
        if (patch.numericRefinements === this.numericRefinements && patch.facetsRefinements === this.facetsRefinements && patch.facetsExcludes === this.facetsExcludes && patch.disjunctiveFacetsRefinements === this.disjunctiveFacetsRefinements && patch.hierarchicalFacetsRefinements === this.hierarchicalFacetsRefinements) {
          return this;
        }
        return this.setQueryParameters(patch);
      },
      /**
       * Remove all the refined tags from the SearchParameters
       * @method
       * @return {SearchParameters} new instance with tags cleared
       */
      clearTags: function clearTags() {
        if (this.tagFilters === void 0 && this.tagRefinements.length === 0)
          return this;
        return this.setQueryParameters({
          tagFilters: void 0,
          tagRefinements: []
        });
      },
      /**
       * Set the index.
       * @method
       * @param {string} index the index name
       * @return {SearchParameters} new instance
       */
      setIndex: function setIndex(index3) {
        if (index3 === this.index) return this;
        return this.setQueryParameters({
          index: index3
        });
      },
      /**
       * Query setter
       * @method
       * @param {string} newQuery value for the new query
       * @return {SearchParameters} new instance
       */
      setQuery: function setQuery(newQuery) {
        if (newQuery === this.query) return this;
        return this.setQueryParameters({
          query: newQuery
        });
      },
      /**
       * Page setter
       * @method
       * @param {number} newPage new page number
       * @return {SearchParameters} new instance
       */
      setPage: function setPage(newPage) {
        if (newPage === this.page) return this;
        return this.setQueryParameters({
          page: newPage
        });
      },
      /**
       * Facets setter
       * The facets are the simple facets, used for conjunctive (and) faceting.
       * @method
       * @param {string[]} facets all the attributes of the algolia records used for conjunctive faceting
       * @return {SearchParameters} new instance
       */
      setFacets: function setFacets(facets) {
        return this.setQueryParameters({
          facets
        });
      },
      /**
       * Disjunctive facets setter
       * Change the list of disjunctive (or) facets the helper chan handle.
       * @method
       * @param {string[]} facets all the attributes of the algolia records used for disjunctive faceting
       * @return {SearchParameters} new instance
       */
      setDisjunctiveFacets: function setDisjunctiveFacets(facets) {
        return this.setQueryParameters({
          disjunctiveFacets: facets
        });
      },
      /**
       * HitsPerPage setter
       * Hits per page represents the number of hits retrieved for this query
       * @method
       * @param {number} n number of hits retrieved per page of results
       * @return {SearchParameters} new instance
       */
      setHitsPerPage: function setHitsPerPage(n) {
        if (this.hitsPerPage === n) return this;
        return this.setQueryParameters({
          hitsPerPage: n
        });
      },
      /**
       * typoTolerance setter
       * Set the value of typoTolerance
       * @method
       * @param {string} typoTolerance new value of typoTolerance ("true", "false", "min" or "strict")
       * @return {SearchParameters} new instance
       */
      setTypoTolerance: function setTypoTolerance(typoTolerance) {
        if (this.typoTolerance === typoTolerance) return this;
        return this.setQueryParameters({
          typoTolerance
        });
      },
      /**
       * Add a numeric filter for a given attribute
       * When value is an array, they are combined with OR
       * When value is a single value, it will combined with AND
       * @method
       * @param {string} attribute attribute to set the filter on
       * @param {string} operator operator of the filter (possible values: =, >, >=, <, <=, !=)
       * @param {number | number[]} value value of the filter
       * @return {SearchParameters} new instance
       * @example
       * // for price = 50 or 40
       * state.addNumericRefinement('price', '=', [50, 40]);
       * @example
       * // for size = 38 and 40
       * state.addNumericRefinement('size', '=', 38);
       * state.addNumericRefinement('size', '=', 40);
       */
      addNumericRefinement: function(attribute, operator, value) {
        var val = valToNumber(value);
        if (this.isNumericRefined(attribute, operator, val)) return this;
        var mod = merge({}, this.numericRefinements);
        mod[attribute] = merge({}, mod[attribute]);
        if (mod[attribute][operator]) {
          mod[attribute][operator] = mod[attribute][operator].slice();
          mod[attribute][operator].push(val);
        } else {
          mod[attribute][operator] = [val];
        }
        return this.setQueryParameters({
          numericRefinements: mod
        });
      },
      /**
       * Get the list of conjunctive refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {string[]} list of refinements
       */
      getConjunctiveRefinements: function(facetName) {
        if (!this.isConjunctiveFacet(facetName)) {
          return [];
        }
        return this.facetsRefinements[facetName] || [];
      },
      /**
       * Get the list of disjunctive refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {string[]} list of refinements
       */
      getDisjunctiveRefinements: function(facetName) {
        if (!this.isDisjunctiveFacet(facetName)) {
          return [];
        }
        return this.disjunctiveFacetsRefinements[facetName] || [];
      },
      /**
       * Get the list of hierarchical refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {string[]} list of refinements
       */
      getHierarchicalRefinement: function(facetName) {
        return this.hierarchicalFacetsRefinements[facetName] || [];
      },
      /**
       * Get the list of exclude refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {string[]} list of refinements
       */
      getExcludeRefinements: function(facetName) {
        if (!this.isConjunctiveFacet(facetName)) {
          return [];
        }
        return this.facetsExcludes[facetName] || [];
      },
      /**
       * Remove all the numeric filter for a given (attribute, operator)
       * @method
       * @param {string} attribute attribute to set the filter on
       * @param {string} [operator] operator of the filter (possible values: =, >, >=, <, <=, !=)
       * @param {number} [number] the value to be removed
       * @return {SearchParameters} new instance
       */
      removeNumericRefinement: function(attribute, operator, number) {
        var paramValue = number;
        if (paramValue !== void 0) {
          if (!this.isNumericRefined(attribute, operator, paramValue)) {
            return this;
          }
          return this.setQueryParameters({
            numericRefinements: this._clearNumericRefinements(function(value, key) {
              return key === attribute && value.op === operator && isEqualNumericRefinement(value.val, valToNumber(paramValue));
            })
          });
        } else if (operator !== void 0) {
          if (!this.isNumericRefined(attribute, operator)) return this;
          return this.setQueryParameters({
            numericRefinements: this._clearNumericRefinements(function(value, key) {
              return key === attribute && value.op === operator;
            })
          });
        }
        if (!this.isNumericRefined(attribute)) return this;
        return this.setQueryParameters({
          numericRefinements: this._clearNumericRefinements(function(value, key) {
            return key === attribute;
          })
        });
      },
      /**
       * Get the list of numeric refinements for a single facet
       * @param {string} facetName name of the attribute used for faceting
       * @return {SearchParameters.OperatorList} list of refinements
       */
      getNumericRefinements: function(facetName) {
        return this.numericRefinements[facetName] || {};
      },
      /**
       * Return the current refinement for the (attribute, operator)
       * @param {string} attribute attribute in the record
       * @param {string} operator operator applied on the refined values
       * @return {Array.<number|number[]>} refined values
       */
      getNumericRefinement: function(attribute, operator) {
        return this.numericRefinements[attribute] && this.numericRefinements[attribute][operator];
      },
      /**
       * Clear numeric filters.
       * @method
       * @private
       * @param {string|SearchParameters.clearCallback} [attribute] optional string or function
       * - If not given, means to clear all the filters.
       * - If `string`, means to clear all refinements for the `attribute` named filter.
       * - If `function`, means to clear all the refinements that return truthy values.
       * @return {Object.<string, OperatorList>} new numeric refinements
       */
      _clearNumericRefinements: function _clearNumericRefinements(attribute) {
        if (attribute === void 0) {
          if (!objectHasKeys(this.numericRefinements)) {
            return this.numericRefinements;
          }
          return {};
        } else if (typeof attribute === "string") {
          return omit(this.numericRefinements, [attribute]);
        } else if (typeof attribute === "function") {
          var hasChanged = false;
          var numericRefinements = this.numericRefinements;
          var newNumericRefinements = Object.keys(numericRefinements).reduce(
            function(memo, key) {
              var operators = numericRefinements[key];
              var operatorList = {};
              operators = operators || {};
              Object.keys(operators).forEach(function(operator) {
                var values = operators[operator] || [];
                var outValues = [];
                values.forEach(function(value) {
                  var predicateResult = attribute(
                    { val: value, op: operator },
                    key,
                    "numeric"
                  );
                  if (!predicateResult) outValues.push(value);
                });
                if (outValues.length !== values.length) {
                  hasChanged = true;
                }
                operatorList[operator] = outValues;
              });
              memo[key] = operatorList;
              return memo;
            },
            {}
          );
          if (hasChanged) return newNumericRefinements;
          return this.numericRefinements;
        }
        return void 0;
      },
      /**
       * Add a facet to the facets attribute of the helper configuration, if it
       * isn't already present.
       * @method
       * @param {string} facet facet name to add
       * @return {SearchParameters} new instance
       */
      addFacet: function addFacet(facet) {
        if (this.isConjunctiveFacet(facet)) {
          return this;
        }
        return this.setQueryParameters({
          facets: this.facets.concat([facet])
        });
      },
      /**
       * Add a disjunctive facet to the disjunctiveFacets attribute of the helper
       * configuration, if it isn't already present.
       * @method
       * @param {string} facet disjunctive facet name to add
       * @return {SearchParameters} new instance
       */
      addDisjunctiveFacet: function addDisjunctiveFacet(facet) {
        if (this.isDisjunctiveFacet(facet)) {
          return this;
        }
        return this.setQueryParameters({
          disjunctiveFacets: this.disjunctiveFacets.concat([facet])
        });
      },
      /**
       * Add a hierarchical facet to the hierarchicalFacets attribute of the helper
       * configuration.
       * @method
       * @param {object} hierarchicalFacet hierarchical facet to add
       * @return {SearchParameters} new instance
       * @throws will throw an error if a hierarchical facet with the same name was already declared
       */
      addHierarchicalFacet: function addHierarchicalFacet(hierarchicalFacet) {
        if (this.isHierarchicalFacet(hierarchicalFacet.name)) {
          throw new Error(
            "Cannot declare two hierarchical facets with the same name: `" + hierarchicalFacet.name + "`"
          );
        }
        return this.setQueryParameters({
          hierarchicalFacets: this.hierarchicalFacets.concat([hierarchicalFacet])
        });
      },
      /**
       * Add a refinement on a "normal" facet
       * @method
       * @param {string} facet attribute to apply the faceting on
       * @param {string} value value of the attribute (will be converted to string)
       * @return {SearchParameters} new instance
       */
      addFacetRefinement: function addFacetRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        if (RefinementList3.isRefined(this.facetsRefinements, facet, value))
          return this;
        return this.setQueryParameters({
          facetsRefinements: RefinementList3.addRefinement(
            this.facetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Exclude a value from a "normal" facet
       * @method
       * @param {string} facet attribute to apply the exclusion on
       * @param {string} value value of the attribute (will be converted to string)
       * @return {SearchParameters} new instance
       */
      addExcludeRefinement: function addExcludeRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        if (RefinementList3.isRefined(this.facetsExcludes, facet, value))
          return this;
        return this.setQueryParameters({
          facetsExcludes: RefinementList3.addRefinement(
            this.facetsExcludes,
            facet,
            value
          )
        });
      },
      /**
       * Adds a refinement on a disjunctive facet.
       * @method
       * @param {string} facet attribute to apply the faceting on
       * @param {string} value value of the attribute (will be converted to string)
       * @return {SearchParameters} new instance
       */
      addDisjunctiveFacetRefinement: function addDisjunctiveFacetRefinement(facet, value) {
        if (!this.isDisjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the disjunctiveFacets attribute of the helper configuration"
          );
        }
        if (RefinementList3.isRefined(this.disjunctiveFacetsRefinements, facet, value))
          return this;
        return this.setQueryParameters({
          disjunctiveFacetsRefinements: RefinementList3.addRefinement(
            this.disjunctiveFacetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * addTagRefinement adds a tag to the list used to filter the results
       * @param {string} tag tag to be added
       * @return {SearchParameters} new instance
       */
      addTagRefinement: function addTagRefinement(tag) {
        if (this.isTagRefined(tag)) return this;
        var modification = {
          tagRefinements: this.tagRefinements.concat(tag)
        };
        return this.setQueryParameters(modification);
      },
      /**
       * Remove a facet from the facets attribute of the helper configuration, if it
       * is present.
       * @method
       * @param {string} facet facet name to remove
       * @return {SearchParameters} new instance
       */
      removeFacet: function removeFacet(facet) {
        if (!this.isConjunctiveFacet(facet)) {
          return this;
        }
        return this.clearRefinements(facet).setQueryParameters({
          facets: this.facets.filter(function(f) {
            return f !== facet;
          })
        });
      },
      /**
       * Remove a disjunctive facet from the disjunctiveFacets attribute of the
       * helper configuration, if it is present.
       * @method
       * @param {string} facet disjunctive facet name to remove
       * @return {SearchParameters} new instance
       */
      removeDisjunctiveFacet: function removeDisjunctiveFacet(facet) {
        if (!this.isDisjunctiveFacet(facet)) {
          return this;
        }
        return this.clearRefinements(facet).setQueryParameters({
          disjunctiveFacets: this.disjunctiveFacets.filter(function(f) {
            return f !== facet;
          })
        });
      },
      /**
       * Remove a hierarchical facet from the hierarchicalFacets attribute of the
       * helper configuration, if it is present.
       * @method
       * @param {string} facet hierarchical facet name to remove
       * @return {SearchParameters} new instance
       */
      removeHierarchicalFacet: function removeHierarchicalFacet(facet) {
        if (!this.isHierarchicalFacet(facet)) {
          return this;
        }
        return this.clearRefinements(facet).setQueryParameters({
          hierarchicalFacets: this.hierarchicalFacets.filter(function(f) {
            return f.name !== facet;
          })
        });
      },
      /**
       * Remove a refinement set on facet. If a value is provided, it will clear the
       * refinement for the given value, otherwise it will clear all the refinement
       * values for the faceted attribute.
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {string} [value] value used to filter
       * @return {SearchParameters} new instance
       */
      removeFacetRefinement: function removeFacetRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        if (!RefinementList3.isRefined(this.facetsRefinements, facet, value))
          return this;
        return this.setQueryParameters({
          facetsRefinements: RefinementList3.removeRefinement(
            this.facetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Remove a negative refinement on a facet
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {string} value value used to filter
       * @return {SearchParameters} new instance
       */
      removeExcludeRefinement: function removeExcludeRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        if (!RefinementList3.isRefined(this.facetsExcludes, facet, value))
          return this;
        return this.setQueryParameters({
          facetsExcludes: RefinementList3.removeRefinement(
            this.facetsExcludes,
            facet,
            value
          )
        });
      },
      /**
       * Remove a refinement on a disjunctive facet
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {string} value value used to filter
       * @return {SearchParameters} new instance
       */
      removeDisjunctiveFacetRefinement: function removeDisjunctiveFacetRefinement(facet, value) {
        if (!this.isDisjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the disjunctiveFacets attribute of the helper configuration"
          );
        }
        if (!RefinementList3.isRefined(this.disjunctiveFacetsRefinements, facet, value))
          return this;
        return this.setQueryParameters({
          disjunctiveFacetsRefinements: RefinementList3.removeRefinement(
            this.disjunctiveFacetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Remove a tag from the list of tag refinements
       * @method
       * @param {string} tag the tag to remove
       * @return {SearchParameters} new instance
       */
      removeTagRefinement: function removeTagRefinement(tag) {
        if (!this.isTagRefined(tag)) return this;
        var modification = {
          tagRefinements: this.tagRefinements.filter(function(t) {
            return t !== tag;
          })
        };
        return this.setQueryParameters(modification);
      },
      /**
       * Generic toggle refinement method to use with facet, disjunctive facets
       * and hierarchical facets
       * @param  {string} facet the facet to refine
       * @param  {string} value the associated value
       * @return {SearchParameters} new instance
       * @throws will throw an error if the facet is not declared in the settings of the helper
       * @deprecated since version 2.19.0, see {@link SearchParameters#toggleFacetRefinement}
       */
      toggleRefinement: function toggleRefinement(facet, value) {
        return this.toggleFacetRefinement(facet, value);
      },
      /**
       * Generic toggle refinement method to use with facet, disjunctive facets
       * and hierarchical facets
       * @param  {string} facet the facet to refine
       * @param  {string} value the associated value
       * @return {SearchParameters} new instance
       * @throws will throw an error if the facet is not declared in the settings of the helper
       */
      toggleFacetRefinement: function toggleFacetRefinement(facet, value) {
        if (this.isHierarchicalFacet(facet)) {
          return this.toggleHierarchicalFacetRefinement(facet, value);
        } else if (this.isConjunctiveFacet(facet)) {
          return this.toggleConjunctiveFacetRefinement(facet, value);
        } else if (this.isDisjunctiveFacet(facet)) {
          return this.toggleDisjunctiveFacetRefinement(facet, value);
        }
        throw new Error(
          "Cannot refine the undeclared facet " + facet + "; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets"
        );
      },
      /**
       * Switch the refinement applied over a facet/value
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {SearchParameters} new instance
       */
      toggleConjunctiveFacetRefinement: function toggleConjunctiveFacetRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        return this.setQueryParameters({
          facetsRefinements: RefinementList3.toggleRefinement(
            this.facetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Switch the refinement applied over a facet/value
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {SearchParameters} new instance
       */
      toggleExcludeFacetRefinement: function toggleExcludeFacetRefinement(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the facets attribute of the helper configuration"
          );
        }
        return this.setQueryParameters({
          facetsExcludes: RefinementList3.toggleRefinement(
            this.facetsExcludes,
            facet,
            value
          )
        });
      },
      /**
       * Switch the refinement applied over a facet/value
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {SearchParameters} new instance
       */
      toggleDisjunctiveFacetRefinement: function toggleDisjunctiveFacetRefinement(facet, value) {
        if (!this.isDisjunctiveFacet(facet)) {
          throw new Error(
            facet + " is not defined in the disjunctiveFacets attribute of the helper configuration"
          );
        }
        return this.setQueryParameters({
          disjunctiveFacetsRefinements: RefinementList3.toggleRefinement(
            this.disjunctiveFacetsRefinements,
            facet,
            value
          )
        });
      },
      /**
       * Switch the refinement applied over a facet/value
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {SearchParameters} new instance
       */
      toggleHierarchicalFacetRefinement: function toggleHierarchicalFacetRefinement(facet, value) {
        if (!this.isHierarchicalFacet(facet)) {
          throw new Error(
            facet + " is not defined in the hierarchicalFacets attribute of the helper configuration"
          );
        }
        var separator = this._getHierarchicalFacetSeparator(
          this.getHierarchicalFacetByName(facet)
        );
        var mod = {};
        var upOneOrMultipleLevel = this.hierarchicalFacetsRefinements[facet] !== void 0 && this.hierarchicalFacetsRefinements[facet].length > 0 && // remove current refinement:
        // refinement was 'beer > IPA', call is toggleRefine('beer > IPA'), refinement should be `beer`
        (this.hierarchicalFacetsRefinements[facet][0] === value || // remove a parent refinement of the current refinement:
        //  - refinement was 'beer > IPA > Flying dog'
        //  - call is toggleRefine('beer > IPA')
        //  - refinement should be `beer`
        this.hierarchicalFacetsRefinements[facet][0].indexOf(
          value + separator
        ) === 0);
        if (upOneOrMultipleLevel) {
          if (value.indexOf(separator) === -1) {
            mod[facet] = [];
          } else {
            mod[facet] = [value.slice(0, value.lastIndexOf(separator))];
          }
        } else {
          mod[facet] = [value];
        }
        return this.setQueryParameters({
          hierarchicalFacetsRefinements: defaultsPure(
            {},
            mod,
            this.hierarchicalFacetsRefinements
          )
        });
      },
      /**
       * Adds a refinement on a hierarchical facet.
       * @param {string} facet the facet name
       * @param {string} path the hierarchical facet path
       * @return {SearchParameter} the new state
       * @throws Error if the facet is not defined or if the facet is refined
       */
      addHierarchicalFacetRefinement: function(facet, path) {
        if (this.isHierarchicalFacetRefined(facet)) {
          throw new Error(facet + " is already refined.");
        }
        if (!this.isHierarchicalFacet(facet)) {
          throw new Error(
            facet + " is not defined in the hierarchicalFacets attribute of the helper configuration."
          );
        }
        var mod = {};
        mod[facet] = [path];
        return this.setQueryParameters({
          hierarchicalFacetsRefinements: defaultsPure(
            {},
            mod,
            this.hierarchicalFacetsRefinements
          )
        });
      },
      /**
       * Removes the refinement set on a hierarchical facet.
       * @param {string} facet the facet name
       * @return {SearchParameter} the new state
       * @throws Error if the facet is not defined or if the facet is not refined
       */
      removeHierarchicalFacetRefinement: function(facet) {
        if (!this.isHierarchicalFacetRefined(facet)) {
          return this;
        }
        var mod = {};
        mod[facet] = [];
        return this.setQueryParameters({
          hierarchicalFacetsRefinements: defaultsPure(
            {},
            mod,
            this.hierarchicalFacetsRefinements
          )
        });
      },
      /**
       * Switch the tag refinement
       * @method
       * @param {string} tag the tag to remove or add
       * @return {SearchParameters} new instance
       */
      toggleTagRefinement: function toggleTagRefinement(tag) {
        if (this.isTagRefined(tag)) {
          return this.removeTagRefinement(tag);
        }
        return this.addTagRefinement(tag);
      },
      /**
       * Test if the facet name is from one of the disjunctive facets
       * @method
       * @param {string} facet facet name to test
       * @return {boolean} true if facet is a disjunctive facet
       */
      isDisjunctiveFacet: function(facet) {
        return this.disjunctiveFacets.indexOf(facet) > -1;
      },
      /**
       * Test if the facet name is from one of the hierarchical facets
       * @method
       * @param {string} facetName facet name to test
       * @return {boolean} true if facetName is a hierarchical facet
       */
      isHierarchicalFacet: function(facetName) {
        return this.getHierarchicalFacetByName(facetName) !== void 0;
      },
      /**
       * Test if the facet name is from one of the conjunctive/normal facets
       * @method
       * @param {string} facet facet name to test
       * @return {boolean} true if facet is a conjunctive facet
       */
      isConjunctiveFacet: function(facet) {
        return this.facets.indexOf(facet) > -1;
      },
      /**
       * Returns true if the facet is refined, either for a specific value or in
       * general.
       * @method
       * @param {string} facet name of the attribute for used for faceting
       * @param {string} value, optional value. If passed will test that this value
       * is filtering the given facet.
       * @return {boolean} returns true if refined
       */
      isFacetRefined: function isFacetRefined2(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          return false;
        }
        return RefinementList3.isRefined(this.facetsRefinements, facet, value);
      },
      /**
       * Returns true if the facet contains exclusions or if a specific value is
       * excluded.
       *
       * @method
       * @param {string} facet name of the attribute for used for faceting
       * @param {string} [value] optional value. If passed will test that this value
       * is filtering the given facet.
       * @return {boolean} returns true if refined
       */
      isExcludeRefined: function isExcludeRefined(facet, value) {
        if (!this.isConjunctiveFacet(facet)) {
          return false;
        }
        return RefinementList3.isRefined(this.facetsExcludes, facet, value);
      },
      /**
       * Returns true if the facet contains a refinement, or if a value passed is a
       * refinement for the facet.
       * @method
       * @param {string} facet name of the attribute for used for faceting
       * @param {string} value optional, will test if the value is used for refinement
       * if there is one, otherwise will test if the facet contains any refinement
       * @return {boolean} true if the facet is refined
       */
      isDisjunctiveFacetRefined: function isDisjunctiveFacetRefined(facet, value) {
        if (!this.isDisjunctiveFacet(facet)) {
          return false;
        }
        return RefinementList3.isRefined(
          this.disjunctiveFacetsRefinements,
          facet,
          value
        );
      },
      /**
       * Returns true if the facet contains a refinement, or if a value passed is a
       * refinement for the facet.
       * @method
       * @param {string} facet name of the attribute for used for faceting
       * @param {string} value optional, will test if the value is used for refinement
       * if there is one, otherwise will test if the facet contains any refinement
       * @return {boolean} true if the facet is refined
       */
      isHierarchicalFacetRefined: function isHierarchicalFacetRefined(facet, value) {
        if (!this.isHierarchicalFacet(facet)) {
          return false;
        }
        var refinements = this.getHierarchicalRefinement(facet);
        if (!value) {
          return refinements.length > 0;
        }
        return refinements.indexOf(value) !== -1;
      },
      /**
       * Test if the triple (attribute, operator, value) is already refined.
       * If only the attribute and the operator are provided, it tests if the
       * contains any refinement value.
       * @method
       * @param {string} attribute attribute for which the refinement is applied
       * @param {string} [operator] operator of the refinement
       * @param {string} [value] value of the refinement
       * @return {boolean} true if it is refined
       */
      isNumericRefined: function isNumericRefined(attribute, operator, value) {
        if (value === void 0 && operator === void 0) {
          return Boolean(this.numericRefinements[attribute]);
        }
        var isOperatorDefined = this.numericRefinements[attribute] && this.numericRefinements[attribute][operator] !== void 0;
        if (value === void 0 || !isOperatorDefined) {
          return isOperatorDefined;
        }
        var parsedValue = valToNumber(value);
        var isAttributeValueDefined = findArray(this.numericRefinements[attribute][operator], parsedValue) !== void 0;
        return isOperatorDefined && isAttributeValueDefined;
      },
      /**
       * Returns true if the tag refined, false otherwise
       * @method
       * @param {string} tag the tag to check
       * @return {boolean} true if tag is refined
       */
      isTagRefined: function isTagRefined(tag) {
        return this.tagRefinements.indexOf(tag) !== -1;
      },
      /**
       * Returns the list of all disjunctive facets refined
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {string[]} returns the list of refinements
       */
      getRefinedDisjunctiveFacets: function getRefinedDisjunctiveFacets() {
        var self = this;
        var disjunctiveNumericRefinedFacets = intersection(
          Object.keys(this.numericRefinements).filter(function(facet) {
            return Object.keys(self.numericRefinements[facet]).length > 0;
          }),
          this.disjunctiveFacets
        );
        return Object.keys(this.disjunctiveFacetsRefinements).filter(function(facet) {
          return self.disjunctiveFacetsRefinements[facet].length > 0;
        }).concat(disjunctiveNumericRefinedFacets).concat(this.getRefinedHierarchicalFacets()).sort();
      },
      /**
       * Returns the list of all disjunctive facets refined
       * @method
       * @param {string} facet name of the attribute used for faceting
       * @param {value} value value used for filtering
       * @return {string[]} returns the list of refinements
       */
      getRefinedHierarchicalFacets: function getRefinedHierarchicalFacets() {
        var self = this;
        return intersection(
          // enforce the order between the two arrays,
          // so that refinement name index === hierarchical facet index
          this.hierarchicalFacets.map(function(facet) {
            return facet.name;
          }),
          Object.keys(this.hierarchicalFacetsRefinements).filter(function(facet) {
            return self.hierarchicalFacetsRefinements[facet].length > 0;
          })
        ).sort();
      },
      /**
       * Returned the list of all disjunctive facets not refined
       * @method
       * @return {string[]} returns the list of facets that are not refined
       */
      getUnrefinedDisjunctiveFacets: function() {
        var refinedFacets = this.getRefinedDisjunctiveFacets();
        return this.disjunctiveFacets.filter(function(f) {
          return refinedFacets.indexOf(f) === -1;
        });
      },
      managedParameters: [
        "index",
        "facets",
        "disjunctiveFacets",
        "facetsRefinements",
        "hierarchicalFacets",
        "facetsExcludes",
        "disjunctiveFacetsRefinements",
        "numericRefinements",
        "tagRefinements",
        "hierarchicalFacetsRefinements"
      ],
      getQueryParams: function getQueryParams() {
        var managedParameters = this.managedParameters;
        var queryParams = {};
        var self = this;
        Object.keys(this).forEach(function(paramName) {
          var paramValue = self[paramName];
          if (managedParameters.indexOf(paramName) === -1 && paramValue !== void 0) {
            queryParams[paramName] = paramValue;
          }
        });
        return queryParams;
      },
      /**
       * Let the user set a specific value for a given parameter. Will return the
       * same instance if the parameter is invalid or if the value is the same as the
       * previous one.
       * @method
       * @param {string} parameter the parameter name
       * @param {any} value the value to be set, must be compliant with the definition
       * of the attribute on the object
       * @return {SearchParameters} the updated state
       */
      setQueryParameter: function setParameter(parameter, value) {
        if (this[parameter] === value) return this;
        var modification = {};
        modification[parameter] = value;
        return this.setQueryParameters(modification);
      },
      /**
       * Let the user set any of the parameters with a plain object.
       * @method
       * @param {object} params all the keys and the values to be updated
       * @return {SearchParameters} a new updated instance
       */
      setQueryParameters: function setQueryParameters(params) {
        if (!params) return this;
        var error = SearchParameters.validate(this, params);
        if (error) {
          throw error;
        }
        var self = this;
        var nextWithNumbers = SearchParameters._parseNumbers(params);
        var previousPlainObject = Object.keys(this).reduce(function(acc, key) {
          acc[key] = self[key];
          return acc;
        }, {});
        var nextPlainObject = Object.keys(nextWithNumbers).reduce(
          function(previous, key) {
            var isPreviousValueDefined = previous[key] !== void 0;
            var isNextValueDefined = nextWithNumbers[key] !== void 0;
            if (isPreviousValueDefined && !isNextValueDefined) {
              return omit(previous, [key]);
            }
            if (isNextValueDefined) {
              previous[key] = nextWithNumbers[key];
            }
            return previous;
          },
          previousPlainObject
        );
        return new this.constructor(nextPlainObject);
      },
      /**
       * Returns a new instance with the page reset. Two scenarios possible:
       * the page is omitted -> return the given instance
       * the page is set -> return a new instance with a page of 0
       * @return {SearchParameters} a new updated instance
       */
      resetPage: function() {
        if (this.page === void 0) {
          return this;
        }
        return this.setPage(0);
      },
      /**
       * Helper function to get the hierarchicalFacet separator or the default one (`>`)
       * @param  {object} hierarchicalFacet the hierarchicalFacet object
       * @return {string} returns the hierarchicalFacet.separator or `>` as default
       */
      _getHierarchicalFacetSortBy: function(hierarchicalFacet) {
        return hierarchicalFacet.sortBy || ["isRefined:desc", "name:asc"];
      },
      /**
       * Helper function to get the hierarchicalFacet separator or the default one (`>`)
       * @private
       * @param  {object} hierarchicalFacet the hierarchicalFacet object
       * @return {string} returns the hierarchicalFacet.separator or `>` as default
       */
      _getHierarchicalFacetSeparator: function(hierarchicalFacet) {
        return hierarchicalFacet.separator || " > ";
      },
      /**
       * Helper function to get the hierarchicalFacet prefix path or null
       * @private
       * @param  {object} hierarchicalFacet the hierarchicalFacet object
       * @return {string} returns the hierarchicalFacet.rootPath or null as default
       */
      _getHierarchicalRootPath: function(hierarchicalFacet) {
        return hierarchicalFacet.rootPath || null;
      },
      /**
       * Helper function to check if we show the parent level of the hierarchicalFacet
       * @private
       * @param  {object} hierarchicalFacet the hierarchicalFacet object
       * @return {string} returns the hierarchicalFacet.showParentLevel or true as default
       */
      _getHierarchicalShowParentLevel: function(hierarchicalFacet) {
        if (typeof hierarchicalFacet.showParentLevel === "boolean") {
          return hierarchicalFacet.showParentLevel;
        }
        return true;
      },
      /**
       * Helper function to get the hierarchicalFacet by it's name
       * @param  {string} hierarchicalFacetName the hierarchicalFacet name
       * @return {object} a hierarchicalFacet
       */
      getHierarchicalFacetByName: function(hierarchicalFacetName) {
        return find2(this.hierarchicalFacets, function(f) {
          return f.name === hierarchicalFacetName;
        });
      },
      /**
       * Get the current breadcrumb for a hierarchical facet, as an array
       * @param  {string} facetName Hierarchical facet name
       * @return {array.<string>} the path as an array of string
       */
      getHierarchicalFacetBreadcrumb: function(facetName) {
        if (!this.isHierarchicalFacet(facetName)) {
          return [];
        }
        var refinement = this.getHierarchicalRefinement(facetName)[0];
        if (!refinement) return [];
        var separator = this._getHierarchicalFacetSeparator(
          this.getHierarchicalFacetByName(facetName)
        );
        var path = refinement.split(separator);
        return path.map(function(part) {
          return part.trim();
        });
      },
      toString: function() {
        return JSON.stringify(this, null, 2);
      }
    };
    module.exports = SearchParameters;
  }
});

// node_modules/algoliasearch-helper/src/functions/compact.js
var require_compact = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/compact.js"(exports, module) {
    "use strict";
    module.exports = function compact(array) {
      if (!Array.isArray(array)) {
        return [];
      }
      return array.filter(Boolean);
    };
  }
});

// node_modules/algoliasearch-helper/src/functions/findIndex.js
var require_findIndex = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/findIndex.js"(exports, module) {
    "use strict";
    module.exports = function find2(array, comparator) {
      if (!Array.isArray(array)) {
        return -1;
      }
      for (var i = 0; i < array.length; i++) {
        if (comparator(array[i])) {
          return i;
        }
      }
      return -1;
    };
  }
});

// node_modules/algoliasearch-helper/src/functions/formatSort.js
var require_formatSort = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/formatSort.js"(exports, module) {
    "use strict";
    var find2 = require_find();
    module.exports = function formatSort(sortBy, defaults) {
      var defaultInstructions = (defaults || []).map(function(sort) {
        return sort.split(":");
      });
      return sortBy.reduce(
        function preparePredicate(out, sort) {
          var sortInstruction = sort.split(":");
          var matchingDefault = find2(
            defaultInstructions,
            function(defaultInstruction) {
              return defaultInstruction[0] === sortInstruction[0];
            }
          );
          if (sortInstruction.length > 1 || !matchingDefault) {
            out[0].push(sortInstruction[0]);
            out[1].push(sortInstruction[1]);
            return out;
          }
          out[0].push(matchingDefault[0]);
          out[1].push(matchingDefault[1]);
          return out;
        },
        [[], []]
      );
    };
  }
});

// node_modules/algoliasearch-helper/src/functions/orderBy.js
var require_orderBy = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/orderBy.js"(exports, module) {
    "use strict";
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== void 0;
        var valIsNull = value === null;
        var othIsDefined = other !== void 0;
        var othIsNull = other === null;
        if (!othIsNull && value > other || valIsNull && othIsDefined || !valIsDefined) {
          return 1;
        }
        if (!valIsNull && value < other || othIsNull && valIsDefined || !othIsDefined) {
          return -1;
        }
      }
      return 0;
    }
    function orderBy(collection, iteratees, orders) {
      if (!Array.isArray(collection)) {
        return [];
      }
      if (!Array.isArray(orders)) {
        orders = [];
      }
      var result = collection.map(function(value, index3) {
        return {
          criteria: iteratees.map(function(iteratee) {
            return value[iteratee];
          }),
          index: index3,
          value
        };
      });
      result.sort(function comparer(object, other) {
        var index3 = -1;
        while (++index3 < object.criteria.length) {
          var res = compareAscending(object.criteria[index3], other.criteria[index3]);
          if (res) {
            if (index3 >= orders.length) {
              return res;
            }
            if (orders[index3] === "desc") {
              return -res;
            }
            return res;
          }
        }
        return object.index - other.index;
      });
      return result.map(function(res) {
        return res.value;
      });
    }
    module.exports = orderBy;
  }
});

// node_modules/algoliasearch-helper/src/SearchResults/generate-hierarchical-tree.js
var require_generate_hierarchical_tree = __commonJS({
  "node_modules/algoliasearch-helper/src/SearchResults/generate-hierarchical-tree.js"(exports, module) {
    "use strict";
    module.exports = generateTrees;
    var fv = require_escapeFacetValue();
    var find2 = require_find();
    var prepareHierarchicalFacetSortBy = require_formatSort();
    var orderBy = require_orderBy();
    var escapeFacetValue2 = fv.escapeFacetValue;
    var unescapeFacetValue2 = fv.unescapeFacetValue;
    function generateTrees(state) {
      return function generate(hierarchicalFacetResult, hierarchicalFacetIndex) {
        var hierarchicalFacet = state.hierarchicalFacets[hierarchicalFacetIndex];
        var hierarchicalFacetRefinement = state.hierarchicalFacetsRefinements[hierarchicalFacet.name] && state.hierarchicalFacetsRefinements[hierarchicalFacet.name][0] || "";
        var hierarchicalSeparator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var hierarchicalRootPath = state._getHierarchicalRootPath(hierarchicalFacet);
        var hierarchicalShowParentLevel = state._getHierarchicalShowParentLevel(hierarchicalFacet);
        var sortBy = prepareHierarchicalFacetSortBy(
          state._getHierarchicalFacetSortBy(hierarchicalFacet)
        );
        var rootExhaustive = hierarchicalFacetResult.every(function(facetResult) {
          return facetResult.exhaustive;
        });
        var generateTreeFn = generateHierarchicalTree(
          sortBy,
          hierarchicalSeparator,
          hierarchicalRootPath,
          hierarchicalShowParentLevel,
          hierarchicalFacetRefinement
        );
        var results = hierarchicalFacetResult;
        if (hierarchicalRootPath) {
          results = hierarchicalFacetResult.slice(
            hierarchicalRootPath.split(hierarchicalSeparator).length
          );
        }
        return results.reduce(generateTreeFn, {
          name: state.hierarchicalFacets[hierarchicalFacetIndex].name,
          count: null,
          // root level, no count
          isRefined: true,
          // root level, always refined
          path: null,
          // root level, no path
          escapedValue: null,
          exhaustive: rootExhaustive,
          data: null
        });
      };
    }
    function generateHierarchicalTree(sortBy, hierarchicalSeparator, hierarchicalRootPath, hierarchicalShowParentLevel, currentRefinement) {
      return function generateTree(hierarchicalTree, hierarchicalFacetResult, currentHierarchicalLevel) {
        var parent = hierarchicalTree;
        if (currentHierarchicalLevel > 0) {
          var level = 0;
          parent = hierarchicalTree;
          while (level < currentHierarchicalLevel) {
            var data = parent && Array.isArray(parent.data) ? parent.data : [];
            parent = find2(data, function(subtree) {
              return subtree.isRefined;
            });
            level++;
          }
        }
        if (parent) {
          var picked = Object.keys(hierarchicalFacetResult.data).map(function(facetValue) {
            return [facetValue, hierarchicalFacetResult.data[facetValue]];
          }).filter(function(tuple) {
            var facetValue = tuple[0];
            return onlyMatchingTree(
              facetValue,
              parent.path || hierarchicalRootPath,
              currentRefinement,
              hierarchicalSeparator,
              hierarchicalRootPath,
              hierarchicalShowParentLevel
            );
          });
          parent.data = orderBy(
            picked.map(function(tuple) {
              var facetValue = tuple[0];
              var facetCount = tuple[1];
              return format(
                facetCount,
                facetValue,
                hierarchicalSeparator,
                unescapeFacetValue2(currentRefinement),
                hierarchicalFacetResult.exhaustive
              );
            }),
            sortBy[0],
            sortBy[1]
          );
        }
        return hierarchicalTree;
      };
    }
    function onlyMatchingTree(facetValue, parentPath, currentRefinement, hierarchicalSeparator, hierarchicalRootPath, hierarchicalShowParentLevel) {
      if (hierarchicalRootPath && (facetValue.indexOf(hierarchicalRootPath) !== 0 || hierarchicalRootPath === facetValue)) {
        return false;
      }
      return !hierarchicalRootPath && facetValue.indexOf(hierarchicalSeparator) === -1 || // if there is a rootPath, being root level mean 1 level under rootPath
      hierarchicalRootPath && facetValue.split(hierarchicalSeparator).length - hierarchicalRootPath.split(hierarchicalSeparator).length === 1 || // if current refinement is a root level and current facetValue is a root level,
      // keep the facetValue
      facetValue.indexOf(hierarchicalSeparator) === -1 && currentRefinement.indexOf(hierarchicalSeparator) === -1 || // currentRefinement is a child of the facet value
      currentRefinement.indexOf(facetValue) === 0 || // facetValue is a child of the current parent, add it
      facetValue.indexOf(parentPath + hierarchicalSeparator) === 0 && (hierarchicalShowParentLevel || facetValue.indexOf(currentRefinement) === 0);
    }
    function format(facetCount, facetValue, hierarchicalSeparator, currentRefinement, exhaustive) {
      var parts = facetValue.split(hierarchicalSeparator);
      return {
        name: parts[parts.length - 1].trim(),
        path: facetValue,
        escapedValue: escapeFacetValue2(facetValue),
        count: facetCount,
        isRefined: currentRefinement === facetValue || currentRefinement.indexOf(facetValue + hierarchicalSeparator) === 0,
        exhaustive,
        data: null
      };
    }
  }
});

// node_modules/algoliasearch-helper/src/SearchResults/index.js
var require_SearchResults = __commonJS({
  "node_modules/algoliasearch-helper/src/SearchResults/index.js"(exports, module) {
    "use strict";
    var compact = require_compact();
    var defaultsPure = require_defaultsPure();
    var fv = require_escapeFacetValue();
    var find2 = require_find();
    var findIndex2 = require_findIndex();
    var formatSort = require_formatSort();
    var merge = require_merge();
    var orderBy = require_orderBy();
    var escapeFacetValue2 = fv.escapeFacetValue;
    var unescapeFacetValue2 = fv.unescapeFacetValue;
    var generateHierarchicalTree = require_generate_hierarchical_tree();
    function getIndices(attributes) {
      var indices = {};
      attributes.forEach(function(val, idx) {
        indices[val] = idx;
      });
      return indices;
    }
    function assignFacetStats(dest, facetStats, key) {
      if (facetStats && facetStats[key]) {
        dest.stats = facetStats[key];
      }
    }
    function findMatchingHierarchicalFacetFromAttributeName(hierarchicalFacets, hierarchicalAttributeName) {
      return find2(
        hierarchicalFacets,
        function facetKeyMatchesAttribute(hierarchicalFacet) {
          var facetNames = hierarchicalFacet.attributes || [];
          return facetNames.indexOf(hierarchicalAttributeName) > -1;
        }
      );
    }
    function SearchResults(state, results, options) {
      var mainSubResponse = results[0] || {};
      this._rawResults = results;
      var self = this;
      Object.keys(mainSubResponse).forEach(function(key) {
        self[key] = mainSubResponse[key];
      });
      var opts = merge(
        {
          persistHierarchicalRootCount: false
        },
        options
      );
      Object.keys(opts).forEach(function(key) {
        self[key] = opts[key];
      });
      this.processingTimeMS = results.reduce(function(sum, result) {
        return result.processingTimeMS === void 0 ? sum : sum + result.processingTimeMS;
      }, 0);
      this.disjunctiveFacets = [];
      this.hierarchicalFacets = state.hierarchicalFacets.map(
        function initFutureTree() {
          return [];
        }
      );
      this.facets = [];
      var disjunctiveFacets = state.getRefinedDisjunctiveFacets();
      var facetsIndices = getIndices(state.facets);
      var disjunctiveFacetsIndices = getIndices(state.disjunctiveFacets);
      var nextDisjunctiveResult = 1;
      var mainFacets = mainSubResponse.facets || {};
      Object.keys(mainFacets).forEach(function(facetKey) {
        var facetValueObject = mainFacets[facetKey];
        var hierarchicalFacet = findMatchingHierarchicalFacetFromAttributeName(
          state.hierarchicalFacets,
          facetKey
        );
        if (hierarchicalFacet) {
          var facetIndex = hierarchicalFacet.attributes.indexOf(facetKey);
          var idxAttributeName = findIndex2(state.hierarchicalFacets, function(f) {
            return f.name === hierarchicalFacet.name;
          });
          self.hierarchicalFacets[idxAttributeName][facetIndex] = {
            attribute: facetKey,
            data: facetValueObject,
            exhaustive: mainSubResponse.exhaustiveFacetsCount
          };
        } else {
          var isFacetDisjunctive = state.disjunctiveFacets.indexOf(facetKey) !== -1;
          var isFacetConjunctive = state.facets.indexOf(facetKey) !== -1;
          var position;
          if (isFacetDisjunctive) {
            position = disjunctiveFacetsIndices[facetKey];
            self.disjunctiveFacets[position] = {
              name: facetKey,
              data: facetValueObject,
              exhaustive: mainSubResponse.exhaustiveFacetsCount
            };
            assignFacetStats(
              self.disjunctiveFacets[position],
              mainSubResponse.facets_stats,
              facetKey
            );
          }
          if (isFacetConjunctive) {
            position = facetsIndices[facetKey];
            self.facets[position] = {
              name: facetKey,
              data: facetValueObject,
              exhaustive: mainSubResponse.exhaustiveFacetsCount
            };
            assignFacetStats(
              self.facets[position],
              mainSubResponse.facets_stats,
              facetKey
            );
          }
        }
      });
      this.hierarchicalFacets = compact(this.hierarchicalFacets);
      disjunctiveFacets.forEach(function(disjunctiveFacet) {
        var result = results[nextDisjunctiveResult];
        var facets = result && result.facets ? result.facets : {};
        var hierarchicalFacet = state.getHierarchicalFacetByName(disjunctiveFacet);
        Object.keys(facets).forEach(function(dfacet) {
          var facetResults = facets[dfacet];
          var position;
          if (hierarchicalFacet) {
            position = findIndex2(state.hierarchicalFacets, function(f) {
              return f.name === hierarchicalFacet.name;
            });
            var attributeIndex = findIndex2(
              self.hierarchicalFacets[position],
              function(f) {
                return f.attribute === dfacet;
              }
            );
            if (attributeIndex === -1) {
              return;
            }
            self.hierarchicalFacets[position][attributeIndex].data = merge(
              {},
              self.hierarchicalFacets[position][attributeIndex].data,
              facetResults
            );
          } else {
            position = disjunctiveFacetsIndices[dfacet];
            var dataFromMainRequest = mainSubResponse.facets && mainSubResponse.facets[dfacet] || {};
            self.disjunctiveFacets[position] = {
              name: dfacet,
              data: defaultsPure({}, facetResults, dataFromMainRequest),
              exhaustive: result.exhaustiveFacetsCount
            };
            assignFacetStats(
              self.disjunctiveFacets[position],
              result.facets_stats,
              dfacet
            );
            if (state.disjunctiveFacetsRefinements[dfacet]) {
              state.disjunctiveFacetsRefinements[dfacet].forEach(function(refinementValue) {
                if (!self.disjunctiveFacets[position].data[refinementValue] && state.disjunctiveFacetsRefinements[dfacet].indexOf(
                  unescapeFacetValue2(refinementValue)
                ) > -1) {
                  self.disjunctiveFacets[position].data[refinementValue] = 0;
                }
              });
            }
          }
        });
        nextDisjunctiveResult++;
      });
      state.getRefinedHierarchicalFacets().forEach(function(refinedFacet) {
        var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
        if (currentRefinement.length === 0 || currentRefinement[0].split(separator).length < 2) {
          return;
        }
        results.slice(nextDisjunctiveResult).forEach(function(result) {
          var facets = result && result.facets ? result.facets : {};
          Object.keys(facets).forEach(function(dfacet) {
            var facetResults = facets[dfacet];
            var position = findIndex2(state.hierarchicalFacets, function(f) {
              return f.name === hierarchicalFacet.name;
            });
            var attributeIndex = findIndex2(
              self.hierarchicalFacets[position],
              function(f) {
                return f.attribute === dfacet;
              }
            );
            if (attributeIndex === -1) {
              return;
            }
            var defaultData = {};
            if (currentRefinement.length > 0 && !self.persistHierarchicalRootCount) {
              var root = currentRefinement[0].split(separator)[0];
              defaultData[root] = self.hierarchicalFacets[position][attributeIndex].data[root];
            }
            self.hierarchicalFacets[position][attributeIndex].data = defaultsPure(
              defaultData,
              facetResults,
              self.hierarchicalFacets[position][attributeIndex].data
            );
          });
          nextDisjunctiveResult++;
        });
      });
      Object.keys(state.facetsExcludes).forEach(function(facetName) {
        var excludes = state.facetsExcludes[facetName];
        var position = facetsIndices[facetName];
        self.facets[position] = {
          name: facetName,
          data: mainFacets[facetName],
          exhaustive: mainSubResponse.exhaustiveFacetsCount
        };
        excludes.forEach(function(facetValue) {
          self.facets[position] = self.facets[position] || { name: facetName };
          self.facets[position].data = self.facets[position].data || {};
          self.facets[position].data[facetValue] = 0;
        });
      });
      this.hierarchicalFacets = this.hierarchicalFacets.map(
        generateHierarchicalTree(state)
      );
      this.facets = compact(this.facets);
      this.disjunctiveFacets = compact(this.disjunctiveFacets);
      this._state = state;
    }
    SearchResults.prototype.getFacetByName = function(name) {
      function predicate(facet) {
        return facet.name === name;
      }
      return find2(this.facets, predicate) || find2(this.disjunctiveFacets, predicate) || find2(this.hierarchicalFacets, predicate);
    };
    function extractNormalizedFacetValues(results, attribute) {
      function predicate(facet2) {
        return facet2.name === attribute;
      }
      if (results._state.isConjunctiveFacet(attribute)) {
        var facet = find2(results.facets, predicate);
        if (!facet) return [];
        return Object.keys(facet.data).map(function(name) {
          var value = escapeFacetValue2(name);
          return {
            name,
            escapedValue: value,
            count: facet.data[name],
            isRefined: results._state.isFacetRefined(attribute, value),
            isExcluded: results._state.isExcludeRefined(attribute, name)
          };
        });
      } else if (results._state.isDisjunctiveFacet(attribute)) {
        var disjunctiveFacet = find2(results.disjunctiveFacets, predicate);
        if (!disjunctiveFacet) return [];
        return Object.keys(disjunctiveFacet.data).map(function(name) {
          var value = escapeFacetValue2(name);
          return {
            name,
            escapedValue: value,
            count: disjunctiveFacet.data[name],
            isRefined: results._state.isDisjunctiveFacetRefined(attribute, value)
          };
        });
      } else if (results._state.isHierarchicalFacet(attribute)) {
        var hierarchicalFacetValues = find2(results.hierarchicalFacets, predicate);
        if (!hierarchicalFacetValues) return hierarchicalFacetValues;
        var hierarchicalFacet = results._state.getHierarchicalFacetByName(attribute);
        var separator = results._state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var currentRefinement = unescapeFacetValue2(
          results._state.getHierarchicalRefinement(attribute)[0] || ""
        );
        if (currentRefinement.indexOf(hierarchicalFacet.rootPath) === 0) {
          currentRefinement = currentRefinement.replace(
            hierarchicalFacet.rootPath + separator,
            ""
          );
        }
        var currentRefinementSplit = currentRefinement.split(separator);
        currentRefinementSplit.unshift(attribute);
        setIsRefined(hierarchicalFacetValues, currentRefinementSplit, 0);
        return hierarchicalFacetValues;
      }
      return void 0;
    }
    function setIsRefined(item, currentRefinement, depth) {
      item.isRefined = item.name === (currentRefinement[depth] && currentRefinement[depth].trim());
      if (item.data) {
        item.data.forEach(function(child) {
          setIsRefined(child, currentRefinement, depth + 1);
        });
      }
    }
    function recSort(sortFn, node, names, level) {
      level = level || 0;
      if (Array.isArray(node)) {
        return sortFn(node, names[level]);
      }
      if (!node.data || node.data.length === 0) {
        return node;
      }
      var children = node.data.map(function(childNode) {
        return recSort(sortFn, childNode, names, level + 1);
      });
      var sortedChildren = sortFn(children, names[level]);
      var newNode = defaultsPure({ data: sortedChildren }, node);
      return newNode;
    }
    SearchResults.DEFAULT_SORT = ["isRefined:desc", "count:desc", "name:asc"];
    function vanillaSortFn(order, data) {
      return data.sort(order);
    }
    function sortViaFacetOrdering(facetValues, facetOrdering) {
      var orderedFacets = [];
      var remainingFacets = [];
      var hide = facetOrdering.hide || [];
      var order = facetOrdering.order || [];
      var reverseOrder = order.reduce(function(acc, name, i) {
        acc[name] = i;
        return acc;
      }, {});
      facetValues.forEach(function(item) {
        var name = item.path || item.name;
        var hidden = hide.indexOf(name) > -1;
        if (!hidden && reverseOrder[name] !== void 0) {
          orderedFacets[reverseOrder[name]] = item;
        } else if (!hidden) {
          remainingFacets.push(item);
        }
      });
      orderedFacets = orderedFacets.filter(function(facet) {
        return facet;
      });
      var sortRemainingBy = facetOrdering.sortRemainingBy;
      var ordering;
      if (sortRemainingBy === "hidden") {
        return orderedFacets;
      } else if (sortRemainingBy === "alpha") {
        ordering = [
          ["path", "name"],
          ["asc", "asc"]
        ];
      } else {
        ordering = [["count"], ["desc"]];
      }
      return orderedFacets.concat(
        orderBy(remainingFacets, ordering[0], ordering[1])
      );
    }
    function getFacetOrdering(results, attribute) {
      return results.renderingContent && results.renderingContent.facetOrdering && results.renderingContent.facetOrdering.values && results.renderingContent.facetOrdering.values[attribute];
    }
    SearchResults.prototype.getFacetValues = function(attribute, opts) {
      var facetValues = extractNormalizedFacetValues(this, attribute);
      if (!facetValues) {
        return void 0;
      }
      var options = defaultsPure({}, opts, {
        sortBy: SearchResults.DEFAULT_SORT,
        // if no sortBy is given, attempt to sort based on facetOrdering
        // if it is given, we still allow to sort via facet ordering first
        facetOrdering: !(opts && opts.sortBy)
      });
      var results = this;
      var attributes;
      if (Array.isArray(facetValues)) {
        attributes = [attribute];
      } else {
        var config = results._state.getHierarchicalFacetByName(facetValues.name);
        attributes = config.attributes;
      }
      return recSort(
        function(data, facetName) {
          if (options.facetOrdering) {
            var facetOrdering = getFacetOrdering(results, facetName);
            if (facetOrdering) {
              return sortViaFacetOrdering(data, facetOrdering);
            }
          }
          if (Array.isArray(options.sortBy)) {
            var order = formatSort(options.sortBy, SearchResults.DEFAULT_SORT);
            return orderBy(data, order[0], order[1]);
          } else if (typeof options.sortBy === "function") {
            return vanillaSortFn(options.sortBy, data);
          }
          throw new Error(
            "options.sortBy is optional but if defined it must be either an array of string (predicates) or a sorting function"
          );
        },
        facetValues,
        attributes
      );
    };
    SearchResults.prototype.getFacetStats = function(attribute) {
      if (this._state.isConjunctiveFacet(attribute)) {
        return getFacetStatsIfAvailable(this.facets, attribute);
      } else if (this._state.isDisjunctiveFacet(attribute)) {
        return getFacetStatsIfAvailable(this.disjunctiveFacets, attribute);
      }
      return void 0;
    };
    function getFacetStatsIfAvailable(facetList, facetName) {
      var data = find2(facetList, function(facet) {
        return facet.name === facetName;
      });
      return data && data.stats;
    }
    SearchResults.prototype.getRefinements = function() {
      var state = this._state;
      var results = this;
      var res = [];
      Object.keys(state.facetsRefinements).forEach(function(attributeName) {
        state.facetsRefinements[attributeName].forEach(function(name) {
          res.push(
            getRefinement2(state, "facet", attributeName, name, results.facets)
          );
        });
      });
      Object.keys(state.facetsExcludes).forEach(function(attributeName) {
        state.facetsExcludes[attributeName].forEach(function(name) {
          res.push(
            getRefinement2(state, "exclude", attributeName, name, results.facets)
          );
        });
      });
      Object.keys(state.disjunctiveFacetsRefinements).forEach(function(attributeName) {
        state.disjunctiveFacetsRefinements[attributeName].forEach(function(name) {
          res.push(
            getRefinement2(
              state,
              "disjunctive",
              attributeName,
              name,
              results.disjunctiveFacets
            )
          );
        });
      });
      Object.keys(state.hierarchicalFacetsRefinements).forEach(function(attributeName) {
        state.hierarchicalFacetsRefinements[attributeName].forEach(function(name) {
          res.push(
            getHierarchicalRefinement(
              state,
              attributeName,
              name,
              results.hierarchicalFacets
            )
          );
        });
      });
      Object.keys(state.numericRefinements).forEach(function(attributeName) {
        var operators = state.numericRefinements[attributeName];
        Object.keys(operators).forEach(function(operator) {
          operators[operator].forEach(function(value) {
            res.push({
              type: "numeric",
              attributeName,
              name: value,
              numericValue: value,
              operator
            });
          });
        });
      });
      state.tagRefinements.forEach(function(name) {
        res.push({ type: "tag", attributeName: "_tags", name });
      });
      return res;
    };
    function getRefinement2(state, type, attributeName, name, resultsFacets) {
      var facet = find2(resultsFacets, function(f) {
        return f.name === attributeName;
      });
      var count = facet && facet.data && facet.data[name] ? facet.data[name] : 0;
      var exhaustive = facet && facet.exhaustive || false;
      return {
        type,
        attributeName,
        name,
        count,
        exhaustive
      };
    }
    function getHierarchicalRefinement(state, attributeName, name, resultsFacets) {
      var facetDeclaration = state.getHierarchicalFacetByName(attributeName);
      var separator = state._getHierarchicalFacetSeparator(facetDeclaration);
      var split = name.split(separator);
      var rootFacet = find2(resultsFacets, function(facet2) {
        return facet2.name === attributeName;
      });
      var facet = split.reduce(function(intermediateFacet, part) {
        var newFacet = intermediateFacet && find2(intermediateFacet.data, function(f) {
          return f.name === part;
        });
        return newFacet !== void 0 ? newFacet : intermediateFacet;
      }, rootFacet);
      var count = facet && facet.count || 0;
      var exhaustive = facet && facet.exhaustive || false;
      var path = facet && facet.path || "";
      return {
        type: "hierarchical",
        attributeName,
        name: path,
        count,
        exhaustive
      };
    }
    module.exports = SearchResults;
  }
});

// node_modules/algoliasearch-helper/src/functions/flat.js
var require_flat = __commonJS({
  "node_modules/algoliasearch-helper/src/functions/flat.js"(exports, module) {
    module.exports = function flat(arr) {
      return arr.reduce(function(acc, val) {
        return acc.concat(val);
      }, []);
    };
  }
});

// node_modules/algoliasearch-helper/src/utils/sortAndMergeRecommendations.js
var require_sortAndMergeRecommendations = __commonJS({
  "node_modules/algoliasearch-helper/src/utils/sortAndMergeRecommendations.js"(exports, module) {
    "use strict";
    var find2 = require_find();
    var flat = require_flat();
    function getAverageIndices(indexTracker, nrOfObjs) {
      var avgIndices = [];
      Object.keys(indexTracker).forEach(function(key) {
        if (indexTracker[key].count < 2) {
          indexTracker[key].indexSum += 100;
        }
        avgIndices.push({
          objectID: key,
          avgOfIndices: indexTracker[key].indexSum / nrOfObjs
        });
      });
      return avgIndices.sort(function(a, b) {
        return a.avgOfIndices > b.avgOfIndices ? 1 : -1;
      });
    }
    function sortAndMergeRecommendations(results) {
      var indexTracker = {};
      results.forEach(function(hits) {
        hits.forEach(function(hit, index3) {
          if (!indexTracker[hit.objectID]) {
            indexTracker[hit.objectID] = { indexSum: index3, count: 1 };
          } else {
            indexTracker[hit.objectID] = {
              indexSum: indexTracker[hit.objectID].indexSum + index3,
              count: indexTracker[hit.objectID].count + 1
            };
          }
        });
      });
      var sortedAverageIndices = getAverageIndices(indexTracker, results.length);
      var finalOrder = sortedAverageIndices.reduce(
        function(orderedHits, avgIndexRef) {
          var result = find2(flat(results), function(hit) {
            return hit.objectID === avgIndexRef.objectID;
          });
          return result ? orderedHits.concat(result) : orderedHits;
        },
        []
      );
      return finalOrder;
    }
    module.exports = sortAndMergeRecommendations;
  }
});

// node_modules/algoliasearch-helper/src/version.js
var require_version = __commonJS({
  "node_modules/algoliasearch-helper/src/version.js"(exports, module) {
    "use strict";
    module.exports = "3.22.5";
  }
});

// node_modules/algoliasearch-helper/src/algoliasearch.helper.js
var require_algoliasearch_helper = __commonJS({
  "node_modules/algoliasearch-helper/src/algoliasearch.helper.js"(exports, module) {
    "use strict";
    var EventEmitter2 = require_events();
    var DerivedHelper = require_DerivedHelper();
    var escapeFacetValue2 = require_escapeFacetValue().escapeFacetValue;
    var inherits = require_inherits();
    var merge = require_merge();
    var objectHasKeys = require_objectHasKeys();
    var omit = require_omit();
    var RecommendParameters = require_RecommendParameters();
    var RecommendResults = require_RecommendResults();
    var requestBuilder = require_requestBuilder();
    var SearchParameters = require_SearchParameters();
    var SearchResults = require_SearchResults();
    var sortAndMergeRecommendations = require_sortAndMergeRecommendations();
    var version = require_version();
    function AlgoliaSearchHelper(client, index3, options, searchResultsOptions) {
      if (typeof client.addAlgoliaAgent === "function") {
        client.addAlgoliaAgent("JS Helper (" + version + ")");
      }
      this.setClient(client);
      var opts = options || {};
      opts.index = index3;
      this.state = SearchParameters.make(opts);
      this.recommendState = new RecommendParameters({
        params: opts.recommendState
      });
      this.lastResults = null;
      this.lastRecommendResults = null;
      this._queryId = 0;
      this._recommendQueryId = 0;
      this._lastQueryIdReceived = -1;
      this._lastRecommendQueryIdReceived = -1;
      this.derivedHelpers = [];
      this._currentNbQueries = 0;
      this._currentNbRecommendQueries = 0;
      this._searchResultsOptions = searchResultsOptions;
      this._recommendCache = {};
    }
    inherits(AlgoliaSearchHelper, EventEmitter2);
    AlgoliaSearchHelper.prototype.search = function() {
      this._search({ onlyWithDerivedHelpers: false });
      return this;
    };
    AlgoliaSearchHelper.prototype.searchOnlyWithDerivedHelpers = function() {
      this._search({ onlyWithDerivedHelpers: true });
      return this;
    };
    AlgoliaSearchHelper.prototype.recommend = function() {
      this._recommend();
      return this;
    };
    AlgoliaSearchHelper.prototype.getQuery = function() {
      var state = this.state;
      return requestBuilder._getHitsSearchParams(state);
    };
    AlgoliaSearchHelper.prototype.searchOnce = function(options, cb) {
      var tempState = !options ? this.state : this.state.setQueryParameters(options);
      var queries = requestBuilder._getQueries(tempState.index, tempState);
      var self = this;
      this._currentNbQueries++;
      this.emit("searchOnce", {
        state: tempState
      });
      if (cb) {
        this.client.search(queries).then(function(content) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) {
            self.emit("searchQueueEmpty");
          }
          cb(null, new SearchResults(tempState, content.results), tempState);
        }).catch(function(err) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) {
            self.emit("searchQueueEmpty");
          }
          cb(err, null, tempState);
        });
        return void 0;
      }
      return this.client.search(queries).then(
        function(content) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) self.emit("searchQueueEmpty");
          return {
            content: new SearchResults(tempState, content.results),
            state: tempState,
            _originalResponse: content
          };
        },
        function(e) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) self.emit("searchQueueEmpty");
          throw e;
        }
      );
    };
    AlgoliaSearchHelper.prototype.findAnswers = function(options) {
      console.warn("[algoliasearch-helper] answers is no longer supported");
      var state = this.state;
      var derivedHelper = this.derivedHelpers[0];
      if (!derivedHelper) {
        return Promise.resolve([]);
      }
      var derivedState = derivedHelper.getModifiedState(state);
      var data = merge(
        {
          attributesForPrediction: options.attributesForPrediction,
          nbHits: options.nbHits
        },
        {
          params: omit(requestBuilder._getHitsSearchParams(derivedState), [
            "attributesToSnippet",
            "hitsPerPage",
            "restrictSearchableAttributes",
            "snippetEllipsisText"
          ])
        }
      );
      var errorMessage = "search for answers was called, but this client does not have a function client.initIndex(index).findAnswers";
      if (typeof this.client.initIndex !== "function") {
        throw new Error(errorMessage);
      }
      var index3 = this.client.initIndex(derivedState.index);
      if (typeof index3.findAnswers !== "function") {
        throw new Error(errorMessage);
      }
      return index3.findAnswers(derivedState.query, options.queryLanguages, data);
    };
    AlgoliaSearchHelper.prototype.searchForFacetValues = function(facet, query, maxFacetHits, userState) {
      var clientHasSFFV = typeof this.client.searchForFacetValues === "function" && // v5 has a wrong sffv signature
      typeof this.client.searchForFacets !== "function";
      var clientHasInitIndex = typeof this.client.initIndex === "function";
      if (!clientHasSFFV && !clientHasInitIndex && typeof this.client.search !== "function") {
        throw new Error(
          "search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues or client.initIndex(index).searchForFacetValues"
        );
      }
      var state = this.state.setQueryParameters(userState || {});
      var isDisjunctive = state.isDisjunctiveFacet(facet);
      var algoliaQuery = requestBuilder.getSearchForFacetQuery(
        facet,
        query,
        maxFacetHits,
        state
      );
      this._currentNbQueries++;
      var self = this;
      var searchForFacetValuesPromise;
      if (clientHasSFFV) {
        searchForFacetValuesPromise = this.client.searchForFacetValues([
          { indexName: state.index, params: algoliaQuery }
        ]);
      } else if (clientHasInitIndex) {
        searchForFacetValuesPromise = this.client.initIndex(state.index).searchForFacetValues(algoliaQuery);
      } else {
        delete algoliaQuery.facetName;
        searchForFacetValuesPromise = this.client.search([
          {
            type: "facet",
            facet,
            indexName: state.index,
            params: algoliaQuery
          }
        ]).then(function processResponse(response) {
          return response.results[0];
        });
      }
      this.emit("searchForFacetValues", {
        state,
        facet,
        query
      });
      return searchForFacetValuesPromise.then(
        function addIsRefined(content) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) self.emit("searchQueueEmpty");
          content = Array.isArray(content) ? content[0] : content;
          content.facetHits.forEach(function(f) {
            f.escapedValue = escapeFacetValue2(f.value);
            f.isRefined = isDisjunctive ? state.isDisjunctiveFacetRefined(facet, f.escapedValue) : state.isFacetRefined(facet, f.escapedValue);
          });
          return content;
        },
        function(e) {
          self._currentNbQueries--;
          if (self._currentNbQueries === 0) self.emit("searchQueueEmpty");
          throw e;
        }
      );
    };
    AlgoliaSearchHelper.prototype.setQuery = function(q) {
      this._change({
        state: this.state.resetPage().setQuery(q),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.clearRefinements = function(name) {
      this._change({
        state: this.state.resetPage().clearRefinements(name),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.clearTags = function() {
      this._change({
        state: this.state.resetPage().clearTags(),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addDisjunctiveFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().addDisjunctiveFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addDisjunctiveRefine = function() {
      return this.addDisjunctiveFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.addHierarchicalFacetRefinement = function(facet, path) {
      this._change({
        state: this.state.resetPage().addHierarchicalFacetRefinement(facet, path),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addNumericRefinement = function(attribute, operator, value) {
      this._change({
        state: this.state.resetPage().addNumericRefinement(attribute, operator, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().addFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addRefine = function() {
      return this.addFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.addFacetExclusion = function(facet, value) {
      this._change({
        state: this.state.resetPage().addExcludeRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addExclude = function() {
      return this.addFacetExclusion.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.addTag = function(tag) {
      this._change({
        state: this.state.resetPage().addTagRefinement(tag),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addFrequentlyBoughtTogether = function(params) {
      this._recommendChange({
        state: this.recommendState.addFrequentlyBoughtTogether(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addRelatedProducts = function(params) {
      this._recommendChange({
        state: this.recommendState.addRelatedProducts(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addTrendingItems = function(params) {
      this._recommendChange({
        state: this.recommendState.addTrendingItems(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addTrendingFacets = function(params) {
      this._recommendChange({
        state: this.recommendState.addTrendingFacets(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.addLookingSimilar = function(params) {
      this._recommendChange({
        state: this.recommendState.addLookingSimilar(params)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeNumericRefinement = function(attribute, operator, value) {
      this._change({
        state: this.state.resetPage().removeNumericRefinement(attribute, operator, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeDisjunctiveFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().removeDisjunctiveFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeDisjunctiveRefine = function() {
      return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.removeHierarchicalFacetRefinement = function(facet) {
      this._change({
        state: this.state.resetPage().removeHierarchicalFacetRefinement(facet),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().removeFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeRefine = function() {
      return this.removeFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.removeFacetExclusion = function(facet, value) {
      this._change({
        state: this.state.resetPage().removeExcludeRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeExclude = function() {
      return this.removeFacetExclusion.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.removeTag = function(tag) {
      this._change({
        state: this.state.resetPage().removeTagRefinement(tag),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeFrequentlyBoughtTogether = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeRelatedProducts = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeTrendingItems = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeTrendingFacets = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.removeLookingSimilar = function(id2) {
      this._recommendChange({
        state: this.recommendState.removeParams(id2)
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.toggleFacetExclusion = function(facet, value) {
      this._change({
        state: this.state.resetPage().toggleExcludeFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.toggleExclude = function() {
      return this.toggleFacetExclusion.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.toggleRefinement = function(facet, value) {
      return this.toggleFacetRefinement(facet, value);
    };
    AlgoliaSearchHelper.prototype.toggleFacetRefinement = function(facet, value) {
      this._change({
        state: this.state.resetPage().toggleFacetRefinement(facet, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.toggleRefine = function() {
      return this.toggleFacetRefinement.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.toggleTag = function(tag) {
      this._change({
        state: this.state.resetPage().toggleTagRefinement(tag),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.nextPage = function() {
      var page = this.state.page || 0;
      return this.setPage(page + 1);
    };
    AlgoliaSearchHelper.prototype.previousPage = function() {
      var page = this.state.page || 0;
      return this.setPage(page - 1);
    };
    function setCurrentPage(page) {
      if (page < 0) throw new Error("Page requested below 0.");
      this._change({
        state: this.state.setPage(page),
        isPageReset: false
      });
      return this;
    }
    AlgoliaSearchHelper.prototype.setCurrentPage = setCurrentPage;
    AlgoliaSearchHelper.prototype.setPage = setCurrentPage;
    AlgoliaSearchHelper.prototype.setIndex = function(name) {
      this._change({
        state: this.state.resetPage().setIndex(name),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.setQueryParameter = function(parameter, value) {
      this._change({
        state: this.state.resetPage().setQueryParameter(parameter, value),
        isPageReset: true
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.setState = function(newState) {
      this._change({
        state: SearchParameters.make(newState),
        isPageReset: false
      });
      return this;
    };
    AlgoliaSearchHelper.prototype.overrideStateWithoutTriggeringChangeEvent = function(newState) {
      this.state = new SearchParameters(newState);
      return this;
    };
    AlgoliaSearchHelper.prototype.hasRefinements = function(attribute) {
      if (objectHasKeys(this.state.getNumericRefinements(attribute))) {
        return true;
      } else if (this.state.isConjunctiveFacet(attribute)) {
        return this.state.isFacetRefined(attribute);
      } else if (this.state.isDisjunctiveFacet(attribute)) {
        return this.state.isDisjunctiveFacetRefined(attribute);
      } else if (this.state.isHierarchicalFacet(attribute)) {
        return this.state.isHierarchicalFacetRefined(attribute);
      }
      return false;
    };
    AlgoliaSearchHelper.prototype.isExcluded = function(facet, value) {
      return this.state.isExcludeRefined(facet, value);
    };
    AlgoliaSearchHelper.prototype.isDisjunctiveRefined = function(facet, value) {
      return this.state.isDisjunctiveFacetRefined(facet, value);
    };
    AlgoliaSearchHelper.prototype.hasTag = function(tag) {
      return this.state.isTagRefined(tag);
    };
    AlgoliaSearchHelper.prototype.isTagRefined = function() {
      return this.hasTagRefinements.apply(this, arguments);
    };
    AlgoliaSearchHelper.prototype.getIndex = function() {
      return this.state.index;
    };
    function getCurrentPage() {
      return this.state.page;
    }
    AlgoliaSearchHelper.prototype.getCurrentPage = getCurrentPage;
    AlgoliaSearchHelper.prototype.getPage = getCurrentPage;
    AlgoliaSearchHelper.prototype.getTags = function() {
      return this.state.tagRefinements;
    };
    AlgoliaSearchHelper.prototype.getRefinements = function(facetName) {
      var refinements = [];
      if (this.state.isConjunctiveFacet(facetName)) {
        var conjRefinements = this.state.getConjunctiveRefinements(facetName);
        conjRefinements.forEach(function(r) {
          refinements.push({
            value: r,
            type: "conjunctive"
          });
        });
        var excludeRefinements = this.state.getExcludeRefinements(facetName);
        excludeRefinements.forEach(function(r) {
          refinements.push({
            value: r,
            type: "exclude"
          });
        });
      } else if (this.state.isDisjunctiveFacet(facetName)) {
        var disjunctiveRefinements = this.state.getDisjunctiveRefinements(facetName);
        disjunctiveRefinements.forEach(function(r) {
          refinements.push({
            value: r,
            type: "disjunctive"
          });
        });
      }
      var numericRefinements = this.state.getNumericRefinements(facetName);
      Object.keys(numericRefinements).forEach(function(operator) {
        var value = numericRefinements[operator];
        refinements.push({
          value,
          operator,
          type: "numeric"
        });
      });
      return refinements;
    };
    AlgoliaSearchHelper.prototype.getNumericRefinement = function(attribute, operator) {
      return this.state.getNumericRefinement(attribute, operator);
    };
    AlgoliaSearchHelper.prototype.getHierarchicalFacetBreadcrumb = function(facetName) {
      return this.state.getHierarchicalFacetBreadcrumb(facetName);
    };
    AlgoliaSearchHelper.prototype._search = function(options) {
      var state = this.state;
      var states = [];
      var mainQueries = [];
      if (!options.onlyWithDerivedHelpers) {
        mainQueries = requestBuilder._getQueries(state.index, state);
        states.push({
          state,
          queriesCount: mainQueries.length,
          helper: this
        });
        this.emit("search", {
          state,
          results: this.lastResults
        });
      }
      var derivedQueries = this.derivedHelpers.map(function(derivedHelper) {
        var derivedState = derivedHelper.getModifiedState(state);
        var derivedStateQueries = derivedState.index ? requestBuilder._getQueries(derivedState.index, derivedState) : [];
        states.push({
          state: derivedState,
          queriesCount: derivedStateQueries.length,
          helper: derivedHelper
        });
        derivedHelper.emit("search", {
          state: derivedState,
          results: derivedHelper.lastResults
        });
        return derivedStateQueries;
      });
      var queries = Array.prototype.concat.apply(mainQueries, derivedQueries);
      var queryId = this._queryId++;
      this._currentNbQueries++;
      if (!queries.length) {
        return Promise.resolve({ results: [] }).then(
          this._dispatchAlgoliaResponse.bind(this, states, queryId)
        );
      }
      try {
        this.client.search(queries).then(this._dispatchAlgoliaResponse.bind(this, states, queryId)).catch(this._dispatchAlgoliaError.bind(this, queryId));
      } catch (error) {
        this.emit("error", {
          error
        });
      }
      return void 0;
    };
    AlgoliaSearchHelper.prototype._recommend = function() {
      var searchState = this.state;
      var recommendState = this.recommendState;
      var index3 = this.getIndex();
      var states = [{ state: recommendState, index: index3, helper: this }];
      var ids = recommendState.params.map(function(param) {
        return param.$$id;
      });
      this.emit("fetch", {
        recommend: {
          state: recommendState,
          results: this.lastRecommendResults
        }
      });
      var cache = this._recommendCache;
      var derivedQueries = this.derivedHelpers.map(function(derivedHelper) {
        var derivedIndex = derivedHelper.getModifiedState(searchState).index;
        if (!derivedIndex) {
          return [];
        }
        var derivedState = derivedHelper.getModifiedRecommendState(
          new RecommendParameters()
        );
        states.push({
          state: derivedState,
          index: derivedIndex,
          helper: derivedHelper
        });
        ids = Array.prototype.concat.apply(
          ids,
          derivedState.params.map(function(param) {
            return param.$$id;
          })
        );
        derivedHelper.emit("fetch", {
          recommend: {
            state: derivedState,
            results: derivedHelper.lastRecommendResults
          }
        });
        return derivedState._buildQueries(derivedIndex, cache);
      });
      var queries = Array.prototype.concat.apply(
        this.recommendState._buildQueries(index3, cache),
        derivedQueries
      );
      if (queries.length === 0) {
        return;
      }
      if (queries.length > 0 && typeof this.client.getRecommendations === "undefined") {
        console.warn(
          "Please update algoliasearch/lite to the latest version in order to use recommend widgets."
        );
        return;
      }
      var queryId = this._recommendQueryId++;
      this._currentNbRecommendQueries++;
      try {
        this.client.getRecommendations(queries).then(this._dispatchRecommendResponse.bind(this, queryId, states, ids)).catch(this._dispatchRecommendError.bind(this, queryId));
      } catch (error) {
        this.emit("error", {
          error
        });
      }
      return;
    };
    AlgoliaSearchHelper.prototype._dispatchAlgoliaResponse = function(states, queryId, content) {
      var self = this;
      if (queryId < this._lastQueryIdReceived) {
        return;
      }
      this._currentNbQueries -= queryId - this._lastQueryIdReceived;
      this._lastQueryIdReceived = queryId;
      if (this._currentNbQueries === 0) this.emit("searchQueueEmpty");
      var results = content.results.slice();
      states.forEach(function(s) {
        var state = s.state;
        var queriesCount = s.queriesCount;
        var helper = s.helper;
        var specificResults = results.splice(0, queriesCount);
        if (!state.index) {
          helper.emit("result", {
            results: null,
            state
          });
          return;
        }
        helper.lastResults = new SearchResults(
          state,
          specificResults,
          self._searchResultsOptions
        );
        helper.emit("result", {
          results: helper.lastResults,
          state
        });
      });
    };
    AlgoliaSearchHelper.prototype._dispatchRecommendResponse = function(queryId, states, ids, content) {
      if (queryId < this._lastRecommendQueryIdReceived) {
        return;
      }
      this._currentNbRecommendQueries -= queryId - this._lastRecommendQueryIdReceived;
      this._lastRecommendQueryIdReceived = queryId;
      if (this._currentNbRecommendQueries === 0) this.emit("recommendQueueEmpty");
      var cache = this._recommendCache;
      var idsMap = {};
      ids.filter(function(id2) {
        return cache[id2] === void 0;
      }).forEach(function(id2, index3) {
        if (!idsMap[id2]) idsMap[id2] = [];
        idsMap[id2].push(index3);
      });
      Object.keys(idsMap).forEach(function(id2) {
        var indices = idsMap[id2];
        var firstResult = content.results[indices[0]];
        if (indices.length === 1) {
          cache[id2] = firstResult;
          return;
        }
        cache[id2] = Object.assign({}, firstResult, {
          hits: sortAndMergeRecommendations(
            indices.map(function(idx) {
              return content.results[idx].hits;
            })
          )
        });
      });
      var results = {};
      ids.forEach(function(id2) {
        results[id2] = cache[id2];
      });
      states.forEach(function(s) {
        var state = s.state;
        var helper = s.helper;
        if (!s.index) {
          helper.emit("recommend:result", {
            results: null,
            state
          });
          return;
        }
        helper.lastRecommendResults = new RecommendResults(state, results);
        helper.emit("recommend:result", {
          recommend: {
            results: helper.lastRecommendResults,
            state
          }
        });
      });
    };
    AlgoliaSearchHelper.prototype._dispatchAlgoliaError = function(queryId, error) {
      if (queryId < this._lastQueryIdReceived) {
        return;
      }
      this._currentNbQueries -= queryId - this._lastQueryIdReceived;
      this._lastQueryIdReceived = queryId;
      this.emit("error", {
        error
      });
      if (this._currentNbQueries === 0) this.emit("searchQueueEmpty");
    };
    AlgoliaSearchHelper.prototype._dispatchRecommendError = function(queryId, error) {
      if (queryId < this._lastRecommendQueryIdReceived) {
        return;
      }
      this._currentNbRecommendQueries -= queryId - this._lastRecommendQueryIdReceived;
      this._lastRecommendQueryIdReceived = queryId;
      this.emit("error", {
        error
      });
      if (this._currentNbRecommendQueries === 0) this.emit("recommendQueueEmpty");
    };
    AlgoliaSearchHelper.prototype.containsRefinement = function(query, facetFilters, numericFilters, tagFilters) {
      return query || facetFilters.length !== 0 || numericFilters.length !== 0 || tagFilters.length !== 0;
    };
    AlgoliaSearchHelper.prototype._hasDisjunctiveRefinements = function(facet) {
      return this.state.disjunctiveRefinements[facet] && this.state.disjunctiveRefinements[facet].length > 0;
    };
    AlgoliaSearchHelper.prototype._change = function(event) {
      var state = event.state;
      var isPageReset = event.isPageReset;
      if (state !== this.state) {
        this.state = state;
        this.emit("change", {
          state: this.state,
          results: this.lastResults,
          isPageReset
        });
      }
    };
    AlgoliaSearchHelper.prototype._recommendChange = function(event) {
      var state = event.state;
      if (state !== this.recommendState) {
        this.recommendState = state;
        this.emit("recommend:change", {
          search: {
            results: this.lastResults,
            state: this.state
          },
          recommend: {
            results: this.lastRecommendResults,
            state: this.recommendState
          }
        });
      }
    };
    AlgoliaSearchHelper.prototype.clearCache = function() {
      if (this.client.clearCache) this.client.clearCache();
      return this;
    };
    AlgoliaSearchHelper.prototype.setClient = function(newClient) {
      if (this.client === newClient) return this;
      if (typeof newClient.addAlgoliaAgent === "function") {
        newClient.addAlgoliaAgent("JS Helper (" + version + ")");
      }
      this.client = newClient;
      return this;
    };
    AlgoliaSearchHelper.prototype.getClient = function() {
      return this.client;
    };
    AlgoliaSearchHelper.prototype.derive = function(fn, recommendFn) {
      var derivedHelper = new DerivedHelper(this, fn, recommendFn);
      this.derivedHelpers.push(derivedHelper);
      return derivedHelper;
    };
    AlgoliaSearchHelper.prototype.detachDerivedHelper = function(derivedHelper) {
      var pos = this.derivedHelpers.indexOf(derivedHelper);
      if (pos === -1) throw new Error("Derived helper already detached");
      this.derivedHelpers.splice(pos, 1);
    };
    AlgoliaSearchHelper.prototype.hasPendingRequests = function() {
      return this._currentNbQueries > 0;
    };
    module.exports = AlgoliaSearchHelper;
  }
});

// node_modules/algoliasearch-helper/index.js
var require_algoliasearch_helper2 = __commonJS({
  "node_modules/algoliasearch-helper/index.js"(exports, module) {
    "use strict";
    var AlgoliaSearchHelper = require_algoliasearch_helper();
    var RecommendParameters = require_RecommendParameters();
    var RecommendResults = require_RecommendResults();
    var SearchParameters = require_SearchParameters();
    var SearchResults = require_SearchResults();
    function algoliasearchHelper5(client, index3, opts, searchResultsOptions) {
      return new AlgoliaSearchHelper(client, index3, opts, searchResultsOptions);
    }
    algoliasearchHelper5.version = require_version();
    algoliasearchHelper5.AlgoliaSearchHelper = AlgoliaSearchHelper;
    algoliasearchHelper5.SearchParameters = SearchParameters;
    algoliasearchHelper5.RecommendParameters = RecommendParameters;
    algoliasearchHelper5.SearchResults = SearchResults;
    algoliasearchHelper5.RecommendResults = RecommendResults;
    module.exports = algoliasearchHelper5;
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports, module) {
    "use strict";
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports, module) {
    "use strict";
    var formats = require_formats();
    var has2 = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array = [];
      for (var i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    }();
    var compactQueue = function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    };
    var arrayToObject = function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    };
    var merge = function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has2.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i) {
          if (has2.call(target, i)) {
            var targetItem = target[i];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has2.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    };
    var decode = function(str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    };
    var encode = function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);
        if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
          out += string.charAt(i);
          continue;
        }
        if (c < 128) {
          out = out + hexTable[c];
          continue;
        }
        if (c < 2048) {
          out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
          continue;
        }
        if (c < 55296 || c >= 57344) {
          out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
          continue;
        }
        i += 1;
        c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
      return out;
    };
    var compact = function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys2 = Object.keys(obj);
        for (var j = 0; j < keys2.length; ++j) {
          var key = keys2[j];
          var val = obj[key];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    };
    var isRegExp = function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    };
    var isBuffer = function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine2(a, b) {
      return [].concat(a, b);
    };
    var maybeMap = function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    };
    module.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isRegExp,
      maybeMap,
      merge
    };
  }
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var formats = require_formats();
    var has2 = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
        return prefix + "[]";
      },
      comma: "comma",
      indices: function indices(prefix, key) {
        return prefix + "[" + key + "]";
      },
      repeat: function repeat(prefix) {
        return prefix;
      }
    };
    var isArray = Array.isArray;
    var split = String.prototype.split;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
        return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    };
    var stringify = function stringify2(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset) {
      var obj = object;
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          if (generateArrayPrefix === "comma" && encodeValuesOnly) {
            var valuesArray = split.call(String(obj), ",");
            var valuesJoined = "";
            for (var i = 0; i < valuesArray.length; ++i) {
              valuesJoined += (i === 0 ? "" : ",") + formatter(encoder(valuesArray[i], defaults.encoder, charset, "value", format));
            }
            return [formatter(keyValue) + "=" + valuesJoined];
          }
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys2 = Object.keys(obj);
        objKeys = sort ? keys2.sort(sort) : keys2;
      }
      for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? "." + key : "[" + key + "]");
        pushToArray(values, stringify2(
          value,
          keyPrefix,
          generateArrayPrefix,
          strictNullHandling,
          skipNulls,
          encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset
        ));
      }
      return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has2.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module.exports = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys2 = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && "indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = "indices";
      }
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (options.skipNulls && obj[key] === null) {
          continue;
        }
        pushToArray(keys2, stringify(
          obj[key],
          key,
          generateArrayPrefix,
          options.strictNullHandling,
          options.skipNulls,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset
        ));
      }
      var joined = keys2.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var has2 = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
    };
    var interpretNumericEntities = function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    };
    var parseArrayValue = function(val, options) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      return val;
    };
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1;
      var i;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key, val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(
            parseArrayValue(part.slice(pos + 1), options),
            function(encodedVal) {
              return options.decoder(encodedVal, defaults.decoder, charset, "value");
            }
          );
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (has2.call(obj, key)) {
          obj[key] = utils.combine(obj[key], val);
        } else {
          obj[key] = val;
        }
      }
      return obj;
    };
    var parseObject = function(chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var index3 = parseInt(cleanRoot, 10);
          if (!options.parseArrays && cleanRoot === "") {
            obj = { 0: leaf };
          } else if (!isNaN(index3) && root !== cleanRoot && String(index3) === cleanRoot && index3 >= 0 && (options.parseArrays && index3 <= options.arrayLimit)) {
            obj = [];
            obj[index3] = leaf;
          } else if (cleanRoot !== "__proto__") {
            obj[cleanRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys2 = [];
      if (parent) {
        if (!options.plainObjects && has2.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys2.push(parent);
      }
      var i = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has2.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys2.push(segment[1]);
      }
      if (segment) {
        keys2.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys2, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      return {
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    };
    module.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var keys2 = Object.keys(tempObj);
      for (var i = 0; i < keys2.length; ++i) {
        var key = keys2[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports, module) {
    "use strict";
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React48 = require_react();
        var ReactSharedInternals = React48.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var useState8 = React48.useState, useEffect5 = React48.useEffect, useLayoutEffect2 = React48.useLayoutEffect, useDebugValue = React48.useDebugValue;
        var didWarnOld18Alpha = false;
        var didWarnUncachedGetSnapshot = false;
        function useSyncExternalStore2(subscribe, getSnapshot, getServerSnapshot) {
          {
            if (!didWarnOld18Alpha) {
              if (React48.startTransition !== void 0) {
                didWarnOld18Alpha = true;
                error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.");
              }
            }
          }
          var value = getSnapshot();
          {
            if (!didWarnUncachedGetSnapshot) {
              var cachedValue = getSnapshot();
              if (!objectIs(value, cachedValue)) {
                error("The result of getSnapshot should be cached to avoid an infinite loop");
                didWarnUncachedGetSnapshot = true;
              }
            }
          }
          var _useState = useState8({
            inst: {
              value,
              getSnapshot
            }
          }), inst = _useState[0].inst, forceUpdate = _useState[1];
          useLayoutEffect2(function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
          }, [subscribe, value, getSnapshot]);
          useEffect5(function() {
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
            var handleStoreChange = function() {
              if (checkIfSnapshotChanged(inst)) {
                forceUpdate({
                  inst
                });
              }
            };
            return subscribe(handleStoreChange);
          }, [subscribe]);
          useDebugValue(value);
          return value;
        }
        function checkIfSnapshotChanged(inst) {
          var latestGetSnapshot = inst.getSnapshot;
          var prevValue = inst.value;
          try {
            var nextValue = latestGetSnapshot();
            return !objectIs(prevValue, nextValue);
          } catch (error2) {
            return true;
          }
        }
        function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
          return getSnapshot();
        }
        var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
        var isServerEnvironment = !canUseDOM;
        var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore2;
        var useSyncExternalStore$2 = React48.useSyncExternalStore !== void 0 ? React48.useSyncExternalStore : shim;
        exports.useSyncExternalStore = useSyncExternalStore$2;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/react-instantsearch-core/dist/es/version.js
var version_default = "7.13.8";

// node_modules/instantsearch.js/es/connectors/configure/connectConfigure.js
var import_algoliasearch_helper = __toESM(require_algoliasearch_helper2());

// node_modules/instantsearch.js/es/lib/utils/addWidgetId.js
var id = 0;
function addWidgetId(widget) {
  if (widget.dependsOn !== "recommend") {
    return;
  }
  widget.$$id = id++;
}
function resetWidgetId() {
  id = 0;
}

// node_modules/instantsearch.js/es/lib/utils/capitalize.js
function capitalize(text) {
  return text.toString().charAt(0).toUpperCase() + text.toString().slice(1);
}

// node_modules/instantsearch.js/es/lib/utils/noop.js
function noop() {
}

// node_modules/instantsearch.js/es/lib/utils/logger.js
var deprecate = function deprecate2(fn, message) {
  return fn;
};
var warn = noop;
var _warning = noop;
if (true) {
  warn = function warn3(message) {
    console.warn("[InstantSearch.js]: ".concat(message.trim()));
  };
  deprecate = function deprecate3(fn, message) {
    var hasAlreadyPrinted = false;
    return function() {
      if (!hasAlreadyPrinted) {
        hasAlreadyPrinted = true;
        true ? warn(message) : void 0;
      }
      return fn.apply(void 0, arguments);
    };
  };
  _warning = function warning(condition, message) {
    if (condition) {
      return;
    }
    var hasAlreadyPrinted = _warning.cache[message];
    if (!hasAlreadyPrinted) {
      _warning.cache[message] = true;
      true ? warn(message) : void 0;
    }
  };
  _warning.cache = {};
}

// node_modules/instantsearch.js/es/lib/utils/typedObject.js
var keys = Object.keys;

// node_modules/instantsearch.js/es/lib/utils/checkIndexUiState.js
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function getWidgetNames(connectorName) {
  switch (connectorName) {
    case "range":
      return [];
    case "menu":
      return ["menu", "menuSelect"];
    default:
      return [connectorName];
  }
}
var stateToWidgetsMap = {
  query: {
    connectors: ["connectSearchBox"],
    widgets: ["ais.searchBox", "ais.autocomplete", "ais.voiceSearch"]
  },
  refinementList: {
    connectors: ["connectRefinementList"],
    widgets: ["ais.refinementList"]
  },
  menu: {
    connectors: ["connectMenu"],
    widgets: ["ais.menu"]
  },
  hierarchicalMenu: {
    connectors: ["connectHierarchicalMenu"],
    widgets: ["ais.hierarchicalMenu"]
  },
  numericMenu: {
    connectors: ["connectNumericMenu"],
    widgets: ["ais.numericMenu"]
  },
  ratingMenu: {
    connectors: ["connectRatingMenu"],
    widgets: ["ais.ratingMenu"]
  },
  range: {
    connectors: ["connectRange"],
    widgets: ["ais.rangeInput", "ais.rangeSlider", "ais.range"]
  },
  toggle: {
    connectors: ["connectToggleRefinement"],
    widgets: ["ais.toggleRefinement"]
  },
  geoSearch: {
    connectors: ["connectGeoSearch"],
    widgets: ["ais.geoSearch"]
  },
  sortBy: {
    connectors: ["connectSortBy"],
    widgets: ["ais.sortBy"]
  },
  page: {
    connectors: ["connectPagination"],
    widgets: ["ais.pagination", "ais.infiniteHits"]
  },
  hitsPerPage: {
    connectors: ["connectHitsPerPage"],
    widgets: ["ais.hitsPerPage"]
  },
  configure: {
    connectors: ["connectConfigure"],
    widgets: ["ais.configure"]
  },
  places: {
    connectors: [],
    widgets: ["ais.places"]
  }
};
function checkIndexUiState(_ref) {
  var index3 = _ref.index, indexUiState = _ref.indexUiState;
  var mountedWidgets = index3.getWidgets().map(function(widget) {
    return widget.$$type;
  }).filter(Boolean);
  var missingWidgets = keys(indexUiState).reduce(function(acc, parameter) {
    var widgetUiState = stateToWidgetsMap[parameter];
    if (!widgetUiState) {
      return acc;
    }
    var requiredWidgets = widgetUiState.widgets;
    if (requiredWidgets && !requiredWidgets.some(function(requiredWidget) {
      return mountedWidgets.includes(requiredWidget);
    })) {
      acc.push([parameter, {
        connectors: widgetUiState.connectors,
        widgets: widgetUiState.widgets.map(function(widgetIdentifier) {
          return widgetIdentifier.split("ais.")[1];
        })
      }]);
    }
    return acc;
  }, []);
  true ? _warning(missingWidgets.length === 0, 'The UI state for the index "'.concat(index3.getIndexId(), '" is not consistent with the widgets mounted.\n\nThis can happen when the UI state is specified via `initialUiState`, `routing` or `setUiState` but that the widgets responsible for this state were not added. This results in those query parameters not being sent to the API.\n\nTo fully reflect the state, some widgets need to be added to the index "').concat(index3.getIndexId(), '":\n\n').concat(missingWidgets.map(function(_ref22) {
    var _ref42;
    var _ref3 = _slicedToArray(_ref22, 2), stateParameter = _ref3[0], widgets = _ref3[1].widgets;
    return "- `".concat(stateParameter, "` needs one of these widgets: ").concat((_ref42 = []).concat.apply(_ref42, _toConsumableArray(widgets.map(function(name) {
      return getWidgetNames(name);
    }))).map(function(name) {
      return '"'.concat(name, '"');
    }).join(", "));
  }).join("\n"), '\n\nIf you do not wish to display widgets but still want to support their search parameters, you can mount "virtual widgets" that don\'t render anything:\n\n```\n').concat(missingWidgets.filter(function(_ref5) {
    var _ref62 = _slicedToArray(_ref5, 2), _stateParameter = _ref62[0], connectors = _ref62[1].connectors;
    return connectors.length > 0;
  }).map(function(_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2), _stateParameter = _ref8[0], _ref8$ = _ref8[1], connectors = _ref8$.connectors, widgets = _ref8$.widgets;
    var capitalizedWidget = capitalize(widgets[0]);
    var connectorName = connectors[0];
    return "const virtual".concat(capitalizedWidget, " = ").concat(connectorName, "(() => null);");
  }).join("\n"), "\n\nsearch.addWidgets([\n  ").concat(missingWidgets.filter(function(_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2), _stateParameter = _ref10[0], connectors = _ref10[1].connectors;
    return connectors.length > 0;
  }).map(function(_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2), _stateParameter = _ref12[0], widgets = _ref12[1].widgets;
    var capitalizedWidget = capitalize(widgets[0]);
    return "virtual".concat(capitalizedWidget, "({ /* ... */ })");
  }).join(",\n  "), "\n]);\n```\n\nIf you're using custom widgets that do set these query parameters, we recommend using connectors instead.\n\nSee https://www.algolia.com/doc/guides/building-search-ui/widgets/customize-an-existing-widget/js/#customize-the-complete-ui-of-the-widgets")) : void 0;
}

// node_modules/instantsearch.js/es/lib/utils/getObjectType.js
function getObjectType(object) {
  return Object.prototype.toString.call(object).slice(8, -1);
}

// node_modules/instantsearch.js/es/lib/utils/checkRendering.js
function checkRendering(rendering, usage) {
  if (rendering === void 0 || typeof rendering !== "function") {
    throw new Error("The render function is not valid (received type ".concat(getObjectType(rendering), ").\n\n").concat(usage));
  }
}

// node_modules/instantsearch.js/es/lib/utils/clearRefinements.js
function clearRefinements(_ref) {
  var helper = _ref.helper, _ref$attributesToClea = _ref.attributesToClear, attributesToClear = _ref$attributesToClea === void 0 ? [] : _ref$attributesToClea;
  var finalState = helper.state.setPage(0);
  finalState = attributesToClear.reduce(function(state, attribute) {
    if (finalState.isNumericRefined(attribute)) {
      return state.removeNumericRefinement(attribute);
    }
    if (finalState.isHierarchicalFacet(attribute)) {
      return state.removeHierarchicalFacetRefinement(attribute);
    }
    if (finalState.isDisjunctiveFacet(attribute)) {
      return state.removeDisjunctiveFacetRefinement(attribute);
    }
    if (finalState.isConjunctiveFacet(attribute)) {
      return state.removeFacetRefinement(attribute);
    }
    return state;
  }, finalState);
  if (attributesToClear.indexOf("query") !== -1) {
    finalState = finalState.setQuery("");
  }
  return finalState;
}

// node_modules/instantsearch.js/es/lib/utils/escape-html.js
var htmlEntities = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var regexUnescapedHtml = /[&<>"']/g;
var regexHasUnescapedHtml = RegExp(regexUnescapedHtml.source);
function escape2(value) {
  return value && regexHasUnescapedHtml.test(value) ? value.replace(regexUnescapedHtml, function(character) {
    return htmlEntities[character];
  }) : value;
}
var htmlCharacters = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
};
var regexEscapedHtml = /&(amp|quot|lt|gt|#39);/g;
var regexHasEscapedHtml = RegExp(regexEscapedHtml.source);
function unescape2(value) {
  return value && regexHasEscapedHtml.test(value) ? value.replace(regexEscapedHtml, function(character) {
    return htmlCharacters[character];
  }) : value;
}

// node_modules/instantsearch.js/es/lib/utils/isPlainObject.js
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function getTag(value) {
  if (value === null) {
    return value === void 0 ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}
function isObjectLike(value) {
  return _typeof(value) === "object" && value !== null;
}
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  var proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

// node_modules/instantsearch.js/es/lib/utils/escape-highlight.js
function _typeof2(obj) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof2(obj);
}
function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure " + obj);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof2(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof2(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof2(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var TAG_PLACEHOLDER = {
  highlightPreTag: "__ais-highlight__",
  highlightPostTag: "__/ais-highlight__"
};
var TAG_REPLACEMENT = {
  highlightPreTag: "<mark>",
  highlightPostTag: "</mark>"
};
function replaceTagsAndEscape(value) {
  return escape2(value).replace(new RegExp(TAG_PLACEHOLDER.highlightPreTag, "g"), TAG_REPLACEMENT.highlightPreTag).replace(new RegExp(TAG_PLACEHOLDER.highlightPostTag, "g"), TAG_REPLACEMENT.highlightPostTag);
}
function recursiveEscape(input) {
  if (isPlainObject(input) && typeof input.value !== "string") {
    return Object.keys(input).reduce(function(acc, key) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, recursiveEscape(input[key])));
    }, {});
  }
  if (Array.isArray(input)) {
    return input.map(recursiveEscape);
  }
  return _objectSpread(_objectSpread({}, input), {}, {
    value: replaceTagsAndEscape(input.value)
  });
}
function escapeHits(hits) {
  if (hits.__escaped === void 0) {
    hits = hits.map(function(_ref) {
      var hit = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
      if (hit._highlightResult) {
        hit._highlightResult = recursiveEscape(hit._highlightResult);
      }
      if (hit._snippetResult) {
        hit._snippetResult = recursiveEscape(hit._snippetResult);
      }
      return hit;
    });
    hits.__escaped = true;
  }
  return hits;
}
function escapeFacets(facetHits) {
  return facetHits.map(function(h) {
    return _objectSpread(_objectSpread({}, h), {}, {
      highlighted: replaceTagsAndEscape(h.highlighted)
    });
  });
}

// node_modules/instantsearch.js/es/lib/utils/concatHighlightedParts.js
function concatHighlightedParts(parts) {
  var highlightPreTag = TAG_REPLACEMENT.highlightPreTag, highlightPostTag = TAG_REPLACEMENT.highlightPostTag;
  return parts.map(function(part) {
    return part.isHighlighted ? highlightPreTag + part.value + highlightPostTag : part.value;
  }).join("");
}

// node_modules/instantsearch.js/es/lib/utils/isFacetRefined.js
function isFacetRefined(helper, facet, value) {
  if (helper.state.isHierarchicalFacet(facet)) {
    return helper.state.isHierarchicalFacetRefined(facet, value);
  } else if (helper.state.isConjunctiveFacet(facet)) {
    return helper.state.isFacetRefined(facet, value);
  } else {
    return helper.state.isDisjunctiveFacetRefined(facet, value);
  }
}

// node_modules/instantsearch.js/es/lib/utils/createSendEventForFacet.js
function ownKeys2(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
      _defineProperty2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty2(obj, key, value) {
  key = _toPropertyKey2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey2(arg) {
  var key = _toPrimitive2(arg, "string");
  return _typeof3(key) === "symbol" ? key : String(key);
}
function _toPrimitive2(input, hint) {
  if (_typeof3(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof3(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _typeof3(obj) {
  "@babel/helpers - typeof";
  return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof3(obj);
}
function _slicedToArray2(arr, i) {
  return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray2(o, minLen);
}
function _arrayLikeToArray2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit2(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles2(arr) {
  if (Array.isArray(arr)) return arr;
}
function createSendEventForFacet(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance, helper = _ref.helper, attr = _ref.attribute, widgetType = _ref.widgetType;
  var sendEventForFacet = function sendEventForFacet2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var facetValue = args[1], _args$ = args[2], eventName = _args$ === void 0 ? "Filter Applied" : _args$, _args$2 = args[3], additionalData = _args$2 === void 0 ? {} : _args$2;
    var _args$0$split = args[0].split(":"), _args$0$split2 = _slicedToArray2(_args$0$split, 2), eventType = _args$0$split2[0], eventModifier = _args$0$split2[1];
    var attribute = typeof attr === "string" ? attr : attr(facetValue);
    if (args.length === 1 && _typeof3(args[0]) === "object") {
      instantSearchInstance.sendEventToInsights(args[0]);
    } else if (eventType === "click" && args.length >= 2 && args.length <= 4) {
      if (!isFacetRefined(helper, attribute, facetValue)) {
        instantSearchInstance.sendEventToInsights({
          insightsMethod: "clickedFilters",
          widgetType,
          eventType,
          eventModifier,
          payload: _objectSpread2({
            eventName,
            index: helper.getIndex(),
            filters: ["".concat(attribute, ":").concat(facetValue)]
          }, additionalData),
          attribute
        });
      }
    } else if (true) {
      throw new Error("You need to pass between two and four arguments like:\n  sendEvent('click', facetValue, eventName?, additionalData?);\n\nIf you want to send a custom payload, you can pass one object: sendEvent(customPayload);\n");
    }
  };
  return sendEventForFacet;
}

// node_modules/instantsearch.js/es/lib/utils/serializer.js
function serializePayload(payload) {
  return btoa(encodeURIComponent(JSON.stringify(payload)));
}

// node_modules/instantsearch.js/es/lib/utils/createSendEventForHits.js
function ownKeys3(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys3(Object(source), true).forEach(function(key) {
      _defineProperty3(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys3(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty3(obj, key, value) {
  key = _toPropertyKey3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey3(arg) {
  var key = _toPrimitive3(arg, "string");
  return _typeof4(key) === "symbol" ? key : String(key);
}
function _toPrimitive3(input, hint) {
  if (_typeof4(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof4(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray3(arr, i) {
  return _arrayWithHoles3(arr) || _iterableToArrayLimit3(arr, i) || _unsupportedIterableToArray3(arr, i) || _nonIterableRest3();
}
function _nonIterableRest3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray3(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray3(o, minLen);
}
function _arrayLikeToArray3(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit3(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles3(arr) {
  if (Array.isArray(arr)) return arr;
}
function _typeof4(obj) {
  "@babel/helpers - typeof";
  return _typeof4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof4(obj);
}
function chunk(arr) {
  var chunkSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 20;
  var chunks = [];
  for (var i = 0; i < Math.ceil(arr.length / chunkSize); i++) {
    chunks.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
  }
  return chunks;
}
function _buildEventPayloadsForHits(_ref) {
  var getIndex = _ref.getIndex, widgetType = _ref.widgetType, methodName = _ref.methodName, args = _ref.args, instantSearchInstance = _ref.instantSearchInstance;
  if (args.length === 1 && _typeof4(args[0]) === "object") {
    return [args[0]];
  }
  var _args$0$split = args[0].split(":"), _args$0$split2 = _slicedToArray3(_args$0$split, 2), eventType = _args$0$split2[0], eventModifier = _args$0$split2[1];
  var hits = args[1];
  var eventName = args[2];
  var additionalData = args[3] || {};
  if (!hits) {
    if (true) {
      throw new Error("You need to pass hit or hits as the second argument like:\n  ".concat(methodName, "(eventType, hit);\n  "));
    } else {
      return [];
    }
  }
  if ((eventType === "click" || eventType === "conversion") && !eventName) {
    if (true) {
      throw new Error("You need to pass eventName as the third argument for 'click' or 'conversion' events like:\n  ".concat(methodName, "('click', hit, 'Product Purchased');\n\n  To learn more about event naming: https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/in-depth/clicks-conversions-best-practices/\n  "));
    } else {
      return [];
    }
  }
  var hitsArray = Array.isArray(hits) ? hits : [hits];
  if (hitsArray.length === 0) {
    return [];
  }
  var queryID = hitsArray[0].__queryID;
  var hitsChunks = chunk(hitsArray);
  var objectIDsByChunk = hitsChunks.map(function(batch) {
    return batch.map(function(hit) {
      return hit.objectID;
    });
  });
  var positionsByChunk = hitsChunks.map(function(batch) {
    return batch.map(function(hit) {
      return hit.__position;
    });
  });
  if (eventType === "view") {
    if (instantSearchInstance.status !== "idle") {
      return [];
    }
    return hitsChunks.map(function(batch, i) {
      return {
        insightsMethod: "viewedObjectIDs",
        widgetType,
        eventType,
        payload: _objectSpread3({
          eventName: eventName || "Hits Viewed",
          index: getIndex(),
          objectIDs: objectIDsByChunk[i]
        }, additionalData),
        hits: batch,
        eventModifier
      };
    });
  } else if (eventType === "click") {
    return hitsChunks.map(function(batch, i) {
      return {
        insightsMethod: "clickedObjectIDsAfterSearch",
        widgetType,
        eventType,
        payload: _objectSpread3({
          eventName: eventName || "Hit Clicked",
          index: getIndex(),
          queryID,
          objectIDs: objectIDsByChunk[i],
          positions: positionsByChunk[i]
        }, additionalData),
        hits: batch,
        eventModifier
      };
    });
  } else if (eventType === "conversion") {
    return hitsChunks.map(function(batch, i) {
      return {
        insightsMethod: "convertedObjectIDsAfterSearch",
        widgetType,
        eventType,
        payload: _objectSpread3({
          eventName: eventName || "Hit Converted",
          index: getIndex(),
          queryID,
          objectIDs: objectIDsByChunk[i]
        }, additionalData),
        hits: batch,
        eventModifier
      };
    });
  } else if (true) {
    throw new Error('eventType("'.concat(eventType, '") is not supported.\n    If you want to send a custom payload, you can pass one object: ').concat(methodName, "(customPayload);\n    "));
  } else {
    return [];
  }
}
function createSendEventForHits(_ref22) {
  var instantSearchInstance = _ref22.instantSearchInstance, getIndex = _ref22.getIndex, widgetType = _ref22.widgetType;
  var sentEvents = {};
  var timer = void 0;
  var sendEventForHits = function sendEventForHits2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var payloads = _buildEventPayloadsForHits({
      widgetType,
      getIndex,
      methodName: "sendEvent",
      args,
      instantSearchInstance
    });
    payloads.forEach(function(payload) {
      if (payload.eventType === "click" && payload.eventModifier === "internal" && sentEvents[payload.eventType]) {
        return;
      }
      sentEvents[payload.eventType] = true;
      instantSearchInstance.sendEventToInsights(payload);
    });
    clearTimeout(timer);
    timer = setTimeout(function() {
      sentEvents = {};
    }, 0);
  };
  return sendEventForHits;
}
function createBindEventForHits(_ref3) {
  var getIndex = _ref3.getIndex, widgetType = _ref3.widgetType, instantSearchInstance = _ref3.instantSearchInstance;
  var bindEventForHits = function bindEventForHits2() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var payloads = _buildEventPayloadsForHits({
      widgetType,
      getIndex,
      methodName: "bindEvent",
      args,
      instantSearchInstance
    });
    return payloads.length ? "data-insights-event=".concat(serializePayload(payloads)) : "";
  };
  return bindEventForHits;
}

// node_modules/instantsearch.js/es/lib/utils/isIndexWidget.js
function isIndexWidget(widget) {
  return widget.$$type === "ais.index";
}

// node_modules/instantsearch.js/es/lib/utils/setIndexHelperState.js
function setIndexHelperState(finalUiState, indexWidget) {
  var nextIndexUiState = finalUiState[indexWidget.getIndexId()] || {};
  if (true) {
    checkIndexUiState({
      index: indexWidget,
      indexUiState: nextIndexUiState
    });
  }
  indexWidget.getHelper().setState(indexWidget.getWidgetSearchParameters(indexWidget.getHelper().state, {
    uiState: nextIndexUiState
  }));
  indexWidget.getWidgets().filter(isIndexWidget).forEach(function(widget) {
    return setIndexHelperState(finalUiState, widget);
  });
}

// node_modules/instantsearch.js/es/lib/utils/defer.js
var nextMicroTask = Promise.resolve();
function defer(callback) {
  var progress = null;
  var cancelled = false;
  var fn = function fn2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (progress !== null) {
      return;
    }
    progress = nextMicroTask.then(function() {
      progress = null;
      if (cancelled) {
        cancelled = false;
        return;
      }
      callback.apply(void 0, args);
    });
  };
  fn.wait = function() {
    if (progress === null) {
      throw new Error("The deferred function should be called before calling `wait()`");
    }
    return progress;
  };
  fn.cancel = function() {
    if (progress === null) {
      return;
    }
    cancelled = true;
  };
  return fn;
}

// node_modules/instantsearch.js/es/lib/utils/documentation.js
function createDocumentationLink(_ref) {
  var name = _ref.name, _ref$connector = _ref.connector, connector = _ref$connector === void 0 ? false : _ref$connector;
  return ["https://www.algolia.com/doc/api-reference/widgets/", name, "/js/", connector ? "#connector" : ""].join("");
}
function createDocumentationMessageGenerator() {
  for (var _len = arguments.length, widgets = new Array(_len), _key = 0; _key < _len; _key++) {
    widgets[_key] = arguments[_key];
  }
  var links = widgets.map(function(widget) {
    return createDocumentationLink(widget);
  }).join(", ");
  return function(message) {
    return [message, "See documentation: ".concat(links)].filter(Boolean).join("\n\n");
  };
}

// node_modules/instantsearch.js/es/lib/utils/escapeFacetValue.js
function unescapeFacetValue(value) {
  if (typeof value === "string") {
    return value.replace(/^\\-/, "-");
  }
  return value;
}
function escapeFacetValue(value) {
  if (typeof value === "number" && value < 0 || typeof value === "string") {
    return String(value).replace(/^-/, "\\-");
  }
  return value;
}

// node_modules/instantsearch.js/es/lib/utils/find.js
function find(items, predicate) {
  var value;
  for (var i = 0; i < items.length; i++) {
    value = items[i];
    if (predicate(value, i, items)) {
      return value;
    }
  }
  return void 0;
}

// node_modules/instantsearch.js/es/lib/utils/findIndex.js
function findIndex(array, comparator) {
  if (!Array.isArray(array)) {
    return -1;
  }
  for (var i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      return i;
    }
  }
  return -1;
}

// node_modules/instantsearch.js/es/lib/utils/geo-search.js
function _slicedToArray4(arr, i) {
  return _arrayWithHoles4(arr) || _iterableToArrayLimit4(arr, i) || _unsupportedIterableToArray4(arr, i) || _nonIterableRest4();
}
function _nonIterableRest4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray4(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray4(o, minLen);
}
function _arrayLikeToArray4(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit4(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles4(arr) {
  if (Array.isArray(arr)) return arr;
}
var latLngRegExp = /^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/;
function aroundLatLngToPosition(value) {
  var pattern = value.match(latLngRegExp);
  if (!pattern) {
    throw new Error('Invalid value for "aroundLatLng" parameter: "'.concat(value, '"'));
  }
  return {
    lat: parseFloat(pattern[1]),
    lng: parseFloat(pattern[2])
  };
}
function insideBoundingBoxArrayToBoundingBox(value) {
  var _value = _slicedToArray4(value, 1), _value$ = _value[0], _value$2 = _value$ === void 0 ? [void 0, void 0, void 0, void 0] : _value$, _value$3 = _slicedToArray4(_value$2, 4), neLat = _value$3[0], neLng = _value$3[1], swLat = _value$3[2], swLng = _value$3[3];
  if (!neLat || !neLng || !swLat || !swLng) {
    throw new Error('Invalid value for "insideBoundingBox" parameter: ['.concat(value, "]"));
  }
  return {
    northEast: {
      lat: neLat,
      lng: neLng
    },
    southWest: {
      lat: swLat,
      lng: swLng
    }
  };
}
function insideBoundingBoxStringToBoundingBox(value) {
  var _value$split$map = value.split(",").map(parseFloat), _value$split$map2 = _slicedToArray4(_value$split$map, 4), neLat = _value$split$map2[0], neLng = _value$split$map2[1], swLat = _value$split$map2[2], swLng = _value$split$map2[3];
  if (!neLat || !neLng || !swLat || !swLng) {
    throw new Error('Invalid value for "insideBoundingBox" parameter: "'.concat(value, '"'));
  }
  return {
    northEast: {
      lat: neLat,
      lng: neLng
    },
    southWest: {
      lat: swLat,
      lng: swLng
    }
  };
}
function insideBoundingBoxToBoundingBox(value) {
  if (Array.isArray(value)) {
    return insideBoundingBoxArrayToBoundingBox(value);
  }
  return insideBoundingBoxStringToBoundingBox(value);
}

// node_modules/instantsearch.js/es/lib/utils/getAppIdAndApiKey.js
function getAppIdAndApiKey(searchClient) {
  if (searchClient.transporter) {
    var transporter = searchClient.transporter;
    var headers = transporter.headers || transporter.baseHeaders;
    var queryParameters = transporter.queryParameters || transporter.baseQueryParameters;
    var APP_ID = "x-algolia-application-id";
    var API_KEY = "x-algolia-api-key";
    var appId = headers[APP_ID] || queryParameters[APP_ID];
    var apiKey = headers[API_KEY] || queryParameters[API_KEY];
    return [appId, apiKey];
  } else {
    return [searchClient.applicationID, searchClient.apiKey];
  }
}

// node_modules/instantsearch.js/es/lib/utils/getHighlightedParts.js
function getHighlightedParts(highlightedValue) {
  var highlightPostTag = TAG_REPLACEMENT.highlightPostTag, highlightPreTag = TAG_REPLACEMENT.highlightPreTag;
  var splitByPreTag = highlightedValue.split(highlightPreTag);
  var firstValue = splitByPreTag.shift();
  var elements = !firstValue ? [] : [{
    value: firstValue,
    isHighlighted: false
  }];
  splitByPreTag.forEach(function(split) {
    var splitByPostTag = split.split(highlightPostTag);
    elements.push({
      value: splitByPostTag[0],
      isHighlighted: true
    });
    if (splitByPostTag[1] !== "") {
      elements.push({
        value: splitByPostTag[1],
        isHighlighted: false
      });
    }
  });
  return elements;
}

// node_modules/instantsearch.js/es/lib/utils/getHighlightFromSiblings.js
var hasAlphanumeric = new RegExp(/\w/i);
function getHighlightFromSiblings(parts, i) {
  var _parts, _parts2;
  var current = parts[i];
  var isNextHighlighted = ((_parts = parts[i + 1]) === null || _parts === void 0 ? void 0 : _parts.isHighlighted) || true;
  var isPreviousHighlighted = ((_parts2 = parts[i - 1]) === null || _parts2 === void 0 ? void 0 : _parts2.isHighlighted) || true;
  if (!hasAlphanumeric.test(unescape2(current.value)) && isPreviousHighlighted === isNextHighlighted) {
    return isPreviousHighlighted;
  }
  return current.isHighlighted;
}

// node_modules/instantsearch.js/es/lib/utils/getPropertyByPath.js
function getPropertyByPath(object, path) {
  var parts = Array.isArray(path) ? path : path.split(".");
  return parts.reduce(function(current, key) {
    return current && current[key];
  }, object);
}

// node_modules/instantsearch.js/es/lib/utils/getRefinements.js
function getRefinement(state, type, attribute, name) {
  var resultsFacets = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
  var res = {
    type,
    attribute,
    name,
    escapedValue: escapeFacetValue(name)
  };
  var facet = find(resultsFacets, function(resultsFacet) {
    return resultsFacet.name === attribute;
  });
  var count;
  if (type === "hierarchical") {
    var facetDeclaration = state.getHierarchicalFacetByName(attribute);
    var nameParts = name.split(facetDeclaration.separator);
    var getFacetRefinement = function getFacetRefinement2(facetData) {
      return function(refinementKey) {
        return facetData[refinementKey];
      };
    };
    var _loop = function _loop2(i2) {
      facet = facet && facet.data && find(Object.keys(facet.data).map(getFacetRefinement(facet.data)), function(refinement) {
        return refinement.name === nameParts[i2];
      });
    };
    for (var i = 0; facet !== void 0 && i < nameParts.length; ++i) {
      _loop(i);
    }
    count = facet && facet.count;
  } else {
    count = facet && facet.data && facet.data[res.name];
  }
  if (count !== void 0) {
    res.count = count;
  }
  if (facet && facet.exhaustive !== void 0) {
    res.exhaustive = facet.exhaustive;
  }
  return res;
}
function getRefinements(results, state) {
  var includesQuery = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var refinements = [];
  var _state$facetsRefineme = state.facetsRefinements, facetsRefinements = _state$facetsRefineme === void 0 ? {} : _state$facetsRefineme, _state$facetsExcludes = state.facetsExcludes, facetsExcludes = _state$facetsExcludes === void 0 ? {} : _state$facetsExcludes, _state$disjunctiveFac = state.disjunctiveFacetsRefinements, disjunctiveFacetsRefinements = _state$disjunctiveFac === void 0 ? {} : _state$disjunctiveFac, _state$hierarchicalFa = state.hierarchicalFacetsRefinements, hierarchicalFacetsRefinements = _state$hierarchicalFa === void 0 ? {} : _state$hierarchicalFa, _state$numericRefinem = state.numericRefinements, numericRefinements = _state$numericRefinem === void 0 ? {} : _state$numericRefinem, _state$tagRefinements = state.tagRefinements, tagRefinements = _state$tagRefinements === void 0 ? [] : _state$tagRefinements;
  Object.keys(facetsRefinements).forEach(function(attribute) {
    var refinementNames = facetsRefinements[attribute];
    refinementNames.forEach(function(refinementName) {
      refinements.push(getRefinement(state, "facet", attribute, refinementName, results.facets));
    });
  });
  Object.keys(facetsExcludes).forEach(function(attribute) {
    var refinementNames = facetsExcludes[attribute];
    refinementNames.forEach(function(refinementName) {
      refinements.push({
        type: "exclude",
        attribute,
        name: refinementName,
        exclude: true
      });
    });
  });
  Object.keys(disjunctiveFacetsRefinements).forEach(function(attribute) {
    var refinementNames = disjunctiveFacetsRefinements[attribute];
    refinementNames.forEach(function(refinementName) {
      refinements.push(getRefinement(
        state,
        "disjunctive",
        attribute,
        // We unescape any disjunctive refined values with `unescapeFacetValue` because
        // they can be escaped on negative numeric values with `escapeFacetValue`.
        unescapeFacetValue(refinementName),
        results.disjunctiveFacets
      ));
    });
  });
  Object.keys(hierarchicalFacetsRefinements).forEach(function(attribute) {
    var refinementNames = hierarchicalFacetsRefinements[attribute];
    refinementNames.forEach(function(refinement) {
      refinements.push(getRefinement(state, "hierarchical", attribute, refinement, results.hierarchicalFacets));
    });
  });
  Object.keys(numericRefinements).forEach(function(attribute) {
    var operators = numericRefinements[attribute];
    Object.keys(operators).forEach(function(operatorOriginal) {
      var operator = operatorOriginal;
      var valueOrValues = operators[operator];
      var refinementNames = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
      refinementNames.forEach(function(refinementName) {
        refinements.push({
          type: "numeric",
          attribute,
          name: "".concat(refinementName),
          numericValue: refinementName,
          operator
        });
      });
    });
  });
  tagRefinements.forEach(function(refinementName) {
    refinements.push({
      type: "tag",
      attribute: "_tags",
      name: refinementName
    });
  });
  if (includesQuery && state.query && state.query.trim()) {
    refinements.push({
      attribute: "query",
      type: "query",
      name: state.query,
      query: state.query
    });
  }
  return refinements;
}

// node_modules/instantsearch.js/es/lib/utils/getWidgetAttribute.js
function getWidgetAttribute(widget, initOptions) {
  var _widget$getWidgetRend;
  var renderState = (_widget$getWidgetRend = widget.getWidgetRenderState) === null || _widget$getWidgetRend === void 0 ? void 0 : _widget$getWidgetRend.call(widget, initOptions);
  var attribute = null;
  if (renderState && renderState.widgetParams) {
    var widgetParams = renderState.widgetParams;
    if (widgetParams.attribute) {
      attribute = widgetParams.attribute;
    } else if (Array.isArray(widgetParams.attributes)) {
      attribute = widgetParams.attributes[0];
    }
  }
  if (typeof attribute !== "string") {
    throw new Error("Could not find the attribute of the widget:\n\n".concat(JSON.stringify(widget), "\n\nPlease check whether the widget's getWidgetRenderState returns widgetParams.attribute correctly."));
  }
  return attribute;
}

// node_modules/instantsearch.js/es/lib/utils/hits-absolute-position.js
function _typeof5(obj) {
  "@babel/helpers - typeof";
  return _typeof5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof5(obj);
}
function ownKeys4(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys4(Object(source), true).forEach(function(key) {
      _defineProperty4(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys4(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty4(obj, key, value) {
  key = _toPropertyKey4(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey4(arg) {
  var key = _toPrimitive4(arg, "string");
  return _typeof5(key) === "symbol" ? key : String(key);
}
function _toPrimitive4(input, hint) {
  if (_typeof5(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof5(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function addAbsolutePosition(hits, page, hitsPerPage) {
  return hits.map(function(hit, idx) {
    return _objectSpread4(_objectSpread4({}, hit), {}, {
      __position: hitsPerPage * page + idx + 1
    });
  });
}

// node_modules/instantsearch.js/es/lib/utils/hits-query-id.js
function _typeof6(obj) {
  "@babel/helpers - typeof";
  return _typeof6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof6(obj);
}
function ownKeys5(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread5(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys5(Object(source), true).forEach(function(key) {
      _defineProperty5(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys5(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty5(obj, key, value) {
  key = _toPropertyKey5(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey5(arg) {
  var key = _toPrimitive5(arg, "string");
  return _typeof6(key) === "symbol" ? key : String(key);
}
function _toPrimitive5(input, hint) {
  if (_typeof6(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof6(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function addQueryID(hits, queryID) {
  if (!queryID) {
    return hits;
  }
  return hits.map(function(hit) {
    return _objectSpread5(_objectSpread5({}, hit), {}, {
      __queryID: queryID
    });
  });
}

// node_modules/instantsearch.js/es/lib/utils/hydrateRecommendCache.js
function _typeof7(obj) {
  "@babel/helpers - typeof";
  return _typeof7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof7(obj);
}
function ownKeys6(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread6(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys6(Object(source), true).forEach(function(key) {
      _defineProperty6(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys6(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty6(obj, key, value) {
  key = _toPropertyKey6(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey6(arg) {
  var key = _toPrimitive6(arg, "string");
  return _typeof7(key) === "symbol" ? key : String(key);
}
function _toPrimitive6(input, hint) {
  if (_typeof7(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof7(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function hydrateRecommendCache(helper, initialResults) {
  var recommendCache = Object.keys(initialResults).reduce(function(acc, indexName) {
    var initialResult = initialResults[indexName];
    if (initialResult.recommendResults) {
      return _objectSpread6(_objectSpread6({}, acc), initialResult.recommendResults.results);
    }
    return acc;
  }, {});
  helper._recommendCache = recommendCache;
}

// node_modules/instantsearch.js/es/lib/utils/hydrateSearchClient.js
function _typeof8(obj) {
  "@babel/helpers - typeof";
  return _typeof8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof8(obj);
}
function _slicedToArray5(arr, i) {
  return _arrayWithHoles5(arr) || _iterableToArrayLimit5(arr, i) || _unsupportedIterableToArray5(arr, i) || _nonIterableRest5();
}
function _nonIterableRest5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray5(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray5(o, minLen);
}
function _arrayLikeToArray5(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit5(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles5(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys7(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread7(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys7(Object(source), true).forEach(function(key) {
      _defineProperty7(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys7(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty7(obj, key, value) {
  key = _toPropertyKey7(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey7(arg) {
  var key = _toPrimitive7(arg, "string");
  return _typeof8(key) === "symbol" ? key : String(key);
}
function _toPrimitive7(input, hint) {
  if (_typeof8(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof8(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function hydrateSearchClient(client, results) {
  if (!results) {
    return;
  }
  if ((!("transporter" in client) || client._cacheHydrated) && (!client._useCache || typeof client.addAlgoliaAgent !== "function")) {
    return;
  }
  var cachedRequest = [Object.keys(results).reduce(function(acc, key) {
    var _results$key = results[key], state = _results$key.state, requestParams = _results$key.requestParams, serverResults = _results$key.results;
    var mappedResults = serverResults && state ? serverResults.map(function(result, idx) {
      return _objectSpread7({
        indexName: state.index || result.index
      }, requestParams !== null && requestParams !== void 0 && requestParams[idx] || result.params ? {
        params: serializeQueryParameters((requestParams === null || requestParams === void 0 ? void 0 : requestParams[idx]) || deserializeQueryParameters(result.params))
      } : {});
    }) : [];
    return acc.concat(mappedResults);
  }, [])];
  var cachedResults = Object.keys(results).reduce(function(acc, key) {
    var res = results[key].results;
    if (!res) {
      return acc;
    }
    return acc.concat(res);
  }, []);
  if ("transporter" in client && !client._cacheHydrated) {
    client._cacheHydrated = true;
    var baseMethod = client.search.bind(client);
    client.search = function(requests) {
      for (var _len = arguments.length, methodArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        methodArgs[_key - 1] = arguments[_key];
      }
      var requestsWithSerializedParams = requests.map(function(request) {
        return _objectSpread7(_objectSpread7({}, request), {}, {
          params: serializeQueryParameters(request.params)
        });
      });
      return client.transporter.responsesCache.get({
        method: "search",
        args: [requestsWithSerializedParams].concat(methodArgs)
      }, function() {
        return baseMethod.apply(void 0, [requests].concat(methodArgs));
      });
    };
    client.transporter.responsesCache.set({
      method: "search",
      args: cachedRequest
    }, {
      results: cachedResults
    });
  }
  if (!("transporter" in client)) {
    var cacheKey = "/1/indexes/*/queries_body_".concat(JSON.stringify({
      requests: cachedRequest
    }));
    client.cache = _objectSpread7(_objectSpread7({}, client.cache), {}, _defineProperty7({}, cacheKey, JSON.stringify({
      results: Object.keys(results).map(function(key) {
        return results[key].results;
      })
    })));
  }
}
function deserializeQueryParameters(parameters) {
  return parameters.split("&").reduce(function(acc, parameter) {
    var _parameter$split = parameter.split("="), _parameter$split2 = _slicedToArray5(_parameter$split, 2), key = _parameter$split2[0], value = _parameter$split2[1];
    acc[key] = value ? decodeURIComponent(value) : "";
    return acc;
  }, {});
}
function serializeQueryParameters(parameters) {
  var isObjectOrArray = function isObjectOrArray2(value) {
    return Object.prototype.toString.call(value) === "[object Object]" || Object.prototype.toString.call(value) === "[object Array]";
  };
  var encode = function encode2(format) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    var i = 0;
    return format.replace(/%s/g, function() {
      return encodeURIComponent(args[i++]);
    });
  };
  return Object.keys(parameters).map(function(key) {
    return encode("%s=%s", key, isObjectOrArray(parameters[key]) ? JSON.stringify(parameters[key]) : parameters[key]);
  }).join("&");
}

// node_modules/instantsearch.js/es/lib/utils/isEqual.js
function isPrimitive(obj) {
  return obj !== Object(obj);
}
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (isPrimitive(first) || isPrimitive(second) || typeof first === "function" || typeof second === "function") {
    return first === second;
  }
  if (Object.keys(first).length !== Object.keys(second).length) {
    return false;
  }
  for (var _i = 0, _Object$keys = Object.keys(first); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (!(key in second)) {
      return false;
    }
    if (!isEqual(first[key], second[key])) {
      return false;
    }
  }
  return true;
}

// node_modules/instantsearch.js/es/lib/utils/isFiniteNumber.js
function isFiniteNumber(value) {
  return typeof value === "number" && isFinite(value);
}

// node_modules/instantsearch.js/es/lib/utils/walkIndex.js
function walkIndex(indexWidget, callback) {
  callback(indexWidget);
  indexWidget.getWidgets().forEach(function(widget) {
    if (isIndexWidget(widget)) {
      walkIndex(widget, callback);
    }
  });
}

// node_modules/instantsearch.js/es/lib/utils/uniq.js
function uniq(array) {
  return array.filter(function(value, index3, self) {
    return self.indexOf(value) === index3;
  });
}

// node_modules/instantsearch.js/es/lib/utils/mergeSearchParameters.js
function _typeof9(obj) {
  "@babel/helpers - typeof";
  return _typeof9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof9(obj);
}
var _excluded = ["facets", "disjunctiveFacets", "facetsRefinements", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacets", "hierarchicalFacetsRefinements", "ruleContexts"];
function ownKeys8(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread8(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys8(Object(source), true).forEach(function(key) {
      _defineProperty8(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys8(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty8(obj, key, value) {
  key = _toPropertyKey8(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey8(arg) {
  var key = _toPrimitive8(arg, "string");
  return _typeof9(key) === "symbol" ? key : String(key);
}
function _toPrimitive8(input, hint) {
  if (_typeof9(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof9(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var mergeWithRest = function mergeWithRest2(left, right) {
  var facets = right.facets, disjunctiveFacets = right.disjunctiveFacets, facetsRefinements = right.facetsRefinements, facetsExcludes = right.facetsExcludes, disjunctiveFacetsRefinements = right.disjunctiveFacetsRefinements, numericRefinements = right.numericRefinements, tagRefinements = right.tagRefinements, hierarchicalFacets = right.hierarchicalFacets, hierarchicalFacetsRefinements = right.hierarchicalFacetsRefinements, ruleContexts = right.ruleContexts, rest = _objectWithoutProperties(right, _excluded);
  return left.setQueryParameters(rest);
};
var mergeFacets = function mergeFacets2(left, right) {
  return right.facets.reduce(function(_, name) {
    return _.addFacet(name);
  }, left);
};
var mergeDisjunctiveFacets = function mergeDisjunctiveFacets2(left, right) {
  return right.disjunctiveFacets.reduce(function(_, name) {
    return _.addDisjunctiveFacet(name);
  }, left);
};
var mergeHierarchicalFacets = function mergeHierarchicalFacets2(left, right) {
  return left.setQueryParameters({
    hierarchicalFacets: right.hierarchicalFacets.reduce(function(facets, facet) {
      var index3 = findIndex(facets, function(_) {
        return _.name === facet.name;
      });
      if (index3 === -1) {
        return facets.concat(facet);
      }
      var nextFacets = facets.slice();
      nextFacets.splice(index3, 1, facet);
      return nextFacets;
    }, left.hierarchicalFacets)
  });
};
var mergeTagRefinements = function mergeTagRefinements2(left, right) {
  return right.tagRefinements.reduce(function(_, value) {
    return _.addTagRefinement(value);
  }, left);
};
var mergeFacetRefinements = function mergeFacetRefinements2(left, right) {
  return left.setQueryParameters({
    facetsRefinements: _objectSpread8(_objectSpread8({}, left.facetsRefinements), right.facetsRefinements)
  });
};
var mergeFacetsExcludes = function mergeFacetsExcludes2(left, right) {
  return left.setQueryParameters({
    facetsExcludes: _objectSpread8(_objectSpread8({}, left.facetsExcludes), right.facetsExcludes)
  });
};
var mergeDisjunctiveFacetsRefinements = function mergeDisjunctiveFacetsRefinements2(left, right) {
  return left.setQueryParameters({
    disjunctiveFacetsRefinements: _objectSpread8(_objectSpread8({}, left.disjunctiveFacetsRefinements), right.disjunctiveFacetsRefinements)
  });
};
var mergeNumericRefinements = function mergeNumericRefinements2(left, right) {
  return left.setQueryParameters({
    numericRefinements: _objectSpread8(_objectSpread8({}, left.numericRefinements), right.numericRefinements)
  });
};
var mergeHierarchicalFacetsRefinements = function mergeHierarchicalFacetsRefinements2(left, right) {
  return left.setQueryParameters({
    hierarchicalFacetsRefinements: _objectSpread8(_objectSpread8({}, left.hierarchicalFacetsRefinements), right.hierarchicalFacetsRefinements)
  });
};
var mergeRuleContexts = function mergeRuleContexts2(left, right) {
  var ruleContexts = uniq([].concat(left.ruleContexts).concat(right.ruleContexts).filter(Boolean));
  if (ruleContexts.length > 0) {
    return left.setQueryParameters({
      ruleContexts
    });
  }
  return left;
};
var mergeSearchParameters = function mergeSearchParameters2() {
  for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
    parameters[_key] = arguments[_key];
  }
  return parameters.reduce(function(left, right) {
    var hierarchicalFacetsRefinementsMerged = mergeHierarchicalFacetsRefinements(left, right);
    var hierarchicalFacetsMerged = mergeHierarchicalFacets(hierarchicalFacetsRefinementsMerged, right);
    var tagRefinementsMerged = mergeTagRefinements(hierarchicalFacetsMerged, right);
    var numericRefinementsMerged = mergeNumericRefinements(tagRefinementsMerged, right);
    var disjunctiveFacetsRefinementsMerged = mergeDisjunctiveFacetsRefinements(numericRefinementsMerged, right);
    var facetsExcludesMerged = mergeFacetsExcludes(disjunctiveFacetsRefinementsMerged, right);
    var facetRefinementsMerged = mergeFacetRefinements(facetsExcludesMerged, right);
    var disjunctiveFacetsMerged = mergeDisjunctiveFacets(facetRefinementsMerged, right);
    var ruleContextsMerged = mergeRuleContexts(disjunctiveFacetsMerged, right);
    var facetsMerged = mergeFacets(ruleContextsMerged, right);
    return mergeWithRest(facetsMerged, right);
  });
};

// node_modules/instantsearch.js/es/lib/utils/range.js
function _toConsumableArray2(arr) {
  return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray6(arr) || _nonIterableSpread2();
}
function _nonIterableSpread2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray6(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray6(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray6(o, minLen);
}
function _iterableToArray2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles2(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray6(arr);
}
function _arrayLikeToArray6(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function range(_ref) {
  var _ref$start = _ref.start, start = _ref$start === void 0 ? 0 : _ref$start, end = _ref.end, _ref$step = _ref.step, step = _ref$step === void 0 ? 1 : _ref$step;
  var limitStep = step === 0 ? 1 : step;
  var arrayLength = Math.round((end - start) / limitStep);
  return _toConsumableArray2(Array(arrayLength)).map(function(_, current) {
    return start + current * limitStep;
  });
}

// node_modules/instantsearch.js/es/lib/utils/render-args.js
function createInitArgs(instantSearchInstance, parent, uiState) {
  var helper = parent.getHelper();
  return {
    uiState,
    helper,
    parent,
    instantSearchInstance,
    state: helper.state,
    renderState: instantSearchInstance.renderState,
    templatesConfig: instantSearchInstance.templatesConfig,
    createURL: parent.createURL,
    scopedResults: [],
    searchMetadata: {
      isSearchStalled: instantSearchInstance.status === "stalled"
    },
    status: instantSearchInstance.status,
    error: instantSearchInstance.error
  };
}
function createRenderArgs(instantSearchInstance, parent, widget) {
  var results = parent.getResultsForWidget(widget);
  var helper = parent.getHelper();
  return {
    helper,
    parent,
    instantSearchInstance,
    results,
    scopedResults: parent.getScopedResults(),
    state: results && "_state" in results ? results._state : helper.state,
    renderState: instantSearchInstance.renderState,
    templatesConfig: instantSearchInstance.templatesConfig,
    createURL: parent.createURL,
    searchMetadata: {
      isSearchStalled: instantSearchInstance.status === "stalled"
    },
    status: instantSearchInstance.status,
    error: instantSearchInstance.error
  };
}

// node_modules/instantsearch.js/es/lib/utils/resolveSearchParameters.js
function resolveSearchParameters(current) {
  var parent = current.getParent();
  var states = [current.getHelper().state];
  while (parent !== null) {
    states = [parent.getHelper().state].concat(states);
    parent = parent.getParent();
  }
  return states;
}

// node_modules/instantsearch.js/es/lib/utils/reverseHighlightedParts.js
function _typeof10(obj) {
  "@babel/helpers - typeof";
  return _typeof10 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof10(obj);
}
function ownKeys9(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread9(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys9(Object(source), true).forEach(function(key) {
      _defineProperty9(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys9(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty9(obj, key, value) {
  key = _toPropertyKey9(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey9(arg) {
  var key = _toPrimitive9(arg, "string");
  return _typeof10(key) === "symbol" ? key : String(key);
}
function _toPrimitive9(input, hint) {
  if (_typeof10(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof10(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function reverseHighlightedParts(parts) {
  if (!parts.some(function(part) {
    return part.isHighlighted;
  })) {
    return parts.map(function(part) {
      return _objectSpread9(_objectSpread9({}, part), {}, {
        isHighlighted: false
      });
    });
  }
  return parts.map(function(part, i) {
    return _objectSpread9(_objectSpread9({}, part), {}, {
      isHighlighted: !getHighlightFromSiblings(parts, i)
    });
  });
}

// node_modules/instantsearch.js/es/lib/utils/safelyRunOnBrowser.js
function safelyRunOnBrowser(callback) {
  var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    fallback: function fallback2() {
      return void 0;
    }
  }, fallback = _ref.fallback;
  if (typeof window === "undefined") {
    return fallback();
  }
  return callback({
    window
  });
}

// node_modules/instantsearch.js/es/lib/utils/toArray.js
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

// node_modules/instantsearch.js/es/connectors/configure/connectConfigure.js
function _typeof11(obj) {
  "@babel/helpers - typeof";
  return _typeof11 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof11(obj);
}
function ownKeys10(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread10(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys10(Object(source), true).forEach(function(key) {
      _defineProperty10(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys10(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty10(obj, key, value) {
  key = _toPropertyKey10(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey10(arg) {
  var key = _toPrimitive10(arg, "string");
  return _typeof11(key) === "symbol" ? key : String(key);
}
function _toPrimitive10(input, hint) {
  if (_typeof11(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof11(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage = createDocumentationMessageGenerator({
  name: "configure",
  connector: true
});
function getInitialSearchParameters(state, widgetParams) {
  return state.setQueryParameters(Object.keys(widgetParams.searchParameters).reduce(function(acc, key) {
    return _objectSpread10(_objectSpread10({}, acc), {}, _defineProperty10({}, key, void 0));
  }, {}));
}
var connectConfigure = function connectConfigure2() {
  var renderFn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : noop;
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  return function(widgetParams) {
    if (!widgetParams || !isPlainObject(widgetParams.searchParameters)) {
      throw new Error(withUsage("The `searchParameters` option expects an object."));
    }
    var connectorState = {};
    function refine(helper) {
      return function(searchParameters) {
        var actualState = getInitialSearchParameters(helper.state, widgetParams);
        var nextSearchParameters = mergeSearchParameters(actualState, new import_algoliasearch_helper.default.SearchParameters(searchParameters));
        widgetParams.searchParameters = searchParameters;
        helper.setState(nextSearchParameters).search();
      };
    }
    return {
      $$type: "ais.configure",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread10(_objectSpread10({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread10(_objectSpread10({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref) {
        var state = _ref.state;
        unmountFn();
        return getInitialSearchParameters(state, widgetParams);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        var _renderState$configur;
        var widgetRenderState = this.getWidgetRenderState(renderOptions);
        return _objectSpread10(_objectSpread10({}, renderState), {}, {
          configure: _objectSpread10(_objectSpread10({}, widgetRenderState), {}, {
            widgetParams: _objectSpread10(_objectSpread10({}, widgetRenderState.widgetParams), {}, {
              searchParameters: mergeSearchParameters(new import_algoliasearch_helper.default.SearchParameters((_renderState$configur = renderState.configure) === null || _renderState$configur === void 0 ? void 0 : _renderState$configur.widgetParams.searchParameters), new import_algoliasearch_helper.default.SearchParameters(widgetRenderState.widgetParams.searchParameters)).getQueryParams()
            })
          })
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref22) {
        var helper = _ref22.helper;
        if (!connectorState.refine) {
          connectorState.refine = refine(helper);
        }
        return {
          refine: connectorState.refine,
          widgetParams
        };
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _ref3) {
        var uiState = _ref3.uiState;
        return mergeSearchParameters(state, new import_algoliasearch_helper.default.SearchParameters(_objectSpread10(_objectSpread10({}, uiState.configure), widgetParams.searchParameters)));
      },
      getWidgetUiState: function getWidgetUiState(uiState) {
        return _objectSpread10(_objectSpread10({}, uiState), {}, {
          configure: _objectSpread10(_objectSpread10({}, uiState.configure), widgetParams.searchParameters)
        });
      }
    };
  };
};
var connectConfigure_default = connectConfigure;

// node_modules/react-instantsearch-core/dist/es/hooks/useConnector.js
var import_react14 = __toESM(require_react(), 1);

// node_modules/react-instantsearch-core/dist/es/lib/dequal.js
function _typeof12(obj) {
  "@babel/helpers - typeof";
  return _typeof12 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof12(obj);
}
var has = Object.prototype.hasOwnProperty;
function dequal(foo, bar, compare) {
  if (compare !== null && compare !== void 0 && compare(foo, bar)) {
    return true;
  }
  var ctor;
  var len;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && dequal(foo[len], bar[len], compare)) ;
      }
      return len === -1;
    }
    if (!ctor || _typeof12(foo) === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor], compare)) return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}

// node_modules/react-instantsearch-core/dist/es/lib/createSearchResults.js
var import_algoliasearch_helper2 = __toESM(require_algoliasearch_helper2(), 1);
function createSearchResults(state) {
  var _state$query, _state$page, _state$hitsPerPage;
  return new import_algoliasearch_helper2.default.SearchResults(state, [{
    query: (_state$query = state.query) !== null && _state$query !== void 0 ? _state$query : "",
    page: (_state$page = state.page) !== null && _state$page !== void 0 ? _state$page : 0,
    hitsPerPage: (_state$hitsPerPage = state.hitsPerPage) !== null && _state$hitsPerPage !== void 0 ? _state$hitsPerPage : 20,
    hits: [],
    nbHits: 0,
    nbPages: 0,
    params: "",
    exhaustiveNbHits: true,
    exhaustiveFacetsCount: true,
    processingTimeMS: 0,
    index: state.index
  }], {
    /** used by connectors to prevent persisting these results */
    __isArtificial: true
  });
}

// node_modules/react-instantsearch-core/dist/es/lib/getIndexSearchResults.js
function _typeof13(obj) {
  "@babel/helpers - typeof";
  return _typeof13 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof13(obj);
}
function ownKeys11(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread11(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys11(Object(source), true).forEach(function(key) {
      _defineProperty11(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys11(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty11(obj, key, value) {
  key = _toPropertyKey11(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey11(arg) {
  var key = _toPrimitive11(arg, "string");
  return _typeof13(key) === "symbol" ? key : String(key);
}
function _toPrimitive11(input, hint) {
  if (_typeof13(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof13(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function getIndexSearchResults(indexWidget) {
  var helper = indexWidget.getHelper();
  var results = (
    // On SSR, we get the results injected on the Index.
    indexWidget.getResults() || // On the browser, we create fallback results based on the helper state.
    createSearchResults(helper.state)
  );
  var scopedResults = indexWidget.getScopedResults().map(function(scopedResult) {
    var fallbackResults = scopedResult.indexId === indexWidget.getIndexId() ? results : createSearchResults(scopedResult.helper.state);
    return _objectSpread11(_objectSpread11({}, scopedResult), {}, {
      // We keep `results` from being `null`.
      results: scopedResult.results || fallbackResults
    });
  });
  return {
    results,
    scopedResults,
    recommendResults: helper.lastRecommendResults
  };
}

// node_modules/react-instantsearch-core/dist/es/lib/useIndexContext.js
var import_react2 = __toESM(require_react(), 1);

// node_modules/react-instantsearch-core/dist/es/lib/IndexContext.js
var import_react = __toESM(require_react(), 1);
var IndexContext = (0, import_react.createContext)(null);
if (true) {
  IndexContext.displayName = "Index";
}

// node_modules/react-instantsearch-core/dist/es/lib/invariant.js
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (false) {
    throw new Error("Invariant failed");
  }
  if (true) {
    throw new Error("[InstantSearch] ".concat(typeof message === "function" ? message() : message));
  }
}

// node_modules/react-instantsearch-core/dist/es/lib/useIndexContext.js
function useIndexContext() {
  var context = (0, import_react2.useContext)(IndexContext);
  invariant(context !== null, "The <Index> component must be used within <InstantSearch>.");
  return context;
}

// node_modules/react-instantsearch-core/dist/es/lib/useInstantSearchContext.js
var import_react4 = __toESM(require_react(), 1);

// node_modules/react-instantsearch-core/dist/es/lib/InstantSearchContext.js
var import_react3 = __toESM(require_react(), 1);
var InstantSearchContext = (0, import_react3.createContext)(null);
if (true) {
  InstantSearchContext.displayName = "InstantSearch";
}

// node_modules/react-instantsearch-core/dist/es/lib/useInstantSearchContext.js
function useInstantSearchContext() {
  var search = (0, import_react4.useContext)(InstantSearchContext);
  invariant(search !== null, "Hooks must be used inside the <InstantSearch> component.\n\nThey are not compatible with the `react-instantsearch-core@6.x` and `react-instantsearch-dom` packages, so make sure to use the <InstantSearch> component from `react-instantsearch-core@7.x`.");
  return search;
}

// node_modules/react-instantsearch-core/dist/es/lib/useInstantSearchServerContext.js
var import_react6 = __toESM(require_react(), 1);

// node_modules/react-instantsearch-core/dist/es/components/InstantSearchServerContext.js
var import_react5 = __toESM(require_react(), 1);
var InstantSearchServerContext = (0, import_react5.createContext)(null);
if (true) {
  InstantSearchServerContext.displayName = "InstantSearchServer";
}

// node_modules/react-instantsearch-core/dist/es/lib/useInstantSearchServerContext.js
function useInstantSearchServerContext() {
  return (0, import_react6.useContext)(InstantSearchServerContext);
}

// node_modules/react-instantsearch-core/dist/es/lib/useInstantSearchSSRContext.js
var import_react8 = __toESM(require_react(), 1);

// node_modules/react-instantsearch-core/dist/es/lib/InstantSearchSSRContext.js
var import_react7 = __toESM(require_react(), 1);
var InstantSearchSSRContext = (0, import_react7.createContext)(null);
if (true) {
  InstantSearchSSRContext.displayName = "InstantSearchSSR";
}

// node_modules/react-instantsearch-core/dist/es/lib/useInstantSearchSSRContext.js
function useInstantSearchSSRContext() {
  return (0, import_react8.useContext)(InstantSearchSSRContext);
}

// node_modules/react-instantsearch-core/dist/es/lib/useStableValue.js
var import_react9 = __toESM(require_react(), 1);
function _slicedToArray6(arr, i) {
  return _arrayWithHoles6(arr) || _iterableToArrayLimit6(arr, i) || _unsupportedIterableToArray7(arr, i) || _nonIterableRest6();
}
function _nonIterableRest6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray7(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray7(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray7(o, minLen);
}
function _arrayLikeToArray7(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit6(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles6(arr) {
  if (Array.isArray(arr)) return arr;
}
function useStableValue(value) {
  var _useState = (0, import_react9.useState)(function() {
    return value;
  }), _useState2 = _slicedToArray6(_useState, 2), stableValue = _useState2[0], setStableValue = _useState2[1];
  if (!dequal(stableValue, value)) {
    setStableValue(value);
  }
  return stableValue;
}

// node_modules/react-instantsearch-core/dist/es/lib/useWidget.js
var import_react13 = __toESM(require_react(), 1);

// node_modules/react-instantsearch-core/dist/es/lib/use.js
var React = __toESM(require_react(), 1);
var useKey = "use";
var use = React[useKey];

// node_modules/react-instantsearch-core/dist/es/lib/useIsomorphicLayoutEffect.js
var import_react10 = __toESM(require_react(), 1);
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react10.useLayoutEffect : import_react10.useEffect;

// node_modules/react-instantsearch-core/dist/es/lib/useRSCContext.js
var import_react12 = __toESM(require_react(), 1);

// node_modules/react-instantsearch-core/dist/es/lib/InstantSearchRSCContext.js
var import_react11 = __toESM(require_react(), 1);
var InstantSearchRSCContext = (0, import_react11.createContext)(null);

// node_modules/react-instantsearch-core/dist/es/lib/useRSCContext.js
function useRSCContext() {
  return (0, import_react12.useContext)(InstantSearchRSCContext);
}

// node_modules/react-instantsearch-core/dist/es/lib/useWidget.js
function useWidget(_ref) {
  var _waitingForResultsRef;
  var widget = _ref.widget, parentIndex = _ref.parentIndex, props = _ref.props, shouldSsr = _ref.shouldSsr;
  var waitingForResultsRef = useRSCContext();
  var prevPropsRef = (0, import_react13.useRef)(props);
  (0, import_react13.useEffect)(function() {
    prevPropsRef.current = props;
  }, [props]);
  var prevWidgetRef = (0, import_react13.useRef)(widget);
  (0, import_react13.useEffect)(function() {
    prevWidgetRef.current = widget;
  }, [widget]);
  var cleanupTimerRef = (0, import_react13.useRef)(null);
  var shouldAddWidgetEarly = shouldSsr && !parentIndex.getWidgets().includes(widget);
  var search = useInstantSearchContext();
  useIsomorphicLayoutEffect(function() {
    var previousWidget = prevWidgetRef.current;
    if (!cleanupTimerRef.current) {
      if (!shouldSsr) {
        parentIndex.addWidgets([widget]);
      }
    } else {
      clearTimeout(cleanupTimerRef.current);
      var arePropsEqual = dequal(props, prevPropsRef.current);
      if (!arePropsEqual) {
        parentIndex.removeWidgets([previousWidget]);
        parentIndex.addWidgets([widget]);
      }
    }
    return function() {
      cleanupTimerRef.current = setTimeout(function() {
        search._schedule(function() {
          if (search._preventWidgetCleanup) return;
          parentIndex.removeWidgets([previousWidget]);
        });
      });
    };
  }, [parentIndex, widget, shouldSsr, search, props]);
  if (shouldAddWidgetEarly || (waitingForResultsRef === null || waitingForResultsRef === void 0 ? void 0 : (_waitingForResultsRef = waitingForResultsRef.current) === null || _waitingForResultsRef === void 0 ? void 0 : _waitingForResultsRef.status) === "pending") {
    parentIndex.addWidgets([widget]);
  }
  if (typeof window === "undefined" && waitingForResultsRef !== null && waitingForResultsRef !== void 0 && waitingForResultsRef.current && // We need the widgets contained in the index to be added before we trigger the search request.
  widget.$$type !== "ais.index") {
    var _search$helper;
    use(waitingForResultsRef.current);
    if (widget.$$type !== "ais.dynamicWidgets" && (_search$helper = search.helper) !== null && _search$helper !== void 0 && _search$helper.lastResults) {
      use(waitingForResultsRef.current);
    }
  }
}

// node_modules/react-instantsearch-core/dist/es/hooks/useConnector.js
function _typeof14(obj) {
  "@babel/helpers - typeof";
  return _typeof14 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof14(obj);
}
var _excluded2 = ["instantSearchInstance", "widgetParams"];
var _excluded22 = ["widgetParams"];
function _slicedToArray7(arr, i) {
  return _arrayWithHoles7(arr) || _iterableToArrayLimit7(arr, i) || _unsupportedIterableToArray8(arr, i) || _nonIterableRest7();
}
function _nonIterableRest7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray8(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray8(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray8(o, minLen);
}
function _arrayLikeToArray8(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit7(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles7(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys12(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread12(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys12(Object(source), true).forEach(function(key) {
      _defineProperty12(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys12(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty12(obj, key, value) {
  key = _toPropertyKey12(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey12(arg) {
  var key = _toPrimitive12(arg, "string");
  return _typeof14(key) === "symbol" ? key : String(key);
}
function _toPrimitive12(input, hint) {
  if (_typeof14(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof14(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties2(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose2(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose2(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function useConnector(connector) {
  var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var additionalWidgetProperties = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var serverContext = useInstantSearchServerContext();
  var ssrContext = useInstantSearchSSRContext();
  var search = useInstantSearchContext();
  var parentIndex = useIndexContext();
  var stableProps = useStableValue(props);
  var stableAdditionalWidgetProperties = useStableValue(additionalWidgetProperties);
  var shouldSetStateRef = (0, import_react14.useRef)(true);
  var previousRenderStateRef = (0, import_react14.useRef)(null);
  var previousStatusRef = (0, import_react14.useRef)(search.status);
  var widget = (0, import_react14.useMemo)(function() {
    var createWidget = connector(function(connectorState, isFirstRender) {
      if (isFirstRender) {
        shouldSetStateRef.current = true;
        return;
      }
      if (shouldSetStateRef.current) {
        var instantSearchInstance = connectorState.instantSearchInstance, widgetParams = connectorState.widgetParams, renderState = _objectWithoutProperties2(connectorState, _excluded2);
        if (!dequal(renderState, previousRenderStateRef.current, function(a, b) {
          return (a === null || a === void 0 ? void 0 : a.constructor) === Function && (b === null || b === void 0 ? void 0 : b.constructor) === Function;
        }) || instantSearchInstance.status !== previousStatusRef.current) {
          setState(renderState);
          previousRenderStateRef.current = renderState;
          previousStatusRef.current = instantSearchInstance.status;
        }
      }
    }, function() {
      shouldSetStateRef.current = false;
    });
    return _objectSpread12(_objectSpread12({}, createWidget(stableProps)), stableAdditionalWidgetProperties);
  }, [connector, stableProps, stableAdditionalWidgetProperties]);
  var _useState = (0, import_react14.useState)(function() {
    if (widget.getWidgetRenderState) {
      var _widget$getWidgetSear;
      var helper = parentIndex.getHelper();
      var uiState = parentIndex.getWidgetUiState({})[parentIndex.getIndexId()];
      helper.state = ((_widget$getWidgetSear = widget.getWidgetSearchParameters) === null || _widget$getWidgetSear === void 0 ? void 0 : _widget$getWidgetSear.call(widget, helper.state, {
        uiState
      })) || helper.state;
      var _getIndexSearchResult = getIndexSearchResults(parentIndex), results = _getIndexSearchResult.results, scopedResults = _getIndexSearchResult.scopedResults, recommendResults = _getIndexSearchResult.recommendResults;
      var _widget$getWidgetRend = widget.getWidgetRenderState({
        helper,
        parent: parentIndex,
        instantSearchInstance: search,
        results: widget.dependsOn === "recommend" && recommendResults && ssrContext ? recommendResults[ssrContext.recommendIdx.current++] : results,
        scopedResults,
        state: helper.state,
        renderState: search.renderState,
        templatesConfig: search.templatesConfig,
        createURL: parentIndex.createURL,
        searchMetadata: {
          isSearchStalled: search.status === "stalled"
        },
        status: search.status,
        error: search.error
      }), widgetParams = _widget$getWidgetRend.widgetParams, renderState = _objectWithoutProperties2(_widget$getWidgetRend, _excluded22);
      return renderState;
    }
    return {};
  }), _useState2 = _slicedToArray7(_useState, 2), state = _useState2[0], setState = _useState2[1];
  useWidget({
    widget,
    parentIndex,
    props: stableProps,
    shouldSsr: Boolean(serverContext)
  });
  return state;
}

// node_modules/react-instantsearch-core/dist/es/connectors/useConfigure.js
function useConfigure(props, additionalWidgetProperties) {
  return useConnector(connectConfigure_default, {
    searchParameters: props
  }, additionalWidgetProperties);
}

// node_modules/react-instantsearch-core/dist/es/components/Configure.js
function _typeof15(obj) {
  "@babel/helpers - typeof";
  return _typeof15 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof15(obj);
}
function ownKeys13(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread13(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys13(Object(source), true).forEach(function(key) {
      _defineProperty13(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys13(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty13(obj, key, value) {
  key = _toPropertyKey13(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey13(arg) {
  var key = _toPrimitive13(arg, "string");
  return _typeof15(key) === "symbol" ? key : String(key);
}
function _toPrimitive13(input, hint) {
  if (_typeof15(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof15(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function Configure(props) {
  useConfigure(_objectSpread13({}, props), {
    $$widgetType: "ais.configure"
  });
  return null;
}

// node_modules/react-instantsearch-core/dist/es/components/DynamicWidgets.js
var import_react15 = __toESM(require_react(), 1);

// node_modules/instantsearch.js/es/connectors/dynamic-widgets/connectDynamicWidgets.js
function ownKeys14(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread14(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys14(Object(source), true).forEach(function(key) {
      _defineProperty14(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys14(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty14(obj, key, value) {
  key = _toPropertyKey14(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey14(arg) {
  var key = _toPrimitive14(arg, "string");
  return _typeof16(key) === "symbol" ? key : String(key);
}
function _toPrimitive14(input, hint) {
  if (_typeof16(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof16(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _typeof16(obj) {
  "@babel/helpers - typeof";
  return _typeof16 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof16(obj);
}
var withUsage2 = createDocumentationMessageGenerator({
  name: "dynamic-widgets",
  connector: true
});
var MAX_WILDCARD_FACETS = 20;
var connectDynamicWidgets = function connectDynamicWidgets2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage2());
  return function(widgetParams) {
    var widgets = widgetParams.widgets, _widgetParams$maxValu = widgetParams.maxValuesPerFacet, maxValuesPerFacet = _widgetParams$maxValu === void 0 ? 20 : _widgetParams$maxValu, _widgetParams$facets = widgetParams.facets, facets = _widgetParams$facets === void 0 ? ["*"] : _widgetParams$facets, _widgetParams$transfo = widgetParams.transformItems, transformItems = _widgetParams$transfo === void 0 ? function(items) {
      return items;
    } : _widgetParams$transfo, fallbackWidget = widgetParams.fallbackWidget;
    if (!(widgets && Array.isArray(widgets) && widgets.every(function(widget) {
      return _typeof16(widget) === "object";
    }))) {
      throw new Error(withUsage2("The `widgets` option expects an array of widgets."));
    }
    if (!Array.isArray(facets)) {
      throw new Error(withUsage2("The `facets` option only accepts an array of facets, you passed ".concat(JSON.stringify(facets))));
    }
    var localWidgets = /* @__PURE__ */ new Map();
    return {
      $$type: "ais.dynamicWidgets",
      init: function init(initOptions) {
        widgets.forEach(function(widget) {
          var attribute = getWidgetAttribute(widget, initOptions);
          localWidgets.set(attribute, {
            widget,
            isMounted: false
          });
        });
        renderFn(_objectSpread14(_objectSpread14({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var parent = renderOptions.parent;
        var renderState = this.getWidgetRenderState(renderOptions);
        var widgetsToUnmount = [];
        var widgetsToMount = [];
        if (fallbackWidget) {
          renderState.attributesToRender.forEach(function(attribute) {
            if (!localWidgets.has(attribute)) {
              var widget = fallbackWidget({
                attribute
              });
              localWidgets.set(attribute, {
                widget,
                isMounted: false
              });
            }
          });
        }
        localWidgets.forEach(function(_ref, attribute) {
          var widget = _ref.widget, isMounted = _ref.isMounted;
          var shouldMount = renderState.attributesToRender.indexOf(attribute) > -1;
          if (!isMounted && shouldMount) {
            widgetsToMount.push(widget);
            localWidgets.set(attribute, {
              widget,
              isMounted: true
            });
          } else if (isMounted && !shouldMount) {
            widgetsToUnmount.push(widget);
            localWidgets.set(attribute, {
              widget,
              isMounted: false
            });
          }
        });
        parent.addWidgets(widgetsToMount);
        setTimeout(function() {
          return parent.removeWidgets(widgetsToUnmount);
        }, 0);
        renderFn(_objectSpread14(_objectSpread14({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref22) {
        var parent = _ref22.parent;
        var toRemove = [];
        localWidgets.forEach(function(_ref3) {
          var widget = _ref3.widget, isMounted = _ref3.isMounted;
          if (isMounted) {
            toRemove.push(widget);
          }
        });
        parent.removeWidgets(toRemove);
        unmountFn();
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state) {
        return facets.reduce(function(acc, curr) {
          return acc.addFacet(curr);
        }, state.setQueryParameters({
          maxValuesPerFacet: Math.max(maxValuesPerFacet || 0, state.maxValuesPerFacet || 0)
        }));
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread14(_objectSpread14({}, renderState), {}, {
          dynamicWidgets: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref42) {
        var _results$renderingCon, _results$renderingCon2, _results$renderingCon3, _results$renderingCon4;
        var results = _ref42.results, state = _ref42.state;
        if (!results) {
          return {
            attributesToRender: [],
            widgetParams
          };
        }
        var attributesToRender = transformItems((_results$renderingCon = (_results$renderingCon2 = results.renderingContent) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.facetOrdering) === null || _results$renderingCon3 === void 0 ? void 0 : (_results$renderingCon4 = _results$renderingCon3.facets) === null || _results$renderingCon4 === void 0 ? void 0 : _results$renderingCon4.order) !== null && _results$renderingCon !== void 0 ? _results$renderingCon : [], {
          results
        });
        if (!Array.isArray(attributesToRender)) {
          throw new Error(withUsage2("The `transformItems` option expects a function that returns an Array."));
        }
        true ? _warning(maxValuesPerFacet >= (state.maxValuesPerFacet || 0), "The maxValuesPerFacet set by dynamic widgets (".concat(maxValuesPerFacet, ") is smaller than one of the limits set by a widget (").concat(state.maxValuesPerFacet, "). This causes a mismatch in query parameters and thus an extra network request when that widget is mounted.")) : void 0;
        true ? _warning(attributesToRender.length <= MAX_WILDCARD_FACETS || widgetParams.facets !== void 0, "More than ".concat(MAX_WILDCARD_FACETS, ` facets are requested to be displayed without explicitly setting which facets to retrieve. This could have a performance impact. Set "facets" to [] to do two smaller network requests, or explicitly to ['*'] to avoid this warning.`)) : void 0;
        return {
          attributesToRender,
          widgetParams
        };
      }
    };
  };
};
var connectDynamicWidgets_default = connectDynamicWidgets;

// node_modules/react-instantsearch-core/dist/es/connectors/useDynamicWidgets.js
function _typeof17(obj) {
  "@babel/helpers - typeof";
  return _typeof17 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof17(obj);
}
function ownKeys15(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread15(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys15(Object(source), true).forEach(function(key) {
      _defineProperty15(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys15(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty15(obj, key, value) {
  key = _toPropertyKey15(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey15(arg) {
  var key = _toPrimitive15(arg, "string");
  return _typeof17(key) === "symbol" ? key : String(key);
}
function _toPrimitive15(input, hint) {
  if (_typeof17(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof17(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function useDynamicWidgets(props, additionalWidgetProperties) {
  return useConnector(connectDynamicWidgets_default, _objectSpread15(_objectSpread15({}, props), {}, {
    // We don't rely on InstantSearch.js for rendering widgets because React
    // directly manipulates the children.
    widgets: []
  }), additionalWidgetProperties);
}

// node_modules/react-instantsearch-core/dist/es/lib/warn.js
var warnCache = {
  current: {}
};
function warn2(condition, message) {
  if (false) {
    return;
  }
  if (condition) {
    return;
  }
  var sanitizedMessage = message.trim();
  var hasAlreadyPrinted = warnCache.current[sanitizedMessage];
  if (!hasAlreadyPrinted) {
    warnCache.current[sanitizedMessage] = true;
    var warning = "[InstantSearch] ".concat(sanitizedMessage);
    console.warn(warning);
    try {
      throw new Error(warning);
    } catch (error) {
    }
  }
}

// node_modules/react-instantsearch-core/dist/es/components/DynamicWidgets.js
var _excluded3 = ["children", "fallbackComponent"];
function _typeof18(obj) {
  "@babel/helpers - typeof";
  return _typeof18 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof18(obj);
}
function _objectWithoutProperties3(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose3(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose3(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function DefaultFallbackComponent() {
  return null;
}
function DynamicWidgets(_ref) {
  var children = _ref.children, _ref$fallbackComponen = _ref.fallbackComponent, Fallback = _ref$fallbackComponen === void 0 ? DefaultFallbackComponent : _ref$fallbackComponen, props = _objectWithoutProperties3(_ref, _excluded3);
  var FallbackComponent = import_react15.default.useRef(Fallback);
  true ? warn2(Fallback === FallbackComponent.current, "The `fallbackComponent` prop of `DynamicWidgets` changed between renders. Please provide a stable reference, as described in https://www.algolia.com/doc/api-reference/widgets/dynamic-facets/react/#widget-param-fallbackcomponent") : void 0;
  var _useDynamicWidgets = useDynamicWidgets(props, {
    $$widgetType: "ais.dynamicWidgets"
  }), attributesToRender = _useDynamicWidgets.attributesToRender;
  var widgets = /* @__PURE__ */ new Map();
  import_react15.default.Children.forEach(children, function(child) {
    var attribute = getWidgetAttribute2(child);
    invariant(attribute !== void 0, "<DynamicWidgets> only supports InstantSearch widgets with an `attribute` or `attributes` prop.");
    widgets.set(attribute, child);
  });
  return import_react15.default.createElement(import_react15.default.Fragment, null, attributesToRender.map(function(attribute) {
    return import_react15.default.createElement(import_react15.Fragment, {
      key: attribute
    }, widgets.get(attribute) || import_react15.default.createElement(FallbackComponent.current, {
      attribute
    }));
  }));
}
function isReactElement(element) {
  return _typeof18(element) === "object" && element.props;
}
function getWidgetAttribute2(element) {
  if (!isReactElement(element)) {
    return void 0;
  }
  if (element.props.attribute) {
    return element.props.attribute;
  }
  if (Array.isArray(element.props.attributes)) {
    return element.props.attributes[0];
  }
  if (element.props.children) {
    invariant(import_react15.default.Children.count(element.props.children) === 1, '<DynamicWidgets> only supports a single component in nested components. Make sure to not render multiple children in a parent component.\n\nExample of an unsupported scenario:\n\n```\n<DynamicWidgets>\n  <MyComponent>\n    <RefinementList attribute="brand" />\n    <Menu attribute="categories" />\n  </MyComponent>\n</DynamicWidgets>\n```\n');
    return getWidgetAttribute2(import_react15.default.Children.only(element.props.children));
  }
  return void 0;
}

// node_modules/react-instantsearch-core/dist/es/components/Index.js
var import_react18 = __toESM(require_react(), 1);

// node_modules/instantsearch.js/es/widgets/index/index.js
var import_algoliasearch_helper3 = __toESM(require_algoliasearch_helper2());
function _typeof19(obj) {
  "@babel/helpers - typeof";
  return _typeof19 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof19(obj);
}
var _excluded4 = ["initialSearchParameters"];
var _excluded23 = ["initialRecommendParameters"];
function ownKeys16(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread16(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys16(Object(source), true).forEach(function(key) {
      _defineProperty16(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys16(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty16(obj, key, value) {
  key = _toPropertyKey16(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey16(arg) {
  var key = _toPrimitive16(arg, "string");
  return _typeof19(key) === "symbol" ? key : String(key);
}
function _toPrimitive16(input, hint) {
  if (_typeof19(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof19(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toConsumableArray3(arr) {
  return _arrayWithoutHoles3(arr) || _iterableToArray3(arr) || _unsupportedIterableToArray9(arr) || _nonIterableSpread3();
}
function _nonIterableSpread3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray9(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray9(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray9(o, minLen);
}
function _iterableToArray3(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles3(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray9(arr);
}
function _arrayLikeToArray9(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _objectWithoutProperties4(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose4(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose4(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var withUsage3 = createDocumentationMessageGenerator({
  name: "index-widget"
});
function privateHelperSetState(helper, _ref) {
  var state = _ref.state, recommendState = _ref.recommendState, isPageReset = _ref.isPageReset, _uiState = _ref._uiState;
  if (state !== helper.state) {
    helper.state = state;
    helper.emit("change", {
      state: helper.state,
      results: helper.lastResults,
      isPageReset,
      _uiState
    });
  }
  if (recommendState !== helper.recommendState) {
    helper.recommendState = recommendState;
  }
}
function getLocalWidgetsUiState(widgets, widgetStateOptions) {
  var initialUiState = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return widgets.reduce(function(uiState, widget) {
    if (isIndexWidget(widget)) {
      return uiState;
    }
    if (!widget.getWidgetUiState && !widget.getWidgetState) {
      return uiState;
    }
    if (widget.getWidgetUiState) {
      return widget.getWidgetUiState(uiState, widgetStateOptions);
    }
    return widget.getWidgetState(uiState, widgetStateOptions);
  }, initialUiState);
}
function getLocalWidgetsSearchParameters(widgets, widgetSearchParametersOptions) {
  var initialSearchParameters = widgetSearchParametersOptions.initialSearchParameters, rest = _objectWithoutProperties4(widgetSearchParametersOptions, _excluded4);
  return widgets.reduce(function(state, widget) {
    if (!widget.getWidgetSearchParameters || isIndexWidget(widget)) {
      return state;
    }
    if (widget.dependsOn === "search" && widget.getWidgetParameters) {
      return widget.getWidgetParameters(state, rest);
    }
    return widget.getWidgetSearchParameters(state, rest);
  }, initialSearchParameters);
}
function getLocalWidgetsRecommendParameters(widgets, widgetRecommendParametersOptions) {
  var initialRecommendParameters = widgetRecommendParametersOptions.initialRecommendParameters, rest = _objectWithoutProperties4(widgetRecommendParametersOptions, _excluded23);
  return widgets.reduce(function(state, widget) {
    if (!isIndexWidget(widget) && widget.dependsOn === "recommend" && widget.getWidgetParameters) {
      return widget.getWidgetParameters(state, rest);
    }
    return state;
  }, initialRecommendParameters);
}
function resetPageFromWidgets(widgets) {
  var indexWidgets = widgets.filter(isIndexWidget);
  if (indexWidgets.length === 0) {
    return;
  }
  indexWidgets.forEach(function(widget) {
    var widgetHelper = widget.getHelper();
    privateHelperSetState(widgetHelper, {
      state: widgetHelper.state.resetPage(),
      recommendState: widgetHelper.recommendState,
      isPageReset: true
    });
    resetPageFromWidgets(widget.getWidgets());
  });
}
function resolveScopedResultsFromWidgets(widgets) {
  var indexWidgets = widgets.filter(isIndexWidget);
  return indexWidgets.reduce(function(scopedResults, current) {
    return scopedResults.concat.apply(scopedResults, [{
      indexId: current.getIndexId(),
      results: current.getResults(),
      helper: current.getHelper()
    }].concat(_toConsumableArray3(resolveScopedResultsFromWidgets(current.getWidgets()))));
  }, []);
}
var index = function index2(widgetParams) {
  if (widgetParams === void 0 || widgetParams.indexName === void 0) {
    throw new Error(withUsage3("The `indexName` option is required."));
  }
  var indexName = widgetParams.indexName, _widgetParams$indexId = widgetParams.indexId, indexId = _widgetParams$indexId === void 0 ? indexName : _widgetParams$indexId;
  var localWidgets = [];
  var localUiState = {};
  var localInstantSearchInstance = null;
  var localParent = null;
  var helper = null;
  var derivedHelper = null;
  var lastValidSearchParameters = null;
  var hasRecommendWidget = false;
  var hasSearchWidget = false;
  return {
    $$type: "ais.index",
    $$widgetType: "ais.index",
    getIndexName: function getIndexName() {
      return indexName;
    },
    getIndexId: function getIndexId() {
      return indexId;
    },
    getHelper: function getHelper() {
      return helper;
    },
    getResults: function getResults() {
      var _derivedHelper;
      if (!((_derivedHelper = derivedHelper) !== null && _derivedHelper !== void 0 && _derivedHelper.lastResults)) return null;
      derivedHelper.lastResults._state = helper.state;
      return derivedHelper.lastResults;
    },
    getResultsForWidget: function getResultsForWidget(widget) {
      var _helper;
      if (widget.dependsOn !== "recommend" || isIndexWidget(widget) || widget.$$id === void 0) {
        return this.getResults();
      }
      if (!((_helper = helper) !== null && _helper !== void 0 && _helper.lastRecommendResults)) {
        return null;
      }
      return helper.lastRecommendResults[widget.$$id];
    },
    getPreviousState: function getPreviousState() {
      return lastValidSearchParameters;
    },
    getScopedResults: function getScopedResults() {
      var widgetParent = this.getParent();
      var widgetSiblings;
      if (widgetParent) {
        widgetSiblings = widgetParent.getWidgets();
      } else if (indexName.length === 0) {
        widgetSiblings = this.getWidgets();
      } else {
        widgetSiblings = [this];
      }
      return resolveScopedResultsFromWidgets(widgetSiblings);
    },
    getParent: function getParent() {
      return localParent;
    },
    createURL: function createURL(nextState) {
      if (typeof nextState === "function") {
        return localInstantSearchInstance._createURL(_defineProperty16({}, indexId, nextState(localUiState)));
      }
      return localInstantSearchInstance._createURL(_defineProperty16({}, indexId, getLocalWidgetsUiState(localWidgets, {
        searchParameters: nextState,
        helper
      })));
    },
    getWidgets: function getWidgets() {
      return localWidgets;
    },
    addWidgets: function addWidgets(widgets) {
      var _this = this;
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage3("The `addWidgets` method expects an array of widgets."));
      }
      if (widgets.some(function(widget) {
        return typeof widget.init !== "function" && typeof widget.render !== "function";
      })) {
        throw new Error(withUsage3("The widget definition expects a `render` and/or an `init` method."));
      }
      widgets.forEach(function(widget) {
        if (isIndexWidget(widget)) {
          return;
        }
        if (localInstantSearchInstance && widget.dependsOn === "recommend") {
          localInstantSearchInstance._hasRecommendWidget = true;
        } else if (localInstantSearchInstance) {
          localInstantSearchInstance._hasSearchWidget = true;
        } else if (widget.dependsOn === "recommend") {
          hasRecommendWidget = true;
        } else {
          hasSearchWidget = true;
        }
        addWidgetId(widget);
      });
      localWidgets = localWidgets.concat(widgets);
      if (localInstantSearchInstance && Boolean(widgets.length)) {
        privateHelperSetState(helper, {
          state: getLocalWidgetsSearchParameters(localWidgets, {
            uiState: localUiState,
            initialSearchParameters: helper.state
          }),
          recommendState: getLocalWidgetsRecommendParameters(localWidgets, {
            uiState: localUiState,
            initialRecommendParameters: helper.recommendState
          }),
          _uiState: localUiState
        });
        widgets.forEach(function(widget) {
          if (widget.getRenderState) {
            var renderState = widget.getRenderState(localInstantSearchInstance.renderState[_this.getIndexId()] || {}, createInitArgs(localInstantSearchInstance, _this, localInstantSearchInstance._initialUiState));
            storeRenderState({
              renderState,
              instantSearchInstance: localInstantSearchInstance,
              parent: _this
            });
          }
        });
        widgets.forEach(function(widget) {
          if (widget.init) {
            widget.init(createInitArgs(localInstantSearchInstance, _this, localInstantSearchInstance._initialUiState));
          }
        });
        localInstantSearchInstance.scheduleSearch();
      }
      return this;
    },
    removeWidgets: function removeWidgets(widgets) {
      var _this2 = this;
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage3("The `removeWidgets` method expects an array of widgets."));
      }
      if (widgets.some(function(widget) {
        return typeof widget.dispose !== "function";
      })) {
        throw new Error(withUsage3("The widget definition expects a `dispose` method."));
      }
      localWidgets = localWidgets.filter(function(widget) {
        return widgets.indexOf(widget) === -1;
      });
      localWidgets.forEach(function(widget) {
        if (isIndexWidget(widget)) {
          return;
        }
        if (localInstantSearchInstance && widget.dependsOn === "recommend") {
          localInstantSearchInstance._hasRecommendWidget = true;
        } else if (localInstantSearchInstance) {
          localInstantSearchInstance._hasSearchWidget = true;
        } else if (widget.dependsOn === "recommend") {
          hasRecommendWidget = true;
        } else {
          hasSearchWidget = true;
        }
      });
      if (localInstantSearchInstance && Boolean(widgets.length)) {
        var _widgets$reduce = widgets.reduce(function(states, widget) {
          var next = widget.dispose({
            helper,
            state: states.cleanedSearchState,
            recommendState: states.cleanedRecommendState,
            parent: _this2
          });
          if (next instanceof import_algoliasearch_helper3.default.RecommendParameters) {
            states.cleanedRecommendState = next;
          } else if (next) {
            states.cleanedSearchState = next;
          }
          return states;
        }, {
          cleanedSearchState: helper.state,
          cleanedRecommendState: helper.recommendState
        }), cleanedSearchState = _widgets$reduce.cleanedSearchState, cleanedRecommendState = _widgets$reduce.cleanedRecommendState;
        var newState = localInstantSearchInstance.future.preserveSharedStateOnUnmount ? getLocalWidgetsSearchParameters(localWidgets, {
          uiState: localUiState,
          initialSearchParameters: new import_algoliasearch_helper3.default.SearchParameters({
            index: this.getIndexName()
          })
        }) : getLocalWidgetsSearchParameters(localWidgets, {
          uiState: getLocalWidgetsUiState(localWidgets, {
            searchParameters: cleanedSearchState,
            helper
          }),
          initialSearchParameters: cleanedSearchState
        });
        localUiState = getLocalWidgetsUiState(localWidgets, {
          searchParameters: newState,
          helper
        });
        helper.setState(newState);
        helper.recommendState = cleanedRecommendState;
        if (localWidgets.length) {
          localInstantSearchInstance.scheduleSearch();
        }
      }
      return this;
    },
    init: function init(_ref22) {
      var _this3 = this, _instantSearchInstanc;
      var instantSearchInstance = _ref22.instantSearchInstance, parent = _ref22.parent, uiState = _ref22.uiState;
      if (helper !== null) {
        return;
      }
      localInstantSearchInstance = instantSearchInstance;
      localParent = parent;
      localUiState = uiState[indexId] || {};
      var mainHelper = instantSearchInstance.mainHelper;
      var parameters = getLocalWidgetsSearchParameters(localWidgets, {
        uiState: localUiState,
        initialSearchParameters: new import_algoliasearch_helper3.default.SearchParameters({
          index: indexName
        })
      });
      var recommendParameters = getLocalWidgetsRecommendParameters(localWidgets, {
        uiState: localUiState,
        initialRecommendParameters: new import_algoliasearch_helper3.default.RecommendParameters()
      });
      helper = (0, import_algoliasearch_helper3.default)({}, parameters.index, parameters);
      helper.recommendState = recommendParameters;
      helper.search = function() {
        if (instantSearchInstance.onStateChange) {
          instantSearchInstance.onStateChange({
            uiState: instantSearchInstance.mainIndex.getWidgetUiState({}),
            setUiState: function setUiState(nextState) {
              return instantSearchInstance.setUiState(nextState, false);
            }
          });
          return mainHelper;
        }
        return mainHelper.search();
      };
      helper.searchWithoutTriggeringOnStateChange = function() {
        return mainHelper.search();
      };
      helper.searchForFacetValues = function(facetName, facetValue, maxFacetHits, userState) {
        var state = helper.state.setQueryParameters(userState);
        return mainHelper.searchForFacetValues(facetName, facetValue, maxFacetHits, state);
      };
      derivedHelper = mainHelper.derive(function() {
        return mergeSearchParameters.apply(void 0, [mainHelper.state].concat(_toConsumableArray3(resolveSearchParameters(_this3))));
      }, function() {
        return _this3.getHelper().recommendState;
      });
      var indexInitialResults = (_instantSearchInstanc = instantSearchInstance._initialResults) === null || _instantSearchInstanc === void 0 ? void 0 : _instantSearchInstanc[this.getIndexId()];
      if (indexInitialResults !== null && indexInitialResults !== void 0 && indexInitialResults.results) {
        var results = new import_algoliasearch_helper3.default.SearchResults(new import_algoliasearch_helper3.default.SearchParameters(indexInitialResults.state), indexInitialResults.results);
        derivedHelper.lastResults = results;
        helper.lastResults = results;
      }
      if (indexInitialResults !== null && indexInitialResults !== void 0 && indexInitialResults.recommendResults) {
        var recommendResults = new import_algoliasearch_helper3.default.RecommendResults(new import_algoliasearch_helper3.default.RecommendParameters({
          params: indexInitialResults.recommendResults.params
        }), indexInitialResults.recommendResults.results);
        derivedHelper.lastRecommendResults = recommendResults;
        helper.lastRecommendResults = recommendResults;
      }
      helper.on("change", function(_ref3) {
        var isPageReset = _ref3.isPageReset;
        if (isPageReset) {
          resetPageFromWidgets(localWidgets);
        }
      });
      derivedHelper.on("search", function() {
        instantSearchInstance.scheduleStalledRender();
        if (true) {
          checkIndexUiState({
            index: _this3,
            indexUiState: localUiState
          });
        }
      });
      derivedHelper.on("result", function(_ref42) {
        var results2 = _ref42.results;
        instantSearchInstance.scheduleRender();
        helper.lastResults = results2;
        lastValidSearchParameters = results2 === null || results2 === void 0 ? void 0 : results2._state;
      });
      derivedHelper.on("recommend:result", function(_ref5) {
        var recommend = _ref5.recommend;
        instantSearchInstance.scheduleRender();
        helper.lastRecommendResults = recommend.results;
      });
      localWidgets.forEach(function(widget) {
        if (widget.getRenderState) {
          var renderState = widget.getRenderState(instantSearchInstance.renderState[_this3.getIndexId()] || {}, createInitArgs(instantSearchInstance, _this3, uiState));
          storeRenderState({
            renderState,
            instantSearchInstance,
            parent: _this3
          });
        }
      });
      localWidgets.forEach(function(widget) {
        true ? _warning(
          // if it has NO getWidgetState or if it has getWidgetUiState, we don't warn
          // aka we warn if there's _only_ getWidgetState
          !widget.getWidgetState || Boolean(widget.getWidgetUiState),
          "The `getWidgetState` method is renamed `getWidgetUiState` and will no longer exist under that name in InstantSearch.js 5.x. Please use `getWidgetUiState` instead."
        ) : void 0;
        if (widget.init) {
          widget.init(createInitArgs(instantSearchInstance, _this3, uiState));
        }
      });
      helper.on("change", function(event) {
        var state = event.state;
        var _uiState = event._uiState;
        localUiState = getLocalWidgetsUiState(localWidgets, {
          searchParameters: state,
          helper
        }, _uiState || {});
        if (!instantSearchInstance.onStateChange) {
          instantSearchInstance.onInternalStateChange();
        }
      });
      if (indexInitialResults) {
        instantSearchInstance.scheduleRender();
      }
      if (hasRecommendWidget) {
        instantSearchInstance._hasRecommendWidget = true;
      }
      if (hasSearchWidget) {
        instantSearchInstance._hasSearchWidget = true;
      }
    },
    render: function render(_ref62) {
      var _derivedHelper2, _this4 = this;
      var instantSearchInstance = _ref62.instantSearchInstance;
      if (instantSearchInstance.status === "error" && !instantSearchInstance.mainHelper.hasPendingRequests() && lastValidSearchParameters) {
        helper.setState(lastValidSearchParameters);
      }
      var widgetsToRender = this.getResults() || (_derivedHelper2 = derivedHelper) !== null && _derivedHelper2 !== void 0 && _derivedHelper2.lastRecommendResults ? localWidgets : localWidgets.filter(isIndexWidget);
      widgetsToRender = widgetsToRender.filter(function(widget) {
        if (!widget.shouldRender) {
          return true;
        }
        return widget.shouldRender({
          instantSearchInstance
        });
      });
      widgetsToRender.forEach(function(widget) {
        if (widget.getRenderState) {
          var renderState = widget.getRenderState(instantSearchInstance.renderState[_this4.getIndexId()] || {}, createRenderArgs(instantSearchInstance, _this4, widget));
          storeRenderState({
            renderState,
            instantSearchInstance,
            parent: _this4
          });
        }
      });
      widgetsToRender.forEach(function(widget) {
        if (widget.render) {
          widget.render(createRenderArgs(instantSearchInstance, _this4, widget));
        }
      });
    },
    dispose: function dispose() {
      var _this5 = this, _helper2, _derivedHelper3;
      localWidgets.forEach(function(widget) {
        if (widget.dispose && helper) {
          widget.dispose({
            helper,
            state: helper.state,
            recommendState: helper.recommendState,
            parent: _this5
          });
        }
      });
      localInstantSearchInstance = null;
      localParent = null;
      (_helper2 = helper) === null || _helper2 === void 0 ? void 0 : _helper2.removeAllListeners();
      helper = null;
      (_derivedHelper3 = derivedHelper) === null || _derivedHelper3 === void 0 ? void 0 : _derivedHelper3.detach();
      derivedHelper = null;
    },
    getWidgetUiState: function getWidgetUiState(uiState) {
      return localWidgets.filter(isIndexWidget).reduce(function(previousUiState, innerIndex) {
        return innerIndex.getWidgetUiState(previousUiState);
      }, _objectSpread16(_objectSpread16({}, uiState), {}, _defineProperty16({}, indexId, _objectSpread16(_objectSpread16({}, uiState[indexId]), localUiState))));
    },
    getWidgetState: function getWidgetState(uiState) {
      true ? _warning(false, "The `getWidgetState` method is renamed `getWidgetUiState` and will no longer exist under that name in InstantSearch.js 5.x. Please use `getWidgetUiState` instead.") : void 0;
      return this.getWidgetUiState(uiState);
    },
    getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref7) {
      var uiState = _ref7.uiState;
      return getLocalWidgetsSearchParameters(localWidgets, {
        uiState,
        initialSearchParameters: searchParameters
      });
    },
    refreshUiState: function refreshUiState() {
      localUiState = getLocalWidgetsUiState(localWidgets, {
        searchParameters: this.getHelper().state,
        helper: this.getHelper()
      }, localUiState);
    },
    setIndexUiState: function setIndexUiState(indexUiState) {
      var nextIndexUiState = typeof indexUiState === "function" ? indexUiState(localUiState) : indexUiState;
      localInstantSearchInstance.setUiState(function(state) {
        return _objectSpread16(_objectSpread16({}, state), {}, _defineProperty16({}, indexId, nextIndexUiState));
      });
    }
  };
};
var index_default = index;
function storeRenderState(_ref8) {
  var renderState = _ref8.renderState, instantSearchInstance = _ref8.instantSearchInstance, parent = _ref8.parent;
  var parentIndexName = parent ? parent.getIndexId() : instantSearchInstance.mainIndex.getIndexId();
  instantSearchInstance.renderState = _objectSpread16(_objectSpread16({}, instantSearchInstance.renderState), {}, _defineProperty16({}, parentIndexName, _objectSpread16(_objectSpread16({}, instantSearchInstance.renderState[parentIndexName]), renderState)));
}

// node_modules/react-instantsearch-core/dist/es/lib/useIndex.js
var import_react17 = __toESM(require_react(), 1);

// node_modules/react-instantsearch-core/dist/es/lib/useForceUpdate.js
var import_react16 = __toESM(require_react(), 1);
function _slicedToArray8(arr, i) {
  return _arrayWithHoles8(arr) || _iterableToArrayLimit8(arr, i) || _unsupportedIterableToArray10(arr, i) || _nonIterableRest8();
}
function _nonIterableRest8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray10(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray10(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray10(o, minLen);
}
function _arrayLikeToArray10(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit8(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles8(arr) {
  if (Array.isArray(arr)) return arr;
}
function useForceUpdate() {
  var _useReducer = (0, import_react16.useReducer)(function(x) {
    return x + 1;
  }, 0), _useReducer2 = _slicedToArray8(_useReducer, 2), forceUpdate = _useReducer2[1];
  return forceUpdate;
}

// node_modules/react-instantsearch-core/dist/es/lib/useIndex.js
function useIndex(props) {
  var serverContext = useInstantSearchServerContext();
  var ssrContext = useInstantSearchSSRContext();
  var initialResults = ssrContext === null || ssrContext === void 0 ? void 0 : ssrContext.initialResults;
  var parentIndex = useIndexContext();
  var stableProps = useStableValue(props);
  var indexWidget = (0, import_react17.useMemo)(function() {
    return index_default(stableProps);
  }, [stableProps]);
  var helper = indexWidget.getHelper();
  var forceUpdate = useForceUpdate();
  useIsomorphicLayoutEffect(function() {
    forceUpdate();
  }, [helper, forceUpdate]);
  useWidget({
    widget: indexWidget,
    parentIndex,
    props: stableProps,
    shouldSsr: Boolean(serverContext || initialResults)
  });
  return indexWidget;
}

// node_modules/react-instantsearch-core/dist/es/components/Index.js
var _excluded5 = ["children"];
function _objectWithoutProperties5(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose5(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose5(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Index(_ref) {
  var children = _ref.children, props = _objectWithoutProperties5(_ref, _excluded5);
  var index3 = useIndex(props);
  if (index3.getHelper() === null) {
    return null;
  }
  return import_react18.default.createElement(IndexContext.Provider, {
    value: index3
  }, children);
}

// node_modules/react-instantsearch-core/dist/es/components/InstantSearch.js
var import_react20 = __toESM(require_react(), 1);

// node_modules/instantsearch.js/es/lib/InstantSearch.js
var import_events = __toESM(require_events());
var import_algoliasearch_helper4 = __toESM(require_algoliasearch_helper2());

// node_modules/instantsearch.js/es/lib/suit.js
var NAMESPACE = "ais";
var component = function component2(componentName) {
  return function() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, descendantName = _ref.descendantName, modifierName = _ref.modifierName;
    var descendent = descendantName ? "-".concat(descendantName) : "";
    var modifier = modifierName ? "--".concat(modifierName) : "";
    return "".concat(NAMESPACE, "-").concat(componentName).concat(descendent).concat(modifier);
  };
};

// node_modules/instantsearch.js/es/helpers/highlight.js
var suit = component("Highlight");
function highlight(_ref) {
  var attribute = _ref.attribute, _ref$highlightedTagNa = _ref.highlightedTagName, highlightedTagName = _ref$highlightedTagNa === void 0 ? "mark" : _ref$highlightedTagNa, hit = _ref.hit, _ref$cssClasses = _ref.cssClasses, cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  true ? _warning(false, "`instantsearch.highlight` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `Highlight` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var highlightAttributeResult = getPropertyByPath(hit._highlightResult, attribute);
  true ? _warning(highlightAttributeResult, 'Could not enable highlight for "'.concat(attribute, '", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var _ref22 = highlightAttributeResult || {}, _ref2$value = _ref22.value, attributeValue = _ref2$value === void 0 ? "" : _ref2$value;
  var className = suit({
    descendantName: "highlighted"
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : "");
  return attributeValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, "g"), "<".concat(highlightedTagName, ' class="').concat(className, '">')).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, "g"), "</".concat(highlightedTagName, ">"));
}

// node_modules/instantsearch.js/es/helpers/reverseHighlight.js
var suit2 = component("ReverseHighlight");
function reverseHighlight(_ref) {
  var attribute = _ref.attribute, _ref$highlightedTagNa = _ref.highlightedTagName, highlightedTagName = _ref$highlightedTagNa === void 0 ? "mark" : _ref$highlightedTagNa, hit = _ref.hit, _ref$cssClasses = _ref.cssClasses, cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  true ? _warning(false, "`instantsearch.reverseHighlight` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `ReverseHighlight` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var highlightAttributeResult = getPropertyByPath(hit._highlightResult, attribute);
  true ? _warning(highlightAttributeResult, 'Could not enable reverse highlight for "'.concat(attribute, '", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var _ref22 = highlightAttributeResult || {}, _ref2$value = _ref22.value, attributeValue = _ref2$value === void 0 ? "" : _ref2$value;
  var className = suit2({
    descendantName: "highlighted"
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : "");
  var reverseHighlightedValue = concatHighlightedParts(reverseHighlightedParts(getHighlightedParts(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, "g"), "<".concat(highlightedTagName, ' class="').concat(className, '">')).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, "g"), "</".concat(highlightedTagName, ">"));
}

// node_modules/instantsearch.js/es/helpers/snippet.js
var suit3 = component("Snippet");
function snippet(_ref) {
  var attribute = _ref.attribute, _ref$highlightedTagNa = _ref.highlightedTagName, highlightedTagName = _ref$highlightedTagNa === void 0 ? "mark" : _ref$highlightedTagNa, hit = _ref.hit, _ref$cssClasses = _ref.cssClasses, cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  true ? _warning(false, "`instantsearch.snippet` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `Snippet` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var snippetAttributeResult = getPropertyByPath(hit._snippetResult, attribute);
  true ? _warning(snippetAttributeResult, 'Could not enable snippet for "'.concat(attribute, '", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var _ref22 = snippetAttributeResult || {}, _ref2$value = _ref22.value, attributeValue = _ref2$value === void 0 ? "" : _ref2$value;
  var className = suit3({
    descendantName: "highlighted"
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : "");
  return attributeValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, "g"), "<".concat(highlightedTagName, ' class="').concat(className, '">')).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, "g"), "</".concat(highlightedTagName, ">"));
}

// node_modules/instantsearch.js/es/helpers/reverseSnippet.js
var suit4 = component("ReverseSnippet");
function reverseSnippet(_ref) {
  var attribute = _ref.attribute, _ref$highlightedTagNa = _ref.highlightedTagName, highlightedTagName = _ref$highlightedTagNa === void 0 ? "mark" : _ref$highlightedTagNa, hit = _ref.hit, _ref$cssClasses = _ref.cssClasses, cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  true ? _warning(false, "`instantsearch.reverseSnippet` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `ReverseSnippet` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var snippetAttributeResult = getPropertyByPath(hit._snippetResult, attribute);
  true ? _warning(snippetAttributeResult, 'Could not enable reverse snippet for "'.concat(attribute, '", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n')) : void 0;
  var _ref22 = snippetAttributeResult || {}, _ref2$value = _ref22.value, attributeValue = _ref2$value === void 0 ? "" : _ref2$value;
  var className = suit4({
    descendantName: "highlighted"
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : "");
  var reverseHighlightedValue = concatHighlightedParts(reverseHighlightedParts(getHighlightedParts(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, "g"), "<".concat(highlightedTagName, ' class="').concat(className, '">')).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, "g"), "</".concat(highlightedTagName, ">"));
}

// node_modules/instantsearch.js/es/helpers/insights.js
function _typeof20(obj) {
  "@babel/helpers - typeof";
  return _typeof20 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof20(obj);
}
function writeDataAttributes(_ref) {
  var method = _ref.method, payload = _ref.payload;
  if (_typeof20(payload) !== "object") {
    throw new Error("The insights helper expects the payload to be an object.");
  }
  var serializedPayload;
  try {
    serializedPayload = serializePayload(payload);
  } catch (error) {
    throw new Error("Could not JSON serialize the payload object.");
  }
  return 'data-insights-method="'.concat(method, '" data-insights-payload="').concat(serializedPayload, '"');
}
function insights(method, payload) {
  true ? _warning(false, "`insights` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : void 0;
  return writeDataAttributes({
    method,
    payload
  });
}

// node_modules/instantsearch.js/es/helpers/get-insights-anonymous-user-token.js
function _typeof21(obj) {
  "@babel/helpers - typeof";
  return _typeof21 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof21(obj);
}
var ANONYMOUS_TOKEN_COOKIE_KEY = "_ALGOLIA";
function getCookie(name) {
  if ((typeof document === "undefined" ? "undefined" : _typeof21(document)) !== "object" || typeof document.cookie !== "string") {
    return void 0;
  }
  var prefix = "".concat(name, "=");
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(prefix) === 0) {
      return cookie.substring(prefix.length, cookie.length);
    }
  }
  return void 0;
}
function getInsightsAnonymousUserTokenInternal() {
  return getCookie(ANONYMOUS_TOKEN_COOKIE_KEY);
}

// node_modules/instantsearch.js/es/lib/utils/uuid.js
function createUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0;
    var v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}

// node_modules/instantsearch.js/es/middlewares/createInsightsMiddleware.js
function _typeof22(obj) {
  "@babel/helpers - typeof";
  return _typeof22 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof22(obj);
}
function ownKeys17(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread17(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys17(Object(source), true).forEach(function(key) {
      _defineProperty17(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys17(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty17(obj, key, value) {
  key = _toPropertyKey17(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey17(arg) {
  var key = _toPrimitive17(arg, "string");
  return _typeof22(key) === "symbol" ? key : String(key);
}
function _toPrimitive17(input, hint) {
  if (_typeof22(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof22(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray9(arr, i) {
  return _arrayWithHoles9(arr) || _iterableToArrayLimit9(arr, i) || _unsupportedIterableToArray11(arr, i) || _nonIterableRest9();
}
function _nonIterableRest9() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit9(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles9(arr) {
  if (Array.isArray(arr)) return arr;
}
function _toConsumableArray4(arr) {
  return _arrayWithoutHoles4(arr) || _iterableToArray4(arr) || _unsupportedIterableToArray11(arr) || _nonIterableSpread4();
}
function _nonIterableSpread4() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray11(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray11(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray11(o, minLen);
}
function _iterableToArray4(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles4(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray11(arr);
}
function _arrayLikeToArray11(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var ALGOLIA_INSIGHTS_VERSION = "2.17.2";
var ALGOLIA_INSIGHTS_SRC = "https://cdn.jsdelivr.net/npm/search-insights@".concat(ALGOLIA_INSIGHTS_VERSION, "/dist/search-insights.min.js");
function createInsightsMiddleware() {
  var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _insightsClient = props.insightsClient, insightsInitParams = props.insightsInitParams, onEvent = props.onEvent, _props$$$internal = props.$$internal, $$internal = _props$$$internal === void 0 ? false : _props$$$internal, _props$$$automatic = props.$$automatic, $$automatic = _props$$$automatic === void 0 ? false : _props$$$automatic;
  var currentTokenType;
  var potentialInsightsClient = _insightsClient;
  if (!_insightsClient && _insightsClient !== null) {
    safelyRunOnBrowser(function(_ref) {
      var window2 = _ref.window;
      var pointer = window2.AlgoliaAnalyticsObject || "aa";
      if (typeof pointer === "string") {
        potentialInsightsClient = window2[pointer];
      }
      if (!potentialInsightsClient) {
        window2.AlgoliaAnalyticsObject = pointer;
        if (!window2[pointer]) {
          window2[pointer] = function() {
            if (!window2[pointer].queue) {
              window2[pointer].queue = [];
            }
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            window2[pointer].queue.push(args);
          };
          window2[pointer].version = ALGOLIA_INSIGHTS_VERSION;
          window2[pointer].shouldAddScript = true;
        }
        potentialInsightsClient = window2[pointer];
      }
    });
  }
  var insightsClient = potentialInsightsClient || noop;
  return function(_ref22) {
    var instantSearchInstance = _ref22.instantSearchInstance;
    var existingInsightsMiddlewares = instantSearchInstance.middleware.filter(function(m) {
      return m.instance.$$type === "ais.insights" && m.instance.$$internal;
    }).map(function(m) {
      return m.creator;
    });
    instantSearchInstance.unuse.apply(instantSearchInstance, _toConsumableArray4(existingInsightsMiddlewares));
    var _getAppIdAndApiKey = getAppIdAndApiKey(instantSearchInstance.client), _getAppIdAndApiKey2 = _slicedToArray9(_getAppIdAndApiKey, 2), appId = _getAppIdAndApiKey2[0], apiKey = _getAppIdAndApiKey2[1];
    true ? _warning(Boolean(appId && apiKey), "could not extract Algolia credentials from searchClient in insights middleware.") : void 0;
    var queuedInitParams = void 0;
    var queuedUserToken = void 0;
    var queuedAuthenticatedUserToken = void 0;
    var userTokenBeforeInit = void 0;
    var authenticatedUserTokenBeforeInit = void 0;
    var queue = insightsClient.queue;
    if (Array.isArray(queue)) {
      var _map = ["setUserToken", "setAuthenticatedUserToken", "init"].map(function(key) {
        var _ref3 = find(queue.slice().reverse(), function(_ref5) {
          var _ref62 = _slicedToArray9(_ref5, 1), method = _ref62[0];
          return method === key;
        }) || [], _ref42 = _slicedToArray9(_ref3, 2), value = _ref42[1];
        return value;
      });
      var _map2 = _slicedToArray9(_map, 3);
      queuedUserToken = _map2[0];
      queuedAuthenticatedUserToken = _map2[1];
      queuedInitParams = _map2[2];
    }
    insightsClient("getUserToken", null, function(_error, userToken) {
      userTokenBeforeInit = normalizeUserToken(userToken);
    });
    insightsClient("getAuthenticatedUserToken", null, function(_error, userToken) {
      authenticatedUserTokenBeforeInit = normalizeUserToken(userToken);
    });
    if (insightsInitParams || !isModernInsightsClient(insightsClient)) {
      insightsClient("init", _objectSpread17({
        appId,
        apiKey,
        partial: true
      }, insightsInitParams));
    }
    var initialParameters;
    var helper;
    return {
      $$type: "ais.insights",
      $$internal,
      $$automatic,
      onStateChange: function onStateChange() {
      },
      subscribe: function subscribe() {
        if (!insightsClient.shouldAddScript) return;
        var errorMessage = "[insights middleware]: could not load search-insights.js. Please load it manually following https://alg.li/insights-init";
        try {
          var script = document.createElement("script");
          script.async = true;
          script.src = ALGOLIA_INSIGHTS_SRC;
          script.onerror = function() {
            instantSearchInstance.emit("error", new Error(errorMessage));
          };
          document.body.appendChild(script);
          insightsClient.shouldAddScript = false;
        } catch (cause) {
          insightsClient.shouldAddScript = false;
          instantSearchInstance.emit("error", new Error(errorMessage));
        }
      },
      started: function started() {
        insightsClient("addAlgoliaAgent", "insights-middleware");
        helper = instantSearchInstance.mainHelper;
        var queueAtStart = insightsClient.queue;
        if (Array.isArray(queueAtStart)) {
          var _map3 = ["setUserToken", "setAuthenticatedUserToken", "init"].map(function(key) {
            var _ref7 = find(queueAtStart.slice().reverse(), function(_ref9) {
              var _ref10 = _slicedToArray9(_ref9, 1), method = _ref10[0];
              return method === key;
            }) || [], _ref8 = _slicedToArray9(_ref7, 2), value = _ref8[1];
            return value;
          });
          var _map4 = _slicedToArray9(_map3, 3);
          queuedUserToken = _map4[0];
          queuedAuthenticatedUserToken = _map4[1];
          queuedInitParams = _map4[2];
        }
        initialParameters = {
          userToken: helper.state.userToken,
          clickAnalytics: helper.state.clickAnalytics
        };
        if (!$$automatic) {
          helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread17(_objectSpread17({}, helper.state), {}, {
            clickAnalytics: true
          }));
        }
        if (!$$internal) {
          instantSearchInstance.scheduleSearch();
        }
        var setUserTokenToSearch = function setUserTokenToSearch2(userToken, tokenType) {
          var immediate = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
          var unsetAuthenticatedUserToken = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
          var normalizedUserToken = normalizeUserToken(userToken);
          if (!normalizedUserToken) {
            return;
          }
          var existingToken = helper.state.userToken;
          function applyToken() {
            helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread17(_objectSpread17({}, helper.state), {}, {
              userToken: normalizedUserToken
            }));
            if (existingToken && existingToken !== userToken) {
              instantSearchInstance.scheduleSearch();
            }
            currentTokenType = tokenType;
          }
          if (currentTokenType && currentTokenType === "authenticated" && tokenType === "default" && !unsetAuthenticatedUserToken) {
            return;
          }
          if (!immediate) {
            setTimeout(applyToken, 0);
          } else {
            applyToken();
          }
        };
        function setUserToken(token2, userToken, authenticatedUserToken) {
          setUserTokenToSearch(token2, authenticatedUserToken ? "authenticated" : "default", true);
          if (userToken) {
            insightsClient("setUserToken", userToken);
          }
          if (authenticatedUserToken) {
            insightsClient("setAuthenticatedUserToken", authenticatedUserToken);
          }
        }
        var anonymousUserToken = void 0;
        var anonymousTokenFromInsights = getInsightsAnonymousUserTokenInternal();
        if (anonymousTokenFromInsights) {
          anonymousUserToken = anonymousTokenFromInsights;
        } else {
          var token = "anonymous-".concat(createUUID());
          anonymousUserToken = token;
        }
        var authenticatedUserTokenFromInit;
        var userTokenFromInit;
        var tokenFromSearchParameters = initialParameters.userToken;
        if (insightsInitParams) {
          if (insightsInitParams.authenticatedUserToken) {
            authenticatedUserTokenFromInit = insightsInitParams.authenticatedUserToken;
          } else if (insightsInitParams.userToken) {
            userTokenFromInit = insightsInitParams.userToken;
          }
        }
        var tokenFromInit = authenticatedUserTokenFromInit || userTokenFromInit;
        var tokenBeforeInit = authenticatedUserTokenBeforeInit || userTokenBeforeInit;
        var tokenFromQueue = queuedAuthenticatedUserToken || queuedUserToken;
        if (tokenFromInit) {
          setUserToken(tokenFromInit, userTokenFromInit, authenticatedUserTokenFromInit);
        } else if (tokenFromSearchParameters) {
          setUserToken(tokenFromSearchParameters, tokenFromSearchParameters, void 0);
        } else if (tokenBeforeInit) {
          setUserToken(tokenBeforeInit, userTokenBeforeInit, authenticatedUserTokenBeforeInit);
        } else if (tokenFromQueue) {
          setUserToken(tokenFromQueue, queuedUserToken, queuedAuthenticatedUserToken);
        } else if (anonymousUserToken) {
          var _queuedInitParams;
          setUserToken(anonymousUserToken, anonymousUserToken, void 0);
          if (insightsInitParams !== null && insightsInitParams !== void 0 && insightsInitParams.useCookie || (_queuedInitParams = queuedInitParams) !== null && _queuedInitParams !== void 0 && _queuedInitParams.useCookie) {
            var _queuedInitParams2;
            saveTokenAsCookie(anonymousUserToken, (insightsInitParams === null || insightsInitParams === void 0 ? void 0 : insightsInitParams.cookieDuration) || ((_queuedInitParams2 = queuedInitParams) === null || _queuedInitParams2 === void 0 ? void 0 : _queuedInitParams2.cookieDuration));
          }
        }
        insightsClient("onUserTokenChange", function(token2) {
          return setUserTokenToSearch(token2, "default", true);
        }, {
          immediate: true
        });
        insightsClient("onAuthenticatedUserTokenChange", function(authenticatedUserToken) {
          if (!authenticatedUserToken) {
            insightsClient("getUserToken", null, function(_, userToken) {
              setUserTokenToSearch(userToken, "default", true, true);
            });
          }
          setUserTokenToSearch(authenticatedUserToken, "authenticated", true);
        }, {
          immediate: true
        });
        var insightsClientWithLocalCredentials = insightsClient;
        if (isModernInsightsClient(insightsClient)) {
          insightsClientWithLocalCredentials = function insightsClientWithLocalCredentials2(method, payload) {
            var extraParams = {
              headers: {
                "X-Algolia-Application-Id": appId,
                "X-Algolia-API-Key": apiKey
              }
            };
            return insightsClient(method, payload, extraParams);
          };
        }
        var viewedObjectIDs = /* @__PURE__ */ new Set();
        var lastQueryId;
        instantSearchInstance.mainHelper.derivedHelpers[0].on("result", function(_ref11) {
          var results = _ref11.results;
          if (!results.queryID || results.queryID !== lastQueryId) {
            lastQueryId = results.queryID;
            viewedObjectIDs.clear();
          }
        });
        instantSearchInstance.sendEventToInsights = function(event) {
          if (onEvent) {
            onEvent(event, insightsClientWithLocalCredentials);
          } else if (event.insightsMethod) {
            if (event.insightsMethod === "viewedObjectIDs") {
              var _payload = event.payload;
              var difference = _payload.objectIDs.filter(function(objectID) {
                return !viewedObjectIDs.has(objectID);
              });
              if (difference.length === 0) {
                return;
              }
              difference.forEach(function(objectID) {
                return viewedObjectIDs.add(objectID);
              });
              _payload.objectIDs = difference;
            }
            event.payload.algoliaSource = ["instantsearch"];
            if ($$automatic) {
              event.payload.algoliaSource.push("instantsearch-automatic");
            }
            if (event.eventModifier === "internal") {
              event.payload.algoliaSource.push("instantsearch-internal");
            }
            insightsClientWithLocalCredentials(event.insightsMethod, event.payload);
            true ? _warning(Boolean(helper.state.userToken), "\nCannot send event to Algolia Insights because `userToken` is not set.\n\nSee documentation: https://www.algolia.com/doc/guides/building-search-ui/going-further/send-insights-events/js/#setting-the-usertoken\n") : void 0;
          } else {
            true ? _warning(false, "Cannot send event to Algolia Insights because `insightsMethod` option is missing.") : void 0;
          }
        };
      },
      unsubscribe: function unsubscribe() {
        insightsClient("onUserTokenChange", void 0);
        insightsClient("onAuthenticatedUserTokenChange", void 0);
        instantSearchInstance.sendEventToInsights = noop;
        if (helper && initialParameters) {
          helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread17(_objectSpread17({}, helper.state), initialParameters));
          instantSearchInstance.scheduleSearch();
        }
      }
    };
  };
}
function saveTokenAsCookie(token, cookieDuration) {
  var MONTH = 30 * 24 * 60 * 60 * 1e3;
  var d = /* @__PURE__ */ new Date();
  d.setTime(d.getTime() + (cookieDuration || MONTH * 6));
  var expires = "expires=".concat(d.toUTCString());
  document.cookie = "_ALGOLIA=".concat(token, ";").concat(expires, ";path=/");
}
function isModernInsightsClient(client) {
  var _split$map = (client.version || "").split(".").map(Number), _split$map2 = _slicedToArray9(_split$map, 2), major = _split$map2[0], minor = _split$map2[1];
  var v3 = major >= 3;
  var v2_6 = major === 2 && minor >= 6;
  var v1_10 = major === 1 && minor >= 10;
  return v3 || v2_6 || v1_10;
}
function normalizeUserToken(userToken) {
  if (!userToken) {
    return void 0;
  }
  return typeof userToken === "number" ? userToken.toString() : userToken;
}

// node_modules/instantsearch.js/es/middlewares/createMetadataMiddleware.js
function extractWidgetPayload(widgets, instantSearchInstance, payload) {
  var initOptions = createInitArgs(instantSearchInstance, instantSearchInstance.mainIndex, instantSearchInstance._initialUiState);
  widgets.forEach(function(widget) {
    var widgetParams = {};
    if (widget.getWidgetRenderState) {
      var renderState = widget.getWidgetRenderState(initOptions);
      if (renderState && renderState.widgetParams) {
        widgetParams = renderState.widgetParams;
      }
    }
    var params = Object.keys(widgetParams).filter(function(key) {
      return widgetParams[key] !== void 0;
    });
    payload.widgets.push({
      type: widget.$$type,
      widgetType: widget.$$widgetType,
      params
    });
    if (widget.$$type === "ais.index") {
      extractWidgetPayload(widget.getWidgets(), instantSearchInstance, payload);
    }
  });
}
function isMetadataEnabled() {
  return safelyRunOnBrowser(function(_ref) {
    var _window$navigator, _window$navigator$use;
    var window2 = _ref.window;
    return ((_window$navigator = window2.navigator) === null || _window$navigator === void 0 ? void 0 : (_window$navigator$use = _window$navigator.userAgent) === null || _window$navigator$use === void 0 ? void 0 : _window$navigator$use.indexOf("Algolia Crawler")) > -1;
  }, {
    fallback: function fallback() {
      return false;
    }
  });
}
function createMetadataMiddleware() {
  var _ref22 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref2$$$internal = _ref22.$$internal, $$internal = _ref2$$$internal === void 0 ? false : _ref2$$$internal;
  return function(_ref3) {
    var instantSearchInstance = _ref3.instantSearchInstance;
    var payload = {
      widgets: []
    };
    var payloadContainer = document.createElement("meta");
    var refNode = document.querySelector("head");
    payloadContainer.name = "instantsearch:widgets";
    return {
      $$type: "ais.metadata",
      $$internal,
      onStateChange: function onStateChange() {
      },
      subscribe: function subscribe() {
        setTimeout(function() {
          var client = instantSearchInstance.client;
          payload.ua = client.transporter && client.transporter.userAgent ? client.transporter.userAgent.value : client._ua;
          extractWidgetPayload(instantSearchInstance.mainIndex.getWidgets(), instantSearchInstance, payload);
          instantSearchInstance.middleware.forEach(function(middleware) {
            return payload.widgets.push({
              middleware: true,
              type: middleware.instance.$$type,
              internal: middleware.instance.$$internal
            });
          });
          payloadContainer.content = JSON.stringify(payload);
          refNode.appendChild(payloadContainer);
        }, 0);
      },
      started: function started() {
      },
      unsubscribe: function unsubscribe() {
        payloadContainer.remove();
      }
    };
  };
}

// node_modules/instantsearch.js/es/lib/routers/history.js
var import_qs = __toESM(require_lib(), 1);
function _typeof23(obj) {
  "@babel/helpers - typeof";
  return _typeof23 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof23(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey18(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty18(obj, key, value) {
  key = _toPropertyKey18(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey18(arg) {
  var key = _toPrimitive18(arg, "string");
  return _typeof23(key) === "symbol" ? key : String(key);
}
function _toPrimitive18(input, hint) {
  if (_typeof23(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof23(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var setWindowTitle = function setWindowTitle2(title) {
  if (title) {
    window.document.title = title;
  }
};
var BrowserHistory = function() {
  function BrowserHistory2(_ref) {
    var _this = this;
    var windowTitle = _ref.windowTitle, _ref$writeDelay = _ref.writeDelay, writeDelay = _ref$writeDelay === void 0 ? 400 : _ref$writeDelay, createURL = _ref.createURL, parseURL = _ref.parseURL, getLocation = _ref.getLocation, start = _ref.start, dispose = _ref.dispose, push = _ref.push, cleanUrlOnDispose = _ref.cleanUrlOnDispose;
    _classCallCheck(this, BrowserHistory2);
    _defineProperty18(this, "$$type", "ais.browser");
    _defineProperty18(this, "windowTitle", void 0);
    _defineProperty18(this, "writeDelay", void 0);
    _defineProperty18(this, "_createURL", void 0);
    _defineProperty18(this, "parseURL", void 0);
    _defineProperty18(this, "getLocation", void 0);
    _defineProperty18(this, "writeTimer", void 0);
    _defineProperty18(this, "_onPopState", void 0);
    _defineProperty18(this, "inPopState", false);
    _defineProperty18(this, "isDisposed", false);
    _defineProperty18(this, "latestAcknowledgedHistory", 0);
    _defineProperty18(this, "_start", void 0);
    _defineProperty18(this, "_dispose", void 0);
    _defineProperty18(this, "_push", void 0);
    _defineProperty18(this, "_cleanUrlOnDispose", void 0);
    this.windowTitle = windowTitle;
    this.writeTimer = void 0;
    this.writeDelay = writeDelay;
    this._createURL = createURL;
    this.parseURL = parseURL;
    this.getLocation = getLocation;
    this._start = start;
    this._dispose = dispose;
    this._push = push;
    this._cleanUrlOnDispose = typeof cleanUrlOnDispose === "undefined" ? true : cleanUrlOnDispose;
    if (typeof cleanUrlOnDispose === "undefined") {
      console.info("Starting from the next major version, InstantSearch will not clean up the URL from active refinements when it is disposed.\n\nWe recommend setting `cleanUrlOnDispose` to false to adopt this change today.\nTo stay with the current behaviour and remove this warning, set the option to true.\n\nSee documentation: ".concat(createDocumentationLink({
        name: "history-router"
      }), "#widget-param-cleanurlondispose"));
    }
    safelyRunOnBrowser(function(_ref22) {
      var window2 = _ref22.window;
      var title = _this.windowTitle && _this.windowTitle(_this.read());
      setWindowTitle(title);
      _this.latestAcknowledgedHistory = window2.history.length;
    });
  }
  _createClass(BrowserHistory2, [{
    key: "read",
    value: function read() {
      return this.parseURL({
        qsModule: import_qs.default,
        location: this.getLocation()
      });
    }
    /**
     * Pushes a search state into the URL.
     */
  }, {
    key: "write",
    value: function write(routeState) {
      var _this2 = this;
      safelyRunOnBrowser(function(_ref3) {
        var window2 = _ref3.window;
        var url = _this2.createURL(routeState);
        var title = _this2.windowTitle && _this2.windowTitle(routeState);
        if (_this2.writeTimer) {
          clearTimeout(_this2.writeTimer);
        }
        _this2.writeTimer = setTimeout(function() {
          setWindowTitle(title);
          if (_this2.shouldWrite(url)) {
            if (_this2._push) {
              _this2._push(url);
            } else {
              window2.history.pushState(routeState, title || "", url);
            }
            _this2.latestAcknowledgedHistory = window2.history.length;
          }
          _this2.inPopState = false;
          _this2.writeTimer = void 0;
        }, _this2.writeDelay);
      });
    }
    /**
     * Sets a callback on the `onpopstate` event of the history API of the current page.
     * It enables the URL sync to keep track of the changes.
     */
  }, {
    key: "onUpdate",
    value: function onUpdate(callback) {
      var _this3 = this;
      if (this._start) {
        this._start(function() {
          callback(_this3.read());
        });
      }
      this._onPopState = function() {
        if (_this3.writeTimer) {
          clearTimeout(_this3.writeTimer);
          _this3.writeTimer = void 0;
        }
        _this3.inPopState = true;
        callback(_this3.read());
      };
      safelyRunOnBrowser(function(_ref42) {
        var window2 = _ref42.window;
        window2.addEventListener("popstate", _this3._onPopState);
      });
    }
    /**
     * Creates a complete URL from a given syncable UI state.
     *
     * It always generates the full URL, not a relative one.
     * This allows to handle cases like using a <base href>.
     * See: https://github.com/algolia/instantsearch/issues/790
     */
  }, {
    key: "createURL",
    value: function createURL(routeState) {
      var url = this._createURL({
        qsModule: import_qs.default,
        routeState,
        location: this.getLocation()
      });
      if (true) {
        try {
          new URL(url);
        } catch (e) {
          true ? _warning(false, "The URL returned by the `createURL` function is invalid.\nPlease make sure it returns an absolute URL to avoid issues, e.g: `https://algolia.com/search?query=iphone`.") : void 0;
        }
      }
      return url;
    }
    /**
     * Removes the event listener and cleans up the URL.
     */
  }, {
    key: "dispose",
    value: function dispose() {
      var _this4 = this;
      if (this._dispose) {
        this._dispose();
      }
      this.isDisposed = true;
      safelyRunOnBrowser(function(_ref5) {
        var window2 = _ref5.window;
        if (_this4._onPopState) {
          window2.removeEventListener("popstate", _this4._onPopState);
        }
      });
      if (this.writeTimer) {
        clearTimeout(this.writeTimer);
      }
      if (this._cleanUrlOnDispose) {
        this.write({});
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.isDisposed = false;
    }
  }, {
    key: "shouldWrite",
    value: function shouldWrite(url) {
      var _this5 = this;
      return safelyRunOnBrowser(function(_ref62) {
        var window2 = _ref62.window;
        if (_this5.isDisposed && !_this5._cleanUrlOnDispose) {
          return false;
        }
        var lastPushWasByISAfterDispose = !(_this5.isDisposed && _this5.latestAcknowledgedHistory !== window2.history.length);
        return (
          // When the last state change was through popstate, the IS.js state changes,
          // but that should not write the URL.
          !_this5.inPopState && // When the previous pushState after dispose was by IS.js, we want to write the URL.
          lastPushWasByISAfterDispose && // When the URL is the same as the current one, we do not want to write it.
          url !== window2.location.href
        );
      });
    }
  }]);
  return BrowserHistory2;
}();
function historyRouter() {
  var _ref7 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref7$createURL = _ref7.createURL, createURL = _ref7$createURL === void 0 ? function(_ref8) {
    var qsModule = _ref8.qsModule, routeState = _ref8.routeState, location = _ref8.location;
    var protocol = location.protocol, hostname = location.hostname, _location$port = location.port, port = _location$port === void 0 ? "" : _location$port, pathname = location.pathname, hash = location.hash;
    var queryString = qsModule.stringify(routeState);
    var portWithPrefix = port === "" ? "" : ":".concat(port);
    if (!queryString) {
      return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname).concat(hash);
    }
    return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname, "?").concat(queryString).concat(hash);
  } : _ref7$createURL, _ref7$parseURL = _ref7.parseURL, parseURL = _ref7$parseURL === void 0 ? function(_ref9) {
    var qsModule = _ref9.qsModule, location = _ref9.location;
    return qsModule.parse(location.search.slice(1), {
      arrayLimit: 99
    });
  } : _ref7$parseURL, _ref7$writeDelay = _ref7.writeDelay, writeDelay = _ref7$writeDelay === void 0 ? 400 : _ref7$writeDelay, windowTitle = _ref7.windowTitle, _ref7$getLocation = _ref7.getLocation, getLocation = _ref7$getLocation === void 0 ? function() {
    return safelyRunOnBrowser(function(_ref10) {
      var window2 = _ref10.window;
      return window2.location;
    }, {
      fallback: function fallback() {
        throw new Error("You need to provide `getLocation` to the `history` router in environments where `window` does not exist.");
      }
    });
  } : _ref7$getLocation, start = _ref7.start, dispose = _ref7.dispose, push = _ref7.push, cleanUrlOnDispose = _ref7.cleanUrlOnDispose;
  return new BrowserHistory({
    createURL,
    parseURL,
    writeDelay,
    windowTitle,
    getLocation,
    start,
    dispose,
    push,
    cleanUrlOnDispose
  });
}

// node_modules/instantsearch.js/es/lib/stateMappings/simple.js
function _typeof24(obj) {
  "@babel/helpers - typeof";
  return _typeof24 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof24(obj);
}
var _excluded6 = ["configure"];
function ownKeys18(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread18(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys18(Object(source), true).forEach(function(key) {
      _defineProperty19(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys18(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty19(obj, key, value) {
  key = _toPropertyKey19(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey19(arg) {
  var key = _toPrimitive19(arg, "string");
  return _typeof24(key) === "symbol" ? key : String(key);
}
function _toPrimitive19(input, hint) {
  if (_typeof24(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof24(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties6(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose6(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose6(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function getIndexStateWithoutConfigure(uiState) {
  var configure = uiState.configure, trackedUiState = _objectWithoutProperties6(uiState, _excluded6);
  return trackedUiState;
}
function simpleStateMapping() {
  return {
    $$type: "ais.simple",
    stateToRoute: function stateToRoute(uiState) {
      return Object.keys(uiState).reduce(function(state, indexId) {
        return _objectSpread18(_objectSpread18({}, state), {}, _defineProperty19({}, indexId, getIndexStateWithoutConfigure(uiState[indexId])));
      }, {});
    },
    routeToState: function routeToState() {
      var routeState = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return Object.keys(routeState).reduce(function(state, indexId) {
        return _objectSpread18(_objectSpread18({}, state), {}, _defineProperty19({}, indexId, getIndexStateWithoutConfigure(routeState[indexId])));
      }, {});
    }
  };
}

// node_modules/instantsearch.js/es/middlewares/createRouterMiddleware.js
function _typeof25(obj) {
  "@babel/helpers - typeof";
  return _typeof25 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof25(obj);
}
function ownKeys19(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread19(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys19(Object(source), true).forEach(function(key) {
      _defineProperty20(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys19(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty20(obj, key, value) {
  key = _toPropertyKey20(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey20(arg) {
  var key = _toPrimitive20(arg, "string");
  return _typeof25(key) === "symbol" ? key : String(key);
}
function _toPrimitive20(input, hint) {
  if (_typeof25(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof25(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var createRouterMiddleware = function createRouterMiddleware2() {
  var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _props$router = props.router, router = _props$router === void 0 ? historyRouter() : _props$router, _props$stateMapping = props.stateMapping, stateMapping = _props$stateMapping === void 0 ? simpleStateMapping() : _props$stateMapping, _props$$$internal = props.$$internal, $$internal = _props$$$internal === void 0 ? false : _props$$$internal;
  return function(_ref) {
    var instantSearchInstance = _ref.instantSearchInstance;
    function topLevelCreateURL(nextState) {
      var previousUiState = (
        // If only the mainIndex is initialized, we don't yet know what other
        // index widgets are used. Therefore we fall back to the initialUiState.
        // We can't indiscriminately use the initialUiState because then we
        // reintroduce state that was changed by the user.
        // When there are no widgets, we are sure the user can't yet have made
        // any changes.
        instantSearchInstance.mainIndex.getWidgets().length === 0 ? instantSearchInstance._initialUiState : instantSearchInstance.mainIndex.getWidgetUiState({})
      );
      var uiState = Object.keys(nextState).reduce(function(acc, indexId) {
        return _objectSpread19(_objectSpread19({}, acc), {}, _defineProperty20({}, indexId, nextState[indexId]));
      }, previousUiState);
      var route = stateMapping.stateToRoute(uiState);
      return router.createURL(route);
    }
    instantSearchInstance._createURL = topLevelCreateURL;
    var lastRouteState = void 0;
    var initialUiState = instantSearchInstance._initialUiState;
    return {
      $$type: "ais.router({router:".concat(router.$$type || "__unknown__", ", stateMapping:").concat(stateMapping.$$type || "__unknown__", "})"),
      $$internal,
      onStateChange: function onStateChange(_ref22) {
        var uiState = _ref22.uiState;
        var routeState = stateMapping.stateToRoute(uiState);
        if (lastRouteState === void 0 || !isEqual(lastRouteState, routeState)) {
          router.write(routeState);
          lastRouteState = routeState;
        }
      },
      subscribe: function subscribe() {
        true ? _warning(Object.keys(initialUiState).length === 0, "Using `initialUiState` together with routing is not recommended. The `initialUiState` will be overwritten by the URL parameters.") : void 0;
        instantSearchInstance._initialUiState = _objectSpread19(_objectSpread19({}, initialUiState), stateMapping.routeToState(router.read()));
        router.onUpdate(function(route) {
          if (instantSearchInstance.mainIndex.getWidgets().length > 0) {
            instantSearchInstance.setUiState(stateMapping.routeToState(route));
          }
        });
      },
      started: function started() {
        var _router$start;
        (_router$start = router.start) === null || _router$start === void 0 ? void 0 : _router$start.call(router);
      },
      unsubscribe: function unsubscribe() {
        router.dispose();
      }
    };
  };
};

// node_modules/instantsearch.js/es/lib/formatNumber.js
function formatNumber(value, numberLocale) {
  return value.toLocaleString(numberLocale);
}

// node_modules/instantsearch.js/es/lib/createHelpers.js
function _typeof26(obj) {
  "@babel/helpers - typeof";
  return _typeof26 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof26(obj);
}
function ownKeys20(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread20(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys20(Object(source), true).forEach(function(key) {
      _defineProperty21(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys20(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty21(obj, key, value) {
  key = _toPropertyKey21(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey21(arg) {
  var key = _toPrimitive21(arg, "string");
  return _typeof26(key) === "symbol" ? key : String(key);
}
function _toPrimitive21(input, hint) {
  if (_typeof26(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof26(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function hoganHelpers(_ref) {
  var numberLocale = _ref.numberLocale;
  return {
    formatNumber: function formatNumber2(value, render) {
      return formatNumber(Number(render(value)), numberLocale);
    },
    highlight: function highlight2(options, render) {
      try {
        var highlightOptions = JSON.parse(options);
        return render(highlight(_objectSpread20(_objectSpread20({}, highlightOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error('\nThe highlight helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }');
      }
    },
    reverseHighlight: function reverseHighlight2(options, render) {
      try {
        var reverseHighlightOptions = JSON.parse(options);
        return render(reverseHighlight(_objectSpread20(_objectSpread20({}, reverseHighlightOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error('\n  The reverseHighlight helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }');
      }
    },
    snippet: function snippet2(options, render) {
      try {
        var snippetOptions = JSON.parse(options);
        return render(snippet(_objectSpread20(_objectSpread20({}, snippetOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error('\nThe snippet helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }');
      }
    },
    reverseSnippet: function reverseSnippet2(options, render) {
      try {
        var reverseSnippetOptions = JSON.parse(options);
        return render(reverseSnippet(_objectSpread20(_objectSpread20({}, reverseSnippetOptions), {}, {
          hit: this
        })));
      } catch (error) {
        throw new Error('\n  The reverseSnippet helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }');
      }
    },
    insights: function insights2(options, render) {
      try {
        var _JSON$parse = JSON.parse(options), method = _JSON$parse.method, payload = _JSON$parse.payload;
        return render(insights(method, _objectSpread20({
          objectIDs: [this.objectID]
        }, payload)));
      } catch (error) {
        throw new Error('\nThe insights helper expects a JSON object of the format:\n{ "method": "method-name", "payload": { "eventName": "name of the event" } }');
      }
    }
  };
}

// node_modules/instantsearch.js/es/lib/version.js
var version_default2 = "4.75.5";

// node_modules/instantsearch.js/es/lib/InstantSearch.js
function _typeof27(obj) {
  "@babel/helpers - typeof";
  return _typeof27 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof27(obj);
}
function ownKeys21(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread21(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys21(Object(source), true).forEach(function(key) {
      _defineProperty22(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys21(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey22(descriptor.key), descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof27(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _defineProperty22(obj, key, value) {
  key = _toPropertyKey22(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey22(arg) {
  var key = _toPrimitive22(arg, "string");
  return _typeof27(key) === "symbol" ? key : String(key);
}
function _toPrimitive22(input, hint) {
  if (_typeof27(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof27(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage4 = createDocumentationMessageGenerator({
  name: "instantsearch"
});
function defaultCreateURL() {
  return "#";
}
var INSTANTSEARCH_FUTURE_DEFAULTS = {
  preserveSharedStateOnUnmount: false,
  persistHierarchicalRootCount: false
};
var InstantSearch = function(_EventEmitter) {
  _inherits(InstantSearch3, _EventEmitter);
  var _super = _createSuper(InstantSearch3);
  function InstantSearch3(options) {
    var _options$future2;
    var _this;
    _classCallCheck2(this, InstantSearch3);
    _this = _super.call(this);
    _defineProperty22(_assertThisInitialized(_this), "client", void 0);
    _defineProperty22(_assertThisInitialized(_this), "indexName", void 0);
    _defineProperty22(_assertThisInitialized(_this), "insightsClient", void 0);
    _defineProperty22(_assertThisInitialized(_this), "onStateChange", null);
    _defineProperty22(_assertThisInitialized(_this), "future", void 0);
    _defineProperty22(_assertThisInitialized(_this), "helper", void 0);
    _defineProperty22(_assertThisInitialized(_this), "mainHelper", void 0);
    _defineProperty22(_assertThisInitialized(_this), "mainIndex", void 0);
    _defineProperty22(_assertThisInitialized(_this), "started", void 0);
    _defineProperty22(_assertThisInitialized(_this), "templatesConfig", void 0);
    _defineProperty22(_assertThisInitialized(_this), "renderState", {});
    _defineProperty22(_assertThisInitialized(_this), "_stalledSearchDelay", void 0);
    _defineProperty22(_assertThisInitialized(_this), "_searchStalledTimer", void 0);
    _defineProperty22(_assertThisInitialized(_this), "_initialUiState", void 0);
    _defineProperty22(_assertThisInitialized(_this), "_initialResults", void 0);
    _defineProperty22(_assertThisInitialized(_this), "_createURL", void 0);
    _defineProperty22(_assertThisInitialized(_this), "_searchFunction", void 0);
    _defineProperty22(_assertThisInitialized(_this), "_mainHelperSearch", void 0);
    _defineProperty22(_assertThisInitialized(_this), "_hasSearchWidget", false);
    _defineProperty22(_assertThisInitialized(_this), "_hasRecommendWidget", false);
    _defineProperty22(_assertThisInitialized(_this), "_insights", void 0);
    _defineProperty22(_assertThisInitialized(_this), "middleware", []);
    _defineProperty22(_assertThisInitialized(_this), "sendEventToInsights", void 0);
    _defineProperty22(_assertThisInitialized(_this), "status", "idle");
    _defineProperty22(_assertThisInitialized(_this), "error", void 0);
    _defineProperty22(_assertThisInitialized(_this), "scheduleSearch", defer(function() {
      if (_this.started) {
        _this.mainHelper.search();
      }
    }));
    _defineProperty22(_assertThisInitialized(_this), "scheduleRender", defer(function() {
      var _this$mainHelper;
      var shouldResetStatus = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      if (!((_this$mainHelper = _this.mainHelper) !== null && _this$mainHelper !== void 0 && _this$mainHelper.hasPendingRequests())) {
        clearTimeout(_this._searchStalledTimer);
        _this._searchStalledTimer = null;
        if (shouldResetStatus) {
          _this.status = "idle";
          _this.error = void 0;
        }
      }
      _this.mainIndex.render({
        instantSearchInstance: _assertThisInitialized(_this)
      });
      _this.emit("render");
    }));
    _defineProperty22(_assertThisInitialized(_this), "onInternalStateChange", defer(function() {
      var nextUiState = _this.mainIndex.getWidgetUiState({});
      _this.middleware.forEach(function(_ref) {
        var instance = _ref.instance;
        instance.onStateChange({
          uiState: nextUiState
        });
      });
    }));
    _this.setMaxListeners(100);
    var _options$indexName = options.indexName, indexName = _options$indexName === void 0 ? "" : _options$indexName, numberLocale = options.numberLocale, _options$initialUiSta = options.initialUiState, initialUiState = _options$initialUiSta === void 0 ? {} : _options$initialUiSta, _options$routing = options.routing, routing = _options$routing === void 0 ? null : _options$routing, _options$insights = options.insights, insights2 = _options$insights === void 0 ? void 0 : _options$insights, searchFunction = options.searchFunction, _options$stalledSearc = options.stalledSearchDelay, stalledSearchDelay = _options$stalledSearc === void 0 ? 200 : _options$stalledSearc, _options$searchClient = options.searchClient, searchClient = _options$searchClient === void 0 ? null : _options$searchClient, _options$insightsClie = options.insightsClient, insightsClient = _options$insightsClie === void 0 ? null : _options$insightsClie, _options$onStateChang = options.onStateChange, onStateChange = _options$onStateChang === void 0 ? null : _options$onStateChang, _options$future = options.future, future = _options$future === void 0 ? _objectSpread21(_objectSpread21({}, INSTANTSEARCH_FUTURE_DEFAULTS), options.future || {}) : _options$future;
    if (searchClient === null) {
      throw new Error(withUsage4("The `searchClient` option is required."));
    }
    if (typeof searchClient.search !== "function") {
      throw new Error("The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/");
    }
    if (typeof searchClient.addAlgoliaAgent === "function") {
      searchClient.addAlgoliaAgent("instantsearch.js (".concat(version_default2, ")"));
    }
    true ? _warning(insightsClient === null, "`insightsClient` property has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : void 0;
    if (insightsClient && typeof insightsClient !== "function") {
      throw new Error(withUsage4("The `insightsClient` option should be a function."));
    }
    true ? _warning(!options.searchParameters, "The `searchParameters` option is deprecated and will not be supported in InstantSearch.js 4.x.\n\nYou can replace it with the `configure` widget:\n\n```\nsearch.addWidgets([\n  configure(".concat(JSON.stringify(options.searchParameters, null, 2), ")\n]);\n```\n\nSee ").concat(createDocumentationLink({
      name: "configure"
    }))) : void 0;
    if (((_options$future2 = options.future) === null || _options$future2 === void 0 ? void 0 : _options$future2.preserveSharedStateOnUnmount) === void 0) {
      console.info("Starting from the next major version, InstantSearch will change how widgets state is preserved when they are removed. InstantSearch will keep the state of unmounted widgets to be usable by other widgets with the same attribute.\n\nWe recommend setting `future.preserveSharedStateOnUnmount` to true to adopt this change today.\nTo stay with the current behaviour and remove this warning, set the option to false.\n\nSee documentation: ".concat(createDocumentationLink({
        name: "instantsearch"
      }), "#widget-param-future\n          "));
    }
    _this.client = searchClient;
    _this.future = future;
    _this.insightsClient = insightsClient;
    _this.indexName = indexName;
    _this.helper = null;
    _this.mainHelper = null;
    _this.mainIndex = index_default({
      indexName
    });
    _this.onStateChange = onStateChange;
    _this.started = false;
    _this.templatesConfig = {
      helpers: hoganHelpers({
        numberLocale
      }),
      compileOptions: {}
    };
    _this._stalledSearchDelay = stalledSearchDelay;
    _this._searchStalledTimer = null;
    _this._createURL = defaultCreateURL;
    _this._initialUiState = initialUiState;
    _this._initialResults = null;
    _this._insights = insights2;
    if (searchFunction) {
      true ? _warning(false, "The `searchFunction` option is deprecated. Use `onStateChange` instead.") : void 0;
      _this._searchFunction = searchFunction;
    }
    _this.sendEventToInsights = noop;
    if (routing) {
      var routerOptions = typeof routing === "boolean" ? {} : routing;
      routerOptions.$$internal = true;
      _this.use(createRouterMiddleware(routerOptions));
    }
    if (insights2) {
      var insightsOptions = typeof insights2 === "boolean" ? {} : insights2;
      insightsOptions.$$internal = true;
      _this.use(createInsightsMiddleware(insightsOptions));
    }
    if (isMetadataEnabled()) {
      _this.use(createMetadataMiddleware({
        $$internal: true
      }));
    }
    return _this;
  }
  _createClass2(InstantSearch3, [{
    key: "_isSearchStalled",
    get: (
      /**
       * @deprecated use `status === 'stalled'` instead
       */
      function get() {
        true ? _warning(false, '`InstantSearch._isSearchStalled` is deprecated and will be removed in InstantSearch.js 5.0.\n\nUse `InstantSearch.status === "stalled"` instead.') : void 0;
        return this.status === "stalled";
      }
    )
  }, {
    key: "use",
    value: function use2() {
      var _this2 = this;
      for (var _len = arguments.length, middleware = new Array(_len), _key = 0; _key < _len; _key++) {
        middleware[_key] = arguments[_key];
      }
      var newMiddlewareList = middleware.map(function(fn) {
        var newMiddleware = _objectSpread21({
          $$type: "__unknown__",
          $$internal: false,
          subscribe: noop,
          started: noop,
          unsubscribe: noop,
          onStateChange: noop
        }, fn({
          instantSearchInstance: _this2
        }));
        _this2.middleware.push({
          creator: fn,
          instance: newMiddleware
        });
        return newMiddleware;
      });
      if (this.started) {
        newMiddlewareList.forEach(function(m) {
          m.subscribe();
          m.started();
        });
      }
      return this;
    }
    /**
     * Removes a middleware from the InstantSearch lifecycle.
     */
  }, {
    key: "unuse",
    value: function unuse() {
      for (var _len2 = arguments.length, middlewareToUnuse = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        middlewareToUnuse[_key2] = arguments[_key2];
      }
      this.middleware.filter(function(m) {
        return middlewareToUnuse.includes(m.creator);
      }).forEach(function(m) {
        return m.instance.unsubscribe();
      });
      this.middleware = this.middleware.filter(function(m) {
        return !middlewareToUnuse.includes(m.creator);
      });
      return this;
    }
    // @major we shipped with EXPERIMENTAL_use, but have changed that to just `use` now
  }, {
    key: "EXPERIMENTAL_use",
    value: function EXPERIMENTAL_use() {
      true ? _warning(false, "The middleware API is now considered stable, so we recommend replacing `EXPERIMENTAL_use` with `use` before upgrading to the next major version.") : void 0;
      return this.use.apply(this, arguments);
    }
    /**
     * Adds a widget to the search instance.
     * A widget can be added either before or after InstantSearch has started.
     * @param widget The widget to add to InstantSearch.
     *
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`.
     */
  }, {
    key: "addWidget",
    value: function addWidget(widget) {
      true ? _warning(false, "addWidget will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`") : void 0;
      return this.addWidgets([widget]);
    }
    /**
     * Adds multiple widgets to the search instance.
     * Widgets can be added either before or after InstantSearch has started.
     * @param widgets The array of widgets to add to InstantSearch.
     */
  }, {
    key: "addWidgets",
    value: function addWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage4("The `addWidgets` method expects an array of widgets. Please use `addWidget`."));
      }
      if (widgets.some(function(widget) {
        return typeof widget.init !== "function" && typeof widget.render !== "function";
      })) {
        throw new Error(withUsage4("The widget definition expects a `render` and/or an `init` method."));
      }
      this.mainIndex.addWidgets(widgets);
      return this;
    }
    /**
     * Removes a widget from the search instance.
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`
     * @param widget The widget instance to remove from InstantSearch.
     *
     * The widget must implement a `dispose()` method to clear its state.
     */
  }, {
    key: "removeWidget",
    value: function removeWidget(widget) {
      true ? _warning(false, "removeWidget will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`") : void 0;
      return this.removeWidgets([widget]);
    }
    /**
     * Removes multiple widgets from the search instance.
     * @param widgets Array of widgets instances to remove from InstantSearch.
     *
     * The widgets must implement a `dispose()` method to clear their states.
     */
  }, {
    key: "removeWidgets",
    value: function removeWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage4("The `removeWidgets` method expects an array of widgets. Please use `removeWidget`."));
      }
      if (widgets.some(function(widget) {
        return typeof widget.dispose !== "function";
      })) {
        throw new Error(withUsage4("The widget definition expects a `dispose` method."));
      }
      this.mainIndex.removeWidgets(widgets);
      return this;
    }
    /**
     * Ends the initialization of InstantSearch.js and triggers the
     * first search.
     */
  }, {
    key: "start",
    value: function start() {
      var _this3 = this;
      if (this.started) {
        throw new Error(withUsage4("The `start` method has already been called once."));
      }
      var mainHelper = this.mainHelper || (0, import_algoliasearch_helper4.default)(this.client, this.indexName, void 0, {
        persistHierarchicalRootCount: this.future.persistHierarchicalRootCount
      });
      mainHelper.search = function() {
        _this3.status = "loading";
        _this3.scheduleRender(false);
        true ? _warning(Boolean(_this3.indexName) || _this3.mainIndex.getWidgets().some(isIndexWidget), "No indexName provided, nor an explicit index widget in the widgets tree. This is required to be able to display results.") : void 0;
        if (_this3._hasSearchWidget) {
          mainHelper.searchOnlyWithDerivedHelpers();
        }
        if (_this3._hasRecommendWidget) {
          mainHelper.recommend();
        }
        return mainHelper;
      };
      if (this._searchFunction) {
        var fakeClient = {
          search: function search() {
            return new Promise(noop);
          }
        };
        this._mainHelperSearch = mainHelper.search.bind(mainHelper);
        mainHelper.search = function() {
          var mainIndexHelper = _this3.mainIndex.getHelper();
          var searchFunctionHelper = (0, import_algoliasearch_helper4.default)(fakeClient, mainIndexHelper.state.index, mainIndexHelper.state);
          searchFunctionHelper.once("search", function(_ref22) {
            var state = _ref22.state;
            mainIndexHelper.overrideStateWithoutTriggeringChangeEvent(state);
            _this3._mainHelperSearch();
          });
          searchFunctionHelper.on("change", function(_ref3) {
            var state = _ref3.state;
            mainIndexHelper.setState(state);
          });
          _this3._searchFunction(searchFunctionHelper);
          return mainHelper;
        };
      }
      mainHelper.on("error", function(_ref42) {
        var error = _ref42.error;
        if (!(error instanceof Error)) {
          var err = error;
          error = Object.keys(err).reduce(function(acc, key) {
            acc[key] = err[key];
            return acc;
          }, new Error(err.message));
        }
        error.error = error;
        _this3.error = error;
        _this3.status = "error";
        _this3.scheduleRender(false);
        _this3.emit("error", error);
      });
      this.mainHelper = mainHelper;
      this.middleware.forEach(function(_ref5) {
        var instance = _ref5.instance;
        instance.subscribe();
      });
      this.mainIndex.init({
        instantSearchInstance: this,
        parent: null,
        uiState: this._initialUiState
      });
      if (this._initialResults) {
        hydrateSearchClient(this.client, this._initialResults);
        hydrateRecommendCache(this.mainHelper, this._initialResults);
        var originalScheduleSearch = this.scheduleSearch;
        this.scheduleSearch = defer(noop);
        defer(function() {
          _this3.scheduleSearch = originalScheduleSearch;
        })();
      } else if (this.mainIndex.getWidgets().length > 0) {
        this.scheduleSearch();
      }
      this.helper = this.mainIndex.getHelper();
      this.started = true;
      this.middleware.forEach(function(_ref62) {
        var instance = _ref62.instance;
        instance.started();
      });
      if (typeof this._insights === "undefined") {
        mainHelper.derivedHelpers[0].once("result", function() {
          var hasAutomaticInsights = _this3.mainIndex.getScopedResults().some(function(_ref7) {
            var results = _ref7.results;
            return results === null || results === void 0 ? void 0 : results._automaticInsights;
          });
          if (hasAutomaticInsights) {
            _this3.use(createInsightsMiddleware({
              $$internal: true,
              $$automatic: true
            }));
          }
        });
      }
    }
    /**
     * Removes all widgets without triggering a search afterwards.
     * @return {undefined} This method does not return anything
     */
  }, {
    key: "dispose",
    value: function dispose() {
      var _this$mainHelper2;
      this.scheduleSearch.cancel();
      this.scheduleRender.cancel();
      clearTimeout(this._searchStalledTimer);
      this.removeWidgets(this.mainIndex.getWidgets());
      this.mainIndex.dispose();
      this.started = false;
      this.removeAllListeners();
      (_this$mainHelper2 = this.mainHelper) === null || _this$mainHelper2 === void 0 ? void 0 : _this$mainHelper2.removeAllListeners();
      this.mainHelper = null;
      this.helper = null;
      this.middleware.forEach(function(_ref8) {
        var instance = _ref8.instance;
        instance.unsubscribe();
      });
    }
  }, {
    key: "scheduleStalledRender",
    value: function scheduleStalledRender() {
      var _this4 = this;
      if (!this._searchStalledTimer) {
        this._searchStalledTimer = setTimeout(function() {
          _this4.status = "stalled";
          _this4.scheduleRender();
        }, this._stalledSearchDelay);
      }
    }
    /**
     * Set the UI state and trigger a search.
     * @param uiState The next UI state or a function computing it from the current state
     * @param callOnStateChange private parameter used to know if the method is called from a state change
     */
  }, {
    key: "setUiState",
    value: function setUiState(uiState) {
      var _this5 = this;
      var callOnStateChange = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (!this.mainHelper) {
        throw new Error(withUsage4("The `start` method needs to be called before `setUiState`."));
      }
      this.mainIndex.refreshUiState();
      var nextUiState = typeof uiState === "function" ? uiState(this.mainIndex.getWidgetUiState({})) : uiState;
      if (this.onStateChange && callOnStateChange) {
        this.onStateChange({
          uiState: nextUiState,
          setUiState: function setUiState2(finalUiState) {
            setIndexHelperState(typeof finalUiState === "function" ? finalUiState(nextUiState) : finalUiState, _this5.mainIndex);
            _this5.scheduleSearch();
            _this5.onInternalStateChange();
          }
        });
      } else {
        setIndexHelperState(nextUiState, this.mainIndex);
        this.scheduleSearch();
        this.onInternalStateChange();
      }
    }
  }, {
    key: "getUiState",
    value: function getUiState() {
      if (this.started) {
        this.mainIndex.refreshUiState();
      }
      return this.mainIndex.getWidgetUiState({});
    }
  }, {
    key: "createURL",
    value: function createURL() {
      var nextState = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (!this.started) {
        throw new Error(withUsage4("The `start` method needs to be called before `createURL`."));
      }
      return this._createURL(nextState);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      if (!this.mainHelper) {
        throw new Error(withUsage4("The `start` method needs to be called before `refresh`."));
      }
      this.mainHelper.clearCache().search();
    }
  }]);
  return InstantSearch3;
}(import_events.default);
var InstantSearch_default = InstantSearch;

// node_modules/react-instantsearch-core/dist/es/lib/useInstantSearchApi.js
var import_react19 = __toESM(require_react(), 1);
var import_shim = __toESM(require_shim(), 1);
function _typeof28(obj) {
  "@babel/helpers - typeof";
  return _typeof28 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof28(obj);
}
function ownKeys22(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread22(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys22(Object(source), true).forEach(function(key) {
      _defineProperty23(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys22(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty23(obj, key, value) {
  key = _toPropertyKey23(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey23(arg) {
  var key = _toPrimitive23(arg, "string");
  return _typeof28(key) === "symbol" ? key : String(key);
}
function _toPrimitive23(input, hint) {
  if (_typeof28(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof28(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var defaultUserAgents = ["react (".concat(import_react19.version, ")"), "react-instantsearch (".concat(version_default, ")"), "react-instantsearch-core (".concat(version_default, ")")];
var serverUserAgent = "react-instantsearch-server (".concat(version_default, ")");
var nextUserAgent = function nextUserAgent2(nextVersion) {
  return nextVersion ? "next.js (".concat(nextVersion, ")") : null;
};
function useInstantSearchApi(props) {
  var forceUpdate = useForceUpdate();
  var serverContext = useInstantSearchServerContext();
  var serverState = useInstantSearchSSRContext();
  var waitingForResultsRef = useRSCContext();
  var initialResults = serverState === null || serverState === void 0 ? void 0 : serverState.initialResults;
  var prevPropsRef = (0, import_react19.useRef)(props);
  var shouldRenderAtOnce = serverContext || initialResults || waitingForResultsRef;
  var searchRef = (0, import_react19.useRef)(null);
  if (serverState) {
    searchRef = serverState.ssrSearchRef;
  }
  if (searchRef.current === null) {
    var search = new InstantSearch_default(props);
    search._schedule = function _schedule(cb) {
      search._schedule.queue.push(cb);
      clearTimeout(search._schedule.timer);
      search._schedule.timer = setTimeout(function() {
        search._schedule.queue.forEach(function(callback) {
          callback();
        });
        search._schedule.queue = [];
      }, 0);
    };
    search._schedule.queue = [];
    if (shouldRenderAtOnce) {
      search._initialResults = initialResults || {};
    }
    addAlgoliaAgents(props.searchClient, [].concat(defaultUserAgents, [serverContext && serverUserAgent, nextUserAgent(getNextVersion())]));
    if (shouldRenderAtOnce) {
      search.start();
    }
    if (serverContext) {
      serverContext.notifyServer({
        search
      });
    }
    warnNextRouter(props.routing);
    warnNextAppDir(Boolean(waitingForResultsRef));
    searchRef.current = search;
  }
  {
    var _search = searchRef.current;
    var prevProps = prevPropsRef.current;
    if (prevProps.indexName !== props.indexName) {
      _search.helper.setIndex(props.indexName || "").search();
      prevPropsRef.current = props;
    }
    if (prevProps.searchClient !== props.searchClient) {
      true ? warn2(false, "The `searchClient` prop of `<InstantSearch>` changed between renders, which may cause more search requests than necessary. If this is an unwanted behavior, please provide a stable reference: https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/#widget-param-searchclient") : void 0;
      addAlgoliaAgents(props.searchClient, [].concat(defaultUserAgents, [serverContext && serverUserAgent]));
      _search.mainHelper.setClient(props.searchClient).search();
      prevPropsRef.current = props;
    }
    if (prevProps.onStateChange !== props.onStateChange) {
      _search.onStateChange = props.onStateChange;
      prevPropsRef.current = props;
    }
    if (prevProps.searchFunction !== props.searchFunction) {
      _search._searchFunction = props.searchFunction;
      prevPropsRef.current = props;
    }
    if (prevProps.stalledSearchDelay !== props.stalledSearchDelay) {
      var _props$stalledSearchD;
      _search._stalledSearchDelay = (_props$stalledSearchD = props.stalledSearchDelay) !== null && _props$stalledSearchD !== void 0 ? _props$stalledSearchD : 200;
      prevPropsRef.current = props;
    }
    if (!dequal(prevProps.future, props.future)) {
      _search.future = _objectSpread22(_objectSpread22({}, INSTANTSEARCH_FUTURE_DEFAULTS), props.future);
      prevPropsRef.current = props;
    }
  }
  var cleanupTimerRef = (0, import_react19.useRef)(null);
  var store = (0, import_shim.useSyncExternalStore)((0, import_react19.useCallback)(function() {
    var search2 = searchRef.current;
    if (cleanupTimerRef.current === null) {
      if (!search2.started) {
        search2.start();
        forceUpdate();
      }
    } else {
      clearTimeout(cleanupTimerRef.current);
      search2._preventWidgetCleanup = false;
    }
    return function() {
      function cleanup() {
        search2.dispose();
      }
      clearTimeout(search2._schedule.timer);
      cleanupTimerRef.current = setTimeout(cleanup);
      search2._preventWidgetCleanup = true;
    };
  }, [forceUpdate]), function() {
    return searchRef.current;
  }, function() {
    return searchRef.current;
  });
  return store;
}
function addAlgoliaAgents(searchClient, userAgents) {
  if (typeof searchClient.addAlgoliaAgent !== "function") {
    return;
  }
  userAgents.filter(Boolean).forEach(function(userAgent) {
    searchClient.addAlgoliaAgent(userAgent);
  });
}
function warnNextRouter(routing) {
  if (true) {
    var _routing$router;
    if (!routing || typeof window === "undefined" || !("__NEXT_DATA__" in window)) {
      return;
    }
    var isUsingNextRouter = (
      // @ts-expect-error: _isNextRouter is only set on the Next.js router
      routing !== true && (routing === null || routing === void 0 ? void 0 : (_routing$router = routing.router) === null || _routing$router === void 0 ? void 0 : _routing$router._isNextRouter)
    );
    true ? warn2(isUsingNextRouter, `
You are using Next.js with InstantSearch without the "react-instantsearch-router-nextjs" package.
This package is recommended to make the routing work correctly with Next.js.
Please check its usage instructions: https://github.com/algolia/instantsearch/tree/master/packages/react-instantsearch-router-nextjs

You can ignore this warning if you are using a custom router that suits your needs, it won't be outputted in production builds.`) : void 0;
  }
}
function warnNextAppDir(isRscContextDefined) {
  var _next;
  if (typeof window === "undefined" || isRscContextDefined) {
    return;
  }
  true ? warn2(Boolean((_next = window.next) === null || _next === void 0 ? void 0 : _next.appDir) === false, `
We've detected you are using Next.js with the App Router.
We released an **experimental** package called "react-instantsearch-nextjs" that makes SSR work with the App Router.
Please check its usage instructions: https://www.algolia.com/doc/guides/building-search-ui/going-further/server-side-rendering/react/#with-nextjs

This warning will not be outputted in production builds.`) : void 0;
}
function getNextVersion() {
  var _next2, _process$env;
  return typeof window !== "undefined" && ((_next2 = window.next) === null || _next2 === void 0 ? void 0 : _next2.version) || (typeof process !== "undefined" ? (_process$env = process.env) === null || _process$env === void 0 ? void 0 : _process$env.NEXT_RUNTIME : void 0);
}

// node_modules/react-instantsearch-core/dist/es/components/InstantSearch.js
var _excluded7 = ["children"];
function _objectWithoutProperties7(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose7(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose7(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function InstantSearch2(_ref) {
  var children = _ref.children, props = _objectWithoutProperties7(_ref, _excluded7);
  var search = useInstantSearchApi(props);
  if (!search.started) {
    return null;
  }
  return import_react20.default.createElement(InstantSearchContext.Provider, {
    value: search
  }, import_react20.default.createElement(IndexContext.Provider, {
    value: search.mainIndex
  }, children));
}

// node_modules/react-instantsearch-core/dist/es/components/InstantSearchSSRProvider.js
var import_react21 = __toESM(require_react(), 1);
function _typeof29(obj) {
  "@babel/helpers - typeof";
  return _typeof29 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof29(obj);
}
var _excluded8 = ["children"];
function ownKeys23(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread23(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys23(Object(source), true).forEach(function(key) {
      _defineProperty24(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys23(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty24(obj, key, value) {
  key = _toPropertyKey24(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey24(arg) {
  var key = _toPrimitive24(arg, "string");
  return _typeof29(key) === "symbol" ? key : String(key);
}
function _toPrimitive24(input, hint) {
  if (_typeof29(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof29(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties8(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose8(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose8(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function InstantSearchSSRProvider(_ref) {
  var children = _ref.children, props = _objectWithoutProperties8(_ref, _excluded8);
  var ssrSearchRef = import_react21.default.useRef(null);
  var recommendIdx = import_react21.default.useRef(0);
  if (Object.keys(props).length === 0) {
    return import_react21.default.createElement(import_react21.default.Fragment, null, children);
  }
  return import_react21.default.createElement(InstantSearchSSRContext.Provider, {
    value: _objectSpread23(_objectSpread23({}, props), {}, {
      ssrSearchRef,
      recommendIdx
    })
  }, children);
}

// node_modules/instantsearch.js/es/connectors/breadcrumb/connectBreadcrumb.js
function _typeof30(obj) {
  "@babel/helpers - typeof";
  return _typeof30 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof30(obj);
}
function ownKeys24(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread24(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys24(Object(source), true).forEach(function(key) {
      _defineProperty25(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys24(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty25(obj, key, value) {
  key = _toPropertyKey25(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey25(arg) {
  var key = _toPrimitive25(arg, "string");
  return _typeof30(key) === "symbol" ? key : String(key);
}
function _toPrimitive25(input, hint) {
  if (_typeof30(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof30(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray10(arr, i) {
  return _arrayWithHoles10(arr) || _iterableToArrayLimit10(arr, i) || _unsupportedIterableToArray12(arr, i) || _nonIterableRest10();
}
function _nonIterableRest10() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray12(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray12(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray12(o, minLen);
}
function _arrayLikeToArray12(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit10(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles10(arr) {
  if (Array.isArray(arr)) return arr;
}
var withUsage5 = createDocumentationMessageGenerator({
  name: "breadcrumb",
  connector: true
});
var connectBreadcrumb = function connectBreadcrumb2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage5());
  var connectorState = {};
  return function(widgetParams) {
    var _ref = widgetParams || {}, attributes = _ref.attributes, _ref$separator = _ref.separator, separator = _ref$separator === void 0 ? " > " : _ref$separator, _ref$rootPath = _ref.rootPath, rootPath = _ref$rootPath === void 0 ? null : _ref$rootPath, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
      throw new Error(withUsage5("The `attributes` option expects an array of strings."));
    }
    var _attributes = _slicedToArray10(attributes, 1), hierarchicalFacetName = _attributes[0];
    function getRefinedState2(state, facetValue) {
      if (!facetValue) {
        var breadcrumb = state.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);
        if (breadcrumb.length === 0) {
          return state;
        } else {
          return state.resetPage().toggleFacetRefinement(hierarchicalFacetName, breadcrumb[0]);
        }
      }
      return state.resetPage().toggleFacetRefinement(hierarchicalFacetName, facetValue);
    }
    return {
      $$type: "ais.breadcrumb",
      init: function init(initOptions) {
        renderFn(_objectSpread24(_objectSpread24({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread24(_objectSpread24({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread24(_objectSpread24({}, renderState), {}, {
          breadcrumb: _objectSpread24(_objectSpread24({}, renderState.breadcrumb), {}, _defineProperty25({}, hierarchicalFacetName, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref22) {
        var _this = this;
        var helper = _ref22.helper, createURL = _ref22.createURL, results = _ref22.results, state = _ref22.state;
        function getItems() {
          if (!results || state.hierarchicalFacets.length === 0) {
            return [];
          }
          var _state$hierarchicalFa = _slicedToArray10(state.hierarchicalFacets, 1), facetName = _state$hierarchicalFa[0].name;
          var facetValues = results.getFacetValues(facetName, {});
          var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
          var items2 = transformItems(shiftItemsValues(prepareItems(facetItems)), {
            results
          });
          return items2;
        }
        var items = getItems();
        if (!connectorState.createURL) {
          connectorState.createURL = function(facetValue) {
            return createURL(function(uiState) {
              return _this.getWidgetUiState(uiState, {
                searchParameters: getRefinedState2(helper.state, facetValue),
                helper
              });
            });
          };
        }
        if (!connectorState.refine) {
          connectorState.refine = function(facetValue) {
            helper.setState(getRefinedState2(helper.state, facetValue)).search();
          };
        }
        return {
          canRefine: items.length > 0,
          createURL: connectorState.createURL,
          items,
          refine: connectorState.refine,
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref3) {
        var searchParameters = _ref3.searchParameters;
        var path = searchParameters.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);
        return removeEmptyRefinementsFromUiState(_objectSpread24(_objectSpread24({}, uiState), {}, {
          hierarchicalMenu: _objectSpread24(_objectSpread24({}, uiState.hierarchicalMenu), {}, _defineProperty25({}, hierarchicalFacetName, path))
        }), hierarchicalFacetName);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref42) {
        var uiState = _ref42.uiState;
        var values = uiState.hierarchicalMenu && uiState.hierarchicalMenu[hierarchicalFacetName];
        if (searchParameters.isConjunctiveFacet(hierarchicalFacetName) || searchParameters.isDisjunctiveFacet(hierarchicalFacetName)) {
          true ? _warning(false, 'HierarchicalMenu: Attribute "'.concat(hierarchicalFacetName, '" is already used by another widget applying conjunctive or disjunctive faceting.\nAs this is not supported, please make sure to remove this other widget or this HierarchicalMenu widget will not work at all.')) : void 0;
          return searchParameters;
        }
        if (searchParameters.isHierarchicalFacet(hierarchicalFacetName)) {
          var facet = searchParameters.getHierarchicalFacetByName(hierarchicalFacetName);
          true ? _warning(isEqual(facet.attributes, attributes) && facet.separator === separator && facet.rootPath === rootPath, "Using Breadcrumb and HierarchicalMenu on the same facet with different options overrides the configuration of the HierarchicalMenu.") : void 0;
        }
        var withFacetConfiguration = searchParameters.removeHierarchicalFacet(hierarchicalFacetName).addHierarchicalFacet({
          name: hierarchicalFacetName,
          attributes,
          separator,
          rootPath
        });
        if (!values) {
          return withFacetConfiguration.setQueryParameters({
            hierarchicalFacetsRefinements: _objectSpread24(_objectSpread24({}, withFacetConfiguration.hierarchicalFacetsRefinements), {}, _defineProperty25({}, hierarchicalFacetName, []))
          });
        }
        return withFacetConfiguration.addHierarchicalFacetRefinement(hierarchicalFacetName, values.join(separator));
      }
    };
  };
};
function prepareItems(data) {
  return data.reduce(function(result, currentItem) {
    if (currentItem.isRefined) {
      result.push({
        label: currentItem.name,
        value: currentItem.escapedValue
      });
      if (Array.isArray(currentItem.data)) {
        result = result.concat(prepareItems(currentItem.data));
      }
    }
    return result;
  }, []);
}
function shiftItemsValues(array) {
  return array.map(function(x, idx) {
    return {
      label: x.label,
      value: idx + 1 === array.length ? null : array[idx + 1].value
    };
  });
}
function removeEmptyRefinementsFromUiState(indexUiState, attribute) {
  if (!indexUiState.hierarchicalMenu) {
    return indexUiState;
  }
  if (!indexUiState.hierarchicalMenu[attribute] || !indexUiState.hierarchicalMenu[attribute].length) {
    delete indexUiState.hierarchicalMenu[attribute];
  }
  if (Object.keys(indexUiState.hierarchicalMenu).length === 0) {
    delete indexUiState.hierarchicalMenu;
  }
  return indexUiState;
}
var connectBreadcrumb_default = connectBreadcrumb;

// node_modules/react-instantsearch-core/dist/es/connectors/useBreadcrumb.js
function useBreadcrumb(props, additionalWidgetProperties) {
  return useConnector(connectBreadcrumb_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/clear-refinements/connectClearRefinements.js
function _typeof31(obj) {
  "@babel/helpers - typeof";
  return _typeof31 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof31(obj);
}
function _toConsumableArray5(arr) {
  return _arrayWithoutHoles5(arr) || _iterableToArray5(arr) || _unsupportedIterableToArray13(arr) || _nonIterableSpread5();
}
function _nonIterableSpread5() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray13(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray13(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray13(o, minLen);
}
function _iterableToArray5(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles5(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray13(arr);
}
function _arrayLikeToArray13(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function ownKeys25(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread25(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys25(Object(source), true).forEach(function(key) {
      _defineProperty26(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys25(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty26(obj, key, value) {
  key = _toPropertyKey26(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey26(arg) {
  var key = _toPrimitive26(arg, "string");
  return _typeof31(key) === "symbol" ? key : String(key);
}
function _toPrimitive26(input, hint) {
  if (_typeof31(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof31(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage6 = createDocumentationMessageGenerator({
  name: "clear-refinements",
  connector: true
});
var connectClearRefinements = function connectClearRefinements2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage6());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$includedAttribut = _ref.includedAttributes, includedAttributes = _ref$includedAttribut === void 0 ? [] : _ref$includedAttribut, _ref$excludedAttribut = _ref.excludedAttributes, excludedAttributes = _ref$excludedAttribut === void 0 ? ["query"] : _ref$excludedAttribut, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (widgetParams && widgetParams.includedAttributes && widgetParams.excludedAttributes) {
      throw new Error(withUsage6("The options `includedAttributes` and `excludedAttributes` cannot be used together."));
    }
    var connectorState = {
      refine: noop,
      createURL: function createURL() {
        return "";
      },
      attributesToClear: []
    };
    var cachedRefine = function cachedRefine2() {
      return connectorState.refine();
    };
    var cachedCreateURL = function cachedCreateURL2() {
      return connectorState.createURL();
    };
    return {
      $$type: "ais.clearRefinements",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread25(_objectSpread25({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread25(_objectSpread25({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread25(_objectSpread25({}, renderState), {}, {
          clearRefinements: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref22) {
        var createURL = _ref22.createURL, scopedResults = _ref22.scopedResults, results = _ref22.results;
        connectorState.attributesToClear = scopedResults.reduce(function(attributesToClear, scopedResult) {
          return attributesToClear.concat(getAttributesToClear({
            scopedResult,
            includedAttributes,
            excludedAttributes,
            transformItems,
            results
          }));
        }, []);
        connectorState.refine = function() {
          connectorState.attributesToClear.forEach(function(_ref3) {
            var indexHelper = _ref3.helper, items = _ref3.items;
            indexHelper.setState(clearRefinements({
              helper: indexHelper,
              attributesToClear: items
            })).search();
          });
        };
        connectorState.createURL = function() {
          return createURL(mergeSearchParameters.apply(void 0, _toConsumableArray5(connectorState.attributesToClear.map(function(_ref42) {
            var indexHelper = _ref42.helper, items = _ref42.items;
            return clearRefinements({
              helper: indexHelper,
              attributesToClear: items
            });
          }))));
        };
        var canRefine = connectorState.attributesToClear.some(function(attributeToClear) {
          return attributeToClear.items.length > 0;
        });
        return {
          canRefine,
          hasRefinements: canRefine,
          refine: cachedRefine,
          createURL: cachedCreateURL,
          widgetParams
        };
      }
    };
  };
};
function getAttributesToClear(_ref5) {
  var scopedResult = _ref5.scopedResult, includedAttributes = _ref5.includedAttributes, excludedAttributes = _ref5.excludedAttributes, transformItems = _ref5.transformItems, results = _ref5.results;
  var includesQuery = includedAttributes.indexOf("query") !== -1 || excludedAttributes.indexOf("query") === -1;
  return {
    helper: scopedResult.helper,
    items: transformItems(uniq(getRefinements(scopedResult.results, scopedResult.helper.state, includesQuery).map(function(refinement) {
      return refinement.attribute;
    }).filter(function(attribute) {
      return (
        // If the array is empty (default case), we keep all the attributes
        includedAttributes.length === 0 || // Otherwise, only add the specified attributes
        includedAttributes.indexOf(attribute) !== -1
      );
    }).filter(function(attribute) {
      return (
        // If the query is included, we ignore the default `excludedAttributes = ['query']`
        attribute === "query" && includesQuery || // Otherwise, ignore the excluded attributes
        excludedAttributes.indexOf(attribute) === -1
      );
    })), {
      results
    })
  };
}
var connectClearRefinements_default = connectClearRefinements;

// node_modules/react-instantsearch-core/dist/es/connectors/useClearRefinements.js
function useClearRefinements(props, additionalWidgetProperties) {
  return useConnector(connectClearRefinements_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements.js
function _typeof32(obj) {
  "@babel/helpers - typeof";
  return _typeof32 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof32(obj);
}
function _toConsumableArray6(arr) {
  return _arrayWithoutHoles6(arr) || _iterableToArray6(arr) || _unsupportedIterableToArray14(arr) || _nonIterableSpread6();
}
function _nonIterableSpread6() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray14(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray14(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray14(o, minLen);
}
function _iterableToArray6(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles6(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray14(arr);
}
function _arrayLikeToArray14(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function ownKeys26(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread26(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys26(Object(source), true).forEach(function(key) {
      _defineProperty27(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys26(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty27(obj, key, value) {
  key = _toPropertyKey27(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey27(arg) {
  var key = _toPrimitive27(arg, "string");
  return _typeof32(key) === "symbol" ? key : String(key);
}
function _toPrimitive27(input, hint) {
  if (_typeof32(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof32(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage7 = createDocumentationMessageGenerator({
  name: "current-refinements",
  connector: true
});
var connectCurrentRefinements = function connectCurrentRefinements2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage7());
  return function(widgetParams) {
    if ((widgetParams || {}).includedAttributes && (widgetParams || {}).excludedAttributes) {
      throw new Error(withUsage7("The options `includedAttributes` and `excludedAttributes` cannot be used together."));
    }
    var _ref = widgetParams || {}, includedAttributes = _ref.includedAttributes, _ref$excludedAttribut = _ref.excludedAttributes, excludedAttributes = _ref$excludedAttribut === void 0 ? ["query"] : _ref$excludedAttribut, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    return {
      $$type: "ais.currentRefinements",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread26(_objectSpread26({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread26(_objectSpread26({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread26(_objectSpread26({}, renderState), {}, {
          currentRefinements: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref22) {
        var results = _ref22.results, scopedResults = _ref22.scopedResults, _createURL = _ref22.createURL, helper = _ref22.helper;
        function getItems() {
          if (!results) {
            return transformItems(getRefinementsItems({
              results: {},
              helper,
              indexId: helper.state.index,
              includedAttributes,
              excludedAttributes
            }), {
              results
            });
          }
          return scopedResults.reduce(function(accResults, scopedResult) {
            return accResults.concat(transformItems(getRefinementsItems({
              results: scopedResult.results,
              helper: scopedResult.helper,
              indexId: scopedResult.indexId,
              includedAttributes,
              excludedAttributes
            }), {
              results
            }));
          }, []);
        }
        var items = getItems();
        return {
          items,
          canRefine: items.length > 0,
          refine: function refine(refinement) {
            return clearRefinement(helper, refinement);
          },
          createURL: function createURL(refinement) {
            return _createURL(clearRefinementFromState(helper.state, refinement));
          },
          widgetParams
        };
      }
    };
  };
};
function getRefinementsItems(_ref3) {
  var results = _ref3.results, helper = _ref3.helper, indexId = _ref3.indexId, includedAttributes = _ref3.includedAttributes, excludedAttributes = _ref3.excludedAttributes;
  var includesQuery = (includedAttributes || []).indexOf("query") !== -1 || (excludedAttributes || []).indexOf("query") === -1;
  var filterFunction = includedAttributes ? function(item) {
    return includedAttributes.indexOf(item.attribute) !== -1;
  } : function(item) {
    return excludedAttributes.indexOf(item.attribute) === -1;
  };
  var items = getRefinements(results, helper.state, includesQuery).map(normalizeRefinement).filter(filterFunction);
  return items.reduce(function(allItems, currentItem) {
    return [].concat(_toConsumableArray6(allItems.filter(function(item) {
      return item.attribute !== currentItem.attribute;
    })), [{
      indexName: helper.state.index,
      indexId,
      attribute: currentItem.attribute,
      label: currentItem.attribute,
      refinements: items.filter(function(result) {
        return result.attribute === currentItem.attribute;
      }).sort(function(a, b) {
        return a.type === "numeric" ? a.value - b.value : 0;
      }),
      refine: function refine(refinement) {
        return clearRefinement(helper, refinement);
      }
    }]);
  }, []);
}
function clearRefinementFromState(state, refinement) {
  state = state.resetPage();
  switch (refinement.type) {
    case "facet":
      return state.removeFacetRefinement(refinement.attribute, String(refinement.value));
    case "disjunctive":
      return state.removeDisjunctiveFacetRefinement(refinement.attribute, String(refinement.value));
    case "hierarchical":
      return state.removeHierarchicalFacetRefinement(refinement.attribute);
    case "exclude":
      return state.removeExcludeRefinement(refinement.attribute, String(refinement.value));
    case "numeric":
      return state.removeNumericRefinement(refinement.attribute, refinement.operator, String(refinement.value));
    case "tag":
      return state.removeTagRefinement(String(refinement.value));
    case "query":
      return state.setQueryParameter("query", "");
    default:
      true ? _warning(false, 'The refinement type "'.concat(refinement.type, '" does not exist and cannot be cleared from the current refinements.')) : void 0;
      return state;
  }
}
function clearRefinement(helper, refinement) {
  helper.setState(clearRefinementFromState(helper.state, refinement)).search();
}
function getOperatorSymbol(operator) {
  switch (operator) {
    case ">=":
      return "≥";
    case "<=":
      return "≤";
    default:
      return operator;
  }
}
function normalizeRefinement(refinement) {
  var value = getValue(refinement);
  var label = refinement.operator ? "".concat(getOperatorSymbol(refinement.operator), " ").concat(refinement.name) : refinement.name;
  var normalizedRefinement = {
    attribute: refinement.attribute,
    type: refinement.type,
    value,
    label
  };
  if (refinement.operator !== void 0) {
    normalizedRefinement.operator = refinement.operator;
  }
  if (refinement.count !== void 0) {
    normalizedRefinement.count = refinement.count;
  }
  if (refinement.exhaustive !== void 0) {
    normalizedRefinement.exhaustive = refinement.exhaustive;
  }
  return normalizedRefinement;
}
function getValue(refinement) {
  if (refinement.type === "numeric") {
    return Number(refinement.name);
  }
  if ("escapedValue" in refinement) {
    return refinement.escapedValue;
  }
  return refinement.name;
}
var connectCurrentRefinements_default = connectCurrentRefinements;

// node_modules/react-instantsearch-core/dist/es/connectors/useCurrentRefinements.js
function useCurrentRefinements(props, additionalWidgetProperties) {
  return useConnector(connectCurrentRefinements_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/frequently-bought-together/connectFrequentlyBoughtTogether.js
function _typeof33(obj) {
  "@babel/helpers - typeof";
  return _typeof33 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof33(obj);
}
function ownKeys27(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread27(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys27(Object(source), true).forEach(function(key) {
      _defineProperty28(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys27(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty28(obj, key, value) {
  key = _toPropertyKey28(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey28(arg) {
  var key = _toPrimitive28(arg, "string");
  return _typeof33(key) === "symbol" ? key : String(key);
}
function _toPrimitive28(input, hint) {
  if (_typeof33(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof33(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage8 = createDocumentationMessageGenerator({
  name: "frequently-bought-together",
  connector: true
});
var connectFrequentlyBoughtTogether_default = function connectFrequentlyBoughtTogether(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage8());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$escapeHTML = _ref.escapeHTML, escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems, objectIDs = _ref.objectIDs, limit = _ref.limit, threshold = _ref.threshold, queryParameters = _ref.queryParameters;
    if (!objectIDs || objectIDs.length === 0) {
      throw new Error(withUsage8("The `objectIDs` option is required."));
    }
    return {
      dependsOn: "recommend",
      $$type: "ais.frequentlyBoughtTogether",
      init: function init(initOptions) {
        renderFn(_objectSpread27(_objectSpread27({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var renderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread27(_objectSpread27({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState) {
        return renderState;
      },
      getWidgetRenderState: function getWidgetRenderState(_ref22) {
        var results = _ref22.results;
        if (results === null || results === void 0) {
          return {
            items: [],
            widgetParams
          };
        }
        if (escapeHTML && results.hits.length > 0) {
          results.hits = escapeHits(results.hits);
        }
        var transformedItems = transformItems(results.hits, {
          results
        });
        return {
          items: transformedItems,
          widgetParams
        };
      },
      dispose: function dispose(_ref3) {
        var recommendState = _ref3.recommendState;
        unmountFn();
        return recommendState.removeParams(this.$$id);
      },
      getWidgetParameters: function getWidgetParameters(state) {
        var _this = this;
        return objectIDs.reduce(function(acc, objectID) {
          return acc.addFrequentlyBoughtTogether({
            objectID,
            threshold,
            maxRecommendations: limit,
            queryParameters: _objectSpread27(_objectSpread27({}, queryParameters), escapeHTML ? TAG_PLACEHOLDER : {}),
            $$id: _this.$$id
          });
        }, state.removeParams(this.$$id));
      }
    };
  };
};

// node_modules/react-instantsearch-core/dist/es/connectors/useFrequentlyBoughtTogether.js
function useFrequentlyBoughtTogether(props, additionalWidgetProperties) {
  return useConnector(connectFrequentlyBoughtTogether_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/geo-search/connectGeoSearch.js
function _typeof34(obj) {
  "@babel/helpers - typeof";
  return _typeof34 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof34(obj);
}
function ownKeys28(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread28(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys28(Object(source), true).forEach(function(key) {
      _defineProperty29(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys28(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty29(obj, key, value) {
  key = _toPropertyKey29(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey29(arg) {
  var key = _toPrimitive29(arg, "string");
  return _typeof34(key) === "symbol" ? key : String(key);
}
function _toPrimitive29(input, hint) {
  if (_typeof34(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof34(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage9 = createDocumentationMessageGenerator({
  name: "geo-search",
  connector: true
});
function getBoundingBoxAsString(state) {
  return state.insideBoundingBox || "";
}
function setBoundingBoxAsString(state, value) {
  return state.setQueryParameter("insideBoundingBox", value);
}
var $$type = "ais.geoSearch";
var connectGeoSearch_default = function connectGeoSearch(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage9());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$enableRefineOnMa = _ref.enableRefineOnMapMove, enableRefineOnMapMove = _ref$enableRefineOnMa === void 0 ? true : _ref$enableRefineOnMa, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    var widgetState = {
      isRefineOnMapMove: enableRefineOnMapMove,
      // @MAJOR hasMapMoveSinceLastRefine -> hasMapMovedSinceLastRefine
      hasMapMoveSinceLastRefine: false,
      lastRefinePosition: "",
      lastRefineBoundingBox: "",
      internalToggleRefineOnMapMove: noop,
      internalSetMapMoveSinceLastRefine: noop
    };
    var getPositionFromState = function getPositionFromState2(state) {
      return state.aroundLatLng ? aroundLatLngToPosition(state.aroundLatLng) : void 0;
    };
    var getCurrentRefinementFromState = function getCurrentRefinementFromState2(state) {
      return state.insideBoundingBox && insideBoundingBoxToBoundingBox(state.insideBoundingBox);
    };
    var refine = function refine2(helper) {
      return function(_ref22) {
        var ne = _ref22.northEast, sw = _ref22.southWest;
        var boundingBox = [ne.lat, ne.lng, sw.lat, sw.lng].join();
        helper.setState(setBoundingBoxAsString(helper.state, boundingBox).resetPage()).search();
        widgetState.hasMapMoveSinceLastRefine = false;
        widgetState.lastRefineBoundingBox = boundingBox;
      };
    };
    var clearMapRefinement = function clearMapRefinement2(helper) {
      return function() {
        helper.setQueryParameter("insideBoundingBox", void 0).search();
      };
    };
    var isRefinedWithMap = function isRefinedWithMap2(state) {
      return function() {
        return Boolean(state.insideBoundingBox);
      };
    };
    var toggleRefineOnMapMove = function toggleRefineOnMapMove2() {
      return widgetState.internalToggleRefineOnMapMove();
    };
    var createInternalToggleRefinementOnMapMove = function createInternalToggleRefinementOnMapMove2(renderOptions, render) {
      return function() {
        widgetState.isRefineOnMapMove = !widgetState.isRefineOnMapMove;
        render(renderOptions);
      };
    };
    var isRefineOnMapMove = function isRefineOnMapMove2() {
      return widgetState.isRefineOnMapMove;
    };
    var setMapMoveSinceLastRefine = function setMapMoveSinceLastRefine2() {
      return widgetState.internalSetMapMoveSinceLastRefine();
    };
    var createInternalSetMapMoveSinceLastRefine = function createInternalSetMapMoveSinceLastRefine2(renderOptions, render) {
      return function() {
        var shouldTriggerRender = widgetState.hasMapMoveSinceLastRefine !== true;
        widgetState.hasMapMoveSinceLastRefine = true;
        if (shouldTriggerRender) {
          render(renderOptions);
        }
      };
    };
    var hasMapMoveSinceLastRefine = function hasMapMoveSinceLastRefine2() {
      return widgetState.hasMapMoveSinceLastRefine;
    };
    var sendEvent;
    return {
      $$type,
      init: function init(initArgs) {
        var instantSearchInstance = initArgs.instantSearchInstance;
        var isFirstRendering = true;
        widgetState.internalToggleRefineOnMapMove = createInternalToggleRefinementOnMapMove(initArgs, noop);
        widgetState.internalSetMapMoveSinceLastRefine = createInternalSetMapMoveSinceLastRefine(initArgs, noop);
        renderFn(_objectSpread28(_objectSpread28({}, this.getWidgetRenderState(initArgs)), {}, {
          instantSearchInstance
        }), isFirstRendering);
      },
      render: function render(renderArgs) {
        var helper = renderArgs.helper, instantSearchInstance = renderArgs.instantSearchInstance;
        var isFirstRendering = false;
        var state = helper.state;
        var positionChangedSinceLastRefine = Boolean(state.aroundLatLng) && Boolean(widgetState.lastRefinePosition) && state.aroundLatLng !== widgetState.lastRefinePosition;
        var boundingBoxChangedSinceLastRefine = !state.insideBoundingBox && Boolean(widgetState.lastRefineBoundingBox) && state.insideBoundingBox !== widgetState.lastRefineBoundingBox;
        if (positionChangedSinceLastRefine || boundingBoxChangedSinceLastRefine) {
          widgetState.hasMapMoveSinceLastRefine = false;
        }
        widgetState.lastRefinePosition = state.aroundLatLng || "";
        widgetState.lastRefineBoundingBox = getBoundingBoxAsString(state);
        widgetState.internalToggleRefineOnMapMove = createInternalToggleRefinementOnMapMove(renderArgs, this.render.bind(this));
        widgetState.internalSetMapMoveSinceLastRefine = createInternalSetMapMoveSinceLastRefine(renderArgs, this.render.bind(this));
        var widgetRenderState = this.getWidgetRenderState(renderArgs);
        sendEvent("view:internal", widgetRenderState.items);
        renderFn(_objectSpread28(_objectSpread28({}, widgetRenderState), {}, {
          instantSearchInstance
        }), isFirstRendering);
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var helper = renderOptions.helper, results = renderOptions.results, instantSearchInstance = renderOptions.instantSearchInstance;
        var state = helper.state;
        var items = results ? transformItems(results.hits.filter(function(hit) {
          return hit._geoloc;
        }), {
          results
        }) : [];
        if (!sendEvent) {
          sendEvent = createSendEventForHits({
            instantSearchInstance,
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: $$type
          });
        }
        return {
          items,
          position: getPositionFromState(state),
          currentRefinement: getCurrentRefinementFromState(state),
          refine: refine(helper),
          sendEvent,
          clearMapRefinement: clearMapRefinement(helper),
          isRefinedWithMap: isRefinedWithMap(state),
          toggleRefineOnMapMove,
          isRefineOnMapMove,
          setMapMoveSinceLastRefine,
          hasMapMoveSinceLastRefine,
          widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread28(_objectSpread28({}, renderState), {}, {
          geoSearch: this.getWidgetRenderState(renderOptions)
        });
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        return state.setQueryParameter("insideBoundingBox", void 0);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref42) {
        var searchParameters = _ref42.searchParameters;
        var boundingBox = getBoundingBoxAsString(searchParameters);
        if (!boundingBox || uiState && uiState.geoSearch && uiState.geoSearch.boundingBox === boundingBox) {
          return uiState;
        }
        return _objectSpread28(_objectSpread28({}, uiState), {}, {
          geoSearch: {
            boundingBox
          }
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        if (!uiState || !uiState.geoSearch) {
          return searchParameters.setQueryParameter("insideBoundingBox", void 0);
        }
        return setBoundingBoxAsString(searchParameters, uiState.geoSearch.boundingBox);
      }
    };
  };
};

// node_modules/react-instantsearch-core/dist/es/connectors/useGeoSearch.js
function useGeoSearch(props, additionalWidgetProperties) {
  return useConnector(connectGeoSearch_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu.js
function _typeof35(obj) {
  "@babel/helpers - typeof";
  return _typeof35 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof35(obj);
}
var _excluded9 = ["name", "escapedValue", "data", "path"];
function ownKeys29(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread29(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys29(Object(source), true).forEach(function(key) {
      _defineProperty30(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys29(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty30(obj, key, value) {
  key = _toPropertyKey30(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey30(arg) {
  var key = _toPrimitive30(arg, "string");
  return _typeof35(key) === "symbol" ? key : String(key);
}
function _toPrimitive30(input, hint) {
  if (_typeof35(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof35(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties9(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose9(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose9(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _slicedToArray11(arr, i) {
  return _arrayWithHoles11(arr) || _iterableToArrayLimit11(arr, i) || _unsupportedIterableToArray15(arr, i) || _nonIterableRest11();
}
function _nonIterableRest11() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray15(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray15(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray15(o, minLen);
}
function _arrayLikeToArray15(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit11(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles11(arr) {
  if (Array.isArray(arr)) return arr;
}
var withUsage10 = createDocumentationMessageGenerator({
  name: "hierarchical-menu",
  connector: true
});
var DEFAULT_SORT = ["name:asc"];
var connectHierarchicalMenu = function connectHierarchicalMenu2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage10());
  return function(widgetParams) {
    var _ref = widgetParams || {}, attributes = _ref.attributes, _ref$separator = _ref.separator, separator = _ref$separator === void 0 ? " > " : _ref$separator, _ref$rootPath = _ref.rootPath, rootPath = _ref$rootPath === void 0 ? null : _ref$rootPath, _ref$showParentLevel = _ref.showParentLevel, showParentLevel = _ref$showParentLevel === void 0 ? true : _ref$showParentLevel, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$showMore = _ref.showMore, showMore = _ref$showMore === void 0 ? false : _ref$showMore, _ref$showMoreLimit = _ref.showMoreLimit, showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit, _ref$sortBy = _ref.sortBy, sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT : _ref$sortBy, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
      throw new Error(withUsage10("The `attributes` option expects an array of strings."));
    }
    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage10("The `showMoreLimit` option must be greater than `limit`."));
    }
    var _attributes = _slicedToArray11(attributes, 1), hierarchicalFacetName = _attributes[0];
    var sendEvent;
    var toggleShowMore = function toggleShowMore2() {
    };
    function cachedToggleShowMore() {
      toggleShowMore();
    }
    var _refine;
    var isShowingMore = false;
    function createToggleShowMore(renderOptions, widget) {
      return function() {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }
    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }
    function _prepareFacetValues(facetValues) {
      return facetValues.slice(0, getLimit()).map(function(_ref22) {
        var label = _ref22.name, value = _ref22.escapedValue, data = _ref22.data, path = _ref22.path, subValue = _objectWithoutProperties9(_ref22, _excluded9);
        var item = _objectSpread29(_objectSpread29({}, subValue), {}, {
          value,
          label,
          data: null
        });
        if (Array.isArray(data)) {
          item.data = _prepareFacetValues(data);
        }
        return item;
      });
    }
    return {
      $$type: "ais.hierarchicalMenu",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread29(_objectSpread29({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        toggleShowMore = createToggleShowMore(renderOptions, this);
        renderFn(_objectSpread29(_objectSpread29({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        return state.removeHierarchicalFacet(hierarchicalFacetName).setQueryParameter("maxValuesPerFacet", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread29(_objectSpread29({}, renderState), {}, {
          hierarchicalMenu: _objectSpread29(_objectSpread29({}, renderState.hierarchicalMenu), {}, _defineProperty30({}, hierarchicalFacetName, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref42) {
        var _this = this;
        var results = _ref42.results, state = _ref42.state, createURL = _ref42.createURL, instantSearchInstance = _ref42.instantSearchInstance, helper = _ref42.helper;
        var items = [];
        var canToggleShowMore = false;
        var _createURL = function _createURL2(facetValue) {
          return createURL(function(uiState) {
            return _this.getWidgetUiState(uiState, {
              searchParameters: state.resetPage().toggleFacetRefinement(hierarchicalFacetName, facetValue),
              helper
            });
          });
        };
        if (!sendEvent) {
          sendEvent = createSendEventForFacet({
            instantSearchInstance,
            helper,
            attribute: function attribute(facetValue) {
              var index3 = facetValue.split(separator).length - 1;
              return attributes[index3];
            },
            widgetType: this.$$type
          });
        }
        if (!_refine) {
          _refine = function _refine2(facetValue) {
            sendEvent("click:internal", facetValue);
            helper.toggleFacetRefinement(hierarchicalFacetName, facetValue).search();
          };
        }
        if (results) {
          var facetValues = results.getFacetValues(hierarchicalFacetName, {
            sortBy,
            facetOrdering: sortBy === DEFAULT_SORT
          });
          var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
          var hasExhaustiveItems = (state.maxValuesPerFacet || 0) > getLimit() ? facetItems.length <= getLimit() : facetItems.length < getLimit();
          canToggleShowMore = showMore && (isShowingMore || !hasExhaustiveItems);
          items = transformItems(_prepareFacetValues(facetItems), {
            results
          });
        }
        return {
          items,
          refine: _refine,
          canRefine: items.length > 0,
          createURL: _createURL,
          sendEvent,
          widgetParams,
          isShowingMore,
          toggleShowMore: cachedToggleShowMore,
          canToggleShowMore
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var path = searchParameters.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);
        return removeEmptyRefinementsFromUiState2(_objectSpread29(_objectSpread29({}, uiState), {}, {
          hierarchicalMenu: _objectSpread29(_objectSpread29({}, uiState.hierarchicalMenu), {}, _defineProperty30({}, hierarchicalFacetName, path))
        }), hierarchicalFacetName);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref62) {
        var uiState = _ref62.uiState;
        var values = uiState.hierarchicalMenu && uiState.hierarchicalMenu[hierarchicalFacetName];
        if (searchParameters.isConjunctiveFacet(hierarchicalFacetName) || searchParameters.isDisjunctiveFacet(hierarchicalFacetName)) {
          true ? _warning(false, 'HierarchicalMenu: Attribute "'.concat(hierarchicalFacetName, '" is already used by another widget applying conjunctive or disjunctive faceting.\nAs this is not supported, please make sure to remove this other widget or this HierarchicalMenu widget will not work at all.')) : void 0;
          return searchParameters;
        }
        if (searchParameters.isHierarchicalFacet(hierarchicalFacetName)) {
          var facet = searchParameters.getHierarchicalFacetByName(hierarchicalFacetName);
          true ? _warning(isEqual(facet.attributes, attributes) && facet.separator === separator && facet.rootPath === rootPath, "Using Breadcrumb and HierarchicalMenu on the same facet with different options overrides the configuration of the HierarchicalMenu.") : void 0;
        }
        var withFacetConfiguration = searchParameters.removeHierarchicalFacet(hierarchicalFacetName).addHierarchicalFacet({
          name: hierarchicalFacetName,
          attributes,
          separator,
          rootPath,
          showParentLevel
        });
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter("maxValuesPerFacet", nextMaxValuesPerFacet);
        if (!values) {
          return withMaxValuesPerFacet.setQueryParameters({
            hierarchicalFacetsRefinements: _objectSpread29(_objectSpread29({}, withMaxValuesPerFacet.hierarchicalFacetsRefinements), {}, _defineProperty30({}, hierarchicalFacetName, []))
          });
        }
        return withMaxValuesPerFacet.addHierarchicalFacetRefinement(hierarchicalFacetName, values.join(separator));
      }
    };
  };
};
function removeEmptyRefinementsFromUiState2(indexUiState, attribute) {
  if (!indexUiState.hierarchicalMenu) {
    return indexUiState;
  }
  if (!indexUiState.hierarchicalMenu[attribute] || indexUiState.hierarchicalMenu[attribute].length === 0) {
    delete indexUiState.hierarchicalMenu[attribute];
  }
  if (Object.keys(indexUiState.hierarchicalMenu).length === 0) {
    delete indexUiState.hierarchicalMenu;
  }
  return indexUiState;
}
var connectHierarchicalMenu_default = connectHierarchicalMenu;

// node_modules/react-instantsearch-core/dist/es/connectors/useHierarchicalMenu.js
function useHierarchicalMenu(props, additionalWidgetProperties) {
  return useConnector(connectHierarchicalMenu_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/hits/connectHits.js
function _typeof36(obj) {
  "@babel/helpers - typeof";
  return _typeof36 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof36(obj);
}
function ownKeys30(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread30(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys30(Object(source), true).forEach(function(key) {
      _defineProperty31(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys30(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty31(obj, key, value) {
  key = _toPropertyKey31(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey31(arg) {
  var key = _toPrimitive31(arg, "string");
  return _typeof36(key) === "symbol" ? key : String(key);
}
function _toPrimitive31(input, hint) {
  if (_typeof36(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof36(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage11 = createDocumentationMessageGenerator({
  name: "hits",
  connector: true
});
var connectHits_default = function connectHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage11());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$escapeHTML = _ref.escapeHTML, escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    var sendEvent;
    var bindEvent;
    return {
      $$type: "ais.hits",
      init: function init(initOptions) {
        renderFn(_objectSpread30(_objectSpread30({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var renderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread30(_objectSpread30({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
        renderState.sendEvent("view:internal", renderState.items);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread30(_objectSpread30({}, renderState), {}, {
          hits: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref22) {
        var _results$renderingCon, _results$renderingCon2, _results$renderingCon3;
        var results = _ref22.results, helper = _ref22.helper, instantSearchInstance = _ref22.instantSearchInstance;
        if (!sendEvent) {
          sendEvent = createSendEventForHits({
            instantSearchInstance,
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type
          });
        }
        if (!bindEvent) {
          bindEvent = createBindEventForHits({
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type,
            instantSearchInstance
          });
        }
        if (!results) {
          return {
            hits: [],
            items: [],
            results: void 0,
            banner: void 0,
            sendEvent,
            bindEvent,
            widgetParams
          };
        }
        if (escapeHTML && results.hits.length > 0) {
          results.hits = escapeHits(results.hits);
        }
        var hitsWithAbsolutePosition = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
        var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, results.queryID);
        var items = transformItems(hitsWithAbsolutePositionAndQueryID, {
          results
        });
        var banner = (_results$renderingCon = results.renderingContent) === null || _results$renderingCon === void 0 ? void 0 : (_results$renderingCon2 = _results$renderingCon.widgets) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.banners) === null || _results$renderingCon3 === void 0 ? void 0 : _results$renderingCon3[0];
        return {
          hits: items,
          items,
          results,
          banner,
          sendEvent,
          bindEvent,
          widgetParams
        };
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        if (!escapeHTML) {
          return state;
        }
        return state.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function(acc, key) {
          return _objectSpread30(_objectSpread30({}, acc), {}, _defineProperty31({}, key, void 0));
        }, {}));
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _uiState) {
        if (!escapeHTML) {
          return state;
        }
        return state.setQueryParameters(TAG_PLACEHOLDER);
      }
    };
  };
};

// node_modules/react-instantsearch-core/dist/es/connectors/useHits.js
function useHits(props, additionalWidgetProperties) {
  return useConnector(connectHits_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage.js
function _typeof37(obj) {
  "@babel/helpers - typeof";
  return _typeof37 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof37(obj);
}
function _toConsumableArray7(arr) {
  return _arrayWithoutHoles7(arr) || _iterableToArray7(arr) || _unsupportedIterableToArray16(arr) || _nonIterableSpread7();
}
function _nonIterableSpread7() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray16(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray16(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray16(o, minLen);
}
function _iterableToArray7(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles7(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray16(arr);
}
function _arrayLikeToArray16(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function ownKeys31(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread31(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys31(Object(source), true).forEach(function(key) {
      _defineProperty32(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys31(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty32(obj, key, value) {
  key = _toPropertyKey32(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey32(arg) {
  var key = _toPrimitive32(arg, "string");
  return _typeof37(key) === "symbol" ? key : String(key);
}
function _toPrimitive32(input, hint) {
  if (_typeof37(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof37(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage12 = createDocumentationMessageGenerator({
  name: "hits-per-page",
  connector: true
});
var connectHitsPerPage = function connectHitsPerPage2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage12());
  return function(widgetParams) {
    var _ref = widgetParams || {}, userItems = _ref.items, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items2) {
      return items2;
    } : _ref$transformItems;
    if (!Array.isArray(userItems)) {
      throw new Error(withUsage12("The `items` option expects an array of objects."));
    }
    var items = userItems;
    var defaultItems = items.filter(function(item) {
      return item.default === true;
    });
    if (defaultItems.length === 0) {
      throw new Error(withUsage12("A default value must be specified in `items`."));
    }
    if (defaultItems.length > 1) {
      throw new Error(withUsage12("More than one default value is specified in `items`."));
    }
    var defaultItem = defaultItems[0];
    var normalizeItems = function normalizeItems2(_ref22) {
      var hitsPerPage = _ref22.hitsPerPage;
      return items.map(function(item) {
        return _objectSpread31(_objectSpread31({}, item), {}, {
          isRefined: Number(item.value) === Number(hitsPerPage)
        });
      });
    };
    var connectorState = {
      getRefine: function getRefine(helper) {
        return function(value) {
          return !value && value !== 0 ? helper.setQueryParameter("hitsPerPage", void 0).search() : helper.setQueryParameter("hitsPerPage", value).search();
        };
      },
      createURLFactory: function createURLFactory(_ref3) {
        var state = _ref3.state, createURL = _ref3.createURL, getWidgetUiState = _ref3.getWidgetUiState, helper = _ref3.helper;
        return function(value) {
          return createURL(function(uiState) {
            return getWidgetUiState(uiState, {
              searchParameters: state.resetPage().setQueryParameter("hitsPerPage", !value && value !== 0 ? void 0 : value),
              helper
            });
          });
        };
      }
    };
    return {
      $$type: "ais.hitsPerPage",
      init: function init(initOptions) {
        var state = initOptions.state, instantSearchInstance = initOptions.instantSearchInstance;
        var isCurrentInOptions = items.some(function(item) {
          return Number(state.hitsPerPage) === Number(item.value);
        });
        if (!isCurrentInOptions) {
          true ? _warning(state.hitsPerPage !== void 0, "\n`hitsPerPage` is not defined.\nThe option `hitsPerPage` needs to be set using the `configure` widget.\n\nLearn more: https://www.algolia.com/doc/api-reference/widgets/hits-per-page/js/\n            ") : void 0;
          true ? _warning(false, '\nThe `items` option of `hitsPerPage` does not contain the "hits per page" value coming from the state: '.concat(state.hitsPerPage, ".\n\nYou may want to add another entry to the `items` option with this value.")) : void 0;
          items = [
            // The helper will convert the empty string to `undefined`.
            {
              value: "",
              label: ""
            }
          ].concat(_toConsumableArray7(items));
        }
        renderFn(_objectSpread31(_objectSpread31({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread31(_objectSpread31({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref42) {
        var state = _ref42.state;
        unmountFn();
        return state.setQueryParameter("hitsPerPage", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread31(_objectSpread31({}, renderState), {}, {
          hitsPerPage: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref5) {
        var state = _ref5.state, results = _ref5.results, createURL = _ref5.createURL, helper = _ref5.helper;
        var canRefine = results ? results.nbHits > 0 : false;
        return {
          items: transformItems(normalizeItems(state), {
            results
          }),
          refine: connectorState.getRefine(helper),
          createURL: connectorState.createURLFactory({
            state,
            createURL,
            getWidgetUiState: this.getWidgetUiState,
            helper
          }),
          hasNoResults: !canRefine,
          canRefine,
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref62) {
        var searchParameters = _ref62.searchParameters;
        var hitsPerPage = searchParameters.hitsPerPage;
        if (hitsPerPage === void 0 || hitsPerPage === defaultItem.value) {
          return uiState;
        }
        return _objectSpread31(_objectSpread31({}, uiState), {}, {
          hitsPerPage
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref7) {
        var uiState = _ref7.uiState;
        return searchParameters.setQueryParameters({
          hitsPerPage: uiState.hitsPerPage || defaultItem.value
        });
      }
    };
  };
};
var connectHitsPerPage_default = connectHitsPerPage;

// node_modules/react-instantsearch-core/dist/es/connectors/useHitsPerPage.js
function useHitsPerPage(props, additionalWidgetProperties) {
  return useConnector(connectHitsPerPage_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits.js
function _typeof38(obj) {
  "@babel/helpers - typeof";
  return _typeof38 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof38(obj);
}
var _excluded10 = ["page"];
var _excluded24 = ["clickAnalytics", "userToken"];
function ownKeys32(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread32(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys32(Object(source), true).forEach(function(key) {
      _defineProperty33(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys32(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty33(obj, key, value) {
  key = _toPropertyKey33(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey33(arg) {
  var key = _toPrimitive33(arg, "string");
  return _typeof38(key) === "symbol" ? key : String(key);
}
function _toPrimitive33(input, hint) {
  if (_typeof38(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof38(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toConsumableArray8(arr) {
  return _arrayWithoutHoles8(arr) || _iterableToArray8(arr) || _unsupportedIterableToArray17(arr) || _nonIterableSpread8();
}
function _nonIterableSpread8() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray17(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray17(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray17(o, minLen);
}
function _iterableToArray8(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles8(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray17(arr);
}
function _arrayLikeToArray17(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _objectWithoutProperties10(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose10(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose10(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var withUsage13 = createDocumentationMessageGenerator({
  name: "infinite-hits",
  connector: true
});
function getStateWithoutPage(state) {
  var _ref = state || {}, page = _ref.page, rest = _objectWithoutProperties10(_ref, _excluded10);
  return rest;
}
function normalizeState(state) {
  var _ref22 = state || {}, clickAnalytics = _ref22.clickAnalytics, userToken = _ref22.userToken, rest = _objectWithoutProperties10(_ref22, _excluded24);
  return rest;
}
function getInMemoryCache() {
  var cachedHits = null;
  var cachedState = null;
  return {
    read: function read(_ref3) {
      var state = _ref3.state;
      return isEqual(cachedState, getStateWithoutPage(state)) ? cachedHits : null;
    },
    write: function write(_ref42) {
      var state = _ref42.state, hits = _ref42.hits;
      cachedState = getStateWithoutPage(state);
      cachedHits = hits;
    }
  };
}
function extractHitsFromCachedHits(cachedHits) {
  return Object.keys(cachedHits).map(Number).sort(function(a, b) {
    return a - b;
  }).reduce(function(acc, page) {
    return acc.concat(cachedHits[page]);
  }, []);
}
var connectInfiniteHits_default = function connectInfiniteHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage13());
  return function(widgetParams) {
    var _ref5 = widgetParams || {}, _ref5$escapeHTML = _ref5.escapeHTML, escapeHTML = _ref5$escapeHTML === void 0 ? true : _ref5$escapeHTML, _ref5$transformItems = _ref5.transformItems, transformItems = _ref5$transformItems === void 0 ? function(items) {
      return items;
    } : _ref5$transformItems, _ref5$cache = _ref5.cache, cache = _ref5$cache === void 0 ? getInMemoryCache() : _ref5$cache;
    var showPrevious;
    var showMore;
    var sendEvent;
    var bindEvent;
    var getFirstReceivedPage = function getFirstReceivedPage2(state, cachedHits) {
      var _state$page = state.page, page = _state$page === void 0 ? 0 : _state$page;
      var pages = Object.keys(cachedHits).map(Number);
      if (pages.length === 0) {
        return page;
      } else {
        return Math.min.apply(Math, [page].concat(_toConsumableArray8(pages)));
      }
    };
    var getLastReceivedPage = function getLastReceivedPage2(state, cachedHits) {
      var _state$page2 = state.page, page = _state$page2 === void 0 ? 0 : _state$page2;
      var pages = Object.keys(cachedHits).map(Number);
      if (pages.length === 0) {
        return page;
      } else {
        return Math.max.apply(Math, [page].concat(_toConsumableArray8(pages)));
      }
    };
    var getShowPrevious = function getShowPrevious2(helper) {
      return function() {
        helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread32(_objectSpread32({}, helper.state), {}, {
          page: getFirstReceivedPage(helper.state, cache.read({
            state: normalizeState(helper.state)
          }) || {}) - 1
        })).searchWithoutTriggeringOnStateChange();
      };
    };
    var getShowMore = function getShowMore2(helper) {
      return function() {
        helper.setPage(getLastReceivedPage(helper.state, cache.read({
          state: normalizeState(helper.state)
        }) || {}) + 1).search();
      };
    };
    return {
      $$type: "ais.infiniteHits",
      init: function init(initOptions) {
        renderFn(_objectSpread32(_objectSpread32({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        var widgetRenderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread32(_objectSpread32({}, widgetRenderState), {}, {
          instantSearchInstance
        }), false);
        sendEvent("view:internal", widgetRenderState.currentPageHits);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread32(_objectSpread32({}, renderState), {}, {
          infiniteHits: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref62) {
        var _results$renderingCon, _results$renderingCon2, _results$renderingCon3;
        var results = _ref62.results, helper = _ref62.helper, parent = _ref62.parent, existingState = _ref62.state, instantSearchInstance = _ref62.instantSearchInstance;
        var isFirstPage;
        var currentPageHits = [];
        var state = parent.getPreviousState() || existingState;
        var cachedHits = cache.read({
          state: normalizeState(state)
        }) || {};
        var banner = results === null || results === void 0 ? void 0 : (_results$renderingCon = results.renderingContent) === null || _results$renderingCon === void 0 ? void 0 : (_results$renderingCon2 = _results$renderingCon.widgets) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.banners) === null || _results$renderingCon3 === void 0 ? void 0 : _results$renderingCon3[0];
        if (!results) {
          showPrevious = getShowPrevious(helper);
          showMore = getShowMore(helper);
          sendEvent = createSendEventForHits({
            instantSearchInstance,
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type
          });
          bindEvent = createBindEventForHits({
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type,
            instantSearchInstance
          });
          isFirstPage = state.page === void 0 || getFirstReceivedPage(state, cachedHits) === 0;
        } else {
          var _state$disjunctiveFac, _state$hierarchicalFa;
          var _state$page3 = state.page, _page = _state$page3 === void 0 ? 0 : _state$page3;
          if (escapeHTML && results.hits.length > 0) {
            results.hits = escapeHits(results.hits);
          }
          var hitsWithAbsolutePosition = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
          var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, results.queryID);
          var transformedHits = transformItems(hitsWithAbsolutePositionAndQueryID, {
            results
          });
          var hasDynamicWidgets = false;
          walkIndex(instantSearchInstance.mainIndex, function(indexWidget) {
            if (!hasDynamicWidgets && indexWidget.getWidgets().some(function(_ref7) {
              var $$type5 = _ref7.$$type;
              return $$type5 === "ais.dynamicWidgets";
            })) {
              hasDynamicWidgets = true;
            }
          });
          var hasNoFacets = !((_state$disjunctiveFac = state.disjunctiveFacets) !== null && _state$disjunctiveFac !== void 0 && _state$disjunctiveFac.length) && !(state.facets || []).filter(function(f) {
            return f !== "*";
          }).length && !((_state$hierarchicalFa = state.hierarchicalFacets) !== null && _state$hierarchicalFa !== void 0 && _state$hierarchicalFa.length);
          if (cachedHits[_page] === void 0 && !results.__isArtificial && instantSearchInstance.status === "idle" && !(hasDynamicWidgets && hasNoFacets)) {
            cachedHits[_page] = transformedHits;
            cache.write({
              state: normalizeState(state),
              hits: cachedHits
            });
          }
          currentPageHits = transformedHits;
          isFirstPage = getFirstReceivedPage(state, cachedHits) === 0;
        }
        var items = extractHitsFromCachedHits(cachedHits);
        var isLastPage = results ? results.nbPages <= getLastReceivedPage(state, cachedHits) + 1 : true;
        return {
          hits: items,
          items,
          currentPageHits,
          sendEvent,
          bindEvent,
          banner,
          results,
          showPrevious,
          showMore,
          isFirstPage,
          isLastPage,
          widgetParams
        };
      },
      dispose: function dispose(_ref8) {
        var state = _ref8.state;
        unmountFn();
        var stateWithoutPage = state.setQueryParameter("page", void 0);
        if (!escapeHTML) {
          return stateWithoutPage;
        }
        return stateWithoutPage.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function(acc, key) {
          return _objectSpread32(_objectSpread32({}, acc), {}, _defineProperty33({}, key, void 0));
        }, {}));
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref9) {
        var searchParameters = _ref9.searchParameters;
        var page = searchParameters.page || 0;
        if (!page) {
          return uiState;
        }
        return _objectSpread32(_objectSpread32({}, uiState), {}, {
          // The page in the UI state is incremented by one
          // to expose the user value (not `0`).
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref10) {
        var uiState = _ref10.uiState;
        var widgetSearchParameters = searchParameters;
        if (escapeHTML) {
          widgetSearchParameters = searchParameters.setQueryParameters(TAG_PLACEHOLDER);
        }
        var page = uiState.page ? uiState.page - 1 : 0;
        return widgetSearchParameters.setQueryParameter("page", page);
      }
    };
  };
};

// node_modules/react-instantsearch-core/dist/es/connectors/useInfiniteHits.js
function useInfiniteHits(props, additionalWidgetProperties) {
  return useConnector(connectInfiniteHits_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/menu/connectMenu.js
var _excluded11 = ["name", "escapedValue", "path"];
function _typeof39(obj) {
  "@babel/helpers - typeof";
  return _typeof39 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof39(obj);
}
function _objectWithoutProperties11(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose11(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose11(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _slicedToArray12(arr, i) {
  return _arrayWithHoles12(arr) || _iterableToArrayLimit12(arr, i) || _unsupportedIterableToArray18(arr, i) || _nonIterableRest12();
}
function _nonIterableRest12() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray18(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray18(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray18(o, minLen);
}
function _arrayLikeToArray18(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit12(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles12(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys33(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread33(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys33(Object(source), true).forEach(function(key) {
      _defineProperty34(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys33(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty34(obj, key, value) {
  key = _toPropertyKey34(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey34(arg) {
  var key = _toPrimitive34(arg, "string");
  return _typeof39(key) === "symbol" ? key : String(key);
}
function _toPrimitive34(input, hint) {
  if (_typeof39(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof39(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage14 = createDocumentationMessageGenerator({
  name: "menu",
  connector: true
});
var DEFAULT_SORT2 = ["isRefined", "name:asc"];
var connectMenu = function connectMenu2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage14());
  return function(widgetParams) {
    var _ref = widgetParams || {}, attribute = _ref.attribute, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$showMore = _ref.showMore, showMore = _ref$showMore === void 0 ? false : _ref$showMore, _ref$showMoreLimit = _ref.showMoreLimit, showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit, _ref$sortBy = _ref.sortBy, sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT2 : _ref$sortBy, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attribute) {
      throw new Error(withUsage14("The `attribute` option is required."));
    }
    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage14("The `showMoreLimit` option must be greater than `limit`."));
    }
    var sendEvent;
    var _createURL;
    var _refine;
    var isShowingMore = false;
    var toggleShowMore = function toggleShowMore2() {
    };
    function createToggleShowMore(renderOptions, widget) {
      return function() {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }
    function cachedToggleShowMore() {
      toggleShowMore();
    }
    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }
    return {
      $$type: "ais.menu",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread33(_objectSpread33({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread33(_objectSpread33({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref22) {
        var state = _ref22.state;
        unmountFn();
        return state.removeHierarchicalFacet(attribute).setQueryParameter("maxValuesPerFacet", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread33(_objectSpread33({}, renderState), {}, {
          menu: _objectSpread33(_objectSpread33({}, renderState.menu), {}, _defineProperty34({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var _this = this;
        var results = renderOptions.results, createURL = renderOptions.createURL, instantSearchInstance = renderOptions.instantSearchInstance, helper = renderOptions.helper;
        var items = [];
        var canToggleShowMore = false;
        if (!sendEvent) {
          sendEvent = createSendEventForFacet({
            instantSearchInstance,
            helper,
            attribute,
            widgetType: this.$$type
          });
        }
        if (!_createURL) {
          _createURL = function _createURL2(facetValue) {
            return createURL(function(uiState) {
              return _this.getWidgetUiState(uiState, {
                searchParameters: helper.state.resetPage().toggleFacetRefinement(attribute, facetValue),
                helper
              });
            });
          };
        }
        if (!_refine) {
          _refine = function _refine2(facetValue) {
            var _helper$getHierarchic = helper.getHierarchicalFacetBreadcrumb(attribute), _helper$getHierarchic2 = _slicedToArray12(_helper$getHierarchic, 1), refinedItem = _helper$getHierarchic2[0];
            sendEvent("click:internal", facetValue ? facetValue : refinedItem);
            helper.toggleFacetRefinement(attribute, facetValue ? facetValue : refinedItem).search();
          };
        }
        if (renderOptions.results) {
          toggleShowMore = createToggleShowMore(renderOptions, this);
        }
        if (results) {
          var facetValues = results.getFacetValues(attribute, {
            sortBy,
            facetOrdering: sortBy === DEFAULT_SORT2
          });
          var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
          canToggleShowMore = showMore && (isShowingMore || facetItems.length > getLimit());
          items = transformItems(facetItems.slice(0, getLimit()).map(function(_ref3) {
            var label = _ref3.name, value = _ref3.escapedValue, path = _ref3.path, item = _objectWithoutProperties11(_ref3, _excluded11);
            return _objectSpread33(_objectSpread33({}, item), {}, {
              label,
              value
            });
          }), {
            results
          });
        }
        return {
          items,
          createURL: _createURL,
          refine: _refine,
          sendEvent,
          canRefine: items.length > 0,
          widgetParams,
          isShowingMore,
          toggleShowMore: cachedToggleShowMore,
          canToggleShowMore
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref42) {
        var searchParameters = _ref42.searchParameters;
        var _searchParameters$get = searchParameters.getHierarchicalFacetBreadcrumb(attribute), _searchParameters$get2 = _slicedToArray12(_searchParameters$get, 1), value = _searchParameters$get2[0];
        return removeEmptyRefinementsFromUiState3(_objectSpread33(_objectSpread33({}, uiState), {}, {
          menu: _objectSpread33(_objectSpread33({}, uiState.menu), {}, _defineProperty34({}, attribute, value))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        var value = uiState.menu && uiState.menu[attribute];
        if (searchParameters.isConjunctiveFacet(attribute) || searchParameters.isDisjunctiveFacet(attribute)) {
          true ? _warning(false, 'Menu: Attribute "'.concat(attribute, '" is already used by another widget applying conjunctive or disjunctive faceting.\nAs this is not supported, please make sure to remove this other widget or this Menu widget will not work at all.')) : void 0;
          return searchParameters;
        }
        var withFacetConfiguration = searchParameters.removeHierarchicalFacet(attribute).addHierarchicalFacet({
          name: attribute,
          attributes: [attribute]
        });
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter("maxValuesPerFacet", nextMaxValuesPerFacet);
        if (!value) {
          return withMaxValuesPerFacet.setQueryParameters({
            hierarchicalFacetsRefinements: _objectSpread33(_objectSpread33({}, withMaxValuesPerFacet.hierarchicalFacetsRefinements), {}, _defineProperty34({}, attribute, []))
          });
        }
        return withMaxValuesPerFacet.addHierarchicalFacetRefinement(attribute, value);
      }
    };
  };
};
function removeEmptyRefinementsFromUiState3(indexUiState, attribute) {
  if (!indexUiState.menu) {
    return indexUiState;
  }
  if (indexUiState.menu[attribute] === void 0) {
    delete indexUiState.menu[attribute];
  }
  if (Object.keys(indexUiState.menu).length === 0) {
    delete indexUiState.menu;
  }
  return indexUiState;
}
var connectMenu_default = connectMenu;

// node_modules/react-instantsearch-core/dist/es/connectors/useMenu.js
function useMenu(props, additionalWidgetProperties) {
  return useConnector(connectMenu_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/numeric-menu/connectNumericMenu.js
function _typeof40(obj) {
  "@babel/helpers - typeof";
  return _typeof40 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof40(obj);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray19(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length) return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e3) {
    didErr = true;
    err = _e3;
  }, f: function f() {
    try {
      if (!normalCompletion && it.return != null) it.return();
    } finally {
      if (didErr) throw err;
    }
  } };
}
function _slicedToArray13(arr, i) {
  return _arrayWithHoles13(arr) || _iterableToArrayLimit13(arr, i) || _unsupportedIterableToArray19(arr, i) || _nonIterableRest13();
}
function _nonIterableRest13() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray19(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray19(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray19(o, minLen);
}
function _arrayLikeToArray19(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit13(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles13(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys34(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread34(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys34(Object(source), true).forEach(function(key) {
      _defineProperty35(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys34(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty35(obj, key, value) {
  key = _toPropertyKey35(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey35(arg) {
  var key = _toPrimitive35(arg, "string");
  return _typeof40(key) === "symbol" ? key : String(key);
}
function _toPrimitive35(input, hint) {
  if (_typeof40(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof40(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage15 = createDocumentationMessageGenerator({
  name: "numeric-menu",
  connector: true
});
var $$type2 = "ais.numericMenu";
var createSendEvent = function createSendEvent2(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance;
  return function() {
    if (arguments.length === 1) {
      instantSearchInstance.sendEventToInsights(arguments.length <= 0 ? void 0 : arguments[0]);
      return;
    }
  };
};
var connectNumericMenu = function connectNumericMenu2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage15());
  return function(widgetParams) {
    var _ref22 = widgetParams || {}, _ref2$attribute = _ref22.attribute, attribute = _ref2$attribute === void 0 ? "" : _ref2$attribute, _ref2$items = _ref22.items, items = _ref2$items === void 0 ? [] : _ref2$items, _ref2$transformItems = _ref22.transformItems, transformItems = _ref2$transformItems === void 0 ? function(item) {
      return item;
    } : _ref2$transformItems;
    if (attribute === "") {
      throw new Error(withUsage15("The `attribute` option is required."));
    }
    if (!items || items.length === 0) {
      throw new Error(withUsage15("The `items` option expects an array of objects."));
    }
    var prepareItems2 = function prepareItems3(state) {
      return items.map(function(_ref3) {
        var start = _ref3.start, end = _ref3.end, label = _ref3.label;
        return {
          label,
          value: encodeURI(JSON.stringify({
            start,
            end
          })),
          isRefined: isRefined(state, attribute, {
            start,
            end,
            label
          })
        };
      });
    };
    var connectorState = {};
    return {
      $$type: $$type2,
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread34(_objectSpread34({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread34(_objectSpread34({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref42) {
        var state = _ref42.state;
        unmountFn();
        return state.removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var values = searchParameters.getNumericRefinements(attribute);
        var equal = values["="] && values["="][0];
        if (equal || equal === 0) {
          return _objectSpread34(_objectSpread34({}, uiState), {}, {
            numericMenu: _objectSpread34(_objectSpread34({}, uiState.numericMenu), {}, _defineProperty35({}, attribute, "".concat(values["="])))
          });
        }
        var min = values[">="] && values[">="][0] || "";
        var max = values["<="] && values["<="][0] || "";
        return removeEmptyRefinementsFromUiState4(_objectSpread34(_objectSpread34({}, uiState), {}, {
          numericMenu: _objectSpread34(_objectSpread34({}, uiState.numericMenu), {}, _defineProperty35({}, attribute, "".concat(min, ":").concat(max)))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref62) {
        var uiState = _ref62.uiState;
        var value = uiState.numericMenu && uiState.numericMenu[attribute];
        var withoutRefinements = searchParameters.setQueryParameters({
          numericRefinements: _objectSpread34(_objectSpread34({}, searchParameters.numericRefinements), {}, _defineProperty35({}, attribute, {}))
        });
        if (!value) {
          return withoutRefinements;
        }
        var isExact = value.indexOf(":") === -1;
        if (isExact) {
          return withoutRefinements.addNumericRefinement(attribute, "=", Number(value));
        }
        var _value$split$map = value.split(":").map(parseFloat), _value$split$map2 = _slicedToArray13(_value$split$map, 2), min = _value$split$map2[0], max = _value$split$map2[1];
        var withMinRefinement = isFiniteNumber(min) ? withoutRefinements.addNumericRefinement(attribute, ">=", min) : withoutRefinements;
        var withMaxRefinement = isFiniteNumber(max) ? withMinRefinement.addNumericRefinement(attribute, "<=", max) : withMinRefinement;
        return withMaxRefinement;
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread34(_objectSpread34({}, renderState), {}, {
          numericMenu: _objectSpread34(_objectSpread34({}, renderState.numericMenu), {}, _defineProperty35({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref7) {
        var _this = this;
        var results = _ref7.results, state = _ref7.state, instantSearchInstance = _ref7.instantSearchInstance, helper = _ref7.helper, createURL = _ref7.createURL;
        if (!connectorState.refine) {
          connectorState.refine = function(facetValue) {
            var refinedState = getRefinedState(helper.state, attribute, facetValue);
            connectorState.sendEvent("click:internal", facetValue);
            helper.setState(refinedState).search();
          };
        }
        if (!connectorState.createURL) {
          connectorState.createURL = function(newState) {
            return function(facetValue) {
              return createURL(function(uiState) {
                return _this.getWidgetUiState(uiState, {
                  searchParameters: getRefinedState(newState, attribute, facetValue),
                  helper
                });
              });
            };
          };
        }
        if (!connectorState.sendEvent) {
          connectorState.sendEvent = createSendEvent({
            instantSearchInstance
          });
        }
        var hasNoResults = results ? results.nbHits === 0 : true;
        var preparedItems = prepareItems2(state);
        var allIsSelected = true;
        var _iterator = _createForOfIteratorHelper(preparedItems), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var item = _step.value;
            if (item.isRefined && decodeURI(item.value) !== "{}") {
              allIsSelected = false;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return {
          createURL: connectorState.createURL(state),
          items: transformItems(preparedItems, {
            results
          }),
          hasNoResults,
          canRefine: !(hasNoResults && allIsSelected),
          refine: connectorState.refine,
          sendEvent: connectorState.sendEvent,
          widgetParams
        };
      }
    };
  };
};
function isRefined(state, attribute, option) {
  var currentRefinements = state.getNumericRefinements(attribute);
  if (option.start !== void 0 && option.end !== void 0) {
    if (option.start === option.end) {
      return hasNumericRefinement(currentRefinements, "=", option.start);
    } else {
      return hasNumericRefinement(currentRefinements, ">=", option.start) && hasNumericRefinement(currentRefinements, "<=", option.end);
    }
  }
  if (option.start !== void 0) {
    return hasNumericRefinement(currentRefinements, ">=", option.start);
  }
  if (option.end !== void 0) {
    return hasNumericRefinement(currentRefinements, "<=", option.end);
  }
  if (option.start === void 0 && option.end === void 0) {
    return Object.keys(currentRefinements).every(function(operator) {
      return (currentRefinements[operator] || []).length === 0;
    });
  }
  return false;
}
function getRefinedState(state, attribute, facetValue) {
  var resolvedState = state;
  var refinedOption = JSON.parse(decodeURI(facetValue));
  var currentRefinements = resolvedState.getNumericRefinements(attribute);
  if (refinedOption.start === void 0 && refinedOption.end === void 0) {
    return resolvedState.removeNumericRefinement(attribute);
  }
  if (!isRefined(resolvedState, attribute, refinedOption)) {
    resolvedState = resolvedState.removeNumericRefinement(attribute);
  }
  if (refinedOption.start !== void 0 && refinedOption.end !== void 0) {
    if (refinedOption.start > refinedOption.end) {
      throw new Error("option.start should be > to option.end");
    }
    if (refinedOption.start === refinedOption.end) {
      if (hasNumericRefinement(currentRefinements, "=", refinedOption.start)) {
        resolvedState = resolvedState.removeNumericRefinement(attribute, "=", refinedOption.start);
      } else {
        resolvedState = resolvedState.addNumericRefinement(attribute, "=", refinedOption.start);
      }
      return resolvedState;
    }
  }
  if (refinedOption.start !== void 0) {
    if (hasNumericRefinement(currentRefinements, ">=", refinedOption.start)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute, ">=", refinedOption.start);
    }
    resolvedState = resolvedState.addNumericRefinement(attribute, ">=", refinedOption.start);
  }
  if (refinedOption.end !== void 0) {
    if (hasNumericRefinement(currentRefinements, "<=", refinedOption.end)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute, "<=", refinedOption.end);
    }
    resolvedState = resolvedState.addNumericRefinement(attribute, "<=", refinedOption.end);
  }
  if (typeof resolvedState.page === "number") {
    resolvedState.page = 0;
  }
  return resolvedState;
}
function hasNumericRefinement(currentRefinements, operator, value) {
  return currentRefinements[operator] !== void 0 && currentRefinements[operator].includes(value);
}
function removeEmptyRefinementsFromUiState4(indexUiState, attribute) {
  if (!indexUiState.numericMenu) {
    return indexUiState;
  }
  if (indexUiState.numericMenu[attribute] === ":") {
    delete indexUiState.numericMenu[attribute];
  }
  if (Object.keys(indexUiState.numericMenu).length === 0) {
    delete indexUiState.numericMenu;
  }
  return indexUiState;
}
var connectNumericMenu_default = connectNumericMenu;

// node_modules/react-instantsearch-core/dist/es/connectors/useNumericMenu.js
function useNumericMenu(props, additionalWidgetProperties) {
  return useConnector(connectNumericMenu_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/pagination/Paginator.js
function _typeof41(obj) {
  "@babel/helpers - typeof";
  return _typeof41 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof41(obj);
}
function _classCallCheck3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey36(descriptor.key), descriptor);
  }
}
function _createClass3(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties3(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties3(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty36(obj, key, value) {
  key = _toPropertyKey36(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey36(arg) {
  var key = _toPrimitive36(arg, "string");
  return _typeof41(key) === "symbol" ? key : String(key);
}
function _toPrimitive36(input, hint) {
  if (_typeof41(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof41(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var Paginator = function() {
  function Paginator2(params) {
    _classCallCheck3(this, Paginator2);
    _defineProperty36(this, "currentPage", void 0);
    _defineProperty36(this, "total", void 0);
    _defineProperty36(this, "padding", void 0);
    this.currentPage = params.currentPage;
    this.total = params.total;
    this.padding = params.padding;
  }
  _createClass3(Paginator2, [{
    key: "pages",
    value: function pages() {
      var total = this.total, currentPage = this.currentPage, padding = this.padding;
      if (total === 0) return [0];
      var totalDisplayedPages = this.nbPagesDisplayed(padding, total);
      if (totalDisplayedPages === total) {
        return range({
          end: total
        });
      }
      var paddingLeft = this.calculatePaddingLeft(currentPage, padding, total, totalDisplayedPages);
      var paddingRight = totalDisplayedPages - paddingLeft;
      var first = currentPage - paddingLeft;
      var last = currentPage + paddingRight;
      return range({
        start: first,
        end: last
      });
    }
  }, {
    key: "nbPagesDisplayed",
    value: function nbPagesDisplayed(padding, total) {
      return Math.min(2 * padding + 1, total);
    }
  }, {
    key: "calculatePaddingLeft",
    value: function calculatePaddingLeft(current, padding, total, totalDisplayedPages) {
      if (current <= padding) {
        return current;
      }
      if (current >= total - padding) {
        return totalDisplayedPages - (total - current);
      }
      return padding;
    }
  }, {
    key: "isLastPage",
    value: function isLastPage() {
      return this.currentPage >= this.total - 1;
    }
  }, {
    key: "isFirstPage",
    value: function isFirstPage() {
      return this.currentPage <= 0;
    }
  }]);
  return Paginator2;
}();
var Paginator_default = Paginator;

// node_modules/instantsearch.js/es/connectors/pagination/connectPagination.js
function _typeof42(obj) {
  "@babel/helpers - typeof";
  return _typeof42 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof42(obj);
}
function ownKeys35(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread35(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys35(Object(source), true).forEach(function(key) {
      _defineProperty37(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys35(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty37(obj, key, value) {
  key = _toPropertyKey37(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey37(arg) {
  var key = _toPrimitive37(arg, "string");
  return _typeof42(key) === "symbol" ? key : String(key);
}
function _toPrimitive37(input, hint) {
  if (_typeof42(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof42(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage16 = createDocumentationMessageGenerator({
  name: "pagination",
  connector: true
});
var connectPagination = function connectPagination2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage16());
  return function(widgetParams) {
    var _ref = widgetParams || {}, totalPages = _ref.totalPages, _ref$padding = _ref.padding, padding = _ref$padding === void 0 ? 3 : _ref$padding;
    var pager = new Paginator_default({
      currentPage: 0,
      total: 0,
      padding
    });
    var connectorState = {};
    function getMaxPage(_ref22) {
      var nbPages = _ref22.nbPages;
      return totalPages !== void 0 ? Math.min(totalPages, nbPages) : nbPages;
    }
    return {
      $$type: "ais.pagination",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread35(_objectSpread35({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread35(_objectSpread35({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        return state.setQueryParameter("page", void 0);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref42) {
        var searchParameters = _ref42.searchParameters;
        var page = searchParameters.page || 0;
        if (!page) {
          return uiState;
        }
        return _objectSpread35(_objectSpread35({}, uiState), {}, {
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        var page = uiState.page ? uiState.page - 1 : 0;
        return searchParameters.setQueryParameter("page", page);
      },
      getWidgetRenderState: function getWidgetRenderState(_ref62) {
        var results = _ref62.results, helper = _ref62.helper, state = _ref62.state, createURL = _ref62.createURL;
        if (!connectorState.refine) {
          connectorState.refine = function(page2) {
            helper.setPage(page2);
            helper.search();
          };
        }
        if (!connectorState.createURL) {
          connectorState.createURL = function(page2) {
            return createURL(function(uiState) {
              return _objectSpread35(_objectSpread35({}, uiState), {}, {
                page: page2 + 1
              });
            });
          };
        }
        var page = state.page || 0;
        var nbPages = getMaxPage(results || {
          nbPages: 0
        });
        pager.currentPage = page;
        pager.total = nbPages;
        return {
          createURL: connectorState.createURL,
          refine: connectorState.refine,
          canRefine: nbPages > 1,
          currentRefinement: page,
          nbHits: (results === null || results === void 0 ? void 0 : results.nbHits) || 0,
          nbPages,
          pages: results ? pager.pages() : [],
          isFirstPage: pager.isFirstPage(),
          isLastPage: pager.isLastPage(),
          widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread35(_objectSpread35({}, renderState), {}, {
          pagination: this.getWidgetRenderState(renderOptions)
        });
      }
    };
  };
};
var connectPagination_default = connectPagination;

// node_modules/react-instantsearch-core/dist/es/connectors/usePagination.js
function usePagination(props, additionalWidgetProperties) {
  return useConnector(connectPagination_default, props, additionalWidgetProperties);
}

// node_modules/react-instantsearch-core/dist/es/connectors/usePoweredBy.js
function usePoweredBy() {
  var hostname = safelyRunOnBrowser(function(_ref) {
    var _window$location;
    var window2 = _ref.window;
    return ((_window$location = window2.location) === null || _window$location === void 0 ? void 0 : _window$location.hostname) || "";
  }, {
    fallback: function fallback() {
      return "";
    }
  });
  return {
    url: "https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=".concat(hostname, "&utm_campaign=poweredby")
  };
}

// node_modules/instantsearch.js/es/connectors/query-rules/connectQueryRules.js
function _typeof43(obj) {
  "@babel/helpers - typeof";
  return _typeof43 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof43(obj);
}
function ownKeys36(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread36(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys36(Object(source), true).forEach(function(key) {
      _defineProperty38(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys36(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty38(obj, key, value) {
  key = _toPropertyKey38(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey38(arg) {
  var key = _toPrimitive38(arg, "string");
  return _typeof43(key) === "symbol" ? key : String(key);
}
function _toPrimitive38(input, hint) {
  if (_typeof43(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof43(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toConsumableArray9(arr) {
  return _arrayWithoutHoles9(arr) || _iterableToArray9(arr) || _unsupportedIterableToArray20(arr) || _nonIterableSpread9();
}
function _nonIterableSpread9() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray20(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray20(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray20(o, minLen);
}
function _iterableToArray9(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles9(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray20(arr);
}
function _arrayLikeToArray20(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var withUsage17 = createDocumentationMessageGenerator({
  name: "query-rules",
  connector: true
});
function hasStateRefinements(state) {
  return [state.disjunctiveFacetsRefinements, state.facetsRefinements, state.hierarchicalFacetsRefinements, state.numericRefinements].some(function(refinement) {
    return Boolean(refinement && Object.keys(refinement).length > 0);
  });
}
function escapeRuleContext(ruleName) {
  return ruleName.replace(/[^a-z0-9-_]+/gi, "_");
}
function getRuleContextsFromTrackedFilters(_ref) {
  var helper = _ref.helper, sharedHelperState = _ref.sharedHelperState, trackedFilters = _ref.trackedFilters;
  var ruleContexts = Object.keys(trackedFilters).reduce(function(facets, facetName) {
    var facetRefinements = getRefinements(helper.lastResults || {}, sharedHelperState, true).filter(function(refinement) {
      return refinement.attribute === facetName;
    }).map(function(refinement) {
      return refinement.numericValue || refinement.name;
    });
    var getTrackedFacetValues = trackedFilters[facetName];
    var trackedFacetValues = getTrackedFacetValues(facetRefinements);
    return [].concat(_toConsumableArray9(facets), _toConsumableArray9(facetRefinements.filter(function(facetRefinement) {
      return trackedFacetValues.includes(facetRefinement);
    }).map(function(facetValue) {
      return escapeRuleContext("ais-".concat(facetName, "-").concat(facetValue));
    })));
  }, []);
  return ruleContexts;
}
function applyRuleContexts(event) {
  var helper = this.helper, initialRuleContexts = this.initialRuleContexts, trackedFilters = this.trackedFilters, transformRuleContexts = this.transformRuleContexts;
  var sharedHelperState = event.state;
  var previousRuleContexts = sharedHelperState.ruleContexts || [];
  var newRuleContexts = getRuleContextsFromTrackedFilters({
    helper,
    sharedHelperState,
    trackedFilters
  });
  var nextRuleContexts = [].concat(_toConsumableArray9(initialRuleContexts), _toConsumableArray9(newRuleContexts));
  true ? _warning(nextRuleContexts.length <= 10, "\nThe maximum number of `ruleContexts` is 10. They have been sliced to that limit.\nConsider using `transformRuleContexts` to minimize the number of rules sent to Algolia.\n") : void 0;
  var ruleContexts = transformRuleContexts(nextRuleContexts).slice(0, 10);
  if (!isEqual(previousRuleContexts, ruleContexts)) {
    helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread36(_objectSpread36({}, sharedHelperState), {}, {
      ruleContexts
    }));
  }
}
var connectQueryRules = function connectQueryRules2(_render) {
  var unmount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(_render, withUsage17());
  return function(widgetParams) {
    var _ref22 = widgetParams || {}, _ref2$trackedFilters = _ref22.trackedFilters, trackedFilters = _ref2$trackedFilters === void 0 ? {} : _ref2$trackedFilters, _ref2$transformRuleCo = _ref22.transformRuleContexts, transformRuleContexts = _ref2$transformRuleCo === void 0 ? function(rules) {
      return rules;
    } : _ref2$transformRuleCo, _ref2$transformItems = _ref22.transformItems, transformItems = _ref2$transformItems === void 0 ? function(items) {
      return items;
    } : _ref2$transformItems;
    Object.keys(trackedFilters).forEach(function(facetName) {
      if (typeof trackedFilters[facetName] !== "function") {
        throw new Error(withUsage17(`'The "`.concat(facetName, '" filter value in the `trackedFilters` option expects a function.')));
      }
    });
    var hasTrackedFilters = Object.keys(trackedFilters).length > 0;
    var initialRuleContexts = [];
    var onHelperChange;
    return {
      $$type: "ais.queryRules",
      init: function init(initOptions) {
        var helper = initOptions.helper, state = initOptions.state, instantSearchInstance = initOptions.instantSearchInstance;
        initialRuleContexts = state.ruleContexts || [];
        onHelperChange = applyRuleContexts.bind({
          helper,
          initialRuleContexts,
          trackedFilters,
          transformRuleContexts
        });
        if (hasTrackedFilters) {
          if (hasStateRefinements(state) || Boolean(widgetParams.transformRuleContexts)) {
            onHelperChange({
              state
            });
          }
          helper.on("change", onHelperChange);
        }
        _render(_objectSpread36(_objectSpread36({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        _render(_objectSpread36(_objectSpread36({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var results = _ref3.results;
        var _ref42 = results || {}, _ref4$userData = _ref42.userData, userData = _ref4$userData === void 0 ? [] : _ref4$userData;
        var items = transformItems(userData, {
          results
        });
        return {
          items,
          widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread36(_objectSpread36({}, renderState), {}, {
          queryRules: this.getWidgetRenderState(renderOptions)
        });
      },
      dispose: function dispose(_ref5) {
        var helper = _ref5.helper, state = _ref5.state;
        unmount();
        if (hasTrackedFilters) {
          helper.removeListener("change", onHelperChange);
          return state.setQueryParameter("ruleContexts", initialRuleContexts);
        }
        return state;
      }
    };
  };
};
var connectQueryRules_default = connectQueryRules;

// node_modules/react-instantsearch-core/dist/es/connectors/useQueryRules.js
function useQueryRules(props, additionalWidgetProperties) {
  return useConnector(connectQueryRules_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/range/connectRange.js
function _typeof44(obj) {
  "@babel/helpers - typeof";
  return _typeof44 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof44(obj);
}
function ownKeys37(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread37(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys37(Object(source), true).forEach(function(key) {
      _defineProperty39(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys37(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty39(obj, key, value) {
  key = _toPropertyKey39(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey39(arg) {
  var key = _toPrimitive39(arg, "string");
  return _typeof44(key) === "symbol" ? key : String(key);
}
function _toPrimitive39(input, hint) {
  if (_typeof44(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof44(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray14(arr, i) {
  return _arrayWithHoles14(arr) || _iterableToArrayLimit14(arr, i) || _unsupportedIterableToArray21(arr, i) || _nonIterableRest14();
}
function _nonIterableRest14() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray21(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray21(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray21(o, minLen);
}
function _arrayLikeToArray21(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit14(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles14(arr) {
  if (Array.isArray(arr)) return arr;
}
var withUsage18 = createDocumentationMessageGenerator({
  name: "range-input",
  connector: true
}, {
  name: "range-slider",
  connector: true
});
var $$type3 = "ais.range";
function toPrecision(_ref) {
  var min = _ref.min, max = _ref.max, precision = _ref.precision;
  var pow = Math.pow(10, precision);
  return {
    min: min ? Math.floor(min * pow) / pow : min,
    max: max ? Math.ceil(max * pow) / pow : max
  };
}
var connectRange = function connectRange2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage18());
  return function(widgetParams) {
    var _ref22 = widgetParams || {}, _ref2$attribute = _ref22.attribute, attribute = _ref2$attribute === void 0 ? "" : _ref2$attribute, minBound = _ref22.min, maxBound = _ref22.max, _ref2$precision = _ref22.precision, precision = _ref2$precision === void 0 ? 0 : _ref2$precision;
    if (!attribute) {
      throw new Error(withUsage18("The `attribute` option is required."));
    }
    if (isFiniteNumber(minBound) && isFiniteNumber(maxBound) && minBound > maxBound) {
      throw new Error(withUsage18("The `max` option can't be lower than `min`."));
    }
    var formatToNumber = function formatToNumber2(v) {
      return Number(Number(v).toFixed(precision));
    };
    var rangeFormatter = {
      from: function from(v) {
        return v.toLocaleString();
      },
      to: function to(v) {
        return formatToNumber(v).toLocaleString();
      }
    };
    var getRefinedState2 = function getRefinedState3(helper, currentRange, nextMin, nextMax) {
      var resolvedState = helper.state;
      var currentRangeMin = currentRange.min, currentRangeMax = currentRange.max;
      var _ref3 = resolvedState.getNumericRefinement(attribute, ">=") || [], _ref42 = _slicedToArray14(_ref3, 1), min = _ref42[0];
      var _ref5 = resolvedState.getNumericRefinement(attribute, "<=") || [], _ref62 = _slicedToArray14(_ref5, 1), max = _ref62[0];
      var isResetMin = nextMin === void 0 || nextMin === "";
      var isResetMax = nextMax === void 0 || nextMax === "";
      var _toPrecision = toPrecision({
        min: !isResetMin ? parseFloat(nextMin) : void 0,
        max: !isResetMax ? parseFloat(nextMax) : void 0,
        precision
      }), nextMinAsNumber = _toPrecision.min, nextMaxAsNumber = _toPrecision.max;
      var newNextMin;
      if (!isFiniteNumber(minBound) && currentRangeMin === nextMinAsNumber) {
        newNextMin = void 0;
      } else if (isFiniteNumber(minBound) && isResetMin) {
        newNextMin = minBound;
      } else {
        newNextMin = nextMinAsNumber;
      }
      var newNextMax;
      if (!isFiniteNumber(maxBound) && currentRangeMax === nextMaxAsNumber) {
        newNextMax = void 0;
      } else if (isFiniteNumber(maxBound) && isResetMax) {
        newNextMax = maxBound;
      } else {
        newNextMax = nextMaxAsNumber;
      }
      var isResetNewNextMin = newNextMin === void 0;
      var isGreaterThanCurrentRange = isFiniteNumber(currentRangeMin) && currentRangeMin <= newNextMin;
      var isMinValid = isResetNewNextMin || isFiniteNumber(newNextMin) && (!isFiniteNumber(currentRangeMin) || isGreaterThanCurrentRange);
      var isResetNewNextMax = newNextMax === void 0;
      var isLowerThanRange = isFiniteNumber(newNextMax) && currentRangeMax >= newNextMax;
      var isMaxValid = isResetNewNextMax || isFiniteNumber(newNextMax) && (!isFiniteNumber(currentRangeMax) || isLowerThanRange);
      var hasMinChange = min !== newNextMin;
      var hasMaxChange = max !== newNextMax;
      if ((hasMinChange || hasMaxChange) && isMinValid && isMaxValid) {
        resolvedState = resolvedState.removeNumericRefinement(attribute);
        if (isFiniteNumber(newNextMin)) {
          resolvedState = resolvedState.addNumericRefinement(attribute, ">=", newNextMin);
        }
        if (isFiniteNumber(newNextMax)) {
          resolvedState = resolvedState.addNumericRefinement(attribute, "<=", newNextMax);
        }
        return resolvedState.resetPage();
      }
      return null;
    };
    var createSendEvent5 = function createSendEvent6(instantSearchInstance) {
      return function() {
        if (arguments.length === 1) {
          instantSearchInstance.sendEventToInsights(arguments.length <= 0 ? void 0 : arguments[0]);
          return;
        }
      };
    };
    function _getCurrentRange(stats) {
      var min;
      if (isFiniteNumber(minBound)) {
        min = minBound;
      } else if (isFiniteNumber(stats.min)) {
        min = stats.min;
      } else {
        min = 0;
      }
      var max;
      if (isFiniteNumber(maxBound)) {
        max = maxBound;
      } else if (isFiniteNumber(stats.max)) {
        max = stats.max;
      } else {
        max = 0;
      }
      return toPrecision({
        min,
        max,
        precision
      });
    }
    function _getCurrentRefinement(helper) {
      var _ref7 = helper.getNumericRefinement(attribute, ">=") || [], _ref8 = _slicedToArray14(_ref7, 1), minValue = _ref8[0];
      var _ref9 = helper.getNumericRefinement(attribute, "<=") || [], _ref10 = _slicedToArray14(_ref9, 1), maxValue = _ref10[0];
      var min = isFiniteNumber(minValue) ? minValue : -Infinity;
      var max = isFiniteNumber(maxValue) ? maxValue : Infinity;
      return [min, max];
    }
    function _refine(helper, currentRange) {
      return function() {
        var _ref11 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [void 0, void 0], _ref12 = _slicedToArray14(_ref11, 2), nextMin = _ref12[0], nextMax = _ref12[1];
        var refinedState = getRefinedState2(helper, currentRange, nextMin, nextMax);
        if (refinedState) {
          helper.setState(refinedState).search();
        }
      };
    }
    return {
      $$type: $$type3,
      init: function init(initOptions) {
        renderFn(_objectSpread37(_objectSpread37({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread37(_objectSpread37({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread37(_objectSpread37({}, renderState), {}, {
          range: _objectSpread37(_objectSpread37({}, renderState.range), {}, _defineProperty39({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref13) {
        var results = _ref13.results, helper = _ref13.helper, instantSearchInstance = _ref13.instantSearchInstance;
        var facetsFromResults = results && results.disjunctiveFacets || [];
        var facet = find(facetsFromResults, function(facetResult) {
          return facetResult.name === attribute;
        });
        var stats = facet && facet.stats || {
          min: void 0,
          max: void 0
        };
        var currentRange = _getCurrentRange(stats);
        var start = _getCurrentRefinement(helper);
        var refine;
        if (!results) {
          refine = _refine(helper, {
            min: void 0,
            max: void 0
          });
        } else {
          refine = _refine(helper, currentRange);
        }
        return {
          refine,
          canRefine: currentRange.min !== currentRange.max,
          format: rangeFormatter,
          range: currentRange,
          sendEvent: createSendEvent5(instantSearchInstance),
          widgetParams: _objectSpread37(_objectSpread37({}, widgetParams), {}, {
            precision
          }),
          start
        };
      },
      dispose: function dispose(_ref14) {
        var state = _ref14.state;
        unmountFn();
        return state.removeDisjunctiveFacet(attribute).removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref15) {
        var searchParameters = _ref15.searchParameters;
        var _searchParameters$get = searchParameters.getNumericRefinements(attribute), _searchParameters$get2 = _searchParameters$get[">="], min = _searchParameters$get2 === void 0 ? [] : _searchParameters$get2, _searchParameters$get3 = _searchParameters$get["<="], max = _searchParameters$get3 === void 0 ? [] : _searchParameters$get3;
        if (min.length === 0 && max.length === 0) {
          return uiState;
        }
        return _objectSpread37(_objectSpread37({}, uiState), {}, {
          range: _objectSpread37(_objectSpread37({}, uiState.range), {}, _defineProperty39({}, attribute, "".concat(min, ":").concat(max)))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref16) {
        var uiState = _ref16.uiState;
        var widgetSearchParameters = searchParameters.addDisjunctiveFacet(attribute).setQueryParameters({
          numericRefinements: _objectSpread37(_objectSpread37({}, searchParameters.numericRefinements), {}, _defineProperty39({}, attribute, {}))
        });
        if (isFiniteNumber(minBound)) {
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, ">=", minBound);
        }
        if (isFiniteNumber(maxBound)) {
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, "<=", maxBound);
        }
        var value = uiState.range && uiState.range[attribute];
        if (!value || value.indexOf(":") === -1) {
          return widgetSearchParameters;
        }
        var _value$split$map = value.split(":").map(parseFloat), _value$split$map2 = _slicedToArray14(_value$split$map, 2), lowerBound = _value$split$map2[0], upperBound = _value$split$map2[1];
        if (isFiniteNumber(lowerBound) && (!isFiniteNumber(minBound) || minBound < lowerBound)) {
          widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, ">=");
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, ">=", lowerBound);
        }
        if (isFiniteNumber(upperBound) && (!isFiniteNumber(maxBound) || upperBound < maxBound)) {
          widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, "<=");
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, "<=", upperBound);
        }
        return widgetSearchParameters;
      }
    };
  };
};
var connectRange_default = connectRange;

// node_modules/react-instantsearch-core/dist/es/connectors/useRange.js
function useRange(props, additionalWidgetProperties) {
  return useConnector(connectRange_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/refinement-list/connectRefinementList.js
function _typeof45(obj) {
  "@babel/helpers - typeof";
  return _typeof45 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof45(obj);
}
var _excluded12 = ["name", "escapedValue"];
var _excluded25 = ["escapedValue", "value"];
function ownKeys38(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread38(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys38(Object(source), true).forEach(function(key) {
      _defineProperty40(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys38(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty40(obj, key, value) {
  key = _toPropertyKey40(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey40(arg) {
  var key = _toPrimitive40(arg, "string");
  return _typeof45(key) === "symbol" ? key : String(key);
}
function _toPrimitive40(input, hint) {
  if (_typeof45(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof45(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties12(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose12(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose12(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var withUsage19 = createDocumentationMessageGenerator({
  name: "refinement-list",
  connector: true
});
var DEFAULT_SORT3 = ["isRefined", "count:desc", "name:asc"];
var connectRefinementList = function connectRefinementList2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage19());
  return function(widgetParams) {
    var _ref = widgetParams || {}, attribute = _ref.attribute, _ref$operator = _ref.operator, operator = _ref$operator === void 0 ? "or" : _ref$operator, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$showMore = _ref.showMore, showMore = _ref$showMore === void 0 ? false : _ref$showMore, _ref$showMoreLimit = _ref.showMoreLimit, showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit, _ref$sortBy = _ref.sortBy, sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT3 : _ref$sortBy, _ref$escapeFacetValue = _ref.escapeFacetValues, escapeFacetValues = _ref$escapeFacetValue === void 0 ? true : _ref$escapeFacetValue, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!attribute) {
      throw new Error(withUsage19("The `attribute` option is required."));
    }
    if (!/^(and|or)$/.test(operator)) {
      throw new Error(withUsage19('The `operator` must one of: `"and"`, `"or"` (got "'.concat(operator, '").')));
    }
    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage19("`showMoreLimit` should be greater than `limit`."));
    }
    var formatItems = function formatItems2(_ref22) {
      var label = _ref22.name, value = _ref22.escapedValue, item = _objectWithoutProperties12(_ref22, _excluded12);
      return _objectSpread38(_objectSpread38({}, item), {}, {
        value,
        label,
        highlighted: label
      });
    };
    var lastResultsFromMainSearch;
    var lastItemsFromMainSearch = [];
    var hasExhaustiveItems = true;
    var triggerRefine;
    var sendEvent;
    var isShowingMore = false;
    var toggleShowMore = function toggleShowMore2() {
    };
    function cachedToggleShowMore() {
      toggleShowMore();
    }
    function createToggleShowMore(renderOptions, widget) {
      return function() {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }
    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }
    var searchForFacetValues = function searchForFacetValues2() {
      return function() {
      };
    };
    var createSearchForFacetValues = function createSearchForFacetValues2(helper, widget) {
      return function(renderOptions) {
        return function(query) {
          var instantSearchInstance = renderOptions.instantSearchInstance, searchResults = renderOptions.results;
          if (query === "" && lastItemsFromMainSearch) {
            renderFn(_objectSpread38(_objectSpread38({}, widget.getWidgetRenderState(_objectSpread38(_objectSpread38({}, renderOptions), {}, {
              results: lastResultsFromMainSearch
            }))), {}, {
              instantSearchInstance
            }), false);
          } else {
            var tags = {
              highlightPreTag: escapeFacetValues ? TAG_PLACEHOLDER.highlightPreTag : TAG_REPLACEMENT.highlightPreTag,
              highlightPostTag: escapeFacetValues ? TAG_PLACEHOLDER.highlightPostTag : TAG_REPLACEMENT.highlightPostTag
            };
            helper.searchForFacetValues(
              attribute,
              query,
              // We cap the `maxFacetHits` value to 100 because the Algolia API
              // doesn't support a greater number.
              // See https://www.algolia.com/doc/api-reference/api-parameters/maxFacetHits/
              Math.min(getLimit(), 100),
              tags
            ).then(function(results) {
              var facetValues = escapeFacetValues ? escapeFacets(results.facetHits) : results.facetHits;
              var normalizedFacetValues = transformItems(facetValues.map(function(_ref3) {
                var escapedValue = _ref3.escapedValue, value = _ref3.value, item = _objectWithoutProperties12(_ref3, _excluded25);
                return _objectSpread38(_objectSpread38({}, item), {}, {
                  value: escapedValue,
                  label: value
                });
              }), {
                results: searchResults
              });
              renderFn(_objectSpread38(_objectSpread38({}, widget.getWidgetRenderState(_objectSpread38(_objectSpread38({}, renderOptions), {}, {
                results: lastResultsFromMainSearch
              }))), {}, {
                items: normalizedFacetValues,
                canToggleShowMore: false,
                canRefine: true,
                isFromSearch: true,
                instantSearchInstance
              }), false);
            });
          }
        };
      };
    };
    return {
      $$type: "ais.refinementList",
      init: function init(initOptions) {
        renderFn(_objectSpread38(_objectSpread38({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread38(_objectSpread38({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread38(_objectSpread38({}, renderState), {}, {
          refinementList: _objectSpread38(_objectSpread38({}, renderState.refinementList), {}, _defineProperty40({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var _this = this;
        var results = renderOptions.results, state = renderOptions.state, _createURL = renderOptions.createURL, instantSearchInstance = renderOptions.instantSearchInstance, helper = renderOptions.helper;
        var items = [];
        var facetValues = [];
        if (!sendEvent || !triggerRefine || !searchForFacetValues) {
          sendEvent = createSendEventForFacet({
            instantSearchInstance,
            helper,
            attribute,
            widgetType: this.$$type
          });
          triggerRefine = function triggerRefine2(facetValue) {
            sendEvent("click:internal", facetValue);
            helper.toggleFacetRefinement(attribute, facetValue).search();
          };
          searchForFacetValues = createSearchForFacetValues(helper, this);
        }
        if (results) {
          var values = results.getFacetValues(attribute, {
            sortBy,
            facetOrdering: sortBy === DEFAULT_SORT3
          });
          facetValues = values && Array.isArray(values) ? values : [];
          items = transformItems(facetValues.slice(0, getLimit()).map(formatItems), {
            results
          });
          var maxValuesPerFacetConfig = state.maxValuesPerFacet;
          var currentLimit = getLimit();
          hasExhaustiveItems = maxValuesPerFacetConfig > currentLimit ? facetValues.length <= currentLimit : facetValues.length < currentLimit;
          lastResultsFromMainSearch = results;
          lastItemsFromMainSearch = items;
          if (renderOptions.results) {
            toggleShowMore = createToggleShowMore(renderOptions, this);
          }
        }
        var searchFacetValues = searchForFacetValues && searchForFacetValues(renderOptions);
        var canShowLess = isShowingMore && lastItemsFromMainSearch.length > limit;
        var canShowMore = showMore && !hasExhaustiveItems;
        var canToggleShowMore = canShowLess || canShowMore;
        return {
          createURL: function createURL(facetValue) {
            return _createURL(function(uiState) {
              return _this.getWidgetUiState(uiState, {
                searchParameters: state.resetPage().toggleFacetRefinement(attribute, facetValue),
                helper
              });
            });
          },
          items,
          refine: triggerRefine,
          searchForItems: searchFacetValues,
          isFromSearch: false,
          canRefine: items.length > 0,
          widgetParams,
          isShowingMore,
          canToggleShowMore,
          toggleShowMore: cachedToggleShowMore,
          sendEvent,
          hasExhaustiveItems
        };
      },
      dispose: function dispose(_ref42) {
        var state = _ref42.state;
        unmountFn();
        var withoutMaxValuesPerFacet = state.setQueryParameter("maxValuesPerFacet", void 0);
        if (operator === "and") {
          return withoutMaxValuesPerFacet.removeFacet(attribute);
        }
        return withoutMaxValuesPerFacet.removeDisjunctiveFacet(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var values = operator === "or" ? searchParameters.getDisjunctiveRefinements(attribute) : searchParameters.getConjunctiveRefinements(attribute);
        return removeEmptyRefinementsFromUiState5(_objectSpread38(_objectSpread38({}, uiState), {}, {
          refinementList: _objectSpread38(_objectSpread38({}, uiState.refinementList), {}, _defineProperty40({}, attribute, values))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref62) {
        var uiState = _ref62.uiState;
        var isDisjunctive = operator === "or";
        if (searchParameters.isHierarchicalFacet(attribute)) {
          true ? _warning(false, 'RefinementList: Attribute "'.concat(attribute, '" is already used by another widget applying hierarchical faceting.\nAs this is not supported, please make sure to remove this other widget or this RefinementList widget will not work at all.')) : void 0;
          return searchParameters;
        }
        if (isDisjunctive && searchParameters.isConjunctiveFacet(attribute) || !isDisjunctive && searchParameters.isDisjunctiveFacet(attribute)) {
          true ? _warning(false, 'RefinementList: Attribute "'.concat(attribute, '" is used by another refinement list with a different operator.\nAs this is not supported, please make sure to only use this attribute with one of the two operators.')) : void 0;
          return searchParameters;
        }
        var values = uiState.refinementList && uiState.refinementList[attribute];
        var withFacetConfiguration = isDisjunctive ? searchParameters.addDisjunctiveFacet(attribute).removeDisjunctiveFacetRefinement(attribute) : searchParameters.addFacet(attribute).removeFacetRefinement(attribute);
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter("maxValuesPerFacet", nextMaxValuesPerFacet);
        if (!values) {
          var key = isDisjunctive ? "disjunctiveFacetsRefinements" : "facetsRefinements";
          return withMaxValuesPerFacet.setQueryParameters(_defineProperty40({}, key, _objectSpread38(_objectSpread38({}, withMaxValuesPerFacet[key]), {}, _defineProperty40({}, attribute, []))));
        }
        return values.reduce(function(parameters, value) {
          return isDisjunctive ? parameters.addDisjunctiveFacetRefinement(attribute, value) : parameters.addFacetRefinement(attribute, value);
        }, withMaxValuesPerFacet);
      }
    };
  };
};
function removeEmptyRefinementsFromUiState5(indexUiState, attribute) {
  if (!indexUiState.refinementList) {
    return indexUiState;
  }
  if (!indexUiState.refinementList[attribute] || indexUiState.refinementList[attribute].length === 0) {
    delete indexUiState.refinementList[attribute];
  }
  if (Object.keys(indexUiState.refinementList).length === 0) {
    delete indexUiState.refinementList;
  }
  return indexUiState;
}
var connectRefinementList_default = connectRefinementList;

// node_modules/react-instantsearch-core/dist/es/connectors/useRefinementList.js
function useRefinementList(props, additionalWidgetProperties) {
  return useConnector(connectRefinementList_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/related-products/connectRelatedProducts.js
function _typeof46(obj) {
  "@babel/helpers - typeof";
  return _typeof46 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof46(obj);
}
function ownKeys39(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread39(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys39(Object(source), true).forEach(function(key) {
      _defineProperty41(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys39(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty41(obj, key, value) {
  key = _toPropertyKey41(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey41(arg) {
  var key = _toPrimitive41(arg, "string");
  return _typeof46(key) === "symbol" ? key : String(key);
}
function _toPrimitive41(input, hint) {
  if (_typeof46(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof46(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage20 = createDocumentationMessageGenerator({
  name: "related-products",
  connector: true
});
var connectRelatedProducts_default = function connectRelatedProducts(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage20());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$escapeHTML = _ref.escapeHTML, escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML, objectIDs = _ref.objectIDs, limit = _ref.limit, threshold = _ref.threshold, fallbackParameters = _ref.fallbackParameters, queryParameters = _ref.queryParameters, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!objectIDs || objectIDs.length === 0) {
      throw new Error(withUsage20("The `objectIDs` option is required."));
    }
    return {
      dependsOn: "recommend",
      $$type: "ais.relatedProducts",
      init: function init(initOptions) {
        renderFn(_objectSpread39(_objectSpread39({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var renderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread39(_objectSpread39({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState) {
        return renderState;
      },
      getWidgetRenderState: function getWidgetRenderState(_ref22) {
        var results = _ref22.results;
        if (results === null || results === void 0) {
          return {
            items: [],
            widgetParams
          };
        }
        if (escapeHTML && results.hits.length > 0) {
          results.hits = escapeHits(results.hits);
        }
        return {
          items: transformItems(results.hits, {
            results
          }),
          widgetParams
        };
      },
      dispose: function dispose(_ref3) {
        var recommendState = _ref3.recommendState;
        unmountFn();
        return recommendState.removeParams(this.$$id);
      },
      getWidgetParameters: function getWidgetParameters(state) {
        var _this = this;
        return objectIDs.reduce(function(acc, objectID) {
          return acc.addRelatedProducts({
            objectID,
            maxRecommendations: limit,
            threshold,
            fallbackParameters: _objectSpread39(_objectSpread39({}, fallbackParameters), escapeHTML ? TAG_PLACEHOLDER : {}),
            queryParameters: _objectSpread39(_objectSpread39({}, queryParameters), escapeHTML ? TAG_PLACEHOLDER : {}),
            $$id: _this.$$id
          });
        }, state.removeParams(this.$$id));
      }
    };
  };
};

// node_modules/react-instantsearch-core/dist/es/connectors/useRelatedProducts.js
function useRelatedProducts(props, additionalWidgetProperties) {
  return useConnector(connectRelatedProducts_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/search-box/connectSearchBox.js
function _typeof47(obj) {
  "@babel/helpers - typeof";
  return _typeof47 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof47(obj);
}
function ownKeys40(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread40(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys40(Object(source), true).forEach(function(key) {
      _defineProperty42(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys40(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty42(obj, key, value) {
  key = _toPropertyKey42(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey42(arg) {
  var key = _toPrimitive42(arg, "string");
  return _typeof47(key) === "symbol" ? key : String(key);
}
function _toPrimitive42(input, hint) {
  if (_typeof47(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof47(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage21 = createDocumentationMessageGenerator({
  name: "search-box",
  connector: true
});
var defaultQueryHook = function defaultQueryHook2(query, hook) {
  return hook(query);
};
var connectSearchBox = function connectSearchBox2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage21());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$queryHook = _ref.queryHook, queryHook = _ref$queryHook === void 0 ? defaultQueryHook : _ref$queryHook;
    var _refine;
    var _clear;
    return {
      $$type: "ais.searchBox",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread40(_objectSpread40({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread40(_objectSpread40({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref22) {
        var state = _ref22.state;
        unmountFn();
        return state.setQueryParameter("query", void 0);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread40(_objectSpread40({}, renderState), {}, {
          searchBox: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var helper = _ref3.helper, instantSearchInstance = _ref3.instantSearchInstance, state = _ref3.state;
        if (!_refine) {
          _refine = function _refine2(query) {
            queryHook(query, function(q) {
              return helper.setQuery(q).search();
            });
          };
          _clear = function _clear2() {
            helper.setQuery("").search();
          };
        }
        return {
          query: state.query || "",
          refine: _refine,
          clear: _clear,
          widgetParams,
          isSearchStalled: instantSearchInstance.status === "stalled"
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref42) {
        var searchParameters = _ref42.searchParameters;
        var query = searchParameters.query || "";
        if (query === "" || uiState && uiState.query === query) {
          return uiState;
        }
        return _objectSpread40(_objectSpread40({}, uiState), {}, {
          query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        return searchParameters.setQueryParameter("query", uiState.query || "");
      }
    };
  };
};
var connectSearchBox_default = connectSearchBox;

// node_modules/react-instantsearch-core/dist/es/connectors/useSearchBox.js
function useSearchBox(props, additionalWidgetProperties) {
  return useConnector(connectSearchBox_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/sort-by/connectSortBy.js
function _typeof48(obj) {
  "@babel/helpers - typeof";
  return _typeof48 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof48(obj);
}
function ownKeys41(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread41(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys41(Object(source), true).forEach(function(key) {
      _defineProperty43(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys41(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty43(obj, key, value) {
  key = _toPropertyKey43(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey43(arg) {
  var key = _toPrimitive43(arg, "string");
  return _typeof48(key) === "symbol" ? key : String(key);
}
function _toPrimitive43(input, hint) {
  if (_typeof48(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof48(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage22 = createDocumentationMessageGenerator({
  name: "sort-by",
  connector: true
});
var connectSortBy = function connectSortBy2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage22());
  var connectorState = {};
  return function(widgetParams) {
    var _ref = widgetParams || {}, items = _ref.items, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(x) {
      return x;
    } : _ref$transformItems;
    if (!Array.isArray(items)) {
      throw new Error(withUsage22("The `items` option expects an array of objects."));
    }
    return {
      $$type: "ais.sortBy",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        var widgetRenderState = this.getWidgetRenderState(initOptions);
        var currentIndex = widgetRenderState.currentRefinement;
        var isCurrentIndexInItems = find(items, function(item) {
          return item.value === currentIndex;
        });
        true ? _warning(isCurrentIndexInItems !== void 0, 'The index named "'.concat(currentIndex, '" is not listed in the `items` of `sortBy`.')) : void 0;
        renderFn(_objectSpread41(_objectSpread41({}, widgetRenderState), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread41(_objectSpread41({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref22) {
        var state = _ref22.state;
        unmountFn();
        return connectorState.initialIndex ? state.setIndex(connectorState.initialIndex) : state;
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread41(_objectSpread41({}, renderState), {}, {
          sortBy: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var results = _ref3.results, helper = _ref3.helper, state = _ref3.state, parent = _ref3.parent;
        if (!connectorState.initialIndex && parent) {
          connectorState.initialIndex = parent.getIndexName();
        }
        if (!connectorState.setIndex) {
          connectorState.setIndex = function(indexName) {
            helper.setIndex(indexName).search();
          };
        }
        var hasNoResults = results ? results.nbHits === 0 : true;
        return {
          currentRefinement: state.index,
          options: transformItems(items, {
            results
          }),
          refine: connectorState.setIndex,
          hasNoResults,
          canRefine: !hasNoResults && items.length > 0,
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref42) {
        var searchParameters = _ref42.searchParameters;
        var currentIndex = searchParameters.index;
        return _objectSpread41(_objectSpread41({}, uiState), {}, {
          sortBy: currentIndex !== connectorState.initialIndex ? currentIndex : void 0
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        return searchParameters.setQueryParameter("index", uiState.sortBy || connectorState.initialIndex || searchParameters.index);
      }
    };
  };
};
var connectSortBy_default = connectSortBy;

// node_modules/react-instantsearch-core/dist/es/connectors/useSortBy.js
function useSortBy(props, additionalWidgetProperties) {
  return useConnector(connectSortBy_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/stats/connectStats.js
function _typeof49(obj) {
  "@babel/helpers - typeof";
  return _typeof49 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof49(obj);
}
function ownKeys42(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread42(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys42(Object(source), true).forEach(function(key) {
      _defineProperty44(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys42(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty44(obj, key, value) {
  key = _toPropertyKey44(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey44(arg) {
  var key = _toPrimitive44(arg, "string");
  return _typeof49(key) === "symbol" ? key : String(key);
}
function _toPrimitive44(input, hint) {
  if (_typeof49(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof49(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage23 = createDocumentationMessageGenerator({
  name: "stats",
  connector: true
});
var connectStats = function connectStats2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage23());
  return function(widgetParams) {
    return {
      $$type: "ais.stats",
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread42(_objectSpread42({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread42(_objectSpread42({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread42(_objectSpread42({}, renderState), {}, {
          stats: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref) {
        var results = _ref.results, state = _ref.state;
        if (!results) {
          return {
            hitsPerPage: state.hitsPerPage,
            nbHits: 0,
            nbSortedHits: void 0,
            areHitsSorted: false,
            nbPages: 0,
            page: state.page || 0,
            processingTimeMS: -1,
            query: state.query || "",
            widgetParams
          };
        }
        return {
          hitsPerPage: results.hitsPerPage,
          nbHits: results.nbHits,
          nbSortedHits: results.nbSortedHits,
          areHitsSorted: typeof results.appliedRelevancyStrictness !== "undefined" && results.appliedRelevancyStrictness > 0 && results.nbSortedHits !== results.nbHits,
          nbPages: results.nbPages,
          page: results.page,
          processingTimeMS: results.processingTimeMS,
          query: results.query,
          widgetParams
        };
      }
    };
  };
};
var connectStats_default = connectStats;

// node_modules/react-instantsearch-core/dist/es/connectors/useStats.js
function useStats(props, additionalWidgetProperties) {
  return useConnector(connectStats_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/toggle-refinement/connectToggleRefinement.js
function _typeof50(obj) {
  "@babel/helpers - typeof";
  return _typeof50 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof50(obj);
}
function ownKeys43(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread43(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys43(Object(source), true).forEach(function(key) {
      _defineProperty45(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys43(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty45(obj, key, value) {
  key = _toPropertyKey45(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey45(arg) {
  var key = _toPrimitive45(arg, "string");
  return _typeof50(key) === "symbol" ? key : String(key);
}
function _toPrimitive45(input, hint) {
  if (_typeof50(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof50(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray15(arr, i) {
  return _arrayWithHoles15(arr) || _iterableToArrayLimit15(arr, i) || _unsupportedIterableToArray22(arr, i) || _nonIterableRest15();
}
function _nonIterableRest15() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray22(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray22(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray22(o, minLen);
}
function _arrayLikeToArray22(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit15(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles15(arr) {
  if (Array.isArray(arr)) return arr;
}
var withUsage24 = createDocumentationMessageGenerator({
  name: "toggle-refinement",
  connector: true
});
var $$type4 = "ais.toggleRefinement";
var createSendEvent3 = function createSendEvent4(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance, helper = _ref.helper, attribute = _ref.attribute, on = _ref.on;
  var sendEventForToggle = function sendEventForToggle2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1) {
      instantSearchInstance.sendEventToInsights(args[0]);
      return;
    }
    var isRefined2 = args[1], _args$ = args[2], eventName = _args$ === void 0 ? "Filter Applied" : _args$;
    var _args$0$split = args[0].split(":"), _args$0$split2 = _slicedToArray15(_args$0$split, 2), eventType = _args$0$split2[0], eventModifier = _args$0$split2[1];
    if (eventType !== "click" || on === void 0) {
      return;
    }
    if (!isRefined2) {
      instantSearchInstance.sendEventToInsights({
        insightsMethod: "clickedFilters",
        widgetType: $$type4,
        eventType,
        eventModifier,
        payload: {
          eventName,
          index: helper.getIndex(),
          filters: on.map(function(value) {
            return "".concat(attribute, ":").concat(value);
          })
        },
        attribute
      });
    }
  };
  return sendEventForToggle;
};
var connectToggleRefinement = function connectToggleRefinement2(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage24());
  return function(widgetParams) {
    var _ref22 = widgetParams || {}, attribute = _ref22.attribute, _ref2$on = _ref22.on, userOn = _ref2$on === void 0 ? true : _ref2$on, userOff = _ref22.off;
    if (!attribute) {
      throw new Error(withUsage24("The `attribute` option is required."));
    }
    var hasAnOffValue = userOff !== void 0;
    var on = toArray(userOn).map(escapeFacetValue);
    var off = hasAnOffValue ? toArray(userOff).map(escapeFacetValue) : void 0;
    var sendEvent;
    var toggleRefinementFactory = function toggleRefinementFactory2(helper) {
      return function() {
        var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
          isRefined: false
        }, isRefined2 = _ref3.isRefined;
        if (!isRefined2) {
          sendEvent("click:internal", isRefined2);
          if (hasAnOffValue) {
            off.forEach(function(v) {
              return helper.removeDisjunctiveFacetRefinement(attribute, v);
            });
          }
          on.forEach(function(v) {
            return helper.addDisjunctiveFacetRefinement(attribute, v);
          });
        } else {
          on.forEach(function(v) {
            return helper.removeDisjunctiveFacetRefinement(attribute, v);
          });
          if (hasAnOffValue) {
            off.forEach(function(v) {
              return helper.addDisjunctiveFacetRefinement(attribute, v);
            });
          }
        }
        helper.search();
      };
    };
    var connectorState = {
      createURLFactory: function createURLFactory(isRefined2, _ref42) {
        var state = _ref42.state, createURL = _ref42.createURL, getWidgetUiState = _ref42.getWidgetUiState, helper = _ref42.helper;
        return function() {
          state = state.resetPage();
          var valuesToRemove = isRefined2 ? on : off;
          if (valuesToRemove) {
            valuesToRemove.forEach(function(v) {
              state = state.removeDisjunctiveFacetRefinement(attribute, v);
            });
          }
          var valuesToAdd = isRefined2 ? off : on;
          if (valuesToAdd) {
            valuesToAdd.forEach(function(v) {
              state = state.addDisjunctiveFacetRefinement(attribute, v);
            });
          }
          return createURL(function(uiState) {
            return getWidgetUiState(uiState, {
              searchParameters: state,
              helper
            });
          });
        };
      }
    };
    return {
      $$type: $$type4,
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread43(_objectSpread43({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread43(_objectSpread43({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref5) {
        var state = _ref5.state;
        unmountFn();
        return state.removeDisjunctiveFacet(attribute);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread43(_objectSpread43({}, renderState), {}, {
          toggleRefinement: _objectSpread43(_objectSpread43({}, renderState.toggleRefinement), {}, _defineProperty45({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref62) {
        var state = _ref62.state, helper = _ref62.helper, results = _ref62.results, createURL = _ref62.createURL, instantSearchInstance = _ref62.instantSearchInstance;
        var isRefined2 = results ? on.every(function(v) {
          return state.isDisjunctiveFacetRefined(attribute, v);
        }) : on.every(function(v) {
          return state.isDisjunctiveFacetRefined(attribute, v);
        });
        var onFacetValue = {
          isRefined: isRefined2,
          count: 0
        };
        var offFacetValue = {
          isRefined: hasAnOffValue && !isRefined2,
          count: 0
        };
        if (results) {
          var offValue = toArray(off || false);
          var allFacetValues = results.getFacetValues(attribute, {}) || [];
          var onData = on.map(function(v) {
            return find(allFacetValues, function(_ref7) {
              var escapedValue = _ref7.escapedValue;
              return escapedValue === escapeFacetValue(String(v));
            });
          }).filter(function(v) {
            return v !== void 0;
          });
          var offData = hasAnOffValue ? offValue.map(function(v) {
            return find(allFacetValues, function(_ref8) {
              var escapedValue = _ref8.escapedValue;
              return escapedValue === escapeFacetValue(String(v));
            });
          }).filter(function(v) {
            return v !== void 0;
          }) : [];
          onFacetValue = {
            isRefined: onData.length ? onData.every(function(v) {
              return v.isRefined;
            }) : false,
            count: onData.reduce(function(acc, v) {
              return acc + v.count;
            }, 0) || null
          };
          offFacetValue = {
            isRefined: offData.length ? offData.every(function(v) {
              return v.isRefined;
            }) : false,
            count: offData.reduce(function(acc, v) {
              return acc + v.count;
            }, 0) || allFacetValues.reduce(function(total, _ref9) {
              var count = _ref9.count;
              return total + count;
            }, 0)
          };
        }
        if (!sendEvent) {
          sendEvent = createSendEvent3({
            instantSearchInstance,
            attribute,
            on,
            helper
          });
        }
        var nextRefinement = isRefined2 ? offFacetValue : onFacetValue;
        return {
          value: {
            name: attribute,
            isRefined: isRefined2,
            count: results ? nextRefinement.count : null,
            onFacetValue,
            offFacetValue
          },
          createURL: connectorState.createURLFactory(isRefined2, {
            state,
            createURL,
            helper,
            getWidgetUiState: this.getWidgetUiState
          }),
          sendEvent,
          canRefine: Boolean(results ? nextRefinement.count : null),
          refine: toggleRefinementFactory(helper),
          widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref10) {
        var searchParameters = _ref10.searchParameters;
        var isRefined2 = on && on.every(function(v) {
          return searchParameters.isDisjunctiveFacetRefined(attribute, v);
        });
        if (!isRefined2) {
          var _uiState$toggle;
          (_uiState$toggle = uiState.toggle) === null || _uiState$toggle === void 0 ? true : delete _uiState$toggle[attribute];
          return uiState;
        }
        return _objectSpread43(_objectSpread43({}, uiState), {}, {
          toggle: _objectSpread43(_objectSpread43({}, uiState.toggle), {}, _defineProperty45({}, attribute, isRefined2))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref11) {
        var uiState = _ref11.uiState;
        if (searchParameters.isHierarchicalFacet(attribute) || searchParameters.isConjunctiveFacet(attribute)) {
          true ? _warning(false, 'ToggleRefinement: Attribute "'.concat(attribute, '" is already used by another widget of a different type.\nAs this is not supported, please make sure to remove this other widget or this ToggleRefinement widget will not work at all.')) : void 0;
          return searchParameters;
        }
        var withFacetConfiguration = searchParameters.addDisjunctiveFacet(attribute).removeDisjunctiveFacetRefinement(attribute);
        var isRefined2 = Boolean(uiState.toggle && uiState.toggle[attribute]);
        if (isRefined2) {
          if (on) {
            on.forEach(function(v) {
              withFacetConfiguration = withFacetConfiguration.addDisjunctiveFacetRefinement(attribute, v);
            });
          }
          return withFacetConfiguration;
        }
        if (hasAnOffValue) {
          if (off) {
            off.forEach(function(v) {
              withFacetConfiguration = withFacetConfiguration.addDisjunctiveFacetRefinement(attribute, v);
            });
          }
          return withFacetConfiguration;
        }
        return withFacetConfiguration.setQueryParameters({
          disjunctiveFacetsRefinements: _objectSpread43(_objectSpread43({}, searchParameters.disjunctiveFacetsRefinements), {}, _defineProperty45({}, attribute, []))
        });
      }
    };
  };
};
var connectToggleRefinement_default = connectToggleRefinement;

// node_modules/react-instantsearch-core/dist/es/connectors/useToggleRefinement.js
function useToggleRefinement(props, additionalWidgetProperties) {
  return useConnector(connectToggleRefinement_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/trending-items/connectTrendingItems.js
function _typeof51(obj) {
  "@babel/helpers - typeof";
  return _typeof51 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof51(obj);
}
function ownKeys44(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread44(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys44(Object(source), true).forEach(function(key) {
      _defineProperty46(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys44(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty46(obj, key, value) {
  key = _toPropertyKey46(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey46(arg) {
  var key = _toPrimitive46(arg, "string");
  return _typeof51(key) === "symbol" ? key : String(key);
}
function _toPrimitive46(input, hint) {
  if (_typeof51(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof51(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage25 = createDocumentationMessageGenerator({
  name: "trending-items",
  connector: true
});
var connectTrendingItems_default = function connectTrendingItems(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage25());
  return function(widgetParams) {
    var _ref = widgetParams || {}, facetName = _ref.facetName, facetValue = _ref.facetValue, limit = _ref.limit, threshold = _ref.threshold, fallbackParameters = _ref.fallbackParameters, queryParameters = _ref.queryParameters, _ref$escapeHTML = _ref.escapeHTML, escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (facetName && !facetValue || !facetName && facetValue) {
      throw new Error(withUsage25("When you provide facetName (received type ".concat(getObjectType(facetName), "), you must also provide facetValue (received type ").concat(getObjectType(facetValue), ").")));
    }
    return {
      dependsOn: "recommend",
      $$type: "ais.trendingItems",
      init: function init(initOptions) {
        renderFn(_objectSpread44(_objectSpread44({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var renderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread44(_objectSpread44({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState) {
        return renderState;
      },
      getWidgetRenderState: function getWidgetRenderState(_ref22) {
        var results = _ref22.results;
        if (results === null || results === void 0) {
          return {
            items: [],
            widgetParams
          };
        }
        if (escapeHTML && results.hits.length > 0) {
          results.hits = escapeHits(results.hits);
        }
        return {
          items: transformItems(results.hits, {
            results
          }),
          widgetParams
        };
      },
      dispose: function dispose(_ref3) {
        var recommendState = _ref3.recommendState;
        unmountFn();
        return recommendState.removeParams(this.$$id);
      },
      getWidgetParameters: function getWidgetParameters(state) {
        return state.removeParams(this.$$id).addTrendingItems({
          facetName,
          facetValue,
          maxRecommendations: limit,
          threshold,
          fallbackParameters: _objectSpread44(_objectSpread44({}, fallbackParameters), escapeHTML ? TAG_PLACEHOLDER : {}),
          queryParameters: _objectSpread44(_objectSpread44({}, queryParameters), escapeHTML ? TAG_PLACEHOLDER : {}),
          $$id: this.$$id
        });
      }
    };
  };
};

// node_modules/react-instantsearch-core/dist/es/connectors/useTrendingItems.js
function useTrendingItems(props, additionalWidgetProperties) {
  return useConnector(connectTrendingItems_default, props, additionalWidgetProperties);
}

// node_modules/instantsearch.js/es/connectors/looking-similar/connectLookingSimilar.js
function _typeof52(obj) {
  "@babel/helpers - typeof";
  return _typeof52 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof52(obj);
}
function ownKeys45(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread45(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys45(Object(source), true).forEach(function(key) {
      _defineProperty47(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys45(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty47(obj, key, value) {
  key = _toPropertyKey47(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey47(arg) {
  var key = _toPrimitive47(arg, "string");
  return _typeof52(key) === "symbol" ? key : String(key);
}
function _toPrimitive47(input, hint) {
  if (_typeof52(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof52(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var withUsage26 = createDocumentationMessageGenerator({
  name: "looking-similar",
  connector: true
});
var connectLookingSimilar_default = function connectLookingSimilar(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
  checkRendering(renderFn, withUsage26());
  return function(widgetParams) {
    var _ref = widgetParams || {}, _ref$escapeHTML = _ref.escapeHTML, escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML, objectIDs = _ref.objectIDs, limit = _ref.limit, threshold = _ref.threshold, fallbackParameters = _ref.fallbackParameters, queryParameters = _ref.queryParameters, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? function(items) {
      return items;
    } : _ref$transformItems;
    if (!objectIDs || objectIDs.length === 0) {
      throw new Error(withUsage26("The `objectIDs` option is required."));
    }
    return {
      dependsOn: "recommend",
      $$type: "ais.lookingSimilar",
      init: function init(initOptions) {
        renderFn(_objectSpread45(_objectSpread45({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var renderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread45(_objectSpread45({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState) {
        return renderState;
      },
      getWidgetRenderState: function getWidgetRenderState(_ref22) {
        var results = _ref22.results;
        if (results === null || results === void 0) {
          return {
            items: [],
            widgetParams
          };
        }
        if (escapeHTML && results.hits.length > 0) {
          results.hits = escapeHits(results.hits);
        }
        return {
          items: transformItems(results.hits, {
            results
          }),
          widgetParams
        };
      },
      dispose: function dispose(_ref3) {
        var recommendState = _ref3.recommendState;
        unmountFn();
        return recommendState.removeParams(this.$$id);
      },
      getWidgetParameters: function getWidgetParameters(state) {
        var _this = this;
        return objectIDs.reduce(function(acc, objectID) {
          return acc.addLookingSimilar({
            objectID,
            maxRecommendations: limit,
            threshold,
            fallbackParameters: _objectSpread45(_objectSpread45({}, fallbackParameters), escapeHTML ? TAG_PLACEHOLDER : {}),
            queryParameters: _objectSpread45(_objectSpread45({}, queryParameters), escapeHTML ? TAG_PLACEHOLDER : {}),
            $$id: _this.$$id
          });
        }, state.removeParams(this.$$id));
      }
    };
  };
};

// node_modules/react-instantsearch-core/dist/es/connectors/useLookingSimilar.js
function useLookingSimilar(props, additionalWidgetProperties) {
  return useConnector(connectLookingSimilar_default, props, additionalWidgetProperties);
}

// node_modules/react-instantsearch-core/dist/es/hooks/useInstantSearch.js
var import_react24 = __toESM(require_react(), 1);

// node_modules/react-instantsearch-core/dist/es/lib/useSearchResults.js
var import_react22 = __toESM(require_react(), 1);
function _slicedToArray16(arr, i) {
  return _arrayWithHoles16(arr) || _iterableToArrayLimit16(arr, i) || _unsupportedIterableToArray23(arr, i) || _nonIterableRest16();
}
function _nonIterableRest16() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray23(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray23(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray23(o, minLen);
}
function _arrayLikeToArray23(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit16(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles16(arr) {
  if (Array.isArray(arr)) return arr;
}
function useSearchResults() {
  var search = useInstantSearchContext();
  var searchIndex = useIndexContext();
  var _useState = (0, import_react22.useState)(function() {
    var indexSearchResults = getIndexSearchResults(searchIndex);
    return {
      results: indexSearchResults.results,
      scopedResults: indexSearchResults.scopedResults
    };
  }), _useState2 = _slicedToArray16(_useState, 2), searchResults = _useState2[0], setSearchResults = _useState2[1];
  (0, import_react22.useEffect)(function() {
    function handleRender() {
      var results = searchIndex.getResults();
      if (results !== null) {
        setSearchResults({
          results,
          scopedResults: searchIndex.getScopedResults()
        });
      } else if (search.mainIndex.getIndexName().length === 0) {
        var childIndex = search.mainIndex.getWidgets().find(isIndexWidget);
        childIndex && setSearchResults({
          results: getIndexSearchResults(searchIndex).results,
          scopedResults: childIndex.getScopedResults()
        });
      }
    }
    search.addListener("render", handleRender);
    return function() {
      search.removeListener("render", handleRender);
    };
  }, [search, searchIndex]);
  return searchResults;
}

// node_modules/react-instantsearch-core/dist/es/lib/useSearchState.js
var import_react23 = __toESM(require_react(), 1);
function _slicedToArray17(arr, i) {
  return _arrayWithHoles17(arr) || _iterableToArrayLimit17(arr, i) || _unsupportedIterableToArray24(arr, i) || _nonIterableRest17();
}
function _nonIterableRest17() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray24(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray24(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray24(o, minLen);
}
function _arrayLikeToArray24(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit17(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles17(arr) {
  if (Array.isArray(arr)) return arr;
}
function useSearchState() {
  var search = useInstantSearchContext();
  var searchIndex = useIndexContext();
  var indexId = searchIndex.getIndexId();
  var _useState = (0, import_react23.useState)(function() {
    return search.getUiState();
  }), _useState2 = _slicedToArray17(_useState, 2), uiState = _useState2[0], setLocalUiState = _useState2[1];
  var indexUiState = uiState[indexId];
  var _useState3 = (0, import_react23.useState)(function() {
    return search.renderState;
  }), _useState4 = _slicedToArray17(_useState3, 2), renderState = _useState4[0], setRenderState = _useState4[1];
  var indexRenderState = renderState[indexId] || {};
  var setUiState = (0, import_react23.useCallback)(function(nextUiState) {
    search.setUiState(nextUiState);
  }, [search]);
  var setIndexUiState = (0, import_react23.useCallback)(function(nextIndexUiState) {
    searchIndex.setIndexUiState(nextIndexUiState);
  }, [searchIndex]);
  (0, import_react23.useEffect)(function() {
    function handleRender() {
      setLocalUiState(search.getUiState());
      setRenderState(search.renderState);
    }
    search.addListener("render", handleRender);
    return function() {
      search.removeListener("render", handleRender);
    };
  }, [search]);
  return {
    uiState,
    setUiState,
    indexUiState,
    setIndexUiState,
    renderState,
    indexRenderState
  };
}

// node_modules/react-instantsearch-core/dist/es/hooks/useInstantSearch.js
function useInstantSearch() {
  var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, catchError = _ref.catchError;
  var search = useInstantSearchContext();
  var _useSearchState = useSearchState(), uiState = _useSearchState.uiState, setUiState = _useSearchState.setUiState, indexUiState = _useSearchState.indexUiState, setIndexUiState = _useSearchState.setIndexUiState, renderState = _useSearchState.renderState, indexRenderState = _useSearchState.indexRenderState;
  var _useSearchResults = useSearchResults(), results = _useSearchResults.results, scopedResults = _useSearchResults.scopedResults;
  var addMiddlewares = (0, import_react24.useCallback)(function() {
    for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }
    search.use.apply(search, middlewares);
    return function() {
      search.unuse.apply(search, middlewares);
    };
  }, [search]);
  var refresh = (0, import_react24.useCallback)(function() {
    search.refresh();
  }, [search]);
  useIsomorphicLayoutEffect(function() {
    if (catchError) {
      var onError = function onError2() {
      };
      search.addListener("error", onError);
      return function() {
        return search.removeListener("error", onError);
      };
    }
    return function() {
    };
  }, [search, catchError]);
  return {
    results,
    scopedResults,
    uiState,
    setUiState,
    indexUiState,
    setIndexUiState,
    renderState,
    indexRenderState,
    addMiddlewares,
    refresh,
    status: search.status,
    error: search.error
  };
}

// node_modules/react-instantsearch-core/dist/es/lib/wrapPromiseWithState.js
function isStatefulPromise(promise) {
  return "status" in promise;
}
function wrapPromiseWithState(promise) {
  if (isStatefulPromise(promise)) {
    return promise;
  }
  var pendingPromise = promise;
  pendingPromise.status = "pending";
  pendingPromise.then(function(value) {
    if (pendingPromise.status === "pending") {
      var fulfilledPromise = pendingPromise;
      fulfilledPromise.status = "fulfilled";
      fulfilledPromise.value = value;
    }
  }, function(reason) {
    if (pendingPromise.status === "pending") {
      var rejectedPromise = pendingPromise;
      rejectedPromise.status = "rejected";
      rejectedPromise.reason = reason;
    }
  });
  return promise;
}

// node_modules/instantsearch.js/es/lib/server.js
function _typeof53(obj) {
  "@babel/helpers - typeof";
  return _typeof53 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof53(obj);
}
function ownKeys46(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread46(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys46(Object(source), true).forEach(function(key) {
      _defineProperty48(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys46(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty48(obj, key, value) {
  key = _toPropertyKey48(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey48(arg) {
  var key = _toPrimitive48(arg, "string");
  return _typeof53(key) === "symbol" ? key : String(key);
}
function _toPrimitive48(input, hint) {
  if (_typeof53(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof53(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function waitForResults(search) {
  var skipRecommend = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var helper = search.mainHelper;
  var requestParamsList;
  var client = helper.getClient();
  helper.setClient(_objectSpread46(_objectSpread46({}, client), {}, {
    search: function search2(queries) {
      requestParamsList = queries.map(function(_ref) {
        var params = _ref.params;
        return params;
      });
      return client.search(queries);
    }
  }));
  search._hasSearchWidget && helper.searchOnlyWithDerivedHelpers();
  !skipRecommend && search._hasRecommendWidget && helper.recommend();
  return new Promise(function(resolve, reject) {
    var searchResultsReceived = !search._hasSearchWidget;
    var recommendResultsReceived = !search._hasRecommendWidget || skipRecommend;
    helper.derivedHelpers[0].on("result", function() {
      searchResultsReceived = true;
      if (recommendResultsReceived) {
        resolve(requestParamsList);
      }
    });
    helper.derivedHelpers[0].on("recommend:result", function() {
      recommendResultsReceived = true;
      if (searchResultsReceived) {
        resolve(requestParamsList);
      }
    });
    helper.on("error", function(error) {
      reject(error);
    });
    search.on("error", function(error) {
      reject(error);
    });
    helper.derivedHelpers.forEach(function(derivedHelper) {
      return derivedHelper.on("error", function(error) {
        reject(error);
      });
    });
  });
}
function getInitialResults(rootIndex, requestParamsList) {
  var initialResults = {};
  var requestParamsIndex = 0;
  walkIndex(rootIndex, function(widget) {
    var _widget$getHelper;
    var searchResults = widget.getResults();
    var recommendResults = (_widget$getHelper = widget.getHelper()) === null || _widget$getHelper === void 0 ? void 0 : _widget$getHelper.lastRecommendResults;
    if (searchResults || recommendResults) {
      var _searchResults$_rawRe;
      var resultsCount = (searchResults === null || searchResults === void 0 ? void 0 : (_searchResults$_rawRe = searchResults._rawResults) === null || _searchResults$_rawRe === void 0 ? void 0 : _searchResults$_rawRe.length) || 0;
      var requestParams = resultsCount ? requestParamsList === null || requestParamsList === void 0 ? void 0 : requestParamsList.slice(requestParamsIndex, requestParamsIndex + resultsCount) : [];
      requestParamsIndex += resultsCount;
      initialResults[widget.getIndexId()] = _objectSpread46(_objectSpread46(_objectSpread46({}, searchResults && {
        state: _objectSpread46({}, searchResults._state),
        results: searchResults._rawResults
      }), recommendResults && {
        recommendResults: {
          // We have to stringify + parse because of some explicitly undefined values.
          params: JSON.parse(JSON.stringify(recommendResults._state.params)),
          results: recommendResults._rawResults
        }
      }), requestParams && {
        requestParams
      });
    }
  });
  if (Object.keys(initialResults).length === 0) {
    throw new Error("The root index does not have any results. Make sure you have at least one widget that provides results.");
  }
  return initialResults;
}

// node_modules/react-instantsearch-core/dist/es/server/getServerState.js
var import_react25 = __toESM(require_react(), 1);
function getServerState(children, _ref) {
  var renderToString = _ref.renderToString;
  var searchRef = {
    current: void 0
  };
  resetWidgetId();
  var createNotifyServer = function createNotifyServer2() {
    var hasBeenNotified = false;
    var notifyServer = function notifyServer2(_ref22) {
      var search = _ref22.search;
      if (hasBeenNotified) {
        throw new Error("getServerState should be called with a single InstantSearchSSRProvider and a single InstantSearch component.");
      }
      hasBeenNotified = true;
      searchRef.current = search;
    };
    return notifyServer;
  };
  return execute({
    children,
    renderToString,
    searchRef,
    notifyServer: createNotifyServer()
  }).then(function(serverState) {
    var shouldRefetch = false;
    walkIndex(searchRef.current.mainIndex, function(index3) {
      shouldRefetch = shouldRefetch || index3.getWidgets().some(function(widget) {
        return widget.$$type === "ais.dynamicWidgets";
      });
    });
    if (shouldRefetch) {
      resetWidgetId();
      return execute({
        children: import_react25.default.createElement(InstantSearchSSRProvider, serverState, children),
        renderToString,
        searchRef,
        notifyServer: createNotifyServer(),
        skipRecommend: true
      });
    }
    return serverState;
  });
}
function execute(_ref3) {
  var children = _ref3.children, renderToString = _ref3.renderToString, notifyServer = _ref3.notifyServer, searchRef = _ref3.searchRef, skipRecommend = _ref3.skipRecommend;
  return Promise.resolve().then(function() {
    renderToString(import_react25.default.createElement(InstantSearchServerContext.Provider, {
      value: {
        notifyServer
      }
    }, children));
  }).then(function() {
    return (
      // We wait for the component to mount so that `notifyServer()` is called.
      new Promise(function(resolve) {
        return setTimeout(resolve, 0);
      })
    );
  }).then(function() {
    if (!searchRef.current) {
      throw new Error("Unable to retrieve InstantSearch's server state in `getServerState()`. Did you mount the <InstantSearch> component?");
    }
    return waitForResults(searchRef.current, skipRecommend);
  }).then(function(requestParamsList) {
    return {
      initialResults: getInitialResults(searchRef.current.mainIndex, requestParamsList)
    };
  });
}

// node_modules/react-instantsearch/dist/es/widgets/Breadcrumb.js
var import_react27 = __toESM(require_react(), 1);

// node_modules/@babel/runtime/helpers/esm/extends.js
function _extends2() {
  return _extends2 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends2.apply(null, arguments);
}

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof54(o) {
  "@babel/helpers - typeof";
  return _typeof54 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof54(o);
}

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
  if ("object" != _typeof54(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof54(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof54(i) ? i : i + "";
}

// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty49(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose13(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}

// node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function _objectWithoutProperties13(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose13(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}

// node_modules/instantsearch-ui-components/dist/es/lib/cx.js
function cx() {
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }
  return classNames.reduce(function(acc, className) {
    if (Array.isArray(className)) {
      return acc.concat(className);
    }
    return acc.concat([className]);
  }, []).filter(Boolean).join(" ");
}

// node_modules/instantsearch-ui-components/dist/es/components/recommend-shared/DefaultEmpty.js
function createDefaultEmptyComponent(_ref) {
  var createElement8 = _ref.createElement, Fragment9 = _ref.Fragment;
  return function DefaultEmpty() {
    return createElement8(Fragment9, null, "No results");
  };
}

// node_modules/instantsearch-ui-components/dist/es/components/recommend-shared/DefaultHeader.js
function createDefaultHeaderComponent(_ref) {
  var createElement8 = _ref.createElement;
  return function DefaultHeader(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, items = userProps.items, translations = userProps.translations;
    if (!items || items.length < 1) {
      return null;
    }
    if (!translations.title) {
      return null;
    }
    return createElement8("h3", {
      className: classNames.title
    }, translations.title);
  };
}

// node_modules/instantsearch-ui-components/dist/es/components/recommend-shared/DefaultItem.js
function createDefaultItemComponent(_ref) {
  var createElement8 = _ref.createElement, Fragment9 = _ref.Fragment;
  return function DefaultItem(userProps) {
    return createElement8(Fragment9, null, JSON.stringify(userProps.item, null, 2));
  };
}

// node_modules/instantsearch-ui-components/dist/es/components/recommend-shared/List.js
function createListComponent(_ref) {
  var createElement8 = _ref.createElement;
  return function List(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, ItemComponent = userProps.itemComponent, items = userProps.items, sendEvent = userProps.sendEvent;
    return createElement8("div", {
      className: classNames.container
    }, createElement8("ol", {
      className: classNames.list
    }, items.map(function(item) {
      return createElement8("li", {
        key: item.objectID,
        className: classNames.item,
        onClick: sendEvent,
        onAuxClick: sendEvent
      }, createElement8(ItemComponent, {
        item
      }));
    })));
  };
}

// node_modules/instantsearch-ui-components/dist/es/components/Carousel.js
var _excluded13 = ["listRef", "nextButtonRef", "previousButtonRef", "carouselIdRef", "classNames", "itemComponent", "previousIconComponent", "nextIconComponent", "items", "translations"];
function ownKeys47(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread47(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys47(Object(source), true).forEach(function(key) {
      _defineProperty49(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys47(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
var lastCarouselId = 0;
function generateCarouselId() {
  return "ais-Carousel-".concat(lastCarouselId++);
}
function PreviousIconDefaultComponent(_ref) {
  var createElement8 = _ref.createElement;
  return createElement8("svg", {
    width: "8",
    height: "16",
    viewBox: "0 0 8 16",
    fill: "none"
  }, createElement8("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    fill: "currentColor",
    d: "M7.13809 0.744078C7.39844 1.06951 7.39844 1.59715 7.13809 1.92259L2.27616 8L7.13809 14.0774C7.39844 14.4028 7.39844 14.9305 7.13809 15.2559C6.87774 15.5814 6.45563 15.5814 6.19528 15.2559L0.861949 8.58926C0.6016 8.26382 0.6016 7.73618 0.861949 7.41074L6.19528 0.744078C6.45563 0.418641 6.87774 0.418641 7.13809 0.744078Z"
  }));
}
function NextIconDefaultComponent(_ref22) {
  var createElement8 = _ref22.createElement;
  return createElement8("svg", {
    width: "8",
    height: "16",
    viewBox: "0 0 8 16",
    fill: "none"
  }, createElement8("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    fill: "currentColor",
    d: "M0.861908 15.2559C0.601559 14.9305 0.601559 14.4028 0.861908 14.0774L5.72384 8L0.861908 1.92259C0.601559 1.59715 0.601559 1.06952 0.861908 0.744079C1.12226 0.418642 1.54437 0.418642 1.80472 0.744079L7.13805 7.41074C7.3984 7.73618 7.3984 8.26382 7.13805 8.58926L1.80472 15.2559C1.54437 15.5814 1.12226 15.5814 0.861908 15.2559Z"
  }));
}
function createCarouselComponent(_ref3) {
  var createElement8 = _ref3.createElement, Fragment9 = _ref3.Fragment;
  return function Carousel2(userProps) {
    var listRef = userProps.listRef, nextButtonRef = userProps.nextButtonRef, previousButtonRef = userProps.previousButtonRef, carouselIdRef = userProps.carouselIdRef, _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, _userProps$itemCompon = userProps.itemComponent, ItemComponent = _userProps$itemCompon === void 0 ? createDefaultItemComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$itemCompon, _userProps$previousIc = userProps.previousIconComponent, PreviousIconComponent = _userProps$previousIc === void 0 ? PreviousIconDefaultComponent : _userProps$previousIc, _userProps$nextIconCo = userProps.nextIconComponent, NextIconComponent = _userProps$nextIconCo === void 0 ? NextIconDefaultComponent : _userProps$nextIconCo, items = userProps.items, userTranslations = userProps.translations, props = _objectWithoutProperties13(userProps, _excluded13);
    var translations = _objectSpread47({
      listLabel: "Items",
      nextButtonLabel: "Next",
      nextButtonTitle: "Next",
      previousButtonLabel: "Previous",
      previousButtonTitle: "Previous"
    }, userTranslations);
    var cssClasses = {
      root: cx("ais-Carousel", classNames.root),
      list: cx("ais-Carousel-list", classNames.list),
      item: cx("ais-Carousel-item", classNames.item),
      navigation: cx("ais-Carousel-navigation", classNames.navigation),
      navigationNext: cx("ais-Carousel-navigation--next", classNames.navigationNext),
      navigationPrevious: cx("ais-Carousel-navigation--previous", classNames.navigationPrevious)
    };
    function scrollLeft() {
      if (listRef.current) {
        listRef.current.scrollLeft -= listRef.current.offsetWidth * 0.75;
      }
    }
    function scrollRight() {
      if (listRef.current) {
        listRef.current.scrollLeft += listRef.current.offsetWidth * 0.75;
      }
    }
    function updateNavigationButtonsProps() {
      if (!listRef.current || !previousButtonRef.current || !nextButtonRef.current) {
        return;
      }
      previousButtonRef.current.hidden = listRef.current.scrollLeft <= 0;
      nextButtonRef.current.hidden = listRef.current.scrollLeft + listRef.current.clientWidth >= listRef.current.scrollWidth;
    }
    if (items.length === 0) {
      return null;
    }
    return createElement8("div", _extends2({}, props, {
      className: cx(cssClasses.root)
    }), createElement8("button", {
      ref: previousButtonRef,
      title: translations.previousButtonTitle,
      "aria-label": translations.previousButtonLabel,
      hidden: true,
      "aria-controls": carouselIdRef.current,
      className: cx(cssClasses.navigation, cssClasses.navigationPrevious),
      onClick: function onClick(event) {
        event.preventDefault();
        scrollLeft();
      }
    }, createElement8(PreviousIconComponent, {
      createElement: createElement8
    })), createElement8("ol", {
      className: cx(cssClasses.list),
      ref: listRef,
      tabIndex: 0,
      id: carouselIdRef.current,
      "aria-roledescription": "carousel",
      "aria-label": translations.listLabel,
      "aria-live": "polite",
      onScroll: updateNavigationButtonsProps,
      onKeyDown: function onKeyDown(event) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollLeft();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollRight();
        }
      }
    }, items.map(function(item, index3) {
      return createElement8("li", {
        key: item.objectID,
        className: cx(cssClasses.item),
        "aria-roledescription": "slide",
        "aria-label": "".concat(index3 + 1, " of ").concat(items.length)
      }, createElement8(ItemComponent, {
        item
      }));
    })), createElement8("button", {
      ref: nextButtonRef,
      title: translations.nextButtonTitle,
      "aria-label": translations.nextButtonLabel,
      "aria-controls": carouselIdRef.current,
      className: cx(cssClasses.navigation, cssClasses.navigationNext),
      onClick: function onClick(event) {
        event.preventDefault();
        scrollRight();
      }
    }, createElement8(NextIconComponent, {
      createElement: createElement8
    })));
  };
}

// node_modules/instantsearch-ui-components/dist/es/components/FrequentlyBoughtTogether.js
var _excluded14 = ["classNames", "emptyComponent", "headerComponent", "itemComponent", "layout", "items", "status", "translations", "sendEvent"];
function ownKeys48(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread48(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys48(Object(source), true).forEach(function(key) {
      _defineProperty49(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys48(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function createFrequentlyBoughtTogetherComponent(_ref) {
  var createElement8 = _ref.createElement, Fragment9 = _ref.Fragment;
  return function FrequentlyBoughtTogether2(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, _userProps$emptyCompo = userProps.emptyComponent, EmptyComponent = _userProps$emptyCompo === void 0 ? createDefaultEmptyComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$emptyCompo, _userProps$headerComp = userProps.headerComponent, HeaderComponent = _userProps$headerComp === void 0 ? createDefaultHeaderComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$headerComp, _userProps$itemCompon = userProps.itemComponent, ItemComponent = _userProps$itemCompon === void 0 ? createDefaultItemComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$itemCompon, _userProps$layout = userProps.layout, Layout = _userProps$layout === void 0 ? createListComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$layout, items = userProps.items, status = userProps.status, userTranslations = userProps.translations, sendEvent = userProps.sendEvent, props = _objectWithoutProperties13(userProps, _excluded14);
    var translations = _objectSpread48({
      title: "Frequently bought together",
      sliderLabel: "Frequently bought together products"
    }, userTranslations);
    var cssClasses = {
      root: cx("ais-FrequentlyBoughtTogether", classNames.root),
      emptyRoot: cx("ais-FrequentlyBoughtTogether", classNames.root, "ais-FrequentlyBoughtTogether--empty", classNames.emptyRoot, props.className),
      title: cx("ais-FrequentlyBoughtTogether-title", classNames.title),
      container: cx("ais-FrequentlyBoughtTogether-container", classNames.container),
      list: cx("ais-FrequentlyBoughtTogether-list", classNames.list),
      item: cx("ais-FrequentlyBoughtTogether-item", classNames.item)
    };
    if (items.length === 0 && status === "idle") {
      return createElement8("section", _extends2({}, props, {
        className: cssClasses.emptyRoot
      }), createElement8(EmptyComponent, null));
    }
    return createElement8("section", _extends2({}, props, {
      className: cssClasses.root
    }), createElement8(HeaderComponent, {
      classNames: cssClasses,
      items,
      translations
    }), createElement8(Layout, {
      classNames: cssClasses,
      itemComponent: ItemComponent,
      items,
      sendEvent
    }));
  };
}

// node_modules/instantsearch-ui-components/dist/es/components/Highlight.js
var _excluded15 = ["parts", "highlightedTagName", "nonHighlightedTagName", "separator", "className", "classNames"];
function createHighlightPartComponent(_ref) {
  var createElement8 = _ref.createElement;
  return function HighlightPart(_ref22) {
    var classNames = _ref22.classNames, children = _ref22.children, highlightedTagName = _ref22.highlightedTagName, isHighlighted = _ref22.isHighlighted, nonHighlightedTagName = _ref22.nonHighlightedTagName;
    var TagName = isHighlighted ? highlightedTagName : nonHighlightedTagName;
    return createElement8(TagName, {
      className: isHighlighted ? classNames.highlighted : classNames.nonHighlighted
    }, children);
  };
}
function createHighlightComponent(_ref3) {
  var createElement8 = _ref3.createElement, Fragment9 = _ref3.Fragment;
  var HighlightPart = createHighlightPartComponent({
    createElement: createElement8,
    Fragment: Fragment9
  });
  return function Highlight3(userProps) {
    var parts = userProps.parts, _userProps$highlighte = userProps.highlightedTagName, highlightedTagName = _userProps$highlighte === void 0 ? "mark" : _userProps$highlighte, _userProps$nonHighlig = userProps.nonHighlightedTagName, nonHighlightedTagName = _userProps$nonHighlig === void 0 ? "span" : _userProps$nonHighlig, _userProps$separator = userProps.separator, separator = _userProps$separator === void 0 ? ", " : _userProps$separator, className = userProps.className, _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, props = _objectWithoutProperties13(userProps, _excluded15);
    return createElement8("span", _extends2({}, props, {
      className: cx(classNames.root, className)
    }), parts.map(function(part, partIndex) {
      var isLastPart = partIndex === parts.length - 1;
      return createElement8(Fragment9, {
        key: partIndex
      }, part.map(function(subPart, subPartIndex) {
        return createElement8(HighlightPart, {
          key: subPartIndex,
          classNames,
          highlightedTagName,
          nonHighlightedTagName,
          isHighlighted: subPart.isHighlighted
        }, subPart.value);
      }), !isLastPart && createElement8("span", {
        className: classNames.separator
      }, separator));
    }));
  };
}

// node_modules/instantsearch-ui-components/dist/es/components/Hits.js
var _excluded16 = ["classNames", "hits", "itemComponent", "sendEvent", "emptyComponent", "banner", "bannerComponent"];
function createDefaultBannerComponent(_ref) {
  var createElement8 = _ref.createElement;
  return function DefaultBanner2(_ref22) {
    var classNames = _ref22.classNames, banner = _ref22.banner;
    if (!banner.image.urls[0].url) {
      return null;
    }
    return createElement8("aside", {
      className: cx("ais-Hits-banner", classNames.bannerRoot)
    }, banner.link ? createElement8("a", {
      className: cx("ais-Hits-banner-link", classNames.bannerLink),
      href: banner.link.url,
      target: banner.link.target
    }, createElement8("img", {
      className: cx("ais-Hits-banner-image", classNames.bannerImage),
      src: banner.image.urls[0].url,
      alt: banner.image.title
    })) : createElement8("img", {
      className: cx("ais-Hits-banner-image", classNames.bannerImage),
      src: banner.image.urls[0].url,
      alt: banner.image.title
    }));
  };
}
function createHitsComponent(_ref3) {
  var createElement8 = _ref3.createElement, Fragment9 = _ref3.Fragment;
  var DefaultBannerComponent = createDefaultBannerComponent({
    createElement: createElement8,
    Fragment: Fragment9
  });
  return function Hits2(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, hits = userProps.hits, ItemComponent = userProps.itemComponent, sendEvent = userProps.sendEvent, EmptyComponent = userProps.emptyComponent, banner = userProps.banner, BannerComponent = userProps.bannerComponent, props = _objectWithoutProperties13(userProps, _excluded16);
    return createElement8("div", _extends2({}, props, {
      className: cx("ais-Hits", classNames.root, hits.length === 0 && cx("ais-Hits--empty", classNames.emptyRoot), props.className)
    }), banner && (BannerComponent ? createElement8(BannerComponent, {
      className: cx("ais-Hits-banner", classNames.bannerRoot),
      banner
    }) : createElement8(DefaultBannerComponent, {
      classNames,
      banner
    })), hits.length === 0 && EmptyComponent ? createElement8(EmptyComponent, null) : createElement8("ol", {
      className: cx("ais-Hits-list", classNames.list)
    }, hits.map(function(hit, index3) {
      return createElement8(ItemComponent, {
        key: hit.objectID,
        hit,
        index: index3,
        className: cx("ais-Hits-item", classNames.item),
        onClick: function onClick() {
          sendEvent("click:internal", hit, "Hit Clicked");
        },
        onAuxClick: function onAuxClick() {
          sendEvent("click:internal", hit, "Hit Clicked");
        }
      });
    })));
  };
}

// node_modules/instantsearch-ui-components/dist/es/components/LookingSimilar.js
var _excluded17 = ["classNames", "emptyComponent", "headerComponent", "itemComponent", "layout", "items", "status", "translations", "sendEvent"];
function ownKeys49(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread49(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys49(Object(source), true).forEach(function(key) {
      _defineProperty49(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys49(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function createLookingSimilarComponent(_ref) {
  var createElement8 = _ref.createElement, Fragment9 = _ref.Fragment;
  return function LookingSimilar2(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, _userProps$emptyCompo = userProps.emptyComponent, EmptyComponent = _userProps$emptyCompo === void 0 ? createDefaultEmptyComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$emptyCompo, _userProps$headerComp = userProps.headerComponent, HeaderComponent = _userProps$headerComp === void 0 ? createDefaultHeaderComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$headerComp, _userProps$itemCompon = userProps.itemComponent, ItemComponent = _userProps$itemCompon === void 0 ? createDefaultItemComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$itemCompon, _userProps$layout = userProps.layout, Layout = _userProps$layout === void 0 ? createListComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$layout, items = userProps.items, status = userProps.status, userTranslations = userProps.translations, sendEvent = userProps.sendEvent, props = _objectWithoutProperties13(userProps, _excluded17);
    var translations = _objectSpread49({
      title: "Looking similar",
      sliderLabel: "Looking similar"
    }, userTranslations);
    var cssClasses = {
      root: cx("ais-LookingSimilar", classNames.root),
      emptyRoot: cx("ais-LookingSimilar", classNames.root, "ais-LookingSimilar--empty", classNames.emptyRoot, props.className),
      title: cx("ais-LookingSimilar-title", classNames.title),
      container: cx("ais-LookingSimilar-container", classNames.container),
      list: cx("ais-LookingSimilar-list", classNames.list),
      item: cx("ais-LookingSimilar-item", classNames.item)
    };
    if (items.length === 0 && status === "idle") {
      return createElement8("section", _extends2({}, props, {
        className: cssClasses.emptyRoot
      }), createElement8(EmptyComponent, null));
    }
    return createElement8("section", _extends2({}, props, {
      className: cssClasses.root
    }), createElement8(HeaderComponent, {
      classNames: cssClasses,
      items,
      translations
    }), createElement8(Layout, {
      classNames: cssClasses,
      itemComponent: ItemComponent,
      items,
      sendEvent
    }));
  };
}

// node_modules/instantsearch-ui-components/dist/es/components/RelatedProducts.js
var _excluded18 = ["classNames", "emptyComponent", "headerComponent", "itemComponent", "layout", "items", "status", "translations", "sendEvent"];
function ownKeys50(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread50(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys50(Object(source), true).forEach(function(key) {
      _defineProperty49(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys50(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function createRelatedProductsComponent(_ref) {
  var createElement8 = _ref.createElement, Fragment9 = _ref.Fragment;
  return function RelatedProducts2(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, _userProps$emptyCompo = userProps.emptyComponent, EmptyComponent = _userProps$emptyCompo === void 0 ? createDefaultEmptyComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$emptyCompo, _userProps$headerComp = userProps.headerComponent, HeaderComponent = _userProps$headerComp === void 0 ? createDefaultHeaderComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$headerComp, _userProps$itemCompon = userProps.itemComponent, ItemComponent = _userProps$itemCompon === void 0 ? createDefaultItemComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$itemCompon, _userProps$layout = userProps.layout, Layout = _userProps$layout === void 0 ? createListComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$layout, items = userProps.items, status = userProps.status, userTranslations = userProps.translations, sendEvent = userProps.sendEvent, props = _objectWithoutProperties13(userProps, _excluded18);
    var translations = _objectSpread50({
      title: "Related products",
      sliderLabel: "Related products"
    }, userTranslations);
    var cssClasses = {
      root: cx("ais-RelatedProducts", classNames.root),
      emptyRoot: cx("ais-RelatedProducts", classNames.root, "ais-RelatedProducts--empty", classNames.emptyRoot, props.className),
      title: cx("ais-RelatedProducts-title", classNames.title),
      container: cx("ais-RelatedProducts-container", classNames.container),
      list: cx("ais-RelatedProducts-list", classNames.list),
      item: cx("ais-RelatedProducts-item", classNames.item)
    };
    if (items.length === 0 && status === "idle") {
      return createElement8("section", _extends2({}, props, {
        className: cssClasses.emptyRoot
      }), createElement8(EmptyComponent, null));
    }
    return createElement8("section", _extends2({}, props, {
      className: cssClasses.root
    }), createElement8(HeaderComponent, {
      classNames: cssClasses,
      items,
      translations
    }), createElement8(Layout, {
      classNames: cssClasses,
      itemComponent: ItemComponent,
      items,
      sendEvent
    }));
  };
}

// node_modules/instantsearch-ui-components/dist/es/components/TrendingItems.js
var _excluded19 = ["classNames", "emptyComponent", "headerComponent", "itemComponent", "layout", "items", "status", "translations", "sendEvent"];
function ownKeys51(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread51(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys51(Object(source), true).forEach(function(key) {
      _defineProperty49(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys51(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function createTrendingItemsComponent(_ref) {
  var createElement8 = _ref.createElement, Fragment9 = _ref.Fragment;
  return function TrendingItems2(userProps) {
    var _userProps$classNames = userProps.classNames, classNames = _userProps$classNames === void 0 ? {} : _userProps$classNames, _userProps$emptyCompo = userProps.emptyComponent, EmptyComponent = _userProps$emptyCompo === void 0 ? createDefaultEmptyComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$emptyCompo, _userProps$headerComp = userProps.headerComponent, HeaderComponent = _userProps$headerComp === void 0 ? createDefaultHeaderComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$headerComp, _userProps$itemCompon = userProps.itemComponent, ItemComponent = _userProps$itemCompon === void 0 ? createDefaultItemComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$itemCompon, _userProps$layout = userProps.layout, Layout = _userProps$layout === void 0 ? createListComponent({
      createElement: createElement8,
      Fragment: Fragment9
    }) : _userProps$layout, items = userProps.items, status = userProps.status, userTranslations = userProps.translations, sendEvent = userProps.sendEvent, props = _objectWithoutProperties13(userProps, _excluded19);
    var translations = _objectSpread51({
      title: "Trending items",
      sliderLabel: "Trending items"
    }, userTranslations);
    var cssClasses = {
      root: cx("ais-TrendingItems", classNames.root),
      emptyRoot: cx("ais-TrendingItems", classNames.root, "ais-TrendingItems--empty", classNames.emptyRoot, props.className),
      title: cx("ais-TrendingItems-title", classNames.title),
      container: cx("ais-TrendingItems-container", classNames.container),
      list: cx("ais-TrendingItems-list", classNames.list),
      item: cx("ais-TrendingItems-item", classNames.item)
    };
    if (items.length === 0 && status === "idle") {
      return createElement8("section", _extends2({}, props, {
        className: cssClasses.emptyRoot
      }), createElement8(EmptyComponent, null));
    }
    return createElement8("section", _extends2({}, props, {
      className: cssClasses.root
    }), createElement8(HeaderComponent, {
      classNames: cssClasses,
      items,
      translations
    }), createElement8(Layout, {
      classNames: cssClasses,
      itemComponent: ItemComponent,
      items,
      sendEvent
    }));
  };
}

// node_modules/react-instantsearch/dist/es/ui/Breadcrumb.js
var import_react26 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/lib/isModifierClick.js
function isModifierClick(event) {
  var isMiddleClick = event.button === 1;
  return Boolean(isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
}

// node_modules/react-instantsearch/dist/es/ui/Breadcrumb.js
var _excluded20 = ["classNames", "items", "hasItems", "createURL", "onNavigate", "separator", "translations"];
function _extends3() {
  _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends3.apply(this, arguments);
}
function _objectWithoutProperties14(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose14(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose14(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Breadcrumb(_ref) {
  var _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, _ref$items = _ref.items, items = _ref$items === void 0 ? [] : _ref$items, hasItems = _ref.hasItems, createURL = _ref.createURL, onNavigate = _ref.onNavigate, _ref$separator = _ref.separator, separator = _ref$separator === void 0 ? ">" : _ref$separator, translations = _ref.translations, props = _objectWithoutProperties14(_ref, _excluded20);
  var handleClick = function handleClick2(value) {
    return function(event) {
      if (!isModifierClick(event)) {
        event.preventDefault();
        onNavigate(value);
      }
    };
  };
  return import_react26.default.createElement("div", _extends3({}, props, {
    className: cx("ais-Breadcrumb", classNames.root, !hasItems && cx("ais-Breadcrumb--noRefinement", classNames.noRefinementRoot), props.className)
  }), import_react26.default.createElement("ul", {
    className: cx("ais-Breadcrumb-list", classNames.list)
  }, import_react26.default.createElement("li", {
    className: cx("ais-Breadcrumb-item", classNames.item, !hasItems && cx("ais-Breadcrumb-item--selected", classNames.selectedItem))
  }, import_react26.default.createElement("a", {
    href: createURL(null),
    onClick: handleClick(null),
    className: cx("ais-Breadcrumb-link", classNames.link)
  }, translations.rootElementText)), items.map(function(item, index3) {
    var isLast = index3 === items.length - 1;
    return import_react26.default.createElement("li", {
      key: index3,
      className: cx("ais-Breadcrumb-item", classNames.item, isLast && cx("ais-Breadcrumb-item--selected", classNames.selectedItem))
    }, import_react26.default.createElement("span", {
      "aria-hidden": "true",
      className: cx("ais-Breadcrumb-separator", classNames.separator)
    }, separator), isLast ? item.label : import_react26.default.createElement("a", {
      className: cx("ais-Breadcrumb-link", classNames.link),
      href: createURL(item.value),
      onClick: handleClick(item.value)
    }, item.label));
  })));
}

// node_modules/react-instantsearch/dist/es/widgets/Breadcrumb.js
function _typeof55(obj) {
  "@babel/helpers - typeof";
  return _typeof55 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof55(obj);
}
var _excluded21 = ["attributes", "rootPath", "separator", "transformItems", "translations"];
function _extends4() {
  _extends4 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends4.apply(this, arguments);
}
function ownKeys52(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread52(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys52(Object(source), true).forEach(function(key) {
      _defineProperty50(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys52(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty50(obj, key, value) {
  key = _toPropertyKey49(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey49(arg) {
  var key = _toPrimitive49(arg, "string");
  return _typeof55(key) === "symbol" ? key : String(key);
}
function _toPrimitive49(input, hint) {
  if (_typeof55(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof55(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties15(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose15(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose15(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Breadcrumb2(_ref) {
  var attributes = _ref.attributes, rootPath = _ref.rootPath, separator = _ref.separator, transformItems = _ref.transformItems, translations = _ref.translations, props = _objectWithoutProperties15(_ref, _excluded21);
  var _useBreadcrumb = useBreadcrumb({
    attributes,
    rootPath,
    transformItems
  }, {
    $$widgetType: "ais.breadcrumb"
  }), canRefine = _useBreadcrumb.canRefine, createURL = _useBreadcrumb.createURL, items = _useBreadcrumb.items, refine = _useBreadcrumb.refine;
  var uiProps = {
    items,
    hasItems: canRefine,
    createURL,
    onNavigate: refine,
    translations: _objectSpread52({
      rootElementText: "Home"
    }, translations)
  };
  return import_react27.default.createElement(Breadcrumb, _extends4({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/ClearRefinements.js
var import_react29 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/ClearRefinements.js
var import_react28 = __toESM(require_react(), 1);
var _excluded26 = ["classNames", "disabled", "onClick", "translations"];
function _extends5() {
  _extends5 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends5.apply(this, arguments);
}
function _objectWithoutProperties16(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose16(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose16(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function ClearRefinements(_ref) {
  var _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, _ref$disabled = _ref.disabled, disabled = _ref$disabled === void 0 ? false : _ref$disabled, _ref$onClick = _ref.onClick, onClick = _ref$onClick === void 0 ? function() {
  } : _ref$onClick, translations = _ref.translations, props = _objectWithoutProperties16(_ref, _excluded26);
  return import_react28.default.createElement("div", _extends5({}, props, {
    className: cx("ais-ClearRefinements", classNames.root, props.className)
  }), import_react28.default.createElement("button", {
    disabled,
    onClick,
    className: cx("ais-ClearRefinements-button", classNames.button, disabled && cx("ais-ClearRefinements-button--disabled", classNames.disabledButton))
  }, translations.resetButtonText));
}

// node_modules/react-instantsearch/dist/es/widgets/ClearRefinements.js
function _typeof56(obj) {
  "@babel/helpers - typeof";
  return _typeof56 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof56(obj);
}
var _excluded27 = ["includedAttributes", "excludedAttributes", "transformItems", "translations"];
function _extends6() {
  _extends6 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends6.apply(this, arguments);
}
function ownKeys53(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread53(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys53(Object(source), true).forEach(function(key) {
      _defineProperty51(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys53(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty51(obj, key, value) {
  key = _toPropertyKey50(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey50(arg) {
  var key = _toPrimitive50(arg, "string");
  return _typeof56(key) === "symbol" ? key : String(key);
}
function _toPrimitive50(input, hint) {
  if (_typeof56(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof56(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties17(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose17(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose17(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function ClearRefinements2(_ref) {
  var includedAttributes = _ref.includedAttributes, excludedAttributes = _ref.excludedAttributes, transformItems = _ref.transformItems, translations = _ref.translations, props = _objectWithoutProperties17(_ref, _excluded27);
  var _useClearRefinements = useClearRefinements({
    includedAttributes,
    excludedAttributes,
    transformItems
  }, {
    $$widgetType: "ais.clearRefinements"
  }), canRefine = _useClearRefinements.canRefine, refine = _useClearRefinements.refine;
  var uiProps = {
    onClick: refine,
    disabled: !canRefine,
    translations: _objectSpread53({
      resetButtonText: "Clear refinements"
    }, translations)
  };
  return import_react29.default.createElement(ClearRefinements, _extends6({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/CurrentRefinements.js
var import_react31 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/CurrentRefinements.js
var import_react30 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/lib/capitalize.js
function capitalize2(text) {
  return text.toString().charAt(0).toUpperCase() + text.toString().slice(1);
}

// node_modules/react-instantsearch/dist/es/ui/CurrentRefinements.js
var _excluded28 = ["classNames", "items", "hasRefinements"];
function _extends7() {
  _extends7 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends7.apply(this, arguments);
}
function _objectWithoutProperties18(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose18(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose18(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function CurrentRefinements(_ref) {
  var _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, _ref$items = _ref.items, items = _ref$items === void 0 ? [] : _ref$items, _ref$hasRefinements = _ref.hasRefinements, hasRefinements = _ref$hasRefinements === void 0 ? false : _ref$hasRefinements, props = _objectWithoutProperties18(_ref, _excluded28);
  return import_react30.default.createElement("div", _extends7({}, props, {
    className: cx("ais-CurrentRefinements", classNames.root, !hasRefinements && cx("ais-CurrentRefinements--noRefinement", classNames.noRefinementRoot), props.className)
  }), import_react30.default.createElement("ul", {
    className: cx(
      "ais-CurrentRefinements-list",
      classNames.list,
      /* @MAJOR remove to ensure conformity with InstantSearch.css specs */
      !hasRefinements && cx("ais-CurrentRefinements-list--noRefinement", classNames.noRefinementList)
    )
  }, items.map(function(item) {
    return import_react30.default.createElement("li", {
      key: [item.indexName, item.label].join("/"),
      className: cx("ais-CurrentRefinements-item", classNames.item)
    }, import_react30.default.createElement("span", {
      className: cx("ais-CurrentRefinements-label", classNames.label)
    }, capitalize2(item.label), ":", " "), item.refinements.map(function(refinement) {
      return import_react30.default.createElement("span", {
        key: refinement.label,
        className: cx("ais-CurrentRefinements-category", classNames.category)
      }, import_react30.default.createElement("span", {
        className: cx("ais-CurrentRefinements-categoryLabel", classNames.categoryLabel)
      }, refinement.label), import_react30.default.createElement("button", {
        type: "button",
        onClick: function onClick(event) {
          if (isModifierClick(event)) {
            return;
          }
          item.refine(refinement);
        },
        className: cx("ais-CurrentRefinements-delete", classNames.delete)
      }, "✕"));
    }));
  })));
}

// node_modules/react-instantsearch/dist/es/widgets/CurrentRefinements.js
var _excluded29 = ["includedAttributes", "excludedAttributes", "transformItems"];
function _extends8() {
  _extends8 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends8.apply(this, arguments);
}
function _objectWithoutProperties19(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose19(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose19(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function CurrentRefinements2(_ref) {
  var includedAttributes = _ref.includedAttributes, excludedAttributes = _ref.excludedAttributes, transformItems = _ref.transformItems, props = _objectWithoutProperties19(_ref, _excluded29);
  var _useCurrentRefinement = useCurrentRefinements({
    includedAttributes,
    excludedAttributes,
    transformItems
  }, {
    $$widgetType: "ais.currentRefinements"
  }), items = _useCurrentRefinement.items, canRefine = _useCurrentRefinement.canRefine;
  var uiProps = {
    items,
    hasRefinements: canRefine
  };
  return import_react31.default.createElement(CurrentRefinements, _extends8({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/FrequentlyBoughtTogether.js
var import_react32 = __toESM(require_react(), 1);
function _typeof57(obj) {
  "@babel/helpers - typeof";
  return _typeof57 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof57(obj);
}
var _excluded30 = ["objectIDs", "limit", "threshold", "queryParameters", "escapeHTML", "transformItems", "itemComponent", "headerComponent", "emptyComponent", "layoutComponent"];
function _extends9() {
  _extends9 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends9.apply(this, arguments);
}
function ownKeys54(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread54(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys54(Object(source), true).forEach(function(key) {
      _defineProperty52(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys54(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty52(obj, key, value) {
  key = _toPropertyKey51(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey51(arg) {
  var key = _toPrimitive51(arg, "string");
  return _typeof57(key) === "symbol" ? key : String(key);
}
function _toPrimitive51(input, hint) {
  if (_typeof57(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof57(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties20(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose20(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose20(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var FrequentlyBoughtTogetherUiComponent = createFrequentlyBoughtTogetherComponent({
  createElement: import_react32.createElement,
  Fragment: import_react32.Fragment
});
function FrequentlyBoughtTogether(_ref) {
  var objectIDs = _ref.objectIDs, limit = _ref.limit, threshold = _ref.threshold, queryParameters = _ref.queryParameters, escapeHTML = _ref.escapeHTML, transformItems = _ref.transformItems, itemComponent = _ref.itemComponent, headerComponent = _ref.headerComponent, emptyComponent = _ref.emptyComponent, layoutComponent = _ref.layoutComponent, props = _objectWithoutProperties20(_ref, _excluded30);
  var _useInstantSearch = useInstantSearch(), status = _useInstantSearch.status;
  var _useFrequentlyBoughtT = useFrequentlyBoughtTogether({
    objectIDs,
    limit,
    threshold,
    queryParameters,
    escapeHTML,
    transformItems
  }, {
    $$widgetType: "ais.frequentlyBoughtTogether"
  }), items = _useFrequentlyBoughtT.items;
  var layout = layoutComponent ? function(layoutProps) {
    return layoutComponent(_objectSpread54(_objectSpread54({}, layoutProps), {}, {
      classNames: {
        list: layoutProps.classNames.list,
        item: layoutProps.classNames.item
      }
    }));
  } : void 0;
  var uiProps = {
    items,
    itemComponent,
    headerComponent,
    emptyComponent,
    layout,
    status,
    sendEvent: function sendEvent() {
    }
  };
  return import_react32.default.createElement(FrequentlyBoughtTogetherUiComponent, _extends9({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/HierarchicalMenu.js
var import_react35 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/HierarchicalMenu.js
var import_react34 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/ShowMoreButton.js
var import_react33 = __toESM(require_react(), 1);
var _excluded31 = ["isShowingMore", "translations"];
function _objectWithoutProperties21(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose21(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose21(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function ShowMoreButton(_ref) {
  var isShowingMore = _ref.isShowingMore, translations = _ref.translations, props = _objectWithoutProperties21(_ref, _excluded31);
  return import_react33.default.createElement("button", props, translations.showMoreButtonText({
    isShowingMore
  }));
}

// node_modules/react-instantsearch/dist/es/ui/HierarchicalMenu.js
var _excluded32 = ["classNames", "items", "hasItems", "onNavigate", "createURL", "showMore", "canToggleShowMore", "onToggleShowMore", "isShowingMore", "translations"];
function _extends10() {
  _extends10 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends10.apply(this, arguments);
}
function _objectWithoutProperties22(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose22(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose22(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function HierarchicalList(_ref) {
  var className = _ref.className, _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, items = _ref.items, createURL = _ref.createURL, onNavigate = _ref.onNavigate;
  if (items.length === 0) {
    return null;
  }
  return import_react34.default.createElement("ul", {
    className: cx("ais-HierarchicalMenu-list", classNames.list, className)
  }, items.map(function(item) {
    return import_react34.default.createElement("li", {
      key: item.value,
      className: cx("ais-HierarchicalMenu-item", classNames.item, item.isRefined && cx("ais-HierarchicalMenu-item--selected", classNames.selectedItem), item.data && item.data.length > 0 && cx("ais-HierarchicalMenu-item--parent", classNames.parentItem))
    }, import_react34.default.createElement("a", {
      className: cx("ais-HierarchicalMenu-link", classNames.link, item.isRefined && cx("ais-HierarchicalMenu-link--selected", classNames.selectedItemLink)),
      href: createURL(item.value),
      onClick: function onClick(event) {
        if (isModifierClick(event)) {
          return;
        }
        event.preventDefault();
        onNavigate(item.value);
      }
    }, import_react34.default.createElement("span", {
      className: cx("ais-HierarchicalMenu-label", classNames.label)
    }, item.label), import_react34.default.createElement("span", {
      className: cx("ais-HierarchicalMenu-count", classNames.count)
    }, item.count)), item.data && import_react34.default.createElement(HierarchicalList, {
      className: cx("ais-HierarchicalMenu-list--child", classNames.childList),
      classNames,
      items: item.data,
      onNavigate,
      createURL
    }));
  }));
}
function HierarchicalMenu(_ref22) {
  var _ref2$classNames = _ref22.classNames, classNames = _ref2$classNames === void 0 ? {} : _ref2$classNames, items = _ref22.items, hasItems = _ref22.hasItems, onNavigate = _ref22.onNavigate, createURL = _ref22.createURL, showMore = _ref22.showMore, canToggleShowMore = _ref22.canToggleShowMore, onToggleShowMore = _ref22.onToggleShowMore, isShowingMore = _ref22.isShowingMore, translations = _ref22.translations, props = _objectWithoutProperties22(_ref22, _excluded32);
  return import_react34.default.createElement("div", _extends10({}, props, {
    className: cx("ais-HierarchicalMenu", classNames.root, !hasItems && cx("ais-HierarchicalMenu--noRefinement", classNames.noRefinementRoot), props.className)
  }), import_react34.default.createElement(HierarchicalList, {
    classNames,
    items,
    onNavigate,
    createURL
  }), showMore && import_react34.default.createElement(ShowMoreButton, {
    className: cx("ais-HierarchicalMenu-showMore", classNames.showMore, !canToggleShowMore && cx("ais-HierarchicalMenu-showMore--disabled", classNames.disabledShowMore)),
    disabled: !canToggleShowMore,
    onClick: onToggleShowMore,
    isShowingMore,
    translations
  }));
}

// node_modules/react-instantsearch/dist/es/widgets/HierarchicalMenu.js
function _typeof58(obj) {
  "@babel/helpers - typeof";
  return _typeof58 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof58(obj);
}
var _excluded33 = ["attributes", "limit", "rootPath", "separator", "showMore", "showMoreLimit", "showParentLevel", "sortBy", "transformItems", "translations"];
function _extends11() {
  _extends11 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends11.apply(this, arguments);
}
function ownKeys55(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread55(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys55(Object(source), true).forEach(function(key) {
      _defineProperty53(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys55(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty53(obj, key, value) {
  key = _toPropertyKey52(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey52(arg) {
  var key = _toPrimitive52(arg, "string");
  return _typeof58(key) === "symbol" ? key : String(key);
}
function _toPrimitive52(input, hint) {
  if (_typeof58(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof58(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties23(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose23(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose23(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function HierarchicalMenu2(_ref) {
  var attributes = _ref.attributes, limit = _ref.limit, rootPath = _ref.rootPath, separator = _ref.separator, showMore = _ref.showMore, showMoreLimit = _ref.showMoreLimit, showParentLevel = _ref.showParentLevel, sortBy = _ref.sortBy, transformItems = _ref.transformItems, translations = _ref.translations, props = _objectWithoutProperties23(_ref, _excluded33);
  var _useHierarchicalMenu = useHierarchicalMenu({
    attributes,
    limit,
    rootPath,
    separator,
    showMore,
    showMoreLimit,
    showParentLevel,
    sortBy,
    transformItems
  }, {
    $$widgetType: "ais.hierarchicalMenu"
  }), items = _useHierarchicalMenu.items, canRefine = _useHierarchicalMenu.canRefine, canToggleShowMore = _useHierarchicalMenu.canToggleShowMore, createURL = _useHierarchicalMenu.createURL, isShowingMore = _useHierarchicalMenu.isShowingMore, refine = _useHierarchicalMenu.refine, toggleShowMore = _useHierarchicalMenu.toggleShowMore;
  var uiProps = {
    items,
    hasItems: canRefine,
    createURL,
    onNavigate: refine,
    canToggleShowMore,
    onToggleShowMore: toggleShowMore,
    isShowingMore,
    translations: _objectSpread55({
      showMoreButtonText: function showMoreButtonText(options) {
        return options.isShowingMore ? "Show less" : "Show more";
      }
    }, translations)
  };
  return import_react35.default.createElement(HierarchicalMenu, _extends11({}, props, uiProps, {
    showMore
  }));
}

// node_modules/react-instantsearch/dist/es/widgets/Highlight.js
var import_react38 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/Highlight.js
var import_react37 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/InternalHighlight.js
var import_react36 = __toESM(require_react(), 1);
var InternalHighlight = createHighlightComponent({
  createElement: import_react36.createElement,
  Fragment: import_react36.Fragment
});

// node_modules/react-instantsearch/dist/es/ui/Highlight.js
var _excluded34 = ["classNames"];
function _extends12() {
  _extends12 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends12.apply(this, arguments);
}
function _objectWithoutProperties24(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose24(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose24(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Highlight(_ref) {
  var _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, props = _objectWithoutProperties24(_ref, _excluded34);
  return import_react37.default.createElement(InternalHighlight, _extends12({
    classNames: {
      root: cx("ais-Highlight", classNames.root),
      highlighted: cx("ais-Highlight-highlighted", classNames.highlighted),
      nonHighlighted: cx("ais-Highlight-nonHighlighted", classNames.nonHighlighted),
      separator: cx("ais-Highlight-separator", classNames.separator)
    }
  }, props));
}

// node_modules/react-instantsearch/dist/es/widgets/Highlight.js
var _excluded35 = ["hit", "attribute", "highlightedTagName", "nonHighlightedTagName", "separator"];
function _extends13() {
  _extends13 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends13.apply(this, arguments);
}
function _objectWithoutProperties25(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose25(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose25(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Highlight2(_ref) {
  var hit = _ref.hit, attribute = _ref.attribute, highlightedTagName = _ref.highlightedTagName, nonHighlightedTagName = _ref.nonHighlightedTagName, separator = _ref.separator, props = _objectWithoutProperties25(_ref, _excluded35);
  var property = getPropertyByPath(hit._highlightResult, attribute) || [];
  var properties = Array.isArray(property) ? property : [property];
  var parts = properties.map(function(singleValue) {
    return getHighlightedParts(unescape2(singleValue.value || ""));
  });
  return import_react38.default.createElement(Highlight, _extends13({}, props, {
    parts,
    highlightedTagName,
    nonHighlightedTagName,
    separator
  }));
}

// node_modules/react-instantsearch/dist/es/widgets/Hits.js
var import_react39 = __toESM(require_react(), 1);
var _excluded36 = ["escapeHTML", "transformItems", "hitComponent", "bannerComponent"];
var _excluded210 = ["hit", "index"];
function _extends14() {
  _extends14 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends14.apply(this, arguments);
}
function _objectWithoutProperties26(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose26(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose26(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function DefaultHitComponent(_ref) {
  var hit = _ref.hit;
  return import_react39.default.createElement("div", {
    style: {
      wordBreak: "break-all"
    }
  }, JSON.stringify(hit).slice(0, 100), "…");
}
var HitsUiComponent = createHitsComponent({
  createElement: import_react39.createElement,
  Fragment: import_react39.Fragment
});
function Hits(_ref22) {
  var escapeHTML = _ref22.escapeHTML, transformItems = _ref22.transformItems, _ref2$hitComponent = _ref22.hitComponent, HitComponent = _ref2$hitComponent === void 0 ? DefaultHitComponent : _ref2$hitComponent, BannerComponent = _ref22.bannerComponent, props = _objectWithoutProperties26(_ref22, _excluded36);
  var _useHits = useHits({
    escapeHTML,
    transformItems
  }, {
    $$widgetType: "ais.hits"
  }), hits = _useHits.hits, banner = _useHits.banner, sendEvent = _useHits.sendEvent;
  var itemComponent = (0, import_react39.useMemo)(function() {
    return function(_ref3) {
      var hit = _ref3.hit, index3 = _ref3.index, itemProps = _objectWithoutProperties26(_ref3, _excluded210);
      return import_react39.default.createElement("li", _extends14({
        key: hit.objectID
      }, itemProps), import_react39.default.createElement(HitComponent, {
        hit,
        sendEvent
      }));
    };
  }, [HitComponent, sendEvent]);
  var bannerComponent = BannerComponent === false ? function() {
    return null;
  } : BannerComponent;
  var uiProps = {
    hits,
    sendEvent,
    itemComponent,
    banner,
    bannerComponent
  };
  return import_react39.default.createElement(HitsUiComponent, _extends14({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/HitsPerPage.js
var import_react41 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/HitsPerPage.js
var import_react40 = __toESM(require_react(), 1);
var _excluded37 = ["items", "onChange", "currentValue", "classNames"];
function _extends15() {
  _extends15 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends15.apply(this, arguments);
}
function _objectWithoutProperties27(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose27(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose27(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function HitsPerPage(_ref) {
  var items = _ref.items, _onChange = _ref.onChange, currentValue = _ref.currentValue, _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, props = _objectWithoutProperties27(_ref, _excluded37);
  return import_react40.default.createElement("div", _extends15({}, props, {
    className: cx("ais-HitsPerPage", classNames.root, props.className)
  }), import_react40.default.createElement("select", {
    className: cx("ais-HitsPerPage-select", classNames.select),
    onChange: function onChange(event) {
      _onChange(Number(event.target.value));
    },
    value: String(currentValue)
  }, items.map(function(item) {
    return import_react40.default.createElement("option", {
      key: item.value,
      className: cx("ais-HitsPerPage-option", classNames.option),
      value: item.value
    }, item.label);
  })));
}

// node_modules/react-instantsearch/dist/es/widgets/HitsPerPage.js
var _excluded38 = ["items", "transformItems"];
function _extends16() {
  _extends16 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends16.apply(this, arguments);
}
function _objectWithoutProperties28(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose28(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose28(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function HitsPerPage2(_ref) {
  var userItems = _ref.items, transformItems = _ref.transformItems, props = _objectWithoutProperties28(_ref, _excluded38);
  var _useHitsPerPage = useHitsPerPage({
    items: userItems,
    transformItems
  }, {
    $$widgetType: "ais.hitsPerPage"
  }), items = _useHitsPerPage.items, refine = _useHitsPerPage.refine;
  var _ref22 = items.find(function(_ref3) {
    var isRefined2 = _ref3.isRefined;
    return isRefined2;
  }) || {}, currentValue = _ref22.value;
  var uiProps = {
    items,
    currentValue,
    onChange: function onChange(value) {
      return refine(value);
    }
  };
  return import_react41.default.createElement(HitsPerPage, _extends16({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/InfiniteHits.js
var import_react43 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/InfiniteHits.js
var import_react42 = __toESM(require_react(), 1);
var _excluded39 = ["hitComponent", "hits", "bannerComponent", "banner", "sendEvent", "isFirstPage", "isLastPage", "onShowPrevious", "onShowMore", "classNames", "translations"];
function _extends17() {
  _extends17 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends17.apply(this, arguments);
}
function _objectWithoutProperties29(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose29(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose29(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function DefaultHitComponent2(_ref) {
  var hit = _ref.hit;
  return import_react42.default.createElement("div", {
    style: {
      wordBreak: "break-all"
    }
  }, JSON.stringify(hit).slice(0, 100), "…");
}
function DefaultBanner(_ref22) {
  var classNames = _ref22.classNames, banner = _ref22.banner;
  if (!banner.image.urls[0].url) {
    return null;
  }
  return import_react42.default.createElement("aside", {
    className: cx("ais-InfiniteHits-banner", classNames.bannerRoot)
  }, banner.link ? import_react42.default.createElement("a", {
    className: cx("ais-InfiniteHits-banner-link", classNames.bannerLink),
    href: banner.link.url,
    target: banner.link.target
  }, import_react42.default.createElement("img", {
    className: cx("ais-InfiniteHits-banner-image", classNames.bannerImage),
    src: banner.image.urls[0].url,
    alt: banner.image.title
  })) : import_react42.default.createElement("img", {
    className: cx("ais-InfiniteHits-banner-image", classNames.bannerImage),
    src: banner.image.urls[0].url,
    alt: banner.image.title
  }));
}
function InfiniteHits(_ref3) {
  var _ref3$hitComponent = _ref3.hitComponent, HitComponent = _ref3$hitComponent === void 0 ? DefaultHitComponent2 : _ref3$hitComponent, hits = _ref3.hits, BannerComponent = _ref3.bannerComponent, banner = _ref3.banner, sendEvent = _ref3.sendEvent, isFirstPage = _ref3.isFirstPage, isLastPage = _ref3.isLastPage, onShowPrevious = _ref3.onShowPrevious, onShowMore = _ref3.onShowMore, _ref3$classNames = _ref3.classNames, classNames = _ref3$classNames === void 0 ? {} : _ref3$classNames, translations = _ref3.translations, props = _objectWithoutProperties29(_ref3, _excluded39);
  return import_react42.default.createElement("div", _extends17({}, props, {
    className: cx("ais-InfiniteHits", classNames.root, hits.length === 0 && cx("ais-InfiniteHits--empty", classNames.emptyRoot), props.className)
  }), onShowPrevious && import_react42.default.createElement("button", {
    className: cx("ais-InfiniteHits-loadPrevious", classNames.loadPrevious, isFirstPage && cx("ais-InfiniteHits-loadPrevious--disabled", classNames.disabledLoadPrevious)),
    onClick: onShowPrevious,
    disabled: isFirstPage
  }, translations.showPreviousButtonText), banner && (BannerComponent ? import_react42.default.createElement(BannerComponent, {
    className: cx("ais-InfiniteHits-banner", classNames.bannerRoot),
    banner
  }) : import_react42.default.createElement(DefaultBanner, {
    classNames,
    banner
  })), import_react42.default.createElement("ol", {
    className: cx("ais-InfiniteHits-list", classNames.list)
  }, hits.map(function(hit) {
    return import_react42.default.createElement("li", {
      key: hit.objectID,
      className: cx("ais-InfiniteHits-item", classNames.item),
      onClick: function onClick() {
        sendEvent("click:internal", hit, "Hit Clicked");
      },
      onAuxClick: function onAuxClick() {
        sendEvent("click:internal", hit, "Hit Clicked");
      }
    }, import_react42.default.createElement(HitComponent, {
      hit,
      sendEvent
    }));
  })), import_react42.default.createElement("button", {
    className: cx("ais-InfiniteHits-loadMore", classNames.loadMore, isLastPage && cx("ais-InfiniteHits-loadMore--disabled", classNames.disabledLoadMore)),
    onClick: onShowMore,
    disabled: isLastPage
  }, translations.showMoreButtonText));
}

// node_modules/react-instantsearch/dist/es/widgets/InfiniteHits.js
function _typeof59(obj) {
  "@babel/helpers - typeof";
  return _typeof59 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof59(obj);
}
var _excluded40 = ["showPrevious", "cache", "escapeHTML", "showPrevious", "transformItems", "translations", "bannerComponent"];
function _extends18() {
  _extends18 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends18.apply(this, arguments);
}
function ownKeys56(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread56(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys56(Object(source), true).forEach(function(key) {
      _defineProperty54(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys56(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty54(obj, key, value) {
  key = _toPropertyKey53(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey53(arg) {
  var key = _toPrimitive53(arg, "string");
  return _typeof59(key) === "symbol" ? key : String(key);
}
function _toPrimitive53(input, hint) {
  if (_typeof59(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof59(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties30(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose30(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose30(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function InfiniteHits2(_ref) {
  var _ref$showPrevious = _ref.showPrevious, shouldShowPrevious = _ref$showPrevious === void 0 ? true : _ref$showPrevious, cache = _ref.cache, escapeHTML = _ref.escapeHTML, userShowPrevious = _ref.showPrevious, transformItems = _ref.transformItems, translations = _ref.translations, BannerComponent = _ref.bannerComponent, props = _objectWithoutProperties30(_ref, _excluded40);
  var _useInfiniteHits = useInfiniteHits({
    cache,
    escapeHTML,
    showPrevious: userShowPrevious,
    transformItems
  }, {
    $$widgetType: "ais.infiniteHits"
  }), hits = _useInfiniteHits.hits, banner = _useInfiniteHits.banner, sendEvent = _useInfiniteHits.sendEvent, showPrevious = _useInfiniteHits.showPrevious, showMore = _useInfiniteHits.showMore, isFirstPage = _useInfiniteHits.isFirstPage, isLastPage = _useInfiniteHits.isLastPage;
  var bannerComponent = BannerComponent === false ? function() {
    return null;
  } : BannerComponent;
  var uiProps = {
    hits,
    banner,
    bannerComponent,
    sendEvent,
    onShowPrevious: shouldShowPrevious ? showPrevious : void 0,
    onShowMore: showMore,
    isFirstPage,
    isLastPage,
    translations: _objectSpread56({
      showPreviousButtonText: "Show previous results",
      showMoreButtonText: "Show more results"
    }, translations)
  };
  return import_react43.default.createElement(InfiniteHits, _extends18({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/Menu.js
var import_react45 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/Menu.js
var import_react44 = __toESM(require_react(), 1);
var _excluded41 = ["items", "classNames", "showMore", "canToggleShowMore", "onToggleShowMore", "isShowingMore", "createURL", "onRefine", "translations"];
function _extends19() {
  _extends19 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends19.apply(this, arguments);
}
function _objectWithoutProperties31(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose31(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose31(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Menu(_ref) {
  var items = _ref.items, _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, showMore = _ref.showMore, canToggleShowMore = _ref.canToggleShowMore, onToggleShowMore = _ref.onToggleShowMore, isShowingMore = _ref.isShowingMore, createURL = _ref.createURL, onRefine = _ref.onRefine, translations = _ref.translations, props = _objectWithoutProperties31(_ref, _excluded41);
  return import_react44.default.createElement("div", _extends19({}, props, {
    className: cx("ais-Menu", classNames.root, items.length === 0 && cx("ais-Menu--noRefinement", classNames.noRefinementRoot), props.className)
  }), import_react44.default.createElement("ul", {
    className: cx("ais-Menu-list", classNames.list)
  }, items.map(function(item) {
    return import_react44.default.createElement("li", {
      key: item.label,
      className: cx("ais-Menu-item", classNames.item, item.isRefined && cx("ais-Menu-item--selected", classNames.selectedItem))
    }, import_react44.default.createElement("a", {
      className: cx("ais-Menu-link", classNames.link),
      href: createURL(item.value),
      onClick: function onClick(event) {
        if (isModifierClick(event)) {
          return;
        }
        event.preventDefault();
        onRefine(item);
      }
    }, import_react44.default.createElement("span", {
      className: cx("ais-Menu-label", classNames.label)
    }, item.label), import_react44.default.createElement("span", {
      className: cx("ais-Menu-count", classNames.count)
    }, item.count)));
  })), showMore && import_react44.default.createElement(ShowMoreButton, {
    className: cx("ais-Menu-showMore", classNames.showMore, !canToggleShowMore && cx("ais-Menu-showMore--disabled", classNames.disabledShowMore)),
    disabled: !canToggleShowMore,
    onClick: onToggleShowMore,
    isShowingMore,
    translations
  }));
}

// node_modules/react-instantsearch/dist/es/widgets/Menu.js
function _typeof60(obj) {
  "@babel/helpers - typeof";
  return _typeof60 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof60(obj);
}
var _excluded42 = ["attribute", "limit", "showMore", "showMoreLimit", "sortBy", "transformItems", "translations"];
function _extends20() {
  _extends20 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends20.apply(this, arguments);
}
function ownKeys57(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread57(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys57(Object(source), true).forEach(function(key) {
      _defineProperty55(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys57(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty55(obj, key, value) {
  key = _toPropertyKey54(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey54(arg) {
  var key = _toPrimitive54(arg, "string");
  return _typeof60(key) === "symbol" ? key : String(key);
}
function _toPrimitive54(input, hint) {
  if (_typeof60(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof60(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties32(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose32(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose32(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Menu2(_ref) {
  var attribute = _ref.attribute, limit = _ref.limit, showMore = _ref.showMore, showMoreLimit = _ref.showMoreLimit, sortBy = _ref.sortBy, transformItems = _ref.transformItems, translations = _ref.translations, props = _objectWithoutProperties32(_ref, _excluded42);
  var _useMenu = useMenu({
    attribute,
    limit,
    showMore,
    showMoreLimit,
    sortBy,
    transformItems
  }, {
    $$widgetType: "ais.menu"
  }), canToggleShowMore = _useMenu.canToggleShowMore, isShowingMore = _useMenu.isShowingMore, items = _useMenu.items, refine = _useMenu.refine, createURL = _useMenu.createURL, toggleShowMore = _useMenu.toggleShowMore;
  var uiProps = {
    items,
    createURL,
    onRefine: function onRefine(item) {
      return refine(item.value);
    },
    canToggleShowMore,
    onToggleShowMore: toggleShowMore,
    isShowingMore,
    translations: _objectSpread57({
      showMoreButtonText: function showMoreButtonText(options) {
        return options.isShowingMore ? "Show less" : "Show more";
      }
    }, translations)
  };
  return import_react45.default.createElement(Menu, _extends20({}, props, uiProps, {
    showMore
  }));
}

// node_modules/react-instantsearch/dist/es/widgets/Pagination.js
var import_react47 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/Pagination.js
var import_react46 = __toESM(require_react(), 1);
var _excluded43 = ["pages", "currentPage", "nbPages", "isFirstPage", "isLastPage", "showFirst", "showPrevious", "showNext", "showLast", "createURL", "onNavigate", "translations", "classNames"];
var _excluded211 = ["isDisabled", "className", "classNames", "href", "onClick"];
function _extends21() {
  _extends21 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends21.apply(this, arguments);
}
function _objectWithoutProperties33(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose33(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose33(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Pagination(_ref) {
  var pages = _ref.pages, currentPage = _ref.currentPage, nbPages = _ref.nbPages, isFirstPage = _ref.isFirstPage, isLastPage = _ref.isLastPage, _ref$showFirst = _ref.showFirst, showFirst = _ref$showFirst === void 0 ? true : _ref$showFirst, _ref$showPrevious = _ref.showPrevious, showPrevious = _ref$showPrevious === void 0 ? true : _ref$showPrevious, _ref$showNext = _ref.showNext, showNext = _ref$showNext === void 0 ? true : _ref$showNext, _ref$showLast = _ref.showLast, showLast = _ref$showLast === void 0 ? true : _ref$showLast, createURL = _ref.createURL, onNavigate = _ref.onNavigate, translations = _ref.translations, _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, props = _objectWithoutProperties33(_ref, _excluded43);
  var firstPageIndex = 0;
  var previousPageIndex = currentPage - 1;
  var nextPageIndex = currentPage + 1;
  var lastPageIndex = nbPages - 1;
  return import_react46.default.createElement("div", _extends21({}, props, {
    className: cx("ais-Pagination", classNames.root, nbPages <= 1 && cx("ais-Pagination--noRefinement", classNames.noRefinementRoot), props.className)
  }), import_react46.default.createElement("ul", {
    className: cx("ais-Pagination-list", classNames.list)
  }, showFirst && import_react46.default.createElement(PaginationItem, {
    isDisabled: isFirstPage,
    className: cx("ais-Pagination-item--firstPage", classNames.firstPageItem),
    classNames,
    "aria-label": translations.firstPageItemAriaLabel,
    href: createURL(firstPageIndex),
    onClick: function onClick() {
      return onNavigate(firstPageIndex);
    }
  }, translations.firstPageItemText), showPrevious && import_react46.default.createElement(PaginationItem, {
    isDisabled: isFirstPage,
    className: cx("ais-Pagination-item--previousPage", classNames.previousPageItem),
    classNames,
    "aria-label": translations.previousPageItemAriaLabel,
    href: createURL(previousPageIndex),
    onClick: function onClick() {
      return onNavigate(previousPageIndex);
    }
  }, translations.previousPageItemText), pages.map(function(page) {
    return import_react46.default.createElement(PaginationItem, {
      key: page,
      isDisabled: false,
      className: cx("ais-Pagination-item--page", classNames.pageItem, page === currentPage && cx("ais-Pagination-item--selected", classNames.selectedItem)),
      classNames,
      "aria-label": translations.pageItemAriaLabel({
        currentPage: page + 1,
        nbPages
      }),
      href: createURL(page),
      onClick: function onClick() {
        return onNavigate(page);
      }
    }, translations.pageItemText({
      currentPage: page + 1,
      nbPages
    }));
  }), showNext && import_react46.default.createElement(PaginationItem, {
    isDisabled: isLastPage,
    className: cx("ais-Pagination-item--nextPage", classNames.nextPageItem),
    classNames,
    "aria-label": translations.nextPageItemAriaLabel,
    href: createURL(nextPageIndex),
    onClick: function onClick() {
      return onNavigate(nextPageIndex);
    }
  }, translations.nextPageItemText), showLast && import_react46.default.createElement(PaginationItem, {
    isDisabled: isLastPage,
    className: cx("ais-Pagination-item--lastPage", classNames.lastPageItem),
    classNames,
    "aria-label": translations.lastPageItemAriaLabel,
    href: createURL(lastPageIndex),
    onClick: function onClick() {
      return onNavigate(lastPageIndex);
    }
  }, translations.lastPageItemText)));
}
function PaginationItem(_ref22) {
  var isDisabled = _ref22.isDisabled, className = _ref22.className, classNames = _ref22.classNames, href = _ref22.href, _onClick = _ref22.onClick, props = _objectWithoutProperties33(_ref22, _excluded211);
  if (isDisabled) {
    return import_react46.default.createElement("li", {
      className: cx("ais-Pagination-item", classNames.item, "ais-Pagination-item--disabled", classNames.disabledItem, className)
    }, import_react46.default.createElement("span", _extends21({
      className: cx("ais-Pagination-link", classNames.link)
    }, props)));
  }
  return import_react46.default.createElement("li", {
    className: cx("ais-Pagination-item", classNames.item, className)
  }, import_react46.default.createElement("a", _extends21({
    className: cx("ais-Pagination-link", classNames.link),
    href,
    onClick: function onClick(event) {
      if (isModifierClick(event)) {
        return;
      }
      event.preventDefault();
      _onClick(event);
    }
  }, props)));
}

// node_modules/react-instantsearch/dist/es/widgets/Pagination.js
function _typeof61(obj) {
  "@babel/helpers - typeof";
  return _typeof61 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof61(obj);
}
var _excluded44 = ["showFirst", "showPrevious", "showNext", "showLast", "padding", "totalPages", "translations"];
function _extends22() {
  _extends22 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends22.apply(this, arguments);
}
function ownKeys58(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread58(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys58(Object(source), true).forEach(function(key) {
      _defineProperty56(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys58(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty56(obj, key, value) {
  key = _toPropertyKey55(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey55(arg) {
  var key = _toPrimitive55(arg, "string");
  return _typeof61(key) === "symbol" ? key : String(key);
}
function _toPrimitive55(input, hint) {
  if (_typeof61(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof61(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties34(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose34(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose34(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Pagination2(_ref) {
  var showFirst = _ref.showFirst, showPrevious = _ref.showPrevious, showNext = _ref.showNext, showLast = _ref.showLast, padding = _ref.padding, totalPages = _ref.totalPages, translations = _ref.translations, props = _objectWithoutProperties34(_ref, _excluded44);
  var _usePagination = usePagination({
    padding,
    totalPages
  }, {
    $$widgetType: "ais.pagination"
  }), pages = _usePagination.pages, currentRefinement = _usePagination.currentRefinement, isFirstPage = _usePagination.isFirstPage, isLastPage = _usePagination.isLastPage, nbPages = _usePagination.nbPages, createURL = _usePagination.createURL, refine = _usePagination.refine;
  var uiProps = {
    pages,
    currentPage: currentRefinement,
    isFirstPage,
    isLastPage,
    nbPages,
    createURL,
    onNavigate: refine,
    translations: _objectSpread58({
      firstPageItemText: "‹‹",
      previousPageItemText: "‹",
      nextPageItemText: "›",
      lastPageItemText: "››",
      pageItemText: function pageItemText(_ref22) {
        var currentPage = _ref22.currentPage;
        return String(currentPage);
      },
      firstPageItemAriaLabel: "First Page",
      previousPageItemAriaLabel: "Previous Page",
      nextPageItemAriaLabel: "Next Page",
      lastPageItemAriaLabel: "Last Page, Page ".concat(nbPages),
      pageItemAriaLabel: function pageItemAriaLabel(_ref3) {
        var currentPage = _ref3.currentPage;
        return "Page ".concat(currentPage);
      }
    }, translations)
  };
  return import_react47.default.createElement(Pagination, _extends22({}, props, uiProps, {
    showFirst,
    showPrevious,
    showNext,
    showLast
  }));
}

// node_modules/react-instantsearch/dist/es/widgets/PoweredBy.js
var import_react49 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/PoweredBy.js
var import_react48 = __toESM(require_react(), 1);
var _excluded45 = ["classNames", "url", "theme"];
function _extends23() {
  _extends23 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends23.apply(this, arguments);
}
function _objectWithoutProperties35(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose35(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose35(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function PoweredBy(_ref) {
  var _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, url = _ref.url, _ref$theme = _ref.theme, theme = _ref$theme === void 0 ? "light" : _ref$theme, props = _objectWithoutProperties35(_ref, _excluded45);
  return import_react48.default.createElement("div", _extends23({}, props, {
    className: cx("ais-PoweredBy", theme === "dark" ? cx("ais-PoweredBy--dark", classNames.dark) : cx("ais-PoweredBy--light", classNames.light), classNames.root, props.className)
  }), import_react48.default.createElement("a", {
    href: url,
    target: "_blank",
    className: cx("ais-PoweredBy-link", classNames.link),
    "aria-label": "Search by Algolia",
    rel: "noopener noreferrer"
  }, import_react48.default.createElement("svg", {
    viewBox: "0 0 572 64",
    className: cx("ais-PoweredBy-logo", classNames.logo)
  }, import_react48.default.createElement("path", {
    fill: theme === "dark" ? "#FFF" : "#36395A",
    d: "M16 48.3c-3.4 0-6.3-.6-8.7-1.7A12.4 12.4 0 0 1 1.9 42C.6 40 0 38 0 35.4h6.5a6.7 6.7 0 0 0 3.9 6c1.4.7 3.3 1.1 5.6 1.1 2.2 0 4-.3 5.4-1a7 7 0 0 0 3-2.4 6 6 0 0 0 1-3.4c0-1.5-.6-2.8-1.9-3.7-1.3-1-3.3-1.6-5.9-1.8l-4-.4c-3.7-.3-6.6-1.4-8.8-3.4a10 10 0 0 1-3.3-7.9c0-2.4.6-4.6 1.8-6.4a12 12 0 0 1 5-4.3c2.2-1 4.7-1.6 7.5-1.6s5.5.5 7.6 1.6a12 12 0 0 1 5 4.4c1.2 1.8 1.8 4 1.8 6.7h-6.5a6.4 6.4 0 0 0-3.5-5.9c-1-.6-2.6-1-4.4-1s-3.2.3-4.4 1c-1.1.6-2 1.4-2.6 2.4-.5 1-.8 2-.8 3.1a5 5 0 0 0 1.5 3.6c1 1 2.6 1.7 4.7 1.9l4 .3c2.8.2 5.2.8 7.2 1.8 2.1 1 3.7 2.2 4.9 3.8a9.7 9.7 0 0 1 1.7 5.8c0 2.5-.7 4.7-2 6.6a13 13 0 0 1-5.6 4.4c-2.4 1-5.2 1.6-8.4 1.6Zm35.6 0c-2.6 0-4.8-.4-6.7-1.3a13 13 0 0 1-4.7-3.5 17.1 17.1 0 0 1-3.6-10.4v-1c0-2 .3-3.8 1-5.6a13 13 0 0 1 7.3-8.3 15 15 0 0 1 6.3-1.4A13.2 13.2 0 0 1 64 24.3c1 2.2 1.6 4.6 1.6 7.2V34H39.4v-4.3h21.8l-1.8 2.2c0-2-.3-3.7-.9-5.1a7.3 7.3 0 0 0-2.7-3.4c-1.2-.7-2.7-1.1-4.6-1.1s-3.4.4-4.7 1.3a8 8 0 0 0-2.9 3.6c-.6 1.5-.9 3.3-.9 5.4 0 2 .3 3.7 1 5.3a7.9 7.9 0 0 0 2.8 3.7c1.3.8 3 1.3 5 1.3s3.8-.5 5.1-1.3c1.3-1 2.1-2 2.4-3.2h6a11.8 11.8 0 0 1-7 8.7 16 16 0 0 1-6.4 1.2ZM80 48c-2.2 0-4-.3-5.7-1a8.4 8.4 0 0 1-3.7-3.3 9.7 9.7 0 0 1-1.3-5.2c0-2 .5-3.8 1.5-5.2a9 9 0 0 1 4.3-3.1c1.8-.7 4-1 6.7-1H89v4.1h-7.5c-2 0-3.4.5-4.4 1.4-1 1-1.6 2.1-1.6 3.6s.5 2.7 1.6 3.6c1 1 2.5 1.4 4.4 1.4 1.1 0 2.2-.2 3.2-.7 1-.4 1.9-1 2.6-2 .6-1 1-2.4 1-4.2l1.7 2.1c-.2 2-.7 3.8-1.5 5.2a9 9 0 0 1-3.4 3.3 12 12 0 0 1-5.3 1Zm9.5-.7v-8.8h-1v-10c0-1.8-.5-3.2-1.4-4.1-1-1-2.4-1.4-4.2-1.4a142.9 142.9 0 0 0-10.2.4v-5.6a74.8 74.8 0 0 1 8.6-.4c3 0 5.5.4 7.5 1.2s3.4 2 4.4 3.6c1 1.7 1.4 4 1.4 6.7v18.4h-5Zm12.9 0V17.8h5v12.3h-.2c0-4.2 1-7.4 2.8-9.5a11 11 0 0 1 8.3-3.1h1v5.6h-2a9 9 0 0 0-6.3 2.2c-1.5 1.5-2.2 3.6-2.2 6.4v15.6h-6.4Zm34.4 1a15 15 0 0 1-6.6-1.3c-1.9-.9-3.4-2-4.7-3.5a15.5 15.5 0 0 1-2.7-5c-.6-1.7-1-3.6-1-5.4v-1c0-2 .4-3.8 1-5.6a15 15 0 0 1 2.8-4.9c1.3-1.5 2.8-2.6 4.6-3.5a16.4 16.4 0 0 1 13.3.2c2 1 3.5 2.3 4.8 4a12 12 0 0 1 2 6H144c-.2-1.6-1-3-2.2-4.1a7.5 7.5 0 0 0-5.2-1.7 8 8 0 0 0-4.7 1.3 8 8 0 0 0-2.8 3.6 13.8 13.8 0 0 0 0 10.3c.6 1.5 1.5 2.7 2.8 3.6s2.8 1.3 4.8 1.3c1.5 0 2.7-.2 3.8-.8a7 7 0 0 0 2.6-2c.7-1 1-2 1.2-3.2h6.2a11 11 0 0 1-2 6.2 15.1 15.1 0 0 1-11.8 5.5Zm19.7-1v-40h6.4V31h-1.3c0-3 .4-5.5 1.1-7.6a9.7 9.7 0 0 1 3.5-4.8A9.9 9.9 0 0 1 172 17h.3c3.5 0 6 1.1 7.9 3.5 1.7 2.3 2.6 5.7 2.6 10v16.8h-6.4V29.6c0-2.1-.6-3.8-1.8-5a6.4 6.4 0 0 0-4.8-1.8c-2 0-3.7.7-5 2a7.8 7.8 0 0 0-1.9 5.5v17h-6.4Zm63.8 1a12.2 12.2 0 0 1-10.9-6.2 19 19 0 0 1-1.8-7.3h1.4v12.5h-5.1v-40h6.4v19.8l-2 3.5c.2-3.1.8-5.7 1.9-7.7a11 11 0 0 1 4.4-4.5c1.8-1 3.9-1.5 6.1-1.5a13.4 13.4 0 0 1 12.8 9.1c.7 1.9 1 3.8 1 6v1c0 2.2-.3 4.1-1 6a13.6 13.6 0 0 1-13.2 9.4Zm-1.2-5.5a8.4 8.4 0 0 0 7.9-5c.7-1.5 1.1-3.3 1.1-5.3s-.4-3.8-1.1-5.3a8.7 8.7 0 0 0-3.2-3.6 9.6 9.6 0 0 0-9.2-.2 8.5 8.5 0 0 0-3.3 3.2c-.8 1.4-1.3 3-1.3 5v2.3a9 9 0 0 0 1.3 4.8 9 9 0 0 0 3.4 3c1.4.7 2.8 1 4.4 1Zm27.3 3.9-10-28.9h6.5l9.5 28.9h-6Zm-7.5 12.2v-5.7h4.9c1 0 2-.1 2.9-.4a4 4 0 0 0 2-1.4c.4-.7.9-1.6 1.2-2.7l8.6-30.9h6.2l-9.3 32.4a14 14 0 0 1-2.5 5 8.9 8.9 0 0 1-4 2.8c-1.5.6-3.4.9-5.6.9h-4.4Zm9-12.2v-5.2h6.4v5.2H248Z"
  }), import_react48.default.createElement("path", {
    fill: theme === "dark" ? "#FFF" : "#003DFF",
    d: "M534.4 9.1H528a.8.8 0 0 1-.7-.7V1.8c0-.4.2-.7.6-.8l6.5-1c.4 0 .8.2.9.6v7.8c0 .4-.4.7-.8.7zM428 35.2V.8c0-.5-.3-.8-.7-.8h-.2l-6.4 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.5 0 .8-.4.8-.8V43c0-.4-.3-.7-.6-.8-4.5-.5-4.5-6-4.5-7zm106.5-21.8H528c-.4 0-.7.4-.7.8v34c0 .4.3.8.7.8h6.5c.4 0 .8-.4.8-.8v-34c0-.5-.4-.8-.8-.8zm-17.7 21.8V.8c0-.5-.3-.8-.8-.8l-6.5 1c-.4 0-.7.4-.7.8v35c0 1.6 0 11.8 12.3 12.2.4 0 .8-.4.8-.8V43c0-.4-.3-.7-.7-.8-4.4-.5-4.4-6-4.4-7zm-22.2-20.6a16.5 16.5 0 0 1 8.6 9.3c.8 2.2 1.3 4.8 1.3 7.5a19.4 19.4 0 0 1-4.6 12.6 14.8 14.8 0 0 1-5.2 3.6c-2 .9-5.2 1.4-6.8 1.4a21 21 0 0 1-6.7-1.4 15.4 15.4 0 0 1-8.6-9.3 21.3 21.3 0 0 1 0-14.4 15.2 15.2 0 0 1 8.6-9.3c2-.8 4.3-1.2 6.7-1.2s4.6.4 6.7 1.2zm-6.7 27.6c2.7 0 4.7-1 6.2-3s2.2-4.3 2.2-7.8-.7-6.3-2.2-8.3-3.5-3-6.2-3-4.7 1-6.1 3c-1.5 2-2.2 4.8-2.2 8.3s.7 5.8 2.2 7.8 3.5 3 6.2 3zm-88.8-28.8c-6.2 0-11.7 3.3-14.8 8.2a18.6 18.6 0 0 0 4.8 25.2c1.8 1.2 4 1.8 6.2 1.7s.1 0 .1 0h.9c4.2-.7 8-4 9.1-8.1v7.4c0 .4.3.7.8.7h6.4a.7.7 0 0 0 .7-.7V14.2c0-.5-.3-.8-.7-.8h-13.5zm6.3 26.5a9.8 9.8 0 0 1-5.7 2h-.5a10 10 0 0 1-9.2-14c1.4-3.7 5-6.3 9-6.3h6.4v18.3zm152.3-26.5h13.5c.5 0 .8.3.8.7v33.7c0 .4-.3.7-.8.7h-6.4a.7.7 0 0 1-.8-.7v-7.4c-1.2 4-4.8 7.4-9 8h-.1a4.2 4.2 0 0 1-.5.1h-.9a10.3 10.3 0 0 1-7-2.6c-4-3.3-6.5-8.4-6.5-14.2 0-3.7 1-7.2 3-10 3-5 8.5-8.3 14.7-8.3zm.6 28.4c2.2-.1 4.2-.6 5.7-2V21.7h-6.3a9.8 9.8 0 0 0-9 6.4 10.2 10.2 0 0 0 9.1 13.9h.5zM452.8 13.4c-6.2 0-11.7 3.3-14.8 8.2a18.5 18.5 0 0 0 3.6 24.3 10.4 10.4 0 0 0 13 .6c2.2-1.5 3.8-3.7 4.5-6.1v7.8c0 2.8-.8 5-2.2 6.3-1.5 1.5-4 2.2-7.5 2.2l-6-.3c-.3 0-.7.2-.8.5l-1.6 5.5c-.1.4.1.8.5 1h.1c2.8.4 5.5.6 7 .6 6.3 0 11-1.4 14-4.1 2.7-2.5 4.2-6.3 4.5-11.4V14.2c0-.5-.4-.8-.8-.8h-13.5zm6.3 8.2v18.3a9.6 9.6 0 0 1-5.6 2h-1a10.3 10.3 0 0 1-8.8-14c1.4-3.7 5-6.3 9-6.3h6.4zM291 31.5A32 32 0 0 1 322.8 0h30.8c.6 0 1.2.5 1.2 1.2v61.5c0 1.1-1.3 1.7-2.2 1l-19.2-17a18 18 0 0 1-11 3.4 18.1 18.1 0 1 1 18.2-14.8c-.1.4-.5.7-.9.6-.1 0-.3 0-.4-.2l-3.8-3.4c-.4-.3-.6-.8-.7-1.4a12 12 0 1 0-2.4 8.3c.4-.4 1-.5 1.6-.2l14.7 13.1v-46H323a26 26 0 1 0 10 49.7c.8-.4 1.6-.2 2.3.3l3 2.7c.3.2.3.7 0 1l-.2.2a32 32 0 0 1-47.2-28.6z"
  }))));
}

// node_modules/react-instantsearch/dist/es/widgets/PoweredBy.js
function _extends24() {
  _extends24 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends24.apply(this, arguments);
}
function PoweredBy2(props) {
  var _usePoweredBy = usePoweredBy(), url = _usePoweredBy.url;
  var uiProps = {
    url
  };
  return import_react49.default.createElement(PoweredBy, _extends24({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/RangeInput.js
var import_react51 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/RangeInput.js
var import_react50 = __toESM(require_react(), 1);
var _excluded46 = ["classNames", "range", "start", "step", "disabled", "onSubmit", "translations"];
function _extends25() {
  _extends25 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends25.apply(this, arguments);
}
function _objectWithoutProperties36(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose36(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose36(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _slicedToArray18(arr, i) {
  return _arrayWithHoles18(arr) || _iterableToArrayLimit18(arr, i) || _unsupportedIterableToArray25(arr, i) || _nonIterableRest18();
}
function _nonIterableRest18() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray25(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray25(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray25(o, minLen);
}
function _arrayLikeToArray25(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit18(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles18(arr) {
  if (Array.isArray(arr)) return arr;
}
var unsetNumberInputValue = "";
function stripLeadingZeroFromInput(value) {
  return value.replace(/^(0+)\d/, function(part) {
    return Number(part).toString();
  });
}
function RangeInput(_ref) {
  var _values$min, _values$max;
  var _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, _ref$range = _ref.range, min = _ref$range.min, max = _ref$range.max, _ref$start = _slicedToArray18(_ref.start, 2), minValue = _ref$start[0], maxValue = _ref$start[1], _ref$step = _ref.step, step = _ref$step === void 0 ? 1 : _ref$step, disabled = _ref.disabled, _onSubmit = _ref.onSubmit, translations = _ref.translations, props = _objectWithoutProperties36(_ref, _excluded46);
  var values = {
    min: minValue !== -Infinity && minValue !== min ? minValue : unsetNumberInputValue,
    max: maxValue !== Infinity && maxValue !== max ? maxValue : unsetNumberInputValue
  };
  var _useState = (0, import_react50.useState)(values), _useState2 = _slicedToArray18(_useState, 2), prevValues = _useState2[0], setPrevValues = _useState2[1];
  var _useState3 = (0, import_react50.useState)({
    from: (_values$min = values.min) === null || _values$min === void 0 ? void 0 : _values$min.toString(),
    to: (_values$max = values.max) === null || _values$max === void 0 ? void 0 : _values$max.toString()
  }), _useState4 = _slicedToArray18(_useState3, 2), _useState4$ = _useState4[0], from = _useState4$.from, to = _useState4$.to, setRange = _useState4[1];
  if (values.min !== prevValues.min || values.max !== prevValues.max) {
    var _values$min2, _values$max2;
    setRange({
      from: (_values$min2 = values.min) === null || _values$min2 === void 0 ? void 0 : _values$min2.toString(),
      to: (_values$max2 = values.max) === null || _values$max2 === void 0 ? void 0 : _values$max2.toString()
    });
    setPrevValues(values);
  }
  return import_react50.default.createElement("div", _extends25({}, props, {
    className: cx(cx("ais-RangeInput", classNames.root), disabled && cx("ais-RangeInput--noRefinement", classNames.noRefinementRoot), props.className)
  }), import_react50.default.createElement("form", {
    className: cx("ais-RangeInput-form", classNames.form),
    onSubmit: function onSubmit(event) {
      event.preventDefault();
      _onSubmit([from ? Number(from) : void 0, to ? Number(to) : void 0]);
    }
  }, import_react50.default.createElement("label", {
    className: cx("ais-RangeInput-label", classNames.label)
  }, import_react50.default.createElement("input", {
    className: cx("ais-RangeInput-input", classNames.input, "ais-RangeInput-input--min", classNames.inputMin),
    type: "number",
    min,
    max,
    value: stripLeadingZeroFromInput(from || unsetNumberInputValue),
    step,
    placeholder: min === null || min === void 0 ? void 0 : min.toString(),
    disabled,
    onInput: function onInput(_ref22) {
      var currentTarget = _ref22.currentTarget;
      var value = currentTarget.value;
      setRange({
        from: value || unsetNumberInputValue,
        to
      });
    }
  })), import_react50.default.createElement("span", {
    className: cx("ais-RangeInput-separator", classNames.separator)
  }, translations.separatorElementText), import_react50.default.createElement("label", {
    className: cx("ais-RangeInput-label", classNames.label)
  }, import_react50.default.createElement("input", {
    className: cx("ais-RangeInput-input", classNames.input, "ais-RangeInput-input--max", classNames.inputMax),
    type: "number",
    min,
    max,
    value: stripLeadingZeroFromInput(to || unsetNumberInputValue),
    step,
    placeholder: max === null || max === void 0 ? void 0 : max.toString(),
    disabled,
    onInput: function onInput(_ref3) {
      var currentTarget = _ref3.currentTarget;
      var value = currentTarget.value;
      setRange({
        from,
        to: value || unsetNumberInputValue
      });
    }
  })), import_react50.default.createElement("button", {
    className: cx("ais-RangeInput-submit", classNames.submit),
    type: "submit"
  }, translations.submitButtonText)));
}

// node_modules/react-instantsearch/dist/es/widgets/RangeInput.js
function _typeof62(obj) {
  "@babel/helpers - typeof";
  return _typeof62 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof62(obj);
}
var _excluded47 = ["attribute", "min", "max", "precision", "translations"];
function _extends26() {
  _extends26 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends26.apply(this, arguments);
}
function ownKeys59(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread59(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys59(Object(source), true).forEach(function(key) {
      _defineProperty57(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys59(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty57(obj, key, value) {
  key = _toPropertyKey56(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey56(arg) {
  var key = _toPrimitive56(arg, "string");
  return _typeof62(key) === "symbol" ? key : String(key);
}
function _toPrimitive56(input, hint) {
  if (_typeof62(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof62(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties37(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose37(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose37(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function RangeInput2(_ref) {
  var attribute = _ref.attribute, min = _ref.min, max = _ref.max, precision = _ref.precision, translations = _ref.translations, props = _objectWithoutProperties37(_ref, _excluded47);
  var _useRange = useRange({
    attribute,
    min,
    max,
    precision
  }, {
    $$widgetType: "ais.rangeInput"
  }), range2 = _useRange.range, start = _useRange.start, canRefine = _useRange.canRefine, refine = _useRange.refine;
  var step = 1 / Math.pow(10, precision || 0);
  var uiProps = {
    range: range2,
    start,
    step,
    disabled: !canRefine,
    onSubmit: refine,
    translations: _objectSpread59({
      separatorElementText: "to",
      submitButtonText: "Go"
    }, translations)
  };
  return import_react51.default.createElement(RangeInput, _extends26({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/RefinementList.js
var import_react54 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/RefinementList.js
var import_react52 = __toESM(require_react(), 1);
var _excluded48 = ["canRefine", "items", "onRefine", "query", "searchBox", "noResults", "showMore", "canToggleShowMore", "onToggleShowMore", "isShowingMore", "className", "classNames", "translations"];
function _extends27() {
  _extends27 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends27.apply(this, arguments);
}
function _objectWithoutProperties38(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose38(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose38(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function RefinementList(_ref) {
  var canRefine = _ref.canRefine, items = _ref.items, onRefine = _ref.onRefine, query = _ref.query, searchBox = _ref.searchBox, noResults = _ref.noResults, showMore = _ref.showMore, canToggleShowMore = _ref.canToggleShowMore, onToggleShowMore = _ref.onToggleShowMore, isShowingMore = _ref.isShowingMore, className = _ref.className, _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, translations = _ref.translations, props = _objectWithoutProperties38(_ref, _excluded48);
  return import_react52.default.createElement("div", _extends27({}, props, {
    className: cx("ais-RefinementList", classNames.root, items.length === 0 && cx("ais-RefinementList--noRefinement", classNames.noRefinementRoot), className)
  }), searchBox && import_react52.default.createElement("div", {
    className: cx("ais-RefinementList-searchBox", classNames.searchBox)
  }, searchBox), noResults ? import_react52.default.createElement("div", {
    className: cx("ais-RefinementList-noResults", classNames.noResults)
  }, noResults) : import_react52.default.createElement("ul", {
    className: cx("ais-RefinementList-list", classNames.list)
  }, items.map(function(item) {
    return import_react52.default.createElement("li", {
      key: item.value,
      className: cx("ais-RefinementList-item", classNames.item, item.isRefined && cx("ais-RefinementList-item--selected", classNames.selectedItem))
    }, import_react52.default.createElement("label", {
      className: cx("ais-RefinementList-label", classNames.label)
    }, import_react52.default.createElement("input", {
      checked: item.isRefined,
      className: cx("ais-RefinementList-checkbox", classNames.checkbox),
      type: "checkbox",
      value: item.value,
      onChange: function onChange() {
        onRefine(item);
      }
    }), import_react52.default.createElement("span", {
      className: cx("ais-RefinementList-labelText", classNames.labelText)
    }, query.length > 0 ? import_react52.default.createElement(Highlight, {
      parts: [getHighlightedParts(unescape2(item.highlighted || ""))]
    }) : item.label), import_react52.default.createElement("span", {
      className: cx("ais-RefinementList-count", classNames.count)
    }, item.count)));
  })), showMore && import_react52.default.createElement(ShowMoreButton, {
    className: cx("ais-RefinementList-showMore", classNames.showMore, !canToggleShowMore && cx("ais-RefinementList-showMore--disabled", classNames.disabledShowMore)),
    disabled: !canToggleShowMore,
    onClick: onToggleShowMore,
    isShowingMore,
    translations
  }));
}

// node_modules/react-instantsearch/dist/es/ui/SearchBox.js
var import_react53 = __toESM(require_react(), 1);
var _excluded49 = ["formRef", "inputRef", "isSearchStalled", "onChange", "onReset", "onSubmit", "placeholder", "value", "autoFocus", "resetIconComponent", "submitIconComponent", "loadingIconComponent", "classNames", "translations"];
function _extends28() {
  _extends28 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends28.apply(this, arguments);
}
function _objectWithoutProperties39(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose39(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose39(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var _ref2 = import_react53.default.createElement("path", {
  d: "M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
});
function DefaultSubmitIcon(_ref) {
  var classNames = _ref.classNames;
  return import_react53.default.createElement("svg", {
    className: cx("ais-SearchBox-submitIcon", classNames.submitIcon),
    width: "10",
    height: "10",
    viewBox: "0 0 40 40",
    "aria-hidden": "true"
  }, _ref2);
}
var _ref4 = import_react53.default.createElement("path", {
  d: "M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
});
function DefaultResetIcon(_ref3) {
  var classNames = _ref3.classNames;
  return import_react53.default.createElement("svg", {
    className: cx("ais-SearchBox-resetIcon", classNames.resetIcon),
    viewBox: "0 0 20 20",
    width: "10",
    height: "10",
    "aria-hidden": "true"
  }, _ref4);
}
var _ref6 = import_react53.default.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, import_react53.default.createElement("g", {
  transform: "translate(1 1)",
  strokeWidth: "2"
}, import_react53.default.createElement("circle", {
  strokeOpacity: ".5",
  cx: "18",
  cy: "18",
  r: "18"
}), import_react53.default.createElement("path", {
  d: "M36 18c0-9.94-8.06-18-18-18"
}, import_react53.default.createElement("animateTransform", {
  attributeName: "transform",
  type: "rotate",
  from: "0 18 18",
  to: "360 18 18",
  dur: "1s",
  repeatCount: "indefinite"
}))));
function DefaultLoadingIcon(_ref5) {
  var classNames = _ref5.classNames;
  return import_react53.default.createElement("svg", {
    "aria-label": "Results are loading",
    width: "16",
    height: "16",
    viewBox: "0 0 38 38",
    stroke: "#444",
    className: cx("ais-SearchBox-loadingIcon", classNames.loadingIcon),
    "aria-hidden": "true"
  }, _ref6);
}
function SearchBox(_ref7) {
  var formRef = _ref7.formRef, inputRef = _ref7.inputRef, isSearchStalled = _ref7.isSearchStalled, onChange = _ref7.onChange, onReset = _ref7.onReset, onSubmit = _ref7.onSubmit, _ref7$placeholder = _ref7.placeholder, placeholder = _ref7$placeholder === void 0 ? "" : _ref7$placeholder, value = _ref7.value, autoFocus = _ref7.autoFocus, _ref7$resetIconCompon = _ref7.resetIconComponent, ResetIcon = _ref7$resetIconCompon === void 0 ? DefaultResetIcon : _ref7$resetIconCompon, _ref7$submitIconCompo = _ref7.submitIconComponent, SubmitIcon = _ref7$submitIconCompo === void 0 ? DefaultSubmitIcon : _ref7$submitIconCompo, _ref7$loadingIconComp = _ref7.loadingIconComponent, LoadingIcon = _ref7$loadingIconComp === void 0 ? DefaultLoadingIcon : _ref7$loadingIconComp, _ref7$classNames = _ref7.classNames, classNames = _ref7$classNames === void 0 ? {} : _ref7$classNames, translations = _ref7.translations, props = _objectWithoutProperties39(_ref7, _excluded49);
  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    if (onSubmit) {
      onSubmit(event);
    }
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }
  function handleReset(event) {
    event.preventDefault();
    event.stopPropagation();
    onReset(event);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  return import_react53.default.createElement("div", _extends28({}, props, {
    className: cx("ais-SearchBox", classNames.root, props.className)
  }), import_react53.default.createElement("form", {
    ref: formRef,
    action: "",
    className: cx("ais-SearchBox-form", classNames.form),
    noValidate: true,
    onSubmit: handleSubmit,
    onReset: handleReset,
    role: "search"
  }, import_react53.default.createElement("input", {
    ref: inputRef,
    className: cx("ais-SearchBox-input", classNames.input),
    "aria-label": "Search",
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    placeholder,
    spellCheck: false,
    maxLength: 512,
    type: "search",
    value,
    onChange,
    onCompositionEnd: onChange,
    autoFocus
  }), import_react53.default.createElement("button", {
    className: cx("ais-SearchBox-submit", classNames.submit),
    type: "submit",
    title: translations.submitButtonTitle
  }, import_react53.default.createElement(SubmitIcon, {
    classNames
  })), import_react53.default.createElement("button", {
    className: cx("ais-SearchBox-reset", classNames.reset),
    type: "reset",
    title: translations.resetButtonTitle,
    hidden: value.length === 0 || isSearchStalled
  }, import_react53.default.createElement(ResetIcon, {
    classNames
  })), import_react53.default.createElement("span", {
    className: cx("ais-SearchBox-loadingIndicator", classNames.loadingIndicator),
    hidden: !isSearchStalled
  }, import_react53.default.createElement(LoadingIcon, {
    classNames
  }))));
}

// node_modules/react-instantsearch/dist/es/widgets/RefinementList.js
function _typeof63(obj) {
  "@babel/helpers - typeof";
  return _typeof63 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof63(obj);
}
var _excluded50 = ["searchable", "searchablePlaceholder", "attribute", "operator", "limit", "showMore", "showMoreLimit", "sortBy", "escapeFacetValues", "transformItems", "translations"];
function _extends29() {
  _extends29 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends29.apply(this, arguments);
}
function ownKeys60(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread60(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys60(Object(source), true).forEach(function(key) {
      _defineProperty58(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys60(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty58(obj, key, value) {
  key = _toPropertyKey57(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey57(arg) {
  var key = _toPrimitive57(arg, "string");
  return _typeof63(key) === "symbol" ? key : String(key);
}
function _toPrimitive57(input, hint) {
  if (_typeof63(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof63(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray19(arr, i) {
  return _arrayWithHoles19(arr) || _iterableToArrayLimit19(arr, i) || _unsupportedIterableToArray26(arr, i) || _nonIterableRest19();
}
function _nonIterableRest19() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray26(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray26(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray26(o, minLen);
}
function _arrayLikeToArray26(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit19(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles19(arr) {
  if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties40(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose40(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose40(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function RefinementList2(_ref) {
  var searchable = _ref.searchable, searchablePlaceholder = _ref.searchablePlaceholder, attribute = _ref.attribute, operator = _ref.operator, limit = _ref.limit, showMore = _ref.showMore, showMoreLimit = _ref.showMoreLimit, sortBy = _ref.sortBy, escapeFacetValues = _ref.escapeFacetValues, transformItems = _ref.transformItems, translations = _ref.translations, props = _objectWithoutProperties40(_ref, _excluded50);
  var _useRefinementList = useRefinementList({
    attribute,
    operator,
    limit,
    showMore,
    showMoreLimit,
    sortBy,
    escapeFacetValues,
    transformItems
  }, {
    $$widgetType: "ais.refinementList"
  }), canRefine = _useRefinementList.canRefine, canToggleShowMore = _useRefinementList.canToggleShowMore, isFromSearch = _useRefinementList.isFromSearch, isShowingMore = _useRefinementList.isShowingMore, items = _useRefinementList.items, refine = _useRefinementList.refine, searchForItems = _useRefinementList.searchForItems, toggleShowMore = _useRefinementList.toggleShowMore;
  var _useState = (0, import_react54.useState)(""), _useState2 = _slicedToArray19(_useState, 2), inputValue = _useState2[0], setInputValue = _useState2[1];
  var inputRef = (0, import_react54.useRef)(null);
  function setQuery(newQuery) {
    var compositionComplete = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    setInputValue(newQuery);
    if (compositionComplete) {
      searchForItems(newQuery);
    }
  }
  function onRefine(item) {
    refine(item.value);
    setQuery("");
  }
  function onChange(event) {
    var compositionComplete = event.type === "compositionend" || !event.nativeEvent.isComposing;
    setQuery(event.currentTarget.value, compositionComplete);
  }
  function onReset() {
    setQuery("");
  }
  function onSubmit() {
    if (items.length > 0) {
      refine(items[0].value);
      setQuery("");
    }
  }
  var mergedTranslations = _objectSpread60({
    resetButtonTitle: "Clear the search query",
    submitButtonTitle: "Submit the search query",
    noResultsText: "No results.",
    showMoreButtonText: function showMoreButtonText(options) {
      return options.isShowingMore ? "Show less" : "Show more";
    }
  }, translations);
  var uiProps = {
    items,
    canRefine,
    onRefine,
    query: inputValue,
    searchBox: searchable && import_react54.default.createElement(SearchBox, {
      inputRef,
      placeholder: searchablePlaceholder,
      isSearchStalled: false,
      value: inputValue,
      onChange,
      onReset,
      onSubmit,
      translations: {
        submitButtonTitle: mergedTranslations.submitButtonTitle,
        resetButtonTitle: mergedTranslations.resetButtonTitle
      }
    }),
    noResults: searchable && isFromSearch && items.length === 0 && mergedTranslations.noResultsText,
    canToggleShowMore,
    onToggleShowMore: toggleShowMore,
    isShowingMore,
    translations: {
      showMoreButtonText: mergedTranslations.showMoreButtonText
    }
  };
  return import_react54.default.createElement(RefinementList, _extends29({}, props, uiProps, {
    showMore
  }));
}

// node_modules/react-instantsearch/dist/es/widgets/RelatedProducts.js
var import_react55 = __toESM(require_react(), 1);
function _typeof64(obj) {
  "@babel/helpers - typeof";
  return _typeof64 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof64(obj);
}
var _excluded51 = ["objectIDs", "limit", "threshold", "fallbackParameters", "queryParameters", "escapeHTML", "transformItems", "itemComponent", "headerComponent", "emptyComponent", "layoutComponent"];
function _extends30() {
  _extends30 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends30.apply(this, arguments);
}
function ownKeys61(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread61(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys61(Object(source), true).forEach(function(key) {
      _defineProperty59(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys61(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty59(obj, key, value) {
  key = _toPropertyKey58(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey58(arg) {
  var key = _toPrimitive58(arg, "string");
  return _typeof64(key) === "symbol" ? key : String(key);
}
function _toPrimitive58(input, hint) {
  if (_typeof64(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof64(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties41(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose41(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose41(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var RelatedProductsUiComponent = createRelatedProductsComponent({
  createElement: import_react55.createElement,
  Fragment: import_react55.Fragment
});
function RelatedProducts(_ref) {
  var objectIDs = _ref.objectIDs, limit = _ref.limit, threshold = _ref.threshold, fallbackParameters = _ref.fallbackParameters, queryParameters = _ref.queryParameters, escapeHTML = _ref.escapeHTML, transformItems = _ref.transformItems, itemComponent = _ref.itemComponent, headerComponent = _ref.headerComponent, emptyComponent = _ref.emptyComponent, layoutComponent = _ref.layoutComponent, props = _objectWithoutProperties41(_ref, _excluded51);
  var _useInstantSearch = useInstantSearch(), status = _useInstantSearch.status;
  var _useRelatedProducts = useRelatedProducts({
    objectIDs,
    limit,
    threshold,
    fallbackParameters,
    queryParameters,
    escapeHTML,
    transformItems
  }, {
    $$widgetType: "ais.relatedProducts"
  }), items = _useRelatedProducts.items;
  var layout = layoutComponent ? function(layoutProps) {
    return layoutComponent(_objectSpread61(_objectSpread61({}, layoutProps), {}, {
      classNames: {
        list: layoutProps.classNames.list,
        item: layoutProps.classNames.item
      }
    }));
  } : void 0;
  var uiProps = {
    items,
    itemComponent,
    headerComponent,
    emptyComponent,
    layout,
    status,
    sendEvent: function sendEvent() {
    }
  };
  return import_react55.default.createElement(RelatedProductsUiComponent, _extends30({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/SearchBox.js
var import_react56 = __toESM(require_react(), 1);
function _typeof65(obj) {
  "@babel/helpers - typeof";
  return _typeof65 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof65(obj);
}
var _excluded52 = ["queryHook", "searchAsYouType", "ignoreCompositionEvents", "translations"];
function _extends31() {
  _extends31 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends31.apply(this, arguments);
}
function ownKeys62(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread62(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys62(Object(source), true).forEach(function(key) {
      _defineProperty60(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys62(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty60(obj, key, value) {
  key = _toPropertyKey59(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey59(arg) {
  var key = _toPrimitive59(arg, "string");
  return _typeof65(key) === "symbol" ? key : String(key);
}
function _toPrimitive59(input, hint) {
  if (_typeof65(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof65(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray20(arr, i) {
  return _arrayWithHoles20(arr) || _iterableToArrayLimit20(arr, i) || _unsupportedIterableToArray27(arr, i) || _nonIterableRest20();
}
function _nonIterableRest20() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray27(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray27(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray27(o, minLen);
}
function _arrayLikeToArray27(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit20(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles20(arr) {
  if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties42(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose42(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose42(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function SearchBox2(_ref) {
  var queryHook = _ref.queryHook, _ref$searchAsYouType = _ref.searchAsYouType, searchAsYouType = _ref$searchAsYouType === void 0 ? true : _ref$searchAsYouType, _ref$ignoreCompositio = _ref.ignoreCompositionEvents, ignoreCompositionEvents = _ref$ignoreCompositio === void 0 ? false : _ref$ignoreCompositio, translations = _ref.translations, props = _objectWithoutProperties42(_ref, _excluded52);
  var _useSearchBox = useSearchBox({
    queryHook
  }, {
    $$widgetType: "ais.searchBox"
  }), query = _useSearchBox.query, refine = _useSearchBox.refine, isSearchStalled = _useSearchBox.isSearchStalled;
  var _useState = (0, import_react56.useState)(query), _useState2 = _slicedToArray20(_useState, 2), inputValue = _useState2[0], setInputValue = _useState2[1];
  var inputRef = (0, import_react56.useRef)(null);
  function setQuery(newQuery) {
    var isComposing = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    setInputValue(newQuery);
    if (searchAsYouType && !(ignoreCompositionEvents && isComposing)) {
      refine(newQuery);
    }
  }
  function onReset() {
    setQuery("");
    if (!searchAsYouType) {
      refine("");
    }
  }
  function onChange(event) {
    setQuery(event.currentTarget.value, event.nativeEvent.isComposing);
  }
  function onSubmit(event) {
    if (!searchAsYouType) {
      refine(inputValue);
    }
    if (props.onSubmit) {
      props.onSubmit(event);
    }
  }
  if (query !== inputValue && document.activeElement !== inputRef.current) {
    setInputValue(query);
  }
  var uiProps = {
    inputRef,
    isSearchStalled,
    onChange,
    onReset,
    onSubmit,
    value: inputValue,
    translations: _objectSpread62({
      submitButtonTitle: "Submit the search query",
      resetButtonTitle: "Clear the search query"
    }, translations)
  };
  return import_react56.default.createElement(SearchBox, _extends31({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/Snippet.js
var import_react58 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/Snippet.js
var import_react57 = __toESM(require_react(), 1);
var _excluded53 = ["classNames"];
function _extends32() {
  _extends32 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends32.apply(this, arguments);
}
function _objectWithoutProperties43(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose43(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose43(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Snippet(_ref) {
  var _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, props = _objectWithoutProperties43(_ref, _excluded53);
  return import_react57.default.createElement(InternalHighlight, _extends32({
    classNames: {
      root: cx("ais-Snippet", classNames.root),
      highlighted: cx("ais-Snippet-highlighted", classNames.highlighted),
      nonHighlighted: cx("ais-Snippet-nonHighlighted", classNames.nonHighlighted),
      separator: cx("ais-Snippet-separator", classNames.separator)
    }
  }, props));
}

// node_modules/react-instantsearch/dist/es/widgets/Snippet.js
var _excluded54 = ["hit", "attribute", "highlightedTagName", "nonHighlightedTagName", "separator"];
function _extends33() {
  _extends33 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends33.apply(this, arguments);
}
function _objectWithoutProperties44(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose44(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose44(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Snippet2(_ref) {
  var hit = _ref.hit, attribute = _ref.attribute, highlightedTagName = _ref.highlightedTagName, nonHighlightedTagName = _ref.nonHighlightedTagName, separator = _ref.separator, props = _objectWithoutProperties44(_ref, _excluded54);
  var property = getPropertyByPath(hit._snippetResult, attribute) || [];
  var properties = Array.isArray(property) ? property : [property];
  var parts = properties.map(function(singleValue) {
    return getHighlightedParts(unescape2(singleValue.value || ""));
  });
  return import_react58.default.createElement(Snippet, _extends33({}, props, {
    parts,
    highlightedTagName,
    nonHighlightedTagName,
    separator
  }));
}

// node_modules/react-instantsearch/dist/es/widgets/SortBy.js
var import_react60 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/SortBy.js
var import_react59 = __toESM(require_react(), 1);
var _excluded55 = ["items", "value", "onChange", "classNames"];
function _extends34() {
  _extends34 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends34.apply(this, arguments);
}
function _objectWithoutProperties45(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose45(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose45(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function SortBy(_ref) {
  var items = _ref.items, value = _ref.value, _ref$onChange = _ref.onChange, _onChange = _ref$onChange === void 0 ? function() {
  } : _ref$onChange, _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, props = _objectWithoutProperties45(_ref, _excluded55);
  return import_react59.default.createElement("div", _extends34({}, props, {
    className: cx("ais-SortBy", classNames.root, props.className)
  }), import_react59.default.createElement("select", {
    className: cx("ais-SortBy-select", classNames.select),
    onChange: function onChange(event) {
      return _onChange(event.target.value);
    },
    value,
    "aria-label": "Sort results by"
  }, items.map(function(item) {
    return import_react59.default.createElement("option", {
      className: cx("ais-SortBy-option", classNames.option),
      key: item.value,
      value: item.value
    }, item.label);
  })));
}

// node_modules/react-instantsearch/dist/es/widgets/SortBy.js
var _excluded56 = ["items", "transformItems"];
function _extends35() {
  _extends35 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends35.apply(this, arguments);
}
function _objectWithoutProperties46(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose46(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose46(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function SortBy2(_ref) {
  var items = _ref.items, transformItems = _ref.transformItems, props = _objectWithoutProperties46(_ref, _excluded56);
  var _useSortBy = useSortBy({
    items,
    transformItems
  }, {
    $$widgetType: "ais.sortBy"
  }), currentRefinement = _useSortBy.currentRefinement, options = _useSortBy.options, refine = _useSortBy.refine;
  var uiProps = {
    items: options,
    value: currentRefinement,
    onChange: refine
  };
  return import_react60.default.createElement(SortBy, _extends35({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/Stats.js
var import_react62 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/Stats.js
var import_react61 = __toESM(require_react(), 1);
var _excluded57 = ["classNames", "nbHits", "processingTimeMS", "nbSortedHits", "areHitsSorted", "translations"];
function _extends36() {
  _extends36 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends36.apply(this, arguments);
}
function _objectWithoutProperties47(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose47(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose47(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Stats(_ref) {
  var _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, nbHits = _ref.nbHits, processingTimeMS = _ref.processingTimeMS, nbSortedHits = _ref.nbSortedHits, areHitsSorted = _ref.areHitsSorted, translations = _ref.translations, props = _objectWithoutProperties47(_ref, _excluded57);
  var translationOptions = {
    nbHits,
    processingTimeMS,
    nbSortedHits,
    areHitsSorted
  };
  return import_react61.default.createElement("div", _extends36({}, props, {
    className: cx("ais-Stats", classNames.root, props.className)
  }), import_react61.default.createElement("span", {
    className: "ais-Stats-text"
  }, translations.rootElementText(translationOptions)));
}

// node_modules/react-instantsearch/dist/es/widgets/Stats.js
function _typeof66(obj) {
  "@babel/helpers - typeof";
  return _typeof66 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof66(obj);
}
var _excluded58 = ["translations"];
function _extends37() {
  _extends37 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends37.apply(this, arguments);
}
function ownKeys63(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread63(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys63(Object(source), true).forEach(function(key) {
      _defineProperty61(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys63(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty61(obj, key, value) {
  key = _toPropertyKey60(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey60(arg) {
  var key = _toPrimitive60(arg, "string");
  return _typeof66(key) === "symbol" ? key : String(key);
}
function _toPrimitive60(input, hint) {
  if (_typeof66(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof66(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties48(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose48(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose48(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function Stats2(_ref) {
  var translations = _ref.translations, props = _objectWithoutProperties48(_ref, _excluded58);
  var _useStats = useStats(void 0, {
    $$widgetType: "ais.stats"
  }), nbHits = _useStats.nbHits, nbSortedHits = _useStats.nbSortedHits, processingTimeMS = _useStats.processingTimeMS, areHitsSorted = _useStats.areHitsSorted;
  var uiProps = {
    nbHits,
    nbSortedHits,
    processingTimeMS,
    areHitsSorted,
    translations: _objectSpread63({
      rootElementText: function rootElementText(options) {
        return "".concat(options.areHitsSorted ? getSortedResultsSentence(options) : getResultsSentence(options), " found in ").concat(options.processingTimeMS.toLocaleString(), "ms");
      }
    }, translations)
  };
  return import_react62.default.createElement(Stats, _extends37({}, props, uiProps));
}
function getSortedResultsSentence(_ref22) {
  var nbHits = _ref22.nbHits, nbSortedHits = _ref22.nbSortedHits;
  var suffix = "sorted out of ".concat(nbHits.toLocaleString());
  if (nbSortedHits === 0) {
    return "No relevant results ".concat(suffix);
  }
  if (nbSortedHits === 1) {
    return "1 relevant result ".concat(suffix);
  }
  if (nbSortedHits > 1) {
    return "".concat((nbSortedHits || 0).toLocaleString(), " relevant results ").concat(suffix);
  }
  return "";
}
function getResultsSentence(_ref3) {
  var nbHits = _ref3.nbHits;
  if (nbHits === 0) {
    return "No results";
  }
  if (nbHits === 1) {
    return "1 result";
  }
  if (nbHits > 1) {
    return "".concat(nbHits.toLocaleString(), " results");
  }
  return "";
}

// node_modules/react-instantsearch/dist/es/widgets/ToggleRefinement.js
var import_react64 = __toESM(require_react(), 1);

// node_modules/react-instantsearch/dist/es/ui/ToggleRefinement.js
var import_react63 = __toESM(require_react(), 1);
var _excluded59 = ["classNames", "checked", "onChange", "label"];
function _extends38() {
  _extends38 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends38.apply(this, arguments);
}
function _objectWithoutProperties49(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose49(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose49(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function ToggleRefinement(_ref) {
  var _ref$classNames = _ref.classNames, classNames = _ref$classNames === void 0 ? {} : _ref$classNames, checked = _ref.checked, _onChange = _ref.onChange, label = _ref.label, props = _objectWithoutProperties49(_ref, _excluded59);
  return import_react63.default.createElement("div", _extends38({}, props, {
    className: cx("ais-ToggleRefinement", classNames.root, props.className)
  }), import_react63.default.createElement("label", {
    className: cx("ais-ToggleRefinement-label", classNames.label)
  }, import_react63.default.createElement("input", {
    className: cx("ais-ToggleRefinement-checkbox", classNames.checkbox),
    type: "checkbox",
    checked,
    onChange: function onChange(event) {
      _onChange(event.target.checked);
    }
  }), import_react63.default.createElement("span", {
    className: cx("ais-ToggleRefinement-labelText", classNames.labelText)
  }, label)));
}

// node_modules/react-instantsearch/dist/es/widgets/ToggleRefinement.js
var _excluded60 = ["attribute", "on", "off"];
function _extends39() {
  _extends39 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends39.apply(this, arguments);
}
function _objectWithoutProperties50(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose50(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose50(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function ToggleRefinement2(_ref) {
  var attribute = _ref.attribute, on = _ref.on, off = _ref.off, props = _objectWithoutProperties50(_ref, _excluded60);
  var _useToggleRefinement = useToggleRefinement({
    attribute,
    on,
    off
  }, {
    $$widgetType: "ais.toggleRefinement"
  }), refine = _useToggleRefinement.refine, value = _useToggleRefinement.value;
  var uiProps = {
    checked: value.isRefined,
    onChange: function onChange(isChecked) {
      return refine({
        isRefined: !isChecked
      });
    }
  };
  return import_react64.default.createElement(ToggleRefinement, _extends39({
    label: value.name
  }, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/TrendingItems.js
var import_react65 = __toESM(require_react(), 1);
function _typeof67(obj) {
  "@babel/helpers - typeof";
  return _typeof67 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof67(obj);
}
var _excluded61 = ["facetName", "facetValue", "limit", "threshold", "fallbackParameters", "queryParameters", "escapeHTML", "transformItems", "itemComponent", "headerComponent", "emptyComponent", "layoutComponent"];
function _extends40() {
  _extends40 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends40.apply(this, arguments);
}
function ownKeys64(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread64(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys64(Object(source), true).forEach(function(key) {
      _defineProperty62(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys64(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty62(obj, key, value) {
  key = _toPropertyKey61(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey61(arg) {
  var key = _toPrimitive61(arg, "string");
  return _typeof67(key) === "symbol" ? key : String(key);
}
function _toPrimitive61(input, hint) {
  if (_typeof67(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof67(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties51(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose51(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose51(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var TrendingItemsUiComponent = createTrendingItemsComponent({
  createElement: import_react65.createElement,
  Fragment: import_react65.Fragment
});
function TrendingItems(_ref) {
  var facetName = _ref.facetName, facetValue = _ref.facetValue, limit = _ref.limit, threshold = _ref.threshold, fallbackParameters = _ref.fallbackParameters, queryParameters = _ref.queryParameters, escapeHTML = _ref.escapeHTML, transformItems = _ref.transformItems, itemComponent = _ref.itemComponent, headerComponent = _ref.headerComponent, emptyComponent = _ref.emptyComponent, layoutComponent = _ref.layoutComponent, props = _objectWithoutProperties51(_ref, _excluded61);
  var facetParameters = facetName && facetValue ? {
    facetName,
    facetValue
  } : {};
  var _useInstantSearch = useInstantSearch(), status = _useInstantSearch.status;
  var _useTrendingItems = useTrendingItems(_objectSpread64(_objectSpread64({}, facetParameters), {}, {
    limit,
    threshold,
    fallbackParameters,
    queryParameters,
    escapeHTML,
    transformItems
  }), {
    $$widgetType: "ais.trendingItems"
  }), items = _useTrendingItems.items;
  var layout = layoutComponent ? function(layoutProps) {
    return layoutComponent(_objectSpread64(_objectSpread64({}, layoutProps), {}, {
      classNames: {
        list: layoutProps.classNames.list,
        item: layoutProps.classNames.item
      }
    }));
  } : void 0;
  var uiProps = {
    items,
    itemComponent,
    headerComponent,
    emptyComponent,
    layout,
    status,
    sendEvent: function sendEvent() {
    }
  };
  return import_react65.default.createElement(TrendingItemsUiComponent, _extends40({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/widgets/LookingSimilar.js
var import_react66 = __toESM(require_react(), 1);
function _typeof68(obj) {
  "@babel/helpers - typeof";
  return _typeof68 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof68(obj);
}
var _excluded62 = ["objectIDs", "limit", "threshold", "queryParameters", "fallbackParameters", "escapeHTML", "transformItems", "itemComponent", "headerComponent", "emptyComponent", "layoutComponent"];
function _extends41() {
  _extends41 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends41.apply(this, arguments);
}
function ownKeys65(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread65(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys65(Object(source), true).forEach(function(key) {
      _defineProperty63(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys65(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty63(obj, key, value) {
  key = _toPropertyKey62(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey62(arg) {
  var key = _toPrimitive62(arg, "string");
  return _typeof68(key) === "symbol" ? key : String(key);
}
function _toPrimitive62(input, hint) {
  if (_typeof68(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof68(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties52(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose52(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose52(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var LookingSimilarUiComponent = createLookingSimilarComponent({
  createElement: import_react66.createElement,
  Fragment: import_react66.Fragment
});
function LookingSimilar(_ref) {
  var objectIDs = _ref.objectIDs, limit = _ref.limit, threshold = _ref.threshold, queryParameters = _ref.queryParameters, fallbackParameters = _ref.fallbackParameters, escapeHTML = _ref.escapeHTML, transformItems = _ref.transformItems, itemComponent = _ref.itemComponent, headerComponent = _ref.headerComponent, emptyComponent = _ref.emptyComponent, layoutComponent = _ref.layoutComponent, props = _objectWithoutProperties52(_ref, _excluded62);
  var _useInstantSearch = useInstantSearch(), status = _useInstantSearch.status;
  var _useLookingSimilar = useLookingSimilar({
    objectIDs,
    limit,
    threshold,
    queryParameters,
    fallbackParameters,
    escapeHTML,
    transformItems
  }, {
    $$widgetType: "ais.lookingSimilar"
  }), items = _useLookingSimilar.items;
  var layout = layoutComponent ? function(layoutProps) {
    return layoutComponent(_objectSpread65(_objectSpread65({}, layoutProps), {}, {
      classNames: {
        list: layoutProps.classNames.list,
        item: layoutProps.classNames.item
      }
    }));
  } : void 0;
  var uiProps = {
    items,
    itemComponent,
    headerComponent,
    emptyComponent,
    layout,
    status,
    sendEvent: function sendEvent() {
    }
  };
  return import_react66.default.createElement(LookingSimilarUiComponent, _extends41({}, props, uiProps));
}

// node_modules/react-instantsearch/dist/es/components/Carousel.js
var import_react67 = __toESM(require_react(), 1);
function _extends42() {
  _extends42 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends42.apply(this, arguments);
}
var CarouselUiComponent = createCarouselComponent({
  createElement: import_react67.createElement,
  Fragment: import_react67.Fragment
});
function Carousel(props) {
  var carouselRefs = {
    listRef: (0, import_react67.useRef)(null),
    nextButtonRef: (0, import_react67.useRef)(null),
    previousButtonRef: (0, import_react67.useRef)(null),
    carouselIdRef: (0, import_react67.useRef)(generateCarouselId())
  };
  return import_react67.default.createElement(CarouselUiComponent, _extends42({}, carouselRefs, props));
}
export {
  Breadcrumb2 as Breadcrumb,
  Carousel,
  ClearRefinements2 as ClearRefinements,
  Configure,
  CurrentRefinements2 as CurrentRefinements,
  DynamicWidgets,
  FrequentlyBoughtTogether,
  HierarchicalMenu2 as HierarchicalMenu,
  Highlight2 as Highlight,
  Hits,
  HitsPerPage2 as HitsPerPage,
  Index,
  InfiniteHits2 as InfiniteHits,
  InstantSearch2 as InstantSearch,
  InstantSearchRSCContext,
  InstantSearchSSRProvider,
  InstantSearchServerContext,
  LookingSimilar,
  Menu2 as Menu,
  Pagination2 as Pagination,
  PoweredBy2 as PoweredBy,
  RangeInput2 as RangeInput,
  RefinementList2 as RefinementList,
  RelatedProducts,
  SearchBox2 as SearchBox,
  Snippet2 as Snippet,
  SortBy2 as SortBy,
  Stats2 as Stats,
  ToggleRefinement2 as ToggleRefinement,
  TrendingItems,
  getServerState,
  useBreadcrumb,
  useClearRefinements,
  useConfigure,
  useConnector,
  useCurrentRefinements,
  useDynamicWidgets,
  useFrequentlyBoughtTogether,
  useGeoSearch,
  useHierarchicalMenu,
  useHits,
  useHitsPerPage,
  useInfiniteHits,
  useInstantSearch,
  useInstantSearchContext,
  useLookingSimilar,
  useMenu,
  useNumericMenu,
  usePagination,
  usePoweredBy,
  useQueryRules,
  useRSCContext,
  useRange,
  useRefinementList,
  useRelatedProducts,
  useSearchBox,
  useSortBy,
  useStats,
  useToggleRefinement,
  useTrendingItems,
  version_default as version,
  wrapPromiseWithState
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=react-instantsearch.js.map
