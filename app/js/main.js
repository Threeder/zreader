define(function (require) {
  var Text2D = require('./Text2DLib/index');
  var renderLoop = require('./renderLoop');
  //var ThreeWrapper = require('./StereoEffect');
  //console.log("THREEWRAPPER: ", ThreeWrapper);
  console.log(Text2D);
  renderLoop.run();
});
