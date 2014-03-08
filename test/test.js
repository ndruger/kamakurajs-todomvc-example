var address, assert, kamakura, km;

kamakura = require("kamakurajs");
address = require("./server")();

var url = "http://" + address.address + ":" + address.port + '/architecture-examples/backbone/';

assert = require("chai").assert;
km = kamakura.create({
  okProc: assert.ok
});

describe("ToDoMVC", function() {
  this.timeout(100000);

  describe("ToDoMVC", function() {
    return it('should add todo', function(done) {
      return km.run((function() {
        return function(next) {
          km.goto(url);

          var text = "Create great test framework";
          km.find("#new-todo").sendKeys(text + "\n");
          km.find('#todo-list .view label').containsText(text);
          km.find('#todo-count strong').containsText('1');
          return done();
        };
      })(this));
    });
  });
});
