1. Dependencias

npm install @whiskeysockets/whatsapp-web.js qrcode-terminal

2. Explicación del Código

    - QR Code: El bot genera un código QR en la consola que debes escanear con WhatsApp Web para autenticarte.

    - Escuchar Mensajes: El bot escucha todos los mensajes que llegan a través de WhatsApp. Utiliza el evento message de la librería whatsapp-web.js.

    - Filtro Anti-Scam: El filtro isSuspicious busca patrones como enlaces de acortadores comunes (bit.ly, tinyurl, etc.) y dominios sospechosos en los mensajes.

    - Respuestas Automáticas: Si se detecta un mensaje sospechoso, el bot responde con un aviso para alertar al usuario de que el mensaje podría ser un scam.
  
3. Ejecución

    - Para ejecutar el bot, solo tienes que correr el script:
  
   node index.js

 - Asegúrate de escanear el código QR con WhatsApp Web para autenticar al bot.
