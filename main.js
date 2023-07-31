import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from "./GLTFLoader.js"
// import { AxesHelper } from './three.module.js';
import { FirstPersonControls } from './FirstPersonControls.js';

var vehicles;
let isLoadObjectsClicked = true; // Flag to indicate which button was clicked

// Get the modal element and buttons
const modal = document.getElementById('myModal');
const loadObjectsBtn1 = document.getElementById('loadObjectsBtn');
const newlayoutBtn1 = document.getElementById('newlayoutBtn');
const infoBtn = document.getElementById('infoBtn');
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
      
    } else{
      removeAllChildren();
      newlayout(vehicles);
      
    }

    // Close the modal
    modal.style.display = 'none';
    hideInfoModal();
  }
}
const infoModalCloseBtn = document.querySelector('#infoModal .close');
infoModalCloseBtn.addEventListener('click', hideInfoModal);
// Attach event listeners to the buttons and close button
loadObjectsBtn1.addEventListener('click', () => {
  showModal();
  isLoadObjectsClicked = true; // Set the flag to true for loadObjects
});

newlayoutBtn1.addEventListener('click', () => {
  showModal();
  isLoadObjectsClicked = false; // Set the flag to false for newlayout
});
infoBtn.addEventListener('click', showInfoModal);
document.getElementById('submitBtn').addEventListener('click', handleSubmit);
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

let onegroup;

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
  console.log("remaining vehicles : " +remainingVehicles);
  var layoutdecider ;
  if(vehicles%10 != 0)
  {
    layoutdecider = remainingVehicles/10 + 1;
  }
  else 
  {
    layoutdecider = remainingVehicles/10;
  }
  console.log("Layout this: " +layoutdecider);
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
  plane1.rotation.x = -Math.PI / 2;

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
        objectLeft.position.y += 3;
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
  var divider;
  var leftover;
  var missing;
  var numClones = (remainingVehicles / 10 ) ;
  if(remainingVehicles>30)
  {
    newgap = 40;
  }
  Promise.all([busPromise, chargerPromise]).then(() => {
    rectrightgroup.position.set(0,0,3);
    rectleftgroup.position.set(0,0.8,0);
    group.position.set(0,-3.11,0);
    // scene.add(group);
    var offsetX;
    var offsetZ;
    
    let lastGroupPosition = new THREE.Vector3();
    if (remainingVehicles >= 10 && remainingVehicles % 10 === 0) {
      console.log("numclones: " +numClones);
        
  var newgrval = 270;
  var yval = 5;


      if(numClones%2 == 0 || numClones%2 == 1)
      {
        divider = Math.ceil(Math.sqrt(numClones));
        leftover = Math.floor(numClones/divider);
        missing = numClones - (divider*leftover);
      }
      console.log("Divider : " +divider);
      console.log("Leftover : " +leftover);
      console.log("Missing : " +missing);
       // First loop: Clone until divider
       let currentY = group.position.y;
       for(let j = 0 ; j<leftover; j++)
       {
      for (let i = 0; i < divider; i++) {
        var newGroup = group.clone();
        var offsetZ = newgap + newgrval;
        offsetX = (i) *(200+newgap)+235;
        newGroup.position.set(offsetX, currentY, offsetZ);
        scene.add(newGroup);
      }
      newgrval+=300;
    }
    if(missing != 0)
    {
      for (let i = 0; i < missing; i++) {
        var newGroup = group.clone();
        var offsetZ = newgap + newgrval;
        offsetX = (i) *(200+newgap)+235;
        newGroup.position.set(offsetX, currentY, offsetZ);
        // groupvalue += 200;
        scene.add(newGroup);
      }
      newgrval+=300;
    }

  var offset;
    // when value is greater than 10 and improper
    if (remainder < 5) {

      for (let i = 0; i < remainder; i++) {
        // Clone the existing object on the right side of the vehicles
        const lastObject = objects[objects.length - 1];
        const newObject = lastObject.clone();
        // if(missing == 0)
        // {
        //     offset = new THREE.Vector3((i + 1) * 40 +squaregap + 38  , lastGroupPosition.y+2, lastGroupPosition.z+20);
        //    console.log("offset : " +offset);
        // }
      
        const offsetX = newGroup.position.x + (i + 1) * 40; // Offset each new object by 40 units along the x-axis from the previous one
        const offsetY = newGroup.position.y + 4; // Offset each new object 5 units below the newGroup
        const offsetZ = newGroup.position.z + 1; // Offset each new object by 1 unit along the z-axis from the newGroup
        
         offset = new THREE.Vector3(offsetX, offsetY, offsetZ);
        
        newObject.position.add(offset);
        newObject.position.x += 40;
        newObject.position.y -= 5;
        newObject.position.z += 1;
        // newObject.rotation.y = Math.PI;
        scene.add(newObject);

        // Clone the existing rectangle on the right side of the vehicles
        const lastRectangle = rectangles[rectangles.length - 1];
        const newRectangle = lastRectangle.clone();
        newRectangle.rotation.z = Math.PI / 2;
        newRectangle.rotation.x = Math.PI / 2;
        newRectangle.position.y -= 128;
        newRectangle.position.x += 40;
        newRectangle.position.z -= 130;
        newRectangle.position.add(offset);
        scene.add(newRectangle);

        // Clone the existing charger on the right side of the vehicles
        const lastCharger = chargers[chargers.length - 1];
        const newCharger = lastCharger.clone();
        // newCharger.rotation.y = Math.PI;
        newCharger.position.x +=40;
        newCharger.position.z += 1;
        newCharger.position.y -= 4;
        newCharger.position.add(offset);
        scene.add(newCharger);
      }
    }
    if(remainder == 5)
    {
      var ngap = 30;
      for(let i =0; i<remainder/5; i++)
      {
        
          const offsetX = newGroup.position.x + (i + 1) * 40 + 85; // Offset each new object by 40 units along the x-axis from the previous one
        const offsetY = newGroup.position.y + 1; // Offset each new object 5 units below the newGroup
        const offsetZ = newGroup.position.z - 85; // Offset each new object by 1 unit along the z-axis from the newGroup
        
        offset = new THREE.Vector3(offsetX, offsetY, offsetZ);
    
        const newleftobjectGroup = groupleft.clone();
        const newleftrect = rectleftgroup.clone();
        const newchargerleft = chargerleftgroup.clone();
        
        newleftobjectGroup.position.add(offset);
        newleftobjectGroup.rotation.y = Math.PI;
        newleftobjectGroup.position.z -= 5;
        newleftrect.position.add(offset);
        newleftrect.rotation.y = Math.PI;
        newchargerleft.position.add(offset);
        newchargerleft.rotation.y = Math.PI;
        newchargerleft.position.z -= 5;
        scene.add(newleftobjectGroup);
        scene.add(newleftrect);
        scene.add(newchargerleft);
      
    }
  }
  var  remaindergrgap;
  // if remainder is greater than 5 
  if (remainder > 5)
  {
    remaindergrgap = 108;
    for(let i =0; i<1; i++)
      {
        const newleftobjectGroup = groupleft.clone();
        const newleftrect = rectleftgroup.clone();
        const newchargerleft = chargerleftgroup.clone();
        // const offset = new THREE.Vector3( (i + 1) * 40 - 150, lastGroupPosition.y, lastGroupPosition.z + 230);
        const offsetX = newGroup.position.x + (i + 1) * 40 + 85; // Offset each new object by 40 units along the x-axis from the previous one
        const offsetY = newGroup.position.y + 1; // Offset each new object 5 units below the newGroup
        const offsetZ = newGroup.position.z - 85; // Offset each new object by 1 unit along the z-axis from the newGroup
        
        const offset = new THREE.Vector3(offsetX, offsetY, offsetZ);
        newleftobjectGroup.position.add(offset);
        newleftobjectGroup.rotation.y = Math.PI;
        newleftobjectGroup.position.z -= 5;
        newleftrect.position.add(offset);
        newleftrect.rotation.y = Math.PI;
        newchargerleft.position.add(offset);
        newchargerleft.rotation.y = Math.PI;
        newchargerleft.position.z -= 5;
        scene.add(newleftobjectGroup);
        scene.add(newleftrect);
        scene.add(newchargerleft);
      }
    for (let i = 0; i < remainder%5; i++) {
      // Clone the existing object on the right side of the vehicles
      const lastObject = objects[objects.length - 1];
      const newObject = lastObject.clone();
  
      // Determine the offset to place the newObject next to newGroup with a gap of 35 units
      // const offset = new THREE.Vector3((i + 1) * 40 +squaregap - 38  , lastGroupPosition.y+2, lastGroupPosition.z+20);
      const offsetX = newGroup.position.x + (i + 1) * 40 + 156; // Offset each new object by 40 units along the x-axis from the previous one
        const offsetY = newGroup.position.y + 1; // Offset each new object 5 units below the newGroup
        const offsetZ = newGroup.position.z + 20; // Offset each new object by 1 unit along the z-axis from the newGroup
        
        const offset = new THREE.Vector3(offsetX, offsetY, offsetZ);
      newObject.position.add(offset);
      newObject.position.x -= 170;
      newObject.position.y -= 5;
      newObject.rotation.y = Math.PI;
      scene.add(newObject);
  
      // Clone the existing rectangle on the right side of the vehicles
      const lastRectangle = rectangles[rectangles.length - 1];
      const newRectangle = lastRectangle.clone();
      newRectangle.rotation.z = Math.PI / 2;
      newRectangle.rotation.x = Math.PI / 2;
      newRectangle.position.y -= 130;
      newRectangle.position.x -= 120;
      newRectangle.position.z += 25;
      newRectangle.rotation.y = Math.PI;
      newRectangle.position.add(offset);
      scene.add(newRectangle);
  
      // Clone the existing charger on the right side of the vehicles
      const lastCharger = chargers[chargers.length - 1];
      const newCharger = lastCharger.clone();
      newCharger.position.x -= 193;
      newCharger.position.y -= 2;
      newCharger.position.z += 70;
      newCharger.rotation.y = Math.PI;
      newCharger.position.add(offset);
      scene.add(newCharger);
    }

}
  }


//when vehicles are less than a value of 10
  if(vehicles < 10 )
  {
    const plane1 = new THREE.Mesh(
      new THREE.PlaneGeometry(10000, 10000),
      new THREE.MeshBasicMaterial({ color: 'grey' })
    );
    scene.add(plane1);
    plane1.position.set(0, 0, 0);
    plane1.rotation.x = -Math.PI / 2;
    //if remainder is less than 5
    if (vehicles < 5) {

      for (let i = 0; i < vehicles; i++) {
        // Clone the existing object on the right side of the vehicles
        const lastObject = objects[objects.length - 1];
        const newObject = lastObject.clone();

          // Determine the offset to place the newObject next to newGroup with a gap of 35 units
          const offset = new THREE.Vector3(lastGroupPosition.x + (i + 1) * 40, lastGroupPosition.y+4, lastGroupPosition.z);

        newObject.position.add(offset);
        newObject.position.x += 40;
        newObject.position.y -= 5;
        newObject.position.z += 1;
        // newObject.rotation.y = Math.PI;
        scene.add(newObject);

        // Clone the existing rectangle on the right side of the vehicles
        const lastRectangle = rectangles[rectangles.length - 1];
        const newRectangle = lastRectangle.clone();
        newRectangle.rotation.z = Math.PI / 2;
        newRectangle.rotation.x = Math.PI / 2;
        newRectangle.position.y -= 128;
        newRectangle.position.x += 40;
        newRectangle.position.z -= 130;
        newRectangle.position.add(offset);
        scene.add(newRectangle);

        // Clone the existing charger on the right side of the vehicles
        const lastCharger = chargers[chargers.length - 1];
        const newCharger = lastCharger.clone();
        // newCharger.rotation.y = Math.PI;
        newCharger.position.x +=40;
        newCharger.position.z += 1;
        newCharger.position.y -= 4; 
        newCharger.position.add(offset);
        scene.add(newCharger);
      }

    }
    //if remainder is equal to 5
    var squaregap = 197;
    if(vehicles == 5)
    {
      var ngap = 30;
      
      for(let i =0; i<vehicles/5; i++)
      {
        const newleftobjectGroup = groupleft.clone();
        const newleftrect = rectleftgroup.clone();
        const newchargerleft = chargerleftgroup.clone();
        const offset = new THREE.Vector3(lastGroupPosition.x + (i + 1) * 40+90, lastGroupPosition.y+7, lastGroupPosition.z - 85);
        newleftobjectGroup.position.add(offset);
        newleftobjectGroup.rotation.y = Math.PI;
        newleftobjectGroup.position.z -= 5;
        newleftrect.position.add(offset);
        newleftrect.rotation.y = Math.PI;
        newchargerleft.position.add(offset);
        newchargerleft.rotation.y = Math.PI;
        newchargerleft.position.z -= 5;
        newchargerleft.position.y -=3;
        groupvalue += 200;
        scene.add(newleftobjectGroup);
        scene.add(newleftrect);
        scene.add(newchargerleft);
      }
  }
 var  remaindergrgap;
  //if remainder is greater than 5 
  if (vehicles > 5)
  {
    remaindergrgap = 108;
    for (let i = 0; i < 1; i++) {
      const newleftobjectGroup = groupleft.clone();
      const newleftrect = rectleftgroup.clone();
      const newchargerleft = chargerleftgroup.clone();
      const offset = new THREE.Vector3(lastGroupPosition.x + (i + 1) * 40 +squaregap - remaindergrgap , lastGroupPosition.y+6, lastGroupPosition.z-90);
      newleftobjectGroup.position.add(offset);
      newleftobjectGroup.rotation.y = Math.PI;
      newleftrect.position.add(offset);
      newleftrect.position.z += 5;
      newleftrect.rotation.y = Math.PI;
      newchargerleft.position.add(offset);
      newchargerleft.rotation.y = Math.PI;
      newchargerleft.position.y -= 2;
      groupvalue += 200;
      scene.add(newleftobjectGroup);
      scene.add(newleftrect);
      scene.add(newchargerleft);
    }
    for (let i = 0; i < vehicles%5; i++) {
      // Clone the existing object on the right side of the vehicles
      const lastObject = objects[objects.length - 1];
      const newObject = lastObject.clone();
  
      // Determine the offset to place the newObject next to newGroup with a gap of 35 units
      const offset = new THREE.Vector3(lastGroupPosition.x + (i + 1) * 40 +squaregap - 38  , lastGroupPosition.y+2, lastGroupPosition.z+20);
      newObject.position.add(offset);
      newObject.position.x -= 170;
      newObject.position.y -= 5;
      newObject.rotation.y = Math.PI;
      scene.add(newObject);
  
      // Clone the existing rectangle on the right side of the vehicles
      const lastRectangle = rectangles[rectangles.length - 1];
      const newRectangle = lastRectangle.clone();
      newRectangle.rotation.z = Math.PI / 2;
      newRectangle.rotation.x = Math.PI / 2;
      newRectangle.position.y -= 130;
      newRectangle.position.x -= 120;
      newRectangle.position.z += 25;
      newRectangle.rotation.y = Math.PI;
      newRectangle.position.add(offset);
      scene.add(newRectangle);
  
      // Clone the existing charger on the right side of the vehicles
      const lastCharger = chargers[chargers.length - 1];
      const newCharger = lastCharger.clone();
      newCharger.position.x -= 193;
      newCharger.position.y -= 2;
      newCharger.position.z += 70;
      newCharger.rotation.y = Math.PI;
      newCharger.position.add(offset);
      scene.add(newCharger);
    }
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
fpcontrols.verticalMin = Math.PI/2.7;
fpcontrols.movementSpeed =5;
//helping function
// Function to handle the info modal display
function showInfoModal() {
  infoModal.style.display = 'block';
}

function hideInfoModal() {
  infoModal.style.display = 'none';
}

//background
scene.background = new THREE.Color("0xffffff");
const controls = new OrbitControls(camera, renderer.domElement);
// // Set OrbitControls options to restrict vertical rotation
// controls.enableRotate = true; // Enable rotation
// controls.minPolarAngle = Math.PI/3; // Minimum polar angle (60 degrees)
// controls.maxPolarAngle = Math.PI/4; // Maximum polar angle (110 degrees)
// controls.enableZoom = true; // Enable zoom


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
