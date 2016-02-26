define(function (require) {
  (function _decorateThree () {
    require('./DeviceOrientationControls')();
  })();
  THREE.CardBoardEffect = require('./CardBoardEffect');
  var renderLoop = require('./renderLoop');
  renderLoop.run();
});
