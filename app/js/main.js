define(function (require) {
  var Text2D = require('./Text2DLib/index');
  var renderLoop = require('./renderLoop');
  
  console.log(Text2D);
  renderLoop.run();
});
