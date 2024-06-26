//import * as THREE from './modules/three.module.js';


main();

function main() {
    // create context
    const canvas = document.querySelector("#c");
    const gl = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });





    // create camera
    const angleOfView = 55;
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;
    const nearPlane = 0.1;
    const farPlane = 100;
    const camera = new THREE.PerspectiveCamera(
        angleOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );
    camera.position.set(0, 8, 3);

    // create the scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0.3, 0.5, 0.8);
    const fog = new THREE.Fog("grey", 1,90);
    scene.fog = fog;

    // create the cube 

    // Create the Sphere

    // Create the upright plane
    const planeWidth = 5;
    const planeHeight =  5;
    const planeGeometry = new THREE.PlaneGeometry(
        planeWidth,
        planeHeight
    );

    // MATERIALS
    const textureLoader = new THREE.TextureLoader();

    
    const planeTextureMap = textureLoader.load('textures/draftboard.PNG'); //'textures/pebbles.jpg'
    planeTextureMap.wrapS = THREE.RepeatWrapping;
    planeTextureMap.wrapT = THREE.RepeatWrapping;
    planeTextureMap.repeat.set(1, 1);
    //planeTextureMap.magFilter = THREE.NearestFilter;
    planeTextureMap.minFilter = THREE.NearestFilter;
    planeTextureMap.anisotropy = gl.getMaxAnisotropy();
    /*const planeNorm = textureLoader.load('textures/draftboard.PNG'); //
    planeNorm.wrapS = THREE.RepeatWrapping;
    planeNorm.wrapT = THREE.RepeatWrapping;
    planeNorm.minFilter = THREE.NearestFilter;
    planeNorm.repeat.set(1, 1);
    */const planeMaterial = new THREE.MeshStandardMaterial({
        map: planeTextureMap,
        side: THREE.DoubleSide,
        //normalMap: planeNorm 
    });


    //!!!! b)
    var stats = initStats();        //FPS ANZEIGE
    var controls = new function () {
        this.rotationSpeed = 0.02;
    };    
    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5).name('Rotation Cube');
    
    //////////////////////////////////////////
    


    // MESHES


    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI /2;
    //scene.add(plane);

    //LIGHTS
    const color = 0xffffff;
    const intensity = 1.0; //0.7
    const light = new THREE.DirectionalLight(color, intensity);
    light.target = plane;
    light.position.set(0, 30, 30);
    scene.add(light);
    scene.add(light.target);

    const ambientColor = 0xffffff;
    const ambientIntensity = 1.0; //0,2
    const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
    scene.add(ambientLight);


    // attach them here, since appendChild needs to be called first
    var trackballControls = initTrackballControls(camera, gl);
    var clock = new THREE.Clock();


    // DRAW
    function draw(time){
        time *= 0.001;

        trackballControls.update(clock.getDelta());

        if (resizeGLToDisplaySize(gl)) {
            const canvas = gl.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        

        light.position.x = 20*Math.cos;//(time);
        light.position.y = 20*Math.sin;//(time);
        gl.render(scene, camera);
        
        stats.update();

        requestAnimationFrame(draw);
    }


    var loader = new THREE.OBJLoader();

    requestAnimationFrame(draw);
}

// UPDATE RESIZE
function resizeGLToDisplaySize(gl) {
    const canvas = gl.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width != width || canvas.height != height;
    if (needResize) {
        gl.setSize(width, height, false);
    }

    return needResize;
}