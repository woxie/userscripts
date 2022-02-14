// ==UserScript==
// @name        Shopify boton
// @namespace   Violentmonkey Scripts
// @match       https://imperialtoys.myshopify.com/admin/orders/*
// @grant       none
// @version     1.1
// @author      JE, Rafa
// @description 6/2/2022, 17:01:55
// @downloadURL https://raw.githubusercontent.com/woxie/userscripts/main/boton/boton.user.js
// @updateURL https://raw.githubusercontent.com/woxie/userscripts/main/boton/boton.user.js
// ==/UserScript==

var observer = new MutationObserver(resetTimer);
var timer = setTimeout(action, 1000, observer); // wait for the page to stay still for 1 second
observer.observe(document, {childList: true, attributes: true, characterData: true, subtree: true});

// reset timer every time something changes
function resetTimer(changes, observer) {
    clearTimeout(timer);
    timer = setTimeout(action, 1000, observer);
}

function action(observer) {
    observer.disconnect();
    // code
  
cuadroderecha = document.querySelector("div.Polaris-Page-Header__Row_375v7:nth-child(2)");
  
const boton = document.createElement("button");
boton.innerHTML = "Copiar EI";
cuadroderecha.insertBefore(boton, cuadroderecha.childNodes[0].nextSibling);
boton.onclick = function(){
  copyToClipboard(copiarei)
};

const boton2 = document.createElement("button");
boton2.innerHTML = "Copiar PC";
cuadroderecha.insertBefore(document.createElement('br'), boton.nextSibling);
cuadroderecha.insertBefore(boton2, boton.nextSibling);
boton2.onclick = function(){
  copyToClipboard(copiarpc)
};
  
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

var datos = document.querySelector("._1daZ2 > div:nth-child(1) > p:nth-child(1)").innerHTML.split("<br>");
var nombre = datos[0];
var direccionbreaks = '"'+ datos[1] + '\n' + datos[2] + '\n' + datos[3] + '\n' + datos[4] + '"';
var direccionespacios = datos[1] + " " + datos[2] + " " + datos[3] + " " + datos[4];
var numero = document.querySelector("._1daZ2 > div:nth-child(1) > p:nth-child(1) > span:nth-child(6)").innerText;
var correo = document.querySelector(".Polaris-Button--textAlignLeft_1yjwh > span:nth-child(1) > span:nth-child(1)").innerText;
var ordenconhash = document.querySelector(".Polaris-Header-Title_2qj8j").innerText;
var ordensinhash = document.querySelector(".Polaris-Header-Title_2qj8j").innerText.split('#').join('');

var copiarei = nombre + '\t' + numero + '\t' + direccionbreaks + '\t' + correo + '\t' + ordensinhash;
var copiarpc = nombre + '\t' + numero + '\t' + direccionbreaks + '\t' + correo;

}
