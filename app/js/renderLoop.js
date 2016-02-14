console.log("ayy lmao");
define(['threejs/build/three'], function (THREE) {
  var mesh, geometry, material;
  var scene, renderer;

  function _init() {

    console.log("ayy lmao");
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

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
