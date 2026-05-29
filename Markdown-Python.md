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


## LEDs & Calcul de résistance

> **Points clés**
> - `R = (V_gen - V_LED) / I_LED` — toujours calculer avant de brancher
> - Anode (patte **longue**) → GPIO, Cathode (patte **courte**) → GND
> - Prendre une résistance **supérieure ou égale** au calcul (jamais inférieure)
> - Résistance recommandée en classe : **220 Ω**

---

## Le bouton poussoir

```python
btn = Pin(X, Pin.IN, Pin.PULL_UP)
```

> **Points clés**
> - `PULL_UP` activé → bouton appuyé = **0** (contre-intuitif mais standard)
> - Détecter le **front** (changement d'état) pour compter les clics précisément
> - Utiliser `ticks_ms()` et `ticks_diff()` pour mesurer la durée d'un appui
> - `sleep(0.02)` dans la boucle = anti-rebond basique

---

## Potentiomètre & ADC

**Câblage :**
- Broche 1 (Vcc) → **3.3V**
- Broche 2 (curseur) → **GP26, GP27 ou GP28**
- Broche 3 (GND) → **GND**

> **Points clés**
> - ADC disponible sur **GP26** (ADC0), **GP27** (ADC1), **GP28** (ADC2) uniquement
> - `read_u16()` → valeur entière **0 à 65535** (résolution 16 bits)
> - Tension réelle = `valeur × 3.3 / 65535`

---

## PWM — Modulation de largeur d'impulsion

> **Points clés**
> - `duty_u16()` prend des valeurs de **0** (0%) à **65535** (100%)
> - Fréquence PWM typique pour une LED : 100 Hz à 10 kHz
> - Pour un servo : `freq = 50 Hz` (période 20 ms)
> - Pour un buzzer passif : changer la fréquence change la **note musicale**

---

## Moteur servo

**Formule — convertir ms → duty_u16 :**
```
duty_u16 = (duree_ms / 20) × 65535
```

| Angle | Durée impulsion | duty_u16 approx. |
|-------|----------------|-----------------|
| 0°    | 0.5 ms         | ≈ 1638          |
| 90°   | 1.5 ms         | ≈ 4915          |
| 180°  | 2.5 ms         | ≈ 8191          |

**Câblage :**
- Fil **orange** (signal) → GPIO choisi (ex: GP0)
- Fil **rouge** (+5V) → VBUS (pin 40)
- Fil **noir/marron** (GND) → GND

```python
pwm = PWM(Pin(0))   # servo sur GP0
pwm.freq(50)        # OBLIGATOIRE : 50 Hz pour servo
```

> **Points clés**
> - Toujours `freq(50)` — 50 Hz, période 20 ms
> - 0° ≈ 1638 | 90° ≈ 4915 | 180° ≈ 8191
> - Fil rouge → **VBUS (5V)**, PAS sur 3.3V !
> - Les valeurs exactes dépendent du servo distribué

---

## Résumé

| Composant | Import | Init | Lire / Écrire |
|---|---|---|---|
| **LED (output)** | `from machine import Pin` | `Pin(15, Pin.OUT)` | `led.value(1/0)` |
| **Bouton (input)** | `from machine import Pin` | `Pin(13, Pin.IN, Pin.PULL_UP)` | `btn.value()` → 0 ou 1 |
| **Potentiomètre (ADC)** | `from machine import ADC, Pin` | `ADC(Pin(26))` | `adc.read_u16()` → 0–65535 |
| **LED dimmer (PWM)** | `from machine import PWM, Pin` | `PWM(Pin(15)); .freq(1000)` | `pwm.duty_u16(0–65535)` |
| **Servo (PWM)** | `from machine import PWM, Pin` | `PWM(Pin(0)); .freq(50)` | `pwm.duty_u16(1638–8191)` |
| **Temps** | `from time import sleep, ticks_ms` | — | `sleep(s)` / `ticks_ms()` |

---

## Formules essentielles

**Résistance LED**
```
R = (V_gen − V_LED) / I_LED
```
> Exemple : 3.3V, LED rouge 1.7V, 2mA → R = (3.3−1.7)/0.002 = **800 Ω**

**Tension depuis ADC**
```
V = read_u16() × 3.3 / 65535
```
> Exemple : read_u16() = 32768 → V ≈ **1.65V**

**Angle → duty servo**
```
duty = (0.5 + angle/180 × 2.0) / 20 × 65535
```
> Exemple : 90° → (0.5+1.0)/20×65535 ≈ **4915**

**Duty cycle %**
```
duty_u16 = (% / 100) × 65535
```
> Exemple : 50% → **32768**



# Explication du projet — Coffre-Fort à Combinaison
---

##  Table des matières

1. [Ce que fait le projet](#ce-que-fait-le-projet)
2. [Les composants utilisés et leur rôle](#les-composants-utilisés-et-leur-rôle)
3. [Les variables du programme](#les-variables-du-programme)
4. [Les grandes fonctions](#les-grandes-fonctions)
5. [Comment fonctionne la boucle principale](#comment-fonctionne-la-boucle-principale)
6. [Mode validation — appui court](#mode-validation--appui-court)
7. [Mode reset — appui long](#mode-reset--appui-long)
8. [L'écran LCD — comment ça marche](#lécran-lcd--comment-ça-marche)

---

## Ce que fait le projet

Le projet est un **coffre-fort électronique interactif**. Le joueur doit tourner trois potentiomètres pour former une combinaison secrète à 3 chiffres (chaque chiffre pouvant valoir 1, 2 ou 3).

**Combinaison par défaut : `1 – 2 – 2`**

### Déroulement d'une partie

1. Le joueur tourne les trois potentiomètres pour régler ses chiffres
2. L'écran LCD affiche en temps réel la valeur de chaque potentiomètre
3. Le joueur appuie **brièvement** sur le bouton pour valider son code
4. Le système vérifie chiffre par chiffre :
   - ✅ Bon chiffre → LED verte + son aigu
   - ❌ Mauvais chiffre → LED rouge + son grave
5. Si les 3 chiffres sont corrects → message de victoire + mélodie
6. Après **5 erreurs consécutives** → message d'avertissement
7. Un **appui long (≥ 1 seconde)** permet de reprogrammer le code secret

---

## Les composants utilisés et leur rôle

| Composant | Quantité | Broche(s) | Rôle dans le projet |
|-----------|----------|-----------|---------------------|
| Potentiomètre | 3 | GP26, GP27, GP28 | Saisir les 3 chiffres du code (1, 2 ou 3) |
| LED verte | 3 | GP7, GP18, GP20 | Indique qu'un chiffre est **correct** |
| LED rouge | 3 | GP6, GP17, GP19 | Indique qu'un chiffre est **incorrect** |
| Bouton poussoir | 1 | GP8 | Valider le code (court) ou le reprogrammer (long) |
| Buzzer passif | 1 | GP9 | Retour sonore (son aigu = bon, grave = erreur) |
| Écran LCD 16×2 | 1 | GP10 à GP15 | Afficher les valeurs et les messages |

### Les potentiomètres

Chaque potentiomètre est branché sur une entrée **ADC** (convertisseur analogique-numérique). En tournant le curseur, la tension lue varie entre 0V et 3.3V. Le programme divise cette plage en 3 zones égales pour obtenir un chiffre discret :

- Position basse → chiffre **1**
- Position milieu → chiffre **2**  
- Position haute → chiffre **3**

### Le bouton

Câblé avec une résistance **PULL_UP** interne. Cela signifie que quand personne n'appuie, le pin lit **1**. Quand on appuie, le pin lit **0**. C'est contre-intuitif mais c'est la façon standard de brancher un bouton sur un microcontrôleur.

### Le buzzer passif

Contrairement à un buzzer actif, le buzzer passif a besoin qu'on lui envoie un **signal PWM** (une fréquence variable) pour produire un son. On contrôle :
- La **fréquence** → change la hauteur du son (aigu ou grave)
- Le **duty cycle** → change le volume

---

## Les variables du programme

| Variable | Type | Ce qu'elle contient | Exemple |
|----------|------|---------------------|---------|
| `combinaison` | liste de 3 entiers | Le code secret à deviner | `[1, 2, 2]` |
| `tentatives` | entier | Nombre d'erreurs consécutives depuis le dernier succès | `3` |
| `last_vals` | liste de 3 entiers | Les dernières valeurs lues des potentiomètres | `[2, 1, 3]` |
| `vals` | liste de 3 entiers | Les valeurs actuelles lues à chaque cycle | `[1, 2, 2]` |
| `correct` | booléen | Vrai si tous les chiffres sont bons, Faux dès une erreur | `True` |
| `t0` | entier (ms) | Moment où le bouton a été appuyé (en millisecondes) | `12400` |
| `duree` | entier (ms) | Durée de l'appui sur le bouton | `800` |
| `affichage` | chaîne de caractères | Le texte construit progressivement pour l'écran LCD | `"1-2-"` |

### Pourquoi `last_vals` ?

L'écran LCD est lent à rafraîchir et scintille si on l'efface trop souvent. La variable `last_vals` mémorise ce qu'on affichait au cycle précédent. On ne met à jour l'écran **que si une valeur a changé**. C'est une optimisation importante pour un affichage fluide.

### Pourquoi `vals[:]` et pas juste `vals` pour copier ?

En Python, une liste est un **objet**. Si on écrit `last_vals = vals`, les deux variables pointent vers le **même objet en mémoire** — modifier `vals` modifierait aussi `last_vals`. Le `[:]` crée une vraie copie indépendante de la liste.

---

## Les grandes fonctions

### `lire_pot(p)` — Lire un potentiomètre

Cette fonction reçoit un objet ADC (un potentiomètre) et retourne un chiffre entre 1 et 3.

Elle lit la tension sur l'entrée analogique (valeur brute entre 0 et 65535), puis la convertit :
- 0 à 21844 → retourne **1**
- 21845 à 43689 → retourne **2**
- 43690 à 65535 → retourne **3**

C'est la fonction qui traduit un mouvement physique (tourner un potentiomètre) en chiffre utilisable par le reste du programme.

### `beep(f, d)` — Jouer un son

Cette fonction reçoit une **fréquence** (en Hz) et une **durée** (en secondes). Elle active le buzzer à la fréquence demandée pendant la durée, puis le coupe.

Sons utilisés dans le projet :
| Fréquence | Note approx. | Utilisé pour |
|-----------|-------------|--------------|
| 369 Hz | Fa#4 (grave) | Chiffre incorrect |
| 1479 Hz | Fa#5 (moyen) | Réinitialisation code |
| 2959 Hz | Fa#6 (aigu) | Chiffre correct / Victoire |

### `reset_leds()` — Éteindre toutes les LEDs

Cette fonction parcourt une liste contenant les 6 objets LED et les éteint toutes. Elle est appelée avant chaque vérification pour repartir d'un état propre.

### Fonctions LCD (`lcd_init`, `lcd_clear`, `lcd_print`)

Ces fonctions gèrent la communication avec l'écran LCD. Elles sont appelées partout dans le programme pour :
- **`lcd_init()`** : démarrer l'écran au lancement
- **`lcd_clear()`** : effacer l'écran
- **`lcd_print(texte)`** : afficher du texte sur la ligne courante
- **`lcd_command(0xC0)`** : déplacer le curseur sur la **deuxième ligne** de l'écran

---

## Comment fonctionne la boucle principale

Le programme tourne en permanence dans une boucle `while True`. À chaque cycle :

1. **Lire les 3 potentiomètres** → obtenir `vals = [chiffre1, chiffre2, chiffre3]`
2. **Comparer avec `last_vals`** → si un chiffre a changé, mettre à jour l'écran LCD et sauvegarder les nouvelles valeurs dans `last_vals`
3. **Vérifier si le bouton est appuyé** → si oui, mesurer la durée d'appui
4. **Brancher selon la durée** :
   - Appui court (< 1 seconde) → aller en mode **validation**
   - Appui long (≥ 1 seconde) → aller en mode **reset**
5. **Attendre 0.1 seconde** (`time.sleep(0.1)`) et recommencer

---

## Mode validation — appui court

Quand le joueur appuie brièvement sur le bouton, le programme :

1. Éteint toutes les LEDs pour repartir d'un état propre
2. Crée un **drapeau booléen** `correct = True` (on suppose que c'est bon)
3. Pour chacun des 3 chiffres (boucle `for i in range(3)`) :
   - Affiche progressivement le code entré sur le LCD : `"1"` → `"1-2"` → `"1-2-3"`
   - Compare `vals[i]` avec `combinaison[i]`
   - Si c'est bon : allume la LED verte, joue un son aigu
   - Si c'est faux : allume la LED rouge, joue un son grave, et passe `correct = False`
   - Fait une pause de 0.5s pour que le joueur puisse voir le résultat
4. Après la vérification des 3 chiffres :
   - Si `correct` est encore `True` : affiche "Correct !", remet `tentatives` à 0, joue 5 bips aigus
   - Si `correct` est `False` : incrémente `tentatives`, affiche "Essaye encore" ou "T'abuse non" si 5 erreurs

---

## Mode reset — appui long

Quand le joueur maintient le bouton appuyé plus d'une seconde :

1. La valeur actuelle de chaque potentiomètre (`vals`) devient le **nouveau code secret** → `combinaison = vals[:]`
2. Le compteur `tentatives` est remis à 0
3. Toutes les LEDs clignotent 5 fois ensemble avec un bip à chaque fois (feedback visuel clair)
4. L'écran affiche "Nouveau code :" sur la ligne 1, et le code (ex: `1-3-2`) sur la ligne 2

C'est ce mode qui permet à l'utilisateur de **personnaliser le code** sans reprogrammer le Pico.

---

## L'écran LCD — comment ça marche

L'écran LCD HD44780 (16 caractères × 2 lignes) est piloté en **mode 4 bits** : les données sont envoyées en deux fois (4 bits à la fois) via les broches D4 à D7. Cela économise des broches GPIO par rapport au mode 8 bits.

### Communication avec l'écran

La communication se fait par une série d'étapes :
1. On indique si on envoie une **commande** (effacer, déplacer curseur…) ou un **caractère** à afficher via le pin RS
2. On envoie les 4 bits de poids fort, puis les 4 bits de poids faible
3. À chaque envoi de 4 bits, on envoie une impulsion sur le pin Enable (E) pour valider

### Les commandes importantes

| Commande | Effet |
|----------|-------|
| `lcd_command(0x01)` | Effacer l'écran et revenir en haut à gauche |
| `lcd_command(0xC0)` | Déplacer le curseur au début de la **2e ligne** |
| `lcd_print("texte")` | Afficher du texte à la position courante du curseur |

### Affichage progressif du code

Lors de la validation, l'affichage se construit progressivement sur la 2e ligne :
- Après chiffre 1 : `"1"`
- Après chiffre 2 : `"1-2"`
- Après chiffre 3 : `"1-2-3"`

Cela donne un effet visuel dynamique et permet au joueur de suivre la vérification en cours.

---

*Projet réalisé dans le cadre du cours d'informatique — 2025–26*

## [Retour à la racine](https://my.flowershow.app/@corentinrordorf/python-markdown-theme-global)

# W

/!\     from machine import Pin, ADC
        import time

valeur entière pot = 65 536
valeur = pot.read_u16()
pot = ADC
bouton = Pin.IN, Pin.PULL_UP
