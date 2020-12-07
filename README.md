# starter
Cette contribution SPIP est à la fois un tuto et un package de fichiers.
Ce dernier me permet de gagner du temps en m'évitant à chaque nouveau projet de refaire les mêmes manips.

## 1. Installer SPIP
[Installer SPIP](https://www.spip.net/fr_download) par la méthode que vous préférez (FTP, spip_loader, [GIT, Composer](https://contrib.spip.net/Installer-SPIP-avec-GIT-Composer))

### Ma méthode d'installation :
Je travaille sur un Mac sur lequel j'ai installé MAMP.

Dans mon répertoire `/htdocs`, je créé le répertoire client. Dans la suite de ce tuto on va considérer que le client s'appelle **Tralala**.

Via le Finder, je créer donc le répertoire `/htdocs/tralala`.
Puis je lance le Terminal, je me place dans le répertoire `/htdocs/tralala`. et j'installe SPIP

```
cd htdocs/tralala
svn co svn://trac.rezo.net/spip/branches/spip-3.2 .
```

Note : faite bien attention à l'ajout ' .' à la fin de la commande SVN. Cela permet de placer les fichiers SPIP à la racine de mon répertoire `/htdocs/tralala`. Sans cela la commande SVN placerait un répertoire `/htdocs/tralala/spip/…` en plus.

## 2. Installer Starter
### En pratique
Il vous suffit de recupérer le zip de Starter et d'installer les répertoires `/plugins` et `/squelettes` à la racine de votre projet.

### Explications
Starter est basé principalement sur le plugin [Zcore de SPIP](https://plugins.spip.net/zcore.html).
Ce dernier permet de gagner un temps fou en développement, en maintenance et en évolutivité.
Pourquoi ? Parce qu'il propose (en autre) une arborescence géniale des dossiers et des fichiers !

Starter fourni de base les répertoires suivants :
   - `/plugins` avec les sous répertoires  et 
      - `/auto`
      - `/fabrique_auto`
   - `/squelettes`
      - `/content`
      - `/footer`
      - `/head`
      - `/header`
      - `/inclure`

Tous ces répertoires contiennent des fichiers exemples avec commentaires intégrés.

Enfin à la racine de `/squelettes`, les deux fichiers essentiels à Zcore sont présents :
- `/squelettes/structure.html`
- `/squelettes/body.html`

Il existe beaucoup de documentation sur Zcore. Celle qui m'a été le plus utile est une vieille doc sur l'ancêtre de Zcore à savoir Zpip. Voir [Zpip, blocs de page et Ajax](https://contrib.spip.net/Zpip-blocs-de-page-et-Ajax).

## 3. Créer la connexion avec la base de données
Depuis votre navigateur, aller sur `/tralala/ecrire` et suivez la pocédure d'installation de SPIP

## 4. Une fois connecté

### 4.1 Activer GD2
Dans  *Configuration -> Fonctions avancées -> Génération de miniatures d'images*
… et activer GD2.

Cette partie est importante car sinon, les fonctions de gestion de logo du plugin La Fabrique ne fonctionneront pas.

### 4.2 Créer le plugin 'Tralala'
L'idée ici est de créer un plugin spécifique à notre projet. Ce dernier contiendra les paramètres spécifiques et va, par la suite, considérablement nous simplifier la vie.

Il est possible de créer ce plugin en 10 mns, sans grande connaissance de SPIP ni de PHP, ceci grâce au génialissime plugin [La Fabrique](https://plugins.spip.net/fabrique.html).

#### Activer le dépot SPIP zone
Dans *Configuration Gestion des plugins -> Ajouter des plugins -> Dépôts*, activer le dépôt 'Spip Zone'.

N.B. 1 :Ce dépôt est la source principale de plugins SPIP.

N.B. 2 : voir aussi à ce propos https://plugins.spip.net/spip.php?page=depots

#### Installer le plugin La Fabrique
Pour cela suivez les indications pour [Installer un plugin](https://www.spip.net/fr_article3396.html) et installez le plugin **Fabrique**.

#### Créer le plugin Tralala
Une fois le plugin La Fabrique installé, un nouveau bouton de menu Développement est présent.
* Aller dans *Développement -> La Fabrique*

**Important !** : dans la partie *Fichiers*, chochez toutes les options à savoir :
- `Autorisations`
- `Fonctions`
- `Options`
- `Pipelines` 

Explications : cela créer les fichiers `/tralala/tralala_autorisations.php`, `/tralala/tralala_fonctions.php`, etc. qui vont considérablement vous simplifiez la vie.

Dans la suite de ce tuto, on va rapidement avoir besoin du fichier `/tralala/tralala_options.php` 

#### Une fois le plugin créé
Depuis le finder, déplacer le plugin **'tralala'** de `/plugins/fabrique_auto` et le placer à la racine de `/plugins`.
Vous pouvez maintenant, si vous le voulez, supprimer le répertoire `/plugins/fabrique_auto`.

## 5. Dans le plugin tralala

### 5.1 Charger les automatiquement des plugins
Il vous suffit alors de copier ces lignes dans le fichier `/tralala/paquet.xml`

```
…
<licence>GNU/GPL</licence>
…
<necessite nom="Zcore" compatibilite="[2.8.7;[" />
<necessite nom="compositions" compatibilite="[3.8.1;[" />
<necessite nom="facteur" compatibilite="[4.0.4;[" />
<necessite nom="simplog" compatibilite="[1.5.0;[" />
<necessite nom="lim" compatibilite="[3.0.3;[" />
…
```

Ainsi, à l'activation du plugin **'tralala'**, ces plugins seront automatiquement installés.


### 5.2 Autres plugins indispensables, mais hors zone
- *dd* : https://bitbucket.org/nicod_/dd

### 5.3 Ajouter des configurations par défaut

Ouvrir le fichier `/tralala/tralala_options.php` et ajouter les lignes suivants :

```
/* Plugin Zcore :http://www.yterium.net/Un-framework-HTML-est-il-possible
*	-> déclaration des répertoires nécessaires pour le répertoire /squelettes 
*/
if (!isset($GLOBALS['z_blocs'])) {
	$GLOBALS['z_blocs'] = array('content','head','header','footer','breadcrumb');

// array('content','head', 'head_js', 'aside', 'header', 'footer', 'breadcrumb');
// define('_Z_AJAX_PARALLEL_LOAD','content');

}

/* Plugin Simples Logs : http://contrib.spip.net/Simples-Logs
* constante pour que le texte du log contienne aussi :
* 	-> le nom du fichier, 
* 	-> le numéro de la ligne de code concernée,
* 	-> le nom de la fonction ayant généré le log.
*/
defined('_LOG_FILELINE') || define('_LOG_FILELINE', true);


/* Par defaut, titre les documents en reprenant le nom du fichier */
/* Option avec des effets de bord curieux (pour pas dire relou :) sur SPIP <= 3.2, mais vraiment bien avec SPIP >= 3.3 */
defined('_TITRER_DOCUMENTS') || define('_TITRER_DOCUMENTS', true);

/* Après avoir créé un mot-clé, revenir sur la page mode VUE de mot-clé, au lieu de la page groupe mot-clé*/
defined('_MOTS_CREATION_RETOUR_MOT_CREE') || define('_MOTS_CREATION_RETOUR_MOT_CREE', true);

/* Hop, écran large pour tout le monde (pour SPIP <= 3.2) */
$GLOBALS['spip_ecran'] = $_COOKIE['spip_ecran'] = 'large';
```
## 7. Activer le plugin Tralala
Dans *Configuration -> Gestion des plugins*, aller dans l'onglet "Inactifs" et activer le plugin `Tralala`.
Une fenêtre popup va vous proposer des actions supplémentaires à savoir activer les plugins déclarés plus dans le paragraphe 5.1. C'est bien ce qu'on veut.

## 6. A vous de jouer…
Perso, je commence toujours par là : [Modifier le nom de « Mon site SPIP »](https://www.spip.net/fr_article3520.html)
