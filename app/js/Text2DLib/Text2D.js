define(function (require, exports, module) {
var textAlign = require('./textAlign'),
    CanvasText = require('./CanvasText');

    function Text2D(text, options) {
      text = text || '';
      options = options || {};
      THREE.Object3D.call(this);

      this._font = options.font || '30px Arial';
      this._fillStyle = options.fillStyle || '#FFFFFF';

      this.canvas = new CanvasText()

      this.align = options.align || textAlign.center
      this.side = options.side || THREE.DoubleSide

      // this._textAlign = options.align || "center"
      // this.anchor = Label.fontAlignAnchor[ this._textAlign ]
      this.antialias = typeof(options.antialias==="undefined") ? true : options.antialias
      this._text = text;
    }

    Text2D.prototype = Object.create(THREE.Object3D.prototype);

    Text2D.prototype.getWidth = function getWidth() {
      return this.canvas.textWidth;
    };

    Text2D.prototype.getHeight = function getHeight() {
      return this.canvas.textWidth;
    };

    Text2D.prototype.getText = function getText() {
      return this._text;
    };

    Text2D.prototype.setText = function setText(value) {
      if (this._text !== value) {
        this._text = value;
        this.updateText();
      }
    };

    Text2D.prototype.getFont = function getFont() {
      return this._font;
    };

    Text2D.prototype.setFont = function setFont(value) {
      if (this._font !== value) {
        this._font = value;
        this.updateText();
      }
    };

    Text2D.prototype.getFillStyle = function getFillStyle() {
      return this._fillStyle;
    };

    Text2D.prototype.setFillStyle = function setFillStyle() {
      if (this._fillStyle !== value) {
        this._fillStyle = value;
        this.updateText();
      }
    };

    Text2D.prototype.updateText = function updateText () {
      this.cleanUp() // cleanup previous texture

      this.canvas.drawText(this._text, {
        font: this._font,
        fillStyle: this._fillStyle
      })

      this.texture = new THREE.Texture(this.canvas.canvas);
      this.texture.needsUpdate = true;
      this.applyAntiAlias()

      if (!this.material) {
        this.material = new THREE.MeshBasicMaterial({ map: this.texture, side: this.side });
        this.material.transparent = true

      } else {
        this.material.map = this.texture
      }

      if (!this.mesh) {
        this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(this.canvas.width, this.canvas.height), this.material);
        this.geometry = this.mesh.geometry
        this.add(this.mesh)
      }

      this.mesh.position.x = ((this.canvas.width/2) - (this.canvas.textWidth/2)) + ((this.canvas.textWidth/2) * this.align.x)
      this.mesh.position.y = (- this.canvas.height/2) + ((this.canvas.textHeight/2) * this.align.y)

      // manually update geometry vertices
      this.geometry.vertices[0].x = this.geometry.vertices[2].x = -this.canvas.width/2
      this.geometry.vertices[1].x = this.geometry.vertices[3].x = this.canvas.width/2
      this.geometry.vertices[0].y = this.geometry.vertices[1].y = this.canvas.height/2
      this.geometry.vertices[2].y = this.geometry.vertices[3].y = -this.canvas.height/2
      this.geometry.verticesNeedUpdate = true
  };

  Text2D.prototype.cleanUp = function cleanup() {
    if (this.texture) {
      this.texture.dispose()
    }
  };

  Text2D.prototype.applyAntiAlias = function applyAntiAlias() {
    if (this.antialias === false) {
      this.texture.magFilter = THREE.NearestFilter
      this.texture.minFilter = THREE.LinearMipMapLinearFilter
    }
  };

  return Text2D;
});
