// Music persistence across pages
// Save music state before leaving page
window.addEventListener('beforeunload', function() {
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) {
    localStorage.setItem('musicTime', bgMusic.currentTime);
    localStorage.setItem('musicPlaying', !bgMusic.paused);
  }
});

// Restore music state on page load
window.addEventListener('load', function() {
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) {
    const savedTime = parseFloat(localStorage.getItem('musicTime')) || 0;
    const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
    
    // Set volume
    bgMusic.volume = 0.5;
    
    // Wait for audio to be loadable
    bgMusic.addEventListener('canplay', function() {
      // Seek to saved time
      bgMusic.currentTime = savedTime;
      
      // Resume if it was playing
      if (wasPlaying) {
        bgMusic.play().catch(error => {
          console.log("Could not resume playback:", error);
        });
      }
    }, { once: true });
    
    // Try to play/pause based on saved state
    if (bgMusic.readyState >= 2) { // HAVE_CURRENT_DATA
      bgMusic.currentTime = savedTime;
      if (wasPlaying) {
        bgMusic.play().catch(error => {
          console.log("Could not resume playback:", error);
        });
      }
    }
  }
});
