(function(){if (!Date.now) Date.now = function() {
  return +new Date;
};
try {
  document.createElement("div").style.setProperty("opacity", 0, "");
} catch (error) {
  var d3_style_prototype = CSSStyleDeclaration.prototype,
      d3_style_setProperty = d3_style_prototype.setProperty;
  d3_style_prototype.setProperty = function(name, value, priority) {
    d3_style_setProperty.call(this, name, value + "", priority);
  };
}
d3 = {version: "2.4.6"}; // semver
var d3_array = d3_arraySlice; // conversion for NodeLists

function d3_arrayCopy(pseudoarray) {
  var i = -1, n = pseudoarray.length, array = [];
  while (++i < n) array.push(pseudoarray[i]);
  return array;
}

function d3_arraySlice(pseudoarray) {
  return Array.prototype.slice.call(pseudoarray);
}

try {
  d3_array(document.documentElement.childNodes)[0].nodeType;
} catch(e) {
  d3_array = d3_arrayCopy;
}

var d3_arraySubclass = [].__proto__?

// Until ECMAScript supports array subclassing, prototype injection works well.
function(array, prototype) {
  array.__proto__ = prototype;
}:

// And if your browser doesn't support __proto__, we'll use direct extension.
function(array, prototype) {
  for (var property in prototype) array[property] = prototype[property];
};
function d3_this() {
  return this;
}
d3.functor = function(v) {
  return typeof v === "function" ? v : function() { return v; };
};
// A getter-setter method that preserves the appropriate `this` context.
d3.rebind = function(object, method) {
  return function() {
    var x = method.apply(object, arguments);
    return arguments.length ? object : x;
  };
};
d3.ascending = function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
};
d3.descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};
d3.mean = function(array, f) {
  var n = array.length,
      a,
      m = 0,
      i = -1,
      j = 0;
  if (arguments.length === 1) {
    while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
  } else {
    while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
  }
  return j ? m : undefined;
};
d3.median = function(array, f) {
  if (arguments.length > 1) array = array.map(f);
  array = array.filter(d3_number);
  return array.length ? d3.quantile(array.sort(d3.ascending), .5) : undefined;
};
d3.min = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;
  if (arguments.length === 1) {
    while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && a > b) a = b;
  } else {
    while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
  }
  return a;
};
d3.max = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;
  if (arguments.length === 1) {
    while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && b > a) a = b;
  } else {
    while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
  }
  return a;
};
function d3_number(x) {
  return x != null && !isNaN(x);
}
d3.sum = function(array, f) {
  var s = 0,
      n = array.length,
      a,
      i = -1;

  if (arguments.length === 1) {
    while (++i < n) if (!isNaN(a = +array[i])) s += a;
  } else {
    while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
  }

  return s;
};
// R-7 per <http://en.wikipedia.org/wiki/Quantile>
d3.quantile = function(values, p) {
  var H = (values.length - 1) * p + 1,
      h = Math.floor(H),
      v = values[h - 1],
      e = H - h;
  return e ? v + e * (values[h] - v) : v;
};
d3.zip = function() {
  if (!(n = arguments.length)) return [];
  for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m;) {
    for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n;) {
      zip[j] = arguments[j][i];
    }
  }
  return zips;
};

function d3_zipLength(d) {
  return d.length;
}
// Locate the insertion point for x in a to maintain sorted order. The
// arguments lo and hi may be used to specify a subset of the array which should
// be considered; by default the entire array is used. If x is already present
// in a, the insertion point will be before (to the left of) any existing
// entries. The return value is suitable for use as the first argument to
// `array.splice` assuming that a is already sorted.
//
// The returned insertion point i partitions the array a into two halves so that
// all v < x for v in a[lo:i] for the left side and all v >= x for v in a[i:hi]
// for the right side.
d3.bisectLeft = function(a, x, lo, hi) {
  if (arguments.length < 3) lo = 0;
  if (arguments.length < 4) hi = a.length;
  while (lo < hi) {
    var mid = (lo + hi) >> 1;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

// Similar to bisectLeft, but returns an insertion point which comes after (to
// the right of) any existing entries of x in a.
//
// The returned insertion point i partitions the array into two halves so that
// all v <= x for v in a[lo:i] for the left side and all v > x for v in a[i:hi]
// for the right side.
d3.bisect =
d3.bisectRight = function(a, x, lo, hi) {
  if (arguments.length < 3) lo = 0;
  if (arguments.length < 4) hi = a.length;
  while (lo < hi) {
    var mid = (lo + hi) >> 1;
    if (x < a[mid]) hi = mid;
    else lo = mid + 1;
  }
  return lo;
};
d3.first = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length === 1) f = d3.ascending;
  while (++i < n) {
    if (f.call(array, a, b = array[i]) > 0) {
      a = b;
    }
  }
  return a;
};
d3.last = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length === 1) f = d3.ascending;
  while (++i < n) {
    if (f.call(array, a, b = array[i]) <= 0) {
      a = b;
    }
  }
  return a;
};
d3.nest = function() {
  var nest = {},
      keys = [],
      sortKeys = [],
      sortValues,
      rollup;

  function map(array, depth) {
    if (depth >= keys.length) return rollup
        ? rollup.call(nest, array) : (sortValues
        ? array.sort(sortValues)
        : array);

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        object,
        o = {};

    while (++i < n) {
      if ((keyValue = key(object = array[i])) in o) {
        o[keyValue].push(object);
      } else {
        o[keyValue] = [object];
      }
    }

    for (keyValue in o) {
      o[keyValue] = map(o[keyValue], depth);
    }

    return o;
  }

  function entries(map, depth) {
    if (depth >= keys.length) return map;

    var a = [],
        sortKey = sortKeys[depth++],
        key;

    for (key in map) {
      a.push({key: key, values: entries(map[key], depth)});
    }

    if (sortKey) a.sort(function(a, b) {
      return sortKey(a.key, b.key);
    });

    return a;
  }

  nest.map = function(array) {
    return map(array, 0);
  };

  nest.entries = function(array) {
    return entries(map(array, 0), 0);
  };

  nest.key = function(d) {
    keys.push(d);
    return nest;
  };

  // Specifies the order for the most-recently specified key.
  // Note: only applies to entries. Map keys are unordered!
  nest.sortKeys = function(order) {
    sortKeys[keys.length - 1] = order;
    return nest;
  };

  // Specifies the order for leaf values.
  // Applies to both maps and entries array.
  nest.sortValues = function(order) {
    sortValues = order;
    return nest;
  };

  nest.rollup = function(f) {
    rollup = f;
    return nest;
  };

  return nest;
};
d3.keys = function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
};
d3.values = function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
};
d3.entries = function(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};
d3.permute = function(array, indexes) {
  var permutes = [],
      i = -1,
      n = indexes.length;
  while (++i < n) permutes[i] = array[indexes[i]];
  return permutes;
};
d3.merge = function(arrays) {
  return Array.prototype.concat.apply([], arrays);
};
d3.split = function(array, f) {
  var arrays = [],
      values = [],
      value,
      i = -1,
      n = array.length;
  if (arguments.length < 2) f = d3_splitter;
  while (++i < n) {
    if (f.call(values, value = array[i], i)) {
      values = [];
    } else {
      if (!values.length) arrays.push(values);
      values.push(value);
    }
  }
  return arrays;
};

function d3_splitter(d) {
  return d == null;
}
function d3_collapse(s) {
  return s.replace(/(^\s+)|(\s+$)/g, "").replace(/\s+/g, " ");
}
/**
 * @param {number} start
 * @param {number=} stop
 * @param {number=} step
 */
d3.range = function(start, stop, step) {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step == Infinity) throw new Error("infinite range");
  var range = [],
       i = -1,
       j;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j);
  else while ((j = start + step * ++i) < stop) range.push(j);
  return range;
};
d3.requote = function(s) {
  return s.replace(d3_requote_re, "\\$&");
};

var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
d3.round = function(x, n) {
  return n
      ? Math.round(x * Math.pow(10, n)) * Math.pow(10, -n)
      : Math.round(x);
};
d3.xhr = function(url, mime, callback) {
  var req = new XMLHttpRequest;
  if (arguments.length < 3) callback = mime;
  else if (mime && req.overrideMimeType) req.overrideMimeType(mime);
  req.open("GET", url, true);
  req.onreadystatechange = function() {
    if (req.readyState === 4) callback(req.status < 300 ? req : null);
  };
  req.send(null);
};
d3.text = function(url, mime, callback) {
  function ready(req) {
    callback(req && req.responseText);
  }
  if (arguments.length < 3) {
    callback = mime;
    mime = null;
  }
  d3.xhr(url, mime, ready);
};
d3.json = function(url, callback) {
  d3.text(url, "application/json", function(text) {
    callback(text ? JSON.parse(text) : null);
  });
};
d3.html = function(url, callback) {
  d3.text(url, "text/html", function(text) {
    if (text != null) { // Treat empty string as valid HTML.
      var range = document.createRange();
      range.selectNode(document.body);
      text = range.createContextualFragment(text);
    }
    callback(text);
  });
};
d3.xml = function(url, mime, callback) {
  function ready(req) {
    callback(req && req.responseXML);
  }
  if (arguments.length < 3) {
    callback = mime;
    mime = null;
  }
  d3.xhr(url, mime, ready);
};
d3.ns = {

  prefix: {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  },

  qualify: function(name) {
    var i = name.indexOf(":");
    return i < 0 ? name : {
      space: d3.ns.prefix[name.substring(0, i)],
      local: name.substring(i + 1)
    };
  }

};
/** @param {...string} types */
d3.dispatch = function(types) {
  var dispatch = {},
      type;
  for (var i = 0, n = arguments.length; i < n; i++) {
    type = arguments[i];
    dispatch[type] = d3_dispatch(type);
  }
  return dispatch;
};

function d3_dispatch(type) {
  var dispatch = {},
      listeners = [];

  dispatch.add = function(listener) {
    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i].listener == listener) return dispatch; // already registered
    }
    listeners.push({listener: listener, on: true});
    return dispatch;
  };

  dispatch.remove = function(listener) {
    for (var i = 0; i < listeners.length; i++) {
      var l = listeners[i];
      if (l.listener == listener) {
        l.on = false;
        listeners = listeners.slice(0, i).concat(listeners.slice(i + 1));
        break;
      }
    }
    return dispatch;
  };

  dispatch.dispatch = function() {
    var ls = listeners; // defensive reference
    for (var i = 0, n = ls.length; i < n; i++) {
      var l = ls[i];
      if (l.on) l.listener.apply(this, arguments);
    }
  };

  return dispatch;
};
// TODO align
d3.format = function(specifier) {
  var match = d3_format_re.exec(specifier),
      fill = match[1] || " ",
      sign = match[3] || "",
      zfill = match[5],
      width = +match[6],
      comma = match[7],
      precision = match[8],
      type = match[9],
      scale = 1,
      suffix = "",
      integer = false;

  if (precision) precision = +precision.substring(1);

  if (zfill) {
    fill = "0"; // TODO align = "=";
    if (comma) width -= Math.floor((width - 1) / 4);
  }

  switch (type) {
    case "n": comma = true; type = "g"; break;
    case "%": scale = 100; suffix = "%"; type = "f"; break;
    case "p": scale = 100; suffix = "%"; type = "r"; break;
    case "d": integer = true; precision = 0; break;
    case "s": scale = -1; type = "r"; break;
  }

  // If no precision is specified for r, fallback to general notation.
  if (type == "r" && !precision) type = "g";

  type = d3_format_types[type] || d3_format_typeDefault;

  return function(value) {

    // Return the empty string for floats formatted as ints.
    if (integer && (value % 1)) return "";

    // Convert negative to positive, and record the sign prefix.
    var negative = (value < 0) && (value = -value) ? "\u2212" : sign;

    // Apply the scale, computing it from the value's exponent for si format.
    if (scale < 0) {
      var prefix = d3.formatPrefix(value, precision);
      value *= prefix.scale;
      suffix = prefix.symbol;
    } else {
      value *= scale;
    }

    // Convert to the desired precision.
    value = type(value, precision);

    // If the fill character is 0, the sign and group is applied after the fill.
    if (zfill) {
      var length = value.length + negative.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
      if (comma) value = d3_format_group(value);
      value = negative + value;
    }

    // Otherwise (e.g., space-filling), the sign and group is applied before.
    else {
      if (comma) value = d3_format_group(value);
      value = negative + value;
      var length = value.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
    }

    return value + suffix;
  };
};

// [[fill]align][sign][#][0][width][,][.precision][type]
var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;

var d3_format_types = {
  g: function(x, p) { return x.toPrecision(p); },
  e: function(x, p) { return x.toExponential(p); },
  f: function(x, p) { return x.toFixed(p); },
  r: function(x, p) { return d3.round(x, p = d3_format_precision(x, p)).toFixed(Math.max(0, Math.min(20, p))); }
};

function d3_format_precision(x, p) {
  return p - (x ? 1 + Math.floor(Math.log(x + Math.pow(10, 1 + Math.floor(Math.log(x) / Math.LN10) - p)) / Math.LN10) : 1);
}

function d3_format_typeDefault(x) {
  return x + "";
}

// Apply comma grouping for thousands.
function d3_format_group(value) {
  var i = value.lastIndexOf("."),
      f = i >= 0 ? value.substring(i) : (i = value.length, ""),
      t = [];
  while (i > 0) t.push(value.substring(i -= 3, i + 3));
  return t.reverse().join(",") + f;
}
var d3_formatPrefixes = ["y","z","a","f","p","n","μ","m","","k","M","G","T","P","E","Z","Y"].map(d3_formatPrefix);

d3.formatPrefix = function(value, precision) {
  var i = 0;
  if (value) {
    if (value < 0) value *= -1;
    if (precision) value = d3.round(value, d3_format_precision(value, precision));
    i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
    i = Math.max(-24, Math.min(24, Math.floor((i <= 0 ? i + 1 : i - 1) / 3) * 3));
  }
  return d3_formatPrefixes[8 + i / 3];
};

function d3_formatPrefix(d, i) {
  return {
    scale: Math.pow(10, (8 - i) * 3),
    symbol: d
  };
}

/*
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the author nor the names of contributors may be used to
 *   endorse or promote products derived from this software without specific
 *   prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var d3_ease_quad = d3_ease_poly(2),
    d3_ease_cubic = d3_ease_poly(3);

var d3_ease = {
  linear: function() { return d3_ease_linear; },
  poly: d3_ease_poly,
  quad: function() { return d3_ease_quad; },
  cubic: function() { return d3_ease_cubic; },
  sin: function() { return d3_ease_sin; },
  exp: function() { return d3_ease_exp; },
  circle: function() { return d3_ease_circle; },
  elastic: d3_ease_elastic,
  back: d3_ease_back,
  bounce: function() { return d3_ease_bounce; }
};

var d3_ease_mode = {
  "in": function(f) { return f; },
  "out": d3_ease_reverse,
  "in-out": d3_ease_reflect,
  "out-in": function(f) { return d3_ease_reflect(d3_ease_reverse(f)); }
};

d3.ease = function(name) {
  var i = name.indexOf("-"),
      t = i >= 0 ? name.substring(0, i) : name,
      m = i >= 0 ? name.substring(i + 1) : "in";
  return d3_ease_clamp(d3_ease_mode[m](d3_ease[t].apply(null, Array.prototype.slice.call(arguments, 1))));
};

function d3_ease_clamp(f) {
  return function(t) {
    return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
  };
}

function d3_ease_reverse(f) {
  return function(t) {
    return 1 - f(1 - t);
  };
}

function d3_ease_reflect(f) {
  return function(t) {
    return .5 * (t < .5 ? f(2 * t) : (2 - f(2 - 2 * t)));
  };
}

function d3_ease_linear(t) {
  return t;
}

function d3_ease_poly(e) {
  return function(t) {
    return Math.pow(t, e);
  }
}

function d3_ease_sin(t) {
  return 1 - Math.cos(t * Math.PI / 2);
}

function d3_ease_exp(t) {
  return Math.pow(2, 10 * (t - 1));
}

function d3_ease_circle(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function d3_ease_elastic(a, p) {
  var s;
  if (arguments.length < 2) p = 0.45;
  if (arguments.length < 1) { a = 1; s = p / 4; }
  else s = p / (2 * Math.PI) * Math.asin(1 / a);
  return function(t) {
    return 1 + a * Math.pow(2, 10 * -t) * Math.sin((t - s) * 2 * Math.PI / p);
  };
}

function d3_ease_back(s) {
  if (!s) s = 1.70158;
  return function(t) {
    return t * t * ((s + 1) * t - s);
  };
}

function d3_ease_bounce(t) {
  return t < 1 / 2.75 ? 7.5625 * t * t
      : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75
      : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375
      : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
}
d3.event = null;
d3.interpolate = function(a, b) {
  var i = d3.interpolators.length, f;
  while (--i >= 0 && !(f = d3.interpolators[i](a, b)));
  return f;
};

d3.interpolateNumber = function(a, b) {
  b -= a;
  return function(t) { return a + b * t; };
};

d3.interpolateRound = function(a, b) {
  b -= a;
  return function(t) { return Math.round(a + b * t); };
};

d3.interpolateString = function(a, b) {
  var m, // current match
      i, // current index
      j, // current index (for coallescing)
      s0 = 0, // start index of current string prefix
      s1 = 0, // end index of current string prefix
      s = [], // string constants and placeholders
      q = [], // number interpolators
      n, // q.length
      o;

  // Reset our regular expression!
  d3_interpolate_number.lastIndex = 0;

  // Find all numbers in b.
  for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
    if (m.index) s.push(b.substring(s0, s1 = m.index));
    q.push({i: s.length, x: m[0]});
    s.push(null);
    s0 = d3_interpolate_number.lastIndex;
  }
  if (s0 < b.length) s.push(b.substring(s0));

  // Find all numbers in a.
  for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
    o = q[i];
    if (o.x == m[0]) { // The numbers match, so coallesce.
      if (o.i) {
        if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i - 1] += o.x;
          s.splice(o.i, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        } else { // This match is followed by a string, so coallesce twice.
          s[o.i - 1] += o.x + s[o.i + 1];
          s.splice(o.i, 2);
          for (j = i + 1; j < n; ++j) q[j].i -= 2;
        }
      } else {
          if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i] = o.x;
        } else { // This match is followed by a string, so coallesce twice.
          s[o.i] = o.x + s[o.i + 1];
          s.splice(o.i + 1, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        }
      }
      q.splice(i, 1);
      n--;
      i--;
    } else {
      o.x = d3.interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
    }
  }

  // Remove any numbers in b not found in a.
  while (i < n) {
    o = q.pop();
    if (s[o.i + 1] == null) { // This match is followed by another number.
      s[o.i] = o.x;
    } else { // This match is followed by a string, so coallesce twice.
      s[o.i] = o.x + s[o.i + 1];
      s.splice(o.i + 1, 1);
    }
    n--;
  }

  // Special optimization for only a single match.
  if (s.length === 1) {
    return s[0] == null ? q[0].x : function() { return b; };
  }

  // Otherwise, interpolate each of the numbers and rejoin the string.
  return function(t) {
    for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
};

d3.interpolateRgb = function(a, b) {
  a = d3.rgb(a);
  b = d3.rgb(b);
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      br = b.r - ar,
      bg = b.g - ag,
      bb = b.b - ab;
  return function(t) {
    return "#"
        + d3_rgb_hex(Math.round(ar + br * t))
        + d3_rgb_hex(Math.round(ag + bg * t))
        + d3_rgb_hex(Math.round(ab + bb * t));
  };
};

// interpolates HSL space, but outputs RGB string (for compatibility)
d3.interpolateHsl = function(a, b) {
  a = d3.hsl(a);
  b = d3.hsl(b);
  var h0 = a.h,
      s0 = a.s,
      l0 = a.l,
      h1 = b.h - h0,
      s1 = b.s - s0,
      l1 = b.l - l0;
  return function(t) {
    return d3_hsl_rgb(h0 + h1 * t, s0 + s1 * t, l0 + l1 * t).toString();
  };
};

d3.interpolateArray = function(a, b) {
  var x = [],
      c = [],
      na = a.length,
      nb = b.length,
      n0 = Math.min(a.length, b.length),
      i;
  for (i = 0; i < n0; ++i) x.push(d3.interpolate(a[i], b[i]));
  for (; i < na; ++i) c[i] = a[i];
  for (; i < nb; ++i) c[i] = b[i];
  return function(t) {
    for (i = 0; i < n0; ++i) c[i] = x[i](t);
    return c;
  };
};

d3.interpolateObject = function(a, b) {
  var i = {},
      c = {},
      k;
  for (k in a) {
    if (k in b) {
      i[k] = d3_interpolateByName(k)(a[k], b[k]);
    } else {
      c[k] = a[k];
    }
  }
  for (k in b) {
    if (!(k in a)) {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var d3_interpolate_number = /[-+]?(?:\d+\.\d+|\d+\.|\.\d+|\d+)(?:[eE][-]?\d+)?/g,
    d3_interpolate_rgb = {background: 1, fill: 1, stroke: 1};

function d3_interpolateByName(n) {
  return n in d3_interpolate_rgb || /\bcolor\b/.test(n)
      ? d3.interpolateRgb
      : d3.interpolate;
}

d3.interpolators = [
  d3.interpolateObject,
  function(a, b) { return (b instanceof Array) && d3.interpolateArray(a, b); },
  function(a, b) { return (typeof b === "string") && d3.interpolateString(String(a), b); },
  function(a, b) { return (typeof b === "string" ? b in d3_rgb_names || /^(#|rgb\(|hsl\()/.test(b) : b instanceof d3_Rgb || b instanceof d3_Hsl) && d3.interpolateRgb(String(a), b); },
  function(a, b) { return (typeof b === "number") && d3.interpolateNumber(+a, b); }
];
function d3_uninterpolateNumber(a, b) {
  b = b - (a = +a) ? 1 / (b - a) : 0;
  return function(x) { return (x - a) * b; };
}

function d3_uninterpolateClamp(a, b) {
  b = b - (a = +a) ? 1 / (b - a) : 0;
  return function(x) { return Math.max(0, Math.min(1, (x - a) * b)); };
}
d3.rgb = function(r, g, b) {
  return arguments.length === 1
      ? (r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b)
      : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb))
      : d3_rgb(~~r, ~~g, ~~b);
};

function d3_rgb(r, g, b) {
  return new d3_Rgb(r, g, b);
}

function d3_Rgb(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

d3_Rgb.prototype.brighter = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  var r = this.r,
      g = this.g,
      b = this.b,
      i = 30;
  if (!r && !g && !b) return d3_rgb(i, i, i);
  if (r && r < i) r = i;
  if (g && g < i) g = i;
  if (b && b < i) b = i;
  return d3_rgb(
      Math.min(255, Math.floor(r / k)),
      Math.min(255, Math.floor(g / k)),
      Math.min(255, Math.floor(b / k)));
};

d3_Rgb.prototype.darker = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_rgb(
      Math.floor(k * this.r),
      Math.floor(k * this.g),
      Math.floor(k * this.b));
};

d3_Rgb.prototype.hsl = function() {
  return d3_rgb_hsl(this.r, this.g, this.b);
};

d3_Rgb.prototype.toString = function() {
  return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
};

function d3_rgb_hex(v) {
  return v < 0x10
      ? "0" + Math.max(0, v).toString(16)
      : Math.min(255, v).toString(16);
}

function d3_rgb_parse(format, rgb, hsl) {
  var r = 0, // red channel; int in [0, 255]
      g = 0, // green channel; int in [0, 255]
      b = 0, // blue channel; int in [0, 255]
      m1, // CSS color specification match
      m2, // CSS color specification type (e.g., rgb)
      name;

  /* Handle hsl, rgb. */
  m1 = /([a-z]+)\((.*)\)/i.exec(format);
  if (m1) {
    m2 = m1[2].split(",");
    switch (m1[1]) {
      case "hsl": {
        return hsl(
          parseFloat(m2[0]), // degrees
          parseFloat(m2[1]) / 100, // percentage
          parseFloat(m2[2]) / 100 // percentage
        );
      }
      case "rgb": {
        return rgb(
          d3_rgb_parseNumber(m2[0]),
          d3_rgb_parseNumber(m2[1]),
          d3_rgb_parseNumber(m2[2])
        );
      }
    }
  }

  /* Named colors. */
  if (name = d3_rgb_names[format]) return rgb(name.r, name.g, name.b);

  /* Hexadecimal colors: #rgb and #rrggbb. */
  if (format != null && format.charAt(0) === "#") {
    if (format.length === 4) {
      r = format.charAt(1); r += r;
      g = format.charAt(2); g += g;
      b = format.charAt(3); b += b;
    } else if (format.length === 7) {
      r = format.substring(1, 3);
      g = format.substring(3, 5);
      b = format.substring(5, 7);
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
  }

  return rgb(r, g, b);
}

function d3_rgb_hsl(r, g, b) {
  var min = Math.min(r /= 255, g /= 255, b /= 255),
      max = Math.max(r, g, b),
      d = max - min,
      h,
      s,
      l = (max + min) / 2;
  if (d) {
    s = l < .5 ? d / (max + min) : d / (2 - max - min);
    if (r == max) h = (g - b) / d + (g < b ? 6 : 0);
    else if (g == max) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  } else {
    s = h = 0;
  }
  return d3_hsl(h, s, l);
}

function d3_rgb_parseNumber(c) { // either integer or percentage
  var f = parseFloat(c);
  return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
}

var d3_rgb_names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};

for (var d3_rgb_name in d3_rgb_names) {
  d3_rgb_names[d3_rgb_name] = d3_rgb_parse(
      d3_rgb_names[d3_rgb_name],
      d3_rgb,
      d3_hsl_rgb);
}
d3.hsl = function(h, s, l) {
  return arguments.length === 1
      ? (h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l)
      : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl))
      : d3_hsl(+h, +s, +l);
};

function d3_hsl(h, s, l) {
  return new d3_Hsl(h, s, l);
}

function d3_Hsl(h, s, l) {
  this.h = h;
  this.s = s;
  this.l = l;
}

d3_Hsl.prototype.brighter = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_hsl(this.h, this.s, this.l / k);
};

d3_Hsl.prototype.darker = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_hsl(this.h, this.s, k * this.l);
};

d3_Hsl.prototype.rgb = function() {
  return d3_hsl_rgb(this.h, this.s, this.l);
};

d3_Hsl.prototype.toString = function() {
  return this.rgb().toString();
};

function d3_hsl_rgb(h, s, l) {
  var m1,
      m2;

  /* Some simple corrections for h, s and l. */
  h = h % 360; if (h < 0) h += 360;
  s = s < 0 ? 0 : s > 1 ? 1 : s;
  l = l < 0 ? 0 : l > 1 ? 1 : l;

  /* From FvD 13.37, CSS Color Module Level 3 */
  m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
  m1 = 2 * l - m2;

  function v(h) {
    if (h > 360) h -= 360;
    else if (h < 0) h += 360;
    if (h < 60) return m1 + (m2 - m1) * h / 60;
    if (h < 180) return m2;
    if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
    return m1;
  }

  function vv(h) {
    return Math.round(v(h) * 255);
  }

  return d3_rgb(vv(h + 120), vv(h), vv(h - 120));
}
function d3_selection(groups) {
  d3_arraySubclass(groups, d3_selectionPrototype);
  return groups;
}

var d3_select = function(s, n) { return n.querySelector(s); },
    d3_selectAll = function(s, n) { return n.querySelectorAll(s); };

// Prefer Sizzle, if available.
if (typeof Sizzle === "function") {
  d3_select = function(s, n) { return Sizzle(s, n)[0]; };
  d3_selectAll = function(s, n) { return Sizzle.uniqueSort(Sizzle(s, n)); };
}

var d3_selectionPrototype = [];

d3.selection = function() {
  return d3_selectionRoot;
};

d3.selection.prototype = d3_selectionPrototype;
d3_selectionPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      group,
      node;

  if (typeof selector !== "function") selector = d3_selection_selector(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(subnode = selector.call(node, node.__data__, i));
        if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_selector(selector) {
  return function() {
    return d3_select(selector, this);
  };
}
d3_selectionPrototype.selectAll = function(selector) {
  var subgroups = [],
      subgroup,
      node;

  if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i)));
        subgroup.parentNode = node;
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_selectorAll(selector) {
  return function() {
    return d3_selectAll(selector, this);
  };
}
d3_selectionPrototype.attr = function(name, value) {
  name = d3.ns.qualify(name);

  // If no value is specified, return the first value.
  if (arguments.length < 2) {
    var node = this.node();
    return name.local
        ? node.getAttributeNS(name.space, name.local)
        : node.getAttribute(name);
  }

  function attrNull() {
    this.removeAttribute(name);
  }

  function attrNullNS() {
    this.removeAttributeNS(name.space, name.local);
  }

  function attrConstant() {
    this.setAttribute(name, value);
  }

  function attrConstantNS() {
    this.setAttributeNS(name.space, name.local, value);
  }

  function attrFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.removeAttribute(name);
    else this.setAttribute(name, x);
  }

  function attrFunctionNS() {
    var x = value.apply(this, arguments);
    if (x == null) this.removeAttributeNS(name.space, name.local);
    else this.setAttributeNS(name.space, name.local, x);
  }

  return this.each(value == null
      ? (name.local ? attrNullNS : attrNull) : (typeof value === "function"
      ? (name.local ? attrFunctionNS : attrFunction)
      : (name.local ? attrConstantNS : attrConstant)));
};
d3_selectionPrototype.classed = function(name, value) {
  var names = name.split(d3_selection_classedWhitespace),
      n = names.length,
      i = -1;
  if (arguments.length > 1) {
    while (++i < n) d3_selection_classed.call(this, names[i], value);
    return this;
  } else {
    while (++i < n) if (!d3_selection_classed.call(this, names[i])) return false;
    return true;
  }
};

var d3_selection_classedWhitespace = /\s+/g;

function d3_selection_classed(name, value) {
  var re = new RegExp("(^|\\s+)" + d3.requote(name) + "(\\s+|$)", "g");

  // If no value is specified, return the first value.
  if (arguments.length < 2) {
    var node = this.node();
    if (c = node.classList) return c.contains(name);
    var c = node.className;
    re.lastIndex = 0;
    return re.test(c.baseVal != null ? c.baseVal : c);
  }

  function classedAdd() {
    if (c = this.classList) return c.add(name);
    var c = this.className,
        cb = c.baseVal != null,
        cv = cb ? c.baseVal : c;
    re.lastIndex = 0;
    if (!re.test(cv)) {
      cv = d3_collapse(cv + " " + name);
      if (cb) c.baseVal = cv;
      else this.className = cv;
    }
  }

  function classedRemove() {
    if (c = this.classList) return c.remove(name);
    var c = this.className,
        cb = c.baseVal != null,
        cv = cb ? c.baseVal : c;
    cv = d3_collapse(cv.replace(re, " "));
    if (cb) c.baseVal = cv;
    else this.className = cv;
  }

  function classedFunction() {
    (value.apply(this, arguments)
        ? classedAdd
        : classedRemove).call(this);
  }

  return this.each(typeof value === "function"
      ? classedFunction : value
      ? classedAdd
      : classedRemove);
}
d3_selectionPrototype.style = function(name, value, priority) {
  if (arguments.length < 3) priority = "";

  // If no value is specified, return the first value.
  if (arguments.length < 2) return window
      .getComputedStyle(this.node(), null)
      .getPropertyValue(name);

  function styleNull() {
    this.style.removeProperty(name);
  }

  function styleConstant() {
    this.style.setProperty(name, value, priority);
  }

  function styleFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.style.removeProperty(name);
    else this.style.setProperty(name, x, priority);
  }

  return this.each(value == null
      ? styleNull : (typeof value === "function"
      ? styleFunction : styleConstant));
};
d3_selectionPrototype.property = function(name, value) {

  // If no value is specified, return the first value.
  if (arguments.length < 2) return this.node()[name];

  function propertyNull() {
    delete this[name];
  }

  function propertyConstant() {
    this[name] = value;
  }

  function propertyFunction() {
    var x = value.apply(this, arguments);
    if (x == null) delete this[name];
    else this[name] = x;
  }

  return this.each(value == null
      ? propertyNull : (typeof value === "function"
      ? propertyFunction : propertyConstant));
};
d3_selectionPrototype.text = function(value) {
  return arguments.length < 1 ? this.node().textContent
      : (this.each(typeof value === "function"
      ? function() { this.textContent = value.apply(this, arguments); }
      : function() { this.textContent = value; }));
};
d3_selectionPrototype.html = function(value) {
  return arguments.length < 1 ? this.node().innerHTML
      : (this.each(typeof value === "function"
      ? function() { this.innerHTML = value.apply(this, arguments); }
      : function() { this.innerHTML = value; }));
};
// TODO append(node)?
// TODO append(function)?
d3_selectionPrototype.append = function(name) {
  name = d3.ns.qualify(name);

  function append() {
    return this.appendChild(document.createElement(name));
  }

  function appendNS() {
    return this.appendChild(document.createElementNS(name.space, name.local));
  }

  return this.select(name.local ? appendNS : append);
};
// TODO insert(node, function)?
// TODO insert(function, string)?
// TODO insert(function, function)?
d3_selectionPrototype.insert = function(name, before) {
  name = d3.ns.qualify(name);

  function insert() {
    return this.insertBefore(
        document.createElement(name),
        d3_select(before, this));
  }

  function insertNS() {
    return this.insertBefore(
        document.createElementNS(name.space, name.local),
        d3_select(before, this));
  }

  return this.select(name.local ? insertNS : insert);
};
// TODO remove(selector)?
// TODO remove(node)?
// TODO remove(function)?
d3_selectionPrototype.remove = function() {
  return this.each(function() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  });
};
// TODO data(null) for clearing data?
d3_selectionPrototype.data = function(data, join) {
  var enter = [],
      update = [],
      exit = [];

  function bind(group, groupData) {
    var i,
        n = group.length,
        m = groupData.length,
        n0 = Math.min(n, m),
        n1 = Math.max(n, m),
        updateNodes = [],
        enterNodes = [],
        exitNodes = [],
        node,
        nodeData;

    if (join) {
      var nodeByKey = {},
          keys = [],
          key,
          j = groupData.length;

      for (i = -1; ++i < n;) {
        key = join.call(node = group[i], node.__data__, i);
        if (key in nodeByKey) {
          exitNodes[j++] = node; // duplicate key
        } else {
          nodeByKey[key] = node;
        }
        keys.push(key);
      }

      for (i = -1; ++i < m;) {
        node = nodeByKey[key = join.call(groupData, nodeData = groupData[i], i)];
        if (node) {
          node.__data__ = nodeData;
          updateNodes[i] = node;
          enterNodes[i] = exitNodes[i] = null;
        } else {
          enterNodes[i] = d3_selection_dataNode(nodeData);
          updateNodes[i] = exitNodes[i] = null;
        }
        delete nodeByKey[key];
      }

      for (i = -1; ++i < n;) {
        if (keys[i] in nodeByKey) {
          exitNodes[i] = group[i];
        }
      }
    } else {
      for (i = -1; ++i < n0;) {
        node = group[i];
        nodeData = groupData[i];
        if (node) {
          node.__data__ = nodeData;
          updateNodes[i] = node;
          enterNodes[i] = exitNodes[i] = null;
        } else {
          enterNodes[i] = d3_selection_dataNode(nodeData);
          updateNodes[i] = exitNodes[i] = null;
        }
      }
      for (; i < m; ++i) {
        enterNodes[i] = d3_selection_dataNode(groupData[i]);
        updateNodes[i] = exitNodes[i] = null;
      }
      for (; i < n1; ++i) {
        exitNodes[i] = group[i];
        enterNodes[i] = updateNodes[i] = null;
      }
    }

    enterNodes.update
        = updateNodes;

    enterNodes.parentNode
        = updateNodes.parentNode
        = exitNodes.parentNode
        = group.parentNode;

    enter.push(enterNodes);
    update.push(updateNodes);
    exit.push(exitNodes);
  }

  var i = -1,
      n = this.length,
      group;
  if (typeof data === "function") {
    while (++i < n) {
      bind(group = this[i], data.call(group, group.parentNode.__data__, i));
    }
  } else {
    while (++i < n) {
      bind(group = this[i], data);
    }
  }

  var selection = d3_selection(update);
  selection.enter = function() { return d3_selection_enter(enter); };
  selection.exit = function() { return d3_selection(exit); };
  return selection;
};

function d3_selection_dataNode(data) {
  return {__data__: data};
}
// TODO preserve null elements to maintain index?
d3_selectionPrototype.filter = function(filter) {
  var subgroups = [],
      subgroup,
      group,
      node;

  for (var j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (var i = 0, n = group.length; i < n; i++) {
      if ((node = group[i]) && filter.call(node, node.__data__, i)) {
        subgroup.push(node);
      }
    }
  }

  return d3_selection(subgroups);
};
d3_selectionPrototype.map = function(map) {
  return this.each(function() {
    this.__data__ = map.apply(this, arguments);
  });
};
d3_selectionPrototype.sort = function(comparator) {
  comparator = d3_selection_sortComparator.apply(this, arguments);
  for (var j = 0, m = this.length; j < m; j++) {
    for (var group = this[j].sort(comparator), i = 1, n = group.length, prev = group[0]; i < n; i++) {
      var node = group[i];
      if (node) {
        if (prev) prev.parentNode.insertBefore(node, prev.nextSibling);
        prev = node;
      }
    }
  }
  return this;
};

function d3_selection_sortComparator(comparator) {
  if (!arguments.length) comparator = d3.ascending;
  return function(a, b) {
    return comparator(a && a.__data__, b && b.__data__);
  };
}
// type can be namespaced, e.g., "click.foo"
// listener can be null for removal
d3_selectionPrototype.on = function(type, listener, capture) {
  if (arguments.length < 3) capture = false;

  // parse the type specifier
  var name = "__on" + type, i = type.indexOf(".");
  if (i > 0) type = type.substring(0, i);

  // if called with only one argument, return the current listener
  if (arguments.length < 2) return (i = this.node()[name]) && i._;

  // remove the old event listener, and add the new event listener
  return this.each(function(d, i) {
    var node = this;

    if (node[name]) node.removeEventListener(type, node[name], capture);
    if (listener) node.addEventListener(type, node[name] = l, capture);

    // wrapped event listener that preserves i
    function l(e) {
      var o = d3.event; // Events can be reentrant (e.g., focus).
      d3.event = e;
      try {
        listener.call(node, node.__data__, i);
      } finally {
        d3.event = o;
      }
    }

    // stash the unwrapped listener for retrieval
    l._ = listener;
  });
};
d3_selectionPrototype.each = function(callback) {
  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      var node = group[i];
      if (node) callback.call(node, node.__data__, i, j);
    }
  }
  return this;
};
//
// Note: assigning to the arguments array simultaneously changes the value of
// the corresponding argument!
//
// TODO The `this` argument probably shouldn't be the first argument to the
// callback, anyway, since it's redundant. However, that will require a major
// version bump due to backwards compatibility, so I'm not changing it right
// away.
//
d3_selectionPrototype.call = function(callback) {
  callback.apply(this, (arguments[0] = this, arguments));
  return this;
};
d3_selectionPrototype.empty = function() {
  return !this.node();
};
d3_selectionPrototype.node = function(callback) {
  for (var j = 0, m = this.length; j < m; j++) {
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
};
d3_selectionPrototype.transition = function() {
  var subgroups = [],
      subgroup,
      node;

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      subgroup.push((node = group[i]) ? {node: node, delay: 0, duration: 250} : null);
    }
  }

  return d3_transition(subgroups, d3_transitionInheritId || ++d3_transitionId, Date.now());
};
var d3_selectionRoot = d3_selection([[document]]);

d3_selectionRoot[0].parentNode = document.documentElement;

// TODO fast singleton implementation!
// TODO select(function)
d3.select = function(selector) {
  return typeof selector === "string"
      ? d3_selectionRoot.select(selector)
      : d3_selection([[selector]]); // assume node
};

// TODO selectAll(function)
d3.selectAll = function(selector) {
  return typeof selector === "string"
      ? d3_selectionRoot.selectAll(selector)
      : d3_selection([d3_array(selector)]); // assume node[]
};
function d3_selection_enter(selection) {
  d3_arraySubclass(selection, d3_selection_enterPrototype);
  return selection;
}

var d3_selection_enterPrototype = [];

d3_selection_enterPrototype.append = d3_selectionPrototype.append;
d3_selection_enterPrototype.insert = d3_selectionPrototype.insert;
d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
d3_selection_enterPrototype.node = d3_selectionPrototype.node;
d3_selection_enterPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      upgroup,
      group,
      node;

  for (var j = -1, m = this.length; ++j < m;) {
    upgroup = (group = this[j]).update;
    subgroups.push(subgroup = []);
    subgroup.parentNode = group.parentNode;
    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i));
        subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_selection(subgroups);
};
function d3_transition(groups, id, time) {
  d3_arraySubclass(groups, d3_transitionPrototype);

  var tweens = {},
      event = d3.dispatch("start", "end"),
      ease = d3_transitionEase;

  groups.id = id;

  groups.time = time;

  groups.tween = function(name, tween) {
    if (arguments.length < 2) return tweens[name];
    if (tween == null) delete tweens[name];
    else tweens[name] = tween;
    return groups;
  };

  groups.ease = function(value) {
    if (!arguments.length) return ease;
    ease = typeof value === "function" ? value : d3.ease.apply(d3, arguments);
    return groups;
  };

  groups.each = function(type, listener) {
    if (arguments.length < 2) return d3_transition_each.call(groups, type);
    event[type].add(listener);
    return groups;
  };

  d3.timer(function(elapsed) {
    groups.each(function(d, i, j) {
      var tweened = [],
          node = this,
          delay = groups[j][i].delay,
          duration = groups[j][i].duration,
          lock = node.__transition__ || (node.__transition__ = {active: 0, count: 0});

      ++lock.count;

      delay <= elapsed ? start(elapsed) : d3.timer(start, delay, time);

      function start(elapsed) {
        if (lock.active > id) return stop();
        lock.active = id;

        for (var tween in tweens) {
          if (tween = tweens[tween].call(node, d, i)) {
            tweened.push(tween);
          }
        }

        event.start.dispatch.call(node, d, i);
        if (!tick(elapsed)) d3.timer(tick, 0, time);
        return 1;
      }

      function tick(elapsed) {
        if (lock.active !== id) return stop();

        var t = (elapsed - delay) / duration,
            e = ease(t),
            n = tweened.length;

        while (n > 0) {
          tweened[--n].call(node, e);
        }

        if (t >= 1) {
          stop();
          d3_transitionInheritId = id;
          event.end.dispatch.call(node, d, i);
          d3_transitionInheritId = 0;
          return 1;
        }
      }

      function stop() {
        if (!--lock.count) delete node.__transition__;
        return 1;
      }
    });
    return 1;
  }, 0, time);

  return groups;
}

var d3_transitionRemove = {};

function d3_transitionNull(d, i, a) {
  return a != "" && d3_transitionRemove;
}

function d3_transitionTween(b) {

  function transitionFunction(d, i, a) {
    var v = b.call(this, d, i);
    return v == null
        ? a != "" && d3_transitionRemove
        : a != v && d3.interpolate(a, v);
  }

  function transitionString(d, i, a) {
    return a != b && d3.interpolate(a, b);
  }

  return typeof b === "function" ? transitionFunction
      : b == null ? d3_transitionNull
      : (b += "", transitionString);
}

var d3_transitionPrototype = [],
    d3_transitionId = 0,
    d3_transitionInheritId = 0,
    d3_transitionEase = d3.ease("cubic-in-out");

d3_transitionPrototype.call = d3_selectionPrototype.call;

d3.transition = function() {
  return d3_selectionRoot.transition();
};

d3.transition.prototype = d3_transitionPrototype;
d3_transitionPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      node;

  if (typeof selector !== "function") selector = d3_selection_selector(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if ((node = group[i]) && (subnode = selector.call(node.node, node.node.__data__, i))) {
        if ("__data__" in node.node) subnode.__data__ = node.node.__data__;
        subgroup.push({node: subnode, delay: node.delay, duration: node.duration});
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_transition(subgroups, this.id, this.time).ease(this.ease());
};
d3_transitionPrototype.selectAll = function(selector) {
  var subgroups = [],
      subgroup,
      subnodes,
      node;

  if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subnodes = selector.call(node.node, node.node.__data__, i);
        subgroups.push(subgroup = []);
        for (var k = -1, o = subnodes.length; ++k < o;) {
          subgroup.push({node: subnodes[k], delay: node.delay, duration: node.duration});
        }
      }
    }
  }

  return d3_transition(subgroups, this.id, this.time).ease(this.ease());
};
d3_transitionPrototype.attr = function(name, value) {
  return this.attrTween(name, d3_transitionTween(value));
};

d3_transitionPrototype.attrTween = function(nameNS, tween) {
  var name = d3.ns.qualify(nameNS);

  function attrTween(d, i) {
    var f = tween.call(this, d, i, this.getAttribute(name));
    return f === d3_transitionRemove
        ? (this.removeAttribute(name), null)
        : f && function(t) { this.setAttribute(name, f(t)); };
  }

  function attrTweenNS(d, i) {
    var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
    return f === d3_transitionRemove
        ? (this.removeAttributeNS(name.space, name.local), null)
        : f && function(t) { this.setAttributeNS(name.space, name.local, f(t)); };
  }

  return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
};
d3_transitionPrototype.style = function(name, value, priority) {
  if (arguments.length < 3) priority = "";
  return this.styleTween(name, d3_transitionTween(value), priority);
};

d3_transitionPrototype.styleTween = function(name, tween, priority) {
  if (arguments.length < 3) priority = "";
  return this.tween("style." + name, function(d, i) {
    var f = tween.call(this, d, i, window.getComputedStyle(this, null).getPropertyValue(name));
    return f === d3_transitionRemove
        ? (this.style.removeProperty(name), null)
        : f && function(t) { this.style.setProperty(name, f(t), priority); };
  });
};
d3_transitionPrototype.text = function(value) {
  return this.tween("text", function(d, i) {
    this.textContent = typeof value === "function"
        ? value.call(this, d, i)
        : value;
  });
};
d3_transitionPrototype.remove = function() {
  return this.each("end", function() {
    var p;
    if (!this.__transition__ && (p = this.parentNode)) p.removeChild(this);
  });
};
d3_transitionPrototype.delay = function(value) {
  var groups = this;
  return groups.each(typeof value === "function"
      ? function(d, i, j) { groups[j][i].delay = +value.apply(this, arguments); }
      : (value = +value, function(d, i, j) { groups[j][i].delay = value; }));
};
d3_transitionPrototype.duration = function(value) {
  var groups = this;
  return groups.each(typeof value === "function"
      ? function(d, i, j) { groups[j][i].duration = +value.apply(this, arguments); }
      : (value = +value, function(d, i, j) { groups[j][i].duration = value; }));
};
function d3_transition_each(callback) {
  for (var j = 0, m = this.length; j < m; j++) {
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      var node = group[i];
      if (node) callback.call(node = node.node, node.__data__, i, j);
    }
  }
  return this;
}
d3_transitionPrototype.transition = function() {
  return this.select(d3_this);
};
var d3_timer_queue = null,
    d3_timer_interval, // is an interval (or frame) active?
    d3_timer_timeout; // is a timeout active?

// The timer will continue to fire until callback returns true.
d3.timer = function(callback, delay, then) {
  var found = false,
      t0,
      t1 = d3_timer_queue;

  if (arguments.length < 3) {
    if (arguments.length < 2) delay = 0;
    else if (!isFinite(delay)) return;
    then = Date.now();
  }

  // See if the callback's already in the queue.
  while (t1) {
    if (t1.callback === callback) {
      t1.then = then;
      t1.delay = delay;
      found = true;
      break;
    }
    t0 = t1;
    t1 = t1.next;
  }

  // Otherwise, add the callback to the queue.
  if (!found) d3_timer_queue = {
    callback: callback,
    then: then,
    delay: delay,
    next: d3_timer_queue
  };

  // Start animatin'!
  if (!d3_timer_interval) {
    d3_timer_timeout = clearTimeout(d3_timer_timeout);
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
}

function d3_timer_step() {
  var elapsed,
      now = Date.now(),
      t1 = d3_timer_queue;

  while (t1) {
    elapsed = now - t1.then;
    if (elapsed >= t1.delay) t1.flush = t1.callback(elapsed);
    t1 = t1.next;
  }

  var delay = d3_timer_flush() - now;
  if (delay > 24) {
    if (isFinite(delay)) {
      clearTimeout(d3_timer_timeout);
      d3_timer_timeout = setTimeout(d3_timer_step, delay);
    }
    d3_timer_interval = 0;
  } else {
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
}

d3.timer.flush = function() {
  var elapsed,
      now = Date.now(),
      t1 = d3_timer_queue;

  while (t1) {
    elapsed = now - t1.then;
    if (!t1.delay) t1.flush = t1.callback(elapsed);
    t1 = t1.next;
  }

  d3_timer_flush();
};

// Flush after callbacks, to avoid concurrent queue modification.
function d3_timer_flush() {
  var t0 = null,
      t1 = d3_timer_queue,
      then = Infinity;
  while (t1) {
    if (t1.flush) {
      t1 = t0 ? t0.next = t1.next : d3_timer_queue = t1.next;
    } else {
      then = Math.min(then, t1.then + t1.delay);
      t1 = (t0 = t1).next;
    }
  }
  return then;
}

var d3_timer_frame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) { setTimeout(callback, 17); };
function d3_noop() {}
d3.scale = {};

function d3_scaleExtent(domain) {
  var start = domain[0], stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}
function d3_scale_nice(domain, nice) {
  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      dx;

  if (x1 < x0) {
    dx = i0; i0 = i1; i1 = dx;
    dx = x0; x0 = x1; x1 = dx;
  }

  if (dx = x1 - x0) {
    nice = nice(dx);
    domain[i0] = nice.floor(x0);
    domain[i1] = nice.ceil(x1);
  }

  return domain;
}

function d3_scale_niceDefault() {
  return Math;
}
d3.scale.linear = function() {
  return d3_scale_linear([0, 1], [0, 1], d3.interpolate, false);
};

function d3_scale_linear(domain, range, interpolate, clamp) {
  var output,
      input;

  function rescale() {
    var linear = domain.length == 2 ? d3_scale_bilinear : d3_scale_polylinear,
        uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
    output = linear(domain, range, uninterpolate, interpolate);
    input = linear(range, domain, uninterpolate, d3.interpolate);
    return scale;
  }

  function scale(x) {
    return output(x);
  }

  // Note: requires range is coercible to number!
  scale.invert = function(y) {
    return input(y);
  };

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.map(Number);
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.rangeRound = function(x) {
    return scale.range(x).interpolate(d3.interpolateRound);
  };

  scale.clamp = function(x) {
    if (!arguments.length) return clamp;
    clamp = x;
    return rescale();
  };

  scale.interpolate = function(x) {
    if (!arguments.length) return interpolate;
    interpolate = x;
    return rescale();
  };

  scale.ticks = function(m) {
    return d3_scale_linearTicks(domain, m);
  };

  scale.tickFormat = function(m) {
    return d3_scale_linearTickFormat(domain, m);
  };

  scale.nice = function() {
    d3_scale_nice(domain, d3_scale_linearNice);
    return rescale();
  };

  scale.copy = function() {
    return d3_scale_linear(domain, range, interpolate, clamp);
  };

  return rescale();
};

function d3_scale_linearRebind(scale, linear) {
  scale.range = d3.rebind(scale, linear.range);
  scale.rangeRound = d3.rebind(scale, linear.rangeRound);
  scale.interpolate = d3.rebind(scale, linear.interpolate);
  scale.clamp = d3.rebind(scale, linear.clamp);
  return scale;
}

function d3_scale_linearNice(dx) {
  dx = Math.pow(10, Math.round(Math.log(dx) / Math.LN10) - 1);
  return {
    floor: function(x) { return Math.floor(x / dx) * dx; },
    ceil: function(x) { return Math.ceil(x / dx) * dx; }
  };
}

// TODO Dates? Ugh.
function d3_scale_linearTickRange(domain, m) {
  var extent = d3_scaleExtent(domain),
      span = extent[1] - extent[0],
      step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
      err = m / span * step;

  // Filter ticks to get closer to the desired count.
  if (err <= .15) step *= 10;
  else if (err <= .35) step *= 5;
  else if (err <= .75) step *= 2;

  // Round start and stop values to step interval.
  extent[0] = Math.ceil(extent[0] / step) * step;
  extent[1] = Math.floor(extent[1] / step) * step + step * .5; // inclusive
  extent[2] = step;
  return extent;
}

function d3_scale_linearTicks(domain, m) {
  return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
}

function d3_scale_linearTickFormat(domain, m) {
  return d3.format(",." + Math.max(0, -Math.floor(Math.log(d3_scale_linearTickRange(domain, m)[2]) / Math.LN10 + .01)) + "f");
}
function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
  var u = uninterpolate(domain[0], domain[1]),
      i = interpolate(range[0], range[1]);
  return function(x) {
    return i(u(x));
  };
}
function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
  var u = [],
      i = [],
      j = 0,
      n = domain.length;

  while (++j < n) {
    u.push(uninterpolate(domain[j - 1], domain[j]));
    i.push(interpolate(range[j - 1], range[j]));
  }

  return function(x) {
    var j = d3.bisect(domain, x, 1, domain.length - 1) - 1;
    return i[j](u[j](x));
  };
}
d3.scale.log = function() {
  return d3_scale_log(d3.scale.linear(), d3_scale_logp);
};

function d3_scale_log(linear, log) {
  var pow = log.pow;

  function scale(x) {
    return linear(log(x));
  }

  scale.invert = function(x) {
    return pow(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(pow);
    log = x[0] < 0 ? d3_scale_logn : d3_scale_logp;
    pow = log.pow;
    linear.domain(x.map(log));
    return scale;
  };

  scale.nice = function() {
    linear.domain(d3_scale_nice(linear.domain(), d3_scale_niceDefault));
    return scale;
  };

  scale.ticks = function() {
    var extent = d3_scaleExtent(linear.domain()),
        ticks = [];
    if (extent.every(isFinite)) {
      var i = Math.floor(extent[0]),
          j = Math.ceil(extent[1]),
          u = Math.round(pow(extent[0])),
          v = Math.round(pow(extent[1]));
      if (log === d3_scale_logn) {
        ticks.push(pow(i));
        for (; i++ < j;) for (var k = 9; k > 0; k--) ticks.push(pow(i) * k);
      } else {
        for (; i < j; i++) for (var k = 1; k < 10; k++) ticks.push(pow(i) * k);
        ticks.push(pow(i));
      }
      for (i = 0; ticks[i] < u; i++) {} // strip small values
      for (j = ticks.length; ticks[j - 1] > v; j--) {} // strip big values
      ticks = ticks.slice(i, j);
    }
    return ticks;
  };

  scale.tickFormat = function(n, format) {
    if (arguments.length < 2) format = d3_scale_logFormat;
    if (arguments.length < 1) return format;
    var k = n / scale.ticks().length,
        f = log === d3_scale_logn ? (e = -1e-15, Math.floor) : (e = 1e-15, Math.ceil),
        e;
    return function(d) {
      return d / pow(f(log(d) + e)) < k ? format(d) : "";
    };
  };

  scale.copy = function() {
    return d3_scale_log(linear.copy(), log);
  };

  return d3_scale_linearRebind(scale, linear);
};

var d3_scale_logFormat = d3.format("e");

function d3_scale_logp(x) {
  return Math.log(x) / Math.LN10;
}

function d3_scale_logn(x) {
  return -Math.log(-x) / Math.LN10;
}

d3_scale_logp.pow = function(x) {
  return Math.pow(10, x);
};

d3_scale_logn.pow = function(x) {
  return -Math.pow(10, -x);
};
d3.scale.pow = function() {
  return d3_scale_pow(d3.scale.linear(), 1);
};

function d3_scale_pow(linear, exponent) {
  var powp = d3_scale_powPow(exponent),
      powb = d3_scale_powPow(1 / exponent);

  function scale(x) {
    return linear(powp(x));
  }

  scale.invert = function(x) {
    return powb(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(powb);
    linear.domain(x.map(powp));
    return scale;
  };

  scale.ticks = function(m) {
    return d3_scale_linearTicks(scale.domain(), m);
  };

  scale.tickFormat = function(m) {
    return d3_scale_linearTickFormat(scale.domain(), m);
  };

  scale.nice = function() {
    return scale.domain(d3_scale_nice(scale.domain(), d3_scale_linearNice));
  };

  scale.exponent = function(x) {
    if (!arguments.length) return exponent;
    var domain = scale.domain();
    powp = d3_scale_powPow(exponent = x);
    powb = d3_scale_powPow(1 / exponent);
    return scale.domain(domain);
  };

  scale.copy = function() {
    return d3_scale_pow(linear.copy(), exponent);
  };

  return d3_scale_linearRebind(scale, linear);
};

function d3_scale_powPow(e) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
  };
}
d3.scale.sqrt = function() {
  return d3.scale.pow().exponent(.5);
};
d3.scale.ordinal = function() {
  return d3_scale_ordinal([], {t: "range", x: []});
};

function d3_scale_ordinal(domain, ranger) {
  var index,
      range,
      rangeBand;

  function scale(x) {
    return range[((index[x] || (index[x] = domain.push(x))) - 1) % range.length];
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = [];
    index = {};
    var i = -1, n = x.length, xi;
    while (++i < n) if (!index[xi = x[i]]) index[xi] = domain.push(xi);
    return scale[ranger.t](ranger.x, ranger.p);
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    rangeBand = 0;
    ranger = {t: "range", x: x};
    return scale;
  };

  scale.rangePoints = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = (stop - start) / (domain.length - 1 + padding);
    range = domain.length < 2 ? [(start + stop) / 2] : d3.range(start + step * padding / 2, stop + step / 2, step);
    rangeBand = 0;
    ranger = {t: "rangePoints", x: x, p: padding};
    return scale;
  };

  scale.rangeBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = (stop - start) / (domain.length + padding);
    range = d3.range(start + step * padding, stop, step);
    rangeBand = step * (1 - padding);
    ranger = {t: "rangeBands", x: x, p: padding};
    return scale;
  };

  scale.rangeRoundBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = Math.floor((stop - start) / (domain.length + padding)),
        err = stop - start - (domain.length - padding) * step;
    range = d3.range(start + Math.round(err / 2), stop, step);
    rangeBand = Math.round(step * (1 - padding));
    ranger = {t: "rangeRoundBands", x: x, p: padding};
    return scale;
  };

  scale.rangeBand = function() {
    return rangeBand;
  };

  scale.copy = function() {
    return d3_scale_ordinal(domain, ranger);
  };

  return scale.domain(domain);
};
/*
 * This product includes color specifications and designs developed by Cynthia
 * Brewer (http://colorbrewer.org/). See lib/colorbrewer for more information.
 */

d3.scale.category10 = function() {
  return d3.scale.ordinal().range(d3_category10);
};

d3.scale.category20 = function() {
  return d3.scale.ordinal().range(d3_category20);
};

d3.scale.category20b = function() {
  return d3.scale.ordinal().range(d3_category20b);
};

d3.scale.category20c = function() {
  return d3.scale.ordinal().range(d3_category20c);
};

var d3_category10 = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

var d3_category20 = [
  "#1f77b4", "#aec7e8",
  "#ff7f0e", "#ffbb78",
  "#2ca02c", "#98df8a",
  "#d62728", "#ff9896",
  "#9467bd", "#c5b0d5",
  "#8c564b", "#c49c94",
  "#e377c2", "#f7b6d2",
  "#7f7f7f", "#c7c7c7",
  "#bcbd22", "#dbdb8d",
  "#17becf", "#9edae5"
];

var d3_category20b = [
  "#393b79", "#5254a3", "#6b6ecf", "#9c9ede",
  "#637939", "#8ca252", "#b5cf6b", "#cedb9c",
  "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94",
  "#843c39", "#ad494a", "#d6616b", "#e7969c",
  "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
];

var d3_category20c = [
  "#3182bd", "#6baed6", "#9ecae1", "#c6dbef",
  "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2",
  "#31a354", "#74c476", "#a1d99b", "#c7e9c0",
  "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb",
  "#636363", "#969696", "#bdbdbd", "#d9d9d9"
];
d3.scale.quantile = function() {
  return d3_scale_quantile([], []);
};

function d3_scale_quantile(domain, range) {
  var thresholds;

  function rescale() {
    var k = 0,
        n = domain.length,
        q = range.length;
    thresholds = [];
    while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
    return scale;
  }

  function scale(x) {
    if (isNaN(x = +x)) return NaN;
    return range[d3.bisect(thresholds, x)];
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.filter(function(d) { return !isNaN(d); }).sort(d3.ascending);
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.quantiles = function() {
    return thresholds;
  };

  scale.copy = function() {
    return d3_scale_quantile(domain, range); // copy on write!
  };

  return rescale();
};
d3.scale.quantize = function() {
  return d3_scale_quantize(0, 1, [0, 1]);
};

function d3_scale_quantize(x0, x1, range) {
  var kx, i;

  function scale(x) {
    return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
  }

  function rescale() {
    kx = range.length / (x1 - x0);
    i = range.length - 1;
    return scale;
  }

  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = +x[0];
    x1 = +x[x.length - 1];
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.copy = function() {
    return d3_scale_quantize(x0, x1, range); // copy on write
  };

  return rescale();
};
d3.svg = {};
d3.svg.arc = function() {
  var innerRadius = d3_svg_arcInnerRadius,
      outerRadius = d3_svg_arcOuterRadius,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  function arc() {
    var r0 = innerRadius.apply(this, arguments),
        r1 = outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset,
        a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset,
        da = (a1 < a0 && (da = a0, a0 = a1, a1 = da), a1 - a0),
        df = da < Math.PI ? "0" : "1",
        c0 = Math.cos(a0),
        s0 = Math.sin(a0),
        c1 = Math.cos(a1),
        s1 = Math.sin(a1);
    return da >= d3_svg_arcMax
      ? (r0
      ? "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "M0," + r0
      + "A" + r0 + "," + r0 + " 0 1,0 0," + (-r0)
      + "A" + r0 + "," + r0 + " 0 1,0 0," + r0
      + "Z"
      : "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "Z")
      : (r0
      ? "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L" + r0 * c1 + "," + r0 * s1
      + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0
      + "Z"
      : "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L0,0"
      + "Z");
  }

  arc.innerRadius = function(v) {
    if (!arguments.length) return innerRadius;
    innerRadius = d3.functor(v);
    return arc;
  };

  arc.outerRadius = function(v) {
    if (!arguments.length) return outerRadius;
    outerRadius = d3.functor(v);
    return arc;
  };

  arc.startAngle = function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3.functor(v);
    return arc;
  };

  arc.endAngle = function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3.functor(v);
    return arc;
  };

  arc.centroid = function() {
    var r = (innerRadius.apply(this, arguments)
        + outerRadius.apply(this, arguments)) / 2,
        a = (startAngle.apply(this, arguments)
        + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  return arc;
};

var d3_svg_arcOffset = -Math.PI / 2,
    d3_svg_arcMax = 2 * Math.PI - 1e-6;

function d3_svg_arcInnerRadius(d) {
  return d.innerRadius;
}

function d3_svg_arcOuterRadius(d) {
  return d.outerRadius;
}

function d3_svg_arcStartAngle(d) {
  return d.startAngle;
}

function d3_svg_arcEndAngle(d) {
  return d.endAngle;
}
function d3_svg_line(projection) {
  var x = d3_svg_lineX,
      y = d3_svg_lineY,
      interpolate = "linear",
      interpolator = d3_svg_lineInterpolators[interpolate],
      tension = .7;

  function line(d) {
    return d.length < 1 ? null : "M" + interpolator(projection(d3_svg_linePoints(this, d, x, y)), tension);
  }

  line.x = function(v) {
    if (!arguments.length) return x;
    x = v;
    return line;
  };

  line.y = function(v) {
    if (!arguments.length) return y;
    y = v;
    return line;
  };

  line.interpolate = function(v) {
    if (!arguments.length) return interpolate;
    interpolator = d3_svg_lineInterpolators[interpolate = v];
    return line;
  };

  line.tension = function(v) {
    if (!arguments.length) return tension;
    tension = v;
    return line;
  };

  return line;
}

d3.svg.line = function() {
  return d3_svg_line(Object);
};

// Converts the specified array of data into an array of points
// (x-y tuples), by evaluating the specified `x` and `y` functions on each
// data point. The `this` context of the evaluated functions is the specified
// "self" object; each function is passed the current datum and index.
function d3_svg_linePoints(self, d, x, y) {
  var points = [],
      i = -1,
      n = d.length,
      fx = typeof x === "function",
      fy = typeof y === "function",
      value;
  if (fx && fy) {
    while (++i < n) points.push([
      x.call(self, value = d[i], i),
      y.call(self, value, i)
    ]);
  } else if (fx) {
    while (++i < n) points.push([x.call(self, d[i], i), y]);
  } else if (fy) {
    while (++i < n) points.push([x, y.call(self, d[i], i)]);
  } else {
    while (++i < n) points.push([x, y]);
  }
  return points;
}

// The default `x` property, which references d[0].
function d3_svg_lineX(d) {
  return d[0];
}

// The default `y` property, which references d[1].
function d3_svg_lineY(d) {
  return d[1];
}

// The various interpolators supported by the `line` class.
var d3_svg_lineInterpolators = {
  "linear": d3_svg_lineLinear,
  "step-before": d3_svg_lineStepBefore,
  "step-after": d3_svg_lineStepAfter,
  "basis": d3_svg_lineBasis,
  "basis-open": d3_svg_lineBasisOpen,
  "basis-closed": d3_svg_lineBasisClosed,
  "bundle": d3_svg_lineBundle,
  "cardinal": d3_svg_lineCardinal,
  "cardinal-open": d3_svg_lineCardinalOpen,
  "cardinal-closed": d3_svg_lineCardinalClosed,
  "monotone": d3_svg_lineMonotone
};

// Linear interpolation; generates "L" commands.
function d3_svg_lineLinear(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("L", (p = points[i])[0], ",", p[1]);
  return path.join("");
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStepBefore(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
  return path.join("");
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStepAfter(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
  return path.join("");
}

// Open cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinalOpen(points, tension) {
  return points.length < 4
      ? d3_svg_lineLinear(points)
      : points[1] + d3_svg_lineHermite(points.slice(1, points.length - 1),
        d3_svg_lineCardinalTangents(points, tension));
}

// Closed cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinalClosed(points, tension) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite((points.push(points[0]), points),
        d3_svg_lineCardinalTangents([points[points.length - 2]]
        .concat(points, [points[1]]), tension));
}

// Cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinal(points, tension, closed) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite(points,
        d3_svg_lineCardinalTangents(points, tension));
}

// Hermite spline construction; generates "C" commands.
function d3_svg_lineHermite(points, tangents) {
  if (tangents.length < 1
      || (points.length != tangents.length
      && points.length != tangents.length + 2)) {
    return d3_svg_lineLinear(points);
  }

  var quad = points.length != tangents.length,
      path = "",
      p0 = points[0],
      p = points[1],
      t0 = tangents[0],
      t = t0,
      pi = 1;

  if (quad) {
    path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3)
        + "," + p[0] + "," + p[1];
    p0 = points[1];
    pi = 2;
  }

  if (tangents.length > 1) {
    t = tangents[1];
    p = points[pi];
    pi++;
    path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1])
        + "," + (p[0] - t[0]) + "," + (p[1] - t[1])
        + "," + p[0] + "," + p[1];
    for (var i = 2; i < tangents.length; i++, pi++) {
      p = points[pi];
      t = tangents[i];
      path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1])
          + "," + p[0] + "," + p[1];
    }
  }

  if (quad) {
    var lp = points[pi];
    path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3)
        + "," + lp[0] + "," + lp[1];
  }

  return path;
}

// Generates tangents for a cardinal spline.
function d3_svg_lineCardinalTangents(points, tension) {
  var tangents = [],
      a = (1 - tension) / 2,
      p0,
      p1 = points[0],
      p2 = points[1],
      i = 1,
      n = points.length;
  while (++i < n) {
    p0 = p1;
    p1 = p2;
    p2 = points[i];
    tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
  }
  return tangents;
}

// B-spline interpolation; generates "C" commands.
function d3_svg_lineBasis(points) {
  if (points.length < 3) return d3_svg_lineLinear(points);
  var i = 1,
      n = points.length,
      pi = points[0],
      x0 = pi[0],
      y0 = pi[1],
      px = [x0, x0, x0, (pi = points[1])[0]],
      py = [y0, y0, y0, pi[1]],
      path = [x0, ",", y0];
  d3_svg_lineBasisBezier(path, px, py);
  while (++i < n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  i = -1;
  while (++i < 2) {
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

// Open B-spline interpolation; generates "C" commands.
function d3_svg_lineBasisOpen(points) {
  if (points.length < 4) return d3_svg_lineLinear(points);
  var path = [],
      i = -1,
      n = points.length,
      pi,
      px = [0],
      py = [0];
  while (++i < 3) {
    pi = points[i];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px)
    + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
  --i; while (++i < n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

// Closed B-spline interpolation; generates "C" commands.
function d3_svg_lineBasisClosed(points) {
  var path,
      i = -1,
      n = points.length,
      m = n + 4,
      pi,
      px = [],
      py = [];
  while (++i < 4) {
    pi = points[i % n];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path = [
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",",
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)
  ];
  --i; while (++i < m) {
    pi = points[i % n];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

function d3_svg_lineBundle(points, tension) {
  var n = points.length - 1,
      x0 = points[0][0],
      y0 = points[0][1],
      dx = points[n][0] - x0,
      dy = points[n][1] - y0,
      i = -1,
      p,
      t;
  while (++i <= n) {
    p = points[i];
    t = i / n;
    p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
    p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
  }
  return d3_svg_lineBasis(points);
}

// Returns the dot product of the given four-element vectors.
function d3_svg_lineDot4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

// Matrix to transform basis (b-spline) control points to bezier
// control points. Derived from FvD 11.2.8.
var d3_svg_lineBasisBezier1 = [0, 2/3, 1/3, 0],
    d3_svg_lineBasisBezier2 = [0, 1/3, 2/3, 0],
    d3_svg_lineBasisBezier3 = [0, 1/6, 2/3, 1/6];

// Pushes a "C" Bézier curve onto the specified path array, given the
// two specified four-element arrays which define the control points.
function d3_svg_lineBasisBezier(path, x, y) {
  path.push(
      "C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
}

// Computes the slope from points p0 to p1.
function d3_svg_lineSlope(p0, p1) {
  return (p1[1] - p0[1]) / (p1[0] - p0[0]);
}

// Compute three-point differences for the given points.
// http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Finite_difference
function d3_svg_lineFiniteDifferences(points) {
  var i = 0,
      j = points.length - 1,
      m = [],
      p0 = points[0],
      p1 = points[1],
      d = m[0] = d3_svg_lineSlope(p0, p1);
  while (++i < j) {
    m[i] = d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]));
  }
  m[i] = d;
  return m;
}

// Interpolates the given points using Fritsch-Carlson Monotone cubic Hermite
// interpolation. Returns an array of tangent vectors. For details, see
// http://en.wikipedia.org/wiki/Monotone_cubic_interpolation
function d3_svg_lineMonotoneTangents(points) {
  var tangents = [],
      d,
      a,
      b,
      s,
      m = d3_svg_lineFiniteDifferences(points),
      i = -1,
      j = points.length - 1;

  // The first two steps are done by computing finite-differences:
  // 1. Compute the slopes of the secant lines between successive points.
  // 2. Initialize the tangents at every point as the average of the secants.

  // Then, for each segment…
  while (++i < j) {
    d = d3_svg_lineSlope(points[i], points[i + 1]);

    // 3. If two successive yk = y{k + 1} are equal (i.e., d is zero), then set
    // mk = m{k + 1} = 0 as the spline connecting these points must be flat to
    // preserve monotonicity. Ignore step 4 and 5 for those k.

    if (Math.abs(d) < 1e-6) {
      m[i] = m[i + 1] = 0;
    } else {
      // 4. Let ak = mk / dk and bk = m{k + 1} / dk.
      a = m[i] / d;
      b = m[i + 1] / d;

      // 5. Prevent overshoot and ensure monotonicity by restricting the
      // magnitude of vector <ak, bk> to a circle of radius 3.
      s = a * a + b * b;
      if (s > 9) {
        s = d * 3 / Math.sqrt(s);
        m[i] = s * a;
        m[i + 1] = s * b;
      }
    }
  }

  // Compute the normalized tangent vector from the slopes. Note that if x is
  // not monotonic, it's possible that the slope will be infinite, so we protect
  // against NaN by setting the coordinate to zero.
  i = -1; while (++i <= j) {
    s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0])
      / (6 * (1 + m[i] * m[i]));
    tangents.push([s || 0, m[i] * s || 0]);
  }

  return tangents;
}

function d3_svg_lineMonotone(points) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] +
        d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
}
d3.svg.line.radial = function() {
  var line = d3_svg_line(d3_svg_lineRadial);
  line.radius = line.x, delete line.x;
  line.angle = line.y, delete line.y;
  return line;
};

function d3_svg_lineRadial(points) {
  var point,
      i = -1,
      n = points.length,
      r,
      a;
  while (++i < n) {
    point = points[i];
    r = point[0];
    a = point[1] + d3_svg_arcOffset;
    point[0] = r * Math.cos(a);
    point[1] = r * Math.sin(a);
  }
  return points;
}
function d3_svg_area(projection) {
  var x0 = d3_svg_lineX,
      x1 = d3_svg_lineX,
      y0 = 0,
      y1 = d3_svg_lineY,
      interpolate,
      i0,
      i1,
      tension = .7;

  function area(d) {
    if (d.length < 1) return null;
    var points0 = d3_svg_linePoints(this, d, x0, y0),
        points1 = d3_svg_linePoints(this, d, x0 === x1 ? d3_svg_areaX(points0) : x1, y0 === y1 ? d3_svg_areaY(points0) : y1);
    return "M" + i0(projection(points1), tension)
         + "L" + i1(projection(points0.reverse()), tension)
         + "Z";
  }

  area.x = function(x) {
    if (!arguments.length) return x1;
    x0 = x1 = x;
    return area;
  };

  area.x0 = function(x) {
    if (!arguments.length) return x0;
    x0 = x;
    return area;
  };

  area.x1 = function(x) {
    if (!arguments.length) return x1;
    x1 = x;
    return area;
  };

  area.y = function(y) {
    if (!arguments.length) return y1;
    y0 = y1 = y;
    return area;
  };

  area.y0 = function(y) {
    if (!arguments.length) return y0;
    y0 = y;
    return area;
  };

  area.y1 = function(y) {
    if (!arguments.length) return y1;
    y1 = y;
    return area;
  };

  area.interpolate = function(x) {
    if (!arguments.length) return interpolate;
    i0 = d3_svg_lineInterpolators[interpolate = x];
    i1 = i0.reverse || i0;
    return area;
  };

  area.tension = function(x) {
    if (!arguments.length) return tension;
    tension = x;
    return area;
  };

  return area.interpolate("linear");
}

d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;

d3.svg.area = function() {
  return d3_svg_area(Object);
};

function d3_svg_areaX(points) {
  return function(d, i) {
    return points[i][0];
  };
}

function d3_svg_areaY(points) {
  return function(d, i) {
    return points[i][1];
  };
}
d3.svg.area.radial = function() {
  var area = d3_svg_area(d3_svg_lineRadial);
  area.radius = area.x, delete area.x;
  area.innerRadius = area.x0, delete area.x0;
  area.outerRadius = area.x1, delete area.x1;
  area.angle = area.y, delete area.y;
  area.startAngle = area.y0, delete area.y0;
  area.endAngle = area.y1, delete area.y1;
  return area;
};
d3.svg.chord = function() {
  var source = d3_svg_chordSource,
      target = d3_svg_chordTarget,
      radius = d3_svg_chordRadius,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  // TODO Allow control point to be customized.

  function chord(d, i) {
    var s = subgroup(this, source, d, i),
        t = subgroup(this, target, d, i);
    return "M" + s.p0
      + arc(s.r, s.p1) + (equals(s, t)
      ? curve(s.r, s.p1, s.r, s.p0)
      : curve(s.r, s.p1, t.r, t.p0)
      + arc(t.r, t.p1)
      + curve(t.r, t.p1, s.r, s.p0))
      + "Z";
  }

  function subgroup(self, f, d, i) {
    var subgroup = f.call(self, d, i),
        r = radius.call(self, subgroup, i),
        a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset,
        a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
    return {
      r: r,
      a0: a0,
      a1: a1,
      p0: [r * Math.cos(a0), r * Math.sin(a0)],
      p1: [r * Math.cos(a1), r * Math.sin(a1)]
    };
  }

  function equals(a, b) {
    return a.a0 == b.a0 && a.a1 == b.a1;
  }

  function arc(r, p) {
    return "A" + r + "," + r + " 0 0,1 " + p;
  }

  function curve(r0, p0, r1, p1) {
    return "Q 0,0 " + p1;
  }

  chord.radius = function(v) {
    if (!arguments.length) return radius;
    radius = d3.functor(v);
    return chord;
  };

  chord.source = function(v) {
    if (!arguments.length) return source;
    source = d3.functor(v);
    return chord;
  };

  chord.target = function(v) {
    if (!arguments.length) return target;
    target = d3.functor(v);
    return chord;
  };

  chord.startAngle = function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3.functor(v);
    return chord;
  };

  chord.endAngle = function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3.functor(v);
    return chord;
  };

  return chord;
};

function d3_svg_chordSource(d) {
  return d.source;
}

function d3_svg_chordTarget(d) {
  return d.target;
}

function d3_svg_chordRadius(d) {
  return d.radius;
}

function d3_svg_chordStartAngle(d) {
  return d.startAngle;
}

function d3_svg_chordEndAngle(d) {
  return d.endAngle;
}
d3.svg.diagonal = function() {
  var source = d3_svg_chordSource,
      target = d3_svg_chordTarget,
      projection = d3_svg_diagonalProjection;

  function diagonal(d, i) {
    var p0 = source.call(this, d, i),
        p3 = target.call(this, d, i),
        m = (p0.y + p3.y) / 2,
        p = [p0, {x: p0.x, y: m}, {x: p3.x, y: m}, p3];
    p = p.map(projection);
    return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
  }

  diagonal.source = function(x) {
    if (!arguments.length) return source;
    source = d3.functor(x);
    return diagonal;
  };

  diagonal.target = function(x) {
    if (!arguments.length) return target;
    target = d3.functor(x);
    return diagonal;
  };

  diagonal.projection = function(x) {
    if (!arguments.length) return projection;
    projection = x;
    return diagonal;
  };

  return diagonal;
};

function d3_svg_diagonalProjection(d) {
  return [d.x, d.y];
}
d3.svg.diagonal.radial = function() {
  var diagonal = d3.svg.diagonal(),
      projection = d3_svg_diagonalProjection,
      projection_ = diagonal.projection;

  diagonal.projection = function(x) {
    return arguments.length
        ? projection_(d3_svg_diagonalRadialProjection(projection = x))
        : projection;
  };

  return diagonal;
};

function d3_svg_diagonalRadialProjection(projection) {
  return function() {
    var d = projection.apply(this, arguments),
        r = d[0],
        a = d[1] + d3_svg_arcOffset;
    return [r * Math.cos(a), r * Math.sin(a)];
  };
}
d3.svg.mouse = function(container) {
  return d3_svg_mousePoint(container, d3.event);
};

// https://bugs.webkit.org/show_bug.cgi?id=44083
var d3_mouse_bug44083 = /WebKit/.test(navigator.userAgent) ? -1 : 0;

function d3_svg_mousePoint(container, e) {
  var point = (container.ownerSVGElement || container).createSVGPoint();
  if ((d3_mouse_bug44083 < 0) && (window.scrollX || window.scrollY)) {
    var svg = d3.select(document.body)
      .append("svg:svg")
        .style("position", "absolute")
        .style("top", 0)
        .style("left", 0);
    var ctm = svg[0][0].getScreenCTM();
    d3_mouse_bug44083 = !(ctm.f || ctm.e);
    svg.remove();
  }
  if (d3_mouse_bug44083) {
    point.x = e.pageX;
    point.y = e.pageY;
  } else {
    point.x = e.clientX;
    point.y = e.clientY;
  }
  point = point.matrixTransform(container.getScreenCTM().inverse());
  return [point.x, point.y];
};
d3.svg.touches = function(container) {
  var touches = d3.event.touches;
  return touches ? d3_array(touches).map(function(touch) {
    var point = d3_svg_mousePoint(container, touch);
    point.identifier = touch.identifier;
    return point;
  }) : [];
};
d3.svg.symbol = function() {
  var type = d3_svg_symbolType,
      size = d3_svg_symbolSize;

  function symbol(d, i) {
    return (d3_svg_symbols[type.call(this, d, i)]
        || d3_svg_symbols.circle)
        (size.call(this, d, i));
  }

  symbol.type = function(x) {
    if (!arguments.length) return type;
    type = d3.functor(x);
    return symbol;
  };

  // size of symbol in square pixels
  symbol.size = function(x) {
    if (!arguments.length) return size;
    size = d3.functor(x);
    return symbol;
  };

  return symbol;
};

function d3_svg_symbolSize() {
  return 64;
}

function d3_svg_symbolType() {
  return "circle";
}

// TODO cross-diagonal?
var d3_svg_symbols = {
  "circle": function(size) {
    var r = Math.sqrt(size / Math.PI);
    return "M0," + r
        + "A" + r + "," + r + " 0 1,1 0," + (-r)
        + "A" + r + "," + r + " 0 1,1 0," + r
        + "Z";
  },
  "cross": function(size) {
    var r = Math.sqrt(size / 5) / 2;
    return "M" + -3 * r + "," + -r
        + "H" + -r
        + "V" + -3 * r
        + "H" + r
        + "V" + -r
        + "H" + 3 * r
        + "V" + r
        + "H" + r
        + "V" + 3 * r
        + "H" + -r
        + "V" + r
        + "H" + -3 * r
        + "Z";
  },
  "diamond": function(size) {
    var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)),
        rx = ry * d3_svg_symbolTan30;
    return "M0," + -ry
        + "L" + rx + ",0"
        + " 0," + ry
        + " " + -rx + ",0"
        + "Z";
  },
  "square": function(size) {
    var r = Math.sqrt(size) / 2;
    return "M" + -r + "," + -r
        + "L" + r + "," + -r
        + " " + r + "," + r
        + " " + -r + "," + r
        + "Z";
  },
  "triangle-down": function(size) {
    var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
        ry = rx * d3_svg_symbolSqrt3 / 2;
    return "M0," + ry
        + "L" + rx +"," + -ry
        + " " + -rx + "," + -ry
        + "Z";
  },
  "triangle-up": function(size) {
    var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
        ry = rx * d3_svg_symbolSqrt3 / 2;
    return "M0," + -ry
        + "L" + rx +"," + ry
        + " " + -rx + "," + ry
        + "Z";
  }
};

d3.svg.symbolTypes = d3.keys(d3_svg_symbols);

var d3_svg_symbolSqrt3 = Math.sqrt(3),
    d3_svg_symbolTan30 = Math.tan(30 * Math.PI / 180);
d3.svg.axis = function() {
  var scale = d3.scale.linear(),
      orient = "bottom",
      tickMajorSize = 6,
      tickMinorSize = 6,
      tickEndSize = 6,
      tickPadding = 3,
      tickArguments_ = [10],
      tickFormat_,
      tickSubdivide = 0;

  function axis(selection) {
    selection.each(function(d, i, j) {
      var g = d3.select(this);

      // If selection is a transition, create subtransitions.
      var transition = selection.delay ? function(o) {
        var id = d3_transitionInheritId;
        try {
          d3_transitionInheritId = selection.id;
          return o.transition()
              .delay(selection[j][i].delay)
              .duration(selection[j][i].duration)
              .ease(selection.ease());
        } finally {
          d3_transitionInheritId = id;
        }
      } : Object;

      // Ticks.
      var ticks = scale.ticks.apply(scale, tickArguments_),
          tickFormat = tickFormat_ == null ? scale.tickFormat.apply(scale, tickArguments_) : tickFormat_;

      // Minor ticks.
      var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide),
          subtick = g.selectAll(".minor").data(subticks, String),
          subtickEnter = subtick.enter().insert("svg:line", "g").attr("class", "tick minor").style("opacity", 1e-6),
          subtickExit = transition(subtick.exit()).style("opacity", 1e-6).remove(),
          subtickUpdate = transition(subtick).style("opacity", 1);

      // Major ticks.
      var tick = g.selectAll("g").data(ticks, String),
          tickEnter = tick.enter().insert("svg:g", "path").style("opacity", 1e-6),
          tickExit = transition(tick.exit()).style("opacity", 1e-6).remove(),
          tickUpdate = transition(tick).style("opacity", 1),
          tickTransform;

      // Domain.
      var range = d3_scaleExtent(scale.range()),
          path = g.selectAll(".domain").data([0]),
          pathEnter = path.enter().append("svg:path").attr("class", "domain"),
          pathUpdate = transition(path);

      // Stash the new scale and grab the old scale.
      var scale0 = this.__chart__ || scale;
      this.__chart__ = scale.copy();

      tickEnter.append("svg:line").attr("class", "tick");
      tickEnter.append("svg:text");
      tickUpdate.select("text").text(tickFormat);

      switch (orient) {
        case "bottom": {
          tickTransform = d3_svg_axisX;
          subtickUpdate.attr("x2", 0).attr("y2", tickMinorSize);
          tickUpdate.select("line").attr("x2", 0).attr("y2", tickMajorSize);
          tickUpdate.select("text").attr("x", 0).attr("y", Math.max(tickMajorSize, 0) + tickPadding).attr("dy", ".71em").attr("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
          break;
        }
        case "top": {
          tickTransform = d3_svg_axisX;
          subtickUpdate.attr("x2", 0).attr("y2", -tickMinorSize);
          tickUpdate.select("line").attr("x2", 0).attr("y2", -tickMajorSize);
          tickUpdate.select("text").attr("x", 0).attr("y", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("dy", "0em").attr("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize);
          break;
        }
        case "left": {
          tickTransform = d3_svg_axisY;
          subtickUpdate.attr("x2", -tickMinorSize).attr("y2", 0);
          tickUpdate.select("line").attr("x2", -tickMajorSize).attr("y2", 0);
          tickUpdate.select("text").attr("x", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("y", 0).attr("dy", ".32em").attr("text-anchor", "end");
          pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
          break;
        }
        case "right": {
          tickTransform = d3_svg_axisY;
          subtickUpdate.attr("x2", tickMinorSize).attr("y2", 0);
          tickUpdate.select("line").attr("x2", tickMajorSize).attr("y2", 0);
          tickUpdate.select("text").attr("x", Math.max(tickMajorSize, 0) + tickPadding).attr("y", 0).attr("dy", ".32em").attr("text-anchor", "start");
          pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize);
          break;
        }
      }

      tickEnter.call(tickTransform, scale0);
      tickUpdate.call(tickTransform, scale);
      tickExit.call(tickTransform, scale);

      subtickEnter.call(tickTransform, scale0);
      subtickUpdate.call(tickTransform, scale);
      subtickExit.call(tickTransform, scale);
    });
  }

  axis.scale = function(x) {
    if (!arguments.length) return scale;
    scale = x;
    return axis;
  };

  axis.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    return axis;
  };

  axis.ticks = function() {
    if (!arguments.length) return tickArguments_;
    tickArguments_ = arguments;
    return axis;
  };

  axis.tickFormat = function(x) {
    if (!arguments.length) return tickFormat_;
    tickFormat_ = x;
    return axis;
  };

  axis.tickSize = function(x, y, z) {
    if (!arguments.length) return tickMajorSize;
    var n = arguments.length - 1;
    tickMajorSize = +x;
    tickMinorSize = n > 1 ? +y : tickMajorSize;
    tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
    return axis;
  };

  axis.tickPadding = function(x) {
    if (!arguments.length) return tickPadding;
    tickPadding = +x;
    return axis;
  };

  axis.tickSubdivide = function(x) {
    if (!arguments.length) return tickSubdivide;
    tickSubdivide = +x;
    return axis;
  };

  return axis;
};

function d3_svg_axisX(selection, x) {
  selection.attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
}

function d3_svg_axisY(selection, y) {
  selection.attr("transform", function(d) { return "translate(0," + y(d) + ")"; });
}

function d3_svg_axisSubdivide(scale, ticks, m) {
  subticks = [];
  if (m && ticks.length > 1) {
    var extent = d3_scaleExtent(scale.domain()),
        subticks,
        i = -1,
        n = ticks.length,
        d = (ticks[1] - ticks[0]) / ++m,
        j,
        v;
    while (++i < n) {
      for (j = m; --j > 0;) {
        if ((v = +ticks[i] - j * d) >= extent[0]) {
          subticks.push(v);
        }
      }
    }
    for (--i, j = 0; ++j < m && (v = +ticks[i] + j * d) < extent[1];) {
      subticks.push(v);
    }
  }
  return subticks;
}
d3.behavior = {};
d3.behavior.drag = function() {
  var event = d3.dispatch("drag", "dragstart", "dragend");

  function drag() {
    this
        .on("mousedown.drag", mousedown)
        .on("touchstart.drag", mousedown);

    d3.select(window)
        .on("mousemove.drag", d3_behavior_dragMove)
        .on("touchmove.drag", d3_behavior_dragMove)
        .on("mouseup.drag", d3_behavior_dragUp, true)
        .on("touchend.drag", d3_behavior_dragUp, true)
        .on("click.drag", d3_behavior_dragClick, true);
  }

  // snapshot the local context for subsequent dispatch
  function start() {
    d3_behavior_dragEvent = event;
    d3_behavior_dragEventTarget = d3.event.target;
    d3_behavior_dragOffset = d3_behavior_dragPoint((d3_behavior_dragTarget = this).parentNode);
    d3_behavior_dragMoved = 0;
    d3_behavior_dragArguments = arguments;
  }

  function mousedown() {
    start.apply(this, arguments);
    d3_behavior_dragDispatch("dragstart");
  }

  drag.on = function(type, listener) {
    event[type].add(listener);
    return drag;
  };

  return drag;
};

var d3_behavior_dragEvent,
    d3_behavior_dragEventTarget,
    d3_behavior_dragTarget,
    d3_behavior_dragArguments,
    d3_behavior_dragOffset,
    d3_behavior_dragMoved,
    d3_behavior_dragStopClick;

function d3_behavior_dragDispatch(type) {
  var o = d3.event, p = d3_behavior_dragTarget.parentNode, dx = 0, dy = 0;

  if (p) {
    p = d3_behavior_dragPoint(p);
    dx = p[0] - d3_behavior_dragOffset[0];
    dy = p[1] - d3_behavior_dragOffset[1];
    d3_behavior_dragOffset = p;
    d3_behavior_dragMoved |= dx | dy;
  }

  try {
    d3.event = {dx: dx, dy: dy};
    d3_behavior_dragEvent[type].dispatch.apply(d3_behavior_dragTarget, d3_behavior_dragArguments);
  } finally {
    d3.event = o;
  }

  o.preventDefault();
}

function d3_behavior_dragPoint(container) {
  return d3.event.touches
      ? d3.svg.touches(container)[0]
      : d3.svg.mouse(container);
}

function d3_behavior_dragMove() {
  if (!d3_behavior_dragTarget) return;
  var parent = d3_behavior_dragTarget.parentNode;

  // O NOES! The drag element was removed from the DOM.
  if (!parent) return d3_behavior_dragUp();

  d3_behavior_dragDispatch("drag");
  d3_behavior_dragCancel();
}

function d3_behavior_dragUp() {
  if (!d3_behavior_dragTarget) return;
  d3_behavior_dragDispatch("dragend");
  d3_behavior_dragTarget = null;

  // If the node was moved, prevent the mouseup from propagating.
  // Also prevent the subsequent click from propagating (e.g., for anchors).
  if (d3_behavior_dragMoved && d3_behavior_dragEventTarget === d3.event.target) {
    d3_behavior_dragStopClick = true;
    d3_behavior_dragCancel();
  }
}

function d3_behavior_dragClick() {
  if (d3_behavior_dragStopClick && d3_behavior_dragEventTarget === d3.event.target) {
    d3_behavior_dragCancel();
    d3_behavior_dragStopClick = false;
    d3_behavior_dragEventTarget = null;
  }
}

function d3_behavior_dragCancel() {
  d3.event.stopPropagation();
  d3.event.preventDefault();
}
// TODO unbind zoom behavior?
// TODO unbind listener?
d3.behavior.zoom = function() {
  var xyz = [0, 0, 0],
      event = d3.dispatch("zoom");

  function zoom() {
    this
        .on("mousedown.zoom", mousedown)
        .on("mousewheel.zoom", mousewheel)
        .on("DOMMouseScroll.zoom", mousewheel)
        .on("dblclick.zoom", dblclick)
        .on("touchstart.zoom", touchstart);

    d3.select(window)
        .on("mousemove.zoom", d3_behavior_zoomMousemove)
        .on("mouseup.zoom", d3_behavior_zoomMouseup)
        .on("touchmove.zoom", d3_behavior_zoomTouchmove)
        .on("touchend.zoom", d3_behavior_zoomTouchup)
        .on("click.zoom", d3_behavior_zoomClick, true);
  }

  // snapshot the local context for subsequent dispatch
  function start() {
    d3_behavior_zoomXyz = xyz;
    d3_behavior_zoomDispatch = event.zoom.dispatch;
    d3_behavior_zoomEventTarget = d3.event.target;
    d3_behavior_zoomTarget = this;
    d3_behavior_zoomArguments = arguments;
  }

  function mousedown() {
    start.apply(this, arguments);
    d3_behavior_zoomPanning = d3_behavior_zoomLocation(d3.svg.mouse(d3_behavior_zoomTarget));
    d3_behavior_zoomMoved = false;
    d3.event.preventDefault();
    window.focus();
  }

  // store starting mouse location
  function mousewheel() {
    start.apply(this, arguments);
    if (!d3_behavior_zoomZooming) d3_behavior_zoomZooming = d3_behavior_zoomLocation(d3.svg.mouse(d3_behavior_zoomTarget));
    d3_behavior_zoomTo(d3_behavior_zoomDelta() + xyz[2], d3.svg.mouse(d3_behavior_zoomTarget), d3_behavior_zoomZooming);
  }

  function dblclick() {
    start.apply(this, arguments);
    var mouse = d3.svg.mouse(d3_behavior_zoomTarget);
    d3_behavior_zoomTo(d3.event.shiftKey ? Math.ceil(xyz[2] - 1) : Math.floor(xyz[2] + 1), mouse, d3_behavior_zoomLocation(mouse));
  }

  // doubletap detection
  function touchstart() {
    start.apply(this, arguments);
    var touches = d3_behavior_zoomTouchup(),
        touch,
        now = Date.now();
    if ((touches.length === 1) && (now - d3_behavior_zoomLast < 300)) {
      d3_behavior_zoomTo(1 + Math.floor(xyz[2]), touch = touches[0], d3_behavior_zoomLocations[touch.identifier]);
    }
    d3_behavior_zoomLast = now;
  }

  zoom.on = function(type, listener) {
    event[type].add(listener);
    return zoom;
  };

  return zoom;
};

var d3_behavior_zoomDiv,
    d3_behavior_zoomPanning,
    d3_behavior_zoomZooming,
    d3_behavior_zoomLocations = {}, // identifier -> location
    d3_behavior_zoomLast = 0,
    d3_behavior_zoomXyz,
    d3_behavior_zoomDispatch,
    d3_behavior_zoomEventTarget,
    d3_behavior_zoomTarget,
    d3_behavior_zoomArguments,
    d3_behavior_zoomMoved,
    d3_behavior_zoomStopClick;

function d3_behavior_zoomLocation(point) {
  return [
    point[0] - d3_behavior_zoomXyz[0],
    point[1] - d3_behavior_zoomXyz[1],
    d3_behavior_zoomXyz[2]
  ];
}

// detect the pixels that would be scrolled by this wheel event
function d3_behavior_zoomDelta() {

  // mousewheel events are totally broken!
  // https://bugs.webkit.org/show_bug.cgi?id=40441
  // not only that, but Chrome and Safari differ in re. to acceleration!
  if (!d3_behavior_zoomDiv) {
    d3_behavior_zoomDiv = d3.select("body").append("div")
        .style("visibility", "hidden")
        .style("top", 0)
        .style("height", 0)
        .style("width", 0)
        .style("overflow-y", "scroll")
      .append("div")
        .style("height", "2000px")
      .node().parentNode;
  }

  var e = d3.event, delta;
  try {
    d3_behavior_zoomDiv.scrollTop = 1000;
    d3_behavior_zoomDiv.dispatchEvent(e);
    delta = 1000 - d3_behavior_zoomDiv.scrollTop;
  } catch (error) {
    delta = e.wheelDelta || (-e.detail * 5);
  }

  return delta * .005;
}

// Note: Since we don't rotate, it's possible for the touches to become
// slightly detached from their original positions. Thus, we recompute the
// touch points on touchend as well as touchstart!
function d3_behavior_zoomTouchup() {
  var touches = d3.svg.touches(d3_behavior_zoomTarget),
      i = -1,
      n = touches.length,
      touch;
  while (++i < n) d3_behavior_zoomLocations[(touch = touches[i]).identifier] = d3_behavior_zoomLocation(touch);
  return touches;
}

function d3_behavior_zoomTouchmove() {
  var touches = d3.svg.touches(d3_behavior_zoomTarget);
  switch (touches.length) {

    // single-touch pan
    case 1: {
      var touch = touches[0];
      d3_behavior_zoomTo(d3_behavior_zoomXyz[2], touch, d3_behavior_zoomLocations[touch.identifier]);
      break;
    }

    // double-touch pan + zoom
    case 2: {
      var p0 = touches[0],
          p1 = touches[1],
          p2 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2],
          l0 = d3_behavior_zoomLocations[p0.identifier],
          l1 = d3_behavior_zoomLocations[p1.identifier],
          l2 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2, l0[2]];
      d3_behavior_zoomTo(Math.log(d3.event.scale) / Math.LN2 + l0[2], p2, l2);
      break;
    }
  }
}

function d3_behavior_zoomMousemove() {
  d3_behavior_zoomZooming = null;
  if (d3_behavior_zoomPanning) {
    d3_behavior_zoomMoved = true;
    d3_behavior_zoomTo(d3_behavior_zoomXyz[2], d3.svg.mouse(d3_behavior_zoomTarget), d3_behavior_zoomPanning);
  }
}

function d3_behavior_zoomMouseup() {
  if (d3_behavior_zoomPanning) {
    if (d3_behavior_zoomMoved && d3_behavior_zoomEventTarget === d3.event.target) {
      d3_behavior_zoomStopClick = true;
    }
    d3_behavior_zoomMousemove();
    d3_behavior_zoomPanning = null;
  }
}

function d3_behavior_zoomClick() {
  if (d3_behavior_zoomStopClick && d3_behavior_zoomEventTarget === d3.event.target) {
    d3.event.stopPropagation();
    d3.event.preventDefault();
    d3_behavior_zoomStopClick = false;
    d3_behavior_zoomEventTarget = null;
  }
}

function d3_behavior_zoomTo(z, x0, x1) {
  var K = Math.pow(2, (d3_behavior_zoomXyz[2] = z) - x1[2]),
      x = d3_behavior_zoomXyz[0] = x0[0] - K * x1[0],
      y = d3_behavior_zoomXyz[1] = x0[1] - K * x1[1],
      o = d3.event, // Events can be reentrant (e.g., focus).
      k = Math.pow(2, z);

  d3.event = {
    scale: k,
    translate: [x, y],
    transform: function(sx, sy) {
      if (sx) transform(sx, x);
      if (sy) transform(sy, y);
    }
  };

  function transform(scale, o) {
    var domain = scale.__domain || (scale.__domain = scale.domain()),
        range = scale.range().map(function(v) { return (v - o) / k; });
    scale.domain(domain).domain(range.map(scale.invert));
  }

  try {
    d3_behavior_zoomDispatch.apply(d3_behavior_zoomTarget, d3_behavior_zoomArguments);
  } finally {
    d3.event = o;
  }

  o.preventDefault();
}
})();


///layout


(function(){d3.layout = {};
// Implements hierarchical edge bundling using Holten's algorithm. For each
// input link, a path is computed that travels through the tree, up the parent
// hierarchy to the least common ancestor, and then back down to the destination
// node. Each path is simply an array of nodes.
d3.layout.bundle = function() {
  return function(links) {
    var paths = [],
        i = -1,
        n = links.length;
    while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
    return paths;
  };
};

function d3_layout_bundlePath(link) {
  var start = link.source,
      end = link.target,
      lca = d3_layout_bundleLeastCommonAncestor(start, end),
      points = [start];
  while (start !== lca) {
    start = start.parent;
    points.push(start);
  }
  var k = points.length;
  while (end !== lca) {
    points.splice(k, 0, end);
    end = end.parent;
  }
  return points;
}

function d3_layout_bundleAncestors(node) {
  var ancestors = [],
      parent = node.parent;
  while (parent != null) {
    ancestors.push(node);
    node = parent;
    parent = parent.parent;
  }
  ancestors.push(node);
  return ancestors;
}

function d3_layout_bundleLeastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = d3_layout_bundleAncestors(a),
      bNodes = d3_layout_bundleAncestors(b),
      aNode = aNodes.pop(),
      bNode = bNodes.pop(),
      sharedNode = null;
  while (aNode === bNode) {
    sharedNode = aNode;
    aNode = aNodes.pop();
    bNode = bNodes.pop();
  }
  return sharedNode;
}
d3.layout.chord = function() {
  var chord = {},
      chords,
      groups,
      matrix,
      n,
      padding = 0,
      sortGroups,
      sortSubgroups,
      sortChords;

  function relayout() {
    var subgroups = {},
        groupSums = [],
        groupIndex = d3.range(n),
        subgroupIndex = [],
        k,
        x,
        x0,
        i,
        j;

    chords = [];
    groups = [];

    // Compute the sum.
    k = 0, i = -1; while (++i < n) {
      x = 0, j = -1; while (++j < n) {
        x += matrix[i][j];
      }
      groupSums.push(x);
      subgroupIndex.push(d3.range(n));
      k += x;
    }

    // Sort groups…
    if (sortGroups) {
      groupIndex.sort(function(a, b) {
        return sortGroups(groupSums[a], groupSums[b]);
      });
    }

    // Sort subgroups…
    if (sortSubgroups) {
      subgroupIndex.forEach(function(d, i) {
        d.sort(function(a, b) {
          return sortSubgroups(matrix[i][a], matrix[i][b]);
        });
      });
    }

    // Convert the sum to scaling factor for [0, 2pi].
    // TODO Allow start and end angle to be specified.
    // TODO Allow padding to be specified as percentage?
    k = (2 * Math.PI - padding * n) / k;

    // Compute the start and end angle for each group and subgroup.
    x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < n) {
        var di = groupIndex[i],
            dj = subgroupIndex[di][j],
            v = matrix[di][dj];
        subgroups[di + "-" + dj] = {
          index: di,
          subindex: dj,
          startAngle: x,
          endAngle: x += v * k,
          value: v
        };
      }
      groups.push({
        index: di,
        startAngle: x0,
        endAngle: x,
        value: (x - x0) / k
      });
      x += padding;
    }

    // Generate chords for each (non-empty) subgroup-subgroup link.
    i = -1; while (++i < n) {
      j = i - 1; while (++j < n) {
        var source = subgroups[i + "-" + j],
            target = subgroups[j + "-" + i];
        if (source.value || target.value) {
          chords.push(source.value < target.value
              ? {source: target, target: source}
              : {source: source, target: target});
        }
      }
    }

    if (sortChords) resort();
  }

  function resort() {
    chords.sort(function(a, b) {
      return sortChords(
          (a.source.value + a.target.value) / 2,
          (b.source.value + b.target.value) / 2);
    });
  }

  chord.matrix = function(x) {
    if (!arguments.length) return matrix;
    n = (matrix = x) && matrix.length;
    chords = groups = null;
    return chord;
  };

  chord.padding = function(x) {
    if (!arguments.length) return padding;
    padding = x;
    chords = groups = null;
    return chord;
  };

  chord.sortGroups = function(x) {
    if (!arguments.length) return sortGroups;
    sortGroups = x;
    chords = groups = null;
    return chord;
  };

  chord.sortSubgroups = function(x) {
    if (!arguments.length) return sortSubgroups;
    sortSubgroups = x;
    chords = null;
    return chord;
  };

  chord.sortChords = function(x) {
    if (!arguments.length) return sortChords;
    sortChords = x;
    if (chords) resort();
    return chord;
  };

  chord.chords = function() {
    if (!chords) relayout();
    return chords;
  };

  chord.groups = function() {
    if (!groups) relayout();
    return groups;
  };

  return chord;
};
// A rudimentary force layout using Gauss-Seidel.
d3.layout.force = function() {
  var force = {},
      event = d3.dispatch("tick"),
      size = [1, 1],
      drag,
      alpha,
      friction = .9,
      linkDistance = d3_layout_forceLinkDistance,
      linkStrength = d3_layout_forceLinkStrength,
      charge = -30,
      gravity = .1,
      theta = .8,
      interval,
      nodes = [],
      links = [],
      distances,
      strengths,
      charges;

  function repulse(node) {
    return function(quad, x1, y1, x2, y2) {
      if (quad.point !== node) {
        var dx = quad.cx - node.x,
            dy = quad.cy - node.y,
            dn = 1 / Math.sqrt(dx * dx + dy * dy);

        /* Barnes-Hut criterion. */
        if ((x2 - x1) * dn < theta) {
          var k = quad.charge * dn * dn;
          node.px -= dx * k;
          node.py -= dy * k;
          return true;
        }

        if (quad.point && isFinite(dn)) {
          var k = quad.pointCharge * dn * dn;
          node.px -= dx * k;
          node.py -= dy * k;
        }
      }
      return !quad.charge;
    };
  }

  function tick() {
    var n = nodes.length,
        m = links.length,
        q,
        i, // current index
        o, // current object
        s, // current source
        t, // current target
        l, // current distance
        k, // current force
        x, // x-distance
        y; // y-distance

    // gauss-seidel relaxation for links
    for (i = 0; i < m; ++i) {
      o = links[i];
      s = o.source;
      t = o.target;
      x = t.x - s.x;
      y = t.y - s.y;
      if (l = (x * x + y * y)) {
        l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
        x *= l;
        y *= l;
        t.x -= x * (k = s.weight / (t.weight + s.weight));
        t.y -= y * k;
        s.x += x * (k = 1 - k);
        s.y += y * k;
      }
    }

    // apply gravity forces
    if (k = alpha * gravity) {
      x = size[0] / 2;
      y = size[1] / 2;
      i = -1; if (k) while (++i < n) {
        o = nodes[i];
        o.x += (x - o.x) * k;
        o.y += (y - o.y) * k;
      }
    }

    // compute quadtree center of mass and apply charge forces
    if (charge) {
      d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
      i = -1; while (++i < n) {
        if (!(o = nodes[i]).fixed) {
          q.visit(repulse(o));
        }
      }
    }

    // position verlet integration
    i = -1; while (++i < n) {
      o = nodes[i];
      if (o.fixed) {
        o.x = o.px;
        o.y = o.py;
      } else {
        o.x -= (o.px - (o.px = o.x)) * friction;
        o.y -= (o.py - (o.py = o.y)) * friction;
      }
    }

    event.tick.dispatch({type: "tick", alpha: alpha});

    // simulated annealing, basically
    return (alpha *= .99) < .005;
  }

  force.on = function(type, listener) {
    event[type].add(listener);
    return force;
  };

  force.nodes = function(x) {
    if (!arguments.length) return nodes;
    nodes = x;
    return force;
  };

  force.links = function(x) {
    if (!arguments.length) return links;
    links = x;
    return force;
  };

  force.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return force;
  };

  force.linkDistance = function(x) {
    if (!arguments.length) return linkDistance;
    linkDistance = d3.functor(x);
    return force;
  };

  // For backwards-compatibility.
  force.distance = force.linkDistance;

  force.linkStrength = function(x) {
    if (!arguments.length) return linkStrength;
    linkStrength = d3.functor(x);
    return force;
  };

  force.friction = function(x) {
    if (!arguments.length) return friction;
    friction = x;
    return force;
  };

  force.charge = function(x) {
    if (!arguments.length) return charge;
    charge = typeof x === "function" ? x : +x;
    return force;
  };

  force.gravity = function(x) {
    if (!arguments.length) return gravity;
    gravity = x;
    return force;
  };

  force.theta = function(x) {
    if (!arguments.length) return theta;
    theta = x;
    return force;
  };

  force.start = function() {
    var i,
        j,
        n = nodes.length,
        m = links.length,
        w = size[0],
        h = size[1],
        neighbors,
        o;

    for (i = 0; i < n; ++i) {
      (o = nodes[i]).index = i;
      o.weight = 0;
    }

    distances = [];
    strengths = [];
    for (i = 0; i < m; ++i) {
      o = links[i];
      if (typeof o.source == "number") o.source = nodes[o.source];
      if (typeof o.target == "number") o.target = nodes[o.target];
      distances[i] = linkDistance.call(this, o, i);
      strengths[i] = linkStrength.call(this, o, i);
      ++o.source.weight;
      ++o.target.weight;
    }

    for (i = 0; i < n; ++i) {
      o = nodes[i];
      if (isNaN(o.x)) o.x = position("x", w);
      if (isNaN(o.y)) o.y = position("y", h);
      if (isNaN(o.px)) o.px = o.x;
      if (isNaN(o.py)) o.py = o.y;
    }

    charges = [];
    if (typeof charge === "function") {
      for (i = 0; i < n; ++i) {
        charges[i] = +charge.call(this, nodes[i], i);
      }
    } else {
      for (i = 0; i < n; ++i) {
        charges[i] = charge;
      }
    }

    // initialize node position based on first neighbor
    function position(dimension, size) {
      var neighbors = neighbor(i),
          j = -1,
          m = neighbors.length,
          x;
      while (++j < m) if (!isNaN(x = neighbors[j][dimension])) return x;
      return Math.random() * size;
    }

    // initialize neighbors lazily
    function neighbor() {
      if (!neighbors) {
        neighbors = [];
        for (j = 0; j < n; ++j) {
          neighbors[j] = [];
        }
        for (j = 0; j < m; ++j) {
          var o = links[j];
          neighbors[o.source.index].push(o.target);
          neighbors[o.target.index].push(o.source);
        }
      }
      return neighbors[i];
    }

    return force.resume();
  };

  force.resume = function() {
    alpha = .1;
    d3.timer(tick);
    return force;
  };

  force.stop = function() {
    alpha = 0;
    return force;
  };

  // use `node.call(force.drag)` to make nodes draggable
  force.drag = function() {
    if (!drag) drag = d3.behavior.drag()
        .on("dragstart", dragstart)
        .on("drag", d3_layout_forceDrag)
        .on("dragend", d3_layout_forceDragEnd);

    this.on("mouseover.force", d3_layout_forceDragOver)
        .on("mouseout.force", d3_layout_forceDragOut)
        .call(drag);
  };

  function dragstart(d) {
    d3_layout_forceDragOver(d3_layout_forceDragNode = d);
    d3_layout_forceDragForce = force;
  }

  return force;
};

var d3_layout_forceDragForce,
    d3_layout_forceDragNode;

function d3_layout_forceDragOver(d) {
  d.fixed |= 2;
}

function d3_layout_forceDragOut(d) {
  if (d !== d3_layout_forceDragNode) d.fixed &= 1;
}

function d3_layout_forceDragEnd() {
  d3_layout_forceDrag();
  d3_layout_forceDragNode.fixed &= 1;
  d3_layout_forceDragForce = d3_layout_forceDragNode = null;
}

function d3_layout_forceDrag() {
  d3_layout_forceDragNode.px += d3.event.dx;
  d3_layout_forceDragNode.py += d3.event.dy;
  d3_layout_forceDragForce.resume(); // restart annealing
}

function d3_layout_forceAccumulate(quad, alpha, charges) {
  var cx = 0,
      cy = 0;
  quad.charge = 0;
  if (!quad.leaf) {
    var nodes = quad.nodes,
        n = nodes.length,
        i = -1,
        c;
    while (++i < n) {
      c = nodes[i];
      if (c == null) continue;
      d3_layout_forceAccumulate(c, alpha, charges);
      quad.charge += c.charge;
      cx += c.charge * c.cx;
      cy += c.charge * c.cy;
    }
  }
  if (quad.point) {
    // jitter internal nodes that are coincident
    if (!quad.leaf) {
      quad.point.x += Math.random() - .5;
      quad.point.y += Math.random() - .5;
    }
    var k = alpha * charges[quad.point.index];
    quad.charge += quad.pointCharge = k;
    cx += k * quad.point.x;
    cy += k * quad.point.y;
  }
  quad.cx = cx / quad.charge;
  quad.cy = cy / quad.charge;
}

function d3_layout_forceLinkDistance(link) {
  return 20;
}

function d3_layout_forceLinkStrength(link) {
  return 1;
}
d3.layout.partition = function() {
  var hierarchy = d3.layout.hierarchy(),
      size = [1, 1]; // width, height

  function position(node, x, dx, dy) {
    var children = node.children;
    node.x = x;
    node.y = node.depth * dy;
    node.dx = dx;
    node.dy = dy;
    if (children && (n = children.length)) {
      var i = -1,
          n,
          c,
          d;
      dx = node.value ? dx / node.value : 0;
      while (++i < n) {
        position(c = children[i], x, d = c.value * dx, dy);
        x += d;
      }
    }
  }

  function depth(node) {
    var children = node.children,
        d = 0;
    if (children && (n = children.length)) {
      var i = -1,
          n;
      while (++i < n) d = Math.max(d, depth(children[i]));
    }
    return 1 + d;
  }

  function partition(d, i) {
    var nodes = hierarchy.call(this, d, i);
    position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
    return nodes;
  }

  partition.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return partition;
  };

  return d3_layout_hierarchyRebind(partition, hierarchy);
};
d3.layout.pie = function() {
  var value = Number,
      sort = null,
      startAngle = 0,
      endAngle = 2 * Math.PI;

  function pie(data, i) {

    // Compute the start angle.
    var a = +(typeof startAngle === "function"
        ? startAngle.apply(this, arguments)
        : startAngle);

    // Compute the angular range (end - start).
    var k = (typeof endAngle === "function"
        ? endAngle.apply(this, arguments)
        : endAngle) - startAngle;

    // Optionally sort the data.
    var index = d3.range(data.length);
    if (sort != null) index.sort(function(i, j) {
      return sort(data[i], data[j]);
    });

    // Compute the numeric values for each data element.
    var values = data.map(value);

    // Convert k into a scale factor from value to angle, using the sum.
    k /= values.reduce(function(p, d) { return p + d; }, 0);

    // Compute the arcs!
    var arcs = index.map(function(i) {
      return {
        data: data[i],
        value: d = values[i],
        startAngle: a,
        endAngle: a += d * k
      };
    });

    // Return the arcs in the original data's order.
    return data.map(function(d, i) {
      return arcs[index[i]];
    });
  }

  /**
   * Specifies the value function *x*, which returns a nonnegative numeric value
   * for each datum. The default value function is `Number`. The value function
   * is passed two arguments: the current datum and the current index.
   */
  pie.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return pie;
  };

  /**
   * Specifies a sort comparison operator *x*. The comparator is passed two data
   * elements from the data array, a and b; it returns a negative value if a is
   * less than b, a positive value if a is greater than b, and zero if a equals
   * b.
   */
  pie.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return pie;
  };

  /**
   * Specifies the overall start angle of the pie chart. Defaults to 0. The
   * start angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.startAngle = function(x) {
    if (!arguments.length) return startAngle;
    startAngle = x;
    return pie;
  };

  /**
   * Specifies the overall end angle of the pie chart. Defaults to 2π. The
   * end angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.endAngle = function(x) {
    if (!arguments.length) return endAngle;
    endAngle = x;
    return pie;
  };

  return pie;
};
// data is two-dimensional array of x,y; we populate y0
d3.layout.stack = function() {
  var values = Object,
      order = d3_layout_stackOrders["default"],
      offset = d3_layout_stackOffsets["zero"],
      out = d3_layout_stackOut,
      x = d3_layout_stackX,
      y = d3_layout_stackY;

  function stack(data, index) {

    // Convert series to canonical two-dimensional representation.
    var series = data.map(function(d, i) {
      return values.call(stack, d, i);
    });

    // Convert each series to canonical [[x,y]] representation.
    var points = series.map(function(d, i) {
      return d.map(function(v, i) {
        return [x.call(stack, v, i), y.call(stack, v, i)];
      });
    });

    // Compute the order of series, and permute them.
    var orders = order.call(stack, points, index);
    series = d3.permute(series, orders);
    points = d3.permute(points, orders);

    // Compute the baseline…
    var offsets = offset.call(stack, points, index);

    // And propagate it to other series.
    var n = series.length,
        m = series[0].length,
        i,
        j,
        o;
    for (j = 0; j < m; ++j) {
      out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
      for (i = 1; i < n; ++i) {
        out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
      }
    }

    return data;
  }

  stack.values = function(x) {
    if (!arguments.length) return values;
    values = x;
    return stack;
  };

  stack.order = function(x) {
    if (!arguments.length) return order;
    order = typeof x === "function" ? x : d3_layout_stackOrders[x];
    return stack;
  };

  stack.offset = function(x) {
    if (!arguments.length) return offset;
    offset = typeof x === "function" ? x : d3_layout_stackOffsets[x];
    return stack;
  };

  stack.x = function(z) {
    if (!arguments.length) return x;
    x = z;
    return stack;
  };

  stack.y = function(z) {
    if (!arguments.length) return y;
    y = z;
    return stack;
  };

  stack.out = function(z) {
    if (!arguments.length) return out;
    out = z;
    return stack;
  };

  return stack;
}

function d3_layout_stackX(d) {
  return d.x;
}

function d3_layout_stackY(d) {
  return d.y;
}

function d3_layout_stackOut(d, y0, y) {
  d.y0 = y0;
  d.y = y;
}

var d3_layout_stackOrders = {

  "inside-out": function(data) {
    var n = data.length,
        i,
        j,
        max = data.map(d3_layout_stackMaxIndex),
        sums = data.map(d3_layout_stackReduceSum),
        index = d3.range(n).sort(function(a, b) { return max[a] - max[b]; }),
        top = 0,
        bottom = 0,
        tops = [],
        bottoms = [];
    for (i = 0; i < n; ++i) {
      j = index[i];
      if (top < bottom) {
        top += sums[j];
        tops.push(j);
      } else {
        bottom += sums[j];
        bottoms.push(j);
      }
    }
    return bottoms.reverse().concat(tops);
  },

  "reverse": function(data) {
    return d3.range(data.length).reverse();
  },

  "default": function(data) {
    return d3.range(data.length);
  }

};

var d3_layout_stackOffsets = {

  "silhouette": function(data) {
    var n = data.length,
        m = data[0].length,
        sums = [],
        max = 0,
        i,
        j,
        o,
        y0 = [];
    for (j = 0; j < m; ++j) {
      for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
      if (o > max) max = o;
      sums.push(o);
    }
    for (j = 0; j < m; ++j) {
      y0[j] = (max - sums[j]) / 2;
    }
    return y0;
  },

  "wiggle": function(data) {
    var n = data.length,
        x = data[0],
        m = x.length,
        max = 0,
        i,
        j,
        k,
        s1,
        s2,
        s3,
        dx,
        o,
        o0,
        y0 = [];
    y0[0] = o = o0 = 0;
    for (j = 1; j < m; ++j) {
      for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
      for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
        for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
          s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
        }
        s2 += s3 * data[i][j][1];
      }
      y0[j] = o -= s1 ? s2 / s1 * dx : 0;
      if (o < o0) o0 = o;
    }
    for (j = 0; j < m; ++j) y0[j] -= o0;
    return y0;
  },

  "expand": function(data) {
    var n = data.length,
        m = data[0].length,
        k = 1 / n,
        i,
        j,
        o,
        y0 = [];
    for (j = 0; j < m; ++j) {
      for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
      if (o) for (i = 0; i < n; i++) data[i][j][1] /= o;
      else for (i = 0; i < n; i++) data[i][j][1] = k;
    }
    for (j = 0; j < m; ++j) y0[j] = 0;
    return y0;
  },

  "zero": function(data) {
    var j = -1,
        m = data[0].length,
        y0 = [];
    while (++j < m) y0[j] = 0;
    return y0;
  }

};

function d3_layout_stackMaxIndex(array) {
  var i = 1,
      j = 0,
      v = array[0][1],
      k,
      n = array.length;
  for (; i < n; ++i) {
    if ((k = array[i][1]) > v) {
      j = i;
      v = k;
    }
  }
  return j;
}

function d3_layout_stackReduceSum(d) {
  return d.reduce(d3_layout_stackSum, 0);
}

function d3_layout_stackSum(p, d) {
  return p + d[1];
}
d3.layout.histogram = function() {
  var frequency = true,
      valuer = Number,
      ranger = d3_layout_histogramRange,
      binner = d3_layout_histogramBinSturges;

  function histogram(data, i) {
    var bins = [],
        values = data.map(valuer, this),
        range = ranger.call(this, values, i),
        thresholds = binner.call(this, range, values, i),
        bin,
        i = -1,
        n = values.length,
        m = thresholds.length - 1,
        k = frequency ? 1 : 1 / n,
        x;

    // Initialize the bins.
    while (++i < m) {
      bin = bins[i] = [];
      bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
      bin.y = 0;
    }

    // Fill the bins, ignoring values outside the range.
    i = -1; while(++i < n) {
      x = values[i];
      if ((x >= range[0]) && (x <= range[1])) {
        bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
        bin.y += k;
        bin.push(data[i]);
      }
    }

    return bins;
  }

  // Specifies how to extract a value from the associated data. The default
  // value function is `Number`, which is equivalent to the identity function.
  histogram.value = function(x) {
    if (!arguments.length) return valuer;
    valuer = x;
    return histogram;
  };

  // Specifies the range of the histogram. Values outside the specified range
  // will be ignored. The argument `x` may be specified either as a two-element
  // array representing the minimum and maximum value of the range, or as a
  // function that returns the range given the array of values and the current
  // index `i`. The default range is the extent (minimum and maximum) of the
  // values.
  histogram.range = function(x) {
    if (!arguments.length) return ranger;
    ranger = d3.functor(x);
    return histogram;
  };

  // Specifies how to bin values in the histogram. The argument `x` may be
  // specified as a number, in which case the range of values will be split
  // uniformly into the given number of bins. Or, `x` may be an array of
  // threshold values, defining the bins; the specified array must contain the
  // rightmost (upper) value, thus specifying n + 1 values for n bins. Or, `x`
  // may be a function which is evaluated, being passed the range, the array of
  // values, and the current index `i`, returning an array of thresholds. The
  // default bin function will divide the values into uniform bins using
  // Sturges' formula.
  histogram.bins = function(x) {
    if (!arguments.length) return binner;
    binner = typeof x === "number"
        ? function(range) { return d3_layout_histogramBinFixed(range, x); }
        : d3.functor(x);
    return histogram;
  };

  // Specifies whether the histogram's `y` value is a count (frequency) or a
  // probability (density). The default value is true.
  histogram.frequency = function(x) {
    if (!arguments.length) return frequency;
    frequency = !!x;
    return histogram;
  };

  return histogram;
};

function d3_layout_histogramBinSturges(range, values) {
  return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
}

function d3_layout_histogramBinFixed(range, n) {
  var x = -1,
      b = +range[0],
      m = (range[1] - b) / n,
      f = [];
  while (++x <= n) f[x] = m * x + b;
  return f;
}

function d3_layout_histogramRange(values) {
  return [d3.min(values), d3.max(values)];
}
d3.layout.hierarchy = function() {
  var sort = d3_layout_hierarchySort,
      children = d3_layout_hierarchyChildren,
      value = d3_layout_hierarchyValue;

  // Recursively compute the node depth and value.
  // Also converts the data representation into a standard hierarchy structure.
  function recurse(data, depth, nodes) {
    var childs = children.call(hierarchy, data, depth),
        node = d3_layout_hierarchyInline ? data : {data: data};
    node.depth = depth;
    nodes.push(node);
    if (childs && (n = childs.length)) {
      var i = -1,
          n,
          c = node.children = [],
          v = 0,
          j = depth + 1;
      while (++i < n) {
        d = recurse(childs[i], j, nodes);
        d.parent = node;
        c.push(d);
        v += d.value;
      }
      if (sort) c.sort(sort);
      if (value) node.value = v;
    } else if (value) {
      node.value = +value.call(hierarchy, data, depth) || 0;
    }
    return node;
  }

  // Recursively re-evaluates the node value.
  function revalue(node, depth) {
    var children = node.children,
        v = 0;
    if (children && (n = children.length)) {
      var i = -1,
          n,
          j = depth + 1;
      while (++i < n) v += revalue(children[i], j);
    } else if (value) {
      v = +value.call(hierarchy, d3_layout_hierarchyInline ? node : node.data, depth) || 0;
    }
    if (value) node.value = v;
    return v;
  }

  function hierarchy(d) {
    var nodes = [];
    recurse(d, 0, nodes);
    return nodes;
  }

  hierarchy.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return hierarchy;
  };

  hierarchy.children = function(x) {
    if (!arguments.length) return children;
    children = x;
    return hierarchy;
  };

  hierarchy.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return hierarchy;
  };

  // Re-evaluates the `value` property for the specified hierarchy.
  hierarchy.revalue = function(root) {
    revalue(root, 0);
    return root;
  };

  return hierarchy;
};

// A method assignment helper for hierarchy subclasses.
function d3_layout_hierarchyRebind(object, hierarchy) {
  object.sort = d3.rebind(object, hierarchy.sort);
  object.children = d3.rebind(object, hierarchy.children);
  object.links = d3_layout_hierarchyLinks;
  object.value = d3.rebind(object, hierarchy.value);

  // If the new API is used, enabling inlining.
  object.nodes = function(d) {
    d3_layout_hierarchyInline = true;
    return (object.nodes = object)(d);
  };

  return object;
}

function d3_layout_hierarchyChildren(d) {
  return d.children;
}

function d3_layout_hierarchyValue(d) {
  return d.value;
}

function d3_layout_hierarchySort(a, b) {
  return b.value - a.value;
}

// Returns an array source+target objects for the specified nodes.
function d3_layout_hierarchyLinks(nodes) {
  return d3.merge(nodes.map(function(parent) {
    return (parent.children || []).map(function(child) {
      return {source: parent, target: child};
    });
  }));
}

// For backwards-compatibility, don't enable inlining by default.
var d3_layout_hierarchyInline = false;
d3.layout.pack = function() {
  var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort),
      size = [1, 1];

  function pack(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0];

    // Recursively compute the layout.
    root.x = 0;
    root.y = 0;
    d3_layout_packTree(root);

    // Scale the layout to fit the requested size.
    var w = size[0],
        h = size[1],
        k = 1 / Math.max(2 * root.r / w, 2 * root.r / h);
    d3_layout_packTransform(root, w / 2, h / 2, k);

    return nodes;
  }

  pack.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return pack;
  };

  return d3_layout_hierarchyRebind(pack, hierarchy);
};

function d3_layout_packSort(a, b) {
  return a.value - b.value;
}

function d3_layout_packInsert(a, b) {
  var c = a._pack_next;
  a._pack_next = b;
  b._pack_prev = a;
  b._pack_next = c;
  c._pack_prev = b;
}

function d3_layout_packSplice(a, b) {
  a._pack_next = b;
  b._pack_prev = a;
}

function d3_layout_packIntersects(a, b) {
  var dx = b.x - a.x,
      dy = b.y - a.y,
      dr = a.r + b.r;
  return (dr * dr - dx * dx - dy * dy) > .001; // within epsilon
}

function d3_layout_packCircle(nodes) {
  var xMin = Infinity,
      xMax = -Infinity,
      yMin = Infinity,
      yMax = -Infinity,
      n = nodes.length,
      a, b, c, j, k;

  function bound(node) {
    xMin = Math.min(node.x - node.r, xMin);
    xMax = Math.max(node.x + node.r, xMax);
    yMin = Math.min(node.y - node.r, yMin);
    yMax = Math.max(node.y + node.r, yMax);
  }

  // Create node links.
  nodes.forEach(d3_layout_packLink);

  // Create first node.
  a = nodes[0];
  a.x = -a.r;
  a.y = 0;
  bound(a);

  // Create second node.
  if (n > 1) {
    b = nodes[1];
    b.x = b.r;
    b.y = 0;
    bound(b);

    // Create third node and build chain.
    if (n > 2) {
      c = nodes[2];
      d3_layout_packPlace(a, b, c);
      bound(c);
      d3_layout_packInsert(a, c);
      a._pack_prev = c;
      d3_layout_packInsert(c, b);
      b = a._pack_next;

      // Now iterate through the rest.
      for (var i = 3; i < n; i++) {
        d3_layout_packPlace(a, b, c = nodes[i]);

        // Search for the closest intersection.
        var isect = 0, s1 = 1, s2 = 1;
        for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
          if (d3_layout_packIntersects(j, c)) {
            isect = 1;
            break;
          }
        }
        if (isect == 1) {
          for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
            if (d3_layout_packIntersects(k, c)) {
              if (s2 < s1) {
                isect = -1;
                j = k;
              }
              break;
            }
          }
        }

        // Update node chain.
        if (isect == 0) {
          d3_layout_packInsert(a, c);
          b = c;
          bound(c);
        } else if (isect > 0) {
          d3_layout_packSplice(a, j);
          b = j;
          i--;
        } else { // isect < 0
          d3_layout_packSplice(j, b);
          a = j;
          i--;
        }
      }
    }
  }

  // Re-center the circles and return the encompassing radius.
  var cx = (xMin + xMax) / 2,
      cy = (yMin + yMax) / 2,
      cr = 0;
  for (var i = 0; i < n; i++) {
    var node = nodes[i];
    node.x -= cx;
    node.y -= cy;
    cr = Math.max(cr, node.r + Math.sqrt(node.x * node.x + node.y * node.y));
  }

  // Remove node links.
  nodes.forEach(d3_layout_packUnlink);

  return cr;
}

function d3_layout_packLink(node) {
  node._pack_next = node._pack_prev = node;
}

function d3_layout_packUnlink(node) {
  delete node._pack_next;
  delete node._pack_prev;
}

function d3_layout_packTree(node) {
  var children = node.children;
  if (children && children.length) {
    children.forEach(d3_layout_packTree);
    node.r = d3_layout_packCircle(children);
  } else {
    node.r = Math.sqrt(node.value);
  }
}

function d3_layout_packTransform(node, x, y, k) {
  var children = node.children;
  node.x = (x += k * node.x);
  node.y = (y += k * node.y);
  node.r *= k;
  if (children) {
    var i = -1, n = children.length;
    while (++i < n) d3_layout_packTransform(children[i], x, y, k);
  }
}

function d3_layout_packPlace(a, b, c) {
  var db = a.r + c.r,
      dx = b.x - a.x,
      dy = b.y - a.y;
  if (db && (dx || dy)) {
    var da = b.r + c.r,
        dc = Math.sqrt(dx * dx + dy * dy),
        cos = Math.max(-1, Math.min(1, (db * db + dc * dc - da * da) / (2 * db * dc))),
        theta = Math.acos(cos),
        x = cos * (db /= dc),
        y = Math.sin(theta) * db;
    c.x = a.x + x * dx + y * dy;
    c.y = a.y + x * dy - y * dx;
  } else {
    c.x = a.x + db;
    c.y = a.y;
  }
}
// Implements a hierarchical layout using the cluster (or dendogram) algorithm.
d3.layout.cluster = function() {
  var hierarchy = d3.layout.hierarchy().sort(null).value(null),
      separation = d3_layout_treeSeparation,
      size = [1, 1]; // width, height

  function cluster(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0],
        previousNode,
        x = 0,
        kx,
        ky;

    // First walk, computing the initial x & y values.
    d3_layout_treeVisitAfter(root, function(node) {
      var children = node.children;
      if (children && children.length) {
        node.x = d3_layout_clusterX(children);
        node.y = d3_layout_clusterY(children);
      } else {
        node.x = previousNode ? x += separation(node, previousNode) : 0;
        node.y = 0;
        previousNode = node;
      }
    });

    // Compute the left-most, right-most, and depth-most nodes for extents.
    var left = d3_layout_clusterLeft(root),
        right = d3_layout_clusterRight(root),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2;

    // Second walk, normalizing x & y to the desired size.
    d3_layout_treeVisitAfter(root, function(node) {
      node.x = (node.x - x0) / (x1 - x0) * size[0];
      node.y = (1 - node.y / root.y) * size[1];
    });

    return nodes;
  }

  cluster.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return cluster;
  };

  cluster.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return cluster;
  };

  return d3_layout_hierarchyRebind(cluster, hierarchy);
};

function d3_layout_clusterY(children) {
  return 1 + d3.max(children, function(child) {
    return child.y;
  });
}

function d3_layout_clusterX(children) {
  return children.reduce(function(x, child) {
    return x + child.x;
  }, 0) / children.length;
}

function d3_layout_clusterLeft(node) {
  var children = node.children;
  return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
}

function d3_layout_clusterRight(node) {
  var children = node.children, n;
  return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
}
// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
d3.layout.tree = function() {
  var hierarchy = d3.layout.hierarchy().sort(null).value(null),
      separation = d3_layout_treeSeparation,
      size = [1, 1]; // width, height

  function tree(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0];

    function firstWalk(node, previousSibling) {
      var children = node.children,
          layout = node._tree;
      if (children && (n = children.length)) {
        var n,
            firstChild = children[0],
            previousChild,
            ancestor = firstChild,
            child,
            i = -1;
        while (++i < n) {
          child = children[i];
          firstWalk(child, previousChild);
          ancestor = apportion(child, previousChild, ancestor);
          previousChild = child;
        }
        d3_layout_treeShift(node);
        var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
        if (previousSibling) {
          layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
          layout.mod = layout.prelim - midpoint;
        } else {
          layout.prelim = midpoint;
        }
      } else {
        if (previousSibling) {
          layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
        }
      }
    }

    function secondWalk(node, x) {
      node.x = node._tree.prelim + x;
      var children = node.children;
      if (children && (n = children.length)) {
        var i = -1,
            n;
        x += node._tree.mod;
        while (++i < n) {
          secondWalk(children[i], x);
        }
      }
    }

    function apportion(node, previousSibling, ancestor) {
      if (previousSibling) {
        var vip = node,
            vop = node,
            vim = previousSibling,
            vom = node.parent.children[0],
            sip = vip._tree.mod,
            sop = vop._tree.mod,
            sim = vim._tree.mod,
            som = vom._tree.mod,
            shift;
        while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
          vom = d3_layout_treeLeft(vom);
          vop = d3_layout_treeRight(vop);
          vop._tree.ancestor = node;
          shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip);
          if (shift > 0) {
            d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
            sip += shift;
            sop += shift;
          }
          sim += vim._tree.mod;
          sip += vip._tree.mod;
          som += vom._tree.mod;
          sop += vop._tree.mod;
        }
        if (vim && !d3_layout_treeRight(vop)) {
          vop._tree.thread = vim;
          vop._tree.mod += sim - sop;
        }
        if (vip && !d3_layout_treeLeft(vom)) {
          vom._tree.thread = vip;
          vom._tree.mod += sip - som;
          ancestor = node;
        }
      }
      return ancestor;
    }

    // Initialize temporary layout variables.
    d3_layout_treeVisitAfter(root, function(node, previousSibling) {
      node._tree = {
        ancestor: node,
        prelim: 0,
        mod: 0,
        change: 0,
        shift: 0,
        number: previousSibling ? previousSibling._tree.number + 1 : 0
      };
    });

    // Compute the layout using Buchheim et al.'s algorithm.
    firstWalk(root);
    secondWalk(root, -root._tree.prelim);

    // Compute the left-most, right-most, and depth-most nodes for extents.
    var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost),
        right = d3_layout_treeSearch(root, d3_layout_treeRightmost),
        deep = d3_layout_treeSearch(root, d3_layout_treeDeepest),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2,
        y1 = deep.depth || 1;

    // Clear temporary layout variables; transform x and y.
    d3_layout_treeVisitAfter(root, function(node) {
      node.x = (node.x - x0) / (x1 - x0) * size[0];
      node.y = node.depth / y1 * size[1];
      delete node._tree;
    });

    return nodes;
  }

  tree.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return tree;
  };

  tree.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return tree;
  };

  return d3_layout_hierarchyRebind(tree, hierarchy);
};

function d3_layout_treeSeparation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}

// function d3_layout_treeSeparationRadial(a, b) {
//   return (a.parent == b.parent ? 1 : 2) / a.depth;
// }

function d3_layout_treeLeft(node) {
  var children = node.children;
  return children && children.length ? children[0] : node._tree.thread;
}

function d3_layout_treeRight(node) {
  var children = node.children,
      n;
  return children && (n = children.length) ? children[n - 1] : node._tree.thread;
}

function d3_layout_treeSearch(node, compare) {
  var children = node.children;
  if (children && (n = children.length)) {
    var child,
        n,
        i = -1;
    while (++i < n) {
      if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
        node = child;
      }
    }
  }
  return node;
}

function d3_layout_treeRightmost(a, b) {
  return a.x - b.x;
}

function d3_layout_treeLeftmost(a, b) {
  return b.x - a.x;
}

function d3_layout_treeDeepest(a, b) {
  return a.depth - b.depth;
}

function d3_layout_treeVisitAfter(node, callback) {
  function visit(node, previousSibling) {
    var children = node.children;
    if (children && (n = children.length)) {
      var child,
          previousChild = null,
          i = -1,
          n;
      while (++i < n) {
        child = children[i];
        visit(child, previousChild);
        previousChild = child;
      }
    }
    callback(node, previousSibling);
  }
  visit(node, null);
}

function d3_layout_treeShift(node) {
  var shift = 0,
      change = 0,
      children = node.children,
      i = children.length,
      child;
  while (--i >= 0) {
    child = children[i]._tree;
    child.prelim += shift;
    child.mod += shift;
    shift += child.shift + (change += child.change);
  }
}

function d3_layout_treeMove(ancestor, node, shift) {
  ancestor = ancestor._tree;
  node = node._tree;
  var change = shift / (node.number - ancestor.number);
  ancestor.change += change;
  node.change -= change;
  node.shift += shift;
  node.prelim += shift;
  node.mod += shift;
}

function d3_layout_treeAncestor(vim, node, ancestor) {
  return vim._tree.ancestor.parent == node.parent
      ? vim._tree.ancestor
      : ancestor;
}
// Squarified Treemaps by Mark Bruls, Kees Huizing, and Jarke J. van Wijk
// Modified to support a target aspect ratio by Jeff Heer
d3.layout.treemap = function() {
  var hierarchy = d3.layout.hierarchy(),
      round = Math.round,
      size = [1, 1], // width, height
      padding = null,
      pad = d3_layout_treemapPadNull,
      sticky = false,
      stickies,
      ratio = 0.5 * (1 + Math.sqrt(5)); // golden ratio

  // Compute the area for each child based on value & scale.
  function scale(children, k) {
    var i = -1,
        n = children.length,
        child,
        area;
    while (++i < n) {
      area = (child = children[i]).value * (k < 0 ? 0 : k);
      child.area = isNaN(area) || area <= 0 ? 0 : area;
    }
  }

  // Recursively arranges the specified node's children into squarified rows.
  function squarify(node) {
    var children = node.children;
    if (children && children.length) {
      var rect = pad(node),
          row = [],
          remaining = children.slice(), // copy-on-write
          child,
          best = Infinity, // the best row score so far
          score, // the current row score
          u = Math.min(rect.dx, rect.dy), // initial orientation
          n;
      scale(remaining, rect.dx * rect.dy / node.value);
      row.area = 0;
      while ((n = remaining.length) > 0) {
        row.push(child = remaining[n - 1]);
        row.area += child.area;
        if ((score = worst(row, u)) <= best) { // continue with this orientation
          remaining.pop();
          best = score;
        } else { // abort, and try a different orientation
          row.area -= row.pop().area;
          position(row, u, rect, false);
          u = Math.min(rect.dx, rect.dy);
          row.length = row.area = 0;
          best = Infinity;
        }
      }
      if (row.length) {
        position(row, u, rect, true);
        row.length = row.area = 0;
      }
      children.forEach(squarify);
    }
  }

  // Recursively resizes the specified node's children into existing rows.
  // Preserves the existing layout!
  function stickify(node) {
    var children = node.children;
    if (children && children.length) {
      var rect = pad(node),
          remaining = children.slice(), // copy-on-write
          child,
          row = [];
      scale(remaining, rect.dx * rect.dy / node.value);
      row.area = 0;
      while (child = remaining.pop()) {
        row.push(child);
        row.area += child.area;
        if (child.z != null) {
          position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
          row.length = row.area = 0;
        }
      }
      children.forEach(stickify);
    }
  }

  // Computes the score for the specified row, as the worst aspect ratio.
  function worst(row, u) {
    var s = row.area,
        r,
        rmax = 0,
        rmin = Infinity,
        i = -1,
        n = row.length;
    while (++i < n) {
      if (!(r = row[i].area)) continue;
      if (r < rmin) rmin = r;
      if (r > rmax) rmax = r;
    }
    s *= s;
    u *= u;
    return s
        ? Math.max((u * rmax * ratio) / s, s / (u * rmin * ratio))
        : Infinity;
  }

  // Positions the specified row of nodes. Modifies `rect`.
  function position(row, u, rect, flush) {
    var i = -1,
        n = row.length,
        x = rect.x,
        y = rect.y,
        v = u ? round(row.area / u) : 0,
        o;
    if (u == rect.dx) { // horizontal subdivision
      if (flush || v > rect.dy) v = v ? rect.dy : 0; // over+underflow
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dy = v;
        x += o.dx = v ? round(o.area / v) : 0;
      }
      o.z = true;
      o.dx += rect.x + rect.dx - x; // rounding error
      rect.y += v;
      rect.dy -= v;
    } else { // vertical subdivision
      if (flush || v > rect.dx) v = v ? rect.dx : 0; // over+underflow
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dx = v;
        y += o.dy = v ? round(o.area / v) : 0;
      }
      o.z = false;
      o.dy += rect.y + rect.dy - y; // rounding error
      rect.x += v;
      rect.dx -= v;
    }
  }

  function treemap(d) {
    var nodes = stickies || hierarchy(d),
        root = nodes[0];
    root.x = 0;
    root.y = 0;
    root.dx = size[0];
    root.dy = size[1];
    if (stickies) hierarchy.revalue(root);
    scale([root], root.dx * root.dy / root.value);
    (stickies ? stickify : squarify)(root);
    if (sticky) stickies = nodes;
    return nodes;
  }

  treemap.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return treemap;
  };

  treemap.padding = function(x) {
    if (!arguments.length) return padding;

    function padFunction(node) {
      var p = x.call(treemap, node, node.depth);
      return p == null
          ? d3_layout_treemapPadNull(node)
          : d3_layout_treemapPad(node, typeof p === "number" ? [p, p, p, p] : p);
    }

    function padConstant(node) {
      return d3_layout_treemapPad(node, x);
    }

    var type;
    pad = (padding = x) == null ? d3_layout_treemapPadNull
        : (type = typeof x) === "function" ? padFunction
        : type === "number" ? (x = [x, x, x, x], padConstant)
        : padConstant;
    return treemap;
  };

  treemap.round = function(x) {
    if (!arguments.length) return round != Number;
    round = x ? Math.round : Number;
    return treemap;
  };

  treemap.sticky = function(x) {
    if (!arguments.length) return sticky;
    sticky = x;
    stickies = null;
    return treemap;
  };

  treemap.ratio = function(x) {
    if (!arguments.length) return ratio;
    ratio = x;
    return treemap;
  };

  return d3_layout_hierarchyRebind(treemap, hierarchy);
};

function d3_layout_treemapPadNull(node) {
  return {x: node.x, y: node.y, dx: node.dx, dy: node.dy};
}

function d3_layout_treemapPad(node, padding) {
  var x = node.x + padding[3],
      y = node.y + padding[0],
      dx = node.dx - padding[1] - padding[3],
      dy = node.dy - padding[0] - padding[2];
  if (dx < 0) { x += dx / 2; dx = 0; }
  if (dy < 0) { y += dy / 2; dy = 0; }
  return {x: x, y: y, dx: dx, dy: dy};
}
})();


(function(){d3.time = {};

var d3_time = Date;
d3.time.format = function(template) {
  var n = template.length;

  function format(date) {
    var string = [],
        i = -1,
        j = 0,
        c,
        f;
    while (++i < n) {
      if (template.charCodeAt(i) == 37) {
        string.push(
            template.substring(j, i),
            (f = d3_time_formats[c = template.charAt(++i)])
            ? f(date) : c);
        j = i + 1;
      }
    }
    string.push(template.substring(j, i));
    return string.join("");
  }

  format.parse = function(string) {
    var date = new d3_time(1900, 0, 1),
        i = d3_time_parse(date, template, string, 0);
    if (i != string.length) return null;
    if (date.hour12) {
      var hours = date.getHours() % 12;
      date.setHours(date.hour12pm ? hours + 12 : hours);
    }
    delete date.hour12;
    delete date.hour12pm;
    return date;
  };

  format.toString = function() {
    return template;
  };

  return format;
};

function d3_time_parse(date, template, string, j) {
  var c,
      p,
      i = 0,
      n = template.length,
      m = string.length;
  while (i < n) {
    if (j >= m) return -1;
    c = template.charCodeAt(i++);
    if (c == 37) {
      p = d3_time_parsers[template.charAt(i++)];
      if (!p || ((j = p(date, string, j)) < 0)) return -1;
    } else if (c != string.charCodeAt(j++)) {
      return -1;
    }
  }
  return j;
}

var d3_time_zfill2 = d3.format("02d"),
    d3_time_zfill3 = d3.format("03d"),
    d3_time_zfill4 = d3.format("04d"),
    d3_time_sfill2 = d3.format("2d");

var d3_time_formats = {
  a: function(d) { return d3_time_weekdays[d.getDay()].substring(0, 3); },
  A: function(d) { return d3_time_weekdays[d.getDay()]; },
  b: function(d) { return d3_time_months[d.getMonth()].substring(0, 3); },
  B: function(d) { return d3_time_months[d.getMonth()]; },
  c: d3.time.format("%a %b %e %H:%M:%S %Y"),
  d: function(d) { return d3_time_zfill2(d.getDate()); },
  e: function(d) { return d3_time_sfill2(d.getDate()); },
  H: function(d) { return d3_time_zfill2(d.getHours()); },
  I: function(d) { return d3_time_zfill2(d.getHours() % 12 || 12); },
  j: d3_time_dayOfYear,
  L: function(d) { return d3_time_zfill3(d.getMilliseconds()); },
  m: function(d) { return d3_time_zfill2(d.getMonth() + 1); },
  M: function(d) { return d3_time_zfill2(d.getMinutes()); },
  p: function(d) { return d.getHours() >= 12 ? "PM" : "AM"; },
  S: function(d) { return d3_time_zfill2(d.getSeconds()); },
  U: d3_time_weekNumberSunday,
  w: function(d) { return d.getDay(); },
  W: d3_time_weekNumberMonday,
  x: d3.time.format("%m/%d/%y"),
  X: d3.time.format("%H:%M:%S"),
  y: function(d) { return d3_time_zfill2(d.getFullYear() % 100); },
  Y: function(d) { return d3_time_zfill4(d.getFullYear() % 10000); },
  Z: d3_time_zone,
  "%": function(d) { return "%"; }
};

var d3_time_parsers = {
  a: d3_time_parseWeekdayAbbrev,
  A: d3_time_parseWeekday,
  b: d3_time_parseMonthAbbrev,
  B: d3_time_parseMonth,
  c: d3_time_parseLocaleFull,
  d: d3_time_parseDay,
  e: d3_time_parseDay,
  H: d3_time_parseHour24,
  I: d3_time_parseHour12,
  // j: function(d, s, i) { /*TODO day of year [001,366] */ return i; },
  L: d3_time_parseMilliseconds,
  m: d3_time_parseMonthNumber,
  M: d3_time_parseMinutes,
  p: d3_time_parseAmPm,
  S: d3_time_parseSeconds,
  // U: function(d, s, i) { /*TODO week number (sunday) [00,53] */ return i; },
  // w: function(d, s, i) { /*TODO weekday [0,6] */ return i; },
  // W: function(d, s, i) { /*TODO week number (monday) [00,53] */ return i; },
  x: d3_time_parseLocaleDate,
  X: d3_time_parseLocaleTime,
  y: d3_time_parseYear,
  Y: d3_time_parseFullYear
  // ,
  // Z: function(d, s, i) { /*TODO time zone */ return i; },
  // "%": function(d, s, i) { /*TODO literal % */ return i; }
};

// Note: weekday is validated, but does not set the date.
function d3_time_parseWeekdayAbbrev(date, string, i) {
  return string.substring(i, i += 3).toLowerCase() in d3_time_weekdayAbbrevLookup ? i : -1;
}

var d3_time_weekdayAbbrevLookup = {
  sun: 3,
  mon: 3,
  tue: 3,
  wed: 3,
  thu: 3,
  fri: 3,
  sat: 3
};

// Note: weekday is validated, but does not set the date.
function d3_time_parseWeekday(date, string, i) {
  d3_time_weekdayRe.lastIndex = 0;
  var n = d3_time_weekdayRe.exec(string.substring(i, i + 10));
  return n ? i += n[0].length : -1;
}

var d3_time_weekdayRe = /^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/ig;

var d3_time_weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function d3_time_parseMonthAbbrev(date, string, i) {
  var n = d3_time_monthAbbrevLookup[string.substring(i, i += 3).toLowerCase()];
  return n == null ? -1 : (date.setMonth(n), i);
}

var d3_time_monthAbbrevLookup = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
};

function d3_time_parseMonth(date, string, i) {
  d3_time_monthRe.lastIndex = 0;
  var n = d3_time_monthRe.exec(string.substring(i, i + 12));
  return n ? (date.setMonth(d3_time_monthLookup[n[0].toLowerCase()]), i += n[0].length) : -1;
}

var d3_time_monthRe = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)/ig;

var d3_time_monthLookup = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11
};

var d3_time_months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function d3_time_parseLocaleFull(date, string, i) {
  return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
}

function d3_time_parseLocaleDate(date, string, i) {
  return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
}

function d3_time_parseLocaleTime(date, string, i) {
  return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
}

function d3_time_parseFullYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 4));
  return n ? (date.setFullYear(n[0]), i += n[0].length) : -1;
}

function d3_time_parseYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.setFullYear(d3_time_century() + +n[0]), i += n[0].length) : -1;
}

function d3_time_century() {
  return ~~(new Date().getFullYear() / 1000) * 1000;
}

function d3_time_parseMonthNumber(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.setMonth(n[0] - 1), i += n[0].length) : -1;
}

function d3_time_parseDay(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.setDate(+n[0]), i += n[0].length) : -1;
}

// Note: we don't validate that the hour is in the range [0,23].
function d3_time_parseHour24(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.setHours(+n[0]), i += n[0].length) : -1;
}

// Note: we don't validate that the hour is in the range [1,12].
function d3_time_parseHour12(date, string, i) {
  date.hour12 = true;
  return d3_time_parseHour24(date, string, i);
}

function d3_time_parseMinutes(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.setMinutes(+n[0]), i += n[0].length) : -1;
}

function d3_time_parseSeconds(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.setSeconds(+n[0]), i += n[0].length) : -1;
}

function d3_time_parseMilliseconds(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 3));
  return n ? (date.setMilliseconds(+n[0]), i += n[0].length) : -1;
}

// Note: we don't look at the next directive.
var d3_time_numberRe = /\s*\d+/;

function d3_time_parseAmPm(date, string, i) {
  var n = d3_time_amPmLookup[string.substring(i, i += 2).toLowerCase()];
  return n == null ? -1 : (date.hour12pm = n, i);
}

var d3_time_amPmLookup = {
  am: 0,
  pm: 1
};

function d3_time_year(d) {
  return new d3_time(d.getFullYear(), 0, 1);
}

function d3_time_daysElapsed(d0, d1) {
  return ~~((d1 - d0) / 864e5 - (d1.getTimezoneOffset() - d0.getTimezoneOffset()) / 1440);
}

function d3_time_dayOfYear(d) {
  return d3_time_zfill3(1 + d3_time_daysElapsed(d3_time_year(d), d));
}

function d3_time_weekNumberSunday(d) {
  var d0 = d3_time_year(d);
  return d3_time_zfill2(~~((d3_time_daysElapsed(d0, d) + d0.getDay()) / 7));
}

function d3_time_weekNumberMonday(d) {
  var d0 = d3_time_year(d);
  return d3_time_zfill2(~~((d3_time_daysElapsed(d0, d) + (d0.getDay() + 6) % 7) / 7));
}

// TODO table of time zone offset names?
function d3_time_zone(d) {
  var z = d.getTimezoneOffset(),
      zs = z > 0 ? "-" : "+",
      zh = ~~(Math.abs(z) / 60),
      zm = Math.abs(z) % 60;
  return zs + d3_time_zfill2(zh) + d3_time_zfill2(zm);
}
d3.time.format.utc = function(template) {
  var local = d3.time.format(template);

  function format(date) {
    try {
      d3_time = d3_time_format_utc;
      var utc = new d3_time();
      utc._ = date;
      return local(utc);
    } finally {
      d3_time = Date;
    }
  }

  format.parse = function(string) {
    try {
      d3_time = d3_time_format_utc;
      var date = local.parse(string);
      return date && date._;
    } finally {
      d3_time = Date;
    }
  };

  format.toString = local.toString;

  return format;
};

function d3_time_format_utc() {
  this._ = new Date(Date.UTC.apply(this, arguments));
}

d3_time_format_utc.prototype = {
  getDate: function() { return this._.getUTCDate(); },
  getDay: function() { return this._.getUTCDay(); },
  getFullYear: function() { return this._.getUTCFullYear(); },
  getHours: function() { return this._.getUTCHours(); },
  getMilliseconds: function() { return this._.getUTCMilliseconds(); },
  getMinutes: function() { return this._.getUTCMinutes(); },
  getMonth: function() { return this._.getUTCMonth(); },
  getSeconds: function() { return this._.getUTCSeconds(); },
  getTimezoneOffset: function() { return 0; },
  valueOf: function() { return this._.getTime(); },
  setDate: function(x) { this._.setUTCDate(x); },
  setDay: function(x) { this._.setUTCDay(x); },
  setFullYear: function(x) { this._.setUTCFullYear(x); },
  setHours: function(x) { this._.setUTCHours(x); },
  setMilliseconds: function(x) { this._.setUTCMilliseconds(x); },
  setMinutes: function(x) { this._.setUTCMinutes(x); },
  setMonth: function(x) { this._.setUTCMonth(x); },
  setSeconds: function(x) { this._.setUTCSeconds(x); }
};
var d3_time_formatIso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");

d3.time.format.iso = Date.prototype.toISOString ? d3_time_formatIsoNative : d3_time_formatIso;

function d3_time_formatIsoNative(date) {
  return date.toISOString();
}

d3_time_formatIsoNative.parse = function(string) {
  return new Date(string);
};

d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
function d3_time_range(floor, step, number) {
  return function(t0, t1, dt) {
    var time = floor(t0), times = [];
    if (time < t0) step(time);
    if (dt > 1) {
      while (time < t1) {
        var date = new Date(+time);
        if (!(number(date) % dt)) times.push(date);
        step(time);
      }
    } else {
      while (time < t1) times.push(new Date(+time)), step(time);
    }
    return times;
  };
}
d3.time.second = function(date) {
  return new Date(~~(date / 1e3) * 1e3);
};

d3.time.second.utc = d3.time.second;
d3.time.seconds = d3_time_range(d3.time.second, function(date) {
  date.setTime(date.getTime() + 1e3);
}, function(date) {
  return date.getSeconds();
});

d3.time.seconds.utc = d3.time.seconds;
d3.time.minute = function(date) {
  return new Date(~~(date / 6e4) * 6e4);
};

d3.time.minute.utc = d3.time.minute;d3.time.minutes = d3_time_range(d3.time.minute, d3_time_minutesStep, function(date) {
  return date.getMinutes();
});

d3.time.minutes.utc = d3_time_range(d3.time.minute, d3_time_minutesStep, function(date) {
  return date.getUTCMinutes();
});

function d3_time_minutesStep(date) {
  date.setTime(date.getTime() + 6e4); // assumes no leap seconds
}
d3.time.hour = function(date) {
  var offset = date.getTimezoneOffset() / 60;
  return new Date((~~(date / 36e5 - offset) + offset) * 36e5);
};

d3.time.hour.utc = function(date) {
  return new Date(~~(date / 36e5) * 36e5);
};
d3.time.hours = d3_time_range(d3.time.hour, d3_time_hoursStep, function(date) {
  return date.getHours();
});

d3.time.hours.utc = d3_time_range(d3.time.hour.utc, d3_time_hoursStep, function(date) {
  return date.getUTCHours();
});

function d3_time_hoursStep(date) {
  date.setTime(date.getTime() + 36e5);
}
d3.time.day = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

d3.time.day.utc = function(date) {
  return new Date(~~(date / 864e5) * 864e5);
};
d3.time.days = d3_time_range(d3.time.day, function(date) {
  date.setDate(date.getDate() + 1);
}, function(date) {
  return date.getDate() - 1;
});

d3.time.days.utc = d3_time_range(d3.time.day.utc, function(date) {
  date.setUTCDate(date.getUTCDate() + 1);
}, function(date) {
  return date.getUTCDate() - 1;
});
d3.time.week = function(date) {
  (date = d3.time.day(date)).setDate(date.getDate() - date.getDay());
  return date;
};

d3.time.week.utc = function(date) {
  (date = d3.time.day.utc(date)).setUTCDate(date.getUTCDate() - date.getUTCDay());
  return date;
};
d3.time.weeks = d3_time_range(d3.time.week, function(date) {
  date.setDate(date.getDate() + 7);
}, function(date) {
  return ~~((date - new Date(date.getFullYear(), 0, 1)) / 6048e5);
});

d3.time.weeks.utc = d3_time_range(d3.time.week.utc, function(date) {
  date.setUTCDate(date.getUTCDate() + 7);
}, function(date) {
  return ~~((date - Date.UTC(date.getUTCFullYear(), 0, 1)) / 6048e5);
});
d3.time.month = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

d3.time.month.utc = function(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
};
d3.time.months = d3_time_range(d3.time.month, function(date) {
  date.setMonth(date.getMonth() + 1);
}, function(date) {
  return date.getMonth();
});

d3.time.months.utc = d3_time_range(d3.time.month.utc, function(date) {
  date.setUTCMonth(date.getUTCMonth() + 1);
}, function(date) {
  return date.getUTCMonth();
});
d3.time.year = function(date) {
  return new Date(date.getFullYear(), 0, 1);
};

d3.time.year.utc = function(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
};
d3.time.years = d3_time_range(d3.time.year, function(date) {
  date.setFullYear(date.getFullYear() + 1);
}, function(date) {
  return date.getFullYear();
});

d3.time.years.utc = d3_time_range(d3.time.year.utc, function(date) {
  date.setUTCFullYear(date.getUTCFullYear() + 1);
}, function(date) {
  return date.getUTCFullYear();
});
// TODO nice
function d3_time_scale(linear, methods, format) {

  function scale(x) {
    return linear(x);
  }

  scale.invert = function(x) {
    return d3_time_scaleDate(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
    linear.domain(x);
    return scale;
  };

  scale.ticks = function(m, k) {
    var extent = d3_time_scaleExtent(scale.domain());
    if (typeof m !== "function") {
      var span = extent[1] - extent[0],
          target = span / m,
          i = d3.bisect(d3_time_scaleSteps, target, 1, d3_time_scaleSteps.length - 1);
      if (Math.log(target / d3_time_scaleSteps[i - 1]) < Math.log(d3_time_scaleSteps[i] / target)) --i;
      m = methods[i];
      k = m[1];
      m = m[0];
    }
    return m(extent[0], extent[1], k);
  };

  scale.tickFormat = function() {
    return format;
  };

  scale.copy = function() {
    return d3_time_scale(linear.copy(), methods, format);
  };

  // TOOD expose d3_scale_linear_rebind?
  scale.range = d3.rebind(scale, linear.range);
  scale.rangeRound = d3.rebind(scale, linear.rangeRound);
  scale.interpolate = d3.rebind(scale, linear.interpolate);
  scale.clamp = d3.rebind(scale, linear.clamp);

  return scale;
}

// TODO expose d3_scaleExtent?
function d3_time_scaleExtent(domain) {
  var start = domain[0], stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}

function d3_time_scaleDate(t) {
  return new Date(t);
}

function d3_time_scaleFormat(formats) {
  return function(date) {
    var i = formats.length - 1, f = formats[i];
    while (!f[1](date)) f = formats[--i];
    return f[0](date);
  };
}

var d3_time_scaleSteps = [
  1e3,    // 1-second
  5e3,    // 5-second
  15e3,   // 15-second
  3e4,    // 30-second
  6e4,    // 1-minute
  3e5,    // 5-minute
  9e5,    // 15-minute
  18e5,   // 30-minute
  36e5,   // 1-hour
  108e5,  // 3-hour
  216e5,  // 6-hour
  432e5,  // 12-hour
  864e5,  // 1-day
  1728e5, // 2-day
  6048e5, // 1-week
  1728e6, // 1-month
  7776e6, // 3-month
  31536e6 // 1-year
];

var d3_time_scaleLocalMethods = [
  [d3.time.seconds, 1],
  [d3.time.seconds, 5],
  [d3.time.seconds, 15],
  [d3.time.seconds, 30],
  [d3.time.minutes, 1],
  [d3.time.minutes, 5],
  [d3.time.minutes, 15],
  [d3.time.minutes, 30],
  [d3.time.hours, 1],
  [d3.time.hours, 3],
  [d3.time.hours, 6],
  [d3.time.hours, 12],
  [d3.time.days, 1],
  [d3.time.days, 2],
  [d3.time.weeks, 1],
  [d3.time.months, 1],
  [d3.time.months, 3],
  [d3.time.years, 1]
];

var d3_time_scaleLocalFormats = [
  [d3.time.format("%Y"), function(d) { return true; }],
  [d3.time.format("%B"), function(d) { return d.getMonth(); }],
  [d3.time.format("%b %d"), function(d) { return d.getDate() != 1; }],
  [d3.time.format("%a %d"), function(d) { return d.getDay() && d.getDate() != 1; }],
  [d3.time.format("%I %p"), function(d) { return d.getHours(); }],
  [d3.time.format("%I:%M"), function(d) { return d.getMinutes(); }],
  [d3.time.format(":%S"), function(d) { return d.getSeconds() || d.getMilliseconds(); }]
];

var d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);

d3.time.scale = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
};
var d3_time_scaleUTCMethods = [
  [d3.time.seconds.utc, 1],
  [d3.time.seconds.utc, 5],
  [d3.time.seconds.utc, 15],
  [d3.time.seconds.utc, 30],
  [d3.time.minutes.utc, 1],
  [d3.time.minutes.utc, 5],
  [d3.time.minutes.utc, 15],
  [d3.time.minutes.utc, 30],
  [d3.time.hours.utc, 1],
  [d3.time.hours.utc, 3],
  [d3.time.hours.utc, 6],
  [d3.time.hours.utc, 12],
  [d3.time.days.utc, 1],
  [d3.time.days.utc, 2],
  [d3.time.weeks.utc, 1],
  [d3.time.months.utc, 1],
  [d3.time.months.utc, 3],
  [d3.time.years.utc, 1]
];

var d3_time_scaleUTCFormats = [
  [d3.time.format.utc("%Y"), function(d) { return true; }],
  [d3.time.format.utc("%B"), function(d) { return d.getUTCMonth(); }],
  [d3.time.format.utc("%b %d"), function(d) { return d.getUTCDate() != 1; }],
  [d3.time.format.utc("%a %d"), function(d) { return d.getUTCDay() && d.getUTCDate() != 1; }],
  [d3.time.format.utc("%I %p"), function(d) { return d.getUTCHours(); }],
  [d3.time.format.utc("%I:%M"), function(d) { return d.getUTCMinutes(); }],
  [d3.time.format.utc(":%S"), function(d) { return d.getUTCSeconds() || d.getUTCMilliseconds(); }]
];

var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);

d3.time.scale.utc = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
};
})();