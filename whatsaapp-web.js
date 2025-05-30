const express = require('express');
const { Client } = require('whatsapp-web.js');
const app = express();
let qrCode = '';
const client = new Client({ puppeteer: { headless: true } });
client.on('qr', (qr) => {
  qrCode = qr;
  console.log('QR Code:', qr);
  require('qrcode-terminal').generate(qr, { small: true });
});
client.on('ready', () => {
  console.log('Bot is ready!');
});
app.get('/qr', (req, res) => res.send(qrCode));
app.listen(process.env.PORT || 3000);
client.initialize();
