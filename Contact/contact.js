import '../main/index.js';
import '../login/login.js';
import '../JavaScript/theme.js';


function updateStatus() {
  const statusBlocks = document.querySelectorAll('.status');

  const hour = new Date().getHours();
  const isOnline = hour >= 8 && hour < 21;
  
  statusBlocks.forEach(block => {
    const label = block.querySelector('.on-off');
    const dot = block.querySelector('.dot');

    if (!label || !dot) return;

    label.textContent = isOnline ? 'Online' : 'Offline';

    if (!isOnline) {
      // Offline: red dot, no animation
      dot.style.backgroundColor = 'red';
      dot.style.boxShadow = 'none';
      cancelPulseAnimation(dot);
      return;
    }

    // Online: green dot with pulse animation
    dot.style.backgroundColor = 'green';

    startPulseAnimation(dot);
  });
}

// Store animation frames so we can cancel if needed
const pulseAnimations = new WeakMap();

function startPulseAnimation(dot) {
  if (pulseAnimations.has(dot)) return; // already animating

  let start = null;
  const duration = 1500; // 1.5s pulse cycle

  function pulse(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    // Calculate normalized progress [0,1]
    const progress = (elapsed % duration) / duration;

    // Calculate glow size and alpha with ease-in-out effect
    // glow grows from 0 to 6px and fades alpha from 0.5 to 0
    const glowSize = 6 * progress;
    const alpha = 0.5 * (1 - progress);

    dot.style.boxShadow = `0 0 0 ${glowSize}px rgba(0, 128, 0, ${alpha.toFixed(2)})`;

    // Request next frame
    const frameId = requestAnimationFrame(pulse);
    pulseAnimations.set(dot, frameId);
  }

  // Start animation
  const frameId = requestAnimationFrame(pulse);
  pulseAnimations.set(dot, frameId);
}

function cancelPulseAnimation(dot) {
  const frameId = pulseAnimations.get(dot);
  if (frameId) {
    cancelAnimationFrame(frameId);
    pulseAnimations.delete(dot);
  }
}

// Initialize and update every 5 minutes
updateStatus();
setInterval(updateStatus, 1 * 60 * 1000);
