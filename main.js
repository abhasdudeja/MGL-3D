import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from "./GLTFLoader.js"
// import { AxesHelper } from './three.module.js';
import { FirstPersonControls } from './FirstPersonControls.js';

let vehicles;
let isLoadObjectsClicked = true; // Flag to indicate which button was clicked

// Get the modal element and buttons
const modal = document.getElementById('myModal');
const loadObjectsBtn1 = document.getElementById('loadObjectsBtn');
const newlayoutBtn1 = document.getElementById('newlayoutBtn');
const closeBtn = document.getElementsByClassName('close')[0];

// Function to handle the modal display
function showModal() {
  modal.style.display = 'block';
}

// Function to handle the form submission
function handleSubmit() {
  const inputField = document.getElementById('numVehicles');
  const newVehicles = parseInt(inputField.value);

  // Validate if the input is a number greater than 0
  if (!isNaN(newVehicles) && newVehicles > 0) {
    vehicles = newVehicles;
    // Calculate the remainder
    // const remainder = vehicles % 10;

    // Display the remainder in the modal content
    // const remainderText = document.getElementById('remainderText');
    // remainderText.textContent = `Remainder: ${remainder}`;
    // Call the appropriate function based on the selected layout
    if (isLoadObjectsClicked) {
      removeAllChildren();
      loadObjects(vehicles);
      
    } else {
      removeAllChildren();
      newlayout(vehicles);
      
    }

    // Close the modal
    modal.style.display = 'none';
  }
}

// Attach event listeners to the buttons and close button
loadObjectsBtn1.addEventListener('click', () => {
  showModal();
  isLoadObjectsClicked = true; // Set the flag to true for loadObjects
});

newlayoutBtn1.addEventListener('click', () => {
  showModal();
  isLoadObjectsClicked = false; // Set the flag to false for newlayout
});

document.getElementById('submitBtn').addEventListener('click', handleSubmit);
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

let onegroup;
// Create buttons
// const loadObjectsBtn = document.createElement('button');
// loadObjectsBtn.textContent = 'Default Layout';
// loadObjectsBtn.addEventListener('click', () => {
//   removeAllChildren();
//   loadObjects();
// });

// const newlayoutBtn = document.createElement('button');
// newlayoutBtn.textContent = '5 X 2 Layout';
// newlayoutBtn.addEventListener('click', () => {
//   removeAllChildren();
//   newlayout();
// });


// // Append buttons to the HTML body
// document.body.appendChild(loadObjectsBtn);
// document.body.appendChild(newlayoutBtn);

function removeAllChildren() {
  // Remove objects except for the plane and lighting
  const objectsToRemove = scene.children.filter(
    (child) =>  child !== light 
  );
  objectsToRemove.forEach((object) => scene.remove(object));
}
//Default layout function 
function loadObjects() {
 
  var objects = [];
  var chargers = [];
  var rectangles = [];
  var numObjects = vehicles / 2;
  var gap = 40;
  var mainObjectIndex = numObjects;
  var numObjects = Math.floor(vehicles / 2);
  var remainingVehicles = vehicles - numObjects * 2;

  var loader = new GLTFLoader();
  loader.load("gltf/Newbus/NewBus.gltf", function (gltf) {
    const rectWidth = 120;
    const rectHeight = 40;
    const rectGeometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(rectWidth, rectHeight));
    const rectMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

    for (let i = 0; i < numObjects; i++) {
      const rectLeft = new THREE.LineSegments(rectGeometry, rectMaterial);
      rectLeft.position.set(-i * gap, -40, 0);
      rectLeft.rotation.z = Math.PI / 2;
      rectLeft.position.x += 25;
      rectangles.push(rectLeft);
      plane1.add(rectLeft);
    }

    for (let i = 0; i < numObjects; i++) {
      const rectRight = new THREE.LineSegments(rectGeometry, rectMaterial);
      rectRight.position.set((i + 1) * gap, -40, 0);
      rectRight.rotation.z = Math.PI / 2;
      rectRight.position.x += 25;
      rectangles.push(rectRight);
      plane1.add(rectRight);
    }

    for (let i = 1; i <= numObjects; i++) {
      var objectLeft = gltf.scene.clone();
      var objectRight = gltf.scene.clone();
      objectLeft.position.set(-(i - 1) * gap, 0, -35);
      objectRight.position.set((i) * gap, 0, -35);
      objectLeft.scale.set(0.25, 0.25, 0.25);
      objectLeft.rotation.y = Math.PI;
      objectRight.scale.set(0.25, 0.25, 0.25);
      objectRight.rotation.y = Math.PI;
      objects.unshift(objectLeft);
      objects.push(objectRight);
      scene.add(objectLeft);
      scene.add(objectRight);
    }
  });

  loader.load("gltf/Charger/Charger.gltf", function (gltf) {
    var maincharger = gltf.scene.clone();
    chargers.push(maincharger);
    maincharger.position.set(-12, 0, 0);
    maincharger.scale.set(0.16, 0.16, 0.16);
    scene.add(maincharger);
    var charger = gltf.scene;
    charger.scale.set(0.16, 0.16, 0.16);
    for (let i = 1; i <= numObjects; i++) {
      var chargerLeft = charger.clone();
      var chargerRight = charger.clone();
      chargerLeft.position.set(-(i - 1) * gap - 12, 0, 0);
      chargerRight.position.set(i * gap - 12, 0, 0);
      chargers.unshift(chargerLeft);
      chargers.push(chargerRight);
      scene.add(chargerLeft);
      scene.add(chargerRight);
    }
  });
  //plane
const plane1 = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshBasicMaterial({ color: 'grey' })
  );
  scene.add(plane1);
  plane1.position.set(0, 0, 0);
  plane1.rotateX(-1.55);
}


//5X2 layout
function newlayout() {
  var objects = [];
  var chargers = [];
  var rectangles = [];
  var gap = 40;
  var remainder = vehicles % 10;
  console.log("Remainder : " +remainder);
  var remainingVehicles = vehicles - remainder;
  var numObjects = Math.floor(remainingVehicles / 2);

  //plane
  
  var group = new THREE.Group();
  var groupleft = new THREE.Group();
  var rectleftgroup = new THREE.Group();
  var rectrightgroup = new THREE.Group();
  var chargerleftgroup = new THREE.Group();
  const plane1 = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshBasicMaterial({ color: 'grey' })
  );
  scene.add(plane1);
  plane1.position.set(0, 0, 0);
  plane1.rotateX(-1.55);

  const loader = new GLTFLoader();
  const busPromise = new Promise((resolve) => {
    loader.load("gltf/Newbus/NewBus.gltf", function (gltf) {
      const rectWidth = 120;
      const rectHeight = 40;
      const rectGeometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(rectWidth, rectHeight));
      const rectMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

      for (let i = 0; i < 5; i++) {
        const rectLeft = new THREE.LineSegments(rectGeometry, rectMaterial);
        rectLeft.position.set(-i * gap, -40, 0);
        rectLeft.rotation.z = Math.PI / 2;
        rectLeft.rotation.x = Math.PI / 2;
        rectLeft.position.y += 42;
        rectLeft.position.x += 25;
        rectLeft.position.z += 45;
        rectangles.push(rectLeft);
        rectleftgroup.add(rectLeft);
        // plane1.add(rectLeft);
        plane1.add(rectleftgroup);
        rectleftgroup.add(plane1);
        group.add(rectleftgroup);
        group.add(plane1);
      }

      for (let i = 0; i < 5; i++) {
        const rectRight = new THREE.LineSegments(rectGeometry, rectMaterial);
        rectRight.position.set((i + 1) * gap, -40, 0);
        rectRight.rotation.z = Math.PI / 2;
        rectRight.position.x += -175;
        rectRight.position.y += 170;
        rectrightgroup.add(rectRight);
        group.add(rectrightgroup);
        rectangles.push(rectRight);
        plane1.add(rectrightgroup);
        group.add(plane1);
      }

      for (let i = 1; i <= 5; i++) {
        const objectLeft = gltf.scene.clone();
        const objectRight = gltf.scene.clone();
        objectLeft.position.set(-(i - 1) * gap, 0, -35);
        objectRight.position.set((i) * gap, 0, -35);
        objectLeft.scale.set(0.25, 0.25, 0.25);
        objectLeft.rotation.y = Math.PI;
        objectRight.scale.set(0.25, 0.25, 0.25);
        objectRight.position.z += -20;
        objectRight.position.x += -150;
        objectLeft.position.y += 0;
        objectRight.position.y += 3;
        groupleft.add(objectLeft);
        group.add(objectRight);
        group.add(groupleft);
        objects.unshift(objectLeft);
        objects.push(objectRight);
    }
      resolve();
    });
  });

  const chargerPromise = new Promise((resolve) => {
    loader.load("gltf/Charger/Charger.gltf", function (gltf) {
      const maincharger = gltf.scene.clone();
      // chargers.push(maincharger);
      maincharger.position.set(-12, 0, 0);
      maincharger.scale.set(0.16, 0.16, 0.16);
      const charger = gltf.scene;
      charger.scale.set(0.16, 0.16, 0.16);
      for (let i = 1; i <= 5; i++) {
        const chargerLeft = charger.clone();
        const chargerRight = charger.clone();
        chargerLeft.position.set(-(i - 1) * gap - 12, 0, 0);
        chargerRight.position.set(i * gap - 12, 0, 0);
        chargerRight.rotation.y = Math.PI;
        chargerRight.position.z += -90;
        chargerRight.position.x += -126;
        chargers.unshift(chargerLeft);
        chargers.push(chargerRight);
        chargerleftgroup.add(chargerLeft);
        group.add(chargerleftgroup);
        group.add(chargerRight);
      }
      resolve();
    });
  });
  var newgap = 35;
  var groupvalue = 200;
  var multiplier = 40;
  if(remainingVehicles>30)
  {
    newgap = 40;
  }
  Promise.all([busPromise, chargerPromise]).then(() => {
    scene.add(group);
    if (remainingVehicles > 10 && remainingVehicles % 10 === 0) {
      const numClones = (remainingVehicles / 10 - 1) ;
      for (let i = 0; i < numClones; i++) {
        const newGroup = group.clone();
        const offset = new THREE.Vector3((i + 1) * newgap + groupvalue, 0, 0);
        newGroup.position.add(offset);
        groupvalue += 200;
        scene.add(newGroup);
      }
    }
    //if remainder is less than 5
    if (remainder < 5) {

      for (let i = 0; i < remainder; i++) {
        // Clone the existing object on the right side of the vehicles
        const lastObject = objects[objects.length - 1];
        const newObject = lastObject.clone();

          // Determine the offset to place the newObject next to newGroup with a gap of 35 units
          const offset = new THREE.Vector3((remainingVehicles / 10 - 2 + i) *multiplier + groupvalue - 150 + newgap, 0, 0);

        newObject.position.add(offset);
        newObject.position.x -= 25;
        newObject.position.z += 20;
        newObject.rotation.y = Math.PI;
        group.add(newObject);

        // Clone the existing rectangle on the right side of the vehicles
        const lastRectangle = rectangles[rectangles.length - 1];
        const newRectangle = lastRectangle.clone();
        newRectangle.rotation.z = Math.PI / 2;
        newRectangle.rotation.x = Math.PI / 2;
        newRectangle.position.y -= 128;
        newRectangle.position.x += 25;
        newRectangle.position.z += 45;
        newRectangle.position.add(offset);
        group.add(newRectangle);

        // Clone the existing charger on the right side of the vehicles
        const lastCharger = chargers[chargers.length - 1];
        const newCharger = lastCharger.clone();
        newCharger.rotation.y = Math.PI;
        newCharger.position.x -= 50;
        newCharger.position.z += 90;
        newCharger.position.add(offset);
        group.add(newCharger);
      }

    }
    //if remainder is equal to 5

    if(remainder == 5)
    {
      var ngap = 30;
      for(let i =0; i<remainder/5; i++)
      {
        const newleftobjectGroup = groupleft.clone();
        const newleftrect = rectleftgroup.clone();
        const newchargerleft = chargerleftgroup.clone();
        const offset = new THREE.Vector3((remainingVehicles/10 -2) * ngap + groupvalue - 25 + 100, 0, 0);
        newleftobjectGroup.position.add(offset);
        newleftrect.position.add(offset);
        newchargerleft.position.add(offset);
        groupvalue += 200;
        scene.add(newleftobjectGroup);
        scene.add(newleftrect);
        scene.add(newchargerleft);
      }
  }
  //if remainder is greater than 5 
  if (remainder > 5)
  {
    for (let i = 0; i < 1; i++) {
      const newleftobjectGroup = groupleft.clone();
      const newleftrect = rectleftgroup.clone();
      const newchargerleft = chargerleftgroup.clone();
      const offset = new THREE.Vector3((remainingVehicles / 10 - 2 ) *40 + groupvalue  + 75, 0, 0);
      newleftobjectGroup.position.add(offset);
      newleftrect.position.add(offset);
      newchargerleft.position.add(offset);
      groupvalue += 200;
      scene.add(newleftobjectGroup);
      scene.add(newleftrect);
      scene.add(newchargerleft);
    }
    for (let i = 0; i < remainder%5; i++) {
      // Clone the existing object on the right side of the vehicles
      const lastObject = objects[objects.length - 1];
      const newObject = lastObject.clone();
  
      // Determine the offset to place the newObject next to newGroup with a gap of 35 units
      const offset = new THREE.Vector3((remainingVehicles / 10 - 2 + i) * 40 + groupvalue - 150 + 35, 0, 0);
      newObject.position.add(offset);
      newObject.position.x -= 170;
      group.add(newObject);
  
      // Clone the existing rectangle on the right side of the vehicles
      const lastRectangle = rectangles[rectangles.length - 1];
      const newRectangle = lastRectangle.clone();
      newRectangle.rotation.z = Math.PI / 2;
      newRectangle.rotation.x = Math.PI / 2;
      newRectangle.position.y -= 127;
      newRectangle.position.x -= 170;
      newRectangle.position.z -= 130;
      newRectangle.position.add(offset);
      group.add(newRectangle);
  
      // Clone the existing charger on the right side of the vehicles
      const lastCharger = chargers[chargers.length - 1];
      const newCharger = lastCharger.clone();
      newCharger.position.x -= 170;
      newCharger.position.add(offset);
      group.add(newCharger);
    }
  }
  });
  
}

   
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

var loader = new THREE.TextureLoader();
loader.load("./download.jpg", function (texture) {
  scene.background = texture;
});
//fps constrols

const fpcontrols = new FirstPersonControls(camera,renderer.domElement);
fpcontrols.lookSpeed = 0.0005;
fpcontrols.enabled = true;
fpcontrols.constrainVertical = true;
fpcontrols.verticalMax = Math.PI/2.3;
fpcontrols.verticalMin = Math.PI/1.7;
fpcontrols.movementSpeed =0.5;



//background
scene.background = new THREE.Color("0xffffff");
const controls = new OrbitControls(camera, renderer.domElement);

var light = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 4);
scene.add(light);

camera.position.set(100, 20, 300);

function animate() {
  requestAnimationFrame(animate);
  fpcontrols.update(1,0)
  controls.update();
  renderer.render(scene, camera);
}

animate();
