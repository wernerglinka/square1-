(() => {
  // js/admin-tweaks/acf-section.js
  var sectionDescriptions = function() {
    "use strict";
    const updateLayoutDescription = (layout) => {
      const layoutDescription = layout.querySelector(".acf-fields [data-name=admin_section_description] input").value;
      const layoutHandle = layout.querySelector(".acf-fc-layout-handle");
      const textNode = layoutHandle.childNodes[1];
      textNode.nodeValue = layoutDescription;
    };
    const init = () => {
      if (!document.querySelector(".acf-fc-layout-handle")) {
        return;
      }
      const layouts = document.querySelectorAll("[data-layout=flex_section]");
      layouts.forEach(updateLayoutDescription);
      const observer = new MutationObserver((mutationsList, observer2) => {
        for (const mutation of mutationsList) {
          if (mutation.addedNodes.length) {
            const layouts2 = document.querySelectorAll("[data-layout=flex_section]");
            layouts2.forEach(updateLayoutDescription);
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      console.log("ACF Section Descriptions Loaded! ... YAY");
    };
    return { init };
  }();
  var acf_section_default = sectionDescriptions;

  // js/admin.mjs
  function initPage() {
    acf_section_default.init();
  }
  window.addEventListener("load", function() {
    initPage();
  });
})();
