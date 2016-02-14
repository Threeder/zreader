define(['require', 'threejs/build/three', './StereoEffect', './OrbitControls.js', './DeviceOrientationControls'], function (require, THREE) {
  var scene, renderer;

  function _drawBox(){

    var urls = [
    "Assets/desert_lf.png",
    "Assets/desert_rt.png",
    "Assets/desert_up.png",
    "Assets/desert_dn.png",
    "Assets/desert_ft.png",
    "Assets/desert_bk.png"
    ];

    var cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
    cubemap.format = THREE.RGBFormat;

    var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
    shader.uniforms['tCube'].value = cubemap; // apply textures to shader

    // create shader material
    var skyBoxMaterial = new THREE.ShaderMaterial( {
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });

    // create skybox mesh
    var skybox = new THREE.Mesh(
      new THREE.CubeGeometry(10000, 10000, 10000),
      skyBoxMaterial
    );

    scene.add(skybox);

  }
  function _init() {
    var ThreeWrapper = require('./StereoEffect');
    var ThreeOrbitDecorator = require('./OrbitControls.js');
    var ThreeDeviceControlsDecorator = require('./DeviceOrientationControls')
    ThreeWrapper();
    ThreeOrbitDecorator();
    ThreeDeviceControlsDecorator();
    console.log("THREE.StereoEffect: ", THREE.StereoEffect);
    console.log("THREE.OrbitControls: ", THREE.OrbitControls);
    console.log("THREE.devicectrl: ", THREE.DeviceOrientationControls);
    console.log("ayy lmao");
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    _drawBox();


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

  }

  function _animate() {
    requestAnimationFrame(_animate);

    camera.rotation.x += 0.001;
    camera.rotation.y += 0.002;

    renderer.render(scene, camera);
  }

  function run(){
    _init();
    _animate();
  }

  return {
    run : run
  };
});
