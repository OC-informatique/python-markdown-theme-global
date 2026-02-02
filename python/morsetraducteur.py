from machine import Pin
import time

button = Pin(25, Pin.OUT)
print("Bonjour, ce programme ecrit en morse.")
print("Court (0.2s) = point, Long (0.6s) = trait")
print("Pause 0.6s = nouvelle lettre")

button.value(0)

LISTE_MORSE = {
    "a":".-", "b":"-...", "c":"-.-.", "d":"-..", "e":".", "f":"..-.",
    "g":"--.", "h":"....", "i":"..", "j":".---", "k":"-.-", "l":".-..",
    "m":"--", "n":"-.", "o":"---", "p":".--.", "q":"--.-", "r":".-.",
    "s":"...", "t":"-", "u":"..-", "v":"...-", "w":".--", "x":"-..-",
    "y":"-.--", "z":"--..", "":""
}

mot="sos"
for lettre in mot:#on parcours chaque lettre
    print(lettre)
    for sign in LISTE_MORSE[lettre]:#on parcours chaque . ou - de chaque lettre
        button.value(1)
        if sign==".":
            time.sleep(0.2)#duree du point
        else:
            time.sleep(0.6)#duree du trait
        button.value(0)
        time.sleep(0.2)#duree entre trait point d'une lettre
    time.sleep(0.4)#0.6 est la duree entre 2 caractères du mot
        
