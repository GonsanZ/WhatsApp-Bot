//Autor: GonsanZ
const { Client, LocalAuth } = require('@whiskeysockets/whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Crear un cliente de WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  // Generar el código QR en la consola para que el usuario pueda escanearlo
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('El bot está listo!');
});

// Función que filtra mensajes sospechosos
const isSuspicious = (message) => {
  // Patrón para detectar links sospechosos (de phishing)
  const phishingPatterns = [
    /https?:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+/,
    /bit\.ly|tinyurl\.com|goo\.gl/,
    /@(\w+\.\w+|\w+[\.\-\w]*[a-zA-Z]\w*)/,
  ];

  // Detectar patrones de posibles scams
  for (let pattern of phishingPatterns) {
    if (pattern.test(message)) {
      return true;  // Es un mensaje sospechoso
    }
  }

  // Puedes agregar más reglas aquí según el tipo de scam que quieras detectar.
  return false;
};

// Escuchar mensajes entrantes
client.on('message', async (message) => {
  const messageContent = message.body.toLowerCase();
  
  // Si el mensaje es sospechoso
  if (isSuspicious(messageContent)) {
    console.log('¡Alerta de posible scam detectado!:', message.body);
    
    // Responder al usuario que el mensaje es sospechoso
    message.reply('¡Alerta! Este mensaje puede contener un link sospechoso. Te recomendamos no hacer clic en enlaces desconocidos.');
    
    // O puedes bloquear al usuario
    // message.getContact().then(contact => contact.block());
  } else {
    console.log('Mensaje legítimo recibido:', message.body);
  }
});

// Iniciar el cliente
client.initialize();