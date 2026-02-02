from machine import Pin
import time

button = Pin(16, Pin.IN,Pin.PULL_UP)
print("Bonjour, ce programme compte le nombre de click et mesure la durée ou le bouton est pressé.")

timerstarted=False #on lance le chrono quand on presse le bouton, au départ le chrono est off
start=0
nb=0

while True:
    
    if button.value() == 0 and timerstarted==False: #si le bouton est pressé et que le chrono est pas déjà lancé on lance le chrono
        start=time.ticks_ms() #time started en ms
        timerstarted=True  #time stoped en ms
       
        
    if button.value()==1 and timerstarted==True:
        stop=time.ticks_ms()
        
        duree = time.ticks_diff(stop, start) / 1000
        if duree>0.05:#on filtre les rebonds
            nb+=1
            print(f"Clic n°{nb} : durée = {duree:.2f} secondes")
        timerstarted=False
    time.sleep(0.003)
