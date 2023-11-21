//Récuperation des éléments du DOM
const inputTitle = document.getElementById("inputTitle");
const inputMd = document.getElementById("inputMd");


// Creation du canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 100;
canvas.height = 100;
// Recupère un élément du Dom
const container = document.getElementById("canvas-container");
// On inserre le canvas dans le container
container.appendChild(canvas);

// On écoute de l'évènement  
inputTitle.addEventListener('input', () => {

    const character = inputTitle.value

    // defini une taille et une police au contexte
    ctx.font = '14px arial';

    const width = ctx.measureText(character).width;

    console.log(width);

})


let asciiCharacters = [];

for (let i = 0; i < 128; i++) {
    asciiCharacters.push(String.fromCharCode(i));
}

// console.log(asciiCharacters);
