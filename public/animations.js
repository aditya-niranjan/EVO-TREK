// Check if device is mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// First Animation - Desktop Version
function shoesAnimationDesktop(shoes, page2Letters) {
  // Desktop settings
  const shoesPosition = {
    top: "100%",
    right: "166%",
    rotate: "-9deg",
    scale: 1,
    duration: 2.3
  };

  const scrollTriggerSettings = {
    trigger: ".page2",
    scroller: ".main",
    start: "top 95%",
    end: "50% 50%",
    // markers: true,
    scrub: 1,
  };

  let tl1 = gsap.timeline({
    scrollTrigger: scrollTriggerSettings,
  });

  // Desktop animation
  tl1.to(shoes, {
    top: shoesPosition.top,
    right: shoesPosition.right,
    rotate: shoesPosition.rotate,
    scale: shoesPosition.scale,
    duration: shoesPosition.duration,
  }, "anime1");

  // Letter animations for desktop
  const letterAnimationDelay = 0.08;

  page2Letters.forEach((letter, index) => {
    if (letter) { // Check if element exists
      tl1.from(letter, {
        color: "#D1C3C3",
        duration: 0.3,
        delay: 1 + index * letterAnimationDelay,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(letter, {
            y: -10,
            yoyo: true,
            repeat: 1,
            duration: 0.25,
            ease: "power1.inOut"
          });
        }
      }, "anime1");
    }
  });
}






// First Animation - Mobile Version
function shoesAnimationMobile(shoes, page2Letters) {
  // Mobile settings
  let shoesPosition;
  
  if (window.innerWidth <= 480) {
    // Small mobile
    shoesPosition = {
      top: "240%",
      right: "25%",
      rotate: "-10deg",
      scale: 1,
      duration: 1.8,
    };
  } else {
    // Medium mobile (up to 768px)
    shoesPosition = {
      top: "90%",
      right: "10%",
      rotate: "-5deg",
      scale: 0.8,
      duration: 2
    };
  }

  const scrollTriggerSettings = {
    trigger: ".page2",
    scroller: ".main",
    start: "top 90%",
    end: "30% 50%",
    // markers: true,
    scrub: 0.8,
  };

  let tl1 = gsap.timeline({
    scrollTrigger: scrollTriggerSettings,
  });

  // Mobile animation
  tl1.to(shoes, {
    top: shoesPosition.top,
    right: shoesPosition.right,
    rotate: shoesPosition.rotate,
    scale: shoesPosition.scale,
    duration: shoesPosition.duration,
  }, "anime1");

  // Letter animations for mobile
  const letterAnimationDelay = 0.07;

  page2Letters.forEach((letter, index) => {
    if (letter) { // Check if element exists
      tl1.from(letter, {
        color: "#D1C3C3",
        duration: 0.2,
        delay: 1 + index * letterAnimationDelay,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(letter, {
            y: -5,
            yoyo: true,
            repeat: 1,
            duration: 0.2,
            ease: "power1.inOut"
          });
        }
      }, "anime1");
    }
  });
}












// Second Animation - Desktop Version
function shoesAnimation2Desktop(shoes, letters) {
  // Desktop settings
  const shoesPosition = {
    top: "249%",
    right: "88%",
    rotate: "-9deg",
    scale: 0.2,
    duration: 2.3
  };

  const scrollTriggerSettings = {
    trigger: ".page2",
    scroller: ".main",
    start: "115% 95%",
    end: "125% 5%",
    // markers: true,
    scrub: 0.3,
  };

  let tl1 = gsap.timeline({
    scrollTrigger: scrollTriggerSettings,
  });

  // Desktop animation
  tl1.to(shoes, {
    top: shoesPosition.top,
    right: shoesPosition.right,
    rotate: shoesPosition.rotate,
    scale: shoesPosition.scale,
    duration: shoesPosition.duration,
  }, "anime2");

  // Letter animations for desktop
  const letterAnimationDelay = 0.03;

  letters.forEach((letter, index) => {
    if (letter) { // Check if element exists
      tl1.from(letter, {
        color: "white",
        duration: 0.1,
        delay: index * letterAnimationDelay,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(letter, {
            y: -10,
            yoyo: true,
            repeat: 1,
            duration: 0.25,
            ease: "power1.inOut"
          });
        }
      }, "anime2");
    }
  });
}






// Second Animation - Mobile Version
function shoesAnimation2Mobile(shoes, letters) {
  // Mobile settings
  let shoesPosition;
  
  if (window.innerWidth <= 480) {
    // Small mobile
    shoesPosition = {
      top: "500%",
      left: "50%",
      xPercent: -50,
      rotate: "0deg",
      scale: 0.12,
      duration: 1.8
    };
  } else {
    // Medium mobile (up to 768px)
    shoesPosition = {
      top: "500%",
      left: "50%",
      xPercent: -50,
      rotate: "-5deg",
      scale: 0.15,
      duration: 2
    };
  }

  const scrollTriggerSettings = {
    trigger: ".page2",
    scroller: ".main",
    start: "80% 90%",
    end: "250% 10%",
    // markers: true,
    scrub: 2,
    pin: false,
  };

  let tl1 = gsap.timeline({
    scrollTrigger: scrollTriggerSettings,
  });

  // Mobile animation
  tl1.to(shoes, {
    top: shoesPosition.top,
    left: shoesPosition.left,
    xPercent: shoesPosition.xPercent,
    rotate: shoesPosition.rotate,
    scale: shoesPosition.scale,
    ease: "power1.out",
    clearProps: "right",
  }, "anime2");

  // Letter animations for mobile
  const letterAnimationDelay = 0.02;

  letters.forEach((letter, index) => {
    if (letter) { // Check if element exists
      tl1.from(letter, {
        color: "white",
        duration: 0.08,
        delay: index * letterAnimationDelay,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(letter, {
            y: -5,
            yoyo: true,
            repeat: 1,
            duration: 0.2,
            ease: "power1.inOut"
          });
        }
      }, "anime2");
    }
  });
}
