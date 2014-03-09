var address, assert, kamakura, km;

kamakura = require("kamakurajs");
address = require("./server")();

var url = "http://" + address.address + ":" + address.port + '/architecture-examples/backbone/';
//var url = "http://" + address.address + ":" + address.port + '/architecture-examples/angularjs/';

assert = require("chai").assert;
km = kamakura.create({
  okProc: assert.ok
});

describe("ToDoMVC", function() {
  this.timeout(10000);

  beforeEach(function(done){
    km.run(function() {
      km.goto(url);
      km.forceDisplayInlineBlockMode('.destroy');
      removeAllItems();
      done();
    });
  });
  
  function removeAllItems() {
    while (countItem()) {
      removeItem();
    }
  }
  
  function countCompleted() {
    return km.findAll('.toggle:checked').getCount();
  }
  
  function countItem() {
    return km.findAll('#todo-list li').getCount();
  }

  function countItemByLabel() {
    if (km.find("#footer").getCss('display') == 'none') {
      return 0;
    } else {
      return parseInt(km.find('#todo-count strong').getText(), 10);
    }
  }
  
  function removeItem() {
    var count = countItem();
    km.find("button.destroy").click();
    assert.equal(countItem(), count - 1);
  }

  function addItem() {
    var text = "Create great test framework";
    var count = countItem();
    km.find("#new-todo").sendKeys(text + "\n");
    km.find('#todo-list .view label').shouldContainText(text);
    assert.equal(countItem(), count + 1);
  }
  
  function makeCompleted() {
    var count = countItemByLabel();
    var completedCound = countCompleted();
    km.find('.toggle').click();
    assert.equal(countItemByLabel(), count - 1);
    assert.equal(countCompleted(), completedCound + 1);
  }
  
  function clearCompleted() {
    var count = countItem();
    var completedCound = countCompleted();
    km.find('#clear-completed').click();
    assert.equal(countItem(), count - completedCound);
    assert.equal(countCompleted(), 0);
  }
  
  it('should add item', function(done) {
    km.run(function(next) {
      addItem();
      done();
    });
  });

  it('should remove item', function(done) {
    km.run(function(next) {
      addItem();
      removeItem();
      done();
    });
  });

  it('should make item completed', function(done) {
    km.run(function(next) {
      addItem();
      makeCompleted();
      clearCompleted();
      done();
    });
  });
});
