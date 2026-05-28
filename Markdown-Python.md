# Ceci est un petit manuel python

:::info
**This is cool!**  
Here's a callout block.  
It supports **markdown**
:::

La personne qui a rajouté l'équivalent des trois bouquins des seigneurs des anneaux aille se faire voire. C'est une dinguerie de faire ça.
Je crois c'était Naïm

## Les dictionnaires en python
MORSE_LIST = {
    "a":".-", "b":"-...", "c":"-.-.", "d":"-..", "e":".", "f":"..-.", "g":"--.", "h":"....", "i":"..", "j":".---",
    "k":"-.-", "l":".-..", "m":"--", "n":"-.", "o":"---", "p":".--.", "q":"--.-", "r":".-.", "s":"...", "t":"-",
    "u":"..-", "v":"...-", "w":".--", "x":"-..-", "y":"-.--", "z":"--.."
}

LISTE_INVERSE = {
    ".-":"a", "-...":"b", "-.-.":"c", "-..":"d", ".":"e", "..-.":"f", "--.":"g", "....":"h", "..":"i", ".---":"j",
    "-.-":"k", ".-..":"l", "--":"m", "-.":"n", "---":"o", ".--.":"p", "--.-":"q", ".-.":"r", "...":"s", "-":"t",
    "..-":"u", "...-":"v", ".--":"w", "-..-":"x", "-.--":"y", "--..":"z", "":""
}

## Les chaînes de caractère en python

En Python, une chaîne de caractères (ou *string*) est une suite de caractères utilisée pour représenter du texte. Elle est définie à l’aide de guillemets simples (`'`), doubles (`"`) ou triples (`'''` ou `"""`) pour les textes sur plusieurs lignes. Les chaînes sont **immuables**, ce qui signifie qu’on ne peut pas modifier un caractère directement une fois la chaîne créée. Python offre de nombreuses opérations sur les chaînes, comme la concaténation avec `+`, la répétition avec `*`, l’accès à un caractère par son indice, ou encore des méthodes très pratiques comme `upper()`, `lower()`, `split()` et `replace()`. Les chaînes de caractères sont très utilisées pour la gestion des données textuelles, l’affichage de messages et la manipulation d’entrées utilisateur.

## Les listes en python

En Python, une liste est une structure de données qui permet de stocker **plusieurs valeurs dans un même objet**. Elle est définie à l’aide de crochets `[]`, avec des éléments séparés par des virgules. Une liste peut contenir des éléments de types différents (nombres, chaînes de caractères, booléens, voire d’autres listes) et elle est **modifiable**, ce qui signifie qu’on peut ajouter, supprimer ou modifier ses éléments après sa création. On accède aux éléments d’une liste grâce à leur indice, en commençant par `0`. Python fournit de nombreuses méthodes pour manipuler les listes, comme `append()` pour ajouter un élément, `remove()` pour en supprimer un, `sort()` pour trier la liste ou encore `len()` pour connaître sa taille. Les listes sont très utilisées pour gérer des collections de données de manière simple et efficace.

## La boucle while en python

En Python, la boucle `while` permet de répéter un bloc d’instructions **tant qu’une condition est vraie**. Avant chaque itération, Python évalue la condition : si elle est vraie (`True`), le code à l’intérieur de la boucle s’exécute ; si elle devient fausse (`False`), la boucle s’arrête. Il est donc essentiel que la  boucle s’arrête. Il est donc essentiel que la condition évolue au cours du temps, sinon on risque de créer une **boucle infinie**. La boucle `while` est souvent utilisée lorsqu’on ne connaît pas à l’avance le nombre de répétitions nécessaires. On peut aussi contrôler son déroulement avec les mots-clés `break` (pour arrêter la boucle) et `continue` (pour passer directement à l’itération suivante).

## La boucle for en python

En Python, la boucle `for` permet de parcourir **une séquence d’éléments** (comme une liste, une chaîne de caractères ou un intervalle de nombres) et d’exécuter un bloc de code pour chacun d’eux. À chaque itération, une variable prend successivement la valeur de l’élément courant de la séquence. La boucle `for` est particulièrement utile lorsque le nombre d’itérations est connu à l’avance. On l’utilise souvent avec la fonction `range()` pour répéter une action un certain nombre de fois. Comme avec les autres boucles, on peut contrôler son comportement à l’aide de `break` pour l’interrompre et `continue` pour passer à l’itération suivante.

![Example](./images/05-09-47-978_512.webp)
## Parcourir un nombre en python et sélectionner ses chiffres les uns après les autres
**-Parcourir un nombre en Python et sélectionner ses chiffres:**
En Python, un **nombre entier (`int`) n’est pas itérable directement**.  
Pour accéder à ses chiffres un par un il faut faire une conversion en chaîne de caractères.
Principe:
On transforme le nombre en **chaîne (`str`)**, puis on parcourt chaque caractère.

## Convertir un nombre en binaire et ôter les 2 premiers caractères de la chaîne

On utilise la fonction `bin()` de math et rajoute un argument `[2:]` afin de se débarasser des deux premiers caractères qu'il renvoie. Ainsi, on peut écrire par exemple: `a=bin(12)[2:]` où `a` sera égale à l'écriture binaire de 12 sans l'argument 0b qui le précède abituellement lorsque on utilise la fonction `bin()`.
Le programe final qui fait ceci, défini en fonction serait donc:

# Ce qu’il faut absolument savoir pour l’examen
Calculer la résistance avec une LED
Comprendre les GPIO
Utiliser :
LED
boutons
servomoteurs
potentiomètres
Faire du code Python sur Raspberry Pi Pico
Comprendre le PWM
Lire et expliquer un morceau de code
Monter un circuit correctement
Faire des projets style :
compteur de clics
moteur contrôlé par potentiomètre
## Raspberry Pi Pico – Bases
Le Raspberry Pi Pico est un microcontrôleur programmable en Python.
Il possède :

des pins GPIO

des pins PWM

des pins ADC

des pins GND

des pins d’alimentation

## Faire tourner un servo

Si l'on veut par exemple faire bouger le servo d'un certain angle il faut utiliser la formule suivante: f(x)=(65535 * 0.5/20)+(65535 * 2.5/20-65535 * 0.5/20)/180x
On peut trouver cette formule en sachant que si l'on veut que la position du servo =180°, on a 65535 * 2.5/20, et si position du servo =0° on a 65535 * 0.5/20, en utilisant la formule pour trouver la droite que fait une fonction: f(x)=f(a)+(f(b)-f(a))/(b-a) * (x-a) on peut créer une fonction que l'on va appeler `setServoCycle`:

`duty=int((65535*0.5/20)+(65535*2.5/20-65535*0.5/20)/180*(x)) # x est en degré de 0 à 180`


## Les pins importantes
### Pins d’alimentation
#### 3.3V
Utilisé pour alimenter :

capteurs

potentiomètres

circuits faibles tensions

#### 5V (VBUS)
Utilisé pour :

servomoteurs

moteurs

#### GND
Ground = masse = 0V

Tous les composants doivent partager le même GND.

## GPIO (General Purpose Input Output)
### Mode OUTPUT
Le pin ENVOIE un signal.

Valeurs possibles :

0 → 0V

1 → 3.3V

### Mode INPUT
Le pin LIT un signal.

## Pull-up et Pull-down
Très important pour l’examen.
#### Sans résistance
Le signal flotte :
valeurs aléatoires
bruit électrique
#### Pull-up
Le pin est normalement à 1.

Quand on appuie :

connecté au GND
devient 0

Donc :

Bouton / Valeur

relâché / 1

appuyé / 0

Très important :
Le bouton inversera la logique.

## Breadboard
À connaître parfaitement.

### Fonctionnement
Les lignes horizontales :

rouge = + alimentation

bleu = GND

Les colonnes verticales sont reliées entre elles.

Le milieu coupe les connexions.

## LED
### Sens de branchement
#### Anode (+)
Patte longue
#### Cathode (-)
Patte courte

La cathode va vers :
GND

L’anode va vers :
résistance , GPIO

## Résistance pour LED 
Formule :

R = Vgénérateur - Vdiode / Idiode

### Signification
Symbole / Signification

R   / résistance

Vgénérateur / tension alimentation

Vdiode / tension LED

Idiode / courant LED

### Exemple 
Données:

alimentation : 3.3V

LED : 2V

courant : 0.02A

Calcul :

R = 3.3 - 2 / 0.02

On prend une valeur supérieure :

100Ω

220Ω

### IMPORTANT
Sans résistance :

LED grillée

Raspberry abîmé

## PWM (Pulse Width Modulation)
Le PWM permet de simuler une tension variable.

Le signal alterne très vite :

HIGH

LOW


### Les 2 paramètres du PWM

#### A. Fréquence
Nombre d’impulsions par seconde.

Unité :

Hertz (Hz)

Exemple :

f = 50Hz
→ 50 impulsions par seconde.

#### B. Duty Cycle (rapport cyclique)
Pourcentage du temps où le signal est à 1.

Duty cycle / Effet

0% / toujours OFF

50% / moitié ON

100% / toujours ON

## Valeurs duty_u16
Valeur / Pourcentage

0 / 0%

65535 / 100%

## ADC (Analog Digital Converter)
Permet de lire une tension variable.

Pins :

26

27

28

## Valeurs possibles
Tension / Valeur
0V / 0
3.3V / 65535

## Potentiomètre
Composant variable.

Tourner le potentiomètre :

change la résistance

change la tension

Le Pico lit cette tension avec ADC.

## Servomoteur
Très important.

Le servo :

tourne entre 0° et 180°

utilise du PWM

## Fréquence du servo
Toujours :

f=50Hz

## Temps d’impulsion
Position / Impulsion
0° / 0.5 ms
90° / 1.5 ms
180° / 2.5 ms

## Branchement servo
Fil / Connexion
orange / GPIO signal
rouge / 5V
noir / GND

## Bouton poussoir
### Fonctionnement
Quand appuyé :

le circuit se ferme

Quand relâché :

circuit ouvert

## Morse (activité du cours)
Ton prof peut demander :

d’expliquer la logique

de modifier le code

## Concepts Python à connaître
### Boucle while
while True:

Boucle infinie.
### Boucle for
for i in range(10):
### Fonction
def maFonction():
### Condition
if x == 1:

## Questions théoriques possibles
### Pourquoi utiliser une résistance ?
Pour limiter le courant.
### Pourquoi utiliser PWM ?
Pour contrôler :
luminosité
vitesse
position
### Différence GPIO / ADC
GPIO / ADC
0 ou 1 / valeur variable
### Pourquoi utiliser PULL_UP ?
Pour éviter un signal flottant.

## Erreurs fréquentes
LED à l’envers
→ ne fonctionne pas.

Oublier GND commun
→ le circuit ne marche pas.

Servo sur 3.3V
→ souvent insuffisant.

Pas de résistance avec LED
→ destruction.

# PROJET NIKITA ET LILY :) 
## OBJECTIF DU PROJET
Le but du projet était de construire une voiture robotique capable :

d’avancer

de reculer

de tourner à gauche et à droite

de suivre un parcours programmé

## Le projet servait à :
apprendre la robotique

comprendre l’électronique

programmer des moteurs avec Python

utiliser GPIO et PWM

## CE QUE LE PROJET M’A APPRIS
Le projet m’a permis d’apprendre à :

connecter des composants électroniques

utiliser un driver moteur L298N

programmer les moteurs en Python

contrôler les déplacements de la voiture

comprendre les bases de la robotique

## COMPOSANTS UTILISÉS
### Raspberry Pi Pico
Le Pico est le cerveau de la voiture.

Il :

exécute le programme Python

envoie les signaux électriques

contrôle les moteurs via GPIO

### Driver moteur L298N
Le L298N est un module qui sert d’intermédiaire entre :

le Raspberry Pi Pico

les moteurs

Le Pico seul ne peut pas alimenter les moteurs.

### Le L298N :
fournit la puissance

contrôle le sens de rotation

contrôle la vitesse

### Breadboard
Le breadboard permet :

connecter les composants

éviter la soudure

tester facilement les circuits

### Châssis 4 roues motrices
C’est le “corps” de la voiture.

Il sert à :

fixer les moteurs

supporter la batterie

transporter les composants

### Moteurs DC
DC = Direct Current = courant continu.

Quand on envoie du courant :

les moteurs tournent

les roues bougent

la voiture avance

### Batterie / boîtier piles
#### La batterie :
alimente les moteurs

alimente le L298N

#### Sans batterie :
la voiture ne peut pas avancer

### Fils Dupont
Ils servent à connecter :

Pico

L298N

moteurs

alimentation

### GPIO
GPIO = General Purpose Input Output.

Les GPIO permettent au Pico :

d’envoyer des signaux

de contrôler les moteurs

GPIO utilisés dans le projet

GPIO Pico / Fonction

GP2 / IN1

GP3 / IN2

GP4 / IN3

GP5 / IN4

### PWM
PWM = Pulse Width Modulation.

Le PWM permet :

contrôler la vitesse des moteurs

#### Le signal alterne très rapidement :

HIGH

LOW

### Duty cycle
Le duty cycle contrôle :

la vitesse du moteur

Plus le duty cycle est grand :
 → plus le moteur tourne vite.
 
### Le PWM utilise :
une valeur entre 0 et 65535

45000 ≈ 70% de vitesse.

## IMPORTS PYTHON
### Import machine
from machine import Pin, PWM

Permet :

contrôler GPIO

utiliser PWM

### Import time
Permet :

faire des pauses

utiliser sleep()

### CONTRÔLE DES MOTEURS
#### Moteur gauche
IN1 = Pin(4, Pin.OUT)

IN2 = Pin(5, Pin.OUT)

Ces pins contrôlent :

le sens du moteur gauche

#### Moteur droit
IN3 = Pin(6, Pin.OUT)

IN4 = Pin(7, Pin.OUT)

Ces pins contrôlent :

le sens du moteur droit

### SENS DE ROTATION
#### Sens 1
IN1.high()

IN2.low()

Le moteur tourne dans un sens.
#### Sens 2
IN1.low()

IN2.high()

Le moteur tourne dans l’autre sens.

## Important
Changer HIGH/LOW :
 → inverse le moteur.
 
## CONNEXIONS MOTEURS
### Le L298N contrôle :
2 côtés , pas 4 moteurs séparément

### Moteurs gauche
avant + arrière
 → OUT1 / OUT2
 
### Moteurs droite
avant + arrière
 → OUT3 / OUT4

## CONNEXIONS ALIMENTATION
Batterie / L298N

+ / 12V
  
- / GND

## Très important
Le GND est essentiel.

Sans masse commune :

le circuit ne fonctionne pas.

## SCHÉMA IMPORTANT
Pico / L298N

GP2 / IN1

GP3 / IN2

GP4 / IN3

GP5 / IN4

## PROBLÈME PRINCIPAL DU PROJET
### Le gros problème :

la voiture tournait sur elle-même au lieu d’avancer droit

### Cause possible: 
moteurs inversés

mauvais branchements

sens de rotation incorrect

code incorrect

### Solutions testées
Nous avons :

inversé les moteurs

changé les branchements

modifié le code

testé différents sens

## Solution finale
Nous avons accepter que la voiture aller pas avancer alors:

la voiture reculepuis tourne sur elle-même

Même si ce n’était pas l’idée initiale :

cela fonctionnait mieux

## DIFFICULTÉS RENCONTRÉES
### A. Branchement électronique
Difficile de savoir :

où brancher les fils

comment alimenter le système

### B. Peur d’endommager les composants
Erreur possible :

court-circuit

mauvaise polarité

mauvais GND

### C. Batterie
Le boîtier piles ne possédait pas les bons câbles.

Solution :

coincer les câbles

brancher :
→ 12V

→ GND

### D. Test du code
Le module machine fonctionne seulement :

sur le Pico

Donc :

impossible de tester entièrement sur ordinateur

## COMPARAISON AVEC LE ROBOT THYMIO

Le projet voiture s’inspire du projet Thymio.

Thymio utilisait :

capteurs

LEDs

sons

variables d’état

## Ce projet nous a appris :
meilleure logique de programmation

organisation du code

gestion des mouvements automatiques

## AMÉLIORATIONS POSSIBLES
Si nous avions plus de temps :

ajouter Bluetooth

ajouter des LEDs

créer une télécommande téléphone

rendre les déplacements plus précis

personnaliser la voiture

améliorer le code

### CONCLUSION DU PROJET
Le projet nous a permis :

comprendre GPIO

utiliser PWM

programmer moteurs

construire une voiture robotique complète

## QUESTIONS POSSIBLES À L’EXAMEN
### “Quel est le rôle du Raspberry Pi Pico ?”
 Le Pico exécute le programme Python et contrôle les moteurs grâce aux GPIO.
 
### “Pourquoi utiliser un L298N ?”
Le Pico ne fournit pas assez de puissance pour les moteurs. Le L298N sert d’intermédiaire.

### “Pourquoi utiliser PWM ?”
Le PWM permet de contrôler la vitesse des moteurs.

### “Que fait duty_u16 ?”
Il règle le duty cycle du signal PWM.

### “Pourquoi utiliser HIGH et LOW ?”
Pour contrôler le sens de rotation des moteurs.

## POINTS ULTRA IMPORTANTS 
### GPIO
Pin(4, Pin.OUT)

### PWM
PWM(Pin(0))

### Fréquence
ENA.freq(1000)

### Vitesse
ENA.duty_u16(45000)

Pause

time.sleep(2)

### Sens moteur
IN1.high()

IN2.low()

## Questions probables
### “Pourquoi avoir utilisé PWM ?”
Pour contrôler progressivement :

luminosité

position du servo

### “Pourquoi utiliser ADC ?”
Pour lire une valeur analogique variable :

potentiomètre

capteur

### “Comment fonctionne votre bouton ?”
entrée GPIO

pull-up

appui → GND → valeur 0

### “Explique ce code”
imports

création des pins

boucles

conditions

fonctions

## [Retour à la racine](https://my.flowershow.app/@corentinrordorf/python-markdown-theme-global)
