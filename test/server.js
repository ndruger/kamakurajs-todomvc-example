(function() {
  "use strict";
  var express, server;

  express = require("express");

  server = express();

  server.configure(function() {
    return server.use(express["static"](__dirname + "/../todomvc"));
  });

  module.exports = function(opt_port) {
    return server.listen(opt_port).address();
  };

}).call(this);
