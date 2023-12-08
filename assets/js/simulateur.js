
/**
 * Bienvue dans le code source de SERP SIMULATOR
*/

// Récupère les éléments du DOM pour pouvoir les modifier dynamiquement
const inputTitle = document.getElementById("inputTitle");
const totalTitlePixels = document.getElementById("titlePixelsRemind");
const inputMd = document.getElementById("inputMd");
const totalMdPixels = document.getElementById("mdPixelsRemind");
const inputUrl = document.getElementById("inputUrl");
const totalUrlPixels = document.getElementById("urlPixelsRemind");

// Création d'un élément canvas unique pour la mesure des caractère en pixel
const canvas = document.createElement('canvas');
// Initialisation du contexte du canvas ici en 2 demensions
const ctx = canvas.getContext('2d');

// Fonction pour calculer la largeur d'un caractère en fonction des Tags (qui on des font-zises différentes) en pixels
function calculateTextWidth(character, tag) {
    if (tag === "title") {
        ctx.font = '20px arial';
    } else if (tag === "meta") {
        ctx.font = '14px arial';
    } else if (tag === "url") {
        ctx.font = '16px arial';
    }

    return ctx.measureText(character).width;
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
    let preview = document.querySelector(".prev-" + tag);
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

    /**
        * Rendre dynamique le texte des recommandations 
    */  
   //On initialise les éléments du DOM
    let small = document.getElementById("small-" + tag);

    // Ici on personnalise la recommandation  en fonction de longueur du texte contenu dans l'input (title ou MD) 
    switch (tag)
    {
        case "title":
            if (width < 285) {
                small.innerText = "La longueur du Title faible, pensez à exploiter d'avantage la longueur.";
                small.style.color = "orange";
            } else if(width > 600) {
                small.innerText = "Le titre est trop long, l’intégralité de son contenu ne s’affichera pas, songez à la raccourcir";
                small.style.color = "red";
            } else {
                small.innerText = "Votre Title est de bonne longueur, veillez à la pertinence de son contenu";
                small.style.color = "green";
            }
        break;
        case "meta":
            if (width < 500) {
                small.innerText = "La longueur de la Méta-Description faible, pensez à exploiter d'avantage la longueur.";
                small.style.color = "orange";
            } else if(width > 990) {
                small.innerText = "La Méta-Description est trop long, l’intégralité de son contenu ne s’affichera pas, songez à la raccourcir";
                small.style.color = "red";
            } else {
                small.innerText = "Votre Méta-Description est de bonne longueur, veillez à la pertinence de son contenu";
                small.style.color = "green";
            }
        break;

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

  

