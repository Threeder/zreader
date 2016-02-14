define(function (require) {
  var THREE = require('threejs/build/three');
  var Text2D = require('./Text2DLib/index');
  var renderLoop = require('./renderLoop');
  
  console.log(Text2D);
  renderLoop.run();
});
