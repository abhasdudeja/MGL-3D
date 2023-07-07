import* as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';
import { DragControls } from './DragControls.js';
import {GLTFLoader} from "./GLTFLoader.js"
import { AxesHelper } from './three.module.js';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.01,1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;

//plane
const plane1 = new THREE.Mesh(
  new THREE.PlaneGeometry(1000,1000),
  new THREE.MeshBasicMaterial({color:'grey'})
);
scene.add(plane1);
plane1.position.set(0,0,0);
plane1.rotateX(-1.55);
//background
var loader = new THREE.TextureLoader();
loader.load("./download.jpg",function(texture){
    scene.background = texture;
});

//plane 2
// const plane2 = new THREE.Mesh(
//     new THREE.PlaneGeometry(500,150),
//     new THREE.MeshBasicMaterial({color:'seagreen'})
//   );
//   scene.add(plane2);
//   plane2.position.set(0,0,30);
//   plane2.rotateX(-1.55);


//gltf loader
// gltf loader
var objects = []; // Array to hold multiple instances of the loaded object
var chargers =[];
var rectangles= [];
var numObjects = 5; // Number of objects on each side
var gap = 40; // Gap between each object
var mainObjectIndex = numObjects; // Index of the main object in the objects array

var loader = new GLTFLoader();
loader.load("gltf/Newbus/NewBus.gltf", function (gltf) {
    var mainObject = gltf.scene.clone(); // Clone the main object
    objects.push(mainObject); // Add the main object to the objects array
    mainObject.position.set(0,0,-35);
    mainObject.scale.set(0.25,0.25,0.25);
    mainObject.rotation.y = Math.PI;
    scene.add(mainObject); // Add the main object to the scene
     // Create a rectangle

// Create the rectangle geometry using EdgesGeometry
const rectWidth = 120;
const rectHeight = 40;
const rectGeometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(rectWidth, rectHeight));

// Create the rectangle mesh using LineSegments
const rectMaterial = new THREE.LineBasicMaterial({ color: 0x000000});
// Loop for creating and positioning rectangles on the left side
for (let i = 0; i <= numObjects; i++) {
    const rectLeft = new THREE.LineSegments(rectGeometry, rectMaterial);
    rectLeft.position.set(-i * gap, -40, 0);
    rectLeft.rotation.z = Math.PI / 2;
    rectLeft.position.x += 25;
    rectangles.push(rectLeft);
    plane1.add(rectLeft);
  }
  
  // Loop for creating and positioning rectangles on the right side
  for (let i = 0; i <= numObjects; i++) {
    const rectRight = new THREE.LineSegments(rectGeometry, rectMaterial);
    rectRight.position.set(i * gap, -40, 0);
    rectRight.rotation.z = Math.PI / 2;
    rectRight.position.x += 25;
    rectangles.push(rectRight);
    plane1.add(rectRight);
  }


    for (let i = 1; i <= numObjects; i++) {
        var objectLeft = gltf.scene.clone(); // Clone the object for the left side
        var objectRight = gltf.scene.clone(); // Clone the object for the right side
        objectLeft.position.set(-i * gap, 0, -35); // Set position for the object on the left side
        objectRight.position.set(i * gap, 0, -35); // Set position for the object on the right side
        objectLeft.scale.set(0.25,0.25,0.25);
        objectLeft.rotation.y = Math.PI;
        objectRight.scale.set(0.25,0.25,0.25);
        objectRight.rotation.y = Math.PI;
        objects.unshift(objectLeft); // Add the object to the beginning of the objects array
        objects.push(objectRight); // Add the object to the end of the objects array

        scene.add(objectLeft); // Add the object to the scene
        scene.add(objectRight); // Add the object to the scene
    }
    
});
loader.load("gltf/Charger/Charger.gltf", function (gltf) {
    var maincharger = gltf.scene.clone();
    chargers.push(maincharger);
    maincharger.position.set(-12,0,0);
    maincharger.scale.set(0.16,0.16,0.16);
    scene.add(maincharger);
    var charger = gltf.scene;
    charger.scale.set(0.16,0.16,0.16);
    for (let i = 1; i <= numObjects; i++) {
        var chargerLeft = charger.clone(); // Clone the charger for the left side
        var chargerRight = charger.clone(); // Clone the charger for the right side
        chargerLeft.position.set(-i * gap - 12, 0, 0); // Set position for the charger on the left side
        chargerRight.position.set(i * gap - 12, 0, 0); // Set position for the charger on the right side
        chargers.unshift(chargerLeft);
        chargers.push(chargerRight);
        
        scene.add(chargerLeft); // Add the charger to the scene
        scene.add(chargerRight); // Add the charger to the scene
    }
}); 

scene.background = new THREE.Color("0xffffff");
const controls = new OrbitControls(camera,renderer.domElement);
//lighting
var light = new THREE.HemisphereLight(0xFFFFFF,0x000000,4);
scene.add(light);



camera.position.set(100,20,300);
function animate()
{
    requestAnimationFrame(animate);    controls.update();
    renderer.render(scene,camera);
}
animate();
