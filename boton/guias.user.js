// ==UserScript==
// @name        Shopify guías
// @namespace   Violentmonkey Scripts
// @match       https://imperialtoys.myshopify.com/*
// @grant       none
// @version     1.0
// @author      wox
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @require https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require https://unpkg.com/react@17/umd/react.production.min.js
// @require https://unpkg.com/react-dom@17/umd/react-dom.production.min.js
// @description 2/11/2022, 6:21:09 PM
// ==/UserScript==

function setNativeValue(element, value) {
    let lastValue = element.value;
    element.value = value;
    let event = new Event("input", { target: element, bubbles: true });
    // React 15
    event.simulated = true;
    // React 16
    let tracker = element._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
}

waitForKeyElements ("div.Polaris-Layout__Section_1b1h1:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > h3:nth-child(1)", actionFunction);

function actionFunction (jNode) {
        var trackingnumber = document.getElementsByClassName("Polaris-Card__Section_1b1h1")[2].children[1].children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0]
      trackingnumber.addEventListener('change', function() {
              var trackingnumbersolonumeros = trackingnumber.value.toString().replace(/[\W_]+/g,'');
        setNativeValue(trackingnumber, trackingnumbersolonumeros);
var trackingurl = document.getElementsByClassName("Polaris-Card__Section_1b1h1")[2].children[1].children[1].children[0].children[0].children[0].children[1].children[0].children[0].children[0]

if(trackingnumber.value.length == "8"){
var linkredpack = "https://www.redpack.com.mx/es/rastreo/?guias=" + trackingnumber.value;
setNativeValue(trackingurl, linkredpack);
}
else if (trackingnumber.value.length == "12") {
  var linkfedex = "https://www.fedex.com/fedextrack/?trknbr=" + trackingnumber.value;
setNativeValue(trackingurl, linkfedex);
}
else if (trackingnumber.value.length == "22") {
  var linkestafeta = "https://cs.estafeta.com/es/Tracking/searchByGet?wayBill=" + trackingnumber.value;
setNativeValue(trackingurl, linkestafeta);
}
else {
setNativeValue(trackingurl, '');
}

});
    }


