console.log("ayy lmao");
define(['threejs/build/three'], function (THREE) {
  var scene, renderer;

  function _drawBox()
  {
    var geometry = new THREE.BoxGeometry(200, 200, 200);
    var material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    return mesh = new THREE.Mesh(geometry, material);
  }

  function _init() {

    console.log("ayy lmao");
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    var box = _drawBox();

    scene.add(box);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

  }

  function _animate() {
    requestAnimationFrame(_animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

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
