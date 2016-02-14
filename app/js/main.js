define(function (require) {
  var Text2DLib = require('./Text2DLib/index');
  var renderLoop = require('./renderLoop');
  //var ThreeWrapper = require('./StereoEffect');
  //console.log("THREEWRAPPER: ", ThreeWrapper);
  var Text2D = Text2DLib.Text2D;
  var textAlign = Text2DLib.textAlign;
  var text = new Text2D("RIGHT", { align: textAlign.right, font: '30px Arial', fillStyle: '#FFFFFF', antialias: true })
  // scene.add(text)
  // console.log(Text2D);
  text.setText("SOME");
  console.log(text.getText());
  renderLoop.run();
  renderLoop.addText2Scene(text);
});
