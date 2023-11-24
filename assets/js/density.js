
//déclaration des variables

const form = document.getElementById("form");
const name = document.getElementById("projectName");
const textAera = document.getElementById("textAera");
const wordSup = document.getElementById("wordSup");
const submit = document.getElementById("submit");
const formReset = document.getElementById("formReset");


const special_char = document.getElementById("special-char");
const articles = document.getElementById("articles");
const conjonctions = document.getElementById("conjonctions");
const pronoms = document.getElementById("pronoms");
const prepostions = document.getElementById("prepostions");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    let text = textAera.value;
    //On converti tout le texte en lowercase
    text = text.toLowerCase();

    //Les mots contenus dans ce tableau ne seront pas modifier 
    let motsExclus = ["Arc-en-ciel", "Porte-monnaie", "Mère-grand", "Beau-père","Belle-mère","Petit-déjeuner", "Chef-d'œuvre", "Couteau-suisse", "Tout-petit", "Fleur-de-lis", 
    "Bonheur-du-jour", "Hôtel-Dieu"];
    
    
    //On filtre tous les caractères spéciaux et nombres
    let filteredText = text.replace(/\bh[1-6]\b|-|\r?\n|\t/gi, " ").replace(/[^\w\sÀ-ÖÙ-öÙ-ÿ-œ]|[\d]+(\.\d+)?/gi, " ");   
    // transformer la chaine de caractère en tableau
    let textToArray = filteredText.split(' ');

    //supprimer les indices qui sont des espaces
    textToArray = textToArray.filter(function(element) {
        return element !== "";
    });

// des modifications à faire pour la suite --------------------

    // Filtrer tous les articles
    if (articles.checked) {
        let articles = ["le","la","les","un","une","des","du","de","d","l","au","aux","à","c","s"];
        textToArray  = textToArray.filter(indice => !articles.includes(indice)); 
    } 

    //filtrer tous les conjonctions de coordination et subordination
    if (conjonctions.checked) {
        let conj_coord = ["et", "mais", "ou", "donc", "or", "ni", "car"];
        let conj_sub = ["que", "quand", "si", "comme", "parce", "afin", "pendant", "tandis"];
        //On concataine les deux tableaux
        let arrayConjonctions = conj_coord.concat(conj_sub);
        //On filtre toutes les conjonctions du texte
        textToArray = textToArray.filter(indice => !arrayConjonctions.includes(indice));
        }

    //filtrer tous les pronoms
    if (pronoms.checked) {
        
        let pronomsDemonstratif = ["ce","cette","ces", "ceci", "cela", "celui", "celui-ci", "celui-là", "celle", "celle-ci", "celle-là", "celles", "celles-ci", "celles-là", "ceux", "ceux-ci", "ceux-là", "chacun", "chacune", "chaque"];

        let pronomsIndefini = ["un", "une", "des", "du", "la", "le", "les", "l'", "un", "une", "des", "du", "la", "le", "les", "l'","l"];

        let pronomsPersonnel = ["j'", "je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles", "je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles"];

        let pronomsPossessif = ["mon", "ton", "son", "notre", "votre", "leur", "ma", "ta", "sa", "mes", "tes", "ses", "mon", "ton", "son", "ma", "ta", "sa", "mes", "tes", "ses", "nos", "vos", "leurs"];

        let pronomsReflexif = ["me", "te", "se"];

        let pronomsInterrogatif = ["qui", "quoi", "où", "quand", "comment", "pourquoi", "quel", "quelle", "quels", "quelles", "quelque", "quelque chose", "quelque chose", "quelque chose", "quelque chose", "quelque chose", "quelque chose", "quelque chose", "quelque chose", "quelque chose", "quelque chose", "quelque chose", "quel"];

        let determinantsIndefinis = ["quelques", "plusieurs", "plusieurs", "quelques-uns", "quelques-unes", "plusieurs", "plusieurs", "beaucoup", "peu", "assez", "tant", "trop", "tout", "tous", "toute", "toutes"]

        let bazar = ["alors" , "au" , "aucun" , "aucune" , "aussi" , "autre" , "autres" , "aux" , "avant" , "avec" , "avoir" , "bon" , "lorsque", "par", "pour", "plus", "h", "qu", "ne", "chez", "ainsi", "le"];
        // On concataine tous les tableaux des pronoms
        let arrayPronoms = pronomsDemonstratif.concat(pronomsIndefini).concat(pronomsPersonnel).concat(pronomsPossessif).concat(pronomsReflexif).concat(pronomsInterrogatif).concat(determinantsIndefinis).concat(bazar);
        
        //On va cleaner le tableau des pronoms
        arrayPronoms = clearTable(arrayPronoms);

        //On filtre tous les pronoms du texte
        textToArray = textToArray.filter(indice => !arrayPronoms.includes(indice));
    }

    //filtrer tous les prépositions
    if (prepostions) {
        let arrayPrepositions = ["à","de","en","avec","pour", "sur", "sous", "dans", "contre","vers","hors", "après" ,"avant", 
        "pendant", "sans", "jusqu", "au", "delà", "derrière", "devant", "entre", "milieu", "autour", "côté", "loin", "près", 
        "l", "intérieur", "extérieur" ,"dessus", "dessou" ,"gauche","droite", "haut", "bas", "centre", "arrière",  "lavant", ""];
        
        // On filtre tous les prépostion du text
        textToArray = textToArray.filter(indice => !arrayPrepositions.includes(indice));
    }

    

    //On va filter les mots supplémentaire ajoutés manuellement
    if (wordSup !== null) {
        // On mettre les mots sup dans un tableau
        let arrayWordSup = wordSup.value.split(' ');

        textToArray = textToArray.filter(indice => !arrayWordSup.includes(indice));
        
    }

    // On nettoye le tableau final
    textToArray = clearTable2(textToArray);

    document.getElementById("table-body").innerHTML = ''; // Effacer le contenu du tableau


    /*
        *Affichage des différents resultats
    */

    // Declaration des variables lier aux noeds du DOM
    const ranking = document.getElementById("ranking").value * 1;

    // Le nombre total de mots dans le tableau filtré
    let totalWords = textToArray.length; 

    // Determiner le nombre de mots après filtrage
    const totalWordsAfter = document.getElementById("totalWordsAfter");
    totalWordsAfter.innerText = totalWords + " Mots"

    //Le nombre de mots avant Filtrage
    const totalWordsBefore = document.getElementById("totalWordsBefore");
    totalWordsBefore.innerText = textAera.value.split(' ').length + " Mots"; 

    // Total de mots filtrés

    const totalWordFiltered = document.getElementById("totalWordFiltered");
    totalWordFiltered.innerText = (textAera.value.split(' ').length - totalWords) + " Mots" 
    
    // On va compter les occurence de chaque mots 
    let wordCounts = {};

    textToArray.forEach(word => { 
        wordCounts[word] = (wordCounts[word] || 0) + 1;        
    });

    // On va calculer la densité de chaque mot et trier 

    let wordDensities = Object.entries(wordCounts).map(([word, count]) => {
        return { word, count, density: (count/ totalWords).toFixed(3)};
    }).sort((a, b) => b.count - a.count); 

    // On selectionne les 10 mots les plus fréquents
    let topWords = wordDensities.slice(0, ranking); 

    //va afficher les données dans notre tableau html
    let tableBody = document.getElementById("table-body"); 

    // Boucle sur le topWords pour créer les rangées du tableau
    topWords.forEach((wordData, index) => {
        //creation d'une nouvelle rangé
        let row = document.createElement('tr');

        // On ajoute les cellules à la rangée 
        let cellRank = row.insertCell(0);
        cellRank.textContent = index + 1; // Rank

        let cellWord = row.insertCell(1);
        cellWord.textContent = wordData.word // Mot

        let cellCount = row.insertCell(2);
        cellCount.textContent = wordData.count; // Occurences

        let cellDensity = row.insertCell(3);
        cellDensity.textContent = wordData.density; // Densité

        // On ajoute la rangé au corp du tableau
        tableBody.appendChild(row);
    })
    
});

// form.addEventListener('submit', processFormData); 

// Gestionnaire d'événements pour le bouton 'Reset'
formReset.addEventListener('click', () => {
    textAera.value = ''; // Réinitialiser le contenu du textarea
    wordSup.value = '';
    form.reset(); // Réinitialiser les autres champs du formulaire
    document.getElementById("table-body").innerHTML = ''; // Effacer le contenu du tableau
});


     
// On va créer une fonction pour nettoyer le tableau de prépostions
function clearTable (table) {
    //convertir le tableau en string
    let tableToString = table.join(' ');
    
    //supprimer tout les tirets et apostrophes 
    let clear = tableToString.replace(/[-']/g, ' ');

    //diviser la chaine de caractère en mots au niveau des espaces et convertir en tableau
    let words = clear.split(' ');

    //on va supprimer tout les doublons en utilisant un Set
    let uniqueWords = new Set(words);

    //on converti en un tableau et on join 
    let newTable = Array.from(uniqueWords);
    //On supprime tout les indices vides
    let outerTable = newTable.filter(indice => indice.trim() !== '');

    return outerTable;
}  

// Cleaner les tableaux sans supprimer les mots doublons

function clearTable2 (table) {
    //convertir le tableau en string
    let tableToString = table.join(' ');
    
    //supprimer tout les tirets et apostrophes 
    let clear = tableToString.replace(/[-']/g, ' ');

    //diviser la chaine de caractère en mots au niveau des espaces et convertir en tableau
    let words = clear.split(' ');

    //on converti en un tableau et on join 
    let newTable = Array.from(words);
    //On supprime tout les indices vides
    let outerTable = newTable.filter(indice => indice.trim() !== '');

    return outerTable;
}  
