   # Manuel pour le code de la raspberry Pi.

## Voilà la shéma du GPIO
![Example](./images/gpio.jpeg)



## Code pour allumer une led

```python
from machine import Pin
import time

led = Pin(15, Pin.OUT)

while True:
    led.value(1)      # LED ON
    time.sleep(1)
    led.value(0)      # LED OFF
    time.sleep(1)
```

## Code pour compter en binaire de 1 à 15
```
from machine import Pin
from time import sleep
led1 = Pin(0, Pin.OUT)
led2 = Pin(1, Pin.OUT)
led3 = Pin(2, Pin.OUT)
led4 = Pin(3, Pin.OUT)

for a in range (1, 16) :
    led1.value(0)
    led2.value(0)
    led3.value(0)
    led4.value(0)
    a = bin(a)[2:]
    while len(a) < 4 :
        a = "0" + a
    print(a)
    for i in range(len(a)) :
        if int((a)[i]) == 1 :
            if i == 0 :
                led1.value(1)
            elif i == 1 :
                led2.value(1)
            elif i == 2 :
                led3.value(1)
            elif i == 3 :
                led4.value(1)
    sleep(2)
    print("i est de :", i, "n est de :", str((a)[i]))
```

## [Retour à la racine](https://my.flowershow.app/@corentinrordorf/python-markdown-theme-global)
