import * as BABYLON from 'babylonjs';

document.addEventListener('DOMContentLoaded', function () {
  // Get the canvas DOM element
  const canvas = document.getElementById(
    'renderCanvas'
  ) as HTMLCanvasElement;

  const paintCanvas = document.getElementById(
    'paintCanvas'
  ) as HTMLCanvasElement;

  if (!canvas) return;

  canvas.width = 400;
  canvas.height = 400;
  // Load the 3D engine
  const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });
  // CreateScene function that creates and return the scene
  const createScene = function () {
    // Create a basic BJS Scene object
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      -Math.PI / 2,
      Math.PI / 2.5,
      3,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );

    // Set limit camera zoom
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 30;
    camera.radius = 10;
    camera.wheelPrecision = 10;
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    const light = new BABYLON.HemisphericLight(
      'light',
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    light.specular = new BABYLON.Color3(0, 0, 0);

    // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    const sphere = BABYLON.MeshBuilder.CreateSphere(
      'sphere1',
      {
        segments: 16,
        diameter: 2,
      },
      scene
    );

    const sphereTwo = BABYLON.MeshBuilder.CreateSphere(
      'sphere2',
      {
        segments: 16,
        diameter: 2,
      },
      scene
    );

    sphereTwo.position.y = -1;
    // const dynamicTexture = new BABYLON.DynamicTexture(
    //   'dynamic texture',
    //   paintCanvas,
    //   scene
    // );

    // const materialGround = new BABYLON.StandardMaterial('Mat', scene);
    // materialGround.diffuseTexture = dynamicTexture;
    // sphere.material = materialGround;
    // Move the sphere upward 1/2 of its height
    sphere.position.y = 1;

    // Return the created scene
    return { scene };
  };
  // call the createScene function
  const { scene } = createScene();
  // run the render loop
  engine.runRenderLoop(function () {
    scene.render();
    // dynamicTexture.update();
  });
  // the canvas/window resize event handler
  window.addEventListener('resize', function () {
    engine.resize();
  });
});
