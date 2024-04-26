(() => {
  // js/modules/navigation.js
  var navigation = function() {
    "use strict";
    const init = () => {
      console.log("enter init navigation");
      if (!document.querySelector(".js-header")) {
        return;
      }
      console.log("init navigation");
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
  var sectionAnimations = function() {
    "use strict";
    const showSection = (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const thisSection = entry.target;
          thisSection.classList.remove("is-hidden");
          observer.unobserve(thisSection);
        }
      }
    };
    const updateSections = debounce_default(function() {
      const observer = new IntersectionObserver(showSection);
      const allSections = document.querySelectorAll(".js-is-animated");
      for (const section of allSections) {
        observer.observe(section);
      }
    }, 500);
    const init = () => {
      console.log("init section animations");
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const allSections = document.querySelectorAll(".js-is-animated");
      for (const section of allSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top > viewportHeight) {
          console.log("hide section");
          section.classList.add("is-hidden");
        }
      }
      const resizeObserver = new ResizeObserver(updateSections);
      const resizeElement = document.body;
      resizeObserver.observe(resizeElement);
    };
    return {
      init
    };
  }();
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
  var youtubeVideo = /* @__PURE__ */ (() => {
    let player;
    const initVideoLinks = () => {
      const videoOverlay = document.getElementById("video-overlay");
      const closeVideoOverlay = videoOverlay.querySelector(".close");
      document.addEventListener("click", (e) => {
        if (e.target.matches(".js-modal-youtube-video, .js-modal-youtube-video *")) {
          const thisTrigger = e.target.closest(".js-modal-youtube-video");
          const { videoid: requestedVideoID, startTime, endTime } = thisTrigger.dataset;
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
          if (requestedVideoID === player.getVideoEmbedCode()) {
            player.playVideo();
          } else {
            player.loadVideoById({
              videoId: requestedVideoID,
              startSeconds: startTime || null,
              endSeconds: endTime || null
            });
          }
          player.setVolume(50);
        }
      });
      closeVideoOverlay.addEventListener("click", () => {
        let currentVolume = player.getVolume();
        const fadeout = setInterval(() => {
          if (currentVolume <= 0) {
            player.pauseVideo();
            clearInterval(fadeout);
          }
          currentVolume -= 5;
          player.setVolume(currentVolume);
        }, 100);
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
    const onPlayerStateChange = (event) => {
      const videoOverlay = document.getElementById("video-overlay");
      if (event.data === YT.PlayerState.ENDED) {
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
      }
    };
    const init = () => {
      const modalVideoTriggers = document.querySelectorAll(".js-modal-youtube-video");
      if (modalVideoTriggers.length < 1) {
        return;
      }
      window.videoAPIReady.then(() => {
        const { videoid: videoId, startTime, endTime } = modalVideoTriggers[0].dataset;
        const playerVars = {
          autoplay: 0,
          start: startTime || null,
          end: endTime || null,
          controls: 1,
          enablejsapi: 1,
          wmode: "opaque",
          origin: window.location.origin,
          rel: 0
        };
        player = new YT.Player("ytvideo", {
          videoId,
          host: "https://www.youtube.com",
          playerVars,
          events: {
            onReady: initVideoLinks,
            onStateChange: onPlayerStateChange
          }
        });
      });
    };
    return {
      init
    };
  })();
  var youtube_default = youtubeVideo;

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
        console.log("lottie player loaded");
        lottieAnimation_default.init();
      };
      document.head.appendChild(script);
    }
    if (document.querySelector(".js-youtube-video")) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.videoAPIReady = new Promise((resolve) => {
        window.onYouTubeIframeAPIReady = resolve;
      });
      if (!document.querySelector("#video-overlay")) {
        const newVideoOverlay = `
        <div id="video-overlay" class="js-video-overlay">
          <span class="close">[Close]</span>
          <div class="responsive-wrapper">
            <div class="video-container">
              <div id="ytvideo"></div>
            </div>
          </div>
        </div>
      `;
        document.body.insertAdjacentHTML("beforeend", newVideoOverlay);
      }
      youtube_default.init();
    }
  }
  window.addEventListener("load", function() {
    initPage();
  });
})();
