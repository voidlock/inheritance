var Person = Class.define({
  include: [ Comparable, Loggable ],
  
  self: {
    
  }
  
  initialize: function() {
    // does some stuff
  }
  
  // ...
});

var Employee = Class.define({

  // parent class
  extend: Person,

})

var Person = Class.create({
  
  // class declaration
  self: {
    // class method
    find: function(name) {
      return this.population.find(function(p) {
        return p.name == name;
      });
    },
    
    // class attribute
    population: []
  }
  
  // instance declaration
  
  // mixins
  include: [ Comparable, Loggable ]
  
  initialize: function(name) {
    this.name = name;
    // accessing class from instance
    this.constructor.population.push(this);
  },
  
  introduce: function() {
    return "My name is " + this.name;
  }
  
});

// We extend Person class
var Employee = Class.create(Person, {
  initialize: function(name, salary) {
    // call the parent initialize method
    this.callSuper('initialize', name);
    this.salary = salary;
  },
 
  introduce: function() {
    return this.callSuper('introduce') + " and I earn " + this.salary;
  }
});

var jack = new Person('Jack');
var billy = new Employee('Billy', 2000);

jack.introduce();
// -> "My name is Jack"

billy.introduce();
// -> "My name is Billy and I earn 2000"

Person.find('Jack').name;
// -> 'Jack'

Person.find('Billy');
// -> null

Employee.find('Billy').name;
// -> 'Billy'