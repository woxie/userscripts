// ==UserScript==
// @name        Coppel Digital
// @namespace   Violentmonkey Scripts
// @match       https://www.coppeldigital.com/checkout/pago/*
// @grant       none
// @version     1.0
// @author      wox
// @description Ver opciones de pago ocultas de Coppel Digital
// @downloadURL https://raw.githubusercontent.com/woxie/userscripts/main/coppeldigital.user.js
// @updateURL https://raw.githubusercontent.com/woxie/userscripts/main/coppeldigital.user.js
// ==/UserScript==

// window.addEventListener('DOMContentLoaded', () => {
let elems = document.querySelectorAll(".d-none");
let elemCount = elems.length;

for (let i = 0; i < elemCount; i++) {
  elems[i].classList.remove("d-none");
  elems[i].classList.add("d-block");
}
// });