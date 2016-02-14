require({
  baseUrl: 'bower_components',
  // three.js should have UMD support soon, but it currently does not
  shim: { 'threejs/build/three': { exports: 'THREE' } }
}, [
  'threejs/build/three'
], function(THREE) {

  var scene, camera, renderer;
  var geometry, material, mesh;

  init();
  animate();

  function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    geometry = new THREE.BoxGeometry( 200, 200, 200 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

  }

  function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

  }

});