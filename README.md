Instalar webpush
`npm install web-push http-server -g`



Crear APP Angular => ng new my-app

Instalar PWA
ng add @angular/pwa 



Obtener VAPID Key

Solicitar Permiso
Enviar



 web-push generate-vapid-keys --json
Obtener VAPID Key


{"publicKey":"BFURXwwf7OHoZcgr4voyxD2LHfvaGNwXu0tJg-Ub-0C68LE0CcMmXRWYL_am9GcYhtskiCugn9ZfSFKBmwR63Hk","privateKey":"9uvBQrora4UXz945l8_kO2jSYAVLwuMBqRZN72TXhks"}

Server
Ruta
Envio Payload



{ "endpoint": "https://fcm.googleapis.com/fcm/send/fTnHjgkermk:APA91bEIWvR8PevoqSxEr31yIBVifLAS3jGU-Kxr6-tkbS6YOeLmYFZ9xmii6RfXZZsG6wyRhR2OF5WAhbSFzJyA0gDBA1DjVQ08FZWVW87AX36ItenJgnfJcimXr7bXu8-PfLECqXm8", "expirationTime": null, "keys": { "p256dh": "BJFPpexZ6ks7YU9AHzBl2oJJ-IwvEowcBkP63809R6dHckMclkC_NfwCmbNrfwH5to5aRQb77I9H49ZMp-L33nc", "auth": "gOy7M49nyCOii0ptOCCvSw" } }