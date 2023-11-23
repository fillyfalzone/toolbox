
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

    //Permet de switcher la coleur du nombre de pixels disponibles
    totalPixelsElement.classList.toggle("text-danger", remainingPixels < 0);
    totalPixelsElement.classList.toggle("text-success", remainingPixels >= 0);

    totalPixelsElement.innerText = Math.ceil(remainingPixels);

    //On recupère les éléments du tableau de données
    const tableData = document.getElementsByClassName(tag + "-data");
    // Cette case indique le nombre de caractère dans la textarea ce qui correspond à sa longueur
    tableData[0].innerText = inputElement.value.length; 

     // Si remainingPixels n'est pas négatif, affiche tous les caractères
     if (remainingPixels >= 0) {
        tableData[1].innerText = characters.length;
        tableData[2].innerText = 0; // Aucun caractère tronqué
    } else {
        // Calcule le nombre de caractères tronqués si remainingPixels est négatif
        const truncatedLength = Math.abs(Math.ceil(remainingPixels / ctx.measureText('a').width));
        tableData[1].innerText = characters.length - truncatedLength;
        tableData[2].innerText = truncatedLength;
    }

    //On va maintenant rendre dynamique la partie pixels du tableau de recap

    // Longueur en pixels
    tableData[3].innerText = width.toFixed(0); 

    //Nombre de pixel disponible
    tableData[4].innerText = maxPixels;

    //Nombre de pixels restants
    tableData[5].innerText =  totalPixelsElement.innerText

    /*Partie SERP preview*/
    //On recupère les éléments du DOM
    let preview = document.getElementById("prev-" + tag);
    preview.innerText = characters;

    /*Tronquer les titre en cas de depassement du nombre de pixels*/
    
    /*Partie SERP preview*/
    if (remainingPixels >= 0) {
    // Si les pixels restants sont positifs, afficher le texte complet
        preview.innerText = characters;
    } else {
    // Tronquer le texte et ajouter " ..."
        const trimmedText = trimTextToFit(characters, maxPixels, ctx.font, tag);
        preview.innerText = trimmedText;
    }

    // Rendre dynamique le texte de recommandation 
    let small = document.getElementById("small-" + tag);
    let span = document.getElementById("span-" + tag);

    switch (tag)
    {
        case "title":
            if (width < 285) {
                span.style.color ="#f00";
                span.innerText = "Attention votre Titre est trop court.";
                small.innerText = "Sa longueur est faible, pensez à exploiter davantage la longueur disponible..";
            } else if(width > 600) {
                span.style.color ="#f00";
                span.innerText = "Attention votre Titre est trop long.";
                small.innerText = "l’intégralité de votre balise ne s’affichera pas, songez à la raccourcir";
            } else {
                span.style.color ="#0f0";
                span.innerText = "Félicitation, votre Titre est d’une bonne longueur.";
                small.innerText = "Veillez à ce que son contenu soit pertinent par rapport à la page.";
            }

    }
}

// Fonction pour tronquer le texte et ajouter des points de suspension
function trimTextToFit(text, maxPixels, font, tag) {
    ctx.font = font;
    let words = text.split(' ');
    let trimmedText = text;
    let currentWidth = calculateTextWidth(trimmedText + " ...", "");

    if (tag === "url") {
        ctx.font = font;
        let trimmedText = text;
        while (calculateTextWidth(trimmedText + " ...", "") > maxPixels) {
        trimmedText = trimmedText.substring(0, trimmedText.length - 1);
        }
        return trimmedText + " ...";   
    } else {
        while (currentWidth > maxPixels && words.length > 0) {
            // Retirer le dernier mot
            words.pop();
            trimmedText = words.join(' ');
            currentWidth = calculateTextWidth(trimmedText + " ...", "");

            // Vérifie si la longueur en pixel du dernier mot est inférieure à celle de " ..."
            if (currentWidth <= maxPixels) {
                break;
            }
        }

        return words.length === 0 ? " ..." : trimmedText + " ...";
    }      
}


// Ecouteurs d'événements pour les champs de saisie
inputTitle.addEventListener('input', () => handleInput(inputTitle, totalTitlePixels, 600, "title"));
inputMd.addEventListener('input', () => handleInput(inputMd, totalMdPixels, 990, "meta"));
inputUrl.addEventListener('input', () => handleInput(inputUrl, totalUrlPixels, 385, "url"));

  

