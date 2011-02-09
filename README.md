# Inheritance.js #

Inheritance.js is a plugin for the [Prototype Javascript library](http://prototypejs.org/) that provides developers with a complete, unobtrusive, Ruby inspired, classical inheritance model. Using Inheritance.js, developers are given the power to easily define classes, sub-classes, and mix-ins, with a sprinkle of syntax sugar. The process of overriding methods is simplified; Inheritance.js uses a properly scoped parent method that is made available only inside an overriding method. To top it off, Inheritance.js accomplishes all this without adding any additional properties or methods to the developer's instantiated objects.

    Person = Class.extend({
      // adding a mixin
      include: Sortable,

      // initializer function
      initialize: function(name) {
        this.name = name;
      },

      // ... methods ...

      toString: function() {
        return this.name;
      }
    });

    Employee = Class.extend(Person, {
      // adding mixins
      include: [Sortable, OtherModule],

      // initializer function
      initialize: function(name, dept) {
        // call parent function
        this.parent(name);

        // more initialization
        this.dept = dept;
      },

      // ... methods ...

      toString: function() {
        // call parent function
        return this.parent() + ' works in ' + this.dept;
      }
    });

