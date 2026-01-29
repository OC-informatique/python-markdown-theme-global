# Manuel pour le code de la raspberry Pi.

## Voilà la shéma du GPIO
![Example](./images/gpio.jpeg)



## Code pour allumer une led

'''python
from machine import Pin
import time

led = Pin(15, Pin.OUT)

while True:
    led.value(1)      # LED ON
    time.sleep(1)
    led.value(0)      # LED OFF
    time.sleep(1)
'''

## [Retour à la racine](https://my.flowershow.app/@corentinrordorf/python-markdown-theme-global)
