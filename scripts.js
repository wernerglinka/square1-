(() => {
  // js/modules/navigation.js
  var navigation = function() {
    "use strict";
    const init = () => {
      if (!document.querySelector(".js-header")) {
        return;
      }
      const header = document.querySelector(".js-header");
      const mainMenu = document.querySelector(".js-main-menu");
      const page = document.body;
      const main = document.querySelector("#main");
      header.addEventListener("click", (e) => {
        if (e.target.matches(".js-hamburger, .js-hamburger *")) {
          page.classList.toggle("hamburger-active");
        }
      });
      mainMenu.addEventListener("click", (e) => {
        if (e.target.matches("a")) {
          page.classList.add("menu-fadeout");
        }
      });
      window.addEventListener("scroll", (e) => {
        if (window.scrollY >= 100) {
          document.body.classList.add("is-scrolling");
        } else {
          document.body.classList.remove("is-scrolling");
        }
      });
    };
    return { init };
  }();
  var navigation_default = navigation;

  // js/modules/debounce.js
  function debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }
  var debounce_default = debounce;

  // js/modules/section-animation.js
  var sectionAnimations = (() => {
    "use strict";
    const showSection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const thisSection = entry.target;
          thisSection.classList.remove("is-hidden");
          observer.unobserve(thisSection);
        }
      });
    };
    const updateSections = debounce_default(() => {
      const observer = new IntersectionObserver(showSection);
      const allSections = document.querySelectorAll(".js-is-animated");
      allSections.forEach((section) => observer.observe(section));
    }, 500);
    const init = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const allSections = document.querySelectorAll(".js-is-animated");
      allSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top > viewportHeight) {
          section.classList.add("is-hidden");
        }
      });
      const resizeObserver = new ResizeObserver(updateSections);
      resizeObserver.observe(document.body);
    };
    return {
      init
    };
  })();
  var section_animation_default = sectionAnimations;

  // js/modules/mobileFlipcardSupport.js
  var mobileFlipCardSupport = /* @__PURE__ */ function($) {
    const init = () => {
      const flipcards = document.querySelectorAll(".flip-card-wrapper");
      flipcards.forEach((flipcard) => {
        flipcard.addEventListener("touchstart", function() {
          flipcard.classList.toggle("flip");
        });
        flipcard.addEventListener("mouseenter", function() {
          flipcard.classList.add("flip");
        });
        flipcard.addEventListener("mouseleave", function() {
          flipcard.classList.remove("flip");
        });
      });
    };
    return {
      init
    };
  }();
  var mobileFlipcardSupport_default = mobileFlipCardSupport;

  // js/modules/tabs.js
  var tabs = /* @__PURE__ */ function() {
    const init = () => {
      const allTabsContainers = document.querySelectorAll(".js-tabs");
      allTabsContainers.forEach((tabsContainer) => {
        const allTabs = tabsContainer.querySelectorAll(".tab-label");
        const allTabContents = tabsContainer.querySelectorAll(".tab-content");
        let tallestTabContent = 0;
        allTabContents.forEach((tabContent) => {
          if (tabContent.offsetHeight > tallestTabContent) {
            tallestTabContent = tabContent.offsetHeight;
          }
        });
        document.querySelector(".tabs-content").style.height = `${tallestTabContent}px`;
        const resizeObserver = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            tallestTabContent = 0;
            allTabContents.forEach((tabContent) => {
              if (tabContent.offsetHeight > tallestTabContent) {
                tallestTabContent = tabContent.offsetHeight;
              }
            });
            document.querySelector(".tabs-content").style.height = `${tallestTabContent}px`;
          });
        });
        resizeObserver.observe(document.body);
        allTabs.forEach((tab) => {
          tab.addEventListener("click", () => {
            allTabs.forEach((tab2) => tab2.classList.remove("active"));
            tab.classList.add("active");
            const clickedTabIndex = Array.prototype.slice.call(allTabs).indexOf(tab);
            allTabContents.forEach((tabContent) => tabContent.classList.remove("active"));
            allTabContents[clickedTabIndex].classList.add("active");
          });
        });
      });
    };
    return { init };
  }();
  var tabs_default = tabs;

  // js/modules/lottieAnimation.js
  var lottieAnimations = function($) {
    const playLottie = (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const thisLottie = entry.target;
          setTimeout(() => {
            thisLottie.play();
            observer.unobserve(thisLottie);
          }, 500);
        }
      }
    };
    const watchLottie = debounce_default(function() {
      const observer = new IntersectionObserver(playLottie);
      const allLotties = document.querySelectorAll(".js-lottie");
      for (const lottie of allLotties) {
        observer.observe(lottie);
      }
    }, 500);
    const init = () => {
      const options = {
        threshold: 1
      };
      const resizeObserver = new ResizeObserver(watchLottie, options);
      const resizeElement = document.body;
      resizeObserver.observe(resizeElement);
    };
    return {
      init
    };
  }();
  var lottieAnimation_default = lottieAnimations;

  // js/modules/youtube.js
  var youtubeVideo = /* @__PURE__ */ function() {
    const init = function() {
      const modalVideoTriggers = document.querySelectorAll(".js-modal-youtube-video");
      if (modalVideoTriggers.length < 1) {
        return;
      }
      const videoOverlay = document.getElementById("video-overlay");
      const closeVideoOverlay = videoOverlay.querySelector(".close");
      document.addEventListener("click", (e) => {
        if (e.target.matches(".js-modal-youtube-video, .js-modal-youtube-video * ")) {
          const thisTrigger = e.target.closest(".js-modal-youtube-video");
          const requestedVideoID = thisTrigger.dataset.videoid;
          e.preventDefault();
          e.stopPropagation();
          videoOverlay.addEventListener(
            "animationend",
            () => {
              videoOverlay.classList.add("is-open");
              videoOverlay.classList.remove("fadein");
            },
            { once: true }
          );
          videoOverlay.classList.add("fadein");
          document.body.classList.add("modal-active");
          const newIFrame = `
          <iframe
            src="https://www.youtube.com/embed/${requestedVideoID}"
            width="560"
            height="315"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            frameborder="0"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        `;
          document.querySelector("#video-overlay .video-container").innerHTML = newIFrame;
        }
      });
      closeVideoOverlay.addEventListener("click", () => {
        document.querySelector("#video-overlay .video-container").innerHTML = "";
        videoOverlay.addEventListener(
          "animationend",
          () => {
            videoOverlay.classList.remove("is-open");
            videoOverlay.classList.remove("fadeout");
          },
          { once: true }
        );
        videoOverlay.classList.add("fadeout");
        document.body.classList.remove("modal-active");
      });
    };
    return {
      init
    };
  }();
  var youtube_default = youtubeVideo;

  // js/modules/cloudinary.js
  var cloudinaryVideo = /* @__PURE__ */ function() {
    const init = function() {
      const modalVideoTriggers = document.querySelectorAll(".js-modal-cloudinary-video");
      if (modalVideoTriggers.length < 1) {
        return;
      }
      const videoOverlay = document.getElementById("video-overlay");
      const closeVideoOverlay = videoOverlay.querySelector(".close");
      document.addEventListener("click", (e) => {
        if (e.target.matches(".js-modal-cloudinary-video, .js-modal-cloudinary-video * ")) {
          const thisTrigger = e.target.closest(".js-modal-cloudinary-video");
          const requestedVideoID = thisTrigger.dataset.videoid;
          e.preventDefault();
          e.stopPropagation();
          videoOverlay.addEventListener(
            "animationend",
            () => {
              videoOverlay.classList.add("is-open");
              videoOverlay.classList.remove("fadein");
            },
            { once: true }
          );
          videoOverlay.classList.add("fadein");
          document.body.classList.add("modal-active");
          const newIFrame = `
          <iframe
            src="https://player.cloudinary.com/embed/?cloud_name=demo&public_id=${requestedVideoID}",
            width="640"
            height="360"
            style="height: auto; width: 100%; aspect-ratio: 640 / 360;"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowfullscreen
            frameborder="0"
          ></iframe>
        `;
          document.querySelector("#video-overlay .video-container").innerHTML = newIFrame;
        }
      });
      closeVideoOverlay.addEventListener("click", () => {
        document.querySelector("#video-overlay .video-container").innerHTML = "";
        videoOverlay.addEventListener(
          "animationend",
          () => {
            videoOverlay.classList.remove("is-open");
            videoOverlay.classList.remove("fadeout");
          },
          { once: true }
        );
        videoOverlay.classList.add("fadeout");
        document.body.classList.remove("modal-active");
      });
    };
    return {
      init
    };
  }();
  var cloudinary_default = cloudinaryVideo;

  // js/modules/vimeo.js
  var vimeoVideo = /* @__PURE__ */ function() {
    const init = function() {
      const modalVideoTriggers = document.querySelectorAll(".js-modal-vimeo-video");
      if (modalVideoTriggers.length < 1) {
        return;
      }
      const videoOverlay = document.getElementById("video-overlay");
      const closeVideoOverlay = videoOverlay.querySelector(".close");
      document.addEventListener("click", (e) => {
        if (e.target.matches(".js-modal-vimeo-video, .js-modal-vimeo-video * ")) {
          const thisTrigger = e.target.closest(".js-modal-vimeo-video");
          const requestedVideoID = thisTrigger.dataset.videoid;
          console.log("hey");
          e.preventDefault();
          e.stopPropagation();
          videoOverlay.addEventListener(
            "animationend",
            () => {
              videoOverlay.classList.add("is-open");
              videoOverlay.classList.remove("fadein");
            },
            { once: true }
          );
          videoOverlay.classList.add("fadein");
          document.body.classList.add("modal-active");
          const newIFrame = `
          <iframe
            src="https://player.vimeo.com/video/${requestedVideoID}"
            width="640"
            height="360"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen></iframe>
        `;
          document.querySelector("#video-overlay .video-container").innerHTML = newIFrame;
        }
      });
      closeVideoOverlay.addEventListener("click", () => {
        document.querySelector("#video-overlay .video-container").innerHTML = "";
        videoOverlay.addEventListener(
          "animationend",
          () => {
            videoOverlay.classList.remove("is-open");
            videoOverlay.classList.remove("fadeout");
          },
          { once: true }
        );
        videoOverlay.classList.add("fadeout");
        document.body.classList.remove("modal-active");
      });
    };
    return {
      init
    };
  }();
  var vimeo_default = vimeoVideo;

  // js/main.js
  function initPage() {
    navigation_default.init();
    section_animation_default.init();
    if (document.querySelector(".flip-card-wrapper")) {
      mobileFlipcardSupport_default.init();
    }
    if (document.querySelector(".js-tabs")) {
      tabs_default.init();
    }
    if (document.querySelector(".js-lottie")) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      script.onload = function() {
        lottieAnimation_default.init();
      };
      document.head.appendChild(script);
    }
    if (document.querySelector(".js-youtube-video") || document.querySelector(".js-cloudinary-video") || document.querySelector(".js-vimeo-video")) {
      const newVideoOverlay = `
        <div id="video-overlay" class="js-video-overlay">
          <span class="close">[Close]</span>
          <div class="responsive-wrapper">
            <div class="video-container"></div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", newVideoOverlay);
    }
    if (document.querySelector(".js-youtube-video")) {
      youtube_default.init();
    }
    if (document.querySelector(".js-cloudinary-video")) {
      cloudinary_default.init();
    }
    if (document.querySelector(".js-vimeo-video")) {
      vimeo_default.init();
    }
  }
  window.addEventListener("load", function() {
    initPage();
  });
})();
