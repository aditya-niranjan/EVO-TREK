// Examples of how to use the letter animation functions

// Basic letter animation example
function basicLetterAnimationExample() {
  // Get your letters
  const letters = document.querySelectorAll('.my-letters');
  
  // Create a GSAP timeline
  const tl = gsap.timeline();
  
  // Use the simple animateLetters function
  animateLetters({
    timeline: tl,
    letters: letters,
    baseDelay: 0.5,          // Wait 0.5 seconds before starting
    letterDelay: 0.1,        // 0.1 seconds between each letter
    initialColor: "#cccccc", // Start with light gray
    duration: 0.3,           // Each letter takes 0.3s to animate
    bounceHeight: -15,       // Bounce up 15px
    bounceDuration: 0.4,     // Bounce animation takes 0.4s
    label: "myAnimation",    // Label in the timeline
    ease: "power2.out"       // Use power2.out easing
  });
}

// Advanced letter animation examples
function advancedLetterAnimationExamples() {
  // Get your letters
  const letters = document.querySelectorAll('.my-letters');
  
  // Create a GSAP timeline
  const tl = gsap.timeline();
  
  // Example 1: Staggered animation with custom colors
  advancedLetterAnimation({
    timeline: tl,
    letters: letters,
    baseDelay: 0.2,
    staggered: true,
    staggerAmount: 0.05,
    fromVars: {
      color: "#ff0000",      // Start with red
      duration: 0.4,
      ease: "back.out(1.7)"  // Use a back ease for a more dynamic feel
    },
    bounceVars: {
      y: -20,                // Higher bounce
      duration: 0.3,
      ease: "elastic.out(1, 0.3)" // Elastic bounce
    },
    label: "redAnimation"
  });
  
  // Example 2: Individual letter control with rotation
  advancedLetterAnimation({
    timeline: tl,
    letters: letters,
    baseDelay: 2,            // Start 2 seconds after timeline begins
    letterDelay: 0.08,
    fromVars: {
      color: "#0000ff",      // Start with blue
      rotation: 180,         // Start rotated
      scale: 0,              // Start scaled down
      duration: 0.5,
      ease: "power3.out"
    },
    bounceVars: {
      y: -8,
      rotation: 360,         // Complete a full rotation during bounce
      duration: 0.6,
      ease: "power1.inOut"
    },
    label: "blueAnimation",
    customCallback: (letter, index) => {
      // Custom callback for each letter
      console.log(`Letter ${index} animation complete`);
      // You could add additional animations or logic here
    }
  });
  
  // Example 3: Text reveal with opacity
  advancedLetterAnimation({
    timeline: tl,
    letters: letters,
    baseDelay: 4,            // Start 4 seconds after timeline begins
    staggered: true,
    staggerAmount: 0.03,
    fromVars: {
      opacity: 0,            // Start invisible
      y: 50,                 // Start below final position
      color: "#00ff00",      // Start with green
      duration: 0.7,
      ease: "power4.out"
    },
    bounceVars: {
      y: -5,                 // Subtle bounce
      scale: 1.2,            // Scale up slightly during bounce
      duration: 0.2,
      ease: "power1.inOut"
    },
    label: "revealAnimation"
  });
}

// How to modify letter animations for different screen sizes
function responsiveLetterAnimations() {
  // Get your letters
  const letters = document.querySelectorAll('.my-letters');
  
  // Create a GSAP timeline
  const tl = gsap.timeline();
  
  // Check if mobile
  if (window.innerWidth <= 768) {
    // Mobile animation - faster, smaller bounce
    animateLetters({
      timeline: tl,
      letters: letters,
      baseDelay: 0.2,
      letterDelay: 0.05,     // Faster delay between letters
      initialColor: "#cccccc",
      duration: 0.2,         // Faster animation
      bounceHeight: -5,      // Smaller bounce
      bounceDuration: 0.2,   // Faster bounce
      label: "mobileAnimation"
    });
  } else {
    // Desktop animation - slower, bigger bounce
    animateLetters({
      timeline: tl,
      letters: letters,
      baseDelay: 0.5,
      letterDelay: 0.1,      // Slower delay between letters
      initialColor: "#cccccc",
      duration: 0.4,         // Slower animation
      bounceHeight: -15,     // Bigger bounce
      bounceDuration: 0.4,   // Slower bounce
      label: "desktopAnimation"
    });
  }
  
  // Update on window resize
  window.addEventListener('resize', () => {
    // Kill the old timeline
    tl.kill();
    
    // Create a new timeline
    const newTl = gsap.timeline();
    
    // Re-run the appropriate animation
    if (window.innerWidth <= 768) {
      animateLetters({
        timeline: newTl,
        letters: letters,
        baseDelay: 0.2,
        letterDelay: 0.05,
        initialColor: "#cccccc",
        duration: 0.2,
        bounceHeight: -5,
        bounceDuration: 0.2,
        label: "mobileAnimation"
      });
    } else {
      animateLetters({
        timeline: newTl,
        letters: letters,
        baseDelay: 0.5,
        letterDelay: 0.1,
        initialColor: "#cccccc",
        duration: 0.4,
        bounceHeight: -15,
        bounceDuration: 0.4,
        label: "desktopAnimation"
      });
    }
  });
}
