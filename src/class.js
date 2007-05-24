var Class = {
  extend: function(parent, def) {
    if (arguments.length == 1) { def = parent; parent = null; }
    var func = function() {
      if (!Class.extending) this.initialize.apply(this, arguments);
    };
    if (typeof(parent) == 'function') {
      Class.extending = true;
      func.prototype = new parent();
      delete Class.extending;
    }
    var mixins = [];
    if (def && def.include) {
      if (def.include.reverse) {
        // methods defined in later mixins should override prior
        mixins = mixins.concat(def.include.reverse());
      } else {
        mixins.push(def.include);
      }
      delete def.include; // clean syntax sugar
    }
    if (def) Class.inherit(func.prototype, def);
    for (var i = 0; (mixin = mixins[i]); i++) {
      Class.mixin(func.prototype, mixin);
    }
    return func;
  },
  mixin: function (dest, src, clobber) {
    clobber = clobber || false;
    if (typeof(src) != 'undefined' && src !== null) {
      for (var prop in src) {
        if (clobber || (!dest[prop] && typeof(src[prop]) == 'function')) {
          dest[prop] = src[prop];
        }
      }
    }
    return dest;
  },
  inherit: function(dest, src, fname) {
    if (arguments.length == 3) {
      var ancestor = dest[fname], descendent = src[fname], method = descendent;
      descendent = function() {
        var ref = this.parent; this.parent = ancestor;
        var result = method.apply(this, arguments);
        ref ? this.parent = ref : delete this.parent;
        return result;
      };
      // mask the underlying method
      descendent.valueOf = function() { return method; };
      descendent.toString = function() { return method.toString(); };
      dest[fname] = descendent;
    } else {
      for (var prop in src) {
        if (dest[prop] && typeof(src[prop]) == 'function') {
          Class.inherit(dest, src, prop);
        } else {
          dest[prop] = src[prop];
        }
      }
    }
    return dest;
  },

  singleton: function() {
    var args = arguments;
    if (args.length == 2 && args[0].constructor && args[0].constructor._class_) {
      // we're extending a singleton swap it out for it's class
      args[0] = args[0].constructor._class_;
    }

    // store instance in a private variable
    var instance = false;
    var singleton = {
      getInstance: function () {
        if (instance) return instance;
        return instance = new this.constructor._class_;
      }
    };

    // hide my class in the constructor reference
    singleton.constructor._class_ = Class.extend.apply(args.callee, args);
    return singleton;
  }
};