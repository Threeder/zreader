
define(['require', 'threejs/build/three'], function (require, THREE) {

  var scene, renderer;
  var effect, camera;

  function addText2Scene(text) {
// create a canvas element
  var canvas1 = document.createElement('canvas');
  var context1 = canvas1.getContext('2d');
  context1.font = "Bold 40px Arial";
  context1.fillStyle = "rgba(255,0,0,0.95)";
    context1.fillText('Hello, world!', 0, 50);
    
  // canvas contents will be used for a texture
  var texture1 = new THREE.Texture(canvas1) 
  texture1.needsUpdate = true;
      
    var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
    material1.transparent = true;

    var mesh1 = new THREE.Mesh(
        new THREE.PlaneGeometry(canvas1.width, canvas1.height),
        material1
      );
  mesh1.position.set(0,50,0);
  scene.add( mesh1 );


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
addText2Scene("d");


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
