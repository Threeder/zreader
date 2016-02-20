define(function (require) {
  (function _decorateThree () {
    require('./OrbitControls')();
    require('./DeviceOrientationControls')();
  })();
  THREE.CardBoardEffect = require('./CardBoardEffect');
  //var Text2D = require('./Text2DLib/index');
  var renderLoop = require('./renderLoop');
  renderLoop.run();
});
