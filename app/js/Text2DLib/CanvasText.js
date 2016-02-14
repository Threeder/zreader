define(function(require, module, exports) {
  var fontHeightCache = {};

  var getWidth = function() {
    return this.canvas.width;
  };

  var getHeight = function() {
    return this.canvas.height;
  };

  var getFontHeight = function(fontStyle) {
    var result = fontHeightCache[fontStyle];

    if (!result){
      var body = document.getElementsByTagName('body')[0];
      var dummy = document.createElement('div');

      var dummyText = document.createTextNode('MÉq');
      dummy.appendChild(dummyText);
      dummy.setAttribute('style', 'font:' + fontStyle + ';position:absolute;top:0;left:0');
      body.appendChild(dummy);
      result = dummy.offsetHeight;

      fontHeightCache[fontStyle] = result;
      body.removeChild(dummy);
    }

    return result;
  };


  var drawText = function(text, ctxOptions) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = ctxOptions.font

    this.textWidth = Math.ceil(this.ctx.measureText(text).width)
    this.textHeight = getFontHeight(this.ctx.font)

    this.canvas.width = THREE.Math.nextPowerOfTwo(this.textWidth)
    this.canvas.height = THREE.Math.nextPowerOfTwo(this.textHeight)

    this.ctx.font = ctxOptions.font
    this.ctx.fillStyle = ctxOptions.fillStyle
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';

    this.ctx.fillText(text, 0, 0);

    return this.canvas;
  };

  return function CanvasText() {
    this.textWidth = null;
    this.textHeight = null;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.getWidth = getWidth.bind(this);
    this.getHeight= getHeight.bind(this);

    this.drawText = drawText.bind(this);
  };
});
