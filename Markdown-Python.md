# Ceci est un petit manuel python

> [!info] This is cool!
> Here's a callout block.
> It supports **markdown**
>

## Les dictionnaires en python

J'écris du *text*.  

MORSE_LIST = {
    "a":".-", "b":"-...", "c":"-.-.", "d":"-..", "e":".", "f":"..-.", "g":"--.", "h":"....", "i":"..", "j":".---",
    "k":"-.-", "l":".-..", "m":"--", "n":"-.", "o":"---", "p":".--.", "q":"--.-", "r":".-.", "s":"...", "t":"-",
    "u":"..-", "v":"...-", "w":".--", "x":"-..-", "y":"-.--", "z":"--.."
}

## Les chaînes de caractère en python

En Python, une chaîne de caractères (ou *string*) est une suite de caractères utilisée pour représenter du texte. Elle est définie à l’aide de guillemets simples (`'`), doubles (`"`) ou triples (`'''` ou `"""`) pour les textes sur plusieurs lignes. Les chaînes sont **immuables**, ce qui signifie qu’on ne peut pas modifier un caractère directement une fois la chaîne créée. Python offre de nombreuses opérations sur les chaînes, comme la concaténation avec `+`, la répétition avec `*`, l’accès à un caractère par son indice, ou encore des méthodes très pratiques comme `upper()`, `lower()`, `split()` et `replace()`. Les chaînes de caractères sont très utilisées pour la gestion des données textuelles, l’affichage de messages et la manipulation d’entrées utilisateur.

merci.......

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

Exemple:
```python
nombre = 12345

for chiffre in str(nombre):
    print(chiffre)

Résultat:
Copier le code
1
2
3
4
5
Chaque chiffre est de type str.
Pour le convertir en entier :
Copier le code
chiffre = int(chiffre)

## Convertir un nombre en binaire et ôter les 2 premiers caractères de la chaîne

En Python, il est possible de convertir un nombre décimal en **binaire** grâce à une fonction intégrée, puis de **manipuler la chaîne obtenue**.

Étape 1 : Convertir un nombre en binaire
Python fournit la fonction `bin()`.

Exemple:
```python
nombre = 13
binaire = bin(nombre)
print(binaire)

Résultat:
Copier le code
0b1101
**Le préfixe 0b indique que le nombre est écrit en binaire.**

## [Retour à la racine](https://my.flowershow.app/@corentinrordorf/python-markdown-theme-global)
