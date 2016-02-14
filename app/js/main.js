define(function (require) {
  var THREE = require('threejs/build/three');
  var Text2D = require('./Text2DLib');
  var renderLoop = require('./renderLoop');

  renderLoop.run();
});
