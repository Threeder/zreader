
define(['require', 'threejs/build/three'], function (require, THREE) {
  CardboardEffect = function ( renderer ) {

    var _camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

    var _scene = new THREE.Scene();

    var _stereo = new THREE.StereoCamera();
    _stereo.aspect = 0.5;

    var _params = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

    var _renderTarget = new THREE.WebGLRenderTarget( 512, 512, _params );
    _renderTarget.scissorTest = true;

    // Distortion Mesh ported from:
    // https://github.com/borismus/webvr-boilerplate/blob/master/src/distortion/barrel-distortion-fragment.js

    var distortion = new THREE.Vector2( 0.441, 0.156 );

    var geometry = new THREE.PlaneBufferGeometry( 1, 1, 10, 20 ).removeAttribute( 'normal' ).toNonIndexed();

    var positions = geometry.attributes.position.array;
    var uvs = geometry.attributes.uv.array;

    // duplicate

    var positions2 = new Float32Array( positions.length * 2 );
    positions2.set( positions );
    positions2.set( positions, positions.length );

    var uvs2 = new Float32Array( uvs.length * 2 );
    uvs2.set( uvs );
    uvs2.set( uvs, uvs.length );

    var vector = new THREE.Vector2();
    var length = positions.length / 3;

    for ( var i = 0, l = positions2.length / 3; i < l; i ++ ) {

      vector.x = positions2[ i * 3 + 0 ];
      vector.y = positions2[ i * 3 + 1 ];

      var dot = vector.dot( vector );
      var scalar = 1.5 + ( distortion.x + distortion.y * dot ) * dot;

      var offset = i < length ? 0 : 1;

      positions2[ i * 3 + 0 ] = ( vector.x / scalar ) * 1.5 - 0.5 + offset;
      positions2[ i * 3 + 1 ] = ( vector.y / scalar ) * 3.0;

      uvs2[ i * 2 ] = ( uvs2[ i * 2 ] + offset ) * 0.5;

    }

    geometry.attributes.position.array = positions2;
    geometry.attributes.uv.array = uvs2;

    //

    // var material = new THREE.MeshBasicMaterial( { wireframe: true } );
    var material = new THREE.MeshBasicMaterial( { map: _renderTarget } );
    var mesh = new THREE.Mesh( geometry, material );
    _scene.add( mesh );

    //

    this.setSize = function ( width, height ) {

      _renderTarget.setSize( width, height );

      renderer.setSize( width, height );

    };

    this.render = function ( scene, camera ) {

      scene.updateMatrixWorld();

      if ( camera.parent === null ) camera.updateMatrixWorld();

      _stereo.update( camera );

      var width = _renderTarget.width / 2;
      var height = _renderTarget.height;

      _renderTarget.scissor.set( 0, 0, width, height );
      _renderTarget.viewport.set( 0, 0, width, height );
      renderer.render( scene, _stereo.cameraL, _renderTarget );

      _renderTarget.scissor.set( width, 0, width, height );
      _renderTarget.viewport.set( width, 0, width, height );
      renderer.render( scene, _stereo.cameraR, _renderTarget );

      renderer.render( _scene, _camera );


    };

  };


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

    console.log("ayy lmao");
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    _drawBox();


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect = new CardboardEffect( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild(renderer.domElement);


  }

  function _animate() {
    requestAnimationFrame(_animate);

    camera.rotation.x += 0.001;
    camera.rotation.y += 0.002;

    effect.render(scene, camera);
  }

  function run(){
    _init();
    _animate();
  }

  return {
    run : run
  };
});
