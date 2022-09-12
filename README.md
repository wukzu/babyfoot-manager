# babyfoot-manager
Application nodeJS de management de partie de babyfoot en temps réel, incluant chat et historique.  
prérequis : NodeJS  
Démo du projet en live : http://217.160.36.225/

## Architecture
### `config`
Dossier de configuration, contenant notamment la configuration de connexion à la base de données postgreSQL (database.js)
### `constants`
Dossier contenant les constants du projet
### `models`
Regroupement des requêtes SQL pour la communication avec la base de données
### `SocketControllers`
Contrôle des sockets arrivants depuis le client
### `views`
Dossier contenant le code du client, html/css/js


## Initialisation du projet
```bash
# clone du repo
$ git clone https://github.com/wukzu/babyfoot-manager.git

# ouvrir le dossier
$ cd babyfoot-manager

# installation des modules npm
$ npm install
```
## Initialisation de la base de données postgreSQL
Il y a deux manières d'importer la base de données, en ligne de commande ou de manière graphique avec pgadmin.

### En ligne de commande
Il faut créer une base de données vide, créer un utilisateur puis lui accorder tous les droits sur cette base de données.  
A savoir que l'utilisateur par default est 'babyfootuser', utilisez celui-ci si vous ne voulez pas avoir à le changer par la suite.
```
sudo su - postgres #switch vers un super-utilisateur postgresql, ici postgres par default
psql # entrer en ligne de commande postgresql
postgres=# CREATE DATABASE babyfoot_manager;
postgres=# CREATE USER nomUtilisateur with encrypted password 'motDePasse';  # choisissez votre nom d'utilisateur, par default 'babyfootuser'
postgres=# grant all privileges on database nomBaseDeDonnees to nomUtilisateur; # le nom de la base de données, et l'utilisateur
```

Importez la base de données '**babyfootmanager_plain.sql**' se trouvant dans le dossier `database files` du repo git.
Si vous avez utilisé un autre utilisateur que 'babyfootuser' juste avant, remplacez toutes les occurences de 'babyfootuser' dans le fichier sql (ligne 34, 55, 70, 85) par le nom d'utilisateur que vous avez choisi.
```bash
$ cd /chemin/vers/le/repo/
$ psql -U postgres nomBaseDeDonnees < babyfootmanager_plain.sql # Rempalcez nomBaseDeDonnees par le nom de la base de données précedemment créée
```

### Depuis pgadmin
1. Créer un nouvel utilisateur '**babyfootuser**'
2. Créer une nouvelle base de donnéee vide, en mettant comme Owner le nouvel utilisateur '**babyfootuser**'
3. Clique droit sur cette base de donnée > restore
4. Pour la partie filename, choisissez le fichier '**babyfootmanager_restore.sql**' se trouvant dans le dossier `database files` du repo git.
5. Cliquez sur 'Restore'

## Lancement du projet
Dans le repo, au même niveau que le fichier `server.js`, créez un nouveau fichier `.env` pour y mettre les variables d'environnement suivantes (qui sont utilisées dans le fichier `server.js` et `config/database.js`) :
```bash
PORT=3000                 # Le port d'écoute, par default 3000
DB_USER=babyfootuser      # L'utilisateur créé précédemment
DB_HOST=127.0.0.1         # L'host de la base de donnée
DB_NAME=babyfoot_manager  # Le nom de la base de donnée créée précédemment
DB_PASSWORD=motDePasse    # Lez mot de passe de l'utilisateur créée précédemment
DB_PORT=5432              # Le port d'écoute de postgre, par default 5432
```
Une fois le fichier créé et enregistré, lancez le serveur
```bash
$ node server.js
```
Enfin, rendez-vous sur http://localhost:3000 (selon le port choisi dans le fichier `.env`)
