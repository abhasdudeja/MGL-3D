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
