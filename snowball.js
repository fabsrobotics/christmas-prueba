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
  //variables
  const snowFlakesArray = [];
  let gravity = world.gravity;
  let innerSmallBallRadius = wBall / 25;


  // snowBall
  const sbRadius = wBall / 3;

  // miniflakes
  let mfArray = [];
  const mfRadius = sbRadius / 27;
  
  let numBalls = 200
  for (let i = 0; i < numBalls; i++) {
    let xPos = wBall / 2 + (innerSmallBallRadius + (sbRadius - innerSmallBallRadius) * i / numBalls ) * Math.cos(i * 8 * Math.PI / numBalls)
    let yPos = hBall / 2 + (innerSmallBallRadius + (sbRadius - innerSmallBallRadius) * i / numBalls ) * Math.sin(i * 8 * Math.PI / numBalls)
    let mfBall = Bodies.circle(
      xPos,
      yPos,
      Common.random(mfRadius, mfRadius / 1.5),
      { render: { fillStyle: Common.choose(['#008f39', '#f80000', '#efb810'])  } }
    );

    mfArray.push(mfBall);
  }
  World.add(world, mfArray);
  let innerBallRadius = wBall / 7.4;
  World.add(
    world,
    Bodies.circle(wBall / 2, hBall / 2, innerBallRadius, {
      isStatic: true,
      render: {
        visible: 0,
      },
    })
  );

  
  World.add(
    world,
    Bodies.circle(wBall / 2, 63 * hBall / 100, innerSmallBallRadius, {
      isStatic: true,
      render: {
        visible: 0,
      },
    })
  );

  let ballRadius = wBall / 2.3;
  let subDivisions = 90;

  for (let i = 0; i < subDivisions; i++) {
    a = Bodies.rectangle(
      wBall / 2 + ballRadius * Math.cos((i * 4 * Math.PI) / 180),
      hBall / 2 + ballRadius * Math.sin((i * 4 * Math.PI) / 180),
      16 * ballRadius / subDivisions,
      16 * ballRadius / subDivisions,
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
    //shake finished rest

    console.log(alphaValue)

    if (!shakeFinished && alphaValue < 1 ){
      alphaValue += 0.05;
	  //gidocument.getElementById('fabsText').innerHTML = '¡Agita!'
      document.getElementById('fabsRobotics').style.color = "rgba(53,53,53,"+alphaValue+")";
    }

    //apply forces to body elements

    valGravityX != undefined
      ? (gravity.x = (valGravityX * -1) / 100)
      : (gravity.x = 0);
    valGravityY != undefined
      ? (gravity.y = valGravityY / 100)
      : (gravity.y = 0.05);

	  if(valForceX < -4 || valForceX > 4 || valForceY < -4 || valForceY > 4) setAlphaValue();
    mfArray.forEach((ball) => {
      if (valForceX > 4) {
        Body.applyForce(
          ball,
          { x: ball.position.x, y: ball.position.y },
          { x: 0.002, y: 0 }
        );
        return;
      } else if (valForceX < -4) {
        Body.applyForce(
          ball,
          { x: ball.position.x, y: ball.position.y },
          { x: -0.002, y: 0 }
        );
        return;
      } else if (valForceY > 4) {
        Body.applyForce(
          ball,
          { x: ball.position.x, y: ball.position.y },
          { x: 0, y: 0.002 }
        );
        return;
      } else if (valForceY < -4) {
        Body.applyForce(
          ball,
          { x: ball.position.x, y: ball.position.y },
          { x: 0, y: -0.002 }
        );
        return;
      }
    });
    //delete elements out of window
    const allBodies = Matter.Composite.allBodies(world);
    allBodies.forEach((element) => {
      if (
        (element.position.x > window.visualViewport.width + 50) ||
        (element.position.x < 0 || element.position.y > hBall)
      ) {
        Matter.Composite.remove(world, element);
        mfArray.splice(element,1)


      }
    });
    //add boddies deleted again inside ball
	if (mfArray.length < numBalls) {
		
		for(let j = 0; j < (numBalls-mfArray.length); j++){
			let mfBall = Bodies.circle(
				wBall / 2 + (innerSmallBallRadius + (sbRadius - innerSmallBallRadius) * j / numBalls ) * Math.cos(j * 8 * Math.PI / numBalls),
				hBall / 2 + (innerSmallBallRadius + (sbRadius - innerSmallBallRadius) * j / numBalls ) * Math.sin(j * 8 * Math.PI / numBalls),
				Common.random(mfRadius, mfRadius / 1.5),
				{ render: { fillStyle: Common.choose(['#008f39', '#f80000', '#efb810']) } }
			);
			mfArray.push(mfBall);
			World.add(world,mfBall);
		}
		//World.add(world,mfArray);
	}

  }, 200);

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: window.visualViewport.width, y: window.visualViewport.height },
  });
}

function setAlphaValue(){
	console.log("setoy aqu")
	alphaValue -= 0.2;
    if(alphaValue <= 0.2){
  	shakeFinished = true;
  	alphaValue = 1.0;
    }
    
	shakeFinished ? document.getElementById('fabsText').innerHTML = '¡Fabs Robotics <br> os desea <br> Felices Fiestas!' : null
    document.getElementById('fabsRobotics').style.color = "rgba(53,53,53,"+alphaValue+")";
}
