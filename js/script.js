// Get the canvas element and its context
const canvas = document.getElementById('comicCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 600;
canvas.height = 600;

// Define the layers with their properties
let layers = [
    { color: 'rgba(255, 0, 0, 0.5)', size: 100, rotation: 0 }, // Red layer
    { color: 'rgba(0, 255, 0, 0.5)', size: 300, scale: 1, scalingUp: true }, // Green layer
    { color: 'rgba(0, 0, 255, 0.5)', size: 600, opacity: 1, fadingOut: true } // Blue layer
];

// Set the current layer
let currentLayer = 0;

// Function to update animations
function updateAnimations() {
    const layer = layers[currentLayer];
    // Rotation animation for the first layer
    if (currentLayer === 0) {
        layer.rotation += 0.01;
    }
    // Scale animation for the second layer
    if (currentLayer === 1) {
        if (layer.scalingUp) {
            layer.scale += 0.01;
            if (layer.scale > 1.2) layer.scalingUp = false;
        } else {
            layer.scale -= 0.01;
            if (layer.scale < 1) layer.scalingUp = true;
        }
    }
    // Opacity animation for the third layer
    if (currentLayer === 2) {
        if (layer.fadingOut) {
            layer.opacity -= 0.01;
            if (layer.opacity < 0.5) layer.fadingOut = false;
        } else {
            layer.opacity += 0.01;
            if (layer.opacity > 1) layer.fadingOut = true;
        }
    }
}

// Function to draw a layer
function drawLayer() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const layer = layers[currentLayer];
    // Save the current state of the context
    ctx.save();
    // Set the global alpha (opacity)
    ctx.globalAlpha = layer.opacity || 1;
    // Translate the context to the center of the canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // Rotate the context if the layer has a rotation
    if (layer.rotation) {
        ctx.rotate(layer.rotation);
    }
    // Scale the context if the layer has a scale
    if (layer.scale) {
        ctx.scale(layer.scale, layer.scale);
    }
    // Set the fill color and draw the rectangle
    ctx.fillStyle = layer.color;
    ctx.fillRect(-layer.size / 2, -layer.size / 2, layer.size, layer.size);
    // Restore the context to its previous state
    ctx.restore();
}

// Function to animate the layers
function animate() {
    updateAnimations();
    drawLayer();
    // Request the next animation frame
    requestAnimationFrame(animate);
}

// Add an event listener to the controls to switch to the next layer
document.getElementById('controls').addEventListener('click', nextLayer);

// Function to switch to the next layer
function nextLayer() {
    currentLayer = (currentLayer + 1) % layers.length;
}

// Start the animation
animate();