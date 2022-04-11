// Mot de passe de la bdd
const password = process.env.BDD_PASSWORD;// Le mot de passe est stockés dans une variable d'environnement
const bddUserName = process.env.BDD_USERNAME;
const bddCluster = process.env.BDD_CLUSTER

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${bddUserName}:${password}@cluster0.1fjx9.mongodb.net/${bddCluster}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));