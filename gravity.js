function gravity() {
  let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Svg = Matter.Svg;

  // create engine
  let engine = Engine.create(),
    world = engine.world;

  //lenght and with
  const w = window.visualViewport.width;
  const h = window.visualViewport.height;

  // create renderer
  const canvasSnow = document.getElementById("canvasSnow");
  let render = Render.create({
    element: canvasSnow,
    engine: engine,
    options: {
      width: w,
      height: h,
      wireframes: false,
      background: "#ffffff00",
    },
  });

  Render.run(render);

  // create runner
  let runner = Runner.create();
  Runner.run(runner, engine);

  let gravity = engine.world.gravity;

  // snowBall
  const sbRadius = w / 3;
  const mfRadius = sbRadius / 30;

  let ballRadius = w / 2.9;

  World.add(engine.world, [Bodies.circle(w/2, h/2, sbRadius, {isStatic:true, render: {strokeStyle: "#fff", visible: 0}})]);
 

  setInterval(() => {
    gravity.x = Common.random(-0.1, 0.1);
    gravity.y = 0.3;

    World.add(world, [
      Bodies.circle(
        Common.random(20, window.visualViewport.width),
        -10,
        Common.random(mfRadius, mfRadius / 1.5),
        { render: { fillStyle: "#fff", strokeStyle: "#fff" } }
      ),

      Bodies.circle(
        Common.random(20, window.visualViewport.width),
        -10,
        Common.random(mfRadius, mfRadius / 1.5),
        { render: { fillStyle: "#fff", strokeStyle: "#fff" } }
      ),
    ]);

    const allBodies = Matter.Composite.allBodies(world);
    allBodies.forEach((element) => {
      if (
        (element.position.x > window.visualViewport.width + 50) |
        (element.position.x < 0)
      ) {
        Matter.Composite.remove(world, element);
      }
    });
  }, 400);

  World.add(world, [
    Bodies.rectangle(0, h, w * 2, 20,
      { isStatic: true }
    )
  ]);

  // add mouse control
 

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: window.visualViewport.width, y: window.visualViewport.height },
  });
}
