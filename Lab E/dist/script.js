/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var state = {
  currentStyle: 'style1',
  styles: {
    style1: 'dist/styles/labA_css1.css',
    style2: 'dist/styles/labA_css2.css',
    style3: 'dist/styles/labA_css3.css'
  }
};
function changeStyle(styleName) {
  var styleElement = document.getElementById('dynamic-style');
  if (styleElement && state.styles[styleName]) {
    styleElement.href = state.styles[styleName];
    state.currentStyle = styleName;
  }
}
function generateStyleLinks() {
  var nav = document.getElementById('style-links');
  if (nav) {
    var _loop = function _loop(styleName) {
      var link = document.createElement('a');
      link.href = '#';
      link.textContent = styleName;
      link.addEventListener('click', function (e) {
        e.preventDefault();
        changeStyle(styleName);
      });
      nav.appendChild(link);
      nav.appendChild(document.createTextNode(' '));
    };
    for (var styleName in state.styles) {
      _loop(styleName);
    }
  }
}
function init() {
  generateStyleLinks();
}
init();
/******/ })()
;