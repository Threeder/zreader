define(function (require) {
  var THREE = require('threejs/build/three');


  var messages = require('./messages');
  var renderLoop = require('./renderLoop');

  renderLoop.run();

});
