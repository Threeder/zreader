define(function (require) {
  (function _decorateThree () {
    require('./StereoEffect')();
    require('./OrbitControls')();
    require('./DeviceOrientationControls')();
  })();
  var Text2D = require('./Text2DLib/index');
  var renderLoop = require('./renderLoop');
  console.log(Text2D);
  renderLoop.run();
  renderLoop.addText2Scene(text);
});
