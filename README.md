# starter
Cette contribution SPIP est à la fois un tuto et un package de fichiers.
Ce dernier me permet de gagner du temps en m'évitant à chaque nouveau projet de refaire les mêmes manips.

## Installer SPIP
[Installer SPIP](https://www.spip.net/fr_download) par la méthode que vous préférez (ZIP, SVN, etc. et bientôt via Composer !)

Personnellement et en attendant Composer, je privilégie la méthode SVN car cela permet de facilement et rapidement mettre à jour la version de SPIP grâce à la commande `svn up`.

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

## Installer Starter
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

## Créer la connexion avec la base de données
Voir le Wizard de SPIP.

## Une fois connecté

### Activer GD2
Dans  *Configuration -> Fonctions avancées -> Génération de miniatures d'images*
… et activer GD2.

Cette partie est importante car sinon, les fonctions de gestion de logo du plugin La Fabrique ne fonctionneront pas.

### Créer le plugin 'tralala'
L'idée ici est de créer un plugin spécifique à notre projet. Ce dernier contiendra les paramètres spécifiques de ce projet et va considérablement nous simplifier la vie.

Il va être possible de créer ce plugin en 10 mns, sans grande connaissance de SPIP ni de PHP, ceci grâce au génialissime plugin [La Fabrique](https://plugins.spip.net/fabrique.html).

#### Installer le plugin La Fabrique
Depuis l'espace privé, aller dans **Configuration -> Gestions des plugins** puis [Télécharger et activer le plugin Fabrique](https://www.spip.net/fr_article3396.html);

#### Créer le plugin Tralala
Une fois le plugin La Fabrique installé, un nouveau bouton de menu Développement est présent.
Aller dans **Développement -> La Fabrique**


#### Une fois le plugin créé
Depuis le finder, déplacer le plugin **'tralala'** de `/plugins/fabrique_auto` et le placer à la racine de `/plugins`.
Vous pouvez maintenant, si vous le voulez, supprimer le répertoire `/plugins/fabrique_auto`.

## Dans le plugin tralala

### Charger les automatiquement des plugins
Il vous suffit alors de copier ces lignes dans le fichier `/tralala/paquet.xml`

```
…
<licence>GNU/GPL</licence>
…
<necessite nom="Zcore" compatibilite="[2.8.0;[" />
<necessite nom="compositions" compatibilite="[3.7.4;[" />
<necessite nom="facteur" compatibilite="[3.6.4;[" />
<necessite nom="simplog" compatibilite="[1.4.4;[" />
<necessite nom="lim" compatibilite="[2.0.3;[" />
…
```

Ainsi, à l'activation du plugin **'tralala'**, ces plugins seront automatiquement installés.


### Autres plugins indispensables, mais hors zone
- *dd* : https://bitbucket.org/nicod_/dd
- *Bigup* : https://gitlab.com/magraine/bigup

### Ajouter des configurations par défaut

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

/* Hop, écran large pour tout le monde */
$GLOBALS['spip_ecran'] = $_COOKIE['spip_ecran'] = 'large';
```


