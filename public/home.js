




// Check if device is mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Create a global variable for LocomotiveScroll
window.locoScroll = null;

function smooothScrolling(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

window.locoScroll = new LocomotiveScroll({
el: document.querySelector(".main"),
smooth: true,
  // offset: 100,
  lerp: isMobile() ? 0.05 : 0.07, // Smoother scrolling on mobile
  smooth: true,
  smartphone: {
    smooth: true,
    lerp: 0.05
  },
  tablet: {
    smooth: true,
    lerp: 0.06
  }
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
window.locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
scrollTop(value) {
  return arguments.length ? window.locoScroll.scrollTo(value, 0, 0) : window.locoScroll.scroll.instance.scroll.y;
}, // we don't have to define a scrollLeft because we're only scrolling vertically.
getBoundingClientRect() {
  return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
},
// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
pinType: document.querySelector(".main").style.transform ? "transform" : "absolute"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => window.locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

// Handle window resize to update animations
window.addEventListener('resize', () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
    window.locoScroll.update();
  }, 200);
});

}
smooothScrolling();




function navTabs(){

const tabs = document.querySelectorAll(".tab");
const indicator = document.querySelector(".tab-indicator");
const hamburger = document.querySelector(".hamburger-menu");
const navTabs = document.querySelector(".nav-tabs");

// Hamburger menu toggle
if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navTabs.classList.toggle("active");
    document.body.classList.toggle("menu-open"); // Prevent scrolling when menu is open
  });
}

// Close menu when clicking on a tab
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // Only update indicator on larger screens where it's visible
    if (window.innerWidth > 768 && indicator) {
      indicator.style.left = `${tab.offsetLeft}px`;
      indicator.style.width = `${tab.offsetWidth}px`;
    }

    // Close the mobile menu if it's open
    if (hamburger && hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
      navTabs.classList.remove("active");
      document.body.classList.remove("menu-open");
    }

    // If the "Help" tab is clicked (index 2), scroll to page5
    if (index === 2) {
      scrollToPage5();
    }
  });
});

window.addEventListener("load", () => {
  const activeTab = document.querySelector(".tab.active");
  if (activeTab && indicator && window.innerWidth > 768) {
    indicator.style.left = `${activeTab.offsetLeft}px`;
    indicator.style.width = `${activeTab.offsetWidth}px`;
  }
});

// Update indicator on window resize
window.addEventListener("resize", () => {
  const activeTab = document.querySelector(".tab.active");
  if (activeTab && indicator) {
    if (window.innerWidth > 768) {
      indicator.style.display = "block";
      indicator.style.left = `${activeTab.offsetLeft}px`;
      indicator.style.width = `${activeTab.offsetWidth}px`;
    } else {
      indicator.style.display = "none";
    }
  }
});

}
navTabs();





function shoesAnimation(){
  const shoes = document.querySelector("#shoes-img");
  // const shoesImg = document.querySelector("#shoes-img");
  const page2h1 = document.querySelector(".page2-right-container #hero-letter1");
  const page2h2 = document.querySelector(".page2-right-container #hero-letter2");
  const page2h3 = document.querySelector(".page2-right-container #hero-letter3");
  const page2h4 = document.querySelector(".page2-right-container #hero-letter4");
  const page2h5 = document.querySelector(".page2-right-container #hero-letter5");
  const page2h6 = document.querySelector(".page2-right-container #hero-letter6");
  const page2h7 = document.querySelector(".page2-right-container #hero-letter7");
  const page2h8 = document.querySelector(".page2-right-container #hero-letter8");
  const page2h9 = document.querySelector(".page2-right-container #hero-letter9");
  const page2h10 = document.querySelector(".page2-right-container #hero-letter10");
  const page2h11 = document.querySelector(".page2-right-container #hero-letter11");
  const page2h12 = document.querySelector(".page2-right-container #hero-letter12");
  const page2h13 = document.querySelector(".page2-right-container #hero-letter13");
  const page2h14 = document.querySelector(".page2-right-container #hero-letter14");
  const page2h15 = document.querySelector(".page2-right-container #hero-letter15");
  const page2h16 = document.querySelector(".page2-right-container #hero-letter16");
  const page2h17 = document.querySelector(".page2-right-container #hero-letter17");
  const page2h18 = document.querySelector(".page2-right-container #hero-letter18");
  const page2h19 = document.querySelector(".page2-right-container #hero-letter19");
  const page2h20 = document.querySelector(".page2-right-container #hero-letter20");
  const page2h21 = document.querySelector(".page2-right-container #hero-letter21");
  const page2h22 = document.querySelector(".page2-right-container #hero-letter22");
  const page2h23 = document.querySelector(".page2-right-container #hero-letter23");
  const page2h24 = document.querySelector(".page2-right-container #hero-letter24");
  const page2h25 = document.querySelector(".page2-right-container #hero-letter25");
  const page2h26 = document.querySelector(".page2-right-container #hero-letter26");
  const page2h27 = document.querySelector(".page2-right-container #hero-letter27");
  const page2h28 = document.querySelector(".page2-right-container #hero-letter28");
  const page2h29 = document.querySelector(".page2-right-container #hero-letter29");
  const page2h30 = document.querySelector(".page2-right-container #hero-letter30");
  const page2h31 = document.querySelector(".page2-right-container #hero-letter31");
  const page2h32 = document.querySelector(".page2-right-container #hero-letter32");
  const page2h33 = document.querySelector(".page2-right-container #hero-letter33");
  const page2h34 = document.querySelector(".page2-right-container #hero-letter34");

  // Different animation parameters based on screen size
  const getShoesPosition = () => {
   

    if (window.innerWidth <= 390) {
      // Small mobile
      return {
        top: "241%",
        right: "38%",
        rotate: "-46deg",
        scale: 1,
        duration: 1.8
      };
    } else if(window.innerWidth <= 430) {
      // Small mobile
      return {
        top: "235%",
        right: "33%",
        rotate: "-42deg",
        scale: 1,
        duration: 1.8
      };
    } else if (window.innerWidth <= 768) {
      // Medium mobile
      return {
        top: "90%",
        right: "10%",
        rotate: "-5deg",
        scale: 0.8,
        duration: 2
      };
    } else if (window.innerWidth <= 992) {
      // Tablet
      return {
        top: "100%",
        right: "100%",
        rotate: "-9deg",
        scale: 1,
        duration: 2.2
      };
    } else {
      // Desktop
      return {
        top: "100%",
        right: "166%",
        rotate: "-9deg",
        scale: 1,
        duration: 2.3
      };
    }
  };

  // Adjust ScrollTrigger settings based on screen size
  const getScrollTriggerSettings = () => {
    if (isMobile()) {
      return {
        trigger: ".page2",
        scroller: ".main",
        start: "top 90%",
        end: "30% 50%",
        // markers: true,
        scrub: 0.8,
      };
    } else {
      return {
        trigger: ".page2",
        scroller: ".main",
        start: "top 95%",
        end: "50% 50%",
        // markers: true,
        scrub: 1,
      };
    }
  };

  let tl1 = gsap.timeline({
    scrollTrigger: getScrollTriggerSettings(),
  });

  // Get position based on current screen size
  const shoesPosition = getShoesPosition();

  tl1.to(shoes, {
    top: shoesPosition.top,
    right: shoesPosition.right,
    rotate: shoesPosition.rotate,
    scale: shoesPosition.scale,
    duration: shoesPosition.duration,
  }, "anime1");

  const page2Letters = [page2h1, page2h2, page2h3, page2h4, page2h5, page2h6, page2h7, page2h8, page2h9, page2h10, page2h11, page2h12, page2h13, page2h14, page2h15, page2h16, page2h17, page2h18, page2h19, page2h20, page2h21, page2h22, page2h23, page2h24, page2h25, page2h26, page2h27, page2h28, page2h29, page2h30, page2h31, page2h32, page2h33, page2h34];

  // Adjust animation speed based on screen size
  const letterAnimationDelay = isMobile() ? 0.02 : 0.03;

  page2Letters.forEach((letter, index) => {
    if (letter) { // Check if element exists
      tl1.from(letter, {
        color: "#D1C3C3",
        duration: isMobile() ? 0.2 : 0.3,
        delay: 1 + index * letterAnimationDelay,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(letter, {
            y: isMobile() ? -5 : -10,
            yoyo: true,
            repeat: 1,
            duration: isMobile() ? 0.2 : 0.25,
            ease: "power1.inOut"
          });
        }
      }, "anime1");
    }
  });

  // Update animations on window resize
  window.addEventListener('resize', () => {
    // Get new position and ScrollTrigger settings based on current screen size
    const newShoesPosition = getShoesPosition();
    const newScrollTriggerSettings = getScrollTriggerSettings();

    // Kill the old ScrollTrigger and create a new one
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger === ".page2") {
        st.kill(true);
      }
    });

    // Create a new timeline with updated settings
    tl1 = gsap.timeline({
      scrollTrigger: newScrollTriggerSettings
    });

    // Add the animations to the new timeline
    tl1.to(shoes, {
      top: newShoesPosition.top,
      right: newShoesPosition.right,
      rotate: newShoesPosition.rotate,
      scale: newShoesPosition.scale,
      duration: newShoesPosition.duration,
    }, "anime1");

    // Re-add letter animations
    const updatedLetterAnimationDelay = isMobile() ? 0.02 : 0.03;

    page2Letters.forEach((letter, index) => {
      if (letter) {
        tl1.from(letter, {
          color: "#D1C3C3",
          duration: isMobile() ? 0.2 : 0.3,
          delay: 1 + index * updatedLetterAnimationDelay,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(letter, {
              y: isMobile() ? -5 : -10,
              yoyo: true,
              repeat: 1,
              duration: isMobile() ? 0.2 : 0.25,
              ease: "power1.inOut"
            });
          }
        }, "anime1");
      }
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
  });
}
shoesAnimation();




function shoesAnimation2(){
  const shoes = document.querySelector("#shoes-img");
  const page2 = document.querySelector(".page2");
  const box1 = document.querySelector(".box1");

  const h1 = document.querySelector(".page3-left #letter-1");
  const h2 = document.querySelector(".page3-left #letter-2");
  const h3 = document.querySelector(".page3-left #letter-3");
  const h4 = document.querySelector(".page3-left #letter-4");
  const h5 = document.querySelector(".page3-left #letter-5");
  const h6 = document.querySelector(".page3-left #letter-6");
  const h7 = document.querySelector(".page3-left #letter-7");
  const h8 = document.querySelector(".page3-left #letter-8");
  const h9 = document.querySelector(".page3-left #letter-9");
  const h10 = document.querySelector(".page3-left #letter-10");
  const h11 = document.querySelector(".page3-left #letter-11");
  const h12 = document.querySelector(".page3-left #letter-12");
  const h13 = document.querySelector(".page3-left #letter-13");
  const h14 = document.querySelector(".page3-left #letter-14");
  const h15 = document.querySelector(".page3-left #letter-15");
  const h16 = document.querySelector(".page3-left #letter-16");
  const h17 = document.querySelector(".page3-left #letter-17");
  const h18 = document.querySelector(".page3-left #letter-18");
  const h19 = document.querySelector(".page3-left #letter-19");
  const h20 = document.querySelector(".page3-left #letter-20");
  const h21 = document.querySelector(".page3-left #letter-21");
  const h22 = document.querySelector(".page3-left #letter-22");
  const h23 = document.querySelector(".page3-left #letter-23");
  const h24 = document.querySelector(".page3-left #letter-24");
  const h25 = document.querySelector(".page3-left #letter-25");
  const h26 = document.querySelector(".page3-left #letter-26");
  const h27 = document.querySelector(".page3-left #letter-27");
  const h28 = document.querySelector(".page3-left #letter-28");
  const h29 = document.querySelector(".page3-left #letter-29");
  const h30 = document.querySelector(".page3-left #letter-30");

  const p = document.querySelector(".page3-left p");

  // Different animation parameters based on screen size
  const getShoesPosition2 = () => {

    if (window.innerWidth <= 390) {
      // Small mobile
      return {
        top: "850%",
        right: "07%",
        rotate: "-08deg",
        scale: 0.4,
        duration: 2
      };
    } else if (window.innerWidth <= 430) {
      // Small mobile
      return {
        top: "786%",
        right: "06%",
        rotate: "-08deg",
        scale: 0.3,
        duration: 1.8
      };
    } else if (window.innerWidth <= 768) {
      // Medium mobile
      return {
        top: "180%",
        right: "20%",
        rotate: "-5deg",
        scale:  0.15,
        duration: 2
      };
    } else if (window.innerWidth <= 992) {
      // Tablet
      return {
        top: "230%",
        right: "70%",
        rotate: "-9deg",
        scale: 0.19,
        duration: 2.2
      };
    } else {
      // Desktop
      return {
        top: "249%",
        right: "88%",
        rotate: "-9deg",
        scale: 0.2,
        duration: 2.3
      };
    }
  };

  // Adjust ScrollTrigger settings based on screen size
  const getScrollTriggerSettings2 = () => {
    if (isMobile()) {
      return {
        trigger: ".page2",
        scroller: ".main",
        start: "80% 95%",
        end: "230% 10%",
        // markers: true,
        scrub: 0.8,
      };
    } else {
      return {
        trigger: ".page2",
        scroller: ".main",
        start: "115% 95%",
        end: "125% 5%",
        // markers: true,
        scrub: 1,
      };
    }
  };

  let tl1 = gsap.timeline({
    scrollTrigger: getScrollTriggerSettings2(),
  });

  // Get position based on current screen size
  const shoesPosition = getShoesPosition2();

  tl1.to(shoes, {
    top: shoesPosition.top,
    right: shoesPosition.right,
    rotate: shoesPosition.rotate,
    scale: shoesPosition.scale,
    duration: shoesPosition.duration,
  }, "anime2");

  const letters = [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23, h24, h25, h26, h27, h28, h29, h30];

  // Adjust animation speed based on screen size
  const letterAnimationDelay = isMobile() ? 0.02 : 0.03;

  letters.forEach((letter, index) => {
    if (letter) { // Check if element exists
      tl1.from(letter, {
        color: "white",
        duration: isMobile() ? 0.08 : 0.1,
        delay: index * letterAnimationDelay,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(letter, {
            y: isMobile() ? -5 : -10,
            yoyo: true,
            repeat: 1,
            duration: isMobile() ? 0.2 : 0.25,
            ease: "power1.inOut"
          });
        }
      }, "anime2");
    }
  });

  // Update animations on window resize
  window.addEventListener('resize', () => {
    // Get new position and ScrollTrigger settings based on current screen size
    const newShoesPosition = getShoesPosition2();
    const newScrollTriggerSettings = getScrollTriggerSettings2();

    // Kill the old ScrollTrigger and create a new one
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger === ".page2" && st.vars.start.includes("80%") || st.vars.start.includes("115%")) {
        st.kill(true);
      }
    });

    // Create a new timeline with updated settings
    tl1 = gsap.timeline({
      scrollTrigger: newScrollTriggerSettings
    });

    // Add the animations to the new timeline
    tl1.to(shoes, {
      top: newShoesPosition.top,
      right: newShoesPosition.right,
      rotate: newShoesPosition.rotate,
      scale: newShoesPosition.scale,
      duration: newShoesPosition.duration,
    }, "anime2");

    // Re-add letter animations
    const updatedLetterAnimationDelay = isMobile() ? 0.02 : 0.03;

    letters.forEach((letter, index) => {
      if (letter) {
        tl1.from(letter, {
          color: "white",
          duration: isMobile() ? 0.08 : 0.1,
          delay: index * updatedLetterAnimationDelay,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(letter, {
              y: isMobile() ? -5 : -10,
              yoyo: true,
              repeat: 1,
              duration: isMobile() ? 0.2 : 0.25,
              ease: "power1.inOut"
            });
          }
        }, "anime2");
      }
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
  });
}
shoesAnimation2();

// Function to scroll to page5 (footer)
function scrollToPage5() {
  const page5 = document.querySelector('.page5');

  if (page5) {
    // Get the LocomotiveScroll instance
    const locoScroll = window.locoScroll;

    if (locoScroll) {
      // Smooth scroll to page5 with animation
      locoScroll.scrollTo(page5, {
        duration: 1500,
        easing: [0.25, 0.1, 0.25, 1], // cubic-bezier easing
        disableLerp: false
      });
    } else {
      // Fallback if LocomotiveScroll is not available
      page5.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Add click event to the "Contact Us" text in the footer and other footer elements
document.addEventListener('DOMContentLoaded', () => {
  const contactUs = document.getElementById('contact-us');
  const subscribeUs = document.getElementById('subscribe-us');
  const footerLinks = document.querySelectorAll('.footer-links a');

  // Add click event to Contact Us
  if (contactUs) {
    contactUs.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToPage5();
    });
  }

  // Add click event to Subscribe Us
  if (subscribeUs) {
    subscribeUs.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToPage5();
    });
  }

  // Add click events to all footer links
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Animate the link
      gsap.to(link, {
        scale: 1.1,
        color: '#ff6b00',
        duration: 0.3,
        yoyo: true,
        repeat: 1
      });

      // Scroll to page5
      scrollToPage5();
    });
  });
});


// const currentUser = {
//   _id: "<%= userId %>",
//   name: "<%= username %>"
// };
// localStorage.setItem("currentUser", JSON.stringify(currentUser));

// function logout() {
//   localStorage.removeItem("currentUser");
//   window.location.href = "/login";
// }





