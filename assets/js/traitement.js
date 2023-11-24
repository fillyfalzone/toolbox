// fichier pour nettoyer les tableau

let text = "à de en avec pour sur sous dans contre vers hors après avant pendant sans jusqu à au delà derrière devant entre au milieu autour à côté loin de près de à l intérieur à l extérieur au dessus au dessous au dessus de au dessous de à gauche à droite en haut en bas au centre à l arrière à l avant à l intérieur à l extérieur au dessus au dessous au dessus de au dessous de à gauche à droite en haut en bas au centre à l arrière à l avant à l intérieur à l extérieur au dessus au dessous au dessus de au dessous de à gauche à droite en haut en bas au centre à l arrière à lavant à l intérieur à l extérieur au dessus au dessous au dessus de au dessous de à gauche à droite en haut en bas au centre à l arrière  à l avant à l intérieur à l extérieur au dessus au dessous au dessus de au dessous de à gauche à droite en haut en bas au centre à l arrière à l avant à l intérieur à l extérieur  au dessus  au dessous  au dessus de  au dessous de à gauche à droite en haut en bas au centre à l arrière à l avant à l intérieur à l extérieur au dessus au dessous au dessus de au dessous de à gauche à droite en haut en bas au centre à l arrière à l avant à l intérieur à l extérieur au dessus au dessous au dessus de au dessous de à gauche"

let textToarray = text.split(" ");

let textSet = new Set(textToarray)

console.log(textSet);
                
["à",
"de",
"en",
"avec",
"pour",
"sur",
"sous",
"dans",
"contre",
"vers" ,
"hors" ,
"après" ,
"avant" ,
"pendant" ,
"sans" ,
"jusqu" ,
"au" ,
"delà" ,
"derrière",
"devant",
"entre",
"milieu", 
"autour" ,
"côté" ,
"loin" ,
"près" ,
"l" ,
"intérieur", 
"extérieur" ,
"dessus", 
"dessou" ,
"gauche" ,
"droite" ,
"haut" ,
"bas" ,
"centre" ,
"arrière", 
"lavant", 
""]


 // Articles définis
 ["le", "la", "les", "les", "un", "une", "des", "l'","ce", "cet", "cette", "ces"] 
