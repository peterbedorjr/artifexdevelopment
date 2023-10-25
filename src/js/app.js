import * as THREE from 'three';

// Step 1: Load the JSON data
fetch('/stars.json')
  .then(response => response.json())
  .then(data => {
    const starCanvas = document.getElementById('stars');

    const maxZ = Math.max(...data.map(star => star[2]));
    const minZ = Math.min(...data.map(star => star[2]));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x481d52);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    starCanvas.style.opacity = 1;

    const renderer = new THREE.WebGLRenderer({
      canvas: starCanvas,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const opacities = [];
    const sizes = [];

    for (let i = 0; i < data.length; i++) {
      const [x, y, z, lum] = data[i];
      vertices.push(x, y, z);

      const opacity = (z - minZ) / (maxZ - minZ) * .3;
      opacities.push(opacity);

      const size = Math.max(0.005, Math.min(0.1, 0.02 * Math.pow(Math.abs(lum), 0.3)));
      sizes.push(size);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(opacities, 1));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const vertexShader = `
const float minSize = 3.0;
const float maxSize = 20.0;

attribute float alpha;
attribute float size;
varying float vAlpha;

void main() {
  vAlpha = alpha;
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_PointSize = size * 50.0;
  gl_Position = projectionMatrix * mvPosition;
}
`;

    const fragmentShader = `
uniform sampler2D uTexture;
varying float vAlpha;

void main() {
  gl_FragColor = texture2D(uTexture, gl_PointCoord);
  gl_FragColor.a *= vAlpha;
}
`;

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: new THREE.TextureLoader().load('/star.png') },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    });

    const stars = new THREE.Points(geometry, shaderMaterial);
    scene.add(stars);

    let mouse = new THREE.Vector2();

    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }, false);

    function animate() {
      requestAnimationFrame(animate);

      // Check if the user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        // Analog stick-like control
        const speedFactor = 0.01; // Adjust this to make it move faster or slower
        camera.position.x += mouse.x * speedFactor;
        camera.position.y += -mouse.y * speedFactor;

        camera.lookAt(scene.position);
      }

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', function () {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      // Update the camera's aspect ratio based on the new dimensions
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      // Resize the renderer's viewport and canvas
      renderer.setSize(newWidth, newHeight);
    });
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });
