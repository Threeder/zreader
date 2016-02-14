define(['threejs/build/three'], function (THREE) {
  return {
    getHello: function () {
      console.log("THREE: ", THREE);
      return 'Hello World';
    }
  };
});
