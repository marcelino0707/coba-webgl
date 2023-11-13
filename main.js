document.addEventListener("DOMContentLoaded", function () {
    // Inisialisasi scene, camera, dan renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Load OBJ with MTL
    const loader = new THREE.OBJLoader();
    const mtlLoader = new THREE.MTLLoader();

    mtlLoader.load('Motion-Base-to-Cabin.mtl', function (materials) {
        materials.preload();
    
        loader.setMaterials(materials);
        loader.load('Motion-Base-to-Cabin.OBJ', function (object) {
            // Set object rotation and add it to the scene
            object.rotation.x = Math.PI / 2; // Adjust as needed
            scene.add(object);
    
            // Call animate function
            animate();
        }, undefined, function (error) {
            console.error(error);
        });
    });
    

    // Set camera position
    camera.position.z = 5;

    // Initialize animation
    function animate() {
        requestAnimationFrame(animate);

        // Rotate object
        scene.children[0].rotation.y += 0.005;

        // Render scene
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth, newHeight);
    });
});
