const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color: 0xff0000})
);
cube1.position.set(3,0,0);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color : 0x00ff00})
);
cube2.position.set(-3,0,0);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color: 0x0000ff})
);
cube3.position.set(0,0,0);

const plane1 = new THREE.Mesh(
  new THREE.PlaneGeometry(100,100),
  new THREE.MeshBasicMaterial({color:'grey', wireframe:true})
);
plane1.position.set(-1,-1,-1);
plane1.rotateX(-1.55);

camera.position.setZ(10);
camera.position.setY(2);
camera.position.setX(3);


const lawngroup = new THREE.Group();
lawngroup.add(cube1,cube2,cube3,plane1);  
scene.add(lawngroup); 
lawngroup.name = "LawnGroup";
console.log(lawngroup,lawngroup.children);  


function animate() {
	requestAnimationFrame( animate );
  controls.update();
	renderer.render( scene, camera );
}

animate();

let objects = [cube1,cube2,cube3];
const dControls = new DragControls(objects,camera,renderer.domElement);
dControls.deactivate();
dControls.activate();

dControls.addEventListener("dragstart", function(event)
{
  console.log(event.object.material);
  event.object.material.transparent = true;
  event.object.material.opacity = 0.5;
});

dControls.addEventListener("dragend", function(event)
{
  event.object.material.opacity = 1.0;
}); 
 // var clonedgroup = group.clone();
      // // Compute the bounding box of the group
      // var boundingBox = new THREE.Box3().setFromObject(group);
      // var center = new THREE.Vector3();
      // boundingBox.getCenter(center);
      // var distance = 400; // Adjust the distance as needed
      // var axis = new THREE.Vector3(1, 0, 0); // Adjust the axis as needed
      // var offset = axis.clone().multiplyScalar(distance);
      // var newPosition = center.clone().add(offset);
      // console.log('Center of the group:', center);
      // console.log('New position:', newPosition);
      // clonedgroup.position.copy(newPosition);
      // scene.add(clonedgroup);


      //old layout
      function Fivelayout() {
            var vehicles = 20;
            var objects = [];
            var chargers = [];
            var rectangles = [];
            var numObjects = vehicles / 2;
            var gap = 40;
            var mainObjectIndex = numObjects;
            // var numObjects = Math.floor(vehicles / 2);
            // var remainingVehicles = vehicles - numObjects * 2;
          
            var loader = new GLTFLoader();
            loader.load("gltf/Newbus/NewBus.gltf", function (gltf) {
              const rectWidth = 120;
              const rectHeight = 40;
              const rectGeometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(rectWidth, rectHeight));
              const rectMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
          
              for (let i = 0; i < numObjects/2; i++) {
                const rectLeft = new THREE.LineSegments(rectGeometry, rectMaterial);
                rectLeft.position.set(-i * gap, -40, 0);
                rectLeft.rotation.z = Math.PI / 2;
                rectLeft.position.x += 25;  
                rectangles.push(rectLeft);
                plane1.add(rectLeft);
                for(let j =0 ; j < numObjects/2; j++)
                {
                    const rectLeftRight = new THREE.LineSegments(rectGeometry,rectMaterial);
                    rectLeftRight.position.set((j+1)*gap, -40,0);
                    rectLeftRight.rotation.z = Math.PI /2;
                    rectLeftRight.position.x += 65;
                    rectangles.push(rectLeftRight);
                    plane1.add(rectLeftRight);
                }
        
              }
          
              for (let i = 0; i < numObjects/2; i++) {
                const rectRight = new THREE.LineSegments(rectGeometry, rectMaterial);
                rectRight.position.set((i + 1) * gap, -40, 0);
                rectRight.rotation.z = Math.PI / 2;
                rectRight.position.x += -175;
                rectRight.position.y +=170;
                rectangles.push(rectRight);
                plane1.add(rectRight);
                for( let j = 0 ; j < numObjects/2 ; j++)
                {
                    const rectRightLeft = new THREE.LineSegments(rectGeometry, rectMaterial);
                    rectRightLeft.position.set(-i * gap, -40, 0);
                    rectRightLeft.rotation.z = Math.PI/2;
                     rectRightLeft.position.x += 265;  
                     rectRightLeft.position.y += 170;
                    rectangles.push(rectRightLeft);
                    plane1.add(rectRightLeft);
                }
              }
          
              for (let i = 1; i <= numObjects/2; i++) {
                var objectLeft = gltf.scene.clone();
                var objectRight = gltf.scene.clone();
                objectLeft.position.set(-(i - 1) * gap, 0, -35);
                objectRight.position.set((i) * gap, 0, -35);
                objectLeft.scale.set(0.25, 0.25, 0.25);
                objectLeft.rotation.y = Math.PI;
                objectRight.scale.set(0.25, 0.25, 0.25);
                objectRight.position.z += -20;
                objectRight.position.x += -150;
                objectLeft.position.y +=0;
                objectRight.position.y +=3;
                objects.unshift(objectLeft);
                objects.push(objectRight);
                scene.add(objectLeft);
                scene.add(objectRight);
                for(let j = 1; j <= numObjects/2; j++)
                {
                    var objectLeftRight = gltf.scene.clone();
                    objectLeftRight.position.set((j+1)*gap,0,-35);
                    objectLeftRight.scale.set(0.25, 0.25, 0.25);
                    objectLeftRight.rotation.y = Math.PI;
                    objectLeftRight.position.y +=0;
                    objects.unshift(objectLeftRight);
                    scene.add(objectLeftRight);
                }
                for( let k = 1 ; k <= numObjects/2; k++)
                {
                    var objectRightLeft = gltf.scene.clone();
                    objectRightLeft.position.set((k+1) * gap, 0, -35);
                    objectRightLeft.scale.set(0.25,0.25,0.25);
                    objectRightLeft.position.z += -20;
                    objectRightLeft.position.x += 50;
                    objectRightLeft.position.y += 3;
                    objects.push(objectRightLeft);
                    scene.add(objectRightLeft);
                }
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
              for (let i = 1; i <= numObjects/2; i++) {
                var chargerLeft = charger.clone();
                var chargerRight = charger.clone();
                chargerLeft.position.set(-(i - 1) * gap - 12, 0, 0);
                chargerRight.position.set(i * gap - 12, 0, 0);
                chargerRight.rotation.y = Math.PI;
                chargerRight.position.z += -90;
                chargerRight.position.x += -126;
                chargers.unshift(chargerLeft);
                chargers.push(chargerRight);
                scene.add(chargerLeft);
                scene.add(chargerRight);
                for(let j =1 ; j <= numObjects/2 ; j++)
                {
                    var chargerLeftRight = charger.clone();
                    chargerLeftRight.position.set(j*gap + 25, 0, 0);
                    chargers.unshift(chargerLeftRight);
                    scene.add(chargerLeftRight);
                }
                for(let k = 1; k <= numObjects/2 ; k++)
                {
                    var chargerRightLeft = charger.clone();
                    chargerRightLeft.position.set((k - 1) * gap - 12, 0, 0);
                    chargerRightLeft.position.z += -90;
                    chargerRightLeft.position.x += 150;
                    chargerRightLeft.rotation.y = Math.PI;
                    chargers.push(chargerRightLeft);
                    scene.add(chargerRightLeft);
                }
              }
            });
            //plane
        const plane1 = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000),
            new THREE.MeshBasicMaterial({ color: 'grey' })
          );
          scene.add(plane1);
          plane1.position.set(0, 0, 0);
          plane1.rotateX(-1.55);

          
  //axis helper
//   const axesHelper = new THREE.AxesHelper(100);
// scene.add(axesHelper);
// axesHelper.position.set(0, 0, 0);
// axesHelper.rotation.set(0, 0, 0); 
          
          }


          
//function 1X1
function onelayout() {
  onegroup = new THREE.Group();
 // Remove existing objects from the scene
 // removeAllChildren();
 var objects = [];
 var chargers = [];
 var rectangles = [];
 var loader = new GLTFLoader();
 loader.load("gltf/Newbus/NewBus.gltf", function (gltf) {
   const rectWidth = 120;
   const rectHeight = 40;
   const rectGeometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(rectWidth, rectHeight));
   const rectMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

   // Create and add the rectangle to the plane
   const rect = new THREE.LineSegments(rectGeometry, rectMaterial);
   rect.position.set(0, -40, 0);
   rect.position.y += 42;
   rect.position.x += 25;
   rect.position.z += 45;
   rect.rotation.z = Math.PI / 2;
   rect.rotation.x = Math.PI / 2;
   rectangles.push(rect);
   plane.add(rect);
   onegroup.add(rect);

   // Create and add the object
   var object = gltf.scene.clone();
   object.position.set(0, 0, -35);
   object.scale.set(0.25, 0.25, 0.25);
   object.rotation.y = Math.PI;
   objects.push(object);
   onegroup.add(object);
   // scene.add(object);
 });

 loader.load("gltf/Charger/Charger.gltf", function (gltf) {
   var charger = gltf.scene.clone();
   chargers.push(charger);
   charger.position.set(-12, 0, 0);
   charger.scale.set(0.16, 0.16, 0.16);
   onegroup.add(charger);
   // scene.add(charger);
 });

 // Add the plane
 const plane = new THREE.Mesh(
   new THREE.PlaneGeometry(1000, 1000),
   new THREE.MeshBasicMaterial({ color: 'grey' })
 );
 scene.add(plane);
 plane.position.set(0, 0, 0);
 plane.rotateX(-1.55);
 scene.add(onegroup);
}





// function 2X2 
function twolayout()
{
 var vehicles = 2;
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
     rectLeft.position.set(-i * gap +80, -40, 0);
     rectLeft.rotation.z = Math.PI / 2;
     rectLeft.position.x += 25;
     rectangles.push(rectLeft);
     plane1.add(rectLeft);
   }

   for (let i = 0; i < numObjects; i++) {
     const rectRight = new THREE.LineSegments(rectGeometry, rectMaterial);
     rectRight.position.set((i + 1) * gap+80, -40, 0);
     rectRight.rotation.z = Math.PI / 2;
     rectRight.position.x += 25;
     rectangles.push(rectRight);
     plane1.add(rectRight);
   }

   for (let i = 1; i <= numObjects; i++) {
     var objectLeft = gltf.scene.clone();
     var objectRight = gltf.scene.clone();
     objectLeft.position.set(-(i - 1) * gap+80, 0, -35);
     objectRight.position.set((i) * gap+80, 0, -35);
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
   var charger = gltf.scene;
   charger.scale.set(0.16, 0.16, 0.16);
   for (let i = 1; i <= numObjects; i++) {
     var chargerLeft = charger.clone();
     var chargerRight = charger.clone();
     chargerLeft.position.set(-(i - 1) * gap +68, 0, 0);
     chargerRight.position.set(i * gap + 68, 0, 0);
     chargers.unshift(chargerLeft);
     chargers.push(chargerRight);
     scene.add(chargerLeft);
     scene.add(chargerRight);
   }
 });
 //plane
const plane1 = new THREE.Mesh(
   new THREE.PlaneGeometry(1000, 1000),
   new THREE.MeshBasicMaterial({ color: 'grey' })
 );
 scene.add(plane1);
 plane1.position.set(0, 0, 0);
 plane1.rotateX(-1.55);
}

//function 3X3 layout
function threelayout() {
 removeAllChildren();

 var vehicles = 3; // Change the number of vehicles to 3
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

   // Add the center rectangle
   const centerRect = new THREE.LineSegments(rectGeometry, rectMaterial);
   centerRect.position.set(0, -40, 0);
   centerRect.rotation.z = Math.PI / 2;
   centerRect.position.x += 25;
   rectangles.push(centerRect);
   plane1.add(centerRect);

   for (let i = 1; i <= numObjects; i++) {
     const rectLeft = new THREE.LineSegments(rectGeometry, rectMaterial);
     rectLeft.position.set(-i * gap, -40, 0);
     rectLeft.rotation.z = Math.PI / 2;
     rectLeft.position.x += 25;
     rectangles.push(rectLeft);
     plane1.add(rectLeft);
   }

   for (let i = 1; i <= numObjects; i++) {
     const rectRight = new THREE.LineSegments(rectGeometry, rectMaterial);
     rectRight.position.set(i * gap, -40, 0);
     rectRight.rotation.z = Math.PI / 2;
     rectRight.position.x += 25;
     rectangles.push(rectRight);
     plane1.add(rectRight);
   }

   for (let i = 0; i < numObjects; i++) {
     var mainobject = gltf.scene.clone();
    objects.push(mainobject); // Add the main object to the objects array
     mainobject.position.set(0,0,-35);
     mainobject.scale.set(0.25,0.25,0.25);
     mainobject.rotation.y = Math.PI;
     scene.add(mainobject); 
     var objectLeft = gltf.scene.clone();
     var objectRight = gltf.scene.clone();
     objectLeft.position.set(-(i + 1) * gap, 0, -35);
     objectRight.position.set((i + 1) * gap, 0, -35);
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
     chargerLeft.position.set(-(i + 1) * gap + 28, 0, 0);
     chargerRight.position.set((i + 1) * gap - 52, 0, 0);
     chargers.unshift(chargerLeft);
     chargers.push(chargerRight);
     scene.add(chargerLeft);
     scene.add(chargerRight);
   }
 });

 //plane
 const plane1 = new THREE.Mesh(
   new THREE.PlaneGeometry(1000, 1000),
   new THREE.MeshBasicMaterial({ color: 'grey' })
 );
 scene.add(plane1);
 plane1.position.set(0, 0, 0);
 plane1.rotateX(-1.55);
}