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

## Explication des Calculs Complexes

1. Conversion angle → duty cycle (servo basique)

        min_duty = 1638
        max_duty = 8092
        duty = int(min_duty + (angle / 180) * (max_duty - min_duty))

Un servo se contrôle avec un signal PWM dont la largeur d'impulsion varie entre deux bornes. Ici on fait une interpolation linéaire :

angle / 180 → ramène l'angle dans l'intervalle [0 ; 1]
(max_duty - min_duty) = 6454 → c'est toute la plage disponible
On multiplie les deux pour savoir quelle fraction de cette plage utiliser
On ajoute min_duty pour partir du bon point de départ

Exemple pour 90° : 1638 + (90/180) × 6454 = 1638 + 3227 = 4865

2. Position de l'aiguille d'horloge

        if angle <= 6:
            set_angle(180 - angle * 30)
        if angle > 6:
            set_angle(180 - (angle * 30 - 180))
    
Une horloge a 12 heures → chaque heure = 360°/12 = 30°. Mais le servo ne fait que 180°, donc on divise en deux moitiés :

Heures 0→6 (première moitié du cadran) : 180 - angle×30

À 0h → 180 - 0 = 180°
À 6h → 180 - 180 = 0°


Heures 7→12 (deuxième moitié) : 180 - (angle×30 - 180)

Le - 180 soustrait le "tour" déjà effectué pour repartir de 0
À 7h → 180 - (210 - 180) = 150°
À 12h → 180 - (360 - 180) = 0°... et on repart




3. Conversion potentiomètre → servo
   
        return int(1800 + (valeur / 65535) * (8200 - 1800))

Même principe d'interpolation linéaire que le calcul n°1 :

Le potentiomètre retourne une valeur entre 0 et 65535

valeur / 65535 → ramène dans [0 ; 1]
On projette ensuite cette fraction sur la plage du servo [1800 ; 8200]


4. Conversion en tension (volts)
   
        tension = valeur * 3.3 / 65535

Le convertisseur analogique-numérique (ADC) encode la tension sur 16 bits, soit 65535 niveaux max, correspondant à 3.3V (tension max du Raspberry Pi Pico). On fait donc une simple règle de trois :

65535  →  3.3 V

valeur →  ?  V  =  valeur × 3.3 / 65535

6. La fonction f(x) (version avec formule de droite explicite)
   
        y = (65535*0.5/20) + ((65535*2.5/20) - (65535*0.5/20)) / 180 * x

C'est la formule d'une droite : f(x) = f(a) + (f(b) - f(a)) / (b - a) × (x - a)

Les servos standard ont un signal entre 0.5ms et 2.5ms pour une période de 20ms (50Hz). En duty cycle 16 bits :
PositionDurée impulsionCalcul duty cycle0°0.5 ms65535 × 0.5 / 20 ≈ 1638180°2.5 ms65535 × 2.5 / 20 ≈ 8192

La formule interpole linéairement entre ces deux points selon l'angle x.

8. Compteur binaire avec 4 LEDs
   
        a = bin(a)[2:]
        while len(a) < 4:
            a = "0" + a

bin(5) retourne '0b101' → le [2:] supprime le préfixe 0b → '101'

La boucle while complète avec des zéros à gauche pour toujours avoir 4 chiffres → '0101'

Ensuite on lit chaque caractère et on allume la LED correspondante si c'est un 1

Formule — convertir ms → duty_u16
     duty_u16 = (duree_ms / 20) x 65535

Câblage du servo: 
• Fil orange (signal) → GPIO choisi (ex: GP0)
• Fil rouge (+5V) → VBUS (pin 40)
• Fil noir/marron (GND) → GND

pwm = PWM(Pin(0)) # servo sur GP0
pwm.freq(50) # OBLIGATOIRE : 50 Hz pour servo

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


## LEDs & CALCUL DE RÉSISTANCE
POINTS CLÉS À RETENIR
• R = (V_gen - V_LED) / I_LED — toujours calculer avant de brancher
• Anode (longue) vers GPIO, Cathode (courte) vers GND
• Prendre une résistance SUPÉRIEURE ou ÉGALE au calcul (jamais inférieure)
• Résistance recommandée en classe : 220 Ω

 ## LE BOUTON POUSSOIR
btn = Pin(X, Pin.IN, Pin.PULL_UP)
POINTS CLÉS À RETENIR
• PULL_UP activé → bouton appuyé = 0 (contre-intuitif mais standard)
• Détecter le FRONT (changement d'état) pour compter les clics précisément
• Utiliser ticks_ms() et ticks_diff() pour mesurer la durée d'un appui
• sleep(0.02) dans la boucle = anti-rebond basique

## POTENTIOMÈTRE & ADC
Broche 1 (Vcc) → 3.3V
• Broche 2 (Output/curseur) → Pin ADC du Pico (GP26, 27 ou 28)
• Broche 3 (GND) → GND 

 POINTS CLÉS À RETENIR
• ADC disponible sur GP26 (ADC0), GP27 (ADC1), GP28 (ADC2) uniquement
• read_u16() → valeur entière 0 à 65535 (résolution 16 bits)
• Tension réelle = valeur × 3.3 / 65535
• Pot câblé : 3.3V → broche 1, GP26 → broche 2 (curseur), GND → broche 3

## PWM — MODULATION DE LARGEUR D'IMPULSION
POINTS CLÉS À RETENIR
• duty_u16() prend des valeurs de 0 (0%) à 65535 (100%)
• La fréquence PWM typique pour une LED : 100 Hz à 10 kHz
• Pour un servo : freq = 50 Hz (période 20ms) — voir section suivante
• Pour un buzzer passif : changer la fréquence change la note musicale

## MOTEUR SERVO
Formule — convertir ms → duty_u16
     duty_u16 = (duree_ms / 20) x 65535
Câblage du servo
• Fil orange (signal) → GPIO choisi (ex: GP0)
• Fil rouge (+5V) → VBUS (pin 40)
• Fil noir/marron (GND) → GND

pwm = PWM(Pin(0)) # servo sur GP0
pwm.freq(50) # OBLIGATOIRE : 50 Hz pour servo

 POINTS CLÉS À RETENIR
• Servo : toujours freq(50) — 50 Hz, période 20ms
• 0° ≈ duty 1638 | 90° ≈ duty 4915 | 180° ≈ duty 8191
• Formule : duty = (ms / 20) × 65535
• Fil rouge servo → VBUS (5V), PAS sur 3.3V !
• Étalonnage : les valeurs exactes dépendent du servo distribué

## RÉSUMÉ
| Composant | Import | Init | Lire / Écrire |
|---|---|---|---|
| **LED (output)** | `from machine import Pin` | `Pin(15, Pin.OUT)` | `led.value(1/0)` |
| **Bouton (input)** | `from machine import Pin` | `Pin(13, Pin.IN, Pin.PULL_UP)` | `btn.value()` → 0 ou 1 |
| **Potentiomètre (ADC)** | `from machine import ADC, Pin` | `ADC(Pin(26))` | `adc.read_u16()` → 0–65535 |
| **LED dimmer (PWM)** | `from machine import PWM, Pin` | `PWM(Pin(15)); .freq(1000)` | `pwm.duty_u16(0–65535)` |
| **Servo (PWM)** | `from machine import PWM, Pin` | `PWM(Pin(0)); .freq(50)` | `pwm.duty_u16(1638–8191)` |
| **Temps** | `from time import sleep, ticks_ms` | — | `sleep(s)` / `ticks_ms()` |

## FORMULES ESSENTIELLES
# Résistance LED
R = (V_gen − V_LED) / I_LED
Exemple : 3.3V gen, LED rouge 1.7V, 2mA → R = (3.3−1.7)/0.002 = 800 Ω

# Tension depuis ADC
V = read_u16() × 3.3 / 65535
Exemple : read_u16() = 32768 → V ≈ 1.65V

# Angle → duty servo
duty = (0.5 + angle/180 × 2.0) / 20 × 65535
Exemple : 90° → (0.5+1.0)/20×65535 ≈ 4915

# Duty cycle %
duty_u16 = (% / 100) × 65535
Exemple : 50% → 32768

## [Retour à la racine](https://my.flowershow.app/@corentinrordorf/python-markdown-theme-global)

# W

/!\     from machine import Pin, ADC
        import time

valeur entière pot = 65 536
valeur = pot.read_u16()
pot = ADC
bouton = Pin.IN, Pin.PULL_UP
