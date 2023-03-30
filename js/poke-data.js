$(document).ready(function(){

Handlebars.registerHelper("Math", function(indexNr, operator, brojN){
    let tmpPrviBr = parseInt(indexNr);
    let tmpDrugiBr = parseInt(brojN);

    return {
        "+": tmpPrviBr + tmpDrugiBr,
        "-": tmpPrviBr - tmpDrugiBr,
        "*": tmpPrviBr * tmpDrugiBr,
        "/": tmpPrviBr / tmpDrugiBr,
        "%": tmpPrviBr % tmpDrugiBr,
    }[operator];
});

// https://pokeapi.co/api/v2/pokemon-color/yellow/

let request = new XMLHttpRequest();
// priprema pozina na (pokemon) API
request.open("GET", "https://pokeapi.co/api/v2/pokemon-color/yellow/", true);

function popuniPoke(){
    const resp = JSON.parse(request.response);
    //console.log("resp");
    const sourceHTML = document.getElementById("lista-pokemona").innerHTML;
    const template = Handlebars.compile(sourceHTML);
    const ctxData = {pokemon : resp.pokemon_species.slice(0,20)};
    const html = template(ctxData);

    document.getElementById("div-pokemoni").innerHTML = html;
    $('[data-toggle="popover"]').popover();
}

// funkcija koja će se pozvati na lodanju stranice
request.onload = function() {
    popuniPoke();
}

// pošalji request na (pokemon) API
request.send();
});