# starter

## Initialisation

1. Installer SPIP (méthode SVN)
1. Créer les répertoires 
   - `/plugins/auto`
   - `/plugins/fabrique_auto`
   - `/squelettes`


## Créer la connexion avec la base de données
Voir le Wizard de SPIP.


## Une fois connecté

### Activer GD2
Dans  *Configuration -> Fonctions avancées -> Génération de miniatures d'images*
… et activer GD2.

Cette partie est importante car sinon, les fonctions de gestion de logo du plugin La Fabrique ne fonctionneront pas.

### Créer le plugin client
* Configuration -> plugins;
* Télécharger et activer le plugin Fabrique;
* Créer le plugin Client.

Il va nous simplifier la vie dans la gestion des paramètres spécifiques du site Web.

Sortir le plugin Client de `/fabrique_auto` et le placer à la racine de `/plugins`.

## Dans le plugin Client

Il doit charger les dépendances suivantes :

```
<necessite nom="Zcore" compatibilite="[2.6.7;[" />
<necessite nom="compositions" compatibilite="[3.7.3;[" />
<necessite nom="facteur" compatibilite="[3.5.2;[" />
<necessite nom="simplog" compatibilite="[1.4.4;[" />
<necessite nom="lim" compatibilite="[2.0.0;[" />
```

Autres plugins indispensables, mais hors zone
- *dd* : https://bitbucket.org/nicod_/dd
- *Bigup* : https://gitlab.com/magraine/bigup

Charger également les plugins hors zone

dans le fichier client_options.php

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



Le starter est un jeu de squelette compatible Zcore. C'est une base très pratique.
