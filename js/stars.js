import 'regenerator-runtime/runtime';
import { WebGLRenderer, Color, Scene, PerspectiveCamera, BufferGeometry, PointsMaterial, Points, Float32BufferAttribute } from 'three';

function createStarField(numberOfStars = 1000, opacity = 0.5, size = 1) {
  const starGeometry = new BufferGeometry();
  const starMaterial = new PointsMaterial({ color: 0xFFFFFF, size, opacity, transparent: true, sizeAttenuation: false, });

  const starVertices = [];

  for (let i = 0; i < numberOfStars; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const radius = Math.random() * 1000;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(10);

    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute('position', new Float32BufferAttribute(starVertices, 4));

  return new Points(starGeometry, starMaterial);
}

const starFields = [
  createStarField(2000),
  createStarField(3000, 0.9, 0.02),
  createStarField(4000, 0.6, 0.01),
];

const starCanvas = document.getElementById('stars');

const scene = new Scene();
scene.background = new Color(0x481d52);

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new WebGLRenderer({ canvas: starCanvas });
renderer.setPixelRatio(window.devicePixelRatio || 1);
renderer.setSize(window.innerWidth, window.innerHeight);

starFields.forEach((starField) => {
  scene.add(starField);
});

renderer.render(scene, camera);

starCanvas.style.opacity = 1;
