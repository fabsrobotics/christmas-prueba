

function gravity(){
    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Svg = Matter.Svg

    // create engine
    let engine = Engine.create(),
        world = engine.world;
      
    
    //lenght and with
    const w = window.visualViewport.width;
    const h = window.visualViewport.height;

    // create renderer
    const canvasSnow = document.getElementById("canvasSnow")
    let render = Render.create({
        element: canvasSnow,
        engine: engine,
        options: {
            width: w,
            height: h,
            wireframes: false,
            background: "#ffffff00"
        }
    });

    Render.run(render);
    

    // create runner
    let runner = Runner.create();
    Runner.run(runner, engine);

    //const snowFlakesArray = []
    let gravity = engine.world.gravity;

    // snowBall
   // const sbRadius = w/3;
   // const SnowBall = Bodies.circle(w/2,h/2,sbRadius,{isStatic: true})
    //World.add(world,[SnowBall])

    // miniflakes
    // let mfArray = []
    // const mfRadius = sbRadius/20;
    // for(let i = 0; i < 100; i++){
    //     let mfBall = Bodies.circle(w/2+i,h/2.9,mfRadius, {render: {fillStyle: "#0000ff",strokeStyle: "#fff",}})


    //     mfArray.push(mfBall);

    // }
    // World.add(world,mfArray); 

        let ballRadius =  w / 2.7

        for(let i = 0; i < 90; i++) {
            a = Bodies.rectangle(
                w / 2  + ballRadius * Math.cos(i * 4 * Math.PI / 180), 
                h / 2 + ballRadius * Math.sin(i * 4 * Math.PI / 180), 
                15, 
                15, 
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
            World.add(engine.world, a);
        }
       

   

   
    setInterval(() => {
        

        gravity.x = Common.random(-0.1, 0.1)
        gravity.y = 0.2
        
        World.add(world, [
            Bodies.circle(Common.random(20, window.visualViewport.width), -10, Common.random(3,7), {render: {fillStyle: "#fff", strokeStyle: "#fff",}}),
            
            Bodies.circle(Common.random(20, window.visualViewport.width), -10, Common.random(3,7), {render: {fillStyle: "#fff", strokeStyle: "#fff",}}),
            
        ]);
        
        const allBodies = Matter.Composite.allBodies(world)
        allBodies.forEach(element => {
            

            if(element.position.x >( window.visualViewport.width + 50) | element.position.x < 0) {
                Matter.Composite.remove(world, element)
            }
            
            
            
        });

        
    }, 400);



   
   



    World.add(world, [
        //snowFlakesArray,
        //Bodies.rectangle(0, 0, window.visualViewport.width*2, 20, { isStatic: true }),
        //Bodies.rectangle(0, 0, 20, window.visualViewport.height*2, { isStatic: true }),
        //Bodies.rectangle(window.visualViewport.width, window.visualViewport.height/2, 20, window.visualViewport.height, { isStatic: true }),
        Bodies.rectangle(0, window.visualViewport.height, window.visualViewport.width*2, 20, { isStatic: true }),
        //stack,
    ]);
   
    

    // add gyro control
    // if (typeof window !== 'undefined') {
    //     let updateGravity = function(event) {
    //         let orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0,
    //             gravity = engine.world.gravity;

    //         if (orientation === 0) {
    //             gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
    //             gravity.y = Common.clamp(event.beta, -90, 90) / 90;
    //         } else if (orientation === 180) {
    //             gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
    //             gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
    //         } else if (orientation === 90) {
    //             gravity.x = Common.clamp(event.beta, -90, 90) / 90;
    //             gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
    //         } else if (orientation === -90) {
    //             gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
    //             gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
    //         }
    //     };

    //     window.addEventListener('deviceorientation', updateGravity);
    // }

    // add mouse control
    let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.visualViewport.width, y: window.visualViewport.height }
    });

    // context for MatterTools.Demo
    // return {
    //     engine: engine,
    //     runner: runner,
    //     render: render,
    //     canvas: render.canvas,
    //     stop: function() {
    //         Matter.Render.stop(render);
    //         Matter.Runner.stop(runner);
    //         if (typeof window !== 'undefined') {
    //             window.removeEventListener('deviceorientation', updateGravity);
    //         }
    //     }
    // };

}
