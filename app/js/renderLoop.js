
define(['require', 'threejs/build/three'], function (require, THREE) {

  var _scene, _renderer;
  var _effect, _camera;


  function _drawText(TextList) {
    // create a canvas element
    var canvas, context,texture;
    var material, mesh;

    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    context.font = 'Bold 40px Arial';
    context.fillStyle = 'rgba(255,255,255,0.95)';
    for (var i = 0; i < TextList.length ; i++) {
      context.fillText(TextList[i] ,0,  (i+1)*40);
    }

    // canvas contents will be used for a texture
    texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    material = new THREE.MeshBasicMaterial( {map: texture, side:THREE.DoubleSide } );
    material.transparent = true;

    mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(canvas.width, canvas.height),
      material
    );
    mesh.position.set(0,50,0);
    _scene.add( mesh );
  }

  function _drawBox(){
    var urls, cubemap, shader;
    var skyBoxMaterial, skybox;

    urls = [
      'Assets/desert_lf.png',
      'Assets/desert_rt.png',
      'Assets/desert_up.png',
      'Assets/desert_dn.png',
      'Assets/desert_ft.png',
      'Assets/desert_bk.png'
    ];

    cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
    cubemap.format = THREE.RGBFormat;

    shader = THREE.ShaderLib.cube; // init cube shader from built-in lib
    shader.uniforms.tCube.value = cubemap; // apply textures to shader

    // create shader material
    skyBoxMaterial = new THREE.ShaderMaterial( {
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });

    // create skybox mesh
    skybox = new THREE.Mesh(
      new THREE.CubeGeometry(10000, 10000, 10000),
      skyBoxMaterial
    );

    _scene.add(skybox);
  }
  function _init() {
    var controls, textList;

    _scene = new THREE.Scene();

    _camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    _camera.position.z = 1000;

    _drawBox();

    textList = ['hello', 'This'];
    _drawText(textList);


    _renderer = new THREE.WebGLRenderer();
    _renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new THREE.OrbitControls( _camera, _renderer.domElement );

    _effect = new THREE.CardBoardEffect( _renderer );
    _effect.setSize(window.innerWidth, window.innerHeight);


    document.body.appendChild(_renderer.domElement);


  }

  function _animate() {
    requestAnimationFrame(_animate);

    _effect.render(_scene, _camera);
  }

  function run(){
    _init();
    _animate();
  }

  return {
    run : run
  };
});
