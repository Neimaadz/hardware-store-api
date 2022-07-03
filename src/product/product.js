


const Product = function (id, name, fabricant, categorie, longueur, diametre, taille, composition, norme, image) {
    this.id = id;
    this.name = name;
    this.fabricant = fabricant;
    this.categorie = categorie;
    this.longueur = longueur;
    this.diametre = diametre;
    this.taille = taille;
    this.composition = composition;
    this.norme = norme;
    this.image = image;

}

module.exports = Product;