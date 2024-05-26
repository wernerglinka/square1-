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
    function SectionAnimationsObj(section) {
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
        observer.observe(section);
      }, 500);
      const initSection = () => {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const rect = section.getBoundingClientRect();
        if (rect.top > viewportHeight) {
          section.classList.add("is-hidden");
        }
        const resizeObserver = new ResizeObserver(updateSections);
        resizeObserver.observe(document.body);
      };
      initSection();
      return {
        section
      };
    }
    const initSectionAnimations = () => {
      const animatedSections = document.querySelectorAll(".js-is-animated");
      animatedSections.forEach((section) => {
        return new SectionAnimationsObj(section);
      });
    };
    return {
      init: initSectionAnimations
    };
  })();
  var section_animation_default = sectionAnimations;

  // js/modules/flipcards.js
  var mobileFlipCardSupport = /* @__PURE__ */ function($) {
    function FlipcardObj(flipcard, options) {
      const defaults = {
        // Default options
      };
      const settings = { ...defaults, ...options };
      flipcard.addEventListener("touchstart", function() {
        flipcard.classList.toggle("flip");
      });
      flipcard.addEventListener("mouseenter", function() {
        flipcard.classList.add("flip");
      });
      flipcard.addEventListener("mouseleave", function() {
        flipcard.classList.remove("flip");
      });
      return {
        flipcard,
        settings
      };
    }
    const initFlipcards = () => {
      const flipcards = document.querySelectorAll(".flip-card-wrapper");
      flipcards.forEach((flipcard) => {
        return new FlipcardObj(flipcard);
      });
    };
    return {
      init: initFlipcards
    };
  }();
  var flipcards_default = mobileFlipCardSupport;

  // js/modules/tabs.js
  var tabs = /* @__PURE__ */ (() => {
    function TabsObj(tabsContainer, options = {}) {
      const defaultOptions = {
        // Add default options if needed
      };
      const tabsInstance = {
        tabsContainer,
        options: { ...defaultOptions, ...options },
        allTabs: tabsContainer.querySelectorAll(".tab-label"),
        allTabContents: tabsContainer.querySelectorAll(".tab-content"),
        tabsContent: tabsContainer.querySelector(".tabs-content")
      };
      const init = () => {
        const { allTabs, allTabContents, tabsContent } = tabsInstance;
        if (tabsContent) {
          let tallestTabContent = 0;
          allTabContents.forEach((tabContent) => {
            if (tabContent.offsetHeight > tallestTabContent) {
              tallestTabContent = tabContent.offsetHeight;
            }
          });
          tabsContent.style.height = `${tallestTabContent}px`;
          const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach(() => {
              tallestTabContent = 0;
              allTabContents.forEach((tabContent) => {
                if (tabContent.offsetHeight > tallestTabContent) {
                  tallestTabContent = tabContent.offsetHeight;
                }
              });
              tabsContent.style.height = `${tallestTabContent}px`;
            });
          });
          resizeObserver.observe(document.body);
        }
        allTabs.forEach((tab) => {
          tab.addEventListener("click", () => {
            allTabs.forEach((thisTab) => thisTab.classList.remove("active"));
            tab.classList.add("active");
            const clickedTabIndex = Array.from(allTabs).indexOf(tab);
            allTabContents.forEach((tabContent) => tabContent.classList.remove("active"));
            allTabContents[clickedTabIndex].classList.add("active");
          });
        });
      };
      init();
      return tabsInstance;
    }
    const initTabs = () => {
      const tabsContainers = document.querySelectorAll(".js-tabs");
      tabsContainers.forEach((tabsContainer) => new TabsObj(tabsContainer));
    };
    return {
      init: initTabs
    };
  })();
  var tabs_default = tabs;

  // js/modules/lottieAnimation.js
  var lottieAnimations = /* @__PURE__ */ (() => {
    function LottieAnimationObj(lottie, options) {
      const defaults = {
        threshold: 1
      };
      const settings = { ...defaults, ...options };
      const playLottie = (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.play();
              observer.unobserve(element);
            }, 500);
          }
        }
      };
      const watchLottie = debounce_default(() => {
        const observer = new IntersectionObserver(playLottie);
        observer.observe(element);
      }, 500);
      const resizeObserver = new ResizeObserver(watchLottie);
      resizeObserver.observe(document.body);
      return {
        lottie,
        settings
      };
    }
    const initLottieAnimations = () => {
      const allLotties = document.querySelectorAll(".js-lottie");
      allLotties.forEach((lottie) => {
        const options = {
          // Parse options from data attributes or other sources
        };
        return new LottieAnimationObj(lottie, options);
      });
    };
    return {
      init: initLottieAnimations
    };
  })();
  var lottieAnimation_default = lottieAnimations;

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

  // js/modules/modal/youtube.js
  var youtubePlayer = (index, videoId) => {
    let player;
    load_youtube_api_default().then(() => {
      const playerOptions = {
        autoplay: 0,
        controls: 1,
        enablejsapi: 1,
        wmode: "opaque",
        origin: window.location.origin,
        rel: 0
      };
      player = new YT.Player(`youtube-video-target-${index}`, {
        videoId,
        host: "https://www.youtube.com",
        ...playerOptions,
        events: {
          onReady: () => player.playVideo(),
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED) {
              closeModal();
            }
          }
        }
      });
    });
  };
  var youtube_default = youtubePlayer;

  // js/modules/helpers/modal.js
  function closeModal2() {
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

  // js/modules/modal/vimeo.js
  var vimeoPlayer = (index, videoId) => {
    load_script_default("https://player.vimeo.com/api/player.js").then(() => {
      const player = new Vimeo.Player(`vimeo-video-target-${index}`, {
        id: videoId,
        width: 640,
        height: 360,
        autoplay: false,
        muted: false
      });
      player.play();
      player.on("ended", closeModal2);
    }).catch((error) => {
      console.error(`Error loading script: ${error}`);
    });
  };
  var vimeo_default = vimeoPlayer;

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

  // js/modules/modal/cloudinary.js
  var cloudinaryPlayer = (index, videoId, cloudName) => {
    load_styles_default("https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.css");
    load_script_default("https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.js").then(() => {
      const videoTag = `
          <video
            id=cloudinary-video-target-${index}
            controls
            autoplay
            class="cld-video-player"
            data-cld-public-id=${videoId}
          ></video>`;
      document.querySelector("#video-overlay .video-container").innerHTML = videoTag;
      const player = cloudinary.videoPlayer(`cloudinary-video-target-${index}`, {
        cloudName,
        playedEventPercents: [100]
      });
      player.on("percentsplayed", (event) => {
        closeModal2();
      });
    }).catch((error) => {
      console.error(`Error loading script: ${error}`);
    });
  };
  var cloudinary_default = cloudinaryPlayer;

  // js/modules/helpers/dom.js
  function createElementWithId(tagName, id, className = "") {
    const element2 = document.createElement(tagName);
    element2.id = id;
    element2.className = className;
    return element2;
  }
  function fadeInElement(element2, fadeInClass, onAnimationEnd = () => {
  }) {
    element2.addEventListener(
      "animationend",
      () => {
        element2.classList.add(fadeInClass);
        element2.classList.remove("fadein");
        onAnimationEnd();
      },
      { once: true }
    );
    element2.classList.add("fadein");
  }

  // js/modules/modal-video.js
  var modalVideos = /* @__PURE__ */ (() => {
    const videoProviderMap = {
      cloudinary: cloudinary_default,
      youtube: youtube_default,
      vimeo: vimeo_default
    };
    function ModalVideoObj(element2, index, options) {
      const defaults = {
        // Default options
      };
      const settings = { ...defaults, ...options };
      const loadVideoPlayer = () => {
        const providerId = element2.dataset.videosrc;
        const videoId = element2.dataset.videoid;
        const cloudName = element2.dataset.cloudname;
        const videoProvider = videoProviderMap[providerId];
        if (videoProvider) {
          videoProvider(index, videoId, cloudName);
        } else {
          console.warn(`Unsupported video provider: ${providerId}`);
        }
      };
      const handleTriggerClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.matches(`.js-modal-video, .js-modal-video *`)) {
          const videoSource = element2.dataset.videosrc;
          const videoTarget = createElementWithId("div", `${videoSource}-video-target-${index}`);
          document.querySelector("#video-overlay .video-container").appendChild(videoTarget);
          const videoOverlay = document.getElementById("video-overlay");
          fadeInElement(videoOverlay, "is-open", () => {
            document.body.classList.add("modal-active");
          });
          loadVideoPlayer();
        }
      };
      element2.addEventListener("click", handleTriggerClick);
      return {
        element: element2,
        settings
      };
    }
    const initModalVideos = () => {
      const newVideoOverlay = `
      <div id="video-overlay" class="js-video-overlay">
        <span class="close">[Close]</span>
        <div class="responsive-wrapper">
          <div class="video-container"></div>
        </div>
      </div>
    `;
      document.body.insertAdjacentHTML("beforeend", newVideoOverlay);
      const modalVideoTriggers = document.querySelectorAll(".js-modal-video");
      modalVideoTriggers.forEach((trigger, index) => {
        const options = {
          // Parse options from data attributes or other sources
        };
        return new ModalVideoObj(trigger, index, options);
      });
      const closeVideoOverlay = document.getElementById("video-overlay").querySelector(".close");
      closeVideoOverlay.addEventListener("click", closeModal2);
    };
    return {
      init: initModalVideos
    };
  })();
  var modal_video_default = modalVideos;

  // js/modules/inline/cloudinary.js
  var inlineCloudinaryVideo = (videoInstance, index, cloudName) => {
    const videoId = videoInstance.dataset.videoid;
    const containerId = `cloudinary-video-player-${index}`;
    const playerId = `player-${index}`;
    const isBackgroundVideo = videoInstance.classList.contains("js-background-video");
    const loop = isBackgroundVideo ? "loop muted" : "";
    const videoTarget = createElementWithId("div", containerId);
    videoInstance.appendChild(videoTarget);
    Promise.all([
      load_script_default("https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.js", "cloudinary"),
      load_styles_default("https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.css")
    ]).then(() => {
      const videoTag = `
        <video
          id="${playerId}" 
          controls
          autoplay
          ${loop}
          class="cld-video-player"
          data-cld-public-id="${videoId}"
        ></video>
      `;
      videoInstance.querySelector(`#${containerId}`).innerHTML = videoTag;
      const player = cloudinary.videoPlayer(playerId, {
        cloudName,
        playedEventPercents: [100]
      });
      if (!isBackgroundVideo) {
        videoInstance.parentNode.querySelector(".video-trigger").addEventListener("click", (e) => {
          player.play();
          videoInstance.parentNode.classList.add("video-playing");
        });
      }
      player.on("percentsplayed", (event) => {
        videoInstance.parentNode.classList.remove("video-playing");
      });
      if (!isBackgroundVideo) {
        videoInstance.querySelector(".close").addEventListener("click", () => {
          player.pause();
          videoInstance.parentNode.classList.remove("video-playing");
        });
      }
    }).catch((error) => {
      console.error(`Error loading script: ${error}`);
    });
  };
  var cloudinary_default2 = inlineCloudinaryVideo;

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
  var youtube_default2 = inlineYoutubeVideo;

  // js/modules/inline/vimeo.js
  var inlineVimeoVideo = (videoInstance, index) => {
    const videoId = videoInstance.dataset.videoid;
    const containerId = `vimeo-video-player-${index}`;
    const playerId = `demo-player-${index}`;
    const videoTarget = createElementWithId("div", containerId);
    videoInstance.appendChild(videoTarget);
    Promise.all([
      load_script_default("https://player.vimeo.com/api/player.js", "vimeo")
    ]).then(() => {
      const vimeoPlayer2 = new Vimeo.Player(containerId, {
        id: videoId,
        width: 640,
        height: 360,
        autoplay: false,
        muted: false
      });
      videoInstance.parentNode.querySelector(".video-trigger").addEventListener("click", (e) => {
        vimeoPlayer2.play();
        videoInstance.parentNode.classList.add("video-playing");
      });
      vimeoPlayer2.on("ended", (event) => {
        videoInstance.parentNode.classList.remove("video-playing");
      });
      videoInstance.querySelector(".close").addEventListener("click", () => {
        vimeoPlayer2.pause();
        videoInstance.parentNode.classList.remove("video-playing");
      });
    }).catch((error) => {
      console.error(`Error loading script: ${error}`);
    });
  };
  var vimeo_default2 = inlineVimeoVideo;

  // js/modules/inline-video.js
  var inlineVideos = /* @__PURE__ */ (() => {
    const videoProviderMap = {
      cloudinary: cloudinary_default2,
      youtube: youtube_default2,
      vimeo: vimeo_default2
    };
    function InlineVideoObj(element2, index, options) {
      const defaults = {
        // Default options
      };
      const settings = { ...defaults, ...options };
      element2.id = `inline-video-${index}`;
      const providerId = element2.dataset.videosrc;
      const cloudName = element2.dataset.cloudname;
      const videoProvider = videoProviderMap[providerId];
      if (videoProvider) {
        videoProvider(element2, index, cloudName);
      } else {
        console.warn(`Unsupported video provider: ${providerId}`);
      }
      return {
        element: element2,
        settings
      };
    }
    const initInlineVideos = () => {
      const elements = document.querySelectorAll(".js-inline-video");
      elements.forEach((element2, index) => {
        const options = {
          // Parse options from data attributes or other sources
        };
        return new InlineVideoObj(element2, index, options);
      });
    };
    return {
      init: initInlineVideos
    };
  })();
  var inline_video_default = inlineVideos;

  // js/modules/galleries/images.js
  var imagesGallery = function() {
    "use strict";
    const init = () => {
      const galleryContainer = document.querySelector(".js-images-gallery-container");
      if (!galleryContainer) {
        return;
      }
      const allFilterItems = galleryContainer.querySelectorAll(".js-filter button");
      const allImages = galleryContainer.querySelector(".js-images-gallery");
      const galleryItems = allImages.querySelectorAll(".js-image");
      const filterImages = (filterValue) => {
        allImages.classList.add("fade-out");
        allImages.addEventListener("transitionend", () => {
          galleryItems.forEach((galleryItem) => {
            const galleryItemTerms = galleryItem.getAttribute("filter-item");
            galleryItem.classList.toggle("hidden", !galleryItemTerms.includes(filterValue) && filterValue !== "all");
          });
          allImages.classList.remove("fade-out");
        }, { once: true });
      };
      allFilterItems.forEach((filterItem) => {
        filterItem.addEventListener("click", () => {
          const filterValue = filterItem.getAttribute("filter-item");
          allFilterItems.forEach((item) => item.classList.remove("active"));
          filterItem.classList.add("active");
          filterImages(filterValue);
        });
      });
    };
    return { init };
  }();
  var images_default = imagesGallery;

  // js/modules/helpers/load-vendor-object.js
  function loadVendorObject(url, globalObjectName, timeout = 5e3) {
    return new Promise((resolve, reject) => {
      if (window[globalObjectName]) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      const timeoutId = setTimeout(() => {
        reject(new Error(`Timed out after ${timeout}ms while loading script: ${url}`));
      }, timeout);
      script.onload = () => {
        clearTimeout(timeoutId);
        const checkGlobalObject = () => {
          if (window[globalObjectName]) {
            resolve();
          } else {
            setTimeout(checkGlobalObject, 100);
          }
        };
        checkGlobalObject();
      };
      script.onerror = () => {
        clearTimeout(timeoutId);
        reject(new Error(`Failed to load script: ${url}`));
      };
      document.head.appendChild(script);
    });
  }
  var load_vendor_object_default = loadVendorObject;

  // js/modules/galleries/filterizr.js
  var filterizrGallery = /* @__PURE__ */ function() {
    function initFilterizr() {
      load_vendor_object_default(filterizr_script.src, "Filterizr").then(() => {
        const options = {
          layout: "sameWidth",
          callbacks: {
            onInit() {
              const galleryContainer = document.querySelector(".js-filterizr-gallery-container");
              const galleryContainerHeight = galleryContainer.offsetHeight;
              galleryContainer.style.height = `${galleryContainerHeight}px`;
              galleryContainer.classList.add("loaded");
            }
          }
        };
        new Filterizr(".filtr-container", options);
      }).catch((error) => {
        console.error(`Error loading script: ${error}`);
      });
    }
    function initFilterItems() {
      const galleryContainer = document.querySelector(".js-filterizr-gallery-container");
      const allFilterItems = galleryContainer.querySelectorAll(".js-filterizr-filter button");
      allFilterItems.forEach((filterItem) => {
        filterItem.addEventListener("click", (e) => {
          allFilterItems.forEach((item) => {
            item.classList.remove("active");
          });
          filterItem.classList.add("active");
        });
      });
    }
    function init() {
      const galleryContainer = document.querySelector(".filtr-container");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initFilterizr();
            initFilterItems();
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(galleryContainer);
    }
    return { init };
  }();
  var filterizr_default = filterizrGallery;

  // js/modules/galleries/isotope.js
  var isotopeGallery = /* @__PURE__ */ function() {
    let isotope;
    function initIsotope(grid) {
      load_vendor_object_default("https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js", "Isotope").then(() => {
        isotope = new Isotope(grid, {
          itemSelector: ".isotope-grid-item",
          percentPosition: true,
          layoutMode: "masonry"
        });
        isotope.arrange({ filter: "*" });
      }).catch((error) => {
        console.error(`Error loading Isotope script: ${error}`);
      });
    }
    function initFilterItems(grid) {
      const galleryContainer = document.querySelector(".js-isotope-gallery-container");
      const allFilterItems = galleryContainer.querySelectorAll(".js-isotope-filter button");
      const filterButtonGroup = galleryContainer.querySelector(".js-isotope-filter");
      filterButtonGroup.addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON") {
          const filterValue = event.target.getAttribute("data-filter");
          isotope.arrange({ filter: filterValue });
          allFilterItems.forEach((item) => {
            item.classList.remove("active");
          });
          event.target.classList.add("active");
        }
      });
    }
    function init() {
      const galleryContainer = document.querySelector(".isotope-grid");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            load_vendor_object_default("https://unpkg.com/imagesloaded@5.0.0/imagesloaded.pkgd.min.js", "imagesLoaded").then(() => {
              const images = galleryContainer.querySelectorAll("img");
              imagesLoaded(images, () => {
                initIsotope(galleryContainer);
                initFilterItems(galleryContainer);
              });
            }).catch((error) => {
              console.error(`Error loading imagesLoaded script: ${error}`);
            });
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(galleryContainer);
    }
    return { init };
  }();
  var isotope_default = isotopeGallery;

  // js/modules/image-slider.js
  var imageSlider = /* @__PURE__ */ (() => {
    function ImageSliderObj(element2, options) {
      const defaults = {
        direction: "horizontal",
        loop: true,
        autoplay: {
          delay: 2e3,
          pauseOnMouseEnter: true
        },
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        scrollbar: {
          el: ".swiper-scrollbar"
        }
      };
      const settings = { ...defaults, ...options };
      const initSwiper = () => {
        load_styles_default("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css");
        load_vendor_object_default("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js", "Swiper").then(() => {
          const swiper = new Swiper(element2, settings);
        }).catch((error) => {
          console.error(`Error loading Isotope script: ${error}`);
        });
      };
      const initModule = () => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              load_vendor_object_default("https://unpkg.com/imagesloaded@5.0.0/imagesloaded.pkgd.min.js", "imagesLoaded").then(() => {
                const images = element2.querySelectorAll("img");
                imagesLoaded(images, () => {
                  initSwiper();
                });
              }).catch((error) => {
                console.error(`Error loading imagesLoaded script: ${error}`);
              });
              observer.unobserve(entry.target);
            }
          });
        });
        observer.observe(element2);
      };
      initModule();
      return {
        element: element2,
        settings
      };
    }
    const initImageSlider = () => {
      const elements = document.querySelectorAll(".js-image-slider");
      elements.forEach((element2) => {
        const options = {
          // Parse options from data attributes or other sources
        };
        return new ImageSliderObj(element2, options);
      });
    };
    return {
      init: initImageSlider
    };
  })();
  var image_slider_default = imageSlider;

  // js/modules/faqs.js
  var frequentlyAskedQuestions = /* @__PURE__ */ (() => {
    function FAQsObj(thisFAQs, singleActive) {
      const faqs = thisFAQs.querySelectorAll(".faq");
      const initFAQs = () => {
        faqs.forEach((faq) => {
          const question = faq.querySelector(".question");
          const answer = faq.querySelector(".answer");
          answer.classList.add("hidden");
          question.addEventListener("click", (e) => {
            const target = e.target;
            const parent = target.parentElement;
            if (singleActive) {
              const openQuestion = thisFAQs.querySelector(".question.open");
              if (openQuestion) {
                const openAnswer = openQuestion.parentElement.querySelector(".answer");
                openQuestion.classList.remove("open");
                openAnswer.classList.add("hidden");
                if (openQuestion === target) {
                  return;
                }
                openAnswer.addEventListener("transitionend", function transitionEnd() {
                  openAnswer.removeEventListener("transitionend", transitionEnd);
                  target.classList.add("open");
                  parent.querySelector(".answer").classList.remove("hidden");
                });
              } else {
                target.classList.add("open");
                parent.querySelector(".answer").classList.remove("hidden");
              }
            } else {
              target.classList.toggle("open");
              parent.querySelector(".answer").classList.toggle("hidden");
            }
          });
        });
      };
      initFAQs();
      return {
        faqs
      };
    }
    const initFrequentlyAskedQuestions = () => {
      const allFAQs = document.querySelectorAll(".js-faqs");
      allFAQs.forEach((thisFAQs) => {
        const singleActive = thisFAQs.classList.contains("js-single-active");
        return new FAQsObj(thisFAQs, singleActive);
      });
    };
    return {
      init: initFrequentlyAskedQuestions
    };
  })();
  var faqs_default = frequentlyAskedQuestions;

  // js/modules/hero-slider.js
  var heroSlider = /* @__PURE__ */ (() => {
    function HeroSliderObj(element2, options = {}) {
      const defaultOptions = {
        // Add default options if needed
      };
      const slider = {
        element: element2,
        navigation: element2.querySelector(".js-nav"),
        slides: Array.from(element2.querySelectorAll(".js-slide")),
        autoplay: element2.classList.contains("is-autoplay"),
        autoPlayDelay: 5e3,
        newSlideIndex: 0,
        oldSlideIndex: 0
      };
      slider.navigationItems = Array.from(slider.navigation.querySelectorAll("li"));
      slider.slidesNumber = slider.slides.length;
      const setAutoplay = () => {
        if (slider.autoplay) {
          clearInterval(slider.autoPlayId);
          slider.autoPlayId = setInterval(autoplaySlider, slider.autoPlayDelay);
        }
      };
      const autoplaySlider = () => {
        slider.oldSlideIndex = slider.newSlideIndex;
        slider.newSlideIndex = slider.newSlideIndex < slider.slidesNumber - 1 ? slider.newSlideIndex + 1 : 0;
        updateSlider();
      };
      const updateSlider = () => {
        renderNewSlide();
        updateSliderNavigation();
        setAutoplay();
      };
      const renderNewSlide = () => {
        const oldSlide = slider.slides[slider.oldSlideIndex];
        oldSlide.classList.remove("is-selected");
        oldSlide.classList.add("is-moving");
        const newSlide = slider.slides[slider.newSlideIndex];
        newSlide.classList.add("is-selected");
        oldSlide.addEventListener("transitionend", function handler() {
          oldSlide.removeEventListener("transitionend", handler);
          oldSlide.classList.remove("is-moving");
        });
      };
      const updateSliderNavigation = () => {
        slider.navigationItems[slider.oldSlideIndex].classList.remove("is-selected");
        slider.navigationItems[slider.newSlideIndex].classList.add("is-selected");
      };
      const init = () => {
        setAutoplay();
        slider.navigation.addEventListener("click", (event) => {
          if (event.target.matches("div")) {
            return;
          }
          event.preventDefault();
          const selectedSlide = event.target;
          const parentListItem = selectedSlide.closest("li");
          if (parentListItem && parentListItem.classList.contains("is-selected")) {
            return;
          }
          slider.oldSlideIndex = slider.newSlideIndex;
          slider.newSlideIndex = slider.navigationItems.indexOf(parentListItem);
          updateSlider();
        });
        if (slider.autoplay) {
          slider.element.addEventListener("mouseenter", () => clearInterval(slider.autoPlayId));
          slider.element.addEventListener("mouseleave", setAutoplay);
        }
      };
      init();
      return slider;
    }
    const initSliders = () => {
      const heroSliders = document.querySelectorAll(".js-hero");
      heroSliders.forEach((slider) => new HeroSliderObj(slider));
    };
    return {
      init: initSliders
    };
  })();
  var hero_slider_default = heroSlider;

  // js/main.js
  function initPage() {
    document.querySelector("html").classList.remove("no-js");
    navigation_default.init();
    section_animation_default.init();
    if (document.querySelector(".flip-card-wrapper")) {
      flipcards_default.init();
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
    if (document.querySelector(".js-modal-video")) {
      modal_video_default.init();
    }
    if (document.querySelector(".js-inline-video")) {
      inline_video_default.init();
    }
    if (document.querySelector(".js-images-gallery-container")) {
      images_default.init();
    }
    if (document.querySelector(".js-filterizr-gallery-container")) {
      filterizr_default.init();
    }
    if (document.querySelector(".js-isotope-gallery-container")) {
      isotope_default.init();
    }
    if (document.querySelector(".js-image-slider")) {
      image_slider_default.init();
    }
    if (document.querySelector(".js-faqs")) {
      faqs_default.init();
    }
    if (document.querySelector(".hero-slider")) {
      hero_slider_default.init();
    }
  }
  window.addEventListener("load", function() {
    initPage();
  });
})();
