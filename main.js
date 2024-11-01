import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";
import { FBXLoader } from "./jsm/loaders/FBXLoader.js";
import { OBJLoader } from "./jsm/loaders/OBJLoader.js";
import { DDSLoader } from "./jsm/loaders/DDSLoader.js";
import { MTLLoader } from "./jsm/loaders/MTLLoader.js";

let scene, camera, renderer, controls;

window.addEventListener("load", init);

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // カメラの位置
  camera.position.set(0, 0, 500);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const manager = new THREE.LoadingManager();
  manager.addHandler(/\.dds$/i, new DDSLoader());
  new MTLLoader(manager).load(
    // ここを書き換える１
    "./model/Hanawa.mtl",
    function (materials) {
      materials.preload();

      new OBJLoader(manager).setMaterials(materials).load(
        // ここを書き換える２
        "./model/Hanawa.obj",
        (object) => {
          scene.add(object);
          // オブジェクトの大きさ
          object.scale.set(60, 60, 60);
          // オブジェクトの位置
          object.position.set(0, -100, 0);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  );

  let directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  let pointLight = new THREE.PointLight(0xffffff, 10);
  pointLight.position.set(-200, -200, -200);
  pointLight.decay = 1;
  pointLight.power = 1000;
  scene.add(pointLight);

  controls = new OrbitControls(camera, renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  window.addEventListener("resize", onWindowResize);
  animate();
}
