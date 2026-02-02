from machine import Pin
import time

button = Pin(16, Pin.IN, Pin.PULL_UP)
print("Bonjour, ce programme traduit le morse.")
print("Court (<0.4s) = point, Long (≥0.4s) = trait")
print("Pause 1.5s = nouvelle lettre, Pause 5s = fin\n")

timerstarted = False
start = 0
stop = time.ticks_ms()
lettre = ""
lettre_affichee = False  # Nouveau flag

LISTE_INVERSE = {
    ".-":"a", "-...":"b", "-.-.":"c", "-..":"d", ".":"e", "..-.":"f",
    "--.":"g", "....":"h", "..":"i", ".---":"j", "-.-":"k", ".-..":"l",
    "--":"m", "-.":"n", "---":"o", ".--.":"p", "--.-":"q", ".-.":"r",
    "...":"s", "-":"t", "..-":"u", "...-":"v", ".--":"w", "-..-":"x",
    "-.--":"y", "--..":"z", "":"" 
}

while True:
    # Bouton pressé : démarrer le chrono
    state=button.value()
    if state == 0 and not timerstarted:
        start = time.ticks_ms()
        timerstarted = True
        lettre_affichee = False
    
    # Bouton relâché : enregistrer le point ou trait
    elif state == 1 and timerstarted:
        stop = time.ticks_ms()
        duree = time.ticks_diff(stop, start) / 1000
        
        if duree > 0.05:  # Filtrage anti-rebond
            if duree < 0.4:#si moins de 0.4secondes . sinon -
                lettre += "."
            else:
                lettre += "-"
        
        timerstarted = False
    
    # Bouton relâché : vérifier les pauses
    elif state == 1 and not timerstarted:
        pause = time.ticks_diff(time.ticks_ms(), stop) / 1000
        
        # Pause entre lettres (1.5s)
        if pause > 1.5 and lettre != "" and not lettre_affichee:
            print(LISTE_INVERSE.get(lettre, "?"), end="")
            lettre = ""
            lettre_affichee = True
        
        # Fin du message (5s)
        if pause > 5:
            print("\n\nmessage transmis")
            break
    
    time.sleep(0.003)
