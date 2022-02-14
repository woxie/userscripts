// ==UserScript==
// @name        Shopify boton
// @namespace   Violentmonkey Scripts
// @match       https://imperialtoys.myshopify.com/admin/orders/*
// @grant       none
// @version     1.0
// @author      -
// @description 6/2/2022, 17:01:55
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
  
cuadroderecha = document.querySelector("#AppFrameMain > div > div > div.Polaris-Page-Header_z4uwg.Polaris-Page-Header--hasNavigation_gfpa8.Polaris-Page-Header--hasActionMenu_1wx04.Polaris-Page-Header--mediumTitle_bfol6 > div:nth-child(2) > div.Polaris-Page-Header__RightAlign_1ok1p");
  
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

var datos = document.querySelector("#AppFrameMain > div > div > div.Polaris-Page__Content_xd1mk > div > section > div.yyeuw > div.Polaris-Card_yis1o > div:nth-child(2) > div:nth-child(3) > div.Polaris-Stack_32wu2.Polaris-Stack--vertical_uiuuj.Polaris-Stack--spacingTight_1o4d6 > div > div > div.Polaris-Stack__Item_yiyol.Polaris-Stack__Item--fill_vpuzt > div > div > p").innerHTML.split("<br>");
var nombre = datos[0];
var direccionbreaks = '"'+ datos[1] + '\n' + datos[2] + '\n' + datos[3] + '\n' + datos[4] + '"';
var direccionespacios = datos[1] + " " + datos[2] + " " + datos[3] + " " + datos[4];
var numero = document.querySelector("#AppFrameMain > div > div > div.Polaris-Page__Content_xd1mk > div > section > div.yyeuw > div.Polaris-Card_yis1o > div:nth-child(2) > div:nth-child(3) > div.Polaris-Stack_32wu2.Polaris-Stack--vertical_uiuuj.Polaris-Stack--spacingTight_1o4d6 > div > div > div.Polaris-Stack__Item_yiyol.Polaris-Stack__Item--fill_vpuzt > div > div > p > span").innerText;
var correo = document.querySelector("#AppFrameMain > div > div > div.Polaris-Page__Content_xd1mk > div > section > div.yyeuw > div.Polaris-Card_yis1o > div:nth-child(2) > div:nth-child(2) > div.Polaris-Stack_32wu2.Polaris-Stack--noWrap_vecks > div.Polaris-Stack__Item_yiyol.Polaris-Stack__Item--fill_vpuzt > div > p._3mARw > button > span > span").innerText;
var ordenconhash = document.querySelector("#AppFrameMain > div > div > div.Polaris-Page-Header_z4uwg.Polaris-Page-Header--hasNavigation_gfpa8.Polaris-Page-Header--hasActionMenu_1wx04.Polaris-Page-Header--mediumTitle_bfol6 > div:nth-child(1) > div.Polaris-Page-Header__TitleWrapper_bejfn > div > div > div > h1").innerText;
var ordensinhash = document.querySelector("#AppFrameMain > div > div > div.Polaris-Page-Header_z4uwg.Polaris-Page-Header--hasNavigation_gfpa8.Polaris-Page-Header--hasActionMenu_1wx04.Polaris-Page-Header--mediumTitle_bfol6 > div:nth-child(1) > div.Polaris-Page-Header__TitleWrapper_bejfn > div > div > div > h1").innerText.split('#').join('');

var copiarei = nombre + '\t' + numero + '\t' + direccionbreaks + '\t' + correo + '\t' + ordensinhash;
var copiarpc = nombre + '\t' + numero + '\t' + direccionbreaks + '\t' + correo;

}