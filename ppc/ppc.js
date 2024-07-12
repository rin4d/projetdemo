const contenantChoixOrdinateur = document.getElementById('choix-ordinateur');
const contenantChoixUtilisateur = document.getElementById('choix-utilisateur');
const contenantResultat = document.getElementById('resultat');

const choixPossibles = document.querySelectorAll('button');
let ChoixUtilisateur;
let resultat;
let ChoixOrdinateur;

// Événement 'Click sur les boutons'
choixPossibles.forEach(button => button.addEventListener('click', (e) => {
    // Récupération de l'ID du bouton cliqué
    ChoixUtilisateur = e.target.id;
    // On ajoute l'image qui correspond au choix
    contenantChoixUtilisateur.innerHTML = `<img src="${ChoixUtilisateur}.png" alt="${ChoixUtilisateur}">`;
    generer_choix_ordinateur();
    verification();
}));

// Fonction pour générer le choix de l'ordinateur
function generer_choix_ordinateur(){
    const random = Math.floor(Math.random() * 3); // Générer des nombres compris entre 0 et 2
    if (random === 0) {
        ChoixOrdinateur = "pierre";
    } else if (random === 1) {
        ChoixOrdinateur = "papier";
    } else if (random === 2) {
        ChoixOrdinateur = "ciseaux";
    }

    // On ajoute l'image qui correspond au choix
    contenantChoixOrdinateur.innerHTML = `<img src="${ChoixOrdinateur}.png" alt="${ChoixOrdinateur}">`;
}

// Fonction pour vérifier si le joueur a gagné ou pas
function verification() {
    if (ChoixUtilisateur === ChoixOrdinateur) {
        resultat = "Égalité!";
    } else if (
        (ChoixUtilisateur === "pierre" && ChoixOrdinateur === "ciseaux") ||
        (ChoixUtilisateur === "papier" && ChoixOrdinateur === "pierre") ||
        (ChoixUtilisateur === "ciseaux" && ChoixOrdinateur === "papier")
    ) {
        resultat = "Gagné!";
    } else {
        resultat = "Perdu!";
    }
    contenantResultat.innerHTML = resultat;
}
