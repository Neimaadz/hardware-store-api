

exports.Product = function (id, name, fabricant, type, longueur, diametre, taille, composition, norme, image) {
    this.id = id;
    this.name = name;
    this.fabricant = fabricant;
    this.type = type;
    this.longueur = longueur;
    this.diametre = diametre;
    this.taille = taille;
    this.composition = composition;
    this.norme = norme;
    this.image = image;
}

exports.Authentication = function (token, user) {
    this.token = token;
    this.user = user;
}

exports.User = function (id, username) {
    this.id = id;
    this.username = username;
}