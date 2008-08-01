<%= include 'HEADER' %>

<%= include 'class.js' %>

// finally remap Class.create for backward compatability with prototype
Class.create = function() {
  return Class.extend.apply(this, arguments);
};

<%= include 'FOOTER' %>
