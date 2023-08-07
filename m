<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>3D model Loader</title>
    <style>
      body {
        margin: 0;
        width: 100vh;
        height: 100%;
        text-align: center;
        background-color: #f2f2f2;
      }
      
      button {
        display: inline-block; /* Changed to inline-block to display buttons side by side */
        margin: 15px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #20b2aa;
        color: white;
        border: none;
        cursor: pointer;
      }
      #controls {
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: left;
        max-width: 400px;
      }
  
      #controls p {
        margin: 8px 0;
      }
      /* Add spacing between the buttons */
      button:not(:last-child) {
        margin-right: 15px;
      }
      
      button:hover {
        background-color: #14716c;
      }
      
      /* Modal Styles */
      .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.7);
      }
      
      .modal-content {
        background-color: #fefefe;
        margin: 10% auto;
        padding: 20px;
        border: 1px solid #888;
        max-width: 300px;
        border-radius: 5px;
      }
      
      .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }
      
      .close:hover,
      .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }
      canvas.webgl {
        width: 0%;
        height: 0%; 
        display: block;
      }
      
		</style>
  </head>
  <body>
    <div id="controls"></div>
      <button id="loadObjectsBtn">Default Layout</button>
      <button id="newlayoutBtn">5 X 2 Layout</button>
      <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <label for="numVehicles">Number of Vehicles:</label>
        <input type="number" id="numVehicles" />
        <button id="submitBtn">Submit</button>
        
        <!-- <p id="remainderText"></p> -->
      </div>
    </div>
    <canvas class="webgl"></canvas>
    <script type="module" src="/main.js"></script>
  </body>
</html>


//
if (remainder < 5) {

  for (let i = 0; i < remainder; i++) {
    // Clone the existing object on the right side of the vehicles
    const lastObject = objects[objects.length - 1];
    const newObject = lastObject.clone();

      // Determine the offset to place the newObject next to newGroup with a gap of 35 units
      const offset = new THREE.Vector3((i + 1) * 40 + groupvalue - 440, lastGroupPosition.y, lastGroupPosition.z + 310);

    newObject.position.add(offset);
    newObject.position.x += 40;
    newObject.position.y -= 5;
    newObject.position.z += 1;
    // newObject.rotation.y = Math.PI;
    group.add(newObject);

    // Clone the existing rectangle on the right side of the vehicles
    const lastRectangle = rectangles[rectangles.length - 1];
    const newRectangle = lastRectangle.clone();
    newRectangle.rotation.z = Math.PI / 2;
    newRectangle.rotation.x = Math.PI / 2;
    newRectangle.position.y -= 128;
    newRectangle.position.x += 40;
    newRectangle.position.z -= 130;
    newRectangle.position.add(offset);
    group.add(newRectangle);

    // Clone the existing charger on the right side of the vehicles
    const lastCharger = chargers[chargers.length - 1];
    const newCharger = lastCharger.clone();
    // newCharger.rotation.y = Math.PI;
    newCharger.position.x +=40;
    newCharger.position.z += 1;
    newCharger.position.y -= 4;
    newCharger.position.add(offset);
    group.add(newCharger);
  }
}