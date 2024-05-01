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

  // js/modules/helpers/debounce.js
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

  // js/modules/helpers/modal.js
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
        closeModal();
      });
    };
    return {
      init
    };
  }();
  var modal_video_default = modalVideo;

  // js/modules/helpers/load-script.js
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

  // js/modules/helpers/load-styles.js
  function loadStyles(url) {
    if (document.querySelector(`link[href="${url}"]`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }
  var load_styles_default = loadStyles;

  // js/modules/helpers/dom.js
  function createElementWithId(tagName, id, className = "") {
    const element = document.createElement(tagName);
    element.id = id;
    element.className = className;
    return element;
  }
  function fadeInElement(element, fadeInClass, onAnimationEnd = () => {
  }) {
    element.addEventListener(
      "animationend",
      () => {
        element.classList.add(fadeInClass);
        element.classList.remove("fadein");
        onAnimationEnd();
      },
      { once: true }
    );
    element.classList.add("fadein");
  }

  // js/modules/inline/cloudinary.js
  var inlineCloudinaryVideo = (videoInstance, index) => {
    console.log("Inline CloudinaryVideo Init");
    const videoId = videoInstance.dataset.videoid;
    const containerId = `cloudinary-video-player-${index}`;
    const playerId = `demo-player-${index}`;
    const videoTarget = createElementWithId("div", containerId);
    videoInstance.appendChild(videoTarget);
    Promise.all([
      load_script_default("https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.js", "cloudinary"),
      load_styles_default("https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.css")
    ]).then(() => {
      const videoTag = `
        <video id="${playerId}" controls autoplay class="cld-video-player" data-cld-public-id="${videoId}"></video>
      `;
      videoInstance.querySelector(`#${containerId}`).innerHTML = videoTag;
      const player = cloudinary.videoPlayer(playerId, {
        cloudName: "demo",
        playedEventPercents: [100]
      });
      videoInstance.parentNode.querySelector(".video-trigger").addEventListener("click", (e) => {
        player.play();
        videoInstance.parentNode.classList.add("video-playing");
      });
      player.on("percentsplayed", (event) => {
        videoInstance.parentNode.classList.remove("video-playing");
      });
      videoInstance.querySelector(".close").addEventListener("click", () => {
        player.pause();
        videoInstance.parentNode.classList.remove("video-playing");
      });
    }).catch((error) => {
      console.error(`Error loading script: ${error}`);
    });
  };
  var cloudinary_default = inlineCloudinaryVideo;

  // js/modules/helpers/load-youtube-api.js
  function loadYouTubeAPI() {
    return load_script_default("https://www.youtube.com/iframe_api").then(() => {
      return new Promise((resolve) => {
        const checkYTReady = () => {
          if (window.YT && window.YT.Player) {
            resolve();
          } else {
            setTimeout(checkYTReady, 100);
          }
        };
        checkYTReady();
      });
    });
  }
  var load_youtube_api_default = loadYouTubeAPI;

  // js/modules/inline/youtube.js
  var inlineYoutubeVideo = (videoInstance, index) => {
    let player;
    const handlePlayerStateChange = (event) => {
      if (event.data === YT.PlayerState.ENDED) {
        videoInstance.parentNode.classList.remove("video-playing");
      }
    };
    const createPlayer = (videoId2, containerId2, playerOptions) => {
      player = new YT.Player(containerId2, {
        videoId: videoId2,
        host: "https://www.youtube.com",
        ...playerOptions,
        events: {
          onStateChange: handlePlayerStateChange
        }
      });
    };
    const videoId = videoInstance.dataset.videoid;
    const startTime = videoInstance.dataset.starttime || null;
    const endTime = videoInstance.dataset.endtime || null;
    const containerId = `ytvideo-inline-${index}`;
    const videoTarget = createElementWithId("div", containerId);
    videoInstance.appendChild(videoTarget);
    load_youtube_api_default().then(() => {
      console.log("Inline YouTube API Ready");
      const playerOptions = {
        autoplay: 0,
        start: startTime,
        end: endTime,
        controls: 1,
        enablejsapi: 1,
        wmode: "opaque",
        origin: window.location.origin,
        rel: 0
      };
      createPlayer(videoId, containerId, playerOptions);
      videoInstance.parentNode.querySelector(".video-trigger").addEventListener("click", (e) => {
        player.playVideo();
        videoInstance.parentNode.classList.add("video-playing");
      });
      videoInstance.querySelector(".close").addEventListener("click", () => {
        player.stopVideo();
        videoInstance.parentNode.classList.remove("video-playing");
      });
    }).catch((error) => {
      console.error(`Error loading YouTube API: ${error}`);
    });
  };
  var youtube_default = inlineYoutubeVideo;

  // js/modules/inline/vimeo.js
  var inlineVimeoVideo = (videoInstance, index) => {
    console.log("Inline  VideoVideo Init");
    const videoId = videoInstance.dataset.videoid;
    const containerId = `vimeo-video-player-${index}`;
    const playerId = `demo-player-${index}`;
    const videoTarget = createElementWithId("div", containerId);
    videoInstance.appendChild(videoTarget);
    Promise.all([
      load_script_default("https://player.vimeo.com/api/player.js", "vimeo")
    ]).then(() => {
      const vimeoPlayer = new Vimeo.Player(containerId, {
        id: videoId,
        width: 640,
        height: 360,
        autoplay: false,
        muted: false
      });
      videoInstance.parentNode.querySelector(".video-trigger").addEventListener("click", (e) => {
        vimeoPlayer.play();
        videoInstance.parentNode.classList.add("video-playing");
      });
      vimeoPlayer.on("ended", (event) => {
        videoInstance.parentNode.classList.remove("video-playing");
      });
      videoInstance.querySelector(".close").addEventListener("click", () => {
        vimeoPlayer.pause();
        videoInstance.parentNode.classList.remove("video-playing");
      });
    }).catch((error) => {
      console.error(`Error loading script: ${error}`);
    });
  };
  var vimeo_default = inlineVimeoVideo;

  // js/modules/inline-video.js
  var inlineVideos = /* @__PURE__ */ (() => {
    const videoProviderMap = {
      cloudinary: cloudinary_default,
      youtube: youtube_default,
      vimeo: vimeo_default
    };
    const initVideoPlayer = (videoInstance, index) => {
      const providerId = videoInstance.dataset.videosrc;
      const videoProvider = videoProviderMap[providerId];
      if (videoProvider) {
        videoProvider(videoInstance, index);
      } else {
        console.warn(`Unsupported video provider: ${providerId}`);
      }
    };
    const init = () => {
      console.log("Inline Videos Init");
      const allVideos = document.querySelectorAll(".js-inline-video");
      allVideos.forEach((video, index) => {
        video.id = `inline-video-${index}`;
        initVideoPlayer(video, index);
      });
    };
    return {
      init
    };
  })();
  var inline_video_default = inlineVideos;

  // js/modules/cloudinary-video.js
  var modalCloudinaryVideo = /* @__PURE__ */ function() {
    const init = function() {
      console.log("modalCloudinaryVideo Init");
      const modalVideoTriggers = document.querySelectorAll(".js-modal-cloudinary-video");
      if (modalVideoTriggers.length < 1) {
        return;
      }
      const loadingCloudinary = load_script_default("https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.js", "cloudinary");
      load_styles_default("https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.css");
      const videoOverlay = document.getElementById("video-overlay");
      const closeVideoOverlay = videoOverlay.querySelector(".close");
      modalVideoTriggers.forEach((trigger, index) => {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.target.matches(".js-modal-cloudinary-video, .js-modal-cloudinary-video * ")) {
            const thisTrigger = e.target.closest(".js-modal-cloudinary-video");
            const videoID = thisTrigger.dataset.videoid;
            const videoTarget = document.createElement("div");
            videoTarget.id = `cloudinary-video-player-modal`;
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
                id=demo-player-modal-${index}
                controls
                autoplay
                class="cld-video-player"
                data-cld-public-id=${videoID}
              ></video>`;
              document.getElementById(`cloudinary-video-player-modal`).innerHTML = videoTag;
              const player = cloudinary.videoPlayer(`demo-player-modal-${index}`, {
                cloudName: "demo",
                playedEventPercents: [100]
              });
              player.on("percentsplayed", (event) => {
                closeModal();
              });
            }).catch((error) => {
              console.error(`Error loading script: ${error}`);
            });
          }
        });
      });
      closeVideoOverlay.addEventListener("click", () => {
        closeModal();
      });
    };
    return {
      init
    };
  }();
  var cloudinary_video_default = modalCloudinaryVideo;

  // js/modules/youtube-video.js
  var modalYoutubePlayer = /* @__PURE__ */ (() => {
    let player;
    const handlePlayerStateChange = (event) => {
      if (event.data === YT.PlayerState.ENDED) {
        closeModal();
      }
    };
    const startVideo = () => {
      player.playVideo();
    };
    const createPlayer = (videoId, containerId, playerOptions) => {
      player = new YT.Player(containerId, {
        videoId,
        host: "https://www.youtube.com",
        ...playerOptions,
        events: {
          onReady: startVideo,
          onStateChange: handlePlayerStateChange
        }
      });
    };
    const handleTriggerClick = (e, index) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.matches(".js-modal-youtube-video, .js-modal-youtube-video *")) {
        const trigger = e.target.closest(".js-modal-youtube-video");
        const videoId = trigger.dataset.videoid;
        const startTime = trigger.dataset.starttime || null;
        const endTime = trigger.dataset.endtime || null;
        const videoTarget = createElementWithId("div", `video-target-${index}`);
        document.querySelector("#video-overlay .video-container").appendChild(videoTarget);
        const videoOverlay = document.getElementById("video-overlay");
        fadeInElement(videoOverlay, "is-open", () => {
          document.body.classList.add("modal-active");
        });
        load_youtube_api_default().then(() => {
          const playerOptions = {
            autoplay: 0,
            start: startTime,
            end: endTime,
            controls: 1,
            enablejsapi: 1,
            wmode: "opaque",
            origin: window.location.origin,
            rel: 0
          };
          createPlayer(videoId, `video-target-${index}`, playerOptions);
        });
      }
    };
    const init = () => {
      const modalVideoTriggers = document.querySelectorAll(".js-modal-youtube-video");
      const closeVideoOverlay = document.getElementById("video-overlay").querySelector(".close");
      modalVideoTriggers.forEach((trigger, index) => {
        trigger.addEventListener("click", (e) => handleTriggerClick(e, index));
      });
      closeVideoOverlay.addEventListener("click", closeModal);
    };
    return {
      init
    };
  })();
  var youtube_video_default = modalYoutubePlayer;

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
      modalVideoTriggers.forEach((trigger, index) => {
        trigger.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.target.matches(".js-modal-vimeo-video, .js-modal-vimeo-video * ")) {
            const thisTrigger = e.target.closest(".js-modal-vimeo-video");
            const videoID = thisTrigger.dataset.videoid;
            const videoTarget = document.createElement("div");
            videoTarget.id = `vimeo-video-player-modal-${index}`;
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
              const vimeoPlayer = new Vimeo.Player(`vimeo-video-player-modal-${index}`, {
                id: videoID,
                width: 640,
                height: 360,
                autoplay: false,
                muted: false
              });
              vimeoPlayer.play();
              vimeoPlayer.on("ended", closeModal);
            }).catch((error) => {
              console.error(`Error loading script: ${error}`);
            });
          }
        });
      });
      closeVideoOverlay.addEventListener("click", () => {
        closeModal();
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
    if (document.querySelector(".js-modal-youtube-video")) {
      youtube_video_default.init();
    }
    if (document.querySelector(".js-modal-vimeo-video")) {
      vimeo_video_default.init();
    }
    if (document.querySelector(".js-modal-cloudinary-video")) {
      cloudinary_video_default.init();
    }
  }
  window.addEventListener("load", function() {
    initPage();
  });
})();
