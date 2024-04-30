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

  // js/modules/close-modal.js
  function closeModal() {
    const videoOverlay = document.getElementById("video-overlay");
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
  }
  var close_modal_default = closeModal;

  // js/modules/modal-video.js
  var modalVideo = /* @__PURE__ */ function() {
    const init = function() {
      const modalVideoTriggers = document.querySelectorAll(".js-modal-video");
      if (modalVideoTriggers.length < 1) {
        return;
      }
      const videoOverlay = document.getElementById("video-overlay");
      const closeVideoOverlay = videoOverlay.querySelector(".close");
      modalVideoTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
          if (e.target.matches(".js-modal-video, .js-modal-video * ")) {
            const thisTrigger = e.target.closest(".js-modal-video");
            const requestedVideoID = thisTrigger.dataset.videoid;
            console.log("prevent default");
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
            let url;
            switch (thisTrigger.dataset.videosrc) {
              case "youtube":
                url = `https://www.youtube.com/embed/${requestedVideoID}`;
                break;
              case "vimeo":
                url = `https://player.vimeo.com/video/${requestedVideoID}`;
                break;
              case "cloudinary":
                url = `https://player.cloudinary.com/embed/?cloud_name=demo&public_id=${requestedVideoID}`;
                break;
              default:
                url = "";
                break;
            }
            const newIFrame = `
            <iframe
              src=${url}
              width="640"
              height="360"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              frameborder="0"
              allowfullscreen></iframe>
          `;
            document.querySelector("#video-overlay .video-container").innerHTML = newIFrame;
          } else {
            console.log("not a video trigger link");
          }
        });
      });
      closeVideoOverlay.addEventListener("click", () => {
        close_modal_default();
      });
    };
    return {
      init
    };
  }();
  var modal_video_default = modalVideo;

  // js/modules/inline-video.js
  var inlineVideos = function() {
    const allVideos = document.querySelectorAll(".js-inline-video");
    const allVideoWrappers = document.querySelectorAll(".js-inline-video-wrapper");
    const allPlayers = [];
    const initVideoLinks = function() {
      allVideoWrappers.forEach(function(thisTrigger, i) {
        thisTrigger.nextElementSibling.addEventListener("click", (e) => {
          e.target.parentNode.parentNode.classList.add("video-playing");
        });
      });
    };
    const init = function() {
      allVideos.forEach(function(thisVideo, thisVideoIndex) {
        thisVideo.id = `inline-video-${thisVideoIndex}`;
      });
      allVideos.forEach((thisVideo, i) => {
        const videoID = thisVideo.dataset.videoid;
        let url;
        switch (thisVideo.dataset.videosrc) {
          case "youtube":
            url = `https://www.youtube.com/embed/${videoID}`;
            break;
          case "vimeo":
            url = `https://player.vimeo.com/video/${videoID}`;
            break;
          case "cloudinary":
            url = `https://player.cloudinary.com/embed/?cloud_name=demo&public_id=${videoID}`;
            break;
          default:
            url = "";
            break;
        }
        const newIFrame = `
          <iframe
            src=${url}
            width="640"
            height="360"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            frameborder="0"
            allowfullscreen></iframe>
        `;
        thisVideo.insertAdjacentHTML("beforeend", newIFrame);
      });
      initVideoLinks();
    };
    return {
      init
    };
  }();
  var inline_video_default = inlineVideos;

  // js/modules/load-script.js
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  var load_script_default = loadScript;

  // js/modules/cloudinary-video.js
  var modalCloudinaryVideo = /* @__PURE__ */ function() {
    const init = function() {
      console.log("modalCloudinaryVideo Init");
      const modalVideoTriggers = document.querySelectorAll(".js-modal-cloudinary-video");
      if (modalVideoTriggers.length < 1) {
        return;
      }
      const loadingCloudinary = load_script_default("https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.js");
      const cloudinaryStyles = document.createElement("link");
      cloudinaryStyles.rel = "stylesheet";
      cloudinaryStyles.href = "https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.css";
      document.head.appendChild(cloudinaryStyles);
      const videoOverlay = document.getElementById("video-overlay");
      const closeVideoOverlay = videoOverlay.querySelector(".close");
      modalVideoTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.target.matches(".js-modal-cloudinary-video, .js-modal-cloudinary-video * ")) {
            const thisTrigger = e.target.closest(".js-modal-cloudinary-video");
            const requestedVideoID = thisTrigger.dataset.videoid;
            const videoTarget = document.createElement("div");
            videoTarget.id = "cloudinary-video-player";
            document.querySelector("#video-overlay .video-container").appendChild(videoTarget);
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
            loadingCloudinary.then(() => {
              const videoTag = `
              <video
                id="demo-player"
                controls
                autoplay
                class="cld-video-player"
                data-cld-public-id=${requestedVideoID}
              ></video>`;
              document.getElementById("cloudinary-video-player").innerHTML = videoTag;
              const player = cloudinary.videoPlayer("demo-player", {
                cloudName: "demo",
                playedEventPercents: [100]
              });
              player.on("percentsplayed", (event) => {
                close_modal_default();
              });
            }).catch((error) => {
              console.error(`Error loading script: ${error}`);
            });
          }
        });
      });
      closeVideoOverlay.addEventListener("click", () => {
        close_modal_default();
      });
    };
    return {
      init
    };
  }();
  var cloudinary_video_default = modalCloudinaryVideo;

  // js/modules/youtube-video.js
  var modalYoutubeVideo = /* @__PURE__ */ (() => {
    let player;
    const onPlayerStateChange = (event) => {
      if (event.data === YT.PlayerState.ENDED) {
        close_modal_default();
      }
    };
    const init = () => {
      console.log("modalYoutubeVideo Init");
      const modalVideoTriggers = document.querySelectorAll(".js-modal-youtube-video");
      if (modalVideoTriggers.length < 1) {
        return;
      }
      load_script_default("https://www.youtube.com/iframe_api");
      window.videoAPIReady = new Promise((resolve) => {
        window.onYouTubeIframeAPIReady = () => resolve();
      });
      const videoOverlay = document.getElementById("video-overlay");
      const closeVideoOverlay = videoOverlay.querySelector(".close");
      modalVideoTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.target.matches(".js-modal-youtube-video, .js-modal-youtube-video * ")) {
            const thisTrigger = e.target.closest(".js-modal-youtube-video");
            const requestedVideoID = thisTrigger.dataset.videoid;
            const startTime = thisTrigger.dataset.starttime || null;
            const endTime = thisTrigger.dataset.endtime || null;
            const videoTarget = document.createElement("div");
            videoTarget.id = "ytvideo";
            document.querySelector("#video-overlay .video-container").appendChild(videoTarget);
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
            window.videoAPIReady.then(() => {
              const playerVars = {
                autoplay: 1,
                start: startTime,
                end: endTime,
                controls: 1,
                enablejsapi: 1,
                wmode: "opaque",
                origin: window.location.origin,
                rel: 0
              };
              player = new YT.Player("ytvideo", {
                videoId: requestedVideoID,
                host: "https://www.youtube.com",
                playerVars,
                events: {
                  onStateChange: onPlayerStateChange
                }
              });
            });
          }
        });
      });
      closeVideoOverlay.addEventListener("click", () => {
        close_modal_default();
      });
    };
    return {
      init
    };
  })();
  var youtube_video_default = modalYoutubeVideo;

  // js/modules/vimeo-video.js
  var modalVimeoVideo = /* @__PURE__ */ function() {
    const init = function() {
      console.log("modalVimeoVideo Init");
      const modalVideoTriggers = document.querySelectorAll(".js-modal-vimeo-video");
      if (modalVideoTriggers.length < 1) {
        return;
      }
      const loadingVimeo = load_script_default("https://player.vimeo.com/api/player.js");
      const videoOverlay = document.getElementById("video-overlay");
      const closeVideoOverlay = videoOverlay.querySelector(".close");
      modalVideoTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.target.matches(".js-modal-vimeo-video, .js-modal-vimeo-video * ")) {
            const thisTrigger = e.target.closest(".js-modal-vimeo-video");
            const requestedVideoID = thisTrigger.dataset.videoid;
            const videoTarget = document.createElement("div");
            videoTarget.id = "vimeo-player";
            document.querySelector("#video-overlay .video-container").appendChild(videoTarget);
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
            loadingVimeo.then(() => {
              const vimeoPlayer = new Vimeo.Player("vimeo-player", {
                id: requestedVideoID,
                width: 640,
                height: 360,
                autoplay: false,
                muted: false
              });
              vimeoPlayer.play();
              vimeoPlayer.on("ended", close_modal_default);
            }).catch((error) => {
              console.error(`Error loading script: ${error}`);
            });
          }
        });
      });
      closeVideoOverlay.addEventListener("click", () => {
        close_modal_default();
      });
    };
    return {
      init
    };
  }();
  var vimeo_video_default = modalVimeoVideo;

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
    if (document.querySelector(".js-modal-video") || document.querySelector(".js-modal-cloudinary-video") || document.querySelector(".js-modal-youtube-video") || document.querySelector(".js-modal-vimeo-video")) {
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
    if (document.querySelector(".js-modal-video")) {
      modal_video_default.init();
    }
    if (document.querySelector(".js-inline-video")) {
      inline_video_default.init();
    }
    if (document.querySelector(".js-modal-cloudinary-video")) {
      cloudinary_video_default.init();
    }
    if (document.querySelector(".js-modal-youtube-video")) {
      youtube_video_default.init();
    }
    if (document.querySelector(".js-modal-vimeo-video")) {
      vimeo_video_default.init();
    }
  }
  window.addEventListener("load", function() {
    initPage();
  });
})();
