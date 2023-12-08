
//déclaration des variables

const form = document.getElementById("form");
const name = document.getElementById("projectName");
const textArea = document.getElementById("textArea");
const wordSup = document.getElementById("wordSup");
const submit = document.getElementById("submit");
const formReset = document.getElementById("formReset");

const special_char = document.getElementById("special-char");
const articles = document.getElementById("articles");
const conjonctions = document.getElementById("conjonctions");
const pronoms = document.getElementById("pronoms");
const prepostions = document.getElementById("prepostions");

/**
 * Ecouteur d'évènément à la soumission du formulaire
 */
form.addEventListener("submit", (event) => {
    //cette methode permet d'annuler les paramettre par defaut de l'élément auquel la fonction sera appelé
    event.preventDefault();
    let text = textArea.value;
    /**
        * Debut du traitement du texte 
     */

    //On converti tout le texte en lowercase (minuscle) pour ne pas subir la casse sensitive
    text = text.toLowerCase();

    //Les mots contenus dans ce tableau ne seront pas modifier 
    let motsExclus = ["Arc-en-ciel", "Porte-monnaie", "Mère-grand", "grand-mère","grand-mères", "grand-père", "grand-père", "belle-soeur", "beau-frère", "Beau-père","Belle-mère","Petit-déjeuner", "Chef-d'œuvre", "Couteau-suisse", "Tout-petit", "Fleur-de-lis", 
    "Bonheur-du-jour", "Hôtel-Dieu"];
    
    
    //Avec la methothe replace() et la regex on remplace tout (1h à 6h), les tirets entre les mots, les sauts de ligne, les nombre (! les mots comme H2O ne seront pas affecté),
    // Les caractères spéciauc (@ : / ? . , etc...) par des espaces 
    let filteredText = text.replace(/\bh[1-6]\b|-|\r?\n|\t/gi, " ").replace(/[^\w\sÀ-ÖÙ-öÙ-ÿ-œ]|[\d]+(\.\d+)?/gi, " "); 

    // transformer le texte en tableau, la separation se fait au niveau des espaces.
    let textToArray = filteredText.split(' ');

    //supprimer les indices vides créés par les éléments remplacés plus haut 
    textToArray = textToArray.filter(function(element) {
        return element !== "";
    });

    /**
     * On va passer au liste des mots et expressions superflus 
     */

    // Filtrer tous les articles et les lettres orphelines provoqué par (l', s', c')
    if (articles.checked) {
        let articles = ["le","la","les","un","une","des","uns", "unes","du","de","d","l","c","s","n"];
        /**
            * Ce code en filtre les éléments d'un tableau en supprimant ceux qui sont présents dans un autre tableau.
            * Raison pour laquelle on utilise le (not "!") pour inverser la fonction
        */
        textToArray = textToArray.filter(indice => !articles.includes(indice)); 
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
        
        let pronomsDemonstratif = ["ce","cet", "cette","ces", "ceci", "cela", "celui", "celui","ci", "là", "celle", "celle", "celles", "ceux", "chacun", "chacune", "chaque"];

        let pronomsIndefini = ["un", "une", "des", "du", "la", "le", "les", "l'", "un", "une", "des", "du", "la", "le", "les","l"];

        let pronomsPersonnel = ["j'", "je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles", "je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles"];

        let pronomsPossessif = ["mon", "ton", "son", "notre", "votre", "leur", "ma", "ta", "sa", "mes", "tes", "ses", "mon", "ton", "son", "ma", "ta", "sa", "mes", "tes", "ses", "nos", "vos", "leurs"];

        let pronomsReflexif = ["me", "te", "se"];

        let pronomsInterrogatif = ["qui", "quoi", "où", "quand", "comment", "pourquoi", "quel", "quelle", "quels", "quelles", "quelque", "chose", "choses"];

        let determinantsIndefinis = ["quelques", "plusieurs", "uns", "unes", "beaucoup", "peu", "assez", "tant", "trop", "tout", "tous", "toute", "toutes"]

        let bazar = ["alors" , "au" , "aucun" , "aucune" , "aussi" , "autre" , "autres" , "aux" , "avant" , "avec" , "avoir" , "bon" , "lorsque", "par", "pour", "plus", "h", "qu", "ne", "chez", "ainsi"];
        // On concataine tous les tableaux des pronoms
        let arrayPronoms = pronomsDemonstratif.concat(pronomsIndefini).concat(pronomsPersonnel).concat(pronomsPossessif).concat(pronomsReflexif).concat(pronomsInterrogatif).concat(determinantsIndefinis).concat(bazar);
        
        //On filtre tous les pronoms du texte
        textToArray = textToArray.filter(indice => !arrayPronoms.includes(indice));
    }

    //filtrer tous les prépositions
    if (prepostions) {
        let arrayPrepositions = ["à","de","en","avec","pour", "sur", "sous", "dans", "contre","vers","hors", "après" ,"avant", 
        "pendant", "sans", "jusqu", "au", "delà", "derrière", "devant", "entre", "milieu", "autour", "côté", "loin", "près", 
        "l", "intérieur", "extérieur" ,"dessus", "dessou" ,"gauche","droite", "haut", "bas", "centre", "arrière",  "lavant"];
        
        // On filtre tous les prépostion du text
        textToArray = textToArray.filter(indice => !arrayPrepositions.includes(indice));
    }

    
    //On va filter les mots supplémentaire ajoutés manuellement
    if (wordSup !== null) {
        // On mettre les mots sup dans un tableau
        let arrayWordSup = wordSup.value.split(' ');

        textToArray = textToArray.filter(indice => !arrayWordSup.includes(indice));
    }

    /*
        *Affichage des différents resultats
    */

    // On recupère le body du tableau recapitulatif dans le DOM
    document.getElementById("table-body").innerHTML = ''; // Effacer le contenu du tableau

    // Declaration des variables lier aux noeds du DOM
    const ranking = document.getElementById("ranking").value * 1;

    // Le nombre total de mots dans le tableau filtré
    let totalWords = textToArray.length; 

    // Determiner le nombre de mots après filtrage
    const totalWordsAfter = document.getElementById("totalWordsAfter");
    totalWordsAfter.innerText = totalWords + " Mots"

    //Le nombre de mots avant Filtrage
    const totalWordsBefore = document.getElementById("totalWordsBefore");
    totalWordsBefore.innerText = textArea.value.split(' ').length + " Mots"; 

    // Total de mots filtrés

    const totalWordFiltered = document.getElementById("totalWordFiltered");
    totalWordFiltered.innerText = (textArea.value.split(' ').length - totalWords) + " Mots" 
    
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


// Gestionnaire d'événements pour le bouton 'Reset'
formReset.addEventListener('click', () => {
    textArea.value = ''; // Réinitialiser le contenu du textarea
    wordSup.value = '';
    form.reset(); // Réinitialiser les autres champs du formulaire
    document.getElementById("table-body").innerHTML = ''; // Effacer le contenu du tableau
});


