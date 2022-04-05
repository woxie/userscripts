// ==UserScript==
// @name        Shopify boton
// @namespace   Violentmonkey Scripts
// @match       https://imperialtoys.myshopify.com/admin/orders/*
// @grant       none
// @version     2.2
// @author      JE, Rafa
// @description Botones para copiar los elementos de una pedido y pegarlos en Excel
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
boton.innerHTML = "Copiar E y S";
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

var productos = document.getElementsByClassName("TwAEH")[0];
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
var palabraClaveTitulo = ["Preventa: ",	"Pre-venta: ",	"Pre venta: ",	"Preventa - ",	"Pre-venta - ",	"Pre venta - ",	"Preventa- ",	"Pre-venta- ",	"Pre venta- ",	"Preorden: ",	"Pre-orden: ",	"Pre orden: ",	"Preorden - ",	"Pre-orden - ",	"Pre orden - ",	"Preorden- ",	"Pre-orden- ",	"Pre orden- ",	"SALDO: ",	"SALDO - ",		"SALDO- ",		"SALDO ",	" (Envió Gratis)",	" (Envió Incluido)",	" Envió Gratis",	" Envió Incluido",	" (Envío Incluido)",	" (Envío Gratis)",	" (Envio Incluido)",	" (Envio Gratis)",	" Envío Incluido",	" Envío Gratis",	" Envio Incluido",	" Envio Gratis",	" (EnvÃ­o Incluido)",	" (EnvÃ­o Gratis)",	" (Envio Incluido)",	" (Envio Gratis)",	" EnvÃ­o Incluido",	" EnvÃ­o Gratis",	" (EnviÃ³ Gratis)",	" (EnviÃ³ Incluido)",	" EnviÃ³ Gratis",	" EnviÃ³ Incluido",	"The Star Wars:",	"The Star Wars - ",	"The Star Wars-",	"The Star Wars",	"Star Wars:",	"Star Wars - ",	"Star Wars-",	"Star Wars",	"The Black Series:",	"The Black Series -",	"The Black Series",	"Black Series:",	"Black Series -",	"Black Series",	"The Vintage Collection:",	"The Vintage Collection -",	"The Vintage Collection",	"Vintage Collection:",	"Vintage Collection -",	"Vintage Collection",	"Spider-Man No Way Home:",	"Spider-Man No Way Home -",	"Spider-Man No Way Home",	"Spider Man No Way Home:",	"Spider Man No Way Home -",	"Spider Man No Way Home",	"SpiderMan No Way Home:",	"SpiderMan No Way Home -",	"SpiderMan No Way Home",	"Marvel Legends Series:",	"Marvel Legends Series -",	"Marvel Legends Series-",	"Marvel Legends Series",	"Marvel Legends:",	"Marvel Legends - ",	"Marvel Legends-",	"Marvel Legends",	"Retro Collection:",	"Retro Collection -",	"Retro Collection",	" (Primera oleada)",	" (Segunda oleada)",	" (Tercera oleada)",	" (Cuarta oleada)",	" (Quinta oleada)",	" (Sexta oleada)",	" (Septima oleada)",	" (Octava oleada)",	" (Novena oleada)",	" Primera oleada",	" Segunda oleada",	" Tercera oleada",	" Cuarta oleada",	" Quinta oleada",	" Sexta oleada",	" Septima oleada",	" Octava oleada",	" Novena oleada",	" Oleada 1",	" Oleada 2",	" Oleada 3",	" Oleada 4",	" Oleada 5",	" Oleada 6",	" Oleada 7",	" Oleada 8",	" Oleada 9",	" (Oleada 1)",	" (Oleada 2)",	" (Oleada 3)",	" (Oleada 4)",	" (Oleada 5)",	" (Oleada 6)",	" (Oleada 7)",	" (Oleada 8)",	" (Oleada 9)",	"Funko Pop!:",	"Funko Pop!",	"Funko Pop",	" (Exclusiva de Imperial Toys)",	"Archive Collection:",	"Archive Collection -",	"Archive Collection",	"HASBRO PULSE CON 2021: ",	"HASBRO PULSE CON 2021- ",	"HASBRO PULSE CON 2021 - ",	"HASBRO PULSE CON 2021",	" 1-inch",	" 2-inch",	" 3-inch",	" 4-inch",	" 5-inch",	" 6-inch",	" 7-inch",	" 8-inch",	" 9-inch",	" Escala 1/10",	" Escala 1/11",	" Escala 1/12",	" Escala 1/1",	" Escala 1/2",	" Escala 1/3",	" Escala 1/4",	" Escala 1/5",	" Escala 1/6",	" Escala 1/7",	" Escala 1/8",	" Escala 1/9",	"Teenage Mutant Ninja Turtles:",	"Teenage Mutant Ninja Turtles-",	"Teenage Mutant Ninja Turtles -",	"Teenage Mutant Ninja Turtles",	"M4YO: ",	"M4YO- ",	"M4YO - ",	"M4YO ",	" 6 ''",	" 6 ´´",	" 6''",	" 6´´",	" Action Figure:",	" Action Figure - ",	" Action Figure-",	" Action Figure",	" 3 3/4-Inch",	" 3 3/4 - Inch",	" 3 3/4 Inch",	" 3 3/4",	" 6 pulgadas",	' 6 "',	' 6"'];
var palabraSustitutaTitulo = ["[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[P] ",	"[S] ",	"[S] ",		"[S] ",		"[S] ",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"SW",	"SW",	"SW",	"SW",	"SW",	"SW",	"SW",	"SW",	"BS",	"BS",	"BS",	"BS",	"BS",	"BS",	"VC",	"VC",	"VC",	"VC",	"VC",	"VC",	"NWH",	"NWH",	"NWH",	"NWH",	"NWH",	"NWH",	"NWH",	"NWH",	"NWH",	"ML",	"ML",	"ML",	"ML",	"ML",	"ML",	"ML",	"ML",	"Retro",	"Retro",	"Retro",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"Funko",	"Funko",	"Funko",	"",	"Archive",	"Archive",	"Archive",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"TMNT",	"TMNT",	"TMNT",	"TMNT",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	"",	""];
var search = getSearchRegExp(palabraClaveTitulo);
for (var i = 0; i < productos.childElementCount; i++) {
  if(!palabrasExcluidas.some(palabraExcluida => productos.children[i].children[0].children[1].children[0].children[0].children[0].innerText.toLowerCase().includes(palabraExcluida))) {
    var productoTitulo = productos.children[i].children[0].children[1].children[0].children[0].children[0].innerText;
    search.forEach(function(reg, index){

			productoTitulo = productoTitulo.replace(reg, palabraSustitutaTitulo[index]);

		});
    
if (productoTitulo.includes("[S]")) {
            productosString += "[S] " + productos.children[i].children[0].children[1].children[0].children[1].innerText.substring(productos.children[i].children[0].children[1].children[0].children[1].innerText.indexOf('× ') + 2) + "x " + productoTitulo.replace('[S] ','') + "\n"
    }
    else {
    productosString += "[E] " + productos.children[i].children[0].children[1].children[0].children[1].innerText.substring(productos.children[i].children[0].children[1].children[0].children[1].innerText.indexOf('× ') + 2) + "x " + productoTitulo + "\n"
    }
  }
}


var datos = document.querySelector(".aG2SI > div:nth-child(1) > p:nth-child(1)").innerHTML.split("<br>");
var nombre = datos[0];
  
if (document.body.contains(document.querySelector("#customer-note-collapsible"))) {
  document.querySelector(".tZhTI > button:nth-child(1)").click();
var direccionbreaks =  document.querySelector("#customer-note-collapsible").innerText;
}
else {
var direccionbreaks = '"'+ datos[1] + '\n' + datos[2] + '\n' + datos[3] + '\n' + datos[4] + '"';
var direccionespacios = datos[1] + " " + datos[2] + " " + datos[3] + " " + datos[4];
}

var numero
var correo
  try {
	numero = document.querySelector(".aG2SI > div:nth-child(1) > p:nth-child(1) > span:nth-child(6)").innerText;
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
