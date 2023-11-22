
// Récupère les éléments d'entrée pour le titre et le markdown (md) depuis le DOM
const inputTitle = document.getElementById("inputTitle");
const totalTitlePixels = document.getElementById("titlePixelsRemind");
const inputMd = document.getElementById("inputMd");
const totalMdPixels = document.getElementById("mdPixelsRemind");
const inputUrl = document.getElementById("inputUrl");
const totalUrlPixels = document.getElementById("urlPixelsRemind");




// Création d'un élément canvas unique pour la mesure du texte
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');


// Fonction pour calculer la largeur du texte en pixels
function calculateTextWidth(text, tag) {
    if (tag === "title") {
        ctx.font = '20px arial';
    } else if (tag === "meta") {
        ctx.font = '14px arial';
    } else if (tag === "url") {
        ctx.font = '16px arial';
    }

    return ctx.measureText(text).width;
}

// Fonction générique pour gérer les événements d'entrée
function handleInput(inputElement, totalPixelsElement, maxPixels, tag) {
    const characters = inputElement.value;
    const width = calculateTextWidth(characters, tag);
    const remainingPixels = maxPixels - width;

    totalPixelsElement.classList.toggle("text-danger", remainingPixels < 0);
    totalPixelsElement.classList.toggle("text-success", remainingPixels >= 0);

    totalPixelsElement.innerText = Math.ceil(remainingPixels);

    //On recupère les éléments du tableau de données
    const tableData = document.getElementsByClassName(tag + "-data");

    tableData[0].innerText = inputElement.value.length; 
     
    while (remainingPixels > 0) {
        tableData[1].innerText = (tableData[0].innerText * 1);
        remainingPixels -= width
    
        if (remainingPixels < 0) {
            break; // Sortir de la boucle while
        }
    }

    // On fait la different des caractères moins les caractère affichés pour determiner les caractères tronqués
    tableData[2].innerText = (tableData[0].innerText * 1) - (tableData[1].innerText * 1)
  
}

// Ecouteurs d'événements pour les champs de saisie
inputTitle.addEventListener('input', () => handleInput(inputTitle, totalTitlePixels, 600, "title"));
inputMd.addEventListener('input', () => handleInput(inputMd, totalMdPixels, 920, "meta"));
inputUrl.addEventListener('input', () => handleInput(inputUrl, totalUrlPixels, 1280, "url"));

  


// const inputTitle = document.getElementById("inputTitle");
// const totalTitlePixels = document.getElementById("titlePixelsRemind");
// const inputMd = document.getElementById("inputMd");
// const totalMdPixels = document.getElementById("mdPixelsRemind");

// // Ajoute un écouteur d'événement 'input' sur le champ de saisie du titre
// inputTitle.addEventListener('input', () => {
//   // Obtient la valeur actuelle (caractères) du champ de saisie du titre
//   const characters = inputTitle.value;

//   // Calcule la largeur du texte en pixels en utilisant la fonction calculateTextWidth
//   const width = calculateTextWidth(characters);

//   // Calcule les pixels restants autorisés (500 est la largeur maximale autorisée)
//   const remainingPixels = 500 - width;

//   // Si les pixels restants sont inférieurs à 0, change la couleur du texte en rouge, sinon en vert
//   if (remainingPixels < 0) {
//     totalTitlePixels.classList.replace("text-success", "text-danger");
//   } else {
//     totalTitlePixels.classList.replace("text-danger", "text-success");
//   }

//   // Met à jour le texte de l'élément totalTitlePixels pour afficher les pixels restants
//   totalTitlePixels.innerText = Math.ceil(remainingPixels);
// });

// // Ajoute un écouteur d'événement 'input' sur le champ de saisie markdown (md)
// inputMd.addEventListener('input', () => {
//   // Obtient la valeur actuelle (caractères) du champ de saisie markdown (md)
//   const characters = inputMd.value;

//   // Calcule la largeur du texte en pixels en utilisant la fonction calculateTextWidth
//   const width = calculateTextWidth(characters);

//   // Calcule les pixels restants autorisés (930 est la largeur maximale autorisée pour md)
//   const remainingPixels = 930 - width;

//   // Si les pixels restants sont inférieurs à 0, change la couleur du texte en rouge, sinon en vert
//   if (remainingPixels < 0) {
//     totalMdPixels.classList.replace("text-success", "text-danger");
//   } else {
//     totalMdPixels.classList.replace("text-danger", "text-success");
//   }

//   // Met à jour le texte de l'élément totalMdPixels pour afficher les pixels restants
//   totalMdPixels.innerText = Math.ceil(remainingPixels);
// });

// // Fonction pour calculer la largeur du texte en pixels
// function calculateTextWidth(text) {
//     // Crée un élément canvas
//     const canvas = document.createElement('canvas');
//     // Obtient le contexte 2D du canvas
//     const ctx = canvas.getContext('2d');
//     // Définit la police utilisée pour le texte
//     ctx.font = '14px arial';
//     // Retourne la largeur du texte mesurée
//     return ctx.measureText(text).width;
// }
