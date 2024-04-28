/* eslint-disable space-before-function-paren */
import sectionDescriptions from './admin-tweaks/acf-section.js';

function initPage() {
  sectionDescriptions.init();
}

window.addEventListener( 'load', function () {
  initPage();
} );

