// ==UserScript==
// @name        Shopify boton
// @namespace   Violentmonkey Scripts
// @match       https://imperialtoys.myshopify.com/admin/orders/*
// @grant       none
// @version     1.2
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
  
  function getSearchRegExp(f) {
  return f.map(function(item) {
    if (typeof(item) == "string") {
      return new RegExp(item.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&"), "gi");
    } else if (typeof(item) == "object" && item instanceof RegExp) {
      return item;
    } else if (typeof(item) == "object" && item instanceof Array) {
      return new RegExp("(" + item.map(function(i) {
        i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
      }).join("|") + ")");
    }
  });
}

var productos = document.getElementsByClassName("qfURq")[0];
var palabrasExcluidas = ['preventa', 'pre venta', 'pre-venta', 'preorden', 'pre-orden', 'pre orden'];
var productosString = "";
// var palabrasClaveConSustituto = {
//   'star wars': 'SW',
//   '(Envío Incluido)': ''
// }
// var palabraClaveTitulo = [];
// var palabraSustitutaTitulo = [];
// for (const palabraClaveConSustituto in palabrasClaveConSustituto) {
//   console.log(palabraClaveConSustituto)
//   console.log(Object.keys(palabraClaveConSustituto)[0])
// }
var palabraClaveTitulo = ['SALDO: ','SALDO - ','SALDO ',' (Envío Incluido)',' (Envío Gratis)',' (Envio Incluido)',' (Envio Gratis)',' Envío Incluido',' Envío Gratis',' Envio Incluido',' Envio Gratis'];
var palabraSustitutaTitulo = ['[S] ','[S] ','[S] ','','','','','','','',''];
var search = getSearchRegExp(palabraClaveTitulo);
for (var i = 0; i < productos.childElementCount; i++) {
  if(!palabrasExcluidas.some(palabraExcluida => productos.children[i].children[0].children[1].children[0].children[0].children[0].innerText.toLowerCase().includes(palabraExcluida))) {
    var productoTitulo = productos.children[i].children[0].children[1].children[0].children[0].children[0].innerText;
    search.forEach(function(reg, index){

			productoTitulo = productoTitulo.replace(reg, palabraSustitutaTitulo[index]);

		});
    
    if (productoTitulo.includes("[S]")) {
            productosString += "[S] " + productos.children[i].children[0].children[1].children[0].children[1].innerText.slice(-1) + "x " + productoTitulo.replace('[S] ','') + "\n"
    }
    else {
    productosString += "[E] " + productos.children[i].children[0].children[1].children[0].children[1].innerText.slice(-1) + "x " + productoTitulo + "\n"
    }
  }
}


var datos = document.querySelector("._1daZ2 > div:nth-child(1) > p:nth-child(1)").innerHTML.split("<br>");
var nombre = datos[0];
var direccionbreaks = '"'+ datos[1] + '\n' + datos[2] + '\n' + datos[3] + '\n' + datos[4] + '"';
var direccionespacios = datos[1] + " " + datos[2] + " " + datos[3] + " " + datos[4];
var numero
var correo
  try {
	numero = document.querySelector("._1daZ2 > div:nth-child(1) > p:nth-child(1) > span:nth-child(6)").innerText;
} catch(error) {
	numero = ""
}
  try {
	correo = document.querySelector(".Polaris-Button--textAlignLeft_1yjwh > span:nth-child(1) > span:nth-child(1)").innerText;
} catch(error) {
	correo = ""
}
var ordenconhash = document.querySelector(".Polaris-Header-Title_2qj8j").innerText;
var ordensinhash = document.querySelector(".Polaris-Header-Title_2qj8j").innerText.split('#').join('');

var copiarei = '"' + productosString.slice(0, -1) + '"' + '\t' + nombre + '\t' + numero + '\t' + direccionbreaks + '\t' + correo + '\t' + ordensinhash;
var copiarpc = nombre + '\t' + numero + '\t' + direccionbreaks + '\t' + correo;

}
