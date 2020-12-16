function snowBall() {
  let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Common = Matter.Common,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

  // create engine
  let engine = Engine.create(),
    world = engine.world;

  //lenght and with
  const wBall = window.visualViewport.width;
  const hBall = window.visualViewport.height;

  // create renderer
  const canvasBall = document.getElementById("canvasBall");
  let render = Render.create({
    element: canvasBall,
    engine: engine,
    options: {
      width: wBall,
      height: hBall,
      wireframes: false,
      background: "#ffffff00",
    },
  });

  Render.run(render);

  // create runner
  let runner = Runner.create();
  Runner.run(runner, engine);

  const snowFlakesArray = [];
  let gravity = world.gravity;

  // snowBall
  const sbRadius = wBall / 3;

  // miniflakes
  let mfArray = [];
  const mfRadius = sbRadius / 30;
  for (let i = 0; i < 200; i++) {
    let mfBall = Bodies.circle(
      wBall / 2,
      hBall / 2 + 90 * Math.sin((i * 4 * Math.PI) / 180),
      Common.random(mfRadius, mfRadius / 1.3),
      { render: { fillStyle: "#fff", strokeStyle: "#fff" } }
    );

    mfArray.push(mfBall);
  }
  World.add(world, mfArray);
  let innerBallRadius = wBall / 8.5;
  World.add(
    world,
    Bodies.circle(wBall / 2, hBall / 2 - 35, innerBallRadius, {
      isStatic: true,
      render: {
        visible: 0,
      },
    })
  );

  let ballRadius = wBall / 2.9;

  for (let i = 0; i < 90; i++) {
    a = Bodies.rectangle(
      wBall / 2 + ballRadius * Math.cos((i * 4 * Math.PI) / 180),
      hBall / 2 - 35 + ballRadius * Math.sin((i * 4 * Math.PI) / 180),
      20,
      20,
      {
        isStatic: true,
        angle: (Math.PI / 180) * i * 4,
        render: {
          fillStyle: "#000",
          strokeStyle: "#fff",
          lineWidth: 0,
          visible: 0,
        },
      }
    );
    World.add(world, a);
  }

  setInterval(() => {
    console.log(valGravityX, valGravityY);
    valGravityX != undefined
      ? (gravity.x = (valGravityX * -1) / 100)
      : (gravity.x = 0);
    valGravityY != undefined
      ? (gravity.y = valGravityY / 100)
      : (gravity.y = 0.05);

    mfArray.forEach((ball) => {
      if (valForceX > 3) {
        Body.applyForce(
          ball,
          { x: ball.position.x, y: ball.position.y },
          { x: 0.002, y: 0 }
        );
        return;
      } else if (valForceX < -3) {
        Body.applyForce(
          ball,
          { x: ball.position.x, y: ball.position.y },
          { x: -0.002, y: 0 }
        );
        return;
      } else if (valForceY > 3) {
        Body.applyForce(
          ball,
          { x: ball.position.x, y: ball.position.y },
          { x: 0, y: 0.002 }
        );
        return;
      } else if (valForceY < -3) {
        Body.applyForce(
          ball,
          { x: ball.position.x, y: ball.position.y },
          { x: 0, y: -0.002 }
        );
        return;
      }
    });
  }, 200);

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: window.visualViewport.width, y: window.visualViewport.height },
  });
}
