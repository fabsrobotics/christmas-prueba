
    function snowBall(){
    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        World = Matter.World,
        Common = Matter.Common,
        Bodies = Matter.Bodies

    // create engine
    let engine = Engine.create(),
        world = engine.world;
    
    
    //lenght and with
    const wBall = window.visualViewport.width;
    const hBall = window.visualViewport.height;

    // create renderer
    const canvasBall = document.getElementById("canvasBall")
    let render = Render.create({
        element: canvasBall,
        engine: engine,
        options: {
            width: wBall,
            height: hBall,
            wireframes: false,
            background: "#ffffff00"
        }
    });

    Render.run(render);
    

    // create runner
    let runner = Runner.create();
    Runner.run(runner, engine);

    const snowFlakesArray = []
    let gravity = world.gravity;
    //gravity.y = -0.1
    

    // snowBall
    const sbRadius = wBall/3;
   // const SnowBall = Bodies.circle(w/2,h/2,sbRadius,{isStatic: true})
    //World.add(world,[SnowBall])

    // miniflakes
    let mfArray = []
    const mfRadius = sbRadius/20;
    for(let i = 0; i < 200; i++){
        let mfBall = Bodies.circle(wBall/2+i, hBall / 2 + 90 * Math.sin(i * 4 * Math.PI / 180),Common.random(3, 7), {render: {fillStyle: "#fff", strokeStyle: "#fff",}})


        mfArray.push(mfBall);

    }
    World.add(world,mfArray); 
    World.add(world, Bodies.circle(wBall/2, hBall/2, 100, 
        {
            isStatic:true,
            render:{
                visible: 1
            }
    }))

        let ballRadius =  wBall / 2.7

        for(let i = 0; i < 90; i++) {
            a = Bodies.rectangle(
                wBall / 2  + ballRadius * Math.cos(i * 4 * Math.PI / 180), 
                hBall / 2 + ballRadius * Math.sin(i * 4 * Math.PI / 180), 
                20, 
                20, 
                {
                    isStatic: true, 
                    angle: Math.PI / 180 * i * 4,
                    render: {
                        fillStyle: "#000",
                        strokeStyle: "#fff",
                        lineWidth: 0,
                         //visible: 0,
                    }
                }
            );
            World.add(world, a);
        }

         //add gyro control
    if (typeof window !== 'undefined') {
        let updateGravity = function(event) {
            let orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0,
                gravity = engine.world.gravity;

            if (orientation === 0) {
                gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
                gravity.y = Common.clamp(event.beta, -90, 90) / 90;
                console.log(gravity.x, gravity.y)
            } else if (orientation === 180) {
                gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
                gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
                console.log(gravity.x, gravity.y)
            } else if (orientation === 90) {
                gravity.x = Common.clamp(event.beta, -90, 90) / 90;
                gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
                console.log(gravity.x, gravity.y)
            } else if (orientation === -90) {
                gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
                gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
                console.log(gravity.x, gravity.y)
            }
        };

        window.addEventListener('deviceorientation', updateGravity);
    }
       

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.visualViewport.width, y: window.visualViewport.height }
    });
    }
  