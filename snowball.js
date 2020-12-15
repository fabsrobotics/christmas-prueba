
    function snowBall(){
    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        World = Matter.World,
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
    gravity.y = -0.1
    

    // snowBall
    const sbRadius = wBall/3;
   // const SnowBall = Bodies.circle(w/2,h/2,sbRadius,{isStatic: true})
    //World.add(world,[SnowBall])

    // miniflakes
    let mfArray = []
    const mfRadius = sbRadius/20;
    for(let i = 0; i < 100; i++){
        let mfBall = Bodies.circle(wBall/2+i,hBall/2.9,mfRadius, {render: {fillStyle: "#0000ff",strokeStyle: "#fff",}})


        mfArray.push(mfBall);

    }
    World.add(world,mfArray); 

        let ballRadius =  wBall / 3

        for(let i = 0; i < 90; i++) {
            a = Bodies.rectangle(
                wBall / 2  + ballRadius * Math.cos(i * 4 * Math.PI / 180), 
                hBall / 2 + ballRadius * Math.sin(i * 4 * Math.PI / 180), 
                10, 
                10, 
                {
                    isStatic: true, 
                    angle: Math.PI / 180 * i * 4,
                    render: {
                        fillStyle: "#000",
                        strokeStyle: "#fff",
                        lineWidth: 0,
                        // visible: 0,
                    }
                }
            );
            World.add(world, a);
        }
       

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.visualViewport.width, y: window.visualViewport.height }
    });
    }
  