
define(['require', 'threejs/build/three'], function (require, THREE) {

  var scene, renderer;
  var effect, camera;

  function addText2Scene(text) {
    scene.add(text);
  }

  function _drawBox(){

    var urls = [
      'Assets/desert_lf.png',
      'Assets/desert_rt.png',
      'Assets/desert_up.png',
      'Assets/desert_dn.png',
      'Assets/desert_ft.png',
      'Assets/desert_bk.png'
    ];

    var cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
    cubemap.format = THREE.RGBFormat;

    var shader = THREE.ShaderLib.cube; // init cube shader from built-in lib
    shader.uniforms.tCube.value = cubemap; // apply textures to shader

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

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    _drawBox();


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    effect = new THREE.CardBoardEffect( renderer );
    effect.setSize(window.innerWidth, window.innerHeight);


    document.body.appendChild(renderer.domElement);


  }

  function _animate() {
    requestAnimationFrame(_animate);

    effect.render(scene, camera);
  }

  function run(){
    _init();
    _animate();
  }

  return {
    run : run,
    addText2Scene
  };
});
